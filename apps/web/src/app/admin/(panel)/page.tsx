import Link from 'next/link';
import { Suspense } from 'react';
import { LeadRow } from '@/components/admin/lead-row';
import { Card, Empty, LoadingBlock, PageTitle, Table } from '@/components/admin/ui';
import { adminFetch } from '@/lib/admin-api';
import type { Lead } from '@/lib/types';

export const metadata = { title: 'Tableau de bord' };

export default function DashboardPage() {
  return (
    <>
      <PageTitle title="Tableau de bord" />
      <Suspense fallback={<LoadingBlock />}>
        <Dashboard />
      </Suspense>
    </>
  );
}

async function Dashboard() {
  const [stats, leads] = await Promise.all([
    adminFetch<{ byTypeAndStatus: { type: Lead['type']; status: Lead['status']; n: number }[]; last30: number }>('/admin/stats'),
    adminFetch<Lead[]>('/admin/leads'),
  ]);
  const count = (type?: Lead['type'], status?: Lead['status']) =>
    stats.byTypeAndStatus
      .filter((r) => (!type || r.type === type) && (!status || r.status === status))
      .reduce((s, r) => s + r.n, 0);

  const tiles = [
    { label: 'Nouvelles demandes', value: count(undefined, 'new'), href: '/admin/demandes?status=new', accent: true },
    { label: 'Pré-audits', value: count('pre_audit'), href: '/admin/demandes?type=pre_audit' },
    { label: 'Contacts', value: count('contact'), href: '/admin/demandes?type=contact' },
    { label: 'Simulateur', value: count('simulator'), href: '/admin/demandes?type=simulator' },
    { label: 'Sur 30 jours', value: stats.last30, href: '/admin/demandes' },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href}>
            <Card className="p-4 transition-colors hover:border-ink-faint">
              <p className="text-sm text-ink-soft">{t.label}</p>
              <p className={`mt-2 font-display text-3xl font-semibold tracking-tight ${t.accent && t.value ? 'text-coral-ink' : ''}`}>
                {t.value}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg">Dernières demandes</h2>
          <Link href="/admin/demandes" className="text-sm text-teal hover:underline">
            Tout voir
          </Link>
        </div>
        {leads.length ? (
          <Table head={['Date', 'Type', 'Entreprise', 'Contact', 'Factures', 'Statut']}>
            {leads.slice(0, 8).map((l) => (
              <LeadRow key={l.id} lead={l} />
            ))}
          </Table>
        ) : (
          <Empty>Aucune demande pour le moment.</Empty>
        )}
      </div>
    </div>
  );
}
