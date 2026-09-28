# Review 2014 — d30e99009 — hmon_hitmon_do_hit closure + mhitm_ad_corr

Metadata: SHA `d30e99009`, D-3054, js/uhitm.js + js/mhitm.js (+320/−161).
Largest SHA this iteration — per-function blocks below; SHA verdict is
the worst of them (all ACCEPT).

## Intent vs deliverable

Subject promises "do_hit dispatch closure + mhitm_ad_corr (stone/potion/
gem/corrode arms)". Diff actually adds four file-local uhitm helpers,
rebuilds `hmon_hitmon`'s dispatch around one C-shaped `hmdHit`, adds an
exported `mhitm_ad_corr` with mdamagem + damageum wiring, and re-points
the silver/light/first-hit lines. Matches promise. Five-function,
two-C-file closure (uhitm dispatch + corrode arm).

## Inventory

- `hmon_hitmon_weapon_ranged` (new local js/uhitm.js:1810) — C :884–917.
- `hmon_hitmon_weapon` (new local js/uhitm.js:1842) — C :1069–1092.
- `hmon_hitmon_potion` (new local js/uhitm.js:1865) — C :1094–1116.
- `hmon_hitmon_do_hit` (new local js/uhitm.js:1893) — C :1386–1433.
- `mhitm_ad_corr` (new export js/mhitm.js:1004, async) — C :2337–2360.
- Re-points: `hmon_hitmon` hmdHit init + unpack, silver/light
  `saved_oname`, first-hit `is_weptool` gate, mdamagem + damageum AD_CORR
  rows. New imports are names on pre-existing module edges (`--can`:
  uhitm→potion/dothrow ALREADY).

## C ↔ JS fidelity

`hmon_hitmon_weapon_ranged` vs C `:884–917` (csym): shade-glare gate
✓, `rnd(2)` ✓, silver flags + `rnd(dmg?20:10)` ✓, boomerang
`!thrown && ==uwep && BOOMERANG && rnl(4)==4-1` ✓ (literal `4 - 1`
kept), splinter pline + uwepgone + useup ✓, `obj=0` correctly kept
local (C param) with an explanatory comment ✓, hittxt + non-shade
`dmg++` ✓. RNG call-for-call in C order. Verdict: ACCEPT.

`hmon_hitmon_weapon` vs C `:1069–1092`: four ranged conditions
(launcher / missile-ammo-in-hand / short-pole-unmounted-non-Snickersnee
/ ammo-without-launcher) ✓, else melee + doreturn ✓. Verdict: ACCEPT.

`hmon_hitmon_potion` vs C `:1094–1116`: quan>1 → splitobj ✓, else
`setuwep(null)` (live sync, shine-await pattern) ✓, freeinv (live sync,
called sync) ✓, `potionhit` (live async, awaited) with BASH/THROW from
`hand_to_hand` ✓, DEADMONSTER → doreturn/retval=FALSE ✓, hittxt +
mdat refresh + shade-zeroed 1 dmg ✓. Verdict: ACCEPT.

`hmon_hitmon_do_hit` vs C `:1386–1433` (csym): bare-hands ✓,
thrown/kicked (not Applied) stone-missile vs rock-passer with
`hit`+`wakeup` awaited and doreturn/retval=TRUE ✓ —
`passes_rocks` macro expansion (`passes_walls && !unsolid`) verified
verbatim at mondata.h:208 ✓; saved_oname snapshot with the
artifact_light&&lamplit → bare_artifactname fork ✓; WEAPON/tool
(`is_weptool`, replacing the `oc_skill != null` proxy)/GEM → weapon ✓;
POTION → potion ✓ (both previously misrouted to dmgval); else
shade-unaware zero (note: C reads `shade_aware`, and the old code's
`!shade_aware` gloss is preserved) or misc_obj ✓. Verdict: ACCEPT.

`mhitm_ad_corr` vs C `:2337–2360` (csym): uhitm arm (erode + damage=0)
✓; mhitu arm returns early to the pre-existing split
`mhitm_ad_corr_u` (verified: hitmsg + mcan + erode_armor(youmonst),
wired at mhitu.js:3010 — matches C :2346–2351, rust precedent) ✓; mhitm
arm (mcan → return keeping leftover; else erode + WAITFORU clear +
zero) ✓. mdamagem AD_CORR tail is line-identical to the AD_RUST tail
(knockback/done/HP/grow_up) — correct, C shares one tail past
adtyping; damageum AD_CORR row mirrors the rust row, passing youmonst
→ uhitm arm ✓. C dispatch `case AD_CORR: mhitm_ad_corr` confirmed at
uhitm.c:4806 next to AD_RUST ✓. Verdict: ACCEPT.

hmdHit init vs C `:1760–1793` (read in full): every field present in
order with per-field cites. Three init-shape deviations checked, all
safe: (a) `material: ... : 0` — C NO_MATERIAL = 0 (objclass.h:13) ✓;
(b) `hittxt` carried in — proven FALSE at construction (`let hittxt =
false` js/uhitm.js:1981, no assignment before hmdHit) ✓; (c) `unarmed:
false` with recompute at the stagger point instead of C's :1779 —
equivalent: the only post-do_hit readers are the :1827/:1829 gates, and
:1827 needs `!obj` (barehands path, where do_hit touches no equip
slot, so pre==post); :1829's remaining terms use live `uwep`, and the
two slot-changing paths (boomerang splinter, potion bash) both have
non-null obj, forcing the same outcome either way. Proven, not assumed.
One wrong cite number in a comment (`:1859` is the offmap block, not an
unarmed recompute) — comment-only, noted, not queueable as a C-wrong.

Callee closure: `barehands`/`hit`/`wakeup`/`mshot_xname`/`artifact_light`/
`cxname`/`bare_artifactname`/`shade_aware`/`shade_glare`/`mon_hates_silver`/
`is_weptool`/`misc_obj`/`melee`/`splitobj`/`potionhit`/`erode_armor` all
LIVE (sym-verified for the new ones; melee/misc pre-existing). No STUB
in a live arm. All four uhitm helpers file-local = correct (C
staticfn); the D-log's "new locals" wording is accurate here.

Density: 5 functions, 2 C files but one caller/callee closure (do_hit
dispatch + the corrode arm it routes with) — within §10.17 (≤10 fns,
closure). OK.

## Hallucinations / overclaim

None. Every named live callee verified live; the stone-macro claim
verified at the header; `--can` ALREADY claims verified (all three
checked edges pre-existed).

## Verification

D-log cites verify.mjs (5 fns) → PASS + hidden notes + green/strict/
cohort. Re-measured all five in one call `--base d30e99009~1
--reach-all`: 0 blocked at baseline and now for each (vacuous, as
stated — coverage rows); smoke 24/24 PASS each → REACH-OK, no
regressions. Stronger than the D-log: `hmon_hitmon_weapon_ranged` has
11 baseline-PASS sessions reaching it — 11/11 still PASS (genuine
corpus REACH, not just smoke). Diff grep: no FORCE/DIAG/RNG-log reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
