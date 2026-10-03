# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
