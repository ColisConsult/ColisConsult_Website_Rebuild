import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ArrowRight } from './icons';

/** Lien de navigation secondaire : soulignement qui se dessine et flèche qui glisse au survol. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2.5 font-display text-[0.97rem] font-medium text-teal [.on-dark_&]:text-white',
        className,
      )}
    >
      <span className="link-slide">{children}</span>
      <span
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-50 transition-[background-color,color,translate] duration-300 group-hover:translate-x-1 group-hover:bg-coral group-hover:text-night [.on-dark_&]:bg-white/10"
        aria-hidden="true"
      >
        <ArrowRight className="size-3.5" />
      </span>
    </Link>
  );
}
