
import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { BeeLogo } from './BeeLogo';

// Simple Counter Component
const Counter = ({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) => {
  const [count, setCount] = useState(from);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

export const About: React.FC = () => {
  const stats = [
    { value: 10, suffix: "+", label: "Jahre Erfahrung" },
    { value: 100, suffix: "%", label: "Kundenzufriedenheit" },
    { value: 24, suffix: "/7", label: "Notdienst" }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden bg-honeycomb">
      {/* Background Watermark */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none grayscale">
        <BeeLogo className="w-[500px] h-[500px]" animated={false} />
      </div>

      {/* Hexagon Pattern Overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-brand-black">
          <pattern id="hex-overlay" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
             <path d="M10 0 L18.66 5 V15 L10 20 L1.34 15 V5 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#hex-overlay)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              Ihr Elektriker Meisterbetrieb in Moers <br/>
              <span className="relative inline-block">
                <span className="relative z-10 text-brand-black">für professionelle Elektroinstallationen</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-brand-yellow/40 -z-0 skew-x-12"></span>
              </span>
            </h2>
            
            <p className="text-gray-600 mb-6 text-lg leading-relaxed font-medium">
              Als <strong>Elektriker Meisterbetrieb in Moers und Umgebung</strong> stehen wir für qualitativ hochwertige <span className="text-brand-black font-bold">Elektroinstallationen, Smart Home Lösungen und Sicherheitstechnik</span>. Deutsche Ingenieurskunst gepaart mit kundenorientiertem Service.
            </p>

            <p className="text-gray-500 mb-10 leading-relaxed">
              Biene Dienstleistung ist Ihr zuverlässiger Partner für alle elektrischen Arbeiten in Moers. Von der Elektroinstallation im Neubau über Smart Home Nachrüstung bis zur Installation von Alarmanlagen und Videoüberwachung – wir arbeiten präzise, sauber und termingerecht.
            </p>

            <ul className="space-y-4 mb-8">
              {['Meisterhafte Ausführung', 'Transparente Preisgestaltung', 'Regionale Verfügbarkeit'].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-center gap-3 font-bold text-brand-black p-3 bg-gray-50 rounded-lg hover:bg-brand-yellow/10 transition-colors border border-gray-100"
                >
                  <CheckCircle2 className="text-brand-yellow fill-black" size={20} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 text-center border-t-4 border-t-brand-yellow hover:translate-y-[-5px] transition-all duration-300 relative group overflow-hidden ${index === 2 ? 'sm:col-span-2' : ''}`}
              >
                {/* Hexagon decoration */}
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-gray-50 rotate-45 group-hover:bg-brand-yellow/20 transition-colors"></div>

                <div className="text-5xl md:text-6xl font-black text-brand-black mb-2 flex justify-center items-baseline">
                  <Counter from={0} to={stat.value} />
                  <span className="text-brand-yellow ml-1 text-4xl">{stat.suffix}</span>
                </div>
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};
