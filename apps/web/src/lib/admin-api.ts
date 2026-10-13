import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const ADMIN_COOKIE = 'cc_admin';
const API_URL = (process.env.API_URL ?? 'http://localhost:4000/api').replace(/\/$/, '');

export class AdminApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function getAdminToken() {
  return (await cookies()).get(ADMIN_COOKIE)?.value;
}

/** Appel authentifié à l'API (rendu serveur du back-office et server actions) */
export async function adminFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await getAdminToken();
  if (!token) redirect('/admin/login');
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (res.status === 401) redirect('/admin/login?expired=1');
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(data?.message) ? data.message.join(' · ') : (data?.message ?? res.statusText);
    throw new AdminApiError(res.status, message);
  }
  return (await res.json()) as T;
}

export function apiUrl(path: string) {
  return `${API_URL}${path}`;
}
