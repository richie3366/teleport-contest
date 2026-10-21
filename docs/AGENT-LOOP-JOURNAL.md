# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-21 — D-4214 mhitu.c doseduce's refused-payment line names the seducer through noit_mhim (`:2265–2266`), which is pronoun_gender(PRONOUN_NO_IT | PRONOUN_HALLU) and draws rn2(4) while the hero hallucinates (mondata.c `:1199–1200`). JS hard-coded `mon.female ? 'her' : 'him'`, so a hallucinating hero's «… demands that you pay her, but you refuse...» skipped that draw, and every later draw in the session was off by one

**C locus:** mhitu.c doseduce `:1985–2305`, refused-payment arm `:2264–2266` (`noit_Monnam(mon), noit_mhim(mon)`); you.h `:328–329` noit_mhim; mondata.c pronoun_gender `:1188–1206`.
**JS:** js/mhitu.js doseduce refused-payment arm `:1466–1471`, import `:90`.
**Change:** the line calls the live mondata.js noit_mhim (one more name on mhitu.js's existing mondata.js import).
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-hallu-Healer-52850063.session.json` → PASS (RNG 12331/12331, Screen 1112/1112).
**Named:** none in doseduce. Same family in other C files, not touched: monmove.js `:1222–1233` and mhitm.js mhis_disp `:2228–2236` are local mhis clones (mhitm's lacks pronoun_gender's canspotmon and type_is_pname arms and reads the flat game.u.Hallucination).
**Next:** cliffs empty again; the next slot is a grow. The two mhis clones above are candidates if a hallucination cliff points at them.
## 2026-10-21 — Grow #23 @59ee75eee: fresh 52850000 ×160 159/160 (99.4 %) on arrival

**Fresh:** RNG 100.0 %, screens 100.0 %; hallu 7/8, every other family 100 %. Gap to held-out 19.9 pts: no calibration family. First cohort on recorder patch 007 (contest rc path).
**Folded:** scen-hallu-Healer-52850063 (pronoun_gender ← doseduce mhitu.js:1506, s1086). tier promoted the 29 reserve rows that pass since patch 007 (reserve 29 → 0). Board 709/710.
**Next:** the cliffs head (pronoun_gender / doseduce).
## 2026-10-21 — D-4213 detect.c detect_obj_traps, called by findone for each square of a #wizdetect / wand-of-secret-door-detection sweep, flashes the TRAPPED_CHEST glyph and then calls foundone for every trapped box it finds (`:937–947`). foundone's in-sight newsym shows what lies on the square: the box «(», not the trap. JS had dropped both calls as a named omit and kept only sense_trap, so the square was left as the sensed trap «^» where C draws «(»

**C locus:** detect.c detect_obj_traps `:906–953` (trapglyph `:923`, flash `:937–939`, sense_trap `:940–943`, foundone + num_traps `:944–947`); foundone `:1610–1622`.
**JS:** js/detect.js detect_obj_traps `:2350–2398` and its call sites.
**Change:** restarted in C order. trapglyph = trap_to_glyph(TRAPPED_CHEST) when ft is set, then `await flash_glyph_at` and foundone at C's positions. The function is now async, and all 13 call sites (findone ×4, display_trap_map ×4, trap_detect ×4, the contents recursion) await it. All are already in async functions in detect.js, and there are no other callers.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-extcmd-Archeologist-52650042.session.json` → PASS (RNG 13679/13679, Screen 1012/1012).
**Named:** none.
**Next:** cliffs empty again; the next slot is a grow.
## 2026-10-21 — Grow #22 @c085e5ef5: fresh 52650000 ×159 158/159 (99.4 %) on arrival

**Fresh:** RNG 99.7 %, screens 99.3 %; extcmd 7/8, every other family 100 % (159 authored: mixed wrote 31/32). Gap to held-out 19.9 pts: no calibration family.
**Folded:** scen-extcmd-Archeologist-52650042 (findit region row s387: C «│·(·│» vs JS «│·^·│», 9.8k RNG lost). Board 676/680 active.
**Next:** the cliffs head (findit).
## 2026-10-21 — D-4212 optlist.h stores the `safe_pet` boolean in flags.safe_dog (`:633–634`), and display.h is_safemon reads flags.safe_dog (`:159–161`). JS doset's boolean address map (DOSET_BOOL_ADDR) wrote `O`-menu toggles of safe_pet to a phantom flags.safe_pet that nothing reads. So after `O` turned safe_pet off, travelling onto the adjacent tame dog still treated it as safe: the run check in domove_core did not stop the hero, and domove_bump_mon printed «Pardon me, little dog.» where C stops silently and keeps «tame little dog» from getpos. The same map put eight_bit_tty in a phantom iflags.eight_bit_tty instead of C's iflags.wc_eight_bit_input (flag.h `:505`)

**C locus:** optlist.h `:633–634` NHOPTB(safe_pet … &flags.safe_dog), `:300–301` NHOPTB(eight_bit_tty … &iflags.wc_eight_bit_input); flag.h `:505` `#define eight_bit_tty wc_eight_bit_input`; display.h `:159–161` _is_safemon; wintty.c g_putch `:3754` (iflags.eight_bit_tty).
**JS:** js/options.js DOSET_BOOL_ADDR (eight_bit_tty, safe_pet rows); js/display.js symset_render_char `:4044`.
**Change:** DOSET_BOOL_ADDR maps safe_pet → flags.safe_dog and eight_bit_tty → iflags.wc_eight_bit_input, as in C's allopt addr. symset_render_char reads iflags.wc_eight_bit_input (C g_putch's eight_bit_tty macro). Each option now has a single home for rc, `O` and gameplay.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-options-Tourist-52451031.session.json` → PASS (RNG 2896/2896, Screen 131/131).
**Named:** none; the other 92 DOSET_BOOL_ADDR rows agree with the allopt addr column.
**Next:** the cliffs block is empty after this; the next slot is a grow (§10.19–20).
## 2026-10-21 — D-4211 options.c doset_add_menu prints every compound option's current value through its optfn get_val (`:9036–9044`). JS doset's compound list still painted three rows from literals: pile_limit «[5]», crash_urlmax «[-1]» and glyph «[(to be done)]». After `O` → pile_limit → «9» the option was stored (optfn_pile_limit is live), but the next `O` menu still showed «o - pile_limit [5]» where C shows «[9]»

**C locus:** options.c doset_add_menu `:9018–9065` (get_val `:9038`, "unknown" unless OK and non-empty `:9043`); optfn_pile_limit get_val `:3430–3432`; optfn_crash_urlmax get_val `:1335`; optfn_glyph get_val `:1841` (to_be_done).
**JS:** js/options.js doset compound table (`crash_urlmax`, `glyph`, `pile_limit` rows).
**Change:** the three rows go through doset_compopt_get_val with their live optfns (optfn_pile_limit, optfn_crash_urlmax, optfn_glyph). glyph still prints «(to be done)», now from C's get_val. crash_urlmax now follows an rc `crash_urlmax:` value.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-options-Healer-52451011.session.json` → PASS (RNG 3776/3776, Screen 146/146).
**Named:** none in the compound table. The set_gameview rows (windowtype … pettype) already route through their optfns.
**Next:** the regenerated cliffs head (peffect_acid, scen-options-Tourist-52451031).
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
