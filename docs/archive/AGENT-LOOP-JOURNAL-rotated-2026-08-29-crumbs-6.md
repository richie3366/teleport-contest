# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
