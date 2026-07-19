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
## 2026-07-19 — #801 seed0108 newman (D-0718)
- Objective: seed0108 @3186 C `newman` `rn2(10)` vs JS `rn2(6)`.
- C locus: `polyself.c` `newman`/`polyman`/`change_sex`; `attrib.c`
  `redist_attr`; `exper.c` `rndexp`.
- Change: port newman envelope (level rn1, sex rn2(10), rndexp,
  redist_attr, HP/EN rebuild, hunger) + polyman restore; wire gate.
- Verification: green+strict PASS; prefix **3186→3564** RNG **3572**
  Scr **110**; cohort 33/33 PASS.
- Next: @3564 C `getbones` `rn2(3)` vs JS `rn2(5)`.

## ## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-19 — #800 score (mandatory ÷5)
- Objective: full public `sessions` score (iteration % 5 == 0).
- Score: **35/44** Scr **7695**/11405 RNG **513641**/792838 (64.79%)
  `36+0.18/turn` R² 0.785. Δ vs #795: Scr +16, RNG +352.
- Notable: seed0108 3283/16958 Scr 74 (prefix 3186 held); seed0014
  49495/575; seed2200 229/230 parked.
- Verification: green+strict PASS; no js/ change this iteration.
- Next: seed0108 @3186 C `newman` `rn2(10)` vs JS `rn2(6)` (D-0717).

## 2026-07-19 — #799 seed0108 set_mon_data umov prorate (D-0717)
- Objective: seed0108 @3011 post-invoke EOT loopAgain (CURRENT primary).
- C locus: `mondata.c` `set_mon_data`; `polyself.c` `set_uasmon`.
- Change: hero `u.umovement` prorate when new form slower (wizard→gnome→6
  kept through dragon); `set_uasmon` + shared `were.js` path.
- Verification: green+strict PASS; prefix **3011→3186** RNG **3283**;
  cohort prior PASSes held.
- Next: @3186 C `newman` `rn2(10)` vs JS `rn2(6)`.

## 2026-07-19 — #798 seed0108 wipe Blind sticky (D-0716)
- Objective: seed0108 @3011 after `#invoke` spaces (CURRENT primary).
- C locus: `potion.c` `make_blinded`/`toggle_blindness`; `youprop.h` Blind;
  `do.c` `wipeoff`.
- Change: Blind/`hero_Blind`/`vision_recalc` ≡ props not sticky;
  wipe `make_blinded` syncs `u.Blind` + `vision_recalc(0)` on toggle.
  Falsified: global `rest_on_space` (already). More restored; umov still short.
- Verification: green+strict PASS; prefix still **3011**; cohort
  seed1500/1800/0060 PASS; screens 58→74 on seed0108 runner.
- Next: @3011 C post-EOT `movemon` (umov<12 loopAgain) vs JS umov=15.

## 2026-07-19 — #797 seed0108 #invoke (D-0715)
- Objective: seed0108 @2958 distfleeck vs rn2(36) (CURRENT primary).
- C locus: `artifact.c` `doinvoke`/`arti_invoke`; `cmd.c` `"invoke"`.
- Change: EXT_CMDS `#invoke`→`doinvoke`; Mjollnir !inv_prop →
  nothing_happens+ECMD_TIME; `rest_on_space` space→donull branch.
  Falsified: force ROS=true (@2869 More regression).
- Verification: green+strict PASS; seed0108 **2958→3011**; cohort 33/33.
- Next: @3011 post-invoke spaces before chest wish (More vs wait).

## 2026-07-19 02:18 — #796 D-0714 polymon drop_weapon
- Objective: seed0108 @2881 obj_resists short (CURRENT primary).
- C locus: `polyself.c` `polymon`→`drop_weapon(1)` (`cantwield`).
- Change: port `drop_weapon` after `break_armor` (magic lamp→floor;
  "drop your tool!"). Not missing dog_goal invent scan.
- Verification: green+strict PASS; seed0108 **2881→2958**; cohort 33/33.
- Next: @2958 distfleeck rn2(5) vs rn2(36); or D-0708.

## 2026-07-19 02:08 — #795 score (mandatory ÷5)
- Objective: full public score refresh (iteration 795).
- Score: **35/44** Scr **7679**/11405 RNG **513289**/792838 (64.74%)
  `37+0.18/turn` (R² 0.786). Δ vs #790: Scr +25, RNG +75
  (D-0710…D-0713 peels).
- Verification: green+strict PASS; `node frozen/ps_test_runner.mjs sessions`.
- Next: seed0108 @2881 C `obj_resists` rn2(100) vs JS rn2(12); or D-0708.

## 2026-07-19 01:59 — #793 D-0713 #polyself / polymon
- Objective: seed0108 @2864 exercise/polyself (CURRENT primary).
- C locus: `wizcmds.c` `wiz_polyself`; `polyself.c` `polyself`/`polymon`.
- Change: EXT_CMDS `#polyself`; new `js/polyself.js` controlled getlin→
  polymon (exercise, sex rn2(10), mtimedone, mhmax, sliparm). D-0713 fixed.
