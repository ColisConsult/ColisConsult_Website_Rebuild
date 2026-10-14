import { PostCard, UpcomingWebinars, WebinarItem } from '@/components/sections/resources';
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
  const [{ items }, past] = await Promise.all([getPosts(locale, 1, 50), getWebinars('past')]);

  return (
    <>
      <PageHero title={t.blog.title} lead={t.blog.lead} />
      <div className="container-site pt-12 pb-20 md:pt-16 md:pb-28">
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
      <Section id="webinars" tone="mist" title={t.blog.webinarsTitle}>
        <div className="grid gap-12 lg:grid-cols-2">
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
      </Section>
    </>
  );
}
