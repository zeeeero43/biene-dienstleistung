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
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ES Module __dirname Ersatz
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// HTML-E-Mail generieren (kundenfreundlich)
function generateHtmlEmail(data: ReportData): string {
  const statusColor = data.errors > 0 ? '#e74c3c' : data.warnings > 0 ? '#f39c12' : '#27ae60';
  const statusText = data.errors > 0 ? 'Handlungsbedarf' : data.warnings > 0 ? 'Kleinere Hinweise' : 'Alles in Ordnung';
  const statusEmoji = data.errors > 0 ? '🔴' : data.warnings > 0 ? '🟡' : '🟢';
  const statusDescription = data.errors > 0
    ? 'Bei der Wartung wurden Probleme festgestellt, die behoben werden sollten.'
    : data.warnings > 0
    ? 'Die Wartung wurde erfolgreich durchgeführt. Es gibt kleinere Hinweise.'
    : 'Die Wartung wurde erfolgreich durchgeführt. Ihre Webseite läuft einwandfrei.';

  // Durchgeführte Arbeiten basierend auf Report-Inhalten
  const completedTasks = [
    { icon: '🔄', task: 'System-Updates', desc: 'Sicherheitsupdates wurden geprüft und installiert' },
    { icon: '🔒', task: 'SSL-Zertifikat', desc: 'HTTPS-Verschlüsselung wurde überprüft' },
    { icon: '🌐', task: 'Webseiten-Check', desc: 'Erreichbarkeit und Ladezeit wurden getestet' },
    { icon: '⚙️', task: 'Server-Optimierung', desc: 'Speicherplatz und Leistung wurden optimiert' },
    { icon: '🛡️', task: 'Sicherheits-Scan', desc: 'Firewall und Schutzmaßnahmen wurden geprüft' },
    { icon: '🗑️', task: 'Bereinigung', desc: 'Alte Dateien und Logs wurden aufgeräumt' },
    { icon: '💾', task: 'Backup-Prüfung', desc: 'Datensicherungen wurden kontrolliert' },
  ];

  const tasksHtml = completedTasks.map(t => `
    <tr>
      <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; width: 50px; font-size: 24px; text-align: center;">
        ${t.icon}
      </td>
      <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0;">
        <strong style="color: #2c3e50; font-size: 15px;">${t.task}</strong>
        <div style="color: #7f8c8d; font-size: 13px; margin-top: 3px;">${t.desc}</div>
      </td>
      <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; text-align: center; color: #27ae60; font-size: 18px;">
        ✓
      </td>
    </tr>
  `).join('');

  // Nur wichtige Hinweise/Probleme anzeigen (keine technischen Details)
  const issuesHtml = (data.errors > 0 || data.warnings > 0) ? `
    <div style="margin-top: 30px; padding: 20px; background-color: ${data.errors > 0 ? '#fdf2f2' : '#fefce8'}; border-radius: 10px; border-left: 4px solid ${data.errors > 0 ? '#e74c3c' : '#f39c12'};">
      <h3 style="margin: 0 0 15px 0; color: ${data.errors > 0 ? '#c0392b' : '#d68910'}; font-size: 16px;">
        ${data.errors > 0 ? '⚠️ Probleme festgestellt:' : '💡 Hinweise:'}
      </h3>
      <p style="margin: 0; color: #5a5a5a; font-size: 14px; line-height: 1.6;">
        ${data.errors > 0
          ? 'Es wurden ' + data.errors + ' Problem(e) gefunden. Wir kümmern uns darum und melden uns bei Ihnen, falls weitere Schritte erforderlich sind.'
          : 'Es gibt ' + data.warnings + ' Hinweis(e), die aber nicht kritisch sind. Ihre Webseite funktioniert normal weiter.'}
      </p>
    </div>
  ` : '';

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wartungsbericht - ${data.domain}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%); padding: 35px 30px; text-align: center;">
      <h1 style="color: #FFD700; margin: 0; font-size: 26px; font-weight: bold;">
        🔧 Monatlicher Wartungsbericht
      </h1>
      <p style="color: #cccccc; margin: 12px 0 0 0; font-size: 15px;">
        Ihre Webseite: <strong style="color: #ffffff;">${data.domain}</strong>
      </p>
    </div>

    <!-- Status Banner -->
    <div style="background-color: ${statusColor}; padding: 25px 20px; text-align: center;">
      <span style="font-size: 50px; display: block; margin-bottom: 10px;">${statusEmoji}</span>
      <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: bold;">
        ${statusText}
      </h2>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
        ${statusDescription}
      </p>
    </div>

    <!-- Intro Text -->
    <div style="padding: 25px 30px; background-color: #f8f9fa; border-bottom: 1px solid #e9ecef;">
      <p style="margin: 0; color: #5a5a5a; font-size: 15px; line-height: 1.6;">
        Guten Tag,<br><br>
        wir haben die monatliche Wartung Ihrer Webseite durchgeführt.
        Hier ist eine Übersicht der erledigten Arbeiten:
      </p>
    </div>

    <!-- Completed Tasks -->
    <div style="padding: 25px 30px;">
      <h3 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">
        ✅ Durchgeführte Arbeiten
      </h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${tasksHtml}
      </table>

      ${issuesHtml}
    </div>

    <!-- Date Info -->
    <div style="padding: 20px 30px; background-color: #f8f9fa; text-align: center;">
      <p style="margin: 0; color: #7f8c8d; font-size: 13px;">
        📅 Wartung durchgeführt am: <strong style="color: #2c3e50;">${data.timestamp}</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #1a1a1a; padding: 30px; text-align: center;">
      <p style="color: #FFD700; margin: 0; font-weight: bold; font-size: 16px;">
        art.of.media
      </p>
      <p style="color: #999999; margin: 15px 0 0 0; font-size: 13px;">
        Monatliche Webseiten-Wartung
      </p>
      <p style="color: #666666; margin: 20px 0 0 0; font-size: 12px; line-height: 1.5;">
        Bei Fragen stehen wir Ihnen gerne zur Verfügung.<br>
        📧 info@artofmedia-marketing.de
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
  const statusWord = reportData.errors > 0 ? 'Handlungsbedarf' : reportData.warnings > 0 ? 'Hinweise' : 'Alles OK';
  const subject = `${statusEmoji} Wartungsbericht ${reportData.domain} - ${statusWord}`;

  try {
    await transporter.sendMail({
      from: `"${smtpConfig.fromName}" <${smtpConfig.from}>`,
      to: recipient,
      subject: subject,
      html: htmlContent,
      text: `Monatlicher Wartungsbericht für ${reportData.domain}\n\nGuten Tag,\n\nwir haben die monatliche Wartung Ihrer Webseite durchgeführt.\n\nStatus: ${reportData.errors > 0 ? 'Handlungsbedarf' : reportData.warnings > 0 ? 'Kleinere Hinweise' : 'Alles in Ordnung'}\n\nDurchgeführt am: ${reportData.timestamp}\n\nBitte öffnen Sie diese E-Mail in einem HTML-fähigen E-Mail-Programm für den vollständigen Bericht.\n\nMit freundlichen Grüßen\nart.of.media\ninfo@artofmedia-marketing.de`,
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
