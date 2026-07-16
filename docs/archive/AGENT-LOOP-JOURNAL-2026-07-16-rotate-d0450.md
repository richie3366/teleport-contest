# Rotated from AGENT-LOOP-JOURNAL.md (#484)

## 2026-07-16 02:28 — #470 score + ohitmon (D-0439)
- Objective: mandatory full `sessions` score (#470÷5); primary
  seed0002 @11150 C `rnd(20)` @ `ohitmon` vs JS `rn2(5)` (`distfleeck`).
- C locus: `mthrowu.c` `ohitmon` / `m_throw`; `dothrow.c` `omon_adj`.
- Change: port `ohitmon` + `omon_adj`; wire `m_throw` mon-hit path
  (miss-with-range continues; hit → `dmgval`/`drop_throw`).
- Verification: full suite **26/44** Scr **4503**/11405 RNG
  **267277**/792838 speed `22+0.13/turn`; seed0002 prefix
  **11150→11309**; Scr still **233**/595; green+strict; cohort
  seed0013/1800/0004/0104 PASS.
- Next: seed0002 @11309 C `rn2(5)` @ `u_maybe_impaired` vs JS
  `rn2(20)`.
## 2026-07-16 02:21 — #469 peffect_booze (D-0438)
- Objective: seed0002 @10634 C `d(3,8)` @ `peffect_booze` vs JS
  `rn2(5)` (`distfleeck`) (PRIMARY).
- C locus: `potion.c` `peffect_booze`; `eat.c` `init_uhunger`/`newuhs`.
- Change: wire POT_BOOZE; port peffect_booze (`d(2+uhs,8)`, healup,
  hunger, exercise, cursed pass-out); init `uhs=NOT_HUNGRY`; field-only
  `newuhs` from metabolism/nutrition.
- Verification: seed0002 prefix **10634→11150**; Scr still **233**/595;
  RNG matched **11598**/27158; green+strict; cohort **26/26**.
- Next: seed0002 @11150 `ohitmon` `rnd(20)`.
