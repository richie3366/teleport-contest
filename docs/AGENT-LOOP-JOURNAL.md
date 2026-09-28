# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-28 — D-3038 `o_init.c` objdescr_is whole: canonical export + 4-clone fold

**C locus:** - `objdescr_is`: nethack-c/upstream/src/o_init.c:352–365 — null guard `:356-359`, OBJ_DESCR fetch `:361` (objclass.h `:191`: obj_descr[oc_descr_idx].oc_descr), null-descr fallthrough `:362-363`, strcmp match `:364`.
**JS:** - `objdescr_is`: js/apply.js canonical export, restarted whole in C order.
**Change:** restarted the export whole in C order with per-arm `:line` cites; null arm keeps the `return FALSE` control flow and cites the impossible pline as omitted (async screen side effect in a sync hot path, D-2608 wall_angle precedent); split the null-descr fallthrough onto its own line; folded all 4 clones onto the canonical import (eat.js gains an apply.js edge inside the existing SCC, runtime-only use — no TDZ read).
**Verify:** `node scripts/verify.mjs --fn objdescr_is` → VERIFY: PASS — syntax (5 changed files), Rule #2, hidden note (no corpus session blocked), REACH-OK (no RNG-tagged reach; smoke spread 24/24 PASS), green 2/2, strict 2/2, cohort 7/7. No per-function unit file: the repo has no such harness; the maintained check is the session suite driven by verify (no new framework per durable-test-collateral).
**Named:** - `objdescr_is`: C `:357` impossible("objdescr_is: null obj") pline — omitted: impossible() is async while all 9 C call sites are sync boolean tests; return-FALSE control flow preserved; null path unreachable (extern.h notes callers rely on the FALSE return).
**Next:** o_init.c holds no further Open coverage rows (`rows --file o_init.c` = 0 eligible; remaining unknowns measured ok) and callee impossible() is partial, not Open — single-function cluster ships alone under the density exception (net -21 lines).
## 2026-09-28 — D-3037 `decl.c` decl_globals_init whole; `version.c` validate stale

**C locus:** - `decl_globals_init`: `decl.c:1080–1187` — 26 `g_init_*` copies (`:1085–1110`), 20 `init_sv*` copies (`:1111–1130`), valuables wiring (`:1132–1137`), 26 `MAGICCHECK`s (`:1142–1167`), `gs.subrooms` (`:1169`), seven `ZERO`s (`:1171–1177`), 17 worn-slot NULLs (`:1179–1181`), `WIN_* = WIN_ERR` (`:1183`), `urole`/`urace` sentinels (`:1185–1186`).
**JS:** `js/decl.js:1` (`decl_globals_init` at `js/decl.js:59`); call wired in `js/jsmain.js:103`.
**Change:** new `js/decl.js` `decl_globals_init()` in C order with per-arm `:line` cites: modeled `game.g*` namespaces (`ga,gb,gc,gd,gf,gg,gh,gi,gm,gn,go,gp,gr,gs,gu,gw`) + `svi`/`svc` return to fresh `{}` (C assigns unconditionally; `UNDEFINED_PTR/VALUE` are NULL/0 per `hack.h:1092–1094` and all use-site guards create bare `{}`); `flags`/`iflags`/`disp` fresh, `u` fresh with the 17 worn NULLs on it (worn slots live on `u` in JS), `ubirthday` 0, `urealtime` zeros, `WIN_* = WIN_ERR` (later `init_sound_disp_gamewindows` installs real ids).
**Verify:** `node scripts/verify.mjs --fn decl_globals_init` → VERIFY: PASS — syntax (2 files) · Rule #2 · hidden note (nothing blocked) · REACH-OK (no RNG-tagged reach; smoke 24/24) · green 2/2 + strict · cohort 7/7 · full 44/44 (auto: shared file changed).
**Named:** - `decl_globals_init`: unmodeled `g*` namespaces `ge,gj,gk,gl,gq,gt,gv,gx,gy,gz` (no JS readers/writers — nothing to reset); unmodeled `sv*` namespaces (only `svi`/`svc` modeled); 26 `MAGICCHECK`s incl. `raw_printf`+`exit` failure path (compile-time static-init validation; a JS literal either evaluates or throws at load); `gs.subrooms` freelist head (JS rooms are arrays + `nsubroom` counts); `gb.bones`/`gb.bughack` nonzero members (no JS readers); `ZERO(a11y)` (jsmain options parse owns zero-then-fill — pre-creating `{}` would suppress its `msg_loc` default guarded by `!g.a11y`); `urole`/`urace` sentinel tables split (`jsmain.js:214–215` placeholders + `roles.js:1296–1297` selection copy); `valuables` wiring split (`end.js reset_valuables`, lazily ensured); `dump_weights` caller (no JS counterpart).
**Next:** continue breadth queue head; `monst_globals_init` (`monst.c:72`, same `early_init` chain) is still unported in JS when its coverage row surfaces.
## 2026-09-28 — D-3036 `botl.c` stat_update_time + status_finish whole; t_warn stale

