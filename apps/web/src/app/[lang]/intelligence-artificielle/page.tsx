import majdi from '@/assets/photos/majdi-ecran.jpg';
import { SpendInsight } from '@/components/sections/ai-home';
import { CtaBand } from '@/components/sections/cta-band';
import { Plus } from '@/components/ui/icons';
import { PageHero, Section } from '@/components/ui/section';
import { getDictionary } from '@/i18n/get-dictionary';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'ai', t.ai.title, t.ai.lead);
}

export default async function AiPage() {
  const { t, locale } = await getDictionary();
  const a = t.ai;

  return (
    <>
      <PageHero
        title={a.title}
        lead={a.lead}
        image={{ src: majdi, alt: t.home.ai.photoAlt, caption: t.home.ai.photoCaption, position: '35% center' }}
      />

      <Section tone="mist">
        <div className="grid gap-5 lg:grid-cols-3">
          {a.uses.map((use) => (
            <article key={use.title} className="flex flex-col rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line md:p-7">
              <h2 className="text-title">{use.title}</h2>
              <dl className="mt-5 space-y-5">
                {(['problem', 'ai', 'human'] as const).map((row) => (
                  <div key={row}>
                    <dt
                      className={cn(
                        'text-sm font-medium',
                        row === 'problem' && 'text-ink-faint',
                        row === 'ai' && 'text-coral-ink',
                        row === 'human' && 'text-teal',
                      )}
                    >
                      {a.rows[row]}
                    </dt>
                    <dd className={cn('mt-1', row === 'problem' ? 'text-ink-soft' : 'text-ink')}>{use[row]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <SpendInsight t={t.home.insight} locale={locale} className="mt-5" />
      </Section>

      <Section title={a.limitsTitle}>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {a.limits.map((l) => (
            <div key={l.title}>
              <h3 className="text-title">{l.title}</h3>
              <p className="mt-2 text-ink-soft">{l.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark" title={a.dataTitle} lead={a.dataText} />

      <Section title={a.faqTitle} narrow>
        <div className="border-t border-line">
          {a.faq.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="size-5 shrink-0 text-ink-soft transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-2xl pb-6 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CtaBand t={t} locale={locale} />
    </>
  );
}
