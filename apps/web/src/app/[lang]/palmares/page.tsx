import { ContactForm } from '@/components/forms/contact-form';
import { CtaBand } from '@/components/sections/cta-band';
import { ArrowUpRight } from '@/components/ui/icons';
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
      <PageHero label={r.label} title={r.title} lead={r.lead}>
        <dl className="grid max-w-4xl grid-cols-3 gap-6 border-t border-line pt-8">
          {r.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(2.2rem,1.4rem+3vw,4rem)] leading-none font-semibold tracking-tight text-teal">
                  {s.value}
                </span>
                <span className="mt-2 block text-ink-soft">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section index="01" label={r.questionsTitle} tone="white">
        <ol className="grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2">
          {r.questions.map((q, i) => (
            <li key={q} className="bg-white p-6 md:p-8">
              <span className="num text-sm text-ink-faint">Q{i + 1}</span>
              <p className="mt-3 font-display text-xl font-medium tracking-tight">{q}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="02" label={r.methodTitle}>
        <ul className="max-w-2xl space-y-4 text-lg">
          {r.method.map((m) => (
            <li key={m} className="flex gap-4">
              <span className="mt-3 size-1.5 shrink-0 bg-coral" aria-hidden="true" />
              {m}
            </li>
          ))}
        </ul>
        <a href={site.tarifColis} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-1.5 font-display font-medium text-teal hover:underline">
          {r.observatory}
          <ArrowUpRight />
        </a>
      </Section>

      <Section id="recevoir" index="03" label={r.formTitle} title={r.formTitle} intro={r.formText} tone="white">
        <div className="max-w-2xl">
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
