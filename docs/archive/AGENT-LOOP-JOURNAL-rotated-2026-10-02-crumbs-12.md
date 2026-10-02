# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
