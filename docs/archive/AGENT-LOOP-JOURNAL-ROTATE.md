# Journal archive

## 2026-07-16 20:18 — #610 score + D-0550 fire load_special
- Objective: mandatory #610 full `sessions` score; peel seed0373 @30065
  endgame plane `load_special`.
- C locus: `dat/fire.lua`; `sp_lev.c` `load_special`; `dungeon.c`
  `level_difficulty` In_endgame; `mkmaze.c` `mkportal`/`fumaroles`.
- Change: `js/mklev.js` `load_fire` + portal/fumaroles/lregion flip;
  `js/hacklib.js` endgame difficulty; `js/do.js` arrival fumaroles.
- Verification: **#610** 30/44 Scr **5901**/11405 RNG **348403**/792838
  (43.94%) `31+0.14/turn`; seed0373 **30065→30209** RNG 30222; green+
  strict PASS.
- Next: red dragon makemon female vs newmonhp @30209; or dosounds @8468.

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
