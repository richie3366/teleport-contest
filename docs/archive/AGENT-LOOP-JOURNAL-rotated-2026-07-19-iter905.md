## 2026-07-19 17:04 — #891 getdir SELF + Wiz-strt hero lane (D-0779/D-0780)
- Objective: seed0360 @100738 bat Y drift after FlipY.
- C locus: `cmd.c` `getdir` NHKF_GETDIR_SELF; `monmove.c` first siege moves.
- Change: `js/lock.js` `getdir` — `'.'` is SELF (dx=dy=0), not cancel
  (D-0780). Falsified post-EOT forced `movemon` / umov=0 while-continue
  (breaks green). Diagnosed: after Wiz-strt `'.'` EOT, JS `#chat`/`y`
  moves hero (9,1)→(8,0) before first siege `movemon`; C still @ (9,1)
  so quasit/bat approach lanes differ (JS bat y=2 vs C y=1).
- Verification: green+strict PASS; cohort 1500/1800/0361/5002 PASS;
  seed0360 prefix still @100738, Scr **292→293**, RNG 101517.
- Next: why C first siege movemon sees hero@(9,1) (turn order after
  EOT vs `#chat`/`y`) — not mfndpos wall admit (D-0779).
