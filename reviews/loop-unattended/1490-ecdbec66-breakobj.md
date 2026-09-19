# Review 1490 — ecdbec66 — dothrow.c breakobj (D-2531)

## Metadata

- SHA: `ecdbec66`
- D-id: D-2531. Next index: 1490.
- Files: `js/dothrow.js` (restart + throwit landing arm), `js/explode.js`
  (+28), `js/potion.js` (clone→import), plus committed
  `scripts/breakobj.test.mjs`.
- C locus: `nethack-c/upstream/src/dothrow.c:2479–2574` (`breakobj`,
  96 L).

## Intent vs deliverable

Subject promises: whole `breakobj` in C order (PARTIAL → live) +
throwit `:1780–1792` landing wire + canonical `explode_oil` +
potion.js clone deletion. Diff actually adds exactly that, plus the
VENOM_CLASS force-break disjunct in throwit. Promise matches
deliverable.

## Inventory

- Changed: `breakobj` (restart, exported async — `sym.mjs` single
  hit `js/dothrow.js:1382`, ASYNC).
- Changed: throwit landing arm (flash/breakmsg/breakobj/survivor
  fall-through).
- New: `splatter_burning_oil` (file-local `js/explode.js:1100` —
  `sym.mjs` confirms no second clone), `explode_oil` (exported async
  `js/explode.js:1110`, single def), `Half_gas_damage` export
  (`js/potion.js:2740`, sync).
- Deleted/re-pointed (required `sym.mjs` paste): potion.js local
  `explode_oil` clone deleted → static import from `./explode.js`
  (call sites `:3888`/`:4025` unchanged; `sym.mjs explode_oil`
  now resolves to exactly one def, `js/explode.js:1110` ASYNC —
  re-point verified, no stragglers).
- New imports are all pre-existing exports (`erode_obj` async
  `js/trap.js:4159`, awaited; `armor_simple_name` sync
  `js/do_wear.js:1355`; `ESHK` sync `js/const.js:3141`; shk.js
  five; `d` from rng.js). Dynamic `await import()` of shk/hack/const
  replaced by static imports — directionally good.

## C ↔ JS fidelity

`csym.mjs` body `:2479–2574` vs JS:

- `:2488–2491` crackable → `erode_obj(..., ERODE_CRACK,
  EF_DESTROY|EF_VERBOSE) == ER_DESTROYED`. Old JS deleted the obj
  unconditionally and returned 1; new JS returns 1/0 on the
  comparison. Exact shape fix. Confirm.
- `:2493` potion-class→POT_WATER mapping. Confirm.
- `:2494–2497` MIRROR `hero_caused → change_luck(-2)`. Confirm.
- `:2498–2521` potion arm: `in_use = 1`; oil+lamplit →
  `explode_oil`; else `next2u` gate; `!breathless || haseyes`;
  towel gate `otyp != POT_WATER && !Half_gas_damage` (JS wrapper
  matches the C macro `youprop.h:405–406`, ublindf towel spe>0 —
  read at `js/potion.js:2740`); odor vs eyes arms with
  `eyecount`/`makeplural`/`vtense` (D-2525 live); `potionbreathe`
  inside the gate; monster-breathing unhandled as in C. RNG: none
  in C arm; none in JS. Confirm.
- `:2522–2524` camera → `release_camera_demon` (pre-existing
  in-file export). Confirm.
- `:2525–2531` egg: `hero_caused && spe && ismnum` →
  `change_luck(-min(quan,5))` (schar cast immaterial: range
  −5..0); `corpsenm == PM_PYROLISK → explosion`. Confirm.
- `:2532–2537` BOULDER/STATUE → fracture (caller dispositions;
  shop-theft below still runs — comment says so). Confirm.
- `:2539–2563` shop billing: `*u.ushops` ≡ `ushops.charAt(0)`
  ('' falsy — exact); `check_shop_obj` gate; costly-spot arm with
  `break_seq`/`seq_peaceful` snapshot, `stolen_value(...,
  seq_peaceful, FALSE)`, `*o_shop != u.ushops[0] ||
  !inside_shop(ux,uy)`, second `break_seq` gate, then stamp.
  All three conjuncts and the snapshot ordering match. Confirm.
- `:2565–2570` `!fracture → delobj`; `explosion →
  explode(x,y,-11,d(3,6),0,EXPL_FIERY)` (`d` newly imported);
  return 1. Confirm.
- throwit `:1780–1792` (read in C directly): `!IS_SOFT &&
  breaktest || VENOM_CLASS` → DISP_FLASH `obj_to_glyph(obj,
  rn2_on_display_rng)` + tmp_at + delay + DISP_END + breakmsg +
  `breakobj(...,TRUE,TRUE)` + `throwit_return(TRUE)`; survivor
  falls to Splash/flooreffects. JS matches; `obj_glyph`
  (`js/display.js:2275`) draws the same `rn2_on_display_rng`
  family in its random paths (display RNG, not positional).
  Confirm.
- Callers: C `:1273`/`:1301` (toss_up) → JS `:1607`/`:1633`;
  `:1789` (throwit) → JS `:2487`; `:2435` hero_breaks → JS
  `:1500`; `:2453` breaks → JS `:1512`; `do.c:352` flooreffects →
  `js/do.js:890`. All wired and awaited. `zap.c:5552`
  fracture_rock named in this commit (async cascade deferred).
  No unwired caller left silent.

Callee closure: `explode_oil` (`explode.c:972–983`, extern —
export correct) ports `impossible` guard + `end_burn` +
`LOST_EXPLODING` + `ZT_SPELL_O_FIRE=11` (matches C `:961–969`
`d(diluted?3:4,4)`, BURNING_OIL, EXPL_FIERY). `splatter_burning_oil`
is C-extern but single-called from `explode_oil` (`--callers`:
only `:982` plus comment/`#define` refs) — file-local narrowing
is functionally complete. No STUB in any live arm.

## Hallucinations / overclaim

None. "Every arm and callee live" holds; the one deferred caller is
named with locus and reason.

## Density

One 96-line C function + two small callee bodies + one caller arm,
three files on existing edges. Right-sized per §2b.

## Verification

- D-log: syntax (3 changed) · rule2 · hidden note (0 blocked) ·
  smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · full skipped
  (no shared file changed) → VERIFY: PASS, plus focused
  `breakobj.test.mjs` 3/3.
- Re-run here: `hidden-proxy.mjs verify breakobj
  --base ecdbec66~1 --reach-all` → 0 blocked both trees (vacuous
  note, honestly reported) + smoke 24 PASS, 0 regressed →
  REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
  logic (sole FORCE hit is the pre-existing `FORCEBUNGLE` const).
- Observation (pre-existing, not this SHA): `sym.mjs
  Half_gas_damage` shows a second local clone at
  `js/region.js:299` beside the `js/potion.js:2740` export — clone
  drift predating this commit; not queued (untouched by this
  diff, single-predicate macro wrapper).

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
