# Review 2371 — a0cbe29a6 — mons() identity family → mndx (D-3425)

- SHA: `a0cbe29a6` — "Must-fix review 2355: mons() identity-compare family → mndx (5 files) (D-3425)."
- D-entry: D-3425. Diff: js/dog.js, potion.js, trap.js, wizard.js, zap.js
  (10 one-line sites, no import/signature changes); ledger dog/potion/
  trap/wizard/zap; journal + index + queue-archive.
- Scope: Must-fix for review 2355 item 1 (9 functions, 10 sites).
- `sym.mjs`: nothing deleted or re-pointed (expression-level flips) —
  no paste obligation.

## Intent vs deliverable

Promise: flip every pure `===/!== mons(PM_X)` to the house
`(x?.mndx ?? -1)` idiom with a C-line cite; trim the 3 dead OR arms;
eat.js ×3 + priest.js:505 verified already-clean, untouched.

Diff actually does: 7 pure flips (dog 1, trap 1, wizard 3 across 2
sites, zap 3 across unturn_dead + stone ×2) + 3 dead-arm trims
(potion is_pestilence_pot, cancel_monst, bhitm) + the `(x|0)` →
`(x ?? -1)` normalization on the 2 trim sites. All 10 review-2355
sites accounted: dog ✓, trap ✓, zap 3563/5276/5313 ✓, wizard
158/159/429 ✓, eat ×3 gone via D-3412's the_unique_pm rewire
(verified: no `uniq=false`/identity sites remain), potion/zap/zap
trims ✓, priest mnum-only ✓ (with the mons-fresh comment).
Repo-wide grep confirms zero `=== mons(`/`!== mons(` remain.
Promise == deliverable.

## Inventory

```text
mon_arrive         | split   | js/dog.js (link arm fixed) | C dog.c:420-623
animate_statue     | partial | js/trap.js:animate_statue  | C trap.c:726-900
unturn_dead        | ported  | js/zap.js:unturn_dead      | C zap.c:1156-1222
stone_to_flesh_obj | ported  | js/zap.js                  | C zap.c:1993-2112
nasty              | ported  | js/wizard.js:nasty         | C wizard.c:591-711
strategy           | ported  | js/wizard.js:strategy      | C wizard.c:270-327
cancel_monst       | ported  | js/zap.js:cancel_monst     | C zap.c:3150-3215
bhitm              | ported  | js/zap.js:bhitm            | C zap.c:160-573
potionhit          | ported  | js/potion.js:potionhit     | C potion.c:1625-1928
```

Pre-images checked: 7 rows were already `ported` (re-certifications,
not flips), mon_arrive already `split`, animate_statue `partial`
with the same shk_your omit the D-log carries. No status needed a
whole-body re-walk; the burden is per-site, and it is met below.

## C ↔ JS fidelity

Premise verified, not trusted: `mons(mndx)` (monsters.js:227)
returns a fresh object literal per call (null when out of range) —
every pure identity compare was indeed dead. Every C locus read:
dog.c:437, trap.c:752, zap.c:1195/:2020/:2055, wizard.c:687-688/:288,
zap.c:3201 (clay), zap.c:438 (pest; C phrases it negative, JS `pest`
+ `!pest` is equivalent), potion.c:1743/:1760 — all pointer compares,
all matched by the flipped site with a correct C-line cite.

Idiom safety: `?? -1` reproduces the old null-vs-object outcome on
every site (null `===`→false, `!==`→true; all PM constants ≥ 0).
The paranoid corner (unturn_dead with null data + corpsenm −1) also
holds: mons(−1) is null, so old `null !== null` → false ≡ new
`−1 !== −1` → false — and mtmp2.post-revive data is never null
anyway. `(x|0)` → `(x ?? -1)` is behavior-identical (0 and −1 both
miss every nonzero PM index). No new imports needed (all PM consts
already in scope at each site).

## Hallucinations / overclaim

None. "Measured mons(10)!==mons(10)" reproduces from the source
(fresh literal per call). "Null data behaves exactly as the old
compare" proved above, including the corpsenm corner. "No corpus
session blocked" matches the re-measure. Closes review 2355 item 1
in full (10 sites + 4 fallback dispositions; `**Addressed:** D-3425`
stamp present).

## Density

One-item Must-fix, ships alone (9 fns, 10 one-line sites + probe).
Per-function verdicts: all 9 ACCEPT. Ledger entries + Verify line
present (verify covered 6 fns; this review re-measured all 9).

## Verification

- Re-measured all 9 fns (`--base a0cbe29a6~1 --reach-all`): 0 blocked
  everywhere (vacuous, as D-logged — review-cited) + mon_arrive
  reach 165/165 PASS (stronger than the D-log's 80-spread), nasty
  14/14, bhitm 2/2, potionhit 16/16, rest smoke 24/24 → REACH-OK ×9.
  0 regressed, 0 worse. Claims hold.
- `imports.mjs --rulecheck`: Rule #2 clean (this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
