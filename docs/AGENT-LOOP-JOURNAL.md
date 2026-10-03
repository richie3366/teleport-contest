# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-03 — D-3339 `monmove.c` monflee music.js clone removal (sole site → live js/monmove.js export)

**C locus:** - `monflee`: nethack-c/upstream/src/monmove.c:462–530 — DEADMONSTER exit + release_hero on ustuck + mfleetim accumulate (fleetime==1 bump, 127 cap) + new-flight fleemsg (immobile flinch / flees_light gremlin lsrc+verbalize / turns to flee) + Vrock mspec_used gas cloud + mflee=1 + always mon_track_clear; 30 C refs incl music.c:59.
**JS:** - `monflee`: js/monmove.js:1109 (live, unchanged body); import js/music.js:46; clone deleted; rewired site js/music.js:199.
**Change:** new static music→monmove edge (`import { monflee } from './monmove.js'`, js/music.js:46; `imports.mjs --can` SAFE — hoisted fn, verify judges TDZ); deleted the clone; rewired the sole site with `await` + one C-cite comment (:198-199). Behavior delta is C-faithful: scared monsters now release a stuck hero, immobile monsters flinch, gremlins react to artifact light, and Vrocks emit their gas cloud. Maintained test: new scripts/monflee-rewire.test.mjs (live Vrock mspec_used 75..99 + null guard + music import + definer census; the Vrock case fails against the deleted clone by construction).
**Verify:** - `monflee`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; smoke 24 run, 24 PASS, 0 regressed).
**Named:** - `monflee`: none in-body — whole C body live at js/monmove.js:1109.
**Next:** remaining missing-arm rows (Amonnam×3/ledger_no×4 — different C files, next iterations).
## 2026-10-03 — D-3338 `mthrowu.c` m_useup zap.js + muse.js clone removals (20 sites → live js/mthrowu.js export)

**C locus:** - `m_useup`: nethack-c/upstream/src/mthrowu.c:1162–1170 — quan>1 decrement + weight() else m_useupall; 32 C refs incl muse.c ×18, zap.c ×5 (1116/4327/4333/4335/4943/5933), uhitm.c ×2, worn.c ×3, mon.c:2863.
**JS:** - `m_useup`: js/mthrowu.js:184 (live, unchanged body); imports js/zap.js:280, js/muse.js:29; clones deleted; rewired sites js/zap.js:1754,3340 and js/muse.js:1083,1509,1731,1736,1768,2349,2377,2420,2653,2771,2782,2795,3101,3113,3121,3156,3237,3252.
**Change:** extended the ALREADY static mthrowu edges (js/zap.js:280, js/muse.js:29; `imports.mjs --can` ALREADY both — no new edge, no new test surface); deleted both clones; C-cite comments (zap per-site :1754/:3340; muse import-line :29 covering the 18 identical call lines, 6 of which already carry arm cites). Behavior delta is C-faithful: quan>1 now recomputes owt via weight(); the else arm now routes through m_useupall→extract_from_minvent instead of a bare nobj unlink. Maintained test: new scripts/museup-rewire.test.mjs (live weight-recompute + null guards + zap/muse import + definer census; the recompute case fails against either deleted clone by construction).
**Verify:** - `m_useup`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; smoke 24 run, 24 PASS, 0 regressed).
**Named:** - `m_useup`: none in-body — whole C body live at js/mthrowu.js:184.
**Next:** remaining missing-arm rows (monflee/Amonnam×3/ledger_no×2 — different C files, next iterations).
## 2026-10-03 — Audit 2285–2293: review D-3329–D-3337 (9 ACCEPT) + full score

**Reviews:** 2285 Is_branchlev/has_ceiling/on_level, 2286 m_at/on_level-dokick, 2287 on_level×6, 2288 money_cnt, 2289 Amonnam, 2290 t_at, 2291 somex (reach 705/705), 2292 ledger_no/dunlev, 2293 healup — all ACCEPT, 0 Must-fix. Strongest evidence: somex full-reach 705/705 PASS; t_at/healup/m_at/Amonnam rewires each fixed a genuine C-wrong (dead-list reads, bare Blinded/Sick writes, flags-0 saddle text).
**Score:** public 44/44 (RNG 792,838/792,838, Scr 11,405/11,405); corpus 706/953 (+1 scen-ride-Knight-94403, 0 losses), RNG 98.11 %, screens 93.4 %, full:true; held-out 15/44 (+0).
**Next:** Open missing-arm head (`m_useup` zap.js clone removal).
## 2026-10-03 — D-3337 `potion.c` healup zap.js clone removal (sole site → live js/potion.js export)

