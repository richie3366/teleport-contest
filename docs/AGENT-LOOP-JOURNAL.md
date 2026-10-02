# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-02 — D-3304 `sp_lev.c` Lua-adjacent septet (l_register_des head + 3 by-design + 2 stale-complete + sel_set_wallify port)

**C locus:** - `l_register_des`: nethack-c/upstream/src/sp_lev.c:6435–6441 — `lua_newtable` + `luaL_setfuncs(nhl_functions)` + `lua_setglobal("des")`; sole caller nhlua.c:2347 (Lua-state init block).
**JS:** - `l_register_des`: no symbol (by-design) — no Lua runtime in scored ESM (nhlua.c 77 by-design seed; `nhlua_init`/`l_register` NOT FOUND in js/); des-table entries are called directly as JS exports (lspo_* live in js/mklev.js), so the registration itself has no analogue.
**Change:** four by-design resolutions + two stale-complete + one module-local port (C staticfn idiom, D-3293 precedent; same module as callee, no new import).
**Verify:** `node scripts/verify.mjs --fn l_register_des,sp_code_jmpaddr,get_trapname_bytype,cvt_to_relcoord,lspo_non_diggable,lspo_non_passwall,sel_set_wallify` → syntax PASS (1 changed js file: js/mklev.js) · Rule #2 PASS · hidden note ×7 (no corpus session blocked — normal for coverage) · REACH-OK ×7 (smoke spread 24/24 PASS each, no RNG-tagged reach) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** - `l_register_des`: the registration itself — no `lua_State`/global table exists in scored ESM.
**Next:** continue the missing-arm list (`iactions.c` ia_addmenu head).
## 2026-10-02 — D-3303 `vision.c` get_viz_clear (whole-body port, sole caller named)

**C locus:** - `get_viz_clear`: nethack-c/upstream/src/vision.c:105–110 — `if (isok(x,y) && !viz_clear[y][x]) return TRUE; return FALSE;` sole C caller levl_sanity_check wizcmds.c:1453 (`(does_block(…) ? 1 : 0) != get_viz_clear(x, y)`).
**JS:** - `get_viz_clear`: js/vision.js:104 — `if (isok(x, y) && !viz_clear[y][x]) return 1; return 0`; C short-circuit kept (isok guards the plane read); TRUE/FALSE → 1/0 ints matching the `does_block` int idiom and the sole C caller's `!=` int comparison.
**Change:** whole-body port in C order as an export in js/vision.js (C file order, before vision_init); `isok` added to the existing `./const.js` import (`imports.mjs --can`: ALREADY, no new edge; const.js:2313 is the C-locus cmd.c:isok, not the hacklib duplicate).
**Verify:** `node scripts/verify.mjs --fn get_viz_clear` → syntax PASS (1 changed js file: js/vision.js) · Rule #2 PASS · hidden note (no corpus session blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24/24 PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** - `get_viz_clear`: C caller levl_sanity_check (wizcmds.c:1443–1457) unported — no JS call site to wire; none in-body (whole C body live).
**Next:** continue the missing-arm list (`sp_lev.c` l_register_des head).
## 2026-10-02 — D-3302 `topten.c` score-stream quintet (discardexcess + nsb_mung/unmung + free_ttlist by-design, add_achieveX stale-complete)

**C locus:** - `discardexcess`: nethack-c/upstream/src/topten.c:208–215 — `do { c = fgetc(rfile); } while (c != '\n' && c != EOF)` drain-to-newline; callers readentry :246 (fscanf fail arm) and :256 (overlong-remainder arm).
**JS:** - `discardexcess`: no symbol (by-design) — JS `readentry` (js/topten.js:433) parses one pre-split VFS line; there is no FILE* stream position to drain, and both fail arms keep C's `points = 0` (js/topten.js:445, 465 — the docblock at :425 already names this omit; review 1607 ACCEPT).
**Change:** none in `js/` — four by-design resolutions + one stale-complete, all documented here and booked via Ledger.
**Verify:** `node scripts/verify.mjs --fn discardexcess,nsb_mung_line,nsb_unmung_line,free_ttlist,add_achieveX` → syntax PASS (0 changed js files) · Rule #2 PASS · hidden note ×5 (no corpus session blocked — normal for coverage) · REACH-OK ×5 (smoke spread 24/24 PASS each, no RNG-tagged reach) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file changed) → VERIFY: PASS.
**Named:** - `discardexcess`: the FILE* drain itself — no stream exists post-split (readentry docblock omit, review-1607 ACCEPTed).
**Next:** continue the missing-arm list (`vision.c` get_viz_clear head).
## 2026-10-02 — Audit 2256–2261: review D-3295–D-3301 (6 ACCEPT, docs-only D-3300 skipped) + full score

