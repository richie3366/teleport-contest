## 2026-07-22 01:03 — #1241 D-0971 explode AD_COLD/ELEC

- Objective: map-driven zap debt — AD_COLD/ELEC explode mon/hero after
  D-0968 AD_FIRE combat.
- C locus: `explode.c` explosionmask / explode / mon_explodes /
  adtyp_to_expltype.
- Change: Cold/Shock `explosionmask`; open combat_ok to COLD/ELEC;
  `mon_explodes` COLD/ELEC type `-((ad-1)+20)`; FROSTY/MAGICAL
  expltype (D-0971). Deferred: MAGM/DISN/DRST/ACID boom; lavawall;
  golem/ignite/slime.
- Verification: green+strict PASS; zap/wizard cohort 20/20 PASS.
  Fortress held (no full cadence; next @#1245).
- Next: music `do_earthquake`/`do_pit`; sink-fall; lavawall spines.
  Cadence @**#1245**.

# Rotated journal crumbs

