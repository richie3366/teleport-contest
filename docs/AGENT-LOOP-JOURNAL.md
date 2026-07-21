# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-21 03:24 — #1094 D-0928 dobuzz type<0 monkilled
- Objective: seed4500 @88399 corpse_chance rn2(2) vs JS rn2(6).
- C locus: `zap.c` `dobuzz` (`type < 0` → `monkilled`); `mon.c`
  `monkilled`/`mondied`/`corpse_chance`.
- Change: export `monkilled`; dobuzz mon-breath kill uses it (no
  `xkilled` treasure `rn2(6)`).
- Verification: prefix **88399→89775**; RNG **89881** Scr **807**;
  green+strict PASS; cohort 7/7.
- Next: @89775 C `gethungry` `rn2(20)` vs JS `rn2(67)`.

## 2026-07-21 03:22 — #1093 D-0928 fight_empty remembered I
- Objective: seed4500 @88377 linedup (D-0928).
- C locus: `hack.c` `domove_fight_empty` (I-glyph + !m_at + !nopick).
- Change: Blind Ctrl-j onto remembered `'I'` wastes turn like C;
  `unmap_object`+`newsym`. Place/flip already matched (#1092).
- Verification: prefix **88377→88399**; RNG **89887** Scr **806**;
  green+strict PASS; cohort 7/7.
- Next: @88399 C `corpse_chance` `rn2(2)` vs JS `rn2(6)`.

## 2026-07-21 03:05 — process: C dump when stuck (geometry)
- Objective: promote D-0928 #1092 learning into durable loop guidance.
- C locus: n/a (docs).
- Change: `GROK-PLAYBOOK` §7 + §9; `PORTING-RUNBOOK` diagnose §C.5;
  `agent-notes.mdc` when-to-write — prefer temp C locus dump over
  FORCE/screen-inferred geometry after two falsifications.
- Verification: n/a (docs-only).
- Next: loop agents follow playbook §7 on geometry peels.

## 2026-07-21 02:50 — #1092 D-0928 C flip dump falsifies last=77
- Objective: seed4500 medusa-3 place / @88377 (D-0928).
- C locus: `sp_lev.c` `flip_level` / `Flip_coord` / `place_lregion`.
- Change: temp C recorder dump — medusa-3 flip **sum81**, stair
  **(32,16)**, place rect**(40,3)-(45,8)** tries≡JS land**(43,6)**;
  last=77/sum80 dead. Restored `Flip_coord` inFlipArea+x; removed
  invented SpLev_Map flip. Recorder DIAG reverted.
- Verification: green+strict PASS; cohort 7/7; rng-diff still @88377.
- Next: linedup geometry with matched place; cadence @#1095.

## 2026-07-21 02:43 — #1091 D-0928 flip extras + stone78@83695 track
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level` (mgoal/EPRI/ESHK/doors/
  `level.monsters[][]`); `monmove.c` `m_move:1963`.
- Change: port Flip_coord(mgoal)+priest/shk + ungated door flip +
  `_level_monsters` swap. DIAG: stone78@83695 = track
  `rn2(4*(cnt-j))` JS cnt=8 vs C7 (j=0), mon@(44,13) u@(41,6) —
  not chcnt; baseline still @88377 (no last=77).
- Verification: green+strict PASS; cohort 7/7; rng-diff @88377.
- Next: C-cited last=77 without FORCE; cadence @#1095.

## 2026-07-21 02:35 — #1090 public score cadence
- Objective: mandatory full `sessions` score (@#1090 % 5 == 0).
- C locus: n/a (score-only; no JS port change).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  Stable vs @#1085: **42/44**, Scr **10398**/11405, RNG
  **773047**/792838 (**97.50%**), speed `31+0.25/turn`.
  Non-PASS unchanged: seed2200 229/230; seed4500 @88377
  88484/108275 Scr 808/1814 (D-0928).
- Verification: green+strict PASS; full suite run complete.
- Next: D-0928 C-cited last=77 / stone78@83695 `m_move` rn2(28)
  vs rn2(32); cadence @#1095.

## 2026-07-21 02:33 — #1089 D-0928 exclude78/restore falsified
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level`/`get_level_extends`; `monmove.c`
  `m_move`; `dat/medusa-3.lua`.
- Falsified: exclude78 (minx=3,maxx=77 keep w78) and stone78_restore
  — both land `(42,6)`/kelp940 then **@82639**; worse than stone78
  **@83695**. @83695 is not missing col78 water. Preflip col78 =
  20×MOAT, mons/objs/traps 0. No production JS.
- Verification: green+strict PASS; rng-diff baseline @88377.
- Next: C-cited last=77; stone78@83695 rn2(28) vs rn2(32); cadence @#1090.

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
