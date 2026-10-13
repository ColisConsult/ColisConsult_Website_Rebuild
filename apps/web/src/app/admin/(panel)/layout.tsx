import Link from 'next/link';
import { Suspense } from 'react';
import { LogoMark } from '@/components/ui/logo';
import { logout } from '../actions';
import { AdminNav } from './admin-nav';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 md:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-display font-semibold tracking-tight text-teal">
            <LogoMark className="h-6 w-auto" />
            <span className="hidden sm:inline">Back-office</span>
          </Link>
          <Suspense fallback={<nav className="h-full" />}>
            <AdminNav />
          </Suspense>
          <div className="ml-auto flex items-center gap-4 text-sm">
            <a href="/" target="_blank" className="hidden text-ink-soft hover:text-ink sm:inline">
              Voir le site ↗
            </a>
            <form action={logout}>
              <button type="submit" className="text-ink-soft hover:text-ink">
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-10">{children}</main>
    </div>
  );
}
