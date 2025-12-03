#!/bin/bash
# =============================================================================
# VPS MONATLICHES WARTUNGSSKRIPT
# =============================================================================
# Dieses Skript führt alle wichtigen monatlichen Wartungsarbeiten durch:
# - System-Updates & Sicherheitspatches
# - SSL-Zertifikat-Prüfung & Erneuerung
# - Disk-Space-Check
# - Log-Rotation & Cleanup
# - PM2/Backend Status-Check
# - Nginx Status-Check
# - Fail2ban Status
# - Sicherheits-Audit
# - Backup-Prüfung
#
# USAGE:
#   chmod +x maintenance.sh
#   sudo ./maintenance.sh
#
# AUTOMATISIERUNG (1x pro Monat):
#   sudo crontab -e
#   0 3 1 * * /var/www/biene-dienstleistung/maintenance.sh >> /var/log/maintenance.log 2>&1
#
# =============================================================================

set -e

# === KONFIGURATION ===
DOMAIN="biene-dienstleistung.de"
PROJECT_PATH="/var/www/biene-dienstleistung"
LOG_FILE="/var/log/vps-maintenance.log"
REPORT_FILE="/tmp/maintenance-report-$(date +%Y%m%d).txt"
ADMIN_EMAIL="kaan2406@hotmail.com"
MIN_DISK_SPACE_GB=5
SSL_WARN_DAYS=14

# === FARBEN ===
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# === VARIABLEN FÜR REPORT ===
WARNINGS=0
ERRORS=0
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# === HELPER FUNKTIONEN ===
log() {
    echo -e "$1" | tee -a "$LOG_FILE" "$REPORT_FILE"
}

log_success() {
    log "${GREEN}✓ $1${NC}"
}

log_warning() {
    log "${YELLOW}⚠ $1${NC}"
    ((WARNINGS++))
}

log_error() {
    log "${RED}✗ $1${NC}"
    ((ERRORS++))
}

log_info() {
    log "${BLUE}ℹ $1${NC}"
}

log_section() {
    log "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${BLUE}  $1${NC}"
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# === ROOT CHECK ===
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}Dieses Skript muss als root ausgeführt werden!${NC}"
   echo "Verwendung: sudo ./maintenance.sh"
   exit 1
fi

# === REPORT INITIALISIEREN ===
echo "" > "$REPORT_FILE"
log "╔════════════════════════════════════════════════════════════════════╗"
log "║          VPS MONATLICHES WARTUNGSPROTOKOLL                        ║"
log "║          $DOMAIN                                          ║"
log "║          Datum: $TIMESTAMP                          ║"
log "╚════════════════════════════════════════════════════════════════════╝"

# =============================================================================
# 1. SYSTEM-INFORMATIONEN
# =============================================================================
log_section "1. SYSTEM-INFORMATIONEN"

# OS Version
OS_VERSION=$(lsb_release -d 2>/dev/null | cut -f2 || cat /etc/os-release | grep PRETTY_NAME | cut -d'"' -f2)
log_info "Betriebssystem: $OS_VERSION"

# Kernel
KERNEL=$(uname -r)
log_info "Kernel: $KERNEL"

# Uptime
UPTIME=$(uptime -p)
log_info "Laufzeit: $UPTIME"

# Last reboot
LAST_REBOOT=$(who -b | awk '{print $3, $4}')
log_info "Letzter Neustart: $LAST_REBOOT"

# CPU Load
LOAD=$(cat /proc/loadavg | awk '{print $1, $2, $3}')
log_info "CPU Load (1/5/15 min): $LOAD"

# Memory
MEM_TOTAL=$(free -h | awk '/^Mem:/ {print $2}')
MEM_USED=$(free -h | awk '/^Mem:/ {print $3}')
MEM_PERCENT=$(free | awk '/^Mem:/ {printf "%.1f", $3/$2 * 100}')
log_info "RAM: $MEM_USED / $MEM_TOTAL ($MEM_PERCENT%)"

if (( $(echo "$MEM_PERCENT > 90" | bc -l) )); then
    log_warning "RAM-Auslastung ist über 90%!"
fi

# =============================================================================
# 2. DISK SPACE CHECK
# =============================================================================
log_section "2. FESTPLATTEN-PRÜFUNG"

DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
DISK_AVAIL=$(df -h / | awk 'NR==2 {print $4}')
DISK_TOTAL=$(df -h / | awk 'NR==2 {print $2}')

log_info "Festplatte: $DISK_USAGE% belegt ($DISK_AVAIL frei von $DISK_TOTAL)"

if [ "$DISK_USAGE" -gt 90 ]; then
    log_error "KRITISCH: Festplatte ist zu $DISK_USAGE% voll!"
