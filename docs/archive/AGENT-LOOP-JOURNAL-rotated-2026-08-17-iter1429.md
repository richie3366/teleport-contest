# Rotated from AGENT-LOOP-JOURNAL.md after #1429 D-1124 drinksink gas cloud

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
