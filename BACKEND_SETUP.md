# Backend-Setup-Anleitung für Biene Dienstleistung

Komplette Anleitung zur Installation und Konfiguration des Backend-Servers für das Kontaktformular.

## Übersicht

Das Backend besteht aus:
- **Express.js Server** (TypeScript)
- **Nodemailer** für E-Mail-Versand
- **Sicherheitsfeatures** (Rate-Limiting, CORS, Input-Validierung)
- **Professionelle E-Mail-Templates** mit Branding

---

## Schritt 1: Backend-Dependencies installieren

```bash
cd /home/kaan/gokhan/biene-dienstleistung/server
npm install
```

Dies installiert alle benötigten Pakete:
- `express` - Web-Server
- `nodemailer` - E-Mail-Versand
- `cors` - Cross-Origin-Resource-Sharing
- `helmet` - Security-Headers
- `express-rate-limit` - Rate-Limiting
- `validator` - Input-Validierung
- `dotenv` - Environment-Variablen

---

## Schritt 2: SMTP-Credentials von Hostinger holen

### Option A: Hostinger Control Panel

1. Melden Sie sich bei Hostinger an: https://hpanel.hostinger.com
2. Navigieren Sie zu **E-Mails** → **E-Mail-Konten**
3. Wählen Sie die E-Mail-Adresse `info@biene-dienstleistung.de`
4. Klicken Sie auf **E-Mail-Client konfigurieren**
5. Notieren Sie sich:
   - **SMTP-Server:** `smtp.hostinger.com`
   - **SMTP-Port:** `587` (TLS) oder `465` (SSL)
   - **Benutzername:** `info@biene-dienstleistung.de`
   - **Passwort:** Ihr E-Mail-Passwort

### Option B: Standard-Hostinger-Einstellungen

```
SMTP-Host:     smtp.hostinger.com
SMTP-Port:     587 (empfohlen, TLS)
SMTP-Port:     465 (alternativ, SSL)
Benutzername:  info@biene-dienstleistung.de
Passwort:      Ihr E-Mail-Passwort
```

---

## Schritt 3: Backend Environment-Variablen konfigurieren

### .env-Datei erstellen

```bash
cd /home/kaan/gokhan/biene-dienstleistung/server
cp .env.example .env
```

### .env-Datei bearbeiten

Öffnen Sie `/home/kaan/gokhan/biene-dienstleistung/server/.env` und füllen Sie aus:

```env
# Server-Konfiguration
PORT=3001
NODE_ENV=development

# CORS - erlaubte Origins (komma-getrennt)
# Entwicklung:
ALLOWED_ORIGINS=http://localhost:3000

# Produktion (später ändern):
# ALLOWED_ORIGINS=https://biene-dienstleistung.de,https://www.biene-dienstleistung.de

# SMTP-Konfiguration für Hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false

# WICHTIG: Hier Ihre echten Credentials eintragen
SMTP_USER=info@biene-dienstleistung.de
SMTP_PASS=IhrEchtesSMTPPasswort

SMTP_FROM=info@biene-dienstleistung.de
SMTP_FROM_NAME=Biene Dienstleistung
SMTP_TO=info@biene-dienstleistung.de

# Rate Limiting (Spam-Schutz)
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MINUTES=1
```

**WICHTIG:** Ersetzen Sie `IhrEchtesSMTPPasswort` mit dem tatsächlichen Passwort!

---

## Schritt 4: Frontend Environment-Variablen konfigurieren

### .env-Datei erstellen

```bash
cd /home/kaan/gokhan/biene-dienstleistung
cp .env.example .env.local
```

### .env.local-Datei bearbeiten

Öffnen Sie `/home/kaan/gokhan/biene-dienstleistung/.env.local`:

```env
# API URL - Backend-Server URL
# Entwicklung:
VITE_API_URL=http://localhost:3001

# Produktion (später ändern):
# VITE_API_URL=https://api.biene-dienstleistung.de
```

---

## Schritt 5: Backend starten

### Development-Modus (mit Auto-Reload)

```bash
cd /home/kaan/gokhan/biene-dienstleistung/server
npm run dev
```

