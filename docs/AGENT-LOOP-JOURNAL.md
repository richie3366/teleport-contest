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

## 2026-08-17 03:20 — #1436 D-1129 teleds switch_terrain dest-typ

**Objective:** Open queue — `teleport.c` `teleds` `switch_terrain`
(named). Not fill_pit.
**C locus:** `teleport.c` `teleds` 548–552; `hack.c`
`switch_terrain` 3178–3217; `youprop.h` Levitation/Flying.
**Change:** port `switch_terrain` in `hack.js`. `teleds` awaits
it after vision+materialize when dest typ ≠ origin. Block:
You_cant then `B* |= FROMOUTSIDE` (no `float_down`). Unblock:
clear FROMOUTSIDE, `float_up` / `float_vs_flight` + start
flying. youprop H||E||steed-flyer && !B. Did not pull
`classify_terrain` or other callers. Filled no prior hash
gap. Rotated #1421. Open 9 after archive (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1435** **44**/44; next
@**#1440**).
**Verified:** private canary **46**/46; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0004 scroll + 0360/0367/0373/
4500/2200/1500/1800/0030/0009/0002/0116/0060/0102/0700/0017/
0007/0361/0108/0383/5002) + strict 0012/0360/4500/0004/2200/
0367/0373/0030/0009/0002. Path public-unhit on wall-teleport.
**Next:** Open `teleport.c` `teleds` `update_player_regions`.
Not teleok in_out_region.
**Blocked:** none.

## 2026-08-17 03:05 — #1435 review D-1125–D-1128 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `fountain.c` `dowatersnakes` 38–59 / `do_name.c`
`rndmonnam`; `fountain.c` `drinkfountain` 317–334 / `invent.c`
`update_inventory` 2782–2809; `eat.c` `vomit` 3736–3784 /
`mondata.c` `cantvomit` / `zap.c` `ubreatheu`/`zhitu` ZT_ACID;
`potion.c` `dodip` 2335–2361 / `steed.c` `rider_cant_reach` /
`fountain.c` `floating_above`/`wash_hands`.
**Change:** reviews **86–89** ACCEPT (D-1125 hallu ternary
display-rng only on hallu arm; D-1126 `update_inventory` tty
Off no-op not a stub; D-1127 vomit body + cantvomit/ubreatheu,
acid_damage bodies named; D-1128 pool yn `is_pool`/
`can_reach_floor(FALSE)`, `potion_dip`/`drink_ok_extra` named).
Must-fix empty. Filled D-1128 archive hash `5b3923d7`. Rotated
#1420. Open 10 (no refill). Rule #2: no fs.
**Score:** cadence **#1435** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1440**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `teleds` `switch_terrain`. Not
fill_pit.
**Blocked:** none.

## 2026-08-17 02:50 — #1434 D-1128 potion.c dodip pool yn

**Objective:** Open queue — `potion.c` pool dip yn (named from
dipsink). Not drinkfountain.
**C locus:** `potion.c` `dodip` 2335–2361; `fountain.c`
`wash_hands`/`floating_above`; `steed.c` `rider_cant_reach`;
`trap.c` `water_damage`; `engrave.c` `can_reach_floor(FALSE)`.
**Change:** pool yn with `waterbody_name`. `at_pool` via `is_pool`
not `IS_POOL`. Outer `can_reach_floor(FALSE)`. Inner Levitation
youprop `floating_above`; unskilled non-swimmer steed
`rider_cant_reach`; hands/uarmg `wash_hands`; else `water_damage`
+ POT_ACID `in_use`/`useup`. Did not pull `potion_dip`,
`drink_ok_extra`, or `pot_acid_damage` boom+delobj. Filled
D-1127 hash `b4954c6f`. Rotated #1419. Open 10 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1430** **44**/44; next
@**#1435**).
**Verified:** private canary **64**/64; green+strict seed8000/0900;
cohort **22**/22 (0014 fountain + 0002 drinksink + 0004/0103/0104
ride + 0009 swim + 0006/0007/0012/0030/0060/0102/0108/0116/
0360/0367/0398/0700/1500/1800/2200/4500) + strict 0014/0002/
0004/0103/0108/0360/2200/4500/0030/0009. Path public-unhit.
**Next:** Open `teleport.c` `teleds` `switch_terrain` (named).
Not fill_pit. Audit @**#1435**.
**Blocked:** none.

