# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-28 — D-1572 timeout.c attach_egg_hatch_timeout / obj_split_timers

**Objective:** Open `attach_egg_hatch_timeout`. Not Plan-B.
**C locus:** `timeout.c` `attach_egg_hatch_timeout` `:980–1005`;
`obj_split_timers` `:2358–2370`; `splitobj` `:498–499`;
`poly_obj` `:1756–1779`; `hatch_egg` remainder/`is_pool(mon)` /
`learn_egg_type`.
**JS locus:** attach live (D-0533); splitobj timers deferred;
poly_obj skipped hero eggs; hatch `is_pool(carrier)`.
**Change:** live `obj_split_timers` + splitobj; poly_obj
hero-egg `kill_egg`/`set_corpsenm` `rn2(NUMMONS)`; hatch
hatchling pool + `update_inventory` + `impossible`. SetVoice
named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `newcham` Protection cancel. Not set_mimic_sym
early-out.
## 2026-08-28 — D-1571 vision.c vision_recalc xray IN_SIGHT

**Objective:** Open `vision_recalc` xray IN_SIGHT. Not howmonseen.
**C locus:** `vision.c` `vision_recalc` `:631–668`; `circle_ptr`
`vision.h:62`; setter Eyes D-1558.
**JS locus:** `js/vision.js` after view_from; no xray circle.
**Change:** live `circle_ptr` + `apply_xray_in_sight` (SVALL +
newsym before lights). nv_range / pit / underwater named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `attach_egg_hatch_timeout`. Not Plan-B.
## 2026-08-28 — D-1570 worm.c cutworm / place_wsegs


**Objective:** Open `cutworm`. Not worm_known.
**C locus:** `worm.c` `cutworm` `:372–477`; `place_wsegs` `:614–635`;
callers `known_hitum` `:641–642`, `thitmonst` `:2206–2207`.
**JS locus:** missing; thitmonst `void chopper`.
**Change:** live cutworm + place_wsegs; wire melee/throw; export
`s_suffix`. redraw_worm / wormgone named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `vision_recalc` xray IN_SIGHT. Not howmonseen.
## 2026-08-28 — D-1569 invent.c pickinv hands/xtra_choice

**Objective:** Open pickinv hands/xtra_choice. Not `&ctmp`.
**C locus:** `invent.c` `display_pickinv` `:3056–3417` usextra;
`getobj_hands_txt` `:1718–1736`; getobj `:1976–1988`.
**JS locus:** `display_pickinv_reply` after D-1559; no extra `'-'`.
**Change:** usextra n-bump + n==1 `message_menu` + Miscellaneous
row; `getobj_hands_txt`; live getobj + wield/ready/grease/dip_ok.
force_invmenu redo / mime_action / gacc named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **28**/28; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `cutworm`. Not worm_known. Do not skip D-1531…D-1569.
## 2026-08-28 — D-1568 invent.c getobj eat/read/zap/tin NOFLAGS

**Objective:** Open eat/read/zap/tin getobj NOFLAGS. Not ALLOWCNT.
**C locus:** `invent.c` `getobj` `:1751–2089`; eat_ok/tin_ok
NOFLAGS; read_ok GETOBJ_PROMPT; zap_ok NOFLAGS.
**JS locus:** clones after D-1561/D-1563.
**Change:** live `getobj`; eat/read/zap/tinopen callers; eat_ok
+ `getobj_else`. pickinv hands named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict (seed1800 eat, seed2200 zap-read).
**Next:** Open pickinv hands/xtra_choice. Not `&ctmp`.
**Blocked:** none.
## 2026-08-28 — D-1567 pickup.c use_container 'r' reversed

**Objective:** Open `'r'` reversed put-in then take-out. Not stash.
**C locus:** `pickup.c` `use_container` `:3132–3210`; yn_function
`:3097–3115`; `explain_container_prompt` `:2910–2940`.
**JS locus:** `js/pickup.js` (`'r'` ignored after D-1561).
**Change:** `loot_in_first`; put-in then take-out; mbag-null
gate; TRADITIONAL yn `rs` + `'?'` help. traditional_loot /
more_containers `n` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open eat/read/zap/tin NOFLAGS. Not ALLOWCNT.
**Blocked:** none.
