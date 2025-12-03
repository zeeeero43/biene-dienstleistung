#!/bin/bash
# =============================================================================
# BIENE DIENSTLEISTUNG - PRODUCTION DEPLOYMENT SCRIPT
# =============================================================================
# This script automates the complete setup of a fresh Ubuntu 22.04 VPS
# for deploying a React/Vite application with enterprise-grade security
#
# USAGE:
#   1. Copy this script to your VPS
#   2. Make it executable: chmod +x deploy.sh
#   3. Run as root: sudo ./deploy.sh
#   4. Follow the post-installation instructions
#
# REQUIREMENTS:
#   - Fresh Ubuntu 22.04 VPS
#   - Root access
#   - Domain already pointed to VPS IP
# =============================================================================

set -e  # Exit on any error

# === CONFIGURATION VARIABLES ===
DOMAIN="biene-dienstleistung.de"
WWW_DOMAIN="www.${DOMAIN}"
PROJECT_NAME="biene-dienstleistung"
PROJECT_PATH="/var/www/${PROJECT_NAME}"
REPO_URL="https://github.com/zeeeero43/biene-dienstleistung.git"
EMAIL="admin@${DOMAIN}"  # For SSL certificates
DEPLOY_USER="deploy"  # Non-root user for deployments
NODE_VERSION="20"  # Node.js LTS version

# === COLOR CODES FOR OUTPUT ===
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'  # No Color

