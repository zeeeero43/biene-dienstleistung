import type { ContactFormData } from '../types/index.js';

/**
 * Generiert eine professionelle HTML-E-Mail für die Kontaktanfrage
 */
export function generateContactEmail(data: ContactFormData): { html: string; text: string } {
  const { name, email, phone, message } = data;
  const timestamp = new Date().toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Kontaktanfrage</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    .email-header {
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo-text {
      font-size: 32px;
      font-weight: 900;
      color: #000000;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .email-body {
      padding: 40px 30px;
    }
    .email-title {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 30px 0;
      text-align: center;
    }
    .divider {
      height: 3px;
      background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
      margin: 30px 0;
      border-radius: 2px;
    }
    .field-group {
      margin-bottom: 25px;
    }
    .field-label {
      font-size: 12px;
      font-weight: 700;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
      display: block;
    }
    .field-value {
      font-size: 16px;
      color: #1a1a1a;
      background-color: #f9f9f9;
      padding: 12px 16px;
      border-radius: 8px;
      border-left: 4px solid #FFD700;
    }
    .message-box {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #FFD700;
      margin-top: 10px;
    }
    .message-text {
      font-size: 15px;
      color: #333333;
      white-space: pre-wrap;
      word-wrap: break-word;
      margin: 0;
    }
    .email-footer {
      background-color: #1a1a1a;
      padding: 30px;
      text-align: center;
    }
    .footer-text {
      font-size: 12px;
      color: #999999;
      margin: 5px 0;
    }
    .timestamp {
      font-size: 13px;
      color: #666666;
      text-align: center;
      margin-top: 25px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    .highlight {
      color: #FFA500;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <h1 class="logo-text">🐝 Biene Dienstleistung</h1>
    </div>

    <!-- Body -->
    <div class="email-body">
      <h2 class="email-title">Neue Kontaktanfrage</h2>

      <div class="divider"></div>

      <!-- Kontaktdaten -->
      <div class="field-group">
        <span class="field-label">Name</span>
        <div class="field-value">${escapeHtml(name)}</div>
      </div>

      <div class="field-group">
        <span class="field-label">E-Mail-Adresse</span>
        <div class="field-value">
          <a href="mailto:${escapeHtml(email)}" style="color: #FFA500; text-decoration: none;">
            ${escapeHtml(email)}
          </a>
        </div>
      </div>

      ${phone ? `
      <div class="field-group">
        <span class="field-label">Telefonnummer</span>
        <div class="field-value">
          <a href="tel:${escapeHtml(phone)}" style="color: #FFA500; text-decoration: none;">
            ${escapeHtml(phone)}
          </a>
        </div>
      </div>
      ` : ''}

      <div class="divider"></div>

      <!-- Nachricht -->
      <div class="field-group">
        <span class="field-label">Nachricht</span>
        <div class="message-box">
          <p class="message-text">${escapeHtml(message)}</p>
        </div>
      </div>

      <!-- Timestamp -->
      <div class="timestamp">
        <strong>Eingegangen am:</strong> <span class="highlight">${timestamp} Uhr</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      <p class="footer-text">Diese E-Mail wurde automatisch über das Kontaktformular</p>
      <p class="footer-text">von <strong style="color: #FFD700;">biene-dienstleistung.de</strong> generiert</p>
    </div>
  </div>
</body>
</html>
  `;

  // Text-Version für E-Mail-Clients ohne HTML-Unterstützung
  const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🐝 BIENE DIENSTLEISTUNG
  Neue Kontaktanfrage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KONTAKTDATEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:      ${name}
E-Mail:    ${email}
${phone ? `Telefon:   ${phone}` : ''}

NACHRICHT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Eingegangen am: ${timestamp} Uhr

Diese E-Mail wurde automatisch über das
Kontaktformular von biene-dienstleistung.de generiert.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;

  return { html, text };
}

/**
 * Generiert eine Bestätigungs-E-Mail für den Absender
 */
export function generateConfirmationEmail(name: string): { html: string; text: string } {
  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bestätigung Ihrer Nachricht</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    .email-header {
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo-text {
      font-size: 32px;
      font-weight: 900;
      color: #000000;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .email-body {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 22px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 20px 0;
    }
    .text-content {
      font-size: 16px;
      color: #333333;
      line-height: 1.8;
      margin-bottom: 20px;
    }
    .checkmark {
      text-align: center;
      margin: 30px 0;
    }
    .checkmark-circle {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
    }
    .contact-box {
      background-color: #f9f9f9;
      padding: 25px;
      border-radius: 8px;
      border-left: 4px solid #FFD700;
      margin: 30px 0;
    }
    .contact-item {
      margin: 12px 0;
      font-size: 15px;
      color: #333333;
    }
    .contact-label {
      font-weight: 700;
      color: #666666;
      display: inline-block;
      min-width: 80px;
    }
    .contact-link {
      color: #FFA500;
      text-decoration: none;
    }
    .email-footer {
      background-color: #1a1a1a;
      padding: 30px;
      text-align: center;
    }
    .footer-text {
      font-size: 12px;
      color: #999999;
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <h1 class="logo-text">🐝 Biene Dienstleistung</h1>
    </div>

    <!-- Body -->
    <div class="email-body">
      <div class="checkmark">
        <div class="checkmark-circle">✓</div>
      </div>

      <h2 class="greeting">Hallo ${escapeHtml(name)},</h2>

      <p class="text-content">
        <strong>vielen Dank für Ihre Nachricht!</strong>
      </p>

      <p class="text-content">
        Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
        In der Regel antworten wir innerhalb von 24 Stunden.
      </p>

      <div class="contact-box">
        <p class="text-content" style="margin: 0 0 15px 0;">
          <strong>Sie haben noch Fragen?</strong><br>
          Kontaktieren Sie uns gerne direkt:
        </p>
        <div class="contact-item">
          <span class="contact-label">Telefon:</span>
          <a href="tel:+4921193657750" class="contact-link">+49 211 93657750</a>
        </div>
        <div class="contact-item">
          <span class="contact-label">E-Mail:</span>
          <a href="mailto:info@biene-dienstleistung.de" class="contact-link">info@biene-dienstleistung.de</a>
        </div>
      </div>

      <p class="text-content">
        Wir freuen uns auf die Zusammenarbeit mit Ihnen!
      </p>

      <p class="text-content" style="margin-top: 30px;">
        <strong>Mit freundlichen Grüßen</strong><br>
        Ihr Team von Biene Dienstleistung
      </p>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      <p class="footer-text"><strong style="color: #FFD700;">Biene Dienstleistung</strong></p>
      <p class="footer-text">Ihr Partner für professionelle Dienstleistungen</p>
      <p class="footer-text" style="margin-top: 15px;">www.biene-dienstleistung.de</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🐝 BIENE DIENSTLEISTUNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hallo ${name},

VIELEN DANK FÜR IHRE NACHRICHT!

Wir haben Ihre Anfrage erhalten und werden uns
schnellstmöglich bei Ihnen melden. In der Regel
antworten wir innerhalb von 24 Stunden.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SIE HABEN NOCH FRAGEN?
Kontaktieren Sie uns gerne direkt:

Telefon:  +49 211 93657750
E-Mail:   info@biene-dienstleistung.de
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Wir freuen uns auf die Zusammenarbeit mit Ihnen!

Mit freundlichen Grüßen
Ihr Team von Biene Dienstleistung

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Biene Dienstleistung
Ihr Partner für professionelle Dienstleistungen
www.biene-dienstleistung.de
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;

  return { html, text };
}

/**
 * Escaped HTML-Sonderzeichen zur Vermeidung von XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
