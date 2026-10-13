import Image from 'next/image';
import Link from 'next/link';
import portrait from '@/assets/photos/matthieu-portrait.jpg';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { ArrowUpRight } from '../ui/icons';

/** Appel à l'action final, avec un interlocuteur nommé et joignable. */
export function CtaBand({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-site">
        <div className="on-dark grid gap-10 overflow-hidden rounded-[var(--radius-media)] bg-teal-950 p-7 text-white sm:p-10 lg:grid-cols-12 lg:items-center lg:p-14">
          <div className="lg:col-span-7">
            <h2 className="text-headline [text-wrap:pretty]">{t.home.final.title}</h2>
            <p className="mt-4 max-w-xl text-lg text-white/75">{t.home.final.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={href(locale, 'preAudit')} className="btn btn-primary">
                {t.home.hero.ctaPrimary}
              </Link>
              <Link href={href(locale, 'simulator')} className="btn btn-outline">
                {t.home.hero.ctaSecondary}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-5 border-t border-white/15 pt-8 lg:col-span-5 lg:justify-self-end lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <Image
              src={portrait}
              alt=""
              width={96}
              height={96}
              className="size-20 shrink-0 rounded-full object-cover object-top sm:size-24"
              sizes="96px"
            />
            <div>
              <p className="font-display text-lg font-semibold">Matthieu Erly</p>
              <p className="text-sm text-white/65">{t.contact.founderRole}</p>
              <a href={site.phoneHref} className="mt-2 block font-display text-lg font-medium text-white tabular-nums hover:text-coral">
                {locale === 'fr' ? site.phone : site.phoneIntl}
              </a>
              <a
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="link mt-1 inline-block text-sm text-white/85"
              >
                {t.common.bookMeeting}
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
