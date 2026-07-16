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

## 2026-07-16 03:35 — #481 shop addtobill + append_honorific (D-0447)
- Objective: seed0002 @18457 C `rn2(4)` @ `append_honorific` (PRIMARY).
- C locus: `shk.c` `addtobill`/`append_honorific`/`get_cost`/`getprice`/
  `billable`/`costly_spot`; `pickup.c` `pick_obj`; objects `oc_cost`.
- Change: emit `oc_cost` via extractor; port bill quote subset; wire
  `pick_obj` robshop ushops → `addtobill`. Deferred: container bill,
  `remote_burglary`, gem glass pseudo-ID, `arti_cost`, Hallu currency.
- Verification: seed0002 prefix **18457→19167**; Scr **311→313**; RNG
  matched **19428→20315**; green+strict; cohort **26/26** PASS.
- Next: seed0002 @19167 C `rnd(2)` @ `next_ident` vs JS `rn2(7)`
  (D-0448).

## 2026-07-16 03:29 — #480 score cadence + D-0447 oc_cost blocker
- Objective: mandatory full `sessions` score (#480÷5); primary D-0447.
- C locus: `shk.c` `addtobill`/`append_honorific`; `pickup.c` `pick_obj`;
  objects extract `oc_cost`.
- Change: no port code. Score refreshed. Diagnosed D-0447 prerequisite:
  extractor omits `oc_cost` → cannot `get_cost` before bill quote.
- Verification: full suite **26/44**; Scr **4620**/11405; RNG
  **277634**/792838; speed `23+0.13/turn`; green+strict PASS.
- Next: emit `oc_cost` → `getprice`/`get_cost` → `addtobill` +
  `append_honorific` + `pick_obj` robshop wire (D-0447).

## 2026-07-16 03:26 — #479 seer_turn once-per-hero (D-0446)
- Objective: seed0002 @18354 C `rn2(5)` @ `distfleeck` vs JS `rn2(31)` (PRIMARY).
- C locus: `allmain.c` `moveloop_core` once-per-hero `seer_turn` / `rn1(31,15)`.
- Change: JS burned `rn1(31,15)` inside EOT; C runs it after the
  `umovement < NORMAL_SPEED` loop. Moved seer_turn update to
  once-per-hero (`js/allmain.js`); `do_vicinity_map` still deferred.
- Verification: seed0002 prefix **18354→18457**; Scr still **311**/595;
  green+strict; cohort **26/26** PASS.
- Next: seed0002 @18457 C `rn2(4)` @ `append_honorific` vs JS `rn2(5)`
  (D-0447).

## 2026-07-16 03:23 — #478 goto_level descend fall (D-0445)
- Objective: seed0002 @16501 goto_level descend fall rnd(3) (PRIMARY).
- C locus: `do.c` `goto_level` encumber/Punished/Fumbling fall `losehp(Maybe_Half_Phys(rnd(3)))`.
- Change: port descend Flying / fall / ordinary arms; `near_capacity()>UNENCUMBERED` burns `rnd(3)` before `mon_arrive`.
- Verification: seed0002 prefix **16501→18354**; Scr **292→311**/595; green+strict; cohort **26/26** PASS.
- Next: seed0002 @18354 C `rn2(5)` @ `distfleeck` vs JS `rn2(31)` (D-0446).

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
