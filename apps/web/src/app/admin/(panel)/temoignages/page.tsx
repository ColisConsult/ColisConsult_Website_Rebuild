import Link from 'next/link';
import { Suspense } from 'react';
import { Empty, LoadingBlock, PageTitle, Saved, Table } from '@/components/admin/ui';
import { adminFetch } from '@/lib/admin-api';
import type { Testimonial } from '@/lib/types';

export const metadata = { title: 'Témoignages' };
const SEGMENT = { enterprise: 'Grand groupe', ecommerce: 'E-commerce', sme: 'PME' } as const;

export default function TestimonialsPage({ searchParams }: PageProps<'/admin/temoignages'>) {
  return (
    <>
      <PageTitle title="Témoignages">
        <Link href="/admin/temoignages/nouveau" className="btn btn-dark !py-2">
          Nouveau témoignage
        </Link>
      </PageTitle>
      <Suspense fallback={<LoadingBlock />}>
        <List searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function List({ searchParams }: { searchParams: PageProps<'/admin/temoignages'>['searchParams'] }) {
  const [sp, items] = await Promise.all([searchParams, adminFetch<Testimonial[]>('/admin/testimonials')]);
  return (
    <>
      <Saved show={sp.saved === '1'} label="Témoignage enregistré. Le site est mis à jour." />
      {items.length ? (
        <Table head={['Ordre', 'Entreprise', 'Auteur', 'Segment', 'Accueil', 'Extrait']}>
          {items.map((t) => (
            <tr key={t.id} className="hover:bg-paper/70">
              <td className="num px-4 py-3 text-ink-faint">{t.sortOrder}</td>
              <td className="px-4 py-3 font-medium">
                <Link href={`/admin/temoignages/${t.id}`} className="hover:text-teal hover:underline">
                  {t.company}
                </Link>
              </td>
              <td className="px-4 py-3">{t.author}</td>
              <td className="px-4 py-3 text-ink-soft">{SEGMENT[t.segment]}</td>
              <td className="px-4 py-3">{t.featured ? '★' : ''}</td>
              <td className="max-w-sm truncate px-4 py-3 text-ink-soft">{t.quoteFr}</td>
            </tr>
          ))}
        </Table>
      ) : (
        <Empty>Aucun témoignage.</Empty>
      )}
    </>
  );
}
