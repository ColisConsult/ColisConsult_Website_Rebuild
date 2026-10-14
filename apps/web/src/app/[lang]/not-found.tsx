import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Aurora, RiseWords } from '@/components/motion/primitives';
import { ArrowRight } from '@/components/ui/icons';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

export default async function NotFound() {
  const { t, locale } = await getDictionary();
  return (
    <section data-tone="dark" data-spotlight="" className="surface-night on-dark flex min-h-[85svh] items-center pt-32 pb-24">
      <Aurora />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />
      <div className="container-site">
        <p className="rise figure text-[clamp(6rem,4rem+10vw,13rem)] text-gradient-coral">404</p>
        <RiseWords text={t.notFound.title} className="mt-2 max-w-[18ch] text-headline text-white" />
        <p className="rise mt-6 max-w-xl text-lg text-white/70" style={{ '--delay': '400ms' } as CSSProperties}>
          {t.notFound.text}
        </p>
        <Link href={href(locale, 'home')} data-magnetic="" className="rise btn btn-primary btn-lg mt-10" style={{ '--delay': '550ms' } as CSSProperties}>
          {t.notFound.cta}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
