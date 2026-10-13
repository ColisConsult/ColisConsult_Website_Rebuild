import Link from 'next/link';
import { href, type Locale, type RouteKey } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Logo } from '../ui/logo';
import { LanguageSwitch, MobileMenu, NavLink } from './header-client';

export const NAV_KEYS: RouteKey[] = ['method', 'ai', 'services', 'clients', 'team', 'rankings', 'blog'];

export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const items = NAV_KEYS.map((key) => ({
    key,
    href: href(locale, key),
    label: t.nav[key as keyof Dictionary['nav']] as string,
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-white"
      >
        {t.nav.skip}
      </a>
      <div className="container-site flex h-[4.5rem] items-center gap-6">
        <Link href={href(locale, 'home')} aria-label="ColisConsult" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Principale" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.key}>
                <NavLink href={item.href} routeKey={item.key}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 xl:ml-2">
          <LanguageSwitch locale={locale} label={t.nav.language} />
          <Link href={href(locale, 'preAudit')} className="btn btn-primary hidden !py-2.5 sm:inline-flex">
            {t.nav.cta}
          </Link>
          <MobileMenu
            items={items}
            cta={{ href: href(locale, 'preAudit'), label: t.nav.cta }}
            labels={{ menu: t.nav.menu, close: t.nav.close }}
          />
        </div>
      </div>
    </header>
  );
}
