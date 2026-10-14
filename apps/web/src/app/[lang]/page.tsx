import { OrganizationJsonLd } from '@/components/json-ld';
import { AiHome } from '@/components/sections/ai-home';
import { CtaBand } from '@/components/sections/cta-band';
import { FounderBlock } from '@/components/sections/founder';
import { HomeHero } from '@/components/sections/home-hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { PricingBand } from '@/components/sections/pricing-band';
import { HomeResources } from '@/components/sections/resources';
import { ResultsSection } from '@/components/sections/results';
import { VideoTestimonials } from '@/components/sections/video-testimonials';
import { Section } from '@/components/ui/section';
import { getDictionary } from '@/i18n/get-dictionary';
import { getTestimonials } from '@/lib/api';

/*
 * Parcours de l'accueil : promesse + démonstration IA + logos (hero sombre) → résultats chiffrés →
 * méthode en 3 étapes (défilement collant) → IA (bento sombre) → rémunération → vidéos clients →
 * fondateur et équipe → ressources → contact.
 */
export default async function HomePage() {
  const { t, locale } = await getDictionary();
  const featured = await getTestimonials(true);

  return (
    <>
      <OrganizationJsonLd description={t.meta.description} />
      <HomeHero t={t} locale={locale} />
      <ResultsSection items={featured} t={t} locale={locale} />
      <HowItWorks t={t} locale={locale} />
      <AiHome t={t} locale={locale} />
      <PricingBand t={t} locale={locale} />

      <Section tone="mist" title={t.home.videos.title}>
        <VideoTestimonials t={t} locale={locale} />
      </Section>

      <FounderBlock t={t} locale={locale} />
      <HomeResources t={t} locale={locale} />
      <CtaBand t={t} locale={locale} on="mist" />
    </>
  );
}
