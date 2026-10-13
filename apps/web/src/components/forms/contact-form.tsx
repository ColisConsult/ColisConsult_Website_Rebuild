'use client';

import { useState, type FormEvent } from 'react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Consent, FormStatus, Honeypot, SubmitButton, TextArea, TextField, type SubmitState } from './fields';
import { formToObject, submitLead } from './submit';

export function ContactForm({
  t,
  locale,
  success,
  privacyHref,
  presetMessage,
  submitLabel,
}: {
  t: Dictionary['forms'];
  locale: Locale;
  success: string;
  privacyHref: string;
  /** Message imposé (ex. demande du palmarès) : le champ message est alors masqué */
  presetMessage?: string;
  submitLabel?: string;
}) {
  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ status: 'sending' });
    const body = { ...formToObject(form), locale, ...(presetMessage ? { message: presetMessage } : {}) };
    const result = await submitLead('/leads/contact', body, t);
    setState(result);
    if (result.status === 'success') form.reset();
  }

  if (state.status === 'success') return <FormStatus state={state} t={t} success={success} />;

  return (
    <form onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2" noValidate={false}>
      <Honeypot />
      <TextField label={t.firstName} name="firstName" autoComplete="given-name" required maxLength={100} />
      <TextField label={t.lastName} name="lastName" autoComplete="family-name" required maxLength={100} />
      <TextField label={t.company} name="company" autoComplete="organization" required maxLength={200} />
      <TextField label={t.jobTitle} optional={t.optional} name="jobTitle" autoComplete="organization-title" maxLength={150} />
      <TextField label={t.email} name="email" type="email" autoComplete="email" required maxLength={200} />
      <TextField label={t.phone} optional={t.optional} name="phone" type="tel" autoComplete="tel" maxLength={40} />
      {!presetMessage && (
        <TextArea label={t.message} name="message" required minLength={5} maxLength={5000} className="sm:col-span-2" />
      )}
      <div className="sm:col-span-2">
        <Consent t={t} privacyHref={privacyHref} />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2">
        <FormStatus state={state} t={t} success={success} />
        <SubmitButton sending={state.status === 'sending'} t={t} className="self-start">
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
}
