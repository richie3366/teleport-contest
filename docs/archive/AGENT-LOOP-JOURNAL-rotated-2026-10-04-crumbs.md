# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-03 — D-3396 files.c nh_sfunconvert unconvert hook

**C locus:** - `nh_sfunconvert`: `files.c:2079–2082` — `(void) doconvert_file(filename, 0, TRUE);`, game-build `#ifndef SFCTOOL` hook; 0 C call sites in pinned C.
**JS:** `js/files.js:2344–2352` nh_sfunconvert (:2350); `:2316–2317` doconvert_file doc touch-up.
**Change:** new exported `nh_sfunconvert` in js/files.js in C order right after `nh_sfconvert` (`:2344–2352`), whole 1-line body `doconvert_file(filename, 0, true)` mirroring the sibling convert hook; retired the "(unported — ships with that function)" clause in the doconvert_file doc. Same-file call, no new import or clone.
**Verify:** `node scripts/verify.mjs --fn nh_sfunconvert` → syntax PASS (1 file) · rule2 PASS · hidden note (no session blocked) · REACH-OK (no RNG-tagged reach; 24-smoke 24 PASS, 0 regressed) · green 2/2 · strict both · cohort 7/7. VERIFY: PASS.
**Named:** - `nh_sfunconvert`: none — whole C body live (sole C callee `doconvert_file` live same-file).
**Next:** queue head is now `u_init.c` knows_object pauper gate (next Open missing-arm row).

## 2026-10-03 — D-3395 cmd.c dummyfunction + redraw_cmd generic-bind arm

**C locus:** - `dummyfunction`: `cmd.c:5699–5702` — staticfn returning ECMD_CANCEL; decl-only C ref cmd.c:151, no live callers.
**JS:** `js/cmd.js:1522–1530` dummyfunction (:1528); `js/getpos.js:113–128` redraw_cmd (:124) + :65 import; `js/display.js:5818–5821` doredraw comment.
**Change:** (a) new exported `dummyfunction` in js/cmd.js in C order right after dosh_core (`:5681–5696`), whole 1-line body, ECMD_CANCEL already imported; (b) getpos.js redraw_cmd re-ported in C order against live cmdbind_get (added to the existing dokeylist import — no new edge): `cmdbind_get(uc)?.txt === 'redraw'` is the C ef_funct test (txt 1:1 with ef_funct per dokeylist.js; same predicate as lock.js getdir_is_redraw for the C `:4013` site); retired the stale doredraw Named note. Measured: C binds only C('r') to doredraw (cmd.c:1818–1819; no `C('l')` anywhere in cmd.c), default-map scan shows sole redraw key 18, and C-l is consumed earlier as CTRL_DIR rush in getpos (walk block → continue) — so default-bind behavior is unchanged; only rebound keys move, toward C.
**Verify:** `node scripts/verify.mjs --fn dummyfunction,redraw_cmd` → syntax PASS (3 files) · rule2 PASS · hidden notes (no session blocked on either) · REACH-OK both (24-smoke each, 24 PASS, 0 regressed) · green 2/2 · strict both · cohort 7/7 · full 44/44 (auto: shared file changed). VERIFY: PASS. (One comment line reworded after the run for C-l accuracy; `node --check` re-passed on all 3 files.)
**Named:** - `dummyfunction`: none — whole C body live (0 C callees).
**Next:** queue head is now `files.c` nh_sfunconvert (next Open missing-arm row).

## 2026-10-03 — D-3394 priest.c move_special shop re-entry arm + forget_temple_entry diagnostic

**C locus:** - `move_special`: `priest.c:125–126` — `if (mtmp->isshk && !in_his_shop && inhishop(mtmp)) check_special_room(FALSE);` after place_monster/newsym.
**JS:** `js/shk.js:4520–4521` inside `move_special` (:4432); `js/priest.js:64–71` inside `forget_temple_entry` (:62); `scripts/move-special-shop-reentry.test.mjs`.
**Change:** (a) C-order arm after newsym: `if (mtmp.isshk && !in_his_shop && inhishop(mtmp)) await check_special_room(false);` — both callees live with no new edge (inhishop in-file :833, check_special_room in the existing hack.js import :52; mx/my already hold the new square so inhishop reads post-move position like C); (b) disorder arm gains `void impossible('attempting to manipulate shrine data for non-priest?');` with the exact C string — `void` keeps the sync signature (in-file precedent :255/:259); unreachable by construction (both C callers mkobj.c:2159/save.c:893 and all JS sites guard with ispriest). New `scripts/move-special-shop-reentry.test.mjs` (4 headless cases).
**Verify:** `node --test scripts/move-special-shop-reentry.test.mjs` → 4/4 PASS (re-entry refreshes occupancy / in_his_shop control untouched / timers zeroed / non-priest clean return). `node scripts/verify.mjs --fn move_special,forget_temple_entry` → syntax PASS (2 files) · rule2 PASS · hidden notes (no session blocked on either) · REACH-OK both (move_special 42 reached, 42 PASS; forget_temple_entry 24-smoke, 24 PASS; 0 regressed) · green 2/2 · strict both · cohort 7/7. VERIFY: PASS.
**Named:** - `move_special`: none remaining — ledger omit resolved; all 15 C callees live (pline/Monnam/distant_name/obj_extract_self/mpickobj serve the `#if 0` dead pickup block only).
**Next:** queue head is now `cmd.c` dummyfunction (next Open missing-arm row).

## 2026-10-03 — D-3393 display.c fn_cmap_to_glyph + newsym flux/Underwater guards

