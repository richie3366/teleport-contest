# Agent loop journal archive

## 2026-07-14 23:25 — #355 score + D-0327 xkilled destroy

- Objective: mandatory full `sessions` (#355 %5) + seed0030 @1684.
- C locus: `mondata.h` `nonliving`; `mon.c` `xkilled` destroy/kill.
- Change: port `is_golem`/`weirdnonliving`/`nonliving`; `xkilled` verb
  (D-0327).
- Verification: full suite **19/44**, Scr **3258/11405** (28.57%), RNG
  **240657/792838**, speed `17+0.12/turn`; @1684 `destroy`; Scr
  **1820→1821**; first miss **@1821** blank C map; green+strict; 17 PASS
  cohort.
- Next: @1821 map clear/`docrt` on level transition.

## 2026-07-14 23:04 — #354 D-0326 newsym canspotself

- Objective: seed0030 @1606 Invis map `@` vs underfoot `%` (CURRENT).
- C locus: `display.h` `canspotself`; `display.c` `newsym` u_at.
- Change: port Blind/Invis/Invisible + `canspotself`; `map_location(show)`
  when `!see_self`; `display_self` only when spottable (D-0326).
- Verification: @1606 match; Scr **1606→1820**; first miss **@1684**
  destroy vs kill; RNG full; green+strict; 17 PASS cohort.
- Next: @1684 `xkilled` `nonliving` → `"destroy"`.

## 2026-07-14 22:58 — #353 D-0325 ARMOR xname OBJ_DESCR

- Objective: seed0030 @1601 `iron skull cap` vs `orcish helm` (CURRENT).
- C locus: `objnam.c` `xname_flags` ARMOR_CLASS — `!nn` → `dn`.
- Change: port ARMOR nn/un/dn + pair/set/shield !dknown arms (D-0325);
  `armor_simple_name` for called deferred (uses dn).
- Verification: @1601 match; Scr **1605→1606**; first miss **@1606**
  Invis map `@` vs `%`; RNG full; green+strict; 17 PASS cohort.
- Next: @1606 `newsym` `canspotself` — show under-hero glyph when Invisible.
## 2026-07-14 18:56 — D-0295/96 Monnam do_it + map_invisible

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @129.
- C locus: `do_name.c` `x_monnam` do_it; `mhitm.c` `pre_mm_attack` →
  `display.c` `map_invisible`.
- Change: `!canspotmon` → `It` in `Monnam` (D-0295); shared
  `canspotmon`; `map_invisible` `I` + `missmm`/`hitmm` pre_mm (D-0296).
- Verification: prefix **129→163**; Scr **843→853**; RNG full;
  green+strict; 19-session PASS cohort + strict.
- Next: prefix@163 C `(` vs JS `m` (mimic object appearance).

## 2026-07-14 18:51 — D-0294 mhitm noises You_hear

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @126.
- C locus: `mhitm.c` `noises` + `missmm`/`hitmm` `!gv.vis` (not `dosounds`).
- Change: port `noises`/`You_hear` + `far_noise`/`noisetime` rate limit;
  call from out-of-sight miss/hit (D-0294). Falsified dosounds hypothesis.
- Verification: prefix **126→129**; Scr **840→843**; RNG full; green+strict;
  17-session PASS cohort + strict.
- Next: prefix@129 C `It misses…` vs JS `The kitten misses…` (`Monnam`).


