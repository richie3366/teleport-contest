# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-21 — D-4210 zap.c zapyourself tells every monster that sees the hero about a resistance it just showed. Each resistance arm (force bolt/striking, lightning, fire, cold, magic missile, sleep) calls shieldeff + monstseesu(M_SEEN_x) on a resisted self-zap and monstunseesu(M_SEEN_x) on a felt one (`:2716–2863`). JS had deferred all eighteen calls. So a Valkyrie who zapped a cursed wand of cold at herself («You feel a little chill.») left the watching silver dragon unaware, and 27 steps later the fleeing dragon still counted its frost breath as a ranged attack and breathed instead of retreating

**C locus:** zap.c zapyourself `:2705–3013`: striking `:2716/:2718/:2726`, lightning `:2737/:2739/:2741`, fire `:2757/:2759/:2764`, cold `:2778/:2780/:2785`, magic missile `:2794/:2796/:2800`, sleep `:2855/:2857/:2863`; mondata.c monstseesu `:1558–1568`.
**JS:** js/zap.js zapyourself sleep `:4785–4800`, striking `:4843–4860`, fire/cold/lightning/magic-missile arms `:4965–5050`.
**Change:** each arm calls the live display.js shieldeff(u.ux, u.uy) and mondata.js monstseesu / monstunseesu (both already imported) at C's positions: shieldeff before the message, monstseesu after it and before ugolemeffects, and monstunseesu after the damage/exercise lines.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-sweep-Valkyrie-52450012.session.json` → PASS (RNG 44441/44441, Screen 1503/1503).
**Named:** none in the six arms.
**Next:** the regenerated cliffs head (use_stethoscope pile_limit region row, then peffect_acid).
## 2026-10-21 — Grow #21 @d3187d477: fresh 52450000 ×160 157/160 (98.1 %) on arrival

**Fresh:** RNG 99.1 %, screens 98.9 %; options 0/2, sweep 8/9, every other family 100 %. Gap to held-out 18.6 pts (79.5 % = 35/44): no calibration family.
**Folded:** scen-sweep-Valkyrie-52450012 (distfleeck ← breamm mthrowu.js:500, s506, 36k RNG lost), scen-options-Healer-52451011 (use_stethoscope region row: `O` pile_limit [9] vs [5], s88), scen-options-Tourist-52451031 (peffect_acid owner, «tame little dog» vs «Pardon me, little dog.», s45). 157 archived, 0 reserved. Board 673/679 active.
**Next:** the regenerated cliffs head (distfleeck/breamm).
## 2026-10-21 — D-4209 insight.c enlightenment shows the in-game `^X` attributes through select_menu(PICK_NONE) (`:451–460`), so tty process_menu_window's key switch applies (`:1604–1649`). Return/LF finishes the menu, space pages and finishes on the last page, and `>` `<` `^` `|` turn pages without finishing. JS doattributes kept an inline page loop that accepted only space/CR/LF/ESC, and Return advanced a page like space. So `^X` then `>` stayed on «(1 of 3)» where C shows «(2 of 3)», and `^X` then Return showed page 2 where C returns to the map

**C locus:** insight.c enlightenment `:451–460` (en_via_menu → end_menu + select_menu(PICK_NONE)); wintty.c process_menu_window `:1548–1551` (same page: cursor back + xwaitforspace, no repaint), `:1604–1614` ESC, `:1616–1620` `\0`/`\n`/`\r` finish, `:1622–1631` ' '/MENU_NEXT_PAGE (' ' finishes on the last page, '>' does not), `:1632–1649` previous/first/last page; getline.c xwaitforspace `:230–257`.
**JS:** js/invent.js doattributes `:8940–9010` (fullscreen page loop).
**Change:** the fullscreen branch is restarted as C's page loop: the current page is repainted only when it changes; keys go through map_menu_cmd; ESC/CR/LF finish; space/`>` advance (space finishes on the last page); `<`/`^`/`|` go to the previous/first/last page; other keys leave the screen as is. The single-page corner branch already matched C (dmore → xwaitforspace) and keeps waitMenuKey. The comment that claimed only space/CR/LF advance now cites the C path.
**Verify:** - Probes at step 360, C vs JS last screen: `\u0018>` SAME «(2 of 3)», `\u0018>>` SAME «(3 of 3)», `\u0018>><` SAME «(2 of 3)», `\u0018>|^` SAME «(1 of 3)», `\u0018 ` SAME, `\u0018\r` 0 cells differ under the scorer's decodeScreen+diffCell (the raw strings differ only in SO/SI shifts).
**Named:** PICK_NONE counts, select/unselect-page commands and MENU_SEARCH change nothing on screen and are not modelled beyond "stay". The final-disclosure enlightenment (`final != 0`) uses display_nhwindow (not a menu) and is unchanged.
**Next:** cliffs and Must-fix are empty; the next slot is a grow (§10.19–20).
## 2026-10-21 — D-4208 hack.c moverock_core's m<dir>/travel arm (context.nopick) spends a turn on «There is a boulder in your way.» only when feeling the boulder changed `glyph_at(sx, sy)`, the gbuf glyph int (`:386–411`). JS compared a fingerprint string (glyph_at_fp) that also carried the remembered glyph's colour, which feel_location rewrites (8 → 7) while C's gbuf glyph stays the same. A blind hero travelling into a boulder therefore spent a turn on the first bump where C spends none, so the monster pass ran one hero move early. The set_apparxy draw it blocked was only the symptom

