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
