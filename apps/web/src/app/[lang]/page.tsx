import { OrganizationJsonLd } from '@/components/json-ld';
import { AiHome } from '@/components/sections/ai-home';
import { CtaBand } from '@/components/sections/cta-band';
import { FounderBlock } from '@/components/sections/founder';
import { HomeHero } from '@/components/sections/home-hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { LogoBand } from '@/components/sections/logo-band';
import { PricingBand } from '@/components/sections/pricing-band';
import { HomeResources } from '@/components/sections/resources';
import { ResultCards } from '@/components/sections/results';
import { VideoTestimonials } from '@/components/sections/video-testimonials';
import { Section } from '@/components/ui/section';
import { TextLink } from '@/components/ui/text-link';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getTestimonials } from '@/lib/api';

/*
 * Parcours de l'accueil : promesse + preuve (hero) → références → résultats chiffrés →
 * comment ça marche → IA → rémunération → vidéos clients → fondateur et équipe → ressources → contact.
 */
export default async function HomePage() {
  const { t, locale } = await getDictionary();
  const featured = await getTestimonials(true);
  const h = t.home;

  return (
    <>
      <OrganizationJsonLd description={t.meta.description} />
      <HomeHero t={t} locale={locale} />
      <LogoBand title={h.logos.title} />

      <Section tone="mist" title={h.results.title} lead={h.results.lead}>
        <ResultCards items={featured} locale={locale} t={t} />
        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
          <p className="max-w-2xl text-[0.95rem] text-ink-soft">{h.results.footnote}</p>
          <TextLink href={href(locale, 'clients')}>{h.results.more}</TextLink>
        </div>
      </Section>

      <HowItWorks t={t} locale={locale} />
      <AiHome t={t} locale={locale} />
      <PricingBand t={t} locale={locale} />

      <Section title={h.videos.title}>
        <VideoTestimonials t={t} locale={locale} />
      </Section>

      <FounderBlock t={t} locale={locale} />
      <HomeResources t={t} locale={locale} />
      <CtaBand t={t} locale={locale} />
    </>
  );
}
