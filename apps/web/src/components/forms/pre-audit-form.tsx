'use client';

import { useRef, useState, type DragEvent, type FormEvent } from 'react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { cn } from '@/lib/cn';
import { Paperclip } from '../ui/icons';
import { Consent, FormStatus, Honeypot, SelectField, SubmitButton, TextArea, TextField, type SubmitState } from './fields';
import { submitLead } from './submit';

const ACCEPTED = ['.pdf', '.xlsx', '.xls', '.csv'];
const MAX_FILES = 10;
const MAX_MB = 15;

const ext = (name: string) => name.slice(name.lastIndexOf('.')).toLowerCase();
const size = (bytes: number, locale: Locale) => {
  const [mb, kb] = locale === 'fr' ? ['Mo', 'ko'] : ['MB', 'KB'];
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} ${mb}`
    : `${Math.max(1, Math.round(bytes / 1024))} ${kb}`;
};

export function PreAuditForm({
  t,
  forms,
  locale,
  privacyHref,
}: {
  t: Dictionary['preAudit'];
  forms: Dictionary['forms'];
  locale: Locale;
  privacyHref: string;
}) {
  const [state, setState] = useState<SubmitState>({ status: 'idle' });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    const errors: string[] = [];
    for (const file of Array.from(list)) {
      if (!ACCEPTED.includes(ext(file.name))) errors.push(`${forms.fileType} ${file.name}`);
      else if (file.size > MAX_MB * 1024 * 1024) errors.push(`${forms.fileTooLarge} ${file.name}`);
      else if (!next.some((f) => f.name === file.name && f.size === file.size)) next.push(file);
    }
    if (next.length > MAX_FILES) errors.push(forms.tooManyFiles);
    setFiles(next.slice(0, MAX_FILES));
    setFileError(errors.length ? errors.join(' · ') : null);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.delete('files');
    for (const f of files) data.append('files', f, f.name);
    data.set('consent', data.get('consent') === 'true' ? 'true' : 'false');
    data.set('locale', locale);
    if (!data.get('annualBudget')) data.delete('annualBudget');
    setState({ status: 'sending' });
    const result = await submitLead('/leads/pre-audit', data, forms);
    setState(result);
    if (result.status === 'success') {
      form.reset();
      setFiles([]);
    }
  }

  if (state.status === 'success') return <FormStatus state={state} t={forms} success={t.success} />;

  return (
    <form onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot />
      <TextField label={forms.firstName} name="firstName" autoComplete="given-name" required maxLength={100} />
      <TextField label={forms.lastName} name="lastName" autoComplete="family-name" required maxLength={100} />
      <TextField label={forms.company} name="company" autoComplete="organization" required maxLength={200} />
      <TextField label={forms.jobTitle} optional={forms.optional} name="jobTitle" autoComplete="organization-title" maxLength={150} />
      <TextField label={forms.email} name="email" type="email" autoComplete="email" required maxLength={200} />
      <TextField label={forms.phone} optional={forms.optional} name="phone" type="tel" autoComplete="tel" maxLength={40} />
      <SelectField
        label={t.budget}
        optional={forms.optional}
        name="annualBudget"
        options={t.budgetOptions}
        placeholder={t.budgetPlaceholder}
        defaultValue=""
      />
      <TextField label={t.carriers} optional={forms.optional} name="carriers" placeholder={t.carriersPlaceholder} maxLength={500} />
      <TextArea label={t.message} optional={forms.optional} name="message" maxLength={5000} className="sm:col-span-2" rows={3} />

      <div className="sm:col-span-2">
        <p className="label">
          {t.files} <span className="font-normal text-ink-faint">({t.filesOptional})</span>
        </p>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            'rounded-md border border-dashed bg-white px-5 py-6 text-center transition-colors',
            dragging ? 'border-teal bg-teal-50' : 'border-line-strong',
          )}
        >
          <Paperclip className="mx-auto size-5 text-ink-faint" />
          <p className="mt-2 text-[0.95rem]">
            {t.filesDrop}{' '}
            <button type="button" onClick={() => inputRef.current?.click()} className="link font-medium text-teal">
              {t.filesBrowse}
            </button>
          </p>
          <p className="mt-1 text-sm text-ink-faint">{t.filesHint}</p>
          <input
            ref={inputRef}
            type="file"
            name="files"
            multiple
            accept={ACCEPTED.join(',')}
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </div>
        {fileError && (
          <p role="alert" className="mt-2 text-sm text-coral-ink">
            {fileError}
          </p>
        )}
        {files.length > 0 && (
          <ul className="mt-3 divide-y divide-line rounded-md border border-line bg-white">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
                <span className="min-w-0 truncate">{f.name}</span>
                <span className="flex shrink-0 items-center gap-4">
                  <span className="num text-ink-faint">{size(f.size, locale)}</span>
                  <button
                    type="button"
                    onClick={() => setFiles(files.filter((_, j) => j !== i))}
                    className="text-ink-soft underline-offset-2 hover:text-coral-ink hover:underline"
                  >
                    {t.filesRemove}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sm:col-span-2">
        <Consent t={forms} privacyHref={privacyHref} />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2">
        <FormStatus state={state} t={forms} success={t.success} />
        <SubmitButton sending={state.status === 'sending'} t={forms} className="self-start">
          {t.formTitle}
        </SubmitButton>
      </div>
    </form>
  );
}
