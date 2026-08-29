# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-29 — D-1666 can_set_perm_invent InvOptOn import

**Objective:** Must-fix `can_set_perm_invent` import `InvOptOn`.
Not can_set rewrite / mO / `strncmpi` #4.
**C locus:** `options.c` `can_set_perm_invent` `:5507–5508`.
**JS locus:** `js/options.js` const import.
**Change:** import `InvOptOn` from `const.js` so None→On is bound.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary (import+load); green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Must-fix `dosacrifice` `ECMD_TIME` after floorfood
CORPSE/amulet pick. Not `offer_corpse`.
**Blocked:** none.
## 2026-08-29 — audit #2070 reviews 618–626 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **617**
(`ee4f922a`…`784e3060`, D-1657…D-1665) plus full `sessions`.
**C locus:** overlay BIND=; altar-god; cemetery; `'o'` getobj;
`optfn_perminv_mode`; `qt_pager` common; `dounpaid`; `sanity_check`
gold/invlet; iactions offer/tip/invoke.
**Change:** reviews **618–626**. QUALITY-RISK **622** (InvOptOn
import) and **626** (`dosacrifice` ECMD_TIME). Must-fix prepended.
No `js/` edits. Filled archive D-1665 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `39+0.31/turn` (R² 0.862) at `784e3060`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Must-fix `can_set_perm_invent` import `InvOptOn`. Not
can_set rewrite / mO / `strncmpi` #4.
**Blocked:** none.
## 2026-08-29 — D-1665 iactions remaining pushkeys offer/tip/invoke

**Objective:** Open `iactions.c` remaining pushkeys offer/tip/invoke
(named). Not use_grease.
**C locus:** `iactions.c` `itemactions_pushkeys` IA_SACRIFICE /
IA_TIP_CONTAINER / IA_INVOKE_OBJ; O-row `:472–483`; `eat.c`
`offer_ok`/`floorfood("sacrifice")`; `artifact.c` `doinvoke`;
`pickup.c` `tip_ok`/`dotip` getobj.
**JS locus:** `js/iactions.js`; `js/eat.js`; `js/pray.js`;
`js/artifact.js`; `js/pickup.js`.
**Change:** three canned arms (reqmenu PREFIXCMD); live getobj for
sacrifice/invoke/tip; O-row. offer_corpse / remaining pushkeys named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open `invent.c` `noarmor` uskin. Not doprarm.
**Blocked:** none.
## 2026-08-29 — D-1664 wizcmds.c sanity_check gold/invlet

**Objective:** Open `wizcmds.c` `sanity_check` gold/invlet (named).
Not check_invent_gold.
**C locus:** `wizcmds.c` `sanity_check` `:1459–1481`;
`you_sanity_check` `:1401–1441`; `allmain.c:197–198`; `cmd.c`
CMD_INSANE.
**JS locus:** `js/wizcmds.js` `sanity_check`; `js/allmain.js`
`moveloop_core`; `js/cmd.js` `rhack_cmd_insane`.
**Change:** gold/invlet via live `check_invent_gold("invent")`;
opt_in Off caller; ^P `sanity_no_check`; `GOLD_SYM_ADJ`. Wornmask /
other sanity_* named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open `iactions.c` remaining pushkeys offer/tip/invoke.
Not use_grease.
**Blocked:** none.
## 2026-08-29 — D-1663 invent.c dounpaid Iu listing

**Objective:** Open `invent.c` `dounpaid` (named). Not invlet_constant.
**C locus:** `invent.c` `dounpaid` `:3653–3789`; `find_unpaid`
`:3020–3041`; `mkobj.c` `unknwn_contnr_contents` `:682–695`;
`xprname` `:2928–2938`.
**JS locus:** `js/invent.js` `dounpaid`; `js/mkobj.js`
`unknwn_contnr_contents`; `js/objnam.js` `xprname`.
**Change:** Iu one-item pline / NHW_MENU + Total / floor+buried;
cost column; C-home `currency`. Caller `dotypeinv` named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open `wizcmds.c` `sanity_check` gold/invlet. Not
check_invent_gold.
**Blocked:** none.
## 2026-08-29 — D-1662 questpgr.c qt_pager common fallback

**Objective:** Open `questpgr.c` qt_pager common fallback (named).
Not convert_arg.
**C locus:** `questpgr.c` `qt_pager` `:629–634`; `com_pager_core`
`:467–621`.
**JS locus:** `js/questpgr.js` `qt_pager`.
**Change:** role miss retries `com_pager_core("common", TRUE)`
(second nhl_init). Recovered D-1661 options comment (no public
session token in `js/`). Array rn2 / pauper_legacy / killed_nemesis
rawtext named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict; quest **4**/4 + strict (13/13 with green).
**Next:** Open `invent.c` `dounpaid`. Not invlet_constant.
**Blocked:** none.
## 2026-08-29 — D-1661 options.c optfn_perminv_mode

**Objective:** Open `options.c` `optfn_perminv_mode` (named). Not
doperminv.
**C locus:** `options.c` `optfn_perminv_mode` `:3045–3135`;
`handler_perminv_mode` `:6010–6083`; `can_set_perm_invent`
`:5487–5527`; `perminv_modes[]`.
**JS locus:** `js/options.js` `optfn_perminv_mode`.
**Change:** OPTIONS= do_set table/digit/`!`; get_val Off suffix;
handler PICK_ONE + can_set tty. mO compound row named (seed0007
letter fortress). Not doperminv.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open qt_pager common fallback. Not convert_arg.
**Blocked:** none.
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
