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

## 2026-08-16 11:50 — #1367 D-1076 hero pit/hole dotrap VIASITTING

**Objective:** Open queue — `trap.c` hero pit/hole bodies under
`dotrap` `VIASITTING` (named from D-1039).
**C locus:** `trap.c` `trapeffect_pit` (~1835–1965) /
`trapeffect_hole` (~2018–2025) / `check_in_air` / `wearing_iron_shoes`.
**Change:** hero pit: Lev/Fly skip (youprop.h), clinger, fall/sit
verbs, spikes/`poisoned`, `set_utrap(rn1(6,2), TT_PIT)`, losehp,
selftouch, exercise. Hole `!Can_fall_thru` → seetrap skip. Thin
steedintrap PIT/SPIKED. Punished `ballfall` still omit. Filled
D-1075 hash `f21410e1`. Rule #2: no fs. Rotated #1352 to archive.
**Verified:** private canary (PIT VIASITTING utrap+losehp;
HLevitation skip); green+strict seed8000/0900; cohort 12/12
(1500/1800/0060/0102/0700/0017/0106/0107/4500/0014/0360/2200)
+ strict 0014/4500/0360/2200.
**Next:** Open `hack.c` `is_lava` DRAWBRIDGE_UP + `DB_LAVA`.
**Blocked:** none.

## 2026-08-16 11:32 — #1366 D-1075 dosit lay_an_egg after throne

**Objective:** Open queue — `sit.c` `dosit` `lay_an_egg` at end of
function. Not hider / reach / ustuck. Review 35 named omit 1.
**C locus:** `sit.c` `lay_an_egg` (~357–396) / `dosit` (~559–560);
`mon.c` `egg_type_from_parent`.
**Change:** oviparous `#sit` returns `lay_an_egg()` instead of
having-fun. Male / hunger `<` 80 / dry tetra / Upolyd giant or
electric eel Sargasso → `ECMD_OK`. Else typed egg (`spe=1`,
`egg_type_from_parent(umonnum,FALSE)` in `mon.js`, `dropy` /
`stackobj` / `morehungry`). Did not pull `clone_mon` / wizard
getlin / `shieldeff`. Stamped review 35 **Addressed:** D-1075.
Rule #2: no fs. Rotated refill #1351 to archive.
**Verified:** private canary (male/hungry/tetra/Sargasso `ECMD_OK`;
pyrolisk egg parent+timed; queen→killer bee; human having-fun);
green+strict seed8000/0900; cohort seed1500/1800/0060/0102/0700/0017.
**Next:** Open `trap.c` hero pit/hole `dotrap` VIASITTING.
**Blocked:** none.

## 2026-08-16 11:17 — #1365 review D-1073/D-1074 + cadence score

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`1f21183f` D-1073, `962e07a9` D-1074)
against pinned C, not the journal; cadence full `sessions`.
**C locus:** `sit.c` `dosit` (~437–446); `trap.c`
`uteetering_at_seen_pit` / `uescaped_shaft`; `hack.c` `money_cnt`.
**Change:** review **34** ACCEPT (picnic `OBJ_AT && !(uteetering ||
uescaped)` with `trap.c` helpers exported from `trap.js`; in-pit
still picnics; `check_pit` still named). Review **35** ACCEPT
(dragon `"meager "` iff `quan + first-pile money_cnt < ulevel*1000`;
local `hack.c` clone, not a sum). Must-fix empty. Filled Addressed
hash `962e07a9`. No `js/` edits. Rule #2: no fs. Rotated #1350
to archive.
**Score:** cadence **#1365** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.26/turn` (R² 0.87). Next @**#1370**.
**Verified:** C read of `sit.c:400–504`/`443–446`/`564`,
`trap.c:6648–6664`, `trap.h:113–114`, `hack.c:4509–4521`,
`pline.c:366–374`, `you.h:345–348`; JS `sit.js:1043–1133`,
`trap.js:1117–1135`, `do.js:628–733`. Hunks grepped FORCE/fs.
Full `sessions` **44**/44; role-init throws **0**/44.
**Next:** Open `sit.c` `dosit` `lay_an_egg`.
**Blocked:** none.

## 2026-08-16 11:10 — #1364 D-1074 dosit dragon money_cnt meager hoard

**Objective:** Open queue — `sit.c` `dosit` dragon coin hoard:
`money_cnt(invent)` meager vs `ulevel * 1000` (JS always bare
“hoard”).
**C locus:** `sit.c` `dosit` (~443–446); `hack.c` `money_cnt`
(first `COIN_CLASS` quan, not a sum).
**Change:** local `money_cnt` in `sit.js`; prefix `"meager "` when
`obj.quan + money_cnt(invent) < u.ulevel * 1000`. Equal-to-threshold
is bare. Did not pull `lay_an_egg` / `clone_mon` split_mon. Filled
Addressed hash `1f21183f` (D-1073). Rule #2: no fs. Rotated #1349
to archive. Refilled Open to 12.
**Score:** fortress unchanged (cadence **#1360** **44**/44; next
@**#1365**).
**Verified:** private canary (meager/bare/ulevel/first-coin-not-sum);
green+strict seed8000/0900; cohort seed1500/1800/0060/0102/0700/0017.
**Next:** Open `sit.c` `dosit` `lay_an_egg`.
**Blocked:** none.
