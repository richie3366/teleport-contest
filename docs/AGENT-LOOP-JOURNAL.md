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

## 2026-08-17 00:55 — #1425 review D-1117–D-1120 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `fountain.c` `gush` 157–160 / `mon.c` `minliquid`
947–1109; `fountain.c` `drinksink` 680–686 / `polyself.c`
469–496; `teleport.c` `teleok` 440–443 / `tele_jump_ok`
386–417 / `region.c` `in_out_region` 480–527; `teleport.c`
`tele_trap` 1492–1535 / `trap.c` `trapeffect_telep_trap`
2075–2078.
**Change:** reviews **78** ACCEPT D-1117 (occupied gush →
`minliquid`; iron `d(2,6)`; drown `mondied`/`xkilled`; lava
named), **79** ACCEPT D-1118 (`polyself(POLY_NOFLAGS)` real
callee; Unchanging uprops), **80** ACCEPT D-1119 (`tele_jump_ok`
+ `in_out_region`; gas NO_CALLBACK; walk/`update_player_regions`
named), **81** ACCEPT D-1120 (wrenching `shieldeff`+You_feel;
once deltrap after `next_to_u`; teledest/`tele()` named).
Must-fix empty. Filled D-1120 archive hash `acfb0167`. Rotated
#1410. Open 8 (no refill). Rule #2: no fs.
**Score:** cadence **#1425** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1430**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `teleds` `fill_pit`. Not Punished
ball.
**Blocked:** none.

## 2026-08-17 00:50 — #1424 D-1120 tele_trap Antimagic wrenching pline

**Objective:** Open queue — `teleport.c` `tele_trap` Antimagic
wrenching pline (named). Not vault_tele.
**C locus:** `teleport.c` `tele_trap` 1492–1535; `youprop.h`
Antimagic; `display.c` `shieldeff`; `trap.c`
`trapeffect_telep_trap`.
**Change:** export `tele_trap(trap)`. In_endgame/Antimagic/
noteleport You_feel wrenching; Antimagic `shieldeff` first.
Local Antimagic() includes uprops (cloak confer). Recursion
guard. once: `next_to_u` then deltrap+`vault_tele`. trapeffect
seetrap then `tele_trap` (no deltrap-before-AM). Did not pull
teledest/`tele()` or `teleds` `fill_pit`. Filled D-1119 hash
`26560ccf`. Rotated #1409. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1420** **44**/44; next
@**#1425**).
**Verified:** private canary **34**/34; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0360/4500/0373/0367 + 2200/0014/
0004/0009/1500/1800/0060/0102/0700/0017/0030/0116/0383/0007/
0361/0108/0002/5002/2600) + strict 0012/0360/4500/0014/2200/
0004/0009/0367/0373/0030/0002/0116. Path public-unhit on AM
TELEP.
**Next:** Open `teleport.c` `teleds` `fill_pit`. Not Punished
ball.
**Blocked:** none.

## 2026-08-17 00:40 — #1423 D-1119 teleok tele_jump_ok / in_out_region

**Objective:** Open queue — `teleport.c` `teleok` `tele_jump_ok`
/ `in_out_region` (named). Not vibrating.
**C locus:** `teleport.c` `teleok` 440–443 / `tele_jump_ok`
386–417; `region.c` `in_out_region` 480–527.
**Change:** `teleok` after `goodpos` runs `tele_jump_ok(u.ux,
u.uy,x,y)` then `in_out_region`. Port `in_out_region` three
loops (can_enter/leave; leave bit; enter bit). Gas stays
NO_CALLBACK so never rejects. `make_gas_cloud` inits those
fields + `add_region` hero_inside. Did not pull enter_msg
pline, force fields, `update_player_regions`, or
hack.c/dothrow callers. Filled D-1118 hash `8a01c200`.
Rotated #1408. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1420** **44**/44; next
@**#1425**).
**Verified:** private canary **35**/35; green+strict seed8000/0900;
cohort **24**/24 (0360/4500/0373/0367 + 2200/0014/0004/0009/
1500/1800/0060/0102/0700/0017/0030/0116/0383/0007/0361/0108/
0002/0012/5002/2600) + strict 0360/4500/0014/2200/0004/0009/
0367/0373/0030/0012/0002/0116. Path public-unhit on restricted
dests.
**Next:** Open `teleport.c` `tele_trap` Antimagic wrenching
pline. Not vault_tele.
**Blocked:** none.

## 2026-08-17 00:20 — #1422 D-1118 drinksink case 10 polyself

