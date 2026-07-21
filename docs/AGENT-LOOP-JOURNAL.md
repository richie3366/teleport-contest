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
## 2026-07-21 02:24 — #1088 D-0928 FlipX sum80 probes (kelp940)
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level`/`get_level_extends`; `mklev.c`
  `water_has_kelp`; `dat/medusa-3.lua`.
- Falsified: FORCE maxx78/minx1 (kelpW 940→959, place @82419);
  coords-only FlipX (@80989); stone78-clear (land `(42,6)` then
  @83695). Evidence: C kelp count **940**; need last=77 at flip
  without losing edge water. No production JS.
- Verification: green+strict PASS; rng-diff baseline @88377.
- Next: C-cited last=77 ∧ kelp940 ∧ keep edge water; cadence @#1090.

## 2026-07-21 02:15 — #1087 D-0928 Y+1 falsified (tty/map); stairs ungated
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level` stairs (no inFlipArea);
  `mkmaze.c` `get_level_extends` scan bounds; `dat/medusa-3.lua`.
- Falsified: whole-map Y+1 — C cursor `[42,7]` is tty (=map y+1);
  land is X-only C(42,6) vs JS(43,6). FORCE minx=1 → stair(31,16)
  but place desync @82419. Change: stairs/`dnstair` ungated flip +
  extends `xmin<=COLNO`/`ymin<=ROWNO` (prefix unchanged @88377).
- Verification: green+strict PASS; cohort 7/7; rng-diff @88377.
- Next: C-cited FlipX sum80 with place-safe terrain; cadence @#1090.

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

## 2026-07-21 01:05 — #1080 cadence + D-0928 place DIAG
- Objective: mandatory full `sessions` score; refine Dlvl-24 land.
- C locus: `mkmaze.c` `place_lregion`/`put_lregion_here` →
  `u_on_newpos`; levregion/`dndest`.
- Score: **42/44** Scr **10398**/11405 RNG **773047**/792838
  (97.50%) speed `31+0.26/turn`. Non-PASS: seed2200 229/230;
  seed4500 88484/108275 Scr 808.
- Falsified: place/`collect_coords` RNG mismatch (match 82k–83k).
  DIAG: JS `u_on_newpos(43,6)` @L=82425
  `dndest={lx:40,ly:3,hx:45,hy:8,nlx:82,…}`. No production JS change.
- Next: C vs JS `dndest`/levregion for Dlvl-24; cadence @#1085.

## 2026-07-21 01:01 — #1079 D-0928 linedup falsified → place
- Objective: seed4500 @88377 C `linedup` `rn2(2)` vs JS `rn2(5)`.
- C locus: `mthrowu.c` `linedup` (symptom); real: `teleport.c`
  `collect_coords` after `place_lregion` ~82426.
- Falsified: boulder/`rn2(2+spots)`. DIAG: dragon breath
  `(47,10)→(42,6)` not collinear → no linedup rn2; next mon
  `distfleeck`. C `@`(39,5→39,4) Blind vs JS `(42,6)` from ~82600.
- Verification: green+strict PASS; no production JS change; prefix
  still **88377**.
- Next: port Dlvl-24 hero place / `collect_coords` candidates;
  cadence @#1080.

## 2026-07-21 00:53 — #1078 D-0927 rhack F-prefix reject
- Objective: seed4500 @87803 C `distfleeck` `rn2(5)` vs JS `rn2(20)`.
- C locus: `cmd.c` `rhack` / `do_fight` (PREFIXCMD + CMD_gGF_PREFIX).
- Change: F-prefix + non-movement must pline and **not** execute the
  next command (was silent-clear then still run `#` → key desync so
  `h` walked/attacked instead of wield letter). Root not distfleeck.
- Verification: prefix **87803→88377** RNG **88484** Scr **808**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800
  PASS (7/7).
- Next: @88377 C `linedup` `rn2(2)` vs JS `rn2(5)`; cadence @#1080.

## 2026-07-21 00:48 — #1077 D-0926 mhitm_ad_blnd mhitu
- Objective: seed4500 @87218 C `distfleeck` `rn2(5)` vs JS `rn2(8)`.
- C locus: `uhitm.c` `mhitm_ad_blnd` (youmonst); `mondata.c`
  `can_blnd` AT_CLAW; `potion.c` `make_blinded`.
- Change: port mhitu `mhitm_ad_blnd_u` + wire `AD_BLND`. Root: omitted
  raven claw blind → no `It` hitmsgs → extra `--More--` → key ahead
  → premature minotaur `collect_coords` (not a distfleeck bug).
- Verification: prefix **87218→87803** RNG **88082** Scr **794**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800
  PASS (7/7).
- Next: @87803 C `distfleeck` `rn2(5)` vs JS `rn2(20)`; cadence @#1080.

## 2026-07-21 00:37 — #1076 D-0925 breamm / AT_BREA
- Objective: seed4500 @86672 C `breamm` `rn2(3)` vs JS `rn2(5)`.
- C locus: `mthrowu.c` `breamm`/`breamu`; `mhitu.c` AT_BREA;
  `zap.c` `dobuzz`/`zap_over_floor` ZT_FIRE pool; `mondata.c`
  `get_atkdam_type`/`cvt_adtyp_to_mseenres`.
- Change: port `breamm`/`breamu` + wire AT_BREA; export `dobuzz` with
  fire-pool steam + poison-gas 1×1 trail; `zhitm` fire `burnarmor`.
  Root: skipped monster breath after distfleeck (omit since D-0900).
- Verification: prefix **86672→87218** RNG **87347** Scr **759**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1500/1800
  PASS. (Door-absorb pline kept for type≥0 — seed0002 screen).
- Next: @87218 C `distfleeck` `rn2(5)` vs JS `rn2(8)`; cadence @#1080.

