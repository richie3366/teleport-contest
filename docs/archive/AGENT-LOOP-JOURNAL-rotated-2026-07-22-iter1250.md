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


## 2026-07-22 00:36 — #1235 cadence + D-0965 ice/burn/fireball

- Objective: mandatory cadence full `sessions` (@#1235 % 5 == 0);
  map-driven zap debt — ice melt / `burn_floor_objects` / fireball.
- C locus: `zap.c` `melt_ice`/`start_melt_ice_timeout`/`melt_ice_away`/
  `burn_floor_objects`/`zap_over_floor`/`dobuzz` fireball.
- Change: TIMER_LEVEL spot timers in `mkobj.js`; melt/burn + FIRE/COLD
  `zap_over_floor` arms + fireball trail skip/`explode` in `zap.js`
  (D-0965). Deferred: bury/obj_ice; lavawall spines; explode AD_FIRE
  combat; burn feedback plines.
- Verification: green+strict; zap cohort 16/16 PASS; full `sessions`
  **44**/44 Scr **11405**/11405 RNG **100%** speed `30+0.27/turn`.
- Next: float_down/learnring/adjust_attrib; bury/obj_ice; angrygods
  4–8. Cadence @**#1240**.