**C locus:** - `t_warn` (stale): `display.c:3452–3498` — 10-case typ→name switch + `impossible(warn_str, wname, wall_info & WM_MASK, seenv)` report.
**JS:** - `t_warn`: `js/display.js:3170` (file-local, unchanged).
**Change:** - `t_warn`: no code change — stale confirmed (switch whole, both C callers wired, `impossible()` cite per D-2608: `impossible()` is async, `wall_angle` a sync hot path).
**Verify:** `node scripts/verify.mjs --fn stat_update_time,status_finish` → VERIFY: PASS — syntax 2 files; rule2 clean; hidden notes (no corpus session blocked on either); REACH-OK both (no RNG-tagged reach; smoke 24 run, 24 PASS, 0 regressed each); green 2/2 + strict 2/2; cohort 7/7; full 44/44 (auto: shared file changed).
**Named:** - `stat_update_time`: `windowprocs.wincap2` registry (caps read 0; FLUSH arm skips as with a status-incapable windowport in C); `gv.valset` global mirror (fresh false shelf — only `[fld]` consumed); `status_update` dispatch stays the throwing named omit (`js/botl.js:905`).
**Next:** next coverage row.
## 2026-09-28 — D-3035 `stairs.c` stairway_add whole: exported extern + C-order restart

**C locus:** - `stairway_add`: `stairs.c:8–24` whole in C order — `:15` memset-zero then field assigns, `:16–17` sx/sy, `:18–19` up/isladder, `:20` u_traversed FALSE, `:21` assign_level tolev, `:22–23` prepend to gs.stairs.
**JS:** `js/mklev.js:395` `export function stairway_add`.
**Change:** restarted the export whole (`js/mklev.js:395`) with per-arm `:line` cites — `|0` on x/y (C `coordxy`), `!!` on up/isladder (C `boolean`; every reader uses truthiness), `tolev` copies dnum/dlevel only (assign_level-exact), prepend to `game.stairs`.
**Verify:** `node scripts/verify.mjs --fn stairway_add` → VERIFY: PASS — syntax 1 file; rule2 clean; hidden note (no corpus session blocked); REACH-OK (no RNG-tagged reach; smoke 24 run, 24 PASS, 0 regressed); green 2/2 + strict 2/2; cohort 7/7; full 44/44 (auto: shared file changed).
**Named:** - `stairway_add`: reststairs NHFILE restore loop (restore.c:978 + `u_traversed` fixup `:980–982`) — JS stash architecture, no NHFILE reader; getlev castle fixup (restore.c:1243–1255) — getlev-row work, not this function.
**Next:** next coverage row.
## 2026-09-28 — D-3034 `mkmaze.c` wall-spine closure: fix_wall_spines panic arm + C-name helpers

