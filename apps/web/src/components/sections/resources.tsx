import Link from 'next/link';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { getPosts, getWebinars } from '@/lib/api';
import { formatDate, formatDateTime } from '@/lib/format';
import { site } from '@/lib/site';
import type { PostSummary, Webinar } from '@/lib/types';
import { ArrowUpRight } from '../ui/icons';

export function PostRow({ post, locale, t }: { post: PostSummary; locale: Locale; t: Dictionary }) {
  return (
    <li className="border-b border-line">
      <Link
        href={href(locale, 'blog', post.slug)}
        className="group grid gap-x-8 gap-y-2 py-6 md:grid-cols-12"
        lang={post.locale !== locale ? post.locale : undefined}
      >
        <span className="num text-sm text-ink-faint md:col-span-3">
          {post.publishedAt && formatDate(post.publishedAt, locale, { month: 'short' })}
        </span>
        <span className="md:col-span-9">
          <span className="block font-display text-xl font-medium tracking-tight transition-colors group-hover:text-teal">
            {post.title}
          </span>
          {post.excerpt && <span className="mt-1.5 block max-w-2xl text-ink-soft">{post.excerpt}</span>}
          <span className="mt-2 block text-sm text-ink-faint">
            {post.readingMinutes} {t.common.minRead}
            {post.locale !== locale && <> · {t.common.inFrench}</>}
          </span>
        </span>
      </Link>
    </li>
  );
}

export async function LatestPosts({ locale, t, limit = 3 }: { locale: Locale; t: Dictionary; limit?: number }) {
  const { items } = await getPosts(locale, 1, limit);
  if (!items.length) return <p className="text-ink-soft">{t.blog.empty}</p>;
  return (
    <ul className="border-t border-line">
      {items.map((post) => (
        <PostRow key={post.id} post={post} locale={locale} t={t} />
      ))}
    </ul>
  );
}

export function WebinarItem({ w, locale, t }: { w: Webinar; locale: Locale; t: Dictionary }) {
  const title = locale === 'en' ? (w.titleEn ?? w.titleFr) : w.titleFr;
  const description = locale === 'en' ? (w.descriptionEn ?? w.descriptionFr) : w.descriptionFr;
  const link = w.registrationUrl ?? w.replayUrl;
  return (
    <li className="border-b border-line py-5">
      <p className="num text-sm text-coral-ink first-letter:uppercase">{formatDateTime(w.startsAt, locale)}</p>
      <p className="mt-1 font-display text-lg font-medium tracking-tight">{title}</p>
      {description && <p className="mt-1 text-[0.95rem] text-ink-soft">{description}</p>}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline">
          {w.registrationUrl ? t.home.resources.register : t.home.resources.replay}
          <ArrowUpRight />
        </a>
      )}
    </li>
  );
}

export async function UpcomingWebinars({ locale, t }: { locale: Locale; t: Dictionary }) {
  const webinars = await getWebinars('upcoming');
  if (!webinars.length) {
    return (
      <p className="border-t border-line pt-5 text-[0.95rem] text-ink-soft">
        {t.home.resources.noWebinar}{' '}
        <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="link text-ink">
          YouTube
        </a>
      </p>
    );
  }
  return (
    <ul className="border-t border-line">
      {webinars.slice(0, 3).map((w) => (
        <WebinarItem key={w.id} w={w} locale={locale} t={t} />
      ))}
    </ul>
  );
}
