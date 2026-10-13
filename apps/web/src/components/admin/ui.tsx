import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { Lead } from '@/lib/types';

export const LEAD_TYPE: Record<Lead['type'], string> = {
  contact: 'Contact',
  pre_audit: 'Pré-audit',
  simulator: 'Simulateur',
};
export const LEAD_STATUS: Record<Lead['status'], string> = {
  new: 'Nouvelle',
  in_progress: 'En cours',
  done: 'Traitée',
  archived: 'Archivée',
};
export const BUDGET: Record<string, string> = {
  '<150k': 'Moins de 150 k€',
  '150k-500k': '150 à 500 k€',
  '500k-2m': '500 k€ à 2 M€',
  '2m-10m': '2 à 10 M€',
  '>10m': 'Plus de 10 M€',
};

export function PageTitle({ title, children, back }: { title: string; children?: ReactNode; back?: { href: string; label: string } }) {
  return (
    <div className="mb-8">
      {back && (
        <Link href={back.href} className="text-sm text-ink-soft hover:text-ink">
          ← {back.label}
        </Link>
      )}
      <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[1.75rem] leading-tight">{title}</h1>
        {children && <div className="flex items-center gap-3">{children}</div>}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: Lead['status'] }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-sm px-2 py-0.5 text-xs font-medium',
        status === 'new' && 'bg-coral-soft text-coral-ink',
        status === 'in_progress' && 'bg-teal-100 text-teal',
        status === 'done' && 'bg-mint/15 text-mint-ink',
        status === 'archived' && 'bg-paper-deep text-ink-faint',
      )}
    >
      {LEAD_STATUS[status]}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-md border border-line bg-white', className)}>{children}</div>;
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <Card className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line text-ink-faint">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </Card>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-md border border-dashed border-line-strong p-8 text-center text-ink-soft">{children}</p>;
}

export function Saved({ show, label = 'Modifications enregistrées.' }: { show: boolean; label?: string }) {
  if (!show) return null;
  return <p className="mb-6 rounded-md border border-mint/40 bg-mint/10 px-4 py-3 text-sm">{label}</p>;
}

export function LoadingBlock() {
  return (
    <div className="animate-pulse space-y-3" aria-busy="true">
      <div className="h-8 w-56 rounded bg-line" />
      <div className="h-40 rounded bg-line/70" />
    </div>
  );
}

export const fmtDate = (v: string | null) =>
  v
    ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Paris' }).format(new Date(v))
    : '—';
