import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { BadRequestException } from '@nestjs/common';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface.js';
import { diskStorage } from 'multer';

export const ALLOWED_EXTENSIONS = ['.pdf', '.xlsx', '.xls', '.csv'];
const ALLOWED_MIME = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/csv',
  'application/csv',
  'text/plain',
  'application/octet-stream',
];
export const MAX_FILES = 10;

export function uploadRoot() {
  return path.resolve(process.env.UPLOAD_DIR ?? './storage/uploads');
}

export function multerOptions(): MulterOptions {
  const maxMb = Number(process.env.UPLOAD_MAX_FILE_MB ?? 15);
  return {
    storage: diskStorage({
      destination: (_req, _file, cb) => {
        const month = new Date().toISOString().slice(0, 7);
        const dir = path.join(uploadRoot(), month);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
      },
      filename: (_req, file, cb) => {
        cb(null, `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`);
      },
    }),
    limits: { fileSize: maxMb * 1024 * 1024, files: MAX_FILES, fields: 30 },
    fileFilter: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext) || !ALLOWED_MIME.includes(file.mimetype)) {
        return cb(
          new BadRequestException(
            `Format non accepté pour « ${file.originalname} ». Formats acceptés : PDF, Excel, CSV.`,
          ),
          false,
        );
      }
      cb(null, true);
    },
  };
}

export async function removeFiles(files: Express.Multer.File[] = []) {
  await Promise.all(files.map((f) => fs.promises.rm(f.path, { force: true })));
}
