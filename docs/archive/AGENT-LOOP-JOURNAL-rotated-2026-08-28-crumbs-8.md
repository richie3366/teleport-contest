# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-28 — D-1599 invent.c SORTLOOT_PETRIFY

**Objective:** Open `invent.c` SORTLOOT_PETRIFY (named). Not
inuse_only.
**C locus:** `invent.c` `sortloot` `:611–620` filter override;
`will_feel_cockatrice` `:4333–4340`; `feel_cockatrice`
`:4342–4361`; `look_here` feel arms; `pickup.c` `query_objlist`
FEEL abort `look_here(0)`.
**JS locus:** named omit after D-1589 (`sortloot` drop-filter;
look_here cockatrice deferred).
**Change:** live PETRIFY keep `touch_petrifies` CORPSE past
filterfunc; feel helpers; look_here skip/single/multi; pickup
`,` menu abort. eat/doloot/pray/engulfer named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open perm_invent InvInUse. Not SORTLOOT_PETRIFY.
**Blocked:** none.

## 2026-08-28 — D-1598 mextra.h has_mcorpsenm

**Objective:** Open `makemon.c` `has_mcorpsenm` (named). Not
set_mimic_sym. Not show_transient_light.
**C locus:** `mextra.h` `has_mcorpsenm` `:234`; `makemon.c`
`newmcorpsenm`/`freemcorpsenm` `:2368–2383`; callers seemimic,
copy_mextra, zap bhitm, wormgone, display, pager, apply.
**JS locus:** named omit after D-1525/D-1574 (pager clone;
display `!= null`; seemimic deferred).
**Change:** live helper + alloc/free; stale `NON_PM`; wired
callers. object_detect / `altarmask_at` / `clear_bypasses`
named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open SORTLOOT_PETRIFY. Not has_mcorpsenm.
**Blocked:** none.

## 2026-08-28 — D-1597 light.c show_transient_light

**Objective:** Open `makemon.c` `show_transient_light` (named). Not
ndemon. Not create_mplayers. (C is `light.c`.)
**C locus:** `light.c` `show_transient_light` `:255–324`;
`transient_light_cleanup` `:327–357`; callers zap `bhit`, apply
`do_blinding_ray`, minion `msummon`.
**JS locus:** named omit after D-1575 (`light.js` camera deferred).
**Change:** live camera range 0 + thrown lamplit `mtemplit` +
cleanup `discard_flashes`; wired three callers. Worm tails named.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `has_mcorpsenm`. Not show_transient_light.
**Blocked:** none.

## 2026-08-28 — D-1596 mplayer.c create_mplayers

**Objective:** Open `mplayer.c` `create_mplayers` (named). Not
mk_mplayer. Not has_edog.
**C locus:** `mplayer.c` `create_mplayers` `:326–353`; caller
`do.c` `final_level` `:2049` / `goto_level` `:1885`.
**JS locus:** named omit after D-1584; `goto_level` skipped Astral
`final_level` (always `resurrect` on newdungeon+amulet).
**Change:** live class/`goodpos`/tryct/`mk_mplayer`; Astral
`madeNew` `rn1(4,3), TRUE`; else-if `resurrect`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **9**/9; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `show_transient_light`. Not create_mplayers.
**Blocked:** none.

## 2026-08-28 — D-1595 dog.c tamedog initedog has_edog vs !mtame

**Objective:** Open `dog.c` tamedog `initedog` has_edog vs `!mtame`.
Not FULL_MOON. Not ustuck.
**C locus:** `dog.c` `tamedog` `:1253–1259`; `newedog` `:22–32`;
`initedog` `EDOG`; `makemon.c` MM_EDOG `:1245–1246`.
**JS locus:** `initedog(mtmp, !(mtmp.mtame))` + `mtmp.edog={}`.
**Change:** live `newedog`; `!has_edog` → `initedog(TRUE)` else
FALSE; MM_EDOG; `copy_mextra`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `create_mplayers`. Not has_edog.
**Blocked:** none.

## 2026-08-28 — D-1594 mon.c normal_shape await newcham NC_SHOW_MSG

**Objective:** Must-fix **547** — `normal_shape` await
`newcham(..., NC_SHOW_MSG)`. Not has_edog.
**C locus:** `mon.c` `normal_shape` `:4438–4443`; callers `rescham` /
`restore_cham` / zap `cancel_monst` `:3199`.
**JS locus:** dropped Promise after D-1586 (`js/mon.js:902`).
**Change:** async `normal_shape`/`rescham`/`restore_cham`; await
SHOW_MSG before `cham=NON_PM` and before clay-golem pline. Rule #2:
no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open tamedog `initedog` has_edog. Not `normal_shape`.
**Blocked:** none.
