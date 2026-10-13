import Link from 'next/link';
import { Suspense } from 'react';
import { Empty, LoadingBlock, PageTitle, Saved, Table, fmtDate } from '@/components/admin/ui';
import { adminFetch } from '@/lib/admin-api';
import type { Webinar } from '@/lib/types';

export const metadata = { title: 'Webinars' };

export default function WebinarsPage({ searchParams }: PageProps<'/admin/webinars'>) {
  return (
    <>
      <PageTitle title="Webinars">
        <Link href="/admin/webinars/nouveau" className="btn btn-dark !py-2">
          Nouveau webinar
        </Link>
      </PageTitle>
      <Suspense fallback={<LoadingBlock />}>
        <List searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function List({ searchParams }: { searchParams: PageProps<'/admin/webinars'>['searchParams'] }) {
  const [sp, items] = await Promise.all([searchParams, adminFetch<Webinar[]>('/admin/webinars')]);
  return (
    <>
      <Saved show={sp.saved === '1'} label="Webinar enregistré. Le site est mis à jour." />
      {items.length ? (
        <Table head={['Date', 'Titre', 'Visible', 'Lien']}>
          {items.map((w) => (
            <tr key={w.id} className="hover:bg-paper/70">
              <td className="px-4 py-3 whitespace-nowrap text-ink-soft">{fmtDate(w.startsAt)}</td>
              <td className="px-4 py-3 font-medium">
                <Link href={`/admin/webinars/${w.id}`} className="hover:text-teal hover:underline">
                  {w.titleFr}
                </Link>
              </td>
              <td className="px-4 py-3">{w.published ? 'Oui' : 'Non'}</td>
              <td className="px-4 py-3 text-ink-soft">{w.registrationUrl ? 'Inscription' : w.replayUrl ? 'Replay' : '—'}</td>
            </tr>
          ))}
        </Table>
      ) : (
        <Empty>Aucun webinar. Les sessions ajoutées ici apparaissent sur l’accueil et le blog.</Empty>
      )}
    </>
  );
}
