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

## 2026-07-14 22:53 — #352 D-0324 quit topten how + outentry

- Objective: seed0030 @1484 Galen topten `quit` vs `died` (CURRENT).
- C locus: `end.c` `done`/`really_done`; `topten.c` `outentry`.
- Change: `DEATHS[]` + killer setup for QUIT; NO_KILLER_PREFIX; outentry
  quit/starved share dungeon/level append (D-0324).
- Verification: @1484 match; Scr **1604→1605**; prefix **1601**; RNG full;
  green+strict; 17 PASS cohort. First miss **@1601** iron skull cap.
- Next: @1601 ARMOR `xname` `OBJ_DESCR` (`iron skull cap` vs `orcish helm`).

## 2026-07-14 22:48 — #351 D-0323 mbhitm finish_losehp_done

- Objective: seed0030 @1433 wand-hit `--More--` / seg7 −13 death screens.
- C locus: `muse.c` `mbhitm` — `pline` then `losehp`→`done(DIED)` noreturn.
- Change: await `finish_losehp_done` after fatal striking; stop mbhit/
  use_offensive on gameover (D-0323).
- Verification: @1433 match; seg7 172; Scr **1446→1604**; first miss
  **@1484** quit vs died; RNG full; green+strict; 17 PASS cohort.
- Next: @1484 `#quit` topten how_how `quit` vs `died`.

## 2026-07-14 22:38 — #350 public score refresh

- Objective: mandatory full `sessions` (#350 % 5 == 0).
- C locus: n/a (score cadence; no port patch).
- Change: none — documented suite after D-0322 peels #346–#349.
- Verification: green+strict PASS; full suite **19/44**, Scr **2883**/11405
  (25.28%, was 2865), RNG **240657**/792838 (30.35%), speed
  `18+0.12/turn`; seed0030 still Scr **1446**/1953 first-miss **@1433**.
- Next: @1433 fatal wand-hit `--More--` / death screen capture (seg7 −13).

## 2026-07-14 22:36 — #349 D-0322 hmon hit exclam

- Objective: seed0030 @1429 `You hit Swidnica!` vs `.` (CURRENT).
- C locus: `uhitm.c` `hmon_hitmon_msg_hit` + `zap.c` `exclam`.
- Change: port `canseemon?exclam(dmg)` + bash/lash/smite/hit verb (D-0322).
- Verification: @1429 match; Scr **1445→1446**; first miss **@1433**
  (seg7 −13 death screens); RNG full; green+strict; 17 PASS cohort.
- Next: @1433 fatal wand-hit `--More--` / death screen capture.

## 2026-07-14 22:30 — #348 D-0321 SPBOOK xname descr

- Objective: seed0030 @1342 shining spellbook vs spellbook of jumping (CURRENT).
- C locus: `objnam.c` `xname_flags` SPBOOK_CLASS — dknown+!nn → `"%s spellbook"`.
- Change: port SPBOOK dknown/nn/un/dn arms; `nn` = `oc_name_known` only
  (D-0321).
- Verification: @1342/@1343 match; Scr **1438→1445**; first miss **@1429**
  hit `!` vs `.`; RNG full; green+strict; 19 PASS cohort.
- Next: @1429 `uhitm` `exclam(dmg)` after `You hit`.

## 2026-07-14 22:22 — #347 D-0320 losehp leave neg uhp

- Objective: seed0030 @1262 hit `--More--` HP:0 vs C HP:4 (CURRENT).
- C locus: `hack.c` `losehp` — no fatal uhp clamp; `bot` skip when `uhp==-1`.
- Change: remove `uhp=0` on fatal in `losehp`; `done` still zeros after bot
  (D-0320).
- Verification: @1262 HP:4; Scr **1432→1438**; first miss **@1342** shining
  spellbook; RNG full; green+strict; 17 PASS cohort + strict sample.
- Next: @1342 SPBOOK `"%s spellbook"` descr (`shining`) vs known leak.

## 2026-07-14 22:15 — #346 D-0319 thitu await pline

- Objective: seed0030 @1195 arrow glyph on shoot `--More--` (CURRENT).
- C locus: `mthrowu.c` `thitu` You-hit then losehp; `monshoot` pline before
  `m_throw` (flash kept through hit `--More--`).
- Change: await `thitu` hit/miss + `monshoot` plines before `losehp`/flight
  (D-0319).
- Verification: @1195 `)`+HP:9; Scr **1428→1432**; first miss **@1262**
  botl HP:4 vs 0; RNG full; green+strict; 19 PASS cohort + strict.
- Next: @1262 `losehp` leave negative `uhp` (`bot` skip `-1`).

## 2026-07-14 22:05 — #345 D-0318 mon_wield canseemon pline + score

- Objective: seed0030 @1174 thin-air + gnome wield (CURRENT); mandatory
  full `sessions` score (iter % 5 == 0).
- C locus: `weapon.c` `mon_wield_item` canseemon wield pline.
- Change: async wield message `Monnam wields doname!|.`; await callers
  (D-0318).
- Verification: @1174 match; Scr **1427→1428**; first miss **@1195** map
  `)` vs `·`; RNG full; green+strict; 19 PASS cohort; full **19/44**
  Scr **2865**/11405 RNG **240657**/792838 speed `17+0.12/turn`.
- Next: @1195 thrown-arrow map glyph during shoot `--More--`.

## 2026-07-14 21:56 — #344 D-0317 moverock hear-behind

- Objective: seed0030 @836 boulder hear-behind (CURRENT).
- C locus: `hack.c` `moverock_core` mtmp arm; `dopush` unmap invisible.
- Change: `You_hear`/`canspotmon` + verbose cannot-move (no vain);
  `closed_door` vain; `dopush` clears dest `I` before `movobj` (D-0317).
- Verification: @836 match; Scr **1400→1427**; first miss **@1174**
  thin-air + gnome wield; RNG full; green+strict; 19 PASS cohort.
- Next: @1174 `You attack thin air.  The gnome wields a bow!`.

## 2026-07-14 21:51 — #343 D-0316 mksobj WAND known=0

- Objective: seed0030 @791 glass wand charges (CURRENT).
- C locus: `mkobj.c` `unknow_object` / `WAND()` `oc_uses_known=1`.
- Change: `mksobj` uskn heuristic includes `WAND_CLASS` so new wands
  start `known=0` (D-0316). Symptom was `doname` `(0:6)`, root was create.
- Verification: @791/@793 bare glass wand; Scr **1398→1400**; first miss
  **@836** boulder hear-behind; RNG full; green+strict; 17 PASS cohort.
- Next: @836 `hear a monster behind the boulder` vs vain push.

## 2026-07-14 21:44 — #342 D-0315 Priest xname bknown

- Objective: seed0030 @787 Things that are here (CURRENT).
- C locus: `objnam.c` `xname` `Role_if(PM_CLERIC)` → `obj->bknown=1`.
- Change: force cleric `bknown` in `xname` + `doname` (D-0315). Prior
  map-overlay hypothesis falsified — miss was BUC text.
- Verification: @787 `a cursed candy bar`; Scr **1395→1398**; first miss
  **@791** wand `(0:6)`; RNG full; green+strict; 19 PASS cohort.
- Next: @791 pet pickup `glass wand` vs `glass wand (0:6)`.

