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

## 2026-07-21 01:01 — #1079 D-0928 linedup falsified → place
- Objective: seed4500 @88377 C `linedup` `rn2(2)` vs JS `rn2(5)`.
- C locus: `mthrowu.c` `linedup` (symptom); real: `teleport.c`
  `collect_coords` after `place_lregion` ~82426.
- Falsified: boulder/`rn2(2+spots)`. DIAG: dragon breath
  `(47,10)→(42,6)` not collinear → no linedup rn2; next mon
  `distfleeck`. C `@`(39,5→39,4) Blind vs JS `(42,6)` from ~82600.
- Verification: green+strict PASS; no production JS change; prefix
  still **88377**.
- Next: port Dlvl-24 hero place / `collect_coords` candidates;
  cadence @#1080.

## 2026-07-21 00:53 — #1078 D-0927 rhack F-prefix reject
- Objective: seed4500 @87803 C `distfleeck` `rn2(5)` vs JS `rn2(20)`.
- C locus: `cmd.c` `rhack` / `do_fight` (PREFIXCMD + CMD_gGF_PREFIX).
- Change: F-prefix + non-movement must pline and **not** execute the
  next command (was silent-clear then still run `#` → key desync so
  `h` walked/attacked instead of wield letter). Root not distfleeck.
- Verification: prefix **87803→88377** RNG **88484** Scr **808**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800
  PASS (7/7).
- Next: @88377 C `linedup` `rn2(2)` vs JS `rn2(5)`; cadence @#1080.

## 2026-07-21 00:48 — #1077 D-0926 mhitm_ad_blnd mhitu
- Objective: seed4500 @87218 C `distfleeck` `rn2(5)` vs JS `rn2(8)`.
- C locus: `uhitm.c` `mhitm_ad_blnd` (youmonst); `mondata.c`
  `can_blnd` AT_CLAW; `potion.c` `make_blinded`.
- Change: port mhitu `mhitm_ad_blnd_u` + wire `AD_BLND`. Root: omitted
  raven claw blind → no `It` hitmsgs → extra `--More--` → key ahead
  → premature minotaur `collect_coords` (not a distfleeck bug).
- Verification: prefix **87218→87803** RNG **88082** Scr **794**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800
  PASS (7/7).
- Next: @87803 C `distfleeck` `rn2(5)` vs JS `rn2(20)`; cadence @#1080.

## 2026-07-21 00:37 — #1076 D-0925 breamm / AT_BREA
- Objective: seed4500 @86672 C `breamm` `rn2(3)` vs JS `rn2(5)`.
- C locus: `mthrowu.c` `breamm`/`breamu`; `mhitu.c` AT_BREA;
  `zap.c` `dobuzz`/`zap_over_floor` ZT_FIRE pool; `mondata.c`
  `get_atkdam_type`/`cvt_adtyp_to_mseenres`.
- Change: port `breamm`/`breamu` + wire AT_BREA; export `dobuzz` with
  fire-pool steam + poison-gas 1×1 trail; `zhitm` fire `burnarmor`.
  Root: skipped monster breath after distfleeck (omit since D-0900).
- Verification: prefix **86672→87218** RNG **87347** Scr **759**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1500/1800
  PASS. (Door-absorb pline kept for type≥0 — seed0002 screen).
- Next: @87218 C `distfleeck` `rn2(5)` vs JS `rn2(8)`; cadence @#1080.

## 2026-07-21 00:30 — #1075 cadence + D-0924 splitobj invent splice
- Objective: mandatory full score @#1075; seed0002 regressed 42→41.
- C locus: `mkobj.c` `splitobj` (nobj only); invent letters via
  `eat.c` `touchfood` freeinv+`addinv_nomerge`.
- Change: remove D-0923 invent[] splice from `splitobj`. Root:
  premature invent[] insert → duplicate invlets → extra pet
  `obj_resists`. Keep touchfood invent re-slot + FOOD oeaten mergable.
- Verification: suite **42/44** Scr **10349**/11405 RNG **97.29%**
  (`32+0.24/turn`); seed0002 FULL PASS; seed4500 still @86672
  `breamm`; green+strict PASS.
- Next: @86672 C `breamm` `rn2(3)` vs JS `rn2(5)`; cadence @#1080.

## 2026-07-21 00:26 — #1074 D-0923 touchfood invent slot
- Objective: seed4500 @82793 C `steal` `rn2(23)` vs JS `rn2(22)`.
- C locus: `eat.c` `touchfood` freeinv+`addinv_nomerge`; `mkobj.c`
  `splitobj` invent insert; `invent.c` `mergable` oeaten/orotten.
- Change: port touchfood invent re-slot + invent splitobj splice +
  mergable FOOD oeaten. Root: partly-eaten apple missing from invent[].
  Named omit: sellobj_state invent-full dropy; COST_BITE.
- Verification: prefix **82793→86672** RNG **86798** Scr **759**;
  green+strict PASS; eat cohort 4/4 PASS.
- Next: @86672 C `breamm` `rn2(3)` vs JS `rn2(5)`.

## 2026-07-21 00:18 — #1073 D-0922 wakeup wake_nearto
- Objective: seed4500 @82788 C `distfleeck` `rn2(5)` vs JS `rn2(50)`.
- C locus: `mon.c` `wakeup` → `growl`; `sounds.c` `growl` →
  `wake_nearto(mlevel*18)`.
