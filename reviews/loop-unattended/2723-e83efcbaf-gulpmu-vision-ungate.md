# Review 2723 — e83efcbaf — gulpmu vision ungate (D-3863)

Metadata: SHA `e83efcbaf`, D-3863, cliffs-head
`mhitu.c` gulpmu writer (swallow-site vision
shutdown loop was Hallu-gated, the unmap never
ran). JS: `js/mhitu.js` (+10/−5: gate removal +
C cite). Test:
`scripts/gulpmu-swallow-vision-unmap.test.mjs`
(new).

## Intent vs deliverable

Promise: Monk-578214@241 stale memory-'I' — C's
vision_recalc(2) main loop newsyms (71,4) via
display_warning→unmap before uswallow=1, but
JS gated the extracted loop on Hallu so the
unmap never ran; run it unconditionally (screen
paints wiped by swallowed(1)'s cls below, only
memory persists); 1 PASS + 1 moved 241→433.
Diff actually does that. Match.

## Inventory

- gulpmu engulf site (mhitu.js:1772): deleted
  the 5-line Hallu block; unconditional
  `vision_off_newsym_gbuf({useLiveViz:true})`
  before `vision_recalc(2)` + `uswallow=1`.
  C: mhitu.c `:1374–1377` (read):
  `display_nhwindow(MESSAGE)` →
  `vision_recalc(2); /* hero can't see anything
  */` → `uswallow=1` — order exact.
- C vision.c `:741–836` main loop (read whole):
  no Hallucination reference anywhere — the
  gate had no C counterpart. Removal is
  faithful, with the D-3807 departure-gate
  precedent cited.

## C ↔ JS fidelity

Verified CLONE, widened correctly. The helper
`vision_off_newsym_gbuf` (vision.js:1371, live
export, read) implements the control==2 path
with next empty: every column falls to
not_in_sight, and C's `old IN_SIGHT || (next
COULD_SEE ^ old COULD_SEE)` with next=0
reduces exactly to the coded `old IN_SIGHT ||
old COULD_SEE → newsym` (boolean identity,
verified by reading both). The earlier three
arms (IN_SIGHT/lit/waslit) cannot fire with an
empty next array — the reduction is complete,
not an arm skip. The `(ux>0) newsym(ux,uy)`
covers the hero cell C's loop reaches via
rmin/rmax. No new symbol, no re-point (the
deleted Hallu local was block-scoped); the
helper is shared with docrt/goto_level/getbones
callers. No RNG in the loop (newsym-only).

## Hallucinations / overclaim

None. The "paints wiped by cls" claim is
structural (swallowed(1) cls follows in the
same function); the TEMP-C measurement
((71,4) newsym via display_warning) is cited
with coordinates, not asserted from JS. No
DIAG/FORCE/seed in the js hunk.

## Density

Cliff-phase: gulpmu head (D-3861 parked the
symptom with a [measure] row one commit
earlier; this ships the writer it pointed at —
model park→writer flow). Ledger: mhitu.c
gulpmu row + D-3863. Reached: probe moved.

## Verification

Rule #2 clean (iteration-wide). At-ship D-log:
`verify gulpmu: 1 PASS, 1 moved past`
(578112 PASS, 578214 241→getpos@433). Re-measure
(mine, current HEAD): `2 session(s) blocked on
it`, **both PASS**, `2 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS`; reach 95/95
REACH-OK. Zero regressed. The extra PASS is
later progress (578214's getpos@433 block fell
to D-3865 — see review 2725), not a
contradiction: at-ship claim true, current
code strictly further.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
