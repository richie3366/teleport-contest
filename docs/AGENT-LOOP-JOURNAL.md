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
## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-20 11:28 — #983 seed0383 display-stream timeline (D-0847)
- Objective: display-RNG skew before moves=11 see_objects @172.
- C locus: display.c swallowed/see_objects; mhitu.c gulpmu/expels;
  mon.c unstuck→docrt; wizcmds.c wiz_intrinsic docrt.
- Falsified: +N before see_objects (any dim) cannot hit C `)+[[`;
  naive docrt/swallowed cls+bot reorder → RNG 11527 (reverted).
  Timeline: Hallu@8 swallowed → 8×swallowed → ice expels@10 → free
  see_objects@11. No production JS retained.
- Verification: green+strict PASS; seed0383 Scr 174 RNG FULL.
- Next: burn-site inventory post-unstuck docrt/mnexto before see_mon@11.

## 2026-07-20 11:12 — #982 seed0383 @172 = moves=11 Hallu (D-0847)
- Objective: why @172 4 Hallu ROOM objs skew (thought post-expel).
- C locus: display.c see_objects/newsym; rnd.c rn2_on_display_rng.
- Falsified: post-expel see_obj/docrt as @172 cause; flush as glyph
  fix; wrong fobj set. @172 is moves=11 see_objects (otyps
  397/124/176/344 → `+?=[`); display RNG unlogged (142 burns before);
  core RNG FULL can hide Hallu desync. No production JS change.
- Verification: green+strict PASS; seed0383 Scr 174 RNG FULL.
- Next: display-RNG skew since Hallu/wizintrinsic before moves=11.

## 2026-07-20 10:57 — #981 seed0383 Hallu see_objects burn map (D-0847)
- Objective: post-expel @172 4 Hallu ROOM objs after matching mons.
- C locus: display.c see_objects/newsym; mhitu.c expels/unstuck→docrt.
- Falsified: +N×462 (N=0..40) before see_objects; skip kelp(23,13)
  newsym; moves=11 timing. Measured: expel moves=12; see_obj leads
  with rn2(5) yellow-light warn on !cansee kelp then 4×462; JS
  `+?=\[` vs C `)+[[`. No production JS change (DIAG reverted).
- Verification: green+strict PASS; seed0383 Scr 174 (no flush).
- Next: C vs JS Hallu-burning fobj set (YL TEMP_LIT / docrt 4×462).

