# Rotated from AGENT-LOOP-JOURNAL.md after D-1046 / #1315

## 2026-08-15 19:50 — D-1038 shared getdir + hurtle_step

**Objective:** Keep’d D-1022 C-wrongs — real `getdir`, not `getdir_whip`;
`hurtle` via `hurtle_step` not `teleds`.
**C locus:** `cmd.c` `getdir`; `dothrow.c` `hurtle` / `hurtle_step`;
`apply.c` `use_whip` / `use_grapple`.
**Change:** `lock.js` getdir cmdq DIR/KEY, `.`/`s`, `<>`, movecmd
walk/run/rush, optional numpad, `^R` retry. No trailing confdir (whip
already confdirs). Apply deletes getdir_whip/self_ok/fig. `dothrow.js`
hurtle: tug / typed trap-anchor / nomul(-range) / wall·mon stop /
u_on_newpos. Throw path still `getdir_cmdassist`. Docs/reviews
`loop-2026-08-15/` rewritten in English.
**Score:** full `sessions` **44**/44 Scr **11405**/11405 RNG **100%**
speed `34+0.29/turn` (R² 0.854). Cadence still **#1305**; next @**#1310**.
**Verified:** green+strict PASS; 44/44.
**Next:** `dosit` `else if (trap)` before IS_THRONE (D-1033), then tut-1.
**Blocked:** none.

## 2026-08-15 19:15 — D-1037 save_timers RANGE_LEVEL + hatch dispatch

**Objective:** map-driven egg where/timer parity then wire HATCH_EGG
(CURRENT after D-1036 dropped dispatch).
**C locus:** `timeout.c` save_timers/restore_timers/timer_is_local/
obj_is_local/mon_is_local; `invent.c` merged obj_stop_timers;
`zap.c` get_obj_location.
**Change:** peel RANGE_LEVEL timers into level_info on goto_level
leave; restore on getlev; merged stops absorbed timers; get_obj_location
no invent-default; carried is where==INVENT; run_timers → hatch_egg.
Dump: off-level shop/minefill eggs DROP on_fobj=0. Rule #2: no fs.
**Score:** full `sessions` **44**/44 Scr **11405**/11405 RNG **100%**
speed `33+0.28/turn` (R² 0.869). Cadence still **#1305**; next @**#1310**.
**Verified:** green+strict PASS; seed0014/4500 PASS **with** dispatch
(was 42/44 without peel).
**Next:** remaining tut-1 des / nhcore disable.
**Blocked:** none.
