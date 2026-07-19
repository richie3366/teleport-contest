# Rotated from AGENT-LOOP-JOURNAL.md (#886)

## 2026-07-19 13:50 — #873 map_cleanup (D-0774); @98492 still open
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `sp_lev.c` `map_cleanup`; `mthrowu.c` `linedup`.
- Change or falsified theory: ported `map_cleanup` before wallify/flip
  (asmodeus/orcus/wizard1–2). Falsified “cleanup removes LOS boulder”:
  preflip (57,13) is ROOM; only lava boulders (15,9)/(17,9) stripped.
  DIAG: mumak (55,9) on lava, boulder (57,9) ROOM, couldsee false.
- Verification: green+strict PASS; cohort **10/10**; seed0360 still
  **98492**/275.
- Next: C couldsee/see-around vs skip lined_up; then wizard3.
## 2026-07-19 13:36 — #872 @98492 gen boulder matched (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `sp_lev.c` `fill_empty_maze`/`flip_level_rnd`; `mthrowu.c` `linedup`.
- Change or falsified theory: no port patch. Falsified “C never placed
  LOS boulder”: C maze1xy (57,13) @86737 + flp=1 @90542 match JS.
  Hell boulder-walls percent false. Mumak not throws_rocks (ok).
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: post-gen/gameplay couldsee vs blocking_terrain vs skip lined_up;
  then wizard3.
## 2026-07-19 13:20 — #871 @98492 linedup boulder (D-0773 diag)
- Objective: seed0360 @98492 C distfleeck rn2(5) vs JS linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `sp_lev.c` `fill_empty_maze`/`flip_level`.
- Change or falsified theory: no port patch. DIAG: PM_MUMAK (55,9)→hero
  (59,9); path lava(56,9)+boulder(57,9); strip boulder → couldsee true
  (lava does not block). FORCE skip rn2 → prefix 98492→98502 then C
  getbones+nhlib shuffle (wizard3). Boulder from fill_empty_maze (57,13)
  + Y-flip (extends ymin=2,ymax=20). C lacks that LOS boulder.
- Verification: green+strict PASS; seed0360 still @98492 (no code change).
- Next: why C lacks boulder @(57,9) (placement/flip/destruction); then
  wizard3/hellfill after getbones shuffle.
