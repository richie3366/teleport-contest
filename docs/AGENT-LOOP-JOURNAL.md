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

## 2026-08-16 00:45 — #1321 D-1050 pickup_object telekinesis

**Objective:** Must-fix D-1022 risk 6 — `pickup_object` honors
`telekinesis` like C (whip/grapple pull-in).
**C locus:** `pickup.c` `pickup_object` (~1803) / `lift_object`
(~1705) / `carry_count` (~1569) / `fatal_corpse_mistake` /
`rider_corpse_revival`.
**Change:** stop `void telekinesis`. Whip TRUE: silent encumbrance
refuse, remote corpse skip petrify, scare `raise`. Grapple FALSE:
`ynq` Continue?. Floor `carry_count`; `max_capacity` in invent.
Named: Sokoban boulder / LOADSTONE override / container `delta_cwt`
/ ghostly. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1320**; next @**#1325**).
**Verified:** green+strict PASS; apply/pickup cohort **10**/10
(seed0361 Scr **366**/366). Private: light TRUE lifts; heavy TRUE
refuses; cockatrice TRUE no petrify. Path **unhit**.
**Next:** Must-fix `u_wipe_engr` / `tmp_at` (D-1022 risk 7).
**Blocked:** none.

## 2026-08-16 00:12 — #1320 review D-1048/D-1049 + cadence score

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`e395bb74` D-1048, `9e24f61a` D-1049)
against pinned C, not the journal; cadence full `sessions`.
**C locus:** `sit.c` `special_throne_effect` case 10 /
`read.c` `seffect_remove_curse` / `youprop.h` Confusion ≡ HConfusion;
`sit.c` `take_gold` / `steal.c` `remove_worn_item` W_WEAPONS `*gone`.
**Change:** reviews 09 ACCEPT (HConfusion save/set/restore; callee
reads HConfusion only; sibling OR-flat named) and 10 ACCEPT
(unwear then delobj; sit clone’s live path is real `uqwepgone`).
No new Must-fix. Filled Addressed hash `9e24f61a`. No `js/` edits.
Rule #2: no fs.
**Score:** cadence **#1320** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.26/turn` (R² 0.871). Next @**#1325**.
**Verified:** C read of `sit.c:14–33` / `310–323`, `steal.c:213–290`,
`wield.c:873–902`, `read.c:1489–1605` / `2225–2227`, `youprop.h:83–84`;
JS hunks grepped FORCE/fs/seed.
**Next:** Must-fix `pickup_object` telekinesis (D-1022 risk 6).
**Blocked:** none.

## 2026-08-16 00:05 — #1319 D-1049 take_gold remove_worn_item

**Objective:** Must-fix D-1034 risk 3 — `take_gold` must
`remove_worn_item` like C `sit.c`.
**C locus:** `sit.c` `take_gold` (~14); `steal.c` `remove_worn_item`
(~213) W_WEAPONS → `uwepgone`/`uswapwepgone`/`uqwepgone`.
**Change:** `remove_worn_item(otmp, false)` then splice+`delobj`.
Helper: `!owornmask` return + W_WEAPONS `*gone`. sit cannot import
`steal.js` (hack→eat cycle). Armor `*_off`/`unpunish`/`setnotworn`
named. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1315**; next @**#1320**).
**Verified:** green+strict PASS; sit cohort **4**/4 (seed0106 Scr
**267**/267; seed0107 **98**/98; seed0108 **303**/303; seed4500
**1814**/1814). Private node **20**/20 (quiver/wield/swap clear;
sword uwep kept). Path **unhit**.
**Next:** Must-fix `pickup_object` telekinesis (D-1022 risk 6).
**Blocked:** none.

## 2026-08-15 23:54 — #1318 D-1048 Vlad case 10 HConfusion only

**Objective:** Must-fix D-1033 risk 2 — Vlad special case 10 sets
`HConfusion` only; JS must not also force flat `u.Confusion`.
**C locus:** `sit.c` `special_throne_effect` case 10 (~310);
`read.c` `seffect_remove_curse` `Confusion != 0` (~1495);
`youprop.h` `#define Confusion HConfusion`.
**Change:** save/set/restore `HConfusion` only. `seffect_remove_curse`
reads `!!(u.HConfusion|0)` (not flat/`EConfusion`). Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1315**; next @**#1320**).
**Verified:** green+strict PASS; sit cohort **3**/3 (seed0106 Scr
**267**/267; seed0107 **98**/98; seed4500 **1814**/1814) + seed0108
**303**/303. Private node **12**/12 (no flat write; restore;
leftover flat/EConfusion unconfused). Path **unhit**.
**Next:** Must-fix `take_gold` `remove_worn_item` (D-1034 risk 3).
**Blocked:** none.
