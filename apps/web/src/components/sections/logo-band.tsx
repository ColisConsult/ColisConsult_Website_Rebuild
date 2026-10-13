import Image from 'next/image';
import { clientLogos, homeLogoSlugs, logoHeight, logosBySlug, type ClientLogo, type Sector } from '@/lib/client-logos';
import { cn } from '@/lib/cn';

/** Un logo client, hauteur équilibrée selon ses proportions. */
export function LogoItem({ logo, base = 30, className }: { logo: ClientLogo; base?: number; className?: string }) {
  const h = logoHeight(logo.src, base);
  const w = Math.round((logo.src.width / logo.src.height) * h);
  return (
    <Image
      src={logo.src}
      alt={logo.name}
      title={logo.name}
      width={w}
      height={h}
      className={cn('object-contain opacity-80', className)}
      style={{ width: 'auto', height: 'auto', maxHeight: h, maxWidth: '100%' }}
    />
  );
}

/** Bandeau de logos de l'accueil : grille fixe, sans défilement automatique. */
export function LogoBand({ title }: { title: string }) {
  const logos = logosBySlug(homeLogoSlugs);
  return (
    <section className="border-y border-line bg-white py-12 md:py-14">
      <div className="container-site">
        <h2 className="text-center font-display text-[0.95rem] font-medium text-ink-soft">{title}</h2>
        <ul className="mt-9 grid grid-cols-3 items-center gap-x-6 gap-y-9 sm:grid-cols-4 lg:grid-cols-6 lg:gap-x-10">
          {logos.map((logo) => (
            <li key={logo.slug} className="flex h-14 items-center justify-center">
              <LogoItem logo={logo} base={42} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Mur de logos classés par secteur (page Clients) : une ligne par secteur. */
export function LogoWall({ sectors }: { sectors: Record<Sector, string> }) {
  return (
    <div className="rounded-[var(--radius-media)] bg-white px-6 ring-1 ring-line md:px-10">
      {(Object.keys(sectors) as Sector[]).map((sector, i) => {
        const logos = clientLogos.filter((l) => l.sector === sector);
        return (
          <div key={sector} className={cn('grid gap-5 py-8 md:grid-cols-[9rem_1fr] md:items-center md:gap-8', i > 0 && 'border-t border-line')}>
            <h3 className="font-display text-base font-semibold">{sectors[sector]}</h3>
            <ul className="grid grid-cols-3 items-center gap-x-6 gap-y-6 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
              {logos.map((logo) => (
                <li key={logo.slug} className="flex h-12 items-center">
                  <LogoItem logo={logo} base={34} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
