# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-19 — #804 seed0108 Upolyd display + #monster (D-0722/23)
- Objective: seed0108 @78 `#polyself` gnome cloak More / glyph / botl.
- C locus: `polyself.c` polymon/break_armor; `botl.c`; `display.h`
  hero_glyph; `hack.c` weight_cap Upolyd; `cmd.c` domonability.
- Change: Upolyd botl/glyph/weight_cap; polymon encumber_msg;
  setworn skip_find_ac + defer find_ac past More (D-0722);
  EXT_CMDS `#monster`/domonability reflexive (D-0723).
- Verification: green+strict PASS; seed0108 Scr **156→187** RNG FULL;
  prefix **78→109**; cohort 33/33 PASS.
- Next: @109 red-dragon poly botl `Fly` (set_uasmon FROMFORM FLYING).

## 2026-07-19 — #805 score refresh + FROMFORM FLYING (D-0724)
- Objective: mandatory full `sessions` score (#805÷5) + seed0108 @109 Fly.
- C locus: `polyself.c` `set_uasmon` PROPSET(FLYING).
- Change: `propset_fromform(FLYING,…)` on uprops + HFlying (D-0724).
- Verification: green+strict PASS; seed0108 Scr **187→280** RNG FULL;
  cohort PASS; full suite **35/44** Scr **7901**/11405 RNG **527316**/792838
  (66.51%; Δ vs #800 Scr +206 RNG +13675).
- Next: seed0108 remaining 23 screens / rest PROPSET; or D-0708.
