# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
