# Review 2218 — e42cd0047 — show_map_spot + do_mapping whole bodies

Metadata: SHA `e42cd0047fb4181a7f98a959c0468743a0b0d5be` (D-3257, 2026-10-02).
4 js/ files (~74 ins) + `scripts/show-map-spot.test.mjs` (3/3, re-run
green at HEAD). Cluster: 2 whole C functions, one C file. Method per
function below.

Intent vs deliverable: subject promises "show_map_spot oldglyph
trap/object restore + do_mapping whole body". The diff delivers both
restarts in C order, plus two latent fixes (SCORR `recalc_block_point`
→ `unblock_point`; inline unconstrain-sniff → live `unconstrain_map`).
Delivers what it promises.

Inventory:

- `show_map_spot` (`js/detect.js:945`, stays sync): C-order restart —
  rn2(7) skip, seenv, SCORR uncover, oldglyph+gbuf snapshot, repaint,
  furniture/trap/engraving/oldglyph restore, overview.
- `do_mapping` (`js/detect.js:1006`, sync→async): live unconstrain,
  sweep, browse/else arms, exercise. All 3 call sites awaited
  (read.js:367, sit.js:902, wizcmds.js:657 — verified exhaustive by
  grep; enclosers already async).
- `sym.mjs`: unblock_point vision.js:482 sync; map locals
  unconstrain_map :1069 / reconstrain_map :1083 / browse_map :1334 /
  map_redisplay :1353 are same-file functions — correct shape, since C
  declares all four `staticfn` in detect.c (:24–27). show_glyph_cell
  display.js:4096 ASYNC (fire-and-forget, disclosed);
  remember_shown_glyph display.js:3610 sync (the one new import, edge
  pre-exists); room_discovered dungeon.js:2584 sync. No symbols
  deleted or re-pointed.

**C ↔ JS fidelity — `show_map_spot`** (C `detect.c:1371–1419`)

- Walked in order: cnf&&rn2(7) return :1378 ✓ (RNG first, position
  preserved); seenv=SVALL :1382 ✓; SCORR→CORR+unblock_point :1384–1388
  ✓ (fixes the recalc_block_point wrong-callee); oldglyph=glyph_at
  BEFORE the repaint :1396 ✓; hero_memory magic_map_background+newsym
  / else display-only :1397–1404 ✓; !FURNITURE tseen-trap :1406 ✓,
  engr&&!cnf :1408 ✓ (erevealed nuance kept), trap/object oldglyph
  restore :1410–1413 ✓; overview :1416–1418 ✓.
- The restore arm renders C `show_glyph(x,y,oldglyph)` as a
  snapshotted `show_glyph_cell` + `remember_shown_glyph` for
  `lev->glyph`. Rationale documented (glyphmap[oldglyph] ≡ current
  render; snapshot is RNG-free where an obj_glyph decode would burn
  display RNG). Fire-and-forget matches the two sibling arms in the
  same function. Corner noted: if the cell paint were stale relative
  to the mapped id, C repaints fresh while JS restores the snapshot —
  unproven either way, display-layer only, pinned by the 3/3 test.
  Observation, not a C-wrong.

**C ↔ JS fidelity — `do_mapping`** (C `detect.c:1421–1444`)

- unconstrain_map() first :1427 ✓ (replaces the inline flag-sniff
  whose save/clear was deferred — real fix); sweep bounds zx 1..COLNO
  × zy 0..ROWNO with Confusion ✓; !hero_memory||unconstrained →
  flush_screen(1) + browse_map(TER_DETECT|TER_MAP|TER_TRP|TER_OBJ,
  'anything of interest') + map_redisplay() :1432–1437 ✓ (all three,
  in order, awaited); else reconstrain_map() :1439–1441 ✓ (no-op call
  kept per C's own comment); exercise(A_WIS,TRUE) :1443 ✓. No RNG in
  the body proper (sweep arms roll per-cell on both sides).
- Banned-pattern grep on js/ hunks: clean. Rule #2 clean (2212 run).

Hallucinations / overclaim: none. "Whole C body live" ×2 holds. The
message's escape-clause honesty (below the floor, queue holds nothing
more) matches the ledger state I see.

Density (§2b): ~74 js ins (+81 test) — under the floor with the
documented escape (detect.c/closure exhausted). Two whole functions +
committed test. ACCEPT.

Verification: re-measured:
`verify show_map_spot,do_mapping --base e42cd0047~1 --reach-all` →
both vacuous (D-log says exactly that) + smoke 24/24 REACH-OK both,
0 regressed. Committed test re-run green (3/3) at HEAD.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
