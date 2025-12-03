
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Star } from 'lucide-react';

const trustItems = [
  {
    icon: Award,
    title: "Meisterbetrieb",
    description: "Höchste Qualitätsstandards durch geprüfte Handwerksmeister."
  },
  {
    icon: ShieldCheck,
    title: "Versichert",
    description: "Umfassender Versicherungsschutz für Ihre Sicherheit."
  },
  {
    icon: Star,
    title: "10+ Jahre Erfahrung",
    description: "Langjährige Expertise in privaten und gewerblichen Projekten."
  }
];

export const Trust: React.FC = () => {
  return (
    <section className="py-24 bg-[#FFFDF5] relative border-t border-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-brand-black">Qualität & Zertifizierung</h2>
          <div className="h-1 w-20 bg-brand-yellow mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-yellow-100"
            >
              {/* Hexagon Icon Container */}
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center group">
                <svg className="absolute inset-0 w-full h-full text-brand-yellow fill-current opacity-20 group-hover:opacity-40 transition-opacity" viewBox="0 0 100 100">
                  <path d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" />
                </svg>
                <item.icon size={36} className="relative z-10 text-brand-black group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                
                {/* Small checkmark badge */}
                <div className="absolute bottom-0 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-brand-black">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
