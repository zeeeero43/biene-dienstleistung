import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import '../cookieconsent-custom.css';
import * as CookieConsent from 'vanilla-cookieconsent';

interface CookieConsentBannerProps {
  delay?: number;
}

export const CookieConsentBanner = ({ delay = 0 }: CookieConsentBannerProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: 'box wide',
          position: 'bottom center',
          equalWeightButtons: true,
          flipButtons: false
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: true,
          flipButtons: false
        }
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true
        },
        analytics: {
          enabled: false,
          readOnly: false
        },
        marketing: {
          enabled: false,
          readOnly: false
        }
      },

      language: {
        default: 'de',
        translations: {
          de: {
            consentModal: {
              title: 'Wir verwenden Cookies',
              description: 'Wir nutzen Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Einige Cookies sind für den Betrieb der Website notwendig, während andere uns helfen, die Website zu verbessern. <a href="#/datenschutz" class="cc-link">Mehr erfahren</a>',
              acceptAllBtn: 'Alle akzeptieren',
              acceptNecessaryBtn: 'Nur notwendige',
              showPreferencesBtn: 'Einstellungen',
              footer: '<a href="#/impressum">Impressum</a> | <a href="#/datenschutz">Datenschutz</a>'
            },
            preferencesModal: {
              title: 'Cookie-Einstellungen',
              acceptAllBtn: 'Alle akzeptieren',
              acceptNecessaryBtn: 'Nur notwendige',
              savePreferencesBtn: 'Auswahl speichern',
              closeIconLabel: 'Schließen',
              serviceCounterLabel: 'Dienst|Dienste',
              sections: [
                {
                  title: 'Cookie-Nutzung',
                  description: 'Wir verwenden Cookies, um grundlegende Funktionen der Website zu gewährleisten und um zu verstehen, wie Sie unsere Website nutzen. Sie können für jede Kategorie wählen, ob Sie zustimmen oder ablehnen.'
                },
                {
                  title: 'Notwendige Cookies <span class="pm__badge">Immer aktiv</span>',
                  description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unbedingt erforderlich. Ohne diese Cookies würde die Website nicht richtig funktionieren.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Analyse-Cookies',
                  description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden.',
                  linkedCategory: 'analytics'
                },
                {
                  title: 'Marketing-Cookies',
                  description: 'Diese Cookies werden verwendet, um Werbung relevanter für Sie und Ihre Interessen zu machen.',
                  linkedCategory: 'marketing'
                },
                {
                  title: 'Weitere Informationen',
                  description: 'Bei Fragen zu unserer Cookie-Richtlinie und Ihren Auswahlmöglichkeiten kontaktieren Sie uns bitte unter <a class="cc-link" href="mailto:info@biene-dienstleistung.de">info@biene-dienstleistung.de</a>.'
                }
              ]
            }
          }
        }
      }
    });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return null;
};
