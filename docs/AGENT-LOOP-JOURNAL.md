# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-02 — D-3323 music.c awakener a_monnam/Amonnam clone removals (re-queued — D-3322 mis-archived its refill unshipped)

**C locus:** - `a_monnam`: nethack-c/upstream/src/do_name.c:1151–1156 whole body: `x_monnam(mtmp, ARTICLE_A, 0, has_mgivenname ? SUPPRESS_SADDLE : 0, FALSE)` — read in the brief this session.
**JS:** js/music.js (import :43; sites :340/:623). Scripts: scripts/amonnam-rewire.test.mjs — census now trap/hack/music (global a_monnam census `['js/do_name.js']`) + new Amonnam no-clone test (first run 5/6: new Amonnam import regex crossed `}` — test fixed, live export correct; final 6/6).
**Change:** extended the ALREADY static do_name edge (js/music.js:43; imports.mjs ALREADY both names) with `a_monnam, Amonnam`; deleted both clones; one C-cite comment per site (js/music.js:338, :621). Call-site expressions unchanged — both already C-shaped (`You notice %s, swaying` ≡ music.c:124; `%s is shaken loose from the ceiling!` ≡ music.c:376). Export names/signatures unchanged.
**Verify:** `node scripts/verify.mjs --fn a_monnam,Amonnam` tail pasted verbatim:
**Named:** - `a_monnam`: none in-body — whole C body live.
**Next:** ship the queued `hacklib.c` distmin shknam.js clone row (live js/hacklib.js:19; second export js/mon.js:1130 needs the C-locus decision); do_name.c sub-8-line THINs (free_oname/safe_oname/noit_Monnam/Some_Monnam/YMonnam) are leads, each needing its own brief; refill stays brief-evidence-only until a gap reopens.
## 2026-10-02 — D-3322 a_monnam trap+hack clone removals (animate_statue / moverock_core rewires)

**C locus:** - `a_monnam`: nethack-c/upstream/src/do_name.c:1151–1156 whole body (4 lines): `x_monnam(mtmp, ARTICLE_A, 0, has_mgivenname ? SUPPRESS_SADDLE : 0, FALSE)` — read in the brief this session.
**JS:** live js/do_name.js:1221, unchanged, verified complete against the C body (ARTICLE_A, null adjective, SUPPRESS_SADDLE-when-named, called=false over live x_monnam js/do_name.js:934). Scripts: scripts/amonnam-rewire.test.mjs (an-eel / a-rat / named-saddled behavioral + 2 census subtests; pre-change run: 3 pass / 2 census fail — authentic failure observed).
**Change:** deleted both clones; extended the ALREADY static do_name edges (js/trap.js:44, js/hack.js:74; imports.mjs ALREADY both files) with `a_monnam`; one C-cite comment per site (js/trap.js:441, js/hack.js:1043). Call-site expressions unchanged — both already C-shaped (`canspotmon ? a_monnam : something` ≡ trap.c:848; `There's … on the other side` ≡ hack.c:462). Export names/signatures unchanged.
**Verify:** `node scripts/verify.mjs --fn a_monnam` tail pasted verbatim:
**Named:** - `a_monnam`: none in-body — whole C body live.
**Next:** ship the queued music.c awakener a_monnam row (third clone + Amonnam-twin companion); coverage block stays ungeneratable (all gaps ≤7 lines), hidden-proxy queue 0 eligible — refill stays source-(4)-only until a gap reopens.
## 2026-10-02 — D-3321 fingers_or_gloves eat.js clone removal (tin-slips gloves→fingers)

**C locus:** - `fingers_or_gloves`: nethack-c/upstream/src/do_wear.c:59–65 whole body (5 lines): `(check_gloves && uarmg) ? gloves_simple_name(uarmg) : makeplural(body_part(FINGER))`.
**JS:** live js/do_wear.js:3981, unchanged, verified complete: `check_gloves && u.uarmg → gloves_simple_name` else `makeplural(body_part_latebound(FINGER))` (latebound ≡ body_part, TDZ policy D-2349). Post-fix truth-table probe (`node /tmp/fog-truth-table.mjs`): (F,∅)=fingers (T,∅)=fingers (F,uarmg)=fingers (T,uarmg)=gloves — C-exact.
**Change:** extended the ALREADY static edge (js/eat.js:142) with `fingers_or_gloves`; deleted the clone; both call sites unchanged — their flags were already C-correct (TRUE≡eat.c:1643, FALSE≡eat.c:1774).
**Verify:** `node scripts/verify.mjs --fn fingers_or_gloves` tail: `PASS syntax (1 changed js file: js/eat.js); PASS rule2; note hidden (0 blocked at baseline — coverage row, no --base needed); PASS reach (no RNG tags; smoke spread 24 run, 24 PASS, 0 regressed → REACH-OK); PASS green 2/2; PASS strict both; PASS cohort 7/7; VERIFY: PASS`.
**Named:** - `fingers_or_gloves`: none in-body — whole C body live.
**Next:** ship the 2 remaining audit clone-removal rows (trap.c animate_statue, hack.c moverock_core a_monnam rewires); refill sources exhausted (block 0, queue 0 eligible) — next iters re-check.
## 2026-10-02 — D-3320 money_cnt first-stack trio (really_done + finish_paybill + set_apparxy rewires; impossible arm)

