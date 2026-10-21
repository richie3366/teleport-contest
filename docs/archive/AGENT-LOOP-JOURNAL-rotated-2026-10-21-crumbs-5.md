# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-21 — D-4196 end.c really_done, with `toptenwin` off, calls exit_nhwindows *before* topten (`:1579–1580`), so topten_print's raw_print lines (topten.c `:165–181`) go out with ttyDisplay freed (wintty.c `:863–864`, FREE_ALL_MEMORY). In the recorder they land in the nomux raw shadow (termcap.c nomux_raw_emit `:916–946`): enter raw mode (clear, home) unless `nomux_raw_active` is already set. A nomux_out overflow earlier in the game sets it to garbage (D-4164), and then the lines go to the overflow's off-screen row. JS topten painted its own panel instead (clear, rows from 0), so a wizard death after an overflow showed «Since you were in wizard mode, the score list will not be checked.» where C's final frame is blank. Recorder bug, ported as recorded

**C locus:** end.c really_done `:1579–1589`, nh_terminate `:1674`; topten.c topten_print / topten_print_bold `:165–181`, wizard arm `:725–736`, outentry standout padding `:1075–1077` / `:1099–1102`; wintty.c tty_raw_print `:4065–4082`, tty_raw_print_bold `:4084–4108`, tty_exit_nhwindows `:837–867` (ttyDisplay freed `:863–864`); recorder termcap.c nomux_enter_raw_mode / nomux_raw_putch / nomux_raw_emit `:875–946`.
**JS:** js/end.js, js/topten.js, js/display.js, js/cmd.js, js/jsmain.js (line cites above).
**Change:** - really_done (`:1409`): `!toptenwin` → `tty_exit_nhwindows(null)` + clear before topten, in C order.
**Verify:** - `node frozen/ps_test_runner.mjs` on scen-sweep-Rogue-51650031 (838/838) and scen-sweep-Wizard-95340 (1044/1044): both PASS. scen-caster-Healer-50551009 (notice on row 1) and scen-chain-Archeologist-49950050 (top-ten list) still PASS.
**Named:** tty_raw_print / tty_raw_print_bold model only the recorder's shadow and the rawprint/raw_printed counters: HUPSKIP and the real-tty bytes (print_vt_code2, term_start_raw_bold, fputs to stdout) are not modelled.
**Next:** the regenerated cliffs head (doname_base s1048, scen-chain-Priest-50557210).

## 2026-10-21 — D-4195 mkmaze.c place_lregion ends a total failure with `impossible("Couldn't place lregion type %d!", rtype)` (`:409`). C's impossible prints all three lines («…», «Program in disorder!», «Please report these messages…») before place_lregion returns. JS place_lregion is sync and returns its placement Promise for callers to chain, but on failure it called the async impossible() without returning it, so the report floated. The level-teleport caller (u_on_rndspot → goto_level) ran ahead into docrt → cls → more() while the third line was still being printed. That more() ran with the second line's state, and «Please report…» was queued after it and cleared without its --More--

