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

## 2026-07-19 20:05 — #905 score + D-0790 root (no place)
- Objective: mandatory full `sessions` score; peel D-0790 @110880.
- C locus: `monmove.c` `m_move` post-select (place refused).
- Change: docs only — DIAG removed. Root: bat@12,18 @110612 appr=0
  selects 11,18; JS places, C does not → later rn2(28) vs rn2(5).
  FORCE no-place → prefix 110880→112243.
- Verification: green+strict PASS; full suite **37/44** Scr **8397**
  RNG **643108** (81.11%) `36+0.21/turn`.
- Next: port C post-select no-place gate (chi/ALLOW_U/aggress/MDISP).

## 2026-07-19 19:52 — #904 D-0789 dotele clear travelcc
- Objective: seed0360 @110844 C safe_teleds rnd(79) vs JS rn2(4).
- C locus: `teleport.c` `dotele` clears `travelcc` before `tele()`.
- Change: `js/teleport.js` `dotele` clears stale `_` dest; `scrolltele`
  clears when landing on travelcc. DIAG: JS ^T getpos started at
  (33,9)→ROOM teleok; C cleared→hero→stone→Sorry+safe_teleds.
- Verification: green+strict PASS; cohort 10/10 PASS; seed0360
  **110844→110880**, suite RNG **111566**, Scr **391**.
- Next: @110880 C m_move rn2(28) vs JS rn2(5) (D-0790).

## 2026-07-19 19:40 — #903 D-0788 TRAVP_GUESS hero-matrix
- Objective: seed0360 @109454 travel site-shift after `_` to (33,9).
- C locus: `hack.c` findtravelpath(TRAVP_GUESS) pick + noguess TRAVEL.
- Change: `cmd.js` guess = hero couldsee BFS matrix + raster
  distmin/dist2/ctrav pick, then TRAVEL BFS. Stairs alcove SDOOR is why
  TRAVEL fails (expected).
- Verification: green+strict PASS; cohort 7/7 + 0108/0361/0367 PASS;
  seed0014 still 50419; seed0360 **109454→110844**, RNG **111367**.
- Next: @110844 C safe_teleds rnd(79) vs JS rn2(4) (D-0789).

## 2026-07-19 19:25 — #902 D-0788 travel site-shift (not set_apparxy)
- Objective: seed0360 @109454 C set_apparxy rn2(5) vs JS rn2(4).
- C locus: `cmd.c` dotravel/getpos; `hack.c` findtravelpath; symptom `set_apparxy`.
- Falsified: bare displ/gotu arity; CLOUD-reject in set_apparxy (→105228).
  DIAG: `_` getpos 625→668 `,` confirms (33,9) from (3,19); JS travel
  (3,19)→(4,18)→(5,18) then site-shifted displ accept.
- Verification: green+strict PASS; no js/ change; peel still @109454.
- Next: second travel step from (4,18) vs C (D-0788).

## 2026-07-19 19:10 — #901 D-0787 wiz_map ^F
- Objective: seed0360 @109077 C exercise rn2(19) vs JS rn2(4).
- C locus: `wizcmds.c` `wiz_map`; `detect.c` `do_mapping`; cmd `C('f')`.
- Change: unbound `^F` was Unknown command; port `wiz_map` + key 6 +
  `#wizmap` + `map_engraving`. Prefix **109077→109454**.
- Verification: green+strict PASS; cohort 35/35; seed0360 suite RNG
  **110391** Scr **390**; seed0014 suite matched **50419**.
- Next: @109454 C set_apparxy rn2(5) vs JS rn2(4).

## 2026-07-19 19:05 — #900 score + D-0786 dokick Wounded_legs
- Objective: cadence full `sessions`; seed0360 @108369 (misread as
  set_apparxy rn2(4) vs rn2(2)).
- C locus: `dokick.c` `dokick` Wounded_legs; `do.c` `legs_in_no_shape`.
- Change: after D-0785, next `^D` must refuse + `--More--`; JS kicked
  again. Port gate + `flush_topl_more`. Prefix **108369→109077**.
- Verification: green+strict PASS; 0060/1500/1800 PASS; full **37/44**
  Scr **8397** RNG **641147** (80.87%); seed0014 **50419**.
- Next: @109077 C exercise rn2(19) vs JS rn2(4) (key `^F`).
