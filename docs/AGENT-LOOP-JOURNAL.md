# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-08-16 05:50 — #1343 D-1064 tut-1 levregion_add / place_lregion dests

**Objective:** Open queue — tut-1 `place_lregion` only (not key /
nhcore).
**C locus:** `sp_lev.c` `levregion_add` / `lspo_teleport_region` /
`get_location` ANY_LOC; `mkmaze.c` `fixup_special` TELE dest copy;
`dungeon.c` `u_on_rndspot` → `place_lregion`; `dat/tut-1.lua:59`.
**Change:** `get_location` packed ANY_LOC; `levregion_add`;
`l_teleport_region` (dir both=`LR_TELE`, omit exclude `-1`
`del_islev`). `fixup_special` leftover lregion switch. `load_tut1`
uses it and calls `fixup_special`. Did not rewire other `load_*`
inline lregions; branch fallback still `made_branch`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1340** **44**/44; next
@**#1345**).
**Verified:** private node packed inarea origin+9,+3, delarea `-1`,
`LR_TELE`; `region_islev` skip; exclude `get_location`. green+strict
PASS; seed0009 **73**/73; cohort **12**/12
(8000/0900/0009/0030/0060/0102/0116/0360/0373/1500/1800/2200).
**Next:** Open tut-1 `tut_key` / eckey only.
**Blocked:** none.

## 2026-08-16 05:20 — #1342 D-1063 tut-1 create_object food objects

**Objective:** Open queue — tut-1 food objects only (not
`place_lregion` / key / nhcore).
**C locus:** `sp_lev.c` `create_object` / `lspo_object` /
`get_table_buc`; `dat/tut-1.lua` apple/candy/lichen at (50,3).
**Change:** `create_object` corpsenm (`NON_PM` skip, else
`set_corpsenm`). `l_create_object` buc map + STATUE/EGG/CORPSE/TIN/
FIGURINE montype (pmnames, not find_montype gender RNG). CORPSE
`spe`=CORPSTAT lflags. `load_tut1` uses it for the three foods only.
Did not rewire knife/ring/other `tut1_object`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1340** **44**/44; next
@**#1345**).
**Verified:** private node: pile of 3 at packed (50,3); lichen
`corpsenm=PM_LICHEN` `spe=0`; candy wrapper spe 1..12. green+strict
PASS; seed0009 **73**/73; cohort **9**/9
(0009/0030/0060/0102/0360/0373/1500/1800/2200).
**Next:** Open tut-1 `place_lregion` only.
**Blocked:** none.

## 2026-08-16 04:55 — #1341 review D-1062 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`3ca1b544` D-1062) against pinned C, not
the journal. Cadence `51b969b5` is docs-only.
**C locus:** `sp_lev.c` `create_object` / `lspo_object` /
`get_location_coord` / `spo_pop_container`; `shk.c` `delete_contents`;
`mkobj.c` `mkbox_cnts` / `obj_extract_self`; `dat/tut-1.lua` box+wand.
**Change:** review 23 ACCEPT (packed origin add; DRY random double-try;
`container_obj` push/pop; `stackobj` before contents; broken/trapped
after `mkbox_cnts`). `delete_contents` is an extract clone, not
`obfree` — named, same class as D-1061 `deltrap`. No new Must-fix.
Addressed hash `3ca1b544` already on the archive row. No `js/` edits.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1340** **44**/44; next
@**#1345**).
**Verified:** C read of `sp_lev.c:1202–1353`/`2193–2439`/`3040–3046`/
`3557–3754`, `shk.c:1175–1183`, `mkobj.c:304–370`/`2557–2592`,
`tut-1.lua:232–235`; JS hunks grepped FORCE/fs/seed.
**Next:** Open tut-1 food objects only.
**Blocked:** none.

## 2026-08-16 04:46 — #1340 cadence score refresh

**Objective:** mandatory cadence full `sessions` (@#1340 % 5 == 0);
refresh `CURRENT.md` Score. No port (score-only).
**C locus:** n/a (score-only; no JS port change).
**Change:** docs only — Score **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.88). Filled Addressed hash
`3ca1b544` (D-1062). Rotated #1325 to archive. Rule #2: no fs.
**Score:** cadence **#1340** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.27/turn` (R² 0.88). Next @**#1345**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
**Next:** Open tut-1 food objects only.
**Blocked:** none.

## 2026-08-16 04:42 — #1339 D-1062 tut-1 create_object large-box contents

