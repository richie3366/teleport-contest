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
## 2026-07-19 13:01 — #869 hell_tweaks `.w.` + @98492 linedup diag (D-0772)
- Objective: seed0360 @98492 C distfleeck rn2(5) vs JS rn2(3).
- C locus: `nhlib.lua` hell_tweaks `[[.w.]]`; `mthrowu.c` linedup;
  `mkmaze.c` get_level_extends.
- Change: hell_tweaks match `'.w.'` (not `'[.w.]'`); extends xmin/xmax
  clamps. DIAG: JS linedup boulder rn2 for mumak LOS; C still fleeck.
- Verification: green+strict PASS; cohort **11/11**; prefix still **98492**.
- Next: @98492 why C skips linedup boulder rn2 (couldsee / m_move).
## 2026-07-19 12:45 — #868 wizard2 load_special (D-0771)
- Objective: seed0360 @86170 C nhlib shuffle vs JS rn2(79) after getbones.
- C locus: `dat/wizard2.lua` / `sp_lev.c` `load_special` / mazewalk.
- Change: `load_wizard2` + dispatch (mazegrid + zoo + mazewalk + ladders
  + hell_tweaks). Fingerprint ruled out hellfill (no hellno before walkfrom).
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **86170→98492**; RNG **86170→98507**; Scr **273→275**/833.
- Next: @98492 C distfleeck rn2(5) vs JS rn2(3) (wizard3/hellfill if shuffle).
## 2026-07-19 12:37 — #867 flyer trap + poisoncloud (D-0770)
- Objective: seed0360 @86100 track rn2(8) vs JS sleep-gas rnd(25).
- C locus: `trap.c` `m_harmless_trap`/`check_in_air`/`mintrap`;
  `mon.c` `mfndpos` gas_glyph; `region.c` `make_gas_cloud`.
- Change: flyer floor_trigger harmless + mintrap in-air skip; mfndpos
  avoids only `S_poisoncloud` (not fog/steam). Bat regained track cell.
- Verification: green+strict PASS; cohort **37/37**; seed0360 prefix
  **86100→86170**; RNG **86137→86170**; Scr **273**/833.
- Next: @86170 C nhlib `shuffle` vs JS `rn2(79)` after getbones
  (wizard2/hellfill).
## 2026-07-19 12:24 — #866 maybe_unhide_at (D-0769)
- Objective: seed0360 @86029 distfleeck rn2(5) vs JS rn2(20).
- C locus: `mon.c` `maybe_unhide_at`; `monmove.c` `m_move` ≈2060.
- Change: port `maybe_unhide_at` after place so postmov hide `rn2(5)`
  runs when dest has no cover (snake left hiding). Omit youmonst path.
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **86029→86100**; RNG **86118→86137**; Scr **273**/833.
- Next: @86100 C track `rn2(8)` vs JS `rnd(25)` sleep-gas.
## 2026-07-19 12:12 — #865 wizard1 + public score (D-0768)
- Objective: mandatory full `sessions` score; seed0360 @82982 wizard1.
- C locus: `dat/wizard1.lua` / `sp_lev.c` `load_special` / `create_door`.
- Change: `load_wizard1` + dispatch (mazegrid + center map + east
  mazewalk + morgue secret door + ladder + hell_tweaks). Omit
  hellfill/wizard2–3/fakewiz.
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **82982→86029**; RNG **82989→86118**; Scr **273**/833. Full suite
  **37/44**; Scr **8278**/11405; RNG **616720**/792838 (77.79%);
  speed `36+0.20/turn` (R² 0.822). Δ vs #860: Scr **+6**, RNG **+14,263**.
- Next: @86029 C `distfleeck`/`m_move` vs JS `rn2(20)` (post-wizard1
  gameplay); or wizard2 if next special.
