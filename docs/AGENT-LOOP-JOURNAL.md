# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-29 — D-1656 apply.c use_grease trailing update_inventory

**Objective:** Open `apply.c` `use_grease` (named). Not
consume_obj_charge.
**C locus:** `apply.c` `use_grease` `:2603–2654` / `grease_ok`;
`invent.c` getobj GETOBJ_PROMPT; `objnam.c` `gloves_simple_name`.
**JS locus:** `js/apply.js` `use_grease`; `js/objnam.js`
`gloves_simple_name`.
**Change:** trailing `update_inventory` `:2652`; retire
`getobj_grease` clone for live `getobj`; coin EXCLUDE 0; gauntlets
strstri. sit.c grease spray named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary 23/23; green+strict seed8000/0900;
cohort **7**/7 + strict (9/9 with green).
**Next:** Open overlay BIND= if/else keys. Not cmdbind_get default.
**Blocked:** none.
## 2026-08-29 — D-1655 invent.c invlet_constant / reassign / obj_to_let

**Objective:** Open `invent.c` `invlet_constant` (named). Not
check_invent_gold.
**C locus:** `invent.c` `reassign` `:4853–4884` / `obj_to_let`
`:2860–2868`; getobj/display_pickinv/doorganize/prinv/#see*;
optfn_boolean `:5353–5361`; xprname use_invlet; `fixinv` On.
**JS locus:** `js/invent.js` `reassign`/`obj_to_let`; `js/options.js`
fixinv→`invlet_constant`; `js/objnam.js` xprname; `js/jsmain.js`.
**Change:** pack a–z/A–Z/`#`, gold `'$'` at head when !fixinv;
default On so public traces unchanged. dounpaid/wizcmds/wizweight
named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary gold-head/52+`#`/parse; green+strict
seed8000/0900; cohort **7**/7 + strict (9/9 with green).
**Next:** Open `use_grease`. Not consume_obj_charge.
**Blocked:** none.
## 2026-08-29 — D-1654 objnam.c safe_qbuf / pickup prompts

**Objective:** Open `pickup.c` `safe_qbuf` (named). Not floor
query_classes.
**C locus:** `objnam.c` `safe_qbuf` `:5623–5698`; pickup
`:852`/`:1774`/`:3077–3082`/`:3607`.
**JS locus:** `js/objnam.js` `safe_qbuf`; `js/pickup.js`
traditional Pick up / lift Continue? / use_container / dotip.
**Change:** QBUFSZ-1 + `short_oname` then lastR; `Yname2` /
`ysimple_name` C-home; `something` in const. Other-file callers
named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary fit/lastR; green+strict seed8000/0900;
cohort **7**/7 + strict (9/9 with green).
**Next:** Open `invlet_constant`. Not check_invent_gold.
**Blocked:** none.
## 2026-08-29 — D-1653 sounds.c MS_RIDER Death tribute / u_have_novel

**Objective:** Open `sounds.c` Death_quote / `u_have_novel` (named).
Not read_tribute.
**C locus:** `sounds.c` `domonnoise` MS_RIDER `:1193–1236`;
`invent.c` `u_have_novel` `:1575–1584`; `hacklib.c` `ucase`
`:101–110`; `files.c` `Death_quote` already D-1633.
**JS locus:** `js/sounds.js` `domonnoise`; `js/invent.js`
`u_have_novel`; `js/hacklib.js` `ucase`.
**Change:** Death novel/`Death_quote`/Sandman/War; `pline(ucase)`
no quotes; other riders `verbalize`. save/rest `context.novel`
named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary Mort/Snuff/Wee/quote/Famine;
green+strict seed8000/0900; cohort **7**/7 + strict (9/9 with green).
**Next:** Open `safe_qbuf`. Not floor query_classes.
**Blocked:** none.
## 2026-08-29 — D-1652 sit.c eyecount / mondata.h

