import Link from 'next/link';
import matthieuTravail from '@/assets/photos/matthieu-travail.jpg';
import { CtaBand } from '@/components/sections/cta-band';
import { AiMark, ArrowRight, Check } from '@/components/ui/icons';
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
        <h2 className="font-display text-sm font-medium text-white/55">{m.scopeTitle}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {m.scope.map((s) => (
            <li key={s} className="rounded-full bg-white/[0.07] px-3.5 py-1.5 text-[0.95rem] text-white/85 ring-1 ring-white/12 backdrop-blur">
              {s}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section tone="mist" title={m.stepsTitle} lead={m.stepsLead}>
        <ol data-stagger="" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {m.steps.map((step, i) => (
            <li key={step.title}>
              <article data-spotlight="" className="card card-lift spot flex h-full flex-col p-6 md:p-8">
                <div className="flex items-start justify-between gap-3">
                  <span className="figure text-[2.8rem] text-gradient-coral" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {step.ai && (
                    <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-coral-soft px-2.5 py-1 text-xs font-medium text-coral-ink">
                      <AiMark className="size-2" />
                      {t.common.aiAssisted}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-title">{step.title}</h3>
                <p className="mt-2 text-ink-soft">{step.text}</p>
              </article>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={m.tipsTitle}>
        <ul data-stagger="" className="grid gap-x-12 gap-y-5 md:grid-cols-2">
          {m.tips.map((tip) => (
            <li key={tip} className="flex gap-3.5 text-lg">
              <Check className="mt-1.5 size-5 shrink-0 text-mint-ink" />
              {tip}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" title={m.independenceTitle}>
        <ul data-stagger="" className="grid gap-5 md:grid-cols-3">
          {m.independence.map((p) => (
            <li key={p.title}>
              <article data-spotlight="" className="card card-lift spot spot-mint h-full p-6 md:p-8">
                <h3 className="text-title">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.text}</p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tarifs" tone="dark" title={m.pricingTitle}>
        <div data-stagger="" className="grid gap-5 md:grid-cols-2">
          {[m.pricing.result, m.pricing.fixed].map((formula) => (
            <div key={formula.title} data-spotlight="" className="card-glass spot p-7 md:p-9">
              <h3 className="text-title text-white">{formula.title}</h3>
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
        <Link href={href(locale, 'contact')} data-magnetic="" className="btn btn-primary mt-10">
          {m.pricing.cta}
          <ArrowRight className="size-4" />
        </Link>
      </Section>

      <CtaBand t={t} locale={locale} />
    </>
  );
}
