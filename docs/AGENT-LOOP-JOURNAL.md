# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-29 — D-3123 `mdlib.c` make_version whole-body + dig.c DEBUG/`#if 0` by-design set (10 functions; coverage)

**C locus:** - `make_version`: mdlib.c:248–295 (incarnation `:255–258`, feature_set `:266–281`, entity_count `:286–292`); game caller mdlib.c:841 runtime_info_init (makedefs/sfctool callers are build tools).
**JS:** js/version.js imports `:18–20`, EDITLEVEL `:32`, version `:630`, make_version `:640`, runtime_info_init `:671` (`:841` wire `:675`, `:842` forward `:676`); js/date.js hook `:172`, interim deleted (`:68–84` replaced by collapse note).
**Change:** new module-local `version` + `make_version()` in js/version.js in C order (C staticfn in game builds `:244–246`, so local; incarnation from VERSION_*/EDITLEVEL pins, feature_set bits 6+17+18 with bit 19 off per global.h:430/config.h:435/config.h:627, entity_count by counting artilistRaw names from 1 ≡ C `:286–287` over artilist.h:12 + C shift order, `>>> 0` exact since all values fit 32 bits); `:841` wire + struct forwarded at `:842`; interim deleted, hook takes the struct, date.js drops its three generated imports; version.js gains its first imports (three generated leaves — import-free, no TDZ/cycle; D-1881 comments narrowed to the real ban: no const.js/hacklib.js/date.js edge) + EDITLEVEL pin. /tmp convergence probe: version_number/version_features/version_sanity1 bit-identical to the interim (83886080/393280/555618687, NUM_OBJECTS 481).
**Verify:** `node scripts/verify.mjs --fn make_version,wiz_debug_cmd_bury,bury_monst,bury_you,bury_obj,is_digging,watchman_canseeu,version_id_string,build_savebones_compat_string,count_and_validate_winopts` → VERIFY: PASS (syntax 2 files js/date.js js/version.js; rule2; hidden note 0 blocked ×10; REACH-OK smoke 24/24 ×10, 0 regressed; green 2/2; strict ×2; cohort 7/7; full skipped — no shared file).
**Named:** - `make_version`: makedefs.c/sfctool.c build-tool callers (never ported); none in-body — whole body, every value live (pins + generated counts).
**Next:** pop the next Open — coverage row (post-ship head: `muse.c` munstone PARTIAL). Sub-threshold mdlib.c residues verified this iteration but left unknown (cap): mkstemp C7 MSVC-only (`:372–387` `#ifdef _MSC_VER` → by-design) + md_ignored_features/mdlib_version_string C4 bodies complete (js/date.js:49, js/version.js:57 → stale).
## 2026-09-29 — D-3122 `pickup.c` container_at whole-body + lock.c:794 pit-dirprompt caller wiring (coverage)

**C locus:** - `container_at`: pickup.c:2024–2038 (floor chain `:2029`, nobj cache `:2030`, Is_container `:2031`, !countem break `:2033–2034`); callers lock.c:794/847, pickup.c:2217/2302/2326/3586.
**JS:** js/pickup.js container_at `:4161`; js/lock.js doopen_indir dirprompt `:830`, get_adjacent_loc call `:845`.
**Change:** C-order `nobj` cache (`for (cobj, nobj); cobj; cobj = nobj` + `nobj = cobj.nexthere` — unobservable today, C-exact list semantics). lock.js doopen_indir: pit + container-underfoot arm in C order (`:793–795`, `uu.utrap && utraptype === TT_PIT && container_at(ux, uy, false)` → `'Open where? [.>]'`, passed to get_adjacent_loc); dirprompt retired from the Named omissions doc (pit-reach gate `:815–818` stays named). No new imports (TT_PIT + container_at already in lock.js).
**Verify:** `node scripts/verify.mjs --fn container_at` → VERIFY: PASS (syntax 2 files js/lock.js js/pickup.js; rule2; hidden note 0 blocked; REACH-OK no RNG-tagged reach, smoke spread 24 run 24 PASS; green 2/2; strict ×2; cohort 7/7; full skipped — no shared file).
**Named:** - `container_at`: none — whole body, every callee live (Is_container + objects_at pre-existing), every C caller wired.
**Next:** pop the next Open — coverage row.
## 2026-09-29 — D-3121 `options.c` doset-term + roguesymset cluster (9 functions; CHANGE_COLOR pair by-design)

