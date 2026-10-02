#!/bin/bash
# Checks the environment, then runs the whole pipeline on the example video with silent placeholder audio.
# Usage (from the repository root):
#   bash <skill>/scripts/selftest.sh          environment + pipeline, no API call
#   bash <skill>/scripts/selftest.sh --tts    also one real Gemini TTS call
# The example is copied to /tmp/lesson-video-selftest, so nothing is written into the skill folder.
cd "$(dirname "$0")" || exit 1     # the scripts folder

echo "== tools"
node -v
python3 --version
ffmpeg -version 2>/dev/null | head -1 | cut -c1-30 || echo "ffmpeg MISSING"
if [ -e /opt/google/chrome/chrome ]; then /opt/google/chrome/chrome --version; else
  echo "chrome MISSING at /opt/google/chrome/chrome: is cloud-setup.sh the environment's setup script?"; fi
echo "CJK font: $(fc-list :lang=zh family 2>/dev/null | head -1)"
[ -d node_modules ] || npm ci --silent --no-audit --no-fund || npm install --silent --no-audit --no-fund
if [ -n "${GEMINI_API_KEY:-}" ]; then echo "GEMINI_API_KEY: set"; else
  echo "GEMINI_API_KEY: not set (fine if the environment has an API credential for generativelanguage.googleapis.com)"; fi

echo "== example pipeline (silent placeholder audio)"
V=/tmp/lesson-video-selftest
rm -rf $V && cp -r ../assets/example $V
python3 ./tts.py $V all --dry-run || exit 1
node ./tex.mjs $V || exit 1
node ./render.mjs $V/index.html $V/out/sheet.jpg --sheet 2 || exit 1
node ./layout-check.mjs $V/index.html
node ./render.mjs $V/index.html $V/out/demo.mp4 --audio $V/narration.wav || exit 1
ffprobe -v error -show_entries stream=codec_type,duration -of compact $V/out/demo.mp4

if [ "${1:-}" = "--tts" ]; then
  echo "== one real TTS call (example segment S01)"
  rm -f $V/audio/S01.json
  python3 ./tts.py $V all --only S01 || exit 1
  echo "listen to $V/audio/S01.wav"
fi
echo "== done: look at $V/out/sheet.jpg"
