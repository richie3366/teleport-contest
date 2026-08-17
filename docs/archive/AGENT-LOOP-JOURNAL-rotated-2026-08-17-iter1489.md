# Rotated from AGENT-LOOP-JOURNAL.md after #1489 D-1172 rloc steed tele()

## 2026-08-17 14:25 — #1474 D-1160 rloc_to set_apparxy dest

**Objective:** Open — `teleport.c` `rloc_to` `set_apparxy`
(named). Not vanish-msg.
**C locus:** `teleport.c` `rloc_to_core` 1702; `monmove.c`
`set_apparxy` 2198–2266; `steed.c` `place_monster` 898–932.
**Change:** drop mux=hero stand-in (`place_monster` writes mx/my
only). After dest `maybe_unhide_at`/`newsym`, call `set_apparxy`
(dynamic import; monmove↔teleport cycle). Did not pull
vanish-msg / `update_monster_region` / shk-home / shop bill /
trapped `mintrap`. Filled D-1159 archive hash `e42ace32`.
Rotated #1459. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1470** **44**/44; next
@**#1475**).
**Verified:** private canary **33**/33 (null; same-cell; already-
know; mux0; pet; ustuck; Invis skip vs `rn2(3)`; Displacement
skip vs `rn2(4)`; displacer; xorn+gold; oldx0; Underwater);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002. Path public-unhit on Invis/Displaced rloc
with stale mux.
**Next:** Open `teleport.c` `rloc_to` `update_monster_region`
(named). Not set_apparxy. Audit @**#1475**.
**Blocked:** none.
