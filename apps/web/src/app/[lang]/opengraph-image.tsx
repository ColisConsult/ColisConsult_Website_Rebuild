import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { MARK, WORDMARK } from '@/components/ui/logo';
import { hasLocale } from '@/i18n/config';

/** Image de partage (LinkedIn, e-mails…) générée au build, aux couleurs du cabinet */
export const alt = 'ColisConsult';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const COPY = {
  fr: {
    title: 'Payez moins cher vos colis et vos palettes. Souvent sans changer de transporteur.',
    foot: 'Cabinet indépendant depuis 2005 · 3 à 22 % d’économies constatées · Payé au résultat',
  },
  en: {
    title: 'Pay less to ship your parcels and pallets. Often without changing carrier.',
    foot: 'Independent since 2005 · 3–22% savings achieved · Paid on results',
  },
};

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const copy = COPY[hasLocale(lang) ? lang : 'fr'];
  const [semi, medium] = await Promise.all([
    readFile(join(process.cwd(), 'assets/Poppins-SemiBold.woff')),
    readFile(join(process.cwd(), 'assets/Poppins-Medium.woff')),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#072f32', color: 'white', padding: '64px 72px', fontFamily: 'Poppins' }}>
        <svg width="330" height="83" viewBox="0 0 7677 1935">
          <path d={MARK} fill="#FF8E72" />
          <path d={WORDMARK} fill="#FFFFFF" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 66, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 1000 }}>{copy.title}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 22, fontWeight: 500, color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: 22 }}>
          {copy.foot}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Poppins', data: semi, weight: 600, style: 'normal' },
        { name: 'Poppins', data: medium, weight: 500, style: 'normal' },
      ],
    },
  );
}
