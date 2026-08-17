# Rotated from AGENT-LOOP-JOURNAL.md at port #1433

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
