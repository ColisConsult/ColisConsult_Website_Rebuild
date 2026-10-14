import type { CSSProperties } from 'react';
import majdi from '@/assets/photos/majdi-ecran.jpg';
import matthieu from '@/assets/photos/matthieu-travail.jpg';
import stephane from '@/assets/photos/stephane-poste.jpg';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Photo } from '../ui/section';
import { TextLink } from '../ui/text-link';

const PHOTOS = [
  { src: matthieu, position: 'center 30%' },
  { src: stephane, position: '60% center' },
  { src: majdi, position: '70% center' },
];

/**
 * Les trois étapes, en défilement « collant » : la colonne de gauche reste en place
 * avec une barre de progression, les cartes d'étape défilent à droite et l'étape
 * en cours est mise en avant (data-steps, piloté par le runtime).
 */
export function HowItWorks({ t, locale }: { t: Dictionary; locale: Locale }) {
  const h = t.home.how;
  return (
    <section className="bg-mist py-20 md:py-32">
      <div data-steps="" className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 data-reveal="" className="max-w-[16ch] text-headline">
              {h.title}
            </h2>

            <ol className="relative mt-12 hidden space-y-7 lg:block" aria-hidden="true">
              <span className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-line-strong" />
              <span className="absolute top-2 bottom-2 left-[1.1875rem] w-px origin-top bg-coral [scale:1_var(--progress,0)]" />
              {h.steps.map((step, i) => (
                <li key={step.title} data-step-label="" className="group/label relative flex items-center gap-5 [&.is-active]:text-ink">
                  <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-white font-display text-sm font-semibold text-ink-faint ring-1 ring-line-strong transition-all duration-500 group-[.is-active]/label:bg-teal group-[.is-active]/label:text-white group-[.is-active]/label:ring-teal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg font-medium text-ink-faint transition-colors duration-500 group-[.is-active]/label:text-ink">
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>

            <p data-reveal="" className="mt-12 max-w-sm text-[0.97rem] text-ink-soft">
              {h.duration}
            </p>
            <TextLink href={href(locale, 'method')} className="mt-5">
              {h.cta}
            </TextLink>
          </div>
        </div>

        <ol className="space-y-6 lg:col-span-7 lg:space-y-10">
          {h.steps.map((step, i) => (
            <li key={step.title} data-step="" data-reveal="" className="group/step">
              <article
                className="card overflow-hidden p-2.5 transition-[opacity,scale] duration-700 lg:opacity-45 lg:scale-[0.97] lg:group-[.is-active]/step:scale-100 lg:group-[.is-active]/step:opacity-100"
              >
                <div className="relative">
                  <Photo
                    src={PHOTOS[i].src}
                    alt={h.stepPhotos[i].alt}
                    position={PHOTOS[i].position}
                    parallax={0.08}
                    radius="rounded-[calc(var(--radius-card)-0.4rem)]"
                    className="aspect-[16/10]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-night/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {h.stepPhotos[i].caption}
                  </span>
                </div>
                <div className="grid gap-x-8 gap-y-3 p-5 md:grid-cols-[auto_1fr] md:p-7">
                  <p className="figure text-[3.2rem] text-coral" style={{ '--i': i } as CSSProperties}>
                    <span className="sr-only">
                      {h.stepLabel} {i + 1}
                    </span>
                    <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  </p>
                  <div>
                    <h3 className="text-title">{step.title}</h3>
                    <p className="mt-2 max-w-lg text-ink-soft">{step.text}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
