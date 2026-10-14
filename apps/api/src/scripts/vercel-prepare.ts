/**
 * Prépare la base à chaque déploiement de la vitrine Vercel (lancé par le buildCommand du
 * service « api » dans vercel.json) : plus rien à lancer à la main depuis son poste.
 *
 *   1. migrations (sans effet si la base est à jour) ;
 *   2. tant qu'aucun article WordPress n'a été importé : import du blog
 *      (les images restent servies par le WordPress actuel) ; ensuite, plus jamais,
 *      pour ne pas écraser un article modifié dans le back-office ;
 *   3. contenu initial : équipe, clients, témoignages, compte admin (sans doublon).
 *
 * Sans DATABASE_URL, rien n'est fait. Une erreur n'interrompt jamais le déploiement :
 * le site reste en ligne, au pire avec des sections vides.
 */
import 'dotenv/config';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { postsSeed } from '../db/seed-data.js';

const here = path.dirname(fileURLToPath(import.meta.url)); // dist/scripts

function run(script: string) {
  execFileSync(process.execPath, [path.resolve(here, script)], { stdio: 'inherit' });
}

/** Articles autres que ceux de démonstration (seed-data.ts) : ceux venus de WordPress */
async function countImportedPosts(): Promise<number> {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
  try {
    const { rows } = await pool.query<{ n: number }>(
      'select count(*)::int as n from posts where not (slug = any($1))',
      [postsSeed.map((p) => p.slug)],
    );
    return rows[0]?.n ?? 0;
  } finally {
    await pool.end();
  }
}

if (!process.env.DATABASE_URL) {
  console.log('… DATABASE_URL absente : préparation de la base ignorée');
} else {
  try {
    run('../db/migrate.js');
    if ((await countImportedPosts()) === 0) {
      try {
        run('./import-wordpress.js');
      } catch {
        console.warn('⚠ Import WordPress impossible : seuls les articles de démonstration seront affichés');
      }
    }
    run('../db/seed.js');
    console.log('✔ Base prête pour la vitrine');
  } catch (error) {
    console.warn('⚠ Préparation de la base incomplète :', (error as Error).message);
  }
}
