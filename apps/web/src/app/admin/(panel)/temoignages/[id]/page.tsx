import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { LoadingBlock, PageTitle } from '@/components/admin/ui';
import { AdminApiError, adminFetch } from '@/lib/admin-api';
import type { Testimonial } from '@/lib/types';
import { deleteTestimonial } from '../../../actions';
import { ConfirmButton } from '../../confirm-button';
import { TestimonialForm } from '../testimonial-form';

export const metadata = { title: 'Modifier le témoignage' };

export default function EditTestimonialPage({ params }: PageProps<'/admin/temoignages/[id]'>) {
  return (
    <Suspense fallback={<LoadingBlock />}>
      <Editor params={params} />
    </Suspense>
  );
}

async function Editor({ params }: { params: PageProps<'/admin/temoignages/[id]'>['params'] }) {
  const { id } = await params;
  let item: Testimonial;
  try {
    item = await adminFetch<Testimonial>(`/admin/testimonials/${id}`);
  } catch (e) {
    if (e instanceof AdminApiError && (e.status === 404 || e.status === 400)) notFound();
    throw e;
  }
  return (
    <>
      <PageTitle title={item.company} back={{ href: '/admin/temoignages', label: 'Témoignages' }}>
        <form action={deleteTestimonial.bind(null, item.id)}>
          <ConfirmButton message="Supprimer ce témoignage ?">Supprimer</ConfirmButton>
        </form>
      </PageTitle>
      <TestimonialForm item={item} />
    </>
  );
}
