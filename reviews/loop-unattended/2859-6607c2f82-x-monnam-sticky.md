# Review 2859 — 6607c2f82 — x_monnam priest arm clears the Hallucination sticky

## Metadata

- SHA: `6607c2f82279183b922c5005a35a460f1a7b901b` (D-4017)
- Cliff writer: `slimed_to_death` row 2 @ebfb0b3f9 (4 blocks;
  row 1 parked TOOLING-ENV), writer x_monnam priest arm
- js/ diff: `js/do_name.js` +18/-2 (sticky save/clear/restore
  + cite); new `scripts/x-monnam-exact-hallu.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: C's priest arm forces EHalluc_resistance so the
Hallucination macro reads false inside priestname, but JS's
sticky-first `Hallucination()` defeats it — also save/clear/
restore `u.Hallucination` when !do_hallu. 3 FULL PASS.

Diff actually: the sticky lines + comment. Promise == diff.

## Inventory

- `x_monnam` priest arm (`js/do_name.js:996`, C
  `nethack-c/upstream/src/do_name.c:826-1032` via `csym.mjs`,
  arm `:886-904`): sticky handled alongside EHalluc.

## C ↔ JS fidelity

- C arm (read): save EHalluc_resistance, `if (!do_hallu)
  EHalluc_resistance = 1L`, priestname, restore — JS had this
  verbatim and keeps it. Macro (`youprop.h:116-120` read):
  `Hallucination ≡ HHallucination && !Halluc_resistance` —
  forcing EHalluc makes it false in C, which has no sticky.
- Premise verified first-hand: JS `Hallucination()`
  (`js/do_name.js:275`) returns true on `u.Hallucination`
  before ever reading resistance — so the EHalluc assignment
  was ineffective while hallucinating, exactly as diagnosed.
  The fix clears the sticky only under !do_hallu and restores
  unconditionally (`undefined` stays `undefined`-valued —
  falsy either way); non-hallu and do_hallu paths are
  byte-identical. `priestname` (`js/priest.js:184`) is sync,
  so the restore always runs. Caller chain matches C
  (`end.c:271-274` priest/minion → m_monnam, "overrides the
  effect of Hallucination" comment). `sym.mjs` N/A — no
  symbol deleted or re-pointed.

## Hallucinations / overclaim

None. The Valkyrie residual is named as a separate end.c
writer with its toplines quoted, not absorbed.

## Density

Cliff commit on the port head: row 1 is the parked dupe-rc
shape (verified `ebfb0b3f9:LOOP-QUEUE.md`; D-4016 falsifier
re-verified first-hand per the D-entry), so row 2 was the
correct head; whole-arm port at the C locus with the global
reorder explicitly deferred as named omit (2). No FORCE/DIAG/
seed reads; Rule #2 clean (see 2853).

## Verification

Re-measured on HEAD code, `--base 6607c2f82~1 --no-reach`:

- `verify slimed_to_death: 3 PASS, 0 moved past, 1 unchanged,
  0 worse` — all three probes PASS; Valkyrie@1003 unchanged
  is the named genocide writer. Claim holds exactly.
- `verify x_monnam: 0 PASS, 0 moved past, 3 unchanged, 0
  worse` — other arms, untouched, no regression.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
