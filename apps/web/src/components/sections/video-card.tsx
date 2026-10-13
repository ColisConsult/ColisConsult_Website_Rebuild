'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * Vidéo hébergée avec le site : rien n'est chargé avant le clic (seule l'affiche l'est),
 * puis lecture native avec les contrôles du navigateur.
 */
export function VideoPlayer({
  src,
  poster,
  title,
  playLabel,
  duration,
}: {
  src: string;
  poster: string;
  title: string;
  playLabel: string;
  duration: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        preload="auto"
        className="aspect-video w-full rounded-[var(--radius-card)] bg-ink"
        aria-label={title}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-[var(--radius-card)] bg-ink text-left"
      aria-label={`${playLabel} : ${title}`}
    >
      <Image src={poster} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
      <span className="absolute inset-0 bg-ink/15 transition-colors group-hover:bg-ink/5" aria-hidden="true" />
      <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-teal shadow-lg transition-colors group-hover:bg-coral group-hover:text-ink">
        <svg viewBox="0 0 20 20" className="ml-0.5 size-6" fill="currentColor" aria-hidden="true">
          <path d="M6 4.2v11.6a.8.8 0 0 0 1.2.7l9.3-5.8a.8.8 0 0 0 0-1.4L7.2 3.5A.8.8 0 0 0 6 4.2Z" />
        </svg>
      </span>
      <span className="absolute top-3 right-3 rounded bg-ink/70 px-1.5 py-0.5 text-sm font-medium text-white tabular-nums">{duration}</span>
    </button>
  );
}
