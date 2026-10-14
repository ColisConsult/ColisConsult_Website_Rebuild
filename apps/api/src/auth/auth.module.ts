import { randomBytes } from 'node:crypto';
import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from './admin.guard.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: jwtSecret(config.get<string>('JWT_SECRET')),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') ?? '8h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminGuard],
  exports: [AdminGuard, JwtModule],
})
export class AuthModule {}

/**
 * Secret de signature des sessions du back-office. Sans JWT_SECRET, l'API démarre avec un
 * secret aléatoire (sessions perdues à chaque redémarrage) plutôt que de planter : à définir
 * en production.
 */
function jwtSecret(configured?: string) {
  if (configured) return configured;
  Logger.warn('JWT_SECRET absente : secret temporaire, à définir pour le back-office', 'AuthModule');
  return randomBytes(48).toString('base64url');
}
