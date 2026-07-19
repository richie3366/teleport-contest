# Rotated

## 2026-07-19 — #806 polymon breath tip + dobreathe (D-0725)
- Objective: seed0108 remaining screens after D-0724 Fly (@110 More).
- C locus: `polyself.c` polymon verbose tips; `dobreathe`; `cmd.c`
  `domonability` `can_breathe`.
- Change: breath tip after encumber; dobreathe Strangled/uen<15 (D-0725).
- Verification: green+strict PASS; seed0108 Scr **280→283** RNG FULL;
  prefix **110→176**; cohort 33/33 PASS.
- Next: @176 nohands chest; or #untrap; newman "new man".

## 2026-07-19 — #807 doloot nohands + #untrap + newman (D-0726)
- Objective: seed0108 @176 nohands chest / #untrap / newman wording.
- C locus: `pickup.c` `doloot`/`u_handsy`; `trap.c` `could_untrap`;
  `polyself.c` `newman` + `role.c` `individual`.
- Change: nohands loot gate; EXT_CMDS `#untrap`; human `individual.m`
  → "new man" (D-0726).
- Verification: green+strict PASS; seed0108 Scr **283→287** RNG FULL;
  prefix **176→216**; cohort 33/33 PASS.
- Next: @216 locked `#loot` yy → C `In what direction?`; doforce ynq `(q)`.
