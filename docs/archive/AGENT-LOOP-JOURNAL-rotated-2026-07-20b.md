# Rotated journal entries

## 2026-07-20 00:24 — #929 D-0807 sel_set_ter lava lit
- Objective: seed0360 @324 C DEC lava `` ` `` vs JS blank (orcus).
- C locus: `mkmaze.c` `set_levltyp` — `IS_LAVA(newtyp) → lit=1`
  (hell_tweaks / des.terrain keep lit under SET_LIT_NOCHANGE).
- Change: `js/mklev.js` `sel_set_ter` force lit on IS_LAVA; orcus
  region unlit → sel_set_lit (lava stays lit). Named: other inline
  `loc.lit=false` loops.
- Verification: green+strict PASS; cohort 35/35 PASS; seed0360
  Scr **638→670**/833; prefix **324→373**; RNG FULL.
- Next: @373 fakewiz1 materialize C `--More--` vs JS heat/smoke.

