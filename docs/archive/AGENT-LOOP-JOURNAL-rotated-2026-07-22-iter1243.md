# Rotated from AGENT-LOOP-JOURNAL.md @#1243

## 2026-07-22 00:06 — #1228 D-0958 shopdig

- Objective: map-driven — retire dig `shopdig` warn/snatch under fortress.
- C locus: `shk.c` `shopdig`; callers `dig.c` `digactualhole` /
  `use_pick_axe` downward start.
- Change: port `shopdig(0/1)` (verbalize/knight/mnexto/pack snatch);
  wire dig hole fall + start-downward (D-0958). Deferred:
  destroy_drawbridge / desecrate_altar / impact_drop / mkcavearea /
  conjoined_pits / autodig / boulder-fill; SetVoice; nolimbs #if0.
- Verification: green+strict PASS; dig/shop cohort 16/16 PASS.
  Suite fortress held (no full cadence; next @#1230).
- Next: destroy_drawbridge / desecrate_altar / impact_drop /
  mkcavearea / conjoined_pits.

## 2026-07-22 00:05 — #1227 D-0957 dig_up_grave

- Objective: map-driven — retire dig `dig_up_grave` + `dighole`
  IS_GRAVE arm under fortress.
- C locus: `dig.c` `dig_up_grave` / `dighole` IS_GRAVE; `mkobj.c`
  `mk_tt_object` (empty topten path).
- Change: port `dig_up_grave` + local `mk_tt_object`; wire IS_GRAVE →
  `digactualhole(PIT)` then grave contents (D-0957). Deferred:
  destroy_drawbridge / desecrate_altar / shopdig / impact_drop /
  mkcavearea / conjoined_pits / autodig / boulder-fill.
- Verification: green+strict PASS; dig/shared cohort 16/16 PASS.
  Suite fortress held (no full cadence; next @#1230).
- Next: destroy_drawbridge / shopdig / impact_drop / mkcavearea.

## 2026-07-21 22:00 — #1226 D-0956 Ring_gone/float_up/rescham/choke

- Objective: map-driven eataccessory cluster (CURRENT next)
- C locus: eat.c eataccessory/choke; do_wear.c Ring_gone; trap.c float_up;
  mon.c rescham/normal_shape; display.c set_mimic_blocking
- Change: Ring_gone/Ring_off_or_gone; float_up; rescham/restartcham;
  set_mimic_blocking; wire eataccessory + attrcurse SEE_INVIS
- Verification: green+strict PASS; eat/shared cohort 17/17 PASS
- Next: dig destroy_drawbridge/desecrate_altar/shopdig/… or ice melt
