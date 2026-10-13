import { PostRow, UpcomingWebinars, WebinarItem } from '@/components/sections/resources';
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
      <div className="container-site pb-20">
        {items.length ? (
          <ul className="border-t border-line">
            {items.map((post) => (
              <PostRow key={post.id} post={post} locale={locale} t={t} />
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
