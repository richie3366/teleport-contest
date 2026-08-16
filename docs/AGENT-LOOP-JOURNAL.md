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

## 2026-08-16 09:50 — #1356 review D-1069 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`872d1d93` D-1069) against pinned C, not
the journal. `8314cc94` is docs-only cadence #1355.
**C locus:** `sit.c` `dosit` 414–421; `engrave.c` `can_reach_floor`;
`youprop.h` `Levitation`; `do_wear.js` `confer_oc_oprop` LEVITATION.
**Change:** review **30** QUALITY-RISK (sit.c three-message envelope
+ swallow match; helper Levitation is sticky `u.Levitation`, not
`(H||E)&&!B`). Must-fix prepended. No `js/` edits. Rule #2: no fs.
Rotated #1341 to archive.
**Score:** fortress unchanged (cadence **#1355** **44**/44; next
@**#1360**).
**Verified:** C read of `sit.c:398–429`, `engrave.c:187–214`,
`youprop.h:235–240`; grep `u.Levitation=` empty in `js/`; hunk
grepped FORCE/fs/seed.
**Next:** Must-fix `can_reach_floor` Levitation `(H||E)&&!B`.
**Blocked:** none.

## 2026-08-16 09:47 — #1355 cadence score refresh

**Objective:** mandatory cadence full `sessions` (@#1355 % 5 == 0);
refresh `CURRENT.md` Score. No port (score-only).
**C locus:** n/a (score-only; no JS port change).
**Change:** docs only — Score **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.87). Filled Addressed hash
`872d1d93` (D-1069). Rotated #1340 to archive. Rule #2: no fs.
**Score:** cadence **#1355** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.27/turn` (R² 0.87). Next @**#1360**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
**Next:** Open `dosit` ustuck `!sticks` lap (`Monnam` / `mhis`).
**Blocked:** none.

## 2026-08-16 09:45 — #1354 D-1069 dosit can_reach_floor swallow/tumble/air

**Objective:** Open queue — `sit.c` `dosit` `can_reach_floor(FALSE)`:
swallow “no seats” / Levitation tumble / sitting on air. Replace JS
Levitation-only early return.
**C locus:** `sit.c` `dosit` (~414–421); `engrave.c` `can_reach_floor`;
`youprop.h` `Levitation`.
**Change:** after hider clear, call shared `can_reach_floor(false)`
(dynamic import; sit←engrave←hack←eat←sit) and the three C messages.
Air/water Levitation may sit. Did not port ustuck lap or helper
hugs/ceiling_hider. Rotated #1339 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1350** **44**/44; next
@**#1355**).
**Verified:** private node swallow no-seats; dungeon tumble; air/water
sit; lurker still sits after hide clear. green+strict PASS; cohort
**9**/9 (8000/0900/0106/0107/4500/1500/1800/0060/2200). Path unhit.
**Next:** Open `dosit` ustuck `!sticks` lap.
**Blocked:** none.

## 2026-08-16 09:35 — #1353 review D-1068 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`990b06a8` D-1068) against pinned C, not
the journal. `dee3b2c6` is docs-only queue refill.
**C locus:** `sit.c` `dosit` 406–429; `mondata.h` `is_hider` /
`ceiling_hider`; `monsters.h` mimic/piercer/lurker/trapper; `engrave.c`
`can_reach_floor`; `cmd.c` `domonability`; `polyself.c` `dohide`.
**Change:** review **29** ACCEPT (`is_hider` + `!= PM_TRAPPER`, no
`newsym`, clear before reach; not `ceiling_hider`). No new Must-fix.
Filled Addressed hash `990b06a8`. No `js/` edits. Rule #2: no fs.
Rotated #1338 to archive.
**Score:** fortress unchanged (cadence **#1350** **44**/44; next
@**#1355**).
**Verified:** C read of `sit.c:398–429`, `mondata.h:36–45`,
`engrave.c:187–214`, `cmd.c:889–913`, `polyself.c:1860–1873`;
JS hunk grepped FORCE/fs/seed. `PM_TRAPPER` index 99.
**Next:** Open `dosit` `can_reach_floor(FALSE)` only.
**Blocked:** none.

## 2026-08-16 09:28 — #1352 D-1068 dosit hider uundetected except trapper

**Objective:** Open queue — `sit.c` `dosit` hider:
`u.uundetected && is_hider` except trapper. Not `can_reach_floor`
/ ustuck.
**C locus:** `sit.c` `dosit` (~410–412); `mondata.h` `is_hider`;
`monsters.h` `PM_TRAPPER`.
**Change:** after usteed return, clear `u.uundetected` for hiders
that are not `PM_TRAPPER` (ceiling drop). Trapper stays hidden.
No `newsym` (C has none). Did not port `can_reach_floor` / ustuck.
Filled no prior Addressed hashes (already present). Rule #2: no fs.
Rotated #1336/#1337 to archive.
**Score:** fortress unchanged (cadence **#1350** **44**/44; next
@**#1355**).
**Verified:** private node lurker/piercer 1→0; trapper stays 1;
human stays 1; usteed skips clear. green+strict PASS; cohort
**9**/9 (8000/0900/0106/0107/4500/1500/1800/0060/2200). Path unhit.
**Next:** Open `dosit` `can_reach_floor(FALSE)`.
**Blocked:** none.

## 2026-08-16 09:18 — refill LOOP-QUEUE when below 8 open items

**Objective:** empty-queue halt at #1351 was the supervisor blocking
the agent from refilling; keep 8–12 Open rows from the map.
**C locus:** n/a (queue hygiene). Next port: `sit.c` `dosit` hider.
**Change:** filled 12 Open items (hider / `can_reach_floor` / ustuck /
uteeter / hoard / `lay_an_egg` / VIASITTING pit / `is_lava` DB_LAVA /
`clone_mon` / `msound` malign / shop doorway / rider `revive_corpse`).
Supervisor no longer halts *before* a port when empty; injects refill
when count < 8; halts *after* a port that is still empty.
**Score:** unchanged (cadence still **#1350**).
**Verified:** `bash -n` loop script; 12 `- [ ]` in LOOP-QUEUE.
**Next:** `dosit` hider.
**Blocked:** none.

