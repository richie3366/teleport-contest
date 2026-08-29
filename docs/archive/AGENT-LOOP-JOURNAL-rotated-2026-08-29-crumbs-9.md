# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
