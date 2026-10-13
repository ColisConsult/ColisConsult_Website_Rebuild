import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { videoTestimonials } from '@/lib/videos';
import { ArrowUpRight } from '../ui/icons';
import { VideoPlayer } from './video-card';

export function VideoTestimonials({ t, locale, showLink = true }: { t: Dictionary; locale: Locale; showLink?: boolean }) {
  return (
    <div>
      <ul className="grid gap-x-6 gap-y-12 md:grid-cols-3">
        {videoTestimonials.map((v) => (
          <li key={v.id}>
            <VideoPlayer
              src={v.src}
              poster={v.poster}
              title={`${v.person}, ${v.company}`}
              playLabel={t.common.playVideo}
              duration={v.duration}
            />
            <div className="mt-5">
              {v.quote && (
                <blockquote className="mb-3 font-display text-[1.08rem] leading-snug font-medium">
                  {locale === 'fr' ? '« ' : '“'}
                  {v.quote[locale]}
                  {locale === 'fr' ? ' »' : '”'}
                </blockquote>
              )}
              {v.context && <p className="mb-3 text-[0.95rem] text-ink-soft">{v.context[locale]}</p>}
              <p className="text-sm">
                <span className="font-medium">{v.person}</span>
                <span className="block text-ink-soft">
                  {v.role[locale]}, {v.company}
                </span>
                {locale !== v.lang && <span className="mt-1 block text-xs text-ink-faint">{t.common.videoIn[v.lang]}</span>}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {showLink && (
        <a
          href={`${site.founderLinkedin}details/recommendations/`}
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-12 inline-block font-display text-[0.97rem] font-medium text-teal"
        >
          {t.home.videos.linkedin}
          <ArrowUpRight />
        </a>
      )}
    </div>
  );
}
