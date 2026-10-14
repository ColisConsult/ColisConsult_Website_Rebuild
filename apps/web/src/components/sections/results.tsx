import type { CSSProperties } from 'react';
import type { Locale } from '@/i18n/config';
import { href } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { clientLogos, normalizeName } from '@/lib/client-logos';
import type { Testimonial } from '@/lib/types';
import { CountUp } from '../motion/count-up';
import { TextLink } from '../ui/text-link';
import { LogoItem } from './logo-band';
import { quoteFor } from './testimonials';

/** Sépare « −19 % sans changer de transporteur » en chiffre + libellé. */
export function splitResult(result: string) {
  const m = result.match(/^(?:plus de\s+|more than\s+)?([−–+-]?\s?\d+(?:[.,]\d+)?\s?%)\s*(.*)$/i);
  if (!m) return { figure: null, label: result };
  return { figure: m[1].replace(/\s/g, ' ').replace(/^[-–]/, '−'), label: m[2] };
}

export function logoFor(company: string) {
  const key = normalizeName(company);
  return clientLogos.find((l) => normalizeName(l.name) === key || key.startsWith(normalizeName(l.name)));
}

/**
 * Section « résultats » de l'accueil : elle glisse par-dessus le hero sombre (coins arrondis),
 * avec trois repères chiffrés puis les résultats de clients nommés.
 */
export function ResultsSection({ items, t, locale }: { items: Testimonial[]; t: Dictionary; locale: Locale }) {
  const r = t.home.results;
  return (
    <section className="relative z-10 -mt-8 rounded-t-[2rem] bg-white pt-16 pb-16 md:-mt-12 md:rounded-t-[3rem] md:pt-24 md:pb-24">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="max-w-3xl">
            <h2 data-reveal="" className="text-headline">
              {r.title}
            </h2>
            <p data-reveal="" style={{ '--d': '120ms' } as CSSProperties} className="mt-4 text-lg text-ink-soft">
              {r.lead}
            </p>
          </div>
          <TextLink href={href(locale, 'clients')}>{r.more}</TextLink>
        </div>

        <dl data-stagger="" className="mt-12 grid gap-x-10 gap-y-8 border-y border-line py-10 md:mt-14 lg:grid-cols-3">
          {r.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-2">
              <dt className="max-w-[17rem] text-ink-soft">{s.label}</dt>
              <dd className="figure text-[clamp(2rem,1.4rem+1.5vw,2.8rem)] text-teal xl:whitespace-nowrap">
                {s.count ? <CountUp value={s.value} /> : s.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 md:mt-14">
          <ResultCards items={items} locale={locale} t={t} />
        </div>
      </div>
    </section>
  );
}

/** Résultats chiffrés de clients nommés : le chiffre, la phrase du client, son nom. */
export function ResultCards({ items, locale, t }: { items: Testimonial[]; locale: Locale; t: Dictionary }) {
  const withFigures = items
    .map((item) => {
      const result = (locale === 'en' ? (item.resultEn ?? item.resultFr) : item.resultFr) ?? '';
      return { item, ...splitResult(result) };
    })
    .filter((r) => r.figure);
  if (!withFigures.length) return null;

  return (
    <ul data-stagger="" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {withFigures.slice(0, 3).map(({ item, figure, label }) => {
        const { text, translated } = quoteFor(item, locale);
        const logo = logoFor(item.company);
        return (
          <li key={item.id}>
            <article data-spotlight="" className="card card-lift spot spot-mint flex h-full flex-col p-7 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="figure text-[clamp(3.2rem,2.6rem+2vw,4.4rem)] text-gradient-teal">
                  <CountUp value={figure ?? ''} />
                </p>
                {logo && <LogoItem logo={logo} base={24} className="mt-2 shrink-0" />}
              </div>
              <p className="mt-3 font-display font-medium">{label}</p>
              <blockquote className="mt-5 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">
                {locale === 'fr' ? '« ' : '“'}
                {text}
                {locale === 'fr' ? ' »' : '”'}
              </blockquote>
              <footer className="mt-6 border-t border-line pt-5 text-sm">
                <span className="font-medium">{item.author}</span>
                <span className="block text-ink-soft">
                  {item.role}, {item.company}
                </span>
                {translated && <span className="mt-1 block text-xs text-ink-faint">{t.common.translatedFrom[item.quoteLang]}</span>}
              </footer>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
