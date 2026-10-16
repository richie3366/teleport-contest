# Review 2875 — f4c088bb2 — make_vomiting uprops mirror (D-4034)

- SHA: `f4c088bb2` (cliff, 1 function: `make_vomiting`)
- D-entry: D-4034; Ledger: `make_vomiting ported`
- `js/` diff: `js/potion.js` +10/−1 (import name + mirror block); test
  `scripts/make-vomiting-uprops-mirror.test.mjs` (new, 1 test)

## Intent vs deliverable

Promise (subject + D-log): regen_hp row-9 writer — `make_vomiting` wrote
the `u.Vomiting` flat only, so a stoned case-2 clear left the
`uprops[VOMITING]` slot set and `vomiting_dialogue` ran (extra
`exercise` rn2(2)) where C skips it; mirror TIMEOUT bits to the slot,
both probes FULL PASS. Diff actually adds: `VOMITING` to the existing
`./const.js` import (no new edge) + a 9-line mirror block with C cites.
No signature change, no new helper, no clone. Promise = diff.

## Inventory

- `make_vomiting` (js/potion.js:829–851): changed — added slot mirror.
  C: `nethack-c/upstream/src/potion.c:242–255` (range per
  `node scripts/csym.mjs make_vomiting`); macro
  `Vomiting ≡ u.uprops[VOMITING].intrinsic` at `youprop.h:111` (verified
  in pinned tree).

## C ↔ JS fidelity

C body (`potion.c:242–255`): `old = Vomiting; if (Unaware) talk=FALSE;
set_itimeout(&Vomiting, xtime); disp.botl=TRUE; if (!xtime && old &&
talk) You_feel("much less nauseated now.")`. JS (potion.js:829–851)
executes the same arms in C order: `old` flat-read, `Unaware()` gate,
flat TIMEOUT write, **new** slot TIMEOUT write, botl flags, message arm.
No RNG in C; JS draws none. The mirror line is byte-shape-identical to
the D-2396 siblings (`make_slimed` potion.js:1053–1054, `make_stoned`
:1083–1084, verified above). `itimeout()` clamps to TIMEOUT
(potion.js:634–637), matching `set_itimeout` TIMEOUT-bits-only write.
`VOMITING`: `sym.mjs` → `js/const.js:2621 sync export const` (nothing
deleted or re-pointed, so no re-point output required beyond this).
Callers: C lists 11 sites (`csym.mjs --callers`, all printed); the
D-log Callers bullet names all 11 with JS 1:1 wirings — count and loci
match, no unwired caller. Whole function, no deferred arm.

## Hallucinations / overclaim

None. The "stoned case-2 clears before the vomiting guard" mechanism
(timeout.c:177 before :627 dispatch) is cited with line numbers and is
consistent with the rng-diff evidence (exactly one extra pre-regen
rn2(2), all later draws shifted by one). The /tmp prefix probe is
described as out-of-tree evidence, not committed. `old` staying
flat-read is declared as (1) under Named with the flat==slot invariant
argument — a named choice, not a silent gap.

## Density

Cliff-phase: writer port for the regen_hp row-9 owner, which the D-log
proves whole first-hand (js/allmain.js:468 arms + ledger ported D-3459)
rather than re-porting it — correct symptom/writer discipline. Rows
1–3+5–8+10 skipped as D-4016 kin and row 4 as D-4028 kin, each with a
re-verification claim in this iteration (recipe OPTIONS + cached-screen
proofs named). One cliff, one C function, `Ledger: make_vomiting
ported` entry present. Not a no-op: `js/` + focused test + movement.

## Verification

- Re-measure (this review):
  `hidden-proxy.mjs verify regen_hp --base f4c088bb2~1 --no-reach` →
  `verify regen_hp: 2 PASS, 0 moved past, 0 unchanged, 0 worse →
  PROGRESS` (Tourist-51050041 + Archeologist-50055100 both PASS) —
  exact match to the D-log movement line. No vacuous check (2 blocked
  at baseline, both named).
- Focused test re-run: `# pass 1, # fail 0`.
- `imports.mjs --rulecheck` → "Rule #2 clean"; diff grep for
  FORCE/DIAG/getRngLog/fastforward/seed names → clean.
- D-log Verify bullet claims REACH-OK (smoke 24/24 + regen_hp 80/80),
  green 2/2 + strict ×2, cohort 7/7, full 44/44 — taken as shipped
  (this audit's full rescore at the end is the regression check).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
