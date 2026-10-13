import Link from 'next/link';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { ArrowRight, Check } from '../ui/icons';
import { InvoicePanel } from './invoice-panel';

export function HomeHero({ t, locale }: { t: Dictionary; locale: Locale }) {
  const h = t.home.hero;
  return (
    <section className="pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="container-site grid items-center gap-x-14 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3 font-display text-sm font-medium text-ink-soft">
            <span className="h-px w-8 bg-coral" aria-hidden="true" />
            {h.kicker}
          </p>
          <h1 className="mt-7 text-display">
            {h.titleBefore} <span className="mark">{h.titleMark}</span> {h.titleAfter}
          </h1>
          <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink-soft">{h.lead}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={href(locale, 'preAudit')} className="btn btn-primary">
              {h.ctaPrimary}
              <ArrowRight />
            </Link>
            <Link href={href(locale, 'simulator')} className="btn btn-ghost">
              {h.ctaSecondary}
            </Link>
          </div>
          <p className="mt-6 flex items-center gap-2 text-[0.95rem] font-medium text-mint-ink">
            <Check />
            {h.guarantee}
          </p>
        </div>
        <div className="lg:col-span-5">
          <InvoicePanel t={t.home.invoice} illustrative={t.common.illustrative} />
        </div>
      </div>
    </section>
  );
}