**C locus:** - `fix_wall_spines`: `mkmaze.c:229–287` whole in C order — `:243–246` spine table, `:252–253` bounds panic (new), `:256–261` wall/!DBWALL gate, `:264–268` loc_f pick, `:269–276` locale, `:278–281` NSEW bits via iswall, `:284–285` free-standing keep.
**JS:** - `fix_wall_spines`: `js/mklev.js:32463` (export, same signature).
**Change:** - `fix_wall_spines`: restarted export (`js/mklev.js:32463`) with per-arm `:line` cites; panic → `throw new Error('wall_extends: ...')` (NORETURN→throw matches trap.js deltrap idiom; keeps C's `wall_extends` message text); `if (!map) return` kept and marked JS-only (C levl always exists); panic check first in C order.
**Verify:** `node scripts/verify.mjs --fn fix_wall_spines,iswall,iswall_or_stone,okay,check_ransacked` tail pasted verbatim:
**Named:** none — every arm ported, every callee live, every C caller wired. (`extend_spine` pre-existing ledger-ported D-3014, untouched.)
**Next:** `mkmaze.c` holds no more Open (absent 4 resolved, PARTIAL head ported); queue head moves on.
## 2026-09-28 — D-3033 `muse.c` fhito_loc whole + six stale coverage pops

**C locus:** - `fhito_loc`: `nethack-c/upstream/src/muse.c:1706–1726` whole in C order — `:1715–1716` `!fhito || !OBJ_AT` → FALSE, `:1718–1719` pile walk with `next_obj` saved first (fhito may unchain otmp), `:1721–1722` `where != OBJ_FLOOR || ox/oy` mismatch skip, `:1723` `hitanything += (*fhito)(otmp, obj)`, `:1725` boolean return.
**JS:** - `fhito_loc`: `js/muse.js:894` (live at `:950`).
**Change:** - `fhito_loc`: new staticfn (`js/muse.js:894`) in C order with per-arm `:line` cites; async since live `bhito` is async; `|0` on ox/oy/tx/ty (C `coordxy` short); `hitanything += (await fhito(otmp, obj)) | 0` (C int sum); `objects_at` = `svl.level.objects[tx][ty]` head read (`!objects_at` = `!OBJ_AT`).
**Verify:** `node scripts/verify.mjs --fn fhito_loc` tail pasted verbatim:
**Named:** `destroy_drawbridge` (mbhit STRIKING arm, pre-existing); `use_offensive` tele/undead `fhito_loc`/`bhito` use (`js/muse.js:990`, untouched — different site); `whichrng`/`set_random` fn-dispatch (init_isaac64 split note); `status_hilite_menu_add`, debug `dump_weights`, `save.c:909` heap walk (stalecaller notes, pre-existing).
**Next:** continue coverage-block head (`mkmaze.c` fix_wall_spines at handoff); `use_offensive` tele/undead object-hit wiring is same-file follow-up only if a row names it.
## 2026-09-28 — D-3032 `sp_lev.c` room-table closure whole (mkroom + wid/hei push tables, roomtype both directions)

**C locus:** - `l_push_mkroom_table`: `nethack-c/upstream/src/sp_lev.c:3057–3070` whole in C order — `:3061` new table, `:3062` width 1+(hx-lx), `:3063` height 1+(hy-ly), `:3064–3065` region lx/ly/hx/hy as x1/y1/x2/y2, `:3066` lit as (boolean)rlit, `:3067` irregular, `:3068` needjoining, `:3069` type name.
**JS:** - `l_push_mkroom_table`: `js/mklev.js:23014` (+ live consumers `:30030`, `:30114`, `:30203`).
**Change:** - `l_push_mkroom_table`: new export (`js/mklev.js:23014`) returning the C-exact table object (plain object = the Lua push; region sub-object = nhl_add_table_entry_region `:326–335`; `!!rlit` = the (boolean) cast, so -1 reads lit).
**Verify:** `scripts/splev-roomtable.test.mjs` 4/4 (26-name table order, opt match/empty/unknown arms, table shape incl. rlit -1 edge, wid/hei shape). `verify.mjs --fn l_push_mkroom_table,get_mkroom_name,get_table_roomtype_opt,l_push_wid_hei_table` tail pasted verbatim:
**Named:** - `l_push_mkroom_table`: contents callbacks receive the live room, not the table (above); nhl_add_table_entry_* pushes by-design (no scored analogue).
**Next:** next Open — coverage row.
## 2026-09-28 — D-3031 `report.c` get_saved_pline whole (DUMPLOG ring read over the live dumplogmsg ring)

**C locus:** - `get_saved_pline`: `nethack-c/upstream/src/report.c:571–592` whole in C order — `:575` limit init, `:577–578` lineno≥COUNT guard, `:579` newest-slot start, `:581–589` limit walk (`:582` valid-line test, `:583–584` skip-and-step-back, `:586` return), `:591` fallthrough null. `USED_if_dumplog` (`:571`) is the no-DUMPLOG build only — always live in the pinned build.
**JS:** - `get_saved_pline`: `js/display.js:2559` (doc `:2545–2558`, body `:2559–2575`).
**Change:** - `get_saved_pline`: new export (`js/display.js:2559`) in C order with per-arm `:line` cites over the live ring — `|0` lineno, newest-slot start, 50-step walk, modular step-back, null fallthrough. No new import (DUMPLOG_MSG_COUNT already imported); no gstate change (ring stays module-local with its producer).
**Verify:** /tmp/probe_gspl.mjs 10/10 (newest/second/third, past-oldest null, COUNT/COUNT+1 null, 55-msg wrap newest m55 + oldest-kept m6). `verify.mjs --fn get_saved_pline` tail pasted verbatim:
**Named:** - `get_saved_pline`: C `(0 - 1) % 50` out-of-bounds read at ring index 0 (decl.c zero-init; only reachable on the crash path with an empty ring) — JS yields undefined → invalid slot → null instead of an OOB read; unreachable from any live caller (`submit_web_report` by-design absent).
**Next:** next Open — coverage row (`sp_lev.c` l_push_mkroom_table at enqueue).
## 2026-09-28 — D-3030 `objnam.c` bare_artifactname whole + ch_ksound stale-retire (non-artifact xname fallback)

**C locus:** - `bare_artifactname`: `nethack-c/upstream/src/objnam.c:2502–2515` whole in C order — `:2506` oartifact guard, `:2507–2508` nextobuf + artiname(oartifact), `:2509–2510` The→the lowc, `:2512` else xname(obj).
**JS:** - `bare_artifactname`: `js/artifact.js:802` (doc `:793–801`, body `:802–812`) with per-arm `:line` cites.
**Change:** - `bare_artifactname`: restarted the export whole in C order against live callees — `artiname(obj.oartifact | 0)` (same file, C-exact incl. `""` on out-of-range index) with `The `→`the ` (C lowc(outbuf[0])), else `xname(obj)` (already imported; `imports.mjs --can` reports the artifact→objnam edge ALREADY exists — no new edge, no cycle change). Null-obj keeps the house nullable-name `'something'` (killer_xname convention; C NONNULLARG1, no caller passes null).
**Verify:** /tmp/probe_bare.mjs 7/7 (The Orb→`the Orb of Detection`, Excalibur unchanged, non-artifact `long sword` === xname and ≠ `something`, out-of-range `""`, null/undefined guard). `verify.mjs --fn bare_artifactname,ch_ksound`: hidden notes no sessions blocked; REACH-OK both (no RNG-tagged reach; 24-session smoke 24 PASS); syntax PASS (1 file); Rule #2 PASS; green 2/2; strict both; cohort 7/7; full skipped (no shared file). VERIFY: PASS.
**Named:** - `bare_artifactname`: `nextobuf()` rotating-buffer allocation elided — JS strings immutable, fresh string per call (xname_flags buffer-machinery precedent, js/objnam.js); no JS symbol, ledger `absent` stands.
**Next:** next Open — coverage row (`report.c` get_saved_pline at enqueue).
## 2026-09-28 — Audit 1981–1989 (D-3021..D-3029): 9 ACCEPT, 0 Must-fix

Every js SHA re-measured (`verify --base <parent> --reach-all`, 0 regressed). Public 44/44; corpus 631/953 (full:true @12:01Z, 0 flips, +Barbarian-70011); held-out 12/44 unchanged. 1730 debt retired. Env: node v20, no `node:sqlite` (sql sample skipped, as in 1956–1962 audits). Next: pop the coverage head; no Must-fix pending.
## 2026-09-28 — D-3029 `wizcmds.c` wizcustom_callback whole (glyphmap-gated #wizcustom menu line; C caller wired)

**C locus:** - `wizcustom_callback`: `nethack-c/upstream/src/wizcmds.c:1986–2027` whole in C order — `:1997` win&&id guard, `:1998` glyphmap index, `:1999–2003` u/customcolor gate (ENHANCED_SYMBOLS `:2001` arm live per config.h:368), `:2004` bufa `[%04d] %-44s`, `:2005–2006` bufb `'\\%03d' %02d` off showsyms/sym, `:2007` bufc `%011lx`, `:2008` bufu empty, `:2010–2018` U+%04lx + NUL-terminated UTF-8 byte walk, `:2020` a_int=glyphnum+1, `:2021` four-field Snprintf (trailing space when bufu empty), `:2022–2023` add_menu.
**JS:** - `wizcustom_callback`: `js/wizcmds.js:1609` (export).
**Change:** new `export function wizcustom_callback` (`js/wizcmds.js:1609`) in C order with per-arm `:line` cites: glyphmap via `ensure_glyphmap()` (exported from js/glyphs.js this commit — the live `glyphmap[MAX_GLYPH]` mirror; `reset_glyphmap` still does not fill `sym`/`tileidx`, so uncustomized entries format from the zero-fill), `%-44s`≡padEnd / `%04d`/`%03d`/`%02d`≡padStart / `%011lx`/`%04lx`≡lowercase-hex padStart, showsyms read undefined-safe (`nhsym` is uchar, global.h:108; char-or-int tolerant, `& 0xff`; still null until init_symbols lands), utf8str re-encoded to UTF-8 bytes inline (JS holds the dupstr string; surrogate pairs handled; 0 byte ends the walk like NUL), pointer-check `!= null` so an empty string still enters like C. add_menu lands on the raw menu array (options.js `raw` idiom: `{text, selectable:false, a_int}`; PICK_NONE consumer wiz_custom `:1969` unported, never selects). Both new static edges are IN-SCC function-declaration runtime-only calls (`imports.mjs --can` both directions).
**Verify:** `node scripts/verify.mjs --fn wizcustom_callback` → VERIFY: PASS. Tail pasted verbatim:
**Named:** - `wizcustom_callback`: `wiz_custom` (wizcmds.c:1933, own row — sole consumer of the filled menu: create/start/heading/end/select/destroy + docrt); `init_symbols` showsyms fill (symbols.c, unported — the `:2006` read pins 0 until it lands).
**Next:** pop the next Open — coverage row; wizcmds.c needs no follow-up.
