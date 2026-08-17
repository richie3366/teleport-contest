# Rotated from AGENT-LOOP-JOURNAL.md after #1480 review D-1161–D-1164

## 2026-08-17 12:05 — #1465 review D-1149–D-1152 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `mon.c` `mongone` 3267–3282 / `mkobj.c`
`discard_minvent` 2525–2536 / `steal.c` `mdrop_special_objs`
852–870; `hack.c` `domove` 2964–2973 / `invocation_message`
3064–3085; `hack.c` `classify_terrain` 3090–3172 /
`switch_terrain` 3215–3216; `teleport.c` `rloc_to_core`
1700–1701 / `mon.c` `maybe_unhide_at` 4698–4719.
**Change:** reviews **110** ACCEPT D-1149 (unstuck +
`mdrop_special_objs` + discard; `m_detach`/`isgd`/`mongrantswish`
named), **111** ACCEPT D-1150 (walk call after `vision_recalc(1)`;
callee D-1141; `inv_pos` named), **112** ACCEPT D-1151 (lastseentyp
remap + `flags.terrainstatus` bag; botl paint / lastseentyp
under-typ named), **113** ACCEPT D-1152 (dest unhide before
`newsym`; youmonst arm named). Must-fix empty. Filled D-1152
archive hash `9b5ce7b3`. Rotated #1450. Open 12 (no refill).
Rule #2: no fs.
**Score:** cadence **#1465** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `33+0.27/turn` (R² 0.87). Next
@**#1470**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `vault_tele` `tele()` fallback
(named). Not teleds.
**Blocked:** none.
