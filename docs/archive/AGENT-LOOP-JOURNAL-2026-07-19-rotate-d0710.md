## 2026-07-19 01:41 — #791 D-0710 #rub / dorub
- Objective: seed0108 @2778 dochug nearby (CURRENT primary).
- C locus: `apply.c` `dorub` / `wield.c` `wield_tool`; `hack.c` `nomul`.
- Change: `#rub` was AC-only; `n` became SE move (dist2 2→8). Port
  `dorub`+`wield_tool`+cmdq; `nomul` clears `_cmdq_canned`. D-0710 fixed.
- Verification: green+strict PASS; seed0108 **2778→2807**; cohort 10/10.
- Next: @2807 `use_cream_pie` rnd(25) (D-0711); or D-0708.
