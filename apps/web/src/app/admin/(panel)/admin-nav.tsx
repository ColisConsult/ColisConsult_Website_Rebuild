'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

const ITEMS = [
  { href: '/admin', label: 'Tableau de bord', exact: true },
  { href: '/admin/demandes', label: 'Demandes' },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/temoignages', label: 'Témoignages' },
  { href: '/admin/webinars', label: 'Webinars' },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="-mb-px flex h-full items-stretch gap-1 overflow-x-auto">
      {ITEMS.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center border-b-2 px-2.5 text-sm whitespace-nowrap',
              active ? 'border-coral font-medium text-ink' : 'border-transparent text-ink-soft hover:text-ink',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
