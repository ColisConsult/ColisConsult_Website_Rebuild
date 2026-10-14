import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import type { Locale } from '@/i18n/config';
import { apiEndpoint } from './api-endpoint';
import type { Client, Post, PostSummary, TeamMember, Testimonial, Webinar } from './types';

/**
 * Lecture du contenu public depuis l'API NestJS.
 * Chaque fonction est mise en cache (`use cache`) et étiquetée : le back-office
 * invalide l'étiquette après chaque modification (updateTag), et le contenu se
 * rafraîchit de toute façon chaque minute.
 * Si l'API est injoignable (ex. pendant `next build` sans API_BUILD_URL), on renvoie
 * une valeur vide plutôt que de faire échouer le rendu.
 * Adresse de l'API : voir api-endpoint.ts (liaison Vercel, Docker, local).
 */
async function get<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(apiEndpoint(path), { headers: { Accept: 'application/json' } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function getPosts(locale: Locale, page = 1, pageSize = 12) {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts');
  // En anglais, on affiche aussi les articles français (signalés comme tels)
  const locales = locale === 'en' ? 'en,fr' : 'fr';
  return get<{ items: PostSummary[]; total: number }>(
    `/posts?locales=${locales}&page=${page}&pageSize=${pageSize}`,
    { items: [], total: 0 },
  );
}

export async function getPost(slug: string, locale: Locale) {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts', `post:${slug}`);
  return get<Post | null>(`/posts/${encodeURIComponent(slug)}?locale=${locale}`, null);
}

export async function getPostSlugs() {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts');
  return get<{ slug: string; locale: string; updatedAt: string }[]>('/posts/slugs', []);
}

export async function getTestimonials(featuredOnly = false) {
  'use cache';
  cacheLife('minutes');
  cacheTag('testimonials');
  return get<Testimonial[]>(`/testimonials${featuredOnly ? '?featured=true' : ''}`, []);
}

export async function getClients() {
  'use cache';
  cacheLife('hours');
  cacheTag('clients');
  return get<Client[]>('/clients', []);
}

export async function getTeam() {
  'use cache';
  cacheLife('hours');
  cacheTag('team');
  return get<TeamMember[]>('/team', []);
}

export async function getWebinars(scope: 'upcoming' | 'past' = 'upcoming') {
  'use cache';
  cacheLife('minutes');
  cacheTag('webinars');
  return get<Webinar[]>(`/webinars?scope=${scope}`, []);
}
