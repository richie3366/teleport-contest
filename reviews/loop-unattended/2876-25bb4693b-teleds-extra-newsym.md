# Review 2876 — 25bb4693b — teleds extra newsym deleted (D-4035)

- SHA: `25bb4693b` (cliff, 1 function: `teleds`)
- D-entry: D-4035; Ledger: teleds stays ported (deletion of non-C line)
- `js/` diff: `js/teleport.js` +5/−1 (delete + C-cite comment); test
  `scripts/teleds-no-extra-newsym.test.mjs` (new, 1 test)

## Intent vs deliverable

Promise: both probes kind=screen at teleport.c:546, Hallu single-glyph
diffs with RNG fully matched — JS drew one extra display-stream word at
the teleport step, permanently shifting every later Hallucination glyph;
delete the destination `newsym(u.ux, u.uy)` C never makes. Diff actually
deletes exactly that line and adds a 5-line C-citing comment. No new
helper, no clone, no re-point. Promise = diff.

## Inventory

- `teleds` (js/teleport.js:≈1500–1560): changed — one line deleted.
  C: `nethack-c/upstream/src/teleport.c:447–573` (range per
  `node scripts/csym.mjs teleds`).

## C ↔ JS fidelity

C `teleds` paints exactly one cell directly: `newsym(u.ux0, u.uy0)` at
`teleport.c:536` (origin only, with the "hero disappears from the old
location" comment), followed by `see_monsters()`,
`vision_full_recalc = 1`, `nomul(0)`, `notice_mon_off()`,
`vision_recalc(0)` (:537–541) — verified in the pinned source above. No
destination newsym exists anywhere in the C body. The comment's second
cite also verifies: `vision.c:849–850` unconditional skip-label
`newsym(u.ux, u.uy)` ("Make sure the hero shows up!", guarded only by
`program_state.panicking`). So the deleted JS line was JS-invented, and
its removal restores C's draw sequence; the remaining `newsym(ox, oy)`
(:1527) is the `:536` origin paint. The two other `newsym(u.ux, u.uy)`
in js/teleport.js (:2686, :2758) are trap-symbol paints in other
functions, untouched. No RNG in this C region; the Hallu shift is the
unlogged display stream, consistent with the measured W1..W6 vs W1..W5
attribution. No symbol deleted or re-pointed (pure deletion), so no
`sym.mjs` re-point output is owed; `newsym`/`see_monsters` callees are
pre-existing live imports.

## Hallucinations / overclaim

None. The DIAG used for measurement (display-draw + paint +
newsym-caller in js/rng.js + js/display.js) is stated as reverted before
the fix, and the `js/` diff touches only teleport.js — consistent. The
"non-Hallu bit-identical" claim (hero glyph constant, vision repaints
anyway, memory idempotent) follows from the verified vision.c:850 paint.

## Density

Cliff-phase: owner-row writer fix, whole-function reasoning (C body read
in full, single extra draw localized by measurement, not by guessing).
One cliff, one line, `Ledger` unchanged (stays ported — correct, the
deleted line was never C). Standing omits (fill_pit thin, vision
notice_mon callers) explicitly left untouched and named. Not a no-op:
`js/` + focused test + movement.

## Verification

- Re-measure (this review):
  `hidden-proxy.mjs verify teleds --base 25bb4693b~1 --no-reach` →
  `verify teleds: 1 PASS, 1 moved past, 0 unchanged, 0 worse →
  PROGRESS` (Monk-50362016 PASS; Caveman-50055067 939 → doread@1272) —
  exact match to the D-log movement line, including the new owner.
- D-log Verify bullet: REACH-OK (smoke 24/24), green + strict ×2,
  cohort 7/7, forced full 44/44 — shipped claims; regression check is
  this audit's final rescore.
- `imports.mjs --rulecheck` → "Rule #2 clean" (run this iteration);
  diff grep for FORCE/DIAG/seed/coordinate gates → clean (comment-only
  addition).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
