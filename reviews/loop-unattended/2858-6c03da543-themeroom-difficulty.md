# Review 2858 — 6c03da543 — themeroom pickers read level_difficulty, not depth

## Metadata

- SHA: `6c03da543cd6a30c5640636b4e86a2e76daeb4f1` (D-4015)
- Cliff: unattributed head + row 4 @24cf3a108 (Valkyrie s539,
  Ranger s432), one cause: themerooms Twin gate
- js/ diff: `js/mklev.js` +5/-2 (two expression swaps + cites);
  new `scripts/themeroom-level-difficulty.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: lua `is_eligible` reads `nh.level_difficulty()`, so
the JS pickers must too — EAggravate doubling made Twin
(mindiff 4) eligible in C where depth-gated JS skipped it,
ending the reservoir at 1036 instead of 1037. Ranger FULL
PASS, Valkyrie RNG-full.

Diff actually: the two swaps + cites. Promise == diff.

## Inventory

- `makerooms` themerooms call (`js/mklev.js:30003`, C
  `mklev.c:412-421`): arg is now `level_difficulty()`.
- `themeroom_fill` (`js/mklev.js:32439`, lua
  `themeroom_fill :1025-1043`): same swap.

## C ↔ JS fidelity

- Lua read first-hand (`nethack-c/upstream/dat/themerms.lua`):
  `is_eligible :890-902` sets `diff =
  nh.level_difficulty()` and gates `mindiff`/`maxdiff`; Twin
  businesses `:818-819` has `mindiff = 4`; the reservoir
  `:955-973` draws `rn2(total)` per eligible room — JS
  `themerooms_generate` mirrors the loop exactly, and the Twin
  meta (`{frequency: 1, mindiff: 4}`, last entry) makes the
  1037th draw the flip point, as the D-log narrates.
- `level_difficulty` is the canonical live import
  (`js/hacklib.js:161`, C `dungeon.c:2026-2084`, EAggravate
  doubling included), already imported at mklev.js:15 — no new
  edge. Neighbor audit spot-checked: C `mklev.c:1795`
  `maybe_sdoor` is `(depth(&u.uz) > 2) && ...` — correctly
  left on depth. `sym.mjs` N/A — no symbol deleted or
  re-pointed.

## Hallucinations / overclaim

None. The vacuous `verify level_difficulty` is disclosed with
the reason (unattributed owners match no C fn) and movement is
shown via score+show instead.

## Density

Cliff commit on the generated head + row 4, same cause (verified
`24cf3a108:LOOP-QUEUE.md` rows 1 and 4); one `Ledger:` entry;
later owner (s984 doaltarobj) named, not absorbed. No
FORCE/DIAG/seed reads; Rule #2 clean (see 2853).

## Verification

Unattributed owners match no C fn, so no `verify --fn`
re-measure applies; checked probe states on HEAD code instead:

- scen-sweep-Ranger-95308: FULL PASS (26963/26963 RNG) —
  persists.
- scen-sweep-Valkyrie-50156016: RNG-full (40775/40775),
  screen-first at the later named owner — persists.

Claim holds, no regression.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
