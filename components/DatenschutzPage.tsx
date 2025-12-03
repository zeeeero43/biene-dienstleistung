import React from 'react';
import { CONTACT_DETAILS, COMPANY_NAME } from '../constants';

export const DatenschutzPage: React.FC = () => {
  return (
    <div className="pt-36 md:pt-40 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-black mb-8 text-brand-black">Datenschutzerklärung</h1>

        <div className="prose prose-lg max-w-none">
          {/* 1. Datenschutz auf einen Blick */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">1. Datenschutz auf einen Blick</h2>

            <h3 className="text-xl font-bold mb-3 text-brand-black">Allgemeine Hinweise</h3>
            <p className="text-gray-700 leading-relaxed">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Datenerfassung auf dieser Website</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Verantwortliche Stelle" in dieser Datenschutzerklärung entnehmen.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Wofür nutzen wir Ihre Daten?</strong><br />
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </section>

          {/* 2. Verantwortliche Stelle */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">2. Verantwortliche Stelle</h2>
            <p className="text-gray-700 leading-relaxed">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="text-gray-700 leading-relaxed mt-4 bg-gray-50 p-4 rounded-lg">
              {COMPANY_NAME}<br />
              {CONTACT_DETAILS.owner}<br />
              {CONTACT_DETAILS.address}<br /><br />
              Telefon: {CONTACT_DETAILS.phoneDisplay}<br />
              E-Mail: <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-brand-yellow hover:underline">{CONTACT_DETAILS.email}</a>
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Speicherdauer</h3>
            <p className="text-gray-700 leading-relaxed">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
            <p className="text-gray-700 leading-relaxed">
              Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z.B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Hinweis zur Datenweitergabe in datenschutzrechtlich nicht sichere Drittstaaten sowie die Weitergabe an US-Unternehmen, die nicht DPF-zertifiziert sind</h3>
            <p className="text-gray-700 leading-relaxed">
              Wir verwenden unter anderem Tools von Unternehmen mit Sitz in datenschutzrechtlich nicht sicheren Drittstaaten sowie US-Tools, deren Anbieter nicht nach dem EU-US-Data Privacy Framework (DPF) zertifiziert sind. Wenn diese Tools aktiv sind, können Ihre personenbezogene Daten in diese Staaten übertragen und dort verarbeitet werden. Wir weisen darauf hin, dass in datenschutzrechtlich unsicheren Drittstaaten kein mit der EU vergleichbares Datenschutzniveau garantiert werden kann.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Wir weisen darauf hin, dass die USA als sicherer Drittstaat grundsätzlich ein mit der EU vergleichbares Datenschutzniveau aufweisen. Eine Datenübertragung in die USA ist danach zulässig, wenn der Empfänger eine Zertifizierung unter dem „EU-US Data Privacy Framework" (DPF) besitzt oder über geeignete zusätzliche Garantien verfügt.
            </p>
          </section>

          {/* 3. Hosting */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">3. Hosting</h2>

            <h3 className="text-xl font-bold mb-3 text-brand-black">IONOS</h3>
            <p className="text-gray-700 leading-relaxed">
              Wir hosten unsere Website bei IONOS SE. Anbieter ist die IONOS SE, Elgendorfer Str. 57, 56410 Montabaur (nachfolgend IONOS). Wenn Sie unsere Website besuchen, erfasst IONOS verschiedene Logfiles inklusive Ihrer IP-Adressen.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Details entnehmen Sie der Datenschutzerklärung von IONOS: <a href="https://www.ionos.de/terms-gtc/terms-privacy" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">https://www.ionos.de/terms-gtc/terms-privacy</a>
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Die Verwendung von IONOS erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z.B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Auftragsverarbeitung</h3>
            <p className="text-gray-700 leading-relaxed">
              Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
            </p>
          </section>

          {/* 4. Allgemeine Hinweise und Pflichtinformationen */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">4. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3 className="text-xl font-bold mb-3 text-brand-black">Datenschutz</h3>
            <p className="text-gray-700 leading-relaxed">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p className="text-gray-700 leading-relaxed">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
            </p>
            <p className="text-gray-700 leading-relaxed mt-4 bg-gray-50 p-4 rounded-lg">
              WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p className="text-gray-700 leading-relaxed">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4 bg-gray-50 p-4 rounded-lg">
              <strong>Zuständige Aufsichtsbehörde für Nordrhein-Westfalen:</strong><br /><br />
              Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br />
              Kavalleriestr. 2-4<br />
              40213 Düsseldorf<br /><br />
              Telefon: 0211 / 38424-0<br />
              E-Mail: <a href="mailto:poststelle@ldi.nrw.de" className="text-brand-yellow hover:underline">poststelle@ldi.nrw.de</a><br />
              Website: <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">www.ldi.nrw.de</a>
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Recht auf Datenübertragbarkeit</h3>
            <p className="text-gray-700 leading-relaxed">
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Auskunft, Berichtigung und Löschung</h3>
            <p className="text-gray-700 leading-relaxed">
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Recht auf Einschränkung der Verarbeitung</h3>
            <p className="text-gray-700 leading-relaxed">
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
              <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
              <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">SSL- bzw. TLS-Verschlüsselung</h3>
            <p className="text-gray-700 leading-relaxed">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
          </section>

          {/* 5. Datenerfassung auf dieser Website */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">5. Datenerfassung auf dieser Website</h2>

            <h3 className="text-xl font-bold mb-3 text-brand-black">Cookies</h3>
            <p className="text-gray-700 leading-relaxed">
              Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z.B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Websitefunktionen ohne diese nicht funktionieren würden (z.B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies können zur Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z.B. für die Warenkorbfunktion) oder zur Optimierung der Website (z.B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Cookie-Einwilligung mit Cookie Consent</h3>
            <p className="text-gray-700 leading-relaxed">
              Unsere Website nutzt die Cookie-Consent-Technologie, um Ihre Einwilligung zur Speicherung bestimmter Cookies auf Ihrem Endgerät einzuholen und diese datenschutzkonform zu dokumentieren. Diese Technologie wird lokal auf unserem Server gehostet und gibt keine Daten an Dritte weiter.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Wenn Sie unsere Website betreten, werden Sie gefragt, ob Sie der Verwendung von Cookies zustimmen möchten. Ihre Einwilligung wird in einem Cookie namens „cc_cookie" auf Ihrem Endgerät gespeichert. Diese Speicherung ist für die Dauer von 6 Monaten gültig, danach werden Sie erneut nach Ihrer Einwilligung gefragt.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Folgende Cookie-Kategorien verwenden wir auf dieser Website:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
              <li><strong>Notwendige Cookies (immer aktiv):</strong> cc_cookie - Speichert Ihre Cookie-Einstellungen (Laufzeit: 6 Monate)</li>
              <li><strong>Analyse-Cookies:</strong> Derzeit werden keine Analyse-Cookies verwendet</li>
              <li><strong>Marketing-Cookies:</strong> Derzeit werden keine Marketing-Cookies verwendet</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Sie können Ihre Cookie-Einstellungen jederzeit über den Link „Cookie-Einstellungen" im Footer der Website ändern oder widerrufen.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Die Rechtsgrundlage für das Cookie zur Speicherung Ihrer Einwilligung ist Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung zur Nachweisbarkeit) sowie § 25 Abs. 2 Nr. 2 TDDDG (technisch notwendige Cookies).
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Server-Log-Dateien</h3>
            <p className="text-gray-700 leading-relaxed">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-1">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Dateien erfasst werden.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Kontaktformular</h3>
            <p className="text-gray-700 leading-relaxed">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">Anfrage per E-Mail, Telefon oder Telefax</h3>
            <p className="text-gray-700 leading-relaxed">
              Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6 text-brand-black">WhatsApp-Kontaktmöglichkeit</h3>
            <p className="text-gray-700 leading-relaxed">
              Auf unserer Website befindet sich eine Schaltfläche zur Kontaktaufnahme über WhatsApp. Beim Klick auf den WhatsApp-Button werden Sie auf den WhatsApp-Dienst weitergeleitet.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Anbieter:</strong> WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland (ein Unternehmen der Meta Platforms Inc.)
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Datenverarbeitung:</strong> Durch den reinen Link-Button werden zunächst keine Daten an WhatsApp übertragen. Erst wenn Sie auf den Button klicken und WhatsApp öffnen, erhält WhatsApp folgende Informationen:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Ihre IP-Adresse</li>
              <li>Referrer-Information (dass Sie von unserer Website kommen)</li>
              <li>Geräte- und Browserinformationen</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Die weitere Kommunikation über WhatsApp unterliegt den Datenschutzbestimmungen von WhatsApp. WhatsApp verwendet Ende-zu-Ende-Verschlüsselung, jedoch können Meta-Daten (Zeitpunkte, Telefonnummern) verarbeitet werden.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung durch aktiven Klick auf den Button)
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Datenübermittlung in Drittländer:</strong> WhatsApp/Meta kann Daten in die USA übermitteln. Die Datenübermittlung erfolgt auf Grundlage der EU-Standardvertragsklauseln.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Datenschutzerklärung von WhatsApp: <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">https://www.whatsapp.com/legal/privacy-policy-eea</a>
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Widerspruch:</strong> Sie können der Datenverarbeitung widersprechen, indem Sie den WhatsApp-Button nicht verwenden und uns stattdessen per E-Mail oder Telefon kontaktieren.
            </p>
          </section>

          {/* 6. Lokal gehostete Schriftarten */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">6. Lokal gehostete Schriftarten</h2>
            <p className="text-gray-700 leading-relaxed">
              Auf dieser Website werden zur einheitlichen Darstellung Schriftarten verwendet (Inter). Diese Schriftarten werden lokal von unserem eigenen Server geladen. Es findet keine Verbindung zu externen Servern wie Google statt.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Hierbei werden keine personenbezogenen Daten an Dritte übermittelt. Die Einbindung erfolgt auf Grundlage unseres berechtigten Interesses an einer einheitlichen und ansprechenden Darstellung unserer Website (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          {/* 7. Ihre Rechte */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">7. Ihre Rechte im Überblick</h2>
            <p className="text-gray-700 leading-relaxed">
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
              <li><strong>Recht auf Auskunft</strong> (Art. 15 DSGVO) – Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
              <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO) – Sie können die Berichtigung unrichtiger oder die Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten verlangen.</li>
              <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO) – Sie können die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten verlangen, soweit nicht die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung und Information, zur Erfüllung einer rechtlichen Verpflichtung, aus Gründen des öffentlichen Interesses oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist.</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO) – Sie können die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO) – Sie können verlangen, die Sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
              <li><strong>Recht auf Widerspruch</strong> (Art. 21 DSGVO) – Sie können jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einlegen.</li>
              <li><strong>Recht auf Widerruf einer erteilten Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) – Sie haben das Recht, eine einmal erteilte Einwilligung in die Verarbeitung von Daten jederzeit mit Wirkung für die Zukunft zu widerrufen.</li>
              <li><strong>Recht auf Beschwerde bei einer Aufsichtsbehörde</strong> (Art. 77 DSGVO) – Sie können sich bei der zuständigen Aufsichtsbehörde beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt.</li>
            </ul>
          </section>

          {/* 8. Aktualität */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">8. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p className="text-gray-700 leading-relaxed">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand: <strong>Dezember 2025</strong>
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Website unter dem Link „Datenschutz" von Ihnen abgerufen und ausgedruckt werden.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
