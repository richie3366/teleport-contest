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

## 2026-07-19 — #822 use_mirror + use_camera getdir (D-0736)

- Objective: seed5002 @5739 mirror/camera getdir leak.
- C locus: `apply.c` `use_mirror`/`use_camera`; `bhit` INVIS_BEAM;
  `flash_hits_mon`.
- Change: port mirror (getdir/cursed/beam/flee) + camera (getdir/charge/
  flash blind+flee); wire `doapply`.
- Verification: green+strict PASS; cohort 8/8; cont **5739→5904**;
  seg0 C FULL +1 JS learnwand `rn2(19)`.
- Next: trailing learnwand exercise; or D-0731/D-0708.

## 2026-07-19 — #821 use_stethoscope adjacent res TIME (D-0735)
- Objective: seed5002 seg1 @5668 dog_goal invent vs rn2(4).
- C locus: `apply.c` `use_stethoscope` adjacent return `res`.
- Change: adjacent was ECMD_OK stub; `anh` spent no turn; later
  mirror-absent `aph` leaked `h`→domove west → udist=2. Port isok/
  m_at/empty + return `res`. Named: full mstatusline, mirror/camera.
- Verification: green+strict PASS; cohort 6/6; seed5002 continuous
  **5668→5739** (positional 6172→6176).
- Next: seed5002 @5739 (mirror/camera getdir); or D-0731/D-0708.

## 2026-07-19 — #820 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: none in `js/`. Documented Score in CURRENT.md from
  `__RESULTS_JSON__`: **36/44** PASS; Scr **7860**/11405; RNG
  **527695**/792838 (66.56%); speed `38+0.18/turn`. Δ vs #815:
  Scr −66, RNG +192. seed5002 still 6172 (D-0735 open).
- Verification: green+strict PASS; full sessions run complete.
- Next: C-state for D-0735 (seed5002 @5668 udist); or D-0731/D-0708.

## 2026-07-19 — #819 seed5002 dog_goal invent vs rn2(4) (D-0735)
- Objective: coverage seed5002 “@6172 themerms” — reframed.
- C locus: `dogmove.c` `dog_goal` invent `dogfood` when `udist<=1`.
- Change: none (DIAG only). Positional 6172 ≠ continuous break; seg1
  @5668 C invent `obj_resists` vs JS `rn2(4)`. FORCE invent matches
  5668–5684; JS udist=2 after `h`. Same family D-0429/D-0451.
- Verification: green+strict PASS; no js/ change; seed5002 still FAIL.
- Next: C-state hero/pet after step-66 `h`; or D-0731/D-0708.

## 2026-07-19 — #818 zhitu non-sleep + destroy_items AD_FIRE (D-0734)
- Objective: coverage seed5002 @5886 (pivoted from D-0731 C-state stall).
- C locus: `zap.c` `zhitu`/`destroy_items`/`maybe_destroy_item`; `dobuzz`.
- Change: port `zhitu` FIRE/COLD/MISSILE/LIGHTNING; hero invent
  `destroy_items` AD_FIRE; burnarmor stub; ignite gate (empty body).
- Verification: green+strict PASS; cohort 6/6; seed5002 RNG
  **5980→6172** (seg0 FULL); seed0399/0014 held.
- Next: seed5002 @6172 themerms; or D-0731/D-0708 C-state.

## 2026-07-19 — #817 mfndpos worm_cross + rogue door-cut (D-0733)
- Objective: seed0399 @10157 / shared mfndpos; pivoted after C-state need.
- C locus: `mon.c` `mfndpos` diagonal; `worm.c` `worm_cross`.
- Change: port `worm_cross`; wire rogue door-cut + worm_cross into
  `mfndpos`. DIAG: unicorn open 3×3 ROOM; dest=(57,11) if kept; FORCE
  omit-pair ID exhausted (@10217 wish); gnome kickedloc clear.
- Verification: green+strict PASS; cohort 6/6; seed0399 @10157;
  seed0014 @49039 held.
- Next: C-state which cells C drops (D-0731/D-0708); or coverage.