**Objective:** Open queue — tut-1 large-box contents only (not food /
`place_lregion` / key / nhcore).
**C locus:** `sp_lev.c` `create_object` / `lspo_object`;
`get_location_coord`; `shk.c` `delete_contents`; `dat/tut-1.lua`
box (41,6) + nested wand.
**Change:** `l_create_object` unpacked path: packed origin, random
DRY `get_location_coord` double-try, `delete_contents` after
`mkbox_cnts`, `container_obj` push/pop, `stackobj` when not content.
`load_tut1` uses it for the box+wand only. Did not rewire other
`load_*` `des.object`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1335** **44**/44; next
@**#1340**).
**Verified:** private node 20/20 DRY-only ROOM; box broken/unlocked
wand `spe=30` `cobj` len 1. green+strict PASS; seed0009 **73**/73;
cohort **11**/11 (8000/0900/0009/1500/1800/0060/0102/0360/2200/0030/
0373). Path unhit except seed0009 prefix.
**Next:** Open tut-1 food objects only.
**Blocked:** none.

## 2026-08-16 04:25 — #1338 review D-1060/D-1061 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`ecd37108` D-1060, `05915d9b` D-1061)
against pinned C, not the journal.
**C locus:** `youprop.h` Fire/Cold; `sit.c` `dosit` ~548–553;
`worn.c` `oc_oprop`; `sp_lev.c` `l_create_stairway`/`get_location`;
`mklev.c` `mkstairs` force; `trap.c` `deltrap`; `dat/tut-1.lua` stair.
**Change:** reviews 21 ACCEPT (sit helpers OR `uprops[FIRE_RES]`/
`[COLD_RES]`; worn ring `d(2,10)`) and 22 ACCEPT (packed origin add;
`force` ROOM then dungeon-end; tut-1 is 2-level so down stairs
place — D-log “early return” was overclaim). No new Must-fix.
Filled Addressed hash `05915d9b`. No `js/` edits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1335** **44**/44; next
@**#1340**).
**Verified:** C read of `youprop.h:26–32`, `sit.c:539–555`,
`do_wear.js:261–288`, `sp_lev.c:1202–1349`/`4147–4212`,
`mklev.c:2156–2197`, `trap.c:6502–6549`, `tut-1.lua:289`;
JS hunks grepped FORCE/fs/seed.
**Next:** Open tut-1 large-box contents only.
**Blocked:** none.

## 2026-08-16 04:13 — #1337 D-1061 tut-1 packed des.stair l_create_stairway

**Objective:** Open queue — tut-1 stairs only (not box / food /
`place_lregion` / key / nhcore).
**C locus:** `sp_lev.c` `l_create_stairway` / `lspo_stair`;
`mklev.c` `mkstairs` force; `dat/tut-1.lua` `des.stair` (58,10).
**Change:** packed path deltrap + SpLev_Map + `mkstairs(..., force)`
so ROOM is set before dungeon-end return. Tutorial is dlevel 1 of
2 so down stairs place. Ladder arm skips the mkstairs end-check.
Did not rewire `splev_create_stair` / other loaders. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1335** **44**/44; next
@**#1340**).
**Verified:** private node 2-lev HWALL→STAIRS, botlevel force ROOM,
deltrap, ladder on botlevel. green+strict PASS; seed0009 **73**/73;
cohort **11**/11 (8000/0900/0009/1500/1800/0060/0102/0360/2200/0030/
0373). Path unhit except seed0009 prefix.
**Next:** Open tut-1 large-box contents only.
**Blocked:** none.

## 2026-08-16 03:55 — #1336 D-1060 dosit Fire/Cold uprops[]

**Objective:** Must-fix — `dosit` lava/ice sit Fire_resistance /
Cold_resistance must read C `youprop.h` `uprops[FIRE_RES]` /
`[COLD_RES]` (review 19 QUALITY-RISK).
**C locus:** `youprop.h:26–32`; `sit.c` `dosit` ~548–553;
`worn.c` `setworn` `oc_oprop`.
**Change:** sit helpers OR flats + `uprops[]` (invent.js
`hero_Fire_resistance` shape). Did not rewrite `confer_oc_oprop`;
did not retouch zap/trap/explode aliases; did not pull `is_lava`
DRAWBRIDGE_UP+DB_LAVA. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1335** **44**/44; next
@**#1340**).
**Verified:** private node worn FIRE_RES ring `EFire` unset →
`d(2,10)`; `HFire` only → `d(2,10)`; no-res → `d(10,10)`; COLD_RES
ring on ICE skips “ice feels cold”; trap TT_LAVA still
`rnd(4)`+`d(2,10)`. green+strict PASS; cohort **6**/6
(seed1500/1800/0060/0102/0360/2200). Path unhit.
**Next:** Open tut-1 stairs only.
**Blocked:** none.

