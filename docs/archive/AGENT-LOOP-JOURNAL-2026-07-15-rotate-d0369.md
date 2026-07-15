# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-15 05:29 — #380 score + D-0359 continue_run smudge
- Objective: public score (#380÷5) + seed0009 RNG @3521 `rnd(5)` vs `mcalcmove`.
- C locus: `hack.c` `domove`/`maybe_smudge_engr`; `allmain.c` continue-run;
  `cmd.c` `set_move_cmd` DOMOVE_WALK/RUSH.
- Change: smudge only when RUSH|WALK succeeded; clear `domove_attempting`
  each step; set flags on first walk/run (D-0359). seed0009 PASS.
- Verification: suite **24/44** Scr **3626**/11405 RNG **240535**/792838
  `19+0.12/turn`; green+strict; cohort 24 PASS.
- Next: pick shared blocker (seed0004/0002/0006/0007/0012/quest).

## 2026-07-15 05:20 — D-0358 death disclose before RIP
- Objective: seed0009 @63 attributes yn vs tombstone (CURRENT).
- C locus: `end.c` `disclose`; `insight.c` enlightenment; `dungeon.c`
  `init_mapseen`/`show_overview`; `wintty` fullscreen `--More--` col 1.
- Change: wire a/v/g/c/o; gameover enlightenment; mklev `init_mapseen`;
  overview `(end)` + ATR_NONE final headings (D-0358).
- Verification: Scr **63→73**/73; RNG still **3708**/3713 (@3514
  mcalcmove); green+strict; cohort 23 PASS.
- Next: seed0009 RNG @3514 `rn2(12)` vs JS `rnd(5)`.

## 2026-07-15 05:05 — D-0357 swim_move_danger + drown/lava
- Objective: seed0009 @45 pool-avoid `--More--` (CURRENT).
- C locus: `hack.c` `swim_move_danger`/`pooleffects`; `cmd.c` `do_reqmenu`;
  `trap.c` `drown`/`lava_effects`.
- Change: ParanoidSwim avoid+tip; `m`→nopick; pooleffects→drown crawl +
  lava `d(6,6)`+`done(BURNING)` (D-0357).
- Verification: Scr **49→63**/73 RNG **3708**; @45–@62 match; next @63
  attrs yn vs RIP; green+strict; cohort 23 PASS.
- Next: BURNING disclose order (attributes before tombstone).

