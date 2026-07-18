# Archived agent loop journal entries

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
