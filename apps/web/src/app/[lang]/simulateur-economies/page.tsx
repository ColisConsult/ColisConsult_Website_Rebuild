import { SavingsSimulator } from '@/components/forms/simulator';
import { PageHero } from '@/components/ui/section';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return pageMetadata(locale, 'simulator', t.simulator.title, t.simulator.lead);
}

export default async function SimulatorPage() {
  const { t, locale } = await getDictionary();
  return (
    <>
      <PageHero title={t.simulator.title} lead={t.simulator.lead} />
      <div className="container-site pt-14 pb-24 md:pt-20">
        <div data-reveal="">
          <SavingsSimulator
            t={t.simulator}
            forms={t.forms}
            locale={locale}
            preAuditHref={href(locale, 'preAudit')}
            preAuditLabel={t.home.hero.ctaPrimary}
            privacyHref={href(locale, 'legal')}
          />
        </div>
      </div>
    </>
  );
}
