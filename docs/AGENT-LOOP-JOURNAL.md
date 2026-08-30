# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-30 — D-1723 sp_lev.c lspo_object non-merge quan

**Objective:** Open `sp_lev.c` lspo_object non-merge quan repeat
(named). Not oc_merge.
**C locus:** `sp_lev.c` `lspo_object` `:3725–3740`; `find_objtype`;
`create_object` class-letter `:2220–2232`.
**JS locus:** `js/mklev.js` `l_create_object` / `find_objtype` /
`create_object`.
**Change:** Non-merge `quantity` repeats `create_object`; merge still
one stack. find_objtype + argc string/coord; `'('` TOOL. minetn-1
placeObj no longer force-sets quan; tut-1 rocks use the loop.
Named: other load_* `des.object`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `sp_lev.c:lspo_object`; canary
16/16; focused seed0009; green+strict; cohort 8/8 + seed0360 +
strict.
**Next:** Open `dungeon.c` recalc_mapseen sokosolved / roguelevel /
quest flags.
**Blocked:** none.
## 2026-08-30 — D-1722 do.c/dog.c cant_go_back FREEING

**Objective:** Open `dog.c` cant_go_back FREEING (named). Not
update_mlstmv.
**C locus:** `do.c` `goto_level` `:1640–1664`; `files.c`
`delete_levelfile`; `dungeon.c` `remdun_mapseen`; `dog.c`
`discard_migrations`.
**JS locus:** `js/do.js` `goto_level`; `js/files.js`; `js/dungeon.js`;
`js/dog.js`; `js/mon.js` export `discard_minvent`.
**Change:** Endgame/tutorial leave is FREEING-only (no VISITED stash);
ordinary leave still WRITING|FREEING. Then delete_levelfile /
remdun_mapseen / discard_migrations. JSON analogue, not binary NHFILE.
Named: `free_luathemes`; full migrating `obfree`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `dog.c:cant_go_back`; tagged
`do.c:goto_level` ledger-seed0015 private 8472/8472; focused
seed0015/0700/0014 + seed0013 restore + seed0105; rng-diff
--all-segments seed0013; green+strict; cohort 9/9 + strict.
**Next:** Open `sp_lev.c` lspo_object non-merge quan repeat.
**Blocked:** none.
## 2026-08-30 — D-1721 cmd.c getdir yn_function

**Objective:** Open `cmd.c` getdir yn_function (named). Not
yn_function_menu.
**C locus:** `cmd.c` `getdir` `:3987–4011`; `yn_function` FALSE.
**JS locus:** `js/lock.js` `getdir`; `js/dothrow.js` `getdir_cmdassist`;
`js/zap.js` `getdir_zap`; `js/dig.js` `dig_getdir`.
**Change:** Interactive getdir is `yn_function(query, null, '\0', false)`
then `clear_nhwindow_message`. Dead dothrow clone retired. No trailing
confdir. Named: CQ_REPEAT; mouse; help_dir in shared; dxdy_moveok;
`yn_function_menu`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; focused seed1800/2200; green+strict;
cohort 9/9 + strict.
**Next:** Open `dog.c` cant_go_back FREEING.
**Blocked:** none.
## 2026-08-30 — D-1720 invent.c currency Hallu ROLL_FROM

**Objective:** Open `shk.c` Hallu currency ROLL_FROM (named). Not
arti_cost.
**C locus:** `invent.c` `currency` `:1545–1554`; `currencies[]`
`:1521–1543`; `hack.h` `ROLL_FROM`.
**JS locus:** `js/invent.js` `currency`; `js/objnam.js` `xprname`;
dokick/dig/lock/trap clones retired.
**Change:** Hallu `currency()` is `ROLL_FROM(currencies[])` instead of
always zorkmid. Named: `artifact_score`; hidden_gold; `costly_gold`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; focused seed0116/0383; green+strict;
cohort 9/9 + strict.
**Next:** Open `cmd.c` getdir yn_function.
**Blocked:** none.
## 2026-08-30 — D-1719 artifact.c arti_cost + getprice

**Objective:** Open `shk.c` arti_cost (named). Not gem glass
pseudo-ID.
**C locus:** `artifact.c` `arti_cost` `:2308–2317`; `shk.c`
`getprice` `:4324–4327`; `artilist.h` A() cost.
**JS locus:** `js/artifact.js` `arti_cost`; `js/shk.js` `getprice`;
extractor + `js/generated/artifacts_data.js`.
**Change:** artifact shop/base price is `artilist.cost` (else
`100*oc_cost`) instead of table `oc_cost`. Named: Hallu currency;
`artifact_score`; gen_spe/gift_value.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 16/16; green+strict;
focused seed0116; cohort 7/7 + strict.
**Next:** Open `shk.c` Hallu currency ROLL_FROM.
**Blocked:** none.
## 2026-08-30 — D-1718 shk.c get_cost gem glass pseudo-ID

**Objective:** Open `shk.c` get_cost gem glass pseudo-ID (named). Not
remote_burglary.
**C locus:** `shk.c` `get_cost` `:2897–2941`; `oid_price_adjustment`
`:2862–2873`; `objects.h` `FIRST_GLASS_GEM`.
**JS locus:** `js/shk.js` `get_cost`.
**Change:** unidentified glass uses `ubirthday` color table
`oc_cost` instead of tmp=5. Named: `arti_cost`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 12/12; green+strict;
focused seed0383/0116; cohort 7/7 + strict.
**Next:** Open `shk.c` arti_cost.
**Blocked:** none.
