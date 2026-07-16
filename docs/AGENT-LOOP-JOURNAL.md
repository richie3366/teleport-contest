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

## 2026-07-16 16:21 — #569 D-0511 set_playmode plname wizard
- Objective: seed0398 first-cell screen (Scr 0/87, RNG full)
- C: `options.c` `set_playmode` → `strcpy(plname,"wizard")` when
  wizard; unixmain calls before plnamesuffix. JS `setup_role_race_from_rc`
  re-applied `OPTIONS=name` after that.
- Fix: `js/options.js` `set_playmode`; `jsmain` call after rc flags;
  drop `u_init` plname rewrite from opts.name.
- Verify: seed0398 Scr **0→77**/87; green+strict PASS; cohort **27/27**
  PASS. First remaining miss @28 blank drop getobj topline.
- Next: seed0398 @28 `What do you want to drop?` capture/paint

## 2026-07-16 16:17 — #568 D-0510 wizgenesis create_particular
- Objective: seed0398 @2960 C collect_coords rn2(8) vs JS rnl(20)
- C: `wizcmds.c` wiz_genesis → `read.c` create_particular →
  makemon(MM_NOEXCLAM) → enexto/collect_coords
- Fix: EXT_CMDS `#wizgenesis` + `create_particular` named path;
  `^G` wired. Missing runner made `jackal` keys hit apply/rnl(20).
- Verify: seed0398 RNG **2960→3026**/3026 full; Scr still 0/87;
  green+strict PASS; cohort **29/29** PASS
- Next: seed0398 first-cell screen peel

## 2026-07-16 16:12 — #567 D-0509 IMMEDIATE poly bhit
- Objective: seed0398 @2852 C weffects rn2(8) vs JS rn2(5)
- C: `zap.c` IMMEDIATE `bhit(rn1(8,6))` + `bhito` WAN_POLYMORPH;
  `learnwand`→`makeknown`→`exercise` on seen shudder
- Fix: `js/zap.js` bhit/bhito/poly_obj; learnwand→makeknown;
  `js/mkobj.js` replace_object floor + oc_merge_of export
- Verify: seed0398 RNG **2853→2960**/3026 (prefix 2852→2960);
  green+strict PASS; cohort **27/27** PASS
- Next: @2960 C `collect_coords` rn2(8) vs JS rnl(20)

## 2026-07-16 16:05 — #566 D-0508 trapeffect_rust_trap
- Objective: seed0398 @2839 C distfleeck rn2(5) vs JS rn2(20)
- C: `trap.c` `trapeffect_rust_trap` + selector `RUST_TRAP`
- Cause: selector omitted rust; @2838 match was JS fleeck vs C rust
  arity coincidence
- Fix: `js/trap.js` hero+monster rust trap rn2(5)/water_damage;
  wire selector; body_part HEAD/ARM
- Verify: seed0398 RNG **2840→2853**/3026 (prefix 2839→2852);
  green+strict PASS; cohort **27/27** PASS
- Next: @2852 C `weffects` rn2(8) vs JS rn2(5)

## 2026-07-16 15:54 — #565 score + D-0507 wish charges/wrp
- Objective: mandatory full `sessions` (#565÷5); seed0398 wish @2764
- C: `objnam.c` `readobjnam_parse_charges` + wrp[] class words;
  `rnd_otyp_by_namedesc` with oclass; wand `recharged`
- Fix: `js/readobjnam.js` — strip `(R:S)` / `(N)`; `wand of X` →
  WAND_CLASS + actualn; search when oclass set; set recharged
- Verify: seed0398 RNG **2773→2840**/3026 (prefix 2764→2839);
  green+strict; cohort seed0006/0007/1500/1800 PASS; suite **29/44**
  Scr 5296 RNG **303302** (38.26%) `25+0.13/turn`
- Next: seed0398 @2839 distfleeck rn2(5) vs rnd(20) after rust trap

## 2026-07-16 15:50 — D-0506 enlightenment Sleepy/Poison_res/Stealth
- Objective: seed0007 @297 Final Status/Attributes missing lines
- C: `insight.c` status_enlightenment Sleepy; attributes_enlightenment
  Poison_resistance / Stealth; youprop.h macros
- Fix: `js/invent.js` status_core_lines Sleepy + MAGIC attr poison/stealth
- Verify: seed0007 **PASS** 302/302; green+strict; cohort 26/26;
  full sessions **29/44** Scr 5296
- Next: leaderboard gap; seed0398 near-RNG survey

## 2026-07-16 15:45 — D-0505 tin_details homemade tintxts
- Objective: seed0007 @293 invent `homemade tin of lichen`
- C: `eat.c` tin_details / tin_variety(displ) / tintxts[]; set_cknown_lknown
- Fix: `js/objnam.js` tintxts + display tin_variety + full tin_details
- Verify: Scr **296→297**/302; RNG full; green+strict; cohort 26/26
- Next: @297 Final Attributes Sleep/Poison_res/Stealth (D-0506)

## 2026-07-16 15:42 — D-0504 add_erosion_words degrees
- Objective: seed0007 @161 invent `very burnt +1 leather armor`
- C: `objnam.c` `add_erosion_words` oeroded/oeroded2 + proof words
- Fix: `js/objnam.js` full `add_erosion_words` before spe (WEAPON/ARMOR)
- Verify: Scr **294→296**/302; RNG full; green+strict; cohort 26/26
- Next: @293 `homemade tin of lichen` (`tin_details` tintxts)

## 2026-07-16 15:36 — D-0503 TIN known + otyp_uses_known
- Objective: seed0007 @150 Take-out `a tin` vs `a tin of lichen`
- C locus: `objnam.c` xname_flags TIN+known; `eat.c` tin_details;
  `mkobj.c` unknow_object; FOOD unk
- Change: gate tin_details on `obj.known`; TIN/EGG in
  `otyp_uses_known` so mksobj starts known=0 (D-0503)
- Verification: Scr **291→294**/302 RNG full; green+strict;
  cohort 26/26; @161 very burnt leather next
- Next: `add_erosion_words` oeroded/oeroded2 degrees

## 2026-07-16 15:31 — #560 score + D-0502 find_ac ARM_BONUS
- Objective: mandatory full `sessions` score (#560÷5); seed0007 @124 AC
- C locus: `do_wear.c` `find_ac` / `hack.h` `ARM_BONUS`
- Change: `js/u_init.js` `find_ac` — erosion via ARM_BONUS + rings/
  amulet/HProt/uspellprot; botl on change (D-0502)
- Verification: seed0007 Scr **126→291**/302 RNG full; green+strict;
  cohort 26/26; full suite **28/44** Scr **5285**/11405 RNG 303218
  (38.24%) speed `25+0.13/turn`
- Next: seed0007 @150 Take-out `a tin` vs `a tin of lichen` (D-0503)


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

## 2026-07-16 15:14 — D-0498 doset fmt + bool defaults
- Objective: primary seed0007 screen peel (Scr 60 with full RNG).
- C locus: `options.c` `doset`/`doset_add_menu` `%-Ns [val]`;
  `optlist.h` On initvals; `optfn_boolean` showexp/time → botl.
- Change: `js/options.js` format_doset_opt_line + DOSET_BOOL_DEFAULT_ON
  + addr fixes; help 4-space indent; showexp/time set flags.botl.
  First miss was mO menu @20 (not post-combat newsym).
- Verification: Scr **60→84**/302; RNG full; green+strict PASS;
  cohort 26/26 PASS.
- Next: @38 showexp/time botl vs message order (D-0499).

