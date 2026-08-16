# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-08-16 15:20 — #1381 D-1085 can_reach_floor Flying via uprops

**Objective:** Must-fix — `engrave.c` `can_reach_floor` `Flying()`
via `uprops[FLYING]` (review **43**). Not steal.c `remove_worn_item`.
**C locus:** `youprop.h` Flying (~247–255); `engrave.c`
`can_reach_floor` (~206–207); `do_wear.c` Amulet_on flying
(~1056–1058).
**Change:** `Flying()` ORs H/E flats **and** `uprops[FLYING]`
intrinsic/extrinsic; keep steed `is_flyer`; keep `!BFlying` /
`prop.blocked` (eat.js shape, no sticky skip of blocked).
Worn amulet skips `check_pit`. Did not rewrite `confer_oc_oprop`.
Stamped review **43** **Addressed:** D-1085 (hash next SHA).
Rotated #1367 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1380** **44**/44; next
@**#1385**).
**Verified:** private canary 20/20 (confer amulet EFlying unset
skips pit; HFlying; unskilled rider still false; BFlying;
MZ_HUGE; shaft; swallow/ceiling before Flying); green+strict
seed8000/0900; cohort **14**/14 + strict 1800/0004/0101/0103/
0360/2200/4500.
**Next:** Open `steal.c` `remove_worn_item` armor `*_off`.
**Blocked:** none.

## 2026-08-16 15:05 — #1380 review D-1081–D-1084 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `eat.c` `cprefx` 831–849 / `do.c` `revive_corpse`
2111–2246; `engrave.c` `can_reach_floor` 203–211 / `youprop.h`
Flying / `mondata.h` `ceiling_hider`; `trap.c` teeter/shaft;
`sit.c` `throne_sit_effect` 48–61.
**Change:** reviews **42** ACCEPT D-1081, **43** QUALITY-RISK
D-1082 (`Flying()` misses `uprops[FLYING]` for amulet of flying),
**44** ACCEPT D-1083, **45** ACCEPT D-1084. Must-fix prepend
Flying uprops (copy `eat.js`). Filled D-1084 archive hash
`83a3ada5`. Rotated #1366 to archive. Rule #2: no fs.
**Score:** cadence **#1380** **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.88). Next @**#1385**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
C read of the four loci vs JS hunks; grep FORCE/fs/seed.
**Next:** Must-fix `engrave.c` `can_reach_floor` `Flying()` via
`uprops[FLYING]`. Not steal.c `remove_worn_item`.
**Blocked:** none.

## 2026-08-16 14:54 — #1379 D-1084 throne_sit_effect wizard getlin

**Objective:** Open queue — `sit.c` `throne_sit_effect` wizard getlin
"Throne sit effect (1..13)" (named). Not Analyze y_n.
**C locus:** `sit.c` `throne_sit_effect` (~48–61).
**Change:** after `rnd(13)`, `wizard && !iflags.debug_fuzzer`
getlin; ESC Never_mind return (turn still elapses); atoi 1..13
overrides; 0/empty/junk keep the roll. Did not retouch Analyze
`y_n` vanish. Filled D-1083 Addressed hash `e6167027`. Rotated
#1365 to archive. Refilled Open to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary (non-wizard/fuzzer skip; ESC gold+throne
kept + Never_mind; atoi 5 take_gold; atoi 13 pretzel; 0/empty keep
rnd); green+strict seed8000/0900; cohort **12**/12 + strict
1800/4500/2200.
**Next:** Open `steal.c` `remove_worn_item` armor `*_off`.
**Blocked:** none.

## 2026-08-16 14:38 — #1378 D-1083 can_reach_floor check_pit teeter/shaft

**Objective:** Open queue — `engrave.c` `can_reach_floor(check_pit)`
teeter/shaft (named from D-1073). Not ceiling_hider.
**C locus:** `engrave.c` `can_reach_floor` (~209–211); `trap.c`
`uteetering_at_seen_pit` / `uescaped_shaft`.
**Change:** after Flying||MZ_HUGE, `check_pit && t_at &&
(uteetering || uescaped)` returns FALSE. In-pit / unseen still
reach. Did not pull invent/pickup `trap&&is_pit` callers or
`cant_reach_floor`. Filled D-1082 Addressed hash `453e759c`.
Rotated #1364 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary 16/16 (teeter/in-pit/unseen/shaft/
Flying/MZ_HUGE/swallow/Levitation); green+strict seed8000/0900;
cohort **14**/14 + strict 1800/0004/0101/0103/0360/2200/4500.
**Next:** Open `sit.c` `throne_sit_effect` wizard getlin.
**Blocked:** none.

