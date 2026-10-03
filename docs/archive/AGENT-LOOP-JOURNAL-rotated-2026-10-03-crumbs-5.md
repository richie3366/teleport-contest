# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-03 — D-3342 `rm.h` m_at teleport.js rewire + `dungeon.c` dunlev/dunlevs_in_dungeon clone census (last 7 clones → live exports)

**C locus:** - `m_at`: nethack-c/upstream/include/rm.h:510–511 — `(MON_AT(x, y) ? svl.level.monsters[x][y] : (struct monst *) 0)` (:516 alternate one-line form); 188 C refs incl teleport.c:118/:684/:1514/:1658/:1986 + the goodpos MON_AT arm :114.
**JS:** - `m_at`: js/mon.js:1745 (live, unchanged); js/teleport.js:92 alias reused, clone deleted; sites :478/:487/:588/:761/:1150/:1371/:2718 (:2894/:2898 pre-existing mon_m_at uses).
**Change:** m_at: rewired the 7 sites to the ALREADY-imported alias (js/teleport.js:92 `m_at as mon_m_at` — no import change, no new edge); deleted the clone; one C-cite comment per site (goodpos ×2 rm.h cites; :588 C :684; :761/:1150 keep their C :1658 cites; :1371 C :1986; :2718 C :1514); import-block comment rewritten (clone-keeping rationale retired); rloc_to zeroing comment reworded to the canonical reader. Behavior delta is the live steed-skip arm (C removes the mounted steed from the grid, so C m_at never returns it): MONPOS/collect_coords/rloc/teledest reads at the hero square no longer see the steed — C-true at all 7 sites, 44/44 unchanged. dunlev/dunlevs: extended the ALREADY static dungeon edges (trap :129, dokick :36, teleport :60-63) and added the new SAFE edge to fountain.js (:121, `imports.mjs --can` SAFE both names — hoisted fns, in-SCC shape, verify judges TDZ); deleted all 6 clones (one-line C-locus pointer left at each deletion site); one C-cite comment per site; dungeon.js:1085 canonical comment updated (census rewired). All dunlev/dunlevs site expressions unchanged (clone bodies identical to live).
**Verify:** - `m_at`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke 24/24 PASS, no RNG-tagged reach) · mat-rewire 9/9 pass.
**Named:** - `m_at`: none in-body — whole C body live at js/mon.js:1745.
**Next:** `mkroom.c` somex dog.js clone removal (last Open row; dog→mklev edge ABSENT with a documented cycle — needs imports.mjs TDZ analysis like D-3335).

## 2026-10-03 — D-3341 `dungeon.c` ledger_no do+mon+muse+potion+shknam+teleport.js clone removals (last 6 clones → live js/dungeon.js export)

**C locus:** - `ledger_no`: nethack-c/upstream/src/dungeon.c:1376–1379 — `(xint16)(lev->dlevel + svd.dungeons[lev->dnum].ledger_start)`; 50 C refs incl do.c:1330/1357/1388/1517/1570/1650, mon.c:3836/3945, muse.c:903/969/1062/1070/1083/1088/1099/1109/1119/1127/1137/2419, potion.c:1086, shknam.c:507, teleport.c:2094.
**JS:** - `ledger_no`: js/dungeon.js:1097 (live, unchanged); imports extended do :100, mon :71, muse :95, potion :201, shknam :44, teleport :62; clones deleted; call sites do :1608/:1682/:1722/:1834/:3564, mon :1953/:2031, muse :2538/:2606/:2670/:2678/:2690/:2697/:2709/:2720/:2731/:2739/:2747/:3110, potion :1774/:1800, shknam :517, teleport :3092.
**Change:** extended the six ALREADY static dungeon edges (js/do.js:100, js/mon.js:71, js/muse.js:95, js/potion.js:201, js/shknam.js:44, js/teleport.js:60-63 — `imports.mjs --can` ALREADY all six, no new edge, no new test surface) with `ledger_no`; deleted the 6 clones (a one-line C-locus pointer comment left at each deletion site); one C-cite comment per rewired site (22 above-line + 1 inline at the potion Can_rise_up-shape `&&` arm). Site expressions unchanged; behavior-identical rewires.
**Verify:** - `ledger_no`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; smoke spread 24 run, 24 PASS, 0 regressed).
**Named:** - `ledger_no`: none in-body — whole C body live at js/dungeon.js:1097.
**Next:** `rm.h` m_at teleport.js clone removal (next Open row; teleport→mon edge ALREADY :92, same-SCC hoisted-fn shape).

## 2026-10-03 — D-3340 `do_name.c` Amonnam fountain+mhitu+zap.js clone removals (last 3 clones → live js/do_name.js export)

**C locus:** - `Amonnam`: nethack-c/upstream/src/do_name.c:1159–1165 — highc(a_monnam()) (NONNULLARG1); 30 C call sites incl fountain.c:184/188 (watchman yells), mhitu.c:1176 (Amonbuf hidden-under), zap.c:1212 (suddenly appears).
**JS:** - `Amonnam`: js/do_name.js:1234 (live, unchanged); imports extended fountain :102-105, mhitu :38-41, zap :279; clones deleted; sites fountain :209/:214, mhitu :3298, zap :3409.
**Change:** extended the three ALREADY static do_name edges (js/fountain.js:102-105, js/mhitu.js:38-41, js/zap.js:279 — edges proven by the read import blocks, no new module edge) with `Amonnam`; deleted the 3 clones; removed the now-unused `x_monnam` (fountain :103, mhitu :39 — clone was sole user) and `ARTICLE_A` (fountain const :78, mhitu const :13 — clone was sole user) imports; zap `mon_nam` import kept (14 uses); one C-cite comment per site. Behavior deltas are the live arms: zap mon_nam(THE)→a_monnam(A) article fix + saddle suppression; mhitu 'It' empty arm identical to live `highc_name` (js/do_name.js:793) so the `=== 'It'` → Something check is preserved; fountain 'A monster'→'It' empty fallback unreachable for real monsters (x_monnam always names — same shape as D-3333 teleport). Maintained test: extended scripts/amonnam-rewire.test.mjs (no-clone + live-import checks for the 3 files; Amonnam census test — only the canonical export defines it).
**Verify:** - `Amonnam`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach) · `node --test scripts/amonnam-rewire.test.mjs` 10/10 pass.
**Named:** - `Amonnam`: none in-body — whole C body live at js/do_name.js:1234.
**Next:** the remaining missing-arm rows (ledger_no do/mon/muse/potion/shknam/teleport — dungeon.c, next iterations).

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
