import Link from 'next/link';
import { CtaBand } from '@/components/sections/cta-band';
import { Check } from '@/components/ui/icons';
import { PageHero } from '@/components/ui/section';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'services', t.services.label, t.services.lead);
}

export default async function ServicesPage() {
  const { t, locale } = await getDictionary();
  const s = t.services;

  return (
    <>
      <PageHero label={s.label} title={s.title} lead={s.lead} />
      <div className="container-site pb-24">
        <div className="border-t border-line">
          {s.offers.map((offer, i) => (
            <article key={offer.id} id={offer.id} className="grid scroll-mt-28 gap-x-10 gap-y-8 border-b border-line py-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="flex items-baseline gap-3 text-sm">
                  <span className="num text-coral-ink">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display font-medium text-ink-soft">{offer.tag}</span>
                </p>
                <h2 className="mt-4 text-headline">{offer.title}</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{offer.text}</p>
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-md border border-line bg-white">
                  <div className="p-6 md:p-8">
                    <p className="font-display text-sm font-medium text-ink-soft">{t.common.included}</p>
                    <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {offer.includes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <Check className="mt-1 size-4 shrink-0 text-teal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-paper/60 px-6 py-4 md:px-8">
                    <p>
                      <span className="text-sm text-ink-faint">{t.common.pricing} · </span>
                      <span className="font-medium">{offer.price}</span>
                    </p>
                    <Link href={href(locale, 'contact')} className="font-display text-sm font-medium text-teal hover:underline">
                      {s.cta} →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <CtaBand t={t} locale={locale} />
    </>
  );
}
