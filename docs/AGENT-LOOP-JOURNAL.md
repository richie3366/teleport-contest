# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## ## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-18 23:56 — #783 D-0704 find_misc whip/invis/yank
- Objective: seed0014 @43068 C `find_misc` rn2(5) vs JS rn2(28).
- C locus: `muse.c` find_misc BULLWHIP `!rn2(5)` + POT_INVISIBILITY;
  use_misc MUSE_BULLWHIP `rn2(4)`.
- Cause: invent whip+invis; JS only had speed → m_move rn2(28); later
  whip success needed yank body.
- Change: `js/muse.js` find_misc/use_misc gain-level/invis/bullwhip.
- Verification: green+strict PASS; prefix 43068→43308 Scr 575; cohort
  20/20 PASS.
- Next: seed0014 @43308 C `distfleeck` rn2(5) vs JS rn2(2).

## 2026-07-18 23:46 — #782 D-0703 mintrap HOLE already_seen
- Objective: seed0014 @40196 C `mintrap` rn2(4) vs JS rn2(5).
- C locus: `trap.c` mintrap — `already_seen = mon_knows_traps || (HOLE &&
  !mindless)`.
- Cause: gnome on HOLE with mtrapseen=0; JS omitted HOLE clause.
- Change: `js/trap.js` mintrap OR-in HOLE && !mindless.
- Verification: green+strict PASS; prefix 40196→43068 Scr 575; cohort
  12/12 PASS.
- Next: seed0014 @43068 C `find_misc` rn2(5) vs JS rn2(28).

## 2026-07-18 23:45 — #781 D-0702 travel seenv-detour quiet-rest
- Objective: seed0014 @36031 (NOTES said exercise rn2(19) vs rn2(5)).
- C locus: `hack.c` findtravelpath/TEST_TRAV; `cmd.c` dotravel_target.
- Falsified: exercise formula (already correct). Real: `_>` travel walked
  west on seenv-only detour; C rests → `n` boulder `exercise(A_STR)`.
- Change: prefer couldsee path; seenv-only worsen-dist → quiet-rest;
  trap/liquid avoid + tight-diag load squeeze in BFS.
- Verification: green+strict PASS; prefix 36031→40196 Scr 574; cohort
  seed0004/0007 stay PASS (couldsee-only alone broke them).
- Next: seed0014 @40196 C `mintrap` rn2(4) vs JS rn2(5).

