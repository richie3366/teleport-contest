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
## ## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-18 22:07 — #775 score + D-0697 mines your_race
- Objective: mandatory full score (#775÷5); seed0014 @32023 create_monster.
- C locus: `sp_lev.c` `create_monster`; `mondata.h` `your_race`.
- Change: D-0697 — mines dwarf/gnome `your_race`→`rn2(3)` clear pm in
  `splev_create_monster`/`splev_room_monster`. Suite Score **35/44**
  Scr **7604** RNG **497349** (62.73%).
- Verification: prefix **32023→33278**, Scr **533→538**/714; green+strict;
  cohort **33**/33 PASS.
- Next: @33278 C `corpse_chance` `rn2(2)` vs JS `rn2(5)`.

## 2026-07-18 22:05 — #774 D-0696 door bump Fumbling()
- Objective: seed0014 @28552 C `exercise` `rn2(2)` vs JS `rn2(19)`.
- C locus: `hack.c` `test_move` closed_door autoopen / bump (`Fumbling`).
- Change: D-0696 — `cmd.js` uses `Fumbling()` (H||E) for impaired + bump
  instead of sticky `u.Fumbling` (was autoopen→`rn2(19)`).
- Verification: prefix **28552→32023**, Scr **515→533**; green+strict;
  cohort **33**/33 PASS.
- Next: @32023 C `create_monster` `rn2(3)` vs JS `rn2(79)` (descend).

## 2026-07-18 21:57 — #773 D-0695 unmul empty nomovemsg
- Objective: seed0014 trip `--More--` @22721 / @22868 mtrack desync.
- C locus: `hack.c` `unmul`; `timeout.c` FUMBLING `nomovemsg=""`.
- Change: D-0695 — `unmul` default only if `nomovemsg == null`; skip
  pline on `""`. Falsified: leftover-grid noises skip; more() keep-grid
  (regressed seed0002/0030 screens).
- Verification: prefix **22868→28552**, Scr **483→515**; green+strict;
  cohort PASS list intact.
- Next: @28552 C `exercise` `rn2(2)` vs JS `rn2(19)` (door-bump step).

## 2026-07-18 21:30 — #772 D-0694 makeplural feet
- Objective: seed0014 @22868 C `dog_move` `rn2(12)` vs JS `rn2(24)`.
- C locus: `objnam.c` makeplural/one_off; DIAG dog_move mtrack.
- Change: D-0694 — port `one_off` (`foot`→`feet`). Falsified: wrong
  `rn2(12)` constant (already correct); any-key more (breaks 0-RNG rejects).
- Verification: Scr **482→483**; prefix still **22868**; green+strict;
  cohort 7/7 PASS.
- Next: @22721 trip `--More--` key ownership → dmin/mtrack @22868.

## 2026-07-18 21:16 — #771 D-0693 thitmonst pie DEX
- Objective: seed0014 @22582 C `thitmonst` `rnd(25)` vs JS `rn2(100)`.
- C locus: `dothrow.c` thitmonst pie/egg; `uhitm.c` CREAM_PIE;
  `mondata.c` can_blnd.
- Change: D-0693 — `thitmonst` DEX gate + `hmon` cream-pie/`rn1(25,21)`.
- Verification: prefix **22582→22868**, Scr **481→482**; positional
  **22978**/59178; green+strict; cohort **33**/33.
- Next: @22868 C `dog_move` `rn2(12)` vs JS `rn2(24)`.

## 2026-07-18 21:12 — #770 score + D-0692 slip_or_trip
- Objective: mandatory #770 full score; seed0014 @21529 slip_or_trip.
- C locus: `timeout.c` nh_timeout FUMBLING; `slip_or_trip` rn2(4).
- Change: D-0692 — `js/timeout.js` FUMBLING case + slip_or_trip.
- Verification: suite **35**/44 Scr **7547**/11405 RNG **486452**/792838
  (61.36%) `37+0.17/turn`; prefix **21529→22582** Scr **467→481**;
  green+strict; cohort **33**/33.
- Next: @22582 C `thitmonst` `rnd(25)` vs JS `rn2(100)`.

## 2026-07-18 21:05 — #769 D-0691 goto_level Fumbling()
- Objective: seed0014 @21242 C `goto_level` `rnd(3)` vs JS `rn2(10)`.
- C locus: `do.c` goto_level descend fall; `youprop.h` Fumbling.
- Change: `js/do.js` use `Fumbling()` (H||E) not sticky `u.Fumbling`.
- Verification: prefix **21242→21529**, Scr **460→467**; green+strict;
  cohort **33**/33 PASS.
- Next: @21529 C `slip_or_trip` `rn2(4)` vs JS `rn2(100)`.

## 2026-07-18 21:02 — #768 D-0690 Water-surrounded vault
- Objective: seed0014 @19636 C `lspo_map` `rn2(73)` vs JS `rn2(100)`.
- C locus: `themerms.lua` Water-surrounded vault; `sp_lev.c` `lspo_map`.
- Change: D-0690 — wire vault into `THEMEROOM_MAPS` (was META-only →
  create_room). Port map contents: themed region, escape-item chest
  via `readobjnam`, undead, teleport exclusion.
- Verification: prefix **19636→21242**, Scr **459→460**/714; green+
  strict PASS; cohort **35**/35.
- Next: @21242 C `goto_level` `rnd(3)` vs JS `rn2(10)`.

## 2026-07-18 20:55 — #767 D-0689 exerper Fumbling
- Objective: seed0014 @18494 C `exercise` `rn2(2)` vs JS wipe-engr
  `rn2(76)`.
- C locus: `youprop.h` `Fumbling`; `attrib.c` `exerper`.
- Change: D-0689 — `Fumbling()` ≡ H||E||uprops; wire in `exerper`;
  sync Boots_on timeout into uprops intrinsic. Was checking unset
  `u.Fumbling` boolean after wear conferred extrinsic.
- Verification: prefix **18494→19636**, Scr **453→459**/714; green+
  strict PASS; cohort **33**/33.
- Next: @19636 C `lspo_map` `rn2(73)` (sp_lev) vs JS `rn2(100)`.

## 2026-07-18 20:50 — #766 D-0688 assigninvlet + Boots_on
- Objective: seed0014 @18426 C `distfleeck` after `dog_move` vs JS
  `mcalcmove` (theory: early movemon exit).
- C locus: `invent.c` `assigninvlet`; `do_wear.c` `Boots_on` Fumble.
- Change: Falsified early-movemon. Root: after nymph steal, returned
  ring kept letter `k` in C; JS always reassigned → `q`, so `Wq` wore
  ring not boots. Preserve free invlet; port Fumble `rnd(20)`.
- Verification: prefix **18426→18494**, Scr **445→453**/714; green+
  strict PASS; seed0116/1800/1500 PASS.
- Next: @18494 C `exercise` `rn2(2)` vs JS `moveloop` `rn2(76)`.

## 2026-07-18 20:21 — #765 public score cadence
- Objective: mandatory %5 full `sessions` score + CURRENT refresh.
- C locus: n/a (score-only iteration).
- Change: documented suite — **35/44** PASS; Scr **7511**/11405;
  RNG **483037**/792838 (60.93%); `35+0.17/turn` (R² 0.808).
  Δ vs #760: Scr **+60**, RNG **+2789** (D-0683…D-0687 peels).
  seed0014 now 19358/59178 RNG, 445/714 Scr; @18426 next.
- Verification: green+strict PASS; `node frozen/ps_test_runner.mjs sessions`.
- Next: seed0014 @18426 C `distfleeck` after `dog_move` vs JS `mcalcmove`
  (JS exited movemon early); or seed0108 wishlist.

## 2026-07-18 20:17 — #764 D-0687 MS_SEDUCE #chat
- Objective: seed0014 @17952 C `dochug` `rn2(40)` vs JS `rn2(20)`.
- C locus: `sounds.c` `domonnoise` MS_SEDUCE; `dochat`/`dotalk`.
- Change: D-0687 — infer `S_NYMPH`→MS_SEDUCE; port cajoles ECMD_TIME.
  Silent msound=0 made `#chat` free; later `n` was a move while C
  ran movemon. Named omissions: doseduce; verbalize; other MS_*.
- Verification: prefix **17952→18426**, Scr **435→445**/714; green+strict
  PASS; cohort **35**/35.
- Next: @18426 C `distfleeck` `rn2(5)` vs JS `rn2(12)`.

## 2026-07-18 20:05 — #763 D-0686 steal + rloc 50-try
- Objective: seed0014 @16712 C `steal` `rn2(21)` vs JS `rn2(3)`.
- C locus: `uhitm.c` `mhitm_ad_sedu`; `steal.c` `steal`; `teleport.c`
  `rloc`/`rloc_pos_ok`.
- Change: D-0686 — port `steal` + AD_SITM/SEDU; rewrite `rloc` to C
  50× rnd/rn2 + candy. Named omissions: monkey cant_take; stealarm;
  doseduce; Wizard stair rloc.
- Verification: prefix **16712→17952**, Scr **401→435**/714; green+strict
  PASS; cohort **33**/33.
- Next: @17952 C `dochug` `rn2(40)` flee tele vs JS `rn2(20)`.

## 2026-07-18 19:53 — #762 D-0685 dowaternymph
- Objective: seed0014 @16624 C `collect_coords` `rn2(8)` vs JS `rn2(3)`.
- C locus: `fountain.c` `dowaternymph`; dip case 22 / drink 27→28.
- Change: D-0685 — port `dowaternymph`; wire dip 21–22 + drink 28.
  Named omissions: dip uncurse 17–20 / 26–29.
- Verification: prefix **16624→16712**, Scr **395→401**/714; green+strict
  PASS; cohort **33**/33.
- Next: @16712 C `steal` `rn2(21)` after nymph `mattacku`/`hitmu`.

## 2026-07-18 19:50 — #761 D-0684 dogushforth/gush
- Objective: seed0014 @16447 C `gush` `rn2(7)` vs JS `rn2(3)`.
- C locus: `fountain.c` `dogushforth`/`gush`; `vision.c` `do_clear_area`;
  `mkroom.c` `nexttodoor`; `trap.c` `delfloortrap`.
- Change: D-0684 — port `dogushforth`/`gush` + helpers; wire dip case 25
  / drink case 30. Named omissions: `minliquid`; full `set_levltyp`.
- Verification: prefix **16447→16624**, Scr **383→395**/714; green+strict
  PASS; cohort **33**/33.
- Next: @16624 dip `rnd(30)=22` → `dowaternymph`/`makemon`/`collect_coords`.
