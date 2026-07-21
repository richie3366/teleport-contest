# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-07-22 00:55 — #1239 D-0969 angrygods 4–8 + rndcurse

- Objective: map-driven prayer/absent — angrygods cases 4–8 after
  D-0963 god_zaps_you existed but switch still stubbed.
- C locus: `pray.c` angrygods / gods_angry; `sit.c` rndcurse;
  `spell.c` cursed_book default.
- Change: gods_angry; cases 4–5 attrcurse/rndcurse; case 6 punish
  fallthrough; 7–8 summon_minion; default god_zaps_you; port rndcurse
  + cursed_book wire; mkobj unbless (D-0969). Music earthquake altar
  desecrate still deferred.
- Verification: green+strict PASS; pray/spell cohort 20/20 PASS
  (seed0017/0501/0106/2200/0360).
- Next: music do_earthquake altar desecrate; toggle_stealth /
  sink-fall; lavawall / AD_COLD/ELEC explode; cadence @#1240.

## 2026-07-22 00:50 — #1238 D-0968 explode AD_FIRE combat

- Objective: map-driven zap debt — explode AD_FIRE mon/hero combat
  after D-0965 fireball terrain path.
- C locus: `explode.c` explode / explosionmask / mon_explodes;
  callers via fireball `dobuzz` + AT_BOOM.
- Change: explosionmask Fire_resistance/resists_fire; AD_FIRE
  mon/hero destroy_items+burnarmor+resist+cold×2+kill; mon_explodes
  AD_FIRE (D-0968). Deferred: COLD/ELEC boom; golem/ignite/slime.
