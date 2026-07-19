# Rotated from AGENT-LOOP-JOURNAL.md (#933 / D-0811)

## 2026-07-19 23:08 — #919 D-0799 set_apparxy can_fog
- Objective: seed0360 @112857 C distfleeck vs JS set_apparxy.
- C locus: `monmove.c` `can_fog` / `set_apparxy` closed_door arm.
- Change: **D-0799** — vampshifter bat Displacement image on locked
  door needs `can_fog`; JS stub was false. Prefix **112857→113103**;
  RNG **113111**; Scr **519**.
- Verification: green+strict PASS; cohort 37/37 PASS; DIAG removed.
- Next: @113103 C lua shuffle after matched getbones vs JS rn2(79).
## 2026-07-19 23:00 — #918 D-0798 quest Home ok_to_quest gate
- Objective: seed0360 @112279 C fleeck vs JS getbones (umov theory).
- C locus: `do.c` `goto_level` quest-home arm; `quest.c` `ok_to_quest`.
- Change: **D-0798** — falsified umov surplus; C mysterious-force after
  ^V `A` (Wiz-goal) from Home; JS ported gate. Prefix **112279→112857**;
  Scr **504→519**; RNG **112956**.
- Verification: green+strict PASS; cohort 35/35 PASS; DIAG removed.
- Next: @112857 C distfleeck vs JS set_apparxy (mux-image).
