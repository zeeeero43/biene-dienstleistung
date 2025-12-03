#!/bin/bash
# =============================================================================
# BIENE DIENSTLEISTUNG - UPDATE SCRIPT
# =============================================================================
# This script updates the deployed React/Vite application with zero downtime
#
# USAGE:
#   1. SSH into your VPS as the deploy user
#   2. Run: ./update.sh
#
# FEATURES:
#   - Git pull from main branch
#   - Automatic dependency installation if package.json changed
#   - Production build
#   - Nginx reload (zero downtime)
#   - Detailed logging with timestamps
#   - Rollback support
# =============================================================================

set -e

# === CONFIGURATION ===
PROJECT_PATH="/var/www/biene-dienstleistung"
LOG_FILE="/var/log/biene-dienstleistung-updates.log"
BACKUP_DIR="/var/backups/biene-dienstleistung"
TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')

# === COLORS ===
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# === HELPER FUNCTIONS ===
log() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

log_success() {
    log "${GREEN}✓ $1${NC}"
}

log_error() {
    log "${RED}✗ $1${NC}"
}

log_warning() {
    log "${YELLOW}⚠ $1${NC}"
}

log_info() {
    log "${BLUE}ℹ $1${NC}"
}

# Check if running from correct directory
if [ ! -d "$PROJECT_PATH" ]; then
    log_error "Project directory not found: $PROJECT_PATH"
    exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# =============================================================================
# START UPDATE PROCESS
# =============================================================================
log_info "================================================================="
log_info "Starting deployment update at $(date '+%Y-%m-%d %H:%M:%S')"
log_info "================================================================="

# Navigate to project directory
cd "$PROJECT_PATH"

# =============================================================================
# STEP 1: BACKUP CURRENT BUILD
# =============================================================================
log_info "[1/8] Creating backup of current build..."

if [ -d "$PROJECT_PATH/dist" ]; then
    tar -czf "$BACKUP_DIR/dist-backup-$TIMESTAMP.tar.gz" -C "$PROJECT_PATH" dist
    log_success "Backup created: $BACKUP_DIR/dist-backup-$TIMESTAMP.tar.gz"

    # Keep only last 5 backups
    cd "$BACKUP_DIR"
    ls -t dist-backup-*.tar.gz | tail -n +6 | xargs -r rm
    cd "$PROJECT_PATH"
    log_info "Old backups cleaned, keeping last 5"
else
    log_warning "No dist directory found, skipping backup"
fi

# =============================================================================
# STEP 2: CHECK GIT STATUS
# =============================================================================
log_info "[2/8] Checking Git status..."

# Fetch latest changes
git fetch origin 2>&1 | tee -a "$LOG_FILE"

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
log_info "Current branch: $CURRENT_BRANCH"

# Check if there are updates
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})

if [ "$LOCAL" = "$REMOTE" ]; then
    log_warning "Already up to date. No changes to deploy."
    echo -e "\n${YELLOW}Do you want to rebuild anyway? (y/N)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        log_info "Update cancelled by user"
        exit 0
    fi
fi

# =============================================================================
# STEP 3: PULL LATEST CHANGES
# =============================================================================
log_info "[3/8] Pulling latest changes from GitHub..."

BEFORE_COMMIT=$(git rev-parse HEAD)
git pull origin "$CURRENT_BRANCH" 2>&1 | tee -a "$LOG_FILE"
AFTER_COMMIT=$(git rev-parse HEAD)

if [ "$BEFORE_COMMIT" != "$AFTER_COMMIT" ]; then
    log_success "Updated from $BEFORE_COMMIT to $AFTER_COMMIT"

    # Show commit messages
    log_info "Recent changes:"
    git log --oneline -5 | tee -a "$LOG_FILE"
else
    log_info "No new commits"
fi

# =============================================================================
# STEP 4: INSTALL DEPENDENCIES (FRONTEND + BACKEND)
# =============================================================================
log_info "[4/8] Checking dependencies..."

# Frontend dependencies
if [ "$BEFORE_COMMIT" != "$AFTER_COMMIT" ]; then
    if git diff "$BEFORE_COMMIT" "$AFTER_COMMIT" --name-only | grep -qE "^package(-lock)?\.json"; then
        log_warning "Frontend dependencies changed, running npm install..."
        npm install 2>&1 | tee -a "$LOG_FILE"
        log_success "Frontend dependencies updated"
    else
        log_info "No frontend dependency changes detected"
    fi
else
    log_info "Skipping frontend dependency check (no new commits)"
fi

# Backend dependencies
if [ -d "$PROJECT_PATH/server" ]; then
    if [ "$BEFORE_COMMIT" != "$AFTER_COMMIT" ]; then
        if git diff "$BEFORE_COMMIT" "$AFTER_COMMIT" --name-only | grep -qE "^server/package(-lock)?\.json"; then
            log_warning "Backend dependencies changed, running npm install..."
            cd "$PROJECT_PATH/server"
            npm install 2>&1 | tee -a "$LOG_FILE"
            cd "$PROJECT_PATH"
            log_success "Backend dependencies updated"
        else
            log_info "No backend dependency changes detected"
        fi
    fi
fi

# =============================================================================
# STEP 5: BUILD FRONTEND
# =============================================================================
log_info "[5/8] Building frontend..."

# Clean previous build
if [ -d "$PROJECT_PATH/dist" ]; then
    rm -rf "$PROJECT_PATH/dist"
    log_info "Previous frontend build cleaned"
fi

# Build with production optimizations
log_info "Running: npm run build"
BUILD_START=$(date +%s)

