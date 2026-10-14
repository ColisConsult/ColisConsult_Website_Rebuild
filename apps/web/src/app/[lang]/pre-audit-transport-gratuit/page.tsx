import Image from 'next/image';
import type { CSSProperties } from 'react';
import portrait from '@/assets/photos/matthieu-portrait.jpg';
import { PreAuditForm } from '@/components/forms/pre-audit-form';
import { CountUp } from '@/components/motion/count-up';
import { ArrowUpRight, Check } from '@/components/ui/icons';
import { PageHero } from '@/components/ui/section';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'preAudit', t.preAudit.title, t.preAudit.lead);
}

export default async function PreAuditPage() {
  const { t, locale } = await getDictionary();
  const p = t.preAudit;
  const proof = t.home.hero.proof;

  return (
    <>
      <PageHero title={p.title} lead={p.lead} compact contentClassName="lg:max-w-[41.6667%] lg:pr-6">
        <p className="flex items-center gap-2 font-medium text-mint-300">
          <Check />
          {t.home.hero.guarantee}
        </p>
      </PageHero>

      <section className="bg-white pb-20 md:pb-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative z-10 lg:order-2 lg:col-span-7 lg:-mt-40">
            <div className="rise card p-6 shadow-[0_40px_100px_-40px_rgb(3_28_30/0.45)] max-lg:mt-8 md:p-10 lg:sticky lg:top-24" style={{ '--delay': '500ms' } as CSSProperties}>
              <h2 className="text-title">{p.formTitle}</h2>
              <div className="mt-8">
                <PreAuditForm t={p} forms={t.forms} locale={locale} privacyHref={href(locale, 'legal')} />
              </div>
            </div>
          </div>

          <div className="lg:order-1 lg:col-span-5 lg:pt-16">
            <h2 data-reveal="" className="text-title">
              {p.stepsTitle}
            </h2>
            <ol data-stagger="" className="mt-6 space-y-6">
              {p.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal font-display text-sm font-semibold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-display font-semibold">{s.title}</span>
                    <span className="mt-0.5 block text-[0.97rem] text-ink-soft">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>

            <figure data-reveal="" className="mt-12 rounded-[var(--radius-card)] bg-mist p-6">
              <p className="figure text-[2.6rem] text-mint-ink">
                <CountUp value={proof.value} />
              </p>
              <blockquote className="mt-2">{proof.text}</blockquote>
              <figcaption className="mt-3 text-sm text-ink-soft">
                <span className="font-medium text-ink">{proof.author}</span>, {proof.role}
              </figcaption>
            </figure>

            <div data-reveal="" className="mt-6 flex items-center gap-4">
              <Image src={portrait} alt="" width={64} height={64} sizes="64px" className="size-16 shrink-0 rounded-full object-cover object-top" />
              <div className="text-[0.95rem]">
                <p className="font-medium">{p.contactTitle}</p>
                <p className="text-ink-soft">
                  <a href={site.phoneHref} className="link tabular-nums">
                    {locale === 'fr' ? site.phone : site.phoneIntl}
                  </a>
                  {' · '}
                  <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="link">
                    {t.common.bookMeeting}
                    <ArrowUpRight />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
