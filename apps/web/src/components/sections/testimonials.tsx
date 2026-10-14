import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { clientLogos, normalizeName } from '@/lib/client-logos';
import { cn } from '@/lib/cn';
import { initials } from '@/lib/format';
import type { Testimonial } from '@/lib/types';
import { CountUp } from '../motion/count-up';
import { LogoItem } from './logo-band';

export function quoteFor(t: Testimonial, locale: Locale) {
  if (locale === 'en') return { text: t.quoteEn ?? t.quoteFr, translated: !!t.quoteEn && t.quoteLang !== 'en' };
  return { text: t.quoteFr, translated: t.quoteLang !== 'fr' };
}

/** Sépare « −19 % sans changer de transporteur » en chiffre + libellé. */
export function splitResult(result: string) {
  const m = result.match(/^(?:plus de\s+|more than\s+)?([−–+-]?\s?\d+(?:[.,]\d+)?\s?%)\s*(.*)$/i);
  if (!m) return { figure: null, label: result };
  return { figure: m[1].replace(/\s/g, ' ').replace(/^[-–]/, '−'), label: m[2] };
}

export function logoFor(company: string) {
  const key = normalizeName(company);
  // « Laboratoire Bioderma » → logo « Bioderma » : le nom du logo doit figurer en mots entiers
  return (
    clientLogos.find((l) => normalizeName(l.name) === key || key.startsWith(normalizeName(l.name))) ??
    clientLogos.find((l) => ` ${key} `.includes(` ${normalizeName(l.name)} `))
  );
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M0 24V14.4C0 6.6 4.3 1.8 12.4 0l1.4 3.5C9.4 5 7.2 7.8 7 11.6h6.2V24H0Zm18.2 0V14.4C18.2 6.6 22.5 1.8 30.6 0L32 3.5c-4.4 1.5-6.6 4.3-6.8 8.1h6.2V24H18.2Z" />
    </svg>
  );
}

/**
 * Témoignage client : logo de l'entreprise, résultat obtenu, citation mise en avant,
 * puis la personne qui parle. `featured` : grand format avec le chiffre (accueil).
 */
export function TestimonialCard({
  item,
  locale,
  t,
  featured,
}: {
  item: Testimonial;
  locale: Locale;
  t: Dictionary;
  featured?: boolean;
}) {
  const { text, translated } = quoteFor(item, locale);
  const result = (locale === 'en' ? (item.resultEn ?? item.resultFr) : item.resultFr) ?? null;
  const { figure, label } = result ? splitResult(result) : { figure: null, label: null };
  const logo = logoFor(item.company);

  return (
    <figure data-spotlight="" className={cn('card card-lift spot spot-mint flex h-full flex-col', featured ? 'p-7 md:p-8' : 'p-6 md:p-7')}>
      <div className={cn('flex items-center justify-between gap-4', featured ? 'min-h-16' : 'min-h-14')}>
        {logo ? (
          <LogoItem logo={logo} base={featured ? 60 : 48} tone="full" />
        ) : (
          <span className="font-display text-xl font-semibold tracking-tight">{item.company}</span>
        )}
      </div>

      {featured && figure && (
        <p className="mt-6 rounded-2xl bg-mint-soft/70 px-5 py-4">
          <CountUp value={figure} className="figure block text-[2.6rem] text-mint-ink" />
          {label && <span className="mt-1 block font-display text-[0.95rem] leading-snug font-medium text-ink">{label}</span>}
        </p>
      )}
      {!featured && result && (
        <p className="mt-5 flex items-baseline gap-2 self-start rounded-xl bg-mint-soft/70 px-3.5 py-2 text-sm">
          {figure && <span className="font-display text-base font-semibold text-mint-ink">{figure}</span>}
          <span className="font-medium text-ink">{figure ? label : result}</span>
        </p>
      )}

      <QuoteMark className={cn('text-coral', featured ? 'mt-7 h-6 w-8' : 'mt-5 h-5 w-7')} />
      <blockquote
        className={cn(
          'mt-3 flex-1 leading-relaxed text-ink',
          featured ? 'font-display text-[1.12rem] font-medium tracking-tight' : 'text-[1.02rem]',
        )}
      >
        {text}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5 text-sm">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 font-display font-semibold text-teal"
          aria-hidden="true"
        >
          {initials(item.author)}
        </span>
        <span>
          <span className="block font-semibold text-ink">{item.author}</span>
          <span className="block text-ink-soft">
            {item.role}
            {item.role && ', '}
            {item.company}
          </span>
          {translated && <span className="mt-1 block text-xs text-ink-faint">{t.common.translatedFrom[item.quoteLang]}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialsGrid({ items, locale, t }: { items: Testimonial[]; locale: Locale; t: Dictionary }) {
  if (!items.length) return null;
  return (
    <ul data-stagger="" className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>li]:mb-5 [&>li]:break-inside-avoid">
      {items.map((item) => (
        <li key={item.id}>
          <TestimonialCard item={item} locale={locale} t={t} />
        </li>
      ))}
    </ul>
  );
}
