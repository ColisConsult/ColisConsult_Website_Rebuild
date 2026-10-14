import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import portrait from '@/assets/photos/matthieu-portrait.jpg';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { Aurora } from '../motion/primitives';
import { ArrowRight, ArrowUpRight } from '../ui/icons';

/** Appel à l'action final : grand panneau sombre animé, avec un interlocuteur nommé et joignable. */
export function CtaBand({ t, locale, on = 'white' }: { t: Dictionary; locale: Locale; on?: 'white' | 'mist' }) {
  return (
    <section className={on === 'mist' ? 'bg-mist px-2 py-2 sm:px-3 sm:py-3' : 'bg-white px-2 py-2 sm:px-3 sm:py-3'}>
      <div
        data-tone="dark"
        data-spotlight=""
        className="surface-night on-dark rounded-[1.75rem] px-1 py-20 md:rounded-[2.5rem] md:py-28"
      >
        <Aurora variant="cta" />
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="pointer-glow" aria-hidden="true" />

        <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 data-reveal="blur" className="max-w-[14ch] text-mega tracking-[-0.045em] text-white">
              {t.home.final.title}
            </h2>
            <p data-reveal="" style={{ '--d': '150ms' } as CSSProperties} className="mt-7 max-w-xl text-lg text-white/70 md:text-xl">
              {t.home.final.text}
            </p>
            <div data-reveal="" style={{ '--d': '250ms' } as CSSProperties} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={href(locale, 'preAudit')} data-magnetic="" className="btn btn-primary btn-lg">
                {t.home.hero.ctaPrimary}
                <ArrowRight className="size-4" />
              </Link>
              <Link href={href(locale, 'simulator')} className="btn btn-ghost btn-lg">
                {t.home.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div data-reveal="right" className="card-glass flex items-center gap-5 p-5 lg:col-span-4">
            <Image
              src={portrait}
              alt=""
              width={96}
              height={96}
              className="size-20 shrink-0 rounded-full object-cover object-top ring-2 ring-white/15"
              sizes="96px"
            />
            <div>
              <p className="font-display text-lg font-semibold text-white">Matthieu Erly</p>
              <p className="text-sm text-white/60">{t.contact.founderRole}</p>
              <a href={site.phoneHref} className="mt-2 block font-display text-lg font-medium text-white tabular-nums transition-colors hover:text-coral">
                {locale === 'fr' ? site.phone : site.phoneIntl}
              </a>
              <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="link mt-0.5 inline-block text-sm text-white/80">
                {t.common.bookMeeting}
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
