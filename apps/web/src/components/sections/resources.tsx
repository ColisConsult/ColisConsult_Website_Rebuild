import Link from 'next/link';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { getPosts, getWebinars } from '@/lib/api';
import { cn } from '@/lib/cn';
import { formatDate, formatDateTime } from '@/lib/format';
import { site } from '@/lib/site';
import type { PostSummary, Webinar } from '@/lib/types';
import { CountUp } from '../motion/count-up';
import { Aurora } from '../motion/primitives';
import { ArrowRight, ArrowUpRight } from '../ui/icons';
import { LogoMark } from '../ui/logo';
import { CoverImage } from './cover-image';
import { TextLink } from '../ui/text-link';

export function PostRow({ post, locale, t }: { post: PostSummary; locale: Locale; t: Dictionary }) {
  return (
    <li className="border-b border-line">
      <Link
        href={href(locale, 'blog', post.slug)}
        className="group relative grid gap-x-8 gap-y-1 py-6 md:grid-cols-12"
        lang={post.locale !== locale ? post.locale : undefined}
      >
        <span className="text-sm text-ink-faint tabular-nums md:col-span-3 md:pt-1">
          {post.publishedAt && formatDate(post.publishedAt, locale, { month: 'short' })}
        </span>
        <span className="md:col-span-9 md:pr-12">
          <span className="block font-display text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-teal md:text-xl">
            {post.title}
          </span>
          {post.excerpt && <span className="mt-1.5 line-clamp-2 block max-w-2xl text-ink-soft">{post.excerpt}</span>}
          <span className="mt-2 block text-sm text-ink-faint">
            {post.readingMinutes} {t.common.minRead}
            {post.locale !== locale && <> · {t.common.inFrench}</>}
          </span>
        </span>
        <span
          className="absolute top-6 right-0 hidden size-10 items-center justify-center rounded-full bg-mist text-teal transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45 group-hover:bg-coral group-hover:text-night md:flex"
          aria-hidden="true"
        >
          <ArrowRight className="size-4" />
        </span>
      </Link>
    </li>
  );
}

