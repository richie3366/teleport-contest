# Review 2589 — 38bce8f45 — return_from_mtoss recalc light predicate

SHA: `38bce8f45` (D-3719). Light-predicate residual, 1 gate,
`js/mthrowu.js` only (+5/−1). Ledger: return_from_mtoss ported.

## Intent vs deliverable

Promise: C gates the notcaught vision recalc on full
`obj_sheds_light(otmp)` (:960); JS read bare `otmp.lamplit` → tail now
calls the live export via the file's dynamic-import idiom. Diff
actually adds: one dynamic import + the predicate call + C-cite
comment. No new statics. Promise matches diff.

## Inventory

- `return_from_mtoss` recalc tail (js/mthrowu.js:1148–1152) ↔ C
  mthrowu.c `:960` + light.c `obj_sheds_light` `:763–767` →
  `obj_is_burning` `:770–775`. Callee classification: LIVE —
  `obj_sheds_light` is a sync export (js/light.js:239), no clones.

## C ↔ JS fidelity

C :960 `if (obj_sheds_light(otmp)) gv.vision_full_recalc = 1;`
confirmed verbatim. C predicate chain confirmed verbatim:
`obj_sheds_light` returns `obj_is_burning(obj)` = `lamplit &&
(ignitable || artifact_light)`. JS chain is C-exact:
`obj_sheds_light` (:239) → `obj_is_burning` (:208)
`!!(obj && lamplit && (ignitable || artifact_light))` (null-guard is
the harmless JS envelope). So a lamplit-but-not-burning object (e.g.
non-ignitable, non-artifact) no longer forces the recalc — exactly the
claimed delta, state-only (recalc flag, no RNG/message on the path).
Import safety: `imports.mjs --can js/mthrowu.js js/light.js
obj_sheds_light` → IN-SCC but `function hoisted — cycle-safe`; the
dynamic `await import('./light.js')` matches 7+ precedents in the same
file (do.js/dokick/apply/artifact/makemon). No STUB, no OMIT.

## Hallucinations / overclaim

None. D-log states the vacuous verify and names the Soundeffect :953
standing convention.

## Density

One whole gate + focused test (3/4 → 4/4 claimed) + ledger + verify on
an empty queue, same-function successor of D-3718. Right-sized.

## Verification

Re-measured: `verify return_from_mtoss --base 38bce8f45~1 --reach-all`
→ 0 blocked (vacuous, as stated) + `smoke: 24 run, 24 PASS, 0
regressed → REACH-OK`. Matches the D-log. Rule #2 clean (dynamic ESM
import of a scored module is Rule-2-clean; rulecheck passed in-verify).
Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
