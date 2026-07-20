# Rotated from AGENT-LOOP-JOURNAL.md @#1069

## 2026-07-20 21:53 — #1055 score + D-0905 Erinys peace_minded
- Objective: cadence full `sessions` @#1055; seed4500 @28249
  C `makemon` sleep `rn2(5)` vs JS `rn2(26)`.
- C locus: `makemon.c` `peace_minded` PM_ERINYS → `!u.ualign.abuse`.
- Change: port Erinys arm (was falling through to co-align
  `rn2(16+record)`). Named omit: MS_LEADER/GUARDIAN/NEMESIS msound.
  Score @#1055: **42/44** Scr **9898**/11405 RNG **717155**/792838
  (90.45%) `33+0.23/turn`.
- Verification: green+strict PASS; cohort 12/12; seed4500 prefix
  **28249→32538** Scr **302→308** RNG **28364→32592**.
- Next: @32538 nhlib shuffle rn2(3) vs rn2(79); leaderboard cron;
  cadence @#1060.

## 2026-07-20 21:50 — #1054 D-0904 level_tele find_hell
- Objective: seed4500 @18153 C `splev_initlev` `rn2(2)` vs JS `rn2(4)`
  after matched getbones + nhlib shuffle.
- C locus: `teleport.c` `level_tele` past-main arm; `dungeon.c`
  `find_hell`.
- Change: ^V “30” was clamping to castle via `get_level`; port
  `find_hell`→valley when past last main depth. Named omit:
  Quest/mines/sanctum deepest clamp; invoked gate.
- Verification: seed4500 prefix **18153→28249** Scr **302** RNG
  **18215→28364**; green+strict PASS; cohort 12/12 PASS.
- Next: @28249 C `makemon` `rn2(5)` vs JS `rn2(26)`; leaderboard cron;
  cadence @#1055.
