import type { Metadata } from 'next';
import { href, type Locale, type RouteKey } from '@/i18n/config';

/** Métadonnées d'une page : titre, description, canonique et versions linguistiques */
export function pageMetadata(
  locale: Locale,
  key: RouteKey,
  title: string,
  description: string,
  ...rest: string[]
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: href(locale, key, ...rest),
      languages: {
        fr: href('fr', key, ...rest),
        en: href('en', key, ...rest),
        'x-default': href('fr', key, ...rest),
      },
    },
    openGraph: { title, description },
  };
}
