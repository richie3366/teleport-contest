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

## 2026-07-16 04:05 — #485 score cadence + D-0451 sharpen
- Objective: mandatory full `sessions` score (#485 % 5 == 0); sharpen
  D-0451 without port patch.
- C locus: `dogmove.c` `dog_goal` fobj/`!rn2(4)`; `dog.c` `dogfood` →
  `zap.c` `obj_resists`.
- Change: none in `js/`. Documented #485 suite; refined D-0451 — after
  2 matched `obj_resists`, C still in fobj `dogfood`, JS at follow
  `!rn2(4)` (not invent dogfood).
- Verification: green+strict PASS; full suite **26/44**; Scr
  **4629**/11405; RNG **284968**/792838; speed `23+0.13/turn`. Δ vs
  #480: Scr +9, RNG +7334.
- Next: dump pet `mx/my` + in-SQSRCHRADIUS `fobj` count at @26692
  (D-0451).

## 2026-07-16 04:00 — #484 zap getobj? + RAY dobuzz (D-0450)
- Objective: seed0002 @25767 C `exercise` then `dobuzz` vs JS `rn2(5)`
  (PRIMARY).
- C locus: `invent.c` getobj `?`; `zap.c` `weffects`/`ubuzz`/`dobuzz`/
  `zap_hit`; `muse.c` `ureflects`.
- Change: `getobj_zap` cancelled on `?` so sleep wand never fired;
  ported `display_pickinv_reply` + RAY `ubuzz`/`dobuzz` (range, bounce,
  sleep hit, shield Reflecting). Deferred: IMMEDIATE/bhit/dig;
  mon_reflects; fireball/gas; setworn EReflecting bits.
- Verification: seed0002 prefix **25767→26692**; RNG matched
  **25921→26771**; Scr **320**/595; green+strict; cohort **24/24**.
- Next: seed0002 @26692 C `obj_resists` vs JS `rn2(4)` (D-0451).
## 2026-07-16 03:50 — #483 exerchk next_attrib_check (D-0449)
- Objective: seed0002 @25615 C `rn2(50)` @ `exerchk` vs JS wipe_engr
  `rn2(61)` (PRIMARY).
- C locus: `attrib.c` `exerchk`/`exercise`; `allmain.c` newgame
  `next_attrib_check = 600`.
- Change: JS `exerchk` only ran `exerper`; ported attribute-test loop
  (`rn2(AVAL)`, halve AEXE, `rn1(200,800)`), init check=600, Upolyd
  exercise gate. Deferred: STR/CON `encumber_msg` after exercise;
  Fixed_abil/Dunce.
- Verification: seed0002 prefix **25615→25767**; RNG matched
  **25725→25921**; Scr **320**/595; green+strict; cohort **24/24**.
- Next: seed0002 @25767 C `exercise` then `dobuzz` vs JS `rn2(5)`
  (D-0450).
## 2026-07-16 03:45 — #482 dopay → money2mon/next_ident (D-0448)
- Objective: seed0002 @19167 C `rnd(2)` @ `next_ident` (PRIMARY).
- C locus: `shk.c` `dopay`/`pay`/`money2mon`/`menu_pick_pay_items`/
  `dopayobj`; `mkobj.c` `splitobj`/`next_ident`; `cmd.c` `p`.
- Change: JS lacked `dopay` so `p` was unknown and `y` NE-attacked
  (`rn2(7)`); ported menu pay subset + wired `p`/`#pay`. Deferred:
  debit/robbed/angry, containers/used-up, traditional itemize,
  `paydoname`/`makeknown`, multi-shk getpos.
- Verification: seed0002 prefix **19167→25615**; Scr **313→320**; RNG
  matched **20315→25725**; green+strict; cohort **24/24** PASS.
- Next: seed0002 @25615 C `exerchk` `rn2(50)` vs JS `rn2(61)` (D-0449).

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

