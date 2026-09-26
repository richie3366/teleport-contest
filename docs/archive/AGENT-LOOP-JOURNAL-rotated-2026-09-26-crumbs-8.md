# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