## 2026-08-16 14:24 — #1377 D-1082 can_reach_floor ceiling_hider / MZ_HUGE

**Objective:** Open queue — `engrave.c` `can_reach_floor` ceiling_hider /
MZ_HUGE (named from D-1069/D-1071). Not check_pit.
**C locus:** `engrave.c` `can_reach_floor` (~203–207); `mondata.h`
`ceiling_hider`; `youprop.h` Flying; `monflag.h` `MZ_HUGE`.
**Change:** undetected ceiling hiders return FALSE (piercer/lurker;
trapper HIDE-only still reaches; large mimic S_MIMIC excluded).
Then `Flying() || msize >= MZ_HUGE` TRUE. Flying is youprop.h
`(H||E||steed is_flyer)&&!B`, not sticky `u.Flying`. Did not
pull check_pit. Filled D-1081 Addressed hash `cd5af20a`.
Rotated #1362/#1363 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary (piercer/lurker/trapper/mimic/giant/
HFlying/steed-skill); green+strict seed8000/0900; cohort **20**/20
+ strict 1800/0004/0101/0103/0360/2200/4500.
**Next:** Open `engrave.c` `can_reach_floor(check_pit)` teeter/shaft.
**Blocked:** none.

## 2026-08-16 14:15 — #1376 D-1081 cprefx rider revive_corpse after lifesave

**Objective:** Open queue — `eat.c` `cprefx` `revive_corpse` after
rider lifesave (debt.md).
**C locus:** `eat.c` `cprefx` 831–849; `do.c` `revive_corpse`
2111–2246.
**Change:** after `done(DIED)`+`exercise`, revive CORPSE
`victual.piece` (tins skip) then `zero_victual`. Moved helper to
`do.js` (C home); floor Death/Pestilence/Famine suffixes.
Did not pull MINVENT/CONTAINED/BURIED / Adjmonnam. Filled no prior
missing Addressed hash. Rotated #1361 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary (tin-skip/norevive keep; lizard zeros
victual; invent/uwep; rider `data.mndx`); green+strict
seed8000/0900; cohort **14**/14 + strict 1800/0004/0361/4500/0360/2200.
**Next:** Open `engrave.c` `can_reach_floor` ceiling_hider / MZ_HUGE.
**Blocked:** none.

## 2026-08-16 13:55 — #1375 review D-1078/D-1079/D-1080 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `makemon.c` `clone_mon` 837–943 / `potion.c`
`split_mon` 2899–2912; `makemon.c` `peace_minded` 2268–2308 /
`set_malign` 2321–2366; `shk.c` `deserted_shop` 723–747 /
`u_entered_shop` 751–917.
**Change:** reviews **39** ACCEPT D-1078, **40** ACCEPT D-1079,
**41** ACCEPT-WITH-DEBT D-1080 (youprop sticky / `in_rooms`
static-buf pointer named, not Must-fix). Filled D-1080 archive
hash `0a4a5df3`. Must-fix empty. Queue 11 Open (no refill).
Rotated #1360 to archive. Rule #2: no fs.
**Score:** cadence **#1375** **44**/44 Scr **11405**/11405 RNG
**100%** speed `32+0.27/turn` (R² 0.87). Next @**#1380**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
C read of the three loci vs JS hunks; grep FORCE/fs/seed.
**Next:** Open `eat.c` `cprefx` `revive_corpse` after rider
lifesave (debt.md).
**Blocked:** none.

## 2026-08-16 13:40 — #1374 D-1080 u_entered_shop deserted/angry/Invis/doorway

**Objective:** Open queue — `shk.c` `u_entered_shop` deserted /
angry / Invis / pickaxe doorway (named D-0307).
**C locus:** `shk.c` `deserted_shop` 723–747; `u_entered_shop`
751–917.
**Change:** Port deserted_shop + empty_shops latch; Invis /
angry/surcharge/robbed welcomes; pickaxe/mattock/steed/Fast
doorway extra `dochug`. `carrying()` walks `game.invent`. Did
not pull SetVoice / Soundeffect / Hallu shkname / `shk_move`
Fast+floor pickaxe. Filled D-1079 Addressed hash `d7d679c1`.
Rotated #1359 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1370** **44**/44; next
@**#1375**).
**Verified:** private canary 17 cases; green+strict seed8000/0900;
cohort **41**/41 (incl. 0030/0116/0361/1150) + strict
0030/0116/0361/0014/4500/0360/2200. New arms public-unhit.
**Next:** Open `eat.c` `cprefx` `revive_corpse` after rider
lifesave. Audit @**#1375**.
**Blocked:** none.

