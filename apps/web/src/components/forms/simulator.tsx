'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Aurora } from '../motion/primitives';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { cn } from '@/lib/cn';
import { publicApiUrl } from '@/lib/site';
import { ArrowRight } from '../ui/icons';
import { Consent, FormStatus, Honeypot, SubmitButton, TextField, type SubmitState } from './fields';
import { formToObject, submitLead } from './submit';

type FlowKey = keyof Dictionary['simulator']['flowOptions'];
type TenderKey = keyof Dictionary['simulator']['lastTenderOptions'];

interface Estimate {
  pct: { low: number; high: number };
  annualSavings: { low: number; high: number };
  netFirstYear: { low: number; high: number };
  budgetFit: 'below' | 'typical' | 'above';
}

// Curseur logarithmique : 50 k€ → 20 M€
const MIN = 50_000;
const MAX = 20_000_000;
const toSlider = (v: number) => Math.round((Math.log(v / MIN) / Math.log(MAX / MIN)) * 1000);
const fromSlider = (s: number) => {
  const raw = MIN * Math.pow(MAX / MIN, s / 1000);
  const step = raw < 1_000_000 ? 10_000 : 100_000;
  return Math.round(raw / step) * step;
};

export function SavingsSimulator({
  t,
  forms,
  locale,
  preAuditHref,
  preAuditLabel,
  privacyHref,
}: {
  preAuditLabel: string;
  t: Dictionary['simulator'];
  forms: Dictionary['forms'];
  locale: Locale;
  preAuditHref: string;
  privacyHref: string;
}) {
  const [budget, setBudget] = useState(600_000);
  const [flows, setFlows] = useState<FlowKey[]>(['parcel_domestic', 'express_international']);
  const [carriers, setCarriers] = useState(2);
  const [lastTender, setLastTender] = useState<TenderKey>('over3');
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [leadState, setLeadState] = useState<SubmitState>({ status: 'idle' });

  const eur = (n: number) =>
    new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(n);

  useEffect(() => {
    if (!flows.length || budget < 10_000) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${publicApiUrl}/simulator/estimate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ annualBudget: budget, flows, carriersCount: carriers, lastTender }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(String(res.status));
        setEstimate(await res.json());
        setError(false);
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setError(true);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [budget, flows, carriers, lastTender]);

  async function sendLead(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadState({ status: 'sending' });
    const body = {
      ...formToObject(e.currentTarget),
      locale,
      simulation: { annualBudget: budget, flows, carriersCount: carriers, lastTender, estimate },
    };
    setLeadState(await submitLead('/leads/simulator', body, forms));
  }

  const toggleFlow = (f: FlowKey) =>
    setFlows((cur) => (cur.includes(f) ? (cur.length > 1 ? cur.filter((x) => x !== f) : cur) : [...cur, f]));

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Paramètres */}
      <div className="space-y-10 lg:col-span-7">
        <fieldset>
          <legend className="label !mb-1">{t.budget}</legend>
          <p className="text-sm text-ink-faint">{t.budgetHint}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative w-44 shrink-0">
              <input
                type="number"
                inputMode="numeric"
                min={10_000}
                step={10_000}
                value={budget}
                onChange={(e) => setBudget(Math.max(0, Number(e.target.value)))}
                aria-label={t.budget}
                className="field num pr-8"
              />
              <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink-faint">€</span>
            </div>
            <input
              type="range"
              min={0}
              max={1000}
              value={toSlider(Math.min(Math.max(budget, MIN), MAX))}
              onChange={(e) => setBudget(fromSlider(Number(e.target.value)))}
              aria-label={t.budget}
              className="h-1.5 w-full cursor-pointer accent-coral"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="label">{t.flows}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {(Object.keys(t.flowOptions) as FlowKey[]).map((f) => {
              const on = flows.includes(f);
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleFlow(f)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-[0.95rem] transition-all duration-300 active:scale-95',
                    on ? 'border-teal bg-teal text-white shadow-[0_8px_20px_-10px_rgb(13_82_87/0.8)]' : 'border-line-strong bg-white hover:border-teal hover:text-teal',
                  )}
                >
                  {t.flowOptions[f]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="label">{t.carriers}</legend>
          <Segmented
            value={String(Math.min(carriers, 5))}
            options={{ '1': '1', '2': '2', '3': '3', '4': '4', '5': '5+' }}
            onChange={(v) => setCarriers(Number(v))}
          />
        </fieldset>

        <fieldset>
          <legend className="label">{t.lastTender}</legend>
          <Segmented value={lastTender} options={t.lastTenderOptions} onChange={(v) => setLastTender(v as TenderKey)} />
        </fieldset>
      </div>

      {/* Résultat */}
      <div className="lg:col-span-5">
        <div className="surface-night on-dark sticky top-24 rounded-[var(--radius-card)] p-6 text-white shadow-[0_40px_100px_-40px_rgb(3_28_30/0.6)] md:p-8" aria-live="polite">
          <Aurora variant="cta" />
          <p className="text-sm text-white/65">{t.resultTitle}</p>
          {error ? (
            <p className="mt-4 text-white/80">{t.error}</p>
          ) : estimate ? (
            <div className={cn('transition-opacity', loading && 'opacity-60')}>
              <p className="figure mt-3 text-[clamp(1.9rem,1.4rem+1.8vw,2.8rem)] leading-tight">
                <Tween value={estimate.annualSavings.low} format={eur} />
                <span className="text-white/45"> – </span>
                <Tween value={estimate.annualSavings.high} format={eur} className="text-gradient-coral" />
              </p>
              <p className="mt-2 text-white/70">
                {t.ofBudget.replace('{low}', String(estimate.pct.low)).replace('{high}', String(estimate.pct.high))}
              </p>
              <RangeBar low={estimate.pct.low} high={estimate.pct.high} />

              <div className="mt-7 border-t border-white/15 pt-5">
                <p className="text-sm text-white/65">{t.netTitle}</p>
                <p className="mt-1 font-display text-xl font-semibold text-mint-300 tabular-nums">
                  <Tween value={estimate.netFirstYear.low} format={eur} /> – <Tween value={estimate.netFirstYear.high} format={eur} />
                </p>
                <p className="mt-2 text-sm text-white/55">{t.netNote}</p>
              </div>

              {estimate.budgetFit !== 'typical' && (
                <p className="mt-5 rounded-xl bg-white/8 p-3 text-sm text-white/80">
                  {estimate.budgetFit === 'below' ? t.budgetBelow : t.budgetAbove}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-white/70">{t.emptyState}</p>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={preAuditHref} data-magnetic="" className="btn btn-primary">
              {preAuditLabel}
              <ArrowRight />
            </Link>
            {!showForm && leadState.status !== 'success' && (
              <button type="button" onClick={() => setShowForm(true)} className="btn btn-ghost">
                {t.sendCta}
              </button>
            )}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-white/50">{t.disclaimer}</p>
        </div>

        {showForm && (
          <div className="card mt-6 p-6">
            {leadState.status === 'success' ? (
              <FormStatus state={leadState} t={forms} success={t.sendTitle} />
            ) : (
              <form onSubmit={sendLead} className="relative grid gap-4">
                <p className="font-display font-medium">{t.sendTitle}</p>
                <Honeypot />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label={forms.firstName} name="firstName" required autoComplete="given-name" />
                  <TextField label={forms.lastName} name="lastName" required autoComplete="family-name" />
                </div>
                <TextField label={forms.company} name="company" required autoComplete="organization" />
                <TextField label={forms.email} name="email" type="email" required autoComplete="email" />
                <TextField label={forms.phone} optional={forms.optional} name="phone" type="tel" autoComplete="tel" />
                <Consent t={forms} privacyHref={privacyHref} />
                <FormStatus state={leadState} t={forms} success="" />
                <SubmitButton sending={leadState.status === 'sending'} t={forms} className="self-start" />
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Record<string, string>;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {Object.entries(options).map(([key, label]) => (
        <button
          key={key}
          type="button"
          aria-pressed={value === key}
          onClick={() => onChange(key)}
          className={cn(
            'min-w-11 rounded-full border px-4 py-2 text-[0.95rem] transition-all duration-300 active:scale-95',
            value === key ? 'border-teal bg-teal text-white shadow-[0_8px_20px_-10px_rgb(13_82_87/0.8)]' : 'border-line-strong bg-white hover:border-teal hover:text-teal',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/** Fourchette estimée, placée sur l'échelle 0–25 % (3–22 % = fourchette constatée) */
function RangeBar({ low, high }: { low: number; high: number }) {
  const scale = 25;
  const pos = (v: number) => `${(v / scale) * 100}%`;
  return (
    <div className="mt-6" aria-hidden="true">
      <div className="relative h-2 rounded-full bg-white/10">
        <div className="absolute inset-y-0 rounded-full bg-white/15" style={{ left: pos(3), width: pos(19) }} />
        <div
          className="absolute inset-y-0 rounded-full bg-gradient-to-r from-coral to-[#ffb39f] shadow-[0_0_16px_rgb(255_142_114/0.6)] transition-[left,width] duration-700 ease-[var(--ease-out-expo)]"
          style={{ left: pos(low), width: pos(high - low) }}
        />
      </div>
      <div className="num relative mt-2 h-4 text-[0.7rem] text-white/45">
        {[0, 3, 10, 22].map((v) => (
          <span key={v} className="absolute -translate-x-1/2" style={{ left: pos(v) }}>
            {v}%
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Montant qui glisse vers sa nouvelle valeur quand l'estimation change.
 * L'affichage animé est masqué aux lecteurs d'écran, qui lisent la valeur finale.
 */
function Tween({ value, format, className }: { value: number; format: (n: number) => string; className?: string }) {
  const [shown, setShown] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    const from = current.current;
    if (from === value) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 0 : 650;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = duration ? Math.min(1, (now - start) / duration) : 1;
      const v = from + (value - from) * (1 - Math.pow(1 - t, 3));
      current.current = v;
      setShown(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span className={className}>
      <span aria-hidden="true">{format(Math.round(shown))}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
