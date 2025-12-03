import React from 'react';
import { motion } from 'framer-motion';
import { Contact } from './Contact';
import { Trust } from './Trust';
import { CheckCircle2, Video, Eye, HardDrive, Wifi, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export const UeberwachungssystemePage: React.FC = () => {
  const services = [
    {
      title: "IP-Kamerasysteme",
      text: "Hochauflösende Netzwerkkameras mit Fernzugriff über Smartphone und PC.",
      icon: Video
    },
    {
      title: "Videorekorder & Speicher",
      text: "Sichere Aufzeichnung und langfristige Archivierung auf NVR oder Cloud.",
      icon: HardDrive
    },
    {
      title: "WLAN-Überwachung",
      text: "Kabellose Kameras für flexible Installation – ideal für Nachrüstung ohne Verkabelung.",
      icon: Wifi
    }
  ];

  return (
    <div className="pt-32">
      {/* Page Hero */}
      <section className="relative bg-brand-dark text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('/images/hero/Überwachungssysteme.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Link to="/" className="inline-flex items-center text-brand-yellow font-bold mb-6 hover:underline">
              ← Zurück zur Startseite
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              Professionelle <br/>
              <span className="text-brand-yellow">Überwachungssysteme</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Behalten Sie Ihr Eigentum im Blick – rund um die Uhr. Mit modernen Videoüberwachungssystemen sorgen wir für Sicherheit und Dokumentation in Moers und der gesamten Region.
            </p>
            <Button
              className="shadow-lg shadow-brand-yellow/20"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Kostenlose Beratung sichern
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-brand-black">Lückenlose Überwachung – jederzeit einsehbar</h2>
              <div className="h-1 w-20 bg-brand-yellow mb-8"></div>

              <p className="text-gray-600 mb-6 text-lg">
                Videoüberwachung schreckt nicht nur Einbrecher ab, sondern dokumentiert auch Vorfälle lückenlos. Moderne IP-Kamerasysteme liefern gestochen scharfe Bilder – auch bei Nacht – und ermöglichen den Live-Zugriff von überall.
              </p>
              <p className="text-gray-600 mb-8">
                Biene Dienstleistung plant und installiert maßgeschneiderte Überwachungssysteme für Privathaushalte, Gewerbe und öffentliche Einrichtungen. Wir berücksichtigen datenschutzrechtliche Vorgaben (DSGVO) und sorgen für eine professionelle, unauffällige Montage.
              </p>

              <div className="space-y-4">
                {[
                  "Full-HD & 4K Auflösung",
                  "Nachtsicht (Infrarot) bis 30m",
                  "Bewegungserkennung mit Push-Benachrichtigung",
                  "Fernzugriff per App (iOS/Android)",
                  "DSGVO-konforme Installation & Beschilderung"
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
