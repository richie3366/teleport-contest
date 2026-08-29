# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — audit #2050 reviews 600–608 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **599**
(`d5474f87`…`69534fd4`, D-1639…D-1647) plus full `sessions`.
**C locus:** getline ESC; steed `landing_spot`; `check_invent_gold`;
`doperminv`; BIND= M('?'); `goto_level` ACH; `newcham` mleashed;
MENU_SEARCH/`tty_wait_synch`; `rename_disco`.
**Change:** reviews **600–608**; **606 QUALITY-RISK** Must-fix await
`newcham` at sync sites. No `js/` edits.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `39+0.31/turn` (R² 0.862) at `69534fd4`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Must-fix review **606**. Not `convert_arg`.
**Blocked:** none.

## 2026-08-29 — D-1647 o_init.c rename_disco

**Objective:** Open `o_init.c` `rename_disco` (named). Not do_mgivenname.
**C locus:** `o_init.c` `rename_disco` `:1130–1206`;
`disco_append_typename` `:692–720`; `interesting_to_discover`
`:525–540`. Caller `do_name.c` `docallcmd` `'d'`.
**JS locus:** `js/o_init.js`; `js/do_name.js` `docallcmd`;
`js/invent.js` dodiscovered.
**Change:** `'d'`/`'\\'` lists callable discoveries by inv_order
and `docall`s a dummy; typename helper C-home (was invent clone).
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green).
**Next:** Open `convert_arg`. Not convert_line %Xh.
**Blocked:** none.

## 2026-08-29 — D-1646 wintty.c MENU_SEARCH + tty_wait_synch

**Objective:** Open `win/tty/wintty.c` MENU_SEARCH / `tty_wait_synch`
(named). Not kill_char.
**C locus:** `wintty.c` `process_menu_window` `:1698–1731`;
`toggle_menu_curr` `:1112–1151`; `tty_wait_synch` `:3623–3647`.
**JS locus:** `js/invent.js` `process_menu_search`; `js/options.js`
pick_one/any; `js/display.js` `tty_wait_synch`.
**Change:** `:` searches via getlin+pmatchi+toggle; PICK_NONE bells;
PICK_ONE first match finishes; explicit `:` is not search.
wait_synch rawprint/inmore/inread; too_small calls it.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green).
**Next:** Open `rename_disco`. Not do_mgivenname.
**Blocked:** none.

## 2026-08-29 — D-1645 mon.c newcham mleashed + Elbereth

**Objective:** Open `mon.c` newcham mleashed (named). Not restore_cham.
**C locus:** `mon.c` `newcham` `:5386–5398` mleashed; `:5517–5532`
Elbereth; callees `m_unleash`/`leashable`/`update_inventory`/
`set_apparxy`/`onscary`/`monnear`/`monflee`.
**JS locus:** `js/makemon.js` `newcham_mleashed` / `newcham_elbereth`.
**Change:** after `set_mon_data`, unleash unkeepable leash (TRUE) or
refresh perm_invent; after SHOW_MSG, monster-turn Elbereth may flee.
NO_NC_FLAGS stays boolean unless those arms run.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **23**/23; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open MENU_SEARCH / `tty_wait_synch`. Not kill_char.
**Blocked:** none.

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
