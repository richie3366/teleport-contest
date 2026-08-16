# Rotated from AGENT-LOOP-JOURNAL.md after #1427 D-1122 rloc Wizard stair

## 2026-08-16 22:10 — #1412 D-1110 goodpos live-mon onscary when m_id != 0

**Objective:** Open queue — `teleport.c` `goodpos` live-mon
`onscary` when `m_id != 0` (named). Not `goodpos_onscary`.
**C locus:** `teleport.c` `goodpos` 168–169; `monmove.c`
`onscary` 241–303; `engrave.c` `sengr_at`; `monst.h`
`is_lminion`; `shk.c` `inhishop`; `priest.c` `inhistemple`.
**Change:** `m_id ? onscary : goodpos_onscary`. Local `onscary`
(mon.js cycle): vampshifter altar; Elbereth needs hero/image/
`guardobjects`; `iswiz`/`is_lminion`/`PM_ANGEL`/rider;
shop/temple resist. Fakemon still D-1102 helper. mfndpos
`mon.js` partial named. Filled D-1109 hash `5bf81ca7`.
Rotated #1397. Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1410** **44**/44; next
@**#1415**).
**Verified:** private canary **61**/61; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Path public-unhit.
**Next:** Open `teleport.c` `teleok` vibrating / pit-fly. Not
`rloc`.
**Blocked:** none.

