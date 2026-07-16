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

## 2026-07-17 01:03 — #653 D-0586 dospellmenu wizard turns
- Objective: seed0116 Scr 125/127 @117 spells menu centering.
- C locus: spell.c dospellmenu wizard turns / spellknow(i);
  flag.h wizard≡flags.debug.
- Change: spell.js dospellmenu appends heading `turns` (%6s) and
  per-line spellknow when flags.wizard||flags.debug.
- Verification: seed0116 Scr **125→126**/127 RNG FULL; green+strict
  PASS; cohort **30**/30 (seed0106 + wizard seeds). Residual @122.
- Next: seed0116 @122 ^X armor nudity + Teleport_control from_what.

## 2026-07-17 01:00 — #652 D-0585 does_block is_lightblocker_mappear
- Objective: seed0116 Scr 116/127 @114 materialize map `` ` `` vs `·`.
- C locus: vision.c does_block; monst.h is_lightblocker_mappear.
- Change: vision.js `_blocks` treats mimic-as-boulder (and door/wall/tree
  furniture) as light blockers so Algorithm C marks the edge cell.
- Verification: seed0116 Scr **116→125**/127 RNG FULL; green+strict PASS;
  cohort **30**/30 PASS; seed0373 PASS. Residual @117 spells / @122 insight.
- Next: seed0116 @117 “Currently known spells” centering; or leaderboard.

## 2026-07-17 00:50 — #651 D-0584 wear/puton empty `[*]`
- Objective: seed0116 Scr 115/127 (CURRENT primary).
- C locus: invent.c getobj empty-buf `" [*]"`; do_wear wear_ok/puton_ok.
- Change: getobj_wear/puton empty prompt `[*?]` → `[*]`.
- Verification: seed0116 Scr **115→116**/127 RNG FULL; green+strict
  PASS; cohort **30**/30 PASS.
- Next: seed0116 @114 materialize map `` ` `` vs `·` (32,13).

## 2026-07-17 00:46 — #650 formal score refresh
- Objective: mandatory #650 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **32/44**, Scr
  **6535**/11405, RNG **359063**/792838 (45.29%), `33+0.15/turn`
  (R² 0.755). Δ vs #645: Scr **+21**, RNG 0, PASS **31→32**
  (D-0580…D-0583 / seed5006 PASS).
- Next: seed0116 Scr 115/127; or leaderboard gap.

## 2026-07-17 00:45 — #649 D-0583 getbones leave-level gbuf
- Objective: seed5006 @198/@199 Get bones? map glyphs (CURRENT primary).
- C locus: vision.c vision_recalc(2); bones.c getbones yn flush;
  do.c goto_level vs flush_screen(-1) postpone.
- Change: snapshot pre-leave viz; on Get bones? run
  vision_off_newsym_gbuf on stashed leave-level + paint dirty gnew
  cells to Terminal. Ordinary vision_recalc(2) still skips newsym loop.
- Verification: seed5006 Scr **247→249**/249 RNG FULL PASS;
  green+strict PASS; cohort **29**/29 PASS; seed0116 115/127 held.
- Next: seed0116 Scr 115/127; or leaderboard gap / full suite score.
## 2026-07-17 00:35 — #648 D-0582 identify more_experienced(0,10)
- Objective: seed5006 @187 points 134 vs 144 (CURRENT primary).
- C locus: potion.c dopotion; zap.c weffects/zapnodir.
- Change: port more_experienced(0,10) on potion makeknown and wand
  disclose/zapnodir when type was unknown.
- Verification: seed5006 Scr **246→247**/249 RNG FULL; remaining @198
  Get-bones map water; green+strict PASS; cohort **29**/29 PASS;
  seed0116 115/127 held.
- Next: seed5006 @198/@199 Get bones? map glyphs; or seed0116 115/127.
## 2026-07-17 00:28 — #647 D-0581 wizard Die?/bones yn
- Objective: seed5006 @185 Die?/Save-bones yn (CURRENT primary).
- C locus: end.c done Die?/savelife; really_done Save bones?;
  bones.c Get/Unlink/Replace; vault.c hidden_gold; zap.c uhim.
