import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { BUDGET, Card, LEAD_TYPE, LoadingBlock, PageTitle, StatusBadge, fmtDate } from '@/components/admin/ui';
import { AdminApiError, adminFetch } from '@/lib/admin-api';
import type { Lead } from '@/lib/types';
import { deleteLead } from '../../../actions';
import { ConfirmButton } from '../../confirm-button';
import { LeadStatusForm } from './status-form';

export const metadata = { title: 'Demande' };

export default function LeadPage({ params }: PageProps<'/admin/demandes/[id]'>) {
  return (
    <Suspense fallback={<LoadingBlock />}>
      <LeadDetail params={params} />
    </Suspense>
  );
}

async function LeadDetail({ params }: { params: PageProps<'/admin/demandes/[id]'>['params'] }) {
  const { id } = await params;
  let lead: Lead;
  try {
    lead = await adminFetch<Lead>(`/admin/leads/${id}`);
  } catch (e) {
    if (e instanceof AdminApiError && (e.status === 404 || e.status === 400)) notFound();
    throw e;
  }
  const sim = lead.payload as { annualBudget?: number; flows?: string[]; carriersCount?: number; lastTender?: string; estimate?: { pct: { low: number; high: number } } } | null;

  const rows: [string, React.ReactNode][] = [
    ['Contact', `${lead.firstName} ${lead.lastName}${lead.jobTitle ? ` · ${lead.jobTitle}` : ''}`],
    ['E-mail', <a key="m" href={`mailto:${lead.email}`} className="text-teal hover:underline">{lead.email}</a>],
    ['Téléphone', lead.phone ? <a key="t" href={`tel:${lead.phone}`} className="text-teal hover:underline">{lead.phone}</a> : '—'],
    ['Budget transport', lead.annualBudget ? (BUDGET[lead.annualBudget] ?? lead.annualBudget) : '—'],
    ['Transporteurs', lead.carriers ?? '—'],
    ['Langue du site', lead.locale.toUpperCase()],
    ['Reçue le', fmtDate(lead.createdAt)],
  ];

  return (
    <>
      <PageTitle title={lead.company} back={{ href: '/admin/demandes', label: 'Demandes' }}>
        <span className="text-sm text-ink-soft">{LEAD_TYPE[lead.type]}</span>
        <StatusBadge status={lead.status} />
      </PageTitle>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <dl className="divide-y divide-line">
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-4 px-5 py-3">
                  <dt className="text-ink-faint">{k}</dt>
                  <dd className="col-span-2">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {lead.message && (
            <Card className="p-5">
              <h2 className="text-sm font-medium text-ink-faint">Message</h2>
              <p className="mt-2 whitespace-pre-wrap">{lead.message}</p>
            </Card>
          )}

          {sim && (
            <Card className="p-5">
              <h2 className="text-sm font-medium text-ink-faint">Paramètres du simulateur</h2>
              <ul className="mt-2 space-y-1">
                <li>Budget : {sim.annualBudget?.toLocaleString('fr-FR')} €</li>
                <li>Flux : {sim.flows?.join(', ')}</li>
                <li>Transporteurs : {sim.carriersCount}</li>
                <li>Dernier appel d’offres : {sim.lastTender}</li>
                {sim.estimate && (
                  <li className="font-medium">
                    Estimation affichée : {sim.estimate.pct.low} à {sim.estimate.pct.high} %
                  </li>
                )}
              </ul>
            </Card>
          )}

          <Card className="p-5">
            <h2 className="text-sm font-medium text-ink-faint">Factures jointes</h2>
            {lead.files?.length ? (
              <ul className="mt-3 divide-y divide-line">
                {lead.files.map((f) => (
                  <li key={f.id} className="flex items-center justify-between gap-4 py-2.5">
                    <span className="min-w-0 truncate">{f.originalName}</span>
                    <span className="flex shrink-0 items-center gap-4 text-sm">
                      <span className="num text-ink-faint">{Math.max(1, Math.round(f.size / 1024))} ko</span>
                      <a href={`/admin/fichiers/${f.id}`} className="font-medium text-teal hover:underline">
                        Télécharger
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-ink-soft">Aucun fichier.</p>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="text-sm font-medium text-ink-faint">Suivi</h2>
            <LeadStatusForm id={lead.id} status={lead.status} notes={lead.notes ?? ''} />
          </Card>
          <Card className="p-5">
            <h2 className="text-sm font-medium text-ink-faint">Suppression (RGPD)</h2>
            <p className="mt-2 text-sm text-ink-soft">Supprime définitivement la demande et les fichiers associés.</p>
            <form action={deleteLead.bind(null, lead.id)} className="mt-4">
              <ConfirmButton message="Supprimer définitivement cette demande et ses fichiers ?">Supprimer la demande</ConfirmButton>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
