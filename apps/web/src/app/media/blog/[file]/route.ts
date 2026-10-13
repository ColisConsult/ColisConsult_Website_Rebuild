import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Images du blog importées depuis WordPress quand le site tourne sous Docker :
 * l'API les copie dans le volume partagé « media », le site les lit ici (MEDIA_DIR).
 * En développement (npm run dev), elles sont dans public/uploads/blog et cette route n'est pas utilisée.
 */
const TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
};

export async function GET(_request: Request, { params }: RouteContext<'/media/blog/[file]'>) {
  const { file } = await params;
  const dir = process.env.MEDIA_DIR;
  const type = TYPES[path.extname(file).toLowerCase()];
  if (!dir || !type || !/^[a-zA-Z0-9._-]+$/.test(file) || file.startsWith('.')) {
    return new Response('Not found', { status: 404 });
  }
  try {
    const data = await readFile(path.join(dir, 'blog', file));
    return new Response(data, {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=604800',
        'X-Content-Type-Options': 'nosniff',
        ...(type === 'image/svg+xml' ? { 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'" } : {}),
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
