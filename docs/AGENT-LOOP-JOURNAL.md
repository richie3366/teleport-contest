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

## 2026-08-16 07:40 — #1350 review D-1066/D-1067 + cadence score

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`7e330128` D-1066, `2e50b318` D-1067)
against pinned C, not the journal; cadence full `sessions`.
**C locus:** `nhlua.c` `tutorial` / `l_nhcore_call` / `l_nhcore_init`;
`do.c` `goto_level`; `dat/nhcore.lua` / `nhlib.lua`; `sit.c` `dosit`
406–408; `do_name.c` `mon_nam` / `x_monnam` ARTICLE_THE.
**Change:** review 27 ACCEPT (`tutorial()` then both ENTER/LEAVE
FALSE; Lua NHCB / GETPOS_TIP / `leaving_tutorial` FREEING named).
Review 28 ACCEPT (`You`+`mon_nam`, not `y_monnam`; one-pline density
note). Must-fix empty. Filled Addressed hash `2e50b318`. No `js/`
edits. Rule #2: no fs. Rotated #1335 to archive.
**Score:** cadence **#1350** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.26/turn` (R² 0.87). Next @**#1355**.
**Verified:** C read of `nhlua.c:140–194`/`1837–1846`, `do.c:1503–1515`
/`1640–1664`, `sit.c:406–409`, `do_name.c:1042–1046`/`1117–1128`,
`pline.c:366–374`, pinned `nhcore.lua` table; hunks grepped FORCE/fs.
Full `sessions` **44**/44; role-init throws **0**/44.
**Next:** Open empty; remaining `dosit` hider / `can_reach_floor` /
`ustuck` or `debt.md`.
**Blocked:** none.

## 2026-08-16 07:22 — #1349 D-1067 dosit steed mon_nam(usteed)

**Objective:** Open queue — `dosit` steed message: C
`mon_nam(usteed)`, not `"your steed"` (D-1033 risk 4).
**C locus:** `sit.c` `dosit` (~406–408); `do_name.c` `mon_nam` /
`x_monnam` ARTICLE_THE.
**Change:** `You`+`mon_nam(u.usteed)` (unnamed saddled `"the
saddled pony"`; named bare). Not `y_monnam`. Hider /
`can_reach_floor` / ustuck still named. Filled Addressed hash
`7e330128` (D-1066). Rule #2: no fs. Rotated #1334 to archive.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** private node three names + `ECMD_OK`; never
`"your steed"`. green+strict PASS; cohort **7**/7
(0106/0107/4500/1500/1800/0060/2200). Path unhit.
**Next:** Open empty; remaining `dosit` hider / `can_reach_floor`
/ `ustuck` or `debt.md`.
**Blocked:** none.

## 2026-08-16 07:15 — #1348 D-1066 tut-1 tutorial() nhcore disable

**Objective:** Open queue — tut-1 nhcore callback disable on
enter/leave only (not Lua cmd_before/`tutorial_turn` / Knight jump).
**C locus:** `nhlua.c` `tutorial` / `l_nhcore_call` / `l_nhcore_init`;
`do.c` `goto_level`; `dat/nhcore.lua` enter/leave_tutorial;
`dat/nhlib.lua` `tutorial_enter`/`tutorial_leave`.
**Change:** `goto_level` calls `tutorial()`. `l_nhcore_init` fills
`nhcore_call_available` TRUE. After leave, both ENTER/LEAVE FALSE.
Lua `nh.callback` cmd_before/`tutorial_turn` still named. Rule #2:
no fs. Rotated #1333 to archive.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** private node enter keeps available + stash; leave
disables both; second enter skips; nil start_new_game disables that
slot; GETPOS stays TRUE. green+strict PASS; seed0009 **73**/73;
cohort **12**/12.
**Next:** Open `dosit` steed `mon_nam(usteed)`.
**Blocked:** none.