**C locus:** hack.c moverock_core `:386–411` (`oldglyph = glyph_at(sx, sy)` before feel_location; `if (glyph_at(sx, sy) != oldglyph) door_opened = move = TRUE`); display.c glyph_at = gg.gbuf glyph. domove_core `:2843–2847` keeps the move only with door_opened.
**JS:** js/hack.js moverock_core nopick arm `:930–953`; glyph_at_fp removed.
**Change:** both sites read `glyph_at(sx, sy)`, the gbuf glyph int, as C does. glyph_at_fp had no other caller and is deleted.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-shop-Barbarian-49959679.session.json` → PASS (RNG 69014/69014, Screen 961/961).
**Named:** none in the nopick arm. The rest of moverock_core is unchanged (ledger ported, D-4105).
**Next:** the cliffs block is empty after this, so the next slot is a grow (§10.19–20).
## 2026-10-21 — D-4207 mondata.c can_blnd refuses a raven's blinding when both attacker and defender are ravens (`:323–328`, «corvus oculum corvi non eruit»). JS built the comparand with `mons(PM_RAVEN)`, which returns a fresh record on every call, so `magr.data === raven` was never true. A hero polymorphed into a raven therefore took the raven's AD_BLND claw: +3 Blinded turns that C never adds, which surfaced 130 steps later as «You were temporarily blind (106).» in the final disclosure where C prints 103

**C locus:** mondata.c can_blnd `:305–398`, raven gate `:327–328` (`magr->data == &mons[PM_RAVEN] && mdef->data == &mons[PM_RAVEN]`).
**JS:** js/uhitm.js can_blnd `:369–375`, PM_RAVEN `:169`, mondata.js import `:117`.
**Change:** compare the mons[] index: `monsndx(magr.data) === PM_RAVEN && monsndx(mdef.data) === PM_RAVEN` (module PM_RAVEN constant beside the file's other PM_ constants; monsndx imported from mondata.js, an existing edge). The rest of the body was already whole in C order.
**Verify:** - `node scripts/verify.mjs --fn one_characteristic,can_blnd` → syntax · rule2 · `verify one_characteristic: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (scen-worldtour-Wizard-610136: PASS) · reach REACH-OK ×2 (24 smoke) · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS.
**Named:** none in can_blnd. Seen while probing, not chased: in the JS replay `>` did not page the `^X` attributes window at step 360 (C went to page 2 of 3).
**Next:** the regenerated cliffs head (set_apparxy, 1 row left), so the next slot is a grow per §10.19–20. Possible lead: the `^X` `>` paging gap above.
## 2026-10-21 — audit 3038–3046 @1b2b2c8e3: review D-4198..D-4206 (8A/1D/0Q, 0 Must-fix) + full rescore 671/705 (0 PASS→FAIL)

**Reviews:** the owner re-measures (`verify … --base HASH~1 --no-reach`) reproduce every cliff D-log: doname_base, save_dungeon, status_hilite_menu_add, tipcontainer_gettarget, xkilled, nh_timeout, trapeffect_sqky_board, do_screen_description PASS. D-4206's row was unattributed (verify vacuous); the frozen runner on HEAD passes scen-symset-Priest-50059010. One debt (D-4205): TOPL_RAW_BYTE prefix chars are skipped only by the topline painter, so msg_window full/reversed ^P history would draw them (ledger note on do_screen_description, unreached).
**Rescore:** `record`: all sessions present. Unfiltered `score` gave 680/685 (680/682 excl. 3 env-only; RNG 99.99 %, screens 100.0 %), 0 PASS→FAIL vs the committed board. `archive` moved 9 PASS out → 671/705, unrecorded 0, reserve 29 → 29. Left: set_apparxy (shop s936), one_characteristic (worldtour s503) plus env-only rows.
**Score:** public 44/44 (792838 RNG, 11405 screens, 90+0.50/turn); held-out 35/44, 11,079 pts (judge 13:09Z, +230). Ledger snapshot taken. Seeded sample dotrap/should_mulch_missile/newuhs/yn_function/peace_minded: 5/5 hold (peace_minded PARTIAL is a line-ratio artefact; body whole vs makemon.c:2267–2308).
**Next:** Must-fix is empty → the cliffs head (2 attributed rows left; a short block means a grow slot, §10.19).
## 2026-10-21 — D-4206 themerms.lua make_dig_engraving (the Buried treasure postprocess) computes «Dig N east/west M south/north» as `data.x - pos.x - 1, data.y - pos.y`. data is the chest's absolute ox/oy, but pos comes from `selection:rndcoord(0)`, which nhlsel.c l_selection_rndcoord returns in the Lua frame (`:413–421`): croom-relative under a coder subroom, else minus xstart/ystart, here 1/0 from themerooms_post_level_generate's reset_xystart_size. The Lua `- 1` cancels that xstart. JS took the absolute pos and still subtracted 1, so every east/west distance was one short: «Dig 46 east» where C engraves «Dig 47 east»

