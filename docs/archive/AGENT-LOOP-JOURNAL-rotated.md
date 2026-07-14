## 2026-07-14 18:12 — D-0286/87 mswings + botl HP clamp

- Objective: seed0030 Scr 103/1953 (CURRENT primary); first miss @62.
- C locus: `mhitu.c` `mswings`/`mswings_verb`/`hitval`; `botl.c` hp<0→0.
- Change: AT_WEAP melee calls `hitval` + `mswings` before hit/miss
  (D-0286); status line clamps negative HP for display (D-0287).
- Verification: Scr@62 topline+HP match; prefix miss **62→75**;
  Scr **103→116**; RNG full; green+strict PASS; 17-session PASS cohort.
- Next: Scr@75 death `--More--` vs invent-identify yn; or seed0013.

