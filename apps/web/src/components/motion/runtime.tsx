'use client';

import { useEffect } from 'react';

/*
 * Moteur d'animations du site, en JS natif (aucune dépendance) et sans composant client
 * par élément : les composants serveur posent des attributs data-*, ce module s'en charge.
 *
 *   data-reveal[="fade|scale|left|right|blur"]  apparition à l'entrée dans l'écran
 *   data-stagger                                apparition en cascade des enfants
 *   class="seq"                                 séquence CSS déclenchée à l'entrée (.is-in)
 *   data-replay="ms"                            rejoue la séquence tant qu'elle est visible
 *   data-spotlight                              lueur qui suit le pointeur (--mx, --my)
 *   data-magnetic                               bouton légèrement attiré par le pointeur
 *   data-tilt                                   inclinaison 3D au pointeur
 *   data-parallax="0.1"                         décalage vertical au défilement
 *   data-scrub                                  mots qui s'allument au fil du défilement
 *   data-steps / data-step / data-step-label    étapes « collantes » et barre de progression
 *   data-header / data-tone="dark"              en-tête adaptatif (fond clair ou sombre)
 *   data-scroll-progress                        barre de lecture de la page
 *
 * Les compteurs animés sont un composant React (CountUp) pour ne jamais modifier un
 * texte avant son hydratation.
 *
 * Avec prefers-reduced-motion, seuls les états utiles sont conservés (étape active,
 * barre de lecture) : pas de mouvement.
 */

const REVEAL = '[data-reveal],[data-stagger],.seq';

