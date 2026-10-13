import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { LoadingBlock, PageTitle } from '@/components/admin/ui';
import { AdminApiError, adminFetch } from '@/lib/admin-api';
import type { Webinar } from '@/lib/types';
import { deleteWebinar } from '../../../actions';
import { ConfirmButton } from '../../confirm-button';
import { WebinarForm } from '../webinar-form';

export const metadata = { title: 'Modifier le webinar' };

export default function EditWebinarPage({ params }: PageProps<'/admin/webinars/[id]'>) {
  return (
    <Suspense fallback={<LoadingBlock />}>
      <Editor params={params} />
    </Suspense>
  );
}

async function Editor({ params }: { params: PageProps<'/admin/webinars/[id]'>['params'] }) {
  const { id } = await params;
  let item: Webinar;
  try {
    item = await adminFetch<Webinar>(`/admin/webinars/${id}`);
  } catch (e) {
    if (e instanceof AdminApiError && (e.status === 404 || e.status === 400)) notFound();
    throw e;
  }
  return (
    <>
      <PageTitle title={item.titleFr} back={{ href: '/admin/webinars', label: 'Webinars' }}>
        <form action={deleteWebinar.bind(null, item.id)}>
          <ConfirmButton message="Supprimer ce webinar ?">Supprimer</ConfirmButton>
        </form>
      </PageTitle>
      <WebinarForm item={item} />
    </>
  );
}
