import Link from 'next/link';
import { href, type Locale, type RouteKey } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { ArrowRight } from '../ui/icons';
import { Logo } from '../ui/logo';
import { LanguageSwitch, MobileMenu, NavLink } from './header-client';

/** Six entrées maximum : le palmarès et le simulateur sont accessibles depuis l'accueil et le pied de page. */
export const NAV_KEYS: RouteKey[] = ['method', 'ai', 'services', 'clients', 'team', 'blog'];

/*
 * En-tête flottant en forme de pilule. Le runtime d'animation pose :
 *  - data-on="dark|light" selon la section qui passe dessous (sections data-tone="dark") ;
 *  - data-scrolled dès qu'on a quitté le haut de page ;
 *  - data-hidden en descendant (il réapparaît dès qu'on remonte).
 * Toutes les pages commencent par une surface sombre : « dark » par défaut.
 */
export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const items = NAV_KEYS.map((key) => ({
    key,
    href: href(locale, key),
    label: t.nav[key as keyof Dictionary['nav']] as string,
  }));
  const phone = locale === 'fr' ? site.phone : site.phoneIntl;

  return (
    <>
      <div
        data-scroll-progress=""
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-coral via-coral to-mint"
        aria-hidden="true"
      />
      <header
        data-header=""
        data-on="dark"
        className="group/header fixed inset-x-0 top-0 z-50 pt-3 transition-transform duration-500 ease-[var(--ease-out-soft)] data-[hidden]:-translate-y-[130%] md:pt-4"
      >
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-white"
        >
          {t.nav.skip}
        </a>
        <div className="container-site">
          <div
            className={[
              'flex h-[3.75rem] items-center gap-4 rounded-full pr-2 pl-5 backdrop-blur-xl transition-[background-color,box-shadow,color] duration-500 md:h-16',
              // sur fond sombre
              'group-data-[on=dark]/header:bg-white/[0.06] group-data-[on=dark]/header:text-white group-data-[on=dark]/header:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]',
              'group-data-[on=dark]/header:group-data-[scrolled]/header:bg-night/70',
              // sur fond clair
              'group-data-[on=light]/header:bg-white/80 group-data-[on=light]/header:text-ink group-data-[on=light]/header:shadow-[inset_0_0_0_1px_rgb(13_82_87/0.1),0_10px_40px_-18px_rgb(7_47_50/0.35)]',
            ].join(' ')}
          >
            <Link href={href(locale, 'home')} aria-label="ColisConsult" className="shrink-0">
              <Logo tone="current" className="h-8 w-auto sm:h-9" />
            </Link>

            <nav aria-label={locale === 'fr' ? 'Principale' : 'Main'} className="ml-auto hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {items.map((item) => (
                  <li key={item.key}>
                    <NavLink href={item.href} routeKey={item.key}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-3 lg:ml-3">
              <a
                href={site.phoneHref}
                className="hidden font-display text-[0.92rem] font-medium whitespace-nowrap tabular-nums opacity-80 transition-opacity hover:opacity-100 xl:block"
              >
                {phone}
              </a>
              <LanguageSwitch locale={locale} label={t.nav.language} />
              <Link href={href(locale, 'preAudit')} data-magnetic="" className="btn btn-primary btn-sm hidden sm:inline-flex">
                {t.nav.cta}
                <ArrowRight className="size-4" />
              </Link>
              <MobileMenu
                items={items}
                cta={{ href: href(locale, 'preAudit'), label: t.nav.cta }}
                phone={{ href: site.phoneHref, label: phone }}
                labels={{ menu: t.nav.menu, close: t.nav.close }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
