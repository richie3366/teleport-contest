# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-04 — D-1802 objnam.c xname_flags tshirt/apron/hawaiian/xcalled

**Objective:** Open `objnam.c` `xname_flags` `tshirt_text` /
`apron_text` / `hawaiian_motif` / `xcalled`. Not xname article arms.
**C:** `xcalled` `:557–572`; gameover `:971–996`; `read.c`
`tshirt_text` `:99` / `hawaiian_motif` `:189` / `apron_text` `:253` /
`erode_obj_text` `:88` / `candy_wrapper_text` `:295`.
**JS was:** inline `" called "` strings; those four NOT FOUND.
**Fix:** those in `js/objnam.js`; gameover suffix after pluralize in
`xname`/`doname`; `wipeout_text` late-bound (objnam→read/engrave TDZ).
attrib `ysimple_name` clone deleted. Named: article arms,
`armor_simple_name`, `find_artifact`, `hawaiian_design`/doread.
**Verify:** save-oracle skip (untagged); probes (slogan[0], gameover
Hawaiian motif, live no motif, o_id 0 skip); green + strict; cohort
7/7 + strict.
**Next:** Open `do_name.c` `x_monnam` saddle / ARTICLE_* / M2_PNAME /
Wizard article + nextmbuf.
## 2026-09-04 — D-1801 allmain.c moveloop_core per-turn callees

**Objective:** Open `allmain.c` `moveloop_core` per-turn callees
`do_storms` / `glibr` / `mkot_trap_warn` / `end_of_input`. Not
`nh_timeout`.
**C:** `timeout.c:1846` / `do_wear.c:2527` + `fingers_or_gloves:59` /
`artifact.c:2752` + `count_surround_traps:2707` / `cmd.c:5182` +
SAFERHANGUP `allmain.c:181` / `rhack:3638`.
**JS was:** those four NOT FOUND; EOT skipped them.
**Fix:** those in timeout/do_wear/artifact/cmd; `moveloop_core` C
order. `You_hear` export. Named: `buzz`/`dobuzz`, `amulet()`,
`intervene`.
**Verify:** save-oracle skip (untagged); silent probes (non-stormy no
RNG, stormy `rn2(8)` gate, mkot count 0, tutorial `end_of_input`);
green + strict; cohort 7/7 + strict.
**Next:** Open `objnam.c` `xname_flags` tshirt/apron/hawaiian/`xcalled`.
## 2026-09-04 — D-1800 hack.c test_move/domove_core remaining callees

**Objective:** Open `hack.c` `test_move` + `domove_core`:
`water_friction`, `avoid_running_into_trap_or_liquid`,
`domove_fight_ironbars`/`web`, `mention_walls`. Not lookaround.
**C:** `mkmaze.c:1688` / `hack.c:2364` / `:2443` / `:2493` / `:1995`
/ `:2020` / `:2585` / testdiag doorway.
**JS was:** those helpers NOT FOUND; F-bars fell through to
`fight_empty`; rush onto a seen trap kept walking; doorway/OOB
mention_walls silent.
**Fix:** those arms in `js/hack.js` + `js/cmd.js` `domove` C order.
`weapon_descr` export. Named: lookaround, air_turbulence, Known_wwalking,
autodig/`worm_cross`, `exercise_steed`.
**Verify:** save-oracle skip (untagged `hack.c:test_move`); probes
(avoid-run / dry turbulence / fight gates); green + strict; cohort 7/7.
**Next:** Open `allmain.c` `moveloop_core` per-turn callees. Not
`nh_timeout`.
## 2026-09-04 — D-1799 hack.c spoteffects remaining body

**Objective:** Open `hack.c` `spoteffects` recursion / lev timeout /
Warning ice `:3312–3462`. Not `dotrap`.
**C:** `hack.c:3311–3462`. 42 callers. Static `inspoteffects` /
spotloc / spotterrain / spottrap; `in_lava_effects`; lev `TIMEOUT==1`
`rn2(2)` incr vs `float_down`; Warning ice; `m_at` piercer/default
then `mnexto`.
**JS was:** dest-typ / pooleffects / sink / pickup+dotrap; **return**
on `in_steed_dismounting` so later arms never ran.
**Fix:** those arms in `js/pickup.js`; `incr_itimeout_HLevitation` +
invent `Blind` exports. Named: pooleffects leave-water, `failing_untrap`
writer, helm_simple_name clones.
**Verify:** save-oracle skip (untagged `hack.c:spoteffects`); green +
strict; cohort 7/7 + ride 0103/0104.
**Next:** Open `hack.c` `test_move` + `domove_core`. Not lookaround.
## 2026-09-04 — D-1798 monmove.c dochug remaining + wormhitu

**Objective:** Open `monmove.c` `dochug` remaining arms + `wormhitu`.
Not `m_move`.
**C:** `dochug` `:689–989` / `m_arrival` `:572` / `release_hero` `:361`
/ `leppie_stash` `:1153` / `worm.c` `wormhitu` `:343–362`.
**JS was:** those arms deferred; `wormhitu` NOT FOUND; `findgold`
nobj-only so invent[] always empty.
**Fix:** STRAT_ARRIVE, leppie_stash, release_hero, MS_BRIBE mux,
S_LEPRECHAUN findgold, isgd vanish, MOVED unstuck+helpless,
PHASE FOUR `quest_talk`, `wormhitu`. Named: `demon_talk`, `cuss`.
**Verify:** arrival/release/lep-rn2/wormhitu-skip probes; green +
strict; cohort 7/7. save-oracle skip (untagged `monmove.c:dochug` /
`worm.c:wormhitu`).
**Next:** Open `hack.c` `spoteffects` recursion / levitation timeout /
Warning ice. Not `dotrap`.
## 2026-09-04 — D-1797 hack.c nomul/unmul usleep + uinvulnerable

