# Agent loop journal archive (rotated #865)

Moved from `docs/AGENT-LOOP-JOURNAL.md` when live file exceeded ~15 entries.

## 2026-07-19 10:27 — #854 tower3 Vlad entry (D-0758)
- Objective: seed0360 @53591 C tower3 nhlib shuffle → induced_align vs JS `rn2(79)`.
- C locus: `dat/tower3.lua` / `sp_lev.c` `load_special` / `mkmaze.c` `makemaz`.
- Change: `load_tower3` + dispatch (solidfill map, lit=FALSE clear, unshuffled
  niches, branch levregion pre-flip, up ladder, locked door, `D` + fixed/random
  mons, niche loot+traps, solidify).
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **53591→55374**; RNG **53595→55383**; Scr **246→261**.
- Next: @55374 C `medusa-3` (`makemaz` `rnd(4)=3`) nhlib shuffle / selection_rndcoord
  vs JS `rn2(79)`.

## 2026-07-19 10:22 — #853 tower2 Vlad middle (D-0757)
- Objective: seed0360 @53361 C tower2 niche shuffle of 10 vs JS `rn2(79)`.
- C locus: `dat/tower2.lua` / `sp_lev.c` `load_special` / `mkmaze.c` `makemaz`.
- Change: `load_tower2` + dispatch (solidfill map, lit=FALSE clear, niche
  shuffle, up/down ladders, locked doors, `&`/hounds/wolf, chest amulets
  via get_location_coord_random, boots/plate, spbook shuffle, solidify).
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **53361→53591**; RNG **53376→53595**; Scr **242→246**.
- Next: @53591 C `tower3` (post-getbones nhlib shuffle → induced_align)
  vs JS `rn2(79)`.

## 2026-07-19 10:18 — #852 soko4-1 Sokoban entry (D-0756)
- Objective: seed0360 @52601 C soko4-1 (`makemaz` `rnd(2)=1`) vs JS `rn2(79)`.
- C locus: `dat/soko4-1.lua` / `mkmaze.c` `makemaz` (`soko4` `rndlevs=2`).
- Change: `load_soko4_1` + dispatch; branch via `g.lregions` pre-flip
  (post-flip pre-flip coords → oneshot `rn2(1)` retries).
- Verification: green+strict PASS; cohort **37/37**; seed0360 prefix
  **52601→53361**; RNG **52639→53376**; Scr **238→242**.
- Next: @53361 C `tower2` (Dlvl:35 niche shuffle of 10) vs JS `rn2(79)`.

## 2026-07-19 10:10 — #851 minend-2 Wine Cellar (D-0755)
- Objective: seed0360 @43248 C minend-2 (`makemaz` `rnd(3)=2`) vs JS `rn2(79)`.
- C locus: `dat/minend-2.lua` / `mkmaze.c` `makemaz` (`minend` `rndlevs=3`).
- Change: `load_minend_2` + dispatch (solidfill map, percent terrain,
  region_islev tele, wine-cellar engravings/potions, treasure+prize,
  wallify/flip/lregions/fixup). degrade-default engravings (not nowipeout).
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **43248→52601**; RNG **43267→52639**; Scr **207→238**.
- Next: @52601 C `soko4-1` (`makemaz` `rnd(2)=1`) vs JS `rn2(79)`.

## 2026-07-19 10:06 — #850 minetn-5 + public score (D-0754)
- Objective: #850 full `sessions` score + seed0360 @41777 nhlib shuffle.
- C locus: `dat/minetn-5.lua` / `mkmaze.c` `makemaz` (`rnd(7)=5` → minetn-5).
- Change: `load_minetn_5` + dispatch. Falsified “next Gehennom special”
  after sanctum — C goes to Mine Town-5.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **41777→43248**; RNG **41794→43267**; Scr 207. Full suite **37/44**;
  Scr **8212**/11405; RNG **573869**/792838 (72.38%); speed `37+0.20/turn`.
- Next: @43248 C minend-2 (`rnd(3)=2`) vs JS `rn2(79)`.

