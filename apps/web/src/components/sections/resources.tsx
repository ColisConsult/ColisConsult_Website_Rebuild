import Link from 'next/link';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { getPosts, getWebinars } from '@/lib/api';
import { formatDate, formatDateTime } from '@/lib/format';
import { site } from '@/lib/site';
import type { PostSummary, Webinar } from '@/lib/types';
import { ArrowUpRight } from '../ui/icons';
import { TextLink } from '../ui/text-link';

export function PostRow({ post, locale, t }: { post: PostSummary; locale: Locale; t: Dictionary }) {
  return (
    <li className="border-b border-line">
      <Link
        href={href(locale, 'blog', post.slug)}
        className="group grid gap-x-8 gap-y-1 py-6 md:grid-cols-12"
        lang={post.locale !== locale ? post.locale : undefined}
      >
        <span className="text-sm text-ink-faint tabular-nums md:col-span-3 md:pt-1">
          {post.publishedAt && formatDate(post.publishedAt, locale, { month: 'short' })}
        </span>
        <span className="md:col-span-9">
          <span className="block font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-teal md:text-xl">
            {post.title}
          </span>
          {post.excerpt && <span className="mt-1.5 line-clamp-2 block max-w-2xl text-ink-soft">{post.excerpt}</span>}
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
      <p className="text-sm font-medium text-coral-ink tabular-nums first-letter:uppercase">{formatDateTime(w.startsAt, locale)}</p>
      <p className="mt-1 font-display text-lg font-semibold tracking-tight">{title}</p>
      {description && <p className="mt-1 text-[0.95rem] text-ink-soft">{description}</p>}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block text-sm font-medium text-teal">
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
      <p className="text-[0.95rem] text-ink-soft">
        {t.home.resources.noWebinar}{' '}
        <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="link text-teal">
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

/** Bloc « ressources » de l'accueil : articles récents, palmarès, webinars. */
export function HomeResources({ t, locale }: { t: Dictionary; locale: Locale }) {
  const r = t.home.resources;
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-site grid gap-x-14 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-headline">{r.title}</h2>
          <h3 className="mt-8 mb-1 font-display text-sm font-medium text-ink-soft">{r.blog}</h3>
          <LatestPosts locale={locale} t={t} />
          <TextLink href={href(locale, 'blog')} className="mt-6 inline-block">
            {t.common.allArticles}
          </TextLink>
        </div>
        <aside className="space-y-6 lg:col-span-5 lg:pt-2">
          <Link href={href(locale, 'rankings')} className="group block rounded-[var(--radius-card)] bg-teal p-7 text-white">
            <p className="figure text-[2.6rem] text-coral">518</p>
            <p className="mt-3 font-display text-xl font-semibold">{r.rankingsTitle}</p>
            <p className="mt-1.5 text-white/75">{r.rankingsText}</p>
            <span className="mt-5 inline-block font-display text-[0.95rem] font-medium underline decoration-white/40 underline-offset-4 group-hover:decoration-white">
              {r.rankingsCta}
            </span>
          </Link>
          <div className="rounded-[var(--radius-card)] p-7 ring-1 ring-line">
            <h3 className="mb-3 font-display text-base font-semibold">{r.webinars}</h3>
            <UpcomingWebinars locale={locale} t={t} />
          </div>
        </aside>
      </div>
    </section>
  );
}