export function MotionRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const seen = new WeakSet<Element>();
    const cleanups: (() => void)[] = [];

    /* ---------- Apparitions et compteurs ---------- */
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add('is-in');
          if (!el.hasAttribute('data-replay')) io.unobserve(el);
        }
      },
      // Déclenchement dès que le haut de l'élément dépasse 88 % de la fenêtre (même pour un bloc très haut)
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );

    function register(scope: ParentNode) {
      scope.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.hasAttribute('data-stagger')) {
          Array.from(el.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
        }
        if (reduced) {
          el.classList.add('is-in');
          return;
        }
        io.observe(el);
      });
      scope.querySelectorAll<HTMLElement>('[data-replay]').forEach((el) => setupReplay(el));
    }

    /* ---------- Séquences rejouées (console de démonstration) ---------- */
    function setupReplay(el: HTMLElement) {
      if (reduced || el.dataset.replaySetup) return;
      el.dataset.replaySetup = '1';
      const every = Number(el.dataset.replay) || 14000;
      const id = window.setInterval(() => {
        if (document.hidden || !el.classList.contains('is-in')) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        el.classList.remove('is-in');
        void el.offsetWidth; // relance les transitions
        requestAnimationFrame(() => el.classList.add('is-in'));
      }, every);
      cleanups.push(() => window.clearInterval(id));
    }

    // Nouveaux contenus (navigation côté client, contenus diffusés en flux)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === 1) {
            register(document);
            scheduleFrame();
            return;
          }
        }
      }
    });

    /* ---------- Pointeur : lueur, aimant, inclinaison ---------- */
    let magnet: HTMLElement | null = null;
    let tilted: HTMLElement | null = null;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const target = e.target as Element | null;
      if (!target?.closest) return;

      const spot = target.closest<HTMLElement>('[data-spotlight]');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      if (reduced || !finePointer) return;

      const m = target.closest<HTMLElement>('[data-magnetic]');
      if (m !== magnet) {
        magnet?.style.setProperty('--tx', '0px');
        magnet?.style.setProperty('--ty', '0px');
        magnet = m;
      }
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.setProperty('--tx', `${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px`);
        m.style.setProperty('--ty', `${((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1)}px`);
      }

      const tl = target.closest<HTMLElement>('[data-tilt]');
      if (tl !== tilted) {
        tilted?.style.setProperty('--rx', '0deg');
        tilted?.style.setProperty('--ry', '0deg');
        tilted = tl;
      }
      if (tl) {
        const r = tl.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tl.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
        tl.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
      }
    };
    const onPointerLeave = () => {
      magnet?.style.setProperty('--tx', '0px');
      magnet?.style.setProperty('--ty', '0px');
      tilted?.style.setProperty('--rx', '0deg');
      tilted?.style.setProperty('--ry', '0deg');
      magnet = tilted = null;
    };
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    cleanups.push(() => {
      document.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    });

    /* ---------- Défilement : parallaxe, mots, étapes, en-tête, barre de lecture ---------- */
    let lastY = window.scrollY;
    let frame = 0;
    function scheduleFrame() {
      if (!frame) frame = requestAnimationFrame(onFrame);
    }
    function onFrame() {
      frame = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;

      if (!reduced) {
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          const speed = Number(el.dataset.parallax) || 0.1;
          const offset = (r.top + r.height / 2 - vh / 2) * -speed;
          el.style.setProperty('--py', `${offset.toFixed(1)}px`);
        });

        document.querySelectorAll<HTMLElement>('[data-scrub]').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          const p = Math.min(1, Math.max(0, (vh * 0.88 - r.top) / (vh * 0.5)));
          const words = el.querySelectorAll<HTMLElement>('[data-w]');
          const n = words.length;
          words.forEach((w, i) => {
            const o = Math.min(1, Math.max(0, p * (n + 2) - i));
            w.style.opacity = String(0.16 + 0.84 * o);
          });
        });
      }

      document.querySelectorAll<HTMLElement>('[data-steps]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / Math.max(1, r.height - vh * 0.3)));
        el.style.setProperty('--progress', p.toFixed(3));
        const steps = el.querySelectorAll<HTMLElement>('[data-step]');
        let active = 0;
        steps.forEach((s, i) => {
          if (s.getBoundingClientRect().top < vh * 0.6) active = i;
        });
        if (el.dataset.active !== String(active)) {
          el.dataset.active = String(active);
          el.querySelectorAll<HTMLElement>('[data-step-label]').forEach((l, i) => l.classList.toggle('is-active', i <= active));
          steps.forEach((s, i) => s.classList.toggle('is-active', i === active));
        }
      });

      const header = document.querySelector<HTMLElement>('[data-header]');
      if (header) {
        header.toggleAttribute('data-scrolled', y > 16);
        const goingDown = y > lastY + 2;
        const goingUp = y < lastY - 2;
        if (!reduced && !root.hasAttribute('data-menu-open')) {
          if (goingDown && y > 320) header.setAttribute('data-hidden', '');
          else if (goingUp || y < 320) header.removeAttribute('data-hidden');
        }
        const probe = 38;
        let dark = false;
        document.querySelectorAll<HTMLElement>('[data-tone="dark"]').forEach((s) => {
          const r = s.getBoundingClientRect();
          if (r.top <= probe && r.bottom >= probe) dark = true;
        });
        header.setAttribute('data-on', dark ? 'dark' : 'light');
      }

      const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
      if (bar) {
        const max = document.documentElement.scrollHeight - vh;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
      lastY = y;
    }
    /*
     * Démarrage une fois la page chargée et le navigateur au repos (l'hydratation React est
     * alors terminée) : on ne touche à aucun élément avant que React l'ait hydraté. Le haut
     * de page s'anime en CSS seul, ce délai est donc invisible ; plafond à 1,8 s.
     */
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      register(document);
      root.classList.add('motion-ready');
      mo.observe(document.body, { childList: true, subtree: true });
      window.addEventListener('scroll', scheduleFrame, { passive: true });
      window.addEventListener('resize', scheduleFrame, { passive: true });
      scheduleFrame();
    };
    // requestIdleCallback n'existe pas partout (Safari) : repli sur un court délai
    const whenIdle = (fn: () => void) =>
      typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(fn, { timeout: 1000 }) : setTimeout(fn, 200);
    const onLoad = () => whenIdle(start);
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    const cap = window.setTimeout(start, 1800);
    cleanups.push(() => {
      window.removeEventListener('load', onLoad);
      window.clearTimeout(cap);
      window.removeEventListener('scroll', scheduleFrame);
      window.removeEventListener('resize', scheduleFrame);
      cancelAnimationFrame(frame);
    });

    return () => {
      io.disconnect();
      mo.disconnect();
      cleanups.forEach((fn) => fn());
      root.classList.remove('motion-ready');
    };
  }, []);

  return null;
}
