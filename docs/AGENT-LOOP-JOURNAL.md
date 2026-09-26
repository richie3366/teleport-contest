# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-09-26 — D-2844 `dumpit` lists dungeons when DEBUGFILES names dungeon.c

**C locus:** `nethack-c/upstream/src/dungeon.c:91–144` `dumpit`. Callees `explicitdebug` → `debugcore` (`files.c:3126–3166`, `wildcards` FALSE) and `nh_basename` (`files.c:199–229`). Caller `dungeon.c:1317` inside `#ifdef DEBUG` (`patchlevel.h:36` defines `DEBUG`). `dungeon.c:88` is the declaration.
**JS:** `js/dungeon.js` `dumpit` `:1113`, call `:1257`. `js/files.js` `nh_basename` `:1267`, `debugcore` `:1294`. `pmatch` is the live `js/cmd.js` export.
**Change:** One `dumpit` in that C order. It returns unless `debugcore('dungeon.c', false)`. Otherwise it formats every dungeon, every special level, and every branch, with the same type names and flag words as `fprintf`.
**Verify:** `node scripts/verify.mjs --fn dumpit` → PASS syntax (3 changed js files: js/cmd.js js/dungeon.js js/files.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script shared-file regex). `node frozen/ps_test_runner.mjs sessions` → 44/44 PASS. VERIFY: PASS.
**Named:** `(void) getchar()` does not block: scored ESM has no stdin in Chrome. The formatted lines stay in a module array, not a host stderr stream.
**Next:** `cmd.c` `enter_explore_mode` (next Open — coverage row). `peffect_restore_ability` and `place_level` parked Stale. Nine Open — coverage rows remain after archive, inside the band, so nothing was refilled.
## 2026-09-26 — Audit 1794–1802 (D-2835…D-2843)

Nine JS SHAs after review 1793 (`236be808b`). All **ACCEPT**: insects predicates, `place_lregion` tele chain, `setopt_cmd`, autopickup exceptions, poison/joust/`AD_DREN`, `placebc_core`, `fixup_special`, `handler_msgtype`, `iter_mons_safe`. No Must-fix. Public `sessions` 44/44, Scr 11,405/11,405, RNG 792,838/792,838, speed `273+1.83/turn` (R² 0.785). Held-out still 12/44 (6,059/11,265, RNG 29.2 %, screens 53.8 %). Next: `potion.c` `peffect_restore_ability`.
## 2026-09-26 — D-2843 `iter_mons_safe` snapshots the monster list before movement

