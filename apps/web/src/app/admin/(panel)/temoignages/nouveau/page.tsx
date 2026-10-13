import { PageTitle } from '@/components/admin/ui';
import { TestimonialForm } from '../testimonial-form';

export const metadata = { title: 'Nouveau témoignage' };

export default function NewTestimonialPage() {
  return (
    <>
      <PageTitle title="Nouveau témoignage" back={{ href: '/admin/temoignages', label: 'Témoignages' }} />
      <TestimonialForm item={null} />
    </>
  );
}
