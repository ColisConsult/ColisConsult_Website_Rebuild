import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { cn } from '@/lib/cn';
import type { Testimonial } from '@/lib/types';

export function quoteFor(t: Testimonial, locale: Locale) {
  if (locale === 'en') return { text: t.quoteEn ?? t.quoteFr, translated: !!t.quoteEn && t.quoteLang !== 'en' };
  return { text: t.quoteFr, translated: t.quoteLang !== 'fr' };
}

export function TestimonialCard({
  item,
  locale,
  t,
  size = 'md',
}: {
  item: Testimonial;
  locale: Locale;
  t: Dictionary;
  size?: 'md' | 'lg';
}) {
  const { text, translated } = quoteFor(item, locale);
  const result = locale === 'en' ? (item.resultEn ?? item.resultFr) : item.resultFr;
  const mission = locale === 'en' ? (item.missionEn ?? item.missionFr) : item.missionFr;

  return (
    <figure className="flex flex-col">
      <p className="font-display text-sm font-medium text-teal">{item.company}</p>
      {mission && <p className="mt-0.5 text-sm text-ink-faint">{mission}</p>}
      <blockquote
        className={cn(
          'mt-5 text-pretty',
          size === 'lg'
            ? 'font-display text-[clamp(1.35rem,1.05rem+1.1vw,2rem)] leading-snug font-medium tracking-tight'
            : 'text-[1.06rem] leading-relaxed',
        )}
      >
        <span aria-hidden="true" className="text-coral">{locale === 'fr' ? '«\u202f' : '“'}</span>
        {text}
        <span aria-hidden="true" className="text-coral">{locale === 'fr' ? '\u202f»' : '”'}</span>
      </blockquote>
      <figcaption className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-line pt-4">
        <span className="text-sm">
          <span className="font-medium">{item.author}</span>
          {item.role && <span className="block text-ink-soft">{item.role}</span>}
          {translated && (
            <span className="mt-1 block text-xs text-ink-faint">{t.common.translatedFrom[item.quoteLang]}</span>
          )}
        </span>
        {result && (
          <span className="rounded-sm bg-teal-50 px-2.5 py-1 font-display text-sm font-medium text-teal">{result}</span>
        )}
      </figcaption>
    </figure>
  );
}

export function TestimonialsGrid({ items, locale, t }: { items: Testimonial[]; locale: Locale; t: Dictionary }) {
  if (!items.length) return null;
  const [first, ...rest] = items;
  return (
    <div className="grid items-start gap-x-10 gap-y-14 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <TestimonialCard item={first} locale={locale} t={t} size="lg" />
      </div>
      <div className="grid gap-12 lg:col-span-5">
        {rest.slice(0, 2).map((item) => (
          <TestimonialCard key={item.id} item={item} locale={locale} t={t} />
        ))}
      </div>
    </div>
  );
}
