import { ClientNames } from '@/components/sections/client-names';
import { CtaBand } from '@/components/sections/cta-band';
import { TestimonialCard } from '@/components/sections/testimonials';
import { PageHero, Section } from '@/components/ui/section';
import { getDictionary } from '@/i18n/get-dictionary';
import { getTestimonials } from '@/lib/api';
import { pageMetadata } from '@/lib/metadata';
import type { Segment } from '@/lib/types';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'clients', t.clients.label, t.clients.lead);
}

export default async function ClientsPage() {
  const { t, locale } = await getDictionary();
  const c = t.clients;
  const testimonials = await getTestimonials();
  const segments = Object.keys(c.segments) as Segment[];

  return (
    <>
      <PageHero label={c.label} title={c.title} lead={c.lead} />

      <Section index="01" label={c.namesTitle} tone="white">
        <ClientNames segments={c.segments} />
      </Section>

      {segments.map((seg, i) => {
        const items = testimonials.filter((x) => x.segment === seg);
        if (!items.length) return null;
        return (
          <Section key={seg} index={String(i + 2).padStart(2, '0')} label={c.segments[seg]}>
            <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
              {items.map((item) => (
                <TestimonialCard key={item.id} item={item} locale={locale} t={t} />
              ))}
            </div>
          </Section>
        );
      })}

      <CtaBand t={t} locale={locale} />
    </>
  );
}
