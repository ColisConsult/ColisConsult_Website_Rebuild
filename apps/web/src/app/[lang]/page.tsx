import { OrganizationJsonLd } from '@/components/json-ld';
import { AiSplit } from '@/components/sections/ai-split';
import { ClientNames } from '@/components/sections/client-names';
import { CtaBand } from '@/components/sections/cta-band';
import { Figures } from '@/components/sections/figures';
import { HomeHero } from '@/components/sections/home-hero';
import { MethodSteps } from '@/components/sections/method-steps';
import { LatestPosts, UpcomingWebinars } from '@/components/sections/resources';
import { ResultFacts } from '@/components/sections/result-model';
import { TestimonialsGrid } from '@/components/sections/testimonials';
import { Section } from '@/components/ui/section';
import { TextLink } from '@/components/ui/text-link';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getTestimonials } from '@/lib/api';

export default async function HomePage() {
  const { t, locale } = await getDictionary();
  const featured = await getTestimonials(true);
  const h = t.home;

  return (
    <>
      <OrganizationJsonLd description={t.meta.description} />
      <HomeHero t={t} locale={locale} />
      <Figures items={t.figures} />
      <ClientNames title={h.clientsTitle} limit={30} />

      <Section index="01" label={h.ai.label} title={h.ai.title} intro={h.ai.intro} tone="white">
        <AiSplit t={h.ai} />
        <div className="mt-10">
          <TextLink href={href(locale, 'ai')}>{h.ai.cta}</TextLink>
        </div>
      </Section>

      <Section index="02" label={h.method.label} title={h.method.title}>
        <MethodSteps steps={t.method.steps} aiLabel={t.common.aiAssisted} />
        <div className="mt-10">
          <TextLink href={href(locale, 'method')}>{h.method.cta}</TextLink>
        </div>
      </Section>

      <Section index="03" label={h.model.label} title={h.model.title} intro={h.model.intro} tone="dark">
        <ResultFacts facts={h.model.facts} />
        <p className="mt-8 text-white/70">
          {h.model.note}{' '}
          <TextLink href={href(locale, 'method') + '#tarifs'}>{t.method.pricing.cta}</TextLink>
        </p>
      </Section>

      <Section index="04" label={h.testimonials.label} title={h.testimonials.title}>
        <TestimonialsGrid items={featured} locale={locale} t={t} />
        <div className="mt-12">
          <TextLink href={href(locale, 'clients')}>{t.common.allTestimonials}</TextLink>
        </div>
      </Section>

      <Section index="05" label={h.rankings.label} title={h.rankings.title} intro={h.rankings.text} tone="white">
        <dl className="grid grid-cols-3 gap-6 border-t border-line pt-8">
          {t.rankings.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(1.8rem,1.2rem+2.4vw,3.2rem)] leading-none font-semibold tracking-tight text-teal">{s.value}</span>
                <span className="mt-2 block text-sm text-ink-soft">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <TextLink href={href(locale, 'rankings')}>{h.rankings.cta}</TextLink>
        </div>
      </Section>

      <Section index="06" label={h.resources.label} title={h.resources.title}>
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <LatestPosts locale={locale} t={t} />
            <div className="mt-8">
              <TextLink href={href(locale, 'blog')}>{t.common.allArticles}</TextLink>
            </div>
          </div>
          <aside className="lg:col-span-4">
            <h3 className="mb-4 font-display text-sm font-medium text-ink-soft">{h.resources.webinars}</h3>
            <UpcomingWebinars locale={locale} t={t} />
          </aside>
        </div>
      </Section>

      <CtaBand t={t} locale={locale} />
    </>
  );
}
