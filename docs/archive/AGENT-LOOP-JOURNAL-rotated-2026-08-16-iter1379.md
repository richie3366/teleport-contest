# Rotated from AGENT-LOOP-JOURNAL.md after #1379 D-1084

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