**Scope:** 6 js-touching SHAs since audit 2247–2255 (b4812e9cd, b23f261b5, 1896adcef, 42c45189d, 8859c7e6d, 3442eb4d9); 56ef5b381 (D-3300) is docs-only, out of scope.
**Reviews:** 2256–2261 all ACCEPT, 0 Must-fix families. Every D-log verify claim re-measured (`hidden-proxy verify --base <sha>~1 --reach-all`): all 0-blocked + REACH-OK, zero REGRESSED.
**Score:** public 44/44 (Scr 11,405, RNG 792,838, `332+1.61/turn`); corpus 705/953 PASS (RNG 98.09 %, screens 93.4 %), 0 losses / 0 gains, `full: true`; held-out 15/44 (rank 5, +0).
**Ledger:** `summary --snapshot` appended; 5 ported rows sampled (rumor_check, fopen_config_file, age_spells, price_quote, write_ls) — all resolve, no fixes. `ledger.mjs sql` unusable on Node v20.12.2 (no node:sqlite); sampled via jsonl grep.
## 2026-10-02 — D-3301 `mklev.c` vault/branch/sort triple (pos_to_room + makevtele + mkroom_cmp, all callers wired)

**C locus:** - `pos_to_room`: nethack-c/upstream/src/mklev.c:1677–1687 — rooms scan via `inside_room`, NULL fallthrough; sole caller place_branch :1714.
**JS:** - `pos_to_room`: js/mklev.js:33329 — `for i < g.level.nroom` scan returning the room or null (C NULL → null); live `inside_room` callee (js/mklev.js:32964).
**Change:** added three module-local functions in C-cite form (C staticfn idiom, D-3293 precedent); rewired all three C caller sites to the named functions.
**Verify:** `node scripts/verify.mjs --fn pos_to_room,makevtele,mkroom_cmp` → syntax PASS · Rule #2 PASS · hidden note (no corpus session blocked — normal for coverage) ×3 · REACH-OK ×3 (smoke spread 24 PASS, 0 regressed each) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file) → VERIFY: PASS.
**Named:** none — every arm, callee (live), and C caller wired. JS-only guards (unobservable under C semantics): `curr &&` null-hole guard in pos_to_room (JS rooms arrays can be sparse — makeniche guards `!aroom`; C structs cannot), `x?.lx || 0` in mkroom_cmp (preserves the prior inline arrow's exact nullish/NaN behavior).
**Next:** continue the missing-arm list (`topten.c` discardexcess head).
## 2026-10-02 — D-3300 `objnam.c` obuf/name-wrapper closure (nextobuf by-design + 11 stale-complete)

**C locus:** - `nextobuf`: nethack-c/upstream/src/objnam.c:142–146 whole body (C staticfn) — `obufidx = (obufidx + 1) % NUMOBUF; return obufs[obufidx];` 17 same-file C call sites (:203–:3041).
**JS:** - `nextobuf`: no symbol (by-design; pool cited at js/objnam.js:4064–4070).
**Change:** - `nextobuf`: ledger by-design — no JS symbol to add (a `return ''` stub would be dead; every C caller is ported on fresh strings). Evidence: no `obufs[]`/`obufidx` in scored JS; releaseobuf doc :4064–4070; xname_flags + doname_base ledger omits (D-2483 by-design strings).
**Verify:** `node scripts/verify.mjs --fn nextobuf,releaseobuf,thesimpleoname,Yname2,The,Yobjnam2,obj_is_pname,An,yobjnam,Japanese_item_name,Doname2,Ysimple_name2` → VERIFY: PASS — syntax 0 changed js files; rule2 clean; hidden 0 blocked ×12 (coverage rows); reach REACH-OK ×12 (fixed smoke spread 24/24 each, no RNG-tagged reach); green 2/2; strict ×2; cohort 7/7; full skipped (no shared file changed).
**Named:** - `nextobuf`: the pool itself — `obufs[NUMOBUF][BUFSZ]` rotation has no JS counterpart (immutable strings; D-2483 by-design strings).
**Next:** queue head now `mklev.c` pos_to_room (missing-arm row 2); objnam.c measured-gap unknowns exhausted (remaining unknowns measured-ok or declared). Observed, not queued (hand rows are Must-fix/corpus only): js/wield.js:1288 `Yobjnam2` clone is xname-based (drops yobjnam's aobjnam/shk_your-gate arms) and js/do_wear.js:276 `obj_is_pname` clone drops the gameover/override_ID gate — clone-drift candidates if a review ever names them.
## 2026-10-02 — D-3299 `pline.c` There (do.js clone removal + canonical import rewire)

**C locus:** - `There`: nethack-c/upstream/src/pline.c:425–433 whole body (C extern) — `vpline(YouMessage(tmp, "There ", line), the_args)`; YouMessage = strcpy+strcat into the You_buf growable buffer (:338–363), memory mgmt unneeded in JS. 55 C call sites.
**JS:** - `There`: js/display.js:7915 (canonical export, pre-existing, unchanged); rewire js/do.js:752 (import :65; clone deleted :505).
**Change:** - `There`: deleted the do.js:505 clone (C-cite comment left at the site); added `There` to the existing `./display.js` import (do.js:65; `imports.mjs --can`: ALREADY, no new edge). Behavior-neutral at the sole caller: single preformatted arg (no dropped args) and `pline(fmt,...args) ≡ vpline(fmt,...args)` (display.js:8274).
**Verify:** `node scripts/verify.mjs --fn There` tail pasted verbatim:
**Named:** - `There`: none in-body — whole C body live in the canonical export (You_buf growth + free_youbuf are memory-mgmt only, by-design; null/empty guard is the file idiom). Audit omission: per-site mapping of 54 C call sites (see Callers).
**Next:** queue holds 1 row (`objnam.c` nextobuf, by-design-or-port). Refill stays thin: generated block dry at C≥8 (all remaining unknown/absent gaps ≤7 lines); hidden-proxy owners all tagged; next iters continue hand-verified missing-arm rows from `rows --min-c-lines 1` + brief evidence (pline.c exhausted: You_buf/free_youbuf by-design, dumplog* retired D-1776).
## 2026-10-02 — D-3298 `decl.c` program_state_init (early_init zero-reset + jsmain wiring)

**C locus:** - `program_state_init`: nethack-c/upstream/src/decl.c:1074–1077 whole body (C extern) — `program_state = init_program_state` (`{ 0 }`, decl.c:1001; every `struct sinfo` int reads 0, hack.h:776+). Sole C caller allmain.c:35 `early_init` (first call, before `decl_globals_init` :40).
**JS:** - `program_state_init`: js/decl.js:42–55 (export :53); caller js/jsmain.js:130 (+ import :14).
**Change:** - `program_state_init`: `export function program_state_init()` in `js/decl.js` (C file order, before `decl_globals_init`), body `game.program_state = {}` — `{}` ≡ `{ 0 }` under the falsy-default read idiom (same as `reset_instance_globals`); unconditional assign, never merge, like C. Wired as the first call after `resetGame()` in `jsmain.js start()`, same relative order as C (:35 before :40). Import extended on the existing `./decl.js` edge (no new module edge).
**Verify:** `node scripts/verify.mjs --fn program_state_init` → VERIFY: PASS — syntax 2 files (js/decl.js, js/jsmain.js); rule2 clean; hidden 0 blocked (coverage row); reach smoke 24/24 REACH-OK; green 2/2; strict ×2; cohort 7/7; full 44/44 (auto: shared file changed).
**Named:** - `program_state_init`: none — whole C body live (single assignment; no merge/restore semantics — C calls it once at startup only).
**Next:** queue EMPTY after this commit: 7 rows consumed (1 shipped, 6 retired), remainder 0, refill dry — (1) `rows --write` 0 rows; (2) hidden-proxy 79/79 owners tagged open/parked/archived; (3) no park names one concrete writer + session (full index scanned — all vague/conditional/parked/truncated); (4) no verified-absent arm (objects_globals_init live js/objects.js:69; monst_globals_init vacuous — JS mons() mints fresh, geno lives in mvitals; putstr/raw_print/raw_print_bold are winprocs macros, not functions). Next iteration has no head: brief new (4) candidates under its own refill authorization, or a human reopens phase 2 ([measure] W2/W3 rows waiting).
## 2026-10-02 — D-3297 `hacklib.c` char trio: digit + letter + onlyspace (canonical exports, 3 rewires)

**C locus:** - `digit`: nethack-c/upstream/src/hacklib.c:62–65 whole body (C extern, hacklib.h) — `boolean ('0' <= c && c <= '9')`.
**JS:** - `digit`: `js/hacklib.js:236` (exported, C extern).
**Change:** - `digit`: `export function digit(c)` in C order, char-or-code param (highc/lowc idiom); single-char string compare is code compare, all below 128 (no signed-char trap).
**Verify:** `node scripts/verify.mjs --fn digit,letter,onlyspace` tail pasted verbatim:
**Named:** - `digit`: none in-body — whole C body live (unwired callers keep C-exact inlines, listed above).
**Next:** queue head moves to `topten_print`. Same-file ledger-Open audit (this iter): brief-verified live — strip_newline `js/pager.js:2941` (D-2565), xcrypt `js/rumors.js:34`, what_datamodel_is_this `js/version.js:329`, sgn `js/eat.js:2848` + 17 clones (consolidation over cap, left); read-verified C-cited in `js/hacklib.js` — highc lowc lcase ucase upstart trimspaces eos str_start_is str_end_is str_lines_maxlen strkitten copynchars ing_suffix stripchars stripdigits strsubst strNsubst findword ordin distmin dist2 online2 fuzzymatch swapbits; nh_snprintf skipped (Snprintf-macro backend only, zero direct C callers — printf-family pass).
## 2026-10-02 — D-3296 `cmd.c` missing-arm trio: levltyp_to_name + table, do_rush_west, cmdq_reverse

**C locus:** - `levltyp_to_name`: nethack-c/upstream/src/cmd.c:1089–1094 whole body (C extern, extern.h:425) + `levltyp[MAX_TYPE+2]` table cmd.c:1072–1086 (37 rm.h-order names + `[37]` undiggable + `[38]` pad). C callers mon.c:226 (inside `#if 0` `:223–235`, dead) + nhlua.c:551 (in `nhl_getmap`, ledger by-design "no scored analogue").
**JS:** - `levltyp_to_name`: `js/cmd.js:634` (exported, C extern); table `js/cmd.js:613`.
**Change:** - `levltyp_to_name`: `export const levltyp` (39 entries, C `:1073–1085` order verbatim) + `export function levltyp_to_name` in C order (`typ >= 0 && typ < MAX_TYPE` short-circuit, NULL → null); `MAX_TYPE` added to the existing const.js import (value 37 = rm.h:94; no new edge).
**Verify:** `node scripts/verify.mjs --fn levltyp_to_name,do_rush_west,cmdq_reverse` tail pasted verbatim:
**Named:** - `levltyp_to_name`: none in-body — whole C body + table live (both C callers unwired as above).
**Next:** head is now `hacklib.c` digit (missing-arm row); `cmd.c` holds no more Open rows.
## 2026-10-02 — D-3295 `getpos.c`/`selvar.c` sethilite gather pair: getpos_getvalids_selection + selection_force_newsyms port, sethilite restart

**C locus:** - `getpos_getvalids_selection`: nethack-c/upstream/src/getpos.c:102–115 whole body (C staticfn) — null-guard `:108–109`, then `selection_setpoint(x, y, sel, 1)` every sel-scoped cell where validf is true (`:111–114`; x from 1, y from 0). C callers getpos.c:53 (old valids) + :56 (new valids), both in getpos_sethilite.
**JS:** - `getpos_getvalids_selection`: `js/getpos.js:103` (module-local, C staticfn).
**Change:** - `getpos_getvalids_selection`: module-local `function getpos_getvalids_selection(sel, validf)` in C order (guard + sel.wid/sel.hei scans + `selection_setpoint`); live `selection_setpoint` import (mklev.js:30157), no clone.
**Verify:** `node scripts/verify.mjs --fn getpos_getvalids_selection,selection_force_newsyms` tail pasted verbatim:
**Named:** - `getpos_getvalids_selection`: none in-body — whole C body live (`typeof validf` guard is the JS null-vs-undefined idiom for C `!validf`).
**Next:** head is now `cmd.c` levltyp_to_name (missing-arm row); queue refilled per-row-evidence below.
## 2026-10-02 — Audit 2247–2255: review D-3286–D-3294 (9 ACCEPT) + full score

**Scope:** d8fa56ce0…6f1e33d59 (9 js/ SHAs since 2246), one SHA at a time, each re-measured via `hidden-proxy verify --base <sha>~1 --reach-all`.
**Verdicts:** 9 ACCEPT, 0 Must-fix. Every D-log verify claim re-measured exact (0-blocked vacuous + smoke/reach REACH-OK per fn; zero REGRESSED). Unqueued nits: D-3294 RND ledger note cites C :62-66 for a :62-64 body; onlyspace js/topten.js:65 trims all whitespace where C keeps space/tab-only (single caller topten.c:325, names can't hold newline — predates window, survey note).
**Fortress:** public 44/44 (Scr 11405, RNG 792838, `329+1.62/turn` R² 0.78); corpus 705/953 (74.0%), RNG 98.09%, scr 93.4%, 0 losses, 1 gain (scen-tour-Valkyrie-92040); `full: true` @6f1e33d59 fullAt 16:04:02Z. Held-out 15/44 (+0), rank 5.
**Ledger:** snapshot appended; `ledger.mjs sql` unrunnable (node v20, no node:sqlite) — 5 ported rows sampled via jsonl+brief instead (drop, wiz_flip_level, trapeffect_dart_trap, sfi_version_info, vtense): all stand. Refill: coverage 0 rows, queue 30/30 tagged (0 eligible; scoreboard hash verified unchanged after the read-only queue call); ~20-brief hand survey converged with D-3294's Next survey (dead decl-only callbacks / representation-subsumed / live) → 0 new rows, queue stays 7 Open (below band, no filler). Ledger: known_vibrating_square_at → ported (stale, whole at js/getpos.js:740); makevtele effect inlined js/mklev.js:28302-28304 (tool needs a --js fn for ported/split — left absent, do not row).
