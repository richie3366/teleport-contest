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

