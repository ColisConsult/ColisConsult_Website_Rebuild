import { site } from '@/lib/site';

export function OrganizationJsonLd({ description }: { description: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ColisConsult',
    url: site.url,
    description,
    foundingDate: '2005',
    founder: { '@type': 'Person', name: 'Matthieu Erly', sameAs: site.founderLinkedin },
    email: site.email,
    telephone: site.phoneIntl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: 'FR',
    },
    areaServed: ['FR', 'Europe'],
    sameAs: [site.linkedin, site.youtube],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
