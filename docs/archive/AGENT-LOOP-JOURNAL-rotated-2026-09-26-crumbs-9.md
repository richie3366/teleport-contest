# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-26 — D-2850 `get_unused_cs` clears the idle could-see buffer

**C locus:** `nethack-c/upstream/src/vision.c:274–299` `get_unused_cs`. No C callees (`memset` of `ROWNO * COLNO * sizeof (seenV)`). The only call is `vision_recalc` `vision.c:542`. `vision.c:96` is the static declaration. `vision.c:268` and `vision.c:546` are comments.
**JS:** `js/vision.js` `get_unused_cs` `:953`. `vision_recalc` call `:987`. Blind install `:1004`. Main install `:1094`.
**Change:** One `get_unused_cs` in that C order. `viz_array === cs_buf0` (`cs_rows0`) selects `cs_buf1` / `cs_rmin1` / `cs_rmax1`; any other pointer selects buffer 0. Every cell is zeroed, then each row's min is `COLNO - 1` and max is `1`.
**Verify:** `node scripts/verify.mjs --fn get_unused_cs --reach-all` → PASS syntax (1 changed js file: js/vision.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** The header comment's "light routine" is not a call in this tree; `do_light_sources` receives the buffer `vision_recalc` already obtained. `vision_off_newsym_gbuf` still zeros the back buffer itself (the JS split of the `control == 2` newsym loop) and does not use this sentinel.
**Next:** `timeout.c` `attach_fig_transform_timeout` (next Open — coverage row). Five measured rows refilled (`maybereleaseobuf`, `unplacebc_core`, `status_initialize`, `fall_asleep`, `peffect_oil`). Twelve Open — coverage rows after archive.

## 2026-09-26 — D-2849 `confused_book` tears the spellbook or rereads one line

**C locus:** `nethack-c/upstream/src/spell.c:189–207` `confused_book`. Callees `rn2` (`rnd.c`, live `js/rng.js:89`), `pline` (`pline.c:103`, live `js/display.js:7927`), `display_nhwindow(WIN_MESSAGE, FALSE)` (`wintty.c:1855` NHW_MESSAGE more, live `flush_topl_more` `js/display.js:7478`), `You` (`pline.c:355`, live `js/display.js:7671`), `trycall` (`do_name.c`, live `js/do_name.js:1694`), `useup` (`invent.c:1320`, live `js/invent.js:4690`). Calls: `learn` `spell.c:369` and `study_book` `spell.c:621`. `spell.c:34` is the static declaration.
**JS:** `js/spell.js` `confused_book` `:878`, `rn2` `:881`, `flush_topl_more` `:886`, `useup_inv` `:889`. `learn` call `:920`. `study_book` call `:1183`.
**Change:** One `confused_book` in that C order. `rn2(3)` always runs. A zero roll tears the book unless it is the Book of the Dead: `in_use` is set, the control line is shown, `flush_topl_more` forces the message `--More--`, then the tear line, `trycall`, and invent.c `useup`.
**Verify:** `node scripts/verify.mjs --fn confused_book` → PASS syntax (1 changed js file: js/spell.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** A null `spbook.book` in `learn` skips the call; C would dereference it. `display_nhwindow` has no JS symbol; the tty message-window FALSE arm is `flush_topl_more`.
**Next:** `vision.c` `get_unused_cs` (next Open — coverage row). `generate_stairs_find_room` parked Stale (body already at `js/mklev.js:31497`, ratio 0.58). Eight Open — coverage rows remain after archive, inside the band, so nothing was refilled.

## 2026-09-26 — D-2848 `maybe_finish_sokoban` clears Sokoban rules when the last pit or hole is gone

**C locus:** `nethack-c/upstream/src/trap.c:7059–7095` `maybe_finish_sokoban`. Callees `livelog_printf` (`pline.c:514`, live `js/pline.js:23`) and `ordin` (`hacklib.c`, live `js/hacklib.js:481`). `Sokoban` is `svl.level.flags.sokoban_rules` (`rm.h:538`). Calls: `maketrap` `trap.c:585` on `oldplace`, and `deltrap` `trap.c:6547` after unlink when the removed trap is `PIT` or `HOLE`. `trap.c:75` is the static declaration.
**JS:** `js/trap.js` `maybe_finish_sokoban` `:1567`, `livelog_printf` `:1612`. `maketrap` call `:1063`. `deltrap` call `:1344`.
**Change:** One `maybe_finish_sokoban` in that C order. While Sokoban rules are on and `in_mklev` is clear, `level.traps` is scanned. A `madeby_u` trap is skipped.
**Verify:** `node scripts/verify.mjs --fn maybe_finish_sokoban` → PASS syntax (1 changed js file: js/trap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script shared-file regex) · VERIFY: PASS.
**Named:** `dealloc_trap` (`trap.c:6548`) still has no body; `deltrap` returns after the finish call. `readobjnam.js` `deltrap_local` (`:201`, wish site `:643`) still splices without `clear_conjoined_pits` or this call.
**Next:** `mklev.c` `generate_stairs_find_room` (next Open — coverage row). Ten Open — coverage rows remain after archive, inside the band, so nothing was refilled.

## 2026-09-26 — D-2847 `exp_percent_changing` refreshes status when the Xp highlight rule changes

**C locus:** `nethack-c/upstream/src/botl.c:2090–2125` `exp_percent_changing`. Callees `exp_percentage` (`botl.c:2052`, live `js/botl.js:364`) and `get_hilite` (`botl.c:2346`, local `js/botl.js`). `STATUS_HILITES` is on (`config.h:616`), so the `thresholds` gate and the rule compare are compiled. The only call is `exper.c:190`. `botl.c:1521` is a comment inside `eval_notify_windowport_field`, not a call.
**JS:** `js/botl.js` `exp_percent_changing` `:389`, `get_hilite` call `:402`. `js/exper.js` `more_experienced` call `:316`.
**Change:** One `exp_percent_changing` in that C order. When `flags.botl` is already set it returns false. Otherwise it reads `BL_XP` on the current `blstats` row.
**Verify:** `node scripts/verify.mjs --fn exp_percent_changing --reach-all` → PASS syntax (2 changed js files: js/botl.js js/exper.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script shared-file regex) · VERIFY: PASS.
**Named:** A missing `blstats` slot uses the `INIT_BLSTATP` `percent_matters` for `BL_XP` (TRUE) and null `thresholds`, so the predicate is false until a rule is stored. C's `gb.blstats` is static storage; `init_blstats` is still not called from startup.
**Next:** `trap.c` `maybe_finish_sokoban` (next Open — coverage row). Eleven Open — coverage rows remain after archive, inside the band, so nothing was refilled.

## 2026-09-26 — D-2846 `nemesis_speaks` delivers the quest text or a battle curse

**C locus:** `nethack-c/upstream/src/quest.c:403–422` `nemesis_speaks`. Callees `qt_pager` (`questpgr.c`, live `js/questpgr.js:1139`) and `rn2(5)`. `Qstat` is `svq.quest_status` (`quest.c:12`); `made_goal` is a 3-bit field and `met_nemesis` / `in_battle` are 1-bit (`quest.h:20–23`). The only call is `quest.c:503` inside `quest_talk`. `quest_stat_check` (`:513–518`) writes `in_battle` and `dochug` calls it first (`monmove.c:715`). `helpless` is `monst.h:251`.
**JS:** `js/quest.js` `nemesis_speaks` `:534`, `quest_talk` call `:569`, `quest_stat_check` `:587`. `rn2` is the live `js/rng.js` export. `monnear` is the live `js/mon.js` export.
**Change:** One `nemesis_speaks` in that C order. While `in_battle` is clear: `nemesis_wantsit` when the hero has the quest artifact, else `nemesis_first` when `made_goal` is 1 or the nemesis is unmet, else `nemesis_next` while `made_goal` is under 4, else `nemesis_other` while it is under 7, else `discourage` when `rn2(5)` is 0. Then `made_goal` increments while it is still under 7, and `met_nemesis` becomes 1.
**Verify:** `node scripts/verify.mjs --fn nemesis_speaks` → PASS syntax (1 changed js file: js/quest.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script shared-file regex) · VERIFY: PASS.
**Named:** `chat_with_nemesis` (`quest.c:393–400`) and `chat_with_guardian` (`:441–448`) stay out of `quest_chat`. `helpless` is inlined from `monst.h:251`; the six file-local clones stay.
**Next:** `botl.c` `exp_percent_changing` (next Open — coverage row). Five measured rows refilled (`start_glob_timeout`, `block_entry`, `mhitm_ad_stck`, `pre_mm_attack`, `nohandglow`). Twelve Open — coverage rows after archive.

## 2026-09-26 — D-2845 `enter_explore_mode` confirms before leaving the scored game

**C locus:** `nethack-c/upstream/src/cmd.c:952–983` `enter_explore_mode`. Callees `authorize_explore_mode` (`unixmain.c:640–651`, SYSCF on so the `#else` return TRUE is not compiled) and `check_user_string` (`unixmain.c:695–729`). `You`, `pline`, `paranoid_query(ParanoidQuit)`, `clear_nhwindow(WIN_MESSAGE)`. Callers `allmain.c:54` (`resuming && iflags.deferred_X`) and the extcmdlist row `cmd.c:1721` (`M('X')` `"exploremode"`, not AUTOCOMPLETE). `cmd.c:24` is the declaration.
**JS:** `js/cmd.js` `get_unix_pw` `:154`, `check_user_string` `:166`, `authorize_explore_mode` `:203`, `enter_explore_mode` `:222`. `js/allmain.js` call `:260`. `js/getline.js` `EXT_CMDS` `exploremode` `:533`.
**Change:** One `enter_explore_mode` in that C order. Already in explore mode is one `You`. Otherwise `authorize_explore_mode`, then the non-wizard refusal or the wizard note, then the Beware line, then `paranoid_query`.
**Verify:** `node scripts/verify.mjs --fn enter_explore_mode` → PASS syntax (3 changed js files: js/allmain.js js/cmd.js js/getline.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** `get_unix_pw` (`unixmain.c:731–760`) returns null: scored ESM has no passwd database. A non-`*` EXPLORERS list therefore refuses unless `sysopt.check_plname` is set and `plname` is on the list.
**Next:** `quest.c` `nemesis_speaks` (next Open — coverage row). Eight Open — coverage rows remain after archive, inside the band, so nothing was refilled.