- Verification: green+strict PASS; seed0108 **2864→2881**; cohort 33/33 PASS.
- Next: @2881 pet `obj_resists` short; or D-0708.

## 2026-07-19 01:52 — #792 D-0711 cream pie + D-0712 #wipe
- Objective: seed0108 @2807 use_cream_pie (CURRENT primary).
- C locus: `apply.c` `use_cream_pie`; `do.c` `dowipe`/`wipeoff`.
- Change: port cream-pie apply (`rnd(25)` blindinc); EXT_CMDS `#wipe`+
  wipeoff occupation (glop-off → `make_blinded(0,TRUE)`). D-0711/12 fixed.
- Verification: green+strict PASS; seed0108 **2807→2864**; cohort 14/14
  prior PASS stay PASS.
- Next: @2864 C `exercise` `rn2(2)` vs JS `rn2(7)` (#polyself); or D-0708.

## 2026-07-19 01:41 — #791 D-0710 #rub / dorub
- Objective: seed0108 @2778 dochug nearby (CURRENT primary).
- C locus: `apply.c` `dorub` / `wield.c` `wield_tool`; `hack.c` `nomul`.
- Change: `#rub` was AC-only; `n` became SE move (dist2 2→8). Port
  `dorub`+`wield_tool`+cmdq; `nomul` clears `_cmdq_canned`. D-0710 fixed.
- Verification: green+strict PASS; seed0108 **2778→2807**; cohort 10/10.
- Next: @2807 `use_cream_pie` rnd(25) (D-0711); or D-0708.

## 2026-07-19 01:30 — #790 score + D-0710 diagnose
- Objective: mandatory full `sessions` score (#790 % 5); peel seed0108.
- C locus: `monmove.c` `dochug` want_move / `monnear`.
- Change: no code fix. Score **35/44**, Scr **7654**/11405,
  RNG **513214**/792838 (64.73%), speed `36+0.19/turn`.
  D-0710: tame feline @2778 JS `nearby=false` (dist2=8) skips
  wanderer `rn2(4)`; C has `nearby=true` ⇒ earlier geometry.
- Verification: green+strict PASS; DIAG removed; suite documented.
- Next: pre-@2778 pet/hero adjacency; or seed0014 D-0708.

## 2026-07-19 01:24 — #789 D-0709 #wizwish + D-0708 sharpen
- Objective: CURRENT primary; pivoted seed0108 after D-0708 cell-ID stall.
- C locus: `cmd.c` extcmdlist `wizwish` → `wiz_wish`/`makewish`.
- Change: `EXT_CMDS` register `wizwish` (no AUTOCOMPLETE, ≡C).
  Also sharpened D-0708: C dest~(24,12); omit suspect `(22,10)`.
- Verification: green+strict PASS; seed0108 **2772→2778**; cohort 10/10.
- Next: seed0108 @2778 dochug rn2(4); or seed0014 D-0708.

## 2026-07-19 01:10 — #788 D-0708 mfndpos cnt (diagnose)
- Objective: seed0014 @49039 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.
- C locus: `monmove.c` `m_move`/`mfndpos` (peaceful gnome).
- Falsified: squeeze/gas already out; also hero one-step travel onto
  gnome neighbor (impossible from `(23,8)`). Mapped: same gnome
  `@48985` cnt=8 @`(24,11)` matched →`(23,11)`; JS 6 ROOM poss;
  `u=(24,9)`; hero-on-any-poss → cnt=5. No JS trap/mon on poss.
- Verification: green+strict PASS; DIAG removed; no code change.
- Next: which of 6 C omits (C-only trap/mon / earlier geometry /
  missing mfndpos arm); or seed0108.

## 2026-07-19 00:52 — #787 D-0708 mfndpos cnt (diagnose)
- Objective: seed0014 @49039 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.
- C locus: `monmove.c` `m_move`/`mfndpos` (not `distfleeck` body).
- Falsified: distfleeck arity; single-flank corners (@3061); squeeze/gas
  on `(22,10)`. Real: peaceful gnome `mfndpos` cnt 6 vs C 5.
- Verification: green PASS; no code change. Drop-any →49300 experiment.
- Next: which neighbor C omits + C predicate; or travel/map shared blocker.

## 2026-07-19 00:30 — #786 D-0707 corpse_chance always-TRUE
- Objective: seed0014 @43553 C `next_ident`/`rndmonst_adj` vs JS `rn2(3)`.
- C locus: `mon.c` `corpse_chance` bigmonst/lizard/golem/mplayer/rider/isshk.
- Change: port always-TRUE arms in `uhitm`/`mhitm`/`trap` `corpse_chance`.
- Verification: green+strict PASS; prefix **43553→49039** RNG **49495**;
  cohort 33/33 PASS. Scr still 575.
- Next: seed0014 @49039 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.

