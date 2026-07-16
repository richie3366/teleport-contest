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

## 2026-07-16 05:42 — #491 D-0453 travelcc clear
- Objective: seed0002 @26987 D-0453 primary (dog_goal udist).
- C locus: `hack.c` `findtravelpath` dest clear; `do.c` `goto_level` travelcc.
- Change: clear `travelcc`+`nomul(0)` when BFS step cell is destination;
  clear `travelcc` in `goto_level`. Root was stale travelcc → `_`+`.`
  walked JS hero (34,8) vs C (34,7) → pet `udist` gate. Deferred:
  travelmap visited arm; dog_move `m_in_out_region`/`m_digweapon_check`.
- Verification: seed0002 **26987→27050**; RNG **27042→27061**; Scr 323;
  green+strict; cohort **26/26**.
- Next: @27050 C `do_improvisation` vs JS `rn2(19)` (D-0454).

## 2026-07-16 05:25 — #490 score cadence + D-0453 DIAG
- Objective: mandatory full `sessions` score (#490 %5); D-0453 peel.
- C locus: `dogmove.c` `dog_goal` `udist>1` / `dog_move` place.
- Change: no code — DIAG only (removed). Score **26/44** Scr
  **4632**/11405 RNG **285242**/792838 (+3/+274 vs #485). D-0453:
  same dog_goal; JS udist=1 invent vs C rn2(4); JS stepped
  (32,7)→(33,8) with matching mfndpos RNG.
- Verification: green+strict PASS; full sessions documented.
- Next: C mx/my/ux/uy at @26987 (or JS place/postmov desync).

## 2026-07-16 05:16 — #489 D-0452 ureflects makeknown
- Objective: seed0002 @26883 D-0452 primary.
- C locus: `muse.c` `ureflects`; `o_init.c` `makeknown`/`discover_object`.
- Change: shield `ureflects` calls `makeknown(SHIELD_OF_REFLECTION)`
  after pline (WIS exercise on first discover). Deferred: W_WEP/
  W_AMUL/W_ARM/dragon; `mon_reflects`; setworn EReflecting.
- Verification: seed0002 **26883→26987**; Scr **322→323**; green+strict;
  cohort **24/24**.
- Next: @26987 C `dog_goal` vs JS `obj_resists` (D-0453).

## 2026-07-16 05:10 — #488 D-0451 lootmon + doforce TIME
- Objective: seed0002 @26692 D-0451 primary.
- C locus: `pickup.c` `doloot_core` lootmon; `cmd.c` `help_dir`/
  `xwaitforspace`; `lock.c` `doforce`.
- Change: `doloot` mon_beside → `getdir_cmdassist`; `help_dir` More
  quitchars only (bell on `f`); `doforce` no-box → ECMD_TIME.
  Deferred: forcelock occupation; loot_mon/saddle.
- Verification: seed0002 **26692→26883**; Scr **320→322**; green+strict;
  cohort **26/26**.
- Next: @26883 C `exercise`/`zap_hit` vs JS `rn2(20)` (D-0452).

## 2026-07-16 04:42 — #487 D-0451 door-step + #force TIME falsify
- Objective: seed0002 @26692 D-0451 — why JS pet→DOOR(35,5).
- C locus: `dogmove.c` `dog_move`/`dog_goal`; `lock.c` `doforce`;
  `mon.c` `mfndpos`.
- Change: none shipped. DIAG: prior appr=0 cnt=5→(35,5) D_NODOOR.
  Faithful empty-floor `doforce` ECMD_TIME (scalpel, no box) reverted —
  prefix 26692→**26426** (JS pet (31,7) udist=1 vs C `rn2(4)`).
  Unknown `#force` masks earlier pet-pos split.
- Verification: green+strict PASS; seed0002 still @26692 / Scr 320.
- Next: pet mx/my before step 511; why C omits DOOR(35,5) cand
  (D-0451). Do not ship `#force` yet.

## 2026-07-16 04:23 — #486 D-0451 state capture (pet udist)
- Objective: seed0002 @26692 D-0451 primary — falsify fobj-count vs
  pet-pos.
- C locus: `dogmove.c` `dog_goal`/`dog_move`; `mon.c` `mfndpos`.
- Change: none shipped. DIAG proved both had 2 in-radius fobj
  `obj_resists`; C invent-scans with `udist≤1`; JS `udist=5` after
  walking to DOOR(35,5). Map JS ROOM/VWALL vs C ndoor+CORR. Naive
  `doforce` port reverted (prefix 26692→26426).
- Verification: green+strict PASS; seed0002 still @26692 / Scr 320.
- Next: C vs JS terrain (34..35,5..7) + why C keeps pet after same
  selection RNGs (D-0451).

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

