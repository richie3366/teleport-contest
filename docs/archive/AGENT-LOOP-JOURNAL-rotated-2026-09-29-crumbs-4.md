# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-29 — Audit 2033–2041 (D-3073..D-3081): 6 ACCEPT, 1 WITH-DEBT, 2 QUALITY-RISK; full cadence

Reviews 2033–2041 over 9 js SHAs since aa12e06ff. ACCEPT: 2033 query_color Must-fix (menu-earlier verified arm-by-arm), 2034 zap sextet (zhitu 17/17 reach), 2036 trap pair, 2037 random_dir, 2038 eat cluster, 2039 cmd pair. WITH-DEBT: 2040 complex_dump trailing-space (JS 40 vs C 39 chars; sink voided — live debt). QUALITY-RISK + Must-fix: 2035 creation class-d (creates urole.mnum, C mkclass — D-log containment claim false), 2041 get_uchars wait_synch (empty-macro claim false — SFCTOOL-only ifdef; game build blocks). Fortress 44/44 (RNG 792,838, Scr 11,405); corpus 639/953 (+8, 0 flips, full:true); held-out 13/44 (+1). Next: Must-fix get_uchars wait_synch, then creation class-d.

## 2026-09-29 — D-3081 cfgfiles.c config-line family: get_uchars + 9 cnf_line_* handlers

**C locus:** - `get_uchars`: nethack-c/upstream/src/cfgfiles.c:380–437
**JS:** js/cfgfiles.js:450 get_uchars, :536 cnf_line_BINDINGS, :555 cnf_line_BOULDER, :570 cnf_line_WARNINGS, :606 cnf_line_CHECK_SAVE_UID, :614 cnf_line_CHECK_PLNAME, :626 cnf_line_SEDUCE, :644 cnf_line_HIDEUSAGE, :653 cnf_line_MAXPLAYERS, :666 cnf_line_PERSMAX; new imports SYM_BOULDER/WARNCOUNT (const.js), MAXPCHARS/SYM_OFF_X/update_ov_primary_symset (display.js), parsebindings/assign_warnings (options.js), sysopt_seduce_set (sys.js).
**Change:** - `get_uchars`: new file-local in C order — separator flush with modlist zero-skip (`:398–404`), count==size/end return (`:406`), digit accumulate (`:422–424`), backslash/default error arm (`:427–435`, live `raw_printf`, `wait_synch()` an empty macro in this TU per cfgfiles.c:120); C `uchar` store narrows (`& 0xFF`).
**Verify:** `node scripts/verify.mjs --fn get_uchars,cnf_line_BOULDER,cnf_line_WARNINGS,cnf_line_CHECK_SAVE_UID,cnf_line_CHECK_PLNAME,cnf_line_SEDUCE,cnf_line_HIDEUSAGE,cnf_line_MAXPLAYERS,cnf_line_PERSMAX,cnf_line_BINDINGS` → PASS syntax (1 file) · PASS rule2 · 10× `no corpus session is blocked` + smoke-spread REACH-OK (24/24 each) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 → VERIFY: PASS. Throwaway probe /tmp/cfg-probe.mjs 27/27 (boulder set/zero-keep, warnings vector, int stores, clamps, seduce sysconf/user gates, binds overlay). No maintained harness in repo (sessions + verify are the gates).
**Named:** - `get_uchars`: none — whole body; `wait_synch()` is an empty macro here, not an omission.
**Next:** adjust_prefix row left the block via by-design (NOCWD_ASSUMPTIONS-only; unix callers are nhUse+TRUE, wired as cnf_line_nhUse) — no Next owed.

## 2026-09-29 — D-3080 sfbase.c save-file base: sf_log + sfi_char/sfo_genericptr/sfi_genericptr/sfi_version_info/complex_dump + sfvalue_ trio

