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

## 2026-07-19 23:00 — #918 D-0798 quest Home ok_to_quest gate
- Objective: seed0360 @112279 C fleeck vs JS getbones (umov theory).
- C locus: `do.c` `goto_level` quest-home arm; `quest.c` `ok_to_quest`.
- Change: **D-0798** — falsified umov surplus; C mysterious-force after
  ^V `A` (Wiz-goal) from Home; JS ported gate. Prefix **112279→112857**;
  Scr **504→519**; RNG **112956**.
- Verification: green+strict PASS; cohort 35/35 PASS; DIAG removed.
- Next: @112857 C distfleeck vs JS set_apparxy (mux-image).

## 2026-07-19 22:46 — #917 D-0797 acurr GoP + umov peel
- Objective: seed0360 @112279 C fleeck vs JS rn2(3).
- C locus: `attrib.c` `acurr` GoP/`STR19(25)`; moveloop umovement after EOT62.
- Change: **D-0797** `js/attrib.js` GoP + Dunce. Falsified same-site
  fleeck theory — JS `getbones` after early hero (`umov=12` vs C `<12`).
  FORCE −12/MOD →112574. Scr **391→504**; peel still @112279.
- Verification: green+strict PASS; cohort 9/9 PASS; DIAG removed.
- Next: C path leaving `umovement<12` after EOT62 (surplus +12).

## 2026-07-19 22:30 — #916 D-0796 castmu HASTE_SELF
- Objective: seed0360 @112243 apprentice leftover (D-0794).
- C locus: `mcastu.c` `MCAST_HASTE_SELF` → `mon_adjust_speed`; `mcalcmove` MFAST.
- Change: **D-0796** `js/mcastu.js` HASTE_SELF + CURE_SELF. Closes D-0794
  (was deferred spell body, not PRE skip). Prefix **112243→112279**;
  focused RNG **112272→112326**.
- Verification: green+strict PASS; cohort 12/12 PASS; DIAG removed.
- Next: @112279 C fleeck vs JS rn2(3) after EOT62.

