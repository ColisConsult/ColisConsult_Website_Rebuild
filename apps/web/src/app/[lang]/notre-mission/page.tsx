import Link from 'next/link';
import { CtaBand } from '@/components/sections/cta-band';
import { AiMark, Check } from '@/components/ui/icons';
import { PageHero, Section } from '@/components/ui/section';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'method', t.method.label, t.method.lead);
}

export default async function MethodPage() {
  const { t, locale } = await getDictionary();
  const m = t.method;

  return (
    <>
      <PageHero label={m.label} title={m.title} lead={m.lead} />

      <Section index="01" label={m.scopeTitle} tone="white">
        <dl className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
          {m.scope.map((s) => (
            <div key={s.title} className="bg-white p-6 md:p-7">
              <dt className="font-display text-xl font-semibold tracking-tight">{s.title}</dt>
              <dd className="mt-1.5 text-ink-soft">{s.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section index="02" label={m.stepsTitle}>
        <ol className="border-t border-line">
          {m.steps.map((step, i) => (
            <li key={step.title} className="grid gap-x-10 gap-y-4 border-b border-line py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="num text-sm text-ink-faint">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-title">{step.title}</h3>
              </div>
              <div className="md:col-span-8">
                <p className="max-w-2xl text-lg leading-relaxed">{step.text}</p>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  <div>
                    <p className="text-sm text-ink-faint">{t.common.deliverables}</p>
                    <ul className="mt-1.5 flex flex-wrap gap-2">
                      {step.deliverables.map((d) => (
                        <li key={d} className="rounded-sm border border-line-strong bg-white px-2.5 py-1 text-sm">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {step.ai && (
                  <p className="mt-5 flex max-w-2xl items-start gap-2.5 border-l-2 border-coral bg-coral-soft/35 py-2.5 pr-3 pl-3.5 text-[0.95rem]">
                    <AiMark className="mt-1.5 size-2 shrink-0 text-coral-ink" />
                    <span>
                      <span className="font-medium text-coral-ink">{t.common.aiAssisted}.</span> {step.ai}
                    </span>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="03" label={m.independenceTitle} tone="white">
        <div className="grid gap-10 md:grid-cols-3">
          {m.independence.map((p) => (
            <div key={p.title} className="border-t-2 border-teal pt-5">
              <h3 className="text-xl">{p.title}</h3>
              <p className="mt-2 text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="tarifs" index="04" label={m.pricingTitle} tone="dark">
        <div className="grid gap-px overflow-hidden rounded-md bg-white/12 md:grid-cols-2">
          {[m.pricing.result, m.pricing.fixed].map((formula) => (
            <div key={formula.title} className="bg-teal-900 p-7 md:p-9">
              <h3 className="text-title">{formula.title}</h3>
              <ul className="mt-6 space-y-3.5">
                {formula.points.map((p) => (
                  <li key={p} className="flex gap-3 text-white/80">
                    <Check className="mt-1 size-4 shrink-0 text-mint" />
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
