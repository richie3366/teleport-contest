# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-28 — D-1600 invent.c perm_invent InvInUse

**Objective:** Open `invent.c` perm_invent InvInUse (named). Not
inuse_only.
**C locus:** `invent.c` `prepare_perminvent` `:5548–5562`;
`display_pickinv` `:3108–3113` WIN_INVEN `InvInUse` /
`InvShowGold`; `:3277–3280` `"In use"`; `sync_perminvent`
`:5653–5656` `display_inventory(NULL,FALSE)`; `wintype.h`
InvInUse=8.
**JS locus:** named omit after D-1589 (`sync_perminvent`
early-return; inuse only via `sortloot=='i'`).
**Change:** live invmode filter; default Off still no-op.
tty paint / InvSparse / `#perminv` named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `tty_doprev_message`. Not putmsghistory.
**Blocked:** none.
## 2026-08-28 — D-1599 invent.c SORTLOOT_PETRIFY

**Objective:** Open `invent.c` SORTLOOT_PETRIFY (named). Not
inuse_only.
**C locus:** `invent.c` `sortloot` `:611–620` filter override;
`will_feel_cockatrice` `:4333–4340`; `feel_cockatrice`
`:4342–4361`; `look_here` feel arms; `pickup.c` `query_objlist`
FEEL abort `look_here(0)`.
**JS locus:** named omit after D-1589 (`sortloot` drop-filter;
look_here cockatrice deferred).
**Change:** live PETRIFY keep `touch_petrifies` CORPSE past
filterfunc; feel helpers; look_here skip/single/multi; pickup
`,` menu abort. eat/doloot/pray/engulfer named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open perm_invent InvInUse. Not SORTLOOT_PETRIFY.
**Blocked:** none.
## 2026-08-28 — D-1598 mextra.h has_mcorpsenm

**Objective:** Open `makemon.c` `has_mcorpsenm` (named). Not
set_mimic_sym. Not show_transient_light.
**C locus:** `mextra.h` `has_mcorpsenm` `:234`; `makemon.c`
`newmcorpsenm`/`freemcorpsenm` `:2368–2383`; callers seemimic,
copy_mextra, zap bhitm, wormgone, display, pager, apply.
**JS locus:** named omit after D-1525/D-1574 (pager clone;
display `!= null`; seemimic deferred).
**Change:** live helper + alloc/free; stale `NON_PM`; wired
callers. object_detect / `altarmask_at` / `clear_bypasses`
named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open SORTLOOT_PETRIFY. Not has_mcorpsenm.
**Blocked:** none.
## 2026-08-28 — D-1597 light.c show_transient_light

**Objective:** Open `makemon.c` `show_transient_light` (named). Not
ndemon. Not create_mplayers. (C is `light.c`.)
**C locus:** `light.c` `show_transient_light` `:255–324`;
`transient_light_cleanup` `:327–357`; callers zap `bhit`, apply
`do_blinding_ray`, minion `msummon`.
**JS locus:** named omit after D-1575 (`light.js` camera deferred).
**Change:** live camera range 0 + thrown lamplit `mtemplit` +
cleanup `discard_flashes`; wired three callers. Worm tails named.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `has_mcorpsenm`. Not show_transient_light.
**Blocked:** none.
## 2026-08-28 — D-1596 mplayer.c create_mplayers

**Objective:** Open `mplayer.c` `create_mplayers` (named). Not
mk_mplayer. Not has_edog.
**C locus:** `mplayer.c` `create_mplayers` `:326–353`; caller
`do.c` `final_level` `:2049` / `goto_level` `:1885`.
**JS locus:** named omit after D-1584; `goto_level` skipped Astral
`final_level` (always `resurrect` on newdungeon+amulet).
**Change:** live class/`goodpos`/tryct/`mk_mplayer`; Astral
`madeNew` `rn1(4,3), TRUE`; else-if `resurrect`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **9**/9; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `show_transient_light`. Not create_mplayers.
**Blocked:** none.
## 2026-08-28 — D-1595 dog.c tamedog initedog has_edog vs !mtame

**Objective:** Open `dog.c` tamedog `initedog` has_edog vs `!mtame`.
Not FULL_MOON. Not ustuck.
**C locus:** `dog.c` `tamedog` `:1253–1259`; `newedog` `:22–32`;
`initedog` `EDOG`; `makemon.c` MM_EDOG `:1245–1246`.
**JS locus:** `initedog(mtmp, !(mtmp.mtame))` + `mtmp.edog={}`.
**Change:** live `newedog`; `!has_edog` → `initedog(TRUE)` else
FALSE; MM_EDOG; `copy_mextra`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `create_mplayers`. Not has_edog.
**Blocked:** none.
## 2026-08-28 — D-1594 mon.c normal_shape await newcham NC_SHOW_MSG