## 2026-08-16 13:25 — #1373 D-1079 peace_minded/set_malign ptr.msound

**Objective:** Open queue — `makemon.c` `peace_minded` / `set_malign`
read `ptr.msound` (`msounds[]` exists, D-1053).
**C locus:** `makemon.c` `peace_minded` 2268–2308; `set_malign`
2321–2366; `monflag.h` MS_LEADER=36 / NEMESIS=37 / GUARDIAN=38.
**Change:** `peace_minded` returns true for LEADER/GUARDIAN and
false for NEMESIS after always_* before PM_ERINYS. `set_malign`
MS_LEADER −20 before A_NONE / always_peaceful. Did not pull
`m_initweap` mndx gates. Filled D-1078 Addressed hash `c7dcd80a`.
Rotated #1358 to archive. Refilled Open to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1370** **44**/44; next
@**#1375**).
**Verified:** private canary (Twoflower 36 malign −20; synth
LEADER/GUARDIAN no `rn2`; Erinys D-0905); green+strict
seed8000/0900; cohort **18**/18 (incl. 0361/0367/0373 quest) +
strict 0014/4500/0360/0361/0367/0373/2200. Kill-malign public-unhit.
**Next:** Open `shk.c` `u_entered_shop` deserted / angry / Invis /
pickaxe doorway. Audit @**#1375**.
**Blocked:** none.

## 2026-08-16 13:12 — #1372 D-1078 sit split_mon monster clone_mon

