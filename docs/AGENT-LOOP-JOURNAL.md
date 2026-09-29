# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-29 — Audit 2051–2059: 9A/0Q; public 44/44, corpus 648/953 (+0, 0 flips, full)

**Reviews:** 2051 A (wizcustom/wizkill runners Must-fix), 2052 A (vision/wizmondiff runners Must-fix), 2053 A (mhitm_ad_ssex dispatcher; could_seduce export-block sym gap noted), 2054 A (pfxfn_cond_ cluster; set_hidden unreachability + useroption uniqueness proved), 2055 A (fix_curse_trouble restart), 2056 A (validspecmon + isspecmon; m_id-0 claim proved both sides), 2057 A (burn_object restart, arm-for-arm), 2058 A (config_erradd in_lua + parse_conf_file rename), 2059 A (selection_getbounds canonical, all 17 C sites accounted). All re-measures REACH-OK, 0 regressed. Held-out 13/44 flat. 5 seeded rows briefed, sound (sqlite absent, NOTES-known). Must-fix empty. Next: coverage head do_name.c bogusmon.
## 2026-09-29 — D-3099 selvar.c selection_getbounds: canonical export, 3 clones retired, 16 C sites wired (coverage)

**C locus:** - `selection_getbounds`: nethack-c/upstream/src/selvar.c:76–95 (guard `:80–81`, recalc `:82`, empty→full `:84–89`, stored `:90–94`).
**JS:** js/mklev.js:29715 selection_getbounds; call sites mklev.js:1819/4398/29128/29215/29237/29751/29776/30575, region.js:1218 (import :58), cmd.js:3831/3846/3877/3891/3903 (import :123; existing edges extended, no new module edge).
**Change:** canonical `export function selection_getbounds(sel, b)` in mklev.js in C order (`!sel||!b` guard, live selection_recalc_bounds, `sel.wid ?? COLNO` empty test, out-param writes); retired all 3 clones + the lspo inline copy; routed every rect-reading caller through it (out-param form, `NhRect rect` locals).
**Verify:** - `selection_getbounds`: note hidden (no corpus session blocked — normal for a coverage row); REACH-OK (no RNG-tagged reach; smoke spread 24 run, 24 PASS, 0 regressed).
**Named:** - `selection_getbounds`: nhlsel.c:459 `sel:bounds()` Lua bridge (no JS Lua-selection bridge method and zero repo callers — surfaces if des Lua ever calls it).
**Next:** standalone selection_is_irregular / selection_size_description mklev exports (only dolookaround-local look_sel_* versions exist) when the generated block surfaces them.
## 2026-09-29 — D-3098 cfgfiles.c config_erradd in_lua arm + parse_conf_file export (coverage)

