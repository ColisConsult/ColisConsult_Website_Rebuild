import Link from 'next/link';
import { Suspense } from 'react';
import { Empty, LEAD_STATUS, LEAD_TYPE, LoadingBlock, PageTitle, Table } from '@/components/admin/ui';
import { adminFetch } from '@/lib/admin-api';
import { cn } from '@/lib/cn';
import type { Lead } from '@/lib/types';
import { LeadRow } from '@/components/admin/lead-row';

export const metadata = { title: 'Demandes' };

export default function LeadsPage({ searchParams }: PageProps<'/admin/demandes'>) {
  return (
    <>
      <PageTitle title="Demandes" />
      <Suspense fallback={<LoadingBlock />}>
        <Leads searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Leads({ searchParams }: { searchParams: PageProps<'/admin/demandes'>['searchParams'] }) {
  const sp = await searchParams;
  const type = typeof sp.type === 'string' && sp.type in LEAD_TYPE ? sp.type : '';
  const status = typeof sp.status === 'string' && sp.status in LEAD_STATUS ? sp.status : '';
  const qs = new URLSearchParams({ ...(type && { type }), ...(status && { status }) }).toString();
  const leads = await adminFetch<Lead[]>(`/admin/leads${qs ? `?${qs}` : ''}`);

  const link = (next: { type?: string; status?: string }) => {
    const p = new URLSearchParams({ ...(type && { type }), ...(status && { status }) });
    for (const [k, v] of Object.entries(next)) {
      if (v) p.set(k, v);
      else p.delete(k);
    }
    const s = p.toString();
    return `/admin/demandes${s ? `?${s}` : ''}`;
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        <Filter label="Type" current={type} options={LEAD_TYPE} href={(v) => link({ type: v })} />
        <Filter label="Statut" current={status} options={LEAD_STATUS} href={(v) => link({ status: v })} />
      </div>
      {leads.length ? (
        <Table head={['Date', 'Type', 'Entreprise', 'Contact', 'Factures', 'Statut']}>
          {leads.map((l) => (
            <LeadRow key={l.id} lead={l} />
          ))}
        </Table>
      ) : (
        <Empty>Aucune demande ne correspond à ces filtres.</Empty>
      )}
    </>
  );
}

function Filter({
  label,
  current,
  options,
  href,
}: {
  label: string;
  current: string;
  options: Record<string, string>;
  href: (v: string) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-ink-faint">{label}</span>
      {[['', 'Tous'], ...Object.entries(options)].map(([value, text]) => (
        <Link
          key={value}
          href={href(value)}
          className={cn(
            'rounded-sm border px-2.5 py-1',
            current === value ? 'border-teal bg-teal text-white' : 'border-line-strong bg-white hover:border-ink-faint',
          )}
        >
          {text}
        </Link>
      ))}
    </div>
  );
}
