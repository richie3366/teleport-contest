# Review 2653 — 603f1f8e6 — nh_timeout index-order dispatch (D-3789)

Metadata. SHA `603f1f8e6` (2026-10-10), D-3789, parent
`9b42202e5` (HEAD). js diff: `js/timeout.js`
+183/−176 — the 7 dedicated arms move from
pre-loop position into index dispatch inside the
single loop; focused test (1 it). Works cliffs
row-2 yn_function (95303).

## Intent vs deliverable

Promise: 95303@957 — C shows «Die? [yn] (n)»
(STRANGLED expiry) while JS prints «You feel
yourself slow down» (FAST expiry) 2 steps
early: the dedicated arms ran before the index
loop, so FAST(64) fired ahead of
STRANGLED(19); C fires both in one index-order
loop.

Diff delivers the index dispatch with
per-index decrement+fire. Promise and diff
match.

## Inventory

Changed JS (1 writer, restructured):

- nh_timeout — `js/timeout.js:1067–1250`. C:
  `timeout.c:670–730` (single loop read:
  `for (upp …) if ((intrinsic & TIMEOUT) &&
  !(--intrinsic & TIMEOUT))`, FAST case at
  `:723`).
- Indices: `prop.h:32–68` — STUNNED 13,
  CONFUSION 14, BLINDED 15, DEAF 16, FUMBLING
  25, WOUNDED_LEGS 26, FAST 64 — read; JS
  dispatch order matches exactly.
- Set: `TIMEOUT_DEDICATED` (`:94–96`, the 7
  indices); loop `for p = 1..LAST_PROP`
  (`:1082`); STRANGLED generic arm at `:1389`
  in the same loop.

## C ↔ JS fidelity

**Order C-exact.** C's one loop decrements and
fires per index, so STRANGLED(19) deaths block
before FAST(64)'s message; JS now does the
same — dedicated arms at their index, generic
arms (STONED/SLIMED/SICK/STRANGLED…) in the
same pass. `sync_timeout_flats` still runs
once before the loop (one removed line, one
added — verified in the diff). Arm bodies
moved, not rewritten: the STUNNED block text
is identical at its new site (OR-read,
dual-write, make_stunned + occupation gate),
and D-3605's STUNNED-before-CONFUSION case is
subsumed by index order with cites kept. The
95303 FULL PASS (RNG 56465/56465, screens
1593/1593) proves the move preserved every
arm's behavior. No symbol deleted or
re-pointed, so no sym.mjs paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero code hits (the one
FORCE/DIAG match is the subject's own "no
DIAG/FORCE" sentence). The C-side record
(955/956/957/958/959 screens) is measured,
and the +1 screen count fork is explained,
not hand-waved.

## Density

Cliff-phase §2b: one row-2 writer
restructured whole, no bundling. 95303 →
PASS (full 1593 screens). timeout.js shared —
full 44/44 ran.

## Verification

D-log Verify: yn_function 1 PASS; REACH-OK
both fns; gates + cohort + full PASS.

Re-measured by this audit (`verify yn_function
--base 603f1f8e6~1 --reach-all`):

```text
verify yn_function: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Ranger-95303: PASS
smoke yn_function: 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly. 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
