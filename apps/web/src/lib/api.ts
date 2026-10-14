import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import type { Locale } from '@/i18n/config';
import fallbackContent from '@/content/fallback.json';
import { apiEndpoint } from './api-endpoint';
import type { Client, Post, PostKind, PostSummary, TeamMember, Testimonial, Webinar } from './types';

/**
 * Lecture du contenu public depuis l'API NestJS.
 * Chaque fonction est mise en cache (`use cache`) et étiquetée : le back-office
 * invalide l'étiquette après chaque modification (updateTag), et le contenu se
 * rafraîchit de toute façon chaque minute.
 * Si l'API est injoignable (pendant `next build` sans API_BUILD_URL, vitrine sans base de
 * données, panne), on affiche le contenu initial du cabinet (content/fallback.json, exporté
 * depuis seed-data.ts de l'API) plutôt que des sections vides.
 * Adresse de l'API : voir api-endpoint.ts (liaison Vercel, Docker, local).
 */
const fallback = fallbackContent as unknown as {
  testimonials: Testimonial[];
  team: TeamMember[];
  clients: Client[];
  posts: Post[];
};

function fallbackPosts(locales: string[], page: number, pageSize: number, kind?: PostKind) {
  const all = fallback.posts.filter((p) => locales.includes(p.locale) && (!kind || p.kind === kind));
  const items: PostSummary[] = all.slice((page - 1) * pageSize, page * pageSize);
  return { items, total: all.length };
}
async function get<T>(path: string, whenUnavailable: T): Promise<T> {
  try {
    const res = await fetch(apiEndpoint(path), { headers: { Accept: 'application/json' } });
    if (!res.ok) return whenUnavailable;
    return (await res.json()) as T;
  } catch {
    return whenUnavailable;
  }
}

/** Articles publiés ; `kind` : « article » (conseils) ou « news » (actualités, webinars) */
export async function getPosts(locale: Locale, page = 1, pageSize = 12, kind?: PostKind) {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts');
  // En anglais, on affiche aussi les articles français (signalés comme tels)
  const locales = locale === 'en' ? 'en,fr' : 'fr';
  return get<{ items: PostSummary[]; total: number }>(
    `/posts?locales=${locales}&page=${page}&pageSize=${pageSize}${kind ? `&kind=${kind}` : ''}`,
    fallbackPosts(locales.split(','), page, pageSize, kind),
  );
}

export async function getPost(slug: string, locale: Locale) {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts', `post:${slug}`);
  return get<Post | null>(
    `/posts/${encodeURIComponent(slug)}?locale=${locale}`,
    fallback.posts.find((p) => p.slug === slug) ?? null,
  );
}

export async function getPostSlugs() {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts');
  return get<{ slug: string; locale: string; updatedAt: string }[]>(
    '/posts/slugs',
    fallback.posts.map(({ slug, locale, updatedAt }) => ({ slug, locale, updatedAt })),
  );
}

export async function getTestimonials(featuredOnly = false) {
  'use cache';
  cacheLife('minutes');
  cacheTag('testimonials');
  return get<Testimonial[]>(
    `/testimonials${featuredOnly ? '?featured=true' : ''}`,
    featuredOnly ? fallback.testimonials.filter((t) => t.featured) : fallback.testimonials,
  );
}

export async function getClients() {
  'use cache';
  cacheLife('hours');
  cacheTag('clients');
  return get<Client[]>('/clients', fallback.clients);
}

export async function getTeam() {
  'use cache';
  cacheLife('hours');
  cacheTag('team');
  return get<TeamMember[]>('/team', fallback.team);
}

export async function getWebinars(scope: 'upcoming' | 'past' = 'upcoming') {
  'use cache';
  cacheLife('minutes');
  cacheTag('webinars');
  return get<Webinar[]>(`/webinars?scope=${scope}`, []);
}