- Change: port wizard/discover Die? + savelife; Save bones?;
  Get/Unlink/Replace yn; hidden_gold in score; death-ray flags.female;
  stale-map flush during getbones; botl on uz change.
- Verification: seed5006 Scr **230→246**/249 RNG FULL; green+strict
  PASS; cohort **29**/29 PASS; seed0116 115/127 held.
- Next: seed5006 @187 urexp 134 vs 144; or Get bones? stale map
  glyphs; or seed0116 Scr 115/127.
## 2026-07-17 00:20 — #646 D-0580 doread confused mispronounce
- Objective: seed5006 Scr @162 mispronounce vs level_tele (CURRENT).
- C locus: read.c doread confused/Hallu pline + can_chant silently;
  before seffect_teleportation → level_tele.
- Change: port mispronounce/`Being so trippy` plines; Blind
  cogitate/pronounce via exported can_chant (Strangled subset).
- Verification: seed5006 Scr **228→230**/249 RNG FULL; first miss
  @185 Die?; green+strict PASS; cohort **31**/31 PASS; seed0116
  Scr 115/127 held.
- Next: seed5006 @185 Die?/Save-bones yn; or seed0116 Scr 115/127.
## 2026-07-17 00:17 — #645 formal score refresh
- Objective: mandatory #645 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **31/44**, Scr
  **6514**/11405, RNG **359063**/792838 (45.29%), `32+0.15/turn`
  (R² 0.769). Δ vs #640: Scr **+41**, RNG **+109**, PASS same
  (D-0578/D-0579).
- Next: seed5006 @162 confused mispronounce; or seed0116 Scr 115/127.
## 2026-07-17 00:15 — #644 D-0579 equip SUGGEST + Blindf_on / Blind vision
- Objective: seed5006 Scr residual 217/249 (CURRENT primary).
- C locus: do_wear.c equip_ok/cursed/Blindf_on; vision.c Blind vision_recalc;
  mhitu.c hitmu map_invisible; youprop.h EBlinded.
- Change: SUGGEST-only P/W/T prompts; cursed boots/gloves plural;
  Blindf_on/off + EBlinded mirror; Blind vision_recalc; hitmu map_invisible.
- Verification: seed5006 Scr **217→228**/249 RNG FULL; seed0116 **114→115**;
  green+strict PASS; cohort PASS held (0373/0398/0030/…).
- Next: seed5006 @162 confused mispronounce; or seed0116 Scr 115/127.
## 2026-07-17 00:06 — #643 D-0578 bones utrack / gettrack
- Objective: seed5006 seg1 @2782 `m_move` rn2(16) vs rn2(28).
- C locus: save.c save_track; restore.c rest_track; track.c gettrack;
  monmove.c m_move gg from gettrack.
- Change: bones persist/restore utrack; drop post-mklev initrack wipe.
  C dest (30,5) via grave gettrack — not (32,4) hero-aim.
- Verification: seed5006 RNG **FULL** Scr **217**/249; green+strict
  PASS; cohort **31**/31 PASS.
- Next: seed5006 Scr residual; or seed0116 Scr 114/127.
## 2026-07-16 23:52 — #642 D-0578 kitten first-dest / track shape
- Objective: seed5006 seg1 @2782 `m_move` rn2(16) vs rn2(28).
- C locus: monmove.c m_move:1963; mon.c mfndpos.
- Falsified: empty-ROOM trap/obj/Elbereth; gettrack; shortsighted;
  loot gg; dest=(32,5)→rn2(20). New: JS @(32,4) emits rn2(28)+rn2(24);
  C @2782 one rn2(16); C @2800–2801 is 28+24 (JS shape, next turn).
- Verification: green+strict PASS; seed5006 still 13814/13923 Scr 192.
- Next: prove C first-move dest (gg/poss/appr); or seed0116.
