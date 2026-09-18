# Review 1398 — e6289b5b — test_move whole body (D-2439)

- Commit: `e6289b5b` — "`hack.c` test_move whole body in C order (coverage MISSING → live) (D-2439)."
- Files: `js/hack.js` (+331/−47), `js/mhitm.js`, `js/mon.js`, `js/steed.js`,
  `js/trap.js`; docs + map + queue pop.
- D-log: D-2439. Queue row popped: test_move MISSING (C 261 L / JS no symbol).

## Intent vs deliverable

Subject promises the whole `test_move` (`hack.c:991–1255`) plus rewiring
the fragment users. Diff delivers: new `export async function
test_move(ux, uy, dx, dy, mode)` (`hack.js:302–560`), TEST_MOVE rewires in
mhitm-knockback/mount_steed/move_into_trap + two hack.js avoid_trap sites,
`may_passwall`/`Fire_resistance` function→export, `test_move_viable`
deleted. Promise matches deliverable, with two control-flow/caller debts
below.

## Inventory

New/changed JS: `test_move`, `Blind_tm`,
`test_move_known_wwalking/lwalking`, 5-file rewires. Deleted:
`test_move_viable` (required `sym.mjs`: `NOT FOUND in js/**` — deletion
verified, no dangling refs). Re-pointed (required `sym.mjs`): `may_passwall`
now `mon.js:143` export (teleport.js:311 D-1100 twin pre-existing,
disclosed) ✓; `Fire_resistance` now `trap.js:4615` export — textually
identical to the pre-existing `zap.js:542` twin (same macro test), so no
behavioral fork, but the macro now has two live exports (observation, not
a C-wrong).

## C ↔ JS fidelity

C locus `hack.c:989–1255` (csym) walked arm-by-arm; all four modes:

- Entry `door_opened=FALSE` all modes, `!isok → FALSE` ✓. Obstructed/
  IRONBARS chain (Blind feel, passwall pass, Underwater `There`, IRONBARS
  chew → `passes_bars`, tunnel eat-rock, autodig+`use_pick_axe2` dormant
  on unset flag, generic-rock drawbridge/Soko-resist/mention_walls with
  `back_to_glyph`/`glyph_is_cmap`/`glyph_to_cmap`, S_stone→solid-stone,
  impossible-glyph fallback, `pline_dir(xytodir)`) ✓ in order; the
  `an(defsyms[].explanation)` prose is a named heuristic (tree/wall/
  solid-stone) — disclosed, suite-blind (full 44/44 green with it).
- Closed door: feel, passwall/ooze/Underwater/tunnel arms ✓; autoopen gate
  (`autoopen !== false` matches optlist default On; flat
  `u.Confusion/u.Stunned` matches cmd.js:3381 idiom) with `doopen_indir`
  bool-shape named (ECMD_OK + canned-kick fake honestly disclosed);
  `door_opened=!closed_door`, numeric `move` (consumers truthy-safe:
  allmain.js:975, apply.js:3647) ✓; orthogonal ouch (usteed-lead vs
  Ouch+DEX, `door_opened=move=TRUE`, `nomul(0)`, else closed pline) ✓.
- Open-door testdiag, squeeze 3/2/1 (exact strings), `worm_cross` +
  `YMonnam(m_at)` ✓. run==8 trap/liquid with `mode==TEST_TRAP` returns,
  WATERWALL/LAVAWALL + Lev/Fly + Known walkers — `Known_wwalking/
  lwalking` verified against `hack.c:59–66` (boots otyp + oc_name_known +
  !usteed; +Fire_resistance+erodeproof+rknown) ✓. `TEST_TRAP→FALSE`
  placement ✓. Diagonal-out-of-doorway (`block_entry → false`, named) ✓.
  Boulder: run>=2 abort, DO_MOVE chew/`moverock`, TEST_TRAV Soko + two-in-
  row (pick/mattock/DIGGING-unknown via `oc_name_known`) ✓. `return TRUE` ✓.
- Identifier sweep of the new region (70 names): every callee resolves to
  a live import or module local; async sites (`still_chewing`,
  `doopen_indir`, `bury` n/a, `moverock`, `destroy` n/a) correctly awaited;
  `await moverock() < 0` parses as `(await …) < 0` ✓. New edges ALREADY
  (`--can hack.js mon.js/trap.js` → no new edge). Banned-pattern grep on
  added lines: 0 hits. No DIAG/FORCE/seed/coords.

## Hallucinations / overclaim

"TEST_TRAV/TRAP `goto testdiag` as the shared diagonal gate" misdescribes
C :1138–1142: the goto *falls through* past `return FALSE` when the gate
passes, and JS returns FALSE unconditionally (item 1 below). Otherwise
honest: vacuous verify framed as hidden note, unwired callers enumerated
with reasons (domove inline, D-1971 travel, click_to_cmd, zap ball-stop)
instead of buried.

## Density

One C function + fragment-user rewires, 5 files, +360/−78 (under the 450
raised ceiling for >250-insertion diffs). Whole-body claim holds for the
function; caller rewires deferred by name (item 2).

## Verification

D-log: `verify.mjs --fn test_move` → syntax (5 files) · rule2 · hidden
note · smoke 24/24 · green · strict · cohort · full 44/44 · PASS.
Independent re-measure:

- `hidden-proxy.mjs verify test_move --base e6289b5b~1 --reach-all` → 0
  blocked (vacuous, as logged) + `smoke: 24 PASS, 0 regressed →
  REACH-OK`. Confirms the D-log.

## Actionable C-wrongs

1. TEST_TRAV/TEST_TRAP closed-door arm drops C's `goto testdiag`
   fall-through (`js/hack.js` TEST branch ends `return false; // C :1142`).
   C jumps over that return: orthogonal closed-door TEST_TRAV continues
   through squeeze/worm/run/boulder and may return TRUE (travel routes
   through closed doors and autoopens on arrival — the existing
   `travel_test_move` in cmd.js:1121 implements exactly this fall-through).
   Latent today (all live callers pass TEST_MOVE; travel still uses its own
   edge under D-1971), but D-1971 wiring test_move blindly will regress
   travel-through-doors. Fix: let the gate-pass path fall through to the
   squeeze/worm/run/boulder tail (small restructure, cite :1138–1156).
2. Flagship DO_MOVE caller `hack.c:2843 domove` still on its
   `cmd.js:3215` inline (behavior preserved, duplication remains). Named
   with a Next pointer but no queue row — next `hack.c` port iter owns the
   rewire (hot path, own iteration).

Verdict: **ACCEPT-WITH-DEBT**
