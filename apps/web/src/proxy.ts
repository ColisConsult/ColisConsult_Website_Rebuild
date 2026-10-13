import { NextResponse, type NextRequest } from 'next/server';
import { routes } from './i18n/config';

// Doit correspondre à ADMIN_COOKIE (src/lib/admin-api.ts)
const ADMIN_COOKIE = 'cc_admin';

const enToFr = new Map<string, string>(Object.values(routes).map((r) => [r.en, r.fr]));
const frToEn = new Map<string, string>(Object.values(routes).map((r) => [r.fr, r.en]));

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Back-office : redirige vers la connexion sans cookie de session
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (pathname !== '/admin/login' && !request.cookies.has(ADMIN_COOKIE)) {
      url.pathname = '/admin/login';
      url.search = `?next=${encodeURIComponent(pathname + search)}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Image de partage générée par Next.js pour la version française
  if (pathname === '/fr/opengraph-image') return NextResponse.next();

  // Le français est servi sans préfixe : /fr/equipe → /equipe
  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const [, , first = '', ...rest] = pathname.split('/');
    if (!first) return NextResponse.next();
    // Slug français sous /en → slug anglais canonique
    const enSlug = frToEn.get(first);
    if (enSlug !== undefined && enSlug !== first) {
      url.pathname = ['/en', enSlug, ...rest].filter(Boolean).join('/');
      return NextResponse.redirect(url, 308);
    }
    const frSlug = enToFr.get(first);
    if (frSlug !== undefined && frSlug !== first) {
      url.pathname = ['/en', frSlug, ...rest].join('/');
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Chemins français : réécriture interne vers app/[lang=fr]
  url.pathname = `/fr${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Tout sauf les ressources techniques et les fichiers (extension)
    '/((?!api|_next|.*\\..*|sitemap.xml|robots.txt|icon|apple-icon).*)',
  ],
};
