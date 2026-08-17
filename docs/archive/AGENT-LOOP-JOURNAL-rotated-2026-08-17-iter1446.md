# Rotated from AGENT-LOOP-JOURNAL.md after #1446 D-1137 make_gas_cloud enveloped

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