**C locus:** 
**JS:** js/mklev.js make_dig_engraving_postprocess.
**Change:** convert pos into the Lua frame as l_selection_rndcoord does: update_croom(), then subtract the coder subroom's lx/ly if set, else game.splev_xstart/ystart. Then apply the Lua formula unchanged. The engraving is still placed at the absolute pos, since des.engraving's get_location_coord adds the same offset back.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-symset-Priest-50059010.session.json` → PASS (RNG 23011/23011, Screen 993/993). `node scripts/hidden-proxy.mjs score --ids scen-symset-Priest-50059010` → board PASS.
**Named:** the other Lua `rndcoord` consumers in js/mklev.js convert their frame per site (e.g. the siege `siege_coord`); no shared l_selection_rndcoord helper exists yet.
**Next:** the regenerated cliffs head (2 rows left; the next slot is a grow per §10.19–20).
## 2026-10-21 — D-4205 pager.c do_screen_description prefixes a farlook line with encglyph(glyph) (`:1271`). Under a UTF-8 symset, tty_putmixed turns that escape into the glyph's UTF-8 bytes (mixed_to_utf8, wintty.c `:4183–4187`), and topl_putsym writes them one byte, one column each. The capture hook (patch 006) receives topl_putsym's plain `char`, so on the x86_64 recorder those bytes are negative and dropped by `ch < 32`. Under Enhanced1 a floor farlook therefore leaves the two cells of the previous topline («fl») and shifts the text one column right. JS painted a single `·` and kept the text one column left

**C locus:** pager.c do_screen_description `:1266–1273` (looked → `Sprintf(prefix, "%s        ", encglyph(glyphinfo.glyph))`). windows.c encglyph `:1427–1434`. wintty.c tty_putmixed `:4170–4195` (WC2_U_UTF8STR && SYMHANDLING(H_UTF8) → mixed_to_utf8, topl_utf8 set so redotoplin's `/` g_putch kludge is skipped). utf8map.c mixed_to_utf8 `:83–145` (\G → `gm.u->utf8str` bytes). topl.c topl_putsym `:304–344` (curx++ per byte). Patch 006 topl_putsym hook `nomux_putch(c)` (`char c`) → nomux_putch `if (... ch < 32) return;`.
**JS:** js/display.js topl_raw_utf8 + TOPL_RAW_BYTE, topline_putsyms_cl_end, hacklib import. js/pager.js encglyph_message_prefix, do_screen_description prefix, display.js import.
**Change:** display.js `topl_raw_utf8(str)` encodes a decoded utf8str with the live unicodeval_to_utf8str into one TOPL_RAW_BYTE char (U+F700+byte) per C byte ≥ 0x80, so the message keeps C's byte count. topline_putsyms_cl_end skips those chars exactly as it skips C0: the cell keeps its previous content and the column advances. pager.js `encglyph_message_prefix` uses it for a cell that show_glyph_cell drew through g_pututf8 (`disp_capture_drop`, the same H_UTF8 + WC2_U_UTF8STR + utf8str condition mixed_to_utf8 tests). Any other cell keeps rendered_glyph_char.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-symset-Priest-50058519.session.json` → PASS (RNG 59841/59841, Screen 838/838).
**Named:** pager.c's other encglyph sites go to text/menu windows, not the topline: look_engrs / gather_symbols `:2059`, `:2102`, `:2126`, `:2190`, `:2215` keep rendered_glyph_char. Under a UTF-8 symset C drops those bytes in the menu hooks too (`nomux_putch(*cp)`), and the JS menu painters do not model that yet.
**Next:** the regenerated cliffs head (3 rows left after this one, so the next slot is a grow per §10.19–20).
## 2026-10-21 — D-4204 trap.c trapeffect_sqky_board's monster arm picks its witness message on the hero's Deaf macro (`:1445–1457`): a squeak when the hero can hear, otherwise «%s stops momentarily and appears to cringe.» for a non-mindless monster. JS tested the sticky `game.u.Deaf`, which nothing writes, so a hero deafened by the HDeaf timeout still "heard" «A board beneath the gnome squeaks a B flat loudly.» The same file's three sticky `u.Blind` reads go through trap.js's Blind() as well

