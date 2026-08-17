# Rotated from AGENT-LOOP-JOURNAL.md after #1462 D-1150 walk invocation_message

## 2026-08-17 05:40 — #1447 D-1138 minliquid lava on_fire / xkilled

**Objective:** Open queue — `fountain.c` `gush` lava
`fire_damage_chain` / `xkilled` (named). Not minliquid.
**C locus:** `mon.c` `minliquid_core` 1010–1067;
`trap.c` `fire_damage_chain` 4550–4572; `mondata.c` `on_fire`
1411–1445; `allmain.c` 210–216.
**Change:** lava `on_fire` fate pline; `mon_moving` → `mondead`
else `xkilled(XKILL_NOMSG)`; fire-resist −1 hp +
surrenders/burns-slightly; survivor `fire_damage_chain` then
`rloc(RLOC_MSG)`. Wrap `movemon` with `context.mon_moving` so
Gehennom mumak is `mondead` not hero `xkilled`. Did not pull
overcrowding / steed Fly-Lev / `engulfing_u`. Filled D-1137
archive hash `50136436`. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1445** **44**/44; next
@**#1450**).
**Verified:** private canary **42**/42; green+strict seed8000/0900;
cohort **24**/24 (0360 lava + 0014 gush + 4500/2200/0030/0004/
0009/0367/0116/0373/0060/0383/1500/1800/0102/0700/0017/0007/
0361/0002/0006/0108) + strict 8000/0900/0014/0360/4500/2200/
0004/0030.
**Next:** Open `teleport.c` `teleds` swallow `docrt`. Not hideunder.
**Blocked:** none.
