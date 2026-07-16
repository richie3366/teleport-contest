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

## 2026-07-16 03:20 — #477 peffect_healing (D-0444)
- Objective: seed0002 @14081 peffect_healing (PRIMARY).
- C locus: `potion.c` `peffect_healing` / `peffects` / `healup`.
- Change: wired `POT_HEALING` — `You_feel` + `healup(8+d(4+2*bcsign,4),…)`
  + `exercise(A_CON)`; `healup` sets `flags.botl`.
- Verification: seed0002 prefix **14081→16501**; Scr **284→292**/595;
  green+strict; cohort **26/26** PASS.
- Next: seed0002 @16501 C `rnd(3)` @ `goto_level` descend fall vs JS
  `rn2(10)` `mon_arrive` (D-0445).

## 2026-07-16 03:14 — #476 rottenfood→occupation (D-0443)
- Objective: seed0002 @12530 umovement/SLT / eat EOT interleave (PRIMARY).
- C locus: `eat.c` `rottenfood` / `eatcorpse` / `start_eating`.
- Change: JS forced dont_start after non-faint rottenfood — C only
  dont_starts on faint; non-faint `consume_oeaten(…,2)` then eats.
  Ported `rottenfood` + fixed retcode so goblin meal sets occupation.
- Verification: seed0002 prefix **12530→14081**; Scr **247→284**/595;
  green+strict; cohort **26/26** PASS.
- Next: seed0002 @14081 C `d(4,4)` @ `peffect_healing` vs JS `rn2(5)`.

## 2026-07-16 03:10 — #475 score cadence + D-0443 SLT math
- Objective: mandatory full `sessions` score; D-0443 leftover hypothesis.
- C locus: `allmain.c` `u_calc_moveamt` / `moveloop_core`; eat occupation.
- Falsified: broken SLT trunc/`moveamt` — JS always +9, cycle 9→18→15→12
  from Burdened @~236 ≡ C eot~237. No code change. Score refreshed.
- Verification: full suite **26/44**; Scr **4556**/11405; RNG
  **270988**/792838; speed `22+0.13/turn`; green+strict PASS.
- Next: C goblin-eat `y` @12463 (4 EOTs) vs JS occupation/monscan
  between double-EOT halves.

## 2026-07-16 02:55 — #474 seed0002 @12530 umovement (D-0443)
- Objective: seed0002 @12530 C `obj_resists` vs JS `rn2(5)` (labeled zap).
- C locus: `allmain.c` `u_calc_moveamt`/`moveloop_core`; `dogmove.c`
  `dog_goal` invent walk when `appr==0` (`udist≤1`).
- Falsified: zap/`destroy_items`/`polyuse` missing rolls; short fobj.
  Diagnosed: C invent-scan with hero @41,18; JS early `H` move because
  SLT EOT left `umovement=15` (+6 phase lead). No code change.
- Verification: green gate PASS; rng-diff still @12530; DIAG removed.
- Next: find first turn JS umo leftover is +6 vs C; fix movement phase.

## 2026-07-16 02:44 — #473 safemon move + flee-teleport (D-0442)
- Objective: seed0002 @12222 C `rn2(5)` @ `distfleeck` vs JS `rn2(7)` @
  `do_attack`.
- C locus: `uhitm.c` `do_attack` safemon/`monflee`; `monmove.c` `dochug`
  mflee `rn2(40)` / mconf / mstun / courage.
- Change: stop clearing `context.move` on safemon in-the-way; set pet
  `mflee`/`mfleetim`; port dochug recover + flee-teleport (`can_teleport`
 /`rloc`) + courage. Not an extra hero attack — skipped monmove.
- Verification: seed0002 prefix **12222→12530**; Scr **242→247**/595;
  green+strict; cohort **24/24** PASS.
- Next: seed0002 @12530 C `obj_resists` `rn2(100)` vs JS `rn2(5)`.

