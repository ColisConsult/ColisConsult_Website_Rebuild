'use client';

import { useFormAction } from '@/components/admin/use-form-action';
import type { Testimonial } from '@/lib/types';
import { saveTestimonial } from '../../actions';

function F({ label, name, defaultValue, required, hint, textarea, rows = 4 }: { label: string; name: string; defaultValue?: string | number | null; required?: boolean; hint?: string; textarea?: boolean; rows?: number }) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label} {hint && <span className="font-normal text-ink-faint">({hint})</span>}
      </label>
      {textarea ? (
        <textarea id={name} name={name} rows={rows} required={required} defaultValue={defaultValue ?? ''} className="field" />
      ) : (
        <input id={name} name={name} required={required} defaultValue={defaultValue ?? ''} className="field" />
      )}
    </div>
  );
}

export function TestimonialForm({ item }: { item: Testimonial | null }) {
  const { state, onSubmit, pending } = useFormAction(saveTestimonial.bind(null, item?.id ?? null));
  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-5 rounded-md border border-line bg-white p-5 lg:col-span-2">
        <div className="grid gap-5 sm:grid-cols-2">
          <F label="Entreprise" name="company" required defaultValue={item?.company} />
          <F label="Auteur" name="author" required defaultValue={item?.author} />
        </div>
        <F label="Fonction" name="role" defaultValue={item?.role} />
        <F label="Témoignage (français)" name="quoteFr" required textarea defaultValue={item?.quoteFr} hint="texte exact ; signalez les coupes par […]" />
        <F label="Témoignage (anglais)" name="quoteEn" textarea defaultValue={item?.quoteEn} hint="facultatif" />
        <div className="grid gap-5 sm:grid-cols-2">
          <F label="Mission (FR)" name="missionFr" defaultValue={item?.missionFr} />
          <F label="Mission (EN)" name="missionEn" defaultValue={item?.missionEn} />
          <F label="Résultat mis en avant (FR)" name="resultFr" defaultValue={item?.resultFr} hint="ex. −19 %" />
          <F label="Résultat mis en avant (EN)" name="resultEn" defaultValue={item?.resultEn} />
        </div>
      </div>
      <div className="space-y-5">
        <div className="space-y-5 rounded-md border border-line bg-white p-5">
          <div>
            <label htmlFor="quoteLang" className="label">Langue d’origine</label>
            <select id="quoteLang" name="quoteLang" defaultValue={item?.quoteLang ?? 'fr'} className="field field-select">
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
            </select>
            <p className="mt-1 text-xs text-ink-faint">L’autre version est signalée comme traduction sur le site.</p>
          </div>
          <div>
            <label htmlFor="segment" className="label">Segment</label>
            <select id="segment" name="segment" defaultValue={item?.segment ?? 'enterprise'} className="field field-select">
              <option value="enterprise">Grand groupe</option>
              <option value="ecommerce">E-commerce</option>
              <option value="sme">PME</option>
            </select>
          </div>
          <F label="Ordre d’affichage" name="sortOrder" defaultValue={item?.sortOrder ?? 0} />
          <label className="flex items-center gap-2.5">
            <input type="checkbox" name="featured" defaultChecked={item?.featured ?? false} className="size-4 accent-teal" />
            Mettre en avant sur l’accueil
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
