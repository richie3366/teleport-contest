# Review 1501 — 3bd853d7 — uhitm.c mhitm_ad_elec (D-2542)

## Metadata

- SHA: `3bd853d7`
- D-id: D-2542. Next index: 1501.
- Files: `js/mhitm.js` (+92: new `mhitm_ad_elec` + AD_ELEC
  dispatch block), `js/mhitu.js` (+17/−: `mhitm_ad_elec_u`
  completed), `js/uhitm.js` (+9: AD_ELEC row).
- C locus: `nethack-c/upstream/src/uhitm.c:2683–2739`
  (`mhitm_ad_elec`, 57 L).

## Intent vs deliverable

Subject promises: whole `mhitm_ad_elec` in C order (MISSING →
live), uhitm+mhitm arms new, C caller wired, elec_u split
completed. Diff actually adds exactly that. Promise matches
deliverable. RNG 1 (`m_lev > rn2(20)` destroy gate) — the only
`rn2` in the hunks, call-for-call with C `:2720`.

## Inventory

- New: `mhitm_ad_elec` exported async (`js/mhitm.js:878` —
  `sym.mjs` single hit, async).
- Changed: `mhitm_ad_elec_u` (mhitu.js) — seesu/unseesu +
  destroy_items completed (was deferred).
- New: mhitm_adtyping AD_ELEC block (ston-block shape +
  knockback/monkilled/grow_up tail) + uhitm.js AD_ELEC row.
- No deleted or re-pointed symbols → no clone→import audit needed.

## C ↔ JS fidelity

C body `:2683–2739` vs JS, arm by arm:

- uhitm (`:2688–2703`, new): negate→0/return; unconditional
  (on !Blind) `"%s is zapped!"`; resists/defended → second
  !Blind pline, **golemeffects then shieldeff**, damage=0;
  unconditional `damage += destroy_items(mdef, AD_ELEC,
  orig_dmg)`. Order exact — including that destroy runs even
  after resist-zeroing. Confirm.
- mhitu (`:2704–2723`, completed in `_u`): hitmsg; negate gate
  in the `(mtmp, null, true)` hero-defender idiom (same as the
  fire_u/cold_u siblings — null routes to
  magic_negation_you, correct); `"get zapped!"`; Shock_resistance
  → seesu + zero, else unseesu; `m_lev > rn2(20)` → destroy
  **return discarded** per C `(void)` — the D-2425 cold_u
  residual applied correctly, not added to damage. rn2 burns in
  C position (inside !negated, outside the resist if/else).
  Confirm.
- mhitm (`:2724–2738`, new): negate→0/return; `_mm_vis &&
  canseemon` `pline_mon "%s gets zapped!"` (C uses pline_mon
  here, unlike the uhitm arm — kept); resist arm keeps C's
  **reversed** order (**shieldeff then golemeffects**, opposite
  of the uhitm arm — the asymmetry preserved, a strong fidelity
  signal); damage=0; `damage += destroy_items(orig)`. Confirm.

Callee closure: `mhitm_mgc_atk_negated`, `resists_elec`,
`defended`, `golemeffects_mm`, `shieldeff`, `destroy_items`
(zap.js:1705, async — hoisted dynamic import on the edge the
fire arm already uses, mhitm.js:1095), `monstseesu/unseesu` —
all LIVE. No clones, no stubs, no named omits in this body.
`void mattk` correct (C never reads mattk outside mhitu
hitmsg, which lives in `_u`).

Callers: C `:4794` wired on all three direction splits
(mhitm.js:4047 dispatch, uhitm.js damageum row, mhitu.js hitmu
`case AD_BLND`-adjacent AD_ELEC → `_u`). Confirm.

## Hallucinations / overclaim

None. "Every arm and callee live or ported" verified arm by arm
above, including the two order asymmetries C actually has.

## Density

One 57-line C function + split completion + two dispatch rows,
three files already linked. Right-sized per §2b.

## Verification

- D-log: syntax (3 changed) · rule2 · hidden note (0 blocked) ·
  reach 35/35 · green 2/2 · strict ×2 · cohort 7/7 · full skipped
  → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify mhitm_ad_elec --base
  3bd853d7~1 --reach-all` → 0 blocked both trees + **35
  baseline-PASS sessions reach it, 35 PASS, 0 regressed →
  REACH-OK**. Matches.
- `imports.mjs --rulecheck`: clean. Diff grep: 0 hits for
  FORCE/DIAG/getRngLog/fastforward; RNG grep shows only C's own
  gate.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