## 2026-08-16 03:50 — #1335 review D-1058/D-1059 + cadence score

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`27f0a233` D-1058, `c0d5279a` D-1059)
against pinned C, not the journal; cadence full `sessions`.
**C locus:** `sit.c` `dosit` ~539–555; `dbridge.c` `is_lava`/`is_ice`;
`youprop.h` Fire/Cold; `do_wear.c`/`worn.c` `setworn` oc_oprop;
`mklev.c` `water_has_kelp`/`mineralize`; `dungeon.h` `In_endgame`.
**Change:** review 19 QUALITY-RISK (lava/ice/drawbridge order matches;
Fire/Cold helpers miss `uprops[]` so a worn FIRE_RES ring still
`d(10,10)`). Review 20 ACCEPT (WATER `!Is_waterlevel` + endgame
return before kelp). Must-fix prepended. Filled Addressed hash
`c0d5279a`. No `js/` edits. Rule #2: no fs.
**Score:** cadence **#1335** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.27/turn` (R² 0.87). Next @**#1340**.
**Verified:** C read of `sit.c:539–555`, `youprop.h:26–32`,
`dbridge.c:62–96`, `timeout.c:448–453`, `mondata.h:190–191`,
`do_wear.js:261–288` confer_oc_oprop (FIRE_RES unmirrored),
`invent.js:1684–1689`, `mklev.c:1430–1550`, `dungeon.h:115`/`141`;
grep `EFire_resistance=`; hunks grepped FORCE/fs/seed.
**Next:** Must-fix sit Fire/Cold `uprops[]` (review 19 item 1).
**Blocked:** none.

## 2026-08-16 03:35 — #1334 D-1059 tut-1 mineralize kelp

**Objective:** Open queue — tut-1 `des` kelp only (not stairs /
box / key / `place_lregion`).
**C locus:** `mklev.c` `water_has_kelp` / `mineralize`;
`dat/tut-1.lua` has no `des.mineralize` (map `P`/`W` + post-load
`mineralize(-1,-1,-1,-1,FALSE)`).
**Change:** `water_has_kelp` C `&&`/`||` (`POOL` or `WATER &&
!Is_waterlevel`; MOAT); `In_endgame` return before kelp unless
`skip_lvl_checks`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1330** **44**/44; next
@**#1335**).
**Verified:** private node P/W/M place; endgame skip; waterlevel
WATER no `rn2`; defaults `rn2(10)`×2+`rn2(30)`. green+strict PASS;
seed0009 **73**/73; cohort **8**/8.
**Next:** Open tut-1 stairs only.
**Blocked:** none.

## 2026-08-16 03:20 — #1333 D-1058 dosit lava/ice/DRAWBRIDGE_DOWN sit

**Objective:** Open queue — `sit.c` `dosit` lava / ice / drawbridge
sit (terrain, not trap-lava D-1039).
**C locus:** `sit.c` `dosit` ~539–555; `dbridge.c` `is_lava`/`is_ice`;
`mondata.h` `likes_lava`; `youprop.h` Fire/Cold; `timeout.c`
`burn_away_slime`.
**Change:** WWalking lava sit_message + `burn_away_slime` +
`likes_lava` warm vs `d((Fire_resistance?2:10),10)` `"sitting on
lava"`; ice sit_message + !Cold `"ice feels cold"`; DRAWBRIDGE_DOWN
`"drawbridge"`. Local `is_ice` includes DRAWBRIDGE_UP+DB_ICE.
`hack.js` `is_lava` DRAWBRIDGE_UP+DB_LAVA still named. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1330** **44**/44; next
@**#1335**).
**Verified:** private node likes_lava no `d()`; burn `d(10,10)` no
trap `rnd(4)`; Fire_res `d(2,10)`; ice ±Cold; drawbridge; throne
still `rnd(6)`; trap TT_LAVA `rnd(4)`+`d(2,10)`. green+strict PASS;
cohort **6**/6 (seed1500/1800/0060/0102/0360/2200). Path unhit.
**Next:** Open tut-1 `des` kelp only.
**Blocked:** none.

