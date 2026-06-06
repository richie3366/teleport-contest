# Graphify (split graphs for C→JS port)

This repo uses **three graphify outputs** instead of `graphify update .` on the repo root. A monolithic root scan indexed ~1,650 files (tools, sessions, docs, `win/`, etc.) and took minutes; the split layout targets only port-relevant trees.

## Layout

| Graph | Path | Scope | When to refresh |
|-------|------|-------|-----------------|
| **JS** | `js/graphify-out/graph.json` | `js/` port code | After editing `js/` (every port session) |
| **C** | `nethack-c/graphify-out/graph.json` | `upstream/src` + `upstream/include` | Submodule init, upstream bump, or C-heavy batch |
| **Merged** | `graphify-out/graph.json` | JS ∪ C | Cross-repo `path` / broad `query`; run `merge` after refreshing either side |

Intermediate build dirs (`nethack-c/upstream/src/graphify-out/`, `…/include/graphify-out/`) are cache inputs for the C merge — do not query them directly.

## Commands

```bash
# After JS port work (default; ~5–15s incremental)
npm run graphify:js
# or: bash tools/graphify-update.sh js

# First clone or after submodule update (~20s)
npm run graphify:c

# Rebuild merged graph only (~2s)
npm run graphify:merge

# First-time / full rebuild
npm run graphify:all
```

Requires `graphify` on `PATH` and, for C graphs, an initialized submodule:

```bash
git submodule update --init nethack-c/upstream
```

## Querying (agents)

Pick the **smallest** graph that answers the question. Pass `--graph`:

```bash
# JS implementation (mklev.js, moveloop, etc.)
graphify query "fill_ordinary_room" --graph js/graphify-out/graph.json

# C reference (mklev.c, mkobj.c, …)
graphify query "fill_ordinary_room" --graph nethack-c/graphify-out/graph.json

# C symbol → JS symbol (or vice versa)
graphify path "fill_ordinary_room" "fillOrdinaryRoom" --graph graphify-out/graph.json
graphify explain "mkobj" --graph graphify-out/graph.json
```

| Task | Graph |
|------|-------|
| How is X wired in the port? | `js/graphify-out/graph.json` |
| What does C do for X? | `nethack-c/graphify-out/graph.json` |
| Map C function/file to JS port | `graphify-out/graph.json` |
| Architecture skim | `js/…/GRAPH_REPORT.md` or `nethack-c/…/GRAPH_REPORT.md` — not the old 3k-line root report |

**Do not** run `graphify update .` on the repo root — it rescans the whole tree and is slow.

## Size reference (approx.)

| Graph | Nodes | Notes |
|-------|-------|-------|
| JS | ~3.2k | Includes `graph.html` viz |
| C (src+include) | ~6.1k | No `graph.html` (src alone exceeds 5k node viz limit) |
| Merged | ~9.3k | Cross-repo queries |
| Old root `.` scan | ~21k | Deprecated |

## Git

All `graphify-out/` trees are **gitignored** (local agent cache). Regenerate with the npm scripts above.
