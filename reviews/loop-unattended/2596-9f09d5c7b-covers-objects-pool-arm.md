# Review 2596 — 9f09d5c7b — covers_objects pool arm + live is_pool

SHA: `9f09d5c7b` (D-3726). Underwater-idiom family residual with a
real predicate fix, `js/display.js` only (+12/−3). Ledger:
map_location ported.

## Intent vs deliverable

Promise: pool arm reads live `is_pool(x, y)` + live
`(u.uinwater | 0)` per display.h:218–220; the old `IS_POOL(t)`
typ-range check was wider than C's `is_pool` (dbridge.c:46).
Diff actually adds: the arm rewire + `export` (test seam) +
C-cite comment. Promise matches diff.

## Inventory

- `covers_objects` (js/display.js:2287, newly exported) ↔ C
  macro nethack-c/upstream/include/display.h:218–220
  (`(is_pool(xx, yy) && !Underwater) || LAVAPOOL || LAVAWALL`).

## C ↔ JS fidelity

Macro confirmed verbatim (read from pinned display.h directly;
macros have no csym body). JS keeps lava-first order over a
pure `||` — equivalent — then `is_pool(x, y) &&
!(game.u?.uinwater | 0)`. The predicate-swap claim re-verified:
C is_pool (dbridge.c:45–59, csym range) is `POOL || MOAT ||
WATER || is_moat(x, y)` with the Juiblex comment; JS
`is_pool` (js/hack.js:2128, sync, LIVE) ports it exactly
including the comment; `IS_POOL` (js/const.js:2355) is the
wider `POOL..DRAWBRIDGE_UP` range — so the old code was C-wrong
on raised bridges, and this SHA fixes that too. Shape matches
the C-exact `covers_objects_detect` sibling (js/detect.js:1052,
identical arms). `sym.mjs covers_objects` →
`js/display.js:2287 sync`; nothing deleted or re-pointed;
is_pool already imported (no new edge).

## Hallucinations / overclaim

None. The dbridge.c:46 + Juiblex rationale in the comment is
accurate against pinned C.

## Density

One whole macro (3-line C macro + :222 alias, all arms live) +
focused test + ledger + verify on an empty queue. Right-sized;
successor lead (D-3727 flooreffects) named.

## Verification

Re-measured: `verify covers_objects --base 9f09d5c7b~1
--reach-all` → 0 blocked (vacuous, as stated) + `smoke
covers_objects: no RNG-tagged reach; fixed smoke spread (24
run, 10.7s): 24 PASS, 0 regressed → REACH-OK`. Matches the
D-log. Rule #2 clean. Diff grep FORCE/DIAG/RNG/coords: no
hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
