# Review 2848 — 2cf31268a — fatal artifact touch guard + start-exhaustion catch

## Metadata

- SHA: `2cf31268a857a7725a4cff0c07cc3d6c01d6de53` (D-4004)
- Must-fix js-throw (ships alone): genesis-Knight-50852027
  frozen-runner FAIL + hidden-worker crash
- js/ diff: `js/invent.js` +10/-1 (gameover guard in
  `hold_another_object`), `js/jsmain.js` +6 (outer
  exhaustion catch); two new test files
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: (1) JS matched the fatal Orb-of-Fate blast + death,
then continued the wish flow past `done()` — extracting and
re-dropping the orb at zeroed hero coords (0,0), whose
`impossible` floated an exhaustion rejection that escaped
`runSegment` (worker printed PASS then crashed exit 1,
board-blind). Guard on `gameover → return obj` before the
refuse/form-change arms (D-4001 idiom). (2) `runSegment`'s
outer catch handled only NhPanic, so exhaustion inside
`nhGame.start()` voided the run 0/0 — return nhGame with what
was captured, same as inside the loop.

Diff actually: the guard + cite; the catch + cite. Promise ==
diff.

## Inventory

- `hold_another_object` artifact arm (`js/invent.js:9650-9661`,
  C `invent.c:1207-1306` via `csym.mjs`, arm `:1219-1244`):
  `touched` captured, gameover guard added.
- `runSegment` outer catch (`js/jsmain.js:437-443`,
  harness entry, no C counterpart): exhaustion arm added.

## C ↔ JS fidelity

- C arm (`:1224-1230` read): `place_object(obj, u.ux, u.uy)`
  "in case touching this object turns out to be fatal",
  then `if (!touch_artifact(…)) { obj_extract_self; dropy;
  return obj; }` ✓ — on a fatal touch C's `done()` never
  returns, so the orb stays on the floor. JS now matches:
  `place_object` stands, the guard returns `obj` with the orb
  still placed, and the refuse/form-change arms run only on
  survival. RNG untouched (no draws in the arm either side).
- Caller closure: C has 14 `hold_another_object` sites; the
  D-log maps all 14 to wired JS call sites (probe path
  `zap.c:6419 → zap.js:7793` makewish). Signature unchanged;
  no rewiring needed for a mid-body guard, and the session's
  end-to-end PASS corroborates the caller's post-return path.
- jsmain catch ✓ (principled, not trace-shaped): the new outer
  arm is string- and behavior-identical to the pre-existing
  in-loop handler (`jsmain.js:433` read: same
  `includes('Input queue empty')` test → end-of-segment).
  General harness rule — no seed/step/coordinate/RNG-index
  reads; every other throw still propagates, and the NhPanic
  arm below is untouched.

Diff grep clean; Rule #2 iteration-wide clean (review 2844).
No symbol deleted/re-pointed.

## Hallucinations / overclaim

None. The commit discloses its own vacuous hidden-verify
("board-blind: none blocked at baseline") instead of dressing
it as a corpus PASS — the movement claim rests on the frozen
runner + worker exit + tests, all independently rechecked
below. "The (0,0) zeroing is unreachable past the guard" holds
(C never returns from `done()`).

## Density

Must-fix throw, ships alone per the strict rule. Ledger:
single `hold_another_object ported` +D-4004. Both committed
tests re-run green (1/1 each).

## Verification

- Frozen runner on the probe session (this review, HEAD
  code): **PASS 3493/3493 + 32/32**, `error: null` — the
  claimed FAIL→PASS endpoint reproduces exactly.
- Board row (`hidden-proxy show`, this review): `passed:
  true`, 3493/3493 + 32/32, `jsPanic: null` — the honest-PASS
  re-record stands.
- Re-measure (`verify hold_another_object --base 2cf31268a~1
  --no-reach`): **0 sessions blocked at baseline — vacuous**,
  exactly as the D-log disclosed. Not a violation: the queue
  row cited the frozen-runner throw, not corpus blocks, and
  the deliverable (crash fix) is verified by the runner + tests
  above.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
