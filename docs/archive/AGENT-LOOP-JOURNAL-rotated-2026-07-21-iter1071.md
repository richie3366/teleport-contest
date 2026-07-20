# Rotated from AGENT-LOOP-JOURNAL.md @#1071

## 2026-07-20 22:05 — #1056 D-0906 hellfill + create_maze
- Objective: seed4500 @32538 C nhlib shuffle `rn2(3)` vs JS `rn2(79)`
  after matched getbones (hellfill.lua / create_maze).
- C locus: `dat/hellfill.lua`; `mkmaze.c` `create_maze`; `sp_lev.c`
  `LVLINIT_MAZE`/`lspo_gold`; `mklev.c` mktrap Inhell FIRE bias.
- Change: port `create_maze`+`LVLINIT_MAZE`; `load_hellfill` 7 styles +
  populatemaze (ROCK_CLASS, gold `rnd(200)`, Inhell traps, LLL→Z).
  Named omit: rnd_hell_prefab; Invocation_lev VS; makemaz(""); fakewiz.
- Verification: green+strict PASS; cohort 10/10; seed4500 prefix
  **32538→49776** Scr **308→459** RNG **49921**/108275.
- Next: @49776 C `mcalcmove` `rn2(12)` vs JS `rnd(20)`; leaderboard
  cron; cadence @#1060.
