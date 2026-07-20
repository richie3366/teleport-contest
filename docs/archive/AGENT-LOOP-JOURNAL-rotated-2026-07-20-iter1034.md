## 2026-07-20 17:34 — #1019 D-0870 adjattrib encumber_msg
- Objective: seed0399 Scr 522/532 poison trailing — C poison--More-- vs
  JS poison+weaker combined.
- C locus: attrib.c adjattrib in_moveloop STR/CON encumber_msg;
  allmain.c moveloop_preamble in_moveloop=1.
- Change: set in_moveloop at preamble end; adjattrib awaits encumber_msg
  for STR/CON (closes D-0449 deferral). Forces More before poisontell.
- Verification: green+strict PASS; seed0399 Scr **522→525**; RNG FULL;
  cohort 37/37.
- Next: seed0399 @113 puton prinv missing --More--; alt @300/@483;
  or D-0708; full score @#1020.

## 2026-07-20 17:30 — #1018 D-0869 poisoned/poisontell
- Objective: seed0399 @11152 C poisoned d(2,2) vs JS rn2(30)-only stub.
- C locus: attrib.c poisoned/poisontell; uhitm mhitm_ad_drst → poisoned.
- Change: port poisoned arms + poisontell; wire mhitu AD_DRST/DRDX/DRCO
  with mpoisons_subj reason. Not a knockback order bug.
- Verification: green+strict PASS; seed0399 RNG **FULL 11409**; Scr
  **502→522**; cohort 37/37.
- Next: seed0399 Scr 522/532 trailing screens; alt seed0014 @50259.

## 2026-07-20 17:22 — #1017 D-0868 done Lifesaved
- Objective: seed0399 @10729 C exercise rn2(19) vs JS distfleeck rn2(5).
- C locus: end.c done Lifesaved; makeknown→discover_object→exercise.
- Change: port Lifesaved arm (messages, makeknown, useup amulet,
  adjattrib CON−1, savelife). Not a mid-hit exercise/order bug.
- Verification: green+strict PASS; prefix **10729→11152** Scr
  **442→502**; cohort 10/10.
- Next: seed0399 @11152 C poisoned d(2,2) attrib-loss arm.
