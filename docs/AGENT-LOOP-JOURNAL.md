# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-09-28 — D-3028 `cmd.c` dokeylist restart in C order (live spkeys + num_pad arms) + `spkey_name` port

**C locus:** - `dokeylist`: `nethack-c/upstream/src/cmd.c:2867–3013` whole in C order — `:2876–2877` memsets, `:2884` ^C pre-mark (#ifndef NO_SIGNAL), `:2888` mov_seen clone, `:2891–2902` misc prefix scan off live `gc.Cmd.spkeys`, `:2904–2914` title + keyless header, `:2916–2919` directional grid, `:2921–2933` Shift/Meta run text off `iflags.num_pad`, `:2935–2948` bound misc keys, `:2951–2960` ^C interrupt line, `:2962–2980` keyless-special list via `spkey_name`, `:2982–3006` menu/General/Game/Debug sections sharing keys_used, `:3010–3011` display + destroy.
**JS:** - `dokeylist_lines`: `js/dokeylist.js:808` (export).
**Change:** `js/dokeylist.js` — restarted `dokeylist_lines` in C order with per-arm `:line` cites: new file-local `live_spkey` (live `game.Cmd.spkeys[nhkf]` with `(uchar)` cast, SPKEYS_DEFAULT fallback while no rebind path writes the table — reset_commands seeds it from the same defaults), `numPad` from live `game.iflags.num_pad` with the C-exact Shift/Ctrl/Meta shape (num_pad drops the Ctrl + "interesting" lines, not just the word), new file-local `spkey_name` over a C-order SPKEY_NAMES table (`:3161–3191` name column) used at the keyless-special arm. `pfxSeen = nhkf + 1` sentinel kept and documented (C stores `j` with 0 unset; JS NHKF_ESC is 0). `show_menu_controls_lines(lines, true)` collapsed to the live `show_menu_controls(lines, true)` export (the wrapper only forwards).
**Verify:** `node scripts/verify.mjs --fn dokeylist,spkey_name --full` → VERIFY: PASS. Tail pasted verbatim:
**Named:** - `dokeylist`: the `#else` (NO_SIGNAL defined) ^C arm `:2957–2958` — not compiled in the unix build; window create/display/destroy — pre-existing pager.js ?j split (display owns the window, lines own the content).
**Next:** pop the next Open — coverage row (wizcmds.c wizcustom_callback at the time of writing); cmd.c needs no follow-up.
## 2026-09-28 — D-3027 `engrave.c` del_engr restart in C order (head-first unlink + `!ept` impossible arm)

**C locus:** - `del_engr`: `nethack-c/upstream/src/engrave.c:1644–1663` whole in C order — `:1648–1649` head-first match, `:1651–1657` walk for the node whose nxt is ep, `:1658–1660` miss → impossible + return, `:1662` dealloc_engr.
**JS:** - `del_engr`: `js/engrave.js:318` (export, sync).
**Change:** `js/engrave.js` — restarted `del_engr` in C order with per-arm `:line` cites: `!ep` JS guard kept (C NONNULLARG1; JS passes engr_at() misses straight in), head-first match, ept walk with break, `!ept` → `void impossible('Error in del_engr?')` + return. impossible is async (display.js) but this unlink runs in sync contexts — `void` fire-and-forget (botl.js:351 / do_name.js:714 precedent). `:1662` dealloc_engr(ep) is `#define … free()` (engrave.h:45) — GC, unlinking is the whole effect. Sync signature kept, no caller edits.
**Verify:** `node scripts/verify.mjs --fn del_engr` → VERIFY: PASS. Tail pasted verbatim:
**Named:** - `del_engr`: none — every arm ported, every callee live (impossible) or a macro (dealloc_engr), all 9 C call sites wired.
**Next:** pop the next Open — coverage row (`mplayer.c` get_mplname at the time of writing); `engrave.c` needs no follow-up.
## 2026-09-28 — D-3026 `sys.c` whole-file closure: sys_early_init + sysopt_release (queue head) + sysopt_seduce_set

**C locus:** - `sys_early_init`: `nethack-c/upstream/src/sys.c:20–112` whole in C order — `:28–29` support/recover clears, `:30–36` wizards (SYSCF live arm), `:38–52` DEBUGFILES env/else (SYSCF arm), `:57–63` shellers/explorers/genericusers/msghandler/maxplayers/bones_pools/livelog, `:66–70` persmax/entrymax/pointsmin/pers_is_uid/tt_oname_maxrank, `:73–74` PERS_IS_UID panic gate, `:76–95` PANICTRACE gdb/greppath + released zeros, `:96` crashreporturl, `:98–101` check_save_uid/check_plname/seduce + seduce_set call, `:102` saveformat/bonesformat, `:103` accessibility, `:109` hideusage.
**JS:** - `sys_early_init`: `js/sys.js:37` (export).
**Change:** new `js/sys.js` in C order with per-arm `:line` cites. `free` ⇔ `= null` (GC reclaims); `panic` ⇔ `throw` (alloc.js:177 precedent); strings `string|null`; `saveformat`/`bonesformat` `[1,0]` pairs (`:102` sets `[0]=historical=1`, `[1]` keeps BSS zero). Build-shape arms cited not ported: `:33–35` non-SYSCF wizards dupstr, `:47–49` non-SYSCF DEBUGFILES dupstr, `:54–56` DUMPLOG dumplogfile (retired D-1776), `:104–106` WIN32 portable flag, `:84–88` unreleased PANICTRACE ones.
**Verify:** `node scripts/verify.mjs --fn sys_early_init,sysopt_release,sysopt_seduce_set` → VERIFY: PASS. Per function: hidden `note … no corpus session blocked` (normal for coverage rows); REACH smoke spread 24/24 PASS → REACH-OK (×3, none RNG-tagged — the file draws no RNG). Gates: syntax 2 files, Rule #2, green 2/2, strict ×2, cohort 7/7, full 44/44 (auto: shared jsmain.js changed).
**Named:** - `sys_early_init`: none in the compiled body — every live arm ported; dead `#else`/`#ifdef` arms cited above.
**Next:** port the SEDUCE sysconf value handler (cfgfiles.c `cnf_line_SEDUCE` `:930–943`) so `sysopt_seduce_set` has its second caller wired; `sys.c` needs no follow-up.
## 2026-09-28 — D-3025 `options.c` roleopt/initoptions cluster: unsaveoptstr + freeroleoptvals + initoptions + initoptions_finish (saveoptvals by-design)

**C locus:** - `unsaveoptstr`: `nethack-c/upstream/src/options.c:775–783` whole — `:777` opt2roleopt, `:779` non-null guard, `:780–781` free + 0 (comma expression).
**JS:** - `unsaveoptstr`: `js/options.js:6632` (file-local, C staticfn).
**Change:** `js/options.js:6618–6742` cluster block in C order with per-arm `:line` cites: file-local `ROLEOPT2OPT` (`:709–711`), `SYSCF_FILE`, `unsaveoptstr` (slot-clear is the free), exported `freeroleoptvals`/`initoptions`/`initoptions_finish`; `SET_IN_SYSCONF = 0` joins the global.h:581 enum line (`:8594`); imports extended from pre-existing edges (display, glyphs) plus two new SAFE edges (cfgfiles: rcfile/read_config_file/config_error_init/done; end: nh_terminate; imports.mjs verdict SAFE); stale comments in cfgfiles.js/earlyarg.js updated to name the live exports.
**Verify:** `node scripts/verify.mjs --fn unsaveoptstr,freeroleoptvals,saveoptvals,initoptions,initoptions_finish` → VERIFY: PASS. Per function: hidden `note … no corpus session blocked` (normal for coverage rows); REACH smoke spread 24/24 PASS → REACH-OK (×5, none RNG-tagged — the cluster draws no RNG). Gates: syntax 3 files, Rule #2, green 2/2, strict ×2, cohort 7/7, full 44/44 (auto: shared options.js changed).
**Named:** - `unsaveoptstr`: none — every arm ported, callee live.
**Next:** port initoptions_init (`options.c:7118–7305`) as its own cluster (sf_init/choose_windows/init_symbols + symset arms all MISSING) and then decide startup wiring for initoptions(); restoptvals needs no row (by-design here).
## 2026-09-28 — D-3024 `hacklib.c` string cluster: tabexpand + upwords + chrcasecpy + strcasecpy + c_eos + sitoa

**C locus:** - `tabexpand`: `nethack-c/upstream/src/hacklib.c:428–464` whole — `:436–437` empty passthrough, `:438–448` tab→8-stop do/while, `:449–452` copy arm, `:453–456` BUFSZ rewind-break, `:458–459` NUL + strcpy return.
**JS:** - `tabexpand`: `js/hacklib.js:360`.
**Change:** six canonical exports in `js/hacklib.js` in C order with per-arm `:line` cites; immutable-string adaptations documented per site (callers assign the return; `c_eos` ≡ end index; `sitoa` fresh string). `js/pager.js:57` + `js/objnam.js:33` extend their pre-existing static `hacklib.js` imports (imports.mjs: ALREADY, no new edges); locals deleted; `strcasecpy_at` doc notes the canonical home. New `scripts/hacklib.test.mjs` (6/6 pass; the scratch probe's two red cases were probe-side misreads of C's `A-Z` bound and lowercase-dst folding, corrected before commit).
**Verify:** `node scripts/verify.mjs --fn tabexpand,upwords,chrcasecpy,strcasecpy,c_eos,sitoa` → VERIFY: PASS.
**Named:** - `tabexpand`: `pager.c:2630–2632` tabexpand arm inside `dowhatdoes_core`'s data-file scan — JS `dowhatdoes_core` (`js/pager.js:3086`) answers from `key2extcmddesc` without scanning the file; `wintty.c:2502` tty-window painter — no JS tty layer (browser renders via `display.js` text windows; tabs expand at the dat-read sites).
**Next:** shipped rows leave the generated block on finish. `hacklib.c` remainder is one-liners (`digit`, `letter`), platform-shaped (`copy_bytes` fds, `nh_snprintf` varargs) and THIN one-arm gaps — no follow-up row from this cluster.
## 2026-09-28 — D-3023 `monmulti` whole (mthrowu.c guard/mplayer/racial arms) + canonical `matching_launcher` (obj.h)

**C locus:** - `monmulti`: `nethack-c/upstream/src/mthrowu.c:199–258` whole in C order — `:214–220` quan/ammo-launcher/`!mconf` guard, `:222–229` prince/lord/mplayer, `:233–243` elven arrow/bow + `spe/3` enchantment, `:245` `rnd`, `:248` class bonus, `:251–257` racial bonus, end clamps.
**JS:** - `monmulti`: `js/weapon.js:1685`.
**Change:** restarted `monmulti` whole in C order (`js/weapon.js:1685`) — `|0` quan, `matching_launcher` guard, mplayer arm, `otyp('ELVEN_ARROW'/'ELVEN_BOW'/'ORCISH_ARROW'/'ORCISH_BOW'/'CROSSBOW_BOLT'/'CROSSBOW')` numeric compares (same `objectNames.indexOf` table, C shape), `rounddiv` stays the pre-existing file-local clone (`js/weapon.js:184`), `multishot_class_bonus(monsndx(ptr), …)` (`monsndx` joins the existing `mondata.js` edge), racial block in C order (`is_elf`/`is_orc`/`is_gnome` join the existing `monsters.js` edge — no new module edges, no `imports.mjs --can` needed). New canonical `matching_launcher` (`js/wield.js:137`); `ammo_and_launcher` re-expressed as `is_ammo && matching_launcher` (`js/wield.js:145`, provably identical — `is_ammo` already null-guards). New `scripts/monmulti.test.mjs` (12/12 pass; stash-check on pre-fix `js/` fails — the test imports the new `matching_launcher` export, so the old tree cannot load it; the mplayer/racial min-max asserts additionally target arms the old body lacked).
**Verify:** `node scripts/verify.mjs --fn monmulti` → VERIFY: PASS — syntax 2 files (`js/weapon.js` `js/wield.js`); rule2 PASS; hidden note (0 blocked, expected for a coverage row); reach REACH-OK (27 baseline-PASS sessions reach it, 27 run, 0 regressed); green 2/2; strict ×2; cohort 7/7; full skipped (tool heuristic). `node --test scripts/monmulti.test.mjs` → 12/12 pass. Paste tail: `PASS reach monmulti: 27 baseline-PASS session(s) reach it (27 run, 49.7s): 27 PASS, 0 regressed → REACH-OK` / `VERIFY: PASS`.
**Next:** coverage head leaves the block on finish; refill tops up. `mthrowu.c` holds no further measured gap (m_useupall stays folded into `m_useup`, `js/mthrowu.js:171–185`; `m_carrying` is live `js/mon.js`).
