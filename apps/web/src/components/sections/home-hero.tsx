import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { logosBySlug } from '@/lib/client-logos';
import { CountUp } from '../motion/count-up';
import { Aurora, RiseWords } from '../motion/primitives';
import { ArrowRight, Check } from '../ui/icons';
import { LogoItem, LogoMarquee } from './logo-band';

/** Les experts qui valident chaque analyse (portraits réels de l'équipe) */
const EXPERTS = [
  { name: 'Matthieu Erly', src: '/team/matthieu-erly.jpg' },
  { name: 'Stéphane Gravier', src: '/team/stephane-gravier.jpg' },
  { name: 'Majdi Hammami', src: '/team/majdi-hammami.jpg' },
];

export function HomeHero({ t, locale }: { t: Dictionary; locale: Locale }) {
  const h = t.home.hero;
  // La seconde phrase du titre passe en couleur d'accent
  const words = h.title.split(/\s+/);
  const accentFrom = words.findIndex((w) => /[.!?]$/.test(w)) + 1 || undefined;

  return (
    <section data-tone="dark" data-spotlight="" className="surface-night pt-32 pb-16 md:pt-40 md:pb-20">
      <Aurora />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />

      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="rise inline-flex items-center gap-2.5 rounded-2xl bg-white/[0.06] sm:rounded-full py-1.5 pr-4 pl-2 text-sm text-white/80 ring-1 ring-white/12 backdrop-blur">
            <span className="flex size-5 items-center justify-center rounded-full bg-mint/20">
              <span className="animate-pulse-ring size-2 rounded-full bg-mint" />
            </span>
            {h.badge}
          </p>
          <RiseWords
            text={h.title}
            accentFrom={accentFrom}
            accentClassName="mt-3 text-[0.5em] leading-[1.15] tracking-[-0.025em] text-coral"
            className="mt-7 text-[clamp(2.4rem,1.3rem+3.6vw,4.4rem)] leading-[1.02] text-white"
          />
          <p className="rise mt-7 max-w-lg text-lg leading-relaxed text-white/70 md:text-xl" style={{ '--delay': '550ms' } as CSSProperties}>
            {h.lead}
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ '--delay': '700ms' } as CSSProperties}>
            <Link href={href(locale, 'preAudit')} data-magnetic="" className="btn btn-primary btn-lg">
              {h.ctaPrimary}
              <ArrowRight className="size-4" />
            </Link>
            <Link href={href(locale, 'simulator')} className="btn btn-ghost btn-lg">
              {h.ctaSecondary}
            </Link>
          </div>
          <ul
            className="rise mt-7 flex flex-col gap-x-6 gap-y-2 text-[0.95rem] text-white/65 sm:flex-row sm:flex-wrap"
            style={{ '--delay': '850ms' } as CSSProperties}
          >
            {[h.guarantee.replace(/\.$/, ''), ...h.reassurance].map((r) => (
              <li key={r} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-mint" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise relative lg:col-span-5 lg:pt-6" style={{ '--delay': '400ms' } as CSSProperties}>
          <AnalysisConsole t={t} locale={locale} />
          <ProofCard t={t} />
        </div>
      </div>

      <div className="container-site mt-20 md:mt-28">
        <LogoMarquee title={t.home.logos.title} />
      </div>
    </section>
  );
}

/**
 * Démonstration de l'analyse de factures : les lignes défilent, l'IA signale les anomalies,
 * la dépense se répartit (chiffres réels d'un audit anonymisé), un expert valide.
 * Séquence en CSS, relancée toutes les 16 s tant qu'elle est visible.
 */
function AnalysisConsole({ t, locale }: { t: Dictionary; locale: Locale }) {
  const c = t.home.hero.console;
  const ins = t.home.insight;
  const pct = (n: number) => `${n.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-GB')}${locale === 'fr' ? ' %' : '%'}`;
  const lineDelay = (i: number) => 200 + i * 260;
  const spendDelay = lineDelay(c.lines.length) + 100;

  return (
    <div data-tilt="" className="tilt">
      <figure
        data-replay="16000"
        className="seq card-glass relative overflow-hidden p-5 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)] md:p-6"
        aria-label={`${c.title} (${c.tag})`}
      >
        {/* Faisceau de lecture */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-mint/12 to-transparent opacity-0 [.is-in>&]:animate-[cc-scan_2.6s_var(--ease-out-soft)_0.2s_1]"
          aria-hidden="true"
        />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="animate-pulse-ring size-2 rounded-full bg-mint" aria-hidden="true" />
            <p className="font-display text-[0.95rem] font-medium text-white">{c.title}</p>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/70">{c.tag}</span>
        </div>
        <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
          <span>{c.status}</span>
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <span data-bar="" className="block h-full rounded-full bg-gradient-to-r from-mint to-mint-300" style={{ '--d': '0ms', transitionDuration: `${spendDelay}ms` } as CSSProperties} />
          </span>
        </div>

        <ul className="mt-4 space-y-1.5 text-[0.92rem]">
          {c.lines.map((line, i) => (
            <li
              key={line.label}
              data-line=""
              style={{ '--d': `${lineDelay(i)}ms` } as CSSProperties}
              className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 ${line.note ? 'bg-coral/[0.09] ring-1 ring-coral/25' : 'bg-white/[0.04]'}`}
            >
              <span className="truncate text-white/85">{line.label}</span>
              {line.note ? (
                <span
                  data-pop=""
                  style={{ '--d': `${lineDelay(i) + 300}ms` } as CSSProperties}
                  className="shrink-0 rounded-full bg-coral px-2 py-0.5 text-[0.72rem] font-semibold text-night"
                >
                  {line.note}
                </span>
              ) : (
                <span className="flex shrink-0 items-center gap-1 text-[0.78rem] text-mint-300">
                  <Check className="size-3.5" />
                  {c.ok}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Sur mobile, la console se limite aux lignes de facture : moins à lire */}
        <div className="mt-5 hidden border-t border-white/10 pt-4 sm:block">
          <p className="text-xs text-white/55">
            {c.spendTitle} · <span className="text-white/80">{ins.legendHeavy}</span>
          </p>
          <div className="mt-3 space-y-2.5">
            {[
              { v: 14.6, label: ins.shipments, color: 'from-teal-300 to-teal-300' },
              { v: 48.5, label: ins.spend, color: 'from-coral to-[#ffb39f]' },
            ].map((r, i) => (
              <div key={r.label} className="grid grid-cols-[8.5rem_1fr] items-center gap-3">
                <span className="text-xs text-white/60">
                  <span className="figure text-base text-white">{pct(r.v)}</span> {r.label}
                </span>
                <span className="h-2.5 overflow-hidden rounded-full bg-white/8">
                  <span
                    data-bar=""
                    className={`block h-full rounded-full bg-gradient-to-r ${r.color}`}
                    style={{ width: `${r.v}%`, '--d': `${spendDelay + i * 250}ms` } as CSSProperties}
                  />
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[0.7rem] text-white/40">{ins.source}</p>
        </div>

        <div data-line="" style={{ '--d': `${spendDelay + 700}ms` } as CSSProperties} className="mt-4 flex items-center gap-3 rounded-xl bg-white/[0.05] px-3 py-2.5">
          <span className="flex -space-x-2">
            {EXPERTS.map((e) => (
              <Image key={e.name} src={e.src} alt={e.name} width={30} height={30} className="size-7 rounded-full object-cover object-top ring-2 ring-night" />
            ))}
          </span>
          <span className="text-[0.82rem] text-white/75">{c.validated}</span>
          <Check className="ml-auto size-4 shrink-0 text-mint" />
        </div>
      </figure>
    </div>
  );
}

/** Résultat réel d'un client, flottant contre la console : le chiffre, le client, une ligne. */
function ProofCard({ t }: { t: Dictionary }) {
  const p = t.home.hero.proof;
  const [logo] = logosBySlug(['airis']);
  return (
    <figure className="relative z-10 mt-5 flex items-center gap-5 rounded-[var(--radius-card)] bg-white p-5 text-ink shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)] sm:mr-16 lg:-mt-6 lg:-ml-8 lg:mr-28 lg:animate-float xl:-ml-12">
      <CountUp value={p.value} delay={600} className="figure block shrink-0 text-[2.7rem] text-mint-ink" />
      <figcaption className="text-[0.95rem] leading-snug text-ink-soft">
        {logo && <LogoItem logo={logo} base={18} className="mb-1.5 block" />}
        {p.short}
      </figcaption>
    </figure>
  );
}
