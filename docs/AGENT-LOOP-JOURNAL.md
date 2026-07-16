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
## 2026-07-17 01:45 — #661 D-0592 pick_room/mkzoo
- Objective: seed0361 `pick_room` @5483 (PRIMARY).
- C locus: `mkroom.c` `pick_room`/`mkzoo`/`do_mkroom`; caller
  `makelevel` COURT gate.
- Change: ported `pick_room` + `mkzoo`; wired zoo-type `do_mkroom`.
  Falsified “nroom drift” — both sides had 6 rooms; JS stub skipped
  `pick_room` entirely.
- Verification: seed0361 **5483→5859** (RNG **5605→5934** Scr
  **175**); green+strict PASS; cohort 31/31 PASS.
- Next: seed0361 COURT `fill_zoo`/`mk_zoo_thronemon` @5859; or
  Pri-strt seed0367.
## 2026-07-17 01:42 — #660 formal score refresh
- Objective: mandatory #660 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **33/44**, Scr
  **6570**/11405, RNG **361303**/792838 (45.57%), `33+0.15/turn`
  (R² 0.789). Δ vs #655: Scr **+23**, RNG **+2240** (D-0591),
  PASS unchanged. Confirmed seed0361 first miss still `pick_room`
  @5483 (`rn2(6)` vs JS `rn2(4)`).
- Next: seed0361 `pick_room` @5483; or Pri-strt seed0367.
## 2026-07-17 01:40 — #659 D-0591 movemon deferred_goto
- Objective: seed0361 getbones @4368 after quest expulsion (PRIMARY).
- C locus: `mon.c` `movemon` — `if (u.utotype) deferred_goto()`.
- Change: `js/mon.js` `movemon` lazy-imports `deferred_goto` when
  `u.utotype` (expulsion `schedule_goto` during dochug).
- Verification: seed0361 **4368→5483** (RNG **4516→5605** Scr
  **178**); green+strict PASS; cohort 31/31 PASS.
- Next: seed0361 `pick_room` @5483; or Pri-strt seed0367.
## 2026-07-17 01:33 — #658 D-0590 ^T dotele + quest_talk
- Objective: seed0361 nhlib shuffle @4363 (PRIMARY; was misread as
  Arc-loca).
- C locus: `teleport.c` `dotelecmd`/`scrolltele` getpos; `makemon.c`
  M3_CLOSE→STRAT_CLOSE + leader_m_id; `monmove.c` dochug; `quest.c`
  chat_with_leader / is_pure / expulsion.
- Change: wire `^T`; controlled tele; STRAT_CLOSE quest_talk; Arc
  leader_first/badalign; Arc role ldrnum; Arc-loca loader prep.
- Verification: seed0361 **4363→4368** (RNG **4414→4516** Scr
  **161→178**); green+strict PASS; cohort 31/31 PASS.
- Next: seed0361 getbones @4368 after expulsion; or Pri-strt seed0367.
## 2026-07-17 01:21 — #657 D-0589 m_move hides_under rn2(10)
- Objective: seed0361 m_move @4247 (PRIMARY).
- C locus: `monmove.c` `m_move` hides_under + OBJ_AT +
  `can_hide_under_obj` + `rn2(10)` → MMOVE_NOTHING.
- Change: `js/monmove.js` stay-put gate; refresh `ptr` after mintrap.
- Verification: seed0361 **4247→4363** (RNG **4323→4414** Scr
  **161**); green+strict PASS; cohort 33/33 PASS.
- Next: seed0361 nhlib shuffle @4363; or Pri-strt seed0367.
## 2026-07-17 01:20 — #656 D-0588 Arc-strt + invent discard + nartifact
- Objective: seed0361 quest start after getbones (PRIMARY).
- C locus: `dat/Arc-strt.lua`; `sp_lev.c` create_monster /
  `mdrop_special_objs`; `mkobj.c` mksobj_init artif + `nartifact_exist`.
- Change: `load_arc_strt` + dispatch; `splev_discard_default_minvent`;
  WEAPON/ARMOR artif `rn2(20|40+10*nartifact_exist())`.
- Verification: seed0361 **3293→4247** (RNG **3307→4323** Scr
  **160→161**); green+strict PASS; cohort 11/11 prior PASS held;
  seed0367 still @2040.
- Next: seed0361 `m_move` @4247; or `Pri-strt` seed0367.
## 2026-07-17 01:11 — #655 formal score refresh
- Objective: mandatory #655 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **33/44**, Scr
  **6547**/11405, RNG **359063**/792838 (45.29%), `32+0.15/turn`
  (R² 0.765). Δ vs #650: Scr **+12**, PASS **32→33** (seed0116 /
  D-0584…D-0587), RNG unchanged.
- Next: seed0361/0367 quest/`makemaz`; or leaderboard cron.
## 2026-07-17 01:09 — #654 D-0587 ^X armor + Teleport_control
- Objective: seed0116 Scr 126/127 @122 ^X enlightenment residual.
- C locus: insight.c status_enlightenment nudity;
  attributes_enlightenment Teleport_control; attrib.c from_what;
  artifact.c what_gives.
- Change: invent.js doattributes armor nudity + Teleport_control;
  attrib.js from_what→what_gives; artifact.js what_gives wornmask.
- Verification: seed0116 Scr **126→127**/127 RNG FULL **PASS** +
  strict; green+strict PASS; cohort **31**/31 PASS.
- Next: leaderboard cron; earliest remaining suite FAIL (quest).
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