## 2026-08-17 02:35 — #1433 D-1127 eat.c vomit cantvomit/Sick/acid

**Objective:** Open queue — `eat.c` `vomit` cantvomit/Sick/acid
poly arms (named from drinkfountain). Not dryup.
**C locus:** `eat.c` `vomit` 3736–3784; `mondata.c` `cantvomit`
663–673; `zap.c` `ubreatheu` 3017–3021 / `zhitu` ZT_ACID
4528–4546; `pray.c` `altar_wrath`; `zap.c` `melt_ice`.
**Change:** remaining `vomit` body. cantvomit jaw-gape (mndx);
Sick SICK_VOMITABLE `make_sick(0)`; FAINTING dry-heave vs
spewed; AT_BREA AD_ACID `ubreatheu`→zhitu; altar_wrath;
acidic melt_ice. zhitu ZT_ACID resist+hliquid+d(nd,6)+rn2
gates (acid_damage/erode bodies named). Did not pull timeout
vomiting_dialog or pool dip. Filled D-1126 hash `6497347e`.
Rotated #1418. Open 11 after archive (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1430** **44**/44; next
@**#1435**).
**Verified:** private canary **27**/27; green+strict seed8000/0900;
cohort **22**/22 (0014 fountain + 0002 drinksink + 0012 vomit
+ 0004/0006/0007/0009/0016/0030/0060/0102/0103/0108/0116/
0360/0367/0398/0700/1500/1800/2200/4500) + strict 0014/0002/
0012/0108/0004/1800/0360/2200/4500/0030. Path public-unhit
except existing nomul.
**Next:** Open `potion.c` pool dip yn (named from dipsink).
Not drinkfountain. Audit @**#1435**.
**Blocked:** none.

## 2026-08-17 02:20 — #1432 D-1126 drinkfountain case 24 update_inventory

**Objective:** Open queue — `fountain.c` `drinkfountain` case 24
`update_inventory` (named). Not enlightenment.
**C locus:** `fountain.c` `drinkfountain` 317–334; `invent.c`
`update_inventory` 2781–2809; `display.c` `suppress_map_output`
714–718; `wintty.c` `tty_update_inventory` → `sync_perminvent`.
**Change:** `if (buc_changed) update_inventory()`. Callee:
`in_moveloop` / `suppress_map_output` / suppress_price=0 around
tty `sync_perminvent`. Default perm_invent Off returns before
`display_inventory` (no RNG). Did not pull On WIN_INVEN,
dipfountain 441/552, or vomit arms. Filled D-1125 hash
`2fc408c0`. Rotated #1417. Open 12 after archive+refill.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1430** **44**/44; next
@**#1435**).
**Verified:** private canary **31**/31; green+strict seed8000/0900;
cohort **22**/22 (0014 fountain + 0007 snakes + 0002 drinksink +
0006 demon + 0108 + 0360/2200/4500 + 0004/0009/0012/0030/0383/
0399/0116/0367/0398 + 1500/1800/0060) + strict 8000/0900/0014/
0007/0002/0006/0108/0360/2200/4500/0030. Path public-unhit.
**Next:** Open `eat.c` `vomit` cantvomit/Sick/acid poly arms.
Not dryup. Audit @**#1435**.
**Blocked:** none.

## 2026-08-17 02:10 — #1431 D-1125 dowatersnakes Hallucination rndmonnam