**C locus:** - `all_options_palette`: options.c:9656–9674 (`#ifdef CHANGE_COLOR`); call site :9731–9733 same guard.
**JS:** js/options.js term_for_boolean :8956, enhance_menu_text :8974, doset_bool_term :8979, NONMOD wire :9037, optfn_roguesymset :3066, allopt row :9953, doset compound :9115, string_for_opt :10231, complain_about_duplicate :10352, doset_add_menu :8420, Othr wire :9152, handler_sortloot :6681 (unchanged), display import :174; scripts/doset-terms.test.mjs (new, 10 vectors).
**Change:** by-design pair via direct `ledger.mjs set` (CHANGE_COLOR only in amiconf.h; contest unix build + recorder carry no -DCHANGE_COLOR; no patch touches it). handler_sortloot: no code — verified whole (n>1 folded in select_menu_pick_one: new-key hit ≡ C pick[1], ENTER ≡ preselect finish, ESC ≡ n≤0; perm_invent/update_inventory, free/GC, destroy-in-helper all cited). term_for_boolean: new export, table + gate verbatim; termpref on bgcolors/idlecheckpoint/perm_invent/sounds (Off) + voices (Excluded — SND_SPEECH multisnd-only); doset_bool_term unified (all listed rows render identically; voices-true now C-correct 'included'). enhance_menu_text: degenerate no-op port (`#if 0` cited out); wired in NONMOD loop (≡ C pass 0, :8834–8839). string_for_opt: wired :6675–6677 to live config_error_add (optfn_sortloot precedent); fixed :6679 + range cites. complain_about_duplicate: restarted stub (alias tail via OPT_ALIAS/usingAliasOpt, CompOpt ternary) + wired call. doset_add_menu: split-doc (get_val in callers); OthrOpt rows rewired through helper (output byte-identical); :8901 PREFIXES named (doset docblock precedent). optfn_roguesymset: new export in C order (flat+gs store, live rogue assign_graphics, sibling-gated flags, combined get_val/cnf without handler tail); allopt row + doset get_val wired.
**Verify:** - `handler_sortloot`: hidden note (0 blocked); REACH-OK smoke 24/24.
**Named:** - `all_options_palette`: whole function uncompiled (by-design).
**Next:** block refills via finish; fopen_config_file (partial D-3117, compiled arms complete per review 2077) needs a stale-check before any same-file growth.
## 2026-09-29 — D-3120 `insight.c` num_genocides unique+impossible arm + `read.c:2956` do_genocide livelog caller wiring (coverage)

