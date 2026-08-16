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

## 2026-08-16 02:25 — #1328 D-1055 dosit water/pool/gremlin sit

**Objective:** Open queue — `sit.c` `dosit` water / pool / gremlin
sit (after trap, before sink). Not furniture.
**C locus:** `sit.c` `dosit` ~430 early pool/gremlin goto; ~505
Underwater/waterlevel; ~511 `in_water`; `potion.c` `split_mon`;
`mhitu.c` `cloneu`.
**Change:** early `is_pool&&!Underwater` and gremlin fountain/pool
skip OBJ_AT/trap; muddy-bottom / no-cushions; `in_water` sit +
hero `split_mon`/`cloneu` + fountain `dryup`; else `rn2(10)`
`water_damage(uarm)` twice (C second call is `uarm`). Locals in
`sit.js` (eat←potion / zap←mhitu cycles). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1325** **44**/44; next
@**#1330**).
**Verified:** private node pool skip-picnic, underwater mud,
gremlin fountain multiply 20→10, eel-pool in_water,
eel-underwater having-fun; green+strict PASS; cohort **6**/6
(seed1500/1800/0060/0102/0360/2200). Path thin.
**Next:** Open `dosit` sink/altar/grave/stairs/ladder messages.
**Blocked:** none.

## 2026-08-16 02:08 — #1327 D-1054 restore cobj OBJ_CONTAINED

**Objective:** Must-fix — `get_obj_location` flags `0` must not
accept CONTAINED when C hatch passes `0` (D-1036 risk 4).
**C locus:** `zap.c` `get_obj_location`; `timeout.c` `hatch_egg`
flags `0`; `restore.c` `restobjchn` cobj/`ocontainer`.
**Change:** `timeout.js` switch already matched C. `deserObjChain`
stamped nested `cobj` with parent FLOOR/INVENT/MINVENT; recurse
`OBJ_CONTAINED`. Save buried list `OBJ_BURIED`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1325** **44**/44; next
@**#1330**).
**Verified:** private node flags=0 null + save/restore
`where=CONTAINED`; green+strict PASS; restore/bones/hatch cohort
**7**/7. Path thin (live `goto_level` keeps `where`).
**Next:** Open `dosit` water/pool/gremlin sit (Must-fix empty).
**Blocked:** none.

## 2026-08-16 01:55 — #1326 review D-1052/D-1053 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`1710bd41` D-1052, `178d60f2` D-1053)
against pinned C, not the journal.
**C locus:** `youprop.h` `Glib`; `potion.c` `make_glib`/`set_itimeout`;
`apply.c` `use_lamp`/`use_towel`/`use_grease`; `timeout.c` generic
TIMEOUT `--`; `sounds.c` `cry_sound`/`growl_sound`; `monflag.h`
`enum ms_sounds`; `monst.c` `SIZ`.
**Change:** reviews 13 ACCEPT (ticking `uprops[GLIB].intrinsic`
remainder; H\|E is the old review’s name, not a C macro) and 14
ACCEPT (`msounds[]` is C SIZ; cry no longer always-chitter). No new
Must-fix. Filled Addressed hash `178d60f2`. No `js/` edits. Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1325** **44**/44; next
@**#1330**).
**Verified:** C read of `youprop.h:112`, `potion.c:56–78`/`460–467`,
`apply.c:125–167`/`1669–1673`/`2633–2643`, `timeout.c:670–671`/`935–936`,
`monflag.h:10–59`, `sounds.c:351–397`/`617–654`/`696–697`,
`zap.c:654–688`; 35/35 `msounds[]` samples; JS hunks grepped FORCE/fs/seed.
**Next:** Must-fix `get_obj_location` flags `0` vs CONTAINED
(D-1036 risk 4). `timeout.js` already gates CONTAINED on
`CONTAINED_TOO`; prove remaining `where`/clone or close the row.
**Blocked:** none.

## 2026-08-16 01:47 — #1325 D-1053 cry_sound msound C monflag.h

