## 2026-07-21 23:45 — #1223 D-0954 furniture_handled + HOLE goto_level

- Objective: map-driven — dig `furniture_handled` fountain/sink +
  HOLE hero `goto_level` + mon migrate.
- C locus: `dig.c` `furniture_handled` / `digactualhole` HOLE /
  `dighole` liquid gate; `fountain.c` `dogushforth`/`dryup`/`breaksink`.
- Change: export fountain helpers; `furniture_handled` + HOLE fall /
  mon `teleport_pet` migrate in `dig.js` (D-0954). Deferred:
  destroy_drawbridge body; desecrate_altar; shopdig; impact_drop;
  unturn/hero_breaks/ABON; Ring_gone cluster.
- Verification: green+strict; dig/shared cohort 16/16 PASS.
  Suite fortress held (no full cadence; next @#1225).
- Next: `unturn_dead` invent revive / `hero_breaks` / worn ABON;
  Ring_gone / float_up / rescham / choke.
