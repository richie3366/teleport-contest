## 2026-07-19 — #828 cmd `c` → doclose (D-0740)

- Objective: seed5002 @11737 (JS wish rn2(181) vs C distfleeck).
- C locus: `cmd.c` `'c'`→`doclose`; `lock.c` `doclose`/`getdir`.
- Change: port `doclose` (getdir_cmdassist + close envelope); bind `c`.
  Root was missing close command — key desync → premature `wiz_wish`
  (C identify string was never a real wish).
- Verification: green+strict PASS; cohort 34/34; RNG **FULL 12167**;
  Scr 114→125/410.
- Next: seed5002 screen peel (destroy/death topline); or D-0731/D-0708.

