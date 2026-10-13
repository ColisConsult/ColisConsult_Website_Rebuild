import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CtaBand } from '@/components/sections/cta-band';
import { href, type Locale } from '@/i18n/config';
import { dictionaryFor, getDictionary } from '@/i18n/get-dictionary';
import { getPost, getPostSlugs } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { renderMarkdown } from '@/lib/markdown';
import type { Post } from '@/lib/types';
import { pageMetadata } from '@/lib/metadata';

const PLACEHOLDER = '__aucun-article__';

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  const unique = [...new Set(slugs.map((s) => s.slug))];
  // Cache Components exige au moins une valeur ; les autres articles sont rendus à la demande
  return unique.length ? unique.map((slug) => ({ slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<'/[lang]/blog/[slug]'>) {
  const { slug } = await params;
  const { locale } = await getDictionary();
  const post = slug === PLACEHOLDER ? null : await getPost(slug, locale);
  if (!post) return {};
  return {
    ...pageMetadata(locale, 'blog', post.title, post.excerpt, slug),
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt ?? undefined,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps<'/[lang]/blog/[slug]'>) {
  const { t, locale } = await getDictionary();
  return (
    <>
      <Suspense fallback={<PostSkeleton />}>
        <PostContent params={params} locale={locale} />
      </Suspense>
      <CtaBand t={t} locale={locale} />
    </>
  );
}

async function PostContent({ params, locale }: { params: Promise<{ slug: string }>; locale: Locale }) {
  const { slug } = await params;
  if (slug === PLACEHOLDER) notFound();
  const post = await getPost(slug, locale);
  if (!post) notFound();
  return <Article post={post} locale={locale} />;
}

function Article({ post, locale }: { post: Post; locale: Locale }) {
  const t = dictionaryFor(locale);
  const html = renderMarkdown(post.content);

  return (
    <article lang={post.locale}>
      <header className="container-site pt-14 pb-12 md:pt-20">
        <div className="mx-auto max-w-[44rem]">
        <Link href={href(locale, 'blog')} className="link font-display text-sm font-medium text-ink-soft hover:text-ink">
          {t.common.backToBlog}
        </Link>
        <h1 className="mt-8 text-[clamp(2.1rem,1.4rem+2.8vw,3.2rem)] leading-[1.08]">{post.title}</h1>
        <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-faint">
          {post.publishedAt && (
            <span>
              {t.common.publishedOn} {formatDate(post.publishedAt, locale)}
            </span>
          )}
          <span>
            {post.readingMinutes} {t.common.minRead}
          </span>
          {post.locale !== locale && <span>{t.common.inFrench}</span>}
        </p>
        </div>
      </header>
      {post.coverImageUrl && (
        <div className="container-site">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImageUrl} alt="" className="mx-auto max-h-[28rem] w-full max-w-[56rem] rounded-[var(--radius-media)] object-cover" />
        </div>
      )}
      <div className="container-site pt-4 pb-20">
        <div className="prose-cc mx-auto max-w-[44rem]" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}

function PostSkeleton() {
  return (
    <div className="container-site animate-pulse pt-20 pb-24" aria-hidden="true">
      <div className="h-4 w-32 rounded bg-line" />
      <div className="mt-8 h-12 max-w-2xl rounded bg-line" />
      <div className="mt-4 h-12 max-w-xl rounded bg-line" />
      <div className="mx-auto mt-16 max-w-[44rem] space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-line" />
        ))}
      </div>
    </div>
  );
}
