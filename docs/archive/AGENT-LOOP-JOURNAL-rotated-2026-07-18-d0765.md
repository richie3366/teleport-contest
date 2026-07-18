# Rotated from AGENT-LOOP-JOURNAL.md (#765 score cadence)

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

