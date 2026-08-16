# Rotated from AGENT-LOOP-JOURNAL.md after #1382 D-1086

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
