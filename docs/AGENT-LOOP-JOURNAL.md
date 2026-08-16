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

## 2026-08-16 23:22 — #1418 D-1115 dipfountain case 29 mkgold coins

**Objective:** Open queue — `fountain.c` `dipfountain` case 29
`mkgold` coins (named). Not wash_hands.
**C locus:** `fountain.c` `dipfountain` 530–546; `mkobj.c`
`mkgold`; `dungeon.c` `dunlev` / `dunlevs_in_dungeon`;
`youprop.h` Blind.
**Change:** port You-see-coins. Unlooted: `SET_FOUNTAIN_LOOTED`,
`mkgold(rnd((num_dunlevs-dlevel+1)*2)+5)` merge/create,
Blind-skip glistening, `exercise(A_WIS,TRUE)`, `newsym`.
Looted skip before `mkgold`. `dryup` still after switch.
Did not pull enlightenment / gush `minliquid` / `update_inventory`.
Filled D-1114 hash `e30a51f2`. Rotated #1403. Open 8 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1415** **44**/44; next
@**#1420**).
**Verified:** private canary **57**/57; green+strict seed8000/0900;
cohort **17**/17 (0014/1500/1800/0060/0102/0700/0017/0106/0105/
0016/4500/0360/2200/0009/0367/0004/0030) + strict 0014/0360/
4500/2200/0004/0030/0009/0367. Path public-unhit.
**Next:** Open `fountain.c` `drinkfountain` enlightenment body.
Not dryup.
**Blocked:** none.

## 2026-08-16 23:12 — #1417 D-1114 dipfountain cases 17–20 uncurse

**Objective:** Open queue — `fountain.c` `dipfountain` cases 17–20
uncurse (named). Not Excalibur.
**C locus:** `fountain.c` `dipfountain` 464–475; `mkobj.c`
`uncurse`; `youprop.h` Blind.
**Change:** port uncurse fallthrough — cursed non-hands glow
(unless Blind) + `uncurse`; else loss pline. Coins not skipped.
Luck/lamplit stay on mkobj `uncurse`. Case 29 still named.
Filled D-1113 hash `c67f09d1`. Rotated #1402. Open 9 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1415** **44**/44; next
@**#1420**).
**Verified:** private canary **45**/45; green+strict seed8000/0900;
cohort **17**/17 (0014/1500/1800/0060/0102/0700/0017/0106/0105/
0016/4500/0360/2200/0009/0367/0004/0030) + strict 0014/0360/
4500/2200/0004/0030/0009/0367. Path public-unhit.
**Next:** Open `fountain.c` `dipfountain` case 29 `mkgold`.
Not wash_hands.
**Blocked:** none.

## 2026-08-16 23:05 — #1416 D-1113 dipsink + dodip sink yn

**Objective:** Open queue — `fountain.c` `dipsink` (named). Not
wash_hands.
**C locus:** `fountain.c` `dipsink` 716–801; `do.c`
`polymorph_sink` 404–455; `potion.c` `dodip` 2325–2334.
**Change:** port `dipsink` (lottery `breaksink`, hands/uarmg
`wash_hands`, non-potion tap+`water_damage`, potion pour+switch);
local `polymorph_sink` `rn2(4)`; wire dodip sink yn. Pool dip /
uncurse 17–20 still named. Filled no prior hash gap. Rotated
#1401. Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1415** **44**/44; next
@**#1420**).
**Verified:** private canary **60**/60; green+strict seed8000/0900;
cohort **17**/17 (0014/1500/1800/0060/0102/0700/0017/0106/0105/
0016/4500/0360/2200/0009/0367/0004/0030) + strict 0014/0360/
4500/2200/0004/0030/0009/0367. Path public-unhit.
**Next:** Open `fountain.c` `dipfountain` cases 17–20 uncurse.
Not Excalibur.
**Blocked:** none.

## 2026-08-16 22:48 — #1415 review D-1109–D-1112 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `sp_lev.c` `lspo_exclusion` 5498–5531 /
`dungeon.c` `free_exclusions` / `sp_lev.c` `flip_level` 876–896;
`teleport.c` `goodpos` 168–169 / `monmove.c` `onscary` 241–303;
`teleport.c` `teleok` 420–445; `teleport.c` `mlevel_tele_trap`
2033–2095.
**Change:** reviews **70** ACCEPT D-1109 (opcode + wired soko/vault;
soko2-2 named), **71** ACCEPT D-1110 (live `onscary` clone; mfndpos
`mon.js` named), **72** ACCEPT D-1111 (VS/pit-fly trapok; `tele_jump_ok`
named), **73** ACCEPT D-1112 (portal/levelport/no-trap; hole dest
named). Must-fix empty. Filled D-1112 archive hash `bb552fba`.
Rotated #1400. Open 11 (no refill). Rule #2: no fs.
**Score:** cadence **#1415** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1420**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `fountain.c` `dipsink`. Not wash_hands.
**Blocked:** none.