**Objective:** Open queue — `fountain.c` `drinksink` case 10
`polyself` (named). Not dipsink.
**C locus:** `fountain.c` `drinksink` 680–686; `polyself.c`
`polyself` 469–496; `youprop.h` Unchanging.
**Change:** `!Unchanging` metamorphosis + `await
polyself(POLY_NOFLAGS)`. Unchanging skips You+call. Local
Unchanging helper: H||E flats + `uprops[UNCHANGING]` (confer
does not mirror `EUnchanging`). Did not pull case 13
`create_gas_cloud`. Filled D-1117 hash `afb86487`. Rotated
#1407. Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1420** **44**/44; next
@**#1425**).
**Verified:** private canary **39**/39; green+strict seed8000/0900;
cohort **21**/21 (0014 fountain + 0002 drinksink + 0108
`#polyself` + 0360/2200/4500/1500/1800/0060/0102/0700/0017/
0004/0030/0009/0367/0116/0373/0383/0007/0361) + strict 0014/
0002/0108/0360/4500/2200/0004/0030/0009/0367/0116/0373/0060/
0383. Path public-unhit.
**Next:** Open `teleport.c` `teleok` `tele_jump_ok` /
`in_out_region`. Not vibrating.
**Blocked:** none.

## 2026-08-17 00:05 — #1421 D-1117 gush minliquid when m_at

**Objective:** Open queue — `fountain.c` `gush` `minliquid` body
(named). Not dogushforth.
**C locus:** `fountain.c` `gush` 157–160; `mon.c` `minliquid` /
`minliquid_core` 947–1121 (iron 993–1008, drown 1068–1109).
**Change:** occupied gush cells `await minliquid` else `newsym`.
Iron golem `!rn2(5)` `d(2,6)` + `mondied`. Drown pline;
`mon_moving` → `mondied` else `xkilled(XKILL_NOMSG)`; survivor
`water_damage_chain` + `rloc(RLOC_NOMSG)`. `sad_feeling` wrapper.
`await rloc(RLOC_MSG)` teleport-away. Did not pull `set_levltyp`,
steed Fly/Lev, lava `xkilled`/`fire_damage_chain`, overcrowding,
`engulfing_u`. Stamped review **77** item 4. Rotated #1406. Open
11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1420** **44**/44; next
@**#1425**).
**Verified:** private canary **19**/19; green+strict seed8000/0900;
cohort **19**/19 (0014 fountain + 0360 minliquid lava +
1500/1800/0060/0102/0700/0017/4500/2200/0004/0030/0009/0367/
0116/0373/0383/0007/0361) + strict 0014/0360/4500/2200/0004/
0030/0009/0367/0116/0373/0060/0383. Path public-unhit.
**Next:** Open `fountain.c` `drinksink` case 10 `polyself`. Not
dipsink.
**Blocked:** none.

## 2026-08-16 23:50 — #1420 review D-1113–D-1116 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `fountain.c` `dipsink` 716–801 / `do.c`
`polymorph_sink` 404–455 / `potion.c` dodip 2325–2334;
`fountain.c` `dipfountain` 464–475; `fountain.c` 530–546 /
`mkobj.c` `mkgold`; `fountain.c` `drinkfountain` 287–293 /
`insight.c` `enlightenment` 383–449 / `doattributes` 2009–2018.
**Change:** reviews **74** ACCEPT D-1113 (`dipsink` + yn; poly
clone; pool/`drink_ok_extra` named), **75** ACCEPT D-1114
(uncurse 17–20; luck/lamplit named), **76** ACCEPT D-1115
(`mkgold` formula; `update_inventory` named), **77** ACCEPT
D-1116 (MAGIC-only gates; overlay elapsed `"none"` named).
Must-fix empty. Filled D-1116 archive hash `19e4be31`.
Rotated #1405. Open 12 (no refill). Rule #2: no fs.
**Score:** cadence **#1420** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1425**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `fountain.c` `gush` `minliquid` body. Not
dogushforth.
**Blocked:** none.

## 2026-08-16 23:36 — #1419 D-1116 drinkfountain MAGIC enlightenment

**Objective:** Open queue — `fountain.c` `drinkfountain`
enlightenment body (named). Not dryup.
**C locus:** `fountain.c` `drinkfountain` 287–293; `insight.c`
`enlightenment` 383–449 / `doattributes` 2009–2018.
**Change:** case 19 calls `enlightenment(MAGICENLIGHTENMENT, 0)`.
`doattributes(enl_mode)` skips Background/Basics/Characteristics
when MAGIC-only; Status+Attributes+elapsed stay; bones/debug
still BASIC-gated. ^X no-arg path unchanged. Did not pull gush
`minliquid` / potion/zap callers / `update_inventory`. Filled
D-1115 hash `79438232`. Rotated #1404. Open 12 after refill.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1415** **44**/44; next
@**#1420**).
**Verified:** private canary **54**/54; green+strict seed8000/0900;
cohort **22**/22 (0014/1500/1800/0060/0102/0700/0017/0106/0105/
0016/4500/0360/2200/0009/0367/0004/0030/0116/0373/0361/0007/
0383) + strict 0014/0360/4500/2200/0004/0030/0009/0367/0116/
0373/0060/0383. Path public-unhit.
**Next:** Open `fountain.c` `gush` `minliquid` body. Not
dogushforth. Audit @**#1420**.
**Blocked:** none.

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