**C locus:** - `really_done`: nethack-c/upstream/src/end.c:1130–1590 whole body verified in C order (score block `:1316–1350`, `money_cnt` `:1322`); this iter changes only the `:1322` site.
**JS:** js/end.js:69 (import) :457 (marker) :1219 (really_done site) :1313–1330 (finish_paybill, impossible :1320–1321, site :1329); js/monmove.js:88–91 (import) :743 (marker) :1016 (site); scripts/moneycnt-trio-rewire.test.mjs (6 subtests: 3 first-stack incl. leading-zero-quan, 2 Xorn-arm live-site, 1 module-wiring).
**Change:** deleted both clones; extended the existing static shk.js edges (imports.mjs ALREADY both files) with `money_cnt`; one C-cite comment per site; `if (shkp) await impossible('finish_paybill: bad location <%d,%d>.', ox, oy)` in the off-map arm (live display.js export, printf shape per the :486–488 precedent) + doc retired to whole-body-live; pruned the orphaned end.js COIN_CLASS import (monmove.js keeps its live uses). Export names/signatures unchanged, so all callers stay wired. No DIAG/FORCE/seed gates; Rule #2 clean; no frozen files.
**Verify:** `node scripts/verify.mjs --fn really_done,finish_paybill,set_apparxy` → VERIFY: PASS. Tail pasted verbatim:
**Named:** - `really_done`: none new — pre-existing doc-named omissions stand (dumplog family incl. DUMPLOG second artifact_score; livelog/logfile/xlogfile; wait_synch/signals/exit_nhwindows; sound_exit; panic caller; done_stopprint raw_print path live).
**Next:** queue ships at 3 (fingers_or_gloves eat.js clone; a_monnam trap.js + hack.js clones). monmove.js `accessible`/`closed_door` local clones are leads for future brief-evidence rows, not rows yet.
## 2026-10-02 — Audit 2269–2275: review D-3311–D-3319 (7 ACCEPT) + full score

**Scope:** 7 js-touching SHAs since 2268 (D-3312/D-3314 docs-only, skipped): erinys-reset Must-fix, rush octet+idx, safeq quartet, alloc trio, mon sextet, fountain septet, fountain completion. Every verify re-measured per-function in one call each (incl. dryup 42/42, gush 24/24, mgender 90/90 real reach).
**Finding:** all ACCEPT, no Must-fix. 2266 erinys family closed (reset call + wording verified, probe passes). Deepest checks: set_levltyp target mkmaze.c:76–121 vs trap.js:881 (incremental-counts ≡ rescan disclosed; DB_ICE/EXTRA_SANITY gaps pre-existing, unobservable at these sites); money_cnt/a_monnam/fingers re-points land on exact live exports; eat/trap/hack clone divergences found while refilling → 3 Open rows (not Must-fix: outside reviewed SHAs).
**Score:** public 44/44 (Scr 11,405, RNG 792,838, `317+1.68/turn`); corpus 705/953, 0 losses/0 gains, `full: true`; held-out 15/44 (+0). Ledger: snapshot appended; 5 ported rows sampled via briefs, all correct (2 stale "no JS symbol" notes refreshed).
**Next:** queue head (really_done money_cnt twin); queue 3→6 after refill hunt (coverage 0, corpus queue 30→0 eligible, spoteffects park writer shipped).
## 2026-10-02 — D-3319 `fountain.c` completion septet (live set_levltyp rewires + 3 clone deletions + money_cnt first-stack fix)

