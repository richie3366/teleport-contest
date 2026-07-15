# Archived journal crumbs (pre D-0372)

## 2026-07-15 05:49 — D-0361 mkbox_cnts ICE_BOX (seed0012 @1245)
- Objective: seed0012 @1245 C `next_ident` vs JS `rnd(100)`.
- C locus: `mkobj.c` `mkbox_cnts` ICE_BOX → `mksobj(CORPSE)`.
- Change: ICE_BOX arm + `add_to_container`/cobj clear + container weight
  sum (D-0361). Was always boxiprobs `rnd(100)`.
- Verification: seed0012 RNG 1285→3346 Scr 13→14; @3152 dog_move next;
  green+strict; cohort 22 PASS.
- Next: seed0012 @3152 C `dog_move` `rn2(1)` vs JS `rn2(3)`.

## 2026-07-15 05:45 — D-0360 hero rocktrap (seed0012 stack overflow)
- Objective: pick shared blocker; seed0012 Maximum call stack exceeded.
- C locus: `trap.c` `trapeffect_rocktrap` hero; `thitm` place after death.
- Change: port hero feeltrap+place ROCK at `u.ux,u.uy`+losehp; `thitm`
  captures mx/my before `monkilled` (D-0360). Was youmonst→thitm→
  `place_object(undefined)` → `can_reach_location` NaN recurse.
- Verification: seed0012 no throw; Scr 0→13 RNG 0→1285; @1245 next;
  green+strict; cohort 22 PASS.
- Next: seed0012 @1245 C `next_ident` vs JS `rnd(100)`.

