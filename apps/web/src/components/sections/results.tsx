import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { clientLogos, normalizeName } from '@/lib/client-logos';
import type { Testimonial } from '@/lib/types';
import { LogoItem } from './logo-band';
import { quoteFor } from './testimonials';

/** Sépare « −19 % sans changer de transporteur » en chiffre + libellé. */
export function splitResult(result: string) {
  const m = result.match(/^(?:plus de\s+|more than\s+)?([−–+-]?\s?\d+(?:[.,]\d+)?\s?%)\s*(.*)$/i);
  if (!m) return { figure: null, label: result };
  return { figure: m[1].replace(/\s/g, ' ').replace(/^[-–]/, '−'), label: m[2] };
}

export function logoFor(company: string) {
  const key = normalizeName(company);
  return clientLogos.find((l) => normalizeName(l.name) === key || key.startsWith(normalizeName(l.name)));
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
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {withFigures.slice(0, 3).map(({ item, figure, label }) => {
        const { text, translated } = quoteFor(item, locale);
        const logo = logoFor(item.company);
        return (
          <li key={item.id} className="flex flex-col rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line">
            <p className="figure text-[3.25rem] text-teal">{figure}</p>
            <p className="mt-2 font-display font-medium">{label}</p>
            <blockquote className="mt-5 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">
              {locale === 'fr' ? '« ' : '“'}
              {text}
              {locale === 'fr' ? ' »' : '”'}
            </blockquote>
            <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
              <p className="text-sm">
                <span className="font-medium">{item.author}</span>
                <span className="block text-ink-soft">
                  {item.role}, {item.company}
                </span>
                {translated && <span className="mt-1 block text-xs text-ink-faint">{t.common.translatedFrom[item.quoteLang]}</span>}
              </p>
              {logo && <LogoItem logo={logo} base={22} className="shrink-0" />}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