## 2026-08-16 22:35 — #1414 D-1112 mlevel_tele_trap MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP

**Objective:** Open queue — `teleport.c` `mlevel_tele_trap`
MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP (named). Not hole path.
**C locus:** `teleport.c` `mlevel_tele_trap` 2033–2095;
`makemon.c` `is_home_elemental`; `wizard.c` `mon_has_amulet`;
`monmove.c` `onscary(0,0)`; `dungeon.c` `get_level`.
**Change:** MAGIC_PORTAL stay (amulet || home-elemental ||
`rn2(7)`); LEVEL_TELEP `random_teleport_level`/`get_level`;
NO_TRAP `onscary(0,0)` stay else same-level migrate; in_sight
plines + local `seetrap`; xport mconf iff `!control_teleport`.
Hole dest unchanged. Filled D-1111 hash `b0847b88`. Rotated
#1399. Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1410** **44**/44; next
@**#1415**).
**Verified:** private canary **53**/53; green+strict seed8000/0900;
cohort **36**/36 (0360/0030/4500/0373/0367/0014 + 30 more) +
strict 0360/0014/4500/2200/0367/0009/0004/0030. Path
public-unhit.
**Next:** Open `fountain.c` `dipsink`. Not wash_hands. Audit
@**#1415**.
**Blocked:** none.

## 2026-08-16 22:22 — #1413 D-1111 teleok vibrating / pit-fly

**Objective:** Open queue — `teleport.c` `teleok` vibrating /
pit-fly (named). Not `rloc`.
**C locus:** `teleport.c` `teleok` 422–433; `trap.h`
`is_pit`/`is_hole`/`VIBRATING_SQUARE`; `youprop.h`
Levitation/Flying.
**Change:** local trapok by-value: no trap / VS always ok;
pit/hole iff Levitation||Flying (existing youprop clones +
steed flyer; sticky `u.Levitation`/`u.Flying` ignored). Then
`goodpos(&youmonst, 0)`. `tele_jump_ok`/`in_out_region` still
named. Filled D-1110 hash `fd738eab`. Rotated #1398. Open 12
after archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1410** **44**/44; next
@**#1415**).
**Verified:** private canary **56**/56; green+strict seed8000/0900;
cohort **41**/41 (CURRENT list + 4500/0014) + strict 0014/4500/
0360/2200/0367/0009/0004. Path public-unhit.
**Next:** Open `teleport.c` `mlevel_tele_trap` MAGIC_PORTAL /
LEVEL_TELEP / NO_TRAP. Not hole path.
**Blocked:** none.

## 2026-08-16 22:10 — #1412 D-1110 goodpos live-mon onscary when m_id != 0

**Objective:** Open queue — `teleport.c` `goodpos` live-mon
`onscary` when `m_id != 0` (named). Not `goodpos_onscary`.
**C locus:** `teleport.c` `goodpos` 168–169; `monmove.c`
`onscary` 241–303; `engrave.c` `sengr_at`; `monst.h`
`is_lminion`; `shk.c` `inhishop`; `priest.c` `inhistemple`.
**Change:** `m_id ? onscary : goodpos_onscary`. Local `onscary`
(mon.js cycle): vampshifter altar; Elbereth needs hero/image/
`guardobjects`; `iswiz`/`is_lminion`/`PM_ANGEL`/rider;
shop/temple resist. Fakemon still D-1102 helper. mfndpos
`mon.js` partial named. Filled D-1109 hash `5bf81ca7`.
Rotated #1397. Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1410** **44**/44; next
@**#1415**).
**Verified:** private canary **61**/61; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Path public-unhit.
**Next:** Open `teleport.c` `teleok` vibrating / pit-fly. Not
`rloc`.
**Blocked:** none.

## 2026-08-16 21:55 — #1411 D-1109 lspo_exclusion populate exclusion_zones

**Objective:** Open queue — `sp_lev.c` `lspo_exclusion` populate
`exclusion_zones` from `des.exclusion` (named). Not `goodpos`.
**C locus:** `sp_lev.c` `lspo_exclusion` 5496–5531;
`dungeon.c` `free_exclusions`; `sp_lev.c` `flip_level` 876–896.
**Change:** port `lspo_exclusion` (type map; `get_location`
ANY_LOC|NO_LOC_WARN; prepend). `free_exclusions` on
`clear_level_structures`. `flip_level` remaps rectangles.
Wire loaded soko `des.exclusion` MONGEN + vault TELE helper.
soko2-2 / hellfill prefab / save/rest still named. Rotated
#1396. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1410** **44**/44; next
@**#1415**).
**Verified:** private canary **25**/25; green+strict seed8000/0900;
cohort **16**/16 (0360 soko + 0373/4500/2200/0030/…) + strict
0360/0373/4500/2200. Path public-unhit.
**Next:** Open `teleport.c` `goodpos` live-mon `onscary` when
`m_id != 0`. Not `goodpos_onscary`.
**Blocked:** none.

