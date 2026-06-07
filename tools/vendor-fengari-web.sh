#!/usr/bin/env bash
# Re-download the pinned fengari-web browser bundle into js/vendor/.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VER=0.1.4
URL="https://github.com/fengari-lua/fengari-web/releases/download/v${VER}/fengari-web.js"
curl -fsSL -o "$ROOT/js/vendor/fengari-web.js" "$URL"
echo "Wrote js/vendor/fengari-web.js (fengari-web v${VER})"