## 2026-07-19 — #816 mon_allowflags + temple SANCT (D-0732)
- Objective: seed0399 @10157; pivoted after maze C-state DIAG.
- C locus: `mon.c` `mon_allowflags`/`mfndpos`; `priest.c` `in_your_sanctuary`.
- Change: isshk/priest/BUSTDOOR/unlock/minion·rider/human·minotaur/
  NOGARLIC; temple ALLOW_SANCT + `in_your_sanctuary`. Falsified: temple
  explains @10157 (maze nrooms=0 has_temple=false; still cnt=7).
- Verification: green+strict PASS; cohort 6/6; seed0399 @10157;
  seed0014 49495 held.
- Next: D-0731 C-state which 2 cells; or D-0708 @49039.

## 2026-07-19 — #815 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (measurement only; no js/ change).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; suite **36/44**; Scr **7926**/11405;
  RNG **527503**/792838 (66.53%); speed `37+0.18/turn` (R² 0.794).
  Δ vs #810: Scr +0, RNG +189; seed0399 10359→10389 still @10157.
- Next: D-0731 C-state omit @10157; or D-0708 @49039; prefer shared.

## 2026-07-19 — #814 mfndpos onscary/garlic/bars/gas (D-0731)
- Objective: seed0399 @10157 rn2(20) vs rn2(28); port deferred mfndpos arms.
- C locus: `mon.c` `mfndpos`; `monmove.c` `onscary`.
- Change: mconf/`!mcansee` flags; IRONBARS; poison-gas; onscary (scare/
  Elbereth/altar-vamp); garlic. Falsified: these arms drop cnt in JS
  state @miss (still 7); j=2 mtrack → same 10217 arity-only.
- Verification: green+strict PASS; cohort 6/6; seed0399 still @10157
  (positional 10389); seed0014 @49039 held.
- Next: C-state omit of 2 cells; temple/`worm_cross`; or D-0708.

## 2026-07-19 — #813 seed0399 mfndpos pair sharpen (D-0731)
- Objective: seed0399 @10157 rn2(20) vs rn2(28); identify C’s 2 omits.
- C locus: `mon.c` `mfndpos` (deferred onscary/gas/worm_cross/bars).
- Change: none (DIAG/PROBE only; reverted). Falsified: WEB required in
  the omit pair; pair ID via max-prefix (all keep-track pairs →10217).
  Track cell (59,13) must stay for arity rn2. Omit ∈6 non-track.
- Verification: green+strict PASS; seed0399 still @10157; no js/ diff.
- Next: C-state / deferred mfndpos arms; or D-0708 @49039.

## 2026-07-19 — #812 unicorn NOTONL + fail-tele (D-0731)
- Objective: seed0399 @10157 m_move track rn2(20) vs rn2(28).
- C locus: `mon.c` `mon_allowflags` NOTONL; `monmove.c` unicorn
  fail-move `rn2(2)`+`rloc`; `teleport.c` `rloc_to` `mon_track_clear`.
- Change: port those three. Falsified: NOTONL fixes this miss (mux=47,9
  no online neigh). DIAG: black unicorn cnt=7 vs C need 5; FORCE_EXCL
  any 2 of 7 → prefix 10217.
- Verification: green+strict PASS; cohort prior PASS held; seed0399
  still @10157; seed0014 @49039 held.
- Next: which 2 mfndpos cells C drops (WEB+?); or D-0708.

## 2026-07-19 — #811 max_passive_dmg AD_ACID (D-0730)
- Objective: CURRENT primary; pivoted seed0399 after D-0708 cell stall.
- C locus: `mondata.c` `max_passive_dmg`; `dogmove.c` ALLOW_M balk.
- Change: elemental AD_ACID/FIRE/COLD/ELEC + HUGS/ENGL/TENT multi2;
  fix AD_ACID=8 (was wrongly AD_DRDX). Falsified D-0708: kickedloc this
  turn; (22,10) is ROOM on C DEC screen.
- Verification: green+strict PASS; seed0399 **10145→10157** RNG
  **10359**/11409; cohort 6/6 prior PASS held; seed0014 unchanged.
- Next: seed0399 @10157 m_move rn2(20) vs rn2(28); or D-0708.