**Objective:** Open queue — `fountain.c` `dowatersnakes` Hallucination
`rndmonnam` (named). Not gush.
**C locus:** `fountain.c` `dowatersnakes` 44–46; `do_name.c`
`rndmonnam` 1388–1410; `objnam.c` `makeplural`; `youprop.h`
`Hallucination`.
**Change:** `!Blind` pline uses `Hallucination() ?
makeplural(rndmonnam(null)) : 'snakes'`. Display-rng only on
the hallu arm (C ternary). Did not pull case 24
`update_inventory`, vomit, gush, `hcolor`, or Blind youprop
in this helper. Filled D-1124 hash already on archive
(`3b7606b3`). Rotated #1416. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1430** **44**/44; next
@**#1435**).
**Verified:** private canary **65**/65; green+strict seed8000/0900;
cohort **21**/21 (0014 fountain + 0007 snakes + 0383/0399 hallu
+ 0002 drinksink + 0006 demon + 0108 + 0360/2200/4500/0004/
0009/0012/0373/1500/1800/0060/0030/0116/0367/0398) + strict
0014/0007/0002/0108/0360/2200/4500/0004/0009/0012/0030/0383/
0399/0006. Path public-unhit.
**Next:** Open `fountain.c` `drinkfountain` case 24
`update_inventory`. Not enlightenment. Audit @**#1435**.
**Blocked:** none.

## 2026-08-17 02:05 — #1430 review D-1121–D-1124 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `teleds` 523–528 / `trap.c` `fill_pit`
4010–4019 / `do.c` `flooreffects` 185–269; `teleport.c` `rloc`
1813–1841 / `control_mon_tele` 1898–1934 / `dungeon.c`
`In_W_tower` 1923–1937; `teleport.c` `rloc_to_core` 1675–1697 /
`worm.c` `remove_worm` 714–726 / `mon.c` `unstuck`; `fountain.c`
`drinksink` 696–698 / `region.c` `create_gas_cloud` 1213–1308.
**Change:** reviews **82** ACCEPT-WITH-DEBT D-1121 (call after
`u_on_newpos`; thin `fill_pit` still not `flooreffects("settle")`),
**83** ACCEPT D-1122 (Wizard stair `goodpos` then telecontrol then
50-try; steed/`mnexto` named), **84** ACCEPT D-1123 (`remove_worm`
+ tail + swallow `docrt` / grab `unstuck`; shk-home named), **85**
ACCEPT D-1124 (size-1 cloud `rn1(3,4)`; enveloped/`inside_f` named).
Must-fix empty. Filled D-1124 archive hash `3b7606b3`. Rotated
#1415. Open 9 (no refill). Rule #2: no fs.
**Score:** cadence **#1430** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1435**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `fountain.c` `dowatersnakes` Hallucination `rndmonnam`.
Not gush.
**Blocked:** none.

## 2026-08-17 01:50 — #1429 D-1124 drinksink case 13 create_gas_cloud

**Objective:** Open queue — `fountain.c` `drinksink` case 13
`create_gas_cloud` (named). Not polyself.
**C locus:** `fountain.c` `drinksink` 696–698; `region.c`
`create_gas_cloud` 1213–1308 / `make_gas_cloud` 1182–1204.
**Change:** after "Ew, what a stench!" call existing
`create_gas_cloud(u.ux, u.uy, 1, 4)`. Size-1 skips expand
shuffle; ttl `rn1(3,4)`. Did not pull enveloped pline /
`inside_f` damage / `m_poisongas_ok` / Hallucination `hcolor`.
Filled D-1123 hash `a55c4b24`. Rotated #1414. Open 9 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1425** **44**/44; next
@**#1430**).
**Verified:** private canary **29**/29; green+strict seed8000/0900;
cohort **20**/20 (0014 fountain + 0002 drinksink + 0108 +
0360/2200/4500/0004/0009/0012/0373/1500/1800/0060/0030/0116/
0007/0383/0367/0006/0398) + strict 0014/0002/0108/0360/2200/
4500/0004/0009/0012/0030. Path public-unhit.
**Next:** Open `fountain.c` `dowatersnakes` Hallucination
`rndmonnam`. Not gush. Audit @**#1430**.
**Blocked:** none.

## 2026-08-17 01:45 — #1428 D-1123 rloc_to worm / ustuck-swallow docrt