## 2026-08-16 21:45 — #1410 review D-1105–D-1108 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `fountain.c` `watchman_warn_fountain` 183–193 /
`mondata.c` `pronoun_gender`; `fountain.c` `dryup` 223–227 /
`display.c` `glyph_at`; `fountain.c` `dipfountain` 404–447 /
`artifact.c` `artiname`/`exist_artifact`; `fountain.c`
`wash_hands` 557–577 / `objnam.c` `gloves_simple_name`.
**Change:** reviews **66** ACCEPT D-1105 (shake/wave real
`mbodypart`/`mhis`), **67** ACCEPT-WITH-DEBT D-1106 (`S_cloud`
skip via `visible_region_at` analog; unseen `m_at` named),
**68** ACCEPT D-1107 (Lady of the Lake; `exist_artifact`/`oname`
real, not dryup stub), **69** ACCEPT D-1108 (`wash_hands` real
`make_glib`/`water_damage`; trap.js gloves stub unused).
Must-fix empty. Filled D-1108 archive hash `62b93acb`. Rotated
#1395. Open 10 (no refill). Rule #2: no fs.
**Score:** cadence **#1410** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.26/turn` (R² 0.87). Next
@**#1415**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `sp_lev.c` `lspo_exclusion` populate
`exclusion_zones` from `des.exclusion`. Not `goodpos`.
**Blocked:** none.

## 2026-08-16 21:30 — #1409 D-1108 wash_hands + dipfountain hands/uarmg

**Objective:** Open queue — `fountain.c` `wash_hands` (named).
Not Excalibur.
**C locus:** `fountain.c` `wash_hands` 557–577; `dipfountain`
448–449; `youprop.h` Glib; `potion.c` `make_glib`; `do_wear.c`
`fingers_or_gloves`; `objnam.c` `gloves_simple_name`.
**Change:** port `wash_hands` and wire hands/`uarmg`. You-wash
pline; Glib `make_glib(0)` + slippery; `water_damage(uarmg)`;
was_glib+ER_NOTHING→ER_GREASED so dipfountain `!rn2(2)` skip
can fire. Dynamic import `make_glib` (potion cycle). Did not
pull `dipsink`, pool dip, uncurse 17–20, or case 29 `mkgold`.
Filled D-1107 hash `0633a261`. Rotated #1394. Open 10 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1405** **44**/44; next
@**#1410**).
**Verified:** private canary **33**/33; green+strict seed8000/0900;
cohort **19**/19 (0014 fountain + wizard/role + knight 0103/0104/
4500) + strict 0014/0006/2200/0360/4500/0103. Public traces
**unhit**.
**Next:** Open `sp_lev.c` `lspo_exclusion` populate
`exclusion_zones` from `des.exclusion`. Not `goodpos`.
**Blocked:** none.

## 2026-08-16 21:20 — #1408 D-1107 dipfountain Excalibur LONG_SWORD

**Objective:** Open queue — `fountain.c` `dipfountain` Excalibur
LONG_SWORD body (named). Not wash_hands.
**C locus:** `fountain.c` `dipfountain` 404–447; `artifact.c`
`exist_artifact`/`artiname`/`discover_artifact`; `do_name.c`
`oname` `ONAME_VIA_DIP|ONAME_KNOW_ARTI`.
**Change:** port Lady of the Lake gift/deny. Gate `&&` order
matches C. Lawful `oname`+`discover_artifact`+`bless`; unaligned
curse+`spe--`; then ROOM/`flags=0`/`newsym`/town `angry_guards`,
not `dryup`. Thin `artiname`/`discover_artifact`. Did not pull
`wash_hands`, uncurse 17–20, or case 29 `mkgold`. Filled D-1106
hash `127c045c`. Rotated #1393. Open 11 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1405** **44**/44; next
@**#1410**).
**Verified:** private canary **49**/49; green+strict seed8000/0900;
cohort **17**/17 (0014 fountain + wizard/role + knight 0103/0104/
4500) + strict 0014/0006/2200/0360/4500/0103 + isolated 0009.
Public traces **unhit**.
**Next:** Open `fountain.c` `wash_hands`. Not Excalibur.
**Blocked:** none.

## 2026-08-16 21:05 — #1407 D-1106 dryup cansee cloud-glyph skip

