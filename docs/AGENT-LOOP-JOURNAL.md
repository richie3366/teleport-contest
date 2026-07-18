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

## 2026-07-18 17:45 — #747 D-0673 tower1 map lit=FALSE
- Objective: seed0367 @278 C blank vs JS temple wall scraps.
- C locus: `sp_lev.c` `lspo_map` lit default FALSE; `dat/tower1.lua`.
- Change: `load_tower1` clears map-cell `.lit` after apply (D-0673;
  ≡ Pri-loca D-0668). solidfill BOOL_RANDOM lit was kept by
  `sel_set_ter(...,false)` nochange → over-lit vision past nv=1.
- Verification: Scr **312→315**/324 prefix **278→283**; green+strict;
  cohort **34**/34. RNG FULL.
- Next: @283 materialize More — C blank vs JS `·` (26 cells).

## 2026-07-18 17:35 — #746 D-0672 moveloop see_monsters Warning/ESP
- Objective: seed0367 @262 Warning/`W` vs warn-digit cell positions.
- C locus: `allmain.c` once-per-input `see_monsters` when
  Unblind_telepat/Warning (`!mv || Blind`).
- Change: `js/allmain.js` call `see_monsters()` after `find_ac`
  (D-0672). Stale gbuf floats were not refreshed on ordinary steps.
- Verification: Scr **308→312**/324 prefix **262→278**; green+strict;
  cohort **34**/34. RNG FULL.
- Next: @278 materialize map — C blank vs JS temple wall scraps.

## 2026-07-18 17:25 — #745 public score cadence
- Objective: mandatory full `sessions` score (#745÷5).
- C locus: n/a (score refresh; primary still seed0367 @262 Warning).
- Change or falsified theory: none — docs only. Rotated journal
  #730–#734 → `archive/AGENT-LOOP-JOURNAL-2026-07-18-rotate15.md`.
- Verification: green+strict PASS; suite **34/44**; Scr **7062**/11405;
  RNG **465040**/792838 (58.66%); speed `35+0.17/turn` (R² 0.78).
  Δ vs #740: Scr **+41**, RNG +0, PASS +0 (peels #741–44 absorbed).
- Next: seed0367 @262 Warning/`W` vs warn-digit cell positions.

## 2026-07-18 17:20 — #744 D-0671 intemple canseemon voice
- Objective: seed0367 @258 C `A nearby voice intones` vs JS `The priest`.
- C locus: `priest.c` `intemple` (`canseemon` ? Monnam : nearby voice).
- Change: `js/priest.js` intone subject `canspotmon`→`canseemon`
  (ESP alone must not Monnam; D-0671).
- Verification: Scr **305→308**/324 prefix **258→262**; green+strict;
  cohort **34**/34. RNG FULL.
- Next: @262 Warning/`W` vs warn-digit cell positions.

## 2026-07-18 17:11 — #743 D-0670 Pri goal + lava lit + quest_portal pline
- Objective: seed0367 @209 lava `` ` `` / missing materialize More.
- C locus: `quest.lua` Pri goal/nexttime; `questpgr.c` deliver_by_pline;
  `sp_lev.c` light_region; `Pri-goal.lua`.
- Change: Pri goal/nexttime/othertime texts; `load_pri_goal`→
  `light_region` (lava stays lit); `quest_portal` line-at-a-time pline
  (D-0670).
- Verification: Scr **291→305**/324 prefix **209→258**; green+strict;
  cohort **32**/32. RNG FULL.
- Next: @258 intemple `A nearby voice` vs `The priest`.

## 2026-07-17 19:52 — #742 D-0669 tp_sensemon Unblind_telepat
- Objective: seed0367 @203 C W/&/ghost-blank vs JS warn digits.
- C locus: `display.h` `_tp_sensemon`; `worn.c` `recalc_telepat_range`.
- Change: `tp_sensemon` + `newsym` sense path; ESP range via setworn
  (D-0669). Ghost physical glyph is `' '`; mindless zombies stay warn.
- Verification: Scr **267→291**/324 prefix **203→209**; green+strict;
  cohort **32**/32. RNG FULL.
- Next: @209 lava `` ` `` vs JS blank after materialize More.

## 2026-07-17 19:39 — #741 D-0668 Pri-loca map lit=FALSE
- Objective: seed0367 @203 materialize — JS live Z/memory vs C warn/`~`.
- C locus: `dat/Pri-loca.lua`; `sp_lev.c` `lspo_map` lit=FALSE;
  `mkmaze.c` `set_levltyp_lit`.
- Change: `load_pri_loca` clears `SpLev_Map` `.lit` after map (D-0668).
  Global `sel_set_ter(false)`≡C deferred (seed0009 regress).
- Verification: @203 residual **27** cells (C W/& vs JS warn); Scr still
  267/324; green+strict PASS; cohort **33**/34. RNG FULL.
- Next: C physical W/& on dark morgue cells vs JS mon_warning only.
