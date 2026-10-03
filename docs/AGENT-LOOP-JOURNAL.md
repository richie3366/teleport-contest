# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-03 — D-3334 `trap.c` t_at steed.js clone removal (sole site → live js/trap.js export)

**C locus:** - `t_at`: nethack-c/upstream/src/trap.c:6502–6512 — gf.ftrap ntrap-chain scan, tx/ty match, null on miss; 175 C refs incl steed.c:301 (mount_steed trapped gate) and steed.c:545 (dismount_steed kn_trap gate).
**JS:** - `t_at`: js/trap.js:1119 (live, unchanged); import pre-existed js/steed.js:60; clone deleted; rewired site js/steed.js:569; mount_steed site js/steed.js:718 (already live).
**Change:** rewired the sole clone site to the ALREADY-imported live export (`t_at as trap_t_at`, js/steed.js:60 — no new edge, no `imports.mjs` change needed); deleted the clone; one C-cite comment at the site (:566-568). Site expression unchanged; behavior delta is the live game.level.traps scan (kn_trap now fires on real known traps instead of never). Maintained test: new scripts/tat-steed-rewire.test.mjs (live-export hit/miss/null-level behavior cases pinning the delta; steed.js no-clone + live-import census; js/ t_at sole-definer census).
**Verify:** - `t_at`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach) · `node --test scripts/tat-steed-rewire.test.mjs` 5/5 pass.
**Named:** - `t_at`: none in-body — whole C body live at js/trap.js:1119.
**Next:** the remaining missing-arm rows (somex teleport head + ledger_no/dunlev/healup/m_useup/monflee/Amonnam×3 — different C files, next iterations).
## 2026-10-03 — D-3333 `do_name.c` Amonnam teleport.js clone removal (sole site → live js/do_name.js export)

**C locus:** - `Amonnam`: nethack-c/upstream/src/do_name.c:1159–1165 — highc(a_monnam()) (NONNULLARG1); 30 C call sites incl teleport.c:1722 (appearmsg ? Amonnam : Monnam).
**JS:** - `Amonnam`: js/do_name.js:1234 (live, unchanged); import extended js/teleport.js:66; clone deleted; sole site js/teleport.js:1135.
**Change:** extended the ALREADY static do_name edge (js/teleport.js:66; `imports.mjs --can` ALREADY) with `Amonnam`; deleted the clone; removed the now-unused `x_monnam` (do_name edge) and `ARTICLE_A` (const edge :31) imports (clone was their sole user); one C-cite comment at the site (:1134). Site expression unchanged; behavior delta is the live SUPPRESS_SADDLE-when-named arm (named+saddled mon now names without saddle text). Maintained test: extended scripts/amonnam-rewire.test.mjs (teleport.js no-clone + live-import census; live-Amonnam 'An eel'/'Silver' behavior case pinning the delta).
**Verify:** - `Amonnam`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach) · `node --test scripts/amonnam-rewire.test.mjs` 8/8 pass.
**Named:** - `Amonnam`: none in-body — whole C body live at js/do_name.js:1234.
**Next:** the remaining missing-arm rows (t_at steed head + somex/ledger_no/dunlev/healup/m_useup/monflee — different C files, next iterations).
## 2026-10-03 — D-3332 `hack.c` money_cnt sit.js clone removal (sole site → live js/shk.js export)

