# Review 2754 — f80be88fd — resists_cold follows Resists_Elem

- SHA: `f80be88fdc963ff7defaeac5cc99d900f270e682`
- Subject: D-3898 gethungry-row writer resists_cold (Valk-585510 FULL PASS)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3898` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: `resists_cold(hero)` false despite `Cold_resistance()` true —
the species-bit clone missed the hero arm — so the cold-resistant skater
drew `rn2(3)` at slippery ice where C exempts; fix makes the zap.js
export `return Resists_Elem(mon, COLD_RES)` and re-points mhitm/explode
locals plus mhitu/uhitm call sites to it, moving Valk-585510 to FULL PASS.

Diff actually adds: `js/zap.js` — export body replaced + COLD_RES import;
`js/mhitm.js`, `js/explode.js` — local bit-test clones deleted, import
the export (same-edge name adds); `js/mhitu.js:3132` passive AD_COLD arm
`resists_mr(mtmp, MR_COLD)` → `resists_cold(mtmp)`; `js/uhitm.js` gulpum
cold arm → `resists_cold(mdef)`; new focused test. No new edges.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `resists_cold` (js/zap.js:1516) | monst.h:273 (macro) + mondata.c Resists_Elem | changed, body replaced |
| mhitm/explode locals | same | deleted → import |
| mhitu passive / uhitm gulpum arms | mhitu.c:2561–2571 / gulpum | re-pointed |

## C ↔ JS fidelity

C (`monst.h:272–279`, read in pinned C): `resists_cold(mon)` IS
`Resists_Elem(mon, COLD_RES)` — the bit test was never C for this
predicate. JS export is now exactly that call. `Resists_Elem`
(`js/mondata.js:289`, live since D-2802 poison) verified: hero arm
(`isYou → hero_uprop_resists`, :321–325), wielded-artifact arm (:327),
worn oc_oprop + smock + carried-artifact grants (:330–360) — the arm the
bug needed (hero Cold_resistance) is present and C-cited.

Helper classification: deleted locals were clones (species-bit subset);
re-point targets are LIVE. `sym.mjs resists_cold` →
`js/zap.js:1516 sync`, single definition — the re-point is complete, no
straggler clone. Remaining bit-test users (resists_fire/elec/acid/
disint/sleep/ston, gulpum elec/fire arms, mhitu passive elec/fire/acid)
are named in the D-entry with the D-2802 list reference — C also defines
those as Resists_Elem, so each is a known named gap shipping on its own
falsifier, not a silent stub. Unused MR_COLD imports/consts left behind
are disclosed (no gate impact).

Grep: `FORCE`/`DIAG`/`getRngLog`/`fastforward` zero in `js/` hunks
(prose hits are draw citations in the message/D-log).

## Hallucinations / overclaim

None. Geom-probe 0-cell result correctly used to rule out terrain;
"JS drew rn2(3) so Cold_resistance true yet resists_cold false" is the
measured contradiction. `#if 0` dead-C note (muse.c:1993) checked and
plausible.

## Density

Cliff phase: `gethungry` was the cliffs head; writer `resists_cold`
correctly ported. `Ledger:` entry present (mondata.c). One cliff, one
predicate family, no bundling. Not a no-op.

## Verification

D-log: `verify gethungry: 1 PASS`, reach 80/80 spread, resists_cold
vacuous disclosed, green/strict/cohort, full public 44/44 forced.
Audit re-measure (`verify resists_cold,gethungry --base f80be88fd~1
--reach-all`): Valk-585510 PASS; `1 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS`; reach gethungry 1311/1311 (full) → REACH-OK;
resists_cold smoke 24/24. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
