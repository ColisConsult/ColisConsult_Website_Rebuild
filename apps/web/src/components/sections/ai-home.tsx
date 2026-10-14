import Image from 'next/image';
import type { CSSProperties } from 'react';
import majdi from '@/assets/photos/majdi-analyse.jpg';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { cn } from '@/lib/cn';
import { CountUp } from '../motion/count-up';
import { Aurora } from '../motion/primitives';
import { TextLink } from '../ui/text-link';

/** L'IA chez ColisConsult : grille « bento » sur fond sombre. */
export function AiHome({ t, locale }: { t: Dictionary; locale: Locale }) {
  const a = t.home.ai;
  const visuals = [
    <InvoiceScan key="scan" flagged={a.visuals.flagged} />,
    <ProfileBars key="profile" label={a.visuals.weightBands} />,
    <OffersRace key="offers" offer={a.visuals.offer} best={a.visuals.best} />,
  ];

  return (
    <section data-tone="dark" data-spotlight="" className="surface-night on-dark py-20 md:py-32">
      <Aurora variant="section" />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />

      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-3xl">
            <h2 data-reveal="" className="max-w-[20ch] text-headline">
              {a.title}
            </h2>
            <p data-reveal="" style={{ '--d': '120ms' } as CSSProperties} className="mt-5 max-w-2xl text-lg text-white/70">
              {a.lead}
            </p>
          </div>
          <TextLink href={href(locale, 'ai')}>{a.cta}</TextLink>
        </div>

        <div className="mt-14 grid gap-4 md:mt-16 lg:grid-cols-12">
          <div data-reveal="" className="lg:col-span-7">
            <SpendInsight t={t.home.insight} locale={locale} dark className="h-full" />
          </div>
          <div data-reveal="" style={{ '--d': '120ms' } as CSSProperties} className="lg:col-span-5">
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[var(--radius-card)] ring-1 ring-white/10">
              <div data-parallax="0.07" className="parallax-img absolute inset-0">
                <Image src={majdi} alt={a.photoAlt} fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[70%_center]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 via-night/40 to-transparent p-6 pt-16">
                <p className="text-sm text-white/80">{a.photoCaption}</p>
              </div>
            </div>
          </div>

          <ul data-stagger="" className="grid gap-4 md:grid-cols-3 lg:col-span-12">
            {a.items.map((item, i) => (
              <li key={item.title}>
                <article data-spotlight="" className="seq card-glass spot flex h-full flex-col p-6 md:p-7">
                  <div className="h-36 rounded-xl bg-white/[0.035] p-4 ring-1 ring-white/[0.06]" aria-hidden="true">
                    {visuals[i]}
                  </div>
                  <h3 className="mt-6 text-title text-white">{item.title}</h3>
                  <p className="mt-2 text-white/65">{item.text}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Mini-visuel : une facture lue ligne à ligne, deux lignes à contester. */
function InvoiceScan({ flagged }: { flagged: string }) {
  const lines = [88, 64, 76, 52, 82, 58];
  const bad = new Set([1, 4]);
  return (
    <div className="relative h-full overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-mint/25 to-transparent opacity-0 [.is-in_&]:animate-[cc-scan_3.2s_ease-in-out_0.4s_infinite]" />
      <div className="space-y-2">
        {lines.map((w, i) => (
          <div key={i} data-line="" style={{ '--d': `${i * 120}ms` } as CSSProperties} className="flex items-center gap-2">
            <span className={cn('h-2 rounded-full', bad.has(i) ? 'bg-coral/80' : 'bg-white/15')} style={{ width: `${w}%` }} />
            {bad.has(i) && (
              <span data-pop="" style={{ '--d': `${i * 120 + 500}ms` } as CSSProperties} className="shrink-0 rounded-full bg-coral px-1.5 py-px text-[0.62rem] font-semibold whitespace-nowrap text-night">
                {flagged}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mini-visuel : le profil d'expédition reconstitué (envois par tranche de poids). */
function ProfileBars({ label }: { label: string }) {
  const bands = [
    { b: '<1', v: 62 },
    { b: '1–5', v: 100 },
    { b: '5–10', v: 54 },
    { b: '10–30', v: 30 },
    { b: '30+', v: 14 },
  ];
  return (
    <div className="flex h-full flex-col">
      <p className="text-[0.68rem] text-white/45">{label}</p>
      <div className="mt-2 flex flex-1 items-end gap-2">
        {bands.map((x, i) => (
          <div key={x.b} className="flex h-full flex-1 flex-col justify-end gap-1">
            <span
              data-vbar=""
              style={{ height: `${x.v}%`, '--d': `${200 + i * 110}ms` } as CSSProperties}
              className={cn('block rounded-md bg-gradient-to-t', i === 1 ? 'from-mint to-mint-300' : 'from-teal-700 to-teal-300/70')}
            />
            <span className="text-center text-[0.6rem] text-white/45 tabular-nums">{x.b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mini-visuel : trois offres simulées sur les envois réels, la moins chère retenue. */
function OffersRace({ offer, best }: { offer: string; best: string }) {
  const offers = [
    { k: 'A', v: 92 },
    { k: 'B', v: 71, best: true },
    { k: 'C', v: 84 },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3.5">
      {offers.map((o, i) => (
        <div key={o.k} className="grid grid-cols-[3.6rem_1fr] items-center gap-2.5">
          <span className="text-[0.72rem] text-white/55">
            {offer} {o.k}
          </span>
          <div className="flex items-center gap-2">
            <span className="h-3 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <span
                data-bar=""
                style={{ width: `${o.v}%`, '--d': `${250 + i * 160}ms` } as CSSProperties}
                className={cn('block h-full rounded-full', o.best ? 'bg-gradient-to-r from-mint to-mint-300' : 'bg-white/25')}
              />
            </span>
            {o.best && (
              <span data-pop="" style={{ '--d': '1300ms' } as CSSProperties} className="rounded-full bg-mint px-1.5 py-px text-[0.62rem] font-semibold text-night">
                {best}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
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
  dark,
}: {
  t: Dictionary['home']['insight'];
  locale: Locale;
  className?: string;
  dark?: boolean;
}) {
  const rows = [
    { label: t.shipments, heavy: 14.6 },
    { label: t.spend, heavy: 48.5 },
  ];
  const fmt = (n: number) => n.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 1 });
  const unit = locale === 'fr' ? ' %' : '%';

  return (
    <figure
      data-spotlight=""
      className={cn(
        'seq spot flex flex-col gap-8 p-6 md:p-9',
        dark ? 'card-glass' : 'card',
        className,
      )}
    >
      <div>
        <h3 className={cn('text-title', dark && 'text-white')}>{t.title}</h3>
        <p className={cn('mt-3 max-w-xl', dark ? 'text-white/65' : 'text-ink-soft')}>{t.text}</p>
      </div>
      <div className="mt-auto space-y-6">
        {rows.map((r, i) => (
          <div key={r.label}>
            <div className="flex items-baseline gap-3">
              <span className={cn('figure text-[clamp(2.4rem,1.9rem+1.8vw,3.6rem)]', i === 1 ? 'text-gradient-coral' : dark ? 'text-white' : 'text-teal')}>
                <CountUp value={`${fmt(r.heavy)}${unit}`} delay={i * 200} />
              </span>
              <span className={dark ? 'text-white/65' : 'text-ink-soft'}>{r.label}</span>
            </div>
            <div
              className={cn('mt-3 flex h-3.5 overflow-hidden rounded-full', dark ? 'bg-white/[0.08]' : 'bg-teal-100')}
              role="img"
              aria-label={`${fmt(r.heavy)}${unit} ${r.label}`}
            >
              <div
                data-bar=""
                className={cn('h-full rounded-full', i === 1 ? 'bg-gradient-to-r from-coral to-[#ffb39f]' : dark ? 'bg-teal-300' : 'bg-teal')}
                style={{ width: `${r.heavy}%`, '--d': `${300 + i * 250}ms` } as CSSProperties}
              />
            </div>
          </div>
        ))}
        <div className={cn('flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm', dark ? 'text-white/55' : 'text-ink-soft')}>
          <span className={cn('font-medium', dark ? 'text-white/80' : 'text-ink')}>{t.legendHeavy}</span>
          <figcaption className={dark ? 'text-white/40' : 'text-ink-faint'}>{t.source}</figcaption>
        </div>
      </div>
    </figure>
  );
}
