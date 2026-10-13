import Link from 'next/link';
import { Suspense } from 'react';
import { Empty, LoadingBlock, PageTitle, Saved, Table, fmtDate } from '@/components/admin/ui';
import { adminFetch } from '@/lib/admin-api';
import type { PostSummary } from '@/lib/types';

export const metadata = { title: 'Articles' };

export default function PostsPage({ searchParams }: PageProps<'/admin/articles'>) {
  return (
    <>
      <PageTitle title="Articles">
        <Link href="/admin/articles/nouveau" className="btn btn-dark !py-2">
          Nouvel article
        </Link>
      </PageTitle>
      <Suspense fallback={<LoadingBlock />}>
        <Posts searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Posts({ searchParams }: { searchParams: PageProps<'/admin/articles'>['searchParams'] }) {
  const [sp, posts] = await Promise.all([searchParams, adminFetch<PostSummary[]>('/admin/posts')]);
  return (
    <>
      <Saved show={sp.saved === '1'} label="Article enregistré. Le site est mis à jour." />
      {posts.length ? (
        <Table head={['Titre', 'Langue', 'Statut', 'Publication', 'Modifié']}>
          {posts.map((p) => (
            <tr key={p.id} className="hover:bg-paper/70">
              <td className="max-w-md px-4 py-3">
                <Link href={`/admin/articles/${p.id}`} className="font-medium hover:text-teal hover:underline">
                  {p.title}
                </Link>
                <span className="block truncate text-xs text-ink-faint">/blog/{p.slug}</span>
              </td>
              <td className="px-4 py-3 uppercase">{p.locale}</td>
              <td className="px-4 py-3">
                <span className={p.status === 'published' ? 'text-mint-ink' : 'text-ink-faint'}>
                  {p.status === 'published' ? 'Publié' : 'Brouillon'}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-ink-soft">{fmtDate(p.publishedAt)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-ink-soft">{fmtDate(p.updatedAt)}</td>
            </tr>
          ))}
        </Table>
      ) : (
        <Empty>Aucun article. Importez ceux de WordPress avec « npm run import:wordpress ».</Empty>
      )}
    </>
  );
}
