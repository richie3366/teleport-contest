# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
