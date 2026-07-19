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
## 2026-07-19 14:47 — #880 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: documented suite aggregates in CURRENT.md.
  Confirmed seed0360 still @98505: C nhlib shuffle rn2(3) vs JS rn2(79).
- Verification: green+strict PASS; full suite **37/44**, Scr **8280**/11405,
  RNG **629155**/792838 (79.35%), speed `36+0.20/turn`. Δ vs #875:
  Scr 0, RNG **+21** (D-0775), PASS 0.
- Next: wizard3 load_special @98505 (nhlib shuffle after getbones).

## 2026-07-19 14:45 — #879 minliquid (D-0775); @98492→98505
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mon.c` `minliquid` / `movemon_singlemon`.
- Change or falsified theory: ported `minliquid` (lava+pool+eel).
  Recorder: C has mumak@(55,9) on LAVAPOOL, same row9 map as JS;
  C spends movement then dies in minliquid (no dochug). Falsified
  couldsee/missing-boulder/DEC-lava@61. Do not FORCE linedup.
- Verification: green+strict PASS; cohort 35/35; seed0360
  **98505**/98528 Scr **275**.
- Next: wizard3 @98505 nhlib shuffle after getbones; then hellfill.

## 2026-07-19 14:40 — #878 @98492 DEC `~`≠lava; river matched (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `nhlib.lua` hell_tweaks; `display.c` DEC.
- Change or falsified theory: no port patch. Falsified #877 “lava flanks
  @(58,9)/(60,9)”: DECgraphics `~` = S_room (or ice), lava is meta-``.
  JS@98492: mumak(55,9) LAVA→hero(59,9); path LAVA/LAVA/ROOM+boulder/ROOM;
  couldsee false → rn2(3). Wizard2 hell_tweaks: pools skip; river floor=682
  endpoints match C rndcoord idx 11/461/54/603 → lava@55–56. Falsified
  randline +xstart (C rndcoord returns relative; net identity). Do not FORCE.
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: recorder C `sobj_at(BOULDER,57,9)`/`couldsee(55,9)`; C visible
  lava@`(61,9)` vs JS ROOM+boulder; then wizard3 @98502.

## 2026-07-19 14:27 — #877 @98492 C-screen lava/warn (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `nhlib.lua` hell_tweaks; session screens.
- Change or falsified theory: no port patch. C Dlvl42: warn `'1'`@(55,9)
  + `q`@(60,10); (57,9) never revealed; lava `~`@(58,9)/(60,9) vs JS
  ROOM+boulder@(57,9). Falsified drop bounds2 +xstart (C fillsrect adds
  xstart). Do not FORCE.
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: recorder C-state boulder/couldsee/lava; or hell_tweaks cell pick;
  then wizard3 @98502.

## 2026-07-19 14:16 — #876 @98492 linedup probes (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `vision.c` couldsee; `mkmaze.c` extends.
- Change or falsified theory: no port patch. DIAG: mumak fleeck→linedup
  rn2→post (55,9→55,8); extends FlipY(13)=9 correct (not ymin=0/y=7).
  Probes: skip boulder rn2 (couldsee-true or lined_up-false) → **98502**.
  Do not FORCE.
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: C mumak pos / sobj_at(BOULDER,57,9) / blocking_terrain; then
  wizard3 @98502.

## 2026-07-19 14:04 — #875 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: documented suite aggregates in CURRENT.md.
- Verification: green+strict PASS; full suite **37/44**, Scr **8280**/11405,
  RNG **629134**/792838 (79.35%), speed `38+0.21/turn`. Δ vs #870:
  Scr 0, RNG 0, PASS 0 (flat). seed0360 still @98492.
- Next: @98492 C couldsee(55,9)/does_block vs JS vision block; then wizard3.
## 2026-07-19 14:05 — #874 @98492 fleeck/linedup call-path (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `vision.c` couldsee; `monmove.c` fleeck.
- Change or falsified theory: no port patch. DIAG: JS mumak (55,9)
  fleeck@98491 → linedup boulder rn2@98492 → post-fleeck; C @98492 is
  distfleeck (fits post-fleeck after lined_up without rn2). C step368
  has zero linedup rn2(3). viz_clear blocks at ROOM boulder (57,9);
  row10 lava corridor couldsee. Do not FORCE.
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: C couldsee(55,9)/does_block vs JS; then wizard3.
## 2026-07-19 13:50 — #873 map_cleanup (D-0774); @98492 still open
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `sp_lev.c` `map_cleanup`; `mthrowu.c` `linedup`.
- Change or falsified theory: ported `map_cleanup` before wallify/flip
  (asmodeus/orcus/wizard1–2). Falsified “cleanup removes LOS boulder”:
  preflip (57,13) is ROOM; only lava boulders (15,9)/(17,9) stripped.
  DIAG: mumak (55,9) on lava, boulder (57,9) ROOM, couldsee false.
- Verification: green+strict PASS; cohort **10/10**; seed0360 still
  **98492**/275.
- Next: C couldsee/see-around vs skip lined_up; then wizard3.
## 2026-07-19 13:36 — #872 @98492 gen boulder matched (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `sp_lev.c` `fill_empty_maze`/`flip_level_rnd`; `mthrowu.c` `linedup`.
- Change or falsified theory: no port patch. Falsified “C never placed
  LOS boulder”: C maze1xy (57,13) @86737 + flp=1 @90542 match JS.
  Hell boulder-walls percent false. Mumak not throws_rocks (ok).
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: post-gen/gameplay couldsee vs blocking_terrain vs skip lined_up;
  then wizard3.
## 2026-07-19 13:20 — #871 @98492 linedup boulder (D-0773 diag)
- Objective: seed0360 @98492 C distfleeck rn2(5) vs JS linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `sp_lev.c` `fill_empty_maze`/`flip_level`.
- Change or falsified theory: no port patch. DIAG: PM_MUMAK (55,9)→hero
  (59,9); path lava(56,9)+boulder(57,9); strip boulder → couldsee true
  (lava does not block). FORCE skip rn2 → prefix 98492→98502 then C
  getbones+nhlib shuffle (wizard3). Boulder from fill_empty_maze (57,13)
  + Y-flip (extends ymin=2,ymax=20). C lacks that LOS boulder.
- Verification: green+strict PASS; seed0360 still @98492 (no code change).
- Next: why C lacks boulder @(57,9) (placement/flip/destruction); then
  wizard3/hellfill after getbones shuffle.
## 2026-07-19 13:05 — #870 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: documented suite aggregates in CURRENT.md.
- Verification: green+strict PASS; full suite **37/44**, Scr **8280**/11405,
  RNG **629134**/792838 (79.35%), speed `35+0.21/turn`. Δ vs #865:
  Scr +2, RNG +12414 (D-0771/72 reflected), PASS 0. seed0360 still @98492.
- Next: @98492 why C skips linedup boulder rn2 (couldsee / m_move).
