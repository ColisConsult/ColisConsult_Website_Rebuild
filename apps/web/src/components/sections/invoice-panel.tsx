import type { Dictionary } from '@/i18n/get-dictionary';
import { AiMark } from '../ui/icons';

/** Illustration (fictive) de ce que produit l'analyse de factures. */
export function InvoicePanel({ t, illustrative }: { t: Dictionary['home']['invoice']; illustrative: string }) {
  return (
    <figure className="relative">
      <div className="absolute -top-3 right-5 z-10 flex items-center gap-2 rounded-sm bg-ink px-2.5 py-1 text-[0.72rem] font-medium tracking-wide text-white">
        <AiMark className="size-2 text-coral" />
        {t.reviewer}
      </div>
      <div className="overflow-hidden rounded-md border border-line-strong bg-white shadow-[0_1px_0_rgba(15,37,38,0.04),0_30px_60px_-30px_rgba(13,82,87,0.35)]">
        <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 pt-6 pb-4">
          <div>
            <p className="font-display text-[0.95rem] font-semibold">{t.title}</p>
            <p className="text-sm text-ink-faint">{t.meta}</p>
          </div>
          <p className="num text-xs uppercase text-ink-faint">{illustrative}</p>
        </div>
        <table className="w-full text-[0.86rem]">
          <thead className="sr-only">
            <tr>
              <th>{t.columns.line}</th>
              <th>{t.columns.amount}</th>
            </tr>
          </thead>
          <tbody>
            {t.lines.map((line, i) => {
              const flagged = 'flag' in line && line.flag;
              return (
                <tr key={i} className="border-b border-line/70 last:border-0">
                  <td className={`relative py-3 pr-3 pl-5 align-top ${flagged ? 'bg-coral-soft/45' : ''}`}>
                    {flagged && <span className="absolute inset-y-0 left-0 w-[3px] bg-coral" aria-hidden="true" />}
                    <span className="block text-ink">{line.label}</span>
                    {flagged && (
                      <span className="mt-1 flex items-center gap-1.5 text-[0.8rem] font-medium text-coral-ink">
                        <AiMark className="size-1.5" />
                        {line.flag}
                      </span>
                    )}
                  </td>
                  <td className={`num py-3 pr-5 text-right align-top whitespace-nowrap ${flagged ? 'bg-coral-soft/45 text-coral-ink' : 'text-ink-soft'}`}>
                    {line.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-end justify-between gap-4 bg-teal-900 px-5 py-4 text-white">
          <p className="max-w-[14rem] text-sm leading-snug text-white/75">{t.totalLabel}</p>
          <p className="num text-xl font-medium whitespace-nowrap text-coral sm:text-2xl">{t.total}</p>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-ink-faint">{t.note}</figcaption>
    </figure>
  );
}
