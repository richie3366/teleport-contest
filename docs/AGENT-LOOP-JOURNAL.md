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

## 2026-07-19 11:10 — #859 asmodeus + hell helpers (D-0763)
- Objective: seed0360 @68690 C nhlib shuffle vs JS `rn2(79)` post-rogue.
- C locus: `dat/asmodeus.lua`; `makemon.c` newmonhp/sleep; `teleport.c`
  noteleport hell court; `mkobj.c` hellprobs.
- Change: `load_asmodeus`; mlevel>49 HP; hell-court noteleport; hellprobs;
  ndemon sleep before G_SGROUP. Omit `hell_tweaks`.
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **68690→71832**; RNG **68694→71855**; Scr **270→267**.
- Next: @71832 C `hell_tweaks` percent vs JS flip `rn2(2)`.

## 2026-07-19 10:55 — #858 makeroguerooms + rogue skip0 (D-0762)
- Objective: seed0360 @68428 C `makeroguerooms` `rn2(5)` vs JS `rn2(1)`.
- C locus: `extralev.c` makeroguerooms/ghost/miniwalk/roguecorr; `mklev.c`
  Is_rogue → skip0.
- Change: new `js/extralev.js`; `roguename`; makelevel_ordinary rogue
  branch + skip corridors/niches/vault/specials.
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **68428→68690**; RNG **68434→68694**; Scr **270**/833.
- Next: @68690 C nhlib shuffle after getbones vs JS `rn2(79)`.

## 2026-07-19 10:47 — #857 makemon mlet before G_SGROUP (D-0761)
- Objective: seed0360 @65027 C `mkobj` `rnd(100)` vs JS `rn2(2)`.
- C locus: `makemon.c` `makemon` mlet switch (~1303) before G_SGROUP (~1431).
- Change: move spider/snake/… mlet switch before `set_malign`/group spawn
  so cave spider `mkobj_at(RANDOM)` precedes group `rn2(2)`.
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **65027→68428**; RNG **65054→68434**; Scr **265→270**/833.
- Next: @68428 C `makeroguerooms` `rn2(5)` vs JS `rn2(1)`.

## 2026-07-19 10:43 — #856 bigrm-4 load_special (D-0760)
- Objective: seed0360 @60114 C bigrm-4 nhlib shuffle vs JS `rn2(79)`.
- C locus: `dat/bigrm-4.lua` / `sp_lev.c` `load_special` / `mkmaze.c` `makemaz`.
- Change: `load_bigrm_4` + dispatch (solidfill map, L→terrain replace,
  four fountains, lit region, stairs, 15/6/28 fill, noflip).
- Verification: green+strict PASS; cohort **37/37**; seed0360 prefix
  **60114→65027**; RNG **60117→65054**; Scr **265**/833.
- Next: @65027 C `mkobj` `rnd(100)` vs JS `rn2(2)`.

## 2026-07-19 10:37 — #855 medusa-3 + mk_artifact (D-0759) + score
- Objective: mandatory full `sessions` score; seed0360 @55374 medusa-3.
- C locus: `dat/medusa-3.lua` / `artifact.c` `mk_artifact` A_NONE.
- Change: `load_medusa_3` + dispatch; `mk_artifact` eligible/`rn2(n)` wired
  from `mksobj_init` artif gates (weapon+armor).
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **55374→60114**; RNG **55383→60117**; Scr **261→265**. Full suite
  **37/44**, Scr **8270**/11405, RNG **590719**/792838 (74.51%),
  speed `36+0.20/turn`.
- Next: @60114 C `bigrm-4` (`makemaz` `rnd(13)=4`) nhlib shuffle vs JS
  `rn2(79)`.

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

## 2026-07-19 10:00 — #849 maybe_generate stronghold rate (D-0753)
- Objective: seed0360 @41768 C maybe_generate_rnd_mon rn2(50) vs JS rn2(70).
- C locus: `allmain.c` `maybe_generate_rnd_mon` udemigod?25 :
  depth>stronghold?50 : 70.
- Change: `js/allmain.js` port full rate ternary via `depth()` +
  `game.stronghold_level` + `uevent.udemigod` (was always 70).
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **41768→41777**; RNG **41793→41794**; Scr 207.
- Next: @41777 C nhlib.lua shuffle rn2(3) vs JS rn2(79)
  (post getbones/makemaz; C splev_initlev).

## 2026-07-19 09:58 — #848 sanctum region_islev absolute (D-0752)
- Objective: seed0360 @41671 C place_lregion rn2(26) vs JS rn2(23).
- C locus: `dat/sanctum.lua` teleport_region region_islev=1;
  `sp_lev.c` `levregion_add` skips get_location when in_islev.
- Change: `load_sanctum` tele inarea absolute {54,1,79,18} (not mx+).
  Root was map-relative offset with xstart=3 → span 23 vs C 26.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **41671→41768**; RNG **41693→41793**; Scr 207.
- Next: @41768 C maybe_generate_rnd_mon rn2(50) vs JS rn2(70)
  (depth > stronghold_level).

## 2026-07-19 09:55 — #847 hell temperature + temperature_shift (D-0751)
- Objective: seed0360 @38557 C rndmonst_adj rn2(7) vs JS rn2(4).
- C locus: `mklev.c`/`sp_lev.c` temperature=In_hell?1:0; `makemon.c`
  `temperature_shift` + `pm_resistance` MR_FIRE/COLD.
- Change: clear_level_structures hellish→hot; real temperature_shift.
  Sanctum has no lua temperate (unlike valley).
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **38557→41671**; RNG **38600→41693**; Scr 207.
- Next: @41671 C place_lregion rn2(26) vs JS rn2(23).

## 2026-07-19 09:52 — #846 sanctum load + peace_minded is_minion (D-0750)
- Objective: seed0360 @37668 C nhlib shuffle vs JS rn2(79).
- C locus: `dat/sanctum.lua` via `load_special`; `makemon.c` `peace_minded` `is_minion`.
- Change: `load_sanctum` + dispatch; `peace_minded` minion → `record>=0` (no rn2).
  Falsified “post-asmodeus” — next miss after valley is sanctum.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **37668→38557**; RNG **37686→38600**; Scr 207.
- Next: @38557 C rndmonst_adj rn2(7) vs JS rn2(4) (morgue fill_zoo).

