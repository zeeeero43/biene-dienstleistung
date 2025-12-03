import React from 'react';
import { motion } from 'framer-motion';
import { Contact } from './Contact';
import { Trust } from './Trust';
import { CheckCircle2, Zap, Plug, Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export const ElektroPage: React.FC = () => {
  const services = [
    {
      title: "Altbausanierung",
      text: "Erneuerung veralteter Leitungen, Zählerschränke und Sicherungen für maximale Sicherheit.",
      icon: Home
    },
    {
      title: "Neubauinstallation",
      text: "Komplette Planung und Umsetzung der Elektrik für Ihr neues Eigenheim – zukunftssicher und normgerecht.",
      icon: Zap
    },
    {
      title: "Verteilerbau & Zählerschränke",
      text: "Fachgerechte Installation und Modernisierung von Zähleranlagen gemäß aktueller TAB.",
      icon: Plug
    }
  ];

  return (
    <div className="pt-28">
      {/* Page Hero */}
      <section className="relative bg-brand-dark text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('/images/hero/Elektroinstallationen.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Link to="/" className="inline-flex items-center text-brand-yellow font-bold mb-6 hover:underline">
              ← Zurück zur Startseite
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              Elektroinstallationen<br/>
              <span className="text-brand-yellow">Ihr Elektriker Meisterbetrieb</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Von der Steckdose bis zum kompletten Hausanschluss. Professionelle Elektroinstallation in Moers und Umgebung. Wir sorgen dafür, dass der Strom sicher und zuverlässig fließt.
            </p>
            <Button
              className="shadow-lg shadow-brand-yellow/20"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Jetzt Angebot anfordern
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-brand-black">Sicherheit und Qualität vom Fachmann</h2>
              <div className="h-1 w-20 bg-brand-yellow mb-8"></div>
              
              <p className="text-gray-600 mb-6 text-lg">
                Eine fachgerechte Elektroinstallation ist das Herzstück jeder Immobilie. Veraltete Leitungen oder unsachgemäße Installationen stellen nicht nur ein Sicherheitsrisiko dar, sondern mindern auch den Wohnkomfort.
              </p>
              <p className="text-gray-600 mb-8">
                Biene Dienstleistung bietet Ihnen das komplette Spektrum moderner Elektrotechnik. Als eingetragener Meisterbetrieb garantieren wir Ihnen eine Ausführung nach den neuesten VDE-Normen und Sicherheitsstandards.
              </p>

              <div className="space-y-4">
                {[
                  "Planung & Beratung vor Ort",
                  "E-Check & DGUV V3 Prüfungen",
                  "Installation von Wallboxen (E-Mobilität)",
                  "Beleuchtungskonzepte (LED)",
                  "Herd- & Geräteanschluss"
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