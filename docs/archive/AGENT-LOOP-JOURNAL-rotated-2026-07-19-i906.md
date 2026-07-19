## 2026-07-19 17:20 — #892 getpos seenv stairs (D-0779)
- Objective: seed0360 @100738 bat Y drift / wrong travel dest.
- C locus: `getpos.c` terrain feature `seenv`; `cmd.c` `C('j')` rush.
- Change: `js/getpos.js` `terrain_feature_matches` requires `seenv`
  (blank `disp_ch` is not known). Falsified: C hero@(9,1) at first
  siege movemon; quitchars-before-`\n` (C binds rush first).
- Verification: green+strict PASS; cohort 10/10 PASS; seed0360 prefix
  **100738→101022**, Scr **293→294**, RNG matched **101517→101695**.
- Next: @101022 C `m_move:1871` `rn2(3)` vs JS `rn2(5)`.