Sie sollten folgende Ausgabe sehen:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐝 Biene Dienstleistung - Backend-Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Server läuft auf Port 3001
✓ Environment: development
✓ CORS erlaubt: http://localhost:3000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📡 API Endpoints:
   GET  http://localhost:3001/api/health
   GET  http://localhost:3001/api/contact/health
   POST http://localhost:3001/api/contact
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Schritt 6: SMTP-Verbindung testen

### Öffnen Sie ein neues Terminal und testen Sie:

```bash
curl http://localhost:3001/api/contact/health
```

**Erwartete Antwort (OK):**
```json
{
  "success": true,
  "message": "SMTP-Verbindung OK"
}
```

**Fehler-Antwort:**
```json
{
  "success": false,
  "message": "SMTP-Verbindung fehlgeschlagen"
}
```

### Mögliche Fehler und Lösungen:

#### Fehler: "EAUTH - Authentication failed"
**Problem:** Falsche SMTP-Credentials

**Lösung:**
- Überprüfen Sie `SMTP_USER` und `SMTP_PASS` in der `.env`-Datei
- Stellen Sie sicher, dass die E-Mail-Adresse existiert
- Verwenden Sie das korrekte E-Mail-Passwort aus Hostinger

#### Fehler: "ETIMEDOUT" oder "ECONNREFUSED"
**Problem:** Firewall blockiert SMTP-Port oder falscher Port

**Lösung:**
- Versuchen Sie Port `465` mit `SMTP_SECURE=true`
- Überprüfen Sie Ihre Firewall-Einstellungen
- Kontaktieren Sie Hostinger-Support bei anhaltenden Problemen

---

## Schritt 7: Frontend starten

### In einem neuen Terminal:

```bash
cd /home/kaan/gokhan/biene-dienstleistung
npm run dev
```

Das Frontend läuft auf `http://localhost:3000`

---

## Schritt 8: Kontaktformular testen

1. Öffnen Sie `http://localhost:3000` im Browser
2. Scrollen Sie zum Kontaktformular
3. Füllen Sie alle Felder aus:
   - **Name:** Test User
   - **E-Mail:** ihre-email@beispiel.de
   - **Telefon:** 0211 1234567
   - **Nachricht:** Dies ist eine Testnachricht
   - Akzeptieren Sie die Datenschutzerklärung
4. Klicken Sie auf **Senden**

### Erwartetes Verhalten:

1. **Frontend:** Grüne Erfolgsmeldung wird angezeigt
2. **Backend-Terminal:** Zeigt Logs:
   ```
   POST /api/contact - ::1
   📨 Neue Kontaktanfrage von: ihre-email@beispiel.de
   ✓ Kontakt-E-Mail gesendet: <message-id>
   ✓ Bestätigungs-E-Mail gesendet: <message-id>
   ✓ Kontaktanfrage erfolgreich verarbeitet in 1234ms
   ```
3. **E-Mail:** Sie erhalten 2 E-Mails:
   - Eine an `info@biene-dienstleistung.de` mit der Anfrage
   - Eine Bestätigung an die eingegebene E-Mail-Adresse

---

## Schritt 9: Production-Deployment vorbereiten

### Backend kompilieren:

```bash
cd /home/kaan/gokhan/biene-dienstleistung/server
npm run build
```

Dies erstellt den `dist`-Ordner mit kompiliertem JavaScript.

### Production-Server starten:

```bash
npm start
```

### PM2 für automatischen Neustart (empfohlen):

```bash
# PM2 global installieren
npm install -g pm2

# Server mit PM2 starten
cd /home/kaan/gokhan/biene-dienstleistung/server
pm2 start dist/server.js --name biene-backend

# Automatischen Start bei System-Reboot einrichten
pm2 startup
pm2 save
```

### Environment-Variablen für Production:

Ändern Sie in `/home/kaan/gokhan/biene-dienstleistung/server/.env`:

```env
NODE_ENV=production
ALLOWED_ORIGINS=https://biene-dienstleistung.de,https://www.biene-dienstleistung.de
```

Und in `/home/kaan/gokhan/biene-dienstleistung/.env.local`:

```env
VITE_API_URL=https://api.biene-dienstleistung.de
```

---

## Schritt 10: Hostinger-Deployment

