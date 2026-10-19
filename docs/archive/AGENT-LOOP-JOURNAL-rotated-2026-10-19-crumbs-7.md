# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-19 — D-4083 cmd.c extcmd_via_menu: JS unshifted only the «Extended Command: %s» prompt, with no tty_menu_promptstyle and no blank item under it, so each entry rose one row and the first page held one more (5 sessions → FULL PASS, 1 moved past)

**C locus:** cmd.c extcmd_via_menu `:856–857` `end_menu(win, prompt)` with «Extended Command: %s»; win/tty/wintty.c tty_end_menu `:2680–2690` adds the prompt (tty_menu_promptstyle) over a blank item.
**JS:** js/getline.js (+6/−2); scripts/extcmd-menu-blank-row.test.mjs (new: prefix replay to s176 asserts prompt / blank / «? - ? [list all extended commands]» — RED pre-fix, GREEN post-fix).
**Change:** unshift the prompt with `...menu_prompt_style()` and a `{ text: '', selectable: false }` blank item.
**Verify:** `node scripts/verify.mjs --fn extcmd_via_menu` → PASS syntax (js/getline.js) · rule2 · `verify extcmd_via_menu: 5 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS` (options-Rogue-50557417 → getobj s145) · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. `hidden-proxy sweep extcmd_via_menu` → 669 baseline-PASS sessions re-run, 0 regressed; board PASS→FAIL vs pre-fix: 0.
**Named:** end_menu prompt headers outside js/options.js and js/getline.js are still unaudited (D-4082 note).
**Next:** wish_history_menu ×3; process_menu_window bag ×3; options-Rogue-50557417 getobj «What do you want to invoke? [*]».

## 2026-10-19 — audit 2915–2923 @092428e95: review D-4074..D-4082 (6A/3D/0Q, 0 Must-fix) + full rescore 719/1035 (0 PASS→FAIL)

