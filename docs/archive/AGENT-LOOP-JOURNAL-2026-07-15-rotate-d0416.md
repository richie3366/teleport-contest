# Rotated from AGENT-LOOP-JOURNAL.md (#447 / D-0416)

## 2026-07-15 16:15 — #432 seed0004 @9795 run_timers ROT_CORPSE (D-0405)
- Objective: seed0004 @9795 PRIMARY — dog_goal IS_ROOM / post-pickup keys.
- C locus: timeout.c run_timers/start_timer; dig.c rot_corpse; pickup.c
  query_objlist sortloot(SORTLOOT_LOOT|PACK).
- Change: real timer queue + floor rot_corpse from nh_timeout; floor pickup
  uses shared sortloot. Unrotted mklev jackal corpse made `c`/`d` pick
  corpse+sack → HVY EOTs (not bare key ownership).
- Verification: seed0004 RNG 9892→10399 Scr 233→241; miss @10370; green+
  strict PASS; cohort 23/23.
- Next: seed0004 @10370 resist_conflict rnd(20) vs dog_move rn2(16).
