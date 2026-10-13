import type { Dictionary } from '@/i18n/get-dictionary';

export function Figures({ items }: { items: Dictionary['figures'] }) {
  return (
    <div className="container-site">
      <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
        {items.map((f, i) => (
          <div
            key={f.value}
            className={`py-7 pr-5 ${i % 2 === 1 ? 'pl-5 border-l border-line' : ''} ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''} ${i === 2 ? 'lg:pl-5 lg:border-l' : ''}`}
          >
            <dt className="sr-only">{f.label}</dt>
            <dd>
              <span className="block font-display text-[clamp(1.45rem,1.1rem+1.5vw,2.4rem)] font-semibold tracking-tight text-teal">
                {f.value}
              </span>
              <span className="mt-1.5 block max-w-[16rem] text-[0.92rem] leading-snug text-ink-soft">{f.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
