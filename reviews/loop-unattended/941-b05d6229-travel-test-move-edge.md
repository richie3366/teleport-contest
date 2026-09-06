# Review 941 — b05d6229 — hack.c findtravelpath TEST_TRAV edge (D-1971)

- SHA: `b05d6229` — "hack.c findtravelpath TEST_TRAV edge (doors pass, boulder leaves, diagonal doorways banned) (D-1971)."
- D-id: D-1971. JS: `js/cmd.js` (+96/−13). C locus: `nethack-c/upstream/src/hack.c` `test_move` `:989–1255`.
- Verdict: **ACCEPT-WITH-DEBT**

## Intent vs deliverable

Subject promises a TEST_TRAV edge test for the travel BFS: closed doors
pass, single boulders become enterable leaves, diagonal intact doorways
banned both ways, run==8 avoidance gated. Diff actually adds: local
`travel_test_move(ux, uy, dx, dy)` (+82 lines, js/cmd.js:1088) plus import
extensions (`In_sokoban`, `PICK_AXE`/`DWARVISH_MATTOCK` otyps,
`tunnels`/`needspick`, `carrying`) and rewiring of both BFS loops
(TRAVEL + GUESS) from the 4-line stand-in chain to the new edge test.
Docs + map + journal ride along. Promise matches deliverable; no scope
creep (TEST_MOVE/DO_MOVE arms stay out, named).

## Inventory

- New: `travel_test_move` (local, not exported — correct, C `test_move`
  itself is not ported; this is the TEST_TRAV projection only).
- Changed: `findtravelpath_bfs` loop, `findtravelpath_guess` loop (4-line
  chain → one call), `findtravelpath_guess` doc comment (omit list
  extended). No symbols deleted; `blocksMove`/`boulder_at` keep remaining
  callers (dest-validity :1819, `is_valid_travelpt` :1938).

## C ↔ JS fidelity

Walked `travel_test_move` against `test_move` `:989–1255` arm by arm
(no RNG anywhere on the TEST_TRAV path — deterministic, so "order-exact
by construction" holds wherever the gates match):

- Obstructed/ironbars (`:1011–1073`): rock-eat via
  `tunnels && !needspick` ✓; IRONBARS via `passWalls ||
  test_move_hero_passes_bars()` ✓; DO_MOVE-only arms (feel_location,
  autodig `use_pick_axe2`, drawbridge/Sokoban/mention_walls plines)
  correctly skipped — all `return FALSE`, outcome-identical ✓.
  `may_passwall` rock gate (`:1014`) omitted, named in code header +
  D-log + map ✓.
- Closed door (`:1074–1148`): `passWalls` / `can_ooze` / `uinwater` /
  tunnel pass ✓; orthogonal falls through to pass (C `goto testdiag`
  `:1149` is a no-op orthogonally) ✓; diagonal banned unless
  `doorless_door && !block_door`, gated on `!passWalls` exactly as C
  `testdiag` `:1139–1147` ✓.
- Open door → `testdiag` ✓, same gate shape ✓.
- Squeeze (`:1153`): delegated to pre-existing `travel_blocks_tight_diag`
  (`bad_rock` both flanks + `cant_squeeze_thru`), a verified CLONE,
  unchanged here ✓. `worm_cross` (`:1172`) named ✓.
- run==8 trap/liquid (`:1181–1200`): `run===8 && travel_avoids_cell`
  ✓, and the helper excludes the hero cell, matching C `!u_at(x,y)` ✓
  (checked body at js/cmd.js:1044). Known_wwalking/Known_lwalking/
  WATERWALL/LAVAWALL ride inside the pre-existing helper, named ✓.
- Diagonal-out (`:1205–1213`): from-cell `IS_DOOR &&
  (!doorless_door || …)` ✓ modulo `block_entry` hardcoded `false` —
  named in code, D-log, and map ✓.
- Boulder TEST_TRAV (`:1216–1252`): `sobj_at(BOULDER,x,y) &&
  (Sokoban || !Passes_walls)` shape ✓; Sokoban-never ✓; two-in-a-row
  gate with `could_move_onto_boulder`/tunnels/carried pick/mattock ✓
  modulo WAN_DIGGING-unknown arm (treated as not carrying — named in
  code + D-log + map) ✓. Non-TRAV `run>=2` arm and DO_MOVE `moverock`
  correctly skipped ✓.

Callee closure: every reached callee is LIVE (imports on ALREADY edges:
`tunnels`/`needspick`, `carrying`, `In_sokoban` — `imports.mjs --can`
returns ALREADY on all three, verified this review) or a verified
pre-existing CLONE (`travel_blocks_tight_diag`, `travel_avoids_cell`,
`doorless_door`, `closed_door_at`, `can_ooze` is a live import from
monmove.js). No STUB in any live arm. `sym.mjs`: `travel_test_move`
local-only (correct — no second clone); `blocksMove` keeps its other
callers (not orphaned).

Debt (review-listed, not Must-fix): the code header claims "Underwater
rock (outcome identical — blocked)", but C `:1024–1029` returns FALSE
for Underwater *before* the tunnels/IRONBARS arms, while JS only gates
`uinwater` in the door arm — an underwater tunneling polyform (or
passes-bars form at bars) passes rock/bars in JS where C blocks. Genuine
but sub-marginal (underwater travel in a tunneling polyform; worst case
a wasted travel step since DO_MOVE still blocks), documented in the code
header + D-log Named, and not falsifiable by any suite or corpus
session. One-line gate for a future depth pass; the map's deferred list
does not name it (map lists may_passwall/worm_cross/block_entry/
wand-unknown/Known_*walking).

## Hallucinations / overclaim

"Exact C arm order" holds for the ported arms. The only overclaim is the
"outcome identical" parenthetical on Underwater rock (see Debt) — the
direction of the error is stated, the edge case is not. No dispatch-vs-
callee mismatch (no dispatch here; every callee live or matched clone).

## Density

+96/−13, one C `file.c:function` family, both BFS loops sharing the one
envelope. Right-size per §2b (not a lone deferred `if`, not half of
mon.c). The D-log density note correctly scopes it.

## Verification

D-log Verify bullet is honest: explicit vacuous note ("makes no
corpus-PASS claim"), green 2/2 + strict + cohort 7/7, plus full
`44/44` — the right gate for a BFS-reachability change. Re-measured
this review: `node scripts/hidden-proxy.mjs verify findtravelpath
--base b05d6229~1` → "0 session(s) blocked on it (0 at baseline, 0 in
the working scoreboard)". No `--base` re-run owed; no corpus-PASS
claimed. `imports.mjs --rulecheck` → Rule #2 clean (re-run this
review). Diff grep: no FORCE/DIAG/getRngLog/seed-gate/fastforward/
coordinates in added JS (hits are commit-message prose + hunk headers).

## Actionable C-wrongs

1. (Debt, review-listed) Obstructed arm drops C's unconditional
   Underwater block (`:1024–1029`): gate `uinwater → return false`
   alongside the door arm's existing gate. One line, no falsifier
   available — depth pass, not Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
