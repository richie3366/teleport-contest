# Rotated journal crumbs

## 2026-07-14 23:48 — #357 D-0329 named ghost monnam

- Objective: seed0030 @1830 `You miss Elara's ghost.` (CURRENT).
- C locus: `do_name.c` `x_monnam` PM_GHOST + `s_suffix(MGIVENNAME)`.
- Change: `named_ghost_monnam` in `mon_nam` / tame / `noit_Monnam`
  (D-0329).
- Verification: @1830/@1831 match; Scr **1831→1832**; first miss **@1832**
  `;` unbound; RNG full; green+strict; 17 PASS cohort.
- Next: @1832 cmd `;` → `do_look(1)`.

