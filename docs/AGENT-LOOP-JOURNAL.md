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

## 2026-07-19 01:52 — #792 D-0711 cream pie + D-0712 #wipe
- Objective: seed0108 @2807 use_cream_pie (CURRENT primary).
- C locus: `apply.c` `use_cream_pie`; `do.c` `dowipe`/`wipeoff`.
- Change: port cream-pie apply (`rnd(25)` blindinc); EXT_CMDS `#wipe`+
  wipeoff occupation (glop-off → `make_blinded(0,TRUE)`). D-0711/12 fixed.
- Verification: green+strict PASS; seed0108 **2807→2864**; cohort 14/14
  prior PASS stay PASS.
- Next: @2864 C `exercise` `rn2(2)` vs JS `rn2(7)` (#polyself); or D-0708.

## 2026-07-19 01:41 — #791 D-0710 #rub / dorub
- Objective: seed0108 @2778 dochug nearby (CURRENT primary).
- C locus: `apply.c` `dorub` / `wield.c` `wield_tool`; `hack.c` `nomul`.
- Change: `#rub` was AC-only; `n` became SE move (dist2 2→8). Port
  `dorub`+`wield_tool`+cmdq; `nomul` clears `_cmdq_canned`. D-0710 fixed.
- Verification: green+strict PASS; seed0108 **2778→2807**; cohort 10/10.
- Next: @2807 `use_cream_pie` rnd(25) (D-0711); or D-0708.

## 2026-07-19 01:30 — #790 score + D-0710 diagnose
- Objective: mandatory full `sessions` score (#790 % 5); peel seed0108.
- C locus: `monmove.c` `dochug` want_move / `monnear`.
- Change: no code fix. Score **35/44**, Scr **7654**/11405,
  RNG **513214**/792838 (64.73%), speed `36+0.19/turn`.
  D-0710: tame feline @2778 JS `nearby=false` (dist2=8) skips
  wanderer `rn2(4)`; C has `nearby=true` ⇒ earlier geometry.
- Verification: green+strict PASS; DIAG removed; suite documented.
- Next: pre-@2778 pet/hero adjacency; or seed0014 D-0708.

## 2026-07-19 01:24 — #789 D-0709 #wizwish + D-0708 sharpen
- Objective: CURRENT primary; pivoted seed0108 after D-0708 cell-ID stall.
- C locus: `cmd.c` extcmdlist `wizwish` → `wiz_wish`/`makewish`.
- Change: `EXT_CMDS` register `wizwish` (no AUTOCOMPLETE, ≡C).
  Also sharpened D-0708: C dest~(24,12); omit suspect `(22,10)`.
- Verification: green+strict PASS; seed0108 **2772→2778**; cohort 10/10.
- Next: seed0108 @2778 dochug rn2(4); or seed0014 D-0708.

## 2026-07-19 01:10 — #788 D-0708 mfndpos cnt (diagnose)
- Objective: seed0014 @49039 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.
- C locus: `monmove.c` `m_move`/`mfndpos` (peaceful gnome).
- Falsified: squeeze/gas already out; also hero one-step travel onto
  gnome neighbor (impossible from `(23,8)`). Mapped: same gnome
  `@48985` cnt=8 @`(24,11)` matched →`(23,11)`; JS 6 ROOM poss;
  `u=(24,9)`; hero-on-any-poss → cnt=5. No JS trap/mon on poss.
- Verification: green+strict PASS; DIAG removed; no code change.
- Next: which of 6 C omits (C-only trap/mon / earlier geometry /
  missing mfndpos arm); or seed0108.

## 2026-07-19 00:52 — #787 D-0708 mfndpos cnt (diagnose)
- Objective: seed0014 @49039 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.
- C locus: `monmove.c` `m_move`/`mfndpos` (not `distfleeck` body).
- Falsified: distfleeck arity; single-flank corners (@3061); squeeze/gas
  on `(22,10)`. Real: peaceful gnome `mfndpos` cnt 6 vs C 5.
- Verification: green PASS; no code change. Drop-any →49300 experiment.
- Next: which neighbor C omits + C predicate; or travel/map shared blocker.

## 2026-07-19 00:30 — #786 D-0707 corpse_chance always-TRUE
- Objective: seed0014 @43553 C `next_ident`/`rndmonst_adj` vs JS `rn2(3)`.
- C locus: `mon.c` `corpse_chance` bigmonst/lizard/golem/mplayer/rider/isshk.
- Change: port always-TRUE arms in `uhitm`/`mhitm`/`trap` `corpse_chance`.
- Verification: green+strict PASS; prefix **43553→49039** RNG **49495**;
  cohort 33/33 PASS. Scr still 575.
- Next: seed0014 @49039 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.

## 2026-07-19 00:22 — #785 score + D-0706 monster kick
- Objective: mandatory full `sessions` score (#785÷5); seed0014 @43341 kick.
- Score: **35/44** Scr **7638**/11405 RNG **507306**/792838 (63.99%)
  `38+0.17/turn` R² 0.783. Δ vs #780: Scr +19, RNG +8245.
- C locus: dokick.c maybe_kick_monster / kick_monster / kickdmg.
- Change: port monster-kick path; export attack_checks/passive; martial().
- Verification: green+strict PASS; prefix 43341→43553 RNG 43636 Scr 575;
  cohort 13/13; full suite 35/44.
- Next: seed0014 @43553 next_ident / rndmonst_adj.

## 2026-07-19 00:13 — #784 D-0705 lookaround mon_visible + Wait invis
- Objective: seed0014 @43308 C distfleeck rn2(5) vs JS kick_ouch rn2(2).
- C locus: hack.c lookaround mon_visible; uhitm.c attack_checks Wait!.
- Cause: JS lookaround assumed all mons seen → ended H run on invisible
  bugbear; yank never More'd; walk-in meleed instead of Wait!.
- Rejected: flush_topl_more before every parse get_count (broke green).
- Change: js/cmd.js lookaround mon_visible+M_AP; js/uhitm.js Wait!.
- Verification: green+strict PASS; prefix 43308→43341 Scr 575; cohort
  12/12 PASS.
- Next: seed0014 @43341 maybe_kick/gethungry vs kick_ouch stub.

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

