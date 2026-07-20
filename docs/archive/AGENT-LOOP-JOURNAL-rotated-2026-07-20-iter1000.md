# Agent loop journal archive (rotated at #1000)

Entries #985–#990 and older tails from live journal.

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

