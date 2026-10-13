import { CtaBand } from '@/components/sections/cta-band';
import { AiMark, Plus } from '@/components/ui/icons';
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
      <PageHero label={a.label} title={a.title} lead={a.lead}>
        {/* Chaîne de traitement : la machine au milieu, l'humain avant la décision */}
        <ol className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {a.flow.map((step, i) => (
            <li
              key={step.title}
              className={cn('relative p-5 md:p-6', i === 1 ? 'bg-ink text-white' : i === 3 ? 'bg-teal text-white' : 'bg-white')}
            >
              <p className={cn('num text-xs', i === 1 || i === 3 ? 'text-white/55' : 'text-ink-faint')}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-6 flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
                {i === 1 && <AiMark className="size-2.5 text-coral" />}
                {step.title}
              </p>
              <p className={cn('mt-1 text-[0.95rem]', i === 1 || i === 3 ? 'text-white/70' : 'text-ink-soft')}>{step.text}</p>
            </li>
          ))}
        </ol>
      </PageHero>

      {a.uses.map((use, i) => (
        <Section key={use.title} index={String(i + 1).padStart(2, '0')} label={use.title} tone={i % 2 === 0 ? 'white' : 'paper'}>
          <h2 className="max-w-[24ch] text-headline">{use.gain}</h2>
          <dl className="mt-12 border-t border-line">
            {(['problem', 'ai', 'human'] as const).map((row) => (
              <div key={row} className="grid gap-x-10 gap-y-2 border-b border-line py-6 md:grid-cols-12">
                <dt className="flex items-center gap-2 font-display text-sm font-medium text-ink-soft md:col-span-3">
                  {row === 'ai' && <AiMark className="size-2 text-coral" />}
                  {row === 'human' && <span className="size-2 rounded-full bg-teal" aria-hidden="true" />}
                  {a.rows[row]}
                </dt>
                <dd className={cn('text-lg leading-relaxed md:col-span-9', row === 'problem' && 'text-ink-soft')}>{use[row]}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}

      <Section index="04" label={a.limitsTitle} title={a.limitsTitle} tone="white">
        <div className="grid gap-10 md:grid-cols-3">
          {a.limits.map((l) => (
            <div key={l.title} className="border-t-2 border-ink pt-5">
              <h3 className="text-xl">{l.title}</h3>
              <p className="mt-2 text-ink-soft">{l.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section index="05" label={a.dataTitle} title={a.dataTitle} intro={a.dataText} tone="dark" />

      <Section index="06" label={a.faqTitle} title={a.faqTitle}>
        <div className="border-t border-line">
          {a.faq.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-medium tracking-tight [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="size-5 shrink-0 text-ink-soft transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-2xl pb-7 text-lg leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CtaBand t={t} locale={locale} />
    </>
  );
}
