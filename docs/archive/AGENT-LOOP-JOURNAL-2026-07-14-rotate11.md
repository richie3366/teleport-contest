# Rotated journal entries

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
