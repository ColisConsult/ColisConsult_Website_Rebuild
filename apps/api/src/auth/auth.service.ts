import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { InjectDb, type Database } from '../db/db.module.js';
import { adminUsers } from '../db/schema.js';
import type { AdminPayload } from './admin.guard.js';

// Hash factice : compare toujours, pour ne pas révéler l'existence d'un e-mail par le temps de réponse
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

@Injectable()
export class AuthService {
  constructor(
    @InjectDb() private readonly db: Database,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.db.query.adminUsers.findFirst({
      where: eq(adminUsers.email, email.trim().toLowerCase()),
    });
    const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
    if (!user || !ok) throw new UnauthorizedException('Identifiants invalides');

    await this.db
      .update(adminUsers)
      .set({ lastLoginAt: new Date() })
      .where(eq(adminUsers.id, user.id));

    const payload: AdminPayload = { sub: user.id, email: user.email, name: user.name };
    return {
      accessToken: await this.jwt.signAsync(payload),
      admin: { id: user.id, email: user.email, name: user.name },
    };
  }
}
