# Review 2830 — a2a643eb5 — maketrap HOLE arm clears the rm union mirrors

- SHA: `a2a643eb5` (D-3985)
- Files: `js/trap.js` (+18/−1), focused test
  `scripts/maketrap-hole-clears-doormask.test.mjs` (new, 66 lines)
- Method: cliff writer (1 C arm); whole Method.
- Cites: C `trap.c:455–588` (csym range), `:513–561` HOLE arm,
  `rm.h:213–221` union aliases, `rm.h:320–321` terrain gate — read directly.

## Intent vs deliverable

Promise: minetn-6 (49,7) `ensure_way_out` HOLE on a D_CLOSED des door
must leave D_NODOOR (`lock.c:1165`); JS kept `doormask=4` → fi14 cnt
4 vs C 5 → one-draw offset → distfleeck @110. Fix: the `clear_flags`
arm clears every live union mirror. Diff adds exactly the six mirror
clears + C-cited comment. Promise and diff agree.

## Inventory

- `maketrap` HOLE/PIT/TRAPDOOR arm — `js/trap.js:1100–1121` vs C
  `trap.c:513–561`. Status: union clear repaired.

## C ↔ JS fidelity

C, verified line by line:

- `:529` `clear_flags = TRUE`; DRAWBRIDGE_UP `:533–545` sets FALSE and
  keeps `drawbridgemask` (DB_UNDER→DB_FLOOR, ice subset) ✓ — JS gate
  above the hunk (`trap.js:1083–1093`) matches arm for arm.
- `:546–559` IS_ROOM→ROOM / STONE|SCORR→CORR / wall|SDOOR→maze/cavern/
  DOOR ✓ — JS `:1094–1102` matches.
- `:560–561` `if (clear_flags) lev->flags = 0` ✓ — and `rm.h:213–221`
  proves `doormask/altarmask/wall_info/ladder/drawbridgemask/looted/
  icedpool/emptygrave` ALL `#define … flags`: one C write clears 8
  readers, so JS must clear each split mirror ✓.
- Stairs/LADDER never reach the arm: `CAN_OVERWRITE_TERRAIN`
  (`rm.h:320–321`) excludes LADDER/STAIRS (debug-overwrite excepted,
  never in scored play) ✓ — skipping the `ladder` mirror is sound.
- `emptygrave`: no per-cell JS field exists (only comments + dig.js's
  own `lev.flags = 0`) ✓ — nothing stale to clear.
- RNG: none on this path (`hole_destination` for HOLE only, untouched).

No symbol deleted or re-pointed → `sym.mjs` N/A. Diff grep clean; no
new import, no DIAG/FORCE/seed.

## Hallucinations / overclaim

None. The three Named items check out (ladder gate, emptygrave
fieldlessness, sibling `flags = 0` sites disclosed as latent without
session evidence — correctly not shipped).

## Density

Cliff head of its parent (`distfleeck`, Must-fix empty) ✓. Writer
hunt per D-3975's prescribed temp-C dump ✓. `Ledger:` entry touched
(`trap.c.jsonl`). Full public 44/44 run included.

## Verification

Ship-time: focused 0/2→2/2; `verify distfleeck: 1 PASS (50455535 full
734), 0 moved, 4 unchanged, 0 worse`; reach 80/80 + smoke 24/24;
green/strict/cohort 7/7.
Re-measure (`verify distfleeck --base a2a643eb5~1 --no-reach` on HEAD):
`2 PASS, 1 moved past (Monk 97→getpos@307), 3 unchanged, 0 worse →
PROGRESS` — the named session PASSes exactly; the extra PASS + move
are later window SHAs (D-3989/D-3990 distfleeck writers), 0 worse.
No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
