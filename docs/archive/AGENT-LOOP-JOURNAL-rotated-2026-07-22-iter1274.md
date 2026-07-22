## 2026-07-22 03:40 — #1259 D-0989 Is_box + ghitm

**Objective:** map-driven — Is_box kick arms / ghitm (CURRENT next
cluster after D-0988).
**C locus:** `dokick.c` Is_box/`ghitm`/`container_impact_dmg`;
`trap.c` `chest_trap`; `lock.c` `breakchestlock`; `shk.c`
`make_angry_shk`.
**Changed:** impact shatter; lock break/lid + chest_trap; ghitm;
export breakchestlock/chest_trap; thin make_angry/happy_shk —
D-0989. Deferred: hits_bars; costly_gold; petrify; tmp_at.
**Verified:** green+strict PASS; kick cohort **19**/20 (seed0009 Scr
72/73 pre-existing); seed0060 kick-search PASS. Rule #2: no fs.
**Next:** hits_bars/hit_bars; or flooreffects fire_damage/globby;
or absent.md thin (potion/scroll/vault).
**Blocked:** none.
