# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-03 — D-3401 batch @1ae9cc180: vision/mon/pline/invent/display/dog/dungeon remainder (94 fns, 0 left open)

**C locus:** - `vision_recalc`: vision.c — vision_inited gate, Underwater pool 3x3, col-0 newsym guard.
**JS:** js/apply.js, js/const.js, js/dbridge.js, js/dig.js, js/display.js, js/do.js, js/dog.js, js/dungeon.js, js/eat.js, js/explode.js, js/fountain.js, js/hack.js, js/invent.js, js/lock.js, js/mhitm.js, js/mklev.js, js/mkobj.js, js/mon.js, js/monmove.js, js/pickup.js, js/pray.js, js/shk.js, js/shknam.js, js/sounds.js, js/timeout.js, js/trap.js, js/u_init.js, js/uhitm.js, js/vault.js, js/vision.js, js/write.js, js/zap.js.
**Change:** ported each manifest function whole in C order: every guarded arm, every callee imported live or named, every C caller wired to the live export (clones deleted, never duplicated). Prefer-restart for thin bodies; signatures kept.
**Verify:** full batch `verify.mjs --fn <94 fns>` exit 0, 94/94 REACH-OK (708 baseline-PASS sweep, 0 regressed); per-file checkpoints (display/dog/dungeon full, mon/pline/invent subsets) REACH-OK. Gates: `PASS syntax 32 changed js files` · `PASS rule2 no fs/path/url/node: imports, no DIAG/FORCE/seed gates` · `PASS green 2/2` · `PASS strict seed8000 + seed0900` · `PASS cohort 7/7` (checkpoints) · `PASS full 44/44 (auto: shared file changed)` · `VERIFY: PASS`.
**Named:** - `replmon`: mon.c:2703 unstuck (async-only: awaits docrt on swallow release).
**Next:** next `ledger.mjs batch` manifest.

## 2026-10-03 — D-3400 `display.c` feel_location Underwater gate reads live u.uinwater

**C locus:** - `feel_location`: nethack-c/upstream/src/display.c:769–772 (`Underwater && !Is_waterlevel(&u.uz) && !is_pool_or_lava && !is_ice` → return); `Underwater ≡ u.uinwater` (youprop.h:279).
**JS:** js/display.js +4/−2 (gate line + comment); scripts/feel-location-underwater.test.mjs new (+58).
**Change:** one-line flip to `(u.uinwater | 0)` + field-citing comment (youprop.h:279; never-written note) — the D-3393 newsym :5375 idiom. New focused test `scripts/feel-location-underwater.test.mjs` (3 subtests: uinwater fires / dead alias ignored / neither proceeds); pre-fix 2 failed (seenv 255 where C returns; seenv 0 where C proceeds), post-fix 3 pass. Scoped to this line — the ~20-site `u.Underwater` alias family is untouched per the queue row.
**Verify:** `node scripts/verify.mjs --fn feel_location` → VERIFY: PASS — syntax (js/display.js) · Rule #2 · hidden note (no corpus session blocked at baseline) · REACH-OK (no RNG-tagged reach; fixed 24-smoke, 24 PASS, 0 regressed) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file). Focused `node --test scripts/feel-location-underwater.test.mjs`: 3 pass.
**Named:** - `feel_location`: none new — pre-existing `feel_can_reach_floor` usteed P_RIDING/ustuck/ceiling-hider omit (doc :5092) stands, untouched.
**Next:** batch picker (`ledger.mjs batch --write`) — Must-fix queue is empty after this commit.

## 2026-10-03 — Audit 2346–2353: review D-3391–D-3399 (6 ACCEPT, 2 WITH-DEBT, 0 QUALITY-RISK) + full score

