## 2026-07-19 — #802 seed0108 #tip (D-0719)
- Objective: seed0108 @3564 C `getbones` `rn2(3)` vs JS `rn2(5)`.
- C locus: `pickup.c` `dotip`/`tipcontainer`; `allmain.c` unmul→deferred_goto.
- Change: `#tip` was unknown → ynq `q` leaked → phantom walks before ^V;
  port floor `dotip` ynq + tipcontainer floor spill; register EXT_CMDS;
  unmul→deferred_goto.
- Verification: green+strict PASS; seed0108 RNG **FULL** 16958 Scr
  **110→148**; cohort 33/33 PASS.
- Next: seed0108 first screen miss @148.

