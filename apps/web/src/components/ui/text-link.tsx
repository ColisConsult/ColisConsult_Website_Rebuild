import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from './icons';

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-display text-[0.97rem] font-medium text-teal [.on-dark_&]:text-white"
    >
      <span className="underline decoration-line-strong decoration-1 underline-offset-[0.3em] transition-colors group-hover:decoration-current">
        {children}
      </span>
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