**C locus:** - `sf_log`: nethack-c/upstream/src/sfbase.c:376–404
**JS:** js/files.js:1153 sfi_char, :1189 sfo_genericptr, :1213 sfi_genericptr, :1246 sfi_version_info, :1285 sf_log, :1306 sfvalue_char, :1316 sfvalue_genericptr, :1327 sfvalue_uchar, :1359 complex_dump; js/const.js TURN_OFF_LOGGING.
**Change:** - `sf_log`: new export in C order — fplog read (`:379`), TURN_OFF_LOGGING gate (`:381`, new js/const.js const from sfbase.c:15), WRITING→rcount/wcount select (`:384`); fprintf+fflush named omit (Rule #2); `:399–401` stays dead, VMS shape compiled out.
**Verify:** `node scripts/verify.mjs --fn sf_log,complex_dump,sfo_genericptr,sfi_genericptr,sfi_version_info,sfi_char,sfvalue_char,sfvalue_genericptr,sfvalue_uchar` → VERIFY: PASS (green 2/2, strict ×2, cohort 7/7; full skipped — no shared file per detector):
**Named:** - `sf_log`: `:385–398` fprintf + `:402` fflush (Rule #2, no fs log; viable_nhfile precedent).
**Next:** SF_X queue row stays Open (macro generating sfo_bitfield/sfi_bitfield, not a portable function); binary NHFILE restore (mread/bread) remains the by-design boundary for the sfi_ fills.

## 2026-09-29 — D-3079 cmd.c handler_change_autocompletions + parseautocomplete port; counter_were stale-retired

**C locus:** - `handler_change_autocompletions`: nethack-c/upstream/src/cmd.c:2449–2515 (caller options.c:8362 optfn_o_autocomplete do_handler)
**JS:** - `handler_change_autocompletions`: js/cmd.js:2334 (export async).
**Change:** - `handler_change_autocompletions`: new async export in C order — menu build over EXTCMDLIST.length ≡ extcmdlist_length (`:2463–2481`, INTERNALCMD|CMD_NOT_AVAILABLE + short-name skips, a_int i+1, '*' when AUTOCOMP_ADJ, SELECTED when AUTOCOMPLETE), title row for the `:2483` prompt, one `select_menu_pick_any` with cancelValue -1 (cond_menu precedent) keeping the `:2485` n>=0 gate, apply loop (`:2486–2512`, Set of picked a_int ≡ C's `ec == &extcmdlist[a_int-1]`), free `:2511` GC.
**Verify:** `node scripts/verify.mjs --fn handler_change_autocompletions,parseautocomplete` → syntax PASS (3 files: js/cfgfiles.js js/cmd.js js/options.js) · rule2 PASS · hidden note ×2 (no corpus session blocked — coverage rows) · REACH-OK ×2 (no RNG-tagged reach; smoke 24/24 PASS each) · green 2/2 · strict 2/2 · cohort 7/7 · full 44/44 (auto: shared file changed) → VERIFY: PASS. /tmp/parseautocomplete-probe.mjs 11/11 (toggle symmetry, list/colon/whitespace/empty/bad-name arms). New cfgfiles→cmd edge: same 100-module SCC, hoisted function export, call-time use only (imports.mjs --can CHECK-analyzed); probe import smoke ok.
**Named:** - `handler_change_autocompletions`: none in-body — whole body; window layer via live select_menu_pick_any, sole C callee parseautocomplete live.
**Next:** downstream static snapshot — js/getline.js EXT_CMD_AC (NEWAUTOCOMP uniqueness set) is taken once from C's AUTOCOMPLETE flags and does not follow runtime EXTCMDLIST flag changes; making `#` completion read live flags is a get_ext_cmd change, out of this cluster. Same-optfn sibling `count_autocompletions` (options.c:8358 get_val) still MISSING/unqueued — the doset row keeps its hardcoded '(0 currently set)'.

## 2026-09-29 — D-3078 eat.c temp_resist + food_substitution + 4 same-file restarts; 2 #if 0 by-designed

**C locus:** - `temp_resist`: nethack-c/upstream/src/eat.c:453–469 (live callers insight.c:1544,1555; eat.c:502 caller is `#if 0` dead)
**JS:** - `temp_resist`: js/eat.js:964 (export); js/invent.js:67 (import), sites js/invent.js:6315,6330,7038,7059.
**Change:** - `temp_resist`: new export in C order — timeout `:456`, four conjuncts `:458–466` (form/extrinsic/blocked guards + C comments); body verbatim the deleted clone.
**Verify:** `node scripts/verify.mjs --fn temp_resist,food_substitution,recalc_wt,do_reset_eat,foodword,start_eating` → syntax PASS (2 files: js/eat.js js/invent.js) · rule2 PASS · hidden note ×6 (no corpus session blocked — coverage rows) · REACH-OK ×6 (no RNG-tagged reach; smoke 24/24 PASS each) · green 2/2 · strict 2/2 · cohort 7/7 → VERIFY: PASS. No full sessions (no shared file changed). New invent→eat edge: same 100-module SCC, hoisted export, call-time use only (imports.mjs --can CHECK-analyzed); /tmp/cluster-probe.mjs import smoke ok.
**Named:** - `temp_resist`: none — whole body, zero C callees.
**Next:** `leather_cover` + `maybe_extend_timed_resist` set by-design this commit (`#if 0`, uncompiled — D-3025 precedent). Caller-body gaps for future caller ports (not this cluster): doeat's 3 do_reset_eat sites + 2nd start_eating arm, eatfood's do_reset_eat site (D-2720-fenced), rottenfood's foodword message. eat.c still holds PARTIALs below block heat (reset_eat/tinopen_ok/eat_ok/use_up_tin/foodword-adjacent one-liners).

## 2026-09-29 — D-3077 worm.c random_dir port; 3 same-file PARTIALs stale-retired

**C locus:** - `random_dir`: nethack-c/upstream/src/worm.c:802–822 (staticfn decl :22; zero call sites)
**JS:** - `random_dir`: js/worm.js:668 (local; no callers, as in C).
**Change:** - `random_dir`: new local (C staticfn) in C order — x-step ternary `:805–809` (interior rn2(3)-1, right-edge -rn2(2), left-edge rn2(2)), x-changed y-step `:810–815`, forced y-change `:816–821` (rn2(2)?1:-1 / -1 / +1); C `int *nx,*ny` out-params ≡ `out.nx`/`out.ny` (mutable-coords-object convention per `rnd_nextto_goodpos_mon`); edge checks precede each single draw, preserving short-circuit + RNG order; COLNO/ROWNO added to the existing const.js edge (no new edge).
**Verify:** `node scripts/verify.mjs --fn random_dir,create_worm_tail,shrink_worm,count_wsegs` → syntax PASS (1 file) · rule2 PASS · hidden note ×4 (no corpus session blocked — coverage rows) · REACH-OK ×4 (no RNG-tagged reach; smoke 24/24 PASS each) · green 2/2 · strict 2/2 · cohort 7/7 → VERIFY: PASS. No full sessions (js/worm.js not shared).
**Named:** - `random_dir`: none — whole body, sole callee rn2 live.
**Next:** stale-retired this commit via `ledger.mjs set` (bodies verified complete + callers wired): queue-head pops `doffing` (ported, js/do_wear.js:3920, all 14 arms) and `set_random` (split→js/rng.js:initRng — live body is one init_isaac64 call, D-3033; sole C caller init_random routes there); same-file `create_worm_tail` (C stores subsumed by newseg zero-literal js/worm.js:35; caller initworm wired js/worm.js:111), `shrink_worm` (3 C callers wired js/worm.js:324,471,480), `count_wsegs` (11/12 C callers wired; C trap.c:1975 trapeffect_pit arm unwired — belongs to a trapeffect_pit port). worm.c now holds no more Open (rest unknown+ok / ported / by-design); ~25 insertions with the file exhausted.
