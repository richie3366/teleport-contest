# Review 2878 — b608a104e — pray.js canonical Unchanging read (D-4037)

- SHA: `b608a104e` (cliff, 1 C macro family: `Unchanging`)
- D-entry: D-4037; Ledger: pray.c (in_trouble / fix_worst_trouble reads)
- `js/` diff: `js/pray.js` +8/−2 (import name + 2 reads); test
  `scripts/pray-unchanging-trouble-hit.test.mjs` (new, 1 test)

## Intent vs deliverable

Promise: dopray-head writer — poly hero with a worn unchanging amulet
never hit TROUBLE_HIT because both pray.js reads tested only the
`u.Unchanging`/`u.HUnchanging` flats while the amulet confers via
`uprops[UNCHANGING].extrinsic`; import the canonical `Unchanging(u)`
helper. Diff actually adds the import name to the existing
`./polyself.js` edge (no new edge) and switches both reads. Promise =
diff.

## Inventory

- `in_trouble` (js/pray.js:≈570–610): changed — `const unchanging` now
  canonical (feeds the pray.c:220 TROUBLE_HIT read and the :239
  TROUBLE_UNUSEABLE_HANDS read).
- `fix_worst_trouble` TROUBLE_UNUSEABLE_HANDS arm (js/pray.js:796):
  changed — pray.c:498 read now canonical.
  C: `pray.c:215–242` + `:490–505` (in_trouble / fix arms),
  `youprop.h:370–372` (macro) — all verified in pinned source.

## C ↔ JS fidelity

C macro (`youprop.h:372`, verified): `Unchanging ≡ HUnchanging ||
EUnchanging`. C reads all three sites (`pray.c:220`
`(!Upolyd || Unchanging) && critically_low_hp`, `:239`
`(!Unchanging || (unchanger cursed))`, `:498 `if (!Unchanging)` —
verified). The "covers all three" claim holds: :220 and :239 share the
one `const unchanging` (:585, feeding `:586` and `:603`
`!unchanging || …`), :498 is the :796 fix-arm. The helper
(`js/polyself.js:438–442`) returns
`(u.Unchanging || u.HUnchanging || u.EUnchanging) || intrinsic ||
extrinsic` — a superset union of C's H||E, i.e. TRUE in C ⟹ TRUE in
JS; the flats-only readers it replaced could read FALSE where C reads
TRUE (this bug). Import, not a new clone — correct per `sym.mjs
Unchanging`, which shows the polyself export plus 7 pre-existing local
clones elsewhere and says IMPORT (this SHA imports; it does not add an
8th clone or re-point any existing one). No RNG at these reads either
side. Branch order around the reads untouched.

## Hallucinations / overclaim

None. The mechanism (amulet → extrinsic-only conferral, no E-flat
mirror) is consistent with the helper body and the C macro. The queued
«much better» on cached C step-356 as proof of the skipped TROUBLE_HIT
arm is concrete recorded-C evidence, not inference.

## Density

Cliff-phase: dopray-head writer, whole-read fix (all three C reads in
one commit via the shared const), `Ledger` updated. Named: (1) park
kin re-verified, (2) the 1047 residual named as a later owner with its
own future row (correct — not laundered as progress), (3) standing
fix_worst_trouble note untouched. Not a no-op: `js/` + test + movement.

## Verification

- Re-measure (this review):
  `hidden-proxy.mjs verify dopray --base b608a104e~1 --no-reach` →
  `verify dopray: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Ranger-50055084 355 → do_improvisation@1047) — exact match to the
  D-log line, including the new owner. Non-vacuous (1 blocked).
- Focused test re-run: `# pass 1, # fail 0`.
- D-log Verify bullet: syntax, rule2, REACH-OK dopray + in_trouble
  smokes 24/24, green + strict ×2, cohort 7/7, forced full 44/44 —
  shipped; final rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); diff adds one
  name to an existing edge, no FORCE/DIAG/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
