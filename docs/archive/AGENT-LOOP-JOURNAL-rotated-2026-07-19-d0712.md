## 2026-07-18 22:30 — D-0699 setworn ring-slot clear
- Objective: seed0014 @35611 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.
- C locus: `worn.c` `setworn`; `steal.c` `remove_worn_item`;
  `do_wear.c` ring put-on gates.
- Change: `setworn(null, W_RINGL|R)` clears `uleft`/`uright`; ring
  Glib/gloves/welded gates; `m_avoid_kicked_loc` in hostile `m_move`.
- Verification: prefix **35611→36031**, Scr **538**/714; green+strict
  PASS; cohort **35**/35.
- Next: @36031 C `exercise` `rn2(19)` vs JS `rn2(5)`.

