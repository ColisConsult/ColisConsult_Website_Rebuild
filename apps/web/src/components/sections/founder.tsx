import Image from 'next/image';
import Link from 'next/link';
import matthieu from '@/assets/photos/matthieu-bureau.jpg';
import { href, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { getTeam } from '@/lib/api';
import { initials } from '@/lib/format';
import { site } from '@/lib/site';
import type { TeamMember } from '@/lib/types';
import { ArrowUpRight } from '../ui/icons';
import { Photo } from '../ui/section';

/** Le fondateur et l'équipe, avec la prise de rendez-vous directe. */
export async function FounderBlock({ t, locale }: { t: Dictionary; locale: Locale }) {
  const f = t.home.founder;
  const team = await getTeam();

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div data-reveal="scale" className="relative lg:col-span-5">
          <Photo
            src={matthieu}
            alt={f.photoAlt}
            className="aspect-[4/3.6] lg:aspect-[4/4.8]"
            position="center 20%"
            parallax={0.06}
            sizes="(min-width: 1024px) 36vw, 90vw"
          />
          <p className="absolute -right-3 -bottom-5 rounded-2xl bg-night px-5 py-4 text-white shadow-[0_24px_60px_-24px_rgb(3_28_30/0.8)] md:-right-6">
            <span className="figure block text-[2.2rem] text-coral">2005</span>
            <span className="text-sm text-white/70">{f.since}</span>
          </p>
        </div>
        <div className="lg:col-span-7">
          <h2 data-reveal="" className="max-w-[18ch] text-headline">
            {f.title}
          </h2>
          <p data-reveal="" className="mt-6 max-w-xl text-lg text-ink-soft">
            {f.text}
          </p>
          {team.some((m) => m.photoUrl) && (
            <TeamAvatars team={team.filter((m) => m.photoUrl)} locale={locale} className="mt-10" />
          )}
          <div data-reveal="" className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={site.calendly} target="_blank" rel="noopener noreferrer" data-magnetic="" className="btn btn-dark">
              {t.common.bookMeeting}
              <ArrowUpRight />
            </a>
            <Link href={href(locale, 'team')} className="btn btn-outline">
              {f.team}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Avatar({ member, size = 56 }: { member: Pick<TeamMember, 'name' | 'photoUrl'>; size?: number }) {
  if (member.photoUrl) {
    return (
      <Image
        src={member.photoUrl}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover object-top ring-2 ring-white"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-teal font-display text-sm font-semibold text-white ring-2 ring-white"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initials(member.name)}
    </span>
  );
}

function TeamAvatars({ team, locale, className }: { team: TeamMember[]; locale: Locale; className?: string }) {
  return (
    <ul data-stagger="" className={`grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 ${className ?? ''}`}>
      {team.map((m) => (
        <li key={m.id} className="flex items-center gap-3">
          <Avatar member={m} size={48} />
          <span className="text-sm leading-tight">
            <span className="block font-medium">{m.name.split(' ')[0]}</span>
            <span className="text-ink-soft">{locale === 'fr' ? m.roleFr : m.roleEn}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
