import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Section éditoriale : colonne d'étiquette à gauche (numéro + libellé),
 * contenu à droite, filet en haut. C'est la grille de tout le site.
 */
export function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
  className,
  tone = 'paper',
  aside,
}: {
  id?: string;
  index?: string;
  label?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  tone?: 'paper' | 'white' | 'dark';
  aside?: ReactNode;
}) {
  const dark = tone === 'dark';
  return (
    <section
      id={id}
      className={cn(
        tone === 'white' && 'bg-white',
        dark && 'on-dark bg-teal-900 text-white',
        'py-20 md:py-28',
        className,
      )}
    >
      <div className="container-site">
        <div
          className={cn(
            'grid gap-x-10 gap-y-6 border-t pt-6 lg:grid-cols-12',
            dark ? 'border-white/15' : 'border-line',
          )}
        >
          <div className="lg:col-span-3">
            {label && (
              <p className={cn('flex items-baseline gap-3 text-sm', dark ? 'text-teal-300' : 'text-ink-soft')}>
                {index && <span className="num text-xs text-coral-ink [.on-dark_&]:text-coral">{index}</span>}
                <span className="font-display font-medium">{label}</span>
              </p>
            )}
            {aside && <div className="mt-6 hidden lg:block">{aside}</div>}
          </div>
          <div className="lg:col-span-9">
            {title && <h2 className="max-w-[22ch] text-headline">{title}</h2>}
            {intro && (
              <div className={cn('mt-5 max-w-2xl text-lg', dark ? 'text-white/75' : 'text-ink-soft')}>{intro}</div>
            )}
            {children && <div className={title || intro ? 'mt-12 md:mt-14' : undefined}>{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="pt-16 pb-14 md:pt-24 md:pb-20">
      <div className="container-site">
        <p className="flex items-center gap-3 font-display text-sm font-medium text-ink-soft">
          <span className="h-px w-8 bg-coral" aria-hidden="true" />
          {label}
        </p>
        <h1 className="mt-6 max-w-[20ch] text-display">{title}</h1>
        {lead && <p className="mt-7 max-w-2xl text-xl leading-relaxed text-ink-soft">{lead}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  );
}
