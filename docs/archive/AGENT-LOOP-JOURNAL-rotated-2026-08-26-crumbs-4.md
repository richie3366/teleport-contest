# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-26 — D-1529 worm.c see_wsegs

**Objective:** Open `worm.c` `see_wsegs` (named). Not worm_move.
**C locus:** `worm.c` `see_wsegs` `:487–495`; callers
`display.c` `see_monsters` `:1511–1512`, `worn.c`
`mon_set_minvis` `:482–483`, `monmove.c` postmov `:1683–1686`;
callee `is_worm_tail` `:500` + `display_monster` `:599–618`.
**JS locus:** `js/worm.js` `see_wsegs`; `js/display.js`
`see_monsters` / `newsym` / `mon_at_display`; `js/worn.js`;
`js/monmove.js`.
**Change:** Refresh tail cells except dummy head. Occupancy
via `_level_monsters`. Visible tails paint `~`; minvis hides
them; Hallu `what_mon(PM_LONG_WORM_TAIL)`. detect_wsegs /
`worm_known` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
live long-worm tails public-unhit.
**Verified:** canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `invent.c` `getobj` GETOBJ_ALLOWCNT. Not Palantir.
**Blocked:** none.

## 2026-08-26 — D-1528 display.c show_region

**Objective:** Open `display.c` `show_region` (named). Not
Hallu/Warn_of_mon.
**C locus:** `region.c` `show_region` `:732–735`; callers
`display.c` `_map_location` `:470–471` and `newsym`
`:993–998`; `mon_overrides_region` `:668–700`.
**JS locus:** `js/region.js` `show_region`; `js/display.js`
`newsym` / `map_location`.
**Change:** Paint S_cloud / S_poisoncloud into gbuf. newsym
cansee early overlay on ACCESSIBLE or pool/lava unless
`mon_overrides_region`. `_map_location` overlays after map
when show && !Blind. worm_tail / DRAWBRIDGE_UP under named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
live-cloud gbuf public-unhit.
**Verified:** canary **31**/31; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `worm.c` `see_wsegs`. Not worm_move.
**Blocked:** none.

## 2026-08-26 — D-1527 timeout.c visible_region_summary

**Objective:** Open `timeout.c` `visible_region_summary`
(named). Not any_visible_region.
**C locus:** `region.c` `visible_region_summary` `:672–711`;
caller `timeout.c` `wiz_timeout_queue` `:2112–2113`.
**JS locus:** `js/region.js` `visible_region_summary`;
`js/timeout.js` `wiz_timeout_queue`; getline `#timeout`.
**Change:** `#timeout` lists timers, timed TIMEOUT,
swallow/vault/stasis, then Visible-regions (ttl+1, poison
gas vs vapor, bounding box) when `any_visible_region`.
tid on `start_timer`. `show_region` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
`#timeout` / live-cloud listing public-unhit.
**Verified:** canary **43**/43; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `display.c` `show_region`. Not
Hallu/Warn_of_mon.
**Blocked:** none.

## 2026-08-26 — D-1526 makemon.c emin roaming

**Objective:** Open `makemon.c` emin roaming (named). Not
dprince.
**C locus:** `makemon.c` `makemon` `:1410–1428` after
LONG_WORM, before `set_malign`.
**JS locus:** `js/makemon.js` `makemon`.
**Change:** Ordinary ALIGNED_CLERIC/HIGH_CLERIC without
`MM_EPRI|MM_EMIN`, or ANGEL without `MM_EMIN` `!rn2(3)`,
get `newemin` + `isminion` + `min_align=rn2(3)-1` +
renegade + coalign XOR peaceful. Flagged callers skip.
Door `S_hcdoor` / furnsyms / Protection / `block_point`
named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
ordinary cleric/angel emin public-unhit.
**Verified:** canary **40**/40; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `timeout.c` `visible_region_summary`. Not
any_visible_region.
**Blocked:** none.

## 2026-08-26 — D-1525 makemon.c set_mimic_sym altar Align2amask

**Objective:** Open `makemon.c` `set_mimic_sym` altar
Align2amask MCORPSENM (named). Not maze/shop.
**C locus:** `makemon.c` `set_mimic_sym` `:2458–2460`
TEMPLE `S_altar`; `:2538–2546` Align2amask /
`has_mcorpsenm`.
**JS locus:** `js/makemon.js` `set_mimic_sym`.
**Change:** TEMPLE appear `S_altar` (33); `MCORPSENM`
`(Inhell && rn2(3)) ? AM_NONE : Align2amask(rn2(3)-1)`;
Inhell via dungeon hellish (no minion import). Stale
`has_mcorpsenm` → `NON_PM`. Door/wall `S_hcdoor` /
furnsyms real S_* / Protection / `block_point` named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
temple-mimic Align2amask public-unhit.
**Verified:** canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `makemon.c` emin roaming. Not dprince.
**Blocked:** none.

## 2026-08-26 — D-1524 pager.c object_from_map SLIME_MOLD spe

**Objective:** Open `pager.c` look SLIME_MOLD `spe =
current_fruit` (named). Not xname.
**C locus:** `pager.c` `object_from_map` `:284–377`;
`look_at_object` `:380–399`.
**JS locus:** `js/pager.js` `object_from_map` /
`look_at_object`; `brief_at` / `look_all`.
**Change:** fake SLIME_MOLD `spe = current_fruit`; mimic
`MCORPSENM` override. Glyphotyp not integer glyph.
doname_with_price named. `that_is_a_mimic` /
`namefloorobj` / getpos fakeobj named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
fake named-fruit look public-unhit.
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `makemon.c` `set_mimic_sym` altar
Align2amask MCORPSENM. Not maze/shop.
**Blocked:** none.
