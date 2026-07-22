# Rotated from AGENT-LOOP-JOURNAL.md @#1252

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
