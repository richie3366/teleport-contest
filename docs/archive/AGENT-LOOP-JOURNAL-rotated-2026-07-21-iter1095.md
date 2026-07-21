# Rotated from AGENT-LOOP-JOURNAL.md @#1095

## 2026-07-21 02:01 — #1086 D-0928 ystart=2 falsified (C rn2(20))
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `lspo_map`/`get_location`/`flip_level`/
  `get_level_extends`; `dat/medusa-3.lua`.
- Falsified: literal ystart=2 + ysize=19 (C still `rn2(20)` at
  `get_location` @18198). DIAG: JS mx=3,my=1,flp=2,sum81,
  stair `(49,16)`→`(32,16)`. Gen-time ystart=1 (=JS); Y+1 needs
  non-ystart cause; FlipX sum80 still open for X. No production JS.
- Verification: green+strict PASS; rng-diff still @88377.
- Next: C-cited FlipX minx=1 with ystart=1; explain Y+1; cadence @#1090.

## 2026-07-21 01:53 — #1085 public score cadence
- Objective: mandatory full `sessions` score (@#1085 % 5 == 0).
- C locus: n/a (score-only; no JS port change).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  Stable vs @#1080: **42/44**, Scr **10398**/11405, RNG
  **773047**/792838 (**97.50%**), speed `30+0.24/turn`.
  Non-PASS unchanged: seed2200 229/230; seed4500 @88377
  88484/108275 Scr 808/1814 (D-0928).
- Verification: green+strict PASS; full suite run complete.
- Next: D-0928 C path for FlipX sum80 ∧ ystart=2 together;
  cadence @#1090.

## 2026-07-21 01:48 — #1084 D-0928 C downstairs proves (−1,+1)
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level`/`get_level_extends`/`lspo_map`;
  `dat/medusa-3.lua`; `mkmaze.c` `place_lregion`.
- Falsified: FORCE `ystart=2` alone (prefix→78606; flips to 0).
  Evidence: C `>`**(31,17)** vs JS `(32,16)` + `<`(44,5)/`@`(42,7)
  — whole post-flip map (−1,+1). Same place rn2 fail/success ⇒
  C geometry ≡ JS+(−1,+1). Needs FlipX sum80 ∧ effective ystart=2
  without early RNG break. No production JS change.
- Verification: green+strict PASS; rng-diff still @88377.
- Next: C path for ystart=2 ∧ minx=1 together; cadence @#1085.

## 2026-07-21 01:40 — #1083 D-0928 C stair confirms (−1,+1)
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level`/`get_level_extends`;
  `mkmaze.c` `place_lregion`; `dat/medusa-3.lua`.
- Falsified: FORCE FlipX minx=1 alone (stair→`(44,4)`, post-flip
  RNG desync). Evidence: C `<`(44,5)+`@`(42,7) vs JS `(45,4)`+
  `(43,6)` — same (−1,+1); need FlipX sum80 ∧ ly+1 together.
  JS col2 STONE at flip. No production JS change.
- Verification: green+strict PASS; rng-diff still @88377.
- Next: C path for both deltas at one flip; cadence @#1085.

## 2026-07-21 01:30 — #1082 D-0928 flip extends + medusa epilogue
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level`/`get_level_extends`/`load_special`;
  `mkmaze.c` `place_lregion`; `dat/medusa-3.lua`.
- Falsified: ystart formula differs for hei=20 (JS=C=1);
  FlipX minx=1 alone (→ land y=6). Confirmed ^V6→24,
  `flp=2` extends 2..79×0..20, pre-flip tele `[36..41]×[3..8]`,
  tries fail/fail/(43,6); C needs `[39..44]×[4..9]`.
  Change: medusa-3 `link_doors_rooms`/`remove_boundary_syms`/
  `map_cleanup` before wallify (C epilogue).
- Verification: green+strict PASS; cohort 0002/0014/1800 PASS;
  rng-diff still @88377.
- Next: C path for minx=1 ∧ ly=4; cadence @#1085.

## 2026-07-21 01:15 — #1081 D-0928 C @ reconfirm (42,7)
- Objective: seed4500 Dlvl-24 / medusa-3 hero place (D-0928).
- C locus: `dat/medusa-3.lua` `teleport_region`; `sp_lev.c`
  `flip_level`/`get_level_extends`; `mkmaze.c` `place_lregion`.
- Falsified: C land `@(39,5)`. Session `@`/`cursor` **(42,7)**
  (wizmap); JS DIAG `u_on_newpos(43,6)` `dndest[40..45]×[3..8]`
  after FlipX `flp=2` extends minx=2..79, xstart=3,ystart=1;
  place `rn2(6)×3` matches @L=82419–82424. Infer C
  `dndest[39..44]×[4..9]`. No production JS change.
- Verification: green+strict PASS; rng-diff still @88377.
- Next: C `ystart` / `get_level_extends` at medusa-3 flip;
  cadence @#1085.
