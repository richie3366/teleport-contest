# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-29 — D-1660 do_name.c docallcmd `'o'` live getobj call

**Objective:** Open `do_name.c` docallcmd `'o'` getobj call (named).
Not lookup_novel.
**C locus:** `do_name.c` `docallcmd` `:571–589`; `getobj` /
`call_ok` / `xname` observe / `docall`.
**JS locus:** `js/do_name.js` `docallcmd`.
**Change:** live `getobj('call', call_ok, GETOBJ_NOFLAGS)` then
`xname` + `!dknown` You-line / `docall`. cmdq_pop canned / lootabc /
invent-gated i/o / artifact_name slip named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary wiring + `call_ok(null)`; green+strict
seed8000/0900; cohort **7**/7 + strict (9/9 with green).
**Next:** Open `optfn_perminv_mode`. Not doperminv.
**Blocked:** none.
## 2026-08-29 — D-1659 dungeon.c print_mapseen cemetery bones list

**Objective:** Open `dungeon.c` cemetery bones list (named). Not
dooverview PICK_ONE.
**C locus:** `dungeon.c` `print_mapseen` `:3696–3726`;
`recalc_mapseen` `:3247–3260`; `bones.c` `savebones` cemetery.
**JS locus:** `js/dungeon.js` `mapseen_cemetery_lines` /
`recalc_mapseen`; `js/end.js` `savebones`.
**Change:** clone `bonesinfo`; bonesknown from lastseentyp;
kncnt `,`/`.` listing; dead hero only `why===2`; formatkiller how.
knox-drawbridge / save_mapseen JSON / when[] named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary clone+listing; green+strict
seed8000/0900; cohort **7**/7 + strict (9/9 with green).
**Next:** Open `'o'` getobj call. Not lookup_novel.
**Blocked:** none.
## 2026-08-29 — D-1658 dungeon.c print_mapseen altar-god coalign

**Objective:** Open `dungeon.c` print_mapseen altar-god coalign
(named). Not dooverview PICK_ONE.
**C locus:** `dungeon.c` `print_mapseen` `:3613–3619`;
`count_feat_lastseentyp` ALTAR `:3012–3025`; `pray.c`
`altarmask_at` `:2489–2504`; `align.h` `Amask2msa`/`Msa2amask`.
**JS locus:** `js/dungeon.js` `mapseen_feat_line` /
`count_feat_lastseentyp`; `js/pray.js` `altarmask_at`;
`js/const.js`; `js/roles.js` `align_gname`.
**Change:** record `feat.msalign`; suffix `" to <god>"` when
coaligned; A_NONE → Moloch. Cemetery / knox-drawbridge named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary msalign + gname; green+strict
seed8000/0900; cohort **7**/7 + strict (9/9 with green).
**Next:** Open cemetery bones list. Not dooverview.
**Blocked:** none.
## 2026-08-29 — D-1657 cmd.c overlay BIND= on if/else keys

**Objective:** Open `cmd.c` overlay BIND= on if/else keys (named).
Not cmdbind_get default.
**C locus:** `cmd.c` `rhack` `:3678` `cmdbind_get`; `bind_key`
`:2669` nothing `cmdbind_remove`.
**JS locus:** `js/cmd.js` `rhack_user_overlay_key`; `js/getline.js`
EXT_CMDS if/else runners; `js/options.js` parsebindings nothing.
**Change:** BIND= skips if/else (not inventory-only); nothing
unbinds; same tlist path as D-1643. Walk/PREFIXCMD overlay named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary 50/50; green+strict seed8000/0900;
cohort **7**/7 + strict (9/9 with green).
**Next:** Open altar-god coalign. Not dooverview PICK_ONE.
**Blocked:** none.
## 2026-08-29 — audit #2060 reviews 609–617 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **608**
(`979dd522`…`9ac19d6f`, D-1648…D-1656) plus full `sessions`.
**C locus:** `newcham` await; `convert_arg`; `dooverview` PICK_ONE;
`lookup_novel`; `eyecount`; Death tribute; `safe_qbuf`;
`invlet_constant`/`reassign`; `use_grease` `:2652`.
**Change:** reviews **609–617**; all ACCEPT-WITH-DEBT. No Must-fix.
No `js/` edits. Filled archive D-1656 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `39+0.31/turn` (R² 0.861) at `9ac19d6f`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Open overlay BIND= if/else keys. Not cmdbind_get default.
**Blocked:** none.
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
