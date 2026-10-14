import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * Sur Vercel (vitrine de démonstration), le site n'est pas indexé : il reprend le contenu
 * du site en ligne et ne doit pas lui faire concurrence. ALLOW_INDEXING=1 lève ce blocage
 * le jour où Vercel sert le vrai domaine.
 */
const noIndex = !!process.env.VERCEL && process.env.ALLOW_INDEXING !== '1';

export default function robots(): MetadataRoute.Robots {
  if (noIndex) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
