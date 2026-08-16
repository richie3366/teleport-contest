# Rotated from AGENT-LOOP-JOURNAL.md after review 26 / #1347

## 2026-08-16 03:15 — #1332 review D-1056/D-1057 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`2e79451d` D-1056, `e1852e71` D-1057)
against pinned C, not the journal.
**C locus:** `youprop.h` `Underwater`; `sit.c` `dosit` ~430 / ~505 /
~526–538; `pray.c` `altar_wrath` / `godvoice` / `align_gname`;
`mondata.h` `humanoid`; `defsym.h` explanations.
**Change:** reviews 17 ACCEPT (sit predicates read `u.uinwater`) and
18 ACCEPT (furniture sit_message + real `altar_wrath`; lava/ice/
drawbridge still named Open). Must-fix empty. Filled Addressed hash
`e1852e71`. No `js/` edits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1330** **44**/44; next
@**#1335**).
**Verified:** C read of `youprop.h:279`, `sit.c:430–431`/`505–510`/
`526–557`, `defsym.h:129–133`, `rm.h:82–88`, `mondata.h:65`,
`pray.c:107`/`1415–1426`/`2530–2554`/`2652–2672`, `attrib.c:117–128`
/`411–418`, `dbridge.c:62–96`; grep `uinwater=` vs `u.Underwater`.
**Next:** Open `dosit` lava sit (not ice/drawbridge in that cluster).
**Blocked:** none.
