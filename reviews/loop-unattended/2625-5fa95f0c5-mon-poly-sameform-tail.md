# Review 2625 — 5fa95f0c5 — mon_poly tail compares form index (D-3759)

Metadata. SHA `5fa95f0c5` (2026-10-10), D-3759, parent
`8901dc583`. js diff: `js/mhitm.js` +10/−2 (entry
`oldMndx` capture + tail mndx compare, reference
compare removed) +
`scripts/mon-poly-sameform-tail.test.mjs` (new, 3
source pins). Ledger: `mon_poly` ported (D-3759
appended). Works its HEAD's cliffs head (`uhitm.c`
mhitm_knockback, 2 blocked: 95317, 95233 — verified
head of the parent queue @4ddfa4bb2).

## Intent vs deliverable

Promise (subject + D-log): both probes kind=rng — C
`rn2(3) @ mhitm_knockback` vs JS `rnd(2)=1 @
mon_poly(mhitm.js:726)`. Measured: both sides run the
same mhitu AD_POLY attack with identical newpw/newman
draws and hero 335→335 (same form), then JS burns one
extra rnd(2) and the streams stay shifted by one for
the rest of both sessions. At the call, form index is
unchanged (335/335/335) yet `mdef.data !== oldform` is
true — JS `mons()` builds a fresh object per call
while C compares canonical `mons[]` pointers. Compare
the stored form index instead.

Diff actually adds exactly the entry capture and the
tail compare. Promise and diff match. No import change.

## Inventory

Changed JS (1 gate):

- mon_poly tail — `js/mhitm.js:641–644` (entry
  `oldMndx`) + `:732–733` (tail `newMndx !== oldMndx`).
  C: `mhitm.c` mon_poly `:1121–1207` (per CURRENT; tail
  `:1203–1204` `if (mdef->data != oldform && magr !=
  &gy.youmonst) magr->mspec_used += rnd(2);` — body
  read). C callers: `uhitm.c:3744/:3759/:3767`;
  decl `NONNULLARG12` (magr never NULL).

## C ↔ JS fidelity

**Compare exact under JS's object model.** C's
`mdef->data != oldform` is a canonical-pointer
inequality: same form ⇒ identical pointer ⇒ no draw.
JS reinstalls `data` (fresh `mons()` object) even when
the form index is unchanged, so the old reference
compare drew `rnd(2)` unconditionally — a one-draw
shift, exactly the measured symptom. The new
`newMndx !== oldMndx` (both via `?.mndx ?? mnum ??
NON_PM`) restores C's predicate: same index ⇒ no draw,
changed index ⇒ `rnd(2)`. The fallback chain mirrors
the pm_to_cham idiom already used in this file.

**Rest of the gate untouched and C-true.**
`magr && !is_youmonst(magr)` ≡ C's `magr !=
&gy.youmonst` on all C-reachable paths (NONNULLARG12 —
the `magr &&` is defensive-only, pre-existing).
`mspec_used + rnd(2)` and `return dmg | 0` match
`:1204–1206`. No callee touched (rnd only); no stubs.
No symbol deleted or re-pointed, so no sym.mjs paste
is owed. The D-log's arm-for-arm "rest of mon_poly
whole" note is a re-audit statement inside a shipping
iteration, not a no-op deliverable.

**Test.** 3 source pins on the mndx idiom (entry
capture, tail compare, no reference compare); the
D-log is explicit that behavioral proof is the two
probe sessions, with the harness-cost reason stated.
Re-ran: 3/3 (this audit). Thin but honest; the corpus
probes are the real pin and both PASS below.

## Hallucinations / overclaim

None. Diff grep (FORCE / DIAG / getRngLog / fastforward
/ seed / coords): one hit, the commit message's "temp
… DIAG … all reverted" — revert verified (js diff
touches only mhitm.js; rng.js untouched). The "one-draw
shift collapses, both sessions identical to the end"
claim re-verifies below (2 FULL PASS).

## Density

Cliff-phase §2b: parent head mhitm_knockback (2
blocked, RNG lost 41238); this commit ships the writer
(mon_poly's tail — owner already whole per D-2750,
read once) with 2 FULL PASS. One cliff, one C locus
(`mhitm.c:1203–1204`), no bundling. Correct gates
(green/strict/cohort; full skipped with the no-shared-
file reason stated).

## Verification

D-log Verify (`verify.mjs --fn
mon_poly,mhitm_knockback`): 2 PASS; mon_poly vacuous +
24-smoke; knockback 80/80 spread; gates PASS.

Re-measured by this audit (`verify
mon_poly,mhitm_knockback --base 5fa95f0c5~1 --reach-all`;
HEAD code includes 5 later SHAs):

```text
verify mon_poly: no corpus session is blocked on it at 5fa95f0c5~1 — a vacuous verify is NOT a corpus PASS. […]
smoke mon_poly: no RNG-tagged reach; fixed smoke spread (24 run, 13.5s): 24 PASS, 0 regressed → REACH-OK
verify mhitm_knockback: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Knight-95317: PASS
  scen-worldtour-Wizard-95233: PASS
reach mhitm_knockback: 655 baseline-PASS session(s) reach it (655 run, 402.2s): 655 PASS, 0 regressed → REACH-OK
```

Both named probes FULL PASS on current code; full
(non-spread) reach on the owner, all 655, with 0
regressed. No vacuous check (row cited 2; both
itemized; the mon_poly vacuity note is correct usage).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
