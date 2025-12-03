import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_DETAILS } from '../constants';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Button } from './Button';
import { motion } from 'framer-motion';

// API URL - leer für relative URLs (Production mit Nginx Proxy)
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formState.name.trim() || formState.name.trim().length < 2) {
      errors.name = 'Name muss mindestens 2 Zeichen lang sein';
    }

    if (!formState.email.trim()) {
      errors.email = 'E-Mail-Adresse ist erforderlich';
    } else if (!validateEmail(formState.email)) {
      errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }

    if (!formState.message.trim() || formState.message.trim().length < 10) {
      errors.message = 'Die Nachricht muss mindestens 10 Zeichen lang sein';
    }

    if (!privacyAccepted) {
      errors.privacy = 'Bitte akzeptieren Sie die Datenschutzerklärung';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Client-seitige Validierung
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          message: formState.message,
          website: formState.website, // Honeypot-Feld
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormState({ name: '', email: '', phone: '', message: '', website: '' });
        setPrivacyAccepted(false);

        // Erfolgs-Nachricht nach 8 Sekunden ausblenden
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        // Server-seitige Validierungsfehler
        if (data.errors && Array.isArray(data.errors)) {
          const errors: Record<string, string> = {};
          data.errors.forEach((err: { field: string; message: string }) => {
            errors[err.field] = err.message;
          });
          setFieldErrors(errors);
        }
        setError(data.error || 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      }
    } catch (err) {
      console.error('Fehler beim Senden der Nachricht:', err);
      setError('Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-darker text-white relative overflow-hidden scroll-mt-28">
      
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4 inline-block relative"
          >
            Kontaktieren Sie uns
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-2 left-0 h-1 bg-brand-yellow"
            ></motion.span>
          </motion.h2>
          <p className="text-gray-400 mt-8 max-w-lg mx-auto">
            Wir sind für Sie da. Rufen Sie uns an oder schreiben Sie uns eine Nachricht für ein unverbindliches Angebot.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-8 text-brand-yellow">Firmendaten</h3>
            
            <div className="space-y-8">
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-start gap-6 group"
              >
                <div className="w-14 h-14 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center flex-shrink-0 text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-all">
                   <Phone size={24} className="fill-current" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1 font-bold uppercase tracking-wider">Telefon</p>
                  <a href={`tel:${CONTACT_DETAILS.phone}`} className="text-2xl font-bold hover:text-brand-yellow transition-colors">
                    {CONTACT_DETAILS.phoneDisplay}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-start gap-6 group"
              >
                <div className="w-14 h-14 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center flex-shrink-0 text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-all">
                   <Mail size={24} className="fill-current" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1 font-bold uppercase tracking-wider">E-Mail</p>
                  <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-xl font-medium hover:text-brand-yellow transition-colors">
                    {CONTACT_DETAILS.email}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-start gap-6 group"
              >
                <div className="w-14 h-14 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center flex-shrink-0 text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-all">
                   <MapPin size={24} className="fill-current" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1 font-bold uppercase tracking-wider">Anschrift</p>
                  <p className="text-xl font-medium">
                    {CONTACT_DETAILS.address}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="pt-8 border-t border-gray-800">
              <motion.a 
                href={`https://wa.me/49${CONTACT_DETAILS.phone.substring(1)}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-[#128C7E] hover:bg-[#075E54] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#128C7E]/30 w-full sm:w-auto justify-center text-lg"
              >
                <WhatsAppIcon size={24} />
                WhatsApp Nachricht
              </motion.a>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A1A] p-8 md:p-10 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden"
          >
             {/* Decorative glow */}
             <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-yellow/10 blur-[50px] rounded-full pointer-events-none"></div>

            <h3 className="text-2xl font-bold mb-8 text-white">Nachricht senden</h3>

            {/* Erfolgs-Nachricht */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center"
              >
                <strong>Vielen Dank!</strong> Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.
              </motion.div>
            )}

            {/* Fehler-Nachricht */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot-Feld (versteckt) */}
              <input
                type="text"
                name="website"
                value={formState.website}
                onChange={(e) => setFormState({...formState, website: e.target.value})}
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ihr Name"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className={`w-full bg-[#252525] border ${fieldErrors.name ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-4 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all placeholder:text-gray-600`}
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-red-400 mt-1">{fieldErrors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Telefon</label>
                  <input
                    type="tel"
                    placeholder="Rückrufnummer"
                    value={formState.phone}
                    onChange={(e) => setFormState({...formState, phone: e.target.value})}
                    className={`w-full bg-[#252525] border ${fieldErrors.phone ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-4 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all placeholder:text-gray-600`}
                  />
                  {fieldErrors.phone && (
                    <p className="text-xs text-red-400 mt-1">{fieldErrors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">E-Mail *</label>
                <input
                  type="email"
                  required
                  placeholder="name@beispiel.de"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className={`w-full bg-[#252525] border ${fieldErrors.email ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-4 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all placeholder:text-gray-600`}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nachricht *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Wie können wir Ihnen helfen?"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className={`w-full bg-[#252525] border ${fieldErrors.message ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-4 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all placeholder:text-gray-600 resize-none`}
                ></textarea>
                {fieldErrors.message && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.message}</p>
                )}
              </div>

              {/* DSGVO Einwilligung */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy-consent"
                  required
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-1 w-6 h-6 min-w-[24px] rounded border-gray-600 bg-[#252525] text-brand-yellow focus:ring-brand-yellow focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="privacy-consent" className="text-sm sm:text-base text-gray-400 cursor-pointer">
                  Ich habe die{' '}
                  <Link to="/datenschutz" className="text-brand-yellow hover:underline">
                    Datenschutzerklärung
                  </Link>{' '}
                  gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.*
                </label>
              </div>
              {fieldErrors.privacy && (
                <p className="text-xs text-red-400 -mt-2">{fieldErrors.privacy}</p>
              )}

              <Button
                type="submit"
                className="w-full justify-center mt-4 text-black font-extrabold text-lg py-4"
                disabled={isSubmitting || !privacyAccepted}
              >
                {isSubmitting ? 'Wird gesendet...' : submitted ? 'Nachricht Gesendet!' : (
                  <>Senden <Send size={20} strokeWidth={2.5} /></>
                )}
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};