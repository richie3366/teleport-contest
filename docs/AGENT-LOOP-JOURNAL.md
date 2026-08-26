# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-26 — D-1518 makemon.c dprince MS_BRIBE / raven BEC_DE_CORBIN

**Objective:** Open `makemon.c` dprince MS_BRIBE / raven
`BEC_DE_CORBIN` (named). Not emin.
**C locus:** `makemon.c` `makemon` `:1397–1404`.
**JS locus:** `js/makemon.js` `makemon`.
**Change:** Bribe princes peace+invis; Excalibur/Demonbane
hostile+untame; raven+bec peace. Live `is_dprince`. Local
`u_wield_art` clone (artifact→display→mkobj cycle). Rule #2:
no fs.
**Score:** fortress **44**/44 (cadence #1900);
public-unhit until bribe prince / raven-with-bec.
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `mklev.c` `mktrap_victim` gnome candle
`begin_burn`. Not `m_initinv`.
**Blocked:** none.
## 2026-08-26 — D-1517 makemon.c set_mimic_sym maze/in_town statue

**Objective:** Open `makemon.c` `set_mimic_sym`
maze/sokoban/`in_town` (named). Not shop arm.
**C locus:** `makemon.c` `set_mimic_sym` `:2439–2443`;
callee `hack.c` `in_town` + `mkroom.c` `inside_room`.
**JS locus:** `js/makemon.js` `set_mimic_sym`.
**Change:** C `!(In_mines && in_town(u.ux,u.uy))` not
mines-only skip. Local `in_town` clone (hack→trap/mon
cycle; same as `t_at_local`). Sokoban already skipped
`rn2(2)`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
mines-maze statue public-unhit unless town skip.
**Verified:** canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `makemon.c` dprince MS_BRIBE / raven
`BEC_DE_CORBIN`. Not emin.
**Blocked:** none.
## 2026-08-26 — D-1516 makemon.c m_initweap S_LIZARD skip + PM_NINJA kit

**Objective:** Open `makemon.c` non-salamander S_LIZARD
`m_initweap` (named). Not S_KOP.
**C locus:** `makemon.c` `m_initweap` S_LIZARD `:495–499`;
S_HUMAN `PM_NINJA` `:270–272`; callee `mongets`.
**JS locus:** `js/makemon.js` `m_initweap`.
**Change:** Keep lizard `if (mm==PM_SALAMANDER)` then break
(`!is_armed` skip). Port ninja SHURIKEN|DART then
SHORT_SWORD|AXE. Same function; live `mongets`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
ninja public-unhit until quest create.
**Verified:** canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `makemon.c` `set_mimic_sym`
maze/sokoban/`in_town`. Not shop arm.
**Blocked:** none.
## 2026-08-26 — D-1515 makemon.c m_initweap S_KOP cream pie / club / hose

**Objective:** Open `makemon.c` S_KOP `m_initweap`
specials (named). Not throws_rocks.
**C locus:** `makemon.c` `m_initweap` S_KOP `:402–409`;
callees `m_initthrow` / `mongets`.
**JS locus:** `js/makemon.js` `m_initweap`.
**Change:** `!rn2(4)` `m_initthrow(CREAM_PIE,2)` then
`!rn2(3)` CLUB or RUBBER_HOSE. Not a clone. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
kops public-unhit until `makekops`.
**Verified:** canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `makemon.c` non-salamander S_LIZARD
`m_initweap`. Not S_KOP.
**Blocked:** none.
## 2026-08-26 — D-1514 artifact.c SPFX_WARN conferral + MATCH_WARN

**Objective:** Open `artifact.c` SPFX_WARN conferral /
MATCH_WARN (named). Not Sting_effects.
**C locus:** `artifact.c` `set_artifact_intrinsic`
`:824–839`; `spec_m2` `:1065–1072`; `hack.h`
`MATCH_WARN_OF_MON`.
**JS locus:** `js/artifact.js`; `js/display.js`.
**Change:** spec_m2 → EWarn_of_mon + warntype.obj +
see_monsters; else EWarning. MATCH_WARN in sensemon
and newsym see_it. Not confer_oc_oprop. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
Sting glow public-unhit until wielded.
**Verified:** canary **44**/44; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `makemon.c` S_KOP `m_initweap`
specials. Not throws_rocks.
**Blocked:** none.
## 2026-08-26 — D-1513 mklev.c minetn-7 town-floor three gnomes

**Objective:** Must-fix `load_minetn_7` three town gnomes
not four (review **465**). Not SPFX_WARN.
**C locus:** `dat/minetn-7.lua` `:155–165`; callee
`sp_lev.c` `create_monster` `induced_align(80)`.
**JS locus:** `js/mklev.js` `load_minetn_7`.
**Change:** delete the extra
`splev_room_monster(town, 'gnome')` so lua×3 matches.
Nested / stair gnomes unchanged. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1900);
Bazaar Town public-unhit unless variant 7.
**Verified:** canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `artifact.c` SPFX_WARN conferral /
MATCH_WARN. Not Sting_effects.
**Blocked:** none.
