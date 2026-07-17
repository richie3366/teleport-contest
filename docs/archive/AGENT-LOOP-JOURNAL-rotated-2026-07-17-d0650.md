## 2026-07-17 14:16 — #708 D-0636 blue DSM Very_fast
- Objective: seed0367 @2331 C u_calc_moveamt rn2(3) vs JS dosounds rn2(400).
- C locus: do_wear.c dragon_armor_handling/Armor_on; youprop.h Very_fast.
- Change: dragon_armor_handling (blue→EFast) + Armor_on/off; Fast/Very_fast
  read uprops[FAST]; confer_oc_oprop FAST→EFast mirror. Hypothesis "missing
  u_calc_moveamt call" falsified — Very_fast false without blue DSM EFast.
- Verification: prefix **2331→2336**; Scr **166→167**; green+strict PASS;
  cohort 32/32 PASS.
- Next: seed0367 @2336 getbones / nhlib shuffle vs rn2(79).
