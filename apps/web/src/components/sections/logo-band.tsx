import Image from 'next/image';
import { clientLogos, homeLogoSlugs, logoHeight, type ClientLogo, type Sector } from '@/lib/client-logos';
import { cn } from '@/lib/cn';
import { Marquee } from '../motion/primitives';

/** Un logo client, hauteur équilibrée selon ses proportions ; en blanc sur fond sombre. */
export function LogoItem({
  logo,
  base = 30,
  className,
  tone = 'color',
}: {
  logo: ClientLogo;
  base?: number;
  className?: string;
  /** color : légèrement atténué (bandeaux) · full : pleine intensité (témoignages) · white : sur fond sombre */
  tone?: 'color' | 'white' | 'full';
}) {
  const h = logoHeight(logo.src, base);
  const w = Math.round((logo.src.width / logo.src.height) * h);
  return (
    <Image
      src={logo.src}
      alt={logo.name}
      title={logo.name}
      width={w}
      height={h}
      className={cn(
        'object-contain',
        tone === 'white' ? 'opacity-60 brightness-0 invert' : tone === 'color' ? 'opacity-80' : undefined,
        className,
      )}
      // Taille exacte des attributs ; un logo très large dans une cellule étroite est réduit
      // en gardant ses proportions (aspect-ratio fixe, plutôt que celui de l'image optimisée)
      style={{ width: w, height: 'auto', aspectRatio: `${w} / ${h}`, maxWidth: '100%' }}
    />
  );
}

/**
 * Logos en défilement continu, sur deux lignes en sens opposés (fond sombre du hero).
 * Les noms les plus parlants ouvrent la première ligne.
 */
export function LogoMarquee({ title }: { title: string }) {
  const first = homeLogoSlugs.map((s) => clientLogos.find((l) => l.slug === s)).filter((l): l is ClientLogo => !!l);
  const rest = clientLogos.filter((l) => !homeLogoSlugs.includes(l.slug));
  const rowA = [...first, ...rest.slice(0, 10)];
  const rowB = rest.slice(10);

  return (
    <div>
      <h2 className="text-center font-display text-[0.95rem] font-medium text-white/55">{title}</h2>
      <div className="mt-9 space-y-8">
        {[rowA, rowB].map((row, i) => (
          <Marquee key={i} reverse={i === 1} duration={i === 0 ? 70 : 80} gap="3.75rem">
            {row.map((logo) => (
              <span key={logo.slug} className="flex h-10 shrink-0 items-center">
                <LogoItem logo={logo} base={34} tone="white" className="transition-opacity duration-300 hover:opacity-100" />
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  );
}

/** Mur de logos classés par secteur (page Clients) : une ligne par secteur. */
export function LogoWall({ sectors }: { sectors: Record<Sector, string> }) {
  return (
    <div className="card px-6 md:px-10">
      {(Object.keys(sectors) as Sector[]).map((sector, i) => {
        const logos = clientLogos.filter((l) => l.sector === sector);
        return (
          <div key={sector} className={cn('grid gap-5 py-8 md:grid-cols-[9rem_1fr] md:items-center md:gap-8', i > 0 && 'border-t border-line')}>
            <h3 className="font-display text-base font-semibold">{sectors[sector]}</h3>
            <ul data-stagger="" className="grid grid-cols-3 items-center gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-6 xl:grid-cols-7">
              {logos.map((logo) => (
                <li key={logo.slug} className="flex h-12 items-center">
                  <LogoItem
                    logo={logo}
                    base={34}
                    className="grayscale transition-[filter,opacity,scale] duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
