import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { InjectDb, type Database } from './db/db.module.js';

/**
 * État de l'API, lisible sans accès aux journaux (utile sur Vercel) : la base est-elle
 * configurée et joignable, le secret des sessions est-il défini ? Aucune valeur secrète
 * n'est renvoyée.
 */
@Controller('health')
export class HealthController {
  constructor(@InjectDb() private readonly db: Database) {}

  @Get()
  async check() {
    const jwtSecret = process.env.JWT_SECRET ? 'ok' : 'absente';
    if (!process.env.DATABASE_URL) {
      throw new ServiceUnavailableException({ status: 'error', database: 'DATABASE_URL absente', jwtSecret });
    }
    try {
      await this.db.execute(sql`select 1`);
    } catch {
      throw new ServiceUnavailableException({ status: 'error', database: 'injoignable', jwtSecret });
    }
    return { status: 'ok', database: 'ok', jwtSecret, time: new Date().toISOString() };
  }
}
