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

## 2026-07-17 10:41 — #673 D-0603 MS_PRIEST m_initweap/m_initinv
- Objective: seed0361 @12294 C `next_ident` vs JS `rn2(75)`.
- C locus: `makemon.c` `m_initweap`/`m_initinv` MS_PRIEST (ALIGNED/HIGH
  CLERIC); `monsters.h` msound.
- Change: port mace (`mksobj`+spe/curse) + robe/cloak/shield/gold;
  gate by mndx (tables omit msound). Leave quest_role + NINJA deferred.
- Verification: prefix **12294→13719** Scr **215** RNG **13837**;
  green+strict PASS; cohort **33/33** PASS.
- Next: seed0361 @13719 `pri_move` vs ordinary monmove.

## 2026-07-17 10:40 — #672 D-0602 pick_room wizard≡debug
- Objective: seed0361 @12288 C `shrine_pos` vs JS `pick_room`.
- C locus: `flag.h` `#define wizard flags.debug`; `mkroom.c` `pick_room`.
- Change: `pick_room` accepts on `flags.wizard || flags.debug`. Falsified
  THEMEROOM/doorct FORCE — C D:17 rooms match JS; C temples rooms[3].
- Verification: prefix **12288→12294** Scr 205; green+strict PASS;
  cohort **31/31** PASS.
- Next: seed0361 @12294 priest/makemon `next_ident` vs `rn2(75)`.

## 2026-07-17 10:30 — #671 D-0601 niches/mimic + @12288 peel
- Objective: seed0361 @12288 C `shrine_pos` vs JS `pick_room`.
- C locus: `mklev.c` `make_niches`/`makeniche`/`dosdoor`/`makelevel`
  G_GONE; themerms THEMEROOM; `mkroom.c` `pick_room`.
- Change: niches use `depth`+`!noteleport`; `Can_fall_thru` for holes;
  dosdoor trapped→mimic `makemon`/`set_mimic_sym`; special-room G_GONE.
  FORCE: THEMEROOM on r1+r4 + r2 doorct=1 → would reach **12294**.
- Verification: green+strict PASS; cohort **18/18** PASS; seed0361
  still @12288 Scr 205.
- Next: themerm `type=themed` for those rooms + r2 extra join door.

## 2026-07-17 10:11 — #670 formal score refresh
- Objective: mandatory #670 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **33/44**, Scr
  **6597**/11405, RNG **368089**/792838 (46.43%), `33+0.15/turn`
  (R² 0.778). Δ vs #665: Scr **+10**, RNG **+4165** (D-0597…D-0600),
  PASS unchanged. Confirmed seed0361 still @12288 doorct.
- Next: seed0361 @12288 extra door / doorct; or Pri-strt seed0367.

## 2026-07-17 10:15 — #669 D-0600 mktemple (@12287)
- Objective: seed0361 @12287 C `rn2(5) @ pick_room` vs JS `rn2(3)`.
- C locus: `mkroom.c` `mktemple`/`shrine_pos`; `priest.c` `priestini`;
  `makemon` `MM_EPRI`/`newepri`.
- Change: ported `mktemple`+`shrine_pos`+`priestini`; wired TEMPLE in
  `do_mkroom`; `newepri`+`MM_EPRI` in makemon. Stub was burning later
  `rn2(3)` instead of `pick_room(TRUE)`.
- Verification: prefix **12287→12288** Scr **205**; green+strict PASS;
  cohort **31/31** PASS. Next miss: JS no doorct==1 (room2 doorct=2).
- Next: seed0361 @12288 extra door / doorct; or Pri-strt.

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
