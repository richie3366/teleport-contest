# Rotated from AGENT-LOOP-JOURNAL.md (#1458)

## 2026-08-17 08:14 — #1458 D-1147 rndcolor chest_trap gas

**Objective:** Open queue — `do_name.c` `rndcolor` (named from
hcolor). Not sit/apply identity stubs.
**C locus:** `do_name.c` `rndcolor` 1468–1477; `decl.c`
`c_obj_colors[]` 20–37; `trap.c` `blindgas[]` 81–83 /
`chest_trap` 6474–6476; `hack.h` `ROLL_FROM`; `color.h`
`CLR_MAX`/`NO_COLOR`.
**Change:** port `rndcolor` (always `rn2(CLR_MAX)` even Hallu;
Hallu → `hcolor(NULL)` display-rng; else `k==NO_COLOR`
`"colorless"` not table `"transparent"`). Wire chest_trap gas
`Blind ? ROLL_FROM(blindgas) : rndcolor()`. Did not pull
sit/apply/pray/detect/do/wield/read identity `hcolor` stubs.
Filled D-1146 archive hash `fe5cefad`. Rotated #1443. Open 11
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1455** **44**/44; next
@**#1460**).
**Verified:** private canary **215**/215; green+strict seed8000/0900;
cohort **19**/19 (0002 drinksink + 0014 fountain + 0383/0399 Hallu
+ 0006/0007/0106/0108/0360/2200/4500 + 0004/0009/0012/0030/0116/
0060/1500/1800) + strict 8000/0900/0002/0014/0383/0399/0006/0106/
0108/0360/2200/4500/0030/0060. seed0009 runner PASS (strict
length pre-existing D-0989). Path public-unhit on chest gas.
**Next:** Open `fountain.c` `gush` `deal_with_overcrowding`
(named). Not lava xkilled.
**Blocked:** none.
