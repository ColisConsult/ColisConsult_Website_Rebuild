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
        <ul data-stagger="" className="grid gap-5 lg:grid-cols-3">
          {a.uses.map((use) => (
            <li key={use.title}>
              <article data-spotlight="" className="card card-lift spot flex h-full flex-col p-6 md:p-8">
                <h2 className="text-title">{use.title}</h2>
                {/* Du problème à la décision : un fil relie les trois temps */}
                <dl className="relative mt-6 space-y-6 pl-7">
                  <span className="absolute top-2 bottom-2 left-[0.3rem] w-px bg-gradient-to-b from-line-strong via-coral to-teal" aria-hidden="true" />
                  {(['problem', 'ai', 'human'] as const).map((row) => (
                    <div key={row} className="relative">
                      <span
                        className={cn(
                          'absolute top-1 -left-7 size-3 rounded-full ring-4 ring-white',
                          row === 'problem' && 'bg-line-strong',
                          row === 'ai' && 'bg-coral',
                          row === 'human' && 'bg-teal',
                        )}
                        aria-hidden="true"
                      />
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
            </li>
          ))}
        </ul>
        <div data-reveal="" className="mt-5">
          <SpendInsight t={t.home.insight} locale={locale} />
        </div>
      </Section>

      <Section title={a.limitsTitle}>
        <div data-stagger="" className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {a.limits.map((l) => (
            <div key={l.title} className="border-t-2 border-coral pt-6">
              <h3 className="text-title">{l.title}</h3>
              <p className="mt-2 text-ink-soft">{l.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark" title={a.dataTitle} lead={a.dataText} />

      <Section title={a.faqTitle} narrow>
        <div data-stagger="" className="border-t border-line">
          {a.faq.map((f) => (
            <details key={f.q} className="faq group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-semibold tracking-tight transition-colors hover:text-teal [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mist transition-[background-color,rotate] duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:bg-coral group-open:text-night">
                  <Plus className="size-4" />
                </span>
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
