# Rotated from AGENT-LOOP-JOURNAL.md (#506)

## 2026-07-16 05:52 — #492 D-0454 music LEATHER_DRUM
- Objective: seed0002 @27050 D-0454 primary (`do_improvisation`).
- C locus: `music.c` `do_play_instrument`/`do_improvisation`/
  `awaken_*`; `zap.c` resist TOOL alev=10; `monmove.c` auditory
  `onscary(0,0)`→`monflee`; `sounds.c` dosounds Deaf≡HDeaf.
- Change: new `js/music.js` + apply instrument dispatch; TOOL resist
  alev=10 (not ulevel); auditory onscary→monflee; dosounds gates on
  HDeaf. Deferred: passtune/flute/harp/horn effects; Hero_playnotes;
  awaken_soldiers; flees_light/mon_track_clear.
- Verification: seed0002 RNG **27050→27158** (full); Scr still 323/595
  (first cell @54 drink `[d-gnq]` vs `[defgnq]`); green+strict;
  cohort **24/24**.
- Next: D-0455 screen@54 drink getobj compactify.

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

