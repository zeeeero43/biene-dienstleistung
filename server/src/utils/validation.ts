import validator from 'validator';
import type { ContactFormData } from '../types/index.js';

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validiert die Kontaktformular-Daten
 */
export function validateContactForm(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Name validieren
  if (!data.name || typeof data.name !== 'string') {
    errors.push({ field: 'name', message: 'Name ist erforderlich' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name muss mindestens 2 Zeichen lang sein' });
  } else if (data.name.length > 100) {
    errors.push({ field: 'name', message: 'Name darf maximal 100 Zeichen lang sein' });
  }

  // E-Mail validieren
  if (!data.email || typeof data.email !== 'string') {
    errors.push({ field: 'email', message: 'E-Mail-Adresse ist erforderlich' });
  } else if (!validator.isEmail(data.email)) {
    errors.push({ field: 'email', message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein' });
  } else if (data.email.length > 255) {
    errors.push({ field: 'email', message: 'E-Mail-Adresse ist zu lang' });
  }

  // Telefon validieren (optional)
  if (data.phone && typeof data.phone === 'string') {
    const cleanPhone = data.phone.trim();
    if (cleanPhone.length > 0) {
      // Erlaube deutsche Telefonnummern in verschiedenen Formaten
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        errors.push({ field: 'phone', message: 'Bitte geben Sie eine gültige Telefonnummer ein' });
      } else if (cleanPhone.length > 30) {
        errors.push({ field: 'phone', message: 'Telefonnummer ist zu lang' });
      }
    }
  }

  // Nachricht validieren
  if (!data.message || typeof data.message !== 'string') {
    errors.push({ field: 'message', message: 'Nachricht ist erforderlich' });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Die Nachricht muss mindestens 10 Zeichen lang sein' });
  } else if (data.message.length > 5000) {
    errors.push({ field: 'message', message: 'Die Nachricht darf maximal 5000 Zeichen lang sein' });
  }

  // Honeypot prüfen (muss leer sein)
  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.push({ field: 'honeypot', message: 'Spam-Schutz wurde ausgelöst' });
  }

  return errors;
}

/**
 * Bereinigt Eingabedaten (entfernt HTML-Tags und gefährliche Zeichen)
 */
export function sanitizeContactForm(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeString(data.name),
    email: sanitizeEmail(data.email),
    phone: data.phone ? sanitizeString(data.phone) : undefined,
    message: sanitizeString(data.message),
    honeypot: data.honeypot,
  };
}

/**
 * Bereinigt einen String (entfernt HTML-Tags und trimmt)
 */
function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';

  // HTML-Tags entfernen
  let sanitized = input.replace(/<[^>]*>/g, '');

  // Gefährliche Zeichen escapen
  sanitized = sanitized
    .replace(/[<>]/g, '')
    .trim();

  return sanitized;
}

/**
 * Bereinigt eine E-Mail-Adresse
 */
function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';

  // E-Mail normalisieren (Kleinbuchstaben, trimmen)
  return validator.normalizeEmail(email, {
    all_lowercase: true,
    gmail_remove_dots: false,
  }) || email.toLowerCase().trim();
}

/**
 * Prüft auf verdächtige Muster (SQL Injection, XSS, etc.)
 */
export function detectSuspiciousPatterns(data: ContactFormData): boolean {
  const suspiciousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // Event Handler wie onclick=
    /(union|select|insert|update|delete|drop|create|alter)\s+(from|into|table|database)/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
  ];

  const allText = [
    data.name,
    data.email,
    data.phone || '',
    data.message,
  ].join(' ');

  return suspiciousPatterns.some(pattern => pattern.test(allText));
}

/**
 * Prüft, ob die Anfrage von einem echten Benutzer stammt
 */
export function validateRequestTiming(startTime: number): boolean {
  const duration = Date.now() - startTime;

  // Zu schnell (< 2 Sekunden) - wahrscheinlich ein Bot
  if (duration < 2000) {
    return false;
  }

  // Zu langsam (> 30 Minuten) - Session könnte abgelaufen sein
  if (duration > 1800000) {
    return false;
  }

  return true;
}
