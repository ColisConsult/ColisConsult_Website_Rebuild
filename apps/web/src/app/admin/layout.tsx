import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Back-office', template: '%s · Back-office ColisConsult' },
  robots: { index: false, follow: false },
  icons: { icon: '/icon.svg' },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-paper text-[0.97rem]">{children}</body>
    </html>
  );
}
