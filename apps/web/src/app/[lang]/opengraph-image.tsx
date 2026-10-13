import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { hasLocale } from '@/i18n/config';

/** Image de partage (LinkedIn, e-mails…) générée au build, aux couleurs du cabinet */
export const alt = 'ColisConsult';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const COPY = {
  fr: {
    kicker: 'Cabinet indépendant d’appels d’offres transport · depuis 2005',
    title: 'Payez le juste prix pour chaque colis et chaque palette.',
    foot: 'Analyse assistée par IA · Négociation par nos consultants · Payé au résultat',
  },
  en: {
    kicker: 'Independent transport tender consultancy · since 2005',
    title: 'Pay the right price for every parcel and every pallet.',
    foot: 'AI-assisted analysis · Negotiation by our consultants · Paid on results',
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
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0a3e42', color: 'white', padding: '64px 72px', fontFamily: 'Poppins' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="46" height="52" viewBox="0 0 230 256" fill="none" stroke="white" strokeWidth="18" strokeLinejoin="round" strokeLinecap="round">
            <path d="M115 12 L214 68 L118 124 L18 68 Z" />
            <path d="M18 68 V188 L118 244 V124" />
            <path d="M118 146 L214 190 L118 244" />
          </svg>
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>ColisConsult</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, fontWeight: 500, color: '#8fb6b4' }}>
            <div style={{ width: 40, height: 2, background: '#ff8e72' }} />
            {copy.kicker}
          </div>
          <div style={{ marginTop: 26, fontSize: 70, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 1000 }}>{copy.title}</div>
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