## 2026-07-20 10:45 — #980 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (measurement only; no port peel).
- Change or falsified theory: none. Suite **38/44**; Scr **8976**/11405
  (−2 vs #975; seed0383 176→174 after D-0846 no-flush); RNG
  **666600**/792838 flat; speed `32+0.23/turn`. D-0847 still open.
- Verification: green+strict PASS; full `sessions` `__RESULTS_JSON__`.
- Next: display-RNG expelled-More → expels/docrt/mnexto before see_*
  (D-0847); then gulpmu flush.

## 2026-07-20 10:41 — #979 seed0383 @172 Hallu objs (D-0847)
- Objective: why 4 Hallu see_objects ROOM burns skew after matching mons.
- C locus: display.c see_monsters/see_objects; allmain once-per-input Hallu.
- Falsified: underfoot@see_mon; simple +N before see_objects; NUM_OBJECTS
  dims. With flush: firstMiss @172 Scr 175; 4 objs; mons match; exactly
  4×462 burns still wrong. Flush left parked.
- Verification: green+strict PASS; cohort 5/5; seed0383 Scr 174 (no flush).
- Next: display-RNG expelled-More → expels/docrt/mnexto before see_*.

## 2026-07-20 10:22 — #978 rloc_to newsym (D-0846)
- Objective: seed0383 @173 post-expel Hallu display-RNG before flush.
- C locus: teleport.c rloc_to_core newsym(old)+newsym(new); display.h covers_objects.
- Change: `rloc_to` remove+newsym(old)/place/newsym(new); covers_objects
  ≡ is_pool&&!Underwater. With flush: @173 mons match, 4 ROOM objs remain.
- Verification: seed0383 Scr 174 RNG FULL (no flush); green+strict PASS;
  cohort 5/5 PASS.
- Next: 4 Hallu see_objects ROOM burns after matching see_monsters; flush.

## 2026-07-20 10:05 — #977 see_traps glyph_is_trap (D-0845)
- Objective: seed0383 @172 post-expel Hallu display-RNG before flush.
- C locus: display.c see_traps glyph_is_trap(_glyph_at); teleport.c rloc_to newsym.
- Change: `see_traps` only newsym when disp_ch is trap glyph. Falsified
  dochug NOTHING/DONE Hallu newsym and rloc_to/2nd-expel +1 (Scr→174).
- Verification: seed0383 Scr 176 RNG FULL; green+strict PASS; cohort 5/5.
- Next: reconstruct C burn between expelled More and see_monsters (not
  blanket rloc_to); then 4 objs; flush.

## 2026-07-20 09:57 — #976 map_object Hallu statue memory (D-0844)
- Objective: seed0383 @172 post-expel Hallu display-RNG before flush.
- C locus: display.c map_object Hallu+STATUE memory random_obj_to_glyph.
- Change: `map_object` — statue display vs memory burns; diagnosed @172
  as −1 display burn before once-per-input Hallu see_* (mons align with
  +1 dummy; 4 objs remain). Statue fix does not move Scr 176.
- Verification: seed0383 Scr 176 RNG FULL; green+strict PASS; cohort 6/6.
- Next: missing burn in post-expel docrt/mnexto/postmov; then 4 objs; flush.

## 2026-07-20 09:40 — #975 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (measurement only; no port peel).
- Change or falsified theory: none. Suite **38/44**; Scr **8978**/11405
  (+30 vs #970 from D-0840…D-0843); RNG **666600**/792838 flat;
  speed `32+0.23/turn`. seed0383 still Scr 176 / flush parked @172.
- Verification: green+strict PASS; full `sessions` `__RESULTS_JSON__`.
- Next: post-expel `docrt`/`see_monsters` Hallu display-RNG @172; then flush.

## 2026-07-20 09:35 — #974 seed0383 HI_METAL + DEC o/s (D-0843)
- Objective: Hallu display-RNG / swallow patchwork before gulpmu flush.
- C locus: color.h HI_METAL≡CLR_CYAN; dat/symbols S_sw_tc/bc; display.c swallowed.
- Change: extractor HI_METAL 7→6 (+ HI_* aliases); DEC→Unicode keep o/s;
  flush re-test → miss moves to @172 post-expel see_monsters (reverted).
- Verification: seed0383 Scr **176**/219 RNG FULL; green+strict; cohort 12/12.
- Next: post-expel docrt/see_monsters Hallu burn skew @172; then flush.

## 2026-07-20 09:16 — #973 seed0383 DECgfx swallow (D-0842)
- Objective: seed0383 stomach cells + revise gulpmu flush blocker.
- C locus: dat/symbols DECgraphics S_sw_tc/ml/mr/bc; display.c swallowed.
- Change or falsified theory: swallow_sym DEC o/x/x/s+decgfx. Flush
  re-test: 141–174 OK; bat Hallu patchwork display-RNG diverges
  (hjkl-reject falsified — steps[i].key=moves[i-1]). Flush reverted.
- Verification: seed0383 RNG FULL Scr 148; green+strict; cohort 10/10.
- Next: Hallu display-RNG burn skew before bat swallowed(1); then flush.

## 2026-07-20 09:06 — #972 seed0383 gulpmu More falsified (D-0841)
- Objective: seed0383 frame 141 engulfs-alone More (pre-stomach).
- C locus: mhitu.c gulpmu display_nhwindow(WIN_MESSAGE,FALSE).
- Change or falsified theory: flush_topl_more before swallowed —
  toplines 141–174 match; DECgfx cells still miss; RNG @11524.
  Cause: C More @171/@173 rejects k/l then space; JS takes space
  first. Reverted; RNG FULL Scr 148 restored.
- Verification: green+strict PASS; seed0383 RNG FULL Scr 148/219.
- Next: More hjkl-reject ownership before gulpmu flush; DECgfx swallow.

## 2026-07-20 08:47 — #971 seed0383 distant_name + hitmsg again (D-0840)
- Objective: seed0383 screen peel Scr 146 (RNG FULL).
- C locus: mon.c mpickstuff distant_name; mhitu.c hitmsg again.
- Change: mpickstuff uses distant_name(otmp,doname); hitmsg tracks
  hitmsg_mid/prev for consecutive same-aatyp " again". Rejected
  gulpmu flush_topl_more (RNG @11524).
- Verification: seed0383 Scr **148**/219 RNG FULL; green+strict;
  cohort 36/36 PASS.
- Next: gulpmu display_nhwindow More @141 (careful); DECgfx swallow.

## 2026-07-20 08:37 — #970 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score+docs; no port patch).
- Change: refreshed CURRENT Score from `__RESULTS_JSON__`; rotated
  journal #953–#961 → archive.
- Verification: green+strict PASS; suite **38/44**; Scr **8948**/11405
  (+2 vs #965); RNG **666600**/792838 (84.08%, +5478); speed
  `31+0.23/turn`. Notable non-PASS unchanged (seed0383 Scr 146/219
  RNG FULL; seed2200 229/230; seed0014/0399/2600/4500).
- Next: seed0383 screen peel (RNG matched).
