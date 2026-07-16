# Archived journal crumbs

## 2026-07-16 16:42 — #573 D-0516 zap_dig WAN_DIGGING
- Objective: seed0116 @5910 C `zap_dig` rn1(18,8) vs JS rn2(5).
- C locus: `zap.c` `weffects`; `dig.c` `zap_dig`.
- Change: `zap_dig` horizontal beam + door/maze/obstructed dig;
  `weffects` dig dispatch.
- Verification: seed0116 **5910→6246** Scr **79→101**/127;
  green+strict; cohort **30/30**. seed5006 still @8468.
- Next: seed0116 @6246 moveloop / seed5006 `dosounds` /
  seed0373 `print_dungeon`.

## 2026-07-16 16:40 — #572 D-0515 ^V level_tele numeric
- Objective: near-miss survey — shared getbones blockers.
- C locus: `cmd.c` wizlevelport; `wizcmds.c` `wiz_level_tele`;
  `teleport.c` `level_tele`; `dungeon.c` `get_level`; `allmain.c`
  `deferred_goto` after rhack.
- Change: bind `^V`; wizard getlin numeric → `get_level` →
  `schedule_goto`; moveloop `deferred_goto`.
- Verification: seed0116 **2978→5910** Scr **9→79**; seed5006
  **4182→8468** Scr **4→121**; green+strict; cohort **28/28**.
  seed0373 still @2549 (`print_dungeon` `?`). Suite survey **30/44**.
- Next: seed0116 `zap_dig` / seed5006 `dosounds` / seed0373 menu.
