
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CONTACT_DETAILS, COMPANY_NAME } from '../constants';
import { BeeLogo } from './BeeLogo';
import { ShieldCheck } from 'lucide-react';
import * as CookieConsent from 'vanilla-cookieconsent';

const scrollToSection = (sectionId: string, navigate: ReturnType<typeof useNavigate>, location: ReturnType<typeof useLocation>) => {
  if (location.pathname === '/') {
    // Already on home page, just scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // Navigate to home first, then scroll
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
};

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', section: 'hero' },
    { label: 'Leistungen', section: 'services' },
    { label: 'Über uns', section: 'about' },
    { label: 'Kontakt', section: 'contact' },
  ];

  return (
    <footer className="bg-brand-darker text-gray-400 py-20 border-t border-brand-yellow/50 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 opacity-[0.03] pointer-events-none">
         <BeeLogo className="w-[600px] h-[600px]" variant="light" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white">
              <BeeLogo className="w-14 h-14" variant="light" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight">{COMPANY_NAME}</span>
                <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">Meisterbetrieb</span>
              </div>
            </div>
            <p className="text-base leading-relaxed max-w-sm text-gray-400 font-medium">
              Ihr zuverlässiger Partner für Elektroinstallationen in Moers und Umgebung. 
              Wir verbinden traditionelles Handwerk mit modernster Technik.
              Kompetent, schnell und fair.
            </p>
            
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-300 bg-gray-900/80 p-3 rounded-lg border border-gray-800 w-fit">
              <ShieldCheck size={20} className="text-green-500" />
              Vollversichert & Haftpflichtabgesichert
            </div>
          </div>

          {/* Links */}
          <div className="md:pl-10">
            <h4 className="text-white font-bold mb-8 uppercase text-lg tracking-widest border-l-4 border-brand-yellow pl-4">Navigation</h4>
            <ul className="space-y-4 text-base">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollToSection(item.section, navigate, location)}
                    className="py-2 hover:text-brand-yellow transition-colors flex items-center gap-3 group min-h-[44px]"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:pl-10">
            <h4 className="text-white font-bold mb-8 uppercase text-lg tracking-widest border-l-4 border-brand-yellow pl-4">Rechtliches</h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link to="/impressum" className="py-2 hover:text-brand-yellow transition-colors flex items-center gap-3 group min-h-[44px]">
                  <span className="w-2 h-2 rounded-full bg-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="py-2 hover:text-brand-yellow transition-colors flex items-center gap-3 group min-h-[44px]">
                  <span className="w-2 h-2 rounded-full bg-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Datenschutz
                </Link>
              </li>
              <li>
                <button
                  onClick={() => CookieConsent.showPreferences()}
                  className="py-2 hover:text-brand-yellow transition-colors flex items-center gap-3 group min-h-[44px]"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p className="flex items-center gap-2 font-medium">
            🐝 &copy; {new Date().getFullYear()} {COMPANY_NAME}. Alle Rechte vorbehalten.
          </p>
          <p className="text-gray-500 text-center">
            Webseite entwickelt von{' '}
            <a
              href="https://artofmedia-marketing.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-yellow hover:underline font-semibold"
            >
              art.of.media
            </a>
          </p>
          <div className="flex items-center gap-4 font-bold text-gray-400">
             <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800">
               <span className="text-xl leading-none">🇩🇪</span>
               <span>Made in Germany</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
