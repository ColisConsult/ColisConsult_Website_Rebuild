import majdi from '@/assets/photos/majdi-analyse.jpg';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Photo } from '../ui/section';
import { TextLink } from '../ui/text-link';

export function AiHome({ t, locale }: { t: Dictionary; locale: Locale }) {
  const a = t.home.ai;
  return (
    <section className="bg-mist py-16 md:py-24">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Photo src={majdi} alt={a.photoAlt} caption={a.photoCaption} className="aspect-[4/3]" position="70% center" />
          </div>
          <div className="lg:col-span-6">
            <h2 className="text-headline">{a.title}</h2>
            <p className="mt-4 text-lg text-ink-soft">{a.lead}</p>
            <dl className="mt-8 divide-y divide-line-strong/60 border-y border-line-strong/60">
              {a.items.map((item) => (
                <div key={item.title} className="py-4 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-display font-semibold">{item.title}</dt>
                  <dd className="mt-1 text-ink-soft sm:mt-0">{item.text}</dd>
                </div>
              ))}
            </dl>
            <TextLink href={href(locale, 'ai')} className="mt-7 inline-block">
              {a.cta}
            </TextLink>
          </div>
        </div>

        <SpendInsight t={t.home.insight} locale={locale} className="mt-14 md:mt-20" />
      </div>
    </section>
  );
}

/**
 * Exemple réel tiré d'un audit client (support commercial 2024, données anonymisées) :
 * les colis de plus de 10 kg = 14,6 % des envois et 48,5 % de la dépense.
 */
export function SpendInsight({
  t,
  locale,
  className,
}: {
  t: Dictionary['home']['insight'];
  locale: Locale;
  className?: string;
}) {
  const rows = [
    { label: t.shipments, heavy: 14.6 },
    { label: t.spend, heavy: 48.5 },
  ];
  const fmt = (n: number) => n.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 1 });
  const unit = locale === 'fr' ? '\u202f%' : '%';

  return (
    <figure className={`grid gap-8 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line md:p-9 lg:grid-cols-12 lg:gap-12 ${className ?? ''}`}>
      <div className="lg:col-span-5">
        <h3 className="text-title">{t.title}</h3>
        <p className="mt-3 text-ink-soft">{t.text}</p>
        <figcaption className="mt-4 text-sm text-ink-faint">{t.source}</figcaption>
      </div>
      <div className="flex flex-col justify-center gap-6 lg:col-span-7">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline gap-2">
              <span className="figure text-[2rem] text-teal">
                {fmt(r.heavy)}
                {unit}
              </span>
              <span className="text-ink-soft">{r.label}</span>
            </div>
            <div className="mt-2 flex h-4 overflow-hidden rounded-full bg-teal-100" role="img" aria-label={`${fmt(r.heavy)}${unit} ${r.label}`}>
              <div className="h-full rounded-full bg-teal" style={{ width: `${r.heavy}%` }} />
            </div>
          </div>
        ))}
        <p className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-soft">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-teal" aria-hidden="true" />
            {t.legendHeavy}
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-teal-100" aria-hidden="true" />
            {t.legendOther}
          </span>
        </p>
      </div>
    </figure>
  );
}
