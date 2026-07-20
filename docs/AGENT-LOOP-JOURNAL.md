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
## 2026-07-20 14:25 — #998 LCP 555 fleeck monflee falsified (D-0854)
- Objective: seed0383 LCP 555 C Monnam(430) vs JS mon(383) @199.
- C locus: probed; not distfleeck→monflee (monmove.c:564 would burn
  core rnd before Monnam).
- Falsified: after core 16751 (2nd fleeck post m_move rn2(24)) C emits
  7×rndmonnam with zero core before next fleeck; site tag is stale
  last-core. JS next display = postmov mon_glyph@16754. No JS change.
- Verification: green+strict PASS; seed0383 Scr 201 RNG FULL; LCP 555.
- Next: identify C caller of Monnam×7 post-2nd-fleeck (pline/state dump).

## 2026-07-20 14:10 — #997 dochug Hallu idle newsym (D-0853)
- Objective: seed0383 dim-seq from mismatch idx 398 → @195/@198.
- C locus: monmove.c dochug switch Hallu newsym on NOTHING/DONE/NOMOVES
  after 2nd distfleeck (≈931); C call 17281 ~drn2(383).
- Diagnosis: first cell miss was **@198** (levtport @195 already OK).
  Abs LCP 553 = missing idle Hallu mon_glyph between fleeck rn2(5)s;
  #977/@172 Scr−2 was a different window — re-port does not regress.
- Change: `dochug` Hallu `newsym(mx,my)` for NOMOVES/NOTHING/DONE.
- Verification: LCP **553→555**; firstFail **198→199**; Scr **201**
  RNG FULL; cursors 218; green+strict PASS; cohort 8/8.
- Next: LCP 555 C Monnam(430) vs JS mon(383); screen @199+.

## 2026-07-20 13:55 — #996 gulpmu flush+vision_off together (D-0852)
- Objective: seed0383 @195; JS vs C `~drn2` inventory gulp→@195.
- C locus: mhitu.c gulpmu `display_nhwindow` + `vision_recalc(2)`.
- Diagnosis: pre-gulp dims≡C; first mismatch missing 8×~drn2(5) at bat
  engulfs (core 11051); JS then double once-per-input `swallowed(0)`
  (16×383 vs C 8) because More did not consume `l`/`space`. Flush or
  warns alone ±8; together match C.
- Change: `gulpmu` `await flush_topl_more()` + Hallu
  `vision_off_newsym_gbuf({useLiveViz:true})` before `vision_recalc(2)`.
- Verification: Scr **201**/219 RNG FULL; gulp dims match→~16749;
  green+strict PASS; cohort 8/8.
- Next: dim-seq from mismatch idx 398 → @195.

## 2026-07-20 13:41 — #995 public score cadence
- Objective: mandatory 5-iter full `sessions` score refresh.
- C locus: n/a (docs only; post-#993/#994 no JS peel).
- Change: measured **38/44** PASS; Scr **8998**/11405 (+2 vs #990 =
  seed0383 194→196); RNG **666643**/792838 (+61 = seed0399
  10340→10401); speed `35+0.24/turn`. seed0383 still 196/219 RNG FULL
  @195 Hallu; warn 38 vs C 45 open.
- Verification: green+strict PASS; full suite `__RESULTS_JSON__`.
- Next: JS vs C `~drn2` inventory gulp→@195; flush parked (D-0841).

## 2026-07-20 13:40 — #994 gulpmu warn-only×8 falsified (D-0852)
- Objective: seed0383 @195; C DISP gulp→expel falsifier + warn burns.
- C locus: mhitu.c gulpmu `vision_recalc(2)` / display.c display_warning.
- Diagnosis: C ice-gulp DISP = Monnam `~drn2(430)+~(2)` then **8×~drn2(5)**
  then uswldtim then swallowed. JS burn-only×9 included `u_at` engulfer
  (core 11527); skip hero cell → ×8 core FULL but Scr **196→174** and
  breaks @195 (baseline @195 matched without gulp warns).
- Falsified: gulpmu warn-only burns alone — do not retry; need full
  `~drn2` inventory gulp→@195 and/or display_nhwindow+warns together.
- Verification: green+strict PASS; seed0383 Scr **196** RNG FULL (revert).
- Next: JS vs C display-rng dims gulp→@195; flush parked.

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

