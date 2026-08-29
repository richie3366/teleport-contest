# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-29 — D-1644 do.c goto_level ACH_ASTR/ENDG/BGRM

**Objective:** Open `do.c` ACH_ASTR (named). Not reset_hostility.
**C locus:** `do.c` `goto_level` `:1881–1959`; callee `insight.c`
`record_achievement` `achieve_msg`.
**JS locus:** `js/do.js` `goto_level`; `js/insight.js`
`record_achievement`; `js/const.js` `Is_bigroom`.
**Change:** ACH_ENDG on endgame `newdungeon`; ACH_ASTR after
`final_level`; Knox alarm until Croesus dies; ACH_BGRM; `new`
`livelog_printf("entered %s")`; `record_achievement` chronicle.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green).
**Next:** Open newcham mleashed. Not restore_cham.
**Blocked:** none.
## 2026-08-29 — D-1643 cmd.c BIND= M('?') rhack cmdbind_get

**Objective:** Open `cmd.c` BIND= M('?') (named). Not doextlist.
**C locus:** `cmd.c` extcmdlist `M('?')` `"?"` `doextlist` `:1670–1672`;
`commands_init` `cmdbind_add`; `rhack` `cmdbind_get`.
**JS locus:** `js/dokeylist.js` `cmdbind_get`; `js/cmd.js`
`rhack_dispatch_bound`; `js/getline.js` `extcmd_run_by_txt`.
**Change:** default M('?') runs `doextlist` (not Unknown `M-?`); other
default meta binds with an EXT_CMDS runner share the tlist path.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **14**/14; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open ACH_ASTR. Not reset_hostility.
**Blocked:** none.
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
## 2026-08-29 — D-1637 mon.c restore_cham getlev + With_you

**Objective:** Open `mon.c` `restore_cham` (named). Not normal_shape.
**C locus:** `mon.c` `restore_cham` `:4646–4658`; callers
`restore.c` `getlev` `:1217`; `dog.c` `mon_arrive` `:464`;
zap `montraits` `:824` already live.
**JS locus:** `js/mon.js` `restore_cham`; `js/do.js`
`getlev_catchup_monsters`; `js/dog.js` `mon_arrive_with_you`.
**Change:** await restore_cham on getlev catchup (before hide_monst
rnd(10), after REST_LEVELS continue) and With_you before usteed;
PfSC reads uprops H||E plus flats.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **18**/18; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open `do_name.c` `do_mgivenname`. Not kill_char.
**Blocked:** none.
## 2026-08-29 — D-1636 nhlua.c restore_luadata / save_luadata

**Objective:** Open `nhlua.c` `restore_luadata` (named). Not
restore_gamelog.
**C locus:** `nhlua.c` `restore_luadata` `:1344–1363` / `save_luadata`
`:1327–1341` / `get_nh_lua_variables` `:1296–1316`; `dat/nhcore.lua`
`get_variables_string`; `dat/nhlib.lua` `table_stringify`; callers
`restore.c` `:722` / `save.c` `:328`.
**JS locus:** `js/save.js` `restore_luadata` / `save_luadata`;
`js/mklev.js` `l_nhcore_init`; `js/jsmain.js` unixmain no second init.
**Change:** JSON lua source round-trip; `!luacore` init then loadstring;
missing JSON still inits; drop post-restore shuffle.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **22**/22; focused seed0013 restore PASS+strict;
green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `mon.c` `restore_cham`. Not normal_shape.
**Blocked:** none.
## 2026-08-29 — D-1635 do.c doddrop / ggetobj drop

**Objective:** Open `invent.c` ggetobj drop (named). Not takeoff/identify.
**C locus:** `do.c` `doddrop` `:922–944` / `menu_drop` `:980–1107` /
`menudrop_split` `:963–977`; `worn.c` `bypass_objlist` /
`nxt_unbypassed_obj`; `cmd.c` `reset_occupations`.
**JS locus:** `js/do.js` `doddrop` / `menu_drop`; `js/cmd.js` `'D'`;
`js/getline.js` `#droptype`.
**Change:** TRADITIONAL `ggetobj("drop", drop)`; FULL
`query_category`+autopick/`query_objlist`; COMBINATION combo
ALL_FINISHED; `'D'`/`#droptype` runners.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **8**/8; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open `nhlua.c` `restore_luadata`. Not restore_gamelog.
**Blocked:** none.
## 2026-08-29 — D-1634 questpgr.c convert_line pronoun %Xh

**Objective:** Open `questpgr.c` `convert_line` pronoun `%Xh` (named).
Not com_pager_core.
**C locus:** `questpgr.c` `qtext_pronoun` `:197–233` / `convert_line`
`:327–420`; `role.c` `genders[]` `:688–694`; `role_init` `ldrgend` /
`godgend`.
**JS locus:** `js/questpgr.js` `convert_line` / `qtext_pronoun`;
`js/roles.js` `genders[]`; `js/u_init.js`.
**Change:** `%Xh`/`%Xi`/`%Xj` when X in dlno; `%o` Eyes/plural they;
`%Xt`; `genders` neuter/group; `godgend`/`ldrgend`.
**Score:** fortress held (not a full-suite iter).
**Verified:** pronoun canary; green+strict seed8000/0900; cohort **7**/7
+ seed0367/0360 + strict.
**Next:** Open `invent.c` ggetobj drop. Not takeoff/identify.
**Blocked:** none.
## 2026-08-29 — D-1633 files.c read_tribute / SPE_NOVEL

**Objective:** Open `files.c` tribute (named). Not putmsghistory.
**C locus:** `files.c` `choose_passage` `:3429–3470` / `read_tribute`
`:3473–3645` / `Death_quote` `:3647–3653`; `spell.c` SPE_NOVEL `:512–534`.
**JS locus:** `js/files.js`; `js/generated/tribute_data.js`;
`js/spell.js` `study_book`; `noveltitle` `js/mkobj.js`.
**Change:** embed `dat/tribute` (Rule #2); reservoir MAXPASSAGES=30;
NHW_MENU + `putmsghistory`; SPE_NOVEL literate/`ACH_NOVL`; latebound
files (TDZ). sounds.c Death_quote named.
**Score:** fortress held (not a full-suite iter).
**Verified:** tribute canary; green+strict seed8000/0900; cohort **7**/7
+ strict.
**Next:** Open `questpgr.c` `convert_line` pronoun `%Xh`. Not
com_pager_core.
**Blocked:** none.
## 2026-08-29 — D-1632 getline.c kill_char / empty-erase bell / intr

**Objective:** Open `getline.c` `kill_char` (named). Not EDIT_GETLIN.
**C locus:** `win/tty/getline.c` `hooked_tty_getlin` `:196–209` /
`:142–160` / `:102–105`; `sys/share/unixtty.c` `gettty` VERASE/VKILL.
**JS locus:** `js/getline.js` `getlin` / `get_ext_cmd`;
`js/display.js` `get_tty_intr`.
**Change:** POSIX DEL erase + C('U') kill; empty erase + invalid
`tty_nhbell`; getline `intr--` `*bufp=0`. Rule #2: no termios.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `files.c` tribute. Not putmsghistory.
**Blocked:** none.
