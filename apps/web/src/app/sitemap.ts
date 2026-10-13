import type { MetadataRoute } from 'next';
import { href, locales, routes, type RouteKey } from '@/i18n/config';
import { getPostSlugs } from '@/lib/api';
import { site } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = (Object.keys(routes) as RouteKey[]).filter((k) => k !== 'legal');
  const entries: MetadataRoute.Sitemap = pages.map((key) => ({
    url: `${site.url}${href('fr', key)}`,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${href(l, key)}`])) },
    changeFrequency: key === 'blog' ? 'weekly' : 'monthly',
    priority: key === 'home' ? 1 : key === 'preAudit' ? 0.9 : 0.7,
  }));
  const posts = await getPostSlugs();
  for (const p of posts) {
    entries.push({
      url: `${site.url}${href('fr', 'blog', p.slug)}`,
      lastModified: p.updatedAt,
      changeFrequency: 'yearly',
      priority: 0.5,
    });
  }
  return entries;
}
