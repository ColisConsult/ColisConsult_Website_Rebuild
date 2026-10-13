import { PageTitle } from '@/components/admin/ui';
import { PostEditor } from '../post-editor';

export const metadata = { title: 'Nouvel article' };

export default function NewPostPage() {
  return (
    <>
      <PageTitle title="Nouvel article" back={{ href: '/admin/articles', label: 'Articles' }} />
      <PostEditor post={null} />
    </>
  );
}
