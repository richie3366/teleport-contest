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

## 2026-07-21 23:41 — #1222 D-0953 pool-lava + vault_gd_watching

- Objective: map-driven — `floorfood` pool/lava reach gate +
  `vault_gd_watching(GD_EATGOLD)` + gd_move witness verbalize.
- C locus: `eat.c` `floorfood` / `eatspecial`; `vault.c`
  `vault_gd_watching` / `gd_move` witness.
- Change: skipfloor Wwalking/clinger/(Flying&&!Breathless) in
  `eat.js`; export `vault_gd_watching` + consume/destroy pline in
  `vault.js`; wire coin eatspecial (D-0953). Deferred: dig
  furniture_handled / HOLE goto_level; unturn/hero_breaks/ABON;
  Ring_gone/float_up/rescham/choke.
- Verification: green+strict; eat/vault/pool cohort 14/14 PASS
  (incl. seed0012 vault escort, seed0009 swimmer, seed1800 eat).
  Suite fortress held (no full cadence; next @#1225).
- Next: dig `furniture_handled` / HOLE `goto_level`; unturn/
  hero_breaks / worn ABON; Ring_gone cluster.

## 2026-07-21 23:36 — #1221 D-0952 break-wand adjacent bhit

- Objective: map-driven — strike/cancel/poly/tele/undead adjacent
  `bhitm`/`bhitpile`/`zapyourself` + `WAN_LIGHT` `litroom`.
- C locus: `apply.c` `do_break_wand`; `zap.c` `bhitm`/`bhito`/
  `zapyourself`/`cancel_item`/`cancel_monst`; `teleport.c`
  `u_teleport_mon`/`rloco`; `read.c` `litroom`.
- Change: cancel helpers + `bhitm` subset + zapyourself/bhito arms in
  `zap.js`; adjacent loop + litroom in `apply.js`; thin tele/rloco;
  export `litroom` (D-0952). Deferred: unturn invent revive;
  hero_breaks; worn ABON cancel; flash_hits WAN_LIGHT bhitm.
- Verification: green+strict; wizard/shared cohort 14/14 PASS.
  Suite fortress held (no full cadence; next @#1225).
- Next: pool-lava / `vault_gd_watching` / furniture_handled /
  HOLE `goto_level`.

## 2026-07-21 23:30 — #1220 cadence score refresh

- Objective: mandatory cadence full `sessions` (@#1220 % 5 == 0);
  refresh `CURRENT.md` Score. Map-driven port deferred (next: break-
  wand `bhitm` cluster needs `zap.c` `bhitm` — explode-only stub
  insufficient).
- Change: docs only — Score **44**/44 Scr **11405**/11405 RNG **100%**
  speed `30+0.27/turn` (R² 0.872). Green+strict PASS preflight.
  Restored missing #1219 journal crumb into live file; rotated
  #1210–#1206 to archive.
- Verification: green+strict; full `sessions` 44/44.
- Next: break-wand strike/cancel/poly/tele/undead `bhitm`/`bhitpile`/
  `zapyourself`; pool-lava / `vault_gd_watching`. Cadence @#1225.

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

