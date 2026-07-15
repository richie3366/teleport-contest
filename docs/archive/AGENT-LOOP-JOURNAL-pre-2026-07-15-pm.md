
## 2026-07-15 16:26 — #434 seed0004 @10382 SCR_TELEPORTATION (D-0407)
- Objective: seed0004 @10382 PRIMARY — C `exercise` `rn2(19)` vs JS
  `rn2(5)` (read teleport → `safe_teleds`).
- C locus: `read.c` `seffect_teleportation`/`learnscrolltyp`;
  `teleport.c` `scrolltele`/`safe_teleds`; invent getobj `?` pickinv.
- Change: getobj-read `?`/`*`; SCR_TELEPORTATION → scrolltele/safe_teleds;
  learnscroll → makeknown+XP; oc_magic exercise before seffects switch.
- Verification: seed0004 RNG 10409→10569; Scr 241→242; miss @10563;
  green+strict PASS; cohort 23/23.
- Next: seed0004 @10563 gethungry/hitum vs distfleeck (post-travel `l`).
