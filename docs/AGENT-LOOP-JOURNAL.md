# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-03 — D-3328 `rm.h` m_at shknam rewire + `dungeon.c` Is_special end/quest rewire (live-export clone removals)

**C locus:** - `m_at`: nethack-c/upstream/include/rm.h:510–511 — `(MON_AT(x, y) ? svl.level.monsters[x][y] : (struct monst *) 0)` (:516 carries the alternate one-line form); 188 C refs incl shknam.c:660; the mkshobj_at gate shknam.c:470 reads `!MON_AT(sx, sy)` (csym.mjs this session — JS has no MON_AT export).
**JS:** - `m_at`: js/mon.js:1745 (live, unchanged); js/shknam.js:50 import extended; sites js/shknam.js:618/:671.
**Change:** m_at: extended the ALREADY static mon.js edge (js/shknam.js:50, `imports.mjs --can` ALREADY) with `m_at`; deleted the clone; one C-cite comment per site (:618 notes C shknam.c:470 `!MON_AT` + no-JS-MON_AT + null-iff-unoccupied-at-stock-time; :671 keeps its C `:658–660` cite, now resolving to live). Is_special: extended the ALREADY static dungeon.js edges (js/end.js:83, js/quest.js:34) with `Is_special`; deleted both clones; one C-cite comment per site (end.js:629 C bones.c:25; quest.js:210 C quest.c:94). All call-site expressions unchanged.
**Verify:** - `m_at`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach) · `node --test scripts/mat-rewire.test.mjs` 6/6 pass.
**Named:** - `m_at`: none in-body — whole C body live at js/mon.js:1745.
**Next:** the 2 remaining dungeon.c missing-arm rows (Is_branchlev port + end rewire, has_ceiling 3-file rewire) + the 2 refill m_at rows (dig, uhitm).
## 2026-10-03 — D-3327 `do.c` badspot + `shknam.c`/`vault.c` free twins (by-design) + `hacklib.c` dist2 mon.js-duplicate removal

**C locus:** - `badspot`: nethack-c/upstream/src/do.c:1399–1406 — `static boolean`, `(typ!=ROOM && typ!=AIR && typ!=CORR) || MON_AT`; the sole repo ref is the commented-out fwd decl do.c:25 (dead in C).
**JS:** - `badspot`: no symbol (by-design) — C static with no live caller; nothing to port.
**Change:** three by-design resolutions (no `js/`, D-3312/D-3314 precedent) + dist2 rewire: all 12 mon.js-edge importers moved to their existing hacklib.js edge, mon.js imports `dist2` from hacklib.js (:69), the duplicate export deleted (tombstone comment :1124). Bodies behavior-identical (`(x1-x2)²+(y1-y2)²`, symmetric args).
**Verify:** - `badspot`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `badspot`: whole body — dead in C; no scored caller.
**Next:** the 4 split-out missing-arm rows (`rm.h` m_at shknam rewire, `dungeon.c` Is_special end/quest rewire, `dungeon.c` Is_branchlev port + end rewire, `dungeon.c` has_ceiling 3-file rewire) — briefed + edge-checked this session (dothrow→dungeon SAFE), 7 files.
## 2026-10-02 — D-3326 `coloratt.c` get_nhcolor_from_256_index live-export port + 3 same-file stale-complete bookings

