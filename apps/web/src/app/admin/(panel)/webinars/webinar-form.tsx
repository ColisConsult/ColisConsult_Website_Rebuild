'use client';

import { useFormAction } from '@/components/admin/use-form-action';
import { isoToParisInput } from '@/lib/paris-time';
import type { Webinar } from '@/lib/types';
import { saveWebinar } from '../../actions';

export function WebinarForm({ item }: { item: Webinar | null }) {
  const { state, onSubmit, pending } = useFormAction(saveWebinar.bind(null, item?.id ?? null));
  const field = (label: string, name: keyof Webinar, opts: { required?: boolean; type?: string; textarea?: boolean; hint?: string; value?: string } = {}) => (
    <div>
      <label htmlFor={name} className="label">
        {label} {opts.hint && <span className="font-normal text-ink-faint">({opts.hint})</span>}
      </label>
      {opts.textarea ? (
        <textarea id={name} name={name} rows={3} defaultValue={(item?.[name] as string) ?? ''} className="field" />
      ) : (
        <input
          id={name}
          name={name}
          type={opts.type ?? 'text'}
          required={opts.required}
          defaultValue={opts.value ?? ((item?.[name] as string | number | undefined) ?? '')}
          className="field"
        />
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-5 rounded-md border border-line bg-white p-5 lg:col-span-2">
        {field('Titre (FR)', 'titleFr', { required: true })}
        {field('Titre (EN)', 'titleEn', { hint: 'facultatif' })}
        {field('Description (FR)', 'descriptionFr', { textarea: true })}
        {field('Description (EN)', 'descriptionEn', { textarea: true, hint: 'facultatif' })}
        <div className="grid gap-5 sm:grid-cols-2">
          {field('Lien d’inscription', 'registrationUrl', { type: 'url', hint: 'Livestorm…' })}
          {field('Lien du replay', 'replayUrl', { type: 'url', hint: 'YouTube…' })}
        </div>
      </div>
      <div className="space-y-5">
        <div className="space-y-5 rounded-md border border-line bg-white p-5">
          {field('Date et heure (Paris)', 'startsAt', { type: 'datetime-local', required: true, value: isoToParisInput(item?.startsAt) })}
          {field('Durée (minutes)', 'durationMinutes', { type: 'number', value: String(item?.durationMinutes ?? 45) })}
          <label className="flex items-center gap-2.5">
            <input type="checkbox" name="published" defaultChecked={item?.published ?? true} className="size-4 accent-teal" />
            Visible sur le site
          </label>
        </div>
        {state.error && <p role="alert" className="rounded-md bg-coral-soft/60 p-3 text-sm">{state.error}</p>}
        <button type="submit" disabled={pending} className="btn btn-dark w-full justify-center disabled:opacity-60">
          {pending ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}
