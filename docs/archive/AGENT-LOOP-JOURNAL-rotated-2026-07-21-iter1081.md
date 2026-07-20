# Rotated from AGENT-LOOP-JOURNAL.md (#1081)

## 2026-07-20 23:50 — #1067 D-0916 Nesting nested + lspo_door rnddoor
- Objective: seed4500 @52803 C themerms/nhlib rn2(5) vs JS rn2(1000).
- C locus: `themerms.lua` Nesting contents; `nhlib.lua` math.random;
  `sp_lev.c` create_subroom / lspo_door / rnddoor / create_door.
- Change: `themeroom_nesting_contents` mid+inner subrooms/doors;
  `splev_room_door` burns rnddoor() when state=random (mask stays -1).
  Named omit: Fake Delphi/Huge/Mausoleum/Twin nested; Random-feature
  center terrain.
- Verification: prefix **52803→54329** RNG **54647** Scr **613**;
  green+strict PASS; cohort 13/13 PASS + strict lengths.
- Next: @54329 C somex rn2(2) vs JS rn2(12); cadence @#1070.
