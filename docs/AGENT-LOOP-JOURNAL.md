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
## 2026-07-20 13:27 — #993 gulpmu Hallu vision_off falsified (D-0852)
- Objective: seed0383 @195; close remaining warn gap after D-0852.
- C locus: mhitu.c gulpmu `vision_recalc(2)`; display.c display_warning.
- Diagnosis: dlvl12 Hallu `docrt` can run with empty viz (cells=0) after
  gulpmu `vision_recalc(2)` without warn burns; successful menu docrt +
  goto_leave each burn 9×5. Session warn 38 vs C 45 (−7).
- Falsified: Hallu `vision_off_newsym_gbuf` in gulpmu → session warn 45
  but Scr **196→174**; burn-only spatial rn2(5) → core RNG 11527;
  memory restore after vision_off still Scr 174. No JS kept.
- Verification: green+strict PASS; seed0383 Scr **196** RNG FULL (baseline).
- Next: C ~drn2 gulp→expel window vs JS; display_nhwindow before vr(2)
  (D-0841) may own timing; do not retry gulpmu vision_off.

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

