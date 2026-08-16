# Rotated from AGENT-LOOP-JOURNAL.md after #1413 D-1111 teleok vibrating / pit-fly

## 2026-08-16 19:16 — #1398 D-1099 goodpos youmonst swim/lev/fly/wwalk

**Objective:** Open queue — `teleport.c` `goodpos` youmonst
Swimming/Amphibious/Levitation/Flying/Wwalking pool and lava
arms (named). Not `passes_walls`.
**C locus:** `teleport.c` `goodpos` 136–161; `youprop.h`
Swimming/Amphibious/Levitation/Flying/Wwalking/Fire_resistance.
**Change:** youmonst pool/lava arms use youprop clones (flats OR
uprops; Lev/Fly honor B*; no sticky `u.Levitation`/`u.Flying`).
Lava Fire+Wwalk+oerodeproof boots / Upolyd likes_lava. Monster
`is_swimmer`/`m_in_air` unchanged. Did not pull `passes_walls`.
Filled D-1098 hash `cdb72162`. Rotated #1383. Open 9 (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1395** **44**/44; next
@**#1400**).
**Verified:** private canary **52**/52; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Public traces **unhit**.
**Next:** Open `teleport.c` `goodpos` `passes_walls` +
`may_passwall` early-out. Not youmonst swim.
**Blocked:** none.
