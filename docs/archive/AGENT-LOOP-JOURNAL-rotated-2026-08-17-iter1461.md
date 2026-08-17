# Rotated from AGENT-LOOP-JOURNAL.md after #1461 D-1149 mongone specials

## 2026-08-17 05:25 — #1446 D-1137 make_gas_cloud enveloped pline

**Objective:** Open queue — `region.c` `make_gas_cloud` enveloped
pline (named). Not create_gas_cloud size-1.
**C locus:** `region.c` `make_gas_cloud` 1182–1204 / 1197–1203;
`create_gas_cloud` 1229–1236; `zap.c` `zap_over_floor` 5186–5188.
**Change:** after `add_region`, `!in_mklev && !inside_cloud &&
is_hero_inside_gas_cloud` → You noxious/steam +
`PLNMSG_ENVELOPED_IN_GAS`. `set_heros_fault` when player-made.
`create_gas_cloud` async; await fountain/zap/trap/fumaroles.
Did not pull `m_poisongas_ok`, inside_f damage, fumaroles
`clear_heros_fault`/Norep. Filled no prior missing hash (D-1136
already `52aea3d1`). Rotated #1435. Open 11 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1445** **44**/44; next
@**#1450**).
**Verified:** private canary **35**/35; green+strict seed8000/0900;
cohort **24**/24 (0002 drinksink + 0014 fountain + 0016/2200 zap
+ 0373 + 0360/4500/0108 + 0006/0007/1500/1800/0060/0004/0009/
0012/0030/0383/0399/0116/0106/0102/0700/1150) + strict 8000/0900/
0002/0014/0016/2200/0373/0108/0360/4500/0006/0030. Path
public-unhit on fate 13 / zap envelop.
**Next:** Open `fountain.c` `gush` lava `fire_damage_chain` /
`xkilled`. Not minliquid.
**Blocked:** none.
