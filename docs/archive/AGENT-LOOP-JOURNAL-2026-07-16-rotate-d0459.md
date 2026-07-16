# Rotated from AGENT-LOOP-JOURNAL.md (#481–#485)

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

