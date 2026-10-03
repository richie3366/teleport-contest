# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-03 — D-3351 `priest.c` histemple_at canonical export + shk/teleport rewire

**C locus:** - `histemple_at`: nethack-c/upstream/src/priest.c:153–158 — `priest && ispriest && shroom == *in_rooms(x,y,TEMPLE) && on_level(shrlevel, u.uz)`. 3 C callers: :167 inhistemple, :186 pri_move, :400 findpriest.
**JS:** - `histemple_at`: js/priest.js:88 (live, canonical); import edges js/shk.js:55, js/teleport.js:98; rewired sites js/shk.js:4691, js/teleport.js:378; same-module sites js/priest.js:114/:295.
**Change:** exported the canonical body at C-home js/priest.js:88 (whole C body in C order, unchanged); extended the ALREADY static teleport→priest edge (`histemple_at` added to the js/teleport.js:98 import; `imports.mjs --can` ALREADY); new static shk→priest edge (js/shk.js:55; `imports.mjs --can` IN-SCC pre-export, ALREADY post-edit — hoisted fn, same 101-module SCC, call-time use only, verify judges TDZ); deleted both out-of-home clones (shk :4680–4690-then, teleport :359–371-then).
**Verify:** - `histemple_at`: `node scripts/verify.mjs --fn histemple_at` → VERIFY: PASS — syntax 3 files (priest/shk/teleport), rule2 PASS, hidden note (0 blocked at baseline), reach: no RNG-tagged reach; fixed smoke spread 24 run → 24 PASS, 0 regressed → REACH-OK; green 2/2, strict ×2, cohort 7/7.
**Named:** - `histemple_at`: none in-body — whole C body live at js/priest.js:88. Out of scope: teleport's has_shrine/inhistemple clones stay local (own future rows, if queued).
**Next:** next missing-arm row (`mondata.h` unique_corpstat rewire).
## 2026-10-03 — D-3350 `mondata.c` attacktype live-export port + 4-clone removal (artifact/dog/wizard/eat → live js/mondata.js export)

**C locus:** - `attacktype`: nethack-c/upstream/src/mondata.c:54–57 — `attacktype_fordmg(ptr, atyp, AD_ANY) ? TRUE : FALSE` (AD_ANY −1, monattk.h:41). 46 C refs incl artifact.c:1342, dog.c:210/:1277, wizard.c:650/:674, eat.c:1311.
**JS:** - `attacktype`: js/mondata.js:79 (live, new); import js/mondata.js:53; dependents artifact.js:147, dog.js:58, wizard.js:44, eat.js:75; clones deleted; rewired sites artifact.js:2920, dog.js:267/:702, wizard.js:110/:148, eat.js:2103.
**Change:** ported `export function attacktype` at C-home js/mondata.js:79 (whole 1-line C body in C order + file-local `AD_ANY = -1`, monattk.h:41 — no js/ exporter exists); new static mondata→uhitm edge (js/mondata.js:53; `imports.mjs --can` SAFE — hoisted fn, uhitm already imports mondata, runtime-only calls) and new static wizard→mondata edge (js/wizard.js:44; hoisted export, both sites read it only inside nasty() bodies, no top-level reads — verify judges TDZ); extended the 3 ALREADY static edges (artifact.js:147, dog.js:58, eat.js:75; `imports.mjs --can` ALREADY); deleted all 4 clones; 6 sites now resolve to the live export with one C-cite comment each (artifact.js:2920, dog.js:267/:702, wizard.js:110/:148, eat.js:2103). Behavior-identical rewire: the live path is the fordmg scan with the dtyp=-1 wildcard always true, i.e. `(aatyp|0)===(atyp|0)` over mattk — identical to the artifact clone and the eat wrapper; the dog/wizard raw-`===` clones differ only on non-int inputs, impossible at these sites (const AT_* args, int mattk).
**Verify:** - `attacktype`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed) · `node --test scripts/attacktype-rewire.test.mjs` 3/3 pass.
**Named:** - `attacktype`: none in-body — whole C body live at js/mondata.js:79.
**Next:** the 5 attacktype refill rows + histemple_at/unique_corpstat/invocation_pos/On_stairs (next iterations).
## 2026-10-03 — D-3349 `dungeon.c` Invocation_lev mklev.js + apply.js clone removal (3 sites → live js/dungeon.js export)

