import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { TextLink } from '../ui/text-link';

/** Rémunération au résultat : quatre faits, sur fond pétrole. */
export function PricingBand({ t, locale }: { t: Dictionary; locale: Locale }) {
  const m = t.home.model;
  return (
    <section className="on-dark bg-teal py-16 text-white md:py-24">
      <div className="container-site">
        <h2 className="max-w-[18ch] text-headline">{m.title}</h2>
        <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {m.facts.map((f) => (
            <div key={f.value}>
              <dt className="figure text-[clamp(2.4rem,1.9rem+1.6vw,3.4rem)] text-coral">{f.value}</dt>
              <dd className="mt-3 max-w-[16rem] text-white/80">{f.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-12 max-w-2xl text-white/70">
          {m.note}{' '}
          <TextLink href={`${href(locale, 'method')}#tarifs`}>{m.cta}</TextLink>
        </p>
      </div>
    </section>
  );
}
