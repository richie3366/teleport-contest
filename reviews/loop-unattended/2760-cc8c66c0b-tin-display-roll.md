# Review 2760 — cc8c66c0b — tin display path draws C's rn2(15)

- SHA: `cc8c66c0b4c90f8b9f7c65be728f127094bad8ce`
- Subject: D-3907 tin_details display path dropped C's rn2(15) (3 sweeps → FULL PASS)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3907` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: the objnam display clone of tin_variety substituted constant
HOMEMADE_TIN for C's `rn2(TTSZ-1)`, going stream-short one draw per
random-tin naming. Fix draws `rn2(TTSZ-1)`; 3 sweep sessions → FULL PASS.

Diff actually adds: `js/objnam.js` (+8/−4: rng.js import, local TTSZ,
the draw, doc) + new focused test
`scripts/tin-display-variety-roll.test.mjs`. No other `js/` hunks.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `tin_variety_display` (js/objnam.js:139, local clone) | eat.c:1488–1512 (csym) | changed: else arm draws |

## C ↔ JS fidelity

C (`eat.c:1488–1512`, csym): spe==1 → SPINACH; cursed → ROTTEN;
spe<0 → decoded; else `r = rn2(TTSZ - 1)` — unconditional on displ —
then the `!displ` homemade-rot arm (skipped when displ=TRUE) and the
lizard ROTTEN→HOMEMADE arm. `TTSZ = SIZE(tintxts)` = 16 (`:159`).

JS now matches branch-for-branch: same four-way order, same lizard arm,
correctly no `!rn2(7)` arm (displ=TRUE path). Table parity verified:
C tintxts 16 entries (15 + empty sentinel) vs JS 16 — `rn2(TTSZ-1)` =
rn2(15) both sides, draw-exact. The focused test pins C's recorded
`rn2(15)=8` at the exact log index.

Callers (csym `--callers`: eat.c:1435 tin_details TRUE, :1473/:1536
FALSE): C tin_details sole caller objnam.c:794 → JS `:701`, unchanged;
the two FALSE sites route to canonical eat.js, unchanged.

Helper classification: `tin_variety_display` is a CLONE, kept local —
verified forced: `imports.mjs --can js/objnam.js js/eat.js tin_variety`
→ IN-SCC (101-module cycle) **and** `tin_variety NOT EXPORTED by
eat.js`, so no import can exist. `rn2` is a LIVE import (rng.js leaf;
`--can` → edge safe). Nothing deleted or re-pointed. Grep: zero
`FORCE`/`DIAG`/`getRngLog`/`fastforward`/seeds.

## Hallucinations / overclaim

None. The retired "no rn2 side effects" rationale is honestly named as
the bug. The no-regression proof (r text-unused when spe==0; every new
JS draw has a C twin since C-known ⊇ JS-known) is sound and reach 2/2
backs it. The distfleeck stale-clearance is reported as zero-code-change
(D-1831 class), not claimed as movement. The override_ID under-draw is
named pre-existing and out of scope with the sibling rule — correct to
leave unqueued (no session evidence).

## Density

Cliff phase: tin_variety row-3 (row-2 distfleeck stale-cleared same
iteration, head UNPORTABLE-terminal); owner adjacent, writer shipped
whole with the retired omit. `Ledger: tin_variety ported` present.
Not a no-op: 3 sessions PASS.

## Verification

D-log: `verify tin_variety: 3 PASS`, reach 2/2, green/strict/cohort.
Audit re-measure (`verify tin_variety --base cc8c66c0b~1 --reach-all`):
Caveman-585509, Knight-585519, Tourist-585409 all PASS;
`3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (3 blocked at
baseline — not vacuous); reach 2/2 → REACH-OK. Claim confirmed
verbatim. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
