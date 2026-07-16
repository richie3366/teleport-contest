## 2026-07-16 02:08 — #467 peffect_confusion (D-0436)
- Objective: seed0002 @10511 C `rn2(7)` @ `peffect_confusion` vs
  JS `rn2(5)` (PRIMARY).
- C locus: `potion.c` `peffect_confusion` / `make_confused` /
  `itimeout_incr`.
- Change: JS deferred POT_CONFUSION; ported peffect msgs +
  `rn1(7,16-8*bcsign)` via `make_confused` TIMEOUT + Confusion mirror.
- Verification: seed0002 prefix **10511→10550**; Scr **233**/595;
  green+strict; cohort **26/26**.
- Next: seed0002 @10550 `distfleeck` vs `m_move`.
## 2026-07-16 02:04 — #466 SCR_ENCHANT_WEAPON (D-0435)
- Objective: seed0002 @8863 C `exercise` rn2(19) vs JS `rn2(5)` (PRIMARY).
- C locus: `read.c` `seffect_enchant_weapon`/`cap_spe`; `wield.c`
  `chwepon`; `potion.c` `strange_feeling`.
- Change: JS gated ENCHANT_WEAPON unimplemented; ported seffect +
  chwepon glow/spe (scalpel +0→+1 blue moment) + doread/seffects wire.
- Verification: seed0002 prefix **8863→10511**; Scr **194→233**/595;
  RNG matched **10900**/27158; green+strict; cohort **26/26**.
- Next: seed0002 @10511 `peffect_confusion` (`rn2(7)`).
## 2026-07-16 01:55 — #465 score + drinksink (D-0434)
- Objective: mandatory full `sessions` score (#465÷5); primary
  seed0002 @8831 drinksink.
- C locus: `potion.c` `dodrink` sink yn; `fountain.c` `drinksink`/
  `breaksink`.
- Change: full suite **26/44** Scr **4503**/11405 RNG
  **267277**/792838 speed `22+0.13/turn`. Ported sink yn +
  `drinksink` switch + `breaksink` (D-0434).
- Verification: seed0002 prefix **8831→8863**; Scr **190→194**/595;
  green+strict; cohort **24/24**.
- Next: seed0002 @8863 `SCR_ENCHANT_WEAPON` / seffects exercise
  vs doread unimplemented gate.
