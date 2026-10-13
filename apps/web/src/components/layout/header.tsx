import Link from 'next/link';
import { href, type Locale, type RouteKey } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { Logo } from '../ui/logo';
import { LanguageSwitch, MobileMenu, NavLink } from './header-client';

/** Six entrées maximum : le palmarès et le simulateur sont accessibles depuis l'accueil et le pied de page. */
export const NAV_KEYS: RouteKey[] = ['method', 'ai', 'services', 'clients', 'team', 'blog'];

export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const items = NAV_KEYS.map((key) => ({
    key,
    href: href(locale, key),
    label: t.nav[key as keyof Dictionary['nav']] as string,
  }));
  const phone = locale === 'fr' ? site.phone : site.phoneIntl;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-white"
      >
        {t.nav.skip}
      </a>
      <div className="container-site flex h-[4.5rem] items-center gap-6">
        <Link href={href(locale, 'home')} aria-label="ColisConsult" className="shrink-0">
          <Logo className="h-9 w-auto sm:h-10" />
        </Link>

        <nav aria-label={locale === 'fr' ? 'Principale' : 'Main'} className="ml-auto hidden lg:block">
          <ul className="flex items-center">
            {items.map((item) => (
              <li key={item.key}>
                <NavLink href={item.href} routeKey={item.key}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4 lg:ml-2">
          <a
            href={site.phoneHref}
            className="hidden font-display text-[0.94rem] font-medium whitespace-nowrap text-ink tabular-nums hover:text-teal xl:block"
          >
            {phone}
          </a>
          <LanguageSwitch locale={locale} label={t.nav.language} />
          <Link href={href(locale, 'preAudit')} className="btn btn-primary btn-sm hidden sm:inline-flex">
            {t.nav.cta}
          </Link>
          <MobileMenu
            items={items}
            cta={{ href: href(locale, 'preAudit'), label: t.nav.cta }}
            phone={{ href: site.phoneHref, label: phone }}
            labels={{ menu: t.nav.menu, close: t.nav.close }}
          />
        </div>
      </div>
    </header>
  );
}
