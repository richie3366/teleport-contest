# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