## 2026-08-16 03:15 — #1332 review D-1056/D-1057 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`2e79451d` D-1056, `e1852e71` D-1057)
against pinned C, not the journal.
**C locus:** `youprop.h` `Underwater`; `sit.c` `dosit` ~430 / ~505 /
~526–538; `pray.c` `altar_wrath` / `godvoice` / `align_gname`;
`mondata.h` `humanoid`; `defsym.h` explanations.
**Change:** reviews 17 ACCEPT (sit predicates read `u.uinwater`) and
18 ACCEPT (furniture sit_message + real `altar_wrath`; lava/ice/
drawbridge still named Open). Must-fix empty. Filled Addressed hash
`e1852e71`. No `js/` edits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1330** **44**/44; next
@**#1335**).
**Verified:** C read of `youprop.h:279`, `sit.c:430–431`/`505–510`/
`526–557`, `defsym.h:129–133`, `rm.h:82–88`, `mondata.h:65`,
`pray.c:107`/`1415–1426`/`2530–2554`/`2652–2672`, `attrib.c:117–128`
/`411–418`, `dbridge.c:62–96`; grep `uinwater=` vs `u.Underwater`.
**Next:** Open `dosit` lava sit (not ice/drawbridge in that cluster).
**Blocked:** none.

## 2026-08-16 03:00 — #1331 D-1057 dosit furniture sit_message

**Objective:** Open queue — `sit.c` `dosit` sink / altar / grave /
stairs / ladder sit messages only. Not lava/ice/drawbridge.
**C locus:** `sit.c` `dosit` ~526–538; `defsym.h` S_sink/S_altar/
S_grave; `pray.c` `altar_wrath`.
**Change:** sit_message for IS_SINK (rump/underside) + IS_ALTAR +
`altar_wrath` (dynamic import) + IS_GRAVE + STAIRS `"stairs"` +
LADDER `"ladder"`. Filled D-1056 hash `2e79451d`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1330** **44**/44; next
@**#1335**).
**Verified:** private node sink rump/underside no throne `rnd(6)`;
grave/stairs/ladder not having-fun; altar `rn2(4)` no throne;
ROOM having-fun; throne still `rnd(6)`. green+strict PASS;
cohort **6**/6 (seed1500/1800/0060/0102/0360/2200). Path unhit.
**Next:** Open `dosit` lava / ice / drawbridge sit.
**Blocked:** none.

## 2026-08-16 02:46 — #1330 D-1056 dosit Underwater ≡ u.uinwater

**Objective:** Must-fix — `dosit` water predicates use C
`Underwater` (`u.uinwater`), not unset `u.Underwater`.
**C locus:** `sit.c` `dosit` ~430 / ~505; `youprop.h:279`.
**Change:** local `Underwater()` returns `u.uinwater`; both sit
predicates use it. Did not rewrite other `js/` `u.Underwater` or
second `water_damage` to `uarmf`. Rule #2: no fs.
**Score:** cadence **#1330** **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.88). Next @**#1335**.
**Verified:** private node `uinwater=1` muddy 0×`rn2(10)`;
`uinwater=0` in_water 2×`rn2(10)`; dead `u.Underwater` ignored;
picnic vs skip; eel underwater having-fun. green+strict PASS;
cohort **6**/6; full `sessions` **44**/44.
**Next:** Open `dosit` sink/altar/grave/stairs/ladder messages.
**Blocked:** none.

## 2026-08-16 02:40 — #1329 review D-1054/D-1055 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`3f8469fe` D-1054, `e13735f8` D-1055)
against pinned C, not the journal.
**C locus:** `restore.c` `restobjchn`; `zap.c` `get_obj_location`;
`sit.c` `dosit` in_water; `youprop.h` `Underwater`; `potion.c`
`split_mon`; `mhitu.c` `cloneu`.
**Change:** reviews 15 ACCEPT (restore stamps `cobj` CONTAINED;
flags switch was already C) and 16 QUALITY-RISK (`in_water` body
matches; sit reads unset `u.Underwater` vs C `u.uinwater`).
Must-fix prepended. Filled Addressed hash `e13735f8`. No `js/`
edits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1325** **44**/44; next
@**#1330**).
**Verified:** C read of `restore.c:270–277`, `zap.c:657–689`,
`obj.h:75–81`/`450–451`, `sit.c:430–435`/`505–525`,
`youprop.h:279`, `potion.c:2873–2898`, `mhitu.c:2616–2638`,
`mondata.h:78–79`; grep `uinwater=` vs `u.Underwater` reads.
**Next:** Must-fix sit `Underwater` → `u.uinwater`.
**Blocked:** none.