**Scope:** 8 js/ SHAs oldest-first (D-3398 docs-only, no review). Re-measured every D-log corpus claim with `verify --reach-all`: mdamagem 200/200, u_init_misc 707/707, adjust 115/115, move_special 42/42, kick 1/1, rest 24-smoke — 0 regressed anywhere.
**Change:** 2346 recover by-design ACCEPT; 2347 repopulate/only_here WITH-DEBT (2347.1 PERMINV reassign, inherited latent) + 2339.1 falsification confirmed correct; 2348 newsym guards ACCEPT + pre-existing find queued as Must-fix 2348.1 (feel_location reads never-written `u.Underwater`, C :769–772 needs `u.uinwater`); 2349 move_special/forget ACCEPT; 2350 dummyfunction/redraw WITH-DEBT (D-log "no C('l')" + "false comment" claims refuted by cmd.c:2762 — conclusions still hold via reset_commands overwrite); 2351 sfunconvert ACCEPT; 2352 u_init 6-fn ACCEPT; 2353 block sweep ACCEPT (5-file shape under operator overlay, premises verified).
**Verify:** sessions 44/44 (RNG 792,838/792,838, Scr 11,405/11,405); fortress 708/953 (+1 scen-options-Samurai-94071, 0 lost), `full: true`; held-out 15/44 +0 (judge 19:30Z, after all 8 SHAs).
**Next:** Must-fix 2348.1 feel_location one-line field flip + verify incl. full.

## 2026-10-03 — D-3399 missing-arm block sweep: mdamagem tail, kick pit/web reveal, converter teardown, sfbase stubs (8-function cluster)

**C locus:** - `sasc_bug`: `shk.c:5945–5948` — whole body (`op->unpaid = x`) inside `#ifdef __SASC` (opens `:5943`); 0 C refs.
**JS:** `js/mhitm.js:5653–5655` (tail + C comment); `js/dokick.js:31` (+You_cant/Hallucination), `:117` (+find_trap), `:1271–1283` (arm); `js/detect.js:336–342` (export + caller doc); `js/files.js:2231–2234` (cvtinit), `:2312–2327` (free); new `js/sfbase.js` (38 lines, 4 exports).
**Change:** (a) `sasc_bug`: none — by-design (`__SASC` is the Amiga SAS/C compiler; pinned Linux/gcc build compiles out decl + body, cf. D-3398/D-3391). (b) `mdamagem`: shared tail now `if (!damage) return hitflags;` with the C citation (matches the in-function AD_POLY sibling `:4675`). (c) `really_kick_object`: pit/web arm now `if (!trap.tseen) await find_trap(trap);` + `You_cant("kick %s that's in a %s!", something, Hallucination() ? 'tizzy' : web/pit)` in C order; `find_trap` exported from detect.js (same-file callers untouched) and added to dokick's existing detect edge (`imports.mjs --can`: ALREADY imports, no new edge), `You_cant`/`Hallucination` (canonical display.js youprop reader, D-1493) into the existing display edge. (d) `free_convert_filenames`: new export in C-order slot after `delete_convertedfile`, both names nulled (JS GC, no arena) + `cvtinit = false`; new `let cvtinit` state beside the filename statics (verified write-only: zero readers in src/ + include/). (e) new `js/sfbase.js` C-home with the 4 empty exports, UNUSED params voided (doconvert_file precedent). Tests: `scripts/files-convert-teardown.test.mjs` (null guards, idempotence, rebuild-after-free) + `scripts/sfbase-norm-ptrs.test.mjs` (4 stubs callable, null-tolerant) — 5/5 node:test PASS.
**Verify:** `node scripts/verify.mjs --fn sasc_bug,mdamagem,really_kick_object,free_convert_filenames,norm_ptrs_any,norm_ptrs_align,norm_ptrs_arti_info,norm_ptrs_attribs` → syntax PASS (5 files) · rule2 PASS · 8× hidden note (none blocked) · REACH-OK all (mdamagem 80-sample, kick 1/1, rest 24-smoke 24/24) · green 2/2 · strict both · cohort 7/7. VERIFY: PASS. Plus `verify --fn mdamagem --reach-all` → 200/200 REACH-OK (123.9s).
**Named:** - `sasc_bug`: none — by-design: whole function absent from the scored binary (Amiga-only `#ifdef __SASC`).
**Next:** missing-arm block is empty after this commit; generated coverage block refills via `ledger.mjs rows --write` (remaining gaps were ≤7 lines at last audit).

## 2026-10-03 — D-3398 mdlib.c mkstemp MSVC-only stub is by-design (compiled out)

