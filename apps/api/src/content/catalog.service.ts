import { Injectable, NotFoundException } from '@nestjs/common';
import { asc, desc, eq, gte, lt, and } from 'drizzle-orm';
import { InjectDb, type Database } from '../db/db.module.js';
import { clients, teamMembers, testimonials, webinars } from '../db/schema.js';
import type {
  CreateTestimonialDto,
  CreateWebinarDto,
  UpdateTestimonialDto,
  UpdateWebinarDto,
} from './dto.js';

@Injectable()
export class CatalogService {
  constructor(@InjectDb() private readonly db: Database) {}

  // --- Clients & équipe (lecture seule, alimentés par le seed) ---
  clients() {
    return this.db
      .select()
      .from(clients)
      .orderBy(asc(clients.segment), asc(clients.sortOrder), asc(clients.name));
  }

  team() {
    return this.db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder));
  }

  // --- Témoignages ---
  testimonials(featuredOnly = false) {
    return this.db
      .select()
      .from(testimonials)
      .where(featuredOnly ? eq(testimonials.featured, true) : undefined)
      .orderBy(asc(testimonials.sortOrder), asc(testimonials.company));
  }

  async testimonial(id: string) {
    const row = await this.db.query.testimonials.findFirst({ where: eq(testimonials.id, id) });
    if (!row) throw new NotFoundException();
    return row;
  }

  async createTestimonial(dto: CreateTestimonialDto) {
    const [row] = await this.db.insert(testimonials).values(dto).returning();
    return row;
  }

  async updateTestimonial(id: string, dto: UpdateTestimonialDto) {
    const [row] = await this.db
      .update(testimonials)
      .set(dto)
      .where(eq(testimonials.id, id))
      .returning();
    if (!row) throw new NotFoundException();
    return row;
  }

  async removeTestimonial(id: string) {
    const res = await this.db.delete(testimonials).where(eq(testimonials.id, id)).returning();
    if (!res.length) throw new NotFoundException();
    return { deleted: true };
  }

  // --- Webinars ---
  webinars(scope: 'upcoming' | 'past' | 'all', onlyPublished = true) {
    const now = new Date();
    const conditions = [
      onlyPublished ? eq(webinars.published, true) : undefined,
      scope === 'upcoming' ? gte(webinars.startsAt, now) : undefined,
      scope === 'past' ? lt(webinars.startsAt, now) : undefined,
    ].filter(Boolean);
    return this.db
      .select()
      .from(webinars)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(scope === 'upcoming' ? asc(webinars.startsAt) : desc(webinars.startsAt));
  }

  async webinar(id: string) {
    const row = await this.db.query.webinars.findFirst({ where: eq(webinars.id, id) });
    if (!row) throw new NotFoundException();
    return row;
  }

  async createWebinar(dto: CreateWebinarDto) {
    const [row] = await this.db.insert(webinars).values(dto).returning();
    return row;
  }

  async updateWebinar(id: string, dto: UpdateWebinarDto) {
    const [row] = await this.db.update(webinars).set(dto).where(eq(webinars.id, id)).returning();
    if (!row) throw new NotFoundException();
    return row;
  }

  async removeWebinar(id: string) {
    const res = await this.db.delete(webinars).where(eq(webinars.id, id)).returning();
    if (!res.length) throw new NotFoundException();
    return { deleted: true };
  }
}
