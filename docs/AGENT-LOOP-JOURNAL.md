# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-30 — D-1733 shk.c u_left_shop / wizard.c choose_stairs

**Objective:** Open `shk.c` choose_stairs / u_left_shop leave verbalize
(named). Not remote_burglary.
**C locus:** `shk.c` `u_left_shop` `:578–625`; `wizard.c` `choose_stairs`
`:330–364`; `stairs.c` `stairway_find_type_dir` `:88–96`.
**JS locus:** `js/shk.js` `u_left_shop` / `call_kops`; `js/wizard.js`
`choose_stairs`; `js/mklev.js` `stairway_find_type_dir`.
**Change:** unpaid door-edge verbalize then return; outright leave
`rob_shop` + `call_kops`; stair swarm via `choose_stairs`. Named:
SetVoice; heaven teleport.c caller; STRAT_HEAL rloc/healmon.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `shk.c:u_left_shop`; node
dir/ladder/branch/opposite/portal/`builds_up` + boundary no-steal;
green+strict seed8000/0900; CURRENT cohort **7**/7 + strict.
Rule #2 clean.
**Next:** Open `display.c` display_monster M_AP_MONSTER what_mon.
**Blocked:** none.
## 2026-08-30 — D-1732 obj.h is_multigen / is_poisonable

**Objective:** Open `objects.h` is_multigen / is_poisonable (named). Not oc_merge.
**C locus:** `obj.h` `:260–268`; `artifact.c` `permapoisoned` `:2836–2840`;
`mkobj.c` `mksobj_init` `:877`/`:886`/`:1173`.
**JS locus:** `js/objects.js`; `js/artifact.js` `permapoisoned`; `js/mkobj.js`.
**Change:** `oc_skill` window + Grimtooth; mksobj_init end force; retire
name-list/clones; wish `"poisoned "` + FOOD age + post-oname force.
Named: mthrowu/uhitm poison combat; nhlobj lua.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `objects.h:is_multigen`; node
window+Grimtooth+wish+quan; green+strict seed8000/0900; CURRENT cohort
**9**/9 + strict. Rule #2 clean.
**Next:** Open `shk.c` choose_stairs / u_left_shop leave verbalize.
**Blocked:** none.
## 2026-08-30 — D-1731 invent.c doprgold / vault.c hidden_gold

**Objective:** Open `invent.c` doprgold hidden_gold (named). Not currency.
**C locus:** `invent.c` `doprgold` `:4502–4546`; `vault.c` `hidden_gold`
`:1256–1268`.
**JS locus:** `js/invent.js` `doprgold`; `js/vault.js` `hidden_gold`.
**Change:** `$` counts known container gold; verbose stash `eos` /
non-verbose pack total; m-prefix `dispinv("$", FALSE)`. Export C-home
`hidden_gold`; retire end/shk clones. Named: shopper_financial_report /
shop_debt; dokick `hidden_gold_kick`; botl/detect/insight/topten/u_init.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `invent.c:doprgold`; node
known/unknown/nested; green+strict seed8000/0900; CURRENT cohort **9**/9
+ strict. Rule #2 clean.
**Next:** Open `objects.h` is_multigen / is_poisonable.
**Blocked:** none.
## 2026-08-30 — D-1730 end.c artifact_score

**Objective:** Open `end.c` artifact_score (named). Not hidden_gold.
**C locus:** `end.c` `artifact_score` `:906–940`; `really_done`
`:1449`/`:1482`; `integer.h` `nowrap_add`.
**JS locus:** `js/end.js` `artifact_score` / `really_done` /
`show_death_rip_and_summary`.
**Change:** unique/invocation `arti_cost*5/2` into `urexp` when
ESCAPED/ASCENDED; list worth lines after reward/escape sentence;
cobj recurse; ASCENDED Demigod title. Named: get_valuables / pet HP /
DUMPLOG list; hidden_gold Open.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `end.c:artifact_score`; node
count+list+cobj; green+strict seed8000/0900; CURRENT cohort **9**/9
+ strict. Rule #2 clean.
**Next:** Open `invent.c` doprgold hidden_gold.
**Blocked:** none.
## 2026-08-30 — D-1729 cmd.c getdir CQ_REPEAT

**Objective:** Open `cmd.c` getdir CQ_REPEAT (named). Not
yn_function_menu.
**C locus:** `cmd.c` `getdir` `:3962–4019`; `cmdq_pop` `:409–420`;
`cmdq_add_key` `:273–290`.
**JS locus:** `js/lock.js` `getdir_read_dirsym` / `getdir`.
**Change:** `cmdq_pop` DIR/KEY; yn_function FALSE then
`cmdq_add_key(CQ_REPEAT)` when `!in_doagain`; `in_doagain` nhgetch.
`getdir_cmdassist` uses helper; `getdir_zap` + local confdir; dig
`use_pick_axe` calls `getdir`. Named: mouse getpos; help_dir in
shared; dxdy_moveok.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `cmd.c:getdir`; node KEY/DIR/
`in_doagain`/REPEAT; green+strict seed8000/0900; CURRENT cohort
**9**/9 + strict. Rule #2 clean.
**Next:** Open `end.c` artifact_score.
**Blocked:** none.
## 2026-08-30 — D-1728 cmd.c yn_function_menu query_menu

