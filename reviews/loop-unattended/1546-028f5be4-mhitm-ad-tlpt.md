# Review 1546 — 028f5be4 — uhitm.c mhitm_ad_tlpt whole-body port (D-2587)

## Metadata

- SHA: `028f5be4`
- D-id: D-2587. Next index: 1546.
- Files: `js/mhitm.js` (+51/−14), `js/uhitm.js` (+10/−1).
- C locus: `nethack-c/upstream/src/uhitm.c:2858–2955`
  (`mhitm_ad_tlpt`), via `node scripts/csym.mjs mhitm_ad_tlpt` plus
  direct reads of `:2859–2930` (uhitm + mhitu arms) and `:2928–2955`
  (mhitm arm).

## Intent vs deliverable

Subject promises the uhitm arm port (floor, ungated negate pline,
pre-teleport name save, disappears pline, clamp), the mhitu
early-return pointing at the `_u` split, the unchanged mhitm arm, and
both dispatch wirings (mdamagem + damageum_adtyping). Diff delivers
all of it. Promise matches deliverable.

## Inventory

- Restarted: `mhitm_ad_tlpt` (`js/mhitm.js:1461`, ASYNC, export
  retained) — uhitm arm new, mhitm arm unchanged.
- New: `AD_TLPT = 23` const in both mhitm.js and uhitm.js
  (monattk.h-cited; elec precedent for per-file attack consts).
- New arms: `mdamagem` AD_TLPT block (`js/mhitm.js:4491`) and
  `damageum_adtyping` AD_TLPT arm (`js/uhitm.js:2377`).
- No deleted symbols — no `sym.mjs` delete output owed. Joined
  symbols checked anyway:
  - `mhitm_ad_tlpt js/mhitm.js:1461 ASYNC` — LIVE single export.
  - `u_teleport_mon js/teleport.js:1808 ASYNC` — LIVE; JS awaits it.
    Required `--can`: `mhitm.js already statically imports
    teleport.js. No new edge needed.`
  - `mhitm_ad_tlpt_u NOT EXPORTED — 1 LOCAL in js/mhitu.js:1018`
    (correct single local for the mhitu split; elec/blnd/ston
    precedent — architecture keeps `_u` file-local).
- Callees: `mhitm_mgc_atk_negated`, `canseemon`, `engulfing_u`,
  `Monnam`, `u_teleport_mon`, `tele_restrict`, `rloc` — all LIVE
  (mhitm-arm set pre-existing; `u_teleport_mon` joined this commit).
- RNG: none in the ported arms themselves (negate/teleport draws
  live in callees) — matches C.

## C ↔ JS fidelity

Callee closure per arm (LIVE / verified-CLONE / OMIT — no STUB):

- uhitm `:2864–2883` vs new JS: damage floor 1; negate gate with the
  pline OUTSIDE the else (ungated, exactly as C); `u_saw_mon =
  canseemon || engulfing_u` computed before the teleport with
  `nambuf = Monnam` saved first (`:2872` comment reproduced);
  `u_teleport_mon(mdef, false)`; disappears pline only when seen-then-
  lost; `:hitmu` clamp with the `mhp == 1 → 2` bump. Every line
  matches, in C order.
- mhitu `:2884–2927` vs pre-existing `mhitm_ad_tlpt_u`
  (`js/mhitu.js:1018`, read in full here — this is the
  dispatch-ported-callee-live check): hitmsg; negate(FALSE) gate with
  "not affected"; verbose uncertain line with the
  Teleport_control/Stunned/unconscious ternary; `tele()`; the 3.6.2
  non-fatal clamp with `(damage-1)/2` halving, `tmphp-1`, `×2`,
  `<1 → 1` with the mh/uhp bump, and no botl. Verified CLONE —
  complete, not a stub.
- mhitm `:2928–2954`: untouched by this diff (pre-existing port).
- Wiring: mhitu dispatch `case AD_TLPT → _u` (`js/mhitu.js:3146`,
  pre-existing) + new mdamagem block + new damageum arm routing
  `game.youmonst` through the shared arm. All three C arms now
  reachable; previously the two hero cases early-returned dead.

## Hallucinations / overclaim

None. The D-log discloses the shared-gate nuance
(`mhitm_mgc_atk_negated` youmonst-mcan, C `:82`) as pre-existing and
out of body instead of claiming it.

## Density

46 insertions for one 98-line C function (one new arm + two dispatch
wirings + cites) — one function family, right size (§2b).

## Verification

- D-log claims `verify.mjs --fn mhitm_ad_tlpt` → VERIFY: PASS
  (coverage row, 0 blocked at baseline — honestly stated).
- Re-ran here (required):
  - `hidden-proxy verify mhitm_ad_tlpt --base 028f5be4~1 --reach-all`
  - → 0 blocked both sides (vacuous note, expected)
  - → smoke 24/24 REACH-OK.
- Claim confirmed, not vacuous-by-rewrite.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
