import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense, type CSSProperties } from 'react';
import { Aurora, RiseWords } from '@/components/motion/primitives';
import { CoverImage } from '@/components/sections/cover-image';
import { CtaBand } from '@/components/sections/cta-band';
import { ArrowRight } from '@/components/ui/icons';
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
      <header data-tone="dark" className={`surface-night on-dark pt-32 md:pt-40 ${post.coverImageUrl ? 'pb-28 md:pb-40' : 'pb-16 md:pb-24'}`}>
        <Aurora variant="section" />
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-site">
          <div className="mx-auto max-w-[48rem]">
            <Link href={href(locale, 'blog')} className="rise group inline-flex items-center gap-2 font-display text-sm font-medium text-white/65 hover:text-white">
              <ArrowRight className="size-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
              {t.common.backToBlog}
            </Link>
            <RiseWords text={post.title} className="mt-8 text-[clamp(2.1rem,1.4rem+2.8vw,3.6rem)] leading-[1.06] text-white" />
            <p className="rise mt-7 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/55" style={{ '--delay': '400ms' } as CSSProperties}>
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
        </div>
      </header>
      {post.coverImageUrl && (
        <div className="relative z-10 container-site -mt-20 md:-mt-28">
          <div className="rise" style={{ '--delay': '300ms' } as CSSProperties}>
            <CoverImage
              src={post.coverImageUrl}
              className="mx-auto max-h-[30rem] w-full max-w-[60rem] rounded-[var(--radius-media)] object-cover shadow-[0_40px_100px_-40px_rgb(3_28_30/0.6)]"
            />
          </div>
        </div>
      )}
      <div className="container-site pt-12 pb-20 md:pt-16">
        <div className="prose-cc mx-auto max-w-[44rem]" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}

function PostSkeleton() {
  return (
    <div aria-hidden="true">
      <div data-tone="dark" className="surface-night pt-32 pb-20 md:pt-40">
        <div className="container-site animate-pulse">
          <div className="mx-auto max-w-[48rem]">
            <div className="h-4 w-32 rounded bg-white/10" />
            <div className="mt-8 h-12 max-w-2xl rounded bg-white/10" />
            <div className="mt-4 h-12 max-w-xl rounded bg-white/10" />
          </div>
        </div>
      </div>
      <div className="container-site animate-pulse pt-16 pb-24">
        <div className="mx-auto max-w-[44rem] space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-line" />
          ))}
        </div>
      </div>
    </div>
  );
}
