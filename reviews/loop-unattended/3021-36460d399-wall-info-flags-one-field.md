# Review 3021 — 36460d399 — wall_info ≡ flags at the remaining single-field sites

- SHA: `36460d399` (Must-fix F2 of the 2026-10-20 level audit; non-RNG)
- D-entry: D-4181; Ledger: hit_bars, moverock, skip_premap_detect,
  close/open/destroy_drawbridge, create_drawbridge rows touched
- `js/` diff: dbridge.js +12 −2, detect.js ±1, hack.js +2, mklev.js +7 −2,
  mthrowu.js +3 −1

## Intent vs deliverable

Promise: C's `levl[][].flags` has three names (rm.h:213–215:
`doormask`, `altarmask`, `wall_info` are all `flags`). JS keeps three
fields, and the D-0865 idiom ORs `wall_info | flags` on read. Four sites
still read or wrote only one of them.

Diff: hit_bars and skip_premap_detect OR both fields, moverock's
hole-fill clears both, and the four drawbridge assignments write
`wall_info`, `flags` and `doormask` to the same value. The promise
matches the diff.

## Inventory

- hit_bars — mthrowu.js:1733 (C mthrowu.c:1425): nodissolve reads both.
- moverock_core — hack.js:1108 (C hack.c:562): clears both.
- skip_premap_detect — detect.js:859 (C detect.c:2124–2130): `||` → `|`.
- create_drawbridge — mklev.js:21907 (C dbridge.c:266–276): both arms.
- close_drawbridge — dbridge.js:743 (C :810).
- open_drawbridge — dbridge.js:811 (C :862).
- destroy_drawbridge — dbridge.js:917 (C :942).

## C ↔ JS fidelity

- **hit_bars.** C: `nodissolve = (levl[barsx][barsy].wall_info &
  W_NONDIGGABLE) != 0`. With one C field, the OR of the two JS fields is
  the faithful read.
- **moverock.** C `:562` is `levl[rx][ry].wall_info &= ~W_NONDIGGABLE;
  levl[rx][ry].candig = 1;`. JS clears the bit in both fields, then sets
  candig. That is C order.
- **skip_premap_detect.** C tests `typ == STONE && (wall_info &
  (W_NONDIGGABLE | W_NONPASSWALL)) != 0`. The old JS
  `(wall_info|0) || (flags|0)` only looked at `flags` when `wall_info`
  was 0. A `wall_info` holding another bit therefore hid a NONPASSWALL in
  `flags`. The new bitwise OR is correct.
- **Drawbridges.** C assigns `doormask = D_NODOOR` (open/destroy/create
  open) or `wall_info = W_NONDIGGABLE` (close/create closed), and each
  assignment overwrites the whole field. JS now writes all three halves,
  which also wipes stale door bits on a DBWALL. A closed DBWALL then
  reads `doormask` 8 (= D_LOCKED's bit), as in C.

The "other doormask-only writers on door squares" scope note holds:
doors never carry W_* bits in C either.

## Hallucinations / overclaim

None. The D-log says "no corpus session blocked (non-RNG)", which fits a
state-only fix.

## Density

Seven one-to-three-line sites, all in the D-0865 idiom. Right-sized.

## Verification

```text
verify hit_bars,moverock,skip_premap_detect,close_drawbridge,open_drawbridge,
       destroy_drawbridge,create_drawbridge --base 36460d399~1 --no-reach
  all 7: 0 blocked at the parent or in the working board (vacuous)
```

That matches "no corpus session blocked (non-RNG)". The full rescore
shows 0 PASS→FAIL, and the castle/valley builds are part of it.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
