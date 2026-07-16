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
## 2026-07-16 23:45 — #641 D-0578 kitten m_move cnt diag
- Objective: seed5006 seg1 @2782 `m_move` rn2(16) vs rn2(28).
- C locus: monmove.c m_move:1963; mon.c mfndpos.
- Falsified: other-mon / missing pass1 fleeck (2780 = same kitten
  post-move distfleeck). Diagnosed: hostile PM_KITTEN; JS cnt=7 at
  (32,4) after matched first move; C wants cnt-j=4.
- Verification: green+strict PASS; seed5006 still 13814/13923 Scr 192.
- Next: prove C dest after first move or mfndpos cnt; or seed0116.
## 2026-07-16 23:28 — #640 score + familiar_level_msg (D-0577)
- Objective: mandatory #640 full `sessions` score; seed5006 gameplay.
- C locus: bones.c cemetery/`bones_include_name`; do.c
  `familiar_level_msg`/`goto_level` familiar.
- Change: persist cemetery who[]; familiar_level_msg after splev;
  debug plname≡wizard matches across segments. False lead: rng-diff
  seg0-only (@11026 was seg1 start).
- Verification: suite **31/44** Scr **6473** RNG **358954** (45.27%);
  seed5006 Scr 182→192 seg1 2777→2782; green+strict PASS; cohort PASS.
- Next: seed5006 seg1 @2782 m_move rn2(16) vs rn2(28); or seed0116.
## 2026-07-16 23:25 — #639 death-ray self-zap / bones debug (D-0576)
- Objective: seed5006 can_make_bones rn2(1) @10953.
- C locus: zap.c zapyourself WAN_DEATH; cmd.c getdir→confdir;
  bones.c can_make_bones !wizard.
- Change: port death-ray self-zap → done(DIED); getdir_zap confdir;
  can_make_bones treats flags.debug as wizard (playmode:debug).
- Verification: seed5006 seg0 10953→11026 FULL Scr 174→182;
  positional 13812/13923; green+strict PASS; cohort 29/29 PASS.
- Next: seed5006 seg1 randomize_gem_colors @11026; or seed0116 residual.
## 2026-07-16 23:15 — #638 confused level_tele (D-0575)
- Objective: seed5006 level_tele rnl(5) @8473.
- C locus: read.c seffect_teleportation; teleport.c level_tele /
  random_teleport_level; dungeon.c single_level_branch.
- Change: cursed/confused scroll → level_tele; port
  random_teleport_level; Confusion/`*`/involuntary use it.
- Verification: seed5006 8473→10953 Scr 154→174; green+strict PASS;
  cohort 29/29 PASS.
- Next: seed5006 can_make_bones rn2(1) @10953; or seed0116 residual.
## 2026-07-16 23:10 — #637 setworn oc_oprop (D-0574)
- Objective: seed5006 dosounds @8468 (C rn2(400) vs JS rn2(100)).
- C locus: worn.c setworn oc_oprop; youprop.h Regeneration; allmain
  U_CAN_REGEN/regen_hp.
- Change: extract oc_oprop; setworn/takeoff extrinsic; u_can_regen
  reads uprops[REGENERATION]. Symptom was missing Regeneration after
  wishing clay ring, not dosounds.
- Verification: seed5006 8468→8473 Scr 121→154; green+strict PASS;
  cohort PASS held.
- Next: seed5006 level_tele rnl(5) @8473; or seed0116 residual.
## 2026-07-16 23:03 — #636 wizard ^X Attributes (D-0573)
- Objective: seed0373 @119 Attributes / wizard MAGICENLIGHTENMENT.
- C locus: insight.c doattributes/attributes_enlightenment/status;
  attrib.c from_what/is_innate; hack.c weight_cap Is_airlevel→MAX.
- Change: invent.js wizard|discover MAGIC + status `<%d>` + Attributes
  subset + Air weight_cap MAX; attrib.js from_what/is_innate.
- Verification: seed0373 Scr 123→124/124 **PASS**; green+strict PASS;
  cohort 28/28 PASS.
- Next: seed5006 dosounds @8468; or seed0116 residual 114/127.
## 2026-07-16 22:57 — #635 formal score refresh
- Objective: mandatory #635 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **30/44**, Scr
  **6401**/11405, RNG **353648**/792838 (44.61%), `31+0.15/turn`
  (R² 0.772). Δ vs #630: Scr +23, RNG 0 (D-0569…D-0572), PASS same;
  seed0116 113→114.
- Next: seed0373 @119 Attributes; or seed5006 dosounds @8468.
