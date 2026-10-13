/**
 * Applique les migrations SQL du dossier ./drizzle.
 * Dev : `npm run db:migrate` · Prod (Docker) : `node dist/db/migrate.js`
 */
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

const here = path.dirname(fileURLToPath(import.meta.url));
// src/db -> ../../drizzle  |  dist/db -> ../../drizzle
const migrationsFolder = path.resolve(here, '../../drizzle');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
try {
  await migrate(drizzle(pool), { migrationsFolder });
  console.log('✔ Migrations appliquées');
} catch (error) {
  console.error('✖ Échec des migrations', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
