import Image from 'next/image';
import type { CSSProperties } from 'react';
import equipe from '@/assets/photos/equipe-bureau.jpg';
import micro from '@/assets/photos/matthieu-micro.jpg';
import portrait from '@/assets/photos/matthieu-portrait.jpg';
import tableRonde from '@/assets/photos/table-ronde-lacoste-melijoe.jpg';
import { CountUp } from '@/components/motion/count-up';
import { CtaBand } from '@/components/sections/cta-band';
import { ArrowUpRight } from '@/components/ui/icons';
import { PageHero, Photo, Section } from '@/components/ui/section';
import { getDictionary } from '@/i18n/get-dictionary';
import { getTeam } from '@/lib/api';
import { initials } from '@/lib/format';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';
import type { TeamMember } from '@/lib/types';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'team', t.team.title, t.team.lead);
}

export default async function TeamPage() {
  const { t, locale } = await getDictionary();
  const team = await getTeam();
  const founder = team.find((m) => m.name === 'Matthieu Erly') ?? team[0];
  const others = team.filter((m) => m !== founder);

  return (
    <>
      <PageHero
        title={t.team.title}
        lead={t.team.lead}
        image={{ src: equipe, alt: t.team.photoAlt, caption: t.team.photoCaption, position: 'center 30%' }}
      />

      {founder && (
        <section className="bg-mist py-20 md:py-28">
          <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div data-reveal="scale" className="lg:col-span-4">
              <Photo src={portrait} alt={founder.name} parallax={0.06} className="aspect-[3/4] max-lg:max-w-sm" sizes="(min-width: 1024px) 30vw, 80vw" />
            </div>
            <div className="lg:col-span-8">
              <h2 data-reveal="" className="text-headline">
                {founder.name}
              </h2>
              <p data-reveal="" className="mt-2 font-display font-medium text-teal">
                {locale === 'fr' ? founder.roleFr : founder.roleEn}
              </p>
              <p data-reveal="" className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {locale === 'fr' ? founder.bioFr : founder.bioEn}
              </p>
              <div data-reveal="" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={site.calendly} target="_blank" rel="noopener noreferrer" data-magnetic="" className="btn btn-dark">
                  {t.common.bookMeeting}
                  <ArrowUpRight />
                </a>
                <a href={founder.linkedinUrl ?? site.founderLinkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  {t.team.linkedin}
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <Section title={t.team.membersTitle}>
        <ul data-stagger="" className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {others.map((m) => (
            <li key={m.id} className="group">
              <Portrait member={m} />
              <h3 className="mt-4 text-lg">{m.name}</h3>
              <p className="text-[0.95rem] font-medium text-teal">{locale === 'fr' ? m.roleFr : m.roleEn}</p>
              {(locale === 'fr' ? m.bioFr : m.bioEn) && (
                <p className="mt-2 text-[0.95rem] text-ink-soft">{locale === 'fr' ? m.bioFr : m.bioEn}</p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" title={t.team.speakerTitle} lead={t.team.speakerText}>
        <div className="grid gap-5 md:grid-cols-12">
          <div data-reveal="" className="md:col-span-8">
            <Photo
              src={tableRonde}
              alt={t.team.speakerPhotoAlt}
              caption={t.team.speakerCaption}
              parallax={0.06}
              className="aspect-[3/2]"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          </div>
          <div data-reveal="" style={{ '--d': '150ms' } as CSSProperties} className="md:col-span-4">
            <Photo
              src={micro}
              alt="Matthieu Erly"
              parallax={0.1}
              className="aspect-[3/2] md:aspect-[2/3]"
              position="center 25%"
              sizes="(min-width: 768px) 30vw, 100vw"
            />
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <dl data-stagger="" className="grid gap-10 md:grid-cols-3">
          {t.team.facts.map((f) => (
            <div key={f.label} className="border-t border-white/12 pt-6">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="figure block text-[clamp(2.4rem,1.8rem+2vw,3.8rem)] text-gradient-coral">
                  <CountUp value={f.value} />
                </span>
                <span className="mt-3 block max-w-xs text-white/80">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand t={t} locale={locale} />
    </>
  );
}

/** Photo si disponible ; sinon un monogramme (ajoutez le portrait dans public/team puis photo_url) */
function Portrait({ member }: { member: TeamMember }) {
  if (member.photoUrl) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-mist">
        <Image
          src={member.photoUrl}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 45vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={member.name}
      className="flex aspect-[3/4] items-center justify-center rounded-[var(--radius-card)] bg-teal-100 font-display text-4xl font-semibold text-teal"
    >
      {initials(member.name)}
    </div>
  );
}