**Objective:** Must-fix — `cry_sound` monster `msound` must be C
`monflag.h` numbers, not empty → always-chitter (D-1036 risk 3).
**C locus:** `sounds.c` `cry_sound` / `growl_sound`; `monsters.h`
`SIZ(wt,nut,sound,sz)`; `monflag.h` `enum ms_sounds`.
**Change:** extractor captures SIZ sound → `msounds[]`; `mons().msound`;
unify growl/cry MS_* to C numbers; `domonnoise` leader poly-safe is
C `msound > MS_ANIMAL` (dropped omitted-table `msound===0` shim).
`peace_minded`/`set_malign` still unread. Rule #2: no fs.
**Score:** cadence **#1325** **44**/44 Scr **11405**/11405 RNG **100%**
speed `32+0.26/turn` (R² 0.87). Next @**#1330**.
**Verified:** private cry stems match C (bee buzz / hiss / growl /
screech / grunt / chirp / mumble / eel gurgle / ant chitter).
green+strict PASS; quest/hatch cohort **7**/7 after leader shim
(seed0361/0367/0373/4500/0014). Path **unhit** by public traces.
**Next:** Must-fix `get_obj_location` flags `0` vs CONTAINED
(D-1036 risk 4).
**Blocked:** none.

## 2026-08-16 01:32 — #1324 D-1052 cursed-lamp make_glib Glib TIMEOUT

**Objective:** Must-fix — cursed-lamp `make_glib` remaining timeout
must match C `(Glib&TIMEOUT)` / review `HGlib|EGlib`.
**C locus:** `apply.c` `use_lamp` (~1673); `potion.c` `make_glib`
`set_itimeout(&Glib)`; `youprop.h` Glib ≡ `uprops[GLIB].intrinsic`.
**Change:** export `Glib()` as HGlib|EGlib; `make_glib` writes
intrinsic + HGlib/Glib mirrors; `use_lamp`/`use_towel`/`use_grease`
use `(Glib()&TIMEOUT)`; `nh_timeout` TIMEOUT_FLAT GLIB. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1320**; next @**#1325**).
**Verified:** green+strict PASS; apply/timeout cohort **8**/8;
private node remainder 20→27 and `nh_timeout` 5→2. Path unhit.
**Next:** Must-fix `cry_sound` C `monflag.h` numbers (D-1036 risk 3).
**Blocked:** none.

## 2026-08-16 01:20 — #1323 review D-1050/D-1051 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`4e55ff2f` D-1050, `7e389050` D-1051)
against pinned C, not the journal.
**C locus:** `pickup.c` `pickup_object`/`lift_object`/`carry_count`/
`fatal_corpse_mistake`/`rider_corpse_revival`; `engrave.c`
`u_wipe_engr`; `apply.c` `display_*_positions`; `defsym.h` S_goodpos.
**Change:** reviews 11 ACCEPT (telekinesis TRUE silent encumbrance
refuse + skip petrify; scare `carry_count` FALSE; ynq default `q`)
and 12 ACCEPT (real `u_wipe_engr`; three `tmp_at` S_goodpos loops;
paint on `$` like C). No new Must-fix. Filled Addressed hash
`7e389050`. No `js/` edits. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1320**; next @**#1325**).
**Verified:** C read of `pickup.c:273–313` / `1570–1888`,
`hack.c:4391–4396`, `hack.h:1330` ynq, `engrave.c:187–289`,
`apply.c:1959–1984` / `3334–3352` / `3701–3725` / `3561` / `3809–3810`,
`defsym.h:207`; JS hunks grepped FORCE/fs/seed.
**Next:** Must-fix cursed-lamp `make_glib` HGlib|EGlib (D-1023).
**Blocked:** none.

## 2026-08-16 01:10 — #1322 D-1051 apply u_wipe_engr + S_goodpos tmp_at

**Objective:** Must-fix D-1022 risk 7 — `u_wipe_engr` / `tmp_at`
no-ops in apply: wire them as C.
**C locus:** `engrave.c` `u_wipe_engr` (~264); `apply.c`
`display_polearm_positions` / `display_grapple_positions` /
`display_jump_positions`; `defsym.h` S_goodpos.
**Change:** real `u_wipe_engr` → `can_reach_floor`+`wipe_engr_at`.
Pole/grapple/jump hilite loops call existing `tmp_at(DISP_BEAM,
S_goodpos '$' HI_ZAP)`. Named: allmain/dokick/uhitm wipe callers;
getpos default Normal (paint on `$`). Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1320**; next @**#1325**).
**Verified:** green+strict PASS; apply/jump cohort **6**/6
(seed0361 Scr **366**/366; seed4500 **1814**/1814). Private
**7**/7. Path **unhit**.
**Next:** Must-fix cursed-lamp `make_glib` HGlib|EGlib (D-1023).
**Blocked:** none.

