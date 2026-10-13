import Image, { type StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'white' | 'mist' | 'dark';

const toneClass: Record<Tone, string> = {
  white: 'bg-white',
  mist: 'bg-mist',
  dark: 'on-dark bg-teal text-white',
};

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
    <section id={id} className={cn(toneClass[tone], 'py-16 md:py-24', className)}>
      <div className={cn('container-site', narrow && 'max-w-[56rem]')}>
        {(title || lead || action) && (
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div className="max-w-3xl">
              {title && <h2 className="text-headline">{title}</h2>}
              {lead && <p className={cn('mt-4 text-lg', dark ? 'text-white/75' : 'text-ink-soft')}>{lead}</p>}
            </div>
            {action}
          </div>
        )}
        {children && <div className={title || lead ? 'mt-10 md:mt-14' : undefined}>{children}</div>}
      </div>
    </section>
  );
}

/** En-tête des pages intérieures : titre, chapeau, et éventuellement une photo à droite. */
export function PageHero({
  title,
  lead,
  children,
  image,
}: {
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  image?: { src: StaticImageData; alt: string; caption?: string; position?: string };
}) {
  return (
    <header className="pt-12 pb-14 md:pt-20 md:pb-20">
      <div className={cn('container-site', image && 'grid items-center gap-10 lg:grid-cols-12 lg:gap-14')}>
        <div className={image ? 'lg:col-span-6' : undefined}>
          <h1 className="max-w-[22ch] text-display">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-soft">{lead}</p>}
          {children && <div className="mt-9">{children}</div>}
        </div>
        {image && (
          <div className="lg:col-span-6">
            <Photo {...image} preload sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3]" />
          </div>
        )}
      </div>
    </header>
  );
}

/** Photo cadrée (coins arrondis), légende facultative sous l'image. */
export function Photo({
  src,
  alt,
  caption,
  className,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  position,
  preload,
}: {
  src: StaticImageData;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
  position?: string;
  preload?: boolean;
}) {
  return (
    <figure>
      <div className={cn('relative overflow-hidden rounded-[var(--radius-media)] bg-mist', className)}>
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
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption>}
    </figure>
  );
}
