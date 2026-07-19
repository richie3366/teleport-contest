# Rotated from AGENT-LOOP-JOURNAL.md (#856)

## 2026-07-19 09:45 — #845 score + rnd_misc_item nonliving (D-0749)
- Objective: mandatory full score (#845÷5) + seed0360 @35405 primary.
- C locus: `muse.c` `rnd_misc_item` — `!rn2(40) && !nonliving && !vampshifter`.
- Change: JS life-saving amulet gate now matches C (was `!rn2(40)` alone).
- Verification: green+strict PASS; cohort 16/16; seed0360 prefix
  **35405→37668**; RNG **35443→37686**. Full suite **37/44**; Scr **8212**;
  RNG **568288** (71.68%); speed `39+0.20/turn`. Δ vs #835: Scr+7, RNG+28971.
- Next: @37668 C nhlib shuffle vs JS rn2(79).

## 2026-07-19 09:42 — #844 mkclass_aligned Inhell hellish (D-0748)
- Objective: seed0360 @31374 C mkclass_aligned rn2(2) vs JS rn2(9).
- C locus: `makemon.c` `mkclass_aligned` — `gehennom = Inhell != 0`.
- Change: `gehennom` from dungeon `flags.hellish` (not `dnum===GEHENNOM`);
  valley hellish dnum=1 so C/JS hell-mask now agree.
- Verification: green+strict PASS; cohort 37/37; seed0360 prefix
  **31374→35405**; RNG **31408→35443**; Scr **204→207**.
- Next: @35405 C rnd_misc_item rn2(3) vs JS rnd(2).

## 2026-07-19 09:39 — #843 valley + Inhell G_NOHELL (D-0747)
- Objective: seed0360 @22925 valley vs rn2(79) (CURRENT primary).
- C locus: `dat/valley.lua` / `sp_lev.c` load_special /
  `remove_boundary_syms`; `makemon.c` uncommon/`rndmonst_adj` Inhell.
- Change: `load_valley` + boundary CROSSWALL→ROOM; hellish-flag
  `uncommon` + `G_NOHELL` skip in `rndmonst_adj` (not GEHENNOM=5).
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **22925→31374**; RNG **22948→31408**; Scr **201→204**.
- Next: @31374 C mkclass_aligned rn2(2) vs JS rn2(9).

## 2026-07-19 09:27 — #836 castle load_special (D-0746)
- Objective: seed0360 @8708 castle vs rn2(79) (CURRENT primary).
- C locus: `dat/castle.lua` / `sp_lev.c` load_special / `mkmaze.c` walkfrom;
  `dbridge.c` create_drawbridge; `mkroom.c` squadmon.
- Change: `load_castle` + mazegrid/mazewalk/fill_empty_maze/drawbridge;
  throne `\\` escape; `squadmon` + barracks fill_zoo; add_doors_to_room.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **8708→22925**; RNG **8728→22948**; Scr **200→201**.
- Next: @22925 C valley.lua vs JS rn2(79) after getbones.

## 2026-07-19 09:10 — #835 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: none in `js/`. Documented Score in CURRENT.md from
  `__RESULTS_JSON__`: **37/44** PASS; Scr **8205**/11405; RNG
  **539317**/792838 (68.02%); speed `36+0.18/turn`. Δ vs #830:
  Scr **+23**, RNG **+5627** (D-0744/D-0745 seed0360 3098→8728).
- Verification: green+strict PASS; full sessions run complete.
- Next: seed0360 @8708 castle.lua vs JS rn2(79) after getbones.

