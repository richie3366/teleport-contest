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

## 2026-07-14 19:59 — #330 score + D-0306 shop You_hear

- Objective: mandatory every-5 full `sessions` (#330); seed0030 @550 peel.
- C locus: `sounds.c` `dosounds` — `You_hear1(shop_msg[rn2(2)+hallu])`.
- Change: emit shop_msg via `You_hear` (was RNG-only burn) (D-0306).
- Verification: prefix **550→573**; Scr **1371→1373**; suite **19/44**,
  Scr **2810**/11405 (24.64%), RNG **240657**/792838, `17+0.11/turn`;
  green+strict PASS; 19 PASS held.
- Next: @573 C shop welcome — port `u_entered_shop` / `ushops_entered`.

## 2026-07-14 19:56 — D-0305 TOOL/WEAPON xname descr

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @485.
- C locus: `objnam.c` `xname_flags` WEAPON/VENOM/TOOL — `!nn` → `dn`.
- Change: `pretty_base` uses `OBJ_DESCR` when `!oc_name_known` (tin/magic
  whistle → `"whistle"`) (D-0305).
- Verification: prefix **485→550**; Scr **1370→1371**; RNG full;
  green+strict; 19-session PASS cohort + strict sample.
- Next: @550 C `You hear someone cursing shoplifters.` vs JS blank
  (`dosounds` shop_msg — RNG burned, `You_hear` omitted).

## 2026-07-14 20:00 — D-0304 xkilled post-drop newsym

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @484.
- C locus: `mon.c` `xkilled` — `newsym(x,y)` after treasure/corpse.
- Change: call final `newsym` after drops (mondead paints before treasure).
  Falsified mimic/`M_AP_OBJECT` theory — floor `TIN_WHISTLE` unpainted.
- Verification: prefix **484→485**; Scr **1348→1370**; RNG full;
  green+strict; 19-session PASS cohort + strict sample.
- Next: @485 C `a whistle` vs JS `a tin whistle` (`objnam` descr).

## 2026-07-14 19:55 — D-0303 dosounds fountain/sink You_hear

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @448.
- C locus: `sounds.c` `dosounds` fountain_msg / sink_msg → `You_hear1`.
- Change: emit msg tables via existing `You_hear` (was RNG-only burns).
- Verification: prefix **448→484**; Scr **1346→1348**; RNG full;
  green+strict; 19-session PASS cohort + strict sample.
- Next: @484 C `(` vs JS `#` west of `@` (mimic/`M_AP_OBJECT`?); alt
  @485 C `a whistle` vs JS `a tin whistle`.


## 2026-07-14 19:50 — D-0302 irregular filler_region no bbox re-light

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @372.
- C locus: `sp_lev.c` `lspo_region` irregular — `flood_fill_rm` then
  `add_room(..., FALSE, …)`; no bbox re-light.
- Change: remove invented `filler_region` lx−1..hx+1 lit loop (D-0302).
  Falsified doorway-LOS theory (`couldsee` OK; niche was wrongly lit).
- Verification: prefix **372→448**; Scr **1147→1346**; RNG full;
  green+strict; 17-session PASS cohort.
- Next: @448 fountain `You_hear("bubbling water.")` in `dosounds`.


## 2026-07-14 19:35 — #325 full public score + @372 probe

- Objective: mandatory every-5 full `sessions` score (#325); refine
  seed0030 @372 peel (no port patch).
- C locus: `vision.c` `view_from` / `vision_recalc` (doorway LOS).
- Change: removed leftover DIAG `__screenProbe` from `jsmain.js`;
  probed @372 → map (26,11) CORR after `u` (23,7)→(24,6).
- Verification: green+strict PASS; suite **19/44**, Scr **2584**/11405
  (22.66%), RNG **240658**/792838 (30.35%), `18+0.11/turn`.
- Next: falsify JS doorway LOS vs C at (26,11) from (24,6).


## 2026-07-14 19:25 — D-0301 missmu just near-miss

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @266.
- C locus: `mhitu.c` `missmu` `(nearmiss && flags.verbose) ? "just " : ""`.
- Change: honor `nearmiss` + verbose `"just "`; `map_invisible` when unseen.
- Verification: prefix **266→372**; Scr **1146→1147**; RNG full;
  green+strict; 19-session PASS cohort + strict.
- Next: @372 map JS `#` vs C blank east of room (seg3 Wizard Dlvl:2).


## 2026-07-14 19:20 — D-0300 newsym unseen blank clear

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @259.
- C locus: `display.c` `newsym` !cansee `show_mem` → `show_glyph(lev->glyph)`.
- Change: unseen + no memory paints blank (was no-op → stale IR mon glyph).
- Verification: prefix **259→266**; Scr **1085→1146**; RNG full;
  green+strict; 19-session PASS cohort + strict.
- Next: @266 topline C `just misses!` vs JS `misses!`.


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


