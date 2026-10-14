import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Titre dont les mots montent un à un à l'affichage (CSS seul : visible dès le premier
 * rendu, sans attendre le JS). Le texte complet reste lisible par les lecteurs d'écran.
 */
export function RiseWords({
  text,
  as: Tag = 'h1',
  className,
  accentFrom,
  accentClassName = 'text-white/55',
  startIndex = 0,
}: {
  text: string;
  as?: 'h1' | 'h2';
  className?: string;
  /** les mots à partir de cet index passent à la ligne, avec le style d'accent */
  accentFrom?: number;
  accentClassName?: string;
  startIndex?: number;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  const cut = accentFrom !== undefined && accentFrom > 0 && accentFrom < words.length ? accentFrom : words.length;
  const renderWords = (list: string[], offset: number) =>
    list.map((word, i) => (
      <span key={offset + i} aria-hidden="true">
        <span className="w">
          <span style={{ '--i': offset + i + startIndex } as CSSProperties}>{word}</span>
        </span>
        {i < list.length - 1 && ' '}
      </span>
    ));
  return (
    <Tag className={cn('rise-words', className)} aria-label={text}>
      {renderWords(words.slice(0, cut), 0)}
      {cut < words.length && (
        <>
          {' '}
          <span className={cn('block', accentClassName)}>{renderWords(words.slice(cut), cut)}</span>
        </>
      )}
    </Tag>
  );
}

/** Phrase dont les mots s'allument au fil du défilement (data-scrub, piloté par le runtime). */
export function ScrubText({ text, as: Tag = 'p', className }: { text: string; as?: 'p' | 'h2'; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <Tag data-scrub="" className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span data-w="" className="transition-opacity duration-200">
            {word}
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}

/** Halos colorés animés derrière une surface « nuit ». */
export function Aurora({ variant = 'hero' }: { variant?: 'hero' | 'section' | 'cta' }) {
  const blobs: Record<typeof variant, { cls: string; style: CSSProperties }[]> = {
    hero: [
      { cls: 'aurora-teal', style: { width: '70vw', height: '70vw', left: '-20vw', top: '-30vw', '--d': '26s' } as CSSProperties },
      { cls: 'aurora-coral', style: { width: '46vw', height: '46vw', right: '-12vw', top: '-8vw', '--d': '19s' } as CSSProperties },
      { cls: 'aurora-mint', style: { width: '40vw', height: '40vw', left: '30vw', bottom: '-22vw', '--d': '23s' } as CSSProperties },
    ],
    section: [
      { cls: 'aurora-teal', style: { width: '60vw', height: '60vw', right: '-20vw', top: '-20vw', '--d': '28s' } as CSSProperties },
      { cls: 'aurora-mint', style: { width: '38vw', height: '38vw', left: '-12vw', bottom: '-14vw', '--d': '21s' } as CSSProperties },
    ],
    cta: [
      { cls: 'aurora-coral', style: { width: '42rem', height: '42rem', right: '-10rem', top: '-18rem', '--d': '17s' } as CSSProperties },
      { cls: 'aurora-teal', style: { width: '50rem', height: '50rem', left: '-16rem', bottom: '-30rem', '--d': '24s' } as CSSProperties },
    ],
  };
  return (
    <div className="aurora" aria-hidden="true">
      {blobs[variant].map((b, i) => (
        <span key={i} className={b.cls} style={b.style} />
      ))}
    </div>
  );
}

/** Défilement horizontal sans fin (logos) ; statique avec prefers-reduced-motion. */
export function Marquee({
  children,
  reverse,
  duration = 60,
  gap = '4rem',
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  gap?: string;
  className?: string;
}) {
  const style = { '--marquee-duration': `${duration}s`, '--marquee-gap': gap } as CSSProperties;
  return (
    <div className={cn('marquee', className)} data-reverse={reverse ? '' : undefined} style={style}>
      <div className="marquee-track">{children}</div>
      <div className="marquee-track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
