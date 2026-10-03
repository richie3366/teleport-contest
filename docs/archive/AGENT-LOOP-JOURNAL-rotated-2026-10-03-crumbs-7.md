# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-03 — D-3353 `hack.c` invocation_pos mklev.js + apply.js clone removal (3 sites → live js/hack.js export)

**C locus:** - `invocation_pos`: nethack-c/upstream/src/hack.c:982–986 — `Invocation_lev(&u.uz) && x == svi.inv_pos.x && y == svi.inv_pos.y`. 8 C refs, 7 call sites: apply.c:1209 (use_bell invoking), apply.c:1361 (candelabrum burn gate), artifact.c:2516 (retouch_object), getpos.c:427, hack.c:3067 (invocation_message), mklev.c:1810 (occupied) + mkmaze.c:1073 comment-only inv_pos init.
**JS:** - `invocation_pos`: js/hack.js:3434 (live, canonical, untouched); rewired sites js/mklev.js:33025 (occupied), js/apply.js:4195 (use_bell), js/apply.js:4774 (use_candelabrum); pre-existing live sites js/spell.js:791, js/getpos.js:748, js/hack.js:3580, js/artifact.js:1666.
**Change:** extended the two ALREADY static →hack edges (`invocation_pos` added to the hack.js imports js/mklev.js:166, js/apply.js:83; `imports.mjs --can` ALREADY both — no new edge, no new test surface); deleted both clones; dropped the now-unused apply→dungeon edge (js/apply.js:133-then — served only the deleted clone body per D-3349; mklev keeps :150 for makemaz/hellfill). Maintained test: evolved scripts/invocation-lev-rewire.test.mjs → scripts/invocation-pos-rewire.test.mjs (no-clone + live-import + 3 site-calls + dropped-edge + sole-definer census, 5/5 pass).
**Verify:** - `invocation_pos`: hidden note (0 blocked at baseline — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed) · `node --test scripts/invocation-pos-rewire.test.mjs` 5/5 pass.
**Named:** - `invocation_pos`: none in-body — whole C body live at js/hack.js:3434. Out of scope: the adjacent On_stairs_apply clone (js/apply.js:4147) stays queued as its own row (`stairs.c` On_stairs dogmove+apply).
**Next:** next missing-arm row (`stairs.c` On_stairs dogmove/apply clone removal).

## 2026-10-03 — D-3352 `mondata.h` unique_corpstat 4-clone removal + `mondata.c` attacktype engrave.js clone removal

**C locus:** - `unique_corpstat`: nethack-c/upstream/include/mondata.h:174 — `#define unique_corpstat(ptr) (((ptr)->geno & G_UNIQ) != 0)`. 17 C references; 7 rewired here: trap.c:795/:802 (animate_statue), teleport.c:59 (goodpos_onscary), monmove.c:260 (onscary), read.c:3126 (cant_revive), zap.c:1097 (revive), music.c:51 (awaken_scare).
**JS:** - `unique_corpstat`: js/mon.js:2961 (live, canonical); rewired sites js/trap.js:385/:392, js/teleport.js:189/:394, js/zap.js:3029/:3304, js/music.js:187; pre-existing same-module sites js/mon.js:374/:3011×2.
**Change:** - `unique_corpstat`: extended the four ALREADY static →mon edges (`unique_corpstat` added to the mon.js imports js/trap.js:46, js/teleport.js:92, js/zap.js:264, js/music.js:45; `imports.mjs --can` ALREADY all four — no new edge, no new test surface); deleted the 4 clones; dropped now-unused G_UNIQ from the monsters.js imports of teleport.js (:41) and music.js (:39) — trap.js (3 direct uses) and zap.js (:5097) still use G_UNIQ, imports kept.
**Verify:** - `unique_corpstat`: hidden note (0 blocked at baseline) · REACH-OK (no RNG-tagged reach; smoke spread 24 run, 24 PASS, 0 regressed).
**Named:** - `unique_corpstat`: none in-body — whole C body live at js/mon.js:2961. Untouched, out of scope: trap.js reward_untrap inline `((ptr?.geno|0) & G_UNIQ)` (pre-existing named omit, trap.js:7049 comment) and the trap.js:1169/:3497 + zap.js:5097 direct-G_UNIQ inlines — not clone sites, no behavior change.
**Next:** next missing-arm row (`hack.c` invocation_pos mklev/apply clone removal).

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