elif [ "$DISK_USAGE" -gt 80 ]; then
    log_warning "Festplatte ist zu $DISK_USAGE% voll - Cleanup empfohlen"
else
    log_success "Festplattenplatz ist ausreichend"
fi

# Größte Verzeichnisse anzeigen
log_info "Größte Verzeichnisse in /var:"
du -sh /var/* 2>/dev/null | sort -rh | head -5 | while read line; do
    log "    $line"
done

# =============================================================================
# 3. SYSTEM-UPDATES
# =============================================================================
log_section "3. SYSTEM-UPDATES"

log_info "Aktualisiere Paketlisten..."
apt update -qq 2>&1 | tee -a "$LOG_FILE"

# Verfügbare Updates zählen
UPDATES_AVAIL=$(apt list --upgradable 2>/dev/null | grep -c upgradable || echo "0")

if [ "$UPDATES_AVAIL" -gt 0 ]; then
    log_warning "$UPDATES_AVAIL Pakete können aktualisiert werden"

    log_info "Installiere Updates..."
    DEBIAN_FRONTEND=noninteractive apt upgrade -y -qq 2>&1 | tee -a "$LOG_FILE"

    log_success "System-Updates installiert"
else
    log_success "System ist aktuell - keine Updates verfügbar"
fi

# Sicherheitsupdates prüfen
log_info "Prüfe Sicherheitsupdates..."
SECURITY_UPDATES=$(apt list --upgradable 2>/dev/null | grep -i security | wc -l || echo "0")
if [ "$SECURITY_UPDATES" -gt 0 ]; then
    log_warning "$SECURITY_UPDATES Sicherheitsupdates noch ausstehend"
else
    log_success "Alle Sicherheitsupdates installiert"
fi

# =============================================================================
# 4. SSL-ZERTIFIKAT PRÜFUNG
# =============================================================================
log_section "4. SSL-ZERTIFIKAT"

if command -v certbot &> /dev/null; then
    # Zertifikat-Ablaufdatum prüfen
    CERT_FILE="/etc/letsencrypt/live/$DOMAIN/fullchain.pem"

    if [ -f "$CERT_FILE" ]; then
        EXPIRY_DATE=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)
        EXPIRY_EPOCH=$(date -d "$EXPIRY_DATE" +%s)
        NOW_EPOCH=$(date +%s)
        DAYS_LEFT=$(( ($EXPIRY_EPOCH - $NOW_EPOCH) / 86400 ))

        log_info "SSL-Zertifikat läuft ab am: $EXPIRY_DATE"
        log_info "Verbleibende Tage: $DAYS_LEFT"

        if [ "$DAYS_LEFT" -lt "$SSL_WARN_DAYS" ]; then
            log_warning "SSL-Zertifikat läuft in weniger als $SSL_WARN_DAYS Tagen ab!"
            log_info "Versuche Erneuerung..."
            certbot renew --quiet 2>&1 | tee -a "$LOG_FILE"
        else
            log_success "SSL-Zertifikat ist gültig ($DAYS_LEFT Tage)"
        fi
    else
        log_error "SSL-Zertifikat nicht gefunden: $CERT_FILE"
    fi

    # Certbot Auto-Renewal Timer prüfen
    if systemctl is-active --quiet certbot.timer; then
        log_success "Certbot Auto-Renewal Timer ist aktiv"
    else
        log_warning "Certbot Auto-Renewal Timer ist nicht aktiv!"
        systemctl enable certbot.timer
        systemctl start certbot.timer
    fi
else
    log_warning "Certbot ist nicht installiert"
fi

# =============================================================================
# 5. NGINX STATUS
# =============================================================================
log_section "5. NGINX WEBSERVER"

if systemctl is-active --quiet nginx; then
    log_success "Nginx läuft"

    # Nginx Konfiguration testen
    if nginx -t 2>&1 | grep -q "successful"; then
        log_success "Nginx Konfiguration ist valide"
    else
        log_error "Nginx Konfiguration hat Fehler!"
        nginx -t 2>&1 | tee -a "$LOG_FILE"
    fi

    # Nginx Version
    NGINX_VERSION=$(nginx -v 2>&1 | cut -d'/' -f2)
    log_info "Nginx Version: $NGINX_VERSION"
else
    log_error "Nginx ist nicht aktiv!"
    systemctl start nginx
fi

# Website erreichbar?
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    log_success "Website ist erreichbar (HTTP $HTTP_CODE)"
else
    log_error "Website nicht erreichbar! HTTP Code: $HTTP_CODE"
fi

# =============================================================================
# 6. PM2 / BACKEND STATUS
# =============================================================================
log_section "6. BACKEND API (PM2)"

if command -v pm2 &> /dev/null; then
    # PM2 Prozesse prüfen
    PM2_STATUS=$(pm2 jlist 2>/dev/null)

    if echo "$PM2_STATUS" | grep -q "biene-api"; then
        PM2_ONLINE=$(echo "$PM2_STATUS" | grep -o '"status":"online"' | wc -l)

        if [ "$PM2_ONLINE" -gt 0 ]; then
            log_success "Backend API (biene-api) läuft"

            # Uptime und Memory
            pm2 show biene-api 2>/dev/null | grep -E "uptime|memory" | while read line; do
                log_info "  $line"
            done
        else
            log_error "Backend API ist nicht online!"
            log_info "Starte Backend neu..."
            pm2 restart biene-api 2>&1 | tee -a "$LOG_FILE"
        fi
    else
        log_warning "Backend API (biene-api) ist nicht konfiguriert"
    fi

    # PM2 Logs rotieren
    pm2 flush 2>/dev/null
    log_info "PM2 Logs geleert"

    # PM2 speichern
    pm2 save 2>/dev/null
else
    log_warning "PM2 ist nicht installiert"
fi

# API Health Check
API_HEALTH=$(curl -s "https://$DOMAIN/api/health" 2>/dev/null || echo '{"success":false}')
if echo "$API_HEALTH" | grep -q '"success":true'; then
    log_success "API Health Check erfolgreich"
else
    log_error "API Health Check fehlgeschlagen!"
fi

# =============================================================================
# 7. SICHERHEIT
# =============================================================================
log_section "7. SICHERHEITS-CHECK"

# Fail2ban Status
if systemctl is-active --quiet fail2ban; then
    log_success "Fail2ban ist aktiv"

    # Gebannte IPs
    BANNED=$(fail2ban-client status sshd 2>/dev/null | grep "Currently banned" | awk '{print $NF}')
    log_info "Aktuell gebannte IPs (SSH): $BANNED"

    # Fail2ban Statistiken
    TOTAL_BANNED=$(fail2ban-client status sshd 2>/dev/null | grep "Total banned" | awk '{print $NF}')
    log_info "Insgesamt gebannt (SSH): $TOTAL_BANNED"
else
    log_error "Fail2ban ist nicht aktiv!"
    systemctl start fail2ban
fi

# UFW Firewall Status
if command -v ufw &> /dev/null; then
    UFW_STATUS=$(ufw status | head -1)
    if echo "$UFW_STATUS" | grep -q "active"; then
        log_success "UFW Firewall ist aktiv"
    else
        log_warning "UFW Firewall ist nicht aktiv!"
    fi
fi

# SSH Brute-Force Versuche (letzte 24h)
SSH_FAILURES=$(journalctl -u sshd --since "24 hours ago" 2>/dev/null | grep -c "Failed password" || echo "0")
log_info "SSH Fehlversuche (24h): $SSH_FAILURES"

if [ "$SSH_FAILURES" -gt 100 ]; then
    log_warning "Hohe Anzahl an SSH-Angriffen ($SSH_FAILURES)"
fi

# Offene Ports prüfen
log_info "Offene Ports:"
ss -tlnp | grep LISTEN | awk '{print $4}' | while read port; do
    log "    $port"
done

# =============================================================================
# 8. LOG CLEANUP
# =============================================================================
log_section "8. LOG-BEREINIGUNG"

# Alte Logs löschen (älter als 30 Tage)
log_info "Lösche Logs älter als 30 Tage..."
find /var/log -type f -name "*.log" -mtime +30 -delete 2>/dev/null
find /var/log -type f -name "*.gz" -mtime +30 -delete 2>/dev/null

# Journal Logs bereinigen
JOURNAL_SIZE_BEFORE=$(journalctl --disk-usage 2>/dev/null | awk '{print $7}')
journalctl --vacuum-time=30d --quiet 2>/dev/null
JOURNAL_SIZE_AFTER=$(journalctl --disk-usage 2>/dev/null | awk '{print $7}')
log_info "Journal Logs: $JOURNAL_SIZE_BEFORE -> $JOURNAL_SIZE_AFTER"

# APT Cache leeren
apt clean -qq 2>/dev/null
apt autoremove -y -qq 2>/dev/null
log_success "APT Cache und nicht benötigte Pakete bereinigt"

# Alte Backups aufräumen (behalte letzte 5)
if [ -d "/var/backups/biene-dienstleistung" ]; then
    BACKUP_COUNT=$(ls -1 /var/backups/biene-dienstleistung/*.tar.gz 2>/dev/null | wc -l)
    if [ "$BACKUP_COUNT" -gt 5 ]; then
        cd /var/backups/biene-dienstleistung
        ls -t *.tar.gz | tail -n +6 | xargs rm -f 2>/dev/null
        log_info "Alte Backups bereinigt (behalte letzte 5)"
    fi
fi

# Temporäre Dateien
rm -rf /tmp/* 2>/dev/null
log_success "Temporäre Dateien gelöscht"

# =============================================================================
# 9. BACKUP-PRÜFUNG
# =============================================================================
log_section "9. BACKUP-STATUS"

BACKUP_DIR="/var/backups/biene-dienstleistung"

if [ -d "$BACKUP_DIR" ]; then
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/*.tar.gz 2>/dev/null | head -1)

    if [ -n "$LATEST_BACKUP" ]; then
        BACKUP_DATE=$(stat -c %y "$LATEST_BACKUP" | cut -d' ' -f1)
        BACKUP_SIZE=$(du -h "$LATEST_BACKUP" | cut -f1)

        log_info "Letztes Backup: $BACKUP_DATE ($BACKUP_SIZE)"

        # Prüfen ob Backup älter als 7 Tage
        BACKUP_AGE=$(( ($(date +%s) - $(stat -c %Y "$LATEST_BACKUP")) / 86400 ))
        if [ "$BACKUP_AGE" -gt 7 ]; then
            log_warning "Letztes Backup ist $BACKUP_AGE Tage alt!"
        else
            log_success "Backup ist aktuell ($BACKUP_AGE Tage alt)"
        fi
    else
        log_warning "Keine Backups gefunden!"
    fi
else
    log_warning "Backup-Verzeichnis existiert nicht"
fi

# =============================================================================
# 10. ZUSAMMENFASSUNG
# =============================================================================
log_section "10. ZUSAMMENFASSUNG"

# Finaler Disk Check nach Cleanup
DISK_USAGE_AFTER=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
DISK_FREED=$((DISK_USAGE - DISK_USAGE_AFTER))

log_info "Festplatte nach Cleanup: $DISK_USAGE_AFTER% belegt"
if [ "$DISK_FREED" -gt 0 ]; then
    log_success "$DISK_FREED% Speicherplatz freigegeben"
fi

log ""
log "╔════════════════════════════════════════════════════════════════════╗"
log "║                    WARTUNGS-ERGEBNIS                              ║"
log "╠════════════════════════════════════════════════════════════════════╣"

if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    log "║  ${GREEN}STATUS: ALLES IN ORDNUNG ✓${NC}                                      ║"
elif [ "$ERRORS" -eq 0 ]; then
    log "║  ${YELLOW}STATUS: $WARNINGS WARNUNGEN${NC}                                          ║"
else
    log "║  ${RED}STATUS: $ERRORS FEHLER, $WARNINGS WARNUNGEN${NC}                              ║"
fi

log "║                                                                    ║"
log "║  Fehler:    $ERRORS                                                     ║"
log "║  Warnungen: $WARNINGS                                                     ║"
log "║  Zeitpunkt: $TIMESTAMP                          ║"
log "╚════════════════════════════════════════════════════════════════════╝"
log ""

# =============================================================================
# REPORT SPEICHERN
# =============================================================================
cp "$REPORT_FILE" "$PROJECT_PATH/maintenance-report-$(date +%Y%m).txt" 2>/dev/null

log_info "Wartungsprotokoll gespeichert: $PROJECT_PATH/maintenance-report-$(date +%Y%m).txt"
log_info "Vollständiges Log: $LOG_FILE"

# =============================================================================
# HTML E-MAIL REPORT VERSAND
# =============================================================================
if [ -f "$PROJECT_PATH/server/src/maintenance-report.ts" ]; then
    log_info "Sende HTML-Wartungsbericht per E-Mail..."
    cd "$PROJECT_PATH/server"

    # Prüfe ob Node.js und npx verfügbar sind
    if command -v npx &> /dev/null; then
        # Installiere tsx falls nicht vorhanden
        if ! npx tsx --version &> /dev/null 2>&1; then
            npm install -g tsx 2>/dev/null || npm install tsx 2>/dev/null
        fi

        # Sende HTML E-Mail Report
        if npx tsx src/maintenance-report.ts "$REPORT_FILE" "$ADMIN_EMAIL" 2>&1 | tee -a "$LOG_FILE"; then
            log_success "HTML-Wartungsbericht per E-Mail gesendet"
        else
            log_warning "E-Mail-Versand fehlgeschlagen (SMTP-Konfiguration prüfen)"
        fi
    else
        log_warning "npx nicht gefunden - E-Mail-Versand übersprungen"
    fi

    cd "$PROJECT_PATH"
else
    log_info "Kein E-Mail-Report-Skript gefunden - überspringe E-Mail-Versand"
fi

echo ""
echo -e "${GREEN}Wartung abgeschlossen!${NC}"
echo ""
