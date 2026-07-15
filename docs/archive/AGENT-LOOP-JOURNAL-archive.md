# Agent loop journal archive

## 2026-07-15 10:05 — D-0376 bag put-in (seed0012 @13517)
- Objective: seed0012 @13517 C move_special rn2(1) vs JS fleeck rn2(5).
- C locus: pickup.c use_container/in_container/menu_loot/query_category;
  jsmain CR→LF; cmd C('j') rush; symptom shk_move onlineu.
- Change: port put-in coins path (query_putin_category + menu_loot_putin +
  in_container). Root: stubbed 'i' left $\r$\r → LF rush-south → uy+1 →
  missed earlier onlineu home return (D-0376).
- Verification: prefix 13517→13576; RNG 13591→13635 cursors 259→270;
  green+strict PASS; cohort 22/22.
- Next: seed0012 @13576 C dog_move rn2(1) vs JS rn2(4).

## 2026-07-15 01:20 — #363 D-0339 `)` doprwep

- Objective: seed0013-restore @62 `)` bare handed (CURRENT primary).
- C locus: `invent.c` `doprwep` / `wield.c` `empty_handed`.
- Change: `doprwep` !uwep pline + wielded `xprname`; bind `)` (D-0339).
- Verification: Scr **68→69**/99; first miss `@64` `[`; RNG full;
  green+strict; 21 PASS cohort incl. seed0013-rogue.
- Next: `@64` `[` / `doprarm` worn-armor display.

## 2026-07-15 01:13 — #362 D-0335…0338 save/restore + showgold

- Objective: seed0013-restore Scr 47/99 (CURRENT primary).
- C locus: `save.c` dosave; `restore.c` dorecover; `allmain` welcome/
  preamble; `invent` doprgold; `wintty` dmore quitchars.
- Change: JSON VFS save/restore + `S` (D-0335); welcome-back align gate
  (D-0336); attributes quitchars (D-0337); `$`/`doprgold` (D-0338).
- Verification: RNG **full 4804**; Scr **47→68**/99; first miss `@62` `)`;
  green+strict; 8 PASS cohort incl. seed0013-rogue.
- Next: `@62` `)` bare-handed / `doprwep`.

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


- Next: `uhitm.c` `hitum` secondary `uswapwep` swing.

## 2026-07-15 01:40 — #365 score + D-0342/0343 restore PASS

- Objective: #365 public score + seed0013-restore `@71` reveal_terrain.
- C locus: `detect.c` reveal_terrain_getglyph; `getpos.c` tip/quitchars.
- Change: TER_MAP getglyph/show (D-0342); tip skip-docrt under
  terrainmode + space → Done (D-0343).
- Verification: restore **99**/99 PASS; suite **22/44** Scr **3499**/11405
  RNG **239942**/792838 `18+0.12/turn`; green+strict+cohort.
- Next: seed0107 `#twoweapon` unbound @15.

## 2026-07-15 06:56 — D-0366 doup + in-memory getlev (seed0012 @6924)
- Objective: seed0012 @6924 C getlev rnd(10) vs JS fleeck.
- C locus: do.c doup; dungeon.c prev_level; restore.c getlev hide rnd(10).
- Change: `<`→doup/prev_level; stash VISITED|LFILE_EXISTS+omoves; restore
  + mon_catchup + hide_monst gate; climb-up pline (D-0366).
- Verification: prefix 6924→6952; RNG 7052→7202; green+strict; cohort 24/24.
- Next: seed0012 @6952 C dog_move rn2(12) vs JS rn2(1).

## 2026-07-15 06:50 — D-0365 multi `,` query_objlist (seed0012 @3483)
- Objective: seed0012 @3483 C dog_goal obj_resists vs JS dog_move rn2(3).
- C locus: pickup.c pickup/query_objlist PICK_ANY; hack.c dopickup.
- Change: multi-object `,` menu (letter toggle + Enter); was stub that
  leaked b/\\n/n as movement → hero desync → skipped invent resists.
- Verification: prefix 3483→6924; RNG 3638→7052; green+strict; cohort 24/24.
- Next: seed0012 @6924 C getlev rnd(10) vs JS fleeck.