## 2026-07-16 02:40 — #472 nh_timeout CONFUSION (D-0441)
- Objective: seed0002 @11487 C `rn2(61)` wipe_engr vs JS `rn2(2)`.
- C locus: `timeout.c` `nh_timeout` case CONFUSION; `potion.c`
  `make_confused(0,TRUE)`.
- Change: expire `HConfusion` in `js/timeout.js`; export async
  `make_confused` with talk `You_feel`; `exerper` uses HConfusion/HStun.
  Not wipe_engr/invault — stale Confusion → every-5 WIS abuse.
- Verification: seed0002 prefix **11487→12222**; Scr **233→242**/595;
  green+strict; cohort **24/24** PASS.
- Next: seed0002 @12222 C `rn2(5)` @ `distfleeck` vs JS `rn2(7)` @
  `do_attack`.
## 2026-07-16 02:33 — #471 run-into-visible stop (D-0440)
- Objective: seed0002 @11309 C `rn2(5)` @ `u_maybe_impaired` vs
  JS `rn2(20)` (after matched impaired+2×confdir on capital-`L` run).
- C locus: `hack.c` `domove_core` run-into-visible non-safemon gate.
- Change: port stop in `js/cmd.js` `domove` before `do_attack`
  (`nomul(0)` + `move=0`; forcefight excluded). Not a second
  confusion gate — confdir had steered into a visible hostile.
- Verification: seed0002 prefix **11309→11487**; Scr still
  **233**/595; green+strict; cohort **24/24** PASS.
- Next: seed0002 @11487 C `rn2(61)` wipe_engr @ `moveloop_core` vs
  JS `rn2(2)` after exercise.
