import { NewsItem, PostCard, UpcomingWebinars, WebinarItem } from '@/components/sections/resources';
import { PageHero, Section } from '@/components/ui/section';
import { getDictionary } from '@/i18n/get-dictionary';
import { getPosts, getWebinars } from '@/lib/api';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'blog', t.blog.title, t.blog.lead);
}

export default async function BlogPage() {
  const { t, locale } = await getDictionary();
  const [{ items }, news, past] = await Promise.all([
    getPosts(locale, 1, 50, 'article'),
    getPosts(locale, 1, 20, 'news'),
    getWebinars('past'),
  ]);

  return (
    <>
      <PageHero title={t.blog.title} lead={t.blog.lead}>
        {/* Deux rubriques distinctes : les articles de fond, puis les actualités et webinars */}
        <nav aria-label={t.blog.jumpLabel} className="flex flex-wrap gap-3">
          {[
            { id: 'articles', label: t.blog.articlesTitle, count: items.length },
            { id: 'webinars', label: t.blog.newsTitle, count: news.items.length },
          ].map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-4 py-2 font-display text-[0.95rem] font-medium text-white/90 transition-colors duration-300 hover:border-white/40 hover:bg-white/10"
            >
              {tab.label}
              <span className="rounded-full bg-white/12 px-2 py-0.5 text-xs text-white/75 tabular-nums">{tab.count}</span>
            </a>
          ))}
        </nav>
      </PageHero>
      <div id="articles" className="container-site pt-12 pb-20 md:pt-16 md:pb-28">
        <h2 data-reveal="" className="sr-only">
          {t.blog.articlesTitle}
        </h2>
        {items.length ? (
          <ul data-stagger="" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((post, i) => (
              <li key={post.id} className={i === 0 ? 'md:col-span-2 lg:col-span-3' : undefined}>
                <PostCard post={post} locale={locale} t={t} featured={i === 0} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-soft">{t.blog.empty}</p>
        )}
      </div>

      {/* Actualités, annonces et comptes rendus de webinars : à part des articles de fond */}
      <Section id="webinars" tone="mist" title={t.blog.newsTitle} lead={t.blog.newsLead}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {news.items.length ? (
              <ul data-stagger="" className="border-t border-line">
                {news.items.map((post) => (
                  <NewsItem key={post.id} post={post} locale={locale} t={t} />
                ))}
              </ul>
            ) : (
              <p className="text-ink-soft">{t.blog.newsEmpty}</p>
            )}
          </div>
          <div className="space-y-10 lg:col-span-5">
            <div>
              <h3 className="mb-4 font-display text-sm font-medium text-ink-soft">{t.home.resources.webinars}</h3>
              <UpcomingWebinars locale={locale} t={t} />
            </div>
            {past.length > 0 && (
              <div>
                <h3 className="mb-4 font-display text-sm font-medium text-ink-soft">{t.blog.replays}</h3>
                <ul className="border-t border-line">
                  {past.slice(0, 6).map((w) => (
                    <WebinarItem key={w.id} w={w} locale={locale} t={t} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
