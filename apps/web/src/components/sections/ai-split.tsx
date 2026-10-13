import type { Dictionary } from '@/i18n/get-dictionary';
import { AiMark } from '../ui/icons';

/** Trois usages de l'IA : ce que fait la machine / ce que fait le consultant. */
export function AiSplit({ t }: { t: Dictionary['home']['ai'] }) {
  return (
    <div>
      <div className="hidden grid-cols-12 gap-8 border-b border-line pb-3 text-sm text-ink-faint md:grid">
        <span className="col-span-4" />
        <span className="col-span-4 flex items-center gap-2">
          <AiMark className="size-2 text-coral" />
          {t.aiCol}
        </span>
        <span className="col-span-4 flex items-center gap-2">
          <span className="size-2 rounded-full bg-teal" aria-hidden="true" />
          {t.humanCol}
        </span>
      </div>
      <ol>
        {t.items.map((item, i) => (
          <li key={item.title} className="grid gap-x-8 gap-y-4 border-b border-line py-8 md:grid-cols-12">
            <h3 className="flex items-baseline gap-3 text-title md:col-span-4">
              <span className="num text-sm font-normal text-ink-faint">0{i + 1}</span>
              {item.title}
            </h3>
            <div className="md:col-span-4">
              <p className="mb-1.5 flex items-center gap-2 text-sm text-ink-faint md:hidden">
                <AiMark className="size-2 text-coral" />
                {t.aiCol}
              </p>
              <p className="text-ink">{item.ai}</p>
            </div>
            <div className="md:col-span-4">
              <p className="mb-1.5 flex items-center gap-2 text-sm text-ink-faint md:hidden">
                <span className="size-2 rounded-full bg-teal" aria-hidden="true" />
                {t.humanCol}
              </p>
              <p className="text-ink-soft">{item.human}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