**C locus:** - `money_cnt`: nethack-c/upstream/src/hack.c:4514–4522 — first-COIN_CLASS-quan walk down the nobj chain, 0L on miss; 43 C refs incl sit.c:445 (dosit dragon meager-hoard gate).
**JS:** - `money_cnt`: js/shk.js:4762 (live, unchanged); import added js/sit.js:137; clone deleted; sole site js/sit.js:1216.
**Change:** new static sit→shk edge (`import { money_cnt } from './shk.js'`, js/sit.js:137; `imports.mjs --can` SAFE — hoisted fn, in-SCC shape, verify judges TDZ); deleted the clone + its stale comment; one C-cite comment per site (import :135-136 + site :1211-1214). Site expression unchanged; behavior delta is the live null-elem guard + |0 folding (clone threw on null elems, missed non-number oclass). Maintained test: extended scripts/moneycnt-trio-rewire.test.mjs (null-elem/string-oclass unit case pinning the delta; sit.js import smoke for the new edge).
**Verify:** - `money_cnt`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach) · `node --test scripts/moneycnt-trio-rewire.test.mjs` 8/8 pass.
**Named:** - `money_cnt`: none in-body — whole C body live at js/shk.js:4762.
**Next:** the remaining missing-arm rows (Amonnam teleport.js head + t_at/somex/ledger_no/dunlev/healup/m_useup/monflee — different C files, next iterations).
## 2026-10-03 — D-3331 `dungeon.c` on_level ×6 clone removals (teleport/shk/priest/getpos/vault/muse → live export)

**C locus:** - `on_level`: nethack-c/upstream/src/dungeon.c:1439–1443 — dnum+dlevel equality (NONNULLARG12); 79 C refs incl shk.c:274/:1044/:1410/:2523/:2560, teleport.c:1419/:1460, priest.c:157/:926, pager.c:1605, vault.c:58/:901, muse.c:2410.
**JS:** - `on_level`: js/dungeon.js:1810 (live, unchanged); imports extended js/teleport.js:62, js/shk.js:128, js/muse.js:95; imports added js/priest.js:39, js/getpos.js:64, js/vault.js:41; clones deleted; sites js/teleport.js:395/:412/:2602/:2648, js/shk.js:343/:2051/:4689/:5199/:5233, js/priest.js:93/:769, js/getpos.js:564, js/vault.js:173/:1088, js/muse.js:3112.
**Change:** extended the ALREADY static dungeon edges (js/teleport.js:62, js/shk.js:128, js/muse.js:95) with `on_level`; added new static edges (js/priest.js:39, js/getpos.js:64, js/vault.js:41 — `imports.mjs --can` SAFE all three, in-SCC hoisted-name shape, verify judges TDZ); deleted all 6 clones; one C-cite comment per site (15). Nullish audit for the 4 `!!`-guarded clones: live folds a missing arg like a zeroed d_level, so results differ from the clone only on a nullish arg — unreachable-at-difference here (shoplevel/shrlevel/gdlevel guarded or mon-typed; u.uz mid-game-set; a nullish side folds to {0,0} which no real level equals since dlevel ≥ 1; D-3329 same-shape audit precedent). getpos/muse clones were already the identical unguarded shape (zero behavior change). All call-site expressions unchanged.
**Verify:** - `on_level`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach) · `node --test scripts/isbranchlev-rewire.test.mjs` 6/6 pass.
**Named:** - `on_level`: none in-body — whole C body live at js/dungeon.js:1810.
**Next:** the 2 remaining missing-arm rows (money_cnt sit.js + Amonnam teleport.js — different C files, next iteration).
## 2026-10-03 — D-3330 `rm.h` m_at uhitm+dig rewires + `dungeon.c` on_level dokick rewire (live-export clone removals)

