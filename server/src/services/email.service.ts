import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { ContactFormData, EmailConfig } from '../types/index.js';
import { generateContactEmail, generateConfirmationEmail } from '../templates/email.js';

export class EmailService {
  private transporter: Transporter;
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;

    // Nodemailer Transporter konfigurieren
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
      connectionTimeout: 10000, // 10 Sekunden Timeout
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });
  }

  /**
   * Sendet die Kontaktformular-E-Mail an den Empfänger
   */
  async sendContactEmail(data: ContactFormData): Promise<void> {
    const { html, text } = generateContactEmail(data);

    const mailOptions = {
      from: `"${this.config.fromName}" <${this.config.from}>`,
      to: this.config.to,
      replyTo: data.email, // Ermöglicht direktes Antworten an den Kunden
      subject: `Neue Kontaktanfrage von ${data.name} - Biene Dienstleistung`,
      html,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✓ Kontakt-E-Mail gesendet:', info.messageId);
    } catch (error) {
      console.error('✗ Fehler beim Senden der Kontakt-E-Mail:', error);
      throw new Error('E-Mail konnte nicht gesendet werden');
    }
  }

  /**
   * Sendet eine Bestätigungs-E-Mail an den Absender
   */
  async sendConfirmationEmail(email: string, name: string): Promise<void> {
    const { html, text } = generateConfirmationEmail(name);

    const mailOptions = {
      from: `"${this.config.fromName}" <${this.config.from}>`,
      to: email,
      subject: 'Bestätigung Ihrer Nachricht - Biene Dienstleistung',
      html,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✓ Bestätigungs-E-Mail gesendet:', info.messageId);
    } catch (error) {
      console.error('✗ Fehler beim Senden der Bestätigungs-E-Mail:', error);
      // Nicht kritisch - wenn die Bestätigung fehlschlägt, sollte die Hauptmail trotzdem durchgehen
      // Daher werfen wir hier keinen Fehler
    }
  }

  /**
   * Sendet beide E-Mails (Kontakt + Bestätigung)
   */
  async sendEmails(data: ContactFormData): Promise<void> {
    // Kontakt-E-Mail ist kritisch und muss erfolgreich sein
    await this.sendContactEmail(data);

    // Bestätigungs-E-Mail ist optional
    await this.sendConfirmationEmail(data.email, data.name);
  }

  /**
   * Überprüft die SMTP-Verbindung
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('✓ SMTP-Verbindung erfolgreich');
      return true;
    } catch (error) {
      console.error('✗ SMTP-Verbindung fehlgeschlagen:', error);
      return false;
    }
  }
}