**C locus:** - `Invocation_lev`: nethack-c/upstream/src/dungeon.c:2017–2021 — In_hell && dlevel == num_dunlevs-1. 10 C refs: dungeon.c:1653/:2399/:3225, hack.c:984, mkmaze.c:1200/:1211, nhlua.c:2021, wizcmds.c:795, zap.c:3788.
**JS:** - `Invocation_lev`: js/dungeon.js:2392 (live, doc-only touch); imports mklev.js:150 (pre-existing), apply.js:133 (new); clones deleted; rewired sites mklev.js:20849/:27471, apply.js:4149.
**Change:** rewired the 2 mklev sites to the ALREADY-imported live export (no import change — :150; same-module live uses :3235/:3245); new static apply→dungeon edge (`import { Invocation_lev } from './dungeon.js'`, js/apply.js:133; `imports.mjs --can` SAFE — hoisted fn, same 101-module SCC, verify judges TDZ); site js/apply.js:4149 now calls `Invocation_lev(game.u?.uz)` (behavior-identical: the clone's no-arg default resolved the same value); deleted both clones; retired the stale clone notes (dungeon.js:2388 now names hack.js D-3344 + mklev/apply D-3349). Maintained test: new scripts/invocation-lev-rewire.test.mjs (no-clone + live-import + 3 site-calls + sole-definer census, 4/4 pass).
**Verify:** - `Invocation_lev`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed) · `node --test scripts/invocation-lev-rewire.test.mjs` 4/4 pass.
**Named:** - `Invocation_lev`: none in-body — whole C body live at js/dungeon.js:2392.
**Next:** the remaining missing-arm rows (attacktype×4 + histemple_at + unique_corpstat + invocation_pos + On_stairs — next iterations).
## 2026-10-03 — D-3348 `mon.c` m_in_air canonical export + do/teleport/trap.js rewire (12 sites → live js/mon.js export)

**C locus:** - `m_in_air`: nethack-c/upstream/src/mon.c:2130–2136 — is_flyer || is_floater || (is_clinger && has_ceiling && mundetected). 12 C call sites: do.c:89, mon.c:1053/:1099/:2166/:2168, teleport.c:147/:161, trap.c:1441/:1530/:2608/:2683/:2743.
**JS:** - `m_in_air`: js/mon.js:2300 (canonical export); imports do.js:106, teleport.js:92, trap.js:46; clones deleted; 12 sites resolve to the export (do.js:1005, mon.js:2898/:2937/:3076/:3078, teleport.js:485/:498, trap.js:2957/:3765/:4121/:5919/:5993).
**Change:** ported the FULL C body as `export function m_in_air` at C-home js/mon.js:2300 (C order incl `has_ceiling(game.u?.uz)` from the already-imported dungeon.js live export, :71); extended the three ALREADY static mon edges (do.js:106, teleport.js:92, trap.js:46; `imports.mjs --can` ALREADY all three — no new edge, no new test surface); deleted all 4 clones (incl the do.js mondata.h miscite and the teleport cycle-avoidance comment, disproven by the ALREADY edge); do.js site comment now cites the live export (:1006–1007). Behavior deltas are C-true: do/teleport/mon sites gain the clinger+ceiling+mundetected arm (previously flyer/floater-only or ceiling-gateless); trap sites are behavior-identical (clone was already full). Maintained test: new scripts/m-in-air-rewire.test.mjs (no-clone + live-import + full-body + site-count + sole-definer census, 4/4 pass).
**Verify:** - `m_in_air`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed) · `node --test scripts/m-in-air-rewire.test.mjs` 4/4 pass.
**Named:** - `m_in_air`: none in-body — whole C body live at js/mon.js:2300.
**Next:** the remaining missing-arm rows (Invocation_lev×2 + attacktype×4 + histemple_at — next iterations); refill authorization owed (queue at 7, coverage ungeneratable).
## 2026-10-03 — D-3347 `priest.c` mon_aligntyp teleport.js clone removal (sole site → live js/priest.js export)

