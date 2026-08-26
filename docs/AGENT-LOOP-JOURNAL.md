# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-26 — review D-1522–D-1530 (audit #1920)

**Objective:** audit — C-fidelity reviews **483–491** of JS SHAs
`aac21a74` / `e13f38ae` / `2c688c98` / `e234a41b` /
`4e78ca90` / `d53c5cd1` / `aa4d11f5` / `72c1fcdd` /
`a5d779b7` plus full `sessions` score.
**C locus:** `reorder_fruit`; `goodfruit`; `object_from_map`;
TEMPLE `S_altar`; emin roaming; `#timeout` summary;
`show_region`; `see_wsegs`; getobj ALLOWCNT.
**Change:** no `js/` edits. One **QUALITY-RISK** (487 D-1526
Pri-strt `makemon(..., 0)` vs C `mk_roamer`). Eight
**ACCEPT-WITH-DEBT**. Must-fix prepended. Filled archive
D-1530 `a5d779b7`. Rule #2: no fs.
**Score:** **43**/44 Scr **11,405**/11,405 RNG
**747,952**/792,838 (94.3%) speed `37+0.30/turn` (R² 0.855).
seed0367 FAIL RNG **5239**/50125 from `4e78ca90`.
**Verified:** full `sessions` at HEAD `a5d779b7`.
**Next:** Must-fix `load_pri_strt` `mk_roamer` (review **487**).
Not Open `tamedog`. Do not delete emin.
**Blocked:** none.
## 2026-08-26 — D-1530 invent.c getobj ALLOWCNT

**Objective:** Open `invent.c` `getobj` GETOBJ_ALLOWCNT (named).
Not Palantir.
**C locus:** `invent.c` `getobj` `:1937–2088` + `splittable`
`:1664`; `cmd.c` `get_count` inkey/`LARGEST_INT`/`GC_SAVEHIST`.
**JS locus:** `js/invent.js` helpers; charge/drop/throw/wield/
ready/adjust clones.
**Change:** Digit prefix, throw-one, "don't have that many",
`split_otmp` (child after parent on invent[]). Palantir `#if 0`.
CMDQ_INT / pickinv count / finish_splitting named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
digit-at-getobj public-unhit.
**Verified:** canary **32**/32; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `dog.c` `tamedog` is_covetous. Not leftovers.
**Blocked:** none.
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
## 2026-08-26 — D-1523 bones.c goodfruit fid sign

