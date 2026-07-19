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

## 2026-07-19 06:07 — #829 burnarmor/destroy pline (D-0741)

- Objective: seed5002 Scr after RNG FULL (destroy/death topline).
- C locus: `trap.c` `burnarmor`/`erode_obj`; `zap.c` `maybe_destroy_item`;
  `potion.c` `potionbreathe` POT_INVIS.
- Change: async burnarmor worn erode; destroy pline + potionbreathe +
  mid-destroy finish_losehp_done; zhitu early-return on fatal destroy.
  Root was missing plines so You die flushed botl before hits `--More--`.
- Verification: green+strict PASS; cohort 34/34; RNG FULL; Scr **125→400**.
- Next: seed5002 @230 write-vs-read / cmdassist; or D-0731/D-0708.

## 2026-07-19 — #828 cmd `c` → doclose (D-0740)

- Objective: seed5002 @11737 (JS wish rn2(181) vs C distfleeck).
- C locus: `cmd.c` `'c'`→`doclose`; `lock.c` `doclose`/`getdir`.
- Change: port `doclose` (getdir_cmdassist + close envelope); bind `c`.
  Root was missing close command — key desync → premature `wiz_wish`
  (C identify string was never a real wish).
- Verification: green+strict PASS; cohort 34/34; RNG **FULL 12167**;
  Scr 114→125/410.
- Next: seed5002 screen peel (destroy/death topline); or D-0731/D-0708.

## 2026-07-19 — #827 mattackm mlstmv + dog return onscary (D-0739)

- Objective: seed5002 @11715 (C distfleeck rn2(5) vs JS rnd(20)).
- C locus: `mhitm.c` `mattackm` `magr->mlstmv`; `dogmove.c` return gate.
- Change: set `magr.mlstmv = moves` in `mattackm`; export `onscary` and
  gate pet return attack `!onscary`. Root was undefined `mlstmv` always
  allowing bat return-attack when C had `mlstmv == moves`.
- Verification: green+strict PASS; cohort 34/34; continuous
  **11715→11725**; Scr 108→114; positional 11895→11788.
- Next: @11725 JS wish `rn2(181)` vs C `distfleeck` (identify wish
  0-RNG in C); or D-0731/D-0708.

## 2026-07-19 — #826 hero_seq + stethoscope seemimic (D-0738)

- Objective: seed5002 @11643 (C do_attack/gethungry vs JS distfleeck).
- C locus: `allmain.c` `hero_seq`; `apply.c` `use_stethoscope` seemimic.
- Change: port `hero_seq = moves<<3` / `hero_seq++`; stethoscope
  mundetected/mappearance `seemimic` + `mstatusline`. Root was stale
  `hero_seq` making every post-first stethoscope TIME (extra movemon /
  `--More--` ate east reveal keys).
- Verification: green+strict PASS; cohort 34/34; continuous
  **11643→11715**; positional **11693→11895** Scr 88→108.
- Next: seed5002 @11715 (`rn2(5)` vs `rnd(20)`); or D-0731/D-0708.

## 2026-07-19 — #825 public score + seed5002 @11643 reframed

- Objective: mandatory full `sessions` score (iter % 5 == 0).
- C locus: n/a (score); diagnosis `hack.c` `overexertion` / `uhitm.c`
  `do_attack` vs JS `distfleeck` at flattened 11643.
- Change: CURRENT Score refreshed — **36/44**, Scr 7860/11405, RNG
  **533216**/792838 (67.25%), speed `37+0.18/turn`. Δ vs #820 RNG +5521.
  Reframed @11643: C melee `gethungry`/`hitum` (key `l` → small mimic);
  JS skipped `do_attack` into monmove. No js/ patch.
- Verification: green+strict PASS; full suite recorded.
- Next: dump why `do_attack` skipped (bump/mimic gate); or D-0731/D-0708.

## 2026-07-19 — #824 zhitu finish_losehp_done before learnwand (D-0737)

- Objective: seed5002 trailing `rn2(19)` after fire zhitu @5904.
- C locus: `zap.c` `zhitu` → `hack.c` `losehp` → `done(DIED)` noreturn.
- Change: await `finish_losehp_done` in `zhitu`; skip `weffects`/`learnwand`
  when gameover (≡ D-0255/D-0323).
- Verification: green+strict PASS; cohort 34/34; cont **5904→11643**;
  RNG **6176→11693**/12167.
- Next: seed5002 @11643 gethungry rn2(20) vs rn2(5); or D-0731/D-0708.

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

