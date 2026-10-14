'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Défilement adouci à la molette (Lenis). Le tactile garde le défilement natif ;
 * rien n'est activé si l'utilisateur a demandé à réduire les animations.
 */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const instance = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: { offset: -96 }, autoRaf: true });
    lenis.current = instance;

    // Menu mobile ouvert : on fige le défilement de la page
    const mo = new MutationObserver(() => {
      if (document.documentElement.hasAttribute('data-menu-open')) instance.stop();
      else instance.start();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-menu-open'] });

    return () => {
      mo.disconnect();
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // Changement de page : on repart du haut sans glissement (Next a déjà fait défiler)
  useEffect(() => {
    if (!window.location.hash) lenis.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