**Objective:** Open `bones.c` `goodfruit` (named). Not
fruit_from_indx.
**C locus:** `bones.c` `goodfruit` `:42–47`; savebones
`:450–453`; drop `:287–288`; resetobjs save `:131–132`;
`save.c` `savefruitchn` `:951–971`.
**JS locus:** `js/bones.js` `goodfruit` / `savefruitchn` /
`loadfruitchn`; `js/end.js` drop/savebones.
**Change:** negate all fids; `fruit_from_indx(-id)` restores
types that still exist as SLIME_MOLD; persist fid>=0;
getlev oldfruit then free. `ghostfruit` named. Rule #2:
no fs.
**Score:** fortress **44**/44 (cadence #1910);
named-fruit bones public-unhit.
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `pager.c` look SLIME_MOLD `spe = current_fruit`.
**Blocked:** none.
## 2026-08-26 — D-1522 objnam.c reorder_fruit fid sort

**Objective:** Open `objnam.c` `reorder_fruit` (named). Not
fruit_from_indx.
**C locus:** `objnam.c` `reorder_fruit` `:521–554`; caller
insight.c `#ifdef DEBUG` wizard fruit dump only.
**JS locus:** `js/objnam.js` `reorder_fruit`.
**Change:** rebuild `ffruit` by fid (`allfr[1+127]`; forward
TRUE → 1,2,3…). Bad/dup fid return unsorted. Impossible
pline named. Do not call from ^X. `goodfruit` / pager `spe`
named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
production caller public-unhit.
**Verified:** canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `bones.c` `goodfruit`. Not fruit_from_indx.
**Blocked:** none.
## 2026-08-26 — review D-1513–D-1521 (audit #1910)

**Objective:** audit — C-fidelity reviews **474–482** of JS SHAs
`2f5f7fd1` / `9a50ef27` / `3a5f062e` / `cf3c5701` /
`8bfe0bc8` / `527815fb` / `d5799f73` / `5dd0ba20` /
`6a42c40e` plus full `sessions` score.
**C locus:** minetn-7 lua gnomes; `artifact.c` SPFX_WARN;
`makemon.c` S_KOP / ninja / `in_town` / dprince;
`mklev.c` victim candle; `options.c` fruitadd;
`objnam.c` doname_base fake_arti.
**Change:** no `js/` edits. One **ACCEPT** (474); eight
**ACCEPT-WITH-DEBT**. No Must-fix. Filled archive D-1521
`6a42c40e`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `36+0.31/turn` (R² 0.86).
**Verified:** full `sessions` at HEAD `6a42c40e`.
**Next:** Open `objnam.c` `reorder_fruit`. Not fruit_from_indx.
**Blocked:** none.
## 2026-08-26 — D-1521 objnam.c doname_base slime-mold fake_arti

**Objective:** Open `objnam.c` doname_base slime-mold fake_arti
(named). Not fruit_from_indx.
**C locus:** `objnam.c` `doname_base` `:1275–1299`; callee
`artifact.c` `artifact_name` `:329–353` FALSE; `xname_flags`
`:1011` the-strip.
**JS locus:** `js/objnam.js` `doname` / `xname`; local
`artifact_name_objnam` (no artifact import).
**Change:** `fake_arti` → force_the `"the "` else skip a/an.
xname+doname strip leading `"the "` so bp matches C. Named
ONAME in the lookup. `reorder_fruit` / `goodfruit` / pager
look named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
artifact-named fruit public-unhit.
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `objnam.c` `reorder_fruit`. Not fruit_from_indx.
**Blocked:** none.
## 2026-08-26 — D-1520 options.c fruitadd fruit_from_name walker

**Objective:** Open `options.c` fruitadd should call objnam
`fruit_from_name` (not the exact-only walker). Not
fruit_from_indx.
**C locus:** `options.c` `fruitadd` `:8264`; callee
`objnam.c` `fruit_from_name` `:443–519`; caller
`optfn_fruit` `:1735`.
**JS locus:** `js/options.js` `fruitadd`; `js/mklev.js`
`fruitadd_orc`; `js/hacklib.js` `str_end_is`.
**Change:** Drop local exact-only walker. Live objnam
`fruit_from_name(FALSE)` + max fid. Candify tin/corpse/egg
`name_to_mon`; overflow `rnd(127)`. Orc clone same walker.
Bones/restore ghostfruit named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
prefix/candify fruit public-unhit except seed4500 doset
path (still PASS).
**Verified:** canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict; seed4500 + strict.
**Next:** Open `objnam.c` doname_base slime-mold fake_arti.
Not fruit_from_indx.
**Blocked:** none.
## 2026-08-26 — D-1519 mklev.c mktrap_victim gnome candle begin_burn

**Objective:** Open `mklev.c` `mktrap_victim` gnome candle
`begin_burn` (named). Not `m_initinv`.
**C locus:** `mklev.c` `mktrap_victim` `:1918–1919`.
**JS locus:** `js/mklev.js` `mktrap_victim`.
**Change:** After gnome `place_object`, `!levl.lit` → live
`begin_burn(otmp, false)`. Not D-1506 minvent. `create_object`
`o->lit` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
public-unhit unless gnome victim candle on unlit trap.
**Verified:** canary **10**/10; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `options.c` fruitadd `fruit_from_name`.
Not fruit_from_indx.
**Blocked:** none.