**C locus:** `nethack-c/upstream/src/mon.c:4500–4522` `iter_mons_safe`. Callee `alloc_itermonarr` `:4471–4490` (statics `itermonarr` / `itermonsiz` `:4465–4466`). Caller `movemon` `:1330`. `save.c:1108` calls `alloc_itermonarr(0U)` inside `freedynamicdata` under `FREE_ALL_MEMORY`.
**JS:** `js/mon.js` `alloc_itermonarr` `:3722`, `iter_mons_safe` `:3749`, `movemon` call `:3787`.
**Change:** One `iter_mons_safe` in that C order. Count every `fmon` slot (the JS array is the `nmon` chain, including dead and off-map monsters), `alloc_itermonarr`, copy the object references, then call `bfunc` until it returns true. `program_state.gameover` breaks before the next monster because C `done` does not return (`:4494–4498`).
**Verify:** `node scripts/verify.mjs --fn iter_mons_safe --full --reach-all` → PASS syntax (1 changed js file: js/mon.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `save.c:1108` `alloc_itermonarr(0)` stays inside unported `freedynamicdata` (`FREE_ALL_MEMORY`). `decl.h` `instance_globals_i.itermonarr` is not the live buffer; the C functions use the `mon.c` static.
**Next:** `potion.c` `peffect_restore_ability` (next Open — coverage row). Five measured rows refilled (`generate_stairs_find_room`, `confused_book`, `get_unused_cs`, `attach_fig_transform_timeout`, `rnd_otyp_by_wpnskill`). Twelve Open — coverage rows after archive.
## 2026-09-26 — D-2842 `handler_msgtype` adds, lists, and removes message patterns

**C locus:** `nethack-c/upstream/src/options.c:6502–6570` `handler_msgtype`. Callees `msgtype_count` (`:7830`), `handle_add_list_remove` (`:9208`), `getlin`, `test_regex_pattern` (`:7871`), `query_msgtype` (`:7700`), `msgtype_add` (`:7730`), `pline`, `wait_synch`, `msgtype2name` (`:7689`), `select_menu`, `free_one_msgtype` (`:7771`). Caller `optfn_o_message_types` `:8408` (declaration `:414`).
**JS:** `js/options.js` `query_msgtype` `:518`, `free_one_msgtype` `:574`, `msgtype_count` `:624`, `msgtype_menu_text` `:5031`, `handler_msgtype` `:5051`, `optfn_o_message_types` `:5119`, doset value `:7502`, doset call `:7567`, allopt `:7923`.
**Change:** One `handler_msgtype` in that C order. Done and ESC return `optn_ok`. Add runs only when the pattern is non-empty, the regex compiles, and `query_msgtype` is not -1; the error pline runs only when `msgtype_add` fails.
**Verify:** `node scripts/verify.mjs --fn handler_msgtype` → PASS syntax (1 changed js file: js/options.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared file) · VERIFY: PASS.
**Named:** `config_error_add` and `regex_error_desc` inside `msgtype_add` stay the existing sink. Menu glyph columns (`nul_glyphinfo`) are absent.
**Next:** `mon.c` `iter_mons_safe` (next Open — coverage row). Eight Open — coverage rows remain after archive, inside the band, so nothing was refilled.
## 2026-09-26 — D-2841 `fixup_special` sets up water, graveyards, and the town flag

**C locus:** `nethack-c/upstream/src/mkmaze.c:570–704` `fixup_special`. Callees `setup_waterlevel` (`mkmaze.c:1812`), `find_level`, `place_lregion` (`:356`), `goodpos`, `mk_tt_object`, `poly_when_stoned`, `pm_resistance`, `set_corpsenm` (`mkobj.c:1318`), `rndmonnum`, `mkcorpstat`, `baalz_fixup`, `stolen_booty`, `Is_special`. `Is_baal_level` is `on_level(&u.uz, &baalzebub_level)`. Callers `sp_lev.c:6050` (`lspo_finalize_level`) and `sp_lev.c:6491` (`load_special`). `mklev.c:1558` is a comment.
**JS:** `js/mklev.js` `fixup_special` `:2415`, `fixup_special_tail` `:2534`, `load_air` `:15523`, `load_water` `:15594`, `lspo_finalize_level` `:2192`.
**Change:** One `fixup_special` in that C order. Water or air sets `hero_memory` to 0 and calls `setup_waterlevel` before the region walk. Branch sets `added_branch` and places; a portal uses atoi or `find_level`; stairs place; tele copies `updest` and `dndest`.
**Verify:** `node scripts/verify.mjs --fn fixup_special` → PASS syntax (1 changed js file: js/mklev.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared file) · VERIFY: PASS.
**Named:** The branch fallback still requires `!game.made_branch`. `place_branch` returns immediately when that latch is set, but `place_lregion` on a roomless level burns 200 `rn1` before that return.
**Next:** `options.c` `handler_msgtype` (next Open — coverage row). Nine Open — coverage rows remain, inside the band, so nothing was refilled.
## 2026-09-26 — D-2840 `placebc_core` rusts the chain and records the under-glyph

**C locus:** `nethack-c/upstream/src/ball.c:120–144` `placebc_core`. Callees `flooreffects` (`do.c:162`), `place_object` (`mkobj.c:2305`), `newsym`, and the `carried` macro (`obj.h:332`, `where == OBJ_INVENT`). Callers `placebc` `:208` and `lift_covet_and_placebc` `:253` (`BREADCRUMBS` is undefined, so `Placebc` `:283` and `Lift_covet_and_placebc` `:345` are not compiled). `NH_DEVEL_STATUS` is `NH_STATUS_RELEASED`, so the `paniclog` arms in those callers are compiled out.
**JS:** `js/ball.js` `placebc_core` `:388`, `placebc` `:425`, `lift_covet_and_placebc` `:524`. Awaited `placebc`: `js/mhitu.js:1650` and `:1890`, `js/trap.js:2218` and `:6341`, `js/wizcmds.js:627`, `js/do.js:1967`, `js/teleport.js:1540`, `js/shk.js:1414`, `js/read.js:1982`. `flooreffects` import is the live `js/do.js` export (`imports.mjs --can` SAFE, hoisted).
**Change:** One `placebc_core` in that C order. The chain is offered to the floor, then the ball when it is not in inventory, then the chain is placed on top. Both under-glyphs are `levl_glyph_at` snapshots (this port stores remembered cells).
**Verify:** `node scripts/verify.mjs --fn placebc_core` → PASS syntax (8 changed js files: js/ball.js js/do.js js/mhitu.js js/read.js js/shk.js js/teleport.js js/trap.js js/wizcmds.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared file) · VERIFY: PASS.
**Named:** `Placebc` / `Lift_covet_and_placebc` (`ball.c:259–346`) stay out because `BREADCRUMBS` is not defined. The caller `paniclog` arms are compiled out (`NH_STATUS_RELEASED`).
**Next:** `mkmaze.c` `fixup_special` (next Open — coverage row). `set_wall_state` parked Stale. Ten Open — coverage rows remain, inside the band.
