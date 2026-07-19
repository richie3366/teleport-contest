## 2026-07-19 21:10 — #908 D-0792 Wizard ldrnum + mundisplaceable
- Objective: seed0360 @112243 Neferet CLOSE peel.
- C locus: `role.c` Wizard quest fields; `monst.h` `mundisplaceable`;
  `hack.c` `domove_swap_with_pet`.
- Change: Wizard `ldrnum`/`guardnum`/`homebase`/`questarti`; refuse
  leader/Oracle/priest/shk/gd swap. **Falsified:** clearing Neferet
  CLOSE at any thr≤112000 regresses prefix (thr=-1 best @112243).
- Verification: green+strict PASS; cohort 7/7 PASS; seed0360 still
  @112243 / RNG 112272 Scr 391.
- Next: @112243 movement leftover / second movemon pass (not CLOSE).

## 2026-07-19 21:00 — #907 D-0791 WAITMASK disturb + Neferet CLOSE diag
- Objective: seed0360 @112243 C distfleeck rn2(5) vs JS rn2(12).
- C locus: `uhitm.c` `attack_checks` first line; `display.h` `_is_safemon`;
  `mon.c` `wake_nearto_core` G_UNIQ; `dothrow.c` STRAT_WAITMASK.
- Change: clear WAITMASK at `attack_checks` start; `is_safemon` needs
  `canspotmon`; wake_nearby skip G_UNIQ; dothrow `~0x07`→STRAT_WAITMASK.
  Diag: mismatch is Neferet `STRAT_CLOSE` no-op → EOT `mcalcmove`; C
  peaceful `rn2(10)` = Neferet without CLOSE. #chat never cleared her
  (SELF/NOMON). `special_obj_hits_leader` still deferred.
- Verification: green+strict PASS; cohort 7/7 PASS; seed0360 still
  @112243 / RNG 112272 Scr 391.
- Next: find C path that cleared Neferet CLOSE (kick/attack/throw
  leader-catch); then mux/`set_apparxy` after she moves.
