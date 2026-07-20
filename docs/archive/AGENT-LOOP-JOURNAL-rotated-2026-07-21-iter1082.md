## 2026-07-20 23:51 — #1068 D-0917 fill_ordinary_room subroom recursion
- Objective: seed4500 @54329 C somex rn2(2) vs JS rn2(12).
- C locus: `mklev.c` `fill_ordinary_room` nsubrooms loop before needfill.
- Change: recurse `fill_ordinary_room(subroom, false)` then needfill gate
  (Nesting mid/inner fill before outer). Named omit: Fake Delphi/Huge/
  Mausoleum/Twin nested bodies; `u.uhave.amulet` arm of sleeping-mon gate.
- Verification: prefix **54329→55990** RNG **57748** Scr **613**;
  green+strict PASS; cohort 13/13 PASS + strict lengths.
- Next: @55990 C `drag_down` rn2(2) vs JS rn2(50); cadence @#1070.

