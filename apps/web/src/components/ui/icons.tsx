type IconProps = { className?: string };

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className={className ?? 'size-4'} aria-hidden="true">
      <path d="M3.5 10h12M11 5.5 15.5 10 11 14.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Lien externe : s'insère dans le flux du texte (ne se sépare pas du dernier mot). */
export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className ?? 'ml-1 inline-block size-3.5 align-[-0.1em]'}
      aria-hidden="true"
    >
      <path d="M6 14 14 6M7 6h7v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className={className ?? 'size-4'} aria-hidden="true">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className={className ?? 'size-4'} aria-hidden="true">
      <path d="M10 4v12M4 10h12" strokeLinecap="round" />
    </svg>
  );
}

export function Paperclip({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? 'size-4'} aria-hidden="true">
      <path d="m15.5 9.5-5.8 5.8a3.5 3.5 0 0 1-5-5l6.4-6.4a2.3 2.3 0 0 1 3.3 3.3l-6.4 6.4a1.2 1.2 0 0 1-1.7-1.7l5.8-5.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Petit losange corail : marque les étapes assistées par IA */
export function AiMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" className={className ?? 'size-2.5'} aria-hidden="true">
      <path d="M6 0 12 6 6 12 0 6Z" fill="currentColor" />
    </svg>
  );
}
