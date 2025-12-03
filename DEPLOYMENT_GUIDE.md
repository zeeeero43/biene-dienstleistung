# Biene Dienstleistung - Deployment Guide

Vollständige Anleitung zur Erstinstallation und Updates der React/Vite Website auf einem Ubuntu 22.04 VPS.

## Übersicht

Diese Deployment-Lösung bietet:

- **Vollautomatische Erstinstallation** eines frischen VPS
- **Enterprise-Grade Sicherheit** mit Firewall, Fail2ban, SSL
- **Optimierte Nginx-Konfiguration** für React SPA
- **Zero-Downtime Updates** mit Rollback-Unterstützung
- **Automatische SSL-Erneuerung** via Let's Encrypt
- **Produktionsreife Logging** und Monitoring

---

## Voraussetzungen

### VPS-Anforderungen
- Ubuntu 22.04 LTS (frisch installiert)
- Mindestens 1 GB RAM
- 20 GB Speicherplatz
- Root-Zugriff via SSH

### Domain-Setup
- Domain `biene-dienstleistung.de` muss auf VPS-IP zeigen
- DNS A-Records für beide:
  - `biene-dienstleistung.de` → VPS-IP
  - `www.biene-dienstleistung.de` → VPS-IP
- DNS-Propagation abwarten (bis zu 24h)

### GitHub Repository
- Repository muss existieren
- Sie benötigen Zugriff zum Hinzufügen von Deploy Keys

---

## Teil 1: Erstinstallation

### Schritt 1: Skripte auf VPS kopieren

```bash
# Lokal: Skripte zum VPS hochladen
scp deploy.sh root@YOUR_VPS_IP:/root/
```

### Schritt 2: Repository-URL anpassen

**WICHTIG**: Bevor Sie das Skript ausführen, müssen Sie die GitHub-Repository-URL anpassen!

```bash
# Auf dem VPS
nano /root/deploy.sh
```

Ändern Sie diese Zeile:
```bash
REPO_URL="git@github.com:username/biene-dienstleistung.git"  # UPDATE THIS!
```

In Ihre tatsächliche Repository-URL:
```bash
REPO_URL="git@github.com:IhrGitHubUsername/biene-dienstleistung.git"
```

### Schritt 3: Deployment ausführen

```bash
# Skript ausführbar machen
chmod +x /root/deploy.sh

# Deployment starten (als root)
./deploy.sh
```

### Schritt 4: GitHub Deploy Key hinzufügen

Das Skript wird pausieren und einen SSH Public Key anzeigen:

```
=================================================================
IMPORTANT: Add this SSH public key as a Deploy Key in GitHub:
=================================================================
ssh-ed25519 AAAAC3... admin@biene-dienstleistung.de
=================================================================
```

**So fügen Sie den Deploy Key hinzu:**

1. Kopieren Sie den kompletten Public Key
2. Öffnen Sie GitHub: `https://github.com/IhrUsername/biene-dienstleistung`
3. Gehen Sie zu: **Settings** → **Deploy keys** → **Add deploy key**
4. Title: `VPS Production Server`
5. Key: Fügen Sie den kopierten Key ein
6. **Read-only** belassen (kein Schreibzugriff nötig)
7. Klicken Sie auf **Add key**
8. Zurück zum Terminal, drücken Sie **Enter**

### Schritt 5: SSL-Zertifikat bestätigen

Das Skript wird ein SSL-Zertifikat via Let's Encrypt anfordern. Stellen Sie sicher:

- Domain zeigt auf die richtige IP (überprüfen Sie mit `nslookup biene-dienstleistung.de`)
- Ports 80 und 443 sind erreichbar
- Drücken Sie **Enter** zum Fortfahren

### Schritt 6: Installation abschließen

Das Skript wird alle Schritte ausführen:

1. System-Updates
2. Firewall-Konfiguration
3. Fail2ban-Setup
4. Deploy-User erstellen
5. Node.js installieren
6. Nginx konfigurieren
7. SSL-Zertifikat einrichten
8. Repository klonen und bauen
9. Update-Skript erstellen

**Dauer**: ca. 10-15 Minuten

---

## Teil 2: Website testen

### Überprüfen Sie die Installation

```bash
# Nginx Status
systemctl status nginx

# SSL Status
systemctl status certbot.timer

# Website testen
curl -I https://biene-dienstleistung.de
```

### Browser-Test

1. Öffnen Sie: `https://biene-dienstleistung.de`
2. Überprüfen Sie das SSL-Zertifikat (Schloss-Symbol)
3. Testen Sie Navigation und Funktionalität

### SSL-Rating testen

Besuchen Sie: `https://www.ssllabs.com/ssltest/analyze.html?d=biene-dienstleistung.de`

Erwartetes Ergebnis: **A oder A+ Rating**

---

## Teil 3: Updates durchführen

### Vorbereitungen

Nach der Erstinstallation können Sie als `deploy`-User arbeiten:

