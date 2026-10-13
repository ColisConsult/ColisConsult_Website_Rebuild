import { Controller, Get } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { InjectDb, type Database } from './db/db.module.js';

@Controller('health')
export class HealthController {
  constructor(@InjectDb() private readonly db: Database) {}

  @Get()
  async check() {
    await this.db.execute(sql`select 1`);
    return { status: 'ok', time: new Date().toISOString() };
  }
}
