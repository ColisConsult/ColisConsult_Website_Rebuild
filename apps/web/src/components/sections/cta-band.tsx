import Link from 'next/link';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { ArrowRight, ArrowUpRight } from '../ui/icons';

export function CtaBand({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section className="on-dark bg-teal text-white">
      <div className="container-site grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 className="text-headline">{t.home.final.title}</h2>
          <p className="mt-5 max-w-xl text-lg text-white/75">{t.home.final.text}</p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
          <Link href={href(locale, 'preAudit')} className="btn btn-primary">
            {t.home.hero.ctaPrimary}
            <ArrowRight />
          </Link>
          <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-display text-[0.95rem] font-medium text-white/85 hover:text-white">
            {t.common.bookMeeting}
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
