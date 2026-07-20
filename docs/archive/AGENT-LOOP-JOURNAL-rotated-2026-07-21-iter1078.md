# Rotated from AGENT-LOOP-JOURNAL.md @#1078

## 2026-07-20 23:32 — #1064 D-0914 mk_knox_portal place (wizard)
- Objective: seed4500 @50844 C `mkshop` `rnd(100)` vs JS `rn2(7)`
- C locus: `mklev.c` `mk_knox_portal`; `dungeon.c` `insert_branch`
- Change: under `playmode:debug`/`wizard`, C still burns `rn2(3)` but
  does not defer — depth-eligible vaults assign Ludios `end1` +
  `place_branch`. JS stub burned RNG then left portal floating, so
  later vaults re-burned `rn2(3)` and shifted shop gate. Named omit:
  non-debug deferral already matched; portal dest polish.
- Verification: prefix **50844→52643** RNG **52967** Scr **608**;
  green+strict PASS; cohort 10/10 PASS.
- Next: @52643 C `distfleeck` `rn2(5)` vs JS `rn2(1)`.

## 2026-07-20 23:18 — #1063 D-0913 `x`/doswapweapon
- Objective: seed4500 @50338 C `distfleeck` `rn2(5)` vs JS `rn2(3)`
- C locus: `cmd.c` `'x'`→`doswapweapon`; `worn.c` `setworn` twoweap clear
- Change: wire `rhack` `'x'`; `setuwep`/`setuswapwep` clear twoweap;
  ready_weapon are/can_no_longer. Named omit: cantwield ridiculous; #swap.
- Verification: prefix **50338→50844** RNG **50936** Scr **594**;
  green+strict PASS; cohort 5/5 PASS (seed4500 still FAIL later).
- Next: @50844 C `mkshop` `rnd(100)` vs JS `rn2(7)`.
