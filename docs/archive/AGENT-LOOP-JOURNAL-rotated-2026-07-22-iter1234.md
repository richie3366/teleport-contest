# Rotated from AGENT-LOOP-JOURNAL.md @#1234

## 2026-07-21 23:27 — #1219 D-0951 pickaxe dig occupation

- Objective: map-driven — `use_pick_axe`/`dig` occupation/`is_digging`/
  `dig_typ`/`holetime` (+ thin `dighole`/`fracture_rock`).
- C locus: `dig.c` pick_can_reach/dig_typ/is_digging/holetime/dig/
  use_pick_axe/use_pick_axe2/dighole; `zap.c` fracture_rock/break_statue;
  `apply.c` doapply pick/axe.
- Change: dig occupation cluster in `dig.js`; `doapply` wire; shk
  `holetime` (D-0951). Deferred: furniture_handled; HOLE goto_level;
  mkcavearea; dig_up_grave; conjoined_pits; autodig; shopdig;
  break-wand bhit; pool-lava/`vault_gd_watching`.
- Verification: green+strict; cohort 12/12; arch/wizard 5/5 PASS.
  Suite fortress held (no full cadence; next @#1220).
- Next: break-wand bhit / pool-lava / `vault_gd_watching`.

## 2026-07-21 23:21 — #1218 D-0950 dig helpers + break-wand dig/create

- Objective: map-driven — `dig_check`/`fillholetyp`/`digactualhole` +
  break-wand dig/create + dig `pay_for_damage`.
- C locus: `dig.c` dig_check/fillholetyp/digactualhole/liquid_flow;
  `trap.c` fill_pit; `apply.c` maybe_dunk + do_break_wand dig/create.
- Change: dig helpers in `dig.js`; dig/create arms + shop dig pay in
  `apply.js`; export `feeltrap`/`set_utrap` (D-0950). Deferred: bhit
  strike/cancel/poly; WAN_LIGHT; HOLE goto_level; pickaxe dig;
  pool-lava/`vault_gd_watching`.
- Verification: green+strict; wizard/dig/shop cohort 12/12 PASS.
  Suite fortress held (no full cadence; next @#1220).
- Next: pickaxe `dig`/`is_digging` / break-wand bhit / pool-lava.