**C locus:** - `num_genocides`: insight.c:2953–2966 (G_GENOD count `:2958–2959`, UniqCritterIndx+impossible `:2960–2962`); caller read.c:2956–2961 (do_genocide REALLY-arm first/subsequent livelog, read before the G_GENOD set).
**JS:** js/insight.js:483 num_genocides; js/read.js:2681 do_genocide REALLY arm.
**Change:** added the UniqCritterIndx guard + impossible arm in C order (local UniqCritterIndx ≡ C `:2777–2778`; fire-and-forget impossible — sync callers don't await, cf. record_achievement `:2419`); wired the read.c:2956 livelog guard into do_genocide before the G_GENOD set (dynamic insight.js import, same cycle-avoidance as do_class_genocide `:2508`); lifted "do_genocide livelog" from the header omissions.
**Verify:** - `num_genocides`: `node scripts/verify.mjs --fn num_genocides` → hidden note (no corpus session blocked at baseline); reach: no RNG-tagged reach, smoke spread 24 run → 24 PASS, 0 regressed → REACH-OK; syntax 2 files, rule2, green 2/2, strict ×2, cohort 7/7; VERIFY: PASS.
**Named:** - `num_genocides`: none — whole body, every callee live (UniqCritterIndx local, impossible async fire-and-forget).
**Next:** generated block refills via finish (head passes to `options.c` all_options_palette).
## 2026-09-29 — D-3119 botl.c status-hilite query closure: 3 menu ports + `splitsubfields` overflow fix (coverage cluster)

**C locus:** - `query_arrayvalue`: botl.c:2747–2781 (PICK_ONE over arr[arrmin..arrmax), adj `:2756`, NULL-gap skip `:2763–2764`, decode `:2776`)
**JS:** js/botl.js query_arrayvalue `:3182`, query_conditions `:3216`, status_hilite_menu_choose_field `:3252`, splitsubfields `:1707`.
**Change:** three new async exports in C order reusing the shipped menu fold (dynamic select_menu_pick_one/pick_any from options.js + hiliteMenuRows — choose_updownboth/status_hilite_menu_fld precedent): adj/NULL-gap/decode verbatim; conditions a_ulong OR with `>>> 0` unsigned-long return; live SCORE_ON_BOTL-off skip arm (config.h:627); splitsubfields overflow test moved to the pre-pop cut count with corrected cites. Export names are new (C staticfn, sibling exported); no new static cross-module import (dynamic options.js edge mirrors the in-file precedent).
**Verify:** `node scripts/verify.mjs --fn query_arrayvalue,query_conditions,status_hilite_menu_choose_field,splitsubfields` → VERIFY: PASS (syntax 1 file js/botl.js; rule2; hidden note 0 blocked ×4; REACH-OK smoke spread 24 run 24 PASS 0 regressed ×4; green 2/2; strict ×2; cohort 7/7).
**Named:** - `query_arrayvalue`: sole-C-caller status_hilite_menu_add (botl.c:3889–4302) has no JS body (pre-existing, js/botl.js:1437).
**Next:** next coverage head after finish (block refills itself).
## 2026-09-29 — D-3118 `max_passive_dmg` elemental arm via live `Resists_Elem` (Must-fix, review 2070)

**C locus:** - `max_passive_dmg`: mondata.c:720–767, elemental arm `:753–757`; C `resists_*` are monst.h:271–277 macros for `Resists_Elem(mon, *_RES)` whose body is mondata.c:129–197 (bits `:171`, wielded-artifact `defends` `:173–176`, worn/carried `:178–196`).
**JS:** js/mhitm.js `max_passive_dmg` `:2303`, elemental arm `:2329–2333`, export `:2344`; const.js import `:84–87`.
**Change:** 4-line swap to `Resists_Elem(magr, ACID_RES/COLD_RES/FIRE_RES/SHOCK_RES)` with C cites; added the four `*_RES` constants to the existing const.js import (same precedent as `resists_poison_mm` js/mhitm.js:1899). Export name + signature kept; no new cross-module import (Resists_Elem already on the mondata.js edge).
**Verify:** `node scripts/verify.mjs --fn max_passive_dmg --reach-all` → VERIFY: PASS (syntax 1 file js/mhitm.js; rule2; hidden note 0 blocked; REACH-OK smoke spread 24 run 24 PASS 0 regressed; green 2/2; strict ×2; cohort 7/7).
**Named:** - `max_passive_dmg`: none — whole body, every callee live (Resists_Elem + completely*_mm). The bits-only `resists_*` locals remain for pre-existing gazemm/explmm/passivemm call sites — untouched, out of scope for this Must-fix.
**Next:** none (Must-fix closed; elemental arm now matches C).
## 2026-09-29 — Audit 2069-2077 (D-3109..D-3117): 8 ACCEPT, 1 QUALITY-RISK; full cadence

Reviews 2069-2077 audit ad1aa7146..78a21f6e4 against pinned C (soundlib switch, mondata 5-fn, regex/invorder, version trio, report 6-fn, regex-desc/txt2key, mon_leave, selvar filter, syscf/showpaths cluster): 8 ACCEPT, 2070 QUALITY-RISK (max_passive_dmg bits-only resists_* locals vs live Resists_Elem already imported in mhitm.js — Must-fix prepended, Next cluster set). Every corpus claim re-measured with --reach-all (all vacuous + REACH-OK, no REGRESSED). Cadence: public 44/44, corpus 648/953 (0 flips, full:true), held-out 13/44 flat. Ledger snapshot + 5/5 seeded-ported sample live.
## 2026-09-29 — D-3117 `cfgfiles.c` assure_syscf_file + `files.c` do_deferred_showpaths + fopen_config_file completion (coverage cluster)

**C locus:** - `assure_syscf_file`: cfgfiles.c:2031–2068 (unix open `:2052`, fd>=0 `:2057–2060`, deferred gate `:2063–2064`, raw_printf `:2066`, exit `:2067`)
**JS:** js/cfgfiles.js assure_syscf_file `:356`, fopen_config_file `:385`; js/files.js do_deferred_showpaths `:1830`; js/options.js wirings `:7093`/`:7118`/`:7131`; scripts/initoptions-init.test.mjs (3 new pins, 8 pass). New cross-module imports: cfgfiles←files (fqname, do_deferred_showpaths), cfgfiles←end (nh_terminate), files←earlyarg (after_opt_showpaths), options←files (do_deferred_showpaths) — all hoisted fns read lazily (imports.mjs).
**Change:** new assure export in C order (VFS readability ≡ open `:2052` — same VFS-for-fopen precedent as fopen below; gd-gated do_deferred_showpaths(1); raw_printf literal with `\n`; nh_terminate(EXIT_FAILURE) ≡ exit). New do_deferred_showpaths export in C order (gd ensure + flag clear `:3092`; reveal_paths + 3 by-design cleanups named; after_opt_showpaths live tail `:3101`). fopen fqname wired `:234` (identity when no SYSCONFPREFIX configured); wait_synch `:262`/`:273` cited as this-TU no-op macro (cfgfiles.c:117–120); errno-gated arms cited as VFS-unreachable (one read, one failure; every miss ENOENT-class, no errno channel). 3 caller sites wired in options.js; both omit docs retired; earlyarg.js:457 stale "itself unported" cite fixed.
**Verify:** `node scripts/verify.mjs --fn assure_syscf_file,do_deferred_showpaths,fopen_config_file` → VERIFY: PASS (syntax 4 files js/cfgfiles.js js/earlyarg.js js/files.js js/options.js; rule2; hidden note 0 blocked ×3; REACH-OK smoke spread 24 run 24 PASS ×3; green 2/2; strict ×2; cohort 7/7; full 44/44 shared). `node --test scripts/initoptions-init.test.mjs` → 8 pass.
**Named:** - `assure_syscf_file`: none in-body — whole body, every callee live (WIN32 `:2035–2038` / NOCWD `:2050` / VMS `:2055` opens compiled out, cited; sfctool.c:680 caller by-design, not game code).
**Next:** reveal_paths (files.c:3175, 117 lines) is the named remainder — surfaces as its own coverage row; completes the deferred-showpaths chain.
## 2026-09-29 — D-3116 `selvar.c` selection_filter_mapchar restart + getpoint/setpoint guards (coverage)

**C locus:** - `selection_filter_mapchar`: selvar.c:248–281 (NULL guard `:254-255`, ret `:257`, getbounds `:259`, scan `:261-265`, lit switch `:266-278`)
**JS:** js/mklev.js selection_filter_mapchar `:30588`, selection_getpoint `:29261`, selection_setpoint `:29273`, match_maptyps `:28716` (unchanged). No new cross-module imports (all callees in-file; rn2 already imported).
**Change:** restarted the filter exported in C order over live callees (selection_new/getbounds/getpoint/setpoint, local match_maptyps, rn2): NULL→null, getbounds rect, x-outer/y-inner scan with C short-circuit (getpoint, then levl read, then match_maptyps), switch with `default:`+`case -2:` first like C, `(loc.lit | 0) === lit` for JS bool/0/1 levl.lit; default lit -2 mirrors the Lua binding's luaL_optinteger(L, 3, -2) (nhlsel.c:663) so the two themerms callers keep behavior. Aligned getpoint/setpoint guards to C order (`!sel.pts` ≡ `!sel->map`, `sel.wid ?? COLNO` per the recalc_bounds idiom; dead on live shapes — every selection carries pts + COLNO/ROWNO wid/hei). match_maptyps audited line-exact, untouched.
**Verify:** `node scripts/verify.mjs --fn selection_filter_mapchar,selection_getpoint,selection_setpoint,match_maptyps` → per-function hidden note (0 blocked, coverage row) + REACH-OK (no RNG-tagged reach; 24-session smoke spread 24 PASS ×4); syntax · rule2 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (shared file). VERIFY: PASS.
**Named:** - `selection_filter_mapchar`: C caller nhlsel.c:669 l_selection_filter_mapchar (Lua `selection.filter_mapchar` binding — whole Lua-selection bridge absent in JS).
**Next:** coverage head moves to `botl.c` status_hilites_viewall; selvar.c holds no other queue row.
## 2026-09-29 — D-3115 `dog.c` mon_leave completion: minvent + residency arms (coverage)

**C locus:** - `mon_leave`: dog.c:729–763 (minvent loop `:735–740`, isshk residency `:744–745`; worm arm `:748–761` shipped D-2296)
**JS:** js/dog.js mon_leave `:408`; scripts/mon-leave.test.mjs (4 pins).
**Change:** completed the body in C order over live callees: minvent walk with Has_contents→picked_container before `no_charge = 0`; `if (mtmp.isshk) set_residency(mtmp, true)` (TRUE ≡ clear; mon_arrive sets it back with false); worm arm untouched. Has_contents added to the const.js import, picked_container to the existing shk.js import (edge already existed — no new cross-module import). Retired the stale named-omission notes in the keepdogs and migrate_to_level docs.
**Verify:** `node scripts/verify.mjs --fn mon_leave` → VERIFY: PASS (syntax 2 files js/dog.js js/teleport.js; rule2; hidden note no baseline blocks; reach smoke spread 24 run 24 PASS 0 regressed → REACH-OK; green 2/2; strict ×2; cohort 7/7). `node --test scripts/mon-leave.test.mjs` → 4 pass.
**Named:** - `mon_leave`: none — whole body, every callee live (picked_container, set_residency, count_wsegs, wormgone, place_monster, Has_contents).
**Next:** generated block refills on finish; migrating shopkeepers now shed bill flags and residency like C.
## 2026-09-29 — D-3114 `options.c` test_regex_pattern completion via regex_error_desc + txt2key restart + 4 caller wirings (coverage cluster)

**C locus:** - `test_regex_pattern`: options.c:7869–7901 (D-3111 left `:7893` regex_error_desc a named omit)
**JS:** js/options.js regex_error_desc `:552`, msgtype_add `:590`, txt2key `:870`, add_menu_coloring_parsed `:4581`, test_regex_pattern `:5358`, add_autopickup_exception `:5502`; js/sounds.js add_sound_mapping `:252`; scripts/txt2key.test.mjs (14 pins).
**Change:** new `regex_error_desc` export in C order (errbuf collapses to the return — every C caller uses it only; regerror ≡ captured SyntaxError text, empty-message fallback kept); regex_init carries `errdesc`, regex_compile captures `e.message`, regex_free clears it; all five C call sites wired (test_regex_pattern live value; msgtype_add + coloratt-parsed full C-order fail arms with statics; APE live value; sounds computes, raw_print stays named); txt2key restarted whole in C order over live trimspaces/highc/escapes; cite fixes (APE +4 drift, coloratt :595→:590, spcfn :5463→:5462).
**Verify:** `node scripts/verify.mjs --fn test_regex_pattern,txt2key,msgtype_add,add_autopickup_exception,add_menu_coloring_parsed,add_sound_mapping` → VERIFY: PASS (syntax 2 files; rule2; hidden note ×6 no baseline blocks; reach ×6 smoke spread 24 run 24 PASS 0 regressed → REACH-OK; green 2/2; strict ×2; cohort 7/7; full 44/44 auto on shared change). `node --test scripts/txt2key.test.mjs` → 14 pass.
**Named:** - `add_sound_mapping`: raw_print(re_error_desc) sounds.c:1604 (no pre-window stdout channel — display.js vraw_printf precedent; value computed live).
**Next:** generated block refills on finish; txt2key BIND/menu-cmd paths now C-exact for held-out config names.