**Objective:** Open `cmd.c` yn_function_menu query_menu (named). Not
yn_function addcmdq.
**C locus:** `cmd.c` `yn_function_menu` `:5416–5463`;
`yn_menuable_resp` `:5393–5399`; `yn_func_menu_opt` `:5401–5413`;
caller `yn_function` `:5538`; tables `decl.c` `:113–118`.
**JS locus:** `js/getline.js` `yn_function_menu`; tables `js/const.js`.
**Change:** unique String tables + `===` identity; menu via
`select_menu_pick_one`; `iflags.query_menu`; `window_inited`;
paranoid_ynq / `choose_ring_hand`; y_n wrappers. Named: interned
`'yn'` callers; hide+web `hidespinchars`; getdir CQ_REPEAT.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `cmd.c:yn_function_menu`; node
identity + gate; green+strict seed8000/0900; CURRENT cohort **9**/9
+ strict. Rule #2 clean.
**Next:** Open `cmd.c` getdir CQ_REPEAT.
**Blocked:** none.
## 2026-08-30 — D-1727 invent.c useupall / shk.c obfree

**Objective:** Open `invent.c` useupall / obfree (named). Not
observe_object FIRST_OBJECT skip.
**C locus:** `invent.c` `useupall` `:1311–1317`; `shk.c` `obfree`
`:1186–1275`; callers `useup`, `merged` `:944`, eat gold, zap
`backfire`, write.c dry-marker.
**JS locus:** `js/invent.js` `useupall`; `js/shk.js` `obfree` /
`delete_contents`.
**Change:** setnotworn+freeinv+obfree; unpaid `!merge` → billobjs;
merge combines `bquan`; oid_price_adjustment donate; eat/write/zap/
apply/potion/timeout clones retired. Named: full `dealloc_obj`,
`delobj` extract, zap `delete_contents` clone.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `invent.c:useupall`; node unpaid
ONBILL + merge billct; green+strict seed8000/0900; CURRENT cohort
**9**/9 + strict. Rule #2 clean.
**Next:** Open `cmd.c` yn_function_menu query_menu.
**Blocked:** none.
## 2026-08-30 — D-1726 display.c display_monster furniture lastseentyp

**Objective:** Open `display.c` display_monster M_AP_FURNITURE
cmap_to_glyph lastseentyp (named). Not update_lastseentyp.
**C locus:** `display.c` `display_monster` `:545–562`; callers
`newsym` `:1027–1029`, `feel_location` `:904–908`.
**JS locus:** `js/display.js` `display_monster`; `ensure_lastseentyp`
export `js/dungeon.js`.
**Change:** PHYSICALLY_SEEN furniture → cmap glyph + memory; !sensed
lastseentyp = cmap_to_type. gbuf unsensed furniture is cmap. Object
mimic stays D-0297. Named: M_AP_MONSTER what_mon, Protection sensed,
Detect_monsters cansee.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:display_monster`; node
S_fountain → FOUNTAIN + `{`; green+strict seed8000/0900; CURRENT
cohort **9**/9 + strict. Rule #2 clean.
**Next:** Open `invent.c` useupall / obfree.
**Blocked:** none.
## 2026-08-30 — audit #2130 reviews 678–686 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **677**
(`ed4800ed`…`32c02560`, D-1717…D-1725) plus full `sessions`.
**C locus:** `remote_burglary`; `get_cost` glass; `arti_cost`; Hallu
`currency`; `getdir` yn_function; `cant_go_back` FREEING; `lspo_object`
quan; `recalc_mapseen` flags; `hhmmss`.
**Change:** reviews **678–686**, all ACCEPT-WITH-DEBT. No Must-fix.
No `js/` edits. Filled archive D-1725 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `41+0.33/turn` (R² 0.862) at `32c02560`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Open `display.c` display_monster M_AP_FURNITURE lastseentyp.
**Blocked:** none.
## 2026-08-30 — D-1725 calendar.c hhmmss

**Objective:** Open `calendar.c` hhmmss (named). Not yyyymmddhhmmss.
**C locus:** `calendar.c` `hhmmss` `:79–92`; callers `files.c`
paniclog `:2822–2824`; `windows.c` dump_fmtstr `%d`/`%D` `:1176–1185`.
**JS locus:** `js/calendar.js` `hhmmss` (new); shares `lt_for_date`.
**Change:** `hour*10000 + min*100 + sec`; `date==0` → getlt. C callers
are dump filename / paniclog file — named (Rule #2). Not cemetery
`when[]` (D-1710). Named: dump_fmtstr, paniclog, `getyear`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `calendar.c:hhmmss`; node civil
stamp `90105` / date≠0 `235959`; green+strict seed8000/0900; CURRENT
cohort **7**/7 + strict. Rule #2 clean.
**Next:** Open `display.c` display_monster M_AP_FURNITURE lastseentyp.
**Blocked:** none.
## 2026-08-30 — D-1724 dungeon.c recalc_mapseen sokoban/rogue/quest flags

**Objective:** Open `dungeon.c` recalc_mapseen sokosolved /
roguelevel / quest flags (named). Not DRAWBRIDGE_UP lastseentyp.
**C locus:** `dungeon.c` `recalc_mapseen` `:3099–3134`; `rm.h`
Sokoban; `at_dgn_entrance` / `qstart_level` / uevent / quest_status.
**JS locus:** `js/dungeon.js` `recalc_mapseen`.
**Change:** C-order flags: notreachable clear (quest dnum chain);
sokosolved; roguelevel; quest_summons; questing. Print/interest
already consumed them. Named: display_monster furniture lastseentyp.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `dungeon.c:recalc_mapseen`; canary
10/10; focused seed0013-rogue + restore + rng-diff --all-segments;
green+strict; cohort 7/7 + strict.
**Next:** Open `calendar.c` hhmmss.
**Blocked:** none.
