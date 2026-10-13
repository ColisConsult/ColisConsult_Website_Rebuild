import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module.js';
import { ContentModule } from './content/content.module.js';
import { DbModule } from './db/db.module.js';
import { HealthController } from './health.controller.js';
import { LeadsModule } from './leads/leads.module.js';
import { MailModule } from './mail/mail.module.js';
import { SimulatorModule } from './simulator/simulator.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // 120 requêtes / minute / IP par défaut ; les formulaires ont une limite plus stricte
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    DbModule,
    MailModule,
    AuthModule,
    ContentModule,
    LeadsModule,
    SimulatorModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
