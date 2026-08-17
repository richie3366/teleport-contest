# Rotated from AGENT-LOOP-JOURNAL.md after #1494 D-1176 mhurtle_step m_in_out_region

## 2026-08-17 15:48 — #1479 D-1164 rloc_to trapped mintrap

**Objective:** Open — `teleport.c` `rloc_to` trapped `mintrap`
(named). Not occupation.
**C locus:** `teleport.c` `rloc_to_core` 1765–1767; `trap.c`
`mintrap` 3733–3789 (no-trap / already-trapped).
**Change:** after angry+bill (silent `rloc_to`; after appear in
`rloc_to_flag`), `mtrapped && !wormno` → `mintrap(NO_TRAP_FLAGS)`.
Dest no trap clears mtrapped; dest trap is already-trapped
`rn2(40)`, not a fresh step-on. Dynamic import trap.js. Did
not pull occupation `dochugw`. Filled D-1163 archive hash
`d24ff150`. Rotated #1464. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1475** **44**/44; next
@**#1480**).
**Verified:** private canary **35**/35 (dest-bare clear; free dest
pit/dart no step-on; worm skip ± dest trap; same-cell; null;
migrating; flag NOMSG/MSG; dest-dart/pit `rn2(40)` not `rn2(4)`;
leave-origin-pit; undef; second rloc); green+strict
seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002. Path public-unhit on trapped rloc off a pit.
**Next:** Open `dothrow.c` `hurtle_step` `in_out_region` (named).
Not walk. Audit @**#1480**.
**Blocked:** none.