**Objective:** Open `sit.c` `eyecount` (named). Not confer_oc_oprop.
**C locus:** `include/mondata.h` `eyecount` `:48–51`; callers
`sit.c` `throne_sit_effect` `:160–179` / `pray.c` TROUBLE_BLIND
`:562` / `potion.c` `potionbreathe` `:1958`.
**JS locus:** `js/monsters.js` `eyecount`; sit Blind case 10;
pray TROUBLE_BLIND; potionbreathe sting.
**Change:** drop sit/pray always-2 stubs and potion `eyecount_pot`
clone; import the C-home export. Spell dull / zap rider named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary 2/1/0; green+strict seed8000/0900;
cohort **7**/7 + strict (9/9 with green).
**Next:** Open Death_quote / `u_have_novel`. Not read_tribute.
**Blocked:** none.
## 2026-08-29 — D-1651 do_name.c lookup_novel

**Objective:** Open `do_name.c` `lookup_novel` (named). Not do_mgivenname.
**C locus:** `do_name.c` `lookup_novel` `:1626–1661`; table
`:1591–1608`; callers `readobjnam` `:5355–5358` /
`create_object` `:2266–2271`.
**JS locus:** `js/do_name.js` `lookup_novel`; wish `js/readobjnam.js`;
`js/mklev.js` `create_object`; table export `js/mkobj.js`.
**Change:** aliases + table/`The` walk + IndexOk miss; SPE_NOVEL
wish replaces name; named level objects `oname` then lookup.
`'o'` getobj / Death_quote named.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green).
**Next:** Open `eyecount`. Not confer_oc_oprop.
**Blocked:** none.
## 2026-08-29 — D-1650 dungeon.c dooverview PICK_ONE

**Objective:** Open `dungeon.c` `dooverview` PICK_ONE (named). Not doextlist.
**C locus:** `dungeon.c` `dooverview` `:3293–3301` / `show_overview`
`:3304–3340` / `traverse_mapseenchn` `:3343–3365` / `print_mapseen`
`:3515–3728`; callees `ledger_to_dnum`/`ledger_to_dlev` /
`query_annotation`; caller `donamelevel`.
**JS locus:** `js/dungeon.js` `dooverview`/`show_overview`.
**Change:** m-prefix why==-1 `select_menu` PICK_ONE with
`ledger_no+1` then `query_annotation`; `donamelevel` keeps
`menu_requested`; two-pass traverse; named-place/`builds_up`/
`endgamelevelname`. Altar-god / cemetery bones named.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green); seed4500 PASS.
**Next:** Open `lookup_novel`. Not do_mgivenname.
**Blocked:** none.
## 2026-08-29 — D-1649 questpgr.c convert_arg remaining % codes

**Objective:** Open `questpgr.c` `convert_arg` (named). Not convert_line %Xh.
**C locus:** `questpgr.c` `convert_arg` `:235–325`; callees
`homebase`/`intermed`/`neminame`; caller `convert_line` `:343`.
**JS locus:** `js/questpgr.js` `convert_arg`.
**Change:** `%c`/`%G`/`%A`/`%D`/`%C`/`%N`/`%L`/`%Z`; `%o` via
`artiname`; C-home helpers. qt_pager common fallback named.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green).
**Next:** Open `dooverview` PICK_ONE. Not doextlist.
**Blocked:** none.
## 2026-08-29 — D-1648 mon.c newcham await remaining NO_NC_FLAGS

**Objective:** Must-fix review **606** await `newcham` at remaining
sync `NO_NC_FLAGS` sites. Not `m_unleash` body. Not `convert_arg`.
**C locus:** `mon.c` `newcham` `:5386–5398` / `:5517–5532`.
**JS locus:** `js/mhitm.js` `mon_poly`/`mon_to_stone`/`vamp_stone`/
`gulpmm`; `js/uhitm.js` `gulpum`; `js/trap.js` `animate_statue`;
`js/zap.js` `revive`/`bhitm`/figurine.
**Change:** await so unleash/Elbereth finish before the caller
continues (C `return 1`). Sync makemon/`load_tower1` named.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green).
**Next:** Open `convert_arg`. Not convert_line %Xh.
**Blocked:** none.
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
