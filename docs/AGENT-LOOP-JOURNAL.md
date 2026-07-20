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

## 2026-07-20 08:35 — #969 seed0383 initedog set_malign (D-0839)
- Objective: seed0383 @13689 C peace_minded rn2(1) vs JS rn2(4).
- C locus: dog.c initedog → set_malign after mpeaceful=1.
- Change: JS initedog called set_malign + mavenge=0 + domestic
  minimumtame (was keeping renegade malign=+3 on starting pet).
- Verification: seed0383 RNG FULL 16915; Scr 146/219; green+strict;
  cohort 36/36 PASS.
- Next: seed0383 screen peel (RNG matched).

## 2026-07-20 08:26 — #968 seed0383 unstuck docrt Hallu (D-0838)
- Objective: seed0383 @11524 C getbones vs JS combat (post-expel hallu).
- C locus: mon.c unstuck→docrt; display.c docrt memory show_glyph;
  mhitu.c gulpmu swallowed(1).
- Change: unstuck awaits docrt (not vision_recalc(1)); docrt memory
  paints remembered glyphs (no Hallu newsym); gulpmu swallowed(1).
- Verification: green+strict PASS; cohort 36/36 PASS; prefix
  **11524→13689** (RNG 11527→13695; Scr 144).
- Next: seed0383 @13689 C peace_minded rn2(1) vs JS rn2(4) (D-0839).
## 2026-07-20 08:20 — #967 seed0383 Monnam hallu / swallowed (D-0838)
- Objective: seed0383 @11524 C getbones vs JS combat (More/key from hallu).
- C locus: do_name.c rndmonnam; display.c swallowed/swallow_to_glyph;
  potion.c make_hallucinated; allmain.c Hallu see_*/swallowed(0).
- Change: display ISAAC + bogusmon/rndmonnam/Monnam; mon/obj_glyph hallu;
  swallowed+docrt/newsym; allmain Hallu refresh. First 3 names match.
- Verification: green+strict PASS; cohort 5/5 PASS; still @11524 Scr 144.
- Next: post-expel Hallu see_* burns → 4th name black pudding; then getbones.
## 2026-07-20 07:42 — #966 seed0383 getmattk mspec + cold (D-0837)
- Objective: seed0383 @11400 C mattacku rnd(20) vs JS fleeck.
- C locus: mhitu.c getmattk mspec_used subst; uhitm.c mhitm_ad_cold;
  zap.c destroy_items.
- Change: ice vortex mspec_used kept AT_ENGL in JS; port getmattk→TUCH,
  mhitm_ad_cold_u, export/call destroy_items (D-0837).
- Verification: green+strict PASS; cohort 36/36 PASS; prefix
  **11400→11524** (RNG matched 11437→11527; Scr 144).
- Next: seed0383 @11524 C getbones rn2(3) vs JS rn2(20).

## 2026-07-20 07:34 — #965 public score cadence
- Objective: mandatory full `sessions` score (iter % 5 == 0).
- C locus: n/a (score+docs); diagnosed seed0383 @11400 only.
- Change: no JS patch. Documented suite **38/44** Scr **8946**/11405
  RNG **661122**/792838 (83.39%); Δ vs #960 Scr +9 RNG +632.
  @11400: C `AC_VALUE`→`rnd(2)` (hack.h neg AC) then `rnd(20)` hit;
  JS matches AC roll then fleeck `rn2(5)` — left mattacku w/o hit.
- Verification: green+strict PASS; full `sessions` 38/44.
- Next: seed0383 @11400 dump range2/aatyp/find_offensive after AC_VALUE.

## 2026-07-20 07:30 — #964 seed0383 abuse_dog / xkilled luck (D-0836)
- Objective: seed0383 @11372 C abuse_dog rn2(9) vs JS rn2(6).
- C locus: dog.c abuse_dog; sounds.c yelp/growl; uhitm.c hmon_hitmon_pet;
  mon.c xkilled cleanup change_luck.
- Change: port abuse_dog + yelp/growl (Hallu h_sounds); wire hmon pet
  path; xkilled peaceful/tame luck rn2(2) + tame adjalign(-15).
  mtame-intimacy hyp falsified — missing hmon_hitmon_pet.
- Verification: green+strict PASS; cohort 36/36 PASS; seed0383 prefix
  **11372→11400** (RNG matched 11423→11437; Scr 144).
- Next: seed0383 @11400 C mattacku rnd(20) vs JS rn2(5).

## 2026-07-20 07:20 — #963 seed0383 wizintrinsic hallu (D-0835)
- Objective: seed0383 @10843 C exercise rn2(2) vs JS wipe rn2(82).
- C locus: wizcmds.c wiz_intrinsic; potion.c make_hallucinated;
  attrib.c exerper Hallucination → exercise(A_WIS,FALSE).
- Change: port make_hallucinated + #wizintrinsic menu (HALLUC arm);
  wire EXT_CMDS. Site-shift/fog hyp falsified — missing timed Hallu.
- Verification: green+strict PASS; cohort 36/36 PASS; seed0383 prefix
  **10843→11372** (RNG matched 11054→11423; Scr 142→144).
- Next: seed0383 @11372 C abuse_dog rn2(9) vs JS rn2(6).

## 2026-07-20 07:05 — #962 seed0383 fog vapor TTL (D-0834)
- Objective: seed0383 @10646 C fleeck rn2(5) vs JS rn2(3).
- C locus: region.c inside_gas_cloud / run_regions / add_region;
  monmove.c m_everyturn_effect.
- Change: track mons in gas regions; fog ttl+=5 in run_regions; wire
  m_in_out_region (want_move/minvis hyp falsified — was expired vapor recreate).
- Verification: green+strict PASS; cohort 36/36 PASS; seed0383 prefix
  **10646→10843** (Scr 142; cursors 172→181).
- Next: seed0383 @10843 C exercise rn2(2) vs JS wipe_engr rn2(82).
