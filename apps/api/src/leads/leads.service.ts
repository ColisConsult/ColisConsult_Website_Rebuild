import fs from 'node:fs';
import path from 'node:path';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { and, count, desc, eq, sql } from 'drizzle-orm';
import { InjectDb, type Database } from '../db/db.module.js';
import { leadFiles, leads } from '../db/schema.js';
import { MailService } from '../mail/mail.service.js';
import type { BaseLeadDto, UpdateLeadDto } from './dto.js';
import { uploadRoot } from './upload.config.js';

type LeadType = 'contact' | 'pre_audit' | 'simulator';

const TYPE_LABEL: Record<LeadType, string> = {
  contact: 'Contact',
  pre_audit: 'Pré-audit',
  simulator: 'Simulateur',
};

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    @InjectDb() private readonly db: Database,
    private readonly mail: MailService,
  ) {}

  async create(
    type: LeadType,
    dto: BaseLeadDto & {
      message?: string;
      annualBudget?: string;
      carriers?: string;
      simulation?: Record<string, unknown>;
    },
    files: Express.Multer.File[] = [],
  ) {
    const lead = await this.db.transaction(async (tx) => {
      const [row] = await tx
        .insert(leads)
        .values({
          type,
          firstName: dto.firstName,
          lastName: dto.lastName,
          company: dto.company,
          email: dto.email.toLowerCase(),
          phone: dto.phone || null,
          jobTitle: dto.jobTitle || null,
          message: dto.message || null,
          annualBudget: dto.annualBudget || null,
          carriers: dto.carriers || null,
          payload: dto.simulation ?? null,
          locale: dto.locale ?? 'fr',
          consent: dto.consent,
        })
        .returning();
      if (files.length) {
        await tx.insert(leadFiles).values(
          files.map((f) => ({
            leadId: row.id,
            originalName: f.originalname.slice(0, 250),
            storedPath: path.relative(uploadRoot(), f.path),
            mimeType: f.mimetype,
            size: f.size,
          })),
        );
      }
      return row;
    });

    void this.mail.notifyTeam(
      `[Site] ${TYPE_LABEL[type]} — ${lead.company} (${lead.firstName} ${lead.lastName})`,
      [
        `Type : ${TYPE_LABEL[type]}`,
        `Contact : ${lead.firstName} ${lead.lastName}${lead.jobTitle ? `, ${lead.jobTitle}` : ''}`,
        `Société : ${lead.company}`,
        `E-mail : ${lead.email}`,
        lead.phone ? `Téléphone : ${lead.phone}` : '',
        lead.annualBudget ? `Budget transport : ${lead.annualBudget}` : '',
        lead.carriers ? `Transporteurs : ${lead.carriers}` : '',
        files.length ? `Factures jointes : ${files.length}` : '',
        lead.message ? `\n${lead.message}` : '',
        `\nÀ traiter dans le back-office : /admin/demandes/${lead.id}`,
      ]
        .filter(Boolean)
        .join('\n'),
    );
    this.logger.log(`Nouvelle demande ${type} ${lead.id}`);
    return { id: lead.id, ok: true };
  }

  // --- Admin ---
  list(type?: string, status?: string) {
    const conditions = [
      type ? eq(leads.type, type as LeadType) : undefined,
      status ? eq(leads.status, status as never) : undefined,
    ].filter(Boolean);
    return this.db
      .select({
        id: leads.id,
        type: leads.type,
        status: leads.status,
        firstName: leads.firstName,
        lastName: leads.lastName,
        company: leads.company,
        email: leads.email,
        annualBudget: leads.annualBudget,
        createdAt: leads.createdAt,
        fileCount: sql<number>`(select count(*)::int from lead_files where lead_files.lead_id = leads.id)`,
      })
      .from(leads)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(leads.createdAt))
      .limit(500);
  }

  async get(id: string) {
    const lead = await this.db.query.leads.findFirst({ where: eq(leads.id, id) });
    if (!lead) throw new NotFoundException();
    const files = await this.db
      .select({
        id: leadFiles.id,
        originalName: leadFiles.originalName,
        mimeType: leadFiles.mimeType,
        size: leadFiles.size,
        createdAt: leadFiles.createdAt,
      })
      .from(leadFiles)
      .where(eq(leadFiles.leadId, id));
    return { ...lead, files };
  }

  async update(id: string, dto: UpdateLeadDto) {
    const [row] = await this.db.update(leads).set(dto).where(eq(leads.id, id)).returning();
    if (!row) throw new NotFoundException();
    return row;
  }

  /** Suppression complète (droit à l'effacement RGPD), fichiers compris */
  async remove(id: string) {
    const files = await this.db.select().from(leadFiles).where(eq(leadFiles.leadId, id));
    const res = await this.db.delete(leads).where(eq(leads.id, id)).returning({ id: leads.id });
    if (!res.length) throw new NotFoundException();
    await Promise.all(
      files.map((f) => fs.promises.rm(this.absolutePath(f.storedPath), { force: true })),
    );
    return { deleted: true };
  }

  async file(fileId: string) {
    const file = await this.db.query.leadFiles.findFirst({ where: eq(leadFiles.id, fileId) });
    if (!file) throw new NotFoundException();
    const absolute = this.absolutePath(file.storedPath);
    if (!fs.existsSync(absolute)) throw new NotFoundException('Fichier introuvable sur le disque');
    return { ...file, absolute };
  }

  async stats() {
    const rows = await this.db
      .select({ type: leads.type, status: leads.status, n: count() })
      .from(leads)
      .groupBy(leads.type, leads.status);
    const [{ last30 }] = await this.db
      .select({ last30: count() })
      .from(leads)
      .where(sql`${leads.createdAt} > now() - interval '30 days'`);
    return { byTypeAndStatus: rows, last30 };
  }

  private absolutePath(stored: string) {
    const root = uploadRoot();
    const absolute = path.resolve(root, stored);
    // Protection contre toute sortie du dossier de stockage
    if (!absolute.startsWith(root + path.sep)) throw new NotFoundException();
    return absolute;
  }
}
