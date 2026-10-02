# Review 2262 — c50c91230 — vision get_viz_clear whole-body port

Metadata: SHA
`c50c9123003a2c729403ca68a01dfa7c428a0054`
(D-3303, 2026-10-02).
`js/vision.js` only (+14/−1):
one new export + one import
name. No caller wiring (sole C
caller unported, named).

Intent vs deliverable: subject
promises “whole-body port,
sole caller named”. The diff
adds `get_viz_clear` before
`vision_init` in C file order
and appends `isok` to the
existing `./const.js` import.
Delivers exactly what it
promises; nothing else.

Inventory:

- `export function
  get_viz_clear(x, y)`
  (js/vision.js:104): `if
  (isok(x, y) &&
  !viz_clear[y][x]) return 1;
  return 0`.
- Import: `isok` added to the
  `./const.js` import
  (js/vision.js:17). No symbol
  deleted, no clone added, no
  other file touched.

**C ↔ JS fidelity**:

`get_viz_clear` (C
vision.c:104–110 per
`csym.mjs`, 7 lines): `if
(isok(x,y) && !viz_clear[y][x])
return TRUE; return FALSE;`
— the whole body is one
short-circuit `if` plus
fallthrough. JS keeps the
predicate verbatim, including
short-circuit order (isok
guards the plane read, so no
out-of-bounds index when C
says out-of-bounds) ✓. No
RNG in C (`rn2`/`rnd`/`rn1`/
`d` count zero) — nothing to
walk call-for-call ✓.
TRUE/FALSE → 1/0 ints: C
boolean is int and the sole C
caller (wizcmds.c:1453)
compares with `!=` against
`(does_block(…) ? 1 : 0)`,
so int return is the
C-exact type, not a
coercion ✓. The `viz_clear`
plane read matches the live
JS plane (Int8Array rows,
js/vision.js:86; 0 = blocks,
`!` = C `!`) ✓.

Callee closure: single callee
`isok` — LIVE, imported from
the C-locus canonical export
(js/const.js:2313, cmd.c
isok idiom), not the
hacklib duplicate and not a
5th local clone (`sym.mjs`
pastes 4 existing clones in
dogmove/dokick/mthrowu/
teleport; the port added
none) ✓. Sole C caller
`levl_sanity_check`
(wizcmds.c:1443–1457,
staticfn) confirmed absent
from `js/` (`sym.mjs`:
NOT FOUND) → the named omit
is real, and the export
stands ready for wiring ✓.

Hallucinations / overclaim:
none. The D-log says
“whole-body port” of a
7-line body and the body is
complete; “sole caller
named” and the caller is
genuinely unported. No
“Match C” dispatch-over-stub
shape — there is no callee
left stubbed.

Density: single-function
cluster, ~14 insertions,
below the ~80 bar. Defense
audited and holds: `ledger.mjs
file vision.c` shows the
other 7 unknowns all
measured-ok with live JS
symbols (rogue_vision 27/35,
unblock_point 3/3,
recalc_block_point 4/5,
dig_point 50/50, fill_point
48/47, do_clear_area 28/21,
howmonseen 20/26) — no Open
row left in the file to grow
the cluster. One `Ledger:`
entry, one Verify line ✓.
Not a bundled Must-fix, not
>10 functions, one C file ✓.

Verification: D-log claims
hidden vacuous note +
REACH-OK smoke 24/24, green
2/2, strict ×2, cohort 7/7,
full 44/44. Re-measured:
`hidden-proxy.mjs verify
get_viz_clear --base
c50c91230~1 --reach-all` →
“0 session(s) blocked” +
the vacuous-note line +
“fixed smoke spread (24
run): 24 PASS, 0 regressed →
REACH-OK”. Both summary
lines match the D-log
verbatim; the queue row
cited 0 blocks, so the
vacuous check is the honest
expected outcome, stated as
such ✓. Diff grep: no
FORCE/DIAG/getRngLog/seed/
fastforward/coords — a pure
predicate port ✓. Rule #2:
import from `./const.js`
only ✓.

**Actionable C-wrongs**:
none.

Verdict: **ACCEPT**