**C locus:** - `get_nhcolor_from_256_index`: nethack-c/upstream/src/coloratt.c:1024–1031 whole body: NO_COLOR|NH_BASIC_COLOR default `:1026`, IndexOk gate `:1028` (hack.h:1498, SIZE=240), table .value `:1029`; 0 C refs (brief this session — dead in C, compiles in contest C).
**JS:** - `get_nhcolor_from_256_index`: js/options.js:6152 (export; +18/−0 with doc).
**Change:** `export function get_nhcolor_from_256_index(idx)` in js/options.js (:6152, C-order slot between closest_color and colortable_to_int32) with C-line cites; IndexOk as `0 <= i < color_256_definitions.length` (closest_color :6122 SIZE idiom), `idx | 0` (C int), table `.value`, NO_COLOR|NH_BASIC_COLOR default — all values non-negative int32, no uint32 coercion needed. Live export with no JS caller on the D-2776 base_soundname_to_filename precedent (compiles in contest C; wiring from a site C never calls from is a C-wrong, D-2393); retires the D-2777 "table's other C reader" omit leg. Zero new imports/edges (both consts already imported :147/:197; table module-local).
**Verify:** `node scripts/verify.mjs --fn get_nhcolor_from_256_index,attr2attrname,free_one_menu_coloring,color_distance` → VERIFY: PASS. Tail verbatim:
**Named:** - `get_nhcolor_from_256_index`: none in-body — whole C body live.
**Next:** queue head `do.c` badspot.
## 2026-10-02 — D-3325 allmain.c early_init whole-body port + jsmain entry wiring (domenucontrols stale-split)

**C locus:** - `early_init`: nethack-c/upstream/src/allmain.c:32–45 whole body: program_state `:35`, crashreport `:38` (#ifdef CRASHREPORT), decl `:40`, objects `:41`, monst `:42`, sys `:43`, runtime `:44` — read in the brief this session.
**JS:** js/allmain.js (imports :32–37; early_init :776); js/jsmain.js (import :18; call :132). Scripts: scripts/early-init.test.mjs (new, 6 cases: 3 behavioral + order census + 2 wiring).
**Change:** `export function early_init(argc, argv)` in js/allmain.js (C locus, :776, immediately before newgame) with the 7 calls in C order and C-line cites; jsmain start() now calls `early_init(0, [])` (:132) and drops the 3 direct-init imports; the jsmain→allmain edge is ALREADY (extended :18); 5 new allmain edges `imports.mjs --can` SAFE (decl/report/objects/sys/version — 4 no-cycle, report hoisted). CRASHREPORT verified active (config.h:249 Linux default, no NOCRASHREPORT in unixconf.h — measured), so `:38` is live; (0, []) with comment (no argv in ESM, Rule #2; crashreport voids). Entry objects install is safe: newgame init_objects and restore both reinstall fresh downstream (measured o_init.js:266/save.js:796), and the install draws no RNG.
**Verify:** `node scripts/verify.mjs --fn early_init` tail pasted verbatim:
**Named:** - `early_init`: none in-body — whole C body live (7/7 calls; argv (0, []) documented Rule-#2 analogue, params C-voided).
**Next:** continue the missing-arm list (`coloratt.c` get_nhcolor_from_256_index head).
## 2026-10-02 — D-3324 hacklib.c distmin clone removals (shknam local + mon.js duplicate) + nh_snprintf by-design

**C locus:** - `distmin`: nethack-c/upstream/src/hacklib.c:657–669 whole body: abs both deltas, return the larger — read in the brief this session.
**JS:** js/shknam.js (import :9; site :646); js/mon.js (export deleted); js/mhitm.js (:7/:14); js/dothrow.js (:89/:90); js/dogmove.js (:7/:11); js/monmove.js (:101/:120); js/trap.js (:46/:146); js/mthrowu.js (:9/:11); js/track.js (:17); js/muse.js (:26/:94).
**Change:** extended the ALREADY static hacklib edges (js/shknam.js:9, js/mhitm.js:14, js/trap.js:146, js/muse.js:94) with `distmin`; added 5 new static edges (`imports.mjs --can` SAFE, no cycle: js/dothrow.js:90, js/dogmove.js:11, js/monmove.js:120, js/mthrowu.js:11, js/track.js:17); removed `distmin` from all 8 mon.js import lists; deleted the shknam clone and the mon.js export; one C-cite comment at the shknam site (js/shknam.js:644). All call-site expressions unchanged — already C-shaped. `nh_snprintf`: no `js/` — by-design (see Named omissions).
**Verify:** `node scripts/verify.mjs --fn distmin,nh_snprintf` tail pasted verbatim:
**Named:** - `distmin`: none in-body — whole C body live at js/hacklib.js:19.
**Next:** continue the missing-arm list (`pager.c` domenucontrols head).
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
