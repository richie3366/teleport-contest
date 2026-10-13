# Review 2768 — 844401f85 — fix_worst_trouble clears Strangled uprops mirror

- SHA: `844401f85` (D-3915)
- Scope: `js/pray.js` +6/−1, 1 test, ledger `pray.c.jsonl`
- Method: cliff commit (1 arm); full Method + re-measure

## Intent vs deliverable

Promise: cliffs-head `botl.c` do_statusline2 (Priest-587210 s550) is
the region heuristic; the writer is `fix_worst_trouble`
TROUBLE_STRANGLED, which cleared the flats but not the
`u.uprops[STRANGLED].intrinsic` mirror, leaving a stuck `Strngl` after
the prayer cure ("You can breathe again." printed, status line stale).
Probe claimed to move 550 → list_genocided@1319.

Diff actually adds: `STRANGLED` to the existing const.js import +
`if (u.uprops?.[STRANGLED]) u.uprops[STRANGLED].intrinsic = 0;` after
the three flat clears, with a C-cited comment. Nothing else.

## Inventory

- `fix_worst_trouble` TROUBLE_STRANGLED arm (js/pray.js:675–692): C
  pray.c:372–600 (`csym` range), arm at :387–396. Changed: mirror clear.
- No helpers added/deleted/re-pointed; import extended within the
  existing const.js block (no new module edge by construction).

## C ↔ JS fidelity

C arm (:387–396): amulet-vanish + `useup` (:388–391) → `You("can
breathe again.")` (:393) → `Strangled = 0` (:394) → `disp.botl = TRUE`
(:395). `Strangled` is `#define`d at youprop.h:110 as
`u.uprops[STRANGLED].intrinsic` — one field, no extrinsic. JS arm now
walks it whole: vanish + `useup_strangle_amulet`, awaited cure pline,
three flat clears (house mirrors), the new intrinsic clear, `botl =
true`. The bug mechanism checks out: the painter (js/botl.js:3469)
ORs flats, intrinsic, and extrinsic, so a nonzero mirror re-lights
`Strngl` after the flats clear. Sibling pattern confirmed real
(do_wear.js:3325 and dig.js:637 carry the identical clear line).
"Extrinsic untouched" verified: no `js/` line writes
`STRANGLED].extrinsic` (only the do_wear.js:3167 struct init zeroes it;
C has no such field). No RNG, one print — both C-exact.

## Hallucinations / overclaim

None. Every cited line (C :394, youprop.h:110, do_wear.js:3325,
botl painter) exists and says what is claimed.

## Density

Cliff-phase: do_statusline2 was the head at the parent (62b25e99c
block: 1 block, RNG lost 54470, s550 — verified in the parent tree).
Owner stands (painter whole, region heuristic), writer ported with its
session measured. One cliff, one file, code + ledger + test + verify in
one handoff. `Ledger: fix_worst_trouble ported` present. Not a no-op,
not unreached (probe +769 steps to a later owner).

## Verification

Re-measured myself (`verify do_statusline2,fix_worst_trouble --base
844401f85~1 --reach-all`):

- `verify do_statusline2: 0 PASS, 1 moved past, 0 unchanged, 0 worse →
  PROGRESS` (587210: 550 → list_genocided@1319)
- `smoke do_statusline2: 24/24 → REACH-OK`; `reach fix_worst_trouble:
  24 baseline-PASS reach, 24 PASS, 0 regressed → REACH-OK`
  (fix_worst_trouble blocks no session itself — disclosed as writer-only)
- Zero `worse`/REGRESSED. Matches the D-log Verify bullet exactly.

Grep of the hunk: clean (one import word, one guarded clear, comments).
Rule #2 clean (iteration-wide `imports.mjs --rulecheck`). No
seed/step/coordinate reads. New test pins the exact board JS side
pre-fix, passing post-fix per the log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
