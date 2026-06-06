#!/usr/bin/env bash
# Maintain split graphify graphs for the NetHack C→JS port.
#
#   js/graphify-out/          — port implementation (update after every JS session)
#   nethack-c/graphify-out/   — C reference (src + include; rare updates)
#   graphify-out/             — merged view for cross-repo path/query
#
# Usage: tools/graphify-update.sh [js|c|merge|all]
#   js    — refresh JS graph only (~5–15s incremental)
#   c     — refresh C src+include and rebuild nethack-c/graphify-out (~20s)
#   merge — merge js + C into graphify-out/ (~2s; needs both subgraphs)
#   all   — js + c + merge (default for first-time setup)
#
# See .cursor/docs/graphify.md

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v graphify >/dev/null 2>&1; then
  echo "graphify: not found on PATH (install via uv/pip)" >&2
  exit 1
fi

TARGET="${1:-js}"

update_js() {
  echo "==> graphify update js"
  graphify update js
}

update_c() {
  if [[ ! -d nethack-c/upstream/src ]]; then
    echo "nethack-c/upstream is empty; run: git submodule update --init nethack-c/upstream" >&2
    exit 1
  fi
  echo "==> graphify update nethack-c/upstream/src"
  graphify update nethack-c/upstream/src
  echo "==> graphify update nethack-c/upstream/include"
  graphify update nethack-c/upstream/include
  mkdir -p nethack-c/graphify-out
  echo "==> merge C src + include -> nethack-c/graphify-out/graph.json"
  graphify merge-graphs \
    nethack-c/upstream/src/graphify-out/graph.json \
    nethack-c/upstream/include/graphify-out/graph.json \
    --out nethack-c/graphify-out/graph.json
}

merge_all() {
  if [[ ! -f js/graphify-out/graph.json ]]; then
    echo "missing js/graphify-out/graph.json — run: $0 js" >&2
    exit 1
  fi
  if [[ ! -f nethack-c/graphify-out/graph.json ]]; then
    echo "missing nethack-c/graphify-out/graph.json — run: $0 c" >&2
    exit 1
  fi
  mkdir -p graphify-out
  echo "==> merge js + C -> graphify-out/graph.json"
  graphify merge-graphs \
    js/graphify-out/graph.json \
    nethack-c/graphify-out/graph.json \
    --out graphify-out/graph.json
  # Merged output is graph.json only (no GRAPH_REPORT). Drop stale monolithic artifacts.
  rm -rf graphify-out/cache graphify-out/GRAPH_REPORT.md graphify-out/manifest.json \
    graphify-out/.graphify_labels.json graphify-out/.graphify_root 2>/dev/null || true
}

case "$TARGET" in
  js) update_js ;;
  c) update_c ;;
  merge) merge_all ;;
  all) update_js; update_c; merge_all ;;
  -h|--help)
    sed -n '2,14p' "$0"
    exit 0
    ;;
  *)
    echo "Usage: $0 [js|c|merge|all]" >&2
    exit 1
    ;;
esac

echo "Done ($TARGET)."
