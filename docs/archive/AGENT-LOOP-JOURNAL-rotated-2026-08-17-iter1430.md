# Rotated from AGENT-LOOP-JOURNAL.md at cadence #1430

## 2026-08-16 22:48 — #1415 review D-1109–D-1112 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `sp_lev.c` `lspo_exclusion` 5498–5531 /
`dungeon.c` `free_exclusions` / `sp_lev.c` `flip_level` 876–896;
`teleport.c` `goodpos` 168–169 / `monmove.c` `onscary` 241–303;
`teleport.c` `teleok` 420–445; `teleport.c` `mlevel_tele_trap`
2033–2095.
**Change:** reviews **70** ACCEPT D-1109 (opcode + wired soko/vault;
soko2-2 named), **71** ACCEPT D-1110 (live `onscary` clone; mfndpos
`mon.js` named), **72** ACCEPT D-1111 (VS/pit-fly trapok; `tele_jump_ok`
named), **73** ACCEPT D-1112 (portal/levelport/no-trap; hole dest
named). Must-fix empty. Filled D-1112 archive hash `bb552fba`.
Rotated #1400. Open 11 (no refill). Rule #2: no fs.
**Score:** cadence **#1415** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1420**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `fountain.c` `dipsink`. Not wash_hands.
**Blocked:** none.