## 2026-07-18 23:15 — #780 score + D-0701 mons_see_trap
- Objective: mandatory full score (#780÷5) + seed0014 @35246.
- Score: **35/44** Scr **7619**/11405 RNG **499061**/792838 (62.95%)
  `36+0.17/turn` (pre-fix suite).
- C locus: `mondata.c` `mons_see_trap`; `trap.c` dotrap/mintrap.
- Change: wire sight fan-out so nearby mons learn traps → mfndpos
  skips known cells; shortsighted + unicorn NOTONL in `m_move`.
- Verification: green+strict PASS; seed0014 prefix 35246→36031
  (36178 RNG / 566 Scr); cohort PASS.
- Next: seed0014 @36031 C `exercise` `rn2(19)` vs JS `rn2(5)`.

## 2026-07-18 23:05 — D-0700 ohitmon rolling boulder re-extract
- Objective: seed0014 @36031 travel/dopush vs continue_run.
- C locus: `mthrowu.c` `ohitmon` (`!objgone && range==-1` re-extract).
- Change: `js/mthrowu.js` — rolling boulder continues after mon hit; rests
  at launch2 (56,10). Root of missing adjacent boulder for travel/`n`.
- Verification: green+strict PASS; cohort 16/16 (incl. seed0361); seed0014
  prefix 36031→35246 (correct rest exposes earlier mdig miss).
- Next: seed0014 @35246 C `mdig_tunnel` vs JS `rn2(8)`.

## 2026-07-18 22:47 — D-0700 travel stop before n-dopush (diagnosed)
- Objective: seed0014 @36031 C `exercise` `rn2(19)` vs JS `rn2(5)`.
- C locus: `hack.c` lookaround/findtravelpath/dopush; `cmd.c` dotravel_target.
- Falsified: AVAL/`exercise` skip; forced end_running after first travel step.
- Evidence: after `_/>/.` JS `continue_run` (multi=80 travel=1); C `rhack(n)`
  dopush; no adjacent boulder in JS (60,8/60,10/68,5 only).
- Verification: green+strict PASS; prefix still 36031; no js/ change.
- Next: C-cited travel-stop before `n` (lookaround trap/TEST_TRAV/boulder).

## 2026-07-18 22:30 — D-0699 setworn ring-slot clear
- Objective: seed0014 @35611 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.
- C locus: `worn.c` `setworn`; `steal.c` `remove_worn_item`;
  `do_wear.c` ring put-on gates.
- Change: `setworn(null, W_RINGL|R)` clears `uleft`/`uright`; ring
  Glib/gloves/welded gates; `m_avoid_kicked_loc` in hostile `m_move`.
- Verification: prefix **35611→36031**, Scr **538**/714; green+strict
  PASS; cohort **35**/35.
- Next: @36031 C `exercise` `rn2(19)` vs JS `rn2(5)`.

## 2026-07-18 22:12 — D-0698 ohitmon mondied / corpse_chance
- Objective: seed0014 @33278 C `corpse_chance` `rn2(2)` vs JS `rn2(5)`.
- C locus: `mthrowu.c` `ohitmon`; `mon.c` `mondied` / `corpse_chance`.
- Change: `ohitmon` kill → `mondied` / `xkilled(NOMSG)`; export quiet
  `mondied` + `monkilled` in mhitm; export `xkilled`.
- Verification: prefix **33278→35611**, Scr **538**/714; green+strict
  PASS; cohort **33**/33.
- Next: @35611 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.

## 2026-07-18 22:07 — #775 score + D-0697 mines your_race
- Objective: mandatory full score (#775÷5); seed0014 @32023 create_monster.
- C locus: `sp_lev.c` `create_monster`; `mondata.h` `your_race`.
- Change: D-0697 — mines dwarf/gnome `your_race`→`rn2(3)` clear pm in
  `splev_create_monster`/`splev_room_monster`. Suite Score **35/44**
  Scr **7604** RNG **497349** (62.73%).
- Verification: prefix **32023→33278**, Scr **533→538**/714; green+strict;
  cohort **33**/33 PASS.
- Next: @33278 C `corpse_chance` `rn2(2)` vs JS `rn2(5)`.

## 2026-07-18 22:05 — #774 D-0696 door bump Fumbling()
- Objective: seed0014 @28552 C `exercise` `rn2(2)` vs JS `rn2(19)`.
- C locus: `hack.c` `test_move` closed_door autoopen / bump (`Fumbling`).
- Change: D-0696 — `cmd.js` uses `Fumbling()` (H||E) for impaired + bump
  instead of sticky `u.Fumbling` (was autoopen→`rn2(19)`).
- Verification: prefix **28552→32023**, Scr **515→533**; green+strict;
  cohort **33**/33 PASS.
- Next: @32023 C `create_monster` `rn2(3)` vs JS `rn2(79)` (descend).

## 2026-07-18 21:57 — #773 D-0695 unmul empty nomovemsg
- Objective: seed0014 trip `--More--` @22721 / @22868 mtrack desync.
- C locus: `hack.c` `unmul`; `timeout.c` FUMBLING `nomovemsg=""`.
- Change: D-0695 — `unmul` default only if `nomovemsg == null`; skip
  pline on `""`. Falsified: leftover-grid noises skip; more() keep-grid
  (regressed seed0002/0030 screens).
- Verification: prefix **22868→28552**, Scr **483→515**; green+strict;
  cohort PASS list intact.
- Next: @28552 C `exercise` `rn2(2)` vs JS `rn2(19)` (door-bump step).