**C locus:** - `fn_cmap_to_glyph`: `display.c:3796–3800` — C++-compat function version of the `cmap_to_glyph` macro (Qt sources); whole body is `return cmap_to_glyph(cmap)`.
**JS:** `js/display.js:685` (`fn_cmap_to_glyph`); `js/display.js:5360` (flux gate), `:5371–5379` (Underwater gate) inside `newsym` (:5356).
**Change:** (a) new `export function fn_cmap_to_glyph` beside `cmap_to_glyph`, whole C body; (b) `newsym` gains `if (suppress_map_output()) return;` first (in-file :5101, same as `feel_location`), then after the uswallow block the Underwater gate in C order/short-circuit: `(u.uinwater|0)` (C `Underwater ≡ u.uinwater`, youprop.h:279; the live field — `set_uinwater` writers) `&& !Is_waterlevel(u.uz)` (const.js import, already in-file) `&& (!(is_pool_or_lava_disp || is_ice_disp) || !(dist2(...) <= 2))` (`next2u ≡ distu <= 2`, you.h:558; in-file `_disp` helpers + `dist2` import — no new cross-module edge, no 6th `next2u` clone since C is a macro).
**Verify:** `node scripts/verify.mjs --fn fn_cmap_to_glyph,newsym` → syntax PASS (1 file) · rule2 PASS · hidden note (no session blocked on either) · REACH-OK both (fixed 24-session smoke spreads, 0 regressed) · green 2/2 · strict both · cohort 7/7 · full 44/44 (auto: shared file). VERIFY: PASS.
**Named:** - `fn_cmap_to_glyph`: none — whole C body live (0 C callees besides `cmap_to_glyph`).
**Next:** queue head is now `priest.c` move_special shop re-entry arm; refill attempted — `rows --write` 0 rows, `hidden-proxy queue --limit 30` 0 eligible (all open/parked/archived), Parked writer spot-check (`touch_artifact`) stale (live js/artifact.js:1570) — 4 genuine rows remain, none manufactured.

## 2026-10-03 — D-3392 Must-fix 2339.1 falsified (postmov :1669 predates review) + invent.c repopulate_perminvent/only_here port

**C locus:** - `after_shk_move` call site: nethack-c/upstream/src/monmove.c:1700–1702 inside `:1660 if (mmoved == MMOVE_MOVED || MMOVE_DONE)`.
**JS:** js/invent.js:4377 `repopulate_perminvent`, js/invent.js:4564 `only_here`, js/invent.js:4575 `display_binventory` (buried C-shape restructure); scripts/repopulate-only-here.test.mjs.
**Change:** (a) none — falsified with git evidence (a redundant call-site guard drafted mid-iteration was reverted; it would be constant-true). (b) `repopulate_perminvent` export with the `:3094` dispatch against live splits (cached branch mirrors `display_inventory`'s post-cmdq sequence — no cmdq_pop since C calls display_pickinv directly; PERMINV branch via local `pickinv_build_perm` + the sync_perminvent gi epilogue); `only_here` local (C staticfn, cf. `worn_wield_only`); `display_binventory` buried section restructured to exact C shape (count loop `:5527–5533`, `if (n)` set/filter/reset `:5536–5543`) — omit line deleted; new `scripts/repopulate-only-here.test.mjs` (5 headless cases).
**Verify:** `node --test scripts/repopulate-only-here.test.mjs` → 5/5 PASS ×3 runs (binventory n==0 gate + n==2/reset/one-prompt, repopulate PERMINV/gi-epilogue + cached + wizid dispatch). `node scripts/verify.mjs --fn repopulate_perminvent,only_here --full` → VERIFY: PASS — syntax (js/invent.js) · Rule #2 · hidden notes (no corpus session blocked; expected for coverage rows) · REACH-OK ×2 (no RNG-tagged reach; fixed 24-smoke each, 24 PASS, 0 regressed) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44.
**Named:** - `repopulate_perminvent`: none — DUMPLOG in_dumplog (`:3089–3093`) is compiled out (D-1776), not an omission; TTY_PERM_INVENT `:3095–3097` holds a commented-out line only.
**Next:** `display.c` fn_cmap_to_glyph queue row (next Open missing-arm row).

## 2026-10-03 — D-3391 `files.c` recover_savefile compiled-out port reverted to by-design

**C locus:** - `recover_savefile`: nethack-c/upstream/src/files.c:2864–3082 under `#ifdef SELF_RECOVER` (files.c:2858; unixconf.h:126 leaves it undefined); sole C caller sys/unix/unixunix.c:216–219 inside the same ifdef — compiled out of the contest binary and the recorder.
**JS:** js/files.js only — 8 insertions (doc lines), 299 deletions.
**Change:** deleted the dead JS — `recover_savefile` doc+body, `sfo_int` doc+body, `sfvalue_int` doc+body (git retains the text); ledger → by-design. The five stale docs now say compiled-out/by-design. Removed the now-unused `PL_NSIZ_PLUS` import (const.js export stays — js/dungeon.js:2175 uses it); `vfsReadFile`/`LFILE_EXISTS` stay (live users elsewhere).
**Verify:** `node scripts/verify.mjs --fn recover_savefile --full` → VERIFY: PASS — syntax (js/files.js) · Rule #2 · hidden note (no corpus session blocked; vacuous by construction — compiled-out code has no reach) · REACH-OK (no RNG-tagged reach; fixed 24-smoke, 24 PASS, 0 regressed) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44.
**Named:** - `recover_savefile`: none — by-design: the whole function is absent from the scored binary (no scored analogue, RUNBOOK §4).
**Next:** Must-fix 2339.1 (`monmove.c` postmov after_shk_move MOVED|DONE guard).
