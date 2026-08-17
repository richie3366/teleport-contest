# Rotated from AGENT-LOOP-JOURNAL.md after #1478 D-1163 rloc_to minvent shop bill

## 2026-08-17 09:35 — #1463 D-1151 switch_terrain classify_terrain

**Objective:** Open — `hack.c` `classify_terrain` (named from
switch_terrain). Not invocation.
**C locus:** `hack.c` `classify_terrain` 3131–3214;
`switch_terrain` 3257–3258; `rm.h` xFLOOR…xWATERWALL.
**Change:** port `classify_terrain`; `switch_terrain` calls it when
`flags.terrainstatus`. lastseentyp remaps; Underwater ≡ `uinwater`;
botl iff option && !run. Option bag `flags.terrainstatus` (C).
Did not paint `terrain_descr[]`, options toggle, MAX_TYPE
sentinels, or other callers. Filled D-1150 archive hash
`505df513`. Rotated #1448. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1460** **44**/44; next
@**#1465**).
**Verified:** private canary **32**/32 (ice/pool/floor/ground/tree;
door; drawbridge; Medusa/Juiblex; WATER wall; uinwater; sticky
ignore; run/off gates; switch_terrain On/Off); green+strict
seed8000/0900; cohort **23**/23 (0007 options + 0012 vault +
0004/0002/0006/0009/0014/0017/0030/0060/0102/0106/0108/0116/
0360/0367/0373/0383/0700/1500/1800/2200/4500) + strict
0007/0012/0360/4500/2200/0004/0002/0006/0030. Path public-unhit
(`terrainstatus` default Off).
**Next:** Open `teleport.c` `rloc_to` `maybe_unhide_at` (named).
Not vanish-msg. Audit @**#1465**.
**Blocked:** none.