**Reviews:** 2915 mcastu Displaced/Invis youprop readers (cursetxt exact 11) · 2916 list_genocided `ynq\033a` (exact 5; JS tty_yn_function ESC cut checked) · 2917 dotogglepickup fmt arg (exact 4) · 2918 movebubbles air_pos copy (10 D-log rows PASS at HEAD; WITH-DEBT: water_pos arm still writes only glyph/typ/lit/seenv) · 2919 goto_level Flying() (down_gate exact 3; mhitu `Flying()` checks the u.Flying flat before BFlying = reader debt) · 2920 object_from_map body/statue arm (24 glibr + 3 auto_describe + 1 lookat PASS; WITH-DEBT: do_name.js:1694, pager.js:2007, uhitm.js:4604 that_is_a_mimic pass no glyph; the last is unnamed; parent board owned the 24 corpse-farlook rows by **glibr**, 4 still-blocked chain/sweep rows are the same autodescribe shape) · 2921 animate_statue makemon tail (exact 2) · 2922 choose_disco_sort (3+2; WITH-DEBT: prompt hard-coded ATR_INVERSE where D-4082 uses menu_prompt_style(); 10 such rows repo-wide) · 2923 end_menu prompts (3+2; Valkyrie-50557405 "js-throw" s94 is verify's `owner || 'js-throw'` label on an owner-null screen row, not a throw).
**Score:** public 44/44 (792838/792838 RNG, 11405/11405 screens, 87+0.36/turn); held-out 34/44 (judge 07:18Z, no newer run); board 719/1035 pre-archive (+71 vs 648 last audit; 0 PASS→FAIL) → 669/985, scored 676/866, RNG 99.47 %, screens 98.7 %; tier → 852 + 121 + 5417. Ledger snapshot; seeded sample distant_name/silly_thing/undead_to_corpse/dealloc_killer/big_little_match 5/5 hold.
**Next:** port slot pops the regenerated cliffs head; Must-fix empty. The 4 rows still blocked under `glibr` should be read as getpos/autodescribe corpse naming, not as wield.c rows.

## 2026-10-19 — D-4082 wintty.c tty_end_menu prompt: three options.c menus (handler_msg_window, query_msgtype, handler_msgtype) painted the end_menu prompt with no promptstyle and no blank item under it, so every entry sat one row high (3 sessions → FULL PASS, 2 moved past)

**C locus:** win/tty/wintty.c tty_end_menu `:2680–2690` — a non-null prompt is added at the top as the prompt item (tty_menu_promptstyle, = menu_headings, inverse on these recordings) over a blank item; options.c handler_msg_window `:5867`, query_msgtype `:7719`, handler_msgtype `:6553–6555` all end_menu with a prompt.
**JS:** js/options.js (+18/−6 over three menus); scripts/msg-window-menu-blank-row.test.mjs (new: prefix replay to s39 asserts prompt / blank / «s * single» — RED pre-fix, GREEN post-fix).
**Change:** the three headers take `...menu_prompt_style()` and are followed by the blank item (sibling shape).
**Verify:** `node scripts/verify.mjs --fn handler_msg_window` → PASS syntax (js/options.js) · rule2 · `verify handler_msg_window: 3 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS` (options-Valkyrie-50557405 → s94, options-Knight-50255908 → handler_rebind_keys_add s98) · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS. `hidden-proxy sweep handler_msg_window` and `sweep query_msgtype,handler_msgtype` → 714 baseline-PASS sessions re-run each, 0 regressed.
**Named:** prompt headers outside js/options.js were not audited for the blank item.
**Next:** extcmd_via_menu ×4; wish_history_menu ×3; process_menu_window bag ×3; options-Knight-50255908 handler_rebind_keys_add («Key binding failed?!»).

## 2026-10-19 — D-4081 o_init.c choose_disco_sort: JS menu had no blank row under «Ordering of discoveries» and no MENU_ITEMFLAGS_SELECTED preselection, so every entry sat one row high and the current sort showed «o -» instead of «o *» (3 sessions → FULL PASS, 2 moved past)

**C locus:** o_init.c choose_disco_sort `:623–631` add_menu per disco_order_let with `(disco_order_let[i] == flags.discosort) ? MENU_ITEMFLAGS_SELECTED : MENU_ITEMFLAGS_NONE`; `:644` end_menu(tmpwin, "Ordering of discoveries") — tty end_menu adds the prompt then a blank line.
**JS:** js/o_init.js (+3/−2 + doc); scripts/choose-disco-sort-menu.test.mjs (new: prefix replay to s39 asserts title / blank / «o * by order of discovery within each class» — RED pre-fix «o -» on row 1, GREEN post-fix).
**Change:** add the blank non-selectable row after the title, and mark the item whose letter equals `game.flags.discosort` with `selected: true` (set_vanq_order shape); the doc now describes both.
**Verify:** `node scripts/verify.mjs --fn choose_disco_sort` → PASS syntax (js/o_init.js) · rule2 · `verify choose_disco_sort: 3 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS` (options-Knight-50355037 → domonnoise s67, options-Wizard-50255903 → getobj s156) · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. `hidden-proxy sweep choose_disco_sort,doclassdisco,dodiscovered` → 711 baseline-PASS sessions re-run, 0 regressed.
**Named:** C's PICK_ONE `n > 1` skip-preselected arm (`:650–652`) stays unported; select_menu_pick_one returns one item.
**Next:** extcmd_via_menu ×4; handler_msg_window ×3 (same options-menu family); wish_history_menu ×3; process_menu_window bag ×3.

## 2026-10-19 — D-4080 trap.c animate_statue: JS's two makemon calls skipped the deferred makemon_appear_msg tail, so makemon.c's `if (go.occupation) dochugw(mtmp, FALSE)` never stopped a counted search before «You find %s posing as a statue.» (2 sessions → FULL PASS)

**C locus:** trap.c animate_statue `:779–788` makemon(…, MM_NOMSG …) → makemon.c `:1502–1503` `if (go.occupation) (void) dochugw(mtmp, FALSE);` (outside the MM_NOMSG guard): the new hostile is a spotted threat, so stop_occupation prints «You stop searching.» inside makemon; animate_statue's own `:851` stop_occupation then finds no occupation.
**JS:** js/trap.js (+6: two awaited tail calls + comments); scripts/animate-statue-makemon-occupation.test.mjs (new: prefix replay to s88 asserts «You stop searching.  You find a jabberwock posing as a statue.» — RED pre-fix (swapped), GREEN post-fix).
**Change:** both animate_statue makemon calls are followed by `await makemon_appear_msg(mon, mon.mx, mon.my, mmflags)`; the doppelganger one runs before newcham, as in C.
**Verify:** `node scripts/verify.mjs --fn animate_statue` → PASS syntax (js/trap.js) · rule2 · `verify animate_statue: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. `hidden-proxy sweep animate_statue` → 709 baseline-PASS sessions re-run, 0 regressed.
**Named:** none in trap.js. Other modules' sync makemon callers were not audited for a missing makemon_appear_msg.
**Next:** glibr ×3; readobjnam_postparse2 ×2 («a piece of food» vs the class name); extcmd_via_menu ×4; choose_disco_sort ×4.

## 2026-10-19 — D-4079 pager.c object_from_map: JS skipped the glyph_is_body/glyph_is_statue corpsenm arm, so a fake object made for a remembered corpse kept mksobj's random corpsenm — farlook/autodescribe named «an iguana corpse» where C said «a watchman corpse» (26 sessions → FULL PASS)

**C locus:** pager.c object_from_map `:313–349` — no matching object at the spot → `mksobj(glyphotyp, FALSE, FALSE)` fake; `:346–349` `else if (otmp->otyp == CORPSE && glyph_is_body(glyph)) otmp->corpsenm = glyph_to_body_corpsenm(glyph); else if (STATUE && glyph_is_statue) … glyph_to_statue_corpsenm`.
**JS:** js/pager.js (+2 imports, CORPSE/STATUE otyps, the arm, 3 call-site args); scripts/object-from-map-body-corpsenm.test.mjs (new: prefix replay to s689 asserts «a watchman corpse» — RED pre-fix «an iguana corpse», GREEN post-fix).
**Change:** object_from_map gains an optional `glyph` argument and ports the body/statue arm after the mimic arm. look_at_object takes `glyph` too, and both lookat callers (lookat's object arm, the look_all list) pass the map glyph.
**Verify:** `node scripts/verify.mjs --fn look_at_object` → PASS syntax (js/pager.js) · rule2 · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS (no hidden movement line: the rows are owned by auto_describe/getpos callers). Direct `hidden-proxy score --ids` over the 37 rows: 26 → FULL PASS (24 scen-shop, scen-trek-Barbarian-620019, scen-shop-Monk-50255708 …), 11 unchanged (other shapes). `hidden-proxy sweep look_at_object,object_from_map,lookat,auto_describe` → 681 baseline-PASS sessions re-run, 0 regressed; board PASS→FAIL vs pre-fix: 0.
**Named:** do_name.js:1694 (#name/#call from the map) and mhidden_description's hidden_objfrommap still pass no glyph.
**Next:** glibr ×3 (C names a corpse, JS «(For instructions type a '?')»/«unexplored area»); readobjnam_postparse2 ×2 («a piece of food» vs the class name); animate_statue ×2 («You stop searching.» prefix); extcmd_via_menu ×4; choose_disco_sort ×4.
