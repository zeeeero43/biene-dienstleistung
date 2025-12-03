import { Router, Request, Response } from 'express';
import type { ContactFormData } from '../types/index.js';
import { EmailService } from '../services/email.service.js';
import {
  validateContactForm,
  sanitizeContactForm,
  detectSuspiciousPatterns,
} from '../utils/validation.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

/**
 * POST /api/contact
 * Verarbeitet Kontaktformular-Anfragen
 */
router.post('/contact', contactRateLimiter, async (req: Request, res: Response) => {
  const startTime = Date.now();

  try {
    // 1. Body-Daten extrahieren
    const formData: ContactFormData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      honeypot: req.body.website || req.body.company_url, // Honeypot-Feld
    };

    console.log(`📨 Neue Kontaktanfrage von: ${formData.email}`);

    // 2. Honeypot prüfen (muss leer sein)
    if (formData.honeypot && formData.honeypot.trim().length > 0) {
      console.warn('⚠ Honeypot-Feld ausgefüllt - möglicher Bot');
      // Erfolg vortäuschen, um Bot nicht zu verraten
      return res.status(200).json({
        success: true,
        message: 'Nachricht wurde erfolgreich gesendet',
      });
    }

    // 3. Eingaben bereinigen
    const sanitizedData = sanitizeContactForm(formData);

    // 4. Verdächtige Muster erkennen
    if (detectSuspiciousPatterns(sanitizedData)) {
      console.warn('⚠ Verdächtige Muster erkannt in Formular-Daten');
      return res.status(400).json({
        success: false,
        error: 'Ihre Eingabe enthält nicht erlaubte Zeichen',
      });
    }

    // 5. Daten validieren
    const validationErrors = validateContactForm(sanitizedData);
    if (validationErrors.length > 0) {
      console.warn('⚠ Validierungsfehler:', validationErrors);
      return res.status(400).json({
        success: false,
        error: 'Bitte überprüfen Sie Ihre Eingaben',
        errors: validationErrors,
      });
    }

    // 6. E-Mail-Service initialisieren
    const emailService = new EmailService({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
      from: process.env.SMTP_FROM || process.env.SMTP_USER || '',
      fromName: process.env.SMTP_FROM_NAME || 'Biene Dienstleistung',
      to: process.env.SMTP_TO || process.env.SMTP_USER || '',
    });

    // 7. E-Mails senden
    await emailService.sendEmails(sanitizedData);

    // 8. Erfolgsantwort
    const duration = Date.now() - startTime;
    console.log(`✓ Kontaktanfrage erfolgreich verarbeitet in ${duration}ms`);

    return res.status(200).json({
      success: true,
      message: 'Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.',
    });

  } catch (error) {
    console.error('✗ Fehler beim Verarbeiten der Kontaktanfrage:', error);

    // Generische Fehlermeldung (keine technischen Details preisgeben)
    return res.status(500).json({
      success: false,
      error: 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.',
    });
  }
});

/**
 * GET /api/contact/health
 * Health-Check für SMTP-Verbindung
 */
router.get('/contact/health', async (_req: Request, res: Response) => {
  try {
    const emailService = new EmailService({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
      from: process.env.SMTP_FROM || process.env.SMTP_USER || '',
      fromName: process.env.SMTP_FROM_NAME || 'Biene Dienstleistung',
      to: process.env.SMTP_TO || process.env.SMTP_USER || '',
    });

    const isConnected = await emailService.verifyConnection();

    if (isConnected) {
      return res.status(200).json({
        success: true,
        message: 'SMTP-Verbindung OK',
      });
    } else {
      return res.status(503).json({
        success: false,
        message: 'SMTP-Verbindung fehlgeschlagen',
      });
    }
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: 'SMTP-Verbindung konnte nicht überprüft werden',
    });
  }
});

export default router;