**C locus:** mkmaze.c place_lregion `:356–410` (failure `:409`); pline.c impossible `:584–634`; dungeon.c u_on_rndspot `:1608–1634`; display.c cls `:2189–2202`.
**JS:** js/mklev.js place_lregion (doc `:774–779`, failure `:831–832`).
**Change:** `return impossible(...)`. Every caller already chains the return value (`await place_lregion`, `afterPending`, `isThenable`); none tests it as a placed boolean. So u_on_rndspot, fixup_special's place_it/branch, and the special-level loaders now wait for the whole report, as C's synchronous call does.
**Verify:** - `node scripts/verify.mjs --fn impossible,place_lregion --full` → syntax · rule2 · hidden: verify impossible: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (scen-worldtour-Archeologist-50056033: PASS) · reach impossible REACH-OK (24 smoke), place_lregion 433 baseline-PASS reach, 80 spread sample: 80 PASS, 0 regressed → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none (the LR_BRANCH-with-rooms arm's place_branch is sync, so there is nothing to chain).
**Next:** the regenerated cliffs head (unattributed scen-sweep-Rogue-51650031 s838 «Since you were in wizard mode…»).

## 2026-10-21 — D-4194 o_init.c savenames/restnames write and read every `objects[i]` through `Sfo_objclass`/`Sfi_objclass` (`:387–389`, `:421–423`). In the recorder's historical format that is the whole `struct objclass`, including this variant's shop price-quote memory `oc_sell_minseen/maxseen`, `oc_buy_minseen/maxseen` (objclass.h `:108–111`, written by shk.c record_price_quote). JS savenames kept only the shuffled/discovery fields, so after a save and restore every quoted price was forgotten, and the discoveries list lost its «{buy N}» suffix

**C locus:** o_init.c savenames `:374–407` (objclass loop `:387–389`), restnames `:410–437` (`:421–423`); objclass.h `:108–111`; shk.c record_price_quote / append_price_quote `:438–491`. The recorder's sfstruct.c maps `objclass` to `historical_sfo_objclass` / `historical_sfi_objclass` (whole-struct I/O).
**JS:** js/o_init.js savenames (`:365`, fields `:384–391`), restnames (`:404`, `:427–433`).
**Change:** savenames also writes the four `oc_*seen` fields. restnames reads them back, and keeps the fresh table's values when an older save has no keys. JSON holds the PRICE_MIN_INIT 0xffffffff sentinel exactly.
**Verify:** - `node scripts/verify.mjs --fn doclassdisco,savenames,restnames --full` → syntax · rule2 · hidden: verify doclassdisco: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (scen-town-Tourist-630002: PASS, 244/244 screens) · reach REACH-OK ×3 (24 smoke each) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none (the other objclass fields are static tables on both ends, as before).
**Next:** the regenerated cliffs head (impossible s963, scen-worldtour-Archeologist-50056033).

## 2026-10-21 — D-4193 wintty.c tty_display_nhwindow, NHW_MENU corner arm, calls `tty_clear_nhwindow(WIN_MESSAGE)` (`:1938–1941`). That erases the topline only when `toplin != TOPLINE_EMPTY` (`:1047–1058`). JS show_nhw_menu_text, which paints every putstr-only NHW_MENU window (container_contents, look_here, and about 20 more callers), blanked the topline unconditionally. Only look_here opted out, through a JS-only `keep_message_leftover` flag. After a death «Die? [yn] (n)» answered `y`, toplin is EMPTY but the prompt is still on row 0: C keeps it left of each «Contents of …» window, and JS wiped it

**C locus:** wintty.c tty_display_nhwindow `:1907–1946` (corner/fullscreen split `:1924–1942`), tty_clear_nhwindow NHW_MESSAGE `:1047–1058`; end.c container_contents `:1593–1670` (create/putstr/display/destroy, unchanged).
**JS:** js/pager.js (import `:43`, show_nhw_menu_text `:629`, clear `:670–675`); js/invent.js look_here call `:9671` + comment.
**Change:** fullscreen (offx 0) still blanks the message, as the C clear-screen arm does. A corner menu calls the existing exact port `clear_message_window_menu_overlay()` (display.js, already used by invent.js and tty_resize_mesg_arm), which returns early on TOPLINE_EMPTY. look_here gets the same result from C state: its display_nhwindow_message leaves toplin EMPTY. The opts flag and its doc are deleted.
**Verify:** - `node scripts/verify.mjs --fn container_contents,look_here --full` → syntax ×2 · rule2 · hidden: verify container_contents: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (scen-sweep-Archeologist-50055049: PASS) · reach REACH-OK ×2 (24 smoke each) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** tty_display_nhwindow stays partial: the TEXT/MAP/STATUS arms and the fullscreen MENU arm's own clear are untouched.
**Next:** the regenerated cliffs head (doclassdisco s228, scen-town-Tourist-630002).

## 2026-10-21 — D-4192 weapon.c enhance_weapon_skill asks the wizard-mode speedup with `y_n("Advance skills without practice?")` (`:1340`), that is `yn_function(query, ynchars, 'n', TRUE)`. cmd.c yn_menuable_resp offers the Yes/No menu only when `resp` *is* one of the shared tables (pointer compare, `:5393–5399`). JS passed the string literal `'yn'`, so with `query_menu` on, C showed the menu and JS the plain `[yn] (n)` topline prompt

**C locus:** weapon.c enhance_weapon_skill `:1340`; hack.h y_n; cmd.c yn_menuable_resp `:5393–5399`, yn_function_menu `:5416–5463`.
**JS:** js/weapon.js (import `:18`, enhance_weapon_skill `:1134–1138`).
**Change:** call the live `y_n()` (getline.js), which passes `ynchars` with addcmdq TRUE like C. The `yn_function` import is dropped (no other use in weapon.js).
**Verify:** - `node scripts/verify.mjs --fn enhance_weapon_skill` → syntax · rule2 · hidden: verify enhance_weapon_skill: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (scen-options-Knight-50557414: PASS) · reach REACH-OK (24 smoke) · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS.
**Named:** none in the changed arm. Other C files still have `'yn'` literal sites (apply, bones, dokick, eat, fountain, potion, save, sit, teleport, shk); each is fixed with its own C file.
**Next:** the regenerated cliffs head (container_contents s1607, scen-sweep-Archeologist-50055049).

## 2026-10-21 — D-4191 zap.c zap_over_floor computes `yourzap = (type >= 0 && !exploding_wand_typ)` once (`:5378`). For a burning-oil or scroll-of-fire explosion, the `POT_OIL`/`SCR_FIRE` arm then clears `exploding_wand_typ` and leaves zapverb as "blast", and yourzap stays FALSE (`:5387–5394`, C comment: "the result will be 'the blast'"). JS recomputed `yourzap` after the clear, so a scroll of fire that revealed a secret door said «Your blast reveals a secret door.» where C says «The blast …»

**C locus:** zap.c zap_over_floor `:5140–5497` (pinned only since the c-index comment-brace fix, c9787eb98) (yourzap/zapverb `:5376–5395`, SDOOR reveal `:5398–5409`, door-absorbs `:5459`); explode.c explode passes SCR_FIRE/POT_OIL as exploding_wand_typ.
**JS:** js/zap.js zap_over_floor (`:1281–1288`).
**Change:** delete the recompute. Only `exploding_wand_typ` is cleared, as in C. The door-absorbs text (`:5459`) reads the same flag and now says «the» too.
**Verify:** - `node scripts/verify.mjs --fn findit,zap_over_floor` → syntax · rule2 · hidden: verify findit: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (scen-hallu-Valkyrie-51650028: PASS) · reach findit REACH-OK (24 smoke), zap_over_floor 10 baseline-PASS, 0 regressed → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS.
**Named:** none in the changed arm.
**Next:** the regenerated cliffs head (enhance_weapon_skill s87, scen-options-Knight-50557414).
