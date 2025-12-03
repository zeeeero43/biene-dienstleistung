#!/usr/bin/env npx tsx
/**
 * Maintenance Report E-Mail Sender
 * Sendet den Wartungsbericht als schöne HTML-E-Mail
 *
 * Usage: npx tsx maintenance-report.ts <report-file>
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// .env laden
dotenv.config({ path: resolve(__dirname, '../.env') });

interface ReportData {
  domain: string;
  timestamp: string;
  errors: number;
  warnings: number;
  sections: {
    title: string;
    items: { status: 'success' | 'warning' | 'error' | 'info'; message: string }[];
  }[];
}

// Report-Datei einlesen und parsen
function parseReportFile(filePath: string): ReportData {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const data: ReportData = {
    domain: process.env.DOMAIN || 'biene-dienstleistung.de',
    timestamp: new Date().toLocaleString('de-DE'),
    errors: 0,
    warnings: 0,
    sections: []
  };

  let currentSection: { title: string; items: any[] } | null = null;

  for (const line of lines) {
    // Fehler/Warnungen zählen
    if (line.includes('✗') || line.includes('FEHLER') || line.includes('ERROR')) {
      data.errors++;
    }
    if (line.includes('⚠') || line.includes('WARNUNG') || line.includes('WARNING')) {
      data.warnings++;
    }

    // Sektionen erkennen (nummeriert)
    const sectionMatch = line.match(/(\d+)\.\s+([A-ZÄÖÜ\-\s]+)/);
    if (sectionMatch) {
      if (currentSection) {
        data.sections.push(currentSection);
      }
      currentSection = { title: sectionMatch[2].trim(), items: [] };
      continue;
    }

    // Items zur aktuellen Sektion hinzufügen
    if (currentSection) {
      if (line.includes('✓')) {
        currentSection.items.push({ status: 'success', message: line.replace(/.*✓\s*/, '').replace(/\x1b\[[0-9;]*m/g, '') });
      } else if (line.includes('✗')) {
        currentSection.items.push({ status: 'error', message: line.replace(/.*✗\s*/, '').replace(/\x1b\[[0-9;]*m/g, '') });
      } else if (line.includes('⚠')) {
        currentSection.items.push({ status: 'warning', message: line.replace(/.*⚠\s*/, '').replace(/\x1b\[[0-9;]*m/g, '') });
      } else if (line.includes('ℹ')) {
        currentSection.items.push({ status: 'info', message: line.replace(/.*ℹ\s*/, '').replace(/\x1b\[[0-9;]*m/g, '') });
      }
    }
  }

  if (currentSection) {
    data.sections.push(currentSection);
  }

  return data;
}

