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

## 2026-07-14 21:39 — #341 D-0314 botl flush/bot/more timing

- Objective: seed0030 @779 You die botl HP:1 vs HP:0 (CURRENT).
- C locus: `pline.c` flush→`bot`; `botl.c` uhp==-1 skip; `topl.c` more
  no flush; `cls` botlx; `spell.c` uen botl; `end.c` done bot before zero.
- Change: commit status only in `bot()`; pline flushes first; more paints
  cache; cls botlx; spell uen botl (D-0314).
- Verification: @779 match; Scr **1394→1395**; first miss **@787**; RNG
  full; green+strict; 17 PASS cohort (seed0501 after spell botl).
- Next: @787 `Things that are here:` map overlay cells.

## 2026-07-14 21:24 — #340 score + D-0313 done_in_by isshk

- Objective: mandatory full `sessions` (#340 %5) + seed0030 @583 RIP.
- C locus: `end.c` `done_in_by` isshk; `shknam.c` `shkname_is_pname`.
- Change: honorific + `shkname` + `, the shopkeeper` + `KILLED_BY` (D-0313).
- Verification: full suite **19/44**, Scr **2831/11405** (24.82%), RNG
  **240657/792838**, speed `18+0.11/turn`; seed0030 Scr **1389→1394**,
  RIP @583 match; first miss **@779** HP:1 vs HP:0; green+strict; 19 PASS
  cohort.
- Next: @779 `You die...` botl HP:1 vs HP:0.

## 2026-07-14 21:17 — #339 D-0312 SCROLL xname unlabeled

- Objective: seed0030 @594 unlabeled scroll vs blank paper (CURRENT).
- C locus: `objnam.c` `xname_flags` SCROLL_CLASS — `!nn`+!magic →
  `"<dn> scroll"`; nn = `oc_name_known` only.
- Change: port SCROLL dknown/nn/un/labeled/unlabeled arms; drop
  `obj.known` OR (D-0312).
- Verification: @594 topline match; Scr **1388→1389**; RNG full;
  green+strict; 17 PASS cohort + strict sample. Contiguous cell miss
  remains @583 RIP (pre-existing).
- Next: @583 RIP `done_in_by` shk `Ms. Maganasipi, the shopkeeper`.

## 2026-07-14 20:42 — #334 D-0311 paybill inherits possessions

- Objective: seed0030 @582 Maganasipi takes possessions (CURRENT).
- C locus: `shk.c` `paybill`/`inherits`; `end.c` `really_done` before
  `display_nhwindow(WIN_MESSAGE)`.
- Change: port paybill/inherits/money2mon/set_repo_loc + finish_paybill;
  call before flush so pline appends to `You die...` (D-0311).
- Verification: @582 topline match; prefix **582→594**; Scr **1387→1388**;
  RNG full; green+strict; 19 PASS cohort + strict sample.
- Next: @594 kitten unlabeled scroll vs blank paper.

## 2026-07-14 20:33 — #333 D-0310 bot skip uhp==-1

- Objective: seed0030 @580 HP:0 vs C HP:11 (CURRENT).
- C locus: `botl.c` `bot` — no-op when `u.uhp == -1`.
- Change: cache last status; suppress botl paint on exact overkill (D-0310).
  Hypothesis “wand/melee over-damage” falsified — damage after hitmsg is
  faithful; display refreshed too early.
- Verification: prefix **580→582**; Scr **1383→1387**; green+strict;
  17 PASS cohort + strict sample.
- Next: @582 Maganasipi takes all your possessions.

## 2026-07-14 20:20 — #332 D-0308/09 Maganasipi miss + long wand

- Objective: seed0030 @580 long wand (CURRENT); literal first-miss was @576.
- C locus: `do_name.c` mon_nam; `objnam.c` WAND_CLASS xname; `muse.c` mzapwand.
- Change: uhitm import shared mon_nam (D-0308); WAND `"%s wand"` + mzapwand
  `dknown=1` (D-0309). Blanket xname observe falsified (distantname).
- Verification: prefix **576→580**; Scr **1376→1383**; @580 topline OK;
  green+strict; 17 PASS cohort + strict sample.
- Next: @580 botl HP 0 vs 11 after Boing+hit.

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
