## 2026-07-19 21:53 — #912 D-0794 mux-at-hero fleeck signature
- Objective: seed0360 @112243 leftover apprentice after step 706.
- C locus: `monmove.c` `set_apparxy` (`u_at(mux,muy)` early return);
  `mon.c` `movemon` / EOT `mcalcmove`.
- Change or falsified theory: **Docs only.** C @112243 is consecutive
  `distfleeck` with no `set_apparxy` RNG → mux already at hero.
  Neferet `mux=0`+CLOSE cannot be that actor. Step 706 RNG identical;
  JS 8 apprentice spends → `mov=0`; Neferet `24→12`; `umov=12` skips
  EOT. Paradox: C still needs leftover apprentice mov. DIAG out.
- Verification: green+strict PASS; focused @112243 / RNG 112272 Scr 391.
- Next: silent mov-budget divergence after step 706 (no FORCE).

## 2026-07-19 22:06 — #913 D-0795 movemon early exits + D-0794 budgets
- Objective: seed0360 @112243 leftover apprentice mov paradox.
- C locus: `mon.c` `movemon_singlemon` (utotype/mon_offmap/isgd);
  `mcalcmove` Neferet mmove=15.
- Change: **D-0795** port early exits + iter break. Refined D-0794:
  JS EOT704 Neferet +24 / apprentices +12; step706 umov=12 leaves
  Neferet@12. C needs Neferet@0 + apprentice PRE leftover. Peel
  unchanged @112243.
- Verification: green+strict PASS; cohort 6/6 PASS; focused RNG 112272.
- Next: falsify pre-EOT704 silent apprentice skip / Neferet mcalcmove slot.