**Objective:** Open queue — `fountain.c` `dryup` cansee
cloud-glyph skip of dryup pline (named). Not angry_guards.
**C locus:** `fountain.c` `dryup` 223–227; `display.c`
`glyph_at`/`show_region`; `display.h` `glyph_is_cmap`;
`glyphs.c` `glyph_to_cmap`; `defsym.h` `S_cloud`.
**Change:** skip `"The fountain dries up!"` when `cansee` and
gbuf cmap analog is `S_cloud` (fog/steam region). Poison
`S_poisoncloud`, shown `m_at`, and remembered I still pline.
Did not pull Excalibur, `wash_hands`, `dipsink`, or newsym
`show_region`. Filled D-1105 hash `b4930cb9`. Rotated #1392.
Open 12 after archive + refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1405** **44**/44; next
@**#1410**).
**Verified:** private canary **33**/33; green+strict seed8000/0900;
cohort **15**/15 (0014 fountain + 0006/2200/0108/0360/5002 wizard
+ 1500/1800/0060/0102/0700/0017/4500/0009/0106) + strict
0014/0006/2200/0360/4500 + isolated 0009. Public traces **unhit**.
**Next:** Open `fountain.c` `dipfountain` Excalibur LONG_SWORD
body. Not wash_hands.
**Blocked:** none.

## 2026-08-16 20:50 — #1406 D-1105 watchman_warn_fountain Deaf shake/wave

**Objective:** Open queue — `fountain.c` `watchman_warn_fountain`
Deaf shake/wave (named). Not dryup yn.
**C locus:** `fountain.c` `watchman_warn_fountain` 183–193;
`youprop.h` Deaf; `mondata.h` `nolimbs`; `you.h` `mhis` /
`pronoun_gender`; `polyself.c` `mbodypart` HEAD/ARM.
**Change:** Deaf else-arm: `nolimbs` shakes HEAD else waves
`makeplural(ARM)` + `mhis`. Local `mhe`/`mhis` follow
`pronoun_gender` (hallu `rn2(4)`). `!Deaf` yell unchanged.
Did not pull cloud-glyph skip, Excalibur, or `wash_hands`.
Rotated #1391. Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1405** **44**/44; next
@**#1410**).
**Verified:** private canary **34**/34; green+strict seed8000/0900;
cohort **15**/15 (0014 fountain + 0006/2200/0108/0360/5002 wizard
+ 1500/1800/0060/0102/0700/0017/4500/0009/0106) + strict
0014/0006/2200/0360/4500 + isolated 0009. Public traces **unhit**.
**Next:** Open `fountain.c` `dryup` cansee cloud-glyph skip.
Not angry_guards.
**Blocked:** none.

## 2026-08-16 20:33 — #1405 review D-1101–D-1104 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `goodpos` 180–182 / `mkmaze.c`
`is_exclusion_zone` 317–331; `teleport.c` `goodpos_onscary`
49–76 / `engrave.c` `sengr_at`; `dbridge.c` `db_under_typ`
116–128 / `rm.h` SURFACE_AT / `pager.c` waterbody_name;
`fountain.c` `dryup` 236–237 / `mon.c` `angry_guards`.
**Change:** reviews **62** ACCEPT D-1101 (`is_exclusion_zone`
real clone), **63** ACCEPT-WITH-DEBT D-1102 (fakemon helper
real; live-mon `onscary` still named Open), **64** ACCEPT
D-1103 (`db_under_typ`/`SURFACE_AT` real), **65** ACCEPT
D-1104 (`angry_guards` imported D-0941). Must-fix empty.
Filled D-1104 archive hash `7458a5b8`. Rotated #1390. Open 9
(no refill). Rule #2: no fs.
**Score:** cadence **#1405** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.26/turn` (R² 0.86). Next
@**#1410**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `fountain.c` `watchman_warn_fountain` Deaf
shake/wave. Not dryup yn.
**Blocked:** none.

## 2026-08-16 20:24 — #1404 D-1104 dryup angry_guards after real dryup

**Objective:** Open queue — `fountain.c` `dryup` `angry_guards`
after real dryup (named). Not wizard yn.
**C locus:** `fountain.c` `dryup` 236–237 after ROOM/`newsym`;
`mon.c` `angry_guards` (already D-0941).
**Change:** `isyou && in_town` → `angry_guards(false)` after the
real dry. Town-warn return and wizard `'n'` still skip it.
Did not pull Deaf shake/wave, cloud-glyph skip, or Excalibur
`angry_guards`. Filled D-1103 hash `130e7e21`. Rotated #1389.
Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1400** **44**/44; next
@**#1405**).
**Verified:** private canary **37**/37; green+strict seed8000/0900;
cohort **15**/15 (0014 fountain + 0006/2200/0108/0360/5002 wizard
+ 1500/1800/0060/0102/0700/0017/4500/0009/0106) + strict
0014/0006/2200/0360/4500/0009. Public traces **unhit**.
**Next:** Open `fountain.c` `watchman_warn_fountain` Deaf
shake/wave. Not dryup yn. Audit @**#1405**.
**Blocked:** none.

