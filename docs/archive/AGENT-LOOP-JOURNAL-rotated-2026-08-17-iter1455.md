# Rotated from AGENT-LOOP-JOURNAL.md after #1455 review D-1141–D-1144 + cadence

## 2026-08-17 04:10 — #1440 review D-1129–D-1132 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `teleds` 548–552 / `hack.c`
`switch_terrain` 3178–3217; `teleport.c` 529 / `region.c`
`update_player_regions` 582–592; `teleport.c` 493–496 /
`mon.c` `hideunder` 4726–4801; `teleport.c` 456–459 /
`dig.c` `buried_ball_to_punishment` 1934–1955 / `read.c`
`punish`.
**Change:** reviews **90** ACCEPT D-1129 (`switch_terrain` real;
no `float_down` on block; `classify_terrain` named), **91**
ACCEPT D-1130 (dangling-else `attach_2_u` clear; not
`in_out_region`; gas bit reader named), **92** ACCEPT-WITH-DEBT
D-1131 (hideunder+mimic `M_AP_NOTHING`; eel `u.Underwater`
sticky named, not Must-fix), **93** ACCEPT D-1132 (type-only
unearth; `punish` reuse real; other callers named). Must-fix
empty. Filled D-1132 archive hash `a8d04dd2`. Rotated #1425.
Open 11 (no refill). Rule #2: no fs.
**Score:** cadence **#1440** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1445**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `tele()` / trap teledest. Not
tele_trap wrenching.
**Blocked:** none.
