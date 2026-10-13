import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Lien de navigation secondaire : texte souligné, sans fioriture. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'link font-display text-[0.97rem] font-medium text-teal [.on-dark_&]:text-white',
        className,
      )}
    >
      {children}
    </Link>
  );
}