**C locus:** - `config_erradd`: nethack-c/upstream/src/cfgfiles.c:1544–1589 (in_lua arm `:1566–1574`; list `:1467`; drain l_get_config_errors `:1514–1541`).
**JS:** js/cfgfiles.js:275 config_erradd (in_lua arm `:284–292`, configErrorMsg list `:214`, dupstr import `:53`); js/cfgfiles.js:1057 parse_conf_file export, called at `:1091`.
**Change:** ported the in_lua arm in C order (alloc ≡ object literal, prepend to a new module-level configErrorMsg list, `dupstr` imported live from dungeon.js — imports.mjs verdict SAFE, hoisted fn); exported the string-fed parse_conf_file (Rule #2 FILE*→text adaptation) and rewired the read_config_file call site.
**Verify:** - `config_erradd`: note hidden (no corpus session blocked — normal for a coverage row); REACH-OK (no RNG-tagged reach; smoke spread 24 run, 24 PASS, 0 regressed).
**Named:** - `config_erradd`: wait_synch `:1562` (windowed input boundary — parser stays sync, parseoptions precedent); l_get_config_errors drain (lua-stack sink, lua-callable via nhlua.c:1887; no JS Lua state — mklev.js themerooms precedent — and nothing sets iflags.in_lua today).
**Next:** read_sym_file (files.c MISSING, C 28) would complete the parse_conf_file caller table when the generated block surfaces it.
## 2026-09-29 — D-3097 timeout.c burn_object: whole-body restart (coverage)

**C locus:** - `burn_object`: `nethack-c/upstream/src/timeout.c:1383–1680` (away catch-up + unhide `:1416`, POT_OIL burn-away, lamp milestones `:1482`/`:1492`, candle/menorah milestones + unhide `:1652`, impossible default `:1673`, newsym/update_inventory tail).
**JS:** `js/timeout.js:1939` (doc `:1919`, away `:1945`, POT_OIL `:1990`, lamps `:2019`, candles `:2091`, default `:2228`, tail `:2232`), wrapper `:1702`, imports `:54`/`:82`; `js/objnam.js:2810` (clone-retired doc touch).
**Change:** restart in C order with C's switch/case nesting, FALLTHRU comments and comments verbatim. need_invupdate arms (POT_OIL INVENT, lamp-0 INVENT, menorah-0 INVENT + carried-menorah; candle-0 INVENT deliberately flagless per C's useupall→freeinv comment) + `update_inventory()` tail; `await impossible('burn_object: unexpected obj %s', xname(obj))` default; `obj_extract_self` + `obfree(obj, null)` (live shk.js export, new edge — `imports.mjs --can` SAFE, hoisted fn) at the three deletion sites; live `Yname2` import (local clone deleted; see_lamp_flicker rides along); `Shk_Your` reimplemented as a file-local `upstart(shk_your(obj))` one-liner over the live export (no live Shk_Your exists; C's other callers are shop paths); post-message test via live `Hallucination()`; `The`/`delobj` imports removed. Retained: the `if (msg)` guard around the Blind '' post-message (C pline("") is a tty no-op) and the `&& loc` guard on the tail newsym (need_newsym implies a found location in C).
**Verify:** - `burn_object`: `node scripts/verify.mjs --fn burn_object` → PASS syntax (2 changed js files: js/objnam.js js/timeout.js) · PASS rule2 · note hidden (no corpus session blocked at baseline — expected) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run: 24 PASS, 0 regressed) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · VERIFY: PASS; forced `node frozen/ps_test_runner.mjs sessions` → 44/44 (timer path is turn-loop-adjacent, D-3010 precedent).
**Named:** - `burn_object`: none in-body — whole body, every callee live (end_burn/begin_burn/get_obj_location/Is_candle/carried/lantern_message/see_lamp_flicker file-local; weight/obj_extract_self mkobj.js; obfree shk.js; maybe_unhide_at monmove.js; pline/You_see/impossible/Hallucination/Blind display.js; useupall/update_inventory invent.js; Yname2/shk_your/xname/an objnam.js; m_at mon.js; cansee vision.js). No live Shk_Your export (one-liner over live shk_your; C's other callers are shop paths — own row if queued).
**Next:** timeout.c burn family complete (D-3010 + this); no follow-up row.
## 2026-09-29 — D-3096 validspecmon + isspecmon: specmon cham-form gate (coverage)

**C locus:** - `validspecmon`: nethack-c/upstream/src/mon.c:4993–5011 (NON_PM random `:4997–4998`, accept_newcham_form gate `:5000–5001`, isspecmon notake/nohead reject `:5003–5010`).
**JS:** js/makemon.js:1241–1246 isspecmon, :1252–1264 validspecmon; imports +has_head +M1_NOTAKE on the existing monsters.js edge (no new edge; `imports.mjs --can` ALREADY).
**Change:** restarted validspecmon in C order — NON_PM → true; `!accept_newcham_form` → false; isspecmon arm with `mons(mndx)`, inlined mondata.h notake (M1_NOTAKE macro, not a pinned-C function — no export to import; dothrow.js:186/pickup.js:153 expression mirrored, no clone #3) `|| !has_head(ptr)` short-circuit, C comments verbatim incl. the msound question. New file-local isspecmon in C order above it: isshk/ispriest/isgd fields then the leader m_id match with the mhitm.js:3915–3917 nonzero guard (leader_m_id is 0/undefined before the quest leader spawns; no live mon carries m_id 0 either side).
**Verify:** `node scripts/verify.mjs --fn validspecmon,isspecmon` → VERIFY: PASS (syntax 1 file; rule2; hidden note no-corpus-block both; reach: no RNG-tagged reach, smoke spread 24/24 PASS → REACH-OK both; green 2/2; strict both; cohort 7/7; full 44/44 shared-file).
**Named:** - `validspecmon`: none in-body — whole body, every callee live (accept_newcham_form file-local, isspecmon this commit, mons/has_head/M1_NOTAKE monsters.js) or macro-inlined (notake).
**Next:** none in mon.c closure (accept_newcham_form measured ok; has_head live export; notake is a C macro). No maintained unit-test layout in repo (no tests/ dir; sessions + verify.mjs are the harness) — no new test file per skill rule against adding a framework.
## 2026-09-29 — D-3095 fix_curse_trouble: whole-body restart (coverage)

**C locus:** - `fix_curse_trouble`: nethack-c/upstream/src/pray.c:349–370 (null+impossible `:353–356`, Glib arm `:357–362`, glow gate `:363–369`, uncurse+update_inventory `:370`).
**JS:** js/pray.js:528–547 fix_curse_trouble; imports +Your (display.js), +gloves_simple_name (objnam.js), +Glib (potion.js) on existing edges.
**Change:** restarted the body in C order — `await impossible('fix_curse_trouble: nothing to uncurse.')` on null; `Glib()` live (potion.js uprops-first) test; `Your('%s are no longer slippery.', gloves_simple_name(u.uarmg))` via live display.js Your + live objnam.js gloves_simple_name; `pline('%s %s.', what || Yobjnam2(otmp, 'softly glow'), hcolor('amber'))` (C `"%s %s."` form, %-safe); `game.iflags.last_msg = PLNMSG_OBJ_GLOWS` (const already imported; in-file precedent :1468); int bknown `Hallucination() ? 0 : 1` (SADDLE-case precedent); `await uncurse` kept; `update_inventory()` wired. Deleted the pray-local `Your` clone — live Your is identical for the 4 remaining single-nonempty-string call sites (pline is a vpline passthrough, display.js:8141–8143). NH_AMBER ≡ 'amber' (no color-name config in JS; potion.js:256/read.js:241 precedent).
**Verify:** `node scripts/verify.mjs --fn fix_curse_trouble` → VERIFY: PASS (syntax 1 file; rule2; hidden note no-corpus-block; reach: no RNG-tagged reach, smoke spread 24/24 PASS → REACH-OK; green 2/2; strict both; cohort 7/7; full skipped per no-shared-file rule).
**Named:** - `fix_curse_trouble`: none in-body — whole body, every callee live (impossible, make_glib, Glib, Your, gloves_simple_name, pline, Yobjnam2, hcolor, uncurse, update_inventory) or faithfully local (Blind/Blindfolded_only/Hallucination state readers, unchanged).
**Next:** none in pray.c (no further measured gap); SADDLE-case xname glow belongs to fix_worst_trouble (measured ok, out of cluster).
## 2026-09-29 — D-3094 pfxfn_cond_ + condopt + parse_cond_option: cond_ prefix option path (coverage)

**C locus:** - `pfxfn_cond_`: nethack-c/upstream/src/options.c:4994–5036 (do_init `:5001–5003`, do_set `:5005–5025` + case-3/1/2/default `:5008–5019`, get_val/get_cnf_val `:5027–5029`, do_handler "not used" `:5031–5033`).
**JS:** js/options.js:pfxfn_cond_:9123 (new) + botl import :206 + row wire :9838; js/botl.js:cond_idx:1247 (new, C :852), condopt:1258 (new), parse_cond_option:1318 (new), match_optname import :103 (`imports.mjs --can` SAFE — hoisted fn, runtime use only, same 100-module SCC).
**Change:** - `pfxfn_cond_`: new export in C order before pfxfn_font — do_init → condopt(0,null,0); do_set → parse_cond_option + full switch (0 marks opt_set_in_config[PFX_COND_IDX], 3 ambiguous, 1/2/default unknown), reslt!=0 → OPTN_ERR, FIXME kept, mark_opt_need_redraw; get arms → set_optbuf(opts,''); do_handler returns OPTN_OK (named omission below); cond_ row wired.
**Verify:** `node scripts/verify.mjs --fn pfxfn_cond_,condopt,parse_cond_option` → PASS syntax (2 changed js files: js/botl.js js/options.js) · PASS rule2 · note hidden ×3 (no corpus session blocked at baseline) · PASS reach ×3 (no RNG-tagged reach; fixed smoke spread 24 run each: 24 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** - `pfxfn_cond_`: do_handler `:5032` `(void) cond_menu()` — async in JS, arm unreachable in C (set_hidden never doset-listed); config_error_add message text (existing no-op sink, house precedent).
**Next:** resume coverage block ([3/7] cond-row note at js/options.js:9857 now satisfied for `:5010`).
## 2026-09-29 — D-3093 mhitm_ad_ssex: unified AD_SSEX dispatcher + three dispatch homes (coverage)

**C locus:** - `mhitm_ad_ssex`: nethack-c/upstream/src/uhitm.c:4750–4779 (uhitm `:4754–4758`, mhitu SYSOPT/could_seduce/doseduce `:4759–4768` + sedu fallback `:4770–4772`, mhitm `:4773–4778`) + dispatch `mhitm_adtyping` AD_SSEX `:4797`.
**JS:** js/mhitm.js:mhitm_ad_ssex:1558 (new); mhitu import +dosed uce,+sedu_u :146 (edge pre-exists — `imports.mjs --can` ALREADY, same 98-module SCC, call-time use only); js/mhitu.js sedu_u exported :2121, clone deleted, AD_SSEX → 4-arg call :2959, import :93; js/uhitm.js AD_SSEX split out :2826–2829, import :59; js/mhitm.js mdamagem AD_SSEX branch :5161.
**Change:** - `mhitm_ad_ssex`: new export in C order right after mhitm_ad_sedu — is_youmonst(magr) → sedu + done-check; is_youmonst(mdef) → SYSOPT_SEDUCE gate with could_seduce==1 && !mcan short-circuit then doseduce → AGR_DONE/done/return, always return under SYSOPT, else sedu_u + done-check; else sedu + done-check. The !SYSOPT mhitu fallback spells sedu_u (mhitu.js split half of sedu `:4633–4691`; full sedu returns past mdef==you by D-2575 design) — the one non-literal line, behavior-identical to the deleted clone.
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_ssex` → PASS syntax (3 changed js files: js/mhitm.js js/mhitu.js js/uhitm.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; fixed smoke spread 24 run: 24 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · VERIFY: PASS.
**Named:** - `mhitm_ad_ssex`: none in-body — whole body, every callee live (mhitm_ad_sedu, could_seduce, doseduce, mhitm_ad_sedu_u); 3 C dispatch paths wired.
**Next:** resume coverage block (mhitm_ad_sedu D-2575 omit — the ssex remainder + dispatch home — is now satisfied; follow-up may clear its omit text).
## 2026-09-29 — D-3092 wiz_show_vision + wiz_mon_diff EXT_CMDS runners: #vision/#wizmondiff dispatch (Must-fix review 2045)

**C locus:** - `wiz_show_vision`: nethack-c/upstream/src/cmd.c:1928–1929 "vision" IFBURIED|AUTOCOMPLETE|WIZMODECMD (unconditional) → wiz_show_vision
**JS:** js/getline.js EXT_CMDS vision:945, wizmondiff:958; scripts/vision-wizmondiff-runners.test.mjs (new, 3 its).
**Change:** - `wiz_show_vision`: new EXT_CMDS row — wiz:true, autocomplete:true, lazy `import('./wizcmds.js')` → wiz_show_vision() (D-2779 sibling pattern; dynamic import, no new static edge).
**Verify:** `node --test scripts/vision-wizmondiff-runners.test.mjs` → null runners pre-fix, 3/3 pass post-fix. `node scripts/verify.mjs --fn wiz_show_vision,wiz_mon_diff` → PASS syntax (1 changed js file: js/getline.js) · PASS rule2 · note hidden ×2 (no corpus session blocked at baseline — review 2045 notes the corpus cannot reach wizard extcmds) · PASS reach ×2 (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · VERIFY: PASS.
**Named:** - `wiz_show_vision`: none — runner-only change; body unchanged since D-3085 ACCEPT.
**Next:** Must-fix queue empty; resume coverage block (head: uhitm.c mhitm_ad_ssex THIN).
## 2026-09-29 — D-3091 wiz_custom + wiz_kill EXT_CMDS runners: #wizcustom/#wizkill dispatch (Must-fix review 2049)

**C locus:** - `wiz_custom`: nethack-c/upstream/src/cmd.c:1951–1952 "wizcustom" IFBURIED|WIZMODECMD|NOFUZZERCMD (no AUTOCOMPLETE) → wiz_custom
**JS:** js/getline.js EXT_CMDS wizcustom:782, wizkill:795; scripts/wizcustom-wizkill-runners.test.mjs (new, 3 its).
**Change:** - `wiz_custom`: new EXT_CMDS row — wiz:true, autocomplete:false, lazy `import('./wizcmds.js')` → wiz_custom() (D-2779 sibling pattern; dynamic import, no new static edge).
**Verify:** `node --test scripts/wizcustom-wizkill-runners.test.mjs` → 2 fail pre-fix (null runners), 3/3 pass post-fix. `node scripts/verify.mjs --fn wiz_custom,wiz_kill` → PASS syntax (1 changed js file: js/getline.js) · PASS rule2 · note hidden ×2 (no corpus session blocked at baseline — review 2049 notes the corpus cannot reach wizard extcmds) · PASS reach ×2 (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · VERIFY: PASS.
**Named:** - `wiz_custom`: none — runner-only change; body unchanged since D-3089 ACCEPT.
**Next:** Must-fix vision+wizmondiff runners (review 2045) remain queued; bodies live since D-3085.
## 2026-09-29 — Audit 2042–2050: 7A/2Q; public 44/44, corpus 648/953 (+9, 0 flips, full)

**Reviews:** 2042 A, 2043 A, 2044 A, 2045 Q (unwired vision/wizmondiff runners — Must-fix), 2046 A, 2047 A, 2048 A (own 1230/1230 byte-diff; D-log "1251" wrong, immaterial), 2049 Q (unwired wizcustom/wizkill runners — Must-fix), 2050 A. All re-measures REACH-OK, 0 regressed. Held-out 13/44 flat. 5 ledger rows briefed, sound (sqlite absent, NOTES-known). Next: 2049 runner Must-fix, then 2045's.
## 2026-09-29 — D-3090 lose_weapon_skill + abon + show_skills: weapon.c head + clone unification (coverage)

**C locus:** - `lose_weapon_skill`: nethack-c/upstream/src/weapon.c:1453–1473 (slots-first :1459–1461, record pop :1462, panic :1463–1464, rank-- :1465, refund :1467)
**JS:** js/weapon.js:lose_weapon_skill:1081, abon:1362 (new); js/attrib.js adjabil tail:1004–1012 (wired); js/dig.js:69 import; js/uhitm.js:47 import.
**Change:** - `lose_weapon_skill`: new sync export in C order — free-slots-first, record pop, P_SKILL-- via setter, slots_required-1 refund, panic ≡ loud throw (insert_branch precedent).
**Verify:** - `lose_weapon_skill`: hidden note (no sessions blocked), REACH-OK (smoke 24/24).
**Named:** - `lose_weapon_skill`: none in-body — whole body, every callee live (slots_required, P_SKILL/set_P_SKILL).
**Next:** postadjabil in adjabil stays deferred (pre-existing, untouched); queue continues from the generated block.
## 2026-09-29 — D-3089 wiz_custom + wiz_kill + ecname_from_fn: wizcmds MISSING pair + cmd lookup (coverage)

**C locus:** - `wiz_custom`: nethack-c/upstream/src/wizcmds.c:1934–1984 (wizard gate :1938, cache fill :1946–1947, menu build :1951–1955, bufa :1956–1964, dead buf copy :1965, fill :1967, end/select/destroy :1968–1970, free :1974–1975, cache drop :1976–1977, docrt :1978, else :1982–1983)
**JS:** js/wizcmds.js:wiz_custom:2109, wiz_kill:2149 (new); js/dokeylist.js:ecname_from_fn:652, UNAVAILCMD:641 (new); js/const.js:KNOWN_HANDLING:2881 (new).
**Change:** - `wiz_custom`: new async export in C order — sibling wizard gate, cache fill, raw-array win (create/start), verbatim heading, bufa (`#wizcustom: colorcount=N name|default`, `, active` with BSS-0 currentgraphics, `, handler=` via new KNOWN_HANDLING), dead `:1965` copy dropped (buf never read), live `wizcustom_glyphids` fill, prompt-last (tty_end_menu idiom), `select_menu_pick_none` (= end+select+destroy), free arm noted (no allocation), cache drop, `docrt`, ECMD_OK; else arm is the first live `pline(UNAVAILCMD, ecname_from_fn('wizcustom'))` call site.
**Verify:** - `wiz_custom`: /tmp/wiz_probe.mjs — non-wizard arm → ECMD_OK (pline headless-clean); cache fill→glyphids→free cycle no-throw, 0 items on default game (C-correct: nothing customized). `verify --fn`: hidden note (no sessions blocked), REACH-OK (smoke 24/24).
**Named:** - `wiz_custom`: none in-body — whole body, every callee live or house-mapped (menu verbs → raw array + `select_menu_pick_none`; dead `:1965` copy and `free` have no JS analogue).
**Next:** wire the 8 unported `ecname_from_fn` hosts when their wiz arms land; `game.gs.symset`/`gc.currentgraphics`/`iflags.colorcount` writers (init_symbols/symset path) will light up the `, active`/handler arms.
## 2026-09-29 — D-3088 dump_enums: earlyarg.c `--dumpenums` enum tables (coverage)

**C locus:** - `dump_enums`: nethack-c/upstream/src/earlyarg.c:706–801 (tables :624–703, loop :777–800)
**JS:** js/earlyarg.js:dump_enums (file-local), dump_enums_tables (exported for the oracle probe); js/generated/enumdumps_data.js (new); js/mcastu.js:MCASTU_SPELL_DEFS; js/display.js:MAXMCLASSES.
**Change:** - `dump_enums`: new file-local in C order — 11 `edmp` tables via exported `dump_enums_tables()` assembler (monsdump from live monsterNames slice(3) + 5 fenceposts with HIGH_PM≡NUMMONS-1 per permonst.h:22; objdump from live objectNames + NUM_OBJECTS; omdump 15 rows from objects_data consts + indexOf MARKER anchors + objclass.h:180–181 gem counts; six defsym tables from new js/generated/enumdumps_data.js; arti from artilistRaw bn + NROFARTIFACTS+1 per hack.h:102/106; mcast from new MCASTU_SPELL_DEFS), prefix/unprefixed/nmwidth/comment logic verbatim, rows pre-formatted (`padEnd` ≡ negative-width `%*s`, `padStart(3)` ≡ `%3d`) through `raw_printf('%s', …)` (early_version_info precedent; vpline_expand strips width per D-2573). Extended scripts/extract-glyphsyms.py (owns defsym.h parsing) to emit enumdumps_data.js with density + OBJCLASS2 + printability asserts; added MAXMCLASSES=61 (sym.h:24) to js/display.js. Wired the ARG_DUMPENUMS arm (returns 2, as C).
**Verify:** - `dump_enums`: /tmp/dumpenums_probe.mjs rebuilt all 11 tables (388+482+15+106+61+60+17+18+17+35+20 rows) from the real `dump_enums_tables()` and byte-diffed 1251/1251 lines vs `./nethack --dumpenums` (recorder binary) — BYTE-EXACT; `argcheck(2,['nethack','--dumpenums'],ARG_DUMPENUMS)` → 2, no throw. `verify --fn dump_enums`: hidden note (no sessions blocked), REACH-OK (smoke 24/24), green 2/2, strict ×2, cohort 7/7, full 44/44 → VERIFY: PASS.
**Named:** - `dump_enums`: `raw_print` `:797–798`,`:800` stdout sink (no pre-window channel in dual-runtime ESM; `vraw_printf` `:577` sink-omit precedent — routing through `raw_printf` would invent +2 early_raw_messages counts per line that C never records).
**Next:** ARG_DUMPGLYPHIDS/ARG_DUMPMONGEN/ARG_DUMPWEIGHTS arms stay named (dump_all_glyphids, dump_mongen, dump_weights unported).
