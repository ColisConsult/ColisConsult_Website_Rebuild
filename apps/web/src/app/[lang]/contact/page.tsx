import Image from 'next/image';
import portrait from '@/assets/photos/matthieu-portrait.jpg';
import { ContactForm } from '@/components/forms/contact-form';
import { ArrowUpRight } from '@/components/ui/icons';
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
    <div className="container-site grid gap-12 pt-12 pb-20 md:pt-20 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <h1 className="text-[clamp(2.1rem,1.5rem+2vw,3rem)] leading-[1.1]">{c.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">{c.lead}</p>

        <div className="mt-10 flex items-center gap-5 rounded-[var(--radius-card)] bg-mist p-5">
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

        <h2 className="mt-10 font-display text-sm font-medium text-ink-soft">{c.direct}</h2>
        <dl className="mt-3 divide-y divide-line border-y border-line">
          <div className="py-4">
            <dt className="text-sm text-ink-faint">{t.forms.phone}</dt>
            <dd className="mt-0.5 font-display text-xl font-medium tabular-nums">
              <a href={site.phoneHref} className="hover:text-teal">
                {locale === 'fr' ? site.phone : site.phoneIntl}
              </a>
            </dd>
          </div>
          <div className="py-4">
            <dt className="text-sm text-ink-faint">E-mail</dt>
            <dd className="mt-0.5 font-display text-xl font-medium">
              <a href={`mailto:${site.email}`} className="break-all hover:text-teal">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="py-4">
            <dt className="text-sm text-ink-faint">{c.address}</dt>
            <dd className="mt-0.5">
              {site.address.street}, {site.address.postalCode} {site.address.city}
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link ml-2 inline-block text-sm text-teal"
              >
                {c.mapLink}
                <ArrowUpRight />
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <div className="lg:col-span-7">
        <div className="rounded-[var(--radius-media)] bg-white p-6 ring-1 ring-line md:p-10">
          <h2 className="text-title">{c.formTitle}</h2>
          <div className="mt-8">
            <ContactForm t={t.forms} locale={locale} success={c.success} privacyHref={href(locale, 'legal')} />
          </div>
        </div>
      </div>
    </div>
  );
}
