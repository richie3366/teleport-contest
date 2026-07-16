# Agent loop journal archive (rotated at #485 score)

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
