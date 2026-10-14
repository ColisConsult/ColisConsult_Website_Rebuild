import { ContactForm } from '@/components/forms/contact-form';
import { CountUp } from '@/components/motion/count-up';
import { CtaBand } from '@/components/sections/cta-band';
import { ArrowUpRight, Check } from '@/components/ui/icons';
import { PageHero, Section } from '@/components/ui/section';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'rankings', `${t.rankings.title} · ${t.rankings.label}`, t.rankings.lead);
}

export default async function RankingsPage() {
  const { t, locale } = await getDictionary();
  const r = t.rankings;

  return (
    <>
      <PageHero title={`${r.title} · ${r.label}`} lead={r.lead}>
        <dl className="grid max-w-3xl grid-cols-3 gap-6 border-t border-white/12 pt-8">
          {r.stats.map((s, i) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="figure block text-[clamp(2.2rem,1.4rem+3vw,3.8rem)] text-gradient-coral">
                  <CountUp value={s.value} delay={500 + i * 150} />
                </span>
                <span className="mt-2 block text-white/60">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section tone="mist" title={r.questionsTitle}>
        <ul data-stagger="" className="grid gap-5 md:grid-cols-2">
          {r.questions.map((q, i) => (
            <li key={q}>
              <p data-spotlight="" className="card card-lift spot flex h-full items-start gap-5 p-6 font-display text-lg font-semibold tracking-tight md:p-8">
                <span className="figure shrink-0 text-[1.6rem] text-coral" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {q}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={r.methodTitle}>
        <ul data-stagger="" className="max-w-2xl space-y-3 text-lg">
          {r.method.map((m) => (
            <li key={m} className="flex gap-3.5">
              <Check className="mt-1.5 size-5 shrink-0 text-mint-ink" />
              {m}
            </li>
          ))}
        </ul>
        <a href={site.tarifColis} target="_blank" rel="noopener noreferrer" className="link mt-8 inline-block font-display font-medium text-teal">
          {r.observatory}
          <ArrowUpRight />
        </a>
      </Section>

      <Section id="recevoir" tone="mist" title={r.formTitle} lead={r.formText}>
        <div data-reveal="" className="card max-w-2xl p-6 shadow-[0_30px_80px_-40px_rgb(3_28_30/0.35)] md:p-10">
          <ContactForm
            t={t.forms}
            locale={locale}
            success={t.contact.success}
            privacyHref={href(locale, 'legal')}
            presetMessage={r.formMessage}
            submitLabel={r.formTitle}
          />
        </div>
      </Section>

      <CtaBand t={t} locale={locale} />
    </>
  );
}
