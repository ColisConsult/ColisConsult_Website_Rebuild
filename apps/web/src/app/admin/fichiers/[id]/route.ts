import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, apiUrl } from '@/lib/admin-api';

/** Téléchargement d'une facture déposée : relais authentifié vers l'API */
export async function GET(request: Request, { params }: RouteContext<'/admin/fichiers/[id]'>) {
  const { id } = await params;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return NextResponse.redirect(new URL('/admin/login', request.url));
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new NextResponse('Not found', { status: 404 });

  const res = await fetch(apiUrl(`/admin/files/${id}`), {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (res.status === 401) return NextResponse.redirect(new URL('/admin/login?expired=1', request.url));
  if (!res.ok || !res.body) return new NextResponse('Fichier introuvable', { status: res.status });

  return new NextResponse(res.body, {
    headers: {
      'Content-Type': res.headers.get('content-type') ?? 'application/octet-stream',
      'Content-Disposition': res.headers.get('content-disposition') ?? 'attachment',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, no-store',
    },
  });
}