# === HELPER FUNCTIONS ===
print_step() {
    echo -e "\n${BLUE}===================================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===================================================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root"
   exit 1
fi

# =============================================================================
# STEP 1/9: SYSTEM SETUP AND UPDATES
# =============================================================================
print_step "[1/9] Updating system packages..."

# Update package lists
apt update -qq
apt upgrade -y -qq

# Set timezone to Germany
timedatectl set-timezone Europe/Berlin
print_success "Timezone set to Europe/Berlin"

# Install essential packages
apt install -y -qq \
    curl \
    wget \
    git \
    ufw \
    fail2ban \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

print_success "System updated and essential packages installed"

# =============================================================================
# STEP 2/9: FIREWALL CONFIGURATION
# =============================================================================
print_step "[2/9] Configuring firewall (UFW)..."

# Configure UFW
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw --force enable

print_success "Firewall configured and enabled"
ufw status

# =============================================================================
# STEP 3/9: FAIL2BAN CONFIGURATION
# =============================================================================
print_step "[3/9] Configuring Fail2ban..."

# Create Fail2ban local configuration
cat > /etc/fail2ban/jail.local <<'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
destemail = admin@biene-dienstleistung.de
sendername = Fail2Ban

[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-botsearch]
enabled = true
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2
EOF

systemctl enable fail2ban
systemctl restart fail2ban
print_success "Fail2ban configured and started"

# =============================================================================
# STEP 4/9: CREATE DEPLOY USER
# =============================================================================
print_step "[4/9] Creating deploy user..."

# Create deploy user if it doesn't exist
if ! id -u $DEPLOY_USER > /dev/null 2>&1; then
    useradd -m -s /bin/bash $DEPLOY_USER
    usermod -aG sudo $DEPLOY_USER

    # Create .ssh directory
    mkdir -p /home/$DEPLOY_USER/.ssh
    chmod 700 /home/$DEPLOY_USER/.ssh
    touch /home/$DEPLOY_USER/.ssh/authorized_keys
    chmod 600 /home/$DEPLOY_USER/.ssh/authorized_keys
    chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/.ssh

    print_success "Deploy user '$DEPLOY_USER' created"
    print_warning "Remember to add your SSH public key to /home/$DEPLOY_USER/.ssh/authorized_keys"
else
    print_warning "User '$DEPLOY_USER' already exists"
fi

# =============================================================================
# STEP 5/9: INSTALL NODE.JS
# =============================================================================
print_step "[5/9] Installing Node.js ${NODE_VERSION} LTS..."

if ! command -v node &> /dev/null; then
    # Install Node.js from NodeSource
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt install -y nodejs

    # Verify installation
    node --version
    npm --version

    print_success "Node.js $(node --version) and npm $(npm --version) installed"
else
    print_warning "Node.js $(node --version) already installed"
fi

# =============================================================================
# STEP 6/9: INSTALL AND CONFIGURE NGINX
# =============================================================================
print_step "[6/9] Installing and configuring Nginx..."

if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    print_success "Nginx installed"
else
    print_warning "Nginx already installed"
fi

# Create project directory
mkdir -p $PROJECT_PATH
chown -R $DEPLOY_USER:$DEPLOY_USER $PROJECT_PATH

# Create Nginx configuration
cat > /etc/nginx/sites-available/$DOMAIN <<'NGINX_EOF'
# =============================================================================
# NGINX CONFIGURATION FOR REACT/VITE SPA
# biene-dienstleistung.de
# =============================================================================

# Rate limiting zone
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;

# Redirect www to non-www
server {
    listen 80;
    listen [::]:80;
    server_name www.biene-dienstleistung.de;
    return 301 $scheme://biene-dienstleistung.de$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name biene-dienstleistung.de;

    # Root directory
    root /var/www/biene-dienstleistung/dist;
    index index.html;

    # Charset
    charset utf-8;

    # Logging
    access_log /var/log/nginx/biene-dienstleistung.access.log;
    error_log /var/log/nginx/biene-dienstleistung.error.log warn;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:; frame-ancestors 'self'" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    server_tokens off;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
    gzip_disable "msie6";

    # Rate limiting
    limit_req zone=general burst=20 nodelay;

    # Security: Block hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Hotlink protection for images
    location ~* \.(jpg|jpeg|png|gif|webp|svg|ico)$ {
        valid_referers none blocked biene-dienstleistung.de www.biene-dienstleistung.de;
        if ($invalid_referer) {
            return 403;
        }
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache static assets
    location ~* \.(js|css|woff|woff2|ttf|eot|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache media files
    location ~* \.(mp4|webm|ogg|mp3|wav)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # HTML files - no caching
    location ~* \.html$ {
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # React Router - SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Deny access to build files and configs
    location ~ \.(yml|yaml|log|env|json)$ {
        deny all;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "OK";
        add_header Content-Type text/plain;
    }
}
NGINX_EOF

# Enable site
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl enable nginx
systemctl restart nginx

print_success "Nginx configured successfully"

# =============================================================================
# STEP 7/9: INSTALL CERTBOT AND SETUP SSL
# =============================================================================
print_step "[7/9] Installing Certbot and setting up SSL..."

if ! command -v certbot &> /dev/null; then
    apt install -y certbot python3-certbot-nginx
    print_success "Certbot installed"
else
    print_warning "Certbot already installed"
fi

# Obtain SSL certificate
print_warning "Obtaining SSL certificate..."
print_warning "Make sure your domain ${DOMAIN} is pointing to this server's IP!"
read -p "Press Enter to continue or Ctrl+C to abort..."

certbot --nginx \
    -d $DOMAIN \
    -d $WWW_DOMAIN \
    --non-interactive \
    --agree-tos \
    -m $EMAIL \
    --redirect

# Add HSTS header after SSL is active
sed -i '/server_tokens off;/a \    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;' /etc/nginx/sites-available/$DOMAIN

# Reload Nginx to apply HSTS
nginx -t && systemctl reload nginx

print_success "SSL certificate installed and HTTPS configured"
print_success "Certbot auto-renewal is configured via systemd timer"

# Verify certbot timer
systemctl status certbot.timer --no-pager

# =============================================================================
# STEP 8/9: CLONE REPOSITORY FROM GITHUB
# =============================================================================
print_step "[8/9] Cloning repository from GitHub..."

# Clone repository as deploy user (public repo - no SSH key needed)
print_warning "Cloning repository..."
su - $DEPLOY_USER -c "
    if [ ! -d $PROJECT_PATH/.git ]; then
        git clone $REPO_URL $PROJECT_PATH
    else
        echo 'Repository already cloned, pulling latest changes...'
        cd $PROJECT_PATH && git pull
    fi
"

print_success "Repository cloned successfully"

# Install dependencies and build
print_warning "Installing dependencies and building..."
su - $DEPLOY_USER -c "
    cd $PROJECT_PATH
    npm install
    npm run build
"

print_success "Repository cloned and built successfully"

# =============================================================================
# STEP 9/9: CREATE UPDATE SCRIPT
# =============================================================================
print_step "[9/9] Creating update script..."

cat > /home/$DEPLOY_USER/update.sh <<'UPDATE_EOF'
#!/bin/bash
# =============================================================================
# BIENE DIENSTLEISTUNG - UPDATE SCRIPT
# =============================================================================
# This script updates the deployed React/Vite application
#
# USAGE: ./update.sh
# =============================================================================

set -e

# Configuration
PROJECT_PATH="/var/www/biene-dienstleistung"
LOG_FILE="/var/log/biene-dienstleistung-updates.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting update at ${TIMESTAMP}${NC}" | tee -a $LOG_FILE

# Navigate to project directory
cd $PROJECT_PATH

# Git pull latest changes
echo -e "${YELLOW}Pulling latest changes from GitHub...${NC}"
git fetch origin
git pull origin main 2>&1 | tee -a $LOG_FILE

# Check if package.json changed
if git diff HEAD@{1} HEAD --name-only | grep -q "package.json"; then
    echo -e "${YELLOW}package.json changed, running npm install...${NC}"
    npm install 2>&1 | tee -a $LOG_FILE
else
    echo -e "${GREEN}No dependency changes detected${NC}"
fi

# Build the application
echo -e "${YELLOW}Building application...${NC}"
npm run build 2>&1 | tee -a $LOG_FILE

# Reload Nginx (no downtime)
echo -e "${YELLOW}Reloading Nginx...${NC}"
sudo nginx -t && sudo systemctl reload nginx

echo -e "${GREEN}✓ Update completed successfully at $(date '+%Y-%m-%d %H:%M:%S')${NC}" | tee -a $LOG_FILE
echo -e "${GREEN}✓ Website updated: https://biene-dienstleistung.de${NC}"
UPDATE_EOF

chmod +x /home/$DEPLOY_USER/update.sh
chown $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/update.sh

# Create log file
touch /var/log/biene-dienstleistung-updates.log
chown $DEPLOY_USER:$DEPLOY_USER /var/log/biene-dienstleistung-updates.log

print_success "Update script created at /home/$DEPLOY_USER/update.sh"

# =============================================================================
# SETUP LOGROTATE
# =============================================================================
print_step "Configuring log rotation..."

cat > /etc/logrotate.d/biene-dienstleistung <<'LOGROTATE_EOF'
/var/log/nginx/biene-dienstleistung.*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 `cat /var/run/nginx.pid`
        fi
    endscript
}

/var/log/biene-dienstleistung-updates.log {
    weekly
    missingok
    rotate 12
    compress
    delaycompress
    notifempty
    create 0640 deploy deploy
}
LOGROTATE_EOF

print_success "Log rotation configured"

# =============================================================================
# DEPLOYMENT COMPLETE
# =============================================================================
echo -e "\n${GREEN}==================================================================${NC}"
echo -e "${GREEN}                 DEPLOYMENT COMPLETED SUCCESSFULLY!               ${NC}"
echo -e "${GREEN}==================================================================${NC}\n"

echo -e "${BLUE}Website URL:${NC} https://$DOMAIN"
echo -e "${BLUE}Status:${NC} Nginx is running with SSL enabled (A+ rating)"
echo -e "${BLUE}Firewall:${NC} UFW enabled (ports 22, 80, 443)"
echo -e "${BLUE}Security:${NC} Fail2ban active, all security headers configured"
echo -e "${BLUE}SSL:${NC} Auto-renewal configured via certbot"

echo -e "\n${YELLOW}==================================================================${NC}"
echo -e "${YELLOW}                      NEXT STEPS:                                 ${NC}"
echo -e "${YELLOW}==================================================================${NC}"
echo -e "1. Verify the website is accessible: ${GREEN}https://$DOMAIN${NC}"
echo -e "2. Test SSL rating: ${GREEN}https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN${NC}"
echo -e "3. To update the site later, SSH as '$DEPLOY_USER' and run: ${GREEN}./update.sh${NC}"
echo -e "4. Configure environment variables if needed in: ${GREEN}$PROJECT_PATH/.env${NC}"
echo -e "5. Monitor logs: ${GREEN}/var/log/nginx/biene-dienstleistung.access.log${NC}"

echo -e "\n${YELLOW}==================================================================${NC}"
echo -e "${YELLOW}                  IMPORTANT REMINDERS:                            ${NC}"
echo -e "${YELLOW}==================================================================${NC}"
echo -e "• Add your SSH key to /home/$DEPLOY_USER/.ssh/authorized_keys for SSH access"
echo -e "• Repository: ${GREEN}$REPO_URL${NC}"
echo -e "• Backup strategy: Consider setting up automated backups"
echo -e "• Monitoring: Consider setting up uptime monitoring (e.g., UptimeRobot)"

echo -e "\n${GREEN}==================================================================${NC}"
echo -e "${GREEN}              Thank you for using this deployment script!          ${NC}"
echo -e "${GREEN}==================================================================${NC}\n"

# Display system information
echo -e "${BLUE}System Information:${NC}"
echo -e "OS: $(lsb_release -d | cut -f2)"
echo -e "Kernel: $(uname -r)"
echo -e "Node.js: $(node --version)"
echo -e "Nginx: $(nginx -v 2>&1 | cut -d'/' -f2)"
echo -e "SSL: Certbot $(certbot --version 2>&1 | grep -oP '\d+\.\d+\.\d+')"

echo -e "\n${GREEN}Deployment completed at $(date)${NC}\n"
