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
        className="aspect-video w-full rounded-[calc(var(--radius-card)-0.4rem)] bg-ink"
        aria-label={title}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group/video relative block aspect-video w-full overflow-hidden rounded-[calc(var(--radius-card)-0.4rem)] bg-ink text-left"
      aria-label={`${playLabel} : ${title}`}
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 30vw, 100vw"
        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover/video:scale-[1.06]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent transition-opacity duration-500 group-hover/video:opacity-60" aria-hidden="true" />
      <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-teal shadow-[0_10px_40px_-8px_rgb(0_0_0/0.5)] backdrop-blur transition-[background-color,color,scale] duration-500 ease-[var(--ease-out-expo)] group-hover/video:scale-110 group-hover/video:bg-coral group-hover/video:text-night">
        <span className="absolute inset-0 animate-[cc-pulse-white_2.4s_var(--ease-out-soft)_infinite] rounded-full" aria-hidden="true" />
        <svg viewBox="0 0 20 20" className="ml-0.5 size-6" fill="currentColor" aria-hidden="true">
          <path d="M6 4.2v11.6a.8.8 0 0 0 1.2.7l9.3-5.8a.8.8 0 0 0 0-1.4L7.2 3.5A.8.8 0 0 0 6 4.2Z" />
        </svg>
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-night/60 px-2 py-0.5 text-sm font-medium text-white tabular-nums backdrop-blur">{duration}</span>
    </button>
  );
}
