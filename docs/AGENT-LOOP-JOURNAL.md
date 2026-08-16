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

## 2026-08-16 07:40 — #1350 review D-1066/D-1067 + cadence score

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`7e330128` D-1066, `2e50b318` D-1067)
against pinned C, not the journal; cadence full `sessions`.
**C locus:** `nhlua.c` `tutorial` / `l_nhcore_call` / `l_nhcore_init`;
`do.c` `goto_level`; `dat/nhcore.lua` / `nhlib.lua`; `sit.c` `dosit`
406–408; `do_name.c` `mon_nam` / `x_monnam` ARTICLE_THE.
**Change:** review 27 ACCEPT (`tutorial()` then both ENTER/LEAVE
FALSE; Lua NHCB / GETPOS_TIP / `leaving_tutorial` FREEING named).
Review 28 ACCEPT (`You`+`mon_nam`, not `y_monnam`; one-pline density
note). Must-fix empty. Filled Addressed hash `2e50b318`. No `js/`
edits. Rule #2: no fs. Rotated #1335 to archive.
**Score:** cadence **#1350** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.26/turn` (R² 0.87). Next @**#1355**.
**Verified:** C read of `nhlua.c:140–194`/`1837–1846`, `do.c:1503–1515`
/`1640–1664`, `sit.c:406–409`, `do_name.c:1042–1046`/`1117–1128`,
`pline.c:366–374`, pinned `nhcore.lua` table; hunks grepped FORCE/fs.
Full `sessions` **44**/44; role-init throws **0**/44.
**Next:** Open empty; remaining `dosit` hider / `can_reach_floor` /
`ustuck` or `debt.md`.
**Blocked:** none.

## 2026-08-16 07:22 — #1349 D-1067 dosit steed mon_nam(usteed)

**Objective:** Open queue — `dosit` steed message: C
`mon_nam(usteed)`, not `"your steed"` (D-1033 risk 4).
**C locus:** `sit.c` `dosit` (~406–408); `do_name.c` `mon_nam` /
`x_monnam` ARTICLE_THE.
**Change:** `You`+`mon_nam(u.usteed)` (unnamed saddled `"the
saddled pony"`; named bare). Not `y_monnam`. Hider /
`can_reach_floor` / ustuck still named. Filled Addressed hash
`7e330128` (D-1066). Rule #2: no fs. Rotated #1334 to archive.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** private node three names + `ECMD_OK`; never
`"your steed"`. green+strict PASS; cohort **7**/7
(0106/0107/4500/1500/1800/0060/2200). Path unhit.
**Next:** Open empty; remaining `dosit` hider / `can_reach_floor`
/ `ustuck` or `debt.md`.
**Blocked:** none.

## 2026-08-16 07:15 — #1348 D-1066 tut-1 tutorial() nhcore disable

**Objective:** Open queue — tut-1 nhcore callback disable on
enter/leave only (not Lua cmd_before/`tutorial_turn` / Knight jump).
**C locus:** `nhlua.c` `tutorial` / `l_nhcore_call` / `l_nhcore_init`;
`do.c` `goto_level`; `dat/nhcore.lua` enter/leave_tutorial;
`dat/nhlib.lua` `tutorial_enter`/`tutorial_leave`.
**Change:** `goto_level` calls `tutorial()`. `l_nhcore_init` fills
`nhcore_call_available` TRUE. After leave, both ENTER/LEAVE FALSE.
Lua `nh.callback` cmd_before/`tutorial_turn` still named. Rule #2:
no fs. Rotated #1333 to archive.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** private node enter keeps available + stash; leave
disables both; second enter skips; nil start_new_game disables that
slot; GETPOS stays TRUE. green+strict PASS; seed0009 **73**/73;
cohort **12**/12.
**Next:** Open `dosit` steed `mon_nam(usteed)`.
**Blocked:** none.