```bash
# SSH als deploy user (fügen Sie zuerst Ihren SSH Key hinzu!)
ssh deploy@YOUR_VPS_IP
```

**SSH Key für deploy user hinzufügen:**

```bash
# Auf Ihrem lokalen Rechner
ssh-copy-id deploy@YOUR_VPS_IP

# Oder manuell:
cat ~/.ssh/id_rsa.pub | ssh root@YOUR_VPS_IP "cat >> /home/deploy/.ssh/authorized_keys"
```

### Update durchführen

```bash
# Als deploy user
cd ~
./update.sh
```

Das Update-Skript führt automatisch aus:

1. **Backup** des aktuellen Builds
2. **Git pull** der neuesten Änderungen
3. **npm install** (nur wenn package.json geändert)
4. **npm run build** mit Produktions-Optimierungen
5. **Nginx reload** (zero downtime)
6. **Rollback** bei Fehlern

### Update-Features

- **Zero Downtime**: Nginx wird nur neu geladen, nicht neu gestartet
- **Automatisches Rollback**: Bei Build-Fehlern wird automatisch das Backup wiederhergestellt
- **Detailliertes Logging**: Alle Updates werden geloggt
- **Health Checks**: Automatische Überprüfung nach dem Update

### Update-Logs anzeigen

```bash
# Letzte Updates anzeigen
tail -f /var/log/biene-dienstleistung-updates.log

# Alle Updates des heutigen Tages
grep "$(date '+%Y-%m-%d')" /var/log/biene-dienstleistung-updates.log
```

---

## Teil 4: Wartung und Monitoring

### Logs überwachen

```bash
# Nginx Access Log
tail -f /var/log/nginx/biene-dienstleistung.access.log

# Nginx Error Log
tail -f /var/log/nginx/biene-dienstleistung.error.log

# Fail2ban Status
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

### Disk Space überprüfen

```bash
# Gesamter Speicherplatz
df -h

# Projektgröße
du -sh /var/www/biene-dienstleistung

# Backup-Größe
du -sh /var/backups/biene-dienstleistung
```

### Alte Backups löschen

Das Update-Skript behält automatisch die letzten 5 Backups. Für manuelles Löschen:

```bash
cd /var/backups/biene-dienstleistung
ls -lt  # Backups anzeigen
rm dist-backup-2024-XX-XX_XX-XX-XX.tar.gz  # Alte löschen
```

### SSL-Erneuerung testen

```bash
# Test-Erneuerung durchführen
sudo certbot renew --dry-run

# Nächste Erneuerung anzeigen
sudo certbot certificates
```

SSL-Zertifikate werden automatisch alle 60 Tage erneuert (30 Tage vor Ablauf).

---

## Teil 5: Fehlerbehebung

### Website nicht erreichbar

```bash
# Nginx Status prüfen
sudo systemctl status nginx

# Nginx Fehler-Log anzeigen
sudo tail -50 /var/log/nginx/error.log

# Nginx neu starten
sudo systemctl restart nginx
```

### SSL-Fehler

```bash
# Zertifikat-Status prüfen
sudo certbot certificates

# Zertifikat manuell erneuern
sudo certbot renew --force-renewal

# Nginx neu starten nach SSL-Änderungen
sudo systemctl restart nginx
```

### Build-Fehler beim Update

Das Update-Skript erstellt automatisch Rollbacks. Für manuelle Wiederherstellung:

```bash
# Letztes Backup anzeigen
ls -lt /var/backups/biene-dienstleistung | head -2

# Backup wiederherstellen
cd /var/www/biene-dienstleistung
sudo tar -xzf /var/backups/biene-dienstleistung/dist-backup-TIMESTAMP.tar.gz
sudo systemctl reload nginx
```

### Firewall-Probleme

```bash
# UFW Status
sudo ufw status verbose

# UFW Logs
sudo tail -f /var/log/ufw.log

# Port testen (von außerhalb)
telnet YOUR_VPS_IP 443
```

### Node.js oder npm Fehler

```bash
# Node.js Version prüfen
node --version

# npm Cache löschen
npm cache clean --force

# Dependencies neu installieren
cd /var/www/biene-dienstleistung
rm -rf node_modules package-lock.json
npm install
```

---

## Teil 6: Sicherheits-Checkliste

### Nach Deployment überprüfen

- [ ] Website über HTTPS erreichbar
- [ ] SSL-Rating A oder A+ (SSLLabs)
- [ ] Firewall aktiv (nur Ports 22, 80, 443 offen)
- [ ] Fail2ban läuft
- [ ] SSH Key-basierte Authentifizierung aktiv
- [ ] Deploy-User funktioniert
- [ ] Update-Skript funktioniert
- [ ] Logs rotieren automatisch
- [ ] Certbot Auto-Renewal aktiv

### Sicherheits-Headers testen

Besuchen Sie: `https://securityheaders.com/?q=biene-dienstleistung.de`