## 2026-07-16 02:28 — #470 score + ohitmon (D-0439)
- Objective: mandatory full `sessions` score (#470÷5); primary
  seed0002 @11150 C `rnd(20)` @ `ohitmon` vs JS `rn2(5)` (`distfleeck`).
- C locus: `mthrowu.c` `ohitmon` / `m_throw`; `dothrow.c` `omon_adj`.
- Change: port `ohitmon` + `omon_adj`; wire `m_throw` mon-hit path
  (miss-with-range continues; hit → `dmgval`/`drop_throw`).
- Verification: full suite **26/44** Scr **4503**/11405 RNG
  **267277**/792838 speed `22+0.13/turn`; seed0002 prefix
  **11150→11309**; Scr still **233**/595; green+strict; cohort
  seed0013/1800/0004/0104 PASS.
- Next: seed0002 @11309 C `rn2(5)` @ `u_maybe_impaired` vs JS
  `rn2(20)`.
## 2026-07-16 02:21 — #469 peffect_booze (D-0438)
- Objective: seed0002 @10634 C `d(3,8)` @ `peffect_booze` vs JS
  `rn2(5)` (`distfleeck`) (PRIMARY).
- C locus: `potion.c` `peffect_booze`; `eat.c` `init_uhunger`/`newuhs`.
- Change: wire POT_BOOZE; port peffect_booze (`d(2+uhs,8)`, healup,
  hunger, exercise, cursed pass-out); init `uhs=NOT_HUNGRY`; field-only
  `newuhs` from metabolism/nutrition.
- Verification: seed0002 prefix **10634→11150**; Scr still **233**/595;
  RNG matched **11598**/27158; green+strict; cohort **26/26**.
- Next: seed0002 @11150 `ohitmon` `rnd(20)`.
## 2026-07-16 02:16 — #468 u_maybe_impaired (D-0437)
- Objective: seed0002 @10550 C `rn2(5)` @ `distfleeck` vs JS `rn2(12)` @
  `m_move` (PRIMARY — was monmove path split after confusion).
- C locus: `hack.c` `u_maybe_impaired` / `impaired_movement`; `cmd.c`
  `confdir`.
- Change: JS `domove` skipped Confusion `!rn2(5)`; ported helpers and
  call before `m_at` (C `domove_core` order). DIAG showed JS already in
  hostile `m_move` track while C still on first `distfleeck`.
- Verification: seed0002 prefix **10550→10634**; Scr still **233**/595;
  RNG matched **10667**/27158; green+strict; cohort **26/26**.
- Next: seed0002 @10634 `peffect_booze` `d(3,8)`.
## 2026-07-16 02:08 — #467 peffect_confusion (D-0436)
- Objective: seed0002 @10511 C `rn2(7)` @ `peffect_confusion` vs
  JS `rn2(5)` (PRIMARY).
- C locus: `potion.c` `peffect_confusion` / `make_confused` /
  `itimeout_incr`.
- Change: JS deferred POT_CONFUSION; ported peffect msgs +
  `rn1(7,16-8*bcsign)` via `make_confused` TIMEOUT + Confusion mirror.
- Verification: seed0002 prefix **10511→10550**; Scr **233**/595;
  green+strict; cohort **26/26**.
- Next: seed0002 @10550 `distfleeck` vs `m_move`.
## 2026-07-16 02:04 — #466 SCR_ENCHANT_WEAPON (D-0435)
- Objective: seed0002 @8863 C `exercise` rn2(19) vs JS `rn2(5)` (PRIMARY).
- C locus: `read.c` `seffect_enchant_weapon`/`cap_spe`; `wield.c`
  `chwepon`; `potion.c` `strange_feeling`.
- Change: JS gated ENCHANT_WEAPON unimplemented; ported seffect +
  chwepon glow/spe (scalpel +0→+1 blue moment) + doread/seffects wire.
- Verification: seed0002 prefix **8863→10511**; Scr **194→233**/595;
  RNG matched **10900**/27158; green+strict; cohort **26/26**.
- Next: seed0002 @10511 `peffect_confusion` (`rn2(7)`).
## 2026-07-16 01:55 — #465 score + drinksink (D-0434)
- Objective: mandatory full `sessions` score (#465÷5); primary
  seed0002 @8831 drinksink.
- C locus: `potion.c` `dodrink` sink yn; `fountain.c` `drinksink`/
  `breaksink`.
- Change: full suite **26/44** Scr **4503**/11405 RNG
  **267277**/792838 speed `22+0.13/turn`. Ported sink yn +
  `drinksink` switch + `breaksink` (D-0434).
- Verification: seed0002 prefix **8831→8863**; Scr **190→194**/595;
  green+strict; cohort **24/24**.
- Next: seed0002 @8863 `SCR_ENCHANT_WEAPON` / seffects exercise
  vs doread unimplemented gate.
## 2026-07-16 01:50 — #464 closed-door rush bump (D-0433)
- Objective: seed0002 @8609 C `exercise` rn2(2) vs JS `rnl(20)` (PRIMARY).
- C locus: `hack.c` `test_move` closed_door autoopen/bump; `attrib.c`
  `exercise`.
- Change: JS `end_running()` before autoopen `!run` check forced
  `doopen_indir` on capital-H rush; C bumps when run set. Ported
  orthogonal Ouch+`exercise(A_DEX,FALSE)` / “That door is closed.”
- Verification: seed0002 prefix **8609→8831**; Scr **172→190**/595;
  RNG matched **9227**/27158; green+strict; cohort **24/24**.
- Next: seed0002 @8831 `drinksink` rn2(20) vs JS rn2(5).
## 2026-07-16 01:45 — #463 SCR_REMOVE_CURSE (D-0432)
- Objective: seed0002 @6954 C `exercise` rn2(19) vs JS rn2(5) (PRIMARY).
- C locus: `read.c` `doread` nodisappear / `seffects` /
  `seffect_remove_curse`; `mkobj.c` `uncurse`; `do_name.c` `trycall`.
- Change: JS gated SCR_REMOVE_CURSE unimplemented; C cursed remove-curse
  read `v` exercises WIS, You_feel + disintegrates, then trycall
  (“helping you”). Ported seffect_remove_curse/uncurse + nodisappear +
  trycall wire.
- Verification: seed0002 prefix **6954→8609**; Scr **126→172**/595;
  RNG matched **8887**/27158; green+strict; cohort **24/24**.
- Next: seed0002 @8609 H-rush door bump `exercise` rn2(2) vs JS
  `doopen_indir` rnl(20).