**Objective:** Open queue — `teleport.c` `rloc_to` worm /
ustuck-swallow `docrt` (named). Not newsym.
**C locus:** `teleport.c` `rloc_to_core` 1675–1697; `worm.c`
`remove_worm` 714–726; `dungeon.c` `u_on_newpos`;
`hack.c` `check_special_room`; `display.c` `docrt` swallow;
`mon.c` `unstuck`.
**Change:** `remove_worm` export; `rloc_to` async worm pickup +
`place_worm_tail_randomly`; swallow `u_on_newpos` subset +
`check_special_room`/`docrt`; grab `!m_next2u` `unstuck`
(dynamic import). Did not pull shk-home / `maybe_unhide_at` /
`set_apparxy`. Filled D-1122 hash `5a2f96ca`. Rotated #1413.
Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1425** **44**/44; next
@**#1430**).
**Verified:** private canary **27**/27; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0360/4500/0373/0367 + 2200/0014/
0004/0009/1500/1800/0060/0102/0700/0017/0030/0116/0383/0007/
0361/0108/0002/5002/2600) + strict 0012/0360/4500/0014/2200/
0004/0009/0367/0373/0030/0002/0116. Path public-unhit on live
worm rloc / swallow-teleport.
**Next:** Open `fountain.c` `drinksink` case 13 `create_gas_cloud`.
Not polyself.
**Blocked:** none.

## 2026-08-17 01:20 — #1427 D-1122 rloc Wizard stair / control_mon_tele

**Objective:** Open queue — `teleport.c` `rloc` Wizard stair /
`mon_telecontrol` (named). Not RLOC_MSG.
**C locus:** `teleport.c` `rloc` 1813–1841; `stairway_find_forwiz`
1786–1794; `control_mon_tele` 1898–1934; `dungeon.c` `In_W_tower`
1912–1938.
**Change:** on-map `iswiz` prefers stair/ladder via `goodpos`
(outside tower: up stair; in tower: down ladder, else up
ladder). Then wizard-mode `control_mon_tele` getpos. Default
Off. Did not pull steed→`tele()` / `mnexto` telecontrol /
RLOC_MSG. Filled D-1121 hash `803a7f5c`. Rotated #1412. Open 11
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1425** **44**/44; next
@**#1430**).
**Verified:** private canary **33**/33; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0360/4500/0373/0367 + 2200/0014/
0004/0009/1500/1800/0060/0102/0700/0017/0030/0116/0383/0007/
0361/0108/0002/5002/2600) + strict 0012/0360/4500/0014/2200/
0004/0009/0367/0373/0030/0002/0116. Path public-unhit on live
Wizard rloc.
**Next:** Open `teleport.c` `rloc_to` worm / ustuck-swallow
`docrt`. Not newsym.
**Blocked:** none.

## 2026-08-17 01:05 — #1426 D-1121 teleds fill_pit after u_on_newpos

**Objective:** Open queue — `teleport.c` `teleds` `fill_pit`
(named). Not Punished ball.
**C locus:** `teleport.c` `teleds` 523–528; `trap.c` `fill_pit`
4008–4019.
**Change:** after `u_on_newpos` subset, dynamic-import
`fill_pit(u.ux0,u.uy0)` (teleport→dig→trap cycle). Existing
thin helper: pit/hole+boulder extract+deltrap+delobj. C
`flooreffects("settle")` still named. Did not pull Punished
ball / swallow docrt / switch_terrain. Rotated #1411. Open 12
after archive+refill from teleport named omits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1425** **44**/44; next
@**#1430**).
**Verified:** private canary **22**/22; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0360/4500/0373/0367 + 2200/0014/
0004/0009/1500/1800/0060/0102/0700/0017/0030/0116/0383/0007/
0361/0108/0002/5002/2600) + strict 0012/0360/4500/0014/2200/
0004/0009/0367/0373/0030/0002/0116. Path public-unhit on
boulder+pit teleport.
**Next:** Open `teleport.c` `rloc` Wizard stair / `mon_telecontrol`.
Not RLOC_MSG.
**Blocked:** none.

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
