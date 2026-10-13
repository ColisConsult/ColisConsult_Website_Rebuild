import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { and, count, desc, eq, inArray, sql } from 'drizzle-orm';
import { InjectDb, type Database } from '../db/db.module.js';
import { posts } from '../db/schema.js';
import type { CreatePostDto, UpdatePostDto } from './dto.js';

const listColumns = {
  id: posts.id,
  slug: posts.slug,
  locale: posts.locale,
  title: posts.title,
  excerpt: posts.excerpt,
  coverImageUrl: posts.coverImageUrl,
  status: posts.status,
  publishedAt: posts.publishedAt,
  updatedAt: posts.updatedAt,
  // Temps de lecture estimé (230 mots / minute)
  readingMinutes: sql<number>`greatest(1, round(array_length(regexp_split_to_array(trim(${posts.content}), '\\s+'), 1) / 230.0))::int`,
};

@Injectable()
export class PostsService {
  constructor(@InjectDb() private readonly db: Database) {}

  async listPublished(locales: string[], page: number, pageSize: number) {
    const where = and(eq(posts.status, 'published'), inArray(posts.locale, locales));
    const [items, [{ total }]] = await Promise.all([
      this.db
        .select(listColumns)
        .from(posts)
        .where(where)
        .orderBy(desc(posts.publishedAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      this.db.select({ total: count() }).from(posts).where(where),
    ]);
    return { items, total, page, pageSize };
  }

  async findPublished(slug: string, locale: string) {
    const rows = await this.db
      .select({ ...listColumns, content: posts.content })
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.status, 'published')));
    const post = rows.find((p) => p.locale === locale) ?? rows[0];
    if (!post) throw new NotFoundException();
    return post;
  }

  slugs() {
    return this.db
      .select({ slug: posts.slug, locale: posts.locale, updatedAt: posts.updatedAt })
      .from(posts)
      .where(eq(posts.status, 'published'))
      .orderBy(desc(posts.publishedAt));
  }

  /** Correspondance anciennes URL WordPress → slug, pour les redirections */
  legacyRedirects() {
    return this.db
      .select({ legacyUrl: posts.legacyUrl, slug: posts.slug })
      .from(posts)
      .where(sql`${posts.legacyUrl} is not null`);
  }

  // --- Admin ---
  listAll() {
    return this.db.select(listColumns).from(posts).orderBy(desc(posts.updatedAt));
  }

  async get(id: string) {
    const post = await this.db.query.posts.findFirst({ where: eq(posts.id, id) });
    if (!post) throw new NotFoundException();
    return post;
  }

  async create(dto: CreatePostDto) {
    await this.assertSlugFree(dto.slug, dto.locale ?? 'fr');
    const [created] = await this.db
      .insert(posts)
      .values({ ...dto, publishedAt: this.publishedAt(dto) })
      .returning();
    return created;
  }

  async update(id: string, dto: UpdatePostDto) {
    const current = await this.get(id);
    if (dto.slug && (dto.slug !== current.slug || (dto.locale && dto.locale !== current.locale))) {
      await this.assertSlugFree(dto.slug, dto.locale ?? current.locale, id);
    }
    const [updated] = await this.db
      .update(posts)
      .set({ ...dto, publishedAt: this.publishedAt({ ...current, ...dto }) })
      .where(eq(posts.id, id))
      .returning();
    return updated;
  }

  async remove(id: string) {
    const res = await this.db.delete(posts).where(eq(posts.id, id)).returning({ id: posts.id });
    if (!res.length) throw new NotFoundException();
    return { deleted: true };
  }

  private publishedAt(p: { status?: string | null; publishedAt?: Date | null }) {
    if (p.status === 'published') return p.publishedAt ?? new Date();
    return p.publishedAt ?? null;
  }

  private async assertSlugFree(slug: string, locale: string, exceptId?: string) {
    const existing = await this.db.query.posts.findFirst({
      where: and(eq(posts.slug, slug), eq(posts.locale, locale)),
    });
    if (existing && existing.id !== exceptId) {
      throw new ConflictException('Un article utilise déjà ce slug dans cette langue');
    }
  }
}
