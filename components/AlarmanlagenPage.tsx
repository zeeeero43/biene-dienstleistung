import React from 'react';
import { motion } from 'framer-motion';
import { Contact } from './Contact';
import { Trust } from './Trust';
import { CheckCircle2, ShieldCheck, Bell, Smartphone, Home, Siren, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export const AlarmanlagenPage: React.FC = () => {
  const services = [
    {
      title: "Funk-Alarmanlagen",
      text: "Kabellose Installation ohne Bohren – ideal für Mietwohnungen und schnelle Nachrüstung.",
      icon: Bell
    },
    {
      title: "Drahtgebundene Systeme",
      text: "Maximale Zuverlässigkeit für Neubau und Gewerbe – manipulationssicher und wartungsarm.",
      icon: ShieldCheck
    },
    {
      title: "Smart-Alarm mit App",
      text: "Echtzeitbenachrichtigung auf Ihr Smartphone – Steuerung und Überwachung von überall.",
      icon: Smartphone
    }
  ];

  return (
    <div className="pt-32">
      {/* Page Hero */}
      <section className="relative bg-brand-dark text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('/images/hero/Alarmanlagen.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Link to="/" className="inline-flex items-center text-brand-yellow font-bold mb-6 hover:underline">
              ← Zurück zur Startseite
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              Alarmanlagen<br/>
              <span className="text-brand-yellow">Professioneller Einbruchschutz</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Alarmanlage installieren in Moers vom Elektriker Meisterbetrieb. Schützen Sie Ihr Eigentum effektiv vor Einbruch mit professionellen VdS-zertifizierten Alarmanlagen für maximale Sicherheit.
            </p>
            <Button
              className="shadow-lg shadow-brand-yellow/20"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Sicherheitscheck anfragen
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-brand-black">Einbruchschutz vom Fachmann</h2>
              <div className="h-1 w-20 bg-brand-yellow mb-8"></div>

              <p className="text-gray-600 mb-6 text-lg">
                Statistisch gesehen wird alle zwei Minuten in Deutschland eingebrochen. Eine professionelle Alarmanlage schreckt Täter ab und alarmiert Sie im Ernstfall sofort – ob Sie zu Hause sind oder nicht.
              </p>
              <p className="text-gray-600 mb-8">
                Biene Dienstleistung bietet maßgeschneiderte Alarmanlagen für Privathaushalte und Gewerbeobjekte. Wir analysieren Ihr Objekt, identifizieren Schwachstellen und installieren eine auf Ihre Bedürfnisse abgestimmte Sicherheitslösung – VdS-zertifiziert und versicherungskonform.
              </p>

              <div className="space-y-4">
                {[
                  "VdS-anerkannte Alarmsysteme",
                  "Bewegungsmelder & Magnetkontakte",
                  "Außensirene mit Blitzlicht",
                  "Alarmweiterleitung an Smartphone/Notrufzentrale",
                  "Kostenlose Sicherheitsberatung vor Ort"
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
