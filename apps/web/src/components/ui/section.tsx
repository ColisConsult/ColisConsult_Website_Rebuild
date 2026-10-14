import Image, { type StaticImageData } from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Aurora, RiseWords } from '../motion/primitives';

type Tone = 'white' | 'mist' | 'dark';

/** Section de page : titre (et chapeau) au-dessus, contenu libre en dessous. */
export function Section({
  id,
  title,
  lead,
  children,
  className,
  tone = 'white',
  action,
  narrow,
}: {
  id?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  tone?: Tone;
  action?: ReactNode;
  narrow?: boolean;
}) {
  const dark = tone === 'dark';
  return (
    <section
      id={id}
      data-tone={dark ? 'dark' : undefined}
      className={cn(dark ? 'surface-night on-dark' : tone === 'mist' ? 'bg-mist' : 'bg-white', 'py-20 md:py-28', className)}
    >
      {dark && <Aurora variant="section" />}
      <div className={cn('container-site', narrow && 'max-w-[56rem]')}>
        {(title || lead || action) && (
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div className="max-w-3xl">
              {title && (
                <h2 data-reveal="" className="text-headline">
                  {title}
                </h2>
              )}
              {lead && (
                <p data-reveal="" style={{ '--d': '120ms' } as CSSProperties} className={cn('mt-5 text-lg', dark ? 'text-white/70' : 'text-ink-soft')}>
                  {lead}
                </p>
              )}
            </div>
            {action}
          </div>
        )}
        {children && <div className={title || lead ? 'mt-12 md:mt-16' : undefined}>{children}</div>}
      </div>
    </section>
  );
}

/**
 * En-tête des pages intérieures : surface sombre animée, titre qui monte mot à mot,
 * chapeau, et éventuellement une photo à droite.
 */
export function PageHero({
  title,
  lead,
  children,
  image,
  compact,
  contentClassName,
}: {
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  image?: { src: StaticImageData; alt: string; caption?: string; position?: string };
  compact?: boolean;
  /** limite la largeur du texte (ex. quand un formulaire vient chevaucher le bas du hero) */
  contentClassName?: string;
}) {
  return (
    <header data-tone="dark" data-spotlight="" className={cn('surface-night on-dark', compact ? 'pt-32 pb-16 md:pt-40 md:pb-20' : 'pt-32 pb-20 md:pt-40 md:pb-28')}>
      <Aurora variant="section" />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />
      <div className={cn('container-site', image && 'grid items-center gap-12 lg:grid-cols-12 lg:gap-14')}>
        <div className={cn(image && 'lg:col-span-6', contentClassName)}>
          <RiseWords
            text={title}
            className={cn('max-w-[20ch] text-white', compact ? 'text-[clamp(2.3rem,1.5rem+2.6vw,3.6rem)] leading-[1.05]' : 'text-display')}
          />
          {lead && (
            <p className="rise mt-7 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl" style={{ '--delay': '450ms' } as CSSProperties}>
              {lead}
            </p>
          )}
          {children && (
            <div className="rise mt-10" style={{ '--delay': '600ms' } as CSSProperties}>
              {children}
            </div>
          )}
        </div>
        {image && (
          <div className="rise lg:col-span-6" style={{ '--delay': '300ms' } as CSSProperties}>
            <Photo
              {...image}
              preload
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] shadow-[0_40px_100px_-40px_rgb(0_0_0/0.8)] ring-1 ring-white/10"
              captionClassName="text-white/55"
            />
          </div>
        )}
      </div>
    </header>
  );
}

/** Photo cadrée (coins arrondis), légende facultative, parallaxe douce au défilement. */
export function Photo({
  src,
  alt,
  caption,
  className,
  captionClassName,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  position,
  preload,
  parallax,
  radius = 'rounded-[var(--radius-media)]',
}: {
  src: StaticImageData;
  alt: string;
  caption?: string;
  className?: string;
  captionClassName?: string;
  sizes?: string;
  position?: string;
  preload?: boolean;
  /** intensité de la parallaxe (0,05 à 0,15) */
  parallax?: number;
  /** classe d'arrondi (par défaut celui des médias) */
  radius?: string;
}) {
  const img = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      placeholder="blur"
      preload={preload}
      className="object-cover"
      style={position ? { objectPosition: position } : undefined}
    />
  );
  return (
    <figure>
      <div className={cn('relative overflow-hidden bg-mist', radius, className)}>
        {parallax ? (
          <div data-parallax={parallax} className="parallax-img absolute inset-0">
            {img}
          </div>
        ) : (
          img
        )}
      </div>
      {caption && <figcaption className={cn('mt-3 text-sm text-ink-soft', captionClassName)}>{caption}</figcaption>}
    </figure>
  );
}
