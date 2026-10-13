import { PreAuditForm } from '@/components/forms/pre-audit-form';
import { Check } from '@/components/ui/icons';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'preAudit', t.preAudit.title, t.preAudit.lead);
}

export default async function PreAuditPage() {
  const { t, locale } = await getDictionary();
  const p = t.preAudit;
  return (
    <div className="container-site grid gap-14 pt-16 pb-24 md:pt-24 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="flex items-center gap-3 font-display text-sm font-medium text-ink-soft">
          <span className="h-px w-8 bg-coral" aria-hidden="true" />
          {p.label}
        </p>
        <h1 className="mt-6 text-[clamp(2.3rem,1.5rem+3vw,3.8rem)] leading-[1.04]">{p.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">{p.lead}</p>
        <p className="mt-5 flex items-center gap-2 font-medium text-mint-ink">
          <Check />
          {t.home.hero.guarantee}
        </p>

        <h2 className="mt-14 font-display text-sm font-medium text-ink-soft">{p.stepsTitle}</h2>
        <ol className="mt-4 border-t border-line">
          {p.steps.map((s, i) => (
            <li key={s.title} className="flex gap-5 border-b border-line py-5">
              <span className="num pt-0.5 text-sm text-coral-ink">0{i + 1}</span>
              <span>
                <span className="block font-display text-lg font-medium tracking-tight">{s.title}</span>
                <span className="mt-0.5 block text-[0.97rem] text-ink-soft">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="lg:col-span-7">
        <div className="rounded-md border border-line bg-white p-6 md:p-10 lg:sticky lg:top-24">
          <h2 className="text-title">{p.formTitle}</h2>
          <div className="mt-8">
            <PreAuditForm t={p} forms={t.forms} locale={locale} privacyHref={href(locale, 'legal')} />
          </div>
        </div>
      </div>
    </div>
  );
}
