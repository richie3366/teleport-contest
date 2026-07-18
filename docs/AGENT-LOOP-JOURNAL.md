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

## 2026-07-18 19:44 — #760 score + D-0683 water_damage erode
- Objective: mandatory full score (#760÷5); seed0014 @16304 dipfountain.
- C locus: `trap.c` `water_damage`/`erode_obj`; `fountain.c` `dipfountain`.
- Change: D-0683 — `water_damage` → `await erode_obj(ERODE_RUST)`;
  suite Score **35/44** Scr **7451** RNG **480248** (60.57%).
- Verification: prefix **16304→16447**, Scr **365→383**/714; green+strict
  PASS; cohort **35**/35.
- Next: @16447 C `gush`/`dogushforth` `rn2(7)`.

## 2026-07-18 19:42 — #759 D-0682 zhitm wand-ray damage
- Objective: seed0014 @14566 C `zhitm` `d(6,6)` vs JS `rn2(10)`.
- C locus: `zap.c` `zhitm`/`dobuzz`/`destroy_items`/`resist`.
- Change: D-0682 — port `zhitm` damage types; cold `destroy_items` +
  wand `resist`; wire kill/`wakeup` in `dobuzz`.
- Verification: prefix **14566→16304**, Scr **298→365**/714; green+strict
  PASS; cohort **33**/33.
- Next: @16304 C `dipfountain` `rn2(2)` vs JS `rnd(30)`.

## 2026-07-18 19:33 — #758 D-0681 cursed_book + aggravate
- Objective: seed0014 @9354 C `cursed_book` `rn2(3)` vs JS `rn2(5)`.
- C locus: `spell.c` `cursed_book`/`study_book`; `wizard.c` `aggravate`.
- Change: D-0681 — port `cursed_book` (`rn2(oc_level)`); wire too_hard
  nomul + `!rn2(3)` crumble; `aggravate` wake/unfreeze.
- Verification: prefix **9354→14566**, Scr **221→298**/714; green+strict
  PASS; cohort **33**/33.
- Next: @14566 C `zhitm` `d(6,6)` vs JS `rn2(10)`.

## 2026-07-18 19:30 — #757 D-0680 POT_SICKNESS peffect_sickness
- Objective: seed0014 @6294 C `exercise` `rn2(19)` vs JS `rn2(5)`.
- C locus: `potion.c` `peffect_sickness`/`peffects`; `o_init.c`
  `discover_object` credit_hero → `exercise(A_WIS,TRUE)`.
- Change: D-0680 — port `peffect_sickness`; wire `POT_SICKNESS` so
  `dopotion` `makeknown` runs (blessed path observed).
- Verification: prefix **6294→9354**, Scr **154→221**/714; green+strict
  PASS; cohort **35**/35.
- Next: @9354 C `cursed_book` `rn2(3)` vs JS `rn2(5)` (`study_book`).

## 2026-07-18 19:20 — #756 D-0679 forcelock + supply + SPBOOK mrg
- Objective: seed0014 @3199 C `forcelock` `rn2(100)` vs JS `rn2(20)`.
- C locus: `lock.c` `doforce`/`forcelock`/`breakchestlock`; `mklev.c`
  supply chest; `objects.h` SPELL BITS mrg=0.
- Change: D-0679 — forcelock occupation; supply `add_to_container`;
  `oc_merge_of` excludes SPBOOK/WAND.
- Verification: prefix **3199→6294**, Scr **43→154**/714; green+strict
  PASS; cohort **33**/33.
- Next: @6294 C `exercise` vs JS `rn2(5)`.

## 2026-07-18 19:12 — #755 public score cadence
- Objective: mandatory %5 full `sessions` score + CURRENT refresh.
- C locus: n/a (score-only iteration).
- Change: documented suite — **35/44** PASS; Scr **7111**/11405;
  RNG **467265**/792838 (58.94%); `35+0.16/turn` (R² 0.79).
  seed0367 confirmed PASS in full suite (Δ vs #750 +1 PASS, +43 Scr).
- Verification: green+strict PASS; `node frozen/ps_test_runner.mjs sessions`.
- Next: seed0014 @3199 `forcelock` rn2(100); or seed0108 wishlist.

## 2026-07-18 19:10 — #754 D-0678 SCR_IDENTIFY
- Objective: seed0014 @3113 C `exercise` vs JS non-identify path.
- C locus: `read.c` `seffect_identify`/`seffects`; `invent.c`
  `identify_pack`/`not_fully_identified`.
- Change: D-0678 — wire SCR_IDENTIFY; invent identify helpers.
- Verification: prefix **3113→3199**, Scr **34→43**/714; green+strict
  PASS; cohort **33**/33.
- Next: @3199 C `forcelock` `rn2(100)`.

## 2026-07-18 19:05 — #753 D-0677 chargen rigid n>1 only
- Objective: seed0014 early FAIL @1 (gem colors vs pick_align).
- C locus: `role.c` `plsel_startmenu` / genl `n>1` align branch.
- Change: D-0677 — `pick_{race,gend,align}_menu` call
  `rigid_role_checks` only when opening a menu (`n>1`); `n<=1`
  auto-assign skips `pick_*` RNG (Valkyrie+dwarf lawful).
- Verify: seed0014 prefix **1→3113** Scr **10→34**; green+strict;
  cohort 12/12 (seed0077 chargen + seed0367).
- Next: @3113 `exercise` vs identify; or seed0108 wishlist.

## 2026-07-18 18:55 — #752 D-0676 seed0367 attributes PASS
- Objective: seed0367 @318 `(1 of 3)` vs `(1 of 2)`; spellbook vs weapon.
- C locus: `weapon.c` `weapon_descr`; `insight.c` attrs Fire/Shock/
  `item_resistance`/Blind_telepat/Warning; `attrib.c` `from_what` FAST.
- Change: D-0676 — oclass `weapon_descr`; Fire/Shock/AD_ELEC item_res/
  ESP/Warning in `doattributes`; FAST+Very_fast → worn equipment.
- Verify: seed0367 **PASS** 324/324; green+strict; cohort 10/10.
- Next: non-PASS survey (seed0014 / seed0108); leaderboard cron.

## 2026-07-18 18:45 — #751 D-0675 clear_regions
- Objective: seed0367 @297 C `x` vs JS blank at (23,14) TRWALL.
- C locus: `region.c` `clear_regions`; `mklev.c` `clear_level_structures`;
  `do.c` `goto_level` save/rest_regions.
- Change: D-0675 — port `clear_regions`; call from
  `clear_level_structures`; stash/rest regions on goto_level. Stale
  prior-level fog at (22,13) blocked `q4_path` (not `right_side`).
- Verification: prefix **297→318** Scr **314→322**/324 RNG FULL;
  green+strict PASS; cohort **32**/32.
- Next: @318 attributes `1 of 3` vs JS `1 of 2` (enlightenment).

## 2026-07-18 18:35 — #750 public score + D-0675 diagnose
- Objective: mandatory full `sessions` score (#750 % 5 == 0); seed0367 @297.
- C locus: `vision.c` `right_side` / COULD_SEE (diagnose only).
- Change: score refresh only — **34/44** Scr **7068**/11405 RNG
  **465040** (58.66%) `35+0.16/turn`. Δ vs #745 Scr **+6**.
  D-0675: game(23,14) TRWALL lit viz=0 (row14 rmax=22); not (72,16).
- Verification: green+strict PASS; full suite recorded in CURRENT.
- Next: `right_side` finger so TRWALL gets set_cs (D-0675).

## 2026-07-18 18:20 — #749 D-0674 gas-cloud does_block
- Objective: seed0367 @283 C blank vs JS `·` (26 cells).
- C locus: `vision.c` `does_block`; `region.c` `add_region`/`run_regions`;
  `allmain.c` after `nh_timeout`.
- Change: D-0674 — `_blocks`→`visible_region_at`; create/expire
  `recalc_block_point`; `run_regions` ttl. Was fog on LOS (22,13),
  not Algorithm-C. Next D-0675 @297 (23,14) wall.
- Verification: prefix **283→297** Scr **315→314** RNG FULL;
  green+strict PASS; cohort **32**/32.
- Next: @297 map(23,14) C `x` vs JS blank (D-0675).

## 2026-07-18 18:00 — #748 D-0674 Pri-loca Algorithm-C NW cone
- Objective: seed0367 @283 C blank vs JS `·` (26 cells).
- C locus: `vision.c` `left_side`/`view_from`; `dat/Pri-loca.lua`.
- Change or falsified theory: darkroom/lit/memory **falsified** — JS
  `cansee`+lit+ROOM on all 26; hero (37,19) Pri-loca return; over-mark
  COULD_SEE past temple SW ~31,16. No code change (stop before shim).
- Verification: green+strict PASS; seed0367 Scr 315/324 RNG FULL; DIAG
  removed.
- Next: port/compare C `left_side` NW finger vs JS (D-0674).