**C locus:** - `healup`: nethack-c/upstream/src/potion.c:1428–1458 — nhp HP add (polyd/nonpolyd arms) + cureblind (ucreamed=0, make_blinded(0,TRUE), make_deaf(0,TRUE)) + curesick (make_vomiting(0,TRUE), make_sick(0,NULL,TRUE,SICK_ALL)); 10 C refs incl zap.c:2911.
**JS:** - `healup`: js/potion.js:2231 (live, unchanged body); import js/zap.js:290; clone deleted; rewired site js/zap.js:4546.
**Change:** extended the ALREADY static potion edge (js/zap.js:290; `imports.mjs --can` ALREADY — no new edge, no new test surface); deleted the clone; rewired the sole site with `await` + one C-cite comment (:4545). Updated the stale "zap.js keeps a local copy" note on the live export (js/potion.js:2228). Behavior delta is C-faithful: blessed/extra now cures via make_blinded/make_deaf instead of a bare Blinded write.
**Verify:** - `healup`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; smoke 24 run, 24 PASS, 0 regressed).
**Named:** - `healup`: none in-body — whole C body live at js/potion.js:2231.
**Next:** remaining missing-arm rows (m_useup/monflee/Amonnam×3/ledger_no×2 — different C files, next iterations).
## 2026-10-03 — D-3336 `dungeon.c` ledger_no + dunlev clone removals (dig.js/dokick.js → live exports)

**C locus:** - `ledger_no`: nethack-c/upstream/src/dungeon.c:1376–1379 — `(xint16)(lev->dlevel + svd.dungeons[lev->dnum].ledger_start)`; 50 C refs incl dig.c:823.
**JS:** - `ledger_no`: js/dungeon.js:1097 (live, unchanged); import js/dig.js:73; clone deleted; rewired site js/dig.js:996.
**Change:** extended the ALREADY static dungeon edges (js/dig.js:73, js/dokick.js:36; `imports.mjs --can` ALREADY both — no new edge, no new test surface); deleted both clones; one C-cite comment per site (:995, :592). Site expressions unchanged; behavior-identical rewires.
**Verify:** - `ledger_no`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; smoke 24 run, 24 PASS, 0 regressed).
**Named:** - `ledger_no`: none in-body — whole C body live at js/dungeon.js:1097.
**Next:** remaining missing-arm rows (healup/m_useup/monflee/Amonnam×3 + further ledger_no/dunlev clone rows — different files, next iterations).
## 2026-10-03 — D-3335 `mkroom.c` somex teleport.js clone removal (2 sites → live js/mklev.js export)

**C locus:** - `somex`: nethack-c/upstream/src/mkroom.c:666–669 — `rn1(croom->hx - croom->lx + 1, croom->lx)`; 11 C refs incl mkroom.c:703/718/726 (somexy arms) and sp_lev.c:6150.
**JS:** - `somex`: js/mklev.js:32977 (live, unchanged); import js/teleport.js:95-96; clone deleted; rewired sites js/teleport.js:952,956.
**Change:** new static teleport→mklev edge (`import { somex } from './mklev.js'`, js/teleport.js:95-96; `imports.mjs --can` SAFE — same 101-module SCC, hoisted fn, verify judges TDZ); deleted the clone; one C-cite comment per site (:952/:956). Site expressions unchanged; behavior-identical rewire. Maintained test: new scripts/somex-teleport-rewire.test.mjs (live-export range/degenerate cases; teleport.js no-clone + live-import census; js/ somex definer census).
**Verify:** - `somex`: hidden note (0 blocked — normal for coverage) · REACH-OK (705 reach, 80 spread run, 80 PASS, 0 regressed) · `node --test scripts/somex-teleport-rewire.test.mjs` 4/4 pass.
**Named:** - `somex`: none in-body — whole C body live at js/mklev.js:32977.
**Next:** the remaining missing-arm rows (ledger_no dig head + dunlev/healup/m_useup/monflee/Amonnam×3 — different C files, next iterations).
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
