import { CtaBand } from '@/components/sections/cta-band';
import { ArrowUpRight } from '@/components/ui/icons';
import { PageHero, Section } from '@/components/ui/section';
import { getDictionary } from '@/i18n/get-dictionary';
import { getTeam } from '@/lib/api';
import { initials } from '@/lib/format';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'team', t.team.label, t.team.lead);
}

export default async function TeamPage() {
  const { t, locale } = await getDictionary();
  const team = await getTeam();
  const [founder, ...others] = team;

  return (
    <>
      <PageHero label={t.team.label} title={t.team.title} lead={t.team.lead} />

      {founder && (
        <section className="bg-white py-20 md:py-24">
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Portrait name={founder.name} photoUrl={founder.photoUrl} large />
            </div>
            <div className="lg:col-span-8">
              <p className="font-display text-sm font-medium text-ink-soft">{locale === 'fr' ? founder.roleFr : founder.roleEn}</p>
              <h2 className="mt-2 text-headline">{founder.name}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{locale === 'fr' ? founder.bioFr : founder.bioEn}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                  {t.common.bookMeeting}
                  <ArrowUpRight />
                </a>
                <a href={founder.linkedinUrl ?? site.founderLinkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  {t.team.linkedin}
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <Section index="01" label={t.team.label}>
        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((m) => (
            <li key={m.id}>
              <Portrait name={m.name} photoUrl={m.photoUrl} />
              <h3 className="mt-5 text-xl">{m.name}</h3>
              <p className="text-sm font-medium text-teal">{locale === 'fr' ? m.roleFr : m.roleEn}</p>
              {(locale === 'fr' ? m.bioFr : m.bioEn) && (
                <p className="mt-2 text-[0.97rem] text-ink-soft">{locale === 'fr' ? m.bioFr : m.bioEn}</p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section index="02" label="ColisConsult" tone="dark">
        <dl className="grid gap-10 md:grid-cols-3">
          {t.team.facts.map((f) => (
            <div key={f.label} className="border-t border-white/20 pt-5">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-none font-semibold tracking-tight">{f.value}</span>
                <span className="mt-3 block text-white/70">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand t={t} locale={locale} />
    </>
  );
}

/** Photo si disponible ; sinon un monogramme compact (ajoutez les portraits via photo_url) */
function Portrait({ name, photoUrl, large }: { name: string; photoUrl: string | null; large?: boolean }) {
  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photoUrl} alt={name} className={`aspect-[4/5] w-full rounded-md object-cover ${large ? 'max-w-sm' : ''}`} />
    );
  }
  return (
    <div
      role="img"
      aria-label={name}
      className={`flex items-center justify-center rounded-md bg-teal font-display font-semibold tracking-tight text-white ${
        large ? 'size-36 text-5xl' : 'size-14 text-xl'
      }`}
    >
      {initials(name)}
    </div>
  );
}
