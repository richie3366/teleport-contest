# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-19 11:56 — #863 baalz / baalz_fixup (D-0766)
- Objective: seed0360 @74801 C nhlib shuffle / walkfrom vs JS rn2(79).
- C locus: `dat/baalz.lua`; `mkmaze.c` `baalz_fixup` / bughack wallify;
  `sp_lev.c` corrmaze; map without contents keeps xstart.
- Change: `load_baalz` + dispatch; `baalz_fixup` + `Is_baal_level`;
  bughack in `wall_cleanup`/`fix_wall_spines`. Omit orcus/hellfill/wizard*.
- Verification: green+strict PASS; cohort 18/18; seed0360 prefix
  **74801→76622**; RNG **74803→76625**; Scr **273**/833.
- Next: @76622 C nhlib shuffle / walkfrom → **orcus** (`orcus.lua:107`).

## 2026-07-19 11:48 — #862 juiblex / lvlfill_swamp (D-0765)
- Objective: seed0360 @72078 C nhlib shuffle / lvlfill_swamp vs JS rn2(79).
- C locus: `dat/juiblex.lua`; `sp_lev.c` `lvlfill_swamp` / LVLINIT_SWAMP;
  `lspo_map` left/right/top/bottom.
- Change: `lvlfill_swamp` + SWAMP init; map align L/R/T/B; `load_juiblex`
  + dispatch; `Is_juiblex_level`. Omit baalz/orcus/hellfill/wizard*.
- Verification: green+strict PASS; cohort 15/15; seed0360 prefix
  **72078→74801**; RNG **72079→74607**; Scr **270→267**/833.
- Next: @74801 C nhlib shuffle / `walkfrom` (baalz/orcus/hellfill/wizard*).

## 2026-07-19 11:40 — #861 hell_tweaks (D-0764)
- Objective: seed0360 @71832 C hell_tweaks percent vs JS flip `rn2(2)`.
- C locus: `dat/nhlib.lua` hell_tweaks; `dat/asmodeus.lua` protected;
  `nhlsel.c` fillrect get_location_coord; selvar grow/or/not/set.
- Change: port `hell_tweaks` + selection helpers; fillrect adds xstart
  (bare abs bounds overran filter_percent by 3 cells).
- Verification: green+strict PASS; cohort **37/37**; seed0360 prefix
  **71832→72078**; RNG **71855→72079**; Scr **270**/833.
- Next: @72078 C nhlib shuffle / `lvlfill_swamp` (juiblex) vs JS `rn2(79)`.

## 2026-07-19 11:27 — #860 public score cadence
- Objective: mandatory full `sessions` score (#860 % 5 == 0).
- C locus: n/a (score docs); probed `dat/nhlib.lua` `hell_tweaks` (reverted).
- Change: refreshed CURRENT Score from `__RESULTS_JSON__`. hell_tweaks
  probe findings → NOTES (reset_xystart 79×21; bounds2; pools~71905).
- Verification: green+strict PASS; suite **37/44**; Scr **8272**/11405;
  RNG **602457**/792838 (75.99%); speed `36+0.20/turn` (R² 0.825).
- Next: @71832 port `hell_tweaks` per NOTES packet.

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
