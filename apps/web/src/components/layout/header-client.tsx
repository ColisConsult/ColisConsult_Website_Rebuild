'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { alternateHref, locales, parsePath, type Locale, type RouteKey } from '@/i18n/config';
import { cn } from '@/lib/cn';

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
        'relative rounded px-3 py-2 font-display text-[0.94rem] font-medium transition-colors',
        active ? 'text-teal' : 'text-ink hover:text-teal',
      )}
    >
      {children}
      {active && <span className="absolute inset-x-3 -bottom-[1.14rem] h-[3px] rounded-t bg-coral" aria-hidden="true" />}
    </Link>
  );
}

export function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const { pathname } = useCurrentRoute();
  return (
    <div role="group" aria-label={label} className="flex items-center font-display text-sm font-medium">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1.5 text-line-strong" aria-hidden="true">/</span>}
          {l === locale ? (
            <span className="text-ink" aria-current="true">
              {l.toUpperCase()}
            </span>
          ) : (
            // Lien classique : changer de langue change de layout racine (navigation complète, sans préchargement)
            <a href={alternateHref(pathname, l)} hrefLang={l} lang={l} className="text-ink-faint transition-colors hover:text-ink">
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );
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

  // Ferme le menu à chaque navigation (ajustement d'état pendant le rendu)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        className="flex h-10 items-center gap-2 rounded-lg border border-line-strong px-3 font-display text-sm font-medium"
      >
        <span className="relative block h-2.5 w-4" aria-hidden="true">
          <span className={cn('absolute left-0 h-px w-4 bg-ink transition-transform', open ? 'top-1 rotate-45' : 'top-0')} />
          <span className={cn('absolute left-0 h-px w-4 bg-ink transition-transform', open ? 'top-1 -rotate-45' : 'top-2')} />
        </span>
        {open ? labels.close : labels.menu}
      </button>
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-white"
      >
        <nav className="container-site py-8" aria-label="Mobile">
          <ul className="divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={key === item.key ? 'page' : undefined}
                  className="flex items-center justify-between py-4 font-display text-2xl font-medium tracking-tight"
                >
                  {item.label}
                  {key === item.key && <span className="size-2 rounded-full bg-coral" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={cta.href} className="btn btn-primary mt-8 w-full justify-center">
            {cta.label}
          </Link>
          <a href={phone.href} className="btn btn-outline mt-3 w-full justify-center tabular-nums">
            {phone.label}
          </a>
        </nav>
      </div>
    </div>
  );
}
