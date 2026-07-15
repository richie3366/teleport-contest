# Rotated journal entries

## 2026-07-15 00:40 — #359 D-0331 getlin/`#` topl wrap

- Objective: seed0030 @1935 `#` extcmd echo wrap (CURRENT).
- C locus: `topl.c` `topl_putsym` (CO-1 wrap); `getline.c` `buf < COLNO`.
- Change: `topl_wrap_echo` in `getlin`/`get_ext_cmd`; raise cap to COLNO
  (D-0331).
- Verification: seed0030 **1953/1953** PASS; green+strict; 17 cohort PASS;
  seed2200 Scr **175→206**/230.
- Next: seed0013 @23 getobj drop `[a-g or ?*]` vs `[abcdefg or ?*]`.

