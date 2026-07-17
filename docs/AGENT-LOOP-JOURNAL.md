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

## 2026-07-17 10:00 — #668 D-0599 rolling boulder (@11065)
- Objective: seed0361 @11065 C `rnd(20) @ dmgval` vs JS `rn2(5)`.
- C locus: `trap.c` `trapeffect_rolling_boulder_trap` / `launch_obj`.
- Change: wired ROLLING_BOULDER into `trapeffect_selector`; ported
  `launch_obj` ROLL path (hero `dmgval`+`thitu`). Symptom was missing
  trap effect, not dmgval body — C screen "Click! … boulder misses you."
- Verification: prefix **11065→12287** Scr **198→205**; green+strict
  PASS; cohort **31/31** PASS.
- Next: seed0361 @12287 `pick_room` rn2(5) vs rn2(3); or Pri-strt.

## 2026-07-17 09:50 — #667 D-0598 searches_for_item (@7973)
- Objective: seed0361 `m_move` @7973 C `rn2(20)` vs JS `rn2(32)`.
- C locus: `muse.c` `searches_for_item`; `monmove.c` `mon_would_take_item`.
- Change: ported `searches_for_item` + wired into `mon_would_take_item`.
  C recorder: centaur gg→POT_HEALING (70,4) at=(71,4) cnt=5; JS had chased
  hero → (71,5) cnt=8. D-0597 pool/lava not the root.
- Verification: prefix **7973→11065** Scr **195→198**; green+strict PASS;
  cohort **31/31** PASS.
- Next: seed0361 @11065 `dmgval` `rnd(20)` vs `rn2(5)`; or Pri-strt.

## 2026-07-17 09:40 — #666 D-0597 mfndpos pool/lava (not @7973)
- Objective: seed0361 `m_move` @7973 C `rn2(20)` vs JS `rn2(32)`.
- C locus: `mon.c` `mfndpos` poolok/lavaok / `IS_WATERWALL`; `mon_allowflags` `ALLOW_WALL`.
- Change: ported those gates + passes_walls `ALLOW_WALL`. **Falsified** as @7973 cause — mountain centaur @(71,5) open ROOM cnt=8, mtrack[0]=(72,4).
- Verification: green+strict PASS; cohort 8/8 PASS; seed0361 still prefix 7973 Scr 195.
- Next: remaining mfndpos rejects (onscary/garlic/squeeze/bars/gas/mm_aggression) or C map/mtrack dump.

## 2026-07-17 09:26 — #665 score + D-0596 set_wear
- Objective: mandatory full `sessions` score (#665÷5) + seed0361
  `doopen_indir` @7924 (PRIMARY).
- C locus: `do_wear.c` `set_wear`/`Helmet_on`; `allmain.c` preamble.
- Change: ported `set_wear`; call from `moveloop_preamble` (fedora
  Archeologist luck). Score: **33/44** Scr **6587**/11405 RNG
  **363924**/792838 (45.90%) `33+0.15/turn`; Δ vs #660 Scr +17 RNG
  +2621.
- Verification: prefix 7924→7973; Scr 181→195; green+strict; cohort
  31/31 PASS.
- Next: seed0361 `m_move` @7973; or Pri-strt seed0367.

## 2026-07-17 09:20 — #664 D-0595 maybe_spin_web
- Objective: seed0361 `maybe_spin_web` @7844 (PRIMARY).
- C locus: `monmove.c` `maybe_spin_web` / `holds_up_web` /
  `count_webbing_walls` / `soko_allow_web`; `mondata.h` `webmaker`;
  `trap.c` `count_traps`.
- Change: ported spider web spin postmov (`rn2(1000)<prob`) + helpers;
  `webmaker` in `m_harmless_trap` WEB arm.
- Verification: prefix 7844→7924; RNG 8126→8215 Scr 180→181;
  green+strict PASS; cohort 33/33 PASS.
- Next: seed0361 `doopen_indir` @7924; or Pri-strt seed0367.

## 2026-07-17 09:15 — #663 D-0594 portal landing
- Objective: seed0361 dosounds/nsinks @7837 (PRIMARY).
- C locus: `mkmaze.c` `mkportal`; `mklev.c` `place_branch`; `do.c` portal arm.
- Change: falsified nsinks=0; ported `mkportal` + `goto_level` MAGIC_PORTAL
  land (expulsion was leaving stale ux/uy → spurious `dosearch0` rnl(7)).
- Verification: prefix 7837→7844; RNG 7974→8126 Scr 178→180; green+strict;
  cohort 31/31 PASS.
- Next: seed0361 `maybe_spin_web` @7844; or Pri-strt seed0367.

## 2026-07-17 01:50 — #662 D-0593 fill_zoo COURT
- Objective: seed0361 COURT `fill_zoo` @5859 (PRIMARY).
- C locus: `mkroom.c` `fill_zoo` / `mk_zoo_thronemon` / `courtmon`.
- Change: ported COURT throne placement, ruler+mace, `courtmon`
  loop, THRONE terrain + coffer chest, `has_court`.
- Verification: seed0361 **5859→7837** (RNG **5934→7974** Scr
  **178**); green+strict PASS; cohort 31/31 PASS.
- Next: seed0361 `dosounds` nsinks @7837; or Pri-strt seed0367.
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