## 2026-08-16 07:05 — #1347 review D-1065 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`296bc792` D-1065) against pinned C,
not the journal. Docs-only `b3daacc3` cadence #1345 noted, not a
port claim.
**C locus:** `cmd.c` `cmd_from_ecname` / `cmd_from_func` /
`commands_init` / `reset_commands`; `nhlua.c` `nhl_get_cmd_key`;
`hacklib.c` `visctrl`; `dat/tut-1.lua` `tut_key` / `tut_key_help`.
**Change:** review 26 ACCEPT (default `!num_pad` eckey strings +
Lua Ctrl-/Alt- rewrite; loot `M-l` / tip `Alt-T` / untrap `M-u` /
twoweapon `X`; `cmd_from_func` list-order and `ef_funct` sharing
named, unhit by tut-1). Must-fix empty. Filled Addressed hash
`296bc792`. No `js/` edits. Rule #2: no fs. Rotated #1332 to
archive.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** C read of `cmd.c:2135–2154`/`2750–2782`/`3036–3088`/
`3343–3476`, `nhlua.c:1644–1657`, `hacklib.c:469–493`,
`hack.h:655`, `dat/tut-1.lua:5–27`/`70–107`/`230–267`/`294`; grep
FORCE/DIAG/fs on the `js/dokeylist.js` + `js/mklev.js` hunks.
**Next:** Open tut-1 nhcore callback disable on enter/leave.
**Blocked:** none.

## 2026-08-16 06:40 — #1346 D-1065 tut-1 tut_key / eckey

**Objective:** Open queue — tut-1 `tut_key` / eckey only (not
nhcore disable / Knight jump).
**C locus:** `cmd.c` `cmd_from_ecname`/`cmd_from_func`;
`nhlua.c` `nhl_get_cmd_key`; `dat/tut-1.lua` `tut_key` /
`tut_key_help`; `hacklib.c` `visctrl`.
**Change:** `cmd_from_ecname` on default binds + BIND overlay.
`load_tut1` Lua Ctrl-/Alt- rewrite + `tut_key_help`. Loot
`M-l`, tip `Alt-T`, untrap `M-u`, twoweapon `X`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** private node eckey table; green+strict PASS;
seed0009 **73**/73; cohort **12**/12.
**Next:** Open tut-1 nhcore callback disable on enter/leave.
**Blocked:** none.

## 2026-08-16 06:16 — #1345 cadence score refresh

**Objective:** mandatory cadence full `sessions` (@#1345 % 5 == 0);
refresh `CURRENT.md` Score. No port (score-only).
**C locus:** n/a (score-only; no JS port change).
**Change:** docs only — Score **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.87). No leftover `[x]` / missing
Addressed hashes. Rotated #1330 to archive. Rule #2: no fs.
**Score:** cadence **#1345** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.27/turn` (R² 0.87). Next @**#1350**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
**Next:** Open tut-1 `tut_key` / eckey only.
**Blocked:** none.

## 2026-08-16 06:15 — #1344 review D-1063/D-1064 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`3f376b74` D-1063, `dc354c44` D-1064)
against pinned C, not the journal.
**C locus:** `sp_lev.c` `create_object` / `lspo_object` /
`get_table_buc` / `levregion_add` / `lspo_teleport_region` /
`get_location`; `mkmaze.c` `fixup_special` leftover TELE;
`dungeon.c` `u_on_rndspot`; `dat/tut-1.lua` food + teleport_region.
**Change:** reviews 24 ACCEPT (buc 4 `uncurse`, pmnames lichen not
`find_montype`, CORPSTAT spe then `set_corpsenm`) and 25 ACCEPT
(ANY_LOC origin add, omit-exclude `-1` `del_islev`, leftover dest
copy; `place_lregion` already ran from `u_on_rndspot`). Must-fix
empty. Filled Addressed hash `dc354c44`. No `js/` edits. Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1340** **44**/44; next
@**#1345**).
**Verified:** C read of `sp_lev.c:2193–2264`/`3442–3451`/`3667–3720`/
`1202–1269`/`5371–5459`, `mkobj.c:1318–1367`/`1822–1838`,
`mkmaze.c:341–410`/`570–704`, `dungeon.c:1605–1634`,
`dungeon.h:35–44`/`144–145`, `dat/tut-1.lua:59`/`258–261`; grep
FORCE/DIAG/fs on the `js/mklev.js` hunks.
**Next:** Open tut-1 `tut_key` / eckey only.
**Blocked:** none.

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

