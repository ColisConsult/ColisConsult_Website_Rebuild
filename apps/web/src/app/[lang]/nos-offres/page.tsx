import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Aurora } from '@/components/motion/primitives';
import { CtaBand } from '@/components/sections/cta-band';
import { ArrowRight, Check } from '@/components/ui/icons';
import { PageHero } from '@/components/ui/section';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'services', t.services.title, t.services.lead);
}

export default async function ServicesPage() {
  const { t, locale } = await getDictionary();
  const s = t.services;

  return (
    <>
      <PageHero title={s.title} lead={s.lead} />
      <div className="bg-mist py-16 md:py-24">
        <div className="container-site grid gap-5 lg:grid-cols-2">
          {s.offers.map((offer, i) => (
            <div
              key={offer.id}
              data-reveal=""
              style={{ '--d': `${(i % 2) * 100}ms` } as CSSProperties}
              className={i === 0 ? 'lg:col-span-2' : undefined}
            >
              <article
                id={offer.id}
                data-spotlight=""
                className={cn(
                  'spot flex h-full scroll-mt-28 flex-col rounded-[var(--radius-card)] p-7 md:p-10',
                  i === 0 ? 'surface-night on-dark text-white' : 'card card-lift',
                )}
              >
                {i === 0 && <Aurora variant="cta" />}
                <p className={cn('text-sm font-medium', i === 0 ? 'text-coral' : 'text-coral-ink')}>{offer.tag}</p>
                <div className={cn('flex-1', i === 0 && 'lg:grid lg:grid-cols-2 lg:gap-12')}>
                  <div>
                    <h2 className={cn('mt-2', i === 0 ? 'text-headline' : 'text-[1.6rem] leading-tight')}>{offer.title}</h2>
                    <p className={cn('mt-4 max-w-lg text-lg', i === 0 ? 'text-white/80' : 'text-ink-soft')}>{offer.text}</p>
                  </div>
                  <ul className={cn('mt-7 grid gap-x-8 gap-y-3', i === 0 ? 'sm:grid-cols-2 lg:mt-3 lg:grid-cols-1' : 'sm:grid-cols-2')}>
                    {offer.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Check className={cn('mt-1 size-4 shrink-0', i === 0 ? 'text-coral' : 'text-mint-ink')} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={cn(
                    'mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-5',
                    i === 0 ? 'border-white/15' : 'border-line',
                  )}
                >
                  <p className="font-medium">{offer.price}</p>
                  <Link
                    href={href(locale, i === 0 ? 'preAudit' : 'contact')}
                    data-magnetic={i === 0 ? '' : undefined}
                    className={cn('btn btn-sm', i === 0 ? 'btn-primary' : 'btn-outline')}
                  >
                    {i === 0 ? t.nav.cta : s.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
      <CtaBand t={t} locale={locale} />
    </>
  );
}