**Objective:** Must-fix **764** — Match C `hack.c` `nomul` `:4166–4167` /
`unmul` `:4197` so `usleep=0` and nomul `uinvulnerable=FALSE` run.
**C:** `hack.c:4160–4173` / `:4177–4198`. Callers `mattacku:513`,
`fall_asleep` restamp, `trap.c` notes unmul clears usleep.
**JS was:** only `fall_asleep` wrote `usleep`.
**Fix:** those two assignments in `js/hack.js`. Named: Upolyd
survived-that form. Probe: nomul(0) awake clears; multi<0 early-return
keeps stamp; fall_asleep restamps; unmul clears. save-oracle skip
(untagged `hack.c:nomul`).
**Verify:** green + strict; cohort 9/9. seed0030 still 39912/105529 —
seg0 RNG OK 14300; first all-seg miss C seg4 `randomize_gem_colors`
vs JS seg3 combat (not sleep `rn2(10)`).
**Next:** Open `monmove.c` `dochug` remaining + `wormhitu`. Not `m_move`.
## 2026-09-04 — audit overlay 755–765 + cadence 42/44

**Objective:** review JS SHAs since `0c2e880a` against pinned C; cadence
full `sessions` (no `js/` port).
**SHAs:** 755–763 AWD (D-1786…D-1794). **764 QUALITY-RISK** D-1795
`mattacku` sleep `rn2(10)` vs JS `nomul`/`unmul` that never clear
`usleep` (`hack.c:4167`/`:4197`) — seed0030 39912/105529 at that SHA.
**765 AWD** D-1796 `xkilled`.
**Cadence:** 42/44; scr 10428/11405; RNG 727221/792838 (91.7%);
`41+0.32/turn`. seed4500 1801/1814 is D-1792 leftover.
**Next:** Must-fix 764 `nomul`/`usleep`. Not Open `dochug`. Not a
seed0030 peel.
## 2026-09-04 — D-1796 mon.c xkilled LEVEL_SPECIFIC + pool gate

**Objective:** Open `mon.c` `xkilled` LEVEL_SPECIFIC_NOCORPSE +
accessible||is_pool + artifact un-create. Not `make_corpse`.
**C:** `mon.c:3476–3740` / macro `:44` / `corpse_chance` `:3242` /
`accessible` `:2187` / `artifact_exists` un-create `:369`.
**JS was:** always `!rn2(6)` + corpse on every tile; `!mod` only
zeroed `oartifact`.
**Fix:** those C gates; `accessible` export (`SURFACE_AT`);
`artiexist` clear; corpse_chance clones; bury `m_carrying`;
murder/unicorn luck; tut-1 `deathdrops=false`. Named: flooreffects /
MAIL / wasinside / `sobj_at` boulder / quest adjalign.
**Verify:** canary 19/19; green + strict; cohort 7/7. save-oracle
skip (untagged).
**Next:** Open `monmove.c` `dochug` remaining + `wormhitu`. Not
`m_move`.
## 2026-09-04 — D-1795 mhitu.c mattacku remaining arms + getmattk

**Objective:** Open `mhitu.c` `mattacku` remaining attack-type body
`:491–952`. Not `hitmu`.
**C:** `mhitu.c` `mattacku` `:490–952`; `getmattk` `:309–444`.
**JS was:** switch without Underwater / hidden / mimic / Invis tmp /
eel vis / invulnerable / getmattk DISE·DREN·cancelled-WEAP·home-elem /
Snickersnee `hitval(youmonst)` / AT_ENGL flush+pline_mon / `bot()` /
sleep `rn2(10)`.
**Fix:** those arms; `m_monnam`; `simple_typename`/`mimic_obj_name`;
`ceiling` + `is_home_elemental` exports. Named: `hitmu`; SEDUCE=0;
ceiling `in_rooms`; uhitm `prev_result`; lock.js `simple_typename`
clone.
**Verify:** getmattk probe (PEST/DREN/ENGL/wight/mimic); green +
strict; cohort 8/8. save-oracle skip (untagged). seed4500 still
1801/1814 as at D-1792 (not this peel).
**Next:** Open `mon.c` `xkilled` LEVEL_SPECIFIC_NOCORPSE + pool gate.
Not `make_corpse`.
## 2026-09-04 — D-1794 mon.c make_corpse special-corpse table

**Objective:** Open `mon.c` `make_corpse` dragon/unicorn/worm/golem
table (19 C draws). Not mondied.
**C:** `mon.c:563–941`.
**JS was:** undead + pudding + default_1 only.
**Fix:** rest of C switch + bury/bypass/oname/Blind tail;
`free_mgivenname`; `clear_dknown` export.
**Verify:** canary 20/20; green + strict; cohort 7/7. save-oracle
skip (untagged).
**Next:** Open `mhitu.c` `mattacku` remaining attack-type arms.
Not hitmu.
## 2026-09-03 — D-1793 weapon.c dmgval bonus rnd() + erosion

**Objective:** Open `weapon.c` `dmgval` blessed/axe/silver/
`artifact_light` bonus `rnd()` + `greatest_erosion`. Not `spec_abon`.
**C:** `weapon.c:215–356`.
**JS was:** small switch + shade only; bonus draws and erosion skipped.
**Fix:** rest of C body; `is_axe` one export; `is_wooden`/`hates_light`.
**Verify:** probe (blessed/silver/axe/erosion/ball/large switch);
green + strict; cohort 7/7. save-oracle skip (untagged).
**Next:** Open `mon.c` `make_corpse` special-corpse table. Not mondied.
