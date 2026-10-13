import { cn } from '@/lib/cn';

/**
 * Logo ColisConsult redessiné en vectoriel (même construction que le logo
 * historique : cube ouvert formant un C). Le mot-symbole est composé en Poppins.
 * L'original PNG reste disponible dans /public/brand.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 230 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="18"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M115 12 L214 68 L118 124 L18 68 Z" />
      <path d="M18 68 V188 L118 244 V124" />
      <path d="M118 146 L214 190 L118 244" />
    </svg>
  );
}

export function Logo({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 font-display text-[1.32rem] font-semibold tracking-[-0.03em]',
        tone === 'dark' ? 'text-teal' : 'text-white',
        className,
      )}
    >
      <LogoMark className="h-[1.55em] w-auto" />
      <span>ColisConsult</span>
    </span>
  );
}