**C locus:** - `mon_aligntyp`: nethack-c/upstream/src/priest.c:280–289 — ispriest ? EPRI shralign : isminion ? EMIN min_align : data.maligntyp; A_NONE passthrough, else sign → LAWFUL/CHAOTIC/NEUTRAL. 6 C refs incl artifact.c:933, insight.c:3277, priest.c:364/:372, monst.h:282.
**JS:** - `mon_aligntyp`: js/priest.js:150 (live, doc-only touch); import js/teleport.js:98; clone deleted; rewired site js/teleport.js:343.
**Change:** new static teleport→priest edge (`import { mon_aligntyp } from './priest.js'`, js/teleport.js:98; `imports.mjs --can` SAFE — hoisted fn, same 101-module SCC, verify judges TDZ); deleted the clone; site js/teleport.js:343 now resolves to the live export with a C-cite comment (:340–341 monst.h:282 + priest.c:280–289). Removed the now-unused EMIN from the const.js import (:19; EPRI stays — :387/:397/:1039). Retired the stale clone notes (priest.js:142–143 now names teleport.js among the replaced clones).
**Verify:** - `mon_aligntyp`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed) · `node --test scripts/mon-aligntyp-rewire.test.mjs` 3/3 pass.
**Named:** - `mon_aligntyp`: none in-body — whole C body live at js/priest.js:150.
**Next:** the remaining missing-arm rows (m_in_air/Invocation_lev×2 + attacktype refill×4 — next iterations).
## 2026-10-03 — Audit 2294–2302: review D-3338–D-3346 (9 ACCEPT) + full score

9 clone-removal SHAs (m_useup, monflee, Amonnam, ledger_no, m_at+dunlevs, somex, Invocation_lev, useupf, attacktype_fordmg): every C body re-read, every `--can` re-checked, every verify re-run (somex full reach 706/706). Message nits only ("8 sites" actually 6 in D-3346, pre-existing `await` in D-3339). No Must-fix. Public 44/44 (`350+1.70/turn`); corpus 706/953, 0 lost/0 gained, `full: true`; held-out 15/44, +0. Ledger snapshot appended; 5 ported rows sampled OK (find_friends local is correct — C staticfn). Audit debt: `ledger.mjs sql` unrunnable here (Node v20 lacks `node:sqlite`) — sampled via jsonl+shuf instead.
## 2026-10-03 — D-3346 `mondata.c` attacktype_fordmg 4-clone removal (apply/eat/mon/region → live js/uhitm.js export)

**C locus:** - `attacktype_fordmg`: nethack-c/upstream/src/mondata.c:42–50 — mattk[0..NATTK) scan, first slot with aatyp==atyp && (dtyp==AD_ANY || adtyp==dtyp), else NULL. 14 C refs incl apply.c:2316, eat.c:2519/:3767, mon.c:350–351, mhitu.c:277/:1278.
**JS:** - `attacktype_fordmg`: js/uhitm.js:609 (live, unchanged); imports apply.js:110, eat.js:155, mon.js:108, region.js:61; clones deleted; rewired sites apply.js:4670, eat.js:389/:858/:2157, mon.js:337–338, region.js:344–345.
**Change:** extended the ALREADY static edge (apply.js:110; `imports.mjs --can` ALREADY) and added 3 new static edges (eat.js:155, mon.js:108, region.js:61; `imports.mjs --can` SAFE all three — hoisted fn, same SCC, verify judges TDZ); deleted all 4 clones; 8 sites now resolve to the live export with one C-cite comment each (apply :4669, eat :857/:2156 + wrapper doc :384, mon :336, region :342). Behavior-identical rewire: all sites pass int params so the live `|0` folding is a no-op. Maintained test: new scripts/attacktype-fordmg-rewire.test.mjs (no-clone + live-import + site-call + sole-definer census, 3/3 pass).
**Verify:** - `attacktype_fordmg`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed) · `node --test scripts/attacktype-fordmg-rewire.test.mjs` 3/3 pass.
**Named:** - `attacktype_fordmg`: none in-body — whole C body live at js/uhitm.js:609.
**Next:** the remaining missing-arm rows (mon_aligntyp/m_in_air/Invocation_lev×2 + attacktype refill×4 — next iterations).
## 2026-10-03 — D-3345 `invent.c` useupf zap.js clone removal (sole site → live js/invent.js export)

