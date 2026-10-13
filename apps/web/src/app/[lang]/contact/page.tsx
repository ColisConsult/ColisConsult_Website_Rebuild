import { ContactForm } from '@/components/forms/contact-form';
import { ArrowUpRight } from '@/components/ui/icons';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'contact', t.contact.label, t.contact.lead);
}

export default async function ContactPage() {
  const { t, locale } = await getDictionary();
  const c = t.contact;
  return (
    <div className="container-site grid gap-14 pt-16 pb-24 md:pt-24 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="flex items-center gap-3 font-display text-sm font-medium text-ink-soft">
          <span className="h-px w-8 bg-coral" aria-hidden="true" />
          {c.label}
        </p>
        <h1 className="mt-6 text-[clamp(2.3rem,1.5rem+3vw,3.8rem)] leading-[1.04]">{c.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">{c.lead}</p>

        <h2 className="mt-12 font-display text-sm font-medium text-ink-soft">{c.direct}</h2>
        <dl className="mt-4 divide-y divide-line border-y border-line">
          <div className="py-4">
            <dt className="text-sm text-ink-faint">{t.forms.phone}</dt>
            <dd className="mt-0.5 font-display text-xl font-medium">
              <a href={site.phoneHref} className="hover:text-teal">
                {locale === 'fr' ? site.phone : site.phoneIntl}
              </a>
            </dd>
          </div>
          <div className="py-4">
            <dt className="text-sm text-ink-faint">E-mail</dt>
            <dd className="mt-0.5 font-display text-xl font-medium">
              <a href={`mailto:${site.email}`} className="hover:text-teal">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="py-4">
            <dt className="text-sm text-ink-faint">{locale === 'fr' ? 'Adresse' : 'Address'}</dt>
            <dd className="mt-0.5">
              {site.address.street}, {site.address.postalCode} {site.address.city}
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center gap-1 text-sm text-teal hover:underline">
                {c.mapLink}
                <ArrowUpRight />
              </a>
            </dd>
          </div>
        </dl>
        <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-8">
          {t.common.bookMeeting}
          <ArrowUpRight />
        </a>
      </div>
      <div className="lg:col-span-7">
        <div className="rounded-md border border-line bg-white p-6 md:p-10">
          <h2 className="text-title">{c.formTitle}</h2>
          <div className="mt-8">
            <ContactForm t={t.forms} locale={locale} success={c.success} privacyHref={href(locale, 'legal')} />
          </div>
        </div>
      </div>
    </div>
  );
}
