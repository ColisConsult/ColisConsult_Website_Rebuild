import { PageHero } from '@/components/ui/section';
import { getDictionary } from '@/i18n/get-dictionary';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

/*
 * ⚠ À COMPLÉTER avant la mise en ligne : les champs entre crochets
 * (forme juridique, capital, RCS, TVA, hébergeur, durée de conservation).
 */
export async function generateMetadata() {
  const { t, locale } = await getDictionary();
  return { ...pageMetadata(locale, 'legal', t.legal.title, t.legal.title), robots: { index: false } };
}

export default async function LegalPage() {
  const { t, locale } = await getDictionary();
  const fr = locale === 'fr';
  const address = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

  const sections: { title: string; body: React.ReactNode }[] = fr
    ? [
        {
          title: 'Éditeur du site',
          body: (
            <>
              <p>ColisConsult, [forme juridique] au capital de [montant] €, immatriculée au RCS de [ville] sous le numéro [SIREN].</p>
              <p>Siège social : {address}. Téléphone : {site.phone}. E-mail : {site.email}.</p>
              <p>N° de TVA intracommunautaire : [à compléter]. Directeur de la publication : Matthieu Erly.</p>
            </>
          ),
        },
        { title: 'Hébergement', body: <p>[Nom, adresse et téléphone de l’hébergeur du site et de l’API.]</p> },
        {
          title: 'Données personnelles',
          body: (
            <>
              <p>
                Les informations transmises via les formulaires (contact, pré-audit, simulateur, palmarès) sont utilisées
                uniquement pour répondre à votre demande et assurer le suivi de la relation commerciale. Elles sont
                destinées à l’équipe ColisConsult et ne sont ni cédées ni vendues.
              </p>
              <p>
                Les factures déposées pour un pré-audit sont stockées sur un espace non public, accessible uniquement à
                l’équipe ColisConsult, et couvertes par l’accord de confidentialité signé avec vous.
              </p>
              <p>Durée de conservation : [à préciser, par exemple 3 ans après le dernier contact].</p>
              <p>
                Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition.
                Pour l’exercer, écrivez à {site.email}. Vous pouvez également saisir la CNIL.
              </p>
            </>
          ),
        },
        {
          title: 'Cookies',
          body: (
            <p>
              Ce site n’utilise ni cookie publicitaire ni outil de mesure d’audience tiers. Les polices sont hébergées
              sur nos serveurs. Un cookie technique est utilisé uniquement pour la connexion au back-office.
            </p>
          ),
        },
        {
          title: 'Propriété intellectuelle',
          body: (
            <p>
              L’ensemble des contenus de ce site (textes, études, palmarès, éléments graphiques) est la propriété de
              ColisConsult, sauf mention contraire.
            </p>
          ),
        },
      ]
    : [
        {
          title: 'Publisher',
          body: (
            <>
              <p>ColisConsult, [legal form] with a share capital of €[amount], registered with the [city] Trade and Companies Register under number [SIREN].</p>
              <p>Registered office: {address}, France. Phone: {site.phoneIntl}. Email: {site.email}.</p>
              <p>VAT number: [to be completed]. Publication director: Matthieu Erly.</p>
            </>
          ),
        },
        { title: 'Hosting', body: <p>[Name, address and phone number of the website and API host.]</p> },
        {
          title: 'Personal data',
          body: (
            <>
              <p>
                Information submitted through our forms (contact, pre-audit, simulator, rankings) is used solely to answer
                your request and manage our business relationship. It is intended for the ColisConsult team and is never
                sold or shared.
              </p>
              <p>
                Invoices uploaded for a pre-audit are stored in a non-public space, accessible only to the ColisConsult
                team, and covered by the non-disclosure agreement signed with you.
              </p>
              <p>Retention period: [to be specified, e.g. 3 years after the last contact].</p>
              <p>
                Under the GDPR, you have the right to access, rectify, erase and object to the processing of your data. To
                exercise these rights, email {site.email}. You may also contact the CNIL.
              </p>
            </>
          ),
        },
        {
          title: 'Cookies',
          body: (
            <p>
              This website uses no advertising cookies and no third-party analytics. Fonts are self-hosted. A technical
              cookie is used only to sign in to the back office.
            </p>
          ),
        },
        {
          title: 'Intellectual property',
          body: (
            <p>
              All content on this website (texts, studies, rankings, graphics) is the property of ColisConsult unless
              otherwise stated.
            </p>
          ),
        },
      ];

  return (
    <>
      <PageHero label={t.legal.label} title={t.legal.title} />
      <div className="container-site pb-24">
        <div className="max-w-3xl border-t border-line">
          {sections.map((s) => (
            <section key={s.title} className="border-b border-line py-8">
              <h2 className="text-xl">{s.title}</h2>
              <div className="mt-3 space-y-3 text-ink-soft">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
