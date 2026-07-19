## 2026-07-19 10:37 — #855 medusa-3 + mk_artifact (D-0759) + score
- Objective: mandatory full `sessions` score; seed0360 @55374 medusa-3.
- C locus: `dat/medusa-3.lua` / `artifact.c` `mk_artifact` A_NONE.
- Change: `load_medusa_3` + dispatch; `mk_artifact` eligible/`rn2(n)` wired
  from `mksobj_init` artif gates (weapon+armor).
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **55374→60114**; RNG **55383→60117**; Scr **261→265**. Full suite
  **37/44**, Scr **8270**/11405, RNG **590719**/792838 (74.51%),
  speed `36+0.20/turn`.
- Next: @60114 C `bigrm-4` (`makemaz` `rnd(13)=4`) nhlib shuffle vs JS
  `rn2(79)`.
