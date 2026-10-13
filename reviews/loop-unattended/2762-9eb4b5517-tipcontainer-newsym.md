# Review 2762 — 9eb4b5517 — tipcontainer trailing newsym deleted

- SHA: `9eb4b5517ab3214b52ffddca52593b1c40c00a4c`
- Subject: D-3909 tipcontainer JS-only trailing newsym burned a display-RNG draw (Archeologist-585417 s451 → PASS)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3909` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: D-2612's JS-only trailing `newsym(ox, oy)` repainted the hero
cell after the transfer, burning one display-RNG draw C never makes and
shifting every later hallu re-roll. Fix deletes it; Archeologist-585417
→ FULL PASS (502 shifted screens reconverge).

Diff actually adds: `js/pickup.js` (tail −2/+7 comment, doc −3/+4),
`docs/c-js-map/turns.md` (#tip row note), new focused test
`scripts/tipcontainer-transfer-no-newsym.test.mjs`. Pure deletion + docs.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `tipcontainer` (js/pickup.js:5059, exported async) | pickup.c:3687–3841 (csym) | changed: tail deletion only |

## C ↔ JS fidelity

C (`pickup.c:3687–3841`, csym): the transfer arm (`:3780–3805`)
add_to_container moves no floor glyph; spill repaints per item via
dropy, highdrop via hitfloor. Grep of the whole C range for
newsym/flush_screen/see_objects/redraw: zero hits — C paints nothing
directly here, so the deletion is C-exact, not a behavior judgment call.
The measured mechanism (C-451 pass draws [112,431,301,45,178] vs JS
consuming 112 early inside the tip command; otyp decode
45→HALBERD `)` vs 178→RIN_POLYMORPH `=`) is consistent with one
phantom display draw.

Callers (csym `--callers`: exactly :3552/:3614/:3630): all three JS
call sites unchanged — deletion needs no rewiring. `newsym` import
correctly retained (still used at js/pickup.js:1176).

Helper classification: no helpers touched; dropy/hitfloor/doaltarobj
are LIVE callees. Nothing deleted or re-pointed besides the one call.
Grep: zero `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seeds; TEMP traces
reverted (`grep NH_TRACE_CELL js/` clean per D-log).

## Hallucinations / overclaim

None. The D-log's Measure section (C DISP re-record byte-identical,
37 contiguous JS draws verified, fobj chain checked clean) rules out
the chain-corruption alternative before deleting. The Next bullet's
blanket ban ("do not re-add a trailing newsym, any pass, any gate") is
C-grounded.

## Density

Cliff phase: tipcontainer row-2, head UNPORTABLE-terminal; owner whole,
the fix removes the owner's own invented paint. `Ledger: tipcontainer
ported` stands. Not a no-op: 1 session PASS.

## Verification

D-log: focused test FAIL (`=`) → PASS (`)`/6); `verify tipcontainer:
1 PASS`, smoke 24/24, green/strict/cohort.
Audit re-measure (`verify tipcontainer --base 9eb4b5517~1 --reach-all`):
`scen-sweep-Archeologist-585417: PASS`;
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (1 blocked at
baseline — not vacuous); smoke 24/24 → REACH-OK. Claim confirmed
verbatim. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
