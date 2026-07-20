## 2026-07-20 17:16 — #1016 D-0867 thitmonst tmiss
- Objective: seed0399 @10697 C `tmiss` rn2(3) vs JS rn2(100).
- C locus: `dothrow.c` `tmiss` / `thitmonst` else; armor throw of
  gray dragon scale mail at soldier ant.
- Change: port `tmiss` + food-fail `tmiss(FALSE)` + else `tmiss(TRUE)`.
  Cause was silent miss → `breaktest`/`obj_resists`.
- Verification: green+strict PASS; prefix **10697→10729** Scr
  **429→442**; cohort 16/16 (throw seeds incl.).
- Next: seed0399 @10729 C `exercise` rn2(19) vs JS `distfleeck` rn2(5).