- Verification: green+strict PASS; zap/wizard cohort 20/20 PASS.
  Fortress held (no full cadence; next @#1240).
- Next: angrygods 4–8; toggle_stealth; lavawall spines. Cadence @**#1240**.

## 2026-07-22 00:45 — #1237 D-0967 bury/unearth/obj_ice

- Objective: map-driven zap/dig debt — bury_objs / unearth_objs /
  obj_ice_effects after D-0965 ice melt.
- C locus: `dig.c` bury_an_obj/bury_objs/unearth_objs/rot_organic;
  `mkobj.c` obj_timer_checks/obj_ice_effects; callers in zap.c
  melt_ice/zap_over_floor + dig.c liquid_flow.
- Change: obj_timer_checks + obj_ice_effects; bury/unearth/rot_organic;
  wire melt/freeze/liquid_flow (D-0967). Deferred: shop bury bill;
  buried_ball; trap_ice_effects; damage_chain on liquid release.
- Verification: green+strict PASS; dig/zap cohort 16/16 PASS.
  Suite fortress held (no full cadence; next @#1240).
- Next: explode AD_FIRE; angrygods 4–8; toggle_stealth. Cadence @**#1240**.

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

## 2026-07-22 00:26 — #1233 D-0963 desecrate_altar / god_zaps

- Objective: map-driven — retire dig `desecrate_altar`/`god_zaps_you`
  under fortress.
- C locus: `pray.c` `desecrate_altar`/`god_zaps_you`/`fry_by_god`;
  `do_wear.c` `disintegrate_arm`; `minion.c` `lminion`/`summon_minion`;
  caller `dig.c` `digactualhole`.
- Change: port wrath cluster + armor strip + minion summon; wire
  hero/obj altar dig after furniture-fall msg (D-0963). Deferred:
  angrygods cases 4–8; music.c desecrate; shieldeff/SetVoice;
  ureflects non-shield; selftouch/cancel_don.
- Verification: green+strict PASS; dig/pray cohort 16/16 PASS
  (incl. seed0017 altar-pray). Suite fortress held (no full cadence;
  next @#1235).
- Next: revive container/buried; ice melt / burn_floor_objects /
  fireball; Ring_off polish. Cadence @#1235.

## 2026-07-22 00:22 — #1232 D-0962 conjoined/autodig/boulder

- Objective: map-driven — retire dig `conjoined_pits` + autodig quiet
  + `dighole` boulder-fill under fortress.
- C locus: `trap.c` `conjoined_pits`/`delfloortrap`; `cmd.c`
  `xytodir`; `dig.c` `pick_can_reach`/`use_pick_axe2`/`dighole`.
- Change: port helpers; wire pit reach/debris join/autodig quiet;
  boulder settle-or-KADOOM (retval false) (D-0962). Deferred:
  desecrate_altar/`god_zaps_you`; magical-trap explode; zap_dig
  pitdig; clear_conjoined_pits callers.
- Verification: green+strict PASS; dig/shared cohort 16/16 PASS.
  Suite fortress held (no full cadence; next @#1235).
- Next: desecrate_altar/`god_zaps_you`. Cadence @#1235.

## 2026-07-22 00:16 — #1231 D-0961 impact_drop

- Objective: map-driven — retire dig `impact_drop` under fortress.
- C locus: `dokick.c` `down_gate`/`drop_to`/`impact_drop`; `mkobj.c`
  `add_to_migration`; callers `dig.c` `digactualhole` HOLE arms.
- Change: port helpers + migrate floor objs through hole/stairs;
  wire both HOLE stay/mon paths (D-0961). Deferred: shop
  `stolen_value` bill; `ship_object`/do/trap callers; desecrate_altar;
  conjoined_pits; autodig; boulder-fill.
- Verification: green+strict PASS; dig/shared cohort 16/16 PASS.
  Suite fortress held (no full cadence; next @#1235).
- Next: desecrate_altar / conjoined_pits. Cadence @#1235.

## 2026-07-22 00:09 — #1229 D-0959 destroy_drawbridge

- Objective: map-driven — retire dig `destroy_drawbridge` under fortress.
- C locus: `dbridge.c` `is_drawbridge_wall`/`find_drawbridge`/
  `get_wall_for_db`/`destroy_drawbridge`; callers `dig.c`
  `furniture_handled`/`dighole`.
- Change: new `js/dbridge.js` terrain+message+wake+trap/engr+vision;
  wire dig furniture + dighole (D-0959). Deferred: crush/entity;
  revive_nasty; iron-chain scatter; desecrate_altar; impact_drop;
  mkcavearea; conjoined_pits; autodig; boulder-fill.
- Verification: green+strict PASS; dig/shared cohort 16/16 PASS.
  Suite fortress held (no full cadence; next @#1230).
- Next: desecrate_altar / impact_drop / mkcavearea / conjoined_pits.

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

## 2026-07-21 23:53 — #1225 cadence score refresh

- Objective: mandatory cadence full `sessions` (@#1225 % 5 == 0);
  refresh `CURRENT.md` Score. Map-driven port deferred to next iter.
- Change: docs only — Score **44**/44 Scr **11405**/11405 RNG **100%**
  speed `32+0.26/turn` (R² 0.871). Green+strict PASS preflight.
- Verification: green+strict; full `sessions` 44/44.
- Next: Ring_gone / float_up / rescham / choke(strangle); dig
  destroy_drawbridge / desecrate_altar / shopdig / grave; ice melt /
  burn_floor_objects. Cadence @#1230.

## 2026-07-21 23:51 — #1224 D-0955 unturn_dead + hero_breaks + ABON

- Objective: map-driven — `unturn_dead` invent/floor revive +
  `hero_breaks` non-boulder + worn ABON `cancel_item`.
- C locus: `zap.c` `revive`/`unturn_dead`/`unturn_you`/`cancel_item`
  ABON; `dothrow.c` `breaktest`/`hero_breaks`/`breaks`; bhito/bhitm
  wire.
- Change: thin invent/minvent/floor `revive` + unturn; real breaktest
  + hero_breaks/breaks; worn ABON before spe clear (D-0955).
  Deferred: revive container/buried/cant_revive/ghost; Ring_gone
  cluster; dig destroy_drawbridge.
- Verification: green+strict; zap/shared cohort 16/16 PASS.
  Suite fortress held (no full cadence; next @#1225).
- Next: Ring_gone / float_up / rescham / choke; dig bridge/altar/
  shopdig/grave; ice melt / burn_floor_objects.

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
