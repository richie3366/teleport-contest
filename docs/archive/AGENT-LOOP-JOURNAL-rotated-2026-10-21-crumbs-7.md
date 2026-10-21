# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
