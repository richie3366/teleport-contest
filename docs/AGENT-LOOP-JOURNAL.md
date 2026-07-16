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

## 2026-07-16 16:40 — #572 D-0515 ^V level_tele numeric
- Objective: near-miss survey — shared getbones blockers.
- C locus: `cmd.c` wizlevelport; `wizcmds.c` `wiz_level_tele`;
  `teleport.c` `level_tele`; `dungeon.c` `get_level`; `allmain.c`
  `deferred_goto` after rhack.
- Change: bind `^V`; wizard getlin numeric → `get_level` →
  `schedule_goto`; moveloop `deferred_goto`.
- Verification: seed0116 **2978→5910** Scr **9→79**; seed5006
  **4182→8468** Scr **4→121**; green+strict; cohort **28/28**.
  seed0373 still @2549 (`print_dungeon` `?`). Suite survey **30/44**.
- Next: seed0116 `zap_dig` / seed5006 `dosounds` / seed0373 menu.

## 2026-07-16 16:35 — #571 D-0513/D-0514 seed0398 PASS
- Objective: seed0398 @48 shudder + remaining end screens.
- C locus: `zap.c` `zapwrapup`; `end.c` `done2` Dump core / stopprint;
  `topten.c` wizard early-exit; `really_done` trailing raw blanks.
- Change: `You_feel` shudder; wizard `Dump core?` ynq; skip rip on
  stopprint; wizard topten msg; `raw_print_blanks(2)`; GameDisplay
  `getCursor`.
- Verification: seed0398 **87/87 PASS**; green+strict; cohort **28/28**.
- Next: near-miss survey / LB gap; suite refresh @#575.

## 2026-07-16 16:30 — #570 score + D-0512 !verbose drop topline
- Mandatory full `sessions` (#570÷5): **29/44**, Scr **5520**/11405,
  RNG **303491**/792838 (38.28%), `27+0.12/turn`. Δ vs #565 Scr +224.
- Objective: seed0398 @28 blank vs C drop getobj leftover.
- C: `getobj`→`yn_function` leaves toplines; `!verbose` silent `drop`;
  `parse` `clear_nhwindow(WIN_MESSAGE)`; cursor on hero for leftovers.
- Fix: `getobj_drop` via `yn_function` + `mark_topline_prompt`;
  `clear_nhwindow_message` clears pending; drop getobj cursor steal
  from `flush_screen`.
- Verify: seed0398 Scr **77→83**/87; green+strict; cohort **27/27**;
  full suite still **29/44**.
- Next: @48 `You feel shuddering vibrations.`

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


