# Agent loop journal archive (rotate8)

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