**C locus:** - `mkstemp`: `mdlib.c:375–385` — whole body (`_mktemp_s` + `_open(_O_RDWR|_O_BINARY|_O_TEMPORARY|_O_CREAT)`) inside `#ifndef HAS_NO_MKSTEMP` + `#ifdef _MSC_VER` (`:372–373`, closes `:386–387`); decl `mdlib.c:69–73` under the same guards.
**JS:** none (no js/ file touched).
**Change:** none — by-design. `_MSC_VER` is defined only by the Microsoft compiler, so the pinned Linux/gcc build compiles neither the decl nor the body. Sole pinned-C caller is the `util/makedefs.c:492` build tool (outside the scored game), and libc supplies `mkstemp` on the pinned platform, so no VFS analogue is needed.
**Verify:** `node scripts/verify.mjs --fn mkstemp` → syntax PASS (0 files) · rule2 PASS · hidden note (no session blocked) · REACH-OK (no RNG-tagged reach; 24-smoke 24 PASS, 0 regressed) · green 2/2 · strict both · cohort 7/7. VERIFY: PASS.
**Named:** - `mkstemp`: none — by-design: the whole function is absent from the scored binary (MSVC-only `#ifdef _MSC_VER`, cf. D-3391 SELF_RECOVER).
**Next:** queue head is now `shk.c` sasc_bug (Amiga-only → by-design verdict row).

## 2026-10-03 — D-3397 u_init.c pauper gates + init gaps (6-function cluster)

**C locus:** - `knows_object`: `u_init.c:575–581` — `:577 if (u.uroleplay.pauper && !override_pauper) return`; 38 live call sites incl. `:715`/`:924` TRUE overrides.
**JS:** `js/u_init.js` — imports `:37` (wield +set_twoweap), `:45` (A_CHAOTIC), `:89–90` (botl/vault); `knows_object :1283–1290` (gate `:1285–1287`); `knows_class :1296–1299` (gate); `ini_inv_adjust_obj :829` (opoisoned `:841–844`, marker `:853–859`); `ini_inv_use_obj` shield `:1362–1367`; `u_init_misc :1955` (female `:1959–1962`, moved `:1968–1972`, blind `:2012–2015`, rank `:2022–2024`); `u_init_inventory_attrs` gold `:2053–2054`.
**Change:** single-file cluster in js/u_init.js (+48/−8), each arm in C order with C citations: pauper gates in both knows_ functions (param renamed to `override_pauper`); misc female/moved/mortality/grave-arise/blind/max_rank arms; adjust opoisoned clear (`A_CHAOTIC` into the const edge) + trotyp-keyed marker ink (same `typeof` idiom as ini_inv `:1467`); shield bimanual gate + `set_twoweap(false)` (`:1268`, academic but C-explicit); attrs `umoney0 += hidden_gold(true)`. Imports: `set_twoweap` into the existing wield edge; new botl (`max_rank_sz`) + vault (`hidden_gold`) edges — both `imports.mjs --can` SAFE (hoisted fn decls). Caught by cohort mid-iteration: bare `flags.female = initgend` wrote numeric 0 for males, which allmain's strict `!== false` misread as female (6 cohort welcomes flipped); coerced to `!!initgend` per C's boolean assignment — cohort + full re-green.
**Verify:** `node scripts/verify.mjs --fn knows_object,knows_class,u_init_misc,ini_inv_adjust_obj,ini_inv_use_obj,u_init_inventory_attrs` → hidden notes ×6 (no session blocked on any) · REACH-OK ×6 (u_init_misc 80/707 spread PASS; ini_inv_adjust_obj 80/115 spread PASS; other four 24-smoke 24 PASS, 0 regressed) · green 2/2 · strict both · cohort 7/7 · full 44/44 forced (init file). VERIFY: PASS. (Repo has no maintained unit harness — no tests/ dir; the fortress gates are the verification.)
**Named:** - `knows_object`: none — whole C body live (sole callee `discover_object` live).
**Next:** queue head is now `mdlib.c` mkstemp (MSVC-only → by-design verdict row).