## 2026-07-19 22:20 — #915 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score+docs; peel parked at D-0794 PRE).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  **37/44** PASS; Scr **8397**/11405 (**0**); RNG **643814**/792838
  (81.20%, **0** vs #910); speed `35+0.21/turn` R² 0.801. seed0360
  still **112272**/391 @112243. D-0794/D-0795 soak flat.
- Verification: green+strict PASS; full suite exit 37/44.
- Next: C path leaving one apprentice PRE≥12 into EOT61 (D-0794).

## 2026-07-19 22:18 — #914 D-0794 moves=62 apprentice PRE
- Objective: seed0360 @112243 leftover apprentice mov paradox.
- C locus: `mon.c` `mcalcmove`/`movemon`; `monmove.c` `dochug`/`set_apparxy`.
- Change or falsified theory: **Docs only** (DIAG out). Peel is
  **moves=62**. EOT61 Neferet +24 matches C. Pass1 fleecks all 8 apps
  on C and JS. C @112243 = mux-at-hero peaceful after flyer pass2 —
  needs apprentice PRE into EOT61 (rn2 stream unaffected). Mid-pass
  skip / Neferet mcalcmove-slot theories weakened.
- Verification: green+strict PASS; focused still @112243 / RNG 112272.
- Next: C path leaving one apprentice PRE≥12 into EOT61.

## 2026-07-19 22:06 — #913 D-0795 movemon early exits + D-0794 budgets
- Objective: seed0360 @112243 leftover apprentice mov paradox.
- C locus: `mon.c` `movemon_singlemon` (utotype/mon_offmap/isgd);
  `mcalcmove` Neferet mmove=15.
- Change: **D-0795** port early exits + iter break. Refined D-0794:
  JS EOT704 Neferet +24 / apprentices +12; step706 umov=12 leaves
  Neferet@12. C needs Neferet@0 + apprentice PRE leftover. Peel
  unchanged @112243.
- Verification: green+strict PASS; cohort 6/6 PASS; focused RNG 112272.
- Next: falsify pre-EOT704 silent apprentice skip / Neferet mcalcmove slot.

## 2026-07-19 21:53 — #912 D-0794 mux-at-hero fleeck signature
- Objective: seed0360 @112243 leftover apprentice after step 706.
- C locus: `monmove.c` `set_apparxy` (`u_at(mux,muy)` early return);
  `mon.c` `movemon` / EOT `mcalcmove`.
- Change or falsified theory: **Docs only.** C @112243 is consecutive
  `distfleeck` with no `set_apparxy` RNG → mux already at hero.
  Neferet `mux=0`+CLOSE cannot be that actor. Step 706 RNG identical;
  JS 8 apprentice spends → `mov=0`; Neferet `24→12`; `umov=12` skips
  EOT. Paradox: C still needs leftover apprentice mov. DIAG out.
- Verification: green+strict PASS; focused @112243 / RNG 112272 Scr 391.
- Next: silent mov-budget divergence after step 706 (no FORCE).

## 2026-07-19 21:37 — #911 D-0794 apprentice leftover (not Neferet CLOSE)
- Objective: seed0360 @112243 Neferet CLOSE / movement peel.
- C locus: `mon.c` movemon/mcalcmove; `monmove.c` dochug (CLOSE OK).
- Change or falsified theory: **Falsified** “clear Neferet CLOSE @112243”.
  FORCE match was peaceful fleeck signature coincidence. Suppress Neferet
  + boost apprentice → mismatch **112247** / matched **112279**. Step 706:
  JS 8 apprentice dochugs vs C keeping one `mov≥12`. Docs only (DIAG out).
- Verification: green+strict PASS; focused still @112243 / RNG 112272 Scr 391.
- Next: which apprentice idles on C in step 706 / why JS spends that mon.

## 2026-07-19 21:22 — #910 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score+docs; no peel — FORCE CLOSE banned).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  **37/44** PASS; Scr **8397**/11405 (0); RNG **643814**/792838
  (81.20%, **+706** vs #905 = D-0790…D-0793 suite soak); speed
  `36+0.21/turn` R² 0.802. seed0360 still **112272**/391 @112243.
- Verification: green+strict PASS; full suite exit 37/44.
- Next: C path clearing Neferet CLOSE with mux at hero (not FORCE).

## 2026-07-19 21:20 — #909 D-0793 makemon mux/muy = 0
- Objective: seed0360 @112243 Neferet CLOSE / movement peel.
- C locus: `makemon.c` `zeromonst` (mux/muy 0 until `set_apparxy`).
- Change: `js/makemon.js` stop init mux/muy to spawn xy. DIAG: CLOSE
  skip → EOT; FORCE clear+mux=hero matches ~112246; clear-only burns
  Displacement `rn2(4)`.
- Verification: green+strict PASS; cohort 7/7 PASS; seed0360 still
  @112243 / RNG 112272 Scr 391.
- Next: C path clearing Neferet CLOSE with mux at hero (not FORCE).

## 2026-07-19 21:10 — #908 D-0792 Wizard ldrnum + mundisplaceable
- Objective: seed0360 @112243 Neferet CLOSE peel.
- C locus: `role.c` Wizard quest fields; `monst.h` `mundisplaceable`;
  `hack.c` `domove_swap_with_pet`.
- Change: Wizard `ldrnum`/`guardnum`/`homebase`/`questarti`; refuse
  leader/Oracle/priest/shk/gd swap. **Falsified:** clearing Neferet
  CLOSE at any thr≤112000 regresses prefix (thr=-1 best @112243).
- Verification: green+strict PASS; cohort 7/7 PASS; seed0360 still
  @112243 / RNG 112272 Scr 391.
- Next: @112243 movement leftover / second movemon pass (not CLOSE).

## 2026-07-19 21:00 — #907 D-0791 WAITMASK disturb + Neferet CLOSE diag
- Objective: seed0360 @112243 C distfleeck rn2(5) vs JS rn2(12).
- C locus: `uhitm.c` `attack_checks` first line; `display.h` `_is_safemon`;
  `mon.c` `wake_nearto_core` G_UNIQ; `dothrow.c` STRAT_WAITMASK.
- Change: clear WAITMASK at `attack_checks` start; `is_safemon` needs
  `canspotmon`; wake_nearby skip G_UNIQ; dothrow `~0x07`→STRAT_WAITMASK.
  Diag: mismatch is Neferet `STRAT_CLOSE` no-op → EOT `mcalcmove`; C
  peaceful `rn2(10)` = Neferet without CLOSE. #chat never cleared her
  (SELF/NOMON). `special_obj_hits_leader` still deferred.
- Verification: green+strict PASS; cohort 7/7 PASS; seed0360 still
  @112243 / RNG 112272 Scr 391.
- Next: find C path that cleared Neferet CLOSE (kick/attack/throw
  leader-catch); then mux/`set_apparxy` after she moves.

## 2026-07-19 20:25 — #906 D-0790 mux-image m_move_aggress
- Objective: seed0360 @110880; port C post-select no-place.
- C locus: `monmove.c` `m_move` post-select + `m_move_aggress`.
- Change: track `chi`; `ALLOW_U`→mux; `nix==mux`→`m_move_aggress`
  (empty Displacement image → DONE). @110612 was aftermath of earlier
  mux-image walks JS placed.
- Verification: green+strict PASS; cohort 13/13 PASS; seed0360
  **110880→112243**, focused RNG **112272**, Scr **391**.
- Next: @112243 C distfleeck rn2(5) vs JS rn2(12).

