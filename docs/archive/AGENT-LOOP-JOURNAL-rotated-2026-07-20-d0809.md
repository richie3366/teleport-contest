## 2026-07-19 22:30 — #916 D-0796 castmu HASTE_SELF
- Objective: seed0360 @112243 apprentice leftover (D-0794).
- C locus: `mcastu.c` `MCAST_HASTE_SELF` → `mon_adjust_speed`; `mcalcmove` MFAST.
- Change: **D-0796** `js/mcastu.js` HASTE_SELF + CURE_SELF. Closes D-0794
  (was deferred spell body, not PRE skip). Prefix **112243→112279**;
  focused RNG **112272→112326**.
- Verification: green+strict PASS; cohort 12/12 PASS; DIAG removed.
- Next: @112279 C fleeck vs JS rn2(3) after EOT62.
