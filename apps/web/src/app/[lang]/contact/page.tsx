import Image from 'next/image';
import type { CSSProperties } from 'react';
import portrait from '@/assets/photos/matthieu-portrait.jpg';
import { ContactForm } from '@/components/forms/contact-form';
import { ArrowUpRight } from '@/components/ui/icons';
import { PageHero } from '@/components/ui/section';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'contact', t.contact.title, t.contact.lead);
}

export default async function ContactPage() {
  const { t, locale } = await getDictionary();
  const c = t.contact;
  return (
    <>
      <PageHero title={c.title} lead={c.lead} compact contentClassName="lg:max-w-[41.6667%] lg:pr-6" />

      <section className="bg-white pb-20 md:pb-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative z-10 lg:order-2 lg:col-span-7 lg:-mt-40">
            <div className="rise card p-6 shadow-[0_40px_100px_-40px_rgb(3_28_30/0.45)] max-lg:mt-8 md:p-10" style={{ '--delay': '500ms' } as CSSProperties}>
              <h2 className="text-title">{c.formTitle}</h2>
              <div className="mt-8">
                <ContactForm t={t.forms} locale={locale} success={c.success} privacyHref={href(locale, 'legal')} />
              </div>
            </div>
          </div>

          <div className="lg:order-1 lg:col-span-5 lg:pt-16">
            <div data-reveal="" className="flex items-center gap-5 rounded-[var(--radius-card)] bg-mist p-5">
              <Image src={portrait} alt="" width={88} height={88} sizes="88px" className="size-[5.5rem] shrink-0 rounded-full object-cover object-top" />
              <div>
                <p className="font-display text-lg font-semibold">Matthieu Erly</p>
                <p className="text-sm text-ink-soft">{c.founderRole}</p>
                <a
                  href={site.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link mt-2 inline-block font-display text-[0.95rem] font-medium text-teal"
                >
                  {t.common.bookMeeting}
                  <ArrowUpRight />
                </a>
              </div>
            </div>

            <h2 data-reveal="" className="mt-10 font-display text-sm font-medium text-ink-soft">
              {c.direct}
            </h2>
            <dl data-stagger="" className="mt-3 divide-y divide-line border-y border-line">
              <div className="py-4">
                <dt className="text-sm text-ink-faint">{t.forms.phone}</dt>
                <dd className="mt-0.5 font-display text-xl font-medium tabular-nums">
                  <a href={site.phoneHref} className="transition-colors hover:text-coral-600">
                    {locale === 'fr' ? site.phone : site.phoneIntl}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-sm text-ink-faint">E-mail</dt>
                <dd className="mt-0.5 font-display text-xl font-medium">
                  <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-coral-600">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-sm text-ink-faint">{c.address}</dt>
                <dd className="mt-0.5">
                  {site.address.street}, {site.address.postalCode} {site.address.city}
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link ml-2 inline-block text-sm text-teal">
                    {c.mapLink}
                    <ArrowUpRight />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
