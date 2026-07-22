# Agent loop journal archive (rotated @#1250)

## 2026-07-22 00:30 — #1234 D-0964 revive container/buried

- Objective: map-driven — `revive` container/buried + `cant_revive` +
  `zombie_can_dig` (+ OBJ_BURIED extract).
- C locus: `zap.c` `revive`/`get_obj_location`/`get_container_location`/
  `zombie_can_dig`; `read.c` `cant_revive`; `mkobj.c` `obj_extract_self`
  OBJ_BURIED.
- Change: container/buried location + revival rules + cant_revive
  zombie/doppel + oeaten/oname in `zap.js`; buried extract + export
  `eaten_stat` in `mkobj.js` (D-0964). Deferred: montraits/omonst/
  ghost/shop stolen_value; ice melt / burn_floor / fireball.
- Verification: green+strict; zap/shared cohort 16/16 PASS (incl.
  seed2200 wizard, seed0016 healer zap). Suite fortress held (no
  full cadence; next @#1235).
- Next: ice melt / `burn_floor_objects` / fireball; float_down /
  learnring / adjust_attrib; angrygods 4–8.