/** Carte d'article (page Blog) : couverture qui s'agrandit au survol, ou visuel de marque à défaut. */
export function PostCard({ post, locale, t, featured }: { post: PostSummary; locale: Locale; t: Dictionary; featured?: boolean }) {
  return (
    <Link
      href={href(locale, 'blog', post.slug)}
      lang={post.locale !== locale ? post.locale : undefined}
      className={cn('group card card-lift flex h-full flex-col overflow-hidden p-2', featured && 'lg:grid lg:grid-cols-2 lg:gap-2')}
    >
      <div className={cn('relative overflow-hidden rounded-[calc(var(--radius-card)-0.3rem)]', featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]' : 'aspect-[16/10]')}>
        <div className="surface-night absolute inset-0" aria-hidden="true">
          <Aurora variant="cta" />
          <LogoMark className="absolute -top-6 -right-6 h-40 w-auto opacity-25 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:rotate-6" />
        </div>
        {post.coverImageUrl && (
          <CoverImage
            src={post.coverImageUrl}
            className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        )}
        {post.publishedAt && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-ink tabular-nums backdrop-blur">
            {formatDate(post.publishedAt, locale, { month: 'short' })}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 pt-5 md:p-5">
        <h2 className={cn('font-display font-semibold tracking-tight transition-colors duration-300 group-hover:text-teal', featured ? 'text-[1.6rem] leading-tight md:text-[2rem]' : 'text-lg leading-snug md:text-xl')}>
          {post.title}
        </h2>
        {post.excerpt && <p className={cn('mt-2 text-ink-soft', featured ? 'line-clamp-4' : 'line-clamp-3 text-[0.97rem]')}>{post.excerpt}</p>}
        <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm text-ink-faint">
          <span>
            {post.readingMinutes} {t.common.minRead}
            {post.locale !== locale && <> · {t.common.inFrench}</>}
          </span>
          <span
            className="flex size-9 items-center justify-center rounded-full bg-mist text-teal transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45 group-hover:bg-coral group-hover:text-night"
            aria-hidden="true"
          >
            <ArrowRight className="size-4" />
          </span>
        </span>
      </div>
    </Link>
  );
}

/** Derniers articles de fond (conseils, analyses) : les actualités sont présentées à part. */
export async function LatestPosts({ locale, t, limit = 3 }: { locale: Locale; t: Dictionary; limit?: number }) {
  const { items } = await getPosts(locale, 1, limit, 'article');
  if (!items.length) return <p className="text-ink-soft">{t.blog.empty}</p>;
  return (
    <ul data-stagger="" className="border-t border-line">
      {items.map((post) => (
        <PostRow key={post.id} post={post} locale={locale} t={t} />
      ))}
    </ul>
  );
}

/** Actualité ou annonce de webinar : date, étiquette, titre. */
export function NewsItem({ post, locale, t }: { post: PostSummary; locale: Locale; t: Dictionary }) {
  return (
    <li className="border-b border-line">
      <Link
        href={href(locale, 'blog', post.slug)}
        lang={post.locale !== locale ? post.locale : undefined}
        className="group block py-4"
      >
        <span className="block text-xs font-medium text-ink-faint tabular-nums">
          {post.publishedAt ? formatDate(post.publishedAt, locale, { month: 'short' }) : t.common.kind.news}
        </span>
        <span className="mt-1 block font-display leading-snug font-semibold tracking-tight transition-colors duration-300 group-hover:text-teal">
          {post.title}
        </span>
      </Link>
    </li>
  );
}

export async function LatestNews({ locale, t, limit = 3 }: { locale: Locale; t: Dictionary; limit?: number }) {
  const { items } = await getPosts(locale, 1, limit, 'news');
  if (!items.length) return <p className="text-[0.95rem] text-ink-soft">{t.home.resources.noNews}</p>;
  return (
    <ul className="border-t border-line">
      {items.map((post) => (
        <NewsItem key={post.id} post={post} locale={locale} t={t} />
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

/**
 * Webinars à venir. `quiet` : sans webinar programmé, rien qu'un lien discret vers les
 * replays (dans un bloc qui affiche déjà les actualités).
 */
export async function UpcomingWebinars({ locale, t, quiet }: { locale: Locale; t: Dictionary; quiet?: boolean }) {
  const webinars = await getWebinars('upcoming');
  if (!webinars.length) {
    if (quiet) {
      return (
        <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="link mt-5 inline-block text-sm text-teal">
          {t.home.resources.replay} (YouTube)
          <ArrowUpRight />
        </a>
      );
    }
    return (
      <p className="text-[0.95rem] text-ink-soft">
        {t.home.resources.noWebinar}{' '}
        <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="link text-teal">
          YouTube
        </a>
      </p>
    );
  }
  const list = (
    <ul className={quiet ? undefined : 'border-t border-line'}>
      {webinars.slice(0, 3).map((w) => (
        <WebinarItem key={w.id} w={w} locale={locale} t={t} />
      ))}
    </ul>
  );
  if (!quiet) return list;
  return (
    <div className="mt-6 rounded-2xl bg-coral-soft/50 px-5 pt-4 [&_li:last-child]:border-b-0 [&_li]:py-4">
      <p className="text-xs font-semibold tracking-wide text-coral-ink uppercase">{t.home.resources.webinars}</p>
      {list}
    </div>
  );
}

/** Bloc « ressources » de l'accueil : articles récents, palmarès, webinars. */
export function HomeResources({ t, locale }: { t: Dictionary; locale: Locale }) {
  const r = t.home.resources;
  return (
    <section className="bg-mist py-20 md:py-32">
      <div className="container-site grid gap-x-14 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 data-reveal="" className="text-headline">
            {r.title}
          </h2>
          <h3 className="mt-8 mb-1 font-display text-sm font-medium text-ink-soft">{r.blog}</h3>
          <LatestPosts locale={locale} t={t} />
          <TextLink href={href(locale, 'blog')} className="mt-6 inline-block">
            {t.common.allArticles}
          </TextLink>
        </div>
        <aside data-stagger="" className="space-y-5 lg:col-span-5 lg:pt-2">
          <Link
            href={href(locale, 'rankings')}
            data-spotlight=""
            className="group surface-night spot block rounded-[var(--radius-card)] p-8 transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgb(3_28_30/0.8)]"
          >
            <Aurora variant="cta" />
            <p className="figure text-[clamp(3.2rem,2.6rem+2vw,4.4rem)] text-gradient-coral">
              <CountUp value="518" />
            </p>
            <p className="mt-4 font-display text-xl font-semibold">{r.rankingsTitle}</p>
            <p className="mt-1.5 text-white/70">{r.rankingsText}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-[0.95rem] font-medium">
              <span className="link-slide">{r.rankingsCta}</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
          <div className="card p-7">
            <h3 className="mb-3 font-display text-base font-semibold">{r.news}</h3>
            <LatestNews locale={locale} t={t} />
            <UpcomingWebinars locale={locale} t={t} quiet />
          </div>
        </aside>
      </div>
    </section>
  );
}
