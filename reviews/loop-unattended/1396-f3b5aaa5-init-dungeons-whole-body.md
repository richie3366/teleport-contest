# Review 1396 — f3b5aaa5 — init_dungeons whole body in C order (D-2437)

- Commit: `f3b5aaa5` — "`dungeon.c` init_dungeons whole body in C order (coverage THIN → live) (D-2437)."
- Files: `js/dungeon.js` (+54/−8), `js/mklev.js` (+9/−1); docs + map + queue pop.
- D-log: D-2437. Queue row popped: init_dungeons THIN (C 114 L / JS 46 L).

## Intent vs deliverable

Subject promises the whole `init_dungeons` with C cites plus wiring the
`mklev.c` defensive re-init caller. Diff delivers: per-arm `:line` cites
on the `dungeon.js` restart, Array/object checks for the two lua-table
panics, and the `makelevel` guard in `mklev.js`. Promise matches
deliverable.

## Inventory

Changed JS: `init_dungeons` (restart with cites), `makelevel` (guard).
No symbol deleted or re-pointed; required `sym.mjs` delete/re-point
check vacuous.

## C ↔ JS fidelity

C locus `dungeon.c:1204–1319` (csym range) walked in order:

- memset + `n_levs = n_brs = 0`, re-zero after the length read ✓ (literal
  + comment); `nhl_init`/`nhl_loadlua` failure panics named (D-0477
  generated-embed pattern — runtime-unloadable, so unpanickable) ✓;
  `window_inited → clear_nhwindow(WIN_MAP)` named (allmain owns window
  flow) ✓; `sp_levchn = NULL` → `[]` (file's chain-as-array idiom) ✓.
- lua-table panics → `Array.isArray` + per-entry object throw ✓, with the
  entry-index subtlety preserved: C panics with `i` (success count, not
  table index) and so does JS ✓; `cl` carries across dungeons, never
  reset ✓; `i++` on success only ✓; `place_level` failure stays a throw
  ✓; final `game.n_dgns = i` re-assert consistent with the pre-existing
  per-skip `game.n_dgns--` inside `init_dungeon_dungeons`
  (`dungeon.js:567`) ✓; `init_castle_tune` + `fixup_level_locations` order
  ✓; `nhl_done`/`free_proto_dungeon`/DEBUG `dumpit`/DDEBUG block named ✓.
- mklev caller: `wiz1_level.dlevel == 0 → impossible + init_dungeons()`
  matches `mklev.c:1260–1263` verbatim including the message string ✓;
  `init_dungeons` joins mklev's pre-existing `dungeon.js` import (no new
  edge), `impossible` already imported there (`mklev.js:145`) ✓;
  reverse edge absent (`dungeon.js` never imports `mklev.js`) ✓.
- Callee closure: `init_dungeon_dungeons`/`init_level`/`place_level`/
  `add_level`/`init_castle_tune`/`fixup_level_locations` all pre-existing
  live; named omits (Lua scaffolding, window clear, debug-only,
  topten standalone-scores caller) complete and mapped.
  Banned-pattern grep on added lines: 0 hits.

## Hallucinations / overclaim

None. "0 blocked at baseline" + "hidden note" framing honest; the
`--can` SAFE claims check out (no new static edges at all).

## Density

One C function + its C-cited caller, two modules, +63/−9. Small because
the loop body already lived in split helpers; the gap (cites, panics,
caller) is fully closed.

## Verification

D-log: `verify.mjs --fn init_dungeons` → syntax (2 files) · rule2 ·
hidden note · smoke 24/24 · green · strict · cohort · full 44/44 ·
PASS. Independent re-measure on this SHA:

- `hidden-proxy.mjs verify init_dungeons --base f3b5aaa5~1 --reach-all`
  → 0 blocked (vacuous, as logged) + `smoke: 24 PASS, 0 regressed →
  REACH-OK`. Confirms the D-log. (init_dungeons runs at every new game,
  so green + full exercise the restarted body on every session.)

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