if npm run build 2>&1 | tee -a "$LOG_FILE"; then
    BUILD_END=$(date +%s)
    BUILD_TIME=$((BUILD_END - BUILD_START))
    log_success "Frontend build completed in ${BUILD_TIME} seconds"

    # Verify build output
    if [ ! -d "$PROJECT_PATH/dist" ] || [ -z "$(ls -A $PROJECT_PATH/dist)" ]; then
        log_error "Build directory is empty or missing!"
        log_error "Rolling back..."

        # Restore from backup
        if [ -f "$BACKUP_DIR/dist-backup-$TIMESTAMP.tar.gz" ]; then
            tar -xzf "$BACKUP_DIR/dist-backup-$TIMESTAMP.tar.gz" -C "$PROJECT_PATH"
            log_success "Backup restored"
        fi

        exit 1
    fi

    # Show build size
    BUILD_SIZE=$(du -sh "$PROJECT_PATH/dist" | cut -f1)
    log_info "Frontend build size: $BUILD_SIZE"
else
    log_error "Frontend build failed!"
    log_error "Rolling back..."

    # Restore from backup
    if [ -f "$BACKUP_DIR/dist-backup-$TIMESTAMP.tar.gz" ]; then
        tar -xzf "$BACKUP_DIR/dist-backup-$TIMESTAMP.tar.gz" -C "$PROJECT_PATH"
        log_success "Backup restored"
    fi

    exit 1
fi

# =============================================================================
# STEP 6: BUILD BACKEND
# =============================================================================
log_info "[6/8] Building backend..."

if [ -d "$PROJECT_PATH/server" ]; then
    cd "$PROJECT_PATH/server"

    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        log_warning "Backend node_modules not found, installing..."
        npm install 2>&1 | tee -a "$LOG_FILE"
    fi

    # Build TypeScript
    log_info "Running: npm run build (backend)"
    if npm run build 2>&1 | tee -a "$LOG_FILE"; then
        log_success "Backend build completed"
    else
        log_error "Backend build failed!"
        exit 1
    fi

    cd "$PROJECT_PATH"
else
    log_warning "No server directory found, skipping backend build"
fi

# =============================================================================
# STEP 7: RESTART PM2 (Backend API)
# =============================================================================
log_info "[7/8] Restarting PM2 backend..."

if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "biene-api"; then
        pm2 restart biene-api 2>&1 | tee -a "$LOG_FILE"
        log_success "PM2 biene-api restarted"
    else
        # Start if not running
        if [ -f "$PROJECT_PATH/server/dist/server.js" ]; then
            cd "$PROJECT_PATH/server"
            pm2 start dist/server.js --name "biene-api" --cwd "$PROJECT_PATH/server" 2>&1 | tee -a "$LOG_FILE"
            pm2 save 2>&1 | tee -a "$LOG_FILE"
            cd "$PROJECT_PATH"
            log_success "PM2 biene-api started"
        else
            log_warning "Backend server.js not found, skipping PM2"
        fi
    fi

    # Show PM2 status
    log_info "PM2 Status:"
    pm2 list
else
    log_warning "PM2 not installed, skipping backend restart"
fi

# =============================================================================
# STEP 8: RESTART NGINX
# =============================================================================
log_info "[8/8] Starting/Reloading Nginx..."

# Test Nginx configuration first
if sudo nginx -t 2>&1 | tee -a "$LOG_FILE"; then
    # Check if Nginx is running
    if systemctl is-active --quiet nginx; then
        # Reload Nginx (zero downtime)
        sudo systemctl reload nginx
        log_success "Nginx reloaded successfully"
    else
        # Start Nginx if not running
        sudo systemctl start nginx
        log_success "Nginx started successfully"
    fi
else
    log_error "Nginx configuration test failed!"
    log_warning "Please check Nginx configuration manually"
    exit 1
fi

# =============================================================================
# UPDATE COMPLETE
# =============================================================================
echo ""
log_success "================================================================="
log_success "         DEPLOYMENT UPDATE COMPLETED SUCCESSFULLY!"
log_success "================================================================="
echo ""

log_info "Update Summary:"
log_info "  - Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"
log_info "  - Branch: $CURRENT_BRANCH"
log_info "  - Commit: $AFTER_COMMIT"
log_info "  - Build Size: $BUILD_SIZE"
log_info "  - Backup: $BACKUP_DIR/dist-backup-$TIMESTAMP.tar.gz"
echo ""

log_success "Website updated: https://biene-dienstleistung.de"
echo ""

# =============================================================================
# POST-UPDATE CHECKS
# =============================================================================
log_info "Post-deployment checks:"

# Check if Nginx is running
if systemctl is-active --quiet nginx; then
    log_success "Nginx is running"
else
    log_error "Nginx is not running!"
fi

# Check disk space
DISK_USAGE=$(df -h "$PROJECT_PATH" | awk 'NR==2 {print $5}')
log_info "Disk usage: $DISK_USAGE"

if [ "${DISK_USAGE%?}" -gt 80 ]; then
    log_warning "Disk usage is above 80%! Consider cleaning up old files."
fi

# Check if website is responding
log_info "Testing website availability..."
if curl -sSf -o /dev/null -w "%{http_code}" https://biene-dienstleistung.de | grep -q "200"; then
    log_success "Website is responding with HTTP 200"
else
    log_warning "Website may not be responding correctly"
fi

echo ""
log_info "=================================================================\n"

# Display recent logs
log_info "Recent update history (last 5 updates):"
tail -50 "$LOG_FILE" | grep "DEPLOYMENT UPDATE COMPLETED" | tail -5

echo -e "\n${BLUE}Full logs available at: $LOG_FILE${NC}\n"
