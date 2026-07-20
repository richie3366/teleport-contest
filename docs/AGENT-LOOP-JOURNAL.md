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
## 2026-07-20 13:15 — #992 D-0852 Hallu vision_recalc(2) warn burns
- Objective: seed0383 @195 Hallu; restore missing display_warning burns.
- C locus: vision.c `vision_recalc(2)` update loop; display.c
  `display_warning` / `docrt`; do.c `goto_level` leave.
- Change: Hallu-only `vision_off_newsym_gbuf({useLiveViz:true})` in
  `docrt` + `goto_level` leave; bones `_leave_viz_burned` skip.
  Falsified: global ctrl=2 loop (Scr 174); non-Hallu vision_off
  (cohort −screens). Stale `_leave_viz_snapshot` must not override
  live viz.
- Verification: seed0383 Scr **196** RNG FULL; green+strict PASS;
  cohort seed0002/0012/0013-restore/0360/0398 PASS.
- Next: remaining cluster0 warn gap / @195 cells; flush parked.

## 2026-07-20 12:51 — #991 seed0383 C ~drn2 falsifier (D-0852)
- Objective: C display-RNG inventory for seed0383 levtport→@195.
- C locus: display.c `display_warning` / `docrt` / `see_monsters`;
  rnd.c `rn2_on_display_rng(WARNCOUNT-1)`.
- Change: diagnosis only. Rerecorded with `NETHACK_RNGLOG_DISP=1`.
  C @195 = **70** (~drn2): pre-gen **19×5**+4×463+40×383; post-gen
  **7**. Session warn **45** vs JS **16** (`HWarning` set — not gap).
  Cluster1 counts match; values skew from missing warn burns.
- Verification: green+strict PASS; seed0383 Scr **194** RNG FULL;
  no JS patch.
- Next: menu-dismiss `docrt` warn-only `display_warning` path vs C.

## 2026-07-20 12:39 — #990 public score cadence
- Objective: mandatory 5-iter full `sessions` score refresh.
- C locus: n/a (docs only).
- Change: measured **38/44** PASS; Scr **8996**/11405 (+10 vs #985);
  RNG **666582**/792838 (flat); speed `32+0.23/turn`. seed0383 still
  194/219 RNG FULL @195 Hallu.
- Verification: green gate + strict PASS; full suite `__RESULTS_JSON__`.
- Next: seed0383 C `~drn2` for menu/goto/per-input display windows.

## 2026-07-20 12:45 — #989 seed0383 @195 display-rng inventory
- Objective: seed0383 @195 Hallu map after levtport materialize.
- C locus: wintty erase_menu_or_text→docrt; display.c docrt /
  see_monsters/objects; do.c goto_level.
- Change: diagnosis only. Confirmed menu-dismiss burns **45**
  (20×383 vision + 20×383 see_mon + 4×463 + 1×5); goto **4**;
  per-input **3** = the three miss cells. Falsified skip fullscreen
  menu `docrt` (Scr 194→192). No JS patch kept.
- Verification: seed0383 Scr **194** RNG FULL; green PASS; DIAG removed.
- Next: C `~drn2` for those three windows; flush parked.

## 2026-07-20 12:20 — #988 seed0383 @195 Hallu / D-0851
- Objective: seed0383 @195 Hallu map after materialize.
- C locus: do.c goto_level (docrt only); wintty erase_menu_or_text→docrt;
  display.c see_monsters/objects under Hallu.
- Change: drop post-docrt `vision_recalc(0)` in `goto_level` (not in C).
  Falsified as @195 cause (0 display burns). Mapped ~45 display-rng burns
  on levtport menu-dismiss `docrt` of old Dlvl:12 before new-level paint.
  Global skip of menu-pick docrt → Scr 194→192 (reverted).
- Verification: seed0383 Scr **194** RNG FULL; green+strict PASS;
  cohort 8/8 PASS.
- Next: menu-dismiss display-rng burn set vs C; flush parked.

## 2026-07-20 12:05 — #987 seed0383 xkilled poor titan (D-0850)
- Objective: seed0383 @178 `You kill the poor titan`.
- C locus: mon.c `xkilled` tame → `x_monnam(..., "poor", ...)`;
  do_name.c `x_monnam` adjective/ARTICLE.
- Change: export `x_monnam`; `mon_nam`→`x_monnam`; wire `xkilled` msg
  arm (wasinside/canspotmon/`mtame`).
- Verification: seed0383 Scr **193→194** RNG FULL; green+strict PASS;
  cohort 36/36 PASS.
- Next: @195 Hallu map after materialize; flush parked.

## 2026-07-20 12:00 — #986 seed0383 hliquid (D-0849)
- Objective: seed0383 Scr 184 — diagnose first content miss after D-0848.
- C locus: do_name.c `hliquid` / `hliquids[]`; pager.c `waterbody_name`.
- Change: stub `hliquid` → real table + `rn2_on_display_rng`; wire
  hack `waterbody_name` + fountain. @187 was matched-count confusion;
  first content miss was purified water / display-rng skew.
- Verification: seed0383 Scr **184→193** RNG FULL; green+strict PASS;
  cohort 36/36 PASS.
- Next: @178 xkilled tame `poor` x_monnam; @195 Hallu map; flush parked.

## 2026-07-20 11:51 — #985 score + MAIL_STRUCTURES objects (D-0848)
- Objective: mandatory full `sessions` score; seed0383 C ~drn2 dim falsifier.
- C locus: display.h `random_object`; objects.h `SCR_MAIL`/`MAIL_STRUCTURES`;
  scripts/extract-objects.py (parity with extract-monsters D-0606).
- Change: C DISP rerecord @172 = 66×383+8×463+2×5; JS had 462. Root =
  missing `-DMAIL_STRUCTURES` → NUM_OBJECTS 480→481. D-0847 closed.
- Verification: green+strict PASS; cohort 36/36; suite **38/44** Scr
  **8986**/11405 (+10) RNG **666582**/792838 (−18 seed0399); seed0383
  Scr **184**/219 RNG FULL.
- Next: seed0383 first miss @184; flush still parked.

## 2026-07-20 11:42 — #984 seed0383 free-window burn inventory (D-0847)
- Objective: C vs JS display burns post-unstuck docrt/mnexto before @172.
- C locus: display.c docrt/newsym/see_*; mhitu.c expels/unstuck; vision.c
  vision_recalc; teleport.c rloc_to.
- Change or falsified theory: DIAG inventory only (reverted). JS free
  window: docrt 21×383+4×462, see_mon 21×383+1×5, mnexto+post 2×383,
  once-in 22×383+1×5+4×462. Engulfer on hero skips mon_glyph. No gas
  region on burn cells. Need C ~drn2 dim diff — not +N at see_objects.
- Verification: green+strict PASS; seed0383 Scr 174 RNG FULL.
- Next: record C with NETHACK_RNGLOG_DISP=1; diff ~drn2 vs JS inventory.

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
