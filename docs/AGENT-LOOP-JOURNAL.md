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

## 2026-07-16 10:35 — D-0485 force-skip confirms omit (37,17)
- Objective: seed0007 @2832 dog_move `rn2(1)` vs JS `distfleeck` (D-0485).
- C locus: `dogmove.c` `dog_move` ~1255; `mon.c` `mfndpos`.
- Change or falsified theory: no production patch. DIAG force-skip of
  cand `(37,17)` extends RNG **2832→2838**. Falsified hero-on-cell /
  JS pool / mon balk. Gate still unknown — do not ship coord skip.
- Verification: green+strict PASS; rng-diff still @2832 after DIAG remove.
- Next: prove C silent omit (mfndpos arm vs dog_move continue).

## 2026-07-16 12:15 — #535 public score + D-0485 dog_move diagnosis
- Objective: mandatory full `sessions` score (#535); seed0007 @2832 peel.
- C locus: `dogmove.c` `dog_move` ~1255; `mon.c` `mfndpos`.
- Change: docs only — Score **28/44** Scr **5014** RNG **289809**
  (36.55%) `24+0.13/turn`. D-0485 open: JS never hits `j==0` because
  it keeps `(37,17)`; C likely skips that cell → same-dist `rn2(1)`.
  Falsified pool-terrain skip (ROOM). No js/ patch.
- Verification: green+strict PASS; full suite 28/44; rng-diff still 2832.
- Next: prove C skip of `(37,17)` (silent ALLOW_M / mfndpos).

## 2026-07-16 12:10 — D-0484 dofire empty-quiver letter ownership
- Objective: seed0007 @2824 JS `rn2(7)` do_attack vs C `mcalcmove`.
- C locus: `dothrow.c` `dofire`; getobj/`tty_yn_function` more;
  `tty_nhgetch` NEED_MORE→NON_EMPTY.
- Change: `dofire` continues after doquiver; `mark_topline_seen` after
  ammo pline so invent letter is not More-eaten.
- Verification: rng-diff **2824→2832**; green+strict; cohort 1500/1800/
  0101/0013/0006 PASS. Scr still 20/302.
- Next: dog_move @2832 `rn2(1)` (mfndpos order / whappr).

## 2026-07-16 11:50 — D-0483 revert D-0480 serialize coerce
- Objective: undo judge PASS 23→22 after D-0480 (seed0013-rogue 59→58).
- C locus: n/a (revert contestant serialize); keep insight vanqsort strcmpi.
- Change: restore pre-D-0480 `serialize_for_scoring` color path.
- Verification: green+strict; seed0013/0002/0004/0012/0030 local PASS.
- Next: next judge cron; seed0007 snake swamp.

## 2026-07-16 11:40 — D-0482 seed0006 disclose invent PASS
- Objective: seed0006 @110 invent pages after possessions yn.
- C locus: `end.c` disclose/really_done; `windows.c` add_menu_heading;
  `objnam.c` ring spe; `mkobj.c` unknow_object; `insight.c` list_vanquished;
  `dungeon.c` print_mapseen; `calendar.c` night.
- Change: invent 'y' display + ID walk; gameover ATR_NONE headings;
  charged-ring spe + mksobj uskn; enlightenment night/moon/attrs;
  vanquished ask yn; overview levels range.
- Verification: seed0006 **PASS** 123/123; green+strict; 28 cohort;
  full suite **28/44** Scr **5014**.
- Next: seed0007 snake swamp Scr 20/302.

## 2026-07-16 11:20 — D-0481 makemon newsym after spawn
- Objective: seed0006 @102 JS `.` vs C `&` after water-demon unleash.
- C locus: `makemon.c` `makemon` `!gi.in_mklev` → `newsym` (+ byyou).
- Change: `js/makemon.js` `newsym(mx,my)` after invent when not
  mklev; early byyou `newsym`. Omit `set_apparxy` (circular import).
- Verification: seed0006 Scr **106→110**/123 @102→@110; RNG full;
  green+strict; 25 PASS cohort held.
- Next: seed0006 @110 disclose invent pages (or seed0007).

## 2026-07-16 10:35 — LB 23-vs-27 investigate + D-0480
- Objective: close judge 14-cell gap on seed0002/0004/0012/0030.
- C locus: tty blank fg; `insight.c` vanqsort `strcmpi`; altar DEC (D-0293).
- Change or falsified theory: local+hub PASS 100%; cannot repro judge
  misses. D-0480 serialize space NO_COLOR + vanqsort strcmpi. Rejected
  SO-wrap `{`/`\`` (C encoding mix / ROCK_CLASS).
- Verification: green+strict; four gap sessions PASS local+hub.
- Next: next judge cron; else upstream #5-style report; seed0006 @102.

## 2026-07-16 09:55 — D-0479 mondead unmap_object clears I
- Objective: seed0006 @77 JS `I` vs C `#` after kitten kills unseen mon.
- C locus: `mon.c` `mondead` → `unmap_object`; `display.c` unmap_*.
- Change: `unmap_object`/`unmap_invisible` in `display.js`; wire into
  `mondead` (mhitm/uhitm/trap) before `newsym`.
- Verification: seed0006 Scr **95→106**/123 @77→@102; green+strict;
  25 PASS cohort held.
- Next: seed0006 @102 `.` vs `&` water-demon display (or seed0007).
