'use client';

import { useState } from 'react';

/** Couverture d'article : si l'image ne se charge pas, elle s'efface et laisse voir le visuel de marque dessous. */
export function CoverImage({ src, className }: { src: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} className={className} />;
}
