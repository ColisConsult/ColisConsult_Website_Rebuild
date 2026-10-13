/**
 * Importe les articles du blog WordPress actuel dans PostgreSQL.
 *
 *   npm run import:wordpress                       # import depuis https://www.colisconsult.com
 *   npm run import:wordpress -- --download-images  # + copie locale des images (recommandé avant de couper WordPress)
 *   WP_URL=https://staging.exemple.fr npm run import:wordpress
 *
 * Avec Docker (pile complète), depuis la racine du projet :
 *   docker compose exec api node dist/scripts/import-wordpress.js --download-images
 *   → les images sont copiées dans le volume « media », servies par le site sous /media/blog/…
 *
 * - Passe par l'API REST publique de WordPress (/wp-json/wp/v2/posts).
 * - Convertit le HTML en Markdown (éditable ensuite dans le back-office).
 * - Met à jour les articles existants par slug : relançable sans doublon.
 * - Conserve l'ancienne URL (legacyUrl) pour les redirections 301.
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import TurndownService from 'turndown';
import * as schema from '../db/schema.js';

const WP_URL = (process.env.WP_URL ?? 'https://www.colisconsult.com').replace(/\/$/, '');
const DOWNLOAD_IMAGES = process.argv.includes('--download-images');
/** Articles de test à ne pas importer */
const EXCLUDED_SLUGS = new Set(['test-simple']);

const here = path.dirname(fileURLToPath(import.meta.url));
/**
 * Où copier les images, et sous quelle URL le site les sert.
 * - npm run dev : dossier public du site (apps/web/public/uploads/blog → /uploads/blog/…)
 * - Docker : volume partagé « media » (BLOG_IMAGES_DIR / BLOG_IMAGES_URL, cf. docker-compose.yml)
 */
const IMAGES_DIR = process.env.BLOG_IMAGES_DIR ?? path.resolve(here, '../../../web/public/uploads/blog');
const IMAGES_PUBLIC_PATH = (process.env.BLOG_IMAGES_URL ?? '/uploads/blog').replace(/\/$/, '');

interface WpPost {
  id: number;
  slug: string;
  date_gmt: string;
  modified_gmt: string;
  status: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: { source_url?: string }[] };
}

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&hellip;|\[&hellip;\]/g, '…')
    .replace(/\s+/g, ' ')
    .trim();

const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
});
// Supprime le bruit des constructeurs de pages (scripts, styles, formulaires, embeds vides)
turndown.remove(['script', 'style', 'noscript', 'form', 'iframe', 'button']);

/**
 * Le site WordPress actuel imprime du HTML avant le JSON de son API REST : des blocs
 * <style> d'Elementor et un commentaire du module « Alter HTML ». On les retire.
 * Ce module modifie aussi les réponses de moins de 600 Ko (il abîme le JSON) : on demande
 * donc tous les articles d'un coup (per_page=100), réponse assez grosse pour qu'il l'ignore.
 */
function stripLeadingHtml(text: string) {
  let s = text;
  for (;;) {
    s = s.replace(/^\s+/, '');
    if (s.startsWith('<!--')) {
      const end = s.indexOf('-->');
      if (end < 0) break;
      s = s.slice(end + 3);
      continue;
    }
    const style = s.match(/^<style\b[^>]*>[\s\S]*?<\/style>/i);
    if (style) {
      s = s.slice(style[0].length);
      continue;
    }
    break;
  }
  return s;
}

async function fetchJson<T>(url: string): Promise<{ data: T; totalPages: number }> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} sur ${url}`);
  const raw = await res.text();
  let data: T;
  try {
    data = JSON.parse(stripLeadingHtml(raw)) as T;
  } catch (error) {
    throw new Error(
      `réponse illisible de ${url} (${(error as Error).message}). ` +
        `Début de la réponse : ${raw.slice(0, 120).replace(/\s+/g, ' ')}… ` +
        `Un module WordPress modifie probablement les réponses de l'API REST.`,
    );
  }
  return { data, totalPages: Number(res.headers.get('x-wp-totalpages') ?? 1) };
}

async function downloadImage(url: string): Promise<string> {
  try {
    const { pathname } = new URL(url, WP_URL);
    const filename = path.basename(pathname).replace(/[^a-zA-Z0-9._-]/g, '-');
    const target = path.join(IMAGES_DIR, filename);
    if (!fs.existsSync(target)) {
      const res = await fetch(new URL(url, WP_URL));
      if (!res.ok) throw new Error(String(res.status));
      fs.mkdirSync(IMAGES_DIR, { recursive: true });
      fs.writeFileSync(target, Buffer.from(await res.arrayBuffer()));
    }
    return `${IMAGES_PUBLIC_PATH}/${filename}`;
  } catch (error) {
    console.warn(`  ⚠ image non copiée (${url}) : ${(error as Error).message}`);
    return url;
  }
}

async function localiseImages(markdown: string): Promise<string> {
  const urls = new Set(
    [...markdown.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)].map((m) => m[1]),
  );
  let out = markdown;
  for (const url of urls) {
    if (!/^https?:\/\//.test(url) || !url.includes('/wp-content/')) continue;
    out = out.split(url).join(await downloadImage(url));
  }
  return out;
}

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });
  let created = 0;
  let updated = 0;

  try {
    console.log(`Import depuis ${WP_URL}${DOWNLOAD_IMAGES ? ' (avec images)' : ''}`);
    let page = 1;
    let totalPages = 1;
    do {
      const res = await fetchJson<WpPost[]>(
        `${WP_URL}/wp-json/wp/v2/posts?per_page=100&page=${page}&status=publish&_embed=wp:featuredmedia`,
      );
      totalPages = res.totalPages;

      for (const wp of res.data) {
        if (EXCLUDED_SLUGS.has(wp.slug)) continue;

        let content = turndown.turndown(wp.content.rendered).replace(/\n{3,}/g, '\n\n').trim();
        let cover = wp._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;
        if (DOWNLOAD_IMAGES) {
          content = await localiseImages(content);
          if (cover) cover = await downloadImage(cover);
        }

        const values = {
          slug: wp.slug,
          locale: 'fr',
          title: decode(wp.title.rendered),
          excerpt: decode(wp.excerpt.rendered).slice(0, 600),
          content,
          coverImageUrl: cover,
          status: 'published' as const,
          publishedAt: new Date(`${wp.date_gmt}Z`),
          legacyUrl: new URL(wp.link).pathname,
        };

        const existing = await db.query.posts.findFirst({
          where: and(eq(schema.posts.slug, wp.slug), eq(schema.posts.locale, 'fr')),
        });
        if (existing) {
          await db.update(schema.posts).set(values).where(eq(schema.posts.id, existing.id));
          updated++;
        } else {
          await db.insert(schema.posts).values(values);
          created++;
        }
        console.log(`  ✔ ${values.title}`);
      }
      page++;
    } while (page <= totalPages);

    console.log(`\nTerminé : ${created} créé(s), ${updated} mis à jour.`);
    console.log(
      'Pensez à relire les articles dans le back-office (/admin/articles) : les blocs Elementor complexes peuvent nécessiter une retouche.',
    );
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error('✖ Import interrompu :', error.message);
  process.exitCode = 1;
});
