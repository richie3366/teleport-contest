# Review 2707 — 13d2e0f03 — gulpmu resist uprops OR (D-3846)

Metadata: SHA `13d2e0f03`, D-3846, cliffs-head `detect.c`
dosearch0 writer (owner's own line already matches; the tail is
gulpmu's AD_FIRE message). JS: `js/mhitu.js` (+23/−14: four
locals + Slow_digestion + import). No committed test (probe
session is the pin).

## Intent vs deliverable

Promise: Healer-578136@878 prints C «mildly hot.» vs JS
«burning to a crisp!» — gulpmu's resist locals read legacy
flats only while the worn ring confers uprops-only; OR flats
with the slot; session PASSes. Diff actually does: four
locals + Slow_digestion gain `|| slot.intrinsic ||
slot.extrinsic`; 5 consts added to the existing const.js
import. Match.

## Inventory

- `gulpmu` locals (js/mhitu.js:1818–1831) — OR'd. C:
  mhitu.c AD_FIRE `:1517–1531` (read): `if (Fire_resistance)`
  → shieldeff + «mildly hot.» + tmp=0 else «burning to a
  crisp!» — exactly the symptom fork. C predicates:
  youprop.h Fire :26–28, Cold :30–32, Shock :42–44, Acid
  :59–61, Slow_digestion :289–291 (read) — each H||E ≡ the
  single uprops[PROP] store.
- `Slow_digestion` (js/mhitu.js:1667) — OR'd; RIN_SLOW_DIGESTION
  oc_oprop=54=SLOW_DIGESTION probed in the generated table. ✓
- `halfPhys` untouched (flat-only) — complete: no oc_oprop in
  the generated table confers HALF_PHDAM(56) (count 0,
  probed), and the sole extrinsic writer set_artifact_intrinsic
  (artifact.js:1158) goes through set_spfx_extrinsic, which
  mirrors uprops slot + flat together (read). No other
  HALF_PHDAM writers in js/.
- Module-level `Fire_resistance()` (mhitu.js:3398, flat-only,
  hitmu/passiveum readers only — not a gulpmu callee) left
  alone and named as Next lead. Import edge: `--can`
  → `ALREADY: mhitu.js already statically imports const.js`.

## C ↔ JS fidelity

The OR-both read is the established dual-storage idiom
(teleport.js Fire_resistance / trap.js lava_effects): C's
single store is split in JS between intrinsic-path flats and
confer_oc_oprop's uprops-only writes (E* mirrors exist only
for BLINDED/FAST/TELEPAT/STEALTH/LEVITATION — read the
helper), so neither read alone is complete and the OR is the
faithful join. The D-log's measured dump pins the mechanism
(ring worn, extrinsic=262144, all flats 0/undefined → crisp
arm). No RNG/prints changed in the predicate; the branch taken
is now C's. The `| 0` truthiness normalization on flats is
behavior-preserving.

## Hallucinations / overclaim

None. The Verify bullet honestly reports the companion run
(`verify gulpmu 2 unchanged` on the separate region-heuristic
row — not the probe sessions, not hidden). "Temp PROBE
reverted; no DIAG/FORCE/seed gates" — js-hunk grep clean.

## Density

Cliff-phase: head writer correct. One unit, Ledger `gulpmu
ported` + D-3846, Verify bullet with FULL PASS + both-spread
REACH + green + strict + cohort (full 44 correctly skipped —
no shared file). Reached: probe FULL PASSES.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify dosearch0 --base 13d2e0f03~1` →
`1 session(s) blocked on it (1 at baseline, 0 in the working
scoreboard)`, `scen-worldtour-Healer-578136: PASS`, `1 PASS,
... → PROGRESS`; reach 80/80 REACH-OK (spread sample of 158).
Zero regressed. The movement claim is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
