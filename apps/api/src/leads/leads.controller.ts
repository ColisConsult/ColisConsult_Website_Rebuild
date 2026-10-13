import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Response } from 'express';
import { AdminGuard } from '../auth/admin.guard.js';
import { ContactLeadDto, PreAuditLeadDto, SimulatorLeadDto, UpdateLeadDto } from './dto.js';
import { LeadsService } from './leads.service.js';
import { MAX_FILES, multerOptions, removeFiles } from './upload.config.js';

const FORM_LIMIT = { default: { ttl: 10 * 60_000, limit: 8 } };

/** Formulaires publics du site */
@Controller('leads')
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Throttle(FORM_LIMIT)
  @Post('contact')
  @HttpCode(201)
  contact(@Body() dto: ContactLeadDto) {
    if (dto.website) return { ok: true };
    return this.leads.create('contact', dto);
  }

  @Throttle(FORM_LIMIT)
  @Post('simulator')
  @HttpCode(201)
  simulator(@Body() dto: SimulatorLeadDto) {
    if (dto.website) return { ok: true };
    return this.leads.create('simulator', dto);
  }

  /**
   * Pré-audit : multipart/form-data, champs + `files` (factures PDF / Excel / CSV).
   * La validation est faite à la main pour pouvoir supprimer les fichiers déjà
   * écrits sur le disque si le formulaire est invalide.
   */
  @Throttle(FORM_LIMIT)
  @Post('pre-audit')
  @HttpCode(201)
  @UseInterceptors(FilesInterceptor('files', MAX_FILES, multerOptions()))
  async preAudit(
    @Body() body: Record<string, unknown>,
    @UploadedFiles() files: Express.Multer.File[] = [],
  ) {
    const dto = plainToInstance(PreAuditLeadDto, body);
    const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: false });
    if (errors.length) {
      await removeFiles(files);
      throw new BadRequestException(
        errors.flatMap((e) => Object.values(e.constraints ?? {})),
      );
    }
    if (dto.website) {
      await removeFiles(files);
      return { ok: true };
    }
    try {
      return await this.leads.create('pre_audit', dto, files);
    } catch (error) {
      await removeFiles(files);
      throw error;
    }
  }
}

/** Back-office : consultation et suivi des demandes */
@SkipThrottle()
@UseGuards(AdminGuard)
@Controller('admin')
export class AdminLeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Get('stats')
  stats() {
    return this.leads.stats();
  }

  @Get('leads')
  list(@Query('type') type?: string, @Query('status') status?: string) {
    return this.leads.list(type, status);
  }

  @Get('leads/:id')
  get(@Param('id', ParseUUIDPipe) id: string) {
    return this.leads.get(id);
  }

  @Patch('leads/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateLeadDto) {
    return this.leads.update(id, dto);
  }

  @Delete('leads/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.leads.remove(id);
  }

  @Get('files/:id')
  async download(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const file = await this.leads.file(id);
    res.setHeader('Content-Type', file.mimeType);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename*=UTF-8''${encodeURIComponent(file.originalName)}`,
    );
    res.sendFile(file.absolute);
  }
}
