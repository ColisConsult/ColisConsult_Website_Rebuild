import Link from 'next/link';
import type { Lead } from '@/lib/types';
import { LEAD_TYPE, StatusBadge, fmtDate } from './ui';

export function LeadRow({ lead }: { lead: Lead }) {
  return (
    <tr className="hover:bg-paper/70">
      <td className="px-4 py-3 whitespace-nowrap text-ink-soft">{fmtDate(lead.createdAt)}</td>
      <td className="px-4 py-3">{LEAD_TYPE[lead.type]}</td>
      <td className="px-4 py-3 font-medium">
        <Link href={`/admin/demandes/${lead.id}`} className="hover:text-teal hover:underline">
          {lead.company}
        </Link>
      </td>
      <td className="px-4 py-3">
        {lead.firstName} {lead.lastName}
        <span className="block text-ink-faint">{lead.email}</span>
      </td>
      <td className="num px-4 py-3">{lead.fileCount ? lead.fileCount : '—'}</td>
      <td className="px-4 py-3">
        <StatusBadge status={lead.status} />
      </td>
    </tr>
  );
}
