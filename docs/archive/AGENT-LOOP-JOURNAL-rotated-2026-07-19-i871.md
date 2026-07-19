# Rotated journal crumbs (#871)

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
