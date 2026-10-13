'use client';

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useId } from 'react';
import type { Dictionary } from '@/i18n/get-dictionary';
import { cn } from '@/lib/cn';

type Base = { label: string; optional?: string; hint?: ReactNode; className?: string };

export function TextField({ label, optional, hint, className, ...props }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="font-normal text-ink-faint"> ({optional})</span>}
      </label>
      <input id={id} className="field" aria-describedby={hint ? `${id}-hint` : undefined} {...props} />
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-faint">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextArea({ label, optional, className, ...props }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="font-normal text-ink-faint"> ({optional})</span>}
      </label>
      <textarea id={id} className="field min-h-32 resize-y" {...props} />
    </div>
  );
}

export function SelectField({
  label,
  optional,
  className,
  options,
  placeholder,
  ...props
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { options: Record<string, string>; placeholder?: string }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="font-normal text-ink-faint"> ({optional})</span>}
      </label>
      <select id={id} className="field field-select" {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {Object.entries(options).map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Consent({ t, privacyHref }: { t: Dictionary['forms']; privacyHref: string }) {
  const id = useId();
  return (
    <div className="flex gap-3 text-sm text-ink-soft">
      <input id={id} name="consent" type="checkbox" required value="true" className="mt-0.5 size-4 shrink-0 accent-teal" />
      <label htmlFor={id}>
        {t.consent}{' '}
        <a href={privacyHref} className="link text-ink" target="_blank">
          {t.privacyLink}
        </a>
      </label>
    </div>
  );
}

/** Champ piège anti-spam, invisible pour les humains */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Site web
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormStatus({ state, t, success }: { state: SubmitState; t: Dictionary['forms']; success: string }) {
  if (state.status === 'success') {
    return (
      <div role="status" className="rounded-md border border-mint/40 bg-mint/10 p-4 text-[0.97rem] text-ink">
        {success}
      </div>
    );
  }
  if (state.status === 'error') {
    return (
      <div role="alert" className="rounded-md border border-coral-ink/30 bg-coral-soft/50 p-4 text-[0.95rem] text-ink">
        {state.message ?? t.error}
      </div>
    );
  }
  return null;
}

export type SubmitState = { status: 'idle' | 'sending' | 'success' | 'error'; message?: string };

export function SubmitButton({ sending, t, children, className }: { sending: boolean; t: Dictionary['forms']; children?: ReactNode; className?: string }) {
  return (
    <button type="submit" disabled={sending} className={cn('btn btn-dark disabled:opacity-60', className)}>
      {sending ? t.sending : (children ?? t.submit)}
    </button>
  );
}