**Objective:** Open queue — `sit.c` `split_mon` monster `clone_mon`
arm (JS named omit).
**C locus:** `potion.c` `split_mon` 2899–2912; `makemon.c`
`clone_mon` 837–943.
**Change:** `makemon.js` `clone_mon` (C home) + sit local
`split_mon` else no longer `return null`. Halves current HP then
max. Did not pull trap rust / `minliquid` / uhitm AD_COLD callers.
Stamped review **38** named omit **Addressed:** D-1078. Rule #2:
no fs. Rotated #1357 to archive.
**Score:** fortress unchanged (cadence **#1370** **44**/44; next
@**#1375**).
**Verified:** private canary (20/20 both 10/10; odd stays; `mhp<=1`
/ `G_EXTINCT` null; named; peaceful luck `rn2`; hero `cloneu`);
green+strict seed8000/0900; cohort **15**/15 (8000/0900/1500/1800/
0060/0102/0700/0017/0106/0107/4500/0014/0360/2200/0009) + strict
0014/4500/0360/2200. Path public-unhit.
**Next:** Open `makemon.c` `peace_minded` / `set_malign` read
`ptr.msound`. Audit @**#1375**.
**Blocked:** none.

## 2026-08-16 12:30 — audit = review + cadence on n%5==0; gitignore STOP

**Objective:** user: same iteration for review and public score when
`n % 5 == 0`; `STOP_AGENT_LOOP.md` gitignored so `git reset --hard`
cannot restore a tracked 0.
**C locus:** n/a (supervisor).
**Change:** `iter_mode` audit-only on cadence; drop review-every-3 and
Must-fix cadence deferral. STOP untracked. Agents must not reset --hard.
**Score:** unchanged (last cadence **#1370**; next audit **#1375**).
**Verified:** `bash -n` loop script.
**Next:** Open `split_mon` `clone_mon`; audit @#1375.
**Blocked:** none.

## 2026-08-16 12:21 — #1371 review D-1077 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`a9e819a4` D-1077) against pinned C, not
the journal. `9903fb6c` is docs-only cadence #1370.
**C locus:** `dbridge.c` `is_lava` 62–74; `rm.h` `DB_LAVA`/`DB_UNDER`;
`sit.c` 539; `mon.c` `mfndpos` 2258 / `minliquid` 971.
**Change:** review **38** ACCEPT (shared `hack.js` `is_lava` DRAWBRIDGE_UP
+`DB_LAVA`; `mfndpos` uses it, clone deleted). `is_pool`/`is_moat` and
`goodpos` macros named, not Must-fix. No `js/` edits. Rule #2: no fs.
Rotated #1356 to archive.
**Score:** fortress unchanged (cadence **#1370** **44**/44; next
@**#1375**).
**Verified:** C read of `dbridge.c:46–113`, `rm.h:75`/`217`/`291–295`,
`sit.c:539–555`, `mon.c:971–972`/`2256–2259`, `teleport.c:134–175`;
JS hunks grepped FORCE/fs/seed.
**Next:** Open `sit.c` `split_mon` monster `clone_mon` arm.
**Blocked:** none.

## 2026-08-16 12:20 — #1370 cadence score refresh

**Objective:** mandatory cadence full `sessions` (@#1370 % 5 == 0);
refresh `CURRENT.md` Score. No port (score-only).
**C locus:** n/a (score-only; no JS port change).
**Change:** docs only — Score **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.87). Filled Addressed hash
`a9e819a4` (D-1077). Queue 9 Open (no refill). Rotated #1355 to
archive. Rule #2: no fs.
**Score:** cadence **#1370** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.27/turn` (R² 0.87). Next @**#1375**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
**Next:** Open `sit.c` `split_mon` monster `clone_mon` arm.
**Blocked:** none.

## 2026-08-16 12:14 — #1369 D-1077 is_lava DRAWBRIDGE_UP+DB_LAVA

**Objective:** Open queue — `hack.c` `is_lava` includes DRAWBRIDGE_UP
+ `DB_LAVA` (named from D-1060).
**C locus:** `dbridge.c` `is_lava` (~62–74); `rm.h` `DB_LAVA`/`DB_UNDER`.
**Change:** shared `hack.js` `is_lava` matches C (LAVAPOOL/LAVAWALL or
DRAWBRIDGE_UP with `drawbridgemask & DB_UNDER == DB_LAVA`). `mon.js`
`mfndpos` uses that helper instead of a LAVAPOOL/LAVAWALL-only clone.
Did not pull `is_pool`/`is_moat` DRAWBRIDGE_UP+DB_MOAT. Stamped review
19 named omit **Addressed:** D-1077. Rule #2: no fs. Rotated #1354
to archive.
**Score:** fortress unchanged (cadence **#1365** **44**/44; next
@**#1370**).
**Verified:** private canary (UP+DB_LAVA true; ICE/MOAT/FLOOR/DOWN
false); green+strict seed8000/0900; cohort **15**/15
(8000/0900/1500/1800/0060/0102/0700/0017/0106/0107/4500/0014/0360/
2200/0009) + strict 0014/4500/0360/2200. Path public-unhit.
**Next:** Open `sit.c` `split_mon` monster `clone_mon` arm.
**Blocked:** none.

## 2026-08-16 12:05 — #1368 review D-1075/D-1076 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`f21410e1` D-1075, `87b4b7cb` D-1076)
against pinned C, not the journal.
**C locus:** `sit.c` `lay_an_egg` 357–396 / `dosit` 559–560;
`mon.c` `egg_type_from_parent`; `trap.c` `trapeffect_pit` 1835–1965 /
`trapeffect_hole` 2018–2025 / `check_in_air` / `wearing_iron_shoes`.
**Change:** review **36** ACCEPT (`lays_eggs` → `lay_an_egg`; male/
hunger/tetra/Sargasso `ECMD_OK`; `egg_type_from_parent` `force_ordinary
|| rn2(77)` in `mon.js`). Review **37** ACCEPT-WITH-DEBT (hero pit
body + hole `Can_fall_thru`; `check_in_air` youprop not sticky;
`wearing_iron_shoes` unstubbed; Punished `ballfall` / Sokoban air
named, not Must-fix). Filled Addressed hash `87b4b7cb`. No `js/`
edits. Rule #2: no fs. Rotated #1353 to archive.
**Score:** fortress unchanged (cadence **#1365** **44**/44; next
@**#1370**).
**Verified:** C read of `sit.c:357–396`/`556–564`, `mon.c:5538–5579`,
`trap.c:1086–1102`/`1825–2025`/`3102–3168`, `youprop.h:240`/`253–255`,
`worn.c:1006–1021`; JS hunks grepped FORCE/fs/seed.
**Next:** Open `hack.c` `is_lava` DRAWBRIDGE_UP + `DB_LAVA`.
**Blocked:** none.
