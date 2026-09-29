# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
