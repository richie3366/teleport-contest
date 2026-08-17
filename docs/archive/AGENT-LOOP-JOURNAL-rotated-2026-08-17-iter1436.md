# Rotated from AGENT-LOOP-JOURNAL.md at port #1436

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
