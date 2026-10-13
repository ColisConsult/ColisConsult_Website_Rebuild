'use client';

import type { ReactNode } from 'react';

/** Bouton de suppression avec confirmation native */
export function ConfirmButton({ children, message }: { children: ReactNode; message: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className="rounded-md border border-coral-ink/40 px-3.5 py-2 text-sm font-medium text-coral-ink hover:bg-coral-soft/50"
    >
      {children}
    </button>
  );
}
