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

## 2026-07-14 19:16 — D-0299 map_object nearby observe

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @237.
- C locus: `display.c` `map_object` / `see_nearby_objects` → `observe_object`.
- Change: neardist observe on map + after `domove`; falsified bare
  `obj_color`/bright-arm hypothesis for white `*`.
- Verification: prefix **237→259**; Scr **889→1085**; RNG full;
  green+strict; 17-PASS cohort + strict sample.
- Next: prefix@259 JS `o` vs C blank (5,52).

## 2026-07-14 19:08 — #320 score + D-0298 dosounds vault You_hear

- Objective: mandatory full `sessions` score (loop %5==0) + seed0030 @174.
- C locus: `sounds.c` `dosounds` vault `gd_sound` → `You_hear`.
- Change: async vault `You_hear` + `await dosounds()`; falsified bare
  topline/`more()` hypothesis for @174.
- Verification: full suite **19/44**, Scr **2313/11405** (20.28%), RNG
  **240559/792838**, speed `17+0.11/turn`; seed0030 prefix **174→237**,
  Scr **887→889**; green+strict; 19-PASS cohort.
- Next: prefix@237 `*` color 15 vs 8 (`obj_color`).

## 2026-07-14 19:04 — D-0297 display_monster M_AP_OBJECT

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @163.
- C locus: `display.c` `display_monster` `M_AP_OBJECT` → `map_object`.
- Change: `newsym` draws/remembers `obj_glyph(mappearance)` for disguised
  mimics instead of mlet `m`.
- Verification: prefix **163→174**; Scr **853→887**; RNG full; green+strict;
  19-session PASS cohort + strict.
- Next: prefix@174 C `You miss…--More--` vs JS without `--More--`.

## 2026-07-14 19:00 — full public score + every-5 cadence

- Objective: refresh suite totals; wire mandatory full score every 5 loop iters.
- Measurement: `node frozen/ps_test_runner.mjs sessions` @ `6b84eab` →
  **19/44** Scr **2277**/11405 (19.96%) RNG **240559**/792838 (30.34%)
  speed `18+0.11/turn` (R² 0.78). PASS set unchanged (19). seed0030 Scr
  **853**/1953 RNG full; seed2200 Scr **175**/230 (older notes had ~229).
- Change: `CURRENT.md` Score; loop injects score reminder when `iter % 5 == 0`;
  prompt/playbook/AGENT-PORT-LOOP cadence notes.
- Next: seed0030 screen peel @163 (mimic appearance).

## 2026-07-14 18:56 — D-0295/96 Monnam do_it + map_invisible

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @129.
- C locus: `do_name.c` `x_monnam` do_it; `mhitm.c` `pre_mm_attack` →
  `display.c` `map_invisible`.
- Change: `!canspotmon` → `It` in `Monnam` (D-0295); shared
  `canspotmon`; `map_invisible` `I` + `missmm`/`hitmm` pre_mm (D-0296).
- Verification: prefix **129→163**; Scr **843→853**; RNG full;
  green+strict; 19-session PASS cohort + strict.
- Next: prefix@163 C `(` vs JS `m` (mimic object appearance).

## 2026-07-14 18:51 — D-0294 mhitm noises You_hear

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @126.
- C locus: `mhitm.c` `noises` + `missmm`/`hitmm` `!gv.vis` (not `dosounds`).
- Change: port `noises`/`You_hear` + `far_noise`/`noisetime` rate limit;
  call from out-of-sight miss/hit (D-0294). Falsified dosounds hypothesis.
- Verification: prefix **126→129**; Scr **840→843**; RNG full; green+strict;
  17-session PASS cohort + strict.
- Next: prefix@129 C `It misses…` vs JS `The kitten misses…` (`Monnam`).

## 2026-07-14 18:47 — D-0293 DECgraphics S_altar meta-{

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @109.
- C locus: `dat/symbols` DECgraphics `S_altar: \xfb`; `display.c` ALTAR.
- Change: DEC altar `{`+dec (ASCII `_`); scoring grid keeps raw `{`
  not Unicode π (frozen DEC_MAP lacks `{`) (D-0293).
- Verification: prefix **109→126**; Scr **821→840**; RNG full; green+strict;
  19-session PASS cohort + strict.
- Next: prefix@126 C hear-noises topline vs JS blank (`dosounds`).

## 2026-07-14 18:50 — D-0292 amulet xname + clear_dknown

- Objective: seed0030 Scr peel (CURRENT primary); runner matched 818 was
  total count — true prefix first-miss was @93.
