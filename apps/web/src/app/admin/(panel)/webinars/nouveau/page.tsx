import { PageTitle } from '@/components/admin/ui';
import { WebinarForm } from '../webinar-form';

export const metadata = { title: 'Nouveau webinar' };

export default function NewWebinarPage() {
  return (
    <>
      <PageTitle title="Nouveau webinar" back={{ href: '/admin/webinars', label: 'Webinars' }} />
      <WebinarForm item={null} />
    </>
  );
}
