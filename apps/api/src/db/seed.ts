/**
 * Remplit la base avec le contenu initial et crée le compte admin.
 * Idempotent : peut être relancé sans créer de doublons.
 *   npm run db:seed
 */
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';
import {
  clientsSeed,
  postsSeed,
  teamSeed,
  testimonialsSeed,
} from './seed-data.js';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('… ADMIN_EMAIL / ADMIN_PASSWORD absents : compte admin non créé');
    return;
  }
  if (password.length < 10 || password === 'change-me-now') {
    console.warn(
      '⚠ ADMIN_PASSWORD est trop faible : changez-le avant la mise en production.',
    );
  }
  const existing = await db.query.adminUsers.findFirst({
    where: eq(schema.adminUsers.email, email),
  });
  if (existing) {
    console.log(`• Admin ${email} déjà présent`);
    return;
  }
  await db.insert(schema.adminUsers).values({
    email,
    name: process.env.ADMIN_NAME ?? 'Admin',
    passwordHash: await bcrypt.hash(password, 12),
  });
  console.log(`✔ Admin créé : ${email}`);
}

async function seedIfEmpty<T extends Record<string, unknown>>(
  label: string,
  table: Parameters<typeof db.insert>[0],
  rows: T[],
) {
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(table);
  if (count > 0) {
    console.log(`• ${label} : ${count} entrées déjà présentes`);
    return;
  }
  await db.insert(table).values(rows as never);
  console.log(`✔ ${label} : ${rows.length} entrées`);
}

async function main() {
  await seedAdmin();
  await seedIfEmpty('Équipe', schema.teamMembers, teamSeed);
  await seedIfEmpty('Clients', schema.clients, clientsSeed);
  await seedIfEmpty('Témoignages', schema.testimonials, testimonialsSeed);

  // Articles : insertion par slug, sans écraser un contenu importé depuis WordPress
  let inserted = 0;
  for (const p of postsSeed) {
    const res = await db
      .insert(schema.posts)
      .values({
        slug: p.slug,
        locale: 'fr',
        title: p.title,
        excerpt: p.excerpt,
        content: p.excerpt,
        status: 'published',
        publishedAt: new Date(p.publishedAt),
        legacyUrl: p.legacyUrl,
      })
      .onConflictDoNothing()
      .returning({ id: schema.posts.id });
    inserted += res.length;
  }
  console.log(`✔ Articles : ${inserted} ajoutés`);
}

try {
  await main();
} catch (error) {
  console.error('✖ Échec du seed', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