**Objective:** Must-fix **547** — `normal_shape` await
`newcham(..., NC_SHOW_MSG)`. Not has_edog.
**C locus:** `mon.c` `normal_shape` `:4438–4443`; callers `rescham` /
`restore_cham` / zap `cancel_monst` `:3199`.
**JS locus:** dropped Promise after D-1586 (`js/mon.js:902`).
**Change:** async `normal_shape`/`rescham`/`restore_cham`; await
SHOW_MSG before `cham=NON_PM` and before clay-golem pline. Rule #2:
no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open tamedog `initedog` has_edog. Not `normal_shape`.
**Blocked:** none.
## 2026-08-28 — review D-1585–D-1593 (audit #1990)

**Objective:** C-fidelity review of nine `js/` SHAs since **545**;
cadence score. No `js/` edits.
**C locus:** tamedog FULL_MOON; newcham NC_SHOW_MSG; mimic_light_blocking;
putmsghistory; SORTLOOT_INUSE; wizid PICK_ANY; display_used_invlets;
more_containers `n`; tamedog ustuck.
**JS locus:** reviews **546–554** (`d5c9430a`…`4b34b340`).
**Change:** ACCEPT-WITH-DEBT 546, 548–554. **QUALITY-RISK 547**
(`9cdc66f5`): `normal_shape` fires `newcham(..., NC_SHOW_MSG)`
without await. Must-fix prepended. Filled archive D-1593 `%h`
`4b34b340`.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
`38+0.30/turn` (R² 0.86) at `4b34b340`. seed4500 PASS.
**Verified:** cadence `__RESULTS_JSON__`; `check-hot-docs --review 546-554`.
**Next:** Must-fix 547 `normal_shape` await. Not has_edog.
**Blocked:** none.
## 2026-08-28 — D-1593 dog.c tamedog ustuck expels/unstuck

**Objective:** Open `dog.c` tamedog ustuck expels/unstuck (named). Not
FULL_MOON.
**C locus:** `dog.c` `tamedog` `:1184–1190`; `mhitu.c` `expels`;
`mon.c` `unstuck`; `mondata.c` `sticks`.
**JS locus:** named omit after D-1585 (comment only).
**Change:** live swallow `expels` else `!(Upolyd && sticks)` `unstuck`.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open tamedog `initedog` has_edog. Not ustuck.
**Blocked:** none.
## 2026-08-28 — D-1592 pickup.c more_containers n

**Objective:** Open `pickup.c` more_containers `n` (named). Not
traditional_loot.
**C locus:** `pickup.c` `in_or_out_menu` `:3397–3477`;
`use_container` `:3091`; `do_loot_cont` `:2161`; `doloot_core`
`:2217–2273` `container_at`.
**JS locus:** named omit after D-1581 (no `'n'` row; first box only).
**Change:** live Next default + `'q'` abort vs `'n'` continue +
num_conts>1 PICK_ANY. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open tamedog ustuck expels. Not more_containers.
**Blocked:** none.
## 2026-08-28 — D-1591 invent.c display_used_invlets

**Objective:** Open `invent.c` `display_used_invlets` (named). Not gacc.
**C locus:** `invent.c` `display_used_invlets` `:3466–3519`; caller
`doorganize_core` `:5146`; `wintty.c` `tty_add_menu`/`tty_end_menu`.
**JS locus:** named omit after D-0127/D-1590 (`?`/`*` Never_mind).
**Change:** live used-letters PICK_ONE (sortpack headings, doname,
obj_glyph, ESC vs empty); `#adjust` `?`/`*` awaits it. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open more_containers `n`. Not `display_used_invlets`.
**Blocked:** none.
## 2026-08-28 — D-1590 invent.c wizid unid_cnt>0 PICK_ANY

**Objective:** Open `invent.c` wizid unid_cnt>0 PICK_ANY (named). Not gacc.
**C locus:** `invent.c` `display_pickinv` `:3222–3407`; `windows.c`
`menuitem_invert_test`; `wintty.c` group_accel; `visctrl`.
**JS locus:** named omit after D-0928/D-1580/D-1589.
**Change:** live `_`/`^I` SKIPINVERT PICK_ANY + identify_pack /
per-item identify; empty invent pline. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **25**/25; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `display_used_invlets`. Not wizid unid_cnt>0.
**Blocked:** none.
## 2026-08-28 — D-1589 invent.c sortloot inuse_only

**Objective:** Open `invent.c` sortloot inuse_only (named). Not gacc.
**C locus:** `invent.c` `inuse_classify` `:70–144`; `sortloot_cmp`
SORTLOOT_INUSE; `sortloot` filterfunc; `display_pickinv`
`:3186–3317`; `dispinv_with_action`; `doprinuse`/`dopr*`.
**JS locus:** named omit after D-1580/D-1581/D-1588.
**Change:** live INUSE classify + `is_inuse` filter + inuse_headers
+ fake HANDS_SYM + `*` seeall + CMD_M_PREFIX keep. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** inuse sort unit; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open wizid unid_cnt>0 PICK_ANY. Not `display_used_invlets`.
**Blocked:** none.
