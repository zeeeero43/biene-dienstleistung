import React from 'react';
import { CONTACT_DETAILS, COMPANY_NAME } from '../constants';

export const ImpressumPage: React.FC = () => {
  return (
    <div className="pt-36 md:pt-40 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-black mb-8 text-brand-black">Impressum</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">Angaben gemäß § 5 DDG</h2>
            <p className="text-gray-700 leading-relaxed">
              {COMPANY_NAME}<br />
              {CONTACT_DETAILS.owner}<br />
              {CONTACT_DETAILS.address}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">Kontakt</h2>
            <p className="text-gray-700 leading-relaxed">
              Telefon: {CONTACT_DETAILS.phoneDisplay}<br />
              E-Mail: <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-brand-yellow hover:underline">{CONTACT_DETAILS.email}</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">Umsatzsteuer-ID</h2>
            <p className="text-gray-700 leading-relaxed">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              <span className="font-semibold">[UST-IDNR HIER EINFÜGEN]</span>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p className="text-gray-700 leading-relaxed">
              Berufsbezeichnung: Elektroinstallateurmeister<br />
              Zuständige Kammer: Handwerkskammer Düsseldorf<br />
              Verliehen in: Deutschland
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Es gelten folgende berufsrechtliche Regelungen:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Handwerksordnung (HwO)</li>
              <li>Verordnung über das Meisterprüfungsberufsbild und über die Prüfungsanforderungen in den Teilen I und II der Meisterprüfung im Elektrotechniker-Handwerk</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              Regelungen einsehbar unter: <a href="https://www.gesetze-im-internet.de/hwo/" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">www.gesetze-im-internet.de/hwo/</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">EU-Streitschlichtung</h2>
            <p className="text-gray-700 leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p className="text-gray-700 leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">Haftung für Inhalte</h2>
            <p className="text-gray-700 leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">Haftung für Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">Urheberrecht</h2>
            <p className="text-gray-700 leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
