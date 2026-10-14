/**
 * Exporte le contenu initial (seed-data.ts) vers apps/web/src/content/fallback.json.
 *
 * Le site s'en sert uniquement quand l'API ne répond pas (vitrine sans base de données,
 * panne) : témoignages, équipe, clients et articles restent affichés au lieu de sections
 * vides. À relancer après toute modification de seed-data.ts :
 *   npm run content:fallback -w api
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { clientsSeed, postsSeed, teamSeed, testimonialsSeed } from '../db/seed-data.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../../../web/src/content/fallback.json');

const testimonials = testimonialsSeed
  .map((t, i) => ({
    id: `seed-testimonial-${i + 1}`,
    company: t.company,
    author: t.author,
    role: t.role,
    quoteFr: t.quoteFr,
    quoteEn: t.quoteEn ?? null,
    quoteLang: t.quoteLang ?? 'fr',
    missionFr: t.missionFr,
    missionEn: t.missionEn ?? null,
    resultFr: t.resultFr ?? null,
    resultEn: t.resultEn ?? null,
    segment: t.segment,
    featured: t.featured ?? false,
    sortOrder: t.sortOrder,
  }))
  .sort((a, b) => a.sortOrder - b.sortOrder || a.company.localeCompare(b.company, 'fr'));

const team = [...teamSeed]
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map((m, i) => ({
    id: `seed-team-${i + 1}`,
    name: m.name,
    roleFr: m.roleFr,
    roleEn: m.roleEn,
    bioFr: m.bioFr ?? '',
    bioEn: m.bioEn ?? '',
    linkedinUrl: m.linkedinUrl ?? null,
    photoUrl: m.photoUrl ?? null,
  }));

const segmentOrder = ['enterprise', 'ecommerce', 'sme'];
const clients = [...clientsSeed]
  .sort(
    (a, b) =>
      segmentOrder.indexOf(a.segment) - segmentOrder.indexOf(b.segment) ||
      a.sortOrder - b.sortOrder ||
      a.name.localeCompare(b.name, 'fr'),
  )
  .map((c, i) => ({ id: `seed-client-${i + 1}`, name: c.name, segment: c.segment, logoUrl: null }));

const posts = [...postsSeed]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map((p, i) => ({
    id: `seed-post-${i + 1}`,
    slug: p.slug,
    locale: 'fr',
    title: p.title,
    excerpt: p.excerpt,
    content: p.excerpt,
    coverImageUrl: null,
    status: 'published',
    kind: p.kind,
    publishedAt: new Date(p.publishedAt).toISOString(),
    updatedAt: new Date(p.publishedAt).toISOString(),
    readingMinutes: 1,
  }));

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `${JSON.stringify({ testimonials, team, clients, posts }, null, 2)}\n`);
console.log(`✔ ${path.relative(process.cwd(), out)} : ${testimonials.length} témoignages, ${team.length} membres, ${clients.length} clients, ${posts.length} articles`);