**C locus:** trap.c trapeffect_sqky_board `:1403–1476` (`if (!Deaf)` `:1448`, cringe `:1453–1455`). youprop.h Deaf `:123–125`. Blind at trap.c arrow-trap / rocktrap observe_object and fall_through `Blind && Levitation && !Sokoban`.
**JS:** js/trap.js trapeffect_sqky_board, trapeffect_arrow_trap, trapeffect_rocktrap, fall_through.
**Change:** the sqky_board branch reads `Deaf()`; the three Blind sites read `Blind()` (both file-local youprop readers, already used by trap.js's other Blind/Deaf sites). fall_through's local is inlined into its single use.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-sweep-Tourist-51650001.session.json` → PASS (RNG 37949/37949, Screen 1331/1331).
**Named:** none in trap.c. trap.js's local Blind() (like invent.js's exported one) still lacks C's Blindfolded / !haseyes / Eyes-of-the-Overworld terms (youprop.h Blind). That is the repo-wide Blind clone family (26 clones), not this row.
**Next:** the regenerated cliffs head.
## 2026-10-21 — D-4203 trap.c reads hero flight and levitation through the youprop.h macros. Flying is `(HFlying || EFlying || steed flyer) && !BFlying`, all stored in u.uprops[FLYING] (`:248–255`). JS trap.js kept flat-only clones: Flying_fu, Levitation_fd, fall_through's locals, and the bear-trap/landmine `u.Levitation || u.Flying` sticky reads. A hero whose flight lives only in the uprops slot therefore landed with «You float gently to the floor.» when levitation timed out after a declined death, where C says «You have stopped levitating and are now flying.»

**C locus:** trap.c float_down `:4024–4179` (Levitation gate `:4034`, `if (BFlying) { float_vs_flight(); if (Flying) … }` `:4049–4055`, `if (!Flying)` ustuck arm `:4086`). fall_through `:602–696`, trapeffect_bear_trap and trapeffect_landmine `(Levitation || Flying) && !forcetrap`. youprop.h `:237–255`.
**JS:** js/trap.js float_down (Levitation gate, BFlying/Flying arm, `!Flying` ustuck arm), fall_through locals, trapeffect_bear_trap and trapeffect_landmine guards, import `:112`.
**Change:** delete the Flying_fu and Levitation_fd clones and use the imported live hack.js `hero_Flying` / `hero_Levitation` (Flying_st / Levitation_st: flat or slot H/E, either blocked source, steed flyer). float_down's BFlying test reads `u.BFlying || u.uprops[FLYING].blocked`; float_vs_flight writes the flat. fall_through's `Levitation`/`flying` and both `(Levitation || Flying) && !forcetrap` guards use the same readers. FLYING is imported from const.js.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-sweep-Caveman-50055035.session.json` → PASS (RNG 45792/45792, Screen 1218/1218).
**Named:** none in trap.c (no flat-only Flying/Levitation read is left in js/trap.js). mhitu.js's exported `Levitation()` is still flat-only (mhitu.c's own copy; another C file).
**Next:** the regenerated cliffs head.
## 2026-10-21 — D-4202 do.c flooreffects saves gb.bhitpos, writes the drop square into it, and restores it before returning (`:182–183`, `:357`). That is a struct copy into one global, done so that a zap reaching it via rloco keeps its bolt position. JS replaced the `game.bhitpos` object on both the set and the restore. zap.js bhit advances an alias of that object, so after a bolt kill whose corpse drop went through mdrop_obj → flooreffects, the bolt moved on in a detached object while bhitm read the frozen copy. The next monster's miss mapped `I` on the dead student's square instead of the devil's

**C locus:** do.c flooreffects `:162–359` (`save_bhitpos = gb.bhitpos; gb.bhitpos.x = x, gb.bhitpos.y = y;` … `gb.bhitpos = save_bhitpos;`, with the `:180–181` comment about wand zapping via rloco). zap.c bhit / bhitm `:563–566` read gb.bhitpos.
**JS:** js/do.js flooreffects `:780–787` (set), `:973–975` (restore).
**Change:** write the fields: x/y on set and on restore, creating the object only when it is missing (C's zeroed static).
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-questtour-Archeologist-50361020.session.json` → PASS (RNG 30800/30800, Screen 952/952).
**Named:** none in do.c. The same object-swap idiom remains in other C files, unreached by any failing row: zap.c dobuzz save/restore (zap.js `:2443`/`:2783`) and apply.c use_pole/use_grapple (apply.js `:3818`/`:3987`).
**Next:** the regenerated cliffs head.
