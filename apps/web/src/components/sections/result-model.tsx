import type { Dictionary } from '@/i18n/get-dictionary';

export function ResultFacts({ facts }: { facts: Dictionary['home']['model']['facts'] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-md bg-white/12 sm:grid-cols-2">
      {facts.map((f) => (
        <div key={f.value} className="bg-teal-900 p-6 md:p-8">
          <dt className="sr-only">{f.label}</dt>
          <dd>
            <span className="block font-display text-[clamp(2.2rem,1.6rem+2vw,3.4rem)] leading-none font-semibold tracking-tight text-white">
              {f.value}
            </span>
            <span className="mt-3 block max-w-xs text-white/70">{f.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
