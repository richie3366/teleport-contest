# Rotated journal entries

## 2026-07-16 13:25 — D-0487 picklock + doopen autounlock
- Objective: seed0007 @3219 picklock rn2(100) (D-0487).
- C locus: `lock.c` picklock/`pick_lock`/`doopen_indir` autounlock; `autokey`.
- Change: door LOCKED path ynq + `set_occupation(picklock)`; locked autoopen
  → APPLY_KEY autounlock; default `flags.autounlock`. Was: stub "no door" /
  deferred autounlock so JS stayed in distfleeck.
- Verification: rng-diff **3219→6414**; green+strict PASS; cohort 10 PASS.
  Scr still 20/302.
- Next: D-0488 @6414 `eatcorpse` rn2(20).
## 2026-07-16 13:20 — D-0485 dofire ready More + getdir MV_ANY
- Objective: seed0007 @2832 hero Y drift (D-0485).
- C locus: `cmd.c` getdir/`movecmd(MV_ANY)`; `dothrow.c` dofire; topline More.
- Change: `mark_topline_seen` after fire quiver ready; `dir_from_key` accepts
  capital run + Ctrl-rush like MV_ANY. Was: More ate `=/\r`, getdir saw `H`
  as invalid, help swallowed `Y`; bare `y` walked NW.
- Verification: rng-diff **2832→3219**; green+strict PASS; cohort 10 PASS.
  Scr still 20/302.
- Next: D-0487 @3219 `picklock` rn2(100).
## 2026-07-16 13:15 — #540 public score (mandatory ÷5)
- Objective: full `sessions` score cadence (#540).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: **28/44** PASS; Scr **5014**/11405;
  RNG **289809**/792838 (36.55%); speed `24+0.14/turn` (R² 0.75).
  Flat vs #535 (Scr/PASS/RNG unchanged). seed0007 still Scr 20/302
  @2832; seed2200 229/230 parked.
- Verification: green+strict PASS; full suite `__RESULTS_JSON__`.
- Next: D-0485 mid-`H` Y drift — `lookaround`/`continue_run`/pet-swap.
## 2026-07-16 13:10 — D-0485 C capture: !couldsee falsified; hero Y drift
- Objective: seed0007 @2832 dog_move `rn2(1)` (D-0485).
- C locus: recorder `dog_goal`/`dog_move`; symptom `hack.c` lookaround/run.
- Change or falsified theory: no production patch. C `sight=1`, gg=hero,
  hero `(36,18)` first cand j=0; JS `(36,17)` only j<0. Spawn both
  `(38,18)`. Force-gettrack was coincidence. Pivot to mid-`H` Y drift.
- Verification: green+strict PASS; rng-diff still @2832; DIAG removed.
- Next: `lookaround`/`continue_run`/pet-swap per-step mid-`H`.
## 2026-07-16 13:05 — D-0486 rogue_vision + D-0485 gettrack theory
- Objective: seed0007 @2832 dog_move `rn2(1)` (D-0485).
- C locus: `vision.c` `rogue_vision`/`vision_recalc`; `dogmove.c` `dog_goal` gettrack.
- Change: ported `rogue_vision` (D-0486). Falsified as peel cause (dlvl1,
  `Is_rogue` false). Force-gettrack → prefix **2846**; JS `couldsee(pet)`
  true in lit room — next is C `!couldsee` cause, not mux/coord hacks.
- Verification: green+strict PASS; cohort 9 PASS; seed0007 still @2832.
- Next: C capture `couldsee(pet)` / LOS at peel; keep D-0485 open.
## 2026-07-16 12:45 — D-0485 ux0/mux ALLOW_U omit path
- Objective: seed0007 @2832 dog_move `rn2(1)` vs JS `distfleeck` (D-0485).
- C locus: `mon.c` `mfndpos` ALLOW_U; `monmove.c` `set_apparxy`;
  `dogmove.c` `dog_move` ~1255.
- Change or falsified theory: no production patch. Omitted cell is
  `ux0` after `H`. `mfndpos` with `mux=ux0` drops it (`cnt=7`); JS
  already has `mux=hero` after `set_apparxy`. Do not ship ux0/coord
  skips. Falsified pool/mon/kicked again.
- Verification: green+strict PASS; rng-diff still @2832 after DIAG remove.
- Next: prove C pet `mux` at `mfndpos` (capture) or other silent omit.