**C locus:** - `dipfountain`: nethack-c/upstream/src/fountain.c:393–554 — Excalibur LONG_SWORD gate + wash/water_damage + rnd(30) switch; :442 `set_levltyp(u.ux,u.uy,ROOM)`; case-28 `money_cnt` (C hack.c:4513–4522 returns the FIRST coin stack).
**JS:** js/fountain.js (4 site rewires + 4 clone/helper deletions + 3 import adds + 3 import prunes + doc updates); js/do.js:2796 (analog→alias comment); scripts/fountain-rewire.test.mjs (9 subtests: 5 transitions incl LADDER-refusal + helper delegation, 2 first-stack, 2 live-name resolve).
**Change:** rewired all four sites + the helper to the live mkmaze.c `set_levltyp` export (js/trap.js:881); deleted the three clones (+ orphaned local `gloves_simple_name`) for the live `money_cnt` (js/shk.js:4767), `a_monnam` (js/do_name.js:1221), `fingers_or_gloves` (js/do_wear.js:3981) exports; pruned orphaned `FINGER`/`IS_SINK`/`objectNameStrs` imports; retired the header deferral + gush/helper/do.js analog comments. C proofs read this session: set_levltyp mkmaze.c:76–121, CAN_OVERWRITE_TERRAIN rm.h:320 (never LADDER/STAIRS at these sites → guards pass), money_cnt hack.c:4513–4522 (first-stack), do.c:420/427/433/442 + :482/486 (polymorph_sink + teleport_sink call set_levltyp — helper delegation covers both), Soundeffect sndprocs.h:272 empty-in-this-build (drinksink cases 11/12 omit stands, D-3318 precedent). imports.mjs: trap/do_name ALREADY; shk/do_wear IN-SCC hoisted cycle-safe.
**Verify:** `node scripts/verify.mjs --fn dipfountain,dryup,breaksink,gush,wash_hands,drinksink,dipsink` → VERIFY: PASS — syntax 2 files, rule2 clean, 7× hidden note (0 blocked, normal for coverage), REACH-OK each (dipfountain 14/14, dryup 42/42, gush 24/24, drinksink 6/6 reached; breaksink/wash_hands/dipsink smoke 24/24), green 2/2, strict 2/2, cohort 7/7, full 44/44 (auto: do.js shared). Focused `node --test scripts/fountain-rewire.test.mjs`: 9/9 (first run 8/9: unspotted a_monnam fixture returns x_monnam "it" — test expectation fixed, live export correct).
**Named:** - `dipfountain`: none in-body — whole C body live (retained pre-existing extra `looted=0` at the Excalibur site: C :443 clears flags only; dormant on ROOM, unobservable).
**Next:** 3 missing-arm rows queued (summing money_cnt twins: end.c really_done js/end.js:1225, shk.c finish_paybill js/end.js:1331, monmove.c set_apparxy js/monmove.js:1021 — same live js/shk.js:4767 rewire + whole-body brief-check each); sit.js:1084 money_cnt clone is already first-stack (dedup optional, no row); fountain.c now holds only parked drinkfountain.
## 2026-10-02 — D-3318 `fountain.c` septet (floating_above utrap-arm head + sink_backs_up FACE fix + 5 stale-complete)

**C locus:** - `floating_above`: nethack-c/upstream/src/fountain.c:21–32 — default umsg → `u.utrap && (utraptype INFLOOR||LAVA)` override + `surface(u.ux,u.uy)` → `You(umsg, what)`; 5 code call sites.
**JS:** js/fountain.js `floating_above` (:281–291), `sink_backs_up` (:350, FACE line :357); scripts/floating-above.test.mjs (6 subtests: default/INFLOOR/LAVA/PIT message arms + humanoid/jelly FACE forms; pre-fix run failed the 2 trapped arms, post-fix 6/6).
**Change:** ported the `:25–30` trapped arm in C order (default umsg → gate → override + `surface()` → `You(umsg, what)`); `sink_backs_up` Blind+Deaf arm now calls live `body_part(FACE)` (already imported). Added TT_INFLOOR/TT_LAVA to the const.js import + `surface` from sit.js (`imports.mjs --can`: same 102-module SCC, hoisted function, cycle-safe).
**Verify:** `node scripts/verify.mjs --fn floating_above,sink_backs_up,dowatersnakes,dowaternymph,dofindgem,watchman_warn_fountain,dogushforth` → VERIFY: PASS — syntax 1 file, rule2 clean, 7× (hidden note: 0 blocked; reach: no RNG-tagged reach, smoke 24/24 PASS → REACH-OK), green 2/2, strict 2/2, cohort 7/7, full skipped (no shared file changed). Focused `node --test scripts/floating-above.test.mjs`: 6/6.
**Named:** - `floating_above`: none in-body — whole C body live.
**Next:** remaining `fountain.c` ledger-unknowns need their own iterations: dryup/drinkfountain/dipfountain/drinksink/dipsink (large multi-arm bodies, unverified — each a future brief+verify); wash_hands (body complete but calls local `fingers_or_gloves` clone js/fountain.js:966 instead of live js/do_wear.js:3981 export — rewire or name); breaksink (set_levltyp inlined as typ+counts — prove equivalence with live js/trap.js:881 export or call it; shared file-level deferral with gush).
## 2026-10-02 — D-3317 `mon.c` sextet (mondied corpse-gate head + 4 stale-complete + pacify_guard split)

