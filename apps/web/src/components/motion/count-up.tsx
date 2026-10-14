'use client';

import { useEffect, useRef } from 'react';

// « 1 212 » (espace fine ou insécable entre milliers), « 14,6 », « 450 »
const NUMBER = /\d{1,3}(?:[ \u00a0\u202f]\d{3})+|\d+(?:[.,]\d+)?/g;

/** « 3 à 22 % » → ['', 3, ' à ', 22, ' %'] : chaque nombre défile, le reste est conservé. */
function parse(text: string) {
  const parts: (string | { value: number; decimals: number; sep: string; group: string })[] = [];
  let last = 0;
  for (const m of text.matchAll(NUMBER)) {
    const raw = m[0];
    const group = raw.match(/[ \u00a0\u202f]/)?.[0] ?? '';
    const sep = raw.includes(',') ? ',' : '.';
    parts.push(text.slice(last, m.index));
    parts.push({
      value: parseFloat(raw.replace(/[ \u00a0\u202f]/g, '').replace(',', '.')),
      decimals: !group && raw.includes(sep) ? raw.split(sep)[1].length : 0,
      sep,
      group,
    });
    last = (m.index ?? 0) + raw.length;
  }
  parts.push(text.slice(last));
  return parts;
}

/**
 * Chiffre qui défile jusqu'à sa valeur à l'entrée dans l'écran.
 * Le rendu serveur (et l'hydratation) affichent la valeur finale : rien n'est faux sans JS,
 * pour les moteurs de recherche ou avec prefers-reduced-motion. Les lecteurs d'écran ne lisent
 * que la valeur finale.
 */
export function CountUp({
  value,
  duration = 1800,
  delay = 0,
  className,
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Écriture directe dans le DOM (après hydratation) : aucun rendu React à chaque image
    const el = ref.current;
    const parts = parse(value);
    // Une année (« 2005 ») ne se compte pas
    if (!el || parts.length < 3 || /^(19|20)\d{2}$/.test(value.trim())) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const render = (progress: number) =>
      parts
        .map((p) => {
          if (typeof p === 'string') return p;
          const n = (p.value * progress).toFixed(p.decimals).replace('.', p.sep);
          return p.group ? n.replace(/\B(?=(\d{3})+(?!\d))/g, p.group) : n;
        })
        .join('');
    let raf = 0;
    let started = false;
    const r = el.getBoundingClientRect();
    // Hors écran à l'arrivée : on repart de zéro, invisible pour l'utilisateur
    if (r.top > window.innerHeight || r.bottom < 0) el.textContent = render(0);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        el.textContent = render(0);
        const start = performance.now() + delay;
        const tick = (now: number) => {
          const t = Math.min(1, Math.max(0, (now - start) / duration));
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          el.textContent = t === 1 ? value : render(eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value, duration, delay]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
