#!/bin/bash
# Setup script for a Claude Code cloud environment (claude.ai/code -> environment settings -> Setup script).
# Runs as root on Ubuntu 24.04 before Claude Code starts; the result is cached for later sessions.
# Installs: ffmpeg, Chinese/Japanese/Korean fonts, Chrome for Testing (+ its system libraries).
# Node packages of the repo (playwright-core, mathjax-full) are installed by the SessionStart hook in
# .claude/settings.json, because this script does not know where the repository is.
# Every host used here is on the default "Trusted" list (archive.ubuntu.com, registry.npmjs.org,
# storage.googleapis.com via *.googleapis.com).
set -u
export DEBIAN_FRONTEND=noninteractive
log() { echo "[setup $(date +%T)] $*"; }

# 1. Chrome for Testing download (runs in the background while apt works)
log "downloading Chrome for Testing"
( npx -y @puppeteer/browsers install chrome@stable --path /opt/cft > /tmp/cft.log 2>&1 ) &
CFT_PID=$!

# 2. apt: ffmpeg and fonts
log "apt: ffmpeg, fonts"
apt-get update -qq || log "apt-get update failed"
apt-get install -y -qq --no-install-recommends ffmpeg zip unzip fonts-noto-cjk fonts-noto-color-emoji fonts-liberation fontconfig \
  || log "apt install of ffmpeg/fonts failed"

# 3. Chrome's system libraries, from the deb.deps file it ships with (apt-get satisfy resolves the t64 renames)
wait $CFT_PID || log "Chrome download failed: $(tail -3 /tmp/cft.log)"
CHROME=$(find /opt/cft -type f -name chrome -path '*chrome-linux64*' 2>/dev/null | sort | tail -1)
if [ -n "$CHROME" ]; then
  DEPS=$(grep -v '^\s*$' "$(dirname "$CHROME")/deb.deps" | paste -sd, -)
  apt-get satisfy -y -qq "$DEPS" > /tmp/chrome-deps.log 2>&1 || log "Chrome deps: $(tail -3 /tmp/chrome-deps.log)"
  # Playwright's channel 'chrome' and most scripts look here
  mkdir -p /opt/google/chrome
  ln -sf "$CHROME" /opt/google/chrome/chrome
  ln -sf "$CHROME" /usr/local/bin/google-chrome
  log "Chrome: $("$CHROME" --version 2>/dev/null)"
else
  log "Chrome not found under /opt/cft"
fi

fc-cache -f > /dev/null 2>&1 || true
log "ffmpeg: $(ffmpeg -version 2>/dev/null | head -1 | cut -c1-40)"
log "CJK fonts: $(fc-list :lang=zh family | head -1)"
log "done"
exit 0
