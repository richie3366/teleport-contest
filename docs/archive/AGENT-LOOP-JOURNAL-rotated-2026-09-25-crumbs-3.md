# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-21 — Audit 3de22e5b..51e65db7 (reviews 1656-1664: 9 ACCEPT, 0 Must-fix) + cadence 44/44.

Reviews audit D-2697..D-2705 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all re-runs: all 0-blocked
vacuous + REACH-OK, no REGRESSED). 1656 closes the 1654 Must-fix
(43 remaining coord-form sites wired, 15+43+3=61 arithmetic shuts).
Notable: 1661 movecmd txt-vs-funct equivalence + stale lock.js:128
comment; 1664 trimspaces leading-strip justified via describe_level
formats. Cadence: public 44/44 (Scr 11405/11405, RNG 792838/792838);
held-out 12/44 (+0); corpus 497/540 (+0/-0). Queue 8 unchecked, no
refill (at band). Rule #2 clean.

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).

## 2026-09-25 — D-2794 `timeout.c` start_timer whole-body port

**C locus:** `nethack-c/upstream/src/timeout.c:2247–2292` `start_timer`. Callees: `kind_name` `:1994–2011` (TIMER_NONE `impossible`), `insert_timer` `:2466–2480`, `alloc` `:67` (object literal). `VERBOSE_TIMER` is defined at `:1963`, so the duplicate text is `timeout_funcs[func_index].name`. `decl.c` `init_svt.timer_id` is `1UL`.
**JS:** `js/mkobj.js` `TIMEOUT_FUNC_NAMES :1201`, `start_timer :1228`, `insert_timer :954`. `js/timeout.js` `kind_name :2318`.
**Change:** Restart of `start_timer` in C order. Out-of-range kind or func_index calls `kind_name` then throws (panic has no JS paniclog). A duplicate calls `impossible` with the VERBOSE_TIMER name and returns false.
**Verify:** `node scripts/verify.mjs --fn start_timer --full` → PASS syntax (2 changed js files: js/mkobj.js js/timeout.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `objnam.c:5223` wish-corpse `ZOMBIFY_MON` timer still deferred at `js/readobjnam.js:1678` (would draw `rn1`). `zap.c:1355` `cancel_item` revive→rot swap still deferred at `js/zap.js:3495`.
**Next:** next Open — coverage row (`mkobj.c` mkcorpstat). Live queue still holds the measured coverage rows under that head (band full; no refill).

## 2026-09-25 — D-2793 `do.c` dodown whole-body port

**C locus:** `nethack-c/upstream/src/do.c:1131–1294` `dodown`. Same commit: `u_stuck_cannot_go` `:1110–1127` (callers `:1221` and `doup` `:1321`), `dungeon.c` `goto_hell` `:1957–1963` (sole caller `:1282`), `artifact.c` `artifact_has_invprop` `:2299–2305` (sole caller `:1162`).
**JS:** `js/do.js` `u_stuck_cannot_go :2944`, `goto_hell :2965`, `dodown :2977`, `doup` stuck call `:3170`. `js/artifact.js` `artifact_has_invprop :627`. `js/cmd.js` `set_move_cmd :283`, `u_rooted :4432`. `js/const.js` `DIR_DOWN :230`.
**Change:** Restart of `dodown` in C order. `set_move_cmd(DIR_DOWN, 0)` with `DIR_DOWN` restored to 8 (`zdir[8]` is +1). Controlled levitation walks `game.invent` (the hero's top-level list, C's `invent` nobj chain), ages a levitation artifact, then `float_down`.
**Verify:** `node scripts/verify.mjs --fn dodown` → PASS syntax (4 changed js files: js/artifact.js js/cmd.js js/const.js js/do.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `doup` still omits `set_move_cmd(DIR_UP)`, `u_rooted`, `stucksteed`, and `near_capacity() > SLT_ENCUMBER` (`do.c:1302–1328`). `Flying()` still omits the steed-flyer arm, so the lurker "fly out of hiding" test is hero H/E/B only.
**Next:** next Open — coverage row (`timeout.c` start_timer). Nine measured coverage rows were pasted under that head.

## 2026-09-25 — D-2792 `options.c` optfn_petattr whole-body port

**C locus:** `nethack-c/upstream/src/options.c:3138–3194` `optfn_petattr` and `:6152–6164` `handler_petattr`. NHOPTC wires the function pointer (`optlist.h:568`). do_init returns `optn_ok`. do_set takes the value with `string_for_opt(opts, negated)`, rejects a negated value, matches a tty/curses attribute name (`match_str2attr`, complain FALSE) or stores `ATR_NONE` when negated and empty, then sets `hilite_pet` from `wc2_petattr != ATR_NONE` and requests a redraw outside init. get_val / get_cnf_val copy `attr2attrname` on tty/curses. do_handler is `query_attr`.
**JS:** `js/options.js` `petattr_read :3961`, `optfn_petattr :3983`, `handler_petattr :4050`. `js/display.js` `petattr_to_tty :299`.
**Change:** `optfn_petattr` and `handler_petattr` in C order. Stored values are wintype.h `ATR_*` (`MC_ATR_*`). An unset field reads as `ATR_INVERSE` so the doset column stays `inverse` (`initoptions:7264` is not a JS function).
**Verify:** `node scripts/verify.mjs --fn optfn_petattr` → PASS syntax (2 changed js files: js/display.js js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `config_error_add` and `bad_negation` message text (existing no-op sinks). The non-tty `#else` store (`:3165`) is compiled out (`TTY_GRAPHICS`).
**Next:** next Open — coverage row after this one (the live queue still holds the 2026-09-25 `newcham` head).

## 2026-09-25 — D-2791 rc role/race/gender/align set `duplicate` before the optfn

**C locus:** `nethack-c/upstream/src/options.c:621` (`duplicate = duplicate_opt_detection(matchidx)` inside `parseoptions`, after `cnf_line_OPTIONS` calls `parseoptions(buf, TRUE, TRUE)` at `cfgfiles.c:608`). `parse_role_opt` `:7987–7990` rejects the positive. The saved filter comes from `rolefilterstring` (`role.c:1321–1354`), whose return is `&outbuf[1]` so the string starts with `'!'`. `read_config_file` `:1633` clears `dupdetected` before the file.
**JS:** `js/options.js` `rc_do_set_role_family :2367`, `duplicate_opt_detection` call `:2375`, `parseNethackrc` reset `:2394`, `parse_role_opt` `:4295`. `js/player_selection.js` `rolefilterstring :120` (`:154` drop the leading space).
**Change:** `rc_do_set_role_family` sets `go.opt_initial` and `go.opt_from_file` (the `TRUE, TRUE` pair) and `duplicateOpt` from `duplicate_opt_detection` before the optfn, then restores both so a leftover TRUE is not left for a later non-role option this reader never re-parses. `OPTN_SILENTERR` does not write `result.role` / `race` / `gender` / `align`. `parseNethackrc` clears `dupdetected` and `duplicateOpt` at entry, the `read_config_file` bracket, because startup does not call `rcfile`.
**Verify:** `node scripts/verify.mjs --fn optfn_gender` → PASS syntax (2 changed js files: js/options.js js/player_selection.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 1/1, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `config_error_add` and `complain_about_duplicate` message text (existing no-op sinks). `using_alias` is not set on the `character` / `align` aliases (the complaint text only).
**Next:** next Open — coverage row (`options.c` optfn_petattr).

## 2026-09-25 — D-2790 `options.c` nmcpy stops before a comma

**C locus:** `nethack-c/upstream/src/options.c:6859–6871` `nmcpy`. `for (count = 1; count < maxlen; count++)` breaks when `*src` is `','` or `'\0'`, then writes the terminating NUL.
**JS:** `js/options.js` `nmcpy :3785`. Call sites `fruitadd :3673` and `:3715`, `optfn_fruit :3859` and `:3862`, `optfn_role :4363`.
**Change:** Restart of `nmcpy` in C order: copy while `count < maxlen`, stop before a comma or NUL, return the bounded string (JS strings are immutable; callers assign). `fruitadd` now calls it for `makesingular` (`:8192`) and for the `candied ` tail (`:8239`, room `PL_FSIZ - 8`).
**Verify:** `node scripts/verify.mjs --fn optfn_fruit` → PASS syntax (1 changed js file: js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 1/1, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `petname_optfn` (`:866`), `optfn_name` (`:2561`), `optfn_windowtype` (`:4972`), and `initoptions_init` (`:7134`, `:7283`) are not JS functions. `optfn_windowchain` (`:4870`) is compiled out.
**Next:** remaining Must-fix: `parseNethackrc` role/race/gender/align `duplicateOpt` (review 1745).
