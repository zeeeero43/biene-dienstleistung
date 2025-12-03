
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Hammer, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    title: "Kontakt aufnehmen",
    description: "Rufen Sie uns an oder nutzen Sie unser Kontaktformular für Ihre Anfrage."
  },
  {
    icon: Calendar,
    title: "Kostenlose Beratung",
    description: "Wir besprechen Ihr Projekt und erstellen ein transparentes Angebot."
  },
  {
    icon: Hammer,
    title: "Professionelle Umsetzung",
    description: "Termingerechte und saubere Ausführung durch Fachpersonal."
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-brand-black mb-4 inline-block relative">
            So einfach geht's
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-brand-yellow"></span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative max-w-6xl mx-auto">
          {/* Arrow Connectors (Desktop only) */}
          <div className="hidden md:block absolute top-[60px] left-[25%] text-gray-200">
             <ArrowRight size={40} />
          </div>
          <div className="hidden md:block absolute top-[60px] right-[25%] text-gray-200">
             <ArrowRight size={40} />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Hexagon Number Badge */}
              <div className="relative mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                <div className="w-32 h-32 flex items-center justify-center">
                    {/* Hexagon Shape CSS */}
                    <div className="w-24 h-[6.5rem] bg-white border-4 border-brand-yellow flex items-center justify-center relative before:content-[''] before:absolute before:top-[-4px] before:left-[-4px] before:right-[-4px] before:bottom-[-4px] before:border-4 before:border-brand-yellow before:rotate-60 after:content-[''] after:absolute after:top-[-4px] after:left-[-4px] after:right-[-4px] after:bottom-[-4px] after:border-4 after:border-brand-yellow after:rotate-[-60deg]">
                       <div className="z-10 bg-white w-full h-full flex flex-col items-center justify-center absolute inset-0">
                         <span className="text-5xl font-black text-brand-black">{index + 1}</span>
                       </div>
                    </div>
                </div>
                
                {/* Icon Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-black text-brand-yellow rounded-full flex items-center justify-center shadow-lg border-4 border-white z-20">
                  <step.icon size={20} />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-brand-black mt-4">{step.title}</h3>
              <p className="text-gray-500 max-w-xs leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
