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

## 2026-08-16 11:02 — #1363 D-1073 dosit OBJ_AT picnic teeter/shaft skip

**Objective:** Open queue — `sit.c` `dosit` OBJ_AT gate: skip picnic
when `uteetering_at_seen_pit` or `uescaped_shaft` like C.
**C locus:** `sit.c` `dosit` (~437–439); `trap.c`
`uteetering_at_seen_pit` / `uescaped_shaft`.
**Change:** export those helpers from `trap.js` (C home); `do.js`
`flooreffects` uses the exports (deleted locals). Picnic `if` is
`obj && !(uteetering || uescaped)`. In-pit `TT_PIT` still picnics.
Did not pull `can_reach_floor(check_pit)` / meager hoard /
`lay_an_egg`. Rule #2: no fs. Rotated #1348 to archive.
**Score:** fortress unchanged (cadence **#1360** **44**/44; next
@**#1365**).
**Verified:** private helper/gate canary; green+strict seed8000/0900;
cohort seed1500/1800/0060/0102/0700/0017.
**Next:** Open `sit.c` `dosit` dragon coin hoard `money_cnt` meager.
**Blocked:** none.

## 2026-08-16 10:52 — #1362 review D-1072 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`55906000` D-1072) against pinned C,
not the journal. Docs-only `4ee4c056` cadence #1360 noted, not a
port claim.
**C locus:** `sit.c` `dosit` (~422–429); `mondata.c` `sticks` /
`pronoun_gender`; `you.h` `mhis`; `do_name.c` `Monnam`.
**Change:** review **33** ACCEPT (lap `ustuck && !sticks(hero)`
with engrave `sticks` export C AT 7/11, not `monmove.js` 6/7;
`Monnam` imported; local `mhis` non-hallu matches
`pronoun_gender`; hugs still air). Must-fix empty. Filled
Addressed hash `55906000`. No `js/` edits. Rule #2: no fs.
Rotated #1347 to archive.
**Score:** fortress unchanged (cadence **#1360** **44**/44; next
@**#1365**).
**Verified:** C read of `sit.c:400–435`, `engrave.c:191–199`,
`mondata.c:654–658`/`1191–1207`, `you.h:317–324`,
`do_name.c:1074–1079`, `role.c:688–694`, `monsters.h` eel/mimic
ATTK; JS `sit.js:155–181`/`1054–1085`, `engrave.js:233–274`,
`monmove.js:1315–1328`; grep FORCE/fs on the hunks.
**Next:** Open `sit.c` `dosit` OBJ_AT `uteetering`/`uescaped_shaft`
gate.
**Blocked:** none.

## 2026-08-16 10:45 — #1361 D-1072 dosit ustuck !sticks lap

**Objective:** Open queue — `sit.c` `dosit` ustuck `!sticks` lap
(`Monnam` / `mhis`). Not swallow combat.
**C locus:** `sit.c` `dosit` (~422–429); `mondata.c` `sticks`;
`you.h` `mhis` / `mondata.c` `pronoun_gender`; `do_name.c` `Monnam`.
**Change:** after `can_reach_floor(FALSE)` succeeds, C
`u.ustuck && !sticks(youmonst.data)` → humanoid
`Monnam`/`mhis` lap else `Monnam` has no lap; `ECMD_OK`.
Engrave `sticks` export (C AT 7/11), not `monmove.js`.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1360** **44**/44; next
@**#1365**).
**Verified:** private node eel/mimic/trapper no-lap; hobbit offer
lap; owlbear air; python hero sits; swallow no seats.
green+strict PASS; cohort **14**/14. Rotated #1346 to archive.
**Next:** Open `sit.c` `dosit` OBJ_AT `uteetering`/`uescaped_shaft`
gate.
**Blocked:** none.

## 2026-08-16 10:33 — #1360 cadence score refresh

**Objective:** mandatory cadence full `sessions` (@#1360 % 5 == 0);
refresh `CURRENT.md` Score. No port (score-only).
**C locus:** n/a (score-only; no JS port change).
**Change:** docs only — Score **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.87). No leftover `[x]` / missing
Addressed hashes. Queue 10 Open (no refill). Rotated #1345 to
archive. Rule #2: no fs.
**Score:** cadence **#1360** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.27/turn` (R² 0.87). Next @**#1365**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
**Next:** Open `sit.c` `dosit` ustuck `!sticks` lap (`Monnam` /
`mhis`). Use C `sticks`, not `monmove.js`.
**Blocked:** none.

## 2026-08-16 10:28 — #1359 review D-1070/D-1071 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`9d3545c9` D-1070, `aa96e08c` D-1071)
against pinned C, not the journal.
**C locus:** `engrave.c` `can_reach_floor`; `youprop.h` `Levitation`;
`mondata.c` `sticks`/`attacktype`/`dmgtype`; `monattk.h` `AT_HUGS`;
`sit.c` `dosit` message `Levitation`.
**Change:** reviews **31** ACCEPT (helper + sit clone `(H||E)&&!B`,
no sticky-true) and **32** ACCEPT (hugs conjunct in C `||` order;
local `sticks` matches C 7/11/19/28, not `monmove.js` 6/7). Must-fix
empty. Filled Addressed hash `aa96e08c`. No `js/` edits. Rule #2:
no fs. Rotated #1344 to archive.
**Score:** fortress unchanged (cadence **#1355** **44**/44; next
@**#1360**).
**Verified:** C read of `engrave.c:187–214`, `sit.c:414–429`,
`youprop.h:235–255`, `mondata.c:42–57`/`654–658`/`700–714`,
`monattk.h:11–21`/`61`/`70`, `do_wear.js:284–288`; generated
owlbear/python/eel/trapper `mattk`; grep FORCE/fs on the
`js/engrave.js` hunks.
**Next:** Open `sit.c` `dosit` ustuck `!sticks` lap (`Monnam` /
`mhis`). Use C `sticks`, not `monmove.js`.
**Blocked:** none.

## 2026-08-16 10:16 — #1358 D-1071 can_reach_floor ustuck AT_HUGS + !sticks

**Objective:** Open queue — `engrave.c` `can_reach_floor` ustuck
AT_HUGS + `!sticks` (`mondata.c` `sticks`). Sit-on-air reachable;
ship before ustuck lap. Not ceiling_hider / MZ_HUGE. Review **30**.
**C locus:** `engrave.c` `can_reach_floor` (~192–197); `mondata.c`
`sticks` / `attacktype`; `monattk.h` `AT_HUGS=7`.
**Change:** hugs arm in C `||` order with swallow and Levitation.
Local `sticks`/`attacktype`/`dmgtype` (avoid engrave←monmove cycle).
Eel WRAP still reaches; python hugs does not; hero `sticks` still
reaches. Did not pull ceiling_hider / MZ_HUGE / dosit lap. Filled
D-1070 Addressed hash `9d3545c9`. Rotated #1343 to archive. Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1355** **44**/44; next
@**#1360**).
**Verified:** private node owlbear/python hug false; eel/trapper
reach; poly sticks reach; swallow/ELevitation still false.
green+strict PASS; cohort **14**/14
(8000/0900/1500/1800/0060/0102/0700/0106/0107/0101/0116/2200/4500/
0009). Path unhit.
**Next:** Open `sit.c` `dosit` ustuck `!sticks` lap (`Monnam` /
`mhis`). Not swallow combat.
**Blocked:** none.

## 2026-08-16 10:05 — #1357 D-1070 can_reach_floor Levitation (H||E)&&!B

**Objective:** Must-fix — `can_reach_floor` Levitation + sit
`Levitation()` must be C `youprop.h` `(H||E)&&!B`, not sticky
`u.Levitation`. Review **30** QUALITY-RISK.
**C locus:** `engrave.c` `can_reach_floor`; `sit.c` `dosit`
`else if (Levitation)`; `youprop.h:235–240`.
**Change:** helper and sit message read H/E flats and honor
`BLevitation`. Keep air/water exception. Did not pull hugs /
ceiling_hider / MZ_HUGE / rewrite `confer_oc_oprop` / other clones.
Inserted Open hugs-before-lap. Rotated #1342 to archive. Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1355** **44**/44; next
@**#1360**).
**Verified:** private node boots/potion tumble `ECMD_OK`; B sits;
air/water sit; swallow no-seats; sticky-only reaches. green+strict
PASS; cohort **14**/14 (8000/0900/1500/1800/0060/0102/0700/0106/
0107/0101/0116/2200/4500/0009). Path unhit.
**Next:** Open `can_reach_floor` ustuck AT_HUGS + `!sticks` (before
dosit lap).
**Blocked:** none.

