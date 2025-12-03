import React from 'react';
import { motion } from 'framer-motion';
import { Contact } from './Contact';
import { Trust } from './Trust';
import { CheckCircle2, Monitor, CreditCard, ShoppingCart, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export const KassensystemePage: React.FC = () => {
  const services = [
    {
      title: "Gastronomie-Kassen",
      text: "Spezialisierte Kassensysteme für Restaurant, Café und Imbiss – TSE-konform und GoBD-sicher.",
      icon: ShoppingCart
    },
    {
      title: "Einzelhandel-Kassen",
      text: "Moderne Registrierkassen mit Warenwirtschaft, Inventur und Kundenverwaltung.",
      icon: CreditCard
    },
    {
      title: "Schnittstellen & Integration",
      text: "Anbindung an Buchhaltung, Lieferservice-Apps und Online-Bestellsysteme.",
      icon: BarChart3
    }
  ];

  return (
    <div className="pt-28">
      {/* Page Hero */}
      <section className="relative bg-brand-dark text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Link to="/" className="inline-flex items-center text-brand-yellow font-bold mb-6 hover:underline">
              ← Zurück zur Startseite
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              Moderne <br/>
              <span className="text-brand-yellow">Kassensysteme</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Kassensysteme für Gastronomie und Einzelhandel. TSE-konform, benutzerfreundlich und vollständig integriert. Wir beraten, liefern und installieren für Betriebe in Moers und der Region.
            </p>
            <Button
              className="shadow-lg shadow-brand-yellow/20"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Jetzt beraten lassen
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-brand-black">Rechtssicher und effizient</h2>
              <div className="h-1 w-20 bg-brand-yellow mb-8"></div>

              <p className="text-gray-600 mb-6 text-lg">
                Seit 2020 sind digitale Kassensysteme in Deutschland verpflichtend mit einer Technischen Sicherheitseinrichtung (TSE) auszustatten. Unsere Kassensysteme erfüllen alle gesetzlichen Anforderungen und erleichtern Ihnen zugleich den Arbeitsalltag.
              </p>
              <p className="text-gray-600 mb-8">
                Biene Dienstleistung ist Ihr Partner für die Installation und Einrichtung moderner Kassensysteme. Wir analysieren Ihre Anforderungen, empfehlen passende Lösungen und übernehmen die komplette technische Umsetzung – inklusive Schulung Ihres Teams.
              </p>

              <div className="space-y-4">
                {[
                  "TSE-zertifizierte Systeme (Finanzamt-konform)",
                  "Cloud & Offline-Betrieb möglich",
                  "EC- & Kreditkarten-Terminal Integration",
                  "Bon-Drucker & Display Installation",
                  "Schulung & Support vor Ort"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <CheckCircle2 className="text-brand-yellow fill-black" size={20} />
                    <span className="font-semibold text-brand-black">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
               {/* Detail Cards */}
               {services.map((service, idx) => (
                 <motion.div
                   key={idx}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-brand-yellow hover:shadow-xl transition-shadow"
                 >
                   <div className="flex items-start gap-4">
                     <div className="bg-brand-yellow/10 p-3 rounded-lg text-brand-black">
                       <service.icon size={28} />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                       <p className="text-gray-600 text-sm leading-relaxed">{service.text}</p>
                     </div>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <Trust />

      {/* Contact Section */}
      <Contact />
    </div>
  );
};
