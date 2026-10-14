import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  index,
} from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const leadType = pgEnum('lead_type', [
  'contact',
  'pre_audit',
  'simulator',
]);
export const leadStatus = pgEnum('lead_status', [
  'new',
  'in_progress',
  'done',
  'archived',
]);
export const postStatus = pgEnum('post_status', ['draft', 'published']);
export const postKind = pgEnum('post_kind', ['article', 'news']);
export const clientSegment = pgEnum('client_segment', [
  'enterprise',
  'ecommerce',
  'sme',
]);

export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  ...timestamps,
});

export const posts = pgTable(
  'posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
    locale: varchar('locale', { length: 2 }).notNull().default('fr'),
    title: text('title').notNull(),
    excerpt: text('excerpt').notNull().default(''),
    /** Markdown */
    content: text('content').notNull().default(''),
    coverImageUrl: text('cover_image_url'),
    status: postStatus('status').notNull().default('draft'),
    /** « article » (conseils, analyses) ou « news » (actualités, annonces et comptes rendus de webinars) */
    kind: postKind('kind').notNull().default('article'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    /** Ancienne URL WordPress, pour les redirections 301 */
    legacyUrl: text('legacy_url'),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('posts_slug_locale_idx').on(t.slug, t.locale),
    index('posts_status_published_idx').on(t.status, t.publishedAt),
  ],
);

export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  company: text('company').notNull(),
  author: text('author').notNull(),
  role: text('role').notNull().default(''),
  quoteFr: text('quote_fr').notNull(),
  quoteEn: text('quote_en'),
  /** Langue d'origine du témoignage : l'autre version est une traduction */
  quoteLang: varchar('quote_lang', { length: 2 }).notNull().default('fr'),
  missionFr: text('mission_fr').notNull().default(''),
  missionEn: text('mission_en'),
  /** Résultat chiffré mis en avant, ex. « −19 % sans changer de transporteur » */
  resultFr: text('result_fr'),
  resultEn: text('result_en'),
  segment: clientSegment('segment').notNull().default('enterprise'),
  featured: boolean('featured').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
});

export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  segment: clientSegment('segment').notNull().default('enterprise'),
  logoUrl: text('logo_url'),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
});

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  roleFr: text('role_fr').notNull(),
  roleEn: text('role_en').notNull(),
  bioFr: text('bio_fr').notNull().default(''),
  bioEn: text('bio_en').notNull().default(''),
  linkedinUrl: text('linkedin_url'),
  photoUrl: text('photo_url'),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
});

export const webinars = pgTable('webinars', {
  id: uuid('id').primaryKey().defaultRandom(),
  titleFr: text('title_fr').notNull(),
  titleEn: text('title_en'),
  descriptionFr: text('description_fr').notNull().default(''),
  descriptionEn: text('description_en'),
  startsAt: timestamp('starts_at', { withTimezone: true }).notNull(),
  durationMinutes: integer('duration_minutes').notNull().default(45),
  registrationUrl: text('registration_url'),
  replayUrl: text('replay_url'),
  published: boolean('published').notNull().default(true),
  ...timestamps,
});

export const leads = pgTable(
  'leads',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    type: leadType('type').notNull(),
    status: leadStatus('status').notNull().default('new'),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    company: text('company').notNull(),
    jobTitle: text('job_title'),
    email: text('email').notNull(),
    phone: text('phone'),
    message: text('message'),
    annualBudget: text('annual_budget'),
    carriers: text('carriers'),
    /** Données complémentaires (ex. paramètres du simulateur) */
    payload: jsonb('payload'),
    locale: varchar('locale', { length: 2 }).notNull().default('fr'),
    consent: boolean('consent').notNull().default(false),
    /** Notes internes saisies dans le back-office */
    notes: text('notes'),
    ...timestamps,
  },
  (t) => [
    index('leads_type_status_idx').on(t.type, t.status),
    index('leads_created_idx').on(t.createdAt),
  ],
);

export const leadFiles = pgTable('lead_files', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id')
    .notNull()
    .references(() => leads.id, { onDelete: 'cascade' }),
  originalName: text('original_name').notNull(),
  storedPath: text('stored_path').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type Webinar = typeof webinars.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type LeadFile = typeof leadFiles.$inferSelect;
