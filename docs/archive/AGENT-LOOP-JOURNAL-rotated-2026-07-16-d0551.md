# Rotated from AGENT-LOOP-JOURNAL.md (#611 D-0551)

## 2026-07-16 19:15 — D-0539 bigrm-8 load_special
- Objective: peel seed0373 @15574 C nhlib shuffle vs JS get_location
  after matched makemaz rnd(13)=8 / getbones.
- C locus: `dat/bigrm-8.lua`; `sp_lev.c` load_special; `mkmaze.c` makemaz.
- Change: `js/mklev.js` `load_bigrm_8` + dispatch (map, percent F-replace,
  flip_level_rnd).
- Verification: rng-diff **15574→16261**; runner RNG **16275**/35386
  Scr 22; green+strict; cohort 28/28 (+green 30); seed0116 RNG full.
- Next: m_initweap soldier polearm @16261; or dosounds @8468.
## 2026-07-16 19:10 — #598 D-0538 STATUE_TRAP mk_trap_statue
- Objective: peel seed0373 @14748 C `rndmonst_adj` rn2(7) vs JS rnd(4)
  after matched `traptype_rnd` (STATUE_TRAP).
- C locus: `trap.c` `maketrap` / `mk_trap_statue`.
- Change: port `mk_trap_statue` + STATUE_TRAP case in `js/trap.js`.
- Verification: rng-diff **14748→15574**; runner RNG **15601**/35386
  Scr 22; green+strict; cohort 30/30 PASS.
- Next: nhlib shuffle @15574; or dosounds @8468.
## 2026-07-16 19:05 — #597 D-0537 mineralize In_quest probs
- Objective: peel seed0373 @12327 C `mineralize` rn2(1000) vs JS rnd(2).
- C locus: `mklev.c` `mineralize` In_quest `goldprob/=4` `gemprob/=6`.
- Change: port quest sparsify arm in `js/mklev.js` `mineralize`.
- Verification: rng-diff **12327→14748**; runner RNG **14774**/35386
  Scr 22; green+strict; cohort 28/28 PASS.
- Next: `rndmonst_adj` @14748; or dosounds @8468.
## 2026-07-16 19:05 — #596 D-0536 create_monster MON_AT→enexto
- Objective: peel seed0373 @11988 C `collect_coords` rn2(8) vs JS rn2(2).
- C locus: `sp_lev.c` `create_monster` MON_AT→`enexto`; `makemon.c`
  `MM_ADJACENTOK`→`enexto_core`.
- Change: `splev_resolve_occupied` in `splev_create_monster`; makemon
  occupied arm matches C.
- Verification: rng-diff **11988→12327**; runner RNG **14397**/35386
  Scr 22; green+strict; cohort 28/28 PASS.
- Next: `mineralize` @12327 (goldprob/gemprob); or dosounds @8468.
## 2026-07-16 18:55 — #595 score + D-0535 offensive FALLTHROUGH
- Objective: mandatory full `sessions` score; peel seed0373 @11957
  mksobj_init rn2(5) vs rn2(4).
- C locus: `muse.c` `rnd_offensive_item` case 0; `do_wear.c` `hard_helmet`.
- Change: SCR_EARTH only if hard helm/amorph/walls/noncorp/unsolid;
  else FALLTHROUGH → WAN_STRIKING; animal/expl/mindless early return.
- Verification: #595 **30/44**, Scr **5900**/11405, RNG
  **330332**/792838 (41.66%), `31+0.15/turn`; seed0373
  **11957→11988** (RNG **12023**); green+strict; cohort 28/28.
- Next: `collect_coords` @11988; or seed5006 dosounds @8468.
