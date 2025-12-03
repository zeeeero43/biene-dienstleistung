import React from 'react';
import { SERVICES_TECH, SERVICES_SECURITY } from '../constants';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = (Icon: any, title: string) => {
    const props = { className: "w-6 h-6 sm:w-8 sm:h-8 text-brand-black", strokeWidth: 1.5, fill: "#FFD700", fillOpacity: 0.6 };
    if (title.includes("Brandwarnanlagen")) return <Flame {...props} className="w-6 h-6 sm:w-8 sm:h-8 text-brand-black" />;
    return <Icon {...props} />;
}

const iconMapSmall = (Icon: any, title: string) => {
    const props = { className: "w-6 h-6 text-brand-black", strokeWidth: 1.5, fill: "#FFD700", fillOpacity: 0.6 };
    if (title.includes("Brandwarnanlagen")) return <Flame {...props} className="w-6 h-6 text-brand-black" />;
    return <Icon {...props} />;
}

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-[#FAFAFA] relative">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1.5 bg-brand-yellow mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-brand-black"
          >
            Unsere Leistungen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Präzise. Sicher. Innovativ. Entdecken Sie unser Leistungsspektrum.
          </motion.p>
        </div>

        {/* Elektrik & Technik Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 bg-brand-yellow rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-brand-black" />
            </div>
            <h3 className="text-xl font-bold text-brand-black">Elektrik & Technik</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {SERVICES_TECH.map((service, index) => {
              // Route mapping for each service
              let routePath = "#contact";
              if (service.title === "Elektroinstallationen") routePath = "/elektroinstallationen";
              if (service.title === "Smart Home") routePath = "/smart-home";
              if (service.title === "Kassensysteme") routePath = "/kassensysteme";

              const CardContent = (
                 <>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[4rem] transition-all group-hover:bg-brand-yellow/10"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="bg-gray-50 w-16 h-16 rounded-2xl rotate-3 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border border-gray-100 group-hover:border-brand-yellow/30 shadow-sm group-hover:bg-white">
                         {iconMap(service.icon, service.title)}
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-brand-black group-hover:text-brand-yellow transition-colors">{service.title}</h3>

                      <p className="text-gray-600 leading-relaxed text-sm mb-8 group-hover:text-gray-800 transition-colors flex-grow">
                        {service.description}
                      </p>

                      <div className="flex items-center text-brand-yellow font-bold text-sm opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out mt-auto">
                        Mehr erfahren <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6 text-brand-yellow opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <ArrowRight size={24} strokeWidth={2.5} />
                    </div>
                 </>
              );

              const containerClasses = "group relative block bg-white p-8 rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 border-l-4 border-transparent hover:border-brand-yellow hover:bg-[#FFFBF0] overflow-hidden cursor-pointer hover:-translate-y-2 h-full";

              const animationProps = {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.1, duration: 0.5 }
              };

              // Use Link for internal routes, anchor for #contact
              if (routePath.startsWith("/")) {
                return (
                  <motion.div key={index} {...animationProps}>
                    <Link to={routePath} className={containerClasses}>
                      {CardContent}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.a
                  href={routePath}
                  key={index}
                  {...animationProps}
                  className={containerClasses}
                >
                  {CardContent}
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Sicherheit Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 bg-brand-black rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-brand-yellow" />
            </div>
            <h3 className="text-xl font-bold text-brand-black">Sicherheit</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {SERVICES_SECURITY.map((service, index) => {
              // Route mapping for security services
              let routePath = "#contact";
              if (service.title === "Türsprechanlagen") routePath = "/tuersprechanlagen";
              if (service.title === "Alarmanlagen") routePath = "/alarmanlagen";
              if (service.title === "Rauch-/Brandwarnanlagen") routePath = "/brandwarnanlagen";
              if (service.title === "Überwachungssysteme") routePath = "/ueberwachungssysteme";

              const animationProps = {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.1, duration: 0.5 }
              };

              const CardContent = (
                <>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[4rem] transition-all group-hover:bg-brand-yellow/10"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="bg-gray-50 w-16 h-16 rounded-2xl rotate-3 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border border-gray-100 group-hover:border-brand-yellow/30 shadow-sm group-hover:bg-white">
                      {iconMap(service.icon, service.title)}
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-brand-black group-hover:text-brand-yellow transition-colors">{service.title}</h3>

                    <p className="text-gray-600 leading-relaxed text-sm mb-8 group-hover:text-gray-800 transition-colors flex-grow">
                      {service.description}
                    </p>

                    <div className="flex items-center text-brand-yellow font-bold text-sm opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out mt-auto">
                      Mehr erfahren <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 text-brand-yellow opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                    <ArrowRight size={24} strokeWidth={2.5} />
                  </div>
                </>
              );

              const containerClasses = "group relative block bg-white p-8 rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 border-l-4 border-transparent hover:border-brand-yellow hover:bg-[#FFFBF0] overflow-hidden cursor-pointer hover:-translate-y-2 h-full";

              // Use Link for internal routes, anchor for #contact
              if (routePath.startsWith("/")) {
                return (
                  <motion.div key={index} {...animationProps}>
                    <Link to={routePath} className={containerClasses}>
                      {CardContent}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.a
                  href={routePath}
                  key={index}
                  {...animationProps}
                  className={containerClasses}
                >
                  {CardContent}
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
