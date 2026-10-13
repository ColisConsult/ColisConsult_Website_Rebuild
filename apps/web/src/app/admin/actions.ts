'use server';

import { updateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, AdminApiError, adminFetch, apiUrl } from '@/lib/admin-api';
import { parisInputToIso } from '@/lib/paris-time';

export type ActionState = { error?: string; ok?: boolean };

const str = (fd: FormData, key: string) => {
  const v = fd.get(key);
  return typeof v === 'string' ? v.trim() : '';
};
const errorMessage = (e: unknown) =>
  e instanceof AdminApiError ? e.message : 'Une erreur est survenue. Réessayez.';

// --- Session ---

export async function login(_: ActionState, formData: FormData): Promise<ActionState> {
  let token: string;
  try {
    const res = await fetch(apiUrl('/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: str(formData, 'email'), password: formData.get('password') }),
      cache: 'no-store',
    });
    if (res.status === 429) return { error: 'Trop de tentatives. Réessayez dans quelques minutes.' };
    if (!res.ok) return { error: 'E-mail ou mot de passe incorrect.' };
    token = ((await res.json()) as { accessToken: string }).accessToken;
  } catch {
    return { error: 'L’API est injoignable. Vérifiez qu’elle est démarrée.' };
  }
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: 8 * 60 * 60,
  });
  const next = str(formData, 'next');
  redirect(next.startsWith('/admin') && !next.startsWith('/admin/login') ? next : '/admin');
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: '/admin' });
  redirect('/admin/login');
}

// --- Articles ---

export async function savePost(id: string | null, _: ActionState, fd: FormData): Promise<ActionState> {
  const body = {
    title: str(fd, 'title'),
    slug: str(fd, 'slug'),
    locale: str(fd, 'locale') || 'fr',
    excerpt: str(fd, 'excerpt'),
    content: String(fd.get('content') ?? ''),
    coverImageUrl: str(fd, 'coverImageUrl'),
    status: str(fd, 'status') || 'draft',
    publishedAt: str(fd, 'publishedAt') ? parisInputToIso(str(fd, 'publishedAt')) : null,
  };
  try {
    await adminFetch(id ? `/admin/posts/${id}` : '/admin/posts', {
      method: id ? 'PATCH' : 'POST',
      body: JSON.stringify(body),
    });
  } catch (e) {
    return { error: errorMessage(e) };
  }
  updateTag('posts');
  redirect('/admin/articles?saved=1');
}

export async function deletePost(id: string) {
  await adminFetch(`/admin/posts/${id}`, { method: 'DELETE' });
  updateTag('posts');
  redirect('/admin/articles');
}

// --- Témoignages ---

export async function saveTestimonial(id: string | null, _: ActionState, fd: FormData): Promise<ActionState> {
  const body = {
    company: str(fd, 'company'),
    author: str(fd, 'author'),
    role: str(fd, 'role'),
    quoteFr: str(fd, 'quoteFr'),
    quoteEn: str(fd, 'quoteEn'),
    quoteLang: str(fd, 'quoteLang') || 'fr',
    missionFr: str(fd, 'missionFr'),
    missionEn: str(fd, 'missionEn'),
    resultFr: str(fd, 'resultFr'),
    resultEn: str(fd, 'resultEn'),
    segment: str(fd, 'segment') || 'enterprise',
    featured: fd.get('featured') === 'on',
    sortOrder: Number(str(fd, 'sortOrder') || 0),
  };
  try {
    await adminFetch(id ? `/admin/testimonials/${id}` : '/admin/testimonials', {
      method: id ? 'PATCH' : 'POST',
      body: JSON.stringify(body),
    });
  } catch (e) {
    return { error: errorMessage(e) };
  }
  updateTag('testimonials');
  redirect('/admin/temoignages?saved=1');
}

export async function deleteTestimonial(id: string) {
  await adminFetch(`/admin/testimonials/${id}`, { method: 'DELETE' });
  updateTag('testimonials');
  redirect('/admin/temoignages');
}

// --- Webinars ---

export async function saveWebinar(id: string | null, _: ActionState, fd: FormData): Promise<ActionState> {
  const startsAt = str(fd, 'startsAt');
  const body = {
    titleFr: str(fd, 'titleFr'),
    titleEn: str(fd, 'titleEn'),
    descriptionFr: str(fd, 'descriptionFr'),
    descriptionEn: str(fd, 'descriptionEn'),
    // Saisie en heure de Paris
    startsAt: startsAt ? parisInputToIso(startsAt) : '',
    durationMinutes: Number(str(fd, 'durationMinutes') || 45),
    registrationUrl: str(fd, 'registrationUrl'),
    replayUrl: str(fd, 'replayUrl'),
    published: fd.get('published') === 'on',
  };
  try {
    await adminFetch(id ? `/admin/webinars/${id}` : '/admin/webinars', {
      method: id ? 'PATCH' : 'POST',
      body: JSON.stringify(body),
    });
  } catch (e) {
    return { error: errorMessage(e) };
  }
  updateTag('webinars');
  redirect('/admin/webinars?saved=1');
}

export async function deleteWebinar(id: string) {
  await adminFetch(`/admin/webinars/${id}`, { method: 'DELETE' });
  updateTag('webinars');
  redirect('/admin/webinars');
}

// --- Demandes ---

export async function updateLead(id: string, _: ActionState, fd: FormData): Promise<ActionState> {
  try {
    await adminFetch(`/admin/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: str(fd, 'status'), notes: String(fd.get('notes') ?? '') }),
    });
  } catch (e) {
    return { error: errorMessage(e) };
  }
  return { ok: true };
}

export async function deleteLead(id: string) {
  await adminFetch(`/admin/leads/${id}`, { method: 'DELETE' });
  redirect('/admin/demandes');
}