## 2026-08-16 07:05 — #1347 review D-1065 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`296bc792` D-1065) against pinned C,
not the journal. Docs-only `b3daacc3` cadence #1345 noted, not a
port claim.
**C locus:** `cmd.c` `cmd_from_ecname` / `cmd_from_func` /
`commands_init` / `reset_commands`; `nhlua.c` `nhl_get_cmd_key`;
`hacklib.c` `visctrl`; `dat/tut-1.lua` `tut_key` / `tut_key_help`.
**Change:** review 26 ACCEPT (default `!num_pad` eckey strings +
Lua Ctrl-/Alt- rewrite; loot `M-l` / tip `Alt-T` / untrap `M-u` /
twoweapon `X`; `cmd_from_func` list-order and `ef_funct` sharing
named, unhit by tut-1). Must-fix empty. Filled Addressed hash
`296bc792`. No `js/` edits. Rule #2: no fs. Rotated #1332 to
archive.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** C read of `cmd.c:2135–2154`/`2750–2782`/`3036–3088`/
`3343–3476`, `nhlua.c:1644–1657`, `hacklib.c:469–493`,
`hack.h:655`, `dat/tut-1.lua:5–27`/`70–107`/`230–267`/`294`; grep
FORCE/DIAG/fs on the `js/dokeylist.js` + `js/mklev.js` hunks.
**Next:** Open tut-1 nhcore callback disable on enter/leave.
**Blocked:** none.

## 2026-08-16 06:40 — #1346 D-1065 tut-1 tut_key / eckey

**Objective:** Open queue — tut-1 `tut_key` / eckey only (not
nhcore disable / Knight jump).
**C locus:** `cmd.c` `cmd_from_ecname`/`cmd_from_func`;
`nhlua.c` `nhl_get_cmd_key`; `dat/tut-1.lua` `tut_key` /
`tut_key_help`; `hacklib.c` `visctrl`.
**Change:** `cmd_from_ecname` on default binds + BIND overlay.
`load_tut1` Lua Ctrl-/Alt- rewrite + `tut_key_help`. Loot
`M-l`, tip `Alt-T`, untrap `M-u`, twoweapon `X`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** private node eckey table; green+strict PASS;
seed0009 **73**/73; cohort **12**/12.
**Next:** Open tut-1 nhcore callback disable on enter/leave.
**Blocked:** none.

## 2026-08-16 06:16 — #1345 cadence score refresh

**Objective:** mandatory cadence full `sessions` (@#1345 % 5 == 0);
refresh `CURRENT.md` Score. No port (score-only).
**C locus:** n/a (score-only; no JS port change).
**Change:** docs only — Score **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.87). No leftover `[x]` / missing
Addressed hashes. Rotated #1330 to archive. Rule #2: no fs.
**Score:** cadence **#1345** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.27/turn` (R² 0.87). Next @**#1350**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
**Next:** Open tut-1 `tut_key` / eckey only.
**Blocked:** none.

## 2026-08-16 06:15 — #1344 review D-1063/D-1064 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`3f376b74` D-1063, `dc354c44` D-1064)
against pinned C, not the journal.
**C locus:** `sp_lev.c` `create_object` / `lspo_object` /
`get_table_buc` / `levregion_add` / `lspo_teleport_region` /
`get_location`; `mkmaze.c` `fixup_special` leftover TELE;
`dungeon.c` `u_on_rndspot`; `dat/tut-1.lua` food + teleport_region.
**Change:** reviews 24 ACCEPT (buc 4 `uncurse`, pmnames lichen not
`find_montype`, CORPSTAT spe then `set_corpsenm`) and 25 ACCEPT
(ANY_LOC origin add, omit-exclude `-1` `del_islev`, leftover dest
copy; `place_lregion` already ran from `u_on_rndspot`). Must-fix
empty. Filled Addressed hash `dc354c44`. No `js/` edits. Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1340** **44**/44; next
@**#1345**).
**Verified:** C read of `sp_lev.c:2193–2264`/`3442–3451`/`3667–3720`/
`1202–1269`/`5371–5459`, `mkobj.c:1318–1367`/`1822–1838`,
`mkmaze.c:341–410`/`570–704`, `dungeon.c:1605–1634`,
`dungeon.h:35–44`/`144–145`, `dat/tut-1.lua:59`/`258–261`; grep
FORCE/DIAG/fs on the `js/mklev.js` hunks.
**Next:** Open tut-1 `tut_key` / eckey only.
**Blocked:** none.


