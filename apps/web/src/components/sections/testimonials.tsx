import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Testimonial } from '@/lib/types';

export function quoteFor(t: Testimonial, locale: Locale) {
  if (locale === 'en') return { text: t.quoteEn ?? t.quoteFr, translated: !!t.quoteEn && t.quoteLang !== 'en' };
  return { text: t.quoteFr, translated: t.quoteLang !== 'fr' };
}

export function TestimonialCard({ item, locale, t }: { item: Testimonial; locale: Locale; t: Dictionary }) {
  const { text, translated } = quoteFor(item, locale);
  const result = locale === 'en' ? (item.resultEn ?? item.resultFr) : item.resultFr;

  return (
    <figure data-spotlight="" className="card card-lift spot spot-mint flex h-full flex-col p-6 md:p-7">
      {result && (
        <p className="mb-4 self-start rounded-full bg-mint-soft px-3 py-1 font-display text-sm font-medium text-mint-ink">{result}</p>
      )}
      <blockquote className="flex-1 text-[1.02rem] leading-relaxed">
        {locale === 'fr' ? '« ' : '“'}
        {text}
        {locale === 'fr' ? ' »' : '”'}
      </blockquote>
      <figcaption className="mt-6 border-t border-line pt-4 text-sm">
        <span className="font-medium">{item.author}</span>
        <span className="block text-ink-soft">
          {item.role}
          {item.role && ', '}
          <span className="text-ink">{item.company}</span>
        </span>
        {translated && <span className="mt-1 block text-xs text-ink-faint">{t.common.translatedFrom[item.quoteLang]}</span>}
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
