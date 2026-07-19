# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```
## 2026-07-19 15:55 — #886 seed0360 @100738 bat HWALL diagnose (D-0779)
- Objective: seed0360 @100738 vampire bat mfndpos cnt vs C chcnt.
- C locus: `monmove.c:1970` / `mon.c` `mfndpos`; `sp_lev.c` load_special;
  `dat/Wiz-strt.lua` FlipY.
- Change or falsified theory: refined — cnt=4 = quasit@(34,1)+3×HWALL
  @(33–35,3); FORCE→100804; post-FlipY dump confirms HWALL from map `-`.
  Aligned Wiz-strt epilogue (link/remove/cleanup); no prefix Δ.
- Verification: green+strict PASS; cohort 5/5; seed0360 still @100738.
- Next: C runtime typ at post-FlipY (33–35,3) (D-0779).

## 2026-07-19 15:38 — #885 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: documented suite aggregates in CURRENT.md.
  Reflects D-0776…D-0778 gains since #880.
- Verification: green+strict PASS; full suite **37/44**, Scr **8297**/11405,
  RNG **634651**/792838 (80.05%), speed `35+0.21/turn`. Δ vs #880:
  Scr +17, RNG +5496, PASS 0. seed0360 still @100738 (D-0779).
- Next: Wiz-strt post-FlipY terrain @(33–35,3) vs C (D-0779).

## 2026-07-19 15:35 — #884 seed0360 @100738 bat mfndpos HWALL (D-0779)
- Objective: @100738 C rn2(6) vs JS rn2(5) m_move chcnt.
- C locus: `monmove.c:1970` / `mon.c` `mfndpos`; Wiz-strt post-FlipY.
- Change or falsified theory: Not a generic chcnt off-by-one. Vampire
  bat@(34,2) JS cnt=4 vs C≥7; rejects HWALL@(33–35,3)+quasit@(34,1).
  Matched `rn2(5)` was JS distfleeck vs C still in chcnt. FORCE-open
  those 3 walls → prefix **100738→100804**. No production patch;
  next is why C sees walkable terrain there.
- Verification: green+strict PASS; focused FAIL @100738; experiment only.
- Next: Wiz-strt terrain at post-FlipY (33–35,3) vs C (D-0779).

## 2026-07-19 15:22 — #883 m_move Tengu teleport (D-0778); @100397→100738
- Objective: seed0360 @100397 C distfleeck vs JS rn2(3).
- C locus: `monmove.c` `m_move` Tengu `!rn2(5)` before not_special.
- Change or falsified theory: JS omitted Tengu nature teleport; matched
  `rn2(5)` strings hid the missing call until next mon’s fleeck vs
  stalker `rn2(3)`. Ported Tengu rloc/mnexto + uswallow early-out.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **100397→100738**, RNG **100887→104024**, Scr **292**/833.
- Next: @100738 mfndpos chcnt rn2(6) vs rn2(5) (m_move appr==0).

## 2026-07-19 15:17 — #882 maketrap AIR/CLOUD (D-0777); @100104→100397
- Objective: seed0360 @100104 C get_location vs JS rnd(4) mid Wiz-strt traps.
- C locus: `trap.c` `maketrap` (`IS_AIR && typ != MAGIC_PORTAL`).
- Change or falsified theory: CLOUD is SPACE_POS so DRY get_location can
  pick it; C rejects non-portal traps → no victim rnd(4). Ported terrain
  gates + `splev_create_trap` stairs/`get_location_coord` parity.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **100104→100397**, RNG **100408→100887**, Scr **292**/833.
- Next: @100397 distfleeck vs rn2(3) (m_move).

## 2026-07-19 15:00 — #881 Wiz-strt (D-0776); @98505→100104
- Objective: seed0360 @98505 nhlib shuffle vs rn2(79) after getbones.
- C locus: `dat/Wiz-strt.lua` via `load_special`.
- Change or falsified theory: falsified wizard3/earth; proto log at
  rngLen 98505 is Wiz-strt. Ported `load_wiz_strt` (+ spare wizard3/earth
  loaders). Prefix **98505→100104**, Scr **275→292**.
- Verification: green+strict PASS; cohort 6/6; seed0360 **100104**/100408
  Scr **292**.
- Next: @100104 Wiz-strt traps get_location vs rnd(4).

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