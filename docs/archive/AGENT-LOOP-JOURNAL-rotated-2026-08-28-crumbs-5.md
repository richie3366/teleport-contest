# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-28 — D-1577 worm.c redraw_worm

**Objective:** Open `worm.c` `redraw_worm` (named). Not cutworm.
**C locus:** `worm.c` `redraw_worm` `:989–998`; callers `dog.c`
`tamedog` `:1275–1276`, `abuse_dog` `:1386–1390`.
**JS locus:** named omit after D-1570; `see_wsegs` skips dummy.
**Change:** live walker including dummy; wire tamedog/abuse_dog.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **20**/20; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open force_invmenu `*`/`?` redo. Not hands/xtra.
**Blocked:** none.

## 2026-08-28 — D-1576 region.c add_region per-cell block/unblock

**Objective:** Must-fix review **535** `add_region` /
`remove_region` / `expire_gas_cloud` per-cell `block_point` /
`unblock_point`. Not `redraw_worm`. Not revert D-1574.
**C locus:** `region.c` `add_region` `:326–328`; `remove_region`
`:361–385`; `expire_gas_cloud` `:1071–1072`.
**JS locus:** one-corner `recalc` after D-1574; expire pass 1 empty.
**Change:** live `add_region`; per-cell `block_point` /
`unblock_point` + two-pass `newsym`. Rule #2: no fs.
**Score:** full `sessions` **44**/44 Scr **11,405**/11,405 RNG
**792,838**/792,838 `41+0.30/turn` (R² 0.86). seed4500 recovered.
**Verified:** canary **20**/20; seed4500; green+strict; cohort
**7**/7 + strict; full `sessions`.
**Next:** Open `redraw_worm`. Not cutworm.
**Blocked:** none.

## 2026-08-28 — review D-1567–D-1575 (audit #1970)

**Objective:** C-fidelity review of nine `js/` SHAs since **527**;
cadence score. No `js/` edits.
**C locus:** pickup `'r'`; getobj NOFLAGS; pickinv hands;
cutworm; xray IN_SIGHT; egg timers; `newcham` cancel;
`unblock_point`/`dig_point`; MAIL `mk_gen_ok` / `msummon`.
**JS locus:** reviews **528–536** (`b2827fe2`…`d13bf416`).
**Change:** ACCEPT-WITH-DEBT 528–534, 536. **QUALITY-RISK 535**
(`1ba35e31`): region still one-corner `recalc` after D-1574
retired the `vision_reset` stub. Must-fix prepended. Filled
archive D-1575 `%h`.
**Score:** **43**/44 Scr **10,649**/11,405 RNG **773,053**/792,838
`39+0.30/turn` (R² 0.854) at `d13bf416`. seed4500 FAIL first
at `1ba35e31`; `423b6b29` still PASS.
**Verified:** cadence `__RESULTS_JSON__`; worktree seed4500
bisect; `check-hot-docs --review 528-536`.
**Next:** Must-fix `region.c` per-cell `block_point`/`unblock_point`.
Not `redraw_worm`.
**Blocked:** none.

## 2026-08-28 — D-1575 makemon.c ndemon / mkclass_aligned MAIL

**Objective:** Open `ndemon` aligned `mkclass`. Not rndmonst_adj.
**C locus:** `makemon.c` `mk_gen_ok` `:1746–1749`; `mkclass_aligned`;
`minion.c` `ndemon` `:443–464`; `msummon` is_lminion/PM_ANGEL; `llord`.
**JS locus:** MAIL omit; msummon arms deferred.
**Change:** live MAIL reject; `llord`; msummon is_lminion/PM_ANGEL;
export `is_lminion`. show_transient_light named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `redraw_worm`. Not cutworm.

## 2026-08-28 — D-1574 vision.c unblock_point / dig_point

**Objective:** Open `unblock_point`/`dig_point`. Not block_point.
**C locus:** `vision.c` `unblock_point` `:898–907`; `dig_point`
`:967–1048`; `recalc_block_point` `:910–917`; `seemimic` `:4415–4424`.
**JS locus:** `recalc` was full `vision_reset`; seemimic skipped unblock.
**Change:** live `dig_point` + `unblock_point`; C `recalc_block_point`;
`seemimic` capture-then-unblock. `has_mcorpsenm` / mimic_light_blocking
See_invisible / nv_range named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **29**/29; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `ndemon` aligned `mkclass`. Not rndmonst_adj.

## 2026-08-28 — D-1573 mon.c newcham Protection cancel / wormgone

**Objective:** Open `newcham` Protection cancel. Not set_mimic_sym
early-out.
**C locus:** `mon.c` `newcham` `:5276–5535`; `worm.c` `wormgone`
`:307–332`; youprop H||E uprops.
**JS locus:** rider/`mbirth_limit` live; cancel deferred.
**Change:** live uncancel + vampire cham; rogue `tryct>15`;
`set_mon_data`; `wormgone`+place_monster; light/`pm_invisible`/
hideunder; long-worm init; `check_gear_next_turn`. NC_SHOW_MSG /
`m_unleash` / ustuck / break-armor / Elbereth named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict; seed0013-rogue / seed0398 / seed4500.
**Next:** Open `unblock_point`/`dig_point`. Not block_point.
