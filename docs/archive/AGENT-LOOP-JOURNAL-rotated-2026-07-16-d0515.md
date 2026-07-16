## 2026-07-16 15:28 — D-0501 lootabc + take-out sort + gold bot()
- Objective: primary seed0007 screen peel @116 (`#loot` take-out;
  first cell miss was @111 lootabc letters).
- C locus: `pickup.c` `in_or_out_menu` / `menu_loot` / `query_objlist`
  / `out_container`; `invent.c` `sortloot` / `let_to_name`.
- Change: `js/pickup.js` — paint a/b/c/d/e when `flags.lootabc`;
  take-out INVORDER_SORT headings + `$`/letters; `await bot()` after
  gold remove (was botl flag only).
- Verification: Scr **116→126**/302; @111/@116 match; RNG full;
  green+strict; cohort **26/26** PASS.
- Next: @124 botl `AC:9` vs `AC:7` (D-0502).

## 2026-07-16 15:21 — D-0500 botl hu_stat hunger
- Objective: primary seed0007 screen peel @85 (Satiated botl).
- C locus: `botl.c` `do_statusline2` `u.uhs != NOT_HUNGRY` → `hu_stat[]`;
  `eat.c` `hu_stat`.
- Change: `js/display.js` `_statusLine2` — emit `HU_STAT` before
  `enc_stat` when `uhs !== NOT_HUNGRY` (field already SATIATED via D-0438).
- Verification: Scr **85→116**/302; @85 match; RNG full; green+strict;
  cohort **28/28** PASS.
- Next: @116 `#loot` take-out menu (D-0501).

## 2026-07-16 15:18 — D-0499 doset per-bool pline
- Objective: primary seed0007 screen peel @38 (showexp/time botl).
- C locus: `options.c` `optfn_boolean` one pline/bool + botl before
  pline; topline NEED_MORE append/`more`.
- Change: `js/options.js` `doset` — drop join-2 msgBuf; `await pline`
  per selected bool so showexp botl paints during price_quotes More
  before `time` applies.
- Verification: Scr **84→85**/302; @38 match; RNG full; green+strict
  PASS; cohort 26/26 PASS.
- Next: @85 botl `Satiated` / D-0500.

