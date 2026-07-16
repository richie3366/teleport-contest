# Rotated from AGENT-LOOP-JOURNAL (#606 D-0546)

## 2026-07-16 18:45 — #592 D-0532 qt_montype quest gate
- Objective: seed0373 @6811 C `rndmonst_adj` `rn2(7)` vs JS `rn2(3)`.
- C locus: `makemon.c` `rndmonst_adj`; `questpgr.c` `qt_montype`;
  `role.c` `roles[]` enemy1/2.
- Change: port `qt_montype` + quest `rn2(7)` gate; wire `enemy*`
  onto all roles → `game.urole`.
- Verification: seed0373 **6811→9839** (RNG **9872**, Scr 22/124);
  green+strict; cohort **30**/30; seed0116 RNG full Scr 110/127.
- Next: @9839 `attach_egg_hatch_timeout`; or seed5006 dosounds @8468.
## 2026-07-16 18:40 — #591 D-0531 on_locate + Bar-fila
- Objective: seed0373 @5497 nhlib shuffle vs Medusa `rn2(5)`.
- C locus: `quest.c` `on_locate`; `mklev.c` In_quest fill;
  `dat/Bar-fila.lua`/`Bar-filb.lua`; `sp_lev.c` `reset_xystart_size`.
- Change: port `on_locate`+Bar locate texts; `makelevel` → `Bar-fila`
  for `^V2` quest dlevel 2; reset splev bounds at load_special start.
- Verification: seed0373 **5497→6811** (RNG **6849**, Scr 22/124);
  green+strict; cohort **30**/30; seed0116 RNG full Scr 110/127.
- Next: @6811 `rndmonst_adj`/`qt_montype`; or seed5006 dosounds @8468.
