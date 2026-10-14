import { OtherClients } from '@/components/sections/client-names';
import { CtaBand } from '@/components/sections/cta-band';
import { LogoWall } from '@/components/sections/logo-band';
import { ResultCards, topResults } from '@/components/sections/results';
import { TestimonialsGrid } from '@/components/sections/testimonials';
import { VideoTestimonials } from '@/components/sections/video-testimonials';
import { ArrowUpRight } from '@/components/ui/icons';
import { PageHero, Section } from '@/components/ui/section';
import { getDictionary } from '@/i18n/get-dictionary';
import { getTestimonials } from '@/lib/api';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'clients', t.clients.title, t.clients.lead);
}

export default async function ClientsPage() {
  const { t, locale } = await getDictionary();
  const c = t.clients;
  const testimonials = await getTestimonials();
  const featured = testimonials.filter((x) => x.featured);
  // Les trois témoignages chiffrés sont en tête de page : on ne les répète pas dans la grille
  const shown = new Set(topResults(featured, locale).map((x) => x.id));

  return (
    <>
      <PageHero title={c.title} lead={c.lead} />

      <Section tone="mist">
        <LogoWall sectors={c.sectors} />
        <OtherClients title={c.alsoTitle} />
      </Section>

      <Section title={t.home.results.title}>
        <ResultCards items={featured} locale={locale} t={t} />
      </Section>

      <Section tone="mist" title={c.videosTitle}>
        <VideoTestimonials t={t} locale={locale} showLink={false} />
      </Section>

      <Section title={c.testimonialsTitle} lead={c.testimonialsLead}>
        <TestimonialsGrid items={testimonials.filter((x) => !shown.has(x.id))} locale={locale} t={t} />
        <a
          href={`${site.founderLinkedin}details/recommendations/`}
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-8 inline-block font-display text-[0.97rem] font-medium text-teal"
        >
          {c.linkedin}
          <ArrowUpRight />
        </a>
      </Section>

      <CtaBand t={t} locale={locale} />
    </>
  );
}
