import type { CSSProperties } from 'react';
import type { Locale } from '@/i18n/config';
import { href } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Testimonial } from '@/lib/types';
import { CountUp } from '../motion/count-up';
import { TextLink } from '../ui/text-link';
import { splitResult, TestimonialCard } from './testimonials';

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

/** Les trois témoignages mis en avant : clients nommés avec un résultat chiffré. */
export function topResults(items: Testimonial[], locale: Locale) {
  return items
    .filter((item) => {
      const result = (locale === 'en' ? (item.resultEn ?? item.resultFr) : item.resultFr) ?? '';
      return item.featured && splitResult(result).figure;
    })
    .slice(0, 3);
}

/** Témoignages de clients nommés avec un résultat chiffré (trois au plus). */
export function ResultCards({ items, locale, t }: { items: Testimonial[]; locale: Locale; t: Dictionary }) {
  const top = topResults(items, locale);
  if (!top.length) return null;

  return (
    <ul data-stagger="" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {top.map((item) => (
        <li key={item.id}>
          <TestimonialCard item={item} locale={locale} t={t} featured />
        </li>
      ))}
    </ul>
  );
}
