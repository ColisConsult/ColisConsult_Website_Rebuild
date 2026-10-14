import type { CSSProperties } from 'react';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { CountUp } from '../motion/count-up';
import { ScrubText } from '../motion/primitives';
import { TextLink } from '../ui/text-link';

/**
 * Rémunération au résultat : la promesse s'allume mot à mot au défilement,
 * puis les quatre faits se lisent comme une frise (de 0 € à 100 % pour vous).
 */
export function PricingBand({ t, locale }: { t: Dictionary; locale: Locale }) {
  const m = t.home.model;
  return (
    <section className="relative overflow-clip bg-white py-24 md:py-36">
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative container-site">
        <ScrubText as="h2" text={m.title} className="max-w-[13ch] font-display text-mega font-medium tracking-[-0.045em] text-ink" />

        <div className="seq relative mt-16 md:mt-24">
          <span className="absolute top-[0.6rem] right-0 left-0 hidden h-px bg-line-strong md:block" aria-hidden="true" />
          <span
            data-bar=""
            className="absolute top-[0.6rem] right-0 left-0 hidden h-px bg-gradient-to-r from-coral via-coral to-mint md:block"
            style={{ '--d': '200ms', transitionDuration: '2.2s' } as CSSProperties}
            aria-hidden="true"
          />
          <dl data-stagger="" className="relative grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
            {m.facts.map((f, i) => (
              <div key={f.value}>
                <span className="flex size-5 items-center justify-center rounded-full bg-white ring-1 ring-line-strong" aria-hidden="true">
                  <span className={i === m.facts.length - 1 ? 'size-2 rounded-full bg-mint' : 'size-2 rounded-full bg-coral'} />
                </span>
                <dt className="figure mt-6 text-[clamp(2.6rem,2rem+1.8vw,3.8rem)]">
                  <CountUp value={f.value} delay={300 + i * 250} className={i === m.facts.length - 1 ? 'text-mint-ink' : 'text-gradient-coral'} />
                </dt>
                <dd className="mt-3 max-w-[15rem] text-ink-soft">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p data-reveal="" className="mt-16 max-w-2xl text-lg text-ink-soft">
          {m.note}
        </p>
        <TextLink href={`${href(locale, 'method')}#tarifs`} className="mt-5">
          {m.cta}
        </TextLink>
      </div>
    </section>
  );
}
