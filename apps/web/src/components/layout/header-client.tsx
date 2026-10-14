'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { alternateHref, locales, parsePath, type Locale, type RouteKey } from '@/i18n/config';
import { cn } from '@/lib/cn';
import { ArrowRight } from '../ui/icons';

/*
 * parsePath() donne le même résultat pour le chemin réécrit (serveur) et le
 * chemin public (navigateur) : pas d'écart d'hydratation.
 */
function useCurrentRoute() {
  const pathname = usePathname() ?? '/';
  return { pathname, ...parsePath(pathname) };
}

export function NavLink({ href, routeKey, children }: { href: string; routeKey: RouteKey; children: ReactNode }) {
  const { key } = useCurrentRoute();
  const active = key === routeKey;
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative block rounded-full px-3.5 py-2 font-display text-[0.93rem] font-medium transition-colors duration-300',
        'opacity-85 hover:opacity-100',
        'group-data-[on=dark]/header:hover:bg-white/10 group-data-[on=light]/header:hover:bg-teal-50',
        active && 'opacity-100 group-data-[on=dark]/header:bg-white/12 group-data-[on=light]/header:bg-teal-50 group-data-[on=light]/header:text-teal',
      )}
    >
      {children}
      {active && <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-coral" aria-hidden="true" />}
    </Link>
  );
}

export function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const { pathname } = useCurrentRoute();
  return (
    <div role="group" aria-label={label} className="flex items-center font-display text-sm font-medium">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 opacity-30" aria-hidden="true">/</span>}
          {l === locale ? (
            <span aria-current="true">{l.toUpperCase()}</span>
          ) : (
            // Lien classique : changer de langue change de layout racine (navigation complète, sans préchargement)
            <a href={alternateHref(pathname, l)} hrefLang={l} lang={l} className="opacity-55 transition-opacity hover:opacity-100">
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}

const noop = () => () => {};
/** Vrai une fois côté navigateur (le menu est rendu dans <body> par un portail) */
function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

export function MobileMenu({
  items,
  cta,
  phone,
  labels,
}: {
  items: { key: RouteKey; href: string; label: string }[];
  cta: { href: string; label: string };
  phone: { href: string; label: string };
  labels: { menu: string; close: string };
}) {
  const [open, setOpen] = useState(false);
  const { pathname, key } = useCurrentRoute();
  const isClient = useIsClient();

  // Ferme le menu à chaque navigation (ajustement d'état pendant le rendu)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute('data-menu-open', open);
    root.style.overflow = open ? 'hidden' : '';
    // L'en-tête passe en version « sombre » au-dessus du menu, puis se recalcule à la fermeture
    if (open) document.querySelector('[data-header]')?.setAttribute('data-on', 'dark');
    else window.dispatchEvent(new Event('scroll'));
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) window.addEventListener('keydown', onKey);
    return () => {
      root.removeAttribute('data-menu-open');
      root.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        className={cn(
          'flex h-11 items-center gap-2.5 rounded-full px-4 font-display text-sm font-medium transition-colors',
          'group-data-[on=dark]/header:bg-white/10 group-data-[on=light]/header:bg-teal-50',
        )}
      >
        <span className="relative block h-2.5 w-4" aria-hidden="true">
          <span className={cn('absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300', open ? 'top-1 rotate-45' : 'top-0')} />
          <span className={cn('absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300', open ? 'top-1 -rotate-45' : 'top-2')} />
        </span>
        {open ? labels.close : labels.menu}
      </button>

      {isClient &&
        createPortal(
      <div
        id="menu-mobile"
        inert={!open}
        data-lenis-prevent=""
        className={cn(
          'surface-night fixed inset-0 z-[65] overflow-y-auto transition-[opacity,visibility,clip-path] duration-700 ease-[var(--ease-out-expo)]',
          open ? 'visible opacity-100 [clip-path:circle(150%_at_100%_0)]' : 'invisible opacity-0 [clip-path:circle(0%_at_100%_0)]',
        )}
      >
        <div className="aurora" aria-hidden="true">
          <span className="aurora-coral" style={{ width: '80vw', height: '80vw', right: '-30vw', top: '-20vw' }} />
          <span className="aurora-teal" style={{ width: '90vw', height: '90vw', left: '-40vw', bottom: '-30vw' }} />
        </div>
        <nav className="container-site flex min-h-full flex-col pt-28 pb-10" aria-label="Mobile">
          <ul>
            {items.map((item, i) => (
              <li
                key={item.key}
                className={cn(
                  'border-b border-white/10 transition-[opacity,translate] duration-700 ease-[var(--ease-out-expo)]',
                  open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                )}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' } as CSSProperties}
              >
                <Link
                  href={item.href}
                  aria-current={key === item.key ? 'page' : undefined}
                  className="flex items-center justify-between py-4 font-display text-[2rem] leading-tight font-medium tracking-tight text-white"
                >
                  {item.label}
                  {key === item.key ? (
                    <span className="size-2.5 rounded-full bg-coral" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="size-5 text-white/40" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={cn(
              'mt-auto pt-10 transition-[opacity,translate] delay-500 duration-700',
              open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <Link href={cta.href} className="btn btn-primary btn-lg w-full">
              {cta.label}
              <ArrowRight className="size-4" />
            </Link>
            <a href={phone.href} className="btn btn-ghost mt-3 w-full tabular-nums">
              {phone.label}
            </a>
          </div>
        </nav>
      </div>,
          document.body,
        )}
    </div>
  );
}
