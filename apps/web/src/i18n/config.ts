export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Slugs localisés. Les dossiers de `app/[lang]` portent les slugs français ;
 * `src/proxy.ts` réécrit les slugs anglais vers ces dossiers.
 * Le français est servi sans préfixe (/equipe), l'anglais sous /en (/en/team).
 */
export const routes = {
  home: { fr: '', en: '' },
  method: { fr: 'notre-mission', en: 'our-method' },
  ai: { fr: 'intelligence-artificielle', en: 'artificial-intelligence' },
  services: { fr: 'nos-offres', en: 'services' },
  clients: { fr: 'nos-clients', en: 'clients' },
  team: { fr: 'equipe', en: 'team' },
  rankings: { fr: 'palmares', en: 'ecommerce-delivery-rankings' },
  blog: { fr: 'blog', en: 'blog' },
  simulator: { fr: 'simulateur-economies', en: 'savings-simulator' },
  preAudit: { fr: 'pre-audit-transport-gratuit', en: 'free-transport-pre-audit' },
  contact: { fr: 'contact', en: 'contact' },
  legal: { fr: 'mentions-legales', en: 'legal-notice' },
} as const;

export type RouteKey = keyof typeof routes;

/** Construit l'URL publique d'une page : href('en', 'team') → /en/team */
export function href(locale: Locale, key: RouteKey, ...rest: string[]) {
  const parts = [locale === defaultLocale ? '' : locale, routes[key][locale], ...rest].filter(
    Boolean,
  );
  return `/${parts.join('/')}`;
}

/**
 * Analyse un chemin (public ou réécrit) : /en/team, /team, /fr/equipe, /equipe…
 * Utilisé pour le sélecteur de langue et l'état actif du menu : le résultat est
 * identique côté serveur (chemin réécrit) et côté client (chemin public).
 */
export function parsePath(pathname: string): {
  locale: Locale;
  key: RouteKey | null;
  rest: string[];
} {
  const segments = pathname.split('/').filter(Boolean);
  let locale: Locale = defaultLocale;
  if (segments[0] && hasLocale(segments[0])) locale = segments.shift() as Locale;
  const [first = '', ...rest] = segments;
  const key =
    (Object.keys(routes) as RouteKey[]).find(
      (k) => routes[k].fr === first || routes[k].en === first,
    ) ?? null;
  return { locale, key, rest };
}

export function alternateHref(pathname: string, target: Locale) {
  const { key, rest } = parsePath(pathname);
  return href(target, key ?? 'home', ...(key ? rest : []));
}
