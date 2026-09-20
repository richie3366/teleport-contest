# Review 1616 — 8affcbef — uhitm.c mhitm_ad_poly whole-body port (D-2657)

**Metadata:** SHA `8affcbef`, `uhitm.c` `mhitm_ad_poly`,
D-2657. JS: `js/mhitm.js` (+9/−2: doc cites + retired
omits) + `js/mhitu.js` (+19: negated hoist, `mspec_used`,
`You`) + `You` import join. Split-architecture port:
uhitm/mhitm arms in the main export, mhitu arm in
`mhitm_ad_poly_u`.

## Intent vs deliverable

Subject promises: negated hoisted above hitmsg in C order
with `|| !!mtmp.mspec_used`, `You("aren't transformed.")`,
per-arm cites on both bodies, stale shieldeff/damageum omit
retired. Diff delivers all of it. Promise matches
deliverable.

## Inventory

- `mhitm_ad_poly(magr, mattk, mdef, mhm)`
  (mhitm.js:701, async, exported) — C `uhitm.c:3728–3774`
  (47 L): `negated` top `:3734–3735`, uhitm `:3739–3752`,
  mhitm `:3764–3772`.
- `mhitm_ad_poly_u(mtmp, mattk, mhm)` (mhitu.js:2375,
  file-local async) — C mhitu arm `:3753–3763`.
- `You` joins the existing display.js import (live).
  No deleted symbols, no re-points.

## C ↔ JS fidelity

C loci read in full: `mhitm_ad_poly :3728–3774` (body
above) plus `mhitm_mgc_atk_negated :74–99` (one call).
Branch-by-branch confirm:

- `:3734–3735` negated at fn top, `|| magr->mspec_used`:
  main export computes before dispatch ✓; `poly_u`
  hoists above `hitmsg` with `|| !!mtmp.mspec_used`
  (magr ≡ mtmp in that arm) ✓. RNG order now C-exact:
  the `rn2(10)` inside negated draws even when the HP
  gate below fails — the old post-gate position is gone.
- mhitu `:3755–3763`: hitmsg ✓; `Maybe_Half_Phys` vs
  Upolyd HP ✓; mcan-gated `You("aren't transformed.")`
  `:3757–3759` ✓ — this also fixes a real message wrong
  (old `pline("You aren't transformed.")` ≠ C's `You()`
  capitalization); else `mon_poly` + HIT + done, no
  DEF_DIED ✓ (C sets none here).
- uhitm `:3739–3752`: weaponless + `damage < mhp` gates
  ✓; negated → `pline Monnam "is not transformed."`
  ✓ (C's `%s` arm, distinct from the mhitu `You()` arm);
  else `mon_poly(magr…)` (magr ≡ youmonst in-arm),
  DEF_DIED + HIT + done ✓.
- mhitm `:3764–3772`: `damage < mhp && !negated` ✓;
  DEF_DIED + HIT + done ✓.
- OMITs: none new. Retiring the shieldeff/damageum note is
  correct — the C body calls neither. The mcan note is
  real and properly scoped: C `:84` exempts youmonst
  ("hero can't be cancelled") while the live helper
  short-circuits any non-null `magr.mcan` — pre-existing,
  owned by `mhitm_mgc_atk_negated`, untouched here.
- Callee closure: `mhitm_mgc_atk_negated` (mhitm.js:2454
  async), `mon_poly` (:601 async), `hitmsg` (mhitu.js:415
  async), `You`/`pline`/`Monnam` — all LIVE. No STUB.

## Hallucinations / overclaim

None. "Null-mdef idiom routes to magic_negation_you(),
which is C magic_negation(&gy.youmonst)" matches the live
delegates (mhitu.js area: `magic_negation_you() →
magic_negation(null)`, hero idiom).

## Density

Breadth phase: predicate fix + message fix + cites across
the split pair (63 ins) — small but this is a Must-fix-
class correction of a PARTIAL row, right-sized.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 · hidden
note · REACH-OK smoke 24/24 · green · strict · cohort).
Re-measured here: `hidden-proxy.mjs verify mhitm_ad_poly
--base 8affcbef~1 --reach-all` → 0 blocked both sides
(vacuous note, correctly labeled) + smoke 24/24 PASS, 0
regressed → REACH-OK. Claim true. Diff grep: 0 hits for
FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