**C locus:** - `useupf`: nethack-c/upstream/src/invent.c:4763–4783 — snapshot at_u; splitobj when quan > numused (burn_floor_objects re-calls on the remainder); !mon_moving && costly_spot shop addtobill vs stolen_value; delobj; at_u && uundetected && hides_under → hideunder. 24 C refs incl zap.c:4636 (burn_floor_objects).
**JS:** - `useupf`: js/invent.js:4869 (live, doc-only touch); import js/zap.js:238; clone deleted; rewired site js/zap.js:931.
**Change:** extended the ALREADY static edge (`useupf` added to the invent.js import, js/zap.js:238; `imports.mjs --can` ALREADY — no new edge, no new test surface); deleted the clone (one-line pointer at :876); site js/zap.js:931 now resolves to the live export with C-cite comment (:930 zap.c:4636). Refreshed the live doc comment (js/invent.js:4861 — zap-clone mention retired; shop-bill named omit kept). Behavior delta is C-true: the hideunder arm (C :4781–4783) now runs when fire burns the pile under a hiding hero; `(quan||1)`→`(quan|0)` and the dropped `||obj` fallback match C exactly.
**Verify:** - `useupf`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed) · `node --test scripts/useupf-rewire.test.mjs` 3/3 pass.
**Named:** - `useupf`: shop-bill arms (C :4774–4779 `!mon_moving && costly_spot` addtobill vs stolen_value, both async) — pre-existing live omit, kept.
**Next:** the remaining missing-arm rows (attacktype_fordmg×4/mon_aligntyp/m_in_air/Invocation_lev×2 — next iterations).
## 2026-10-03 — D-3344 `dungeon.c` Invocation_lev hack.js clone removal (sole site → live js/dungeon.js export)

**C locus:** - `Invocation_lev`: nethack-c/upstream/src/dungeon.c:2017–2021 — `In_hell(lev) && lev->dlevel == num_dunlevs - 1`; 10 C refs incl hack.c:984 (the invocation_pos guard).
**JS:** - `Invocation_lev`: js/dungeon.js:2392 (live, unchanged); import js/hack.js:77; clone deleted; rewired site js/hack.js:3436.
**Change:** extended the ALREADY static edge (`import { get_level, Invocation_lev } from './dungeon.js'`, js/hack.js:77; `imports.mjs --can` ALREADY — no new edge, no new test surface); deleted the clone; site js/hack.js:3436 now resolves to the live export (expression unchanged; behavior-identical rewire). Refreshed the live doc comment (js/dungeon.js:2388 — hack.js gone; apply.js `Invocation_lev_apply` + mklev.js `Invocation_lev_mk` renamed clones remain, out of cluster).
**Verify:** - `Invocation_lev`: hidden note (0 blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed).
**Named:** - `Invocation_lev`: none in-body — whole C body live at js/dungeon.js:2392.
**Next:** the remaining missing-arm rows (useupf zap head + attacktype_fordmg×4/mon_aligntyp/m_in_air — different C files, next iterations).
## 2026-10-03 — D-3343 `mkroom.c` somex dog.js clone removal (3 sites → live js/mklev.js export)

**C locus:** - `somex`: nethack-c/upstream/src/mkroom.c:666–669 — `rn1(croom->hx - croom->lx + 1, croom->lx)`; 11 C refs incl mkroom.c:703/718/726 (somexy arms) and sp_lev.c:6150.
**JS:** - `somex`: js/mklev.js:32977 (live, unchanged); import js/dog.js:72; clone deleted; rewired sites js/dog.js:905,920,926.
**Change:** new static dog→mklev edge (`import { somex } from './mklev.js'`, js/dog.js:72; `imports.mjs --can` SAFE — same 101-module SCC, hoisted fn, verify judges TDZ — the feared cycle is the ambient SCC, not a blocker); deleted the clone (doc comment now covers the kept somey clone only); one C-cite comment per site (:905/:920/:926). Site expressions unchanged; behavior-identical rewire. Maintained test: extended scripts/somex-teleport-rewire.test.mjs (dog.js no-clone + live-import check; census now `['js/mklev.js']` — expectation change explained: the pinned dog.js clone is deliberately gone, no clones remain anywhere).
**Verify:** - `somex`: hidden note (0 blocked — normal for coverage) · REACH-OK (706 reach, 80 spread run, 80 PASS, 0 regressed) · `node --test scripts/somex-teleport-rewire.test.mjs` 5/5 pass.
**Named:** - `somex`: none in-body — whole C body live at js/mklev.js:32977.
**Next:** the remaining missing-arm rows (Invocation_lev hack head + useupf/attacktype_fordmg×4/mon_aligntyp/m_in_air — different C files, next iterations).
