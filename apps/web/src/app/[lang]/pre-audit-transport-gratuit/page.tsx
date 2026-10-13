import Image from 'next/image';
import portrait from '@/assets/photos/matthieu-portrait.jpg';
import { PreAuditForm } from '@/components/forms/pre-audit-form';
import { ArrowUpRight, Check } from '@/components/ui/icons';
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
    <div className="container-site grid gap-12 pt-12 pb-20 md:pt-20 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <h1 className="text-[clamp(2.1rem,1.5rem+2vw,3rem)] leading-[1.1]">{p.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">{p.lead}</p>
        <p className="mt-5 flex items-center gap-2 font-medium text-mint-ink">
          <Check />
          {t.home.hero.guarantee}
        </p>

        <h2 className="mt-12 text-title">{p.stepsTitle}</h2>
        <ol className="mt-5 space-y-5">
          {p.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal font-display text-sm font-semibold text-white"
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

        <figure className="mt-12 rounded-[var(--radius-card)] bg-mist p-6">
          <p className="figure text-[2.2rem] text-mint-ink">{proof.value}</p>
          <blockquote className="mt-2">{proof.text}</blockquote>
          <figcaption className="mt-3 text-sm text-ink-soft">
            <span className="font-medium text-ink">{proof.author}</span>, {proof.role}
          </figcaption>
        </figure>

        <div className="mt-6 flex items-center gap-4">
          <Image src={portrait} alt="" width={64} height={64} sizes="64px" className="size-16 shrink-0 rounded-full object-cover object-top" />
          <div className="text-[0.95rem]">
            <p className="font-medium">{p.contactTitle}</p>
            <p className="text-ink-soft">
              <a href={site.phoneHref} className="link tabular-nums">
                {locale === 'fr' ? site.phone : site.phoneIntl}
              </a>
              {' · '}
              <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                {t.common.bookMeeting}
                <ArrowUpRight />
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <div className="rounded-[var(--radius-media)] bg-white p-6 ring-1 ring-line md:p-10 lg:sticky lg:top-24">
          <h2 className="text-title">{p.formTitle}</h2>
          <div className="mt-8">
            <PreAuditForm t={p} forms={t.forms} locale={locale} privacyHref={href(locale, 'legal')} />
          </div>
        </div>
      </div>
    </div>
  );
}