// HTML-E-Mail generieren
function generateHtmlEmail(data: ReportData): string {
  const statusColor = data.errors > 0 ? '#e74c3c' : data.warnings > 0 ? '#f39c12' : '#27ae60';
  const statusText = data.errors > 0 ? 'FEHLER GEFUNDEN' : data.warnings > 0 ? 'WARNUNGEN' : 'ALLES IN ORDNUNG';
  const statusEmoji = data.errors > 0 ? '🔴' : data.warnings > 0 ? '🟡' : '🟢';

  const sectionsHtml = data.sections.map(section => `
    <div style="margin-bottom: 25px;">
      <h3 style="color: #2c3e50; border-bottom: 2px solid #FFD700; padding-bottom: 8px; margin-bottom: 15px;">
        ${section.title}
      </h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${section.items.map(item => {
          const icon = item.status === 'success' ? '✓' : item.status === 'error' ? '✗' : item.status === 'warning' ? '⚠' : 'ℹ';
          const color = item.status === 'success' ? '#27ae60' : item.status === 'error' ? '#e74c3c' : item.status === 'warning' ? '#f39c12' : '#3498db';
          return `
            <tr>
              <td style="padding: 8px 12px; border-bottom: 1px solid #ecf0f1; width: 30px; color: ${color}; font-weight: bold; font-size: 16px;">
                ${icon}
              </td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #ecf0f1; color: #2c3e50;">
                ${item.message}
              </td>
            </tr>
          `;
        }).join('')}
      </table>
    </div>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VPS Wartungsbericht - ${data.domain}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%); padding: 30px; text-align: center;">
      <h1 style="color: #FFD700; margin: 0; font-size: 28px; font-weight: bold;">
        🐝 VPS Wartungsbericht
      </h1>
      <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
        ${data.domain}
      </p>
    </div>

    <!-- Status Banner -->
    <div style="background-color: ${statusColor}; padding: 20px; text-align: center;">
      <span style="font-size: 40px;">${statusEmoji}</span>
      <h2 style="color: #ffffff; margin: 10px 0 0 0; font-size: 24px; font-weight: bold;">
        ${statusText}
      </h2>
    </div>

    <!-- Summary -->
    <div style="padding: 25px; background-color: #f8f9fa; border-bottom: 1px solid #dee2e6;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 15px; text-align: center; width: 33%;">
            <div style="font-size: 36px; font-weight: bold; color: #e74c3c;">${data.errors}</div>
            <div style="color: #6c757d; font-size: 14px;">Fehler</div>
          </td>
          <td style="padding: 15px; text-align: center; width: 33%; border-left: 1px solid #dee2e6; border-right: 1px solid #dee2e6;">
            <div style="font-size: 36px; font-weight: bold; color: #f39c12;">${data.warnings}</div>
            <div style="color: #6c757d; font-size: 14px;">Warnungen</div>
          </td>
          <td style="padding: 15px; text-align: center; width: 33%;">
            <div style="font-size: 14px; color: #6c757d;">Durchgeführt am</div>
            <div style="font-size: 16px; font-weight: bold; color: #2c3e50; margin-top: 5px;">${data.timestamp}</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Content -->
    <div style="padding: 30px;">
      ${sectionsHtml}
    </div>

    <!-- Footer -->
    <div style="background-color: #1a1a1a; padding: 25px; text-align: center;">
      <p style="color: #FFD700; margin: 0; font-weight: bold; font-size: 16px;">
        🐝 Biene Dienstleistung
      </p>
      <p style="color: #888888; margin: 10px 0 0 0; font-size: 12px;">
        Monatliche VPS-Wartung | Server: ${data.domain}
      </p>
      <p style="color: #666666; margin: 15px 0 0 0; font-size: 11px;">
        Dieser Bericht wurde automatisch generiert.
      </p>
    </div>

  </div>
</body>
</html>
  `;
}

// E-Mail senden
async function sendReport(reportPath: string, recipientEmail?: string): Promise<void> {
  // Prüfen ob Report existiert
  if (!existsSync(reportPath)) {
    console.error(`Report-Datei nicht gefunden: ${reportPath}`);
    process.exit(1);
  }

  // SMTP-Konfiguration prüfen
  const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    fromName: process.env.SMTP_FROM_NAME || 'VPS Wartung',
  };

  if (!smtpConfig.host || !smtpConfig.user || !smtpConfig.pass) {
    console.error('SMTP-Konfiguration fehlt in .env Datei');
    console.error('Benötigt: SMTP_HOST, SMTP_USER, SMTP_PASS');
    process.exit(1);
  }

  // Report parsen
  console.log('📄 Lese Report-Datei...');
  const reportData = parseReportFile(reportPath);

  // HTML generieren
  console.log('🎨 Generiere HTML-E-Mail...');
  const htmlContent = generateHtmlEmail(reportData);

  // Transporter erstellen
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  // Empfänger
  const recipient = recipientEmail || process.env.SMTP_TO || smtpConfig.user;

  // E-Mail senden
  console.log(`📧 Sende E-Mail an ${recipient}...`);

  const statusEmoji = reportData.errors > 0 ? '🔴' : reportData.warnings > 0 ? '🟡' : '🟢';
  const subject = `${statusEmoji} VPS Wartungsbericht - ${reportData.domain} - ${reportData.timestamp}`;

  try {
    await transporter.sendMail({
      from: `"${smtpConfig.fromName}" <${smtpConfig.from}>`,
      to: recipient,
      subject: subject,
      html: htmlContent,
      text: `VPS Wartungsbericht für ${reportData.domain}\n\nFehler: ${reportData.errors}\nWarnungen: ${reportData.warnings}\n\nDatum: ${reportData.timestamp}\n\nDetails siehe HTML-Version.`,
    });

    console.log('✅ E-Mail erfolgreich gesendet!');
  } catch (error) {
    console.error('❌ Fehler beim Senden der E-Mail:', error);
    process.exit(1);
  }
}

// Main
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: npx tsx maintenance-report.ts <report-file> [recipient-email]');
  console.log('Example: npx tsx maintenance-report.ts /tmp/maintenance-report.txt admin@example.com');
  process.exit(1);
}

sendReport(args[0], args[1]);
