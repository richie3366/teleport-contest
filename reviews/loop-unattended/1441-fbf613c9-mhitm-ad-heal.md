# Review 1441 — fbf613c9 — mhitm_ad_heal whole-body port (D-2482)

Metadata: SHA `fbf613c9`, `js/mhitm.js` only (+37). C
`uhitm.c:4296–4385` (single 3-arm function). D-log: D-2482.

## Intent vs deliverable

Promise: mon-vs-mon nurse arm + `mdamagem` AD_HEAL dispatch,
mirroring shipped `mhitm_ad_were` (D-2049). Diff delivers: one
exported delegate + one dispatch arm, no new imports.

## Inventory

- Added: `export async function mhitm_ad_heal` (guard +
  `mhitm_ad_phys` delegate), `mdamagem` AD_HEAL arm (mhm +
  knockback preempt + HP/monkilled/grow_up tail — line-for-line
  the AD_WERE arm shape).
- `const AD_HEAL = 27` matches `monattk.h:69` verbatim.
- No deleted/re-pointed symbols; all callees file-local
  (`is_youmonst`, `mhitm_ad_phys`, `mhitm_knockback`,
  `mon_offmap`, `grow_up`, `mdamagem_monkilled`).

## C ↔ JS fidelity

C is one function with three arms (`magr==you` / `mdef==you` /
else), JS splits dispatch were-style — closure verified:

- mhitm arm (`:4379–4384` phys + done): JS delegate exact
  (guard + phys, done via mhm).
- mhitu arm (`:4305–4378`): pre-existing `mhitm_ad_heal_u`
  (mhitu.js:2775), dispatched at mhitu.js:3204. Read against C:
  mcan/petrify gate, naked check (weapon/weptool + 7 armor
  slots), `rnd(7)` HP, `rn2(7)` max bump with the
  `5*ulevel+d(2*ulevel,10)` cap + peak, clamp, `rn2(3)`
  STR/CON, Sick cure, botl, `rn2(13)` mongone/DEF_DIED,
  `rn2(33)` rloc + `monflee(d(3,6))`/HIT|DEF_DIED, damage 0,
  Healer-doc `moves%5` arm — all verbatim. "Already live" holds.
- uhitm arm (`:4300–4304` hero-as-nurse): no `damageum_adtyping`
  row — explicitly named (default leftover, were-precedent,
  hero-poly rarity). A named omit, not a silent stub.
- No RNG added (pure delegate); `dieroll` carried like WERE.

## Hallucinations / overclaim

None. The dispatch/omit accounting names all three arms.

## Density

Right-sized: one C arm + dispatch, one module.

## Verification

- `hidden-proxy verify mhitm_ad_heal --base fbf613c9~1
  --reach-all` (re-run): 0 blocked (coverage row, as stated);
  smoke 24/24 → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
