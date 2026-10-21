# Review 3035 — c080d60bf — place_lregion returns impossible()'s Promise on total failure

- SHA: `c080d60bf` (cliff; board row impossible,
  scen-worldtour-Archeologist-50056033 s963, the «Please report these
  messages…--More--» lost under goto_level's cls)
- D-entry: D-4195; Ledger: place_lregion ported
- `js/` diff: mklev.js +6 −3

## Intent vs deliverable

Promise: mkmaze.c place_lregion ends a total failure with
`impossible("Couldn't place lregion type %d!", rtype)` (`:409`). C prints
all three report lines before returning. JS called the async
impossible() without returning it, so goto_level's docrt → cls → more()
ran ahead of the third line.

Diff: `impossible(...)` becomes `return impossible(...)`, and the doc
comment is corrected (it used to say the failure "does not return that
Promise"). The promise matches the diff. This is the same floating-
promise family as D-4159 / D-4195 in memory: a sync JS function that
calls an async impossible() must return it.

## Inventory

- place_lregion — mklev.js:781–833 (C mkmaze.c:356–410).
- impossible — existing display.js import, now returned.

## C ↔ JS fidelity

C `:393–409`: 200 random rn1 tries, then a deterministic scan, then
`impossible(...)` before the function returns (void). The JS RNG and
scan order are unchanged. The only change is that the failure's
Promise reaches the caller.

Callers (every `place_lregion(` site in js/, 25):

- u_on_rndspot mklev.js:746/751/757: `await place_lregion(...)`.
- fixup_special place_it :2669 → :2691/:2718/:2723 `pending = place_it(...)`,
  chained; the branch fallback :2757 goes through `afterPending(p, …)`.
- 20 special-level loader lregion arms: `return place_lregion(...)`
  inside a callback whose result is tested with `isThenable(...)` and
  `.then(...)` (e.g. medusa-1 :5573–5580).

No caller reads the value as a boolean, so returning a Promise on the
failure arm changes ordering only. That ordering is now C's: the report
completes before the caller resumes.

## Hallucinations / overclaim

None. The D-log's "Measured" bullet (an overwrite trap naming more ←
cls ← docrt ← goto_level) is consistent with the diff. It correctly
separates this writer from D-4190's postmov row, which did not move this
session.

## Density

One returned expression on the writer. Right-sized.

## Verification

```text
verify impossible,place_lregion --base c080d60bf~1 --no-reach
  impossible:    1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
                 (scen-worldtour-Archeologist-50056033: PASS)
  place_lregion: 0 blocked (vacuous)
```

This reproduces the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
