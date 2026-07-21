# Rotated journal entries

## 2026-07-21 04:35 — #1104 nolimbs ring put-on + doread check_capacity
- Objective: seed4500 @100699 C `rn2(46) @ rnd_otyp_by_namedesc` vs
  JS `rn2(5)` (D-0928) — misread; JS namedesc ran 14 calls late.
- C locus: `do_wear.c` `accessory_or_armor_on` `nolimbs`; `read.c`
  `doread` → `check_capacity`; `mondata.h` `nolimbs`.
- Change: `monsters.js` `nolimbs`/`M1_NOLIMBS`; ring cannot-stick
  before Right/Left yn; `doread` EXT_ENCUMBER → pline + ECMD_OK.
- Verification: prefix **100699→101373**; RNG **101373** Scr **926**;
  green+strict PASS; cohort 1500/1800/0108/5002/5006/0014/2600 **7/7**.
- Next: @**101373** `passiveum` `d(2,6)` vs `rnd(21)`; cadence @#1105.