### Option A: Separate Backend-Subdomain (empfohlen)

1. **Subdomain erstellen:**
   - Hostinger Control Panel → Domains → Subdomains
   - Erstellen Sie `api.biene-dienstleistung.de`

2. **Backend deployen:**
   ```bash
   # Via FTP/SFTP hochladen:
   - /server/dist/*
   - /server/package.json
   - /server/.env (mit Production-Werten)

   # Auf dem Server:
   cd /pfad/zu/server
   npm install --production
   pm2 start dist/server.js --name biene-backend
   ```

3. **Reverse Proxy konfigurieren:**
   - In Hostinger `.htaccess` oder Apache-Config:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTP_HOST} ^api\.biene-dienstleistung\.de$
   RewriteRule ^(.*)$ http://localhost:3001/$1 [P,L]
   ```

### Option B: Backend auf demselben Port wie Frontend

Falls Hostinger keine separate Node.js-Instanz erlaubt:
- Verwenden Sie Hostingers Node.js-App-Manager
- Konfigurieren Sie Backend als Express-App auf einem verfügbaren Port
- Nutzen Sie die eingebaute Reverse-Proxy-Funktion

**Kontaktieren Sie Hostinger-Support für beste Deployment-Strategie.**

---

## Troubleshooting

### Problem: Backend-Server startet nicht

**Lösung:**
- Überprüfen Sie, ob Port 3001 frei ist: `lsof -i :3001`
- Ändern Sie `PORT` in `.env` zu einem anderen Port
- Überprüfen Sie Node.js-Version: `node --version` (min. 18.x)

### Problem: CORS-Fehler im Browser

**Fehler:** "Access to fetch at 'http://localhost:3001/api/contact' from origin 'http://localhost:3000' has been blocked by CORS policy"

**Lösung:**
- Überprüfen Sie `ALLOWED_ORIGINS` in Backend `.env`
- Stellen Sie sicher, dass Frontend-URL exakt übereinstimmt (kein Trailing-Slash)

### Problem: E-Mails kommen nicht an

**Checkliste:**
1. SMTP-Health-Check erfolgreich? → `curl http://localhost:3001/api/contact/health`
2. Backend-Logs überprüfen auf Fehler
3. Spam-Ordner überprüfen
4. Hostinger SMTP-Status überprüfen
5. E-Mail-Quota überprüfen (falls vorhanden)

### Problem: Rate-Limiting beim Testen

**Fehler:** "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut."

**Lösung für Development:**
```env
# In server/.env erhöhen:
RATE_LIMIT_MAX=50
RATE_LIMIT_WINDOW_MINUTES=1
```

---

## Sicherheits-Checkliste für Production

- [ ] `.env`-Dateien sind in `.gitignore` (bereits erledigt)
- [ ] SMTP-Passwort ist sicher und einzigartig
- [ ] `ALLOWED_ORIGINS` enthält nur Production-URLs
- [ ] `NODE_ENV=production` ist gesetzt
- [ ] Rate-Limiting ist aktiviert (Standard: 5/min)
- [ ] Backend läuft nur über HTTPS (nicht HTTP)
- [ ] Firewall erlaubt nur notwendige Ports
- [ ] Backup der `.env`-Datei ist sicher gespeichert

---

## Nächste Schritte

1. Backend und Frontend lokal testen
2. E-Mail-Templates bei Bedarf anpassen
3. Production-Environment vorbereiten
4. Auf Hostinger deployen
5. Live-Test durchführen

---

## Support-Kontakte

**Hostinger Support:**
- Live-Chat: https://hpanel.hostinger.com
- E-Mail: support@hostinger.com

**Entwickler-Support:**
- E-Mail: info@biene-dienstleistung.de

---

## Anhang: Nützliche Befehle

```bash
# Backend-Server starten (Development)
cd server && npm run dev

# Backend-Server starten (Production)
cd server && npm start

# Frontend starten
npm run dev

# Backend kompilieren
cd server && npm run build

# PM2-Status überprüfen
pm2 status

# PM2-Logs ansehen
pm2 logs biene-backend

# PM2-Server neu starten
pm2 restart biene-backend
```

---

**Viel Erfolg mit Ihrem Backend-Setup!**
