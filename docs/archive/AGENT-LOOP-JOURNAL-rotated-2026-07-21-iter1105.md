## 2026-07-21 02:50 — #1092 D-0928 C flip dump falsifies last=77
- Objective: seed4500 medusa-3 place / @88377 (D-0928).
- C locus: `sp_lev.c` `flip_level` / `Flip_coord` / `place_lregion`.
- Change: temp C recorder dump — medusa-3 flip **sum81**, stair
  **(32,16)**, place rect**(40,3)-(45,8)** tries≡JS land**(43,6)**;
  last=77/sum80 dead. Restored `Flip_coord` inFlipArea+x; removed
  invented SpLev_Map flip. Recorder DIAG reverted.
- Verification: green+strict PASS; cohort 7/7; rng-diff still @88377.
- Next: linedup geometry with matched place; cadence @#1095.

