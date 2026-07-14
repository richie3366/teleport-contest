# Rotated from AGENT-LOOP-JOURNAL.md (2026-07-14 rotate12)

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
