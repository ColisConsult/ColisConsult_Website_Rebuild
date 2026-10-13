import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/400-italic.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '../globals.css';
import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getDictionary();
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s · ColisConsult` },
    description: t.meta.description,
    openGraph: {
      type: 'website',
      siteName: 'ColisConsult',
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: { card: 'summary_large_image' },
    alternates: { languages: { fr: '/', en: '/en' } },
    icons: { icon: '/icon.svg' },
  };
}

export const viewport: Viewport = {
  themeColor: '#0d5257',
};

export default async function RootLayout({ children }: LayoutProps<'/[lang]'>) {
  const { t, locale } = await getDictionary();
  return (
    <html lang={locale}>
      <body className="flex min-h-dvh flex-col">
        <Header t={t} locale={locale} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer t={t} locale={locale} />
      </body>
    </html>
  );
}
