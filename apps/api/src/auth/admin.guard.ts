import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

export interface AdminPayload {
  sub: string;
  email: string;
  name: string;
}

/** Protège les routes /api/admin/* : jeton Bearer signé par AuthService. */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context
      .switchToHttp()
      .getRequest<Request & { admin?: AdminPayload }>();
    const [scheme, token] = (req.headers.authorization ?? '').split(' ');
    if (scheme !== 'Bearer' || !token) throw new UnauthorizedException();
    try {
      req.admin = await this.jwt.verifyAsync<AdminPayload>(token);
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
