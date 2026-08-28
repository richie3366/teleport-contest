# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
