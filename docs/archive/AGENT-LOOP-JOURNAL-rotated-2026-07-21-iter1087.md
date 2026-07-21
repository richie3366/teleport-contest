# Rotated from AGENT-LOOP-JOURNAL.md @#1087

## 2026-07-21 00:12 — #1072 D-0921 minetn-4 College Town
- Objective: seed4500 @61698 C nhlib shuffle `rn2(3)` vs JS `rn2(79)`
  after matched `getbones`/`makemaz` `rnd(7)=4`.
- C locus: `dat/minetn-4.lua` via `makemaz`/`load_special`; nhlib
  `shuffle(align)`.
- Change: port `load_minetn_4` + dispatch; `book shop`→`BOOKSHOP`.
  Root: omitted College Town → empty level → `rn2(79)`.
  Named omit: minetn-1/6/7.
- Verification: prefix **61698→82788** RNG **83013** Scr **747**;
  green+strict PASS; cohort 15/15 PASS.
- Next: @82788 C `distfleeck` `rn2(5)` vs JS `rn2(50)`.
