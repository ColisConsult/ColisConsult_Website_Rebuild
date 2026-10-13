import Image from 'next/image';
import Link from 'next/link';
import conference from '@/assets/photos/matthieu-conference.jpg';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Check } from '../ui/icons';

export function HomeHero({ t, locale }: { t: Dictionary; locale: Locale }) {
  const h = t.home.hero;
  return (
    <section className="overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 className="max-w-[17ch] text-display">{h.title}</h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink-soft">{h.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={href(locale, 'preAudit')} className="btn btn-primary">
              {h.ctaPrimary}
            </Link>
            <Link href={href(locale, 'simulator')} className="btn btn-outline">
              {h.ctaSecondary}
            </Link>
          </div>
          <ul className="mt-7 flex flex-col gap-x-6 gap-y-2 text-[0.95rem] text-ink-soft sm:flex-row sm:flex-wrap">
            {h.reassurance.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-mint-ink" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <figure>
            <div className="relative aspect-[4/3.2] overflow-hidden rounded-[var(--radius-media)] bg-mist">
              <Image
                src={conference}
                alt={h.photoAlt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[75%_center]"
              />
            </div>
            <figcaption className="mt-3 text-right text-sm text-ink-soft">{h.photoCaption}</figcaption>
          </figure>

          {/* Résultat client réel, en surimpression de la photo */}
          <figure className="mt-5 flex gap-5 rounded-[var(--radius-card)] bg-white p-5 ring-1 ring-line lg:absolute lg:bottom-12 lg:-left-10 lg:mt-0 lg:block lg:max-w-[18rem] lg:shadow-[0_14px_40px_-14px_rgb(7_47_50/0.4)] xl:-left-14">
            <p className="figure shrink-0 text-[2.4rem] text-mint-ink lg:text-[2.75rem]">{h.proof.value}</p>
            <div>
              <blockquote className="text-[0.95rem] leading-snug lg:mt-2">{h.proof.text}</blockquote>
              <figcaption className="mt-3 text-sm text-ink-soft">
                <span className="font-medium text-ink">{h.proof.author}</span>
                <br />
                {h.proof.role}
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