Erwartete Headers:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Content-Security-Policy
- Strict-Transport-Security (HSTS)

### Zusätzliche Sicherheitsmaßnahmen (Optional)

```bash
# SSH nur mit Key erlauben (Password deaktivieren)
sudo nano /etc/ssh/sshd_config
# Ändern Sie: PasswordAuthentication no
sudo systemctl restart sshd

# Unattended Upgrades aktivieren
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

---

## Teil 7: Backup-Strategie

### Automatische Backups einrichten

Erstellen Sie ein tägliches Backup-Skript:

```bash
sudo nano /usr/local/bin/backup-website.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/website-daily"
TIMESTAMP=$(date '+%Y-%m-%d')

mkdir -p $BACKUP_DIR

# Website Backup
tar -czf $BACKUP_DIR/website-$TIMESTAMP.tar.gz /var/www/biene-dienstleistung

# Nginx Config Backup
tar -czf $BACKUP_DIR/nginx-config-$TIMESTAMP.tar.gz /etc/nginx

# SSL Certificates Backup
tar -czf $BACKUP_DIR/ssl-$TIMESTAMP.tar.gz /etc/letsencrypt

# Alte Backups löschen (älter als 30 Tage)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

```bash
# Ausführbar machen
sudo chmod +x /usr/local/bin/backup-website.sh

# Cronjob einrichten (täglich um 2 Uhr nachts)
sudo crontab -e
# Fügen Sie hinzu:
0 2 * * * /usr/local/bin/backup-website.sh
```

---

## Teil 8: Performance-Optimierung

### Nginx-Cache für statische Assets

Die Nginx-Konfiguration ist bereits optimiert mit:

- **Gzip-Kompression** für alle Textdateien
- **Browser-Caching** (1 Jahr für Assets)
- **Hotlink-Protection** für Bilder
- **Rate Limiting** gegen DoS

### Monitoring einrichten (Optional)

**UptimeRobot** (kostenlos):
1. Registrieren Sie sich: https://uptimerobot.com
2. Fügen Sie Monitor hinzu: https://biene-dienstleistung.de
3. Benachrichtigungen per E-Mail

**Netdata** (Server-Monitoring):
```bash
# Netdata installieren
bash <(curl -Ss https://get.netdata.cloud/kickstart.sh)

# Zugriff über: http://YOUR_VPS_IP:19999
```

---

## Teil 9: Wichtige Dateipfade

| Zweck | Pfad |
|-------|------|
| Website Root | `/var/www/biene-dienstleistung` |
| Build Output | `/var/www/biene-dienstleistung/dist` |
| Nginx Config | `/etc/nginx/sites-available/biene-dienstleistung.de` |
| SSL Certificates | `/etc/letsencrypt/live/biene-dienstleistung.de/` |
| Update Script | `/home/deploy/update.sh` |
| Update Logs | `/var/log/biene-dienstleistung-updates.log` |
| Nginx Access Log | `/var/log/nginx/biene-dienstleistung.access.log` |
| Nginx Error Log | `/var/log/nginx/biene-dienstleistung.error.log` |
| Backups | `/var/backups/biene-dienstleistung/` |

---

## Teil 10: Häufige Aufgaben

### .env-Datei aktualisieren

```bash
cd /var/www/biene-dienstleistung
nano .env
# Nach Änderungen:
./update.sh
```

### Nginx-Konfiguration ändern

```bash
sudo nano /etc/nginx/sites-available/biene-dienstleistung.de
sudo nginx -t  # Test
sudo systemctl reload nginx  # Anwenden
```

### Domain hinzufügen (z.B. Subdomain)

```bash
sudo nano /etc/nginx/sites-available/biene-dienstleistung.de
# Fügen Sie in server_name hinzu: subdomain.biene-dienstleistung.de
sudo nginx -t
sudo certbot --nginx -d subdomain.biene-dienstleistung.de
sudo systemctl reload nginx
```

### Git-Branch wechseln

```bash
cd /var/www/biene-dienstleistung
git checkout develop  # Oder anderer Branch
npm install
npm run build
sudo systemctl reload nginx
```

---

## Support und Kontakt

Bei Problemen:

1. **Logs überprüfen** (siehe Teil 4)
2. **Fehlerbehebung** durchgehen (siehe Teil 5)
3. **GitHub Issues** öffnen für spezifische Probleme

---

## Lizenz und Credits

Dieses Deployment-Setup wurde erstellt für **Biene Dienstleistung**.

**Verwendete Technologien:**
- Ubuntu 22.04 LTS
- Nginx (High-Performance Webserver)
- Let's Encrypt / Certbot (SSL)
- Node.js 20 LTS
- React + Vite
- UFW Firewall
- Fail2ban (Intrusion Prevention)

---

**Version**: 1.0.0
**Letzte Aktualisierung**: 2025-12-03
**Autor**: Deployment Automation Specialist
