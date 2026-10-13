import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { type Transporter } from 'nodemailer';

/**
 * Envoi d'e-mails transactionnels. Sans SMTP_HOST configuré, les messages
 * sont simplement journalisés (pratique en développement).
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter?: Transporter;

  constructor(private readonly config: ConfigService) {
    const host = config.get<string>('SMTP_HOST');
    if (host) {
      this.transporter = nodemailer.createTransport({
        host,
        port: Number(config.get('SMTP_PORT') ?? 587),
        secure: config.get('SMTP_SECURE') === 'true',
        auth: config.get('SMTP_USER')
          ? { user: config.get('SMTP_USER'), pass: config.get('SMTP_PASS') }
          : undefined,
      });
    }
  }

  async notifyTeam(subject: string, text: string) {
    const to = this.config.get<string>('NOTIFY_EMAIL');
    if (!to) return;
    if (!this.transporter) {
      this.logger.log(`[e-mail non envoyé, SMTP absent] ${subject}\n${text}`);
      return;
    }
    try {
      await this.transporter.sendMail({
        from: this.config.get('MAIL_FROM') ?? to,
        to,
        subject,
        text,
      });
    } catch (error) {
      // Une panne SMTP ne doit jamais faire échouer l'enregistrement d'une demande
      this.logger.error(`Échec d'envoi de « ${subject} »`, error as Error);
    }
  }
}
