# Rotated from AGENT-LOOP-JOURNAL.md @#1036

## 2026-07-20 18:05 — #1023 D-0873 create_monster female overwrite
- Objective: seed0399 @483 dwarf lord vs lady (Hallu theory falsified).
- C locus: `sp_lev.c` `create_monster` `mtmp->female = m->female` after
  makemon; `des.monster()` keeps female=0.
- Change: always overwrite female in `splev_create_monster` /
  room variants; `makemon` MM_MALE/MM_FEMALE.
- Verification: green+strict PASS; seed0399 **PASS** 532/532; cohort
  15/15.
- Next: seed0014 @50259 (D-0708); leaderboard cron.

## 2026-07-20 17:52 — #1022 D-0872 unique known leak (silver bell)
- Objective: seed0399 @300 `a` vs `the` silver bell.
- C locus: `objnam.c` `xname_flags` `!nn && oc_uses_known && oc_unique`.
- Change: `clear_unique_known_leak` in `xname`/`doname`; uses_known
  heuristic for Bell/Candelabrum/Amulet/Book (+ Bell charged).
- Verification: green+strict PASS; seed0399 Scr **530→531**; cohort
  7/7 PASS (0399 still 531/532).
- Next: @483 Hallu dwarf lord/lady (display-rng gender?).

## 2026-07-20 17:45 — #1021 D-0871 MUSE_POT_SPEED mquaffmsg
- Objective: seed0399 @113 puton prinv missing `--More--`.
- C locus: `muse.c` `use_misc` MUSE_POT_SPEED; `worn.c` `mon_adjust_speed`.
- Change: await `mquaffmsg` before speed adjust; async give_msg pline
  + `learnwand`; `castmu` awaits `mon_adjust_speed`.
- Verification: green+strict PASS; seed0399 Scr **525→530** (RNG/cursors
  FULL); cohort 7/7 PASS.
- Next: @300 `a`/`the` silver bell; @483 Hallu dwarf lord/lady.

## 2026-07-20 17:36 — #1020 full public score refresh
- Objective: mandatory score cadence (iteration % 5 == 0).
- C locus: n/a (docs-only).
- Change: full `sessions` — **39/44** PASS; Scr **9433**/11405
  (+96 vs #1015); RNG **667614**/792838 (84.21%, +273); speed
  `32+0.24/turn` (R² 0.841). seed0399 Scr 525 RNG FULL; first miss
  @113 puton prinv missing `--More--`.
- Verification: green+strict PASS; suite exit 0.
- Next: seed0399 @113 puton/on_msg More; alt @300/@483; or D-0708;
  score @#1025.