**C locus:** - `mondied`: nethack-c/upstream/src/mon.c:3252–3263 — mondead → lifesaved return → corpse_chance(mdef,0,FALSE) && (accessible(mx,my)||is_pool(mx,my)) → make_corpse(mdef, CORPSTAT_NONE); 15 code call sites.
**JS:** - `mondied`: js/mhitm.js:3980–3986 — gate added; doc now C-cites :3252–3263.
**Change:** ported the :3258–3260 gate in C order (corpse_chance first so its rn2 draws precede the gate exactly as in C, then accessible||is_pool) over live exports (accessible js/monmove.js:840, is_pool js/hack.js:2080; imports.mjs ALREADY on both edges — names added to the existing mhitm.js imports). corpse_chance defaults (null, false) ≡ C (0, FALSE); make_corpse default ≡ CORPSTAT_NONE; lifesaved check (mhp>0 ≡ !DEADMONSTER) kept. New focused test scripts/mondied-corpse-gate.test.mjs (STONE→none, ROOM→corpse, POOL→corpse; lizard keeps corpse_chance draw-free): 2 pass/1 fail pre-fix (STONE left a corpse), 3/3 post.
**Verify:** - `mondied`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `mondied`: none in-body — whole C body live (gate ported; callees live; corpse_chance/make_corpse defaults ≡ C args). C caller muse.c:1996 compiled out (#if 0).
**Next:** floating_above row stays Open (fountain.c trapped-arm port, surface live); queue sits at 1 until coverage regenerates or the next refill authorization.
## 2026-10-02 — D-3316 `alloc.c` trio (dupstr_n head by-design + fmt_ptr stale-complete + dupstr guard arm)

**C locus:** - `dupstr_n`: nethack-c/upstream/src/alloc.c:253–261 — inside `#if 0 /* suppress this … */` (:249–262); extern decl global.h:314; 0 call refs (brief ref scan: decl only).
**JS:** - `dupstr_n`: no symbol (by-design) — C `#if 0`'d out; nothing compiled to port.
**Change:** dupstr_n resolved by-design (compiled out — no symbol, D-3314 precedent); fmt_ptr stale-complete booking (no `js/` change); ported dupstr's guard arm into js/dungeon.js in C order (len → guard → copy) with the C-identical panic message via throw (insert_branch idiom). Single `String(s)` coercion — behavior-identical on all reachable inputs (probe 5/5).
**Verify:** - `dupstr_n`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `dupstr_n`: whole body — compiled out (`#if 0`); no scored caller.
**Next:** refill yielded 0 eligible (rows --write 0; hidden-proxy queue 30 shown, 0 not open/parked/archived; no Parked line names a concrete writer+session — falsifiers are multi-candidate or measurement-first; no new absent arm in this iter's briefs) — queue sits at 0 until coverage regenerates or the next refill authorization.
## 2026-10-02 — D-3315 `invent.c` safeq quartet (safeq_xprname head + safeq_shortxprname + any_obj_ok split + worn_wield_only)

**C locus:** - `safeq_xprname`: nethack-c/upstream/src/invent.c:2179–2184 — staticfn xprname(obj, NULL, ctx.let, ctx.dot, 0L, 0L); ctx invent.c:2173–2176, written by askchain :2451–2452, passed as safe_qbuf func at :2463.
**JS:** js/pickup.js:3762 (safeq_xprn_ctx), :3770 (safeq_xprname), :3779 (safeq_shortxprname), :3837–3852 (askchain ctx writes + safe_qbuf call); js/invent.js:4394 (worn_wield_only), :4422–4423 (display_minventory filter + predicate), :4443 (shown groups).
**Change:** ported the safeq ctx + pair module-local in js/pickup.js (C staticfn idiom, D-3301 precedent) with the JS xprname arg-order map (obj, let, dot, quan, txt, cost) vs C (obj, txt, let, dot, cost, quan); rewired askchain's !allflag block to C order (ctx writes :2451–2452, qpfx/first, safe_qbuf :2462–2465 with the `ininv ?` callback ternaries). Ported worn_wield_only module-local in js/invent.js and wired the !do_all armament filter + predicate in display_minventory. any_obj_ok booked split (no third clone — sym guidance). No new imports (pickup.js already imports xprname/ansimpleoname/safe_qbuf/doname; worn filter is field-local).
**Verify:** `node scripts/verify.mjs --fn safeq_xprname,safeq_shortxprname,any_obj_ok,worn_wield_only` → VERIFY: PASS (syntax 2 files; rule2; 4× `no corpus session blocked` + smoke-spread REACH-OK 24/24 each; green 2/2; strict ×2; cohort 7/7). Full `sessions`: 44/44 PASS (Scr 11,405/11,405 equiv, RNG full match, `337+1.65/turn`).
**Named:** - `safeq_xprname`: none in-body — whole C body live (ctx + callback + caller wired).
**Next:** dupstr_n head (`alloc.c`); refill yielded 0 eligible (rows --write 0; hidden-proxy queue 30 shown, 0 not open/parked/archived; no Parked line names a concrete writer+session; no new absent arm verified) — queue sits at 1 until coverage regenerates or the next refill authorization.
## 2026-10-02 — D-3314 `cfgfiles.c` dead-handler sextet (GDBPATH head + 3 queued siblings + AUTOCOMPLETE stale + DUMPLOGFILE)

**C locus:** - `cnf_line_GDBPATH`: nethack-c/upstream/src/cfgfiles.c:1082–1094 — PANICTRACE-gated file_exists + config_error_add, sysopt.gdbpath free/dupstr; refs are fwd decl :82 + definition only (whole-file textual scan).
**JS:** - `cnf_line_GDBPATH`: no symbol (by-design) — dead in C; PANICTRACE file_exists is a filesystem probe (Rule #2) and sysopt.gdbpath is a debugger path with no JS counterpart (no gdbpath symbol).
**Change:** none in `js/` — five by-design resolutions + one stale-complete booking, documented here and booked via Ledger (D-3312/D-3302 precedent).
**Verify:** - `cnf_line_GDBPATH`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `cnf_line_GDBPATH`: whole body — dead in C; no scored caller.
**Next:** continue the missing-arm list (`invent.c` safeq pair + any_obj_ok/worn_wield_only, `alloc.c` dupstr_n).
## 2026-10-02 — D-3313 `cmd.c` rush octet (do_rush_northwest head + 6 siblings + rnd_extcmd_idx, whole remaining cmd.c Open set)

**C locus:** - `do_rush_northwest`: nethack-c/upstream/src/cmd.c:1468–1472 — `set_move_cmd(DIR_NW, 3)` + ECMD_TIME.
**JS:** - `do_rush_northwest`: js/cmd.js:618 — module-local one-liner; FUNCT_TXT row js/cmd.js:2070; family comment js/cmd.js:613–616.
**Change:** ported the seven rush leaves module-local in C order (do_move_*/do_run_*/do_rush_west idiom, D-3307 precedent) + seven FUNCT_TXT identity rows in C extcmdlist order + rnd_extcmd_idx as a live export (C extern) in C file order; new focused test scripts/rnd-extcmd-idx.test.mjs.
**Verify:** - `do_rush_northwest`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `do_rush_northwest`: none in-body — whole C body live (move_funcs function-pointer column is txt dispatch in JS, pre-existing architecture shared with do_run_*).
**Next:** continue the missing-arm list (`cfgfiles.c` cnf_line_GDBPATH head + GREPPATH sibling, `invent.c` safeq pair).
## 2026-10-02 — D-3312 `sfbase.c` save-proc sextet (sf_init head + sfvalue_any + 4 unqueued micro-gaps, all by-design)

**C locus:** - `sf_init`: nethack-c/upstream/src/sfbase.c:647–655 — sfoprocs/sfiprocs[invalid]=zero*, [historical]=historical_*; sfoflprocs/sfiflprocs[exportascii]=zero*; sole caller initoptions_init options.c:7129.
**JS:** - `sf_init`: no symbol (by-design) — the sfoprocs/sfiprocs/sfoflprocs/sfiflprocs tables have no JS container: JS dispatches on `fnidx === FNIDX_HISTORICAL` + structlevel/fieldlevel directly (e.g. js/files.js:1075–1085, docblock :1058–1064 citing sf_init :651/:653); materializing tables nothing reads would be dead scaffolding, and the historical_sfo_procs contents live outside sfbase.c (sfstruct.c:149).
**Change:** none in `js/` — six by-design resolutions, documented here and booked via Ledger (D-3302/D-3304 precedent).
**Verify:** `node scripts/verify.mjs --fn sf_init,sfvalue_any,sf_setprocs,sf_setflprocs,sfvalue_bitfield,bitfield_dump` → syntax PASS (0 changed js files) · Rule #2 PASS · hidden note ×6 (no corpus session blocked — normal for coverage) · REACH-OK ×6 (smoke spread 24/24 PASS each, no RNG-tagged reach) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file changed) → VERIFY: PASS.
**Named:** - `sf_init`: the tables themselves — sfoprocs/sfiprocs/sfoflprocs/sfiflprocs + zero/historical contents have no JS container (installed configuration compiled into the sfo_/sfi_ dispatch arms).
**Next:** continue the missing-arm list (`cmd.c` do_rush_northwest head + 6 siblings); `sfbase.c` norm_ptrs_* C-0 empty-hook family (73 ledger-absent) left for a family-batch decision.
## 2026-10-02 — D-3311 `monst.c` monst_globals_init missing erinys-reset effect (review 2266 Must-fix)

**C locus:** nethack-c/upstream/src/monst.c:71–76 — `memcpy(mons, mons_init, sizeof mons)`. Second live writer of C `mons[]`: mon.c:5918–5966 `adj_erinys` (mflags1, mattk[0..2], mlevel, difficulty of mons[PM_ERINYS]; callers attrib.c:1309 + restore.c:727). Review 2266 bounded the live-writer set at {role_init, adj_erinys} (zero `data->` permonst-field writes, zero direct `mons[i].field =` writes, role.c:2109 infravision fixup inside `#if 0`).
**JS:** js/monsters.js:220–223 (one added call + doc wording); scripts/monst-globals-init.test.mjs (new focused regression test: adj_erinys(60)→init→baseline + overlay-clear arms).
**Change:** call same-module `reset_erinys()` inside `monst_globals_init()` (restores the memcpy's erinys effect; no-op at both wired sites, which run with clean erinys) and corrected the doc comment to name both channels (pm_fixup overlay + adj_erinys baseline mutations).
**Verify:** `node scripts/verify.mjs --fn monst_globals_init --full` → VERIFY: PASS — syntax (1 changed: js/monsters.js) · rule2 · hidden note (no corpus session blocked) · REACH-OK (no RNG-tagged reach; smoke spread 24/24 PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44. Plus: /tmp/erinys-init-probe.mjs PASS (was FAIL pre-fix) · `node --test scripts/monst-globals-init.test.mjs` 2/2 PASS.
**Named:** none in-body — whole C body live (overlay clear + erinys reset ≡ memcpy). `game.mvitals` deliberately untouched (genocide state is NOT part of C `mons[]`, D-3308 analysis stands).
**Next:** queue head is now `sfbase.c` sf_init (first Open missing-arm row).
## 2026-10-02 — Audit 2262–2268: review D-3303–D-3310 (6 ACCEPT + 1 QUALITY-RISK) + full score

**Scope:** 7 js-touching SHAs since 2261 (D-3302/D-3305 docs-only, skipped): get_viz_clear, sp_lev septet, genl_player_selection+4, extcmd_initiator+run×8+freeall, monst_globals_init, wish_history_flush+add, handler_symset+arms+dispatch. Every verify re-measured per-function (incl. randrole real reach 69/69).
**Finding:** 2266 QUALITY-RISK — `monst_globals_init` overlay-clear omits the memcpy's erinys-reset effect (live 2nd mons[] writer `adj_erinys` mon.c:5918–5966; JS channel is baseline-array mutation + `reset_erinys`, never called here). Latent (both sites run clean; newgame/restore already reset) → 1 Must-fix row (same-module `reset_erinys()` call + comment fix, 44/44 + probe verify). Next cluster set to it.
**Score:** public 44/44 (Scr 11,405, RNG 792,838, `329+1.64/turn`); corpus 705/953, 0 losses/0 gains, `full: true`; held-out 15/44 (+0). Ledger: snapshot appended; seeded sample fixed 1 row (`mhitm_ad_dcay` ported→split, 3 arms verified live).
**Next:** Must-fix ships alone.
