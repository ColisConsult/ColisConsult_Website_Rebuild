import { getClients } from '@/lib/api';
import type { Segment } from '@/lib/types';

/**
 * Références clients composées en typographie (pas de logos de marques) :
 * sobre, lisible, et sans dépendre de fichiers de logos tiers.
 */
export async function ClientNames({ title, limit, segments }: { title?: string; limit?: number; segments?: Record<Segment, string> }) {
  const clients = await getClients();
  if (!clients.length) return null;

  if (segments) {
    return (
      <div className="grid gap-10 md:grid-cols-3">
        {(Object.keys(segments) as Segment[]).map((seg) => (
          <div key={seg}>
            <h3 className="border-b border-line pb-3 font-display text-sm font-medium text-ink-soft">{segments[seg]}</h3>
            <ul className="mt-4 space-y-1.5 font-display text-lg font-medium tracking-tight">
              {clients
                .filter((c) => c.segment === seg)
                .map((c) => (
                  <li key={c.id}>{c.name}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // Alterne les segments pour un mélange grands groupes / e-commerce / PME
  const bySegment = (['enterprise', 'ecommerce', 'sme'] as Segment[]).map((s) => clients.filter((c) => c.segment === s));
  const mixed: typeof clients = [];
  for (let i = 0; mixed.length < clients.length; i++) {
    for (const list of bySegment) if (list[i]) mixed.push(list[i]);
  }
  const shown = limit ? mixed.slice(0, limit) : mixed;

  return (
    <div className="container-site py-14 md:py-16">
      {title && <h2 className="font-display text-sm font-medium text-ink-soft">{title}</h2>}
      <p className="mt-5 font-display text-[clamp(1.15rem,0.95rem+0.8vw,1.6rem)] leading-[1.55] font-medium tracking-tight text-ink">
        {shown.map((c, i) => (
          <span key={c.id}>
            <span className="whitespace-nowrap">
              {c.name}
              {i < shown.length - 1 && (
                <span className="ml-[0.4em] mr-[0.1em] text-line-strong" aria-hidden="true">
                  /
                </span>
              )}
            </span>{' '}
          </span>
        ))}
      </p>
    </div>
  );
}
