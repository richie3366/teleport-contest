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

## 2026-07-21 23:05 — #1217 D-0949 explode pay + do_break_wand

- Objective: map-driven — `explode` `zap_over_floor`/`pay_for_damage`
  + `do_break_wand` explode-type / inert envelope.
- C locus: `explode.c` `explode`; `apply.c` `do_break_wand`/
  `broken_wand_explode`; `zap.c` `zap_over_floor`.
- Change: olet/adtyp preamble + floor shop bill in `explode.js`;
  export `zap_over_floor`; `doapply` → break-wand (D-0949). Deferred:
  non-PHYS mon/hero dmg; dig/create adjacent pay; pickaxe dig;
  pool-lava/`vault_gd_watching`.
- Verification: green+strict; wizard/zap/shop cohort 12/12 PASS.
  Suite fortress held (no full cadence; next @#1220).
- Next: break-wand dig pay / pickaxe `dig`/`is_digging` / pool-lava.

## 2026-07-21 22:59 — #1216 D-0948 zap_over_floor shop door/bars

- Objective: map-driven — retire `zap_over_floor` closed-door/SDOOR/
  IRONBARS shopdamage + `dobuzz` `pay_for_damage`.
- C locus: `zap.c` `zap_over_floor`/`dobuzz`; `lock.c` `picking_at`.
- Change: door destroy by damgtype, bars dissolve + shop bill, SDOOR
  reveal, trailing pay strings (D-0948). Deferred: ice/fountain/WEB/
  POOL→PIT; burn_floor_objects; explode/apply pay; pickaxe dig.
- Verification: green+strict; zap/shop cohort 12/12; seed0116/0398/
  0108 PASS. Suite fortress held (no full cadence; next @#1220).
- Next: explode/apply break-wand pay / dig occupation `is_digging`.

## 2026-07-21 22:56 — #1215 cadence score + D-0947 kick_door shop/watch

- Objective: cadence full `sessions` @#1215 + map-driven
  `kick_door` shop/`pay_for_damage` + town watch.
- C locus: `dokick.c` `kick_door`/`watchman_thief_arrest`/
  `watchman_door_damage`; `shk.c` `add_damage`/`pay_for_damage`.
- Change: wire shopdoor `in_rooms` + bill + town arrest/warn (D-0947).
  Deferred: Blind feel_location; mon_yells polish; explode/apply/
  dig-occupation pay sites; pickaxe `is_digging`.
- Verification: full sessions **44**/44 Scr **11405**/11405 RNG
  **100%** speed `31+0.29/turn`; green+strict; kick/shop cohort 12/12.
- Next: explode/apply `pay_for_damage` / `is_digging`. Cadence @#1220.

## 2026-07-21 22:55 — #1214 D-0946 eatspecial PAPER/potion/ring

- Objective: map-driven — retire `eatspecial` PAPER/potion/ring/amulet
  + leash/trident/flint/`uwepgone`/`unpunish`.
- C locus: `eat.c` `eatspecial`/`eataccessory`/`bounded_increase`;
  `wield.c` uwepgone*; `read.c` `unpunish`; `apply.c` `o_unleash`.
- Change: port remaining `eatspecial` body + `eataccessory`; wire
  helpers (D-0946). Deferred: vault_gd; Ring_gone sink; float_up;
  rescham; choke(strangle); set_mimic_blocking.
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: dig `pay_for_damage` sites / pickaxe `is_digging`. Cadence
  @#1215.

## 2026-07-21 22:47 — #1213 D-0945 cpostfx were/mimic/attrcurse

- Objective: map-driven — retire remaining `cpostfx` were*/mimic/`attrcurse`.
- C locus: `eat.c` `cpostfx`/`eatmdone`; `were.c` `set_ulycn`; `sit.c` `attrcurse`.
- Change: port `set_ulycn`/`attrcurse`/`eatmdone`; wire were*/mimic/
  disenchanter in `cpostfx` (D-0945). Deferred: `retouch_equipment`,
  `set_mimic_blocking`, eatspecial PAPER+.
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: eatspecial PAPER/potion/ring; dig `pay_for_damage` sites /
  pickaxe `is_digging`. Cadence @#1215.
