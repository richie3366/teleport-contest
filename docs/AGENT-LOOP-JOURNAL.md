# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-28 — D-1584 mplayer.c mk_mplayer

**Objective:** Open `makemon.c` `mk_mplayer` (named).
Not ndemon.
**C locus:** `mplayer.c` `mk_mplayer` `:117–317`;
`dev_name`/`get_mplname`/`mk_mplayer_armor`;
`sp_lev.c` `:1985–1986`.
**JS locus:** named omit after D-1553; no `js/mplayer.js`.
**Change:** live `mk_mplayer` + splev RANDOM role-id;
export `rnd_*_item`; `monmightthrowwep`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open FULL_MOON S_DOG. Not `mk_mplayer`.
**Blocked:** none.
## 2026-08-28 — D-1583 vision.c nv_range circle

**Objective:** Open `vision.c` `nv_range` circle (named).
Not unblock_point.
**C locus:** `vision.c` `vision_recalc` `:670–700`;
`u_init_misc` nv_range=1; `circle_ptr`.
**JS locus:** 3×3 lighting-loop stand-in after D-1571.
**Change:** `apply_nv_range_in_sight` after xray; drop 3×3.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **28**/28; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `mk_mplayer`. Not nv_range.
**Blocked:** none.
## 2026-08-28 — D-1582 cmd.c PREFIXCMD / cmdq_shift

**Objective:** Open `cmd.c` PREFIXCMD / `cmdq_shift` (named).
Not do_repeat.
**C locus:** `cmd.c` PREFIXCMD `:3762–3774`; `cmdq_shift`
`:354–370`; doextcmd `:3753–3760`.
**JS locus:** named omit after D-1563/D-1186; g/G returned;
REPEAT replace; no shift.
**Change:** `got_prefix_input` loop; REPEAT append; ext_tlist
shift. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open nv_range circle. Not PREFIXCMD.
**Blocked:** none.
## 2026-08-28 — D-1581 pickup.c traditional_loot / invent.c askchain

**Objective:** Open `pickup.c` traditional_loot askchain (named).
Not `'r'` reversed.
**C locus:** `pickup.c` `traditional_loot` `:3229–3261`;
`query_classes` `:140–262`; `invent.c` `askchain` `:2376–2541`.
**JS locus:** named omit after D-1567; MENU_FULL `menu_loot_*`.
**Change:** live query_classes + askchain; TRADITIONAL take-out /
put-in; INVLET sortloot; yn `#`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open PREFIXCMD / `cmdq_shift`. Not nv_range.
**Blocked:** none.
## 2026-08-28 — D-1580 invent.c gacc / BALL `'0'`

**Objective:** Open `invent.c` gacc / `'0'` ball class (named).
Not mime_action.
**C locus:** `invent.c` `display_pickinv` `:3323–3325`;
`let_to_name` `:4799–4839`; `drawing.c` `def_oc_syms`;
`wintty.c` `process_menu_window` gacc collect + `'0'` vs count.
**JS locus:** named omit after D-1579; digits always counted.
**Change:** live `def_oc_syms` + collect/take gacc; getobj
want_reply stays gacc 0. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open traditional_loot askchain. Not `'r'` reversed.
**Blocked:** none.
## 2026-08-28 — D-1579 invent.c mime_action

**Objective:** Open `invent.c` mime_action (named). Not force_invmenu.
**C locus:** `invent.c` `mime_action` `:1677–1706`; `getobj`
`:1946–1949`; `hacklib.c` `ing_suffix` `:362–396`.
**JS locus:** named omit after D-1578; typed `'-'` returned null.
**Change:** live mime + getobj/getobj_adjust typed hands; canonical
`ing_suffix` (clones retired). Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **20**/20; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open gacc / `'0'` ball class. Not traditional_loot.
**Blocked:** none.
## 2026-08-28 — D-1578 invent.c force_invmenu `*`/`?` redo

**Objective:** Open `invent.c` force_invmenu `*`/`?` redo (named).
Not hands/xtra.
**C locus:** `invent.c` `getobj` `:1923–2001`; `display_pickinv`
`:3345–3366`.
**JS locus:** named omit after D-1569; n==1 already skipped
message_menu when force.
**Change:** Special `*`/`?` rows + query; getobj auto `?`/`*`
oneloop; redo_menu in `getobj_display_pickinv`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **21**/21; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open mime_action. Not gacc.
**Blocked:** none.
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
