import stephane from '@/assets/photos/stephane-poste.jpg';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Photo } from '../ui/section';
import { TextLink } from '../ui/text-link';

export function HowItWorks({ t, locale }: { t: Dictionary; locale: Locale }) {
  const h = t.home.how;
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:order-2">
          <Photo src={stephane} alt={h.photoAlt} caption={h.photoCaption} className="aspect-[4/3] lg:aspect-[4/4.4]" position="60% center" sizes="(min-width: 1024px) 38vw, 100vw" />
        </div>
        <div className="lg:col-span-7 lg:order-1">
          <h2 className="max-w-[20ch] text-headline">{h.title}</h2>
          <ol className="mt-10 space-y-8">
            {h.steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal font-display font-semibold text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-title">{step.title}</h3>
                  <p className="mt-1.5 max-w-lg text-ink-soft">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-[0.95rem] text-ink-soft">{h.duration}</p>
          <TextLink href={href(locale, 'method')} className="mt-3 inline-block">
            {h.cta}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
