import { getClients } from '@/lib/api';
import { clientLogos, normalizeName } from '@/lib/client-logos';

/** Références clients sans logo sur le site : affichées en simple liste de noms. */
export async function OtherClients({ title }: { title: string }) {
  const clients = await getClients();
  const withLogo = new Set(clientLogos.map((l) => normalizeName(l.name).split(' ')[0]));
  const others = clients.filter((c) => !withLogo.has(normalizeName(c.name).split(' ')[0]));
  if (!others.length) return null;
  return (
    <div className="mt-12">
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <p className="mt-3 max-w-4xl leading-relaxed text-ink-soft">{others.map((c) => c.name).join(' · ')}</p>
    </div>
  );
}
