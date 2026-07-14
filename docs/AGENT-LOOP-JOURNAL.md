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

## 2026-07-14 22:36 — #349 D-0322 hmon hit exclam

- Objective: seed0030 @1429 `You hit Swidnica!` vs `.` (CURRENT).
- C locus: `uhitm.c` `hmon_hitmon_msg_hit` + `zap.c` `exclam`.
- Change: port `canseemon?exclam(dmg)` + bash/lash/smite/hit verb (D-0322).
- Verification: @1429 match; Scr **1445→1446**; first miss **@1433**
  (seg7 −13 death screens); RNG full; green+strict; 17 PASS cohort.
- Next: @1433 fatal wand-hit `--More--` / death screen capture.

## 2026-07-14 22:30 — #348 D-0321 SPBOOK xname descr

- Objective: seed0030 @1342 shining spellbook vs spellbook of jumping (CURRENT).
- C locus: `objnam.c` `xname_flags` SPBOOK_CLASS — dknown+!nn → `"%s spellbook"`.
- Change: port SPBOOK dknown/nn/un/dn arms; `nn` = `oc_name_known` only
  (D-0321).
- Verification: @1342/@1343 match; Scr **1438→1445**; first miss **@1429**
  hit `!` vs `.`; RNG full; green+strict; 19 PASS cohort.
- Next: @1429 `uhitm` `exclam(dmg)` after `You hit`.

## 2026-07-14 22:22 — #347 D-0320 losehp leave neg uhp

- Objective: seed0030 @1262 hit `--More--` HP:0 vs C HP:4 (CURRENT).
- C locus: `hack.c` `losehp` — no fatal uhp clamp; `bot` skip when `uhp==-1`.
- Change: remove `uhp=0` on fatal in `losehp`; `done` still zeros after bot
  (D-0320).
- Verification: @1262 HP:4; Scr **1432→1438**; first miss **@1342** shining
  spellbook; RNG full; green+strict; 17 PASS cohort + strict sample.
- Next: @1342 SPBOOK `"%s spellbook"` descr (`shining`) vs known leak.

## 2026-07-14 22:15 — #346 D-0319 thitu await pline

- Objective: seed0030 @1195 arrow glyph on shoot `--More--` (CURRENT).
- C locus: `mthrowu.c` `thitu` You-hit then losehp; `monshoot` pline before
  `m_throw` (flash kept through hit `--More--`).
- Change: await `thitu` hit/miss + `monshoot` plines before `losehp`/flight
  (D-0319).
- Verification: @1195 `)`+HP:9; Scr **1428→1432**; first miss **@1262**
  botl HP:4 vs 0; RNG full; green+strict; 19 PASS cohort + strict.
- Next: @1262 `losehp` leave negative `uhp` (`bot` skip `-1`).

## 2026-07-14 22:05 — #345 D-0318 mon_wield canseemon pline + score

- Objective: seed0030 @1174 thin-air + gnome wield (CURRENT); mandatory
  full `sessions` score (iter % 5 == 0).
- C locus: `weapon.c` `mon_wield_item` canseemon wield pline.
- Change: async wield message `Monnam wields doname!|.`; await callers
  (D-0318).
- Verification: @1174 match; Scr **1427→1428**; first miss **@1195** map
  `)` vs `·`; RNG full; green+strict; 19 PASS cohort; full **19/44**
  Scr **2865**/11405 RNG **240657**/792838 speed `17+0.12/turn`.
- Next: @1195 thrown-arrow map glyph during shoot `--More--`.

## 2026-07-14 21:56 — #344 D-0317 moverock hear-behind

- Objective: seed0030 @836 boulder hear-behind (CURRENT).
- C locus: `hack.c` `moverock_core` mtmp arm; `dopush` unmap invisible.
- Change: `You_hear`/`canspotmon` + verbose cannot-move (no vain);
  `closed_door` vain; `dopush` clears dest `I` before `movobj` (D-0317).
- Verification: @836 match; Scr **1400→1427**; first miss **@1174**
  thin-air + gnome wield; RNG full; green+strict; 19 PASS cohort.
- Next: @1174 `You attack thin air.  The gnome wields a bow!`.

## 2026-07-14 21:51 — #343 D-0316 mksobj WAND known=0

- Objective: seed0030 @791 glass wand charges (CURRENT).
- C locus: `mkobj.c` `unknow_object` / `WAND()` `oc_uses_known=1`.
- Change: `mksobj` uskn heuristic includes `WAND_CLASS` so new wands
  start `known=0` (D-0316). Symptom was `doname` `(0:6)`, root was create.
- Verification: @791/@793 bare glass wand; Scr **1398→1400**; first miss
  **@836** boulder hear-behind; RNG full; green+strict; 17 PASS cohort.
- Next: @836 `hear a monster behind the boulder` vs vain push.

## 2026-07-14 21:44 — #342 D-0315 Priest xname bknown

- Objective: seed0030 @787 Things that are here (CURRENT).
- C locus: `objnam.c` `xname` `Role_if(PM_CLERIC)` → `obj->bknown=1`.
- Change: force cleric `bknown` in `xname` + `doname` (D-0315). Prior
  map-overlay hypothesis falsified — miss was BUC text.
- Verification: @787 `a cursed candy bar`; Scr **1395→1398**; first miss
  **@791** wand `(0:6)`; RNG full; green+strict; 19 PASS cohort.
- Next: @791 pet pickup `glass wand` vs `glass wand (0:6)`.

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