- C locus: `objnam.c` xname AMULET_CLASS; `mkobj.c` clear_dknown/unknow_object.
- Change: `<descr> amulet` via oc_descr_idx; mksobj clear_dknown (D-0292).
- Verification: prefix **93→109**; Scr **818→821**; RNG full; green+strict;
  17-session PASS cohort + strict.
- Next: prefix@109 JS `_` vs C `{`+DEC (fountain/altar/DECgraphics).

## 2026-07-14 18:40 — D-0291 topten + record VFS + terminate capture

- Objective: seed0030 Scr 161/1953 (CURRENT primary); first miss @78.
- C locus: `topten.c` `topten`/`outheader`/`outentry`; `end.c` → `nh_terminate`
  contest input-boundary capture (no nhgetch after raw_print panel).
- Change: port `js/topten.js` (!toptenwin raw panel + VFS `record`); wire
  after RIP; `game._captureInputBoundary` for final frame (D-0291).
- Verification: Scr@78 match; Scr **161→818**; miss **78→818**; RNG full;
  green+strict; 17-session PASS.
- Next: Scr@818 seg5 cell diff; or seg7 159 vs 172 steps.

## 2026-07-14 18:24 — D-0290 RIP endwin trailing blank `--More--`

- Objective: seed0030 Scr 120/1953 (CURRENT primary); first miss @76.
- C locus: `end.c` `really_done` final empty `dump_forward_putstr`;
  `wintty.c` `process_text_window` page-break at rows-1.
- Change: append trailing `''` in `show_death_rip_and_summary` so 24
  lines force blank page-2 `--More--` (D-0290).
- Verification: Scr@76–77 blank more match; prefix miss **76→78**;
  Scr **120→161**; RNG full; green+strict; 19-session PASS cohort.
- Next: Scr@78 `topten()` score list; or seed0013.

## 2026-07-14 18:18 — D-0288/89 disclose + RIP death summary

- Objective: seed0030 Scr 116/1953 (CURRENT primary); first miss @75.
- C locus: `options.c`/`end.c` disclose; `rip.c` `genl_outrip`;
  `do.c` Tourist `more_experienced` on new level.
- Change: parse `disclose:-i…` → skip invent yn (D-0288); RIP+Aloha
  NHW_TEXT + score; Tourist goto XP for 124 points (D-0289).
- Verification: Scr@75 match; prefix miss **75→76**; Scr **116→120**;
  RNG full; green+strict PASS; 17-session PASS cohort.
- Next: Scr@76 topten/endwin `--More--`; or seed0013.

## 2026-07-14 18:12 — D-0286/87 mswings + botl HP clamp

- Objective: seed0030 Scr 103/1953 (CURRENT primary); first miss @62.
- C locus: `mhitu.c` `mswings`/`mswings_verb`/`hitval`; `botl.c` hp<0→0.
- Change: AT_WEAP melee calls `hitval` + `mswings` before hit/miss
  (D-0286); status line clamps negative HP for display (D-0287).
- Verification: Scr@62 topline+HP match; prefix miss **62→75**;
  Scr **103→116**; RNG full; green+strict PASS; 17-session PASS cohort.
- Next: Scr@75 death `--More--` vs invent-identify yn; or seed0013.

## 2026-07-14 18:03 — D-0284/85 tmp_at flash + potion xname

- Objective: seed0030 Scr 100/1953 (CURRENT primary); first miss @50.
- C locus: `mthrowu.c` `m_throw` `tmp_at(DISP_FLASH)`; `objnam.c`
  potion xname `oc_name_known` / descr.
- Change: port DISP_FLASH `tmp_at` + await `potionhit` plines so prior
  flight `!` survives crash `--More--` (D-0284); potion `xname` uses
  shuffled descr when !nn (not `obj.known`) (D-0285).
- Verification: Scr@50–51 match; prefix miss **50→62**; Scr **100→103**;
  RNG full; green+strict PASS; 19-session PASS cohort + strict.
- Next: Scr@62 gnome bow-swing pline; or seed0013.

## 2026-07-14 17:55 — D-0283 botl depth + Mines walls

- Objective: seed0030 Scr 87/1953 (CURRENT primary); first miss @46.
- C locus: `botl.c` `describe_level` `depth(&u.uz)`; `display.c`
  `wall_color(mines_walls)`.
- Change: botl `Dlvl` via `depth()` (not `dunlev`); Mines walls
  `CLR_BROWN` when `In_mines`. DIAG confirmed second `>` is Mines
  branch stairs (`dnum:2,dlevel:1`), not wrong goto.
- Verification: Scr@46–49 match; prefix **46→50**; Scr 87→100;
  RNG full; green+strict PASS; 19-session PASS cohort + strict.
- Next: Scr@50 C `!` vs JS `·` (6,33); or seed0013.
