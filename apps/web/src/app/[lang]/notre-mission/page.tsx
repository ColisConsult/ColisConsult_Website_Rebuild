import Link from 'next/link';
import matthieuTravail from '@/assets/photos/matthieu-travail.jpg';
import { CtaBand } from '@/components/sections/cta-band';
import { Check } from '@/components/ui/icons';
import { PageHero, Section } from '@/components/ui/section';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'method', t.method.title, t.method.lead);
}

export default async function MethodPage() {
  const { t, locale } = await getDictionary();
  const m = t.method;

  return (
    <>
      <PageHero title={m.title} lead={m.lead} image={{ src: matthieuTravail, alt: m.photoAlt, caption: m.photoCaption, position: '30% center' }}>
        <h2 className="font-display text-sm font-medium text-ink-soft">{m.scopeTitle}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {m.scope.map((s) => (
            <li key={s} className="rounded-full bg-mist px-3.5 py-1.5 text-[0.95rem] text-teal-900">
              {s}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section tone="mist" title={m.stepsTitle} lead={m.stepsLead}>
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {m.steps.map((step, i) => (
            <li key={step.title} className="flex flex-col rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line md:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-teal font-display text-sm font-semibold text-white">
                  {i + 1}
                </span>
                {step.ai && (
                  <span className="rounded-md bg-coral-soft px-2 py-0.5 text-xs font-medium text-coral-ink">{t.common.aiAssisted}</span>
                )}
              </div>
              <h3 className="mt-5 text-title">{step.title}</h3>
              <p className="mt-2 text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={m.tipsTitle}>
        <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
          {m.tips.map((tip) => (
            <li key={tip} className="flex gap-3.5 text-lg">
              <Check className="mt-1.5 size-5 shrink-0 text-mint-ink" />
              {tip}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" title={m.independenceTitle}>
        <div className="grid gap-5 md:grid-cols-3">
          {m.independence.map((p) => (
            <div key={p.title} className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line md:p-7">
              <h3 className="text-title">{p.title}</h3>
              <p className="mt-2 text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="tarifs" tone="dark" title={m.pricingTitle}>
        <div className="grid gap-5 md:grid-cols-2">
          {[m.pricing.result, m.pricing.fixed].map((formula) => (
            <div key={formula.title} className="rounded-[var(--radius-card)] bg-teal-900 p-7 md:p-9">
              <h3 className="text-title">{formula.title}</h3>
              <ul className="mt-6 space-y-3.5">
                {formula.points.map((p) => (
                  <li key={p} className="flex gap-3 text-white/85">
                    <Check className="mt-1 size-4 shrink-0 text-coral" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link href={href(locale, 'contact')} className="btn btn-primary mt-10">
          {m.pricing.cta}
        </Link>
      </Section>

      <CtaBand t={t} locale={locale} />
    </>
  );
}
