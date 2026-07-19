# Rotated journal entries

## 2026-07-19 06:47 — #832 mattackm AT_WEAP wield (D-0743)

- Objective: seed0360 @2995 pet return-attack (CURRENT primary).
- C locus: `mhitm.c` `mattackm` AT_WEAP → `mon_wield_item`; `weapon.c`.
- Change: AT_WEAP need-weapon/`!MON_WEP` → wield; nonzero → `M_ATTK_MISS`
  (no `rnd(20)`). Root was goblin first-wield on return attack (topline
  "wields a crude dagger"); #831 mlstmv/onscary gate theory falsified.
- Verification: green+strict PASS; cohort 35/35; prefix **2995→3006**;
  RNG **3098→3120**; Scr **177→181**.
- Next: @3006 C `exercise` `rn2(19)` vs JS `rn2(5)`; or D-0731/D-0708.
