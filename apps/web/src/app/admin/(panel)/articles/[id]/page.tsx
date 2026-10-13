import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { LoadingBlock, PageTitle } from '@/components/admin/ui';
import { AdminApiError, adminFetch } from '@/lib/admin-api';
import type { Post } from '@/lib/types';
import { deletePost } from '../../../actions';
import { ConfirmButton } from '../../confirm-button';
import { PostEditor } from '../post-editor';

export const metadata = { title: 'Modifier l’article' };

export default function EditPostPage({ params }: PageProps<'/admin/articles/[id]'>) {
  return (
    <Suspense fallback={<LoadingBlock />}>
      <Editor params={params} />
    </Suspense>
  );
}

async function Editor({ params }: { params: PageProps<'/admin/articles/[id]'>['params'] }) {
  const { id } = await params;
  let post: Post;
  try {
    post = await adminFetch<Post>(`/admin/posts/${id}`);
  } catch (e) {
    if (e instanceof AdminApiError && (e.status === 404 || e.status === 400)) notFound();
    throw e;
  }
  return (
    <>
      <PageTitle title="Modifier l’article" back={{ href: '/admin/articles', label: 'Articles' }}>
        {post.status === 'published' && (
          <a href={`/${post.locale === 'en' ? 'en/' : ''}blog/${post.slug}`} target="_blank" className="text-sm text-teal hover:underline">
            Voir en ligne ↗
          </a>
        )}
        <form action={deletePost.bind(null, post.id)}>
          <ConfirmButton message="Supprimer définitivement cet article ?">Supprimer</ConfirmButton>
        </form>
      </PageTitle>
      <PostEditor post={post} />
    </>
  );
}
