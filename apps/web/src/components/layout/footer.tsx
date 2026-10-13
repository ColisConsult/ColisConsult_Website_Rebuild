import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import onePercent from '@/assets/one-percent-member-white.png';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { ArrowUpRight } from '../ui/icons';
import { Logo } from '../ui/logo';

export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const firm = [
    { label: t.nav.method, href: href(locale, 'method') },
    { label: t.nav.ai, href: href(locale, 'ai') },
    { label: t.nav.services, href: href(locale, 'services') },
    { label: t.nav.clients, href: href(locale, 'clients') },
    { label: t.nav.team, href: href(locale, 'team') },
  ];
  const resources = [
    { label: t.nav.rankings, href: href(locale, 'rankings') },
    { label: t.nav.blog, href: href(locale, 'blog') },
    { label: t.footer.webinars, href: `${href(locale, 'blog')}#webinars` },
    { label: t.footer.simulator, href: href(locale, 'simulator') },
    { label: t.nav.cta, href: href(locale, 'preAudit') },
  ];

  return (
    <footer className="on-dark bg-teal-950 text-white/80">
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" className="h-10 w-auto" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/65">{t.footer.tagline}</p>
            <a
              href={site.onePercent}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex max-w-sm items-center gap-4 text-sm text-white/65 hover:text-white/85"
            >
              <Image src={onePercent} alt="1% for the Planet, membre" className="h-11 w-auto shrink-0" />
              <span>{t.footer.commitment}</span>
            </a>
          </div>

          <FooterColumn title={t.footer.firm} links={firm} />
          <FooterColumn title={t.footer.resources} links={resources} />

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-medium text-white">{t.footer.contact}</h2>
            <address className="mt-4 space-y-1 text-[0.95rem] not-italic leading-relaxed">
              <p>{site.address.street}</p>
              <p>
                {site.address.postalCode} {site.address.city}
              </p>
              <p className="pt-3">
                <a href={site.phoneHref} className="link">
                  {locale === 'fr' ? site.phone : site.phoneIntl}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </p>
            </address>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {[
                ['LinkedIn', site.linkedin],
                ['YouTube', site.youtube],
                ['Calendly', site.calendly],
              ].map(([label, url]) => (
                <li key={label}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                    {label}
                    <ArrowUpRight />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/12 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> ColisConsult. {t.footer.rights}
          </p>
          <Link href={href(locale, 'legal')} className="hover:text-white">
            {t.footer.legal}
          </Link>
        </div>
      </div>
    </footer>
  );
}

/** Année courante, mise en cache une journée (Cache Components impose de cadrer Date) */
async function CurrentYear() {
  'use cache';
  cacheLife('days');
  return <>{new Date().getFullYear()}</>;
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="lg:col-span-2">
      <h2 className="font-display text-sm font-medium text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
