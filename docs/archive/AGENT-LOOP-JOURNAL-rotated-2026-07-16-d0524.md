## 2026-07-16 16:17 — #568 D-0510 wizgenesis create_particular
- Objective: seed0398 @2960 C collect_coords rn2(8) vs JS rnl(20)
- C: `wizcmds.c` wiz_genesis → `read.c` create_particular →
  makemon(MM_NOEXCLAM) → enexto/collect_coords
- Fix: EXT_CMDS `#wizgenesis` + `create_particular` named path;
  `^G` wired. Missing runner made `jackal` keys hit apply/rnl(20).
- Verify: seed0398 RNG **2960→3026**/3026 full; Scr still 0/87;
  green+strict PASS; cohort **29/29** PASS
- Next: seed0398 first-cell screen peel

## 2026-07-16 16:12 — #567 D-0509 IMMEDIATE poly bhit
- Objective: seed0398 @2852 C weffects rn2(8) vs JS rn2(5)
- C: `zap.c` IMMEDIATE `bhit(rn1(8,6))` + `bhito` WAN_POLYMORPH;
  `learnwand`→`makeknown`→`exercise` on seen shudder
- Fix: `js/zap.js` bhit/bhito/poly_obj; learnwand→makeknown;
  `js/mkobj.js` replace_object floor + oc_merge_of export
- Verify: seed0398 RNG **2853→2960**/3026 (prefix 2852→2960);
  green+strict PASS; cohort **27/27** PASS
- Next: @2960 C `collect_coords` rn2(8) vs JS rnl(20)