**C locus:** - `m_at`: nethack-c/upstream/include/rm.h:510–511 — `(MON_AT(x, y) ? svl.level.monsters[x][y] : (struct monst *) 0)` (:516 alternate one-line form); 188 C refs incl uhitm.c:699/:799/:5459/:5539 and dig.c:63/:647/:876/:1202.
**JS:** - `m_at`: js/mon.js:1745 (live, unchanged); js/uhitm.js:92 import extended + clone deleted; js/dig.js:100 import added + clone deleted; sites js/uhitm.js:3612/:3692/:4213/:4260/:5099, js/dig.js:748/:787/:1723/:2686.
**Change:** m_at uhitm: extended the ALREADY static mon.js edge (js/uhitm.js:93) with `m_at`; deleted the clone; one C-cite comment per site (:3611 C :699 cleave sweep; :3687 C :799 second swing; :4212 C :5459 bhitpos range; :4259 C :5539 worm-cut; mon_at wrapper delegates with an rm.h cite). m_at dig: added a new static mon.js edge (js/dig.js:100, `imports.mjs --can` SAFE — hoisted fn, voiding the stale cycle comment); deleted the clone; one C-cite comment per site (:747 C :876 minliquid; :786 C :647 madeby entry; :1722 C :63 rockit; :2685 C :1202 do_attack). on_level dokick: added a new static dungeon.js edge (js/dokick.js:36, `imports.mjs --can` SAFE — in-SCC hoisted-name shape, verify judges TDZ); deleted the clone; site cite :1793 (C dokick.c:1950 down_gate quest gate). All call-site expressions unchanged. js/dungeon.js:1807 comment updated (6 clones remain). Maintained tests: extended scripts/mat-rewire.test.mjs (uhitm/dig census, teleport-only remainder) and scripts/isbranchlev-rewire.test.mjs (dokick added to the on_level rewired list).
**Verify:** - `m_at`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach) · `node --test scripts/mat-rewire.test.mjs` 8/8 pass.
**Named:** - `m_at`: none in-body — whole C body live at js/mon.js:1745.
**Next:** the 6 remaining on_level rows (teleport/shk/priest/getpos/vault/muse clones).
## 2026-10-03 — D-3329 `dungeon.c` Is_branchlev C-locus port + has_ceiling/on_level clone rewires

**C locus:** - `Is_branchlev`: nethack-c/upstream/src/dungeon.c:1464–1473 — first branch with on_level(lev, end1/end2), else 0; 11 C call sites (bones ×2, mklev ×3, mkmaze ×4, restore ×1) + extern.h:873 decl (NONNULLARG1).
**JS:** - `Is_branchlev`: js/dungeon.js:2884 (new live export); js/end.js:83 import extended, sites :622/:658; js/mklev.js:149 import extended, sites :717/:782/:2766/:3258/:28288/:29227/:33896.
**Change:** ported `Is_branchlev` to js/dungeon.js:2884 (C-order slot after Is_special; C `:1469` end1-before-end2 short-circuit; svb.branches = game.branches; null for C 0). Rewired end.js (ALREADY edge :83 extended; sites unchanged, clones deleted) and mklev.js (ALREADY edge extended; 7 sites now `Is_branchlev(game.u?.uz)` per C `&u.uz`, lowercase clone deleted). Extended the ALREADY static dungeon edges with `has_ceiling` (mon.js:71, potion.js:201, trap.js:129) and added the new SAFE edge to dothrow.js (`imports.mjs --can` SAFE); deleted all 4 clones; trap m_in_air + pit-immunity sites now call live.
**Verify:** - `Is_branchlev`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach) · `node --test scripts/isbranchlev-rewire.test.mjs` 6/6 pass.
**Named:** - `Is_branchlev`: none in-body — whole C body live at js/dungeon.js:2884. Unwired caller: restore.c:1256 getlev-ghostly arm (no getlev in js/restore.js).
**Next:** the 2 remaining rm.h m_at rows (uhitm.js, dig.js clones) — different C file, next iteration.
## 2026-10-03 — Audit 2276-2284: review D-3320-D-3328 (9 ACCEPT) + full score

**Scope:** 9 JS-touching SHAs since audit 2269–2275 (money_cnt trio, fingers_or_gloves, a_monnam ×2, distmin, early_init, nhcolor, by-design trio + dist2, m_at + Is_special) — each re-measured per-function vs pinned C with hidden-proxy verify --reach-all.
**Verify:** all D-log tails reproduced verbatim (vacuous 0-block + REACH-OK, 0 regressed); Rule #2 clean; no Must-fix, no queue change.
**Fortress:** public 44/44 (Scr 11,405, RNG 792,838); corpus 705/953 (0 losses/0 gains, full:true); held-out 15/44 (+0).
**Ledger:** snapshot + early_init stale-note refresh; 5/5 sampled seeded-ported rows correct (ceiling PARTIAL is density, 10/10 arms live).
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
