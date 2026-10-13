'use client';

import { useFormAction } from '@/components/admin/use-form-action';
import { LEAD_STATUS } from '@/components/admin/ui';
import type { Lead } from '@/lib/types';
import { updateLead } from '../../../actions';

export function LeadStatusForm({ id, status, notes }: { id: string; status: Lead['status']; notes: string }) {
  const { state, onSubmit, pending } = useFormAction(updateLead.bind(null, id));
  return (
    <form onSubmit={onSubmit} className="mt-3 space-y-4">
      <div>
        <label htmlFor="status" className="label">Statut</label>
        <select id="status" name="status" defaultValue={status} className="field field-select">
          {Object.entries(LEAD_STATUS).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="notes" className="label">Notes internes</label>
        <textarea id="notes" name="notes" rows={5} defaultValue={notes} className="field" />
      </div>
      {state.error && <p className="text-sm text-coral-ink">{state.error}</p>}
      {state.ok && !pending && <p className="text-sm text-mint-ink">Enregistré.</p>}
      <button type="submit" disabled={pending} className="btn btn-dark disabled:opacity-60">
        {pending ? 'Enregistrement…' : 'Enregistrer'}
      </button>
    </form>
  );
}