- Change: `wakeup` was_sleeping → `wake_nearto`; growl/yelp radii.
  Root: deferred growl radius left water nymph asleep → disturb.
  Named omit: wake_msg / growl pline from wakeup.
- Verification: prefix **82788→82793** RNG **86800** Scr **755**;
  green+strict PASS; cohort 15/15 PASS.
- Next: @82793 C `steal` `rn2(23)` vs JS `rn2(22)`.

## 2026-07-21 00:12 — #1072 D-0921 minetn-4 College Town
- Objective: seed4500 @61698 C nhlib shuffle `rn2(3)` vs JS `rn2(79)`
  after matched `getbones`/`makemaz` `rnd(7)=4`.
- C locus: `dat/minetn-4.lua` via `makemaz`/`load_special`; nhlib
  `shuffle(align)`.
- Change: port `load_minetn_4` + dispatch; `book shop`→`BOOKSHOP`.
  Root: omitted College Town → empty level → `rn2(79)`.
  Named omit: minetn-1/6/7.
- Verification: prefix **61698→82788** RNG **83013** Scr **747**;
  green+strict PASS; cohort 15/15 PASS.
- Next: @82788 C `distfleeck` `rn2(5)` vs JS `rn2(50)`.

## 2026-07-21 00:09 — #1071 D-0920 TROUBLE_HIT fix_worst_trouble
- Objective: seed4500 @61689 C `fix_worst_trouble` `rnd(5)` vs
  JS `rn2(1000)` after matched `pleased` `rnl(2)`.
- C locus: `pray.c` `critically_low_hp` / `in_trouble` /
  `fix_worst_trouble` TROUBLE_HIT / `pleased` action switch.
- Change: port critically_low_hp + TROUBLE_HIT detect/fix; wire
  pleased `min(action,5)` cases. Root: stubbed in_trouble→0 skipped
  HIT `rnd(5)` uhpmax boost.
- Verification: prefix **61689→61698** RNG **61837** Scr **654**;
  green+strict PASS; cohort 15/15 PASS.
- Next: @61698 C nhlib.lua shuffle `rn2(3)` vs JS `rn2(79)`.

## 2026-07-20 00:05 — #1070 D-0919 FAST TIMEOUT + score
- Objective: cadence score + seed4500 @61462 C distfleeck rn2(5) vs
  JS rn2(1000) (prayer_done rnz early).
- C locus: `timeout.c` `nh_timeout` `case FAST`; `youprop.h` Very_fast.
- Change: decrement HFast TIMEOUT; You_feel slow-down when !Very_fast.
  Root: sticky Very_fast → free umove → skip post-descend EOT → early #pray.
- Verification: full suite **42/44** Scr **10233**/11405 RNG **94.13%**;
  prefix **61462→61689** RNG **61766** Scr **643**; green+strict;
  cohort 15/15.
- Next: @61689 C `fix_worst_trouble` rnd(5) vs JS rn2(1000).

## 2026-07-20 23:57 — #1069 D-0918 drag_down / ballrelease
- Objective: seed4500 @55990 C `drag_down` rn2(2) vs JS rn2(50).
- C locus: `ball.c` `drag_down`/`ballrelease`/`litter`; `do.c`
  `goto_level` descend; `youprop.h` Punished≡(uball!=0).
- Change: port drag_down/ballrelease/litter; wire stair-fall when
  `u.uball` (not sticky `u.Punished`). Named omit: litter hitfloor/
  yname/Soundeffect; ballfall.
- Verification: prefix **55990→61462** RNG **61496** Scr **622**;
  green+strict PASS; cohort 13/13 PASS + strict lengths.
- Next: @61462 C `distfleeck` rn2(5) vs JS rn2(1000); cadence @#1070.

## 2026-07-20 23:51 — #1068 D-0917 fill_ordinary_room subroom recursion
- Objective: seed4500 @54329 C somex rn2(2) vs JS rn2(12).
- C locus: `mklev.c` `fill_ordinary_room` nsubrooms loop before needfill.
- Change: recurse `fill_ordinary_room(subroom, false)` then needfill gate
  (Nesting mid/inner fill before outer). Named omit: Fake Delphi/Huge/
  Mausoleum/Twin nested bodies; `u.uhave.amulet` arm of sleeping-mon gate.
- Verification: prefix **54329→55990** RNG **57748** Scr **613**;
  green+strict PASS; cohort 13/13 PASS + strict lengths.
- Next: @55990 C `drag_down` rn2(2) vs JS rn2(50); cadence @#1070.

## 2026-07-20 23:50 — #1067 D-0916 Nesting nested + lspo_door rnddoor
- Objective: seed4500 @52803 C themerms/nhlib rn2(5) vs JS rn2(1000).
- C locus: `themerms.lua` Nesting contents; `nhlib.lua` math.random;
  `sp_lev.c` create_subroom / lspo_door / rnddoor / create_door.
- Change: `themeroom_nesting_contents` mid+inner subrooms/doors;
  `splev_room_door` burns rnddoor() when state=random (mask stays -1).
  Named omit: Fake Delphi/Huge/Mausoleum/Twin nested; Random-feature
  center terrain.
- Verification: prefix **52803→54329** RNG **54647** Scr **613**;
  green+strict PASS; cohort 13/13 PASS + strict lengths.
- Next: @54329 C somex rn2(2) vs JS rn2(12); cadence @#1070.

