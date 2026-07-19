# Agent loop journal (rotated at #915)

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
