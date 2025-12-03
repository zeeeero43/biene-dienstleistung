# Biene Dienstleistung - Backend Server

Backend-API für das Kontaktformular der Website Biene Dienstleistung.

## Features

- **Sicherer E-Mail-Versand** über SMTP (Hostinger-kompatibel)
- **Professionelle HTML-E-Mail-Templates** mit Firmenbranding
- **Automatische Bestätigungs-E-Mails** an Absender
- **Spam-Schutz** durch Honeypot, Rate-Limiting und Input-Validierung
- **CORS-Sicherheit** für Frontend-Integration
- **Security Headers** mit Helmet
- **TypeScript** für Type-Safety

## Sicherheitsfeatures

1. **Honeypot-Feld**: Verstecktes Feld zur Bot-Erkennung
2. **Rate-Limiting**: Max. 5 Anfragen pro Minute pro IP
3. **Input-Validierung**: Server- und Client-seitig
4. **Input-Sanitization**: Entfernung von HTML-Tags und gefährlichen Zeichen
5. **Pattern-Detection**: Erkennung von SQL-Injection und XSS-Versuchen
6. **CORS-Protection**: Nur erlaubte Origins
7. **Security Headers**: Helmet.js für zusätzliche Sicherheit

## Installation

### 1. Dependencies installieren

```bash
cd server
npm install
```

### 2. Umgebungsvariablen konfigurieren

Kopieren Sie `.env.example` zu `.env` und füllen Sie die Werte aus:

```bash
cp .env.example .env
```

Bearbeiten Sie die `.env`-Datei:

```env
# Server-Konfiguration
PORT=3001
NODE_ENV=development

# CORS - erlaubte Origins (komma-getrennt)
ALLOWED_ORIGINS=http://localhost:3000

# SMTP-Konfiguration für Hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@biene-dienstleistung.de
SMTP_PASS=IhrSicheresPasswort
SMTP_FROM=info@biene-dienstleistung.de
SMTP_FROM_NAME=Biene Dienstleistung
SMTP_TO=info@biene-dienstleistung.de

# Rate Limiting
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MINUTES=1
```

### 3. SMTP-Konfiguration für gängige Provider

#### Hostinger (empfohlen für dieses Projekt)
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Gmail (App-Passwort erforderlich)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ihre-email@gmail.com
SMTP_PASS=ihr-app-passwort
```

#### Microsoft 365 / Outlook
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Strato
```env
SMTP_HOST=smtp.strato.de
SMTP_PORT=465
SMTP_SECURE=true
```

#### 1&1 IONOS
```env
SMTP_HOST=smtp.ionos.de
SMTP_PORT=587
SMTP_SECURE=false
```

## Entwicklung

### Development-Server starten (mit Auto-Reload)

```bash
npm run dev
```

Der Server läuft auf `http://localhost:3001`

### TypeScript kompilieren

```bash
npm run build
```

### Production-Server starten

```bash
npm start
```

## API-Endpoints

### POST /api/contact

Sendet eine Kontaktanfrage.

**Request Body:**
```json
{
  "name": "Max Mustermann",
  "email": "max@beispiel.de",
  "phone": "0211 1234567",
  "message": "Ihre Nachricht hier..."
}
```

**Response (Erfolg):**
```json
{
  "success": true,
  "message": "Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen."
}
```

**Response (Fehler):**
```json
{
  "success": false,
  "error": "Bitte überprüfen Sie Ihre Eingaben",
  "errors": [
    {
      "field": "email",
      "message": "Bitte geben Sie eine gültige E-Mail-Adresse ein"
    }
  ]
}
```

### GET /api/health

Health-Check für Server-Status.

**Response:**
```json
{
  "success": true,
  "message": "Backend läuft",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET /api/contact/health

Health-Check für SMTP-Verbindung.

**Response (OK):**
```json
{
  "success": true,
  "message": "SMTP-Verbindung OK"
}
```

**Response (Fehler):**
```json
{
  "success": false,
  "message": "SMTP-Verbindung fehlgeschlagen"
}
```

## Testing

### SMTP-Verbindung testen

```bash
curl http://localhost:3001/api/contact/health
```

### Kontaktformular testen

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@beispiel.de",
    "phone": "0211 1234567",
    "message": "Dies ist eine Testnachricht"
  }'
```

## Deployment

### Hostinger Deployment

1. **Server kompilieren:**
```bash
npm run build
```

2. **Dateien hochladen:**
   - Laden Sie den `server`-Ordner auf Ihren Hostinger-Server hoch
   - Stellen Sie sicher, dass Node.js installiert ist

3. **Dependencies installieren (auf dem Server):**
```bash
cd server
npm install --production
```

4. **Environment-Variablen setzen:**
   - Erstellen Sie eine `.env`-Datei auf dem Server
   - Verwenden Sie die Production-URLs für `ALLOWED_ORIGINS`

5. **Server starten:**
```bash
npm start
```

6. **Optional: PM2 für Production verwenden:**
```bash
npm install -g pm2
pm2 start dist/server.js --name biene-backend
pm2 save
pm2 startup
```

### Environment-Variablen für Production

Ändern Sie in der `.env`-Datei:

```env
NODE_ENV=production
ALLOWED_ORIGINS=https://biene-dienstleistung.de,https://www.biene-dienstleistung.de
```

## Troubleshooting

### SMTP-Fehler: "EAUTH - Authentication failed"

**Ursache:** Falsche Anmeldedaten oder App-Passwort erforderlich.

**Lösung:**
- Überprüfen Sie `SMTP_USER` und `SMTP_PASS`
- Bei Gmail: Erstellen Sie ein App-Passwort (nicht Ihr normales Passwort)
- Bei Hostinger: Verwenden Sie das E-Mail-Passwort aus dem Control Panel

### SMTP-Fehler: "ETIMEDOUT" oder "ECONNREFUSED"

**Ursache:** Firewall blockiert SMTP-Port oder falscher Host/Port.

**Lösung:**
- Überprüfen Sie `SMTP_HOST` und `SMTP_PORT`
- Port 587 (TLS) oder Port 465 (SSL) verwenden
- Firewall-Regeln überprüfen

### CORS-Fehler im Browser

**Ursache:** Frontend-Origin nicht in `ALLOWED_ORIGINS` erlaubt.

**Lösung:**
- Fügen Sie die Frontend-URL zu `ALLOWED_ORIGINS` hinzu
- Format: `http://localhost:3000,https://biene-dienstleistung.de`

### Rate-Limit-Fehler bei Tests

**Ursache:** Zu viele Anfragen in kurzer Zeit.

**Lösung:**
- Warten Sie 1 Minute
- Erhöhen Sie `RATE_LIMIT_MAX` für Development
- Verwenden Sie `RATE_LIMIT_WHITELIST` für Test-IPs

## Sicherheits-Checkliste

- [ ] `.env`-Datei ist in `.gitignore` enthalten
- [ ] SMTP-Credentials sind niemals im Code
- [ ] `ALLOWED_ORIGINS` ist auf Production-URLs beschränkt
- [ ] Rate-Limiting ist aktiviert
- [ ] SMTP-Passwort ist sicher und einzigartig
- [ ] Server läuft nur auf HTTPS in Production
- [ ] Logs enthalten keine sensiblen Daten

## Lizenz

Proprietary - Biene Dienstleistung

## Support

Bei Fragen oder Problemen:
- E-Mail: info@biene-dienstleistung.de
- Telefon: +49 211 93657750
