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

## 2026-07-22 01:42 — #1246 D-0976 dosinkfall

**Objective:** map-driven — retire sink-fall (`dosinkfall`) from
CURRENT next cluster / debt.
**Changed:** port `hack.c dosinkfall`; wire `spoteffects` IS_SINK+Lev;
`ELevitation` confer mirror; export `stop_donning`/`Ring_off`/`off_msg`
(D-0976). Docs: CURRENT/NOTES/debt/turns/divergence/journal.
**Verified:** green+strict PASS; move/wear cohort **36**/37
(seed0009 Scr FAIL pre-existing). Rule #2: no fs.
**Next:** passtune/drawbridge; ignite_items / burn_away_slime.
**Blocked:** none.

## 2026-07-22 01:33 — #1245 cadence + D-0975 lavawall/burn

**Objective:** mandatory full `sessions` score @#1245; map-driven
retire lavawall spines + burn feedback (CURRENT next cluster).
**Score:** **43**/44 Scr **11404**/11405 RNG **792838**/792838
(100%) speed `31+0.26/turn`. Non-PASS: seed0009 Scr 72/73 (HEAD).
**Changed:** export `fix_wall_spines`; zap lavawall freeze call;
async `burn_floor_objects` give_feedback; fire-trap burn/melt wire
(D-0975). Docs: CURRENT/NOTES/debt/turns/divergence/journal.
**Verified:** green+strict PASS; zap/trap cohort **24**/24. Rule #2:
no fs.
**Next:** sink-fall `dosinkfall`; passtune/drawbridge; ignite_items.
**Blocked:** none.

## 2026-07-22 01:28 — #1244 D-0974 music flute/harp/horn

**Objective:** map-driven — retire flute/harp/horn + BUGLE soldiers
under fortress (CURRENT next cluster after D-0973).
**Changed:** `js/music.js` put_monsters_to_sleep/charm_snakes/
calm_nymphs/charm_monsters/awaken_soldiers + improvisation arms;
`js/zap.js` export ubuzz/flash_str + zapyourself FIRE/FROST/WAN_FIRE/
WAN_COLD. Docs: D-0974, debt/turns, CURRENT/NOTES.
**Verified:** green+strict PASS; apply cohort 35/36 (seed0009
pre-existing Scr 72/73). Rule #2: no fs.
**Next:** sink-fall death; lavawall spines/burn plines; passtune.
**Blocked:** none.

## 2026-07-22 01:20 — #1243 D-0973 explode MAGM/DISN/DRST/ACID

- Objective: map-driven zap debt — MAGM/DISN/DRST/ACID explode combat
  after D-0971 COLD/ELEC.
- C locus: `explode.c` `explosionmask` / `explode` combat /
  `mon_explodes` / `adtyp_to_expltype`.
- Change: port Antimagic/Disint/Poison/Acid (+ DISN WAND
  nonliving/demon/vamp) masks; thin `resists_magm`; open `combat_ok`
  MAGM..ACID; `mon_explodes` AD_MAGM..AD_SPC2 (D-0973). Deferred:
  lavawall/burn plines; engulfer msg; worn ANTIMAGIC scan; hallu/
  sparkle/golem/ignite.
- Verification: green+strict PASS; zap/shared cohort **24**/24 PASS.
- Next: sink-fall; lavawall/burn; flute/harp/horn. Cadence @**#1245**.

## 2026-07-22 01:15 — #1242 D-0972 music do_earthquake/do_pit

- Objective: map-driven music debt — `DRUM_OF_EARTHQUAKE` after
  leather-drum awaken (D-0454).
- C locus: `music.c` `do_pit` / `do_earthquake` / `generic_lvl_desc` /
  `do_improvisation` DRUM_OF_EARTHQUAKE arm.
- Change: port pit/quake + wire drum charge/`makeknown`/
  `awaken_monsters(ROWNO*COLNO)`; altar → `desecrate_altar`; PIT
  IS_ROOM→ROOM morph in `do_pit` only (D-0972). Deferred: passtune;
  flute/harp/horn; selftouch; full flooreffects; shared maketrap morph.
- Verification: green+strict PASS; apply/shared cohort 36/36 PASS
  (seed0002 drummer). seed0009 Scr FAIL pre-exists on clean HEAD.
- Next: sink-fall; lavawall/burn; MAGM/DISN/DRST/ACID explode.
  Cadence @**#1245**.

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

## 2026-07-22 00:59 — #1240 cadence + D-0970 toggle_stealth

- Objective: mandatory cadence full `sessions` (@#1240 % 5 == 0);
  map-driven wear debt — `toggle_stealth` after D-0966 Ring_on.
- C locus: `do_wear.c` `toggle_stealth` + Ring/Boots/Cloak on/off;
  `worn.c` STEALTH extrinsic mirror.
- Change: `toggle_stealth`; wire RIN_STEALTH + ELVEN cloak/boots
  on+off; Cloak_off displacement off; `EStealth` in `confer_oc_oprop`
  (D-0970). Deferred: sink-fall; Boots_off SPEED/water/lev; music
  `do_earthquake`/`do_pit`.
- Verification: green+strict PASS; wear/steed cohort 20/20 PASS; full
  `sessions` **44**/44 Scr **11405**/11405 RNG **100%** speed
  `31+0.26/turn`.
- Next: music `do_earthquake`/`do_pit` altar desecrate; sink-fall;
  lavawall / AD_COLD/ELEC explode. Cadence @**#1245**.

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

