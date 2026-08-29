# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — D-1642 invent.c doperminv + tty WIN_INVEN / #perminv

**Objective:** Open tty WIN_INVEN / `#perminv` (named). Not
consume_obj_charge.
**C locus:** `invent.c` `doperminv` `:2813–2857`; `wintty.c`
`assesstty` / `ttyinv_*`. Callers cmd.c `"perminv"` `|`.
**JS locus:** `js/invent.js`; `js/cmd.js` `|`; `js/getline.js`
`#perminv`.
**Change:** `#perminv`/`|` plines; 24x80 too_small (need 52x79);
InvSparse grid paint when tall enough.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **28**/28; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open BIND= M('?'). Not doextlist.
**Blocked:** none.

## 2026-08-29 — D-1641 invent.c check_invent_gold + adjust_gold_ok

**Objective:** Open `check_invent_gold` (named). Not adjust_split.
**C locus:** `invent.c` `check_invent_gold` `:4887–4913`. Callers
`doorganize` `:4998` / `iactions.c` `:464` / `wizcmds.c` `:1440`
(named). `adjust_gold_ok` `:4926–4933`; dest `GOLD_SYM` `:5143`.
**JS locus:** `js/invent.js` `check_invent_gold` / `doorganize` /
`getobj_adjust`; `js/iactions.js` itemactions `i` + IA_ADJUST_OBJ.
**Change:** gold-slot sanity; wonky gold may be #adjusted and dest
is `$`. Sane gold still EXCLUDE. IA_ADJUST_OBJ queues doorganize.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **14**/14; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open tty WIN_INVEN / `#perminv`. Not consume_obj_charge.
**Blocked:** none.

## 2026-08-29 — D-1640 steed.c landing_spot KNOCKED preferred-dir + enexto

**Objective:** Open `landing_spot` KNOCKED preferred-dir. Not
DISMOUNT_THROWN.
**C locus:** `steed.c` `landing_spot` `:459–572`. Callers
`dismount_steed` `:586` / `:610` / `:621`.
**JS locus:** `js/steed.js` `landing_spot`; `DIR_LEFT`/`DIR_RIGHT`
`js/const.js`.
**Change:** KNOCKED prefers `u.dx,u.dy` then `rn2(2)` clockwise vs
counterclockwise, remaining dirs, early break, `throws_rocks`,
`enexto` forceit. C NODIAG `(j%1)!=0` as written.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **15**/15; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open `check_invent_gold`. Not adjust_split.
**Blocked:** none.

## 2026-08-29 — D-1639 getline.c hooked_tty_getlin ESC-nonempty fallthrough

**Objective:** Must-fix review **593** nonempty ESC `continue`.
**C locus:** `win/tty/getline.c` `hooked_tty_getlin` `:85–91` then
`:102–211`. Callers `tty_getlin` `:39` / `tty_get_ext_cmd` `:312`.
**JS locus:** `js/getline.js` `hooked_getlin_handle_esc` on `getlin`
/ `get_ext_cmd`.
**Change:** nonempty ESC clears then falls through to `intr` /
`doprev` / else `tty_nhbell` instead of `continue` after D-1632.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **11**/11; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open `landing_spot` KNOCKED preferred-dir. Not
DISMOUNT_THROWN.
**Blocked:** none.

## 2026-08-29 — audit #2040 reviews 591–599 (D-1630…D-1638)

**Objective:** C-fidelity review of nine `js/` SHAs since **590**;
cadence full `sessions` (no port).
**C locus:** `do_wear.c` `menu_remarm`; `termcap.c` `tty_nhbell`;
`getline.c` `kill_char`; `files.c` `read_tribute`; `questpgr.c`
`convert_line`; `do.c` `doddrop`; `nhlua.c` `restore_luadata`;
`mon.c` `restore_cham`; `do_name.c` `do_mgivenname`.
**JS locus:** none this iter (review-only).
**Change:** reviews **591–599**; Must-fix prepend review **593**
(`hooked_tty_getlin` ESC-nonempty `continue` vs C fallthrough else
`tty_nhbell`). 591–592/594–599 ACCEPT-WITH-DEBT. No `js/` edits.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
speed `39+0.31/turn` (R² 0.853) at `f9bed6be`.
**Verified:** `node scripts/imports.mjs --rulecheck` clean; cadence
`sessions` 44/44.
**Next:** Must-fix getline ESC-nonempty fallthrough. Not landing_spot.
**Blocked:** none.

## 2026-08-29 — D-1638 do_name.c do_mgivenname / alreadynamed

**Objective:** Open `do_name.c` `do_mgivenname` (named). Not kill_char.
**C locus:** `do_name.c` `do_mgivenname` `:198–282`; `alreadynamed`
`:155–195`; `distant_monnam` `:1168–1186`; caller `docallcmd` `:564`;
`hacklib.c` `fuzzymatch`; `apply.c` `beautiful`.
**JS locus:** `js/do_name.js`; `js/hacklib.js` `fuzzymatch`;
`js/display.js` `glyph_is_swallow_at`; `js/apply.js` `beautiful`;
`js/fountain.js` `mhe`.
**Change:** `'m'`/`'C'` call do_mgivenname (getpos + christen /
alreadynamed reject) instead of returning.
**Score:** fortress held (not a full-suite iter).
**Verified:** fuzzymatch unit; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open `landing_spot` KNOCKED preferred-dir. Not
DISMOUNT_THROWN.
**Blocked:** none.
