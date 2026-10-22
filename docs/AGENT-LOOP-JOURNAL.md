# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-22 — D-4237 tty show_topl (topl.c `:145–166`) paints an ATR_NOHISTORY message through addtopl → putsyms → topl_putsym, and topl_putsym breaks the line by itself: a character that would land at `curx == CO - 1` first emits `topl_putsym('\n')` (`:305–343`). An 84-character autodescribe line therefore shows 79 columns on row 0 and « ball» from row 1 column 0. js/display.js show_topl ran the same loop to set cw.curx / cury but handed the unbroken string to the painter, which breaks only on '\n' and clips at the right margin, so everything past column 79 was lost

**C locus:** win/tty/topl.c show_topl `:145–166`, addtopl, putsyms, topl_putsym `:305–343`; pline.c putmesg `:75–77` (SUPPRESS_HISTORY → ATR_NOHISTORY with WC2_SUPPRESS_HIST); getpos.c auto_describe `:640–662`.
**JS:** js/display.js show_topl `:10530–10575`.
**Change:** show_topl builds the painted text in the same loop that counts the cursor, inserting '\n' wherever topl_putsym would, and paints that. cw.curx / cury, the TOPLINE state and `_toplines` (untouched, as in C) are unchanged.
**Verify:** - `node scripts/verify.mjs --fn chest_trap --full` → verify chest_trap: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS · reach chest_trap 2/2, 0 regressed → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** redotoplin (display.js `:3195`) paints its text as-is too and only guesses cury from `length >= CO`; update_topl has already split the line at spaces, so it differs from C only for a single token wider than CO-1, which no session reaches.
**Next:** the cliffs block is empty (845/845): the next slot grows (§10.19).
## 2026-10-22 — D-4236 restore.c restgamestate rebuilds the worn pointers with one walk, `for (otmp = invent; …) if (otmp->owornmask) setworn(otmp, otmp->owornmask);`, then `otmp = uwep; uwep = 0; setuwep(otmp);` (`:687–699`). It never places a slot twice, so the restored `u.twoweap` survives. js/save.js restWornFromInvent ran the same walk (JS setworn's worn[] table holds uwep / uswapwep / uquiver too), then called setuswapwep(swap) and setuqwep(quiver) again on a stale «setworn does not place W_WEP/SWAP/QUIVER» premise. The second setworn found uswapwep already in its slot and ran setworn's `if (u.twoweap && (oobj->owornmask & (W_WEP | W_SWAPWEP))) set_twoweap(FALSE)` arm (worn.c), so every save/restore silently ended two-weapon combat

**C locus:** restore.c restgamestate `:525–736` (worn walk + setuwep `:687–699`); worn.c setworn `:72–145` (twoweap arm `:89–90`).
**JS:** js/save.js restWornFromInvent `:443–465`.
**Change:** restWornFromInvent is C's sequence: the setworn walk, then `otmp = u.uwep; u.uwep = null; setuwep(otmp)`, then the pick-axe / grapple unweapon override. The unused setuswapwep / setuqwep / W_WEP / W_SWAPWEP / W_QUIVER imports are dropped (no other use in save.js).
**Verify:** - `node scripts/verify.mjs --fn passive --full` → syntax · rule2 · verify passive: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS · reach passive: 553 baseline-PASS (80 run), 0 regressed → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none in the worn walk. restgamestate stays `by-design` (JSON payload in place of the Sfi_* reads).
**Next:** last cliffs row chest_trap (trap.c, scen-impaired-Wizard-53851010 step 113); after it the block is empty and the next slot grows.
## 2026-10-22 — D-4235 sit.c calls losehp six times, and C's losehp runs `urgent_pline("You die..."); done(DIED);` inline (hack.c `:4287–4288`). done() returns when the hero survives (lifesaving, or a declined wizard «Die?»), and the sit code goes on. JS losehp defers that done behind `_losehp_needs_done` and a JS-only gameover marker, so every caller must drain it with finish_losehp_done. throne_sit_effect's cases 1 and 3 and special_throne_effect's acid arm called raw losehp and never drained it: the electric chair's fatal shock ended the game silently, with no «A massive electric shock…--More--», no «You die...», no «Die?». sit.js's own drain helper, sit_losehp, also reported a survived death as fatal, so dosit's spike and lava arms returned before C's exercise(A_STR) / the rest of the arm

**C locus:** sit.c throne_sit_effect `:38–234` (losehp `:71`, `:79`); special_throne_effect `:237–` (losehp `:339`); dosit `:400–565` (losehp `:476`, `:491`, `:548`); hack.c losehp `:4287–4288`.
**JS:** js/sit.js sit_losehp `:611–624`; special_throne_effect case 12 `:763–774`; throne_sit_effect case 1 `:817–820`, case 3 `:821–836`.
**Change:** sit_losehp drains the deferred done and returns `!!gameover`, the do.js / steed.js idiom (D-4230). All six C losehp sites now go through it; throne cases 1 and 3 and the acid arm return on a real death (C done does not return) and otherwise go on in C order: case 3 to exercise(A_CON), all three to the vanish roll.
**Verify:** - `node scripts/verify.mjs --fn throne_sit_effect,dosit,special_throne_effect --full` → verify throne_sit_effect: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS · reach throne_sit_effect 19/19, dosit 2/2, special_throne_effect smoke 24/24, 0 regressed → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none in the sit.c losehp sites. special_throne_effect has no ledger row (its C body opens `{` on the signature line, `:238`), so it is not in the Ledger bullet.
**Next:** cliffs head passive (uhitm.c, scen-ranged-Rogue-53851028 step 310), then chest_trap.
## 2026-10-22 — D-4234 wizcmds.c wiz_intrinsic's default arm raises a timed property with `incr_itimeout(&u.uprops[p].intrinsic, amt)` (`:1072–1074`), and C has one storage per property (youprop.h:374 `#define HFast u.uprops[FAST].intrinsic`). JS keeps a flat H* mirror beside each slot, and wizcmds.js mirrored through its own PROP_FLAT table, a 14-entry clone of timeout.js TIMEOUT_FLAT that lacked FAST. «#wizintrinsic r» therefore raised only `uprops[FAST].intrinsic`, the flat `u.HFast` kept its old timeout, and nh_timeout's FAST arm, which reads `HFast | slot`, decremented the OR of the two: 22 | 52 = 54 → 53, so the timeout grew on the next turn

**C locus:** wizcmds.c wiz_intrinsic `:948–1096`, def_feedback `:1072–1079`; timeout.c nh_timeout case FAST `:725`; youprop.h `:374`.
**JS:** js/timeout.js `:99` (export); js/wizcmds.js prop_old_timeout `:112`, incr_prop_timeout `:120`.
**Change:** the clone is deleted; timeout.js exports TIMEOUT_FLAT and wizcmds.js prop_old_timeout / incr_prop_timeout read and write through it, so every timed property raised by the default arm keeps the slot and the flat equal, as every other writer (set_HFast, adjabil) does.
**Verify:** - `node scripts/verify.mjs --fn wiz_intrinsic` → syntax ×2 · rule2 · verify wiz_intrinsic: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS · reach wiz_intrinsic: 13 baseline-PASS run, 13 PASS, 0 regressed → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS.
**Named:** none in wiz_intrinsic. The dual storage itself stays: mhitu.js u_slow_down `:513` writes `u.HFast = 0` to the flat only (mhitu.c `HFast = 0L` clears the one field), and the FAST readers OR the two copies (timeout.js `:1262`, attrib.js `:1213`, do_wear.js `:1710`, potion.js `:620`, zap.js `:5101`).
**Next:** cliffs head throne_sit_effect (sit.c, scen-symset-Ranger-53850077 step 670), then passive, chest_trap.
## 2026-10-22 — Grow #28 @edb51ab20: fresh 53850000 ×160 156/160 (97.5 %) on arrival

**Fresh:** RNG 99.5 %, screens 99.7 %; worst ranged 1/2 (RNG 92.1 %), impaired 1/2, symset 6/7 (RNG 81.1 %), extcmd 6/7; every other family 100 %. 4 folded (extcmd wiz_intrinsic s777, impaired chest_trap s113, ranged passive s310, symset throne_sit_effect s670), 156 archived, 0 reserved. The cliffs block was empty, so step 4 authored 160 more in those families (×40 @53855000–53858000): 158/160 PASS, the 2 failures both extcmd wiz_intrinsic (now a 3-session owner, `[41]` vs `[43]` timeout on the #wizintrinsic menu). Board 839/845. Gap to held-out 18.0 pts, inside the band; no calibration (Grow #27 did one).
**Next:** the cliffs block holds 4 owners: wiz_intrinsic (3) heads it, then throne_sit_effect, passive, chest_trap.
## 2026-10-22 — D-4233 wintty.c process_menu_window keeps C's count state in every menu, PICK_NONE included: xwaitforspace accepts digits and ESC on every page (`:1533`), digits build a count (`:1563–1603`), and ESC while counting only stops the count and leaves the menu up (`:1604–1614`). The state resets at the top of each key pass (`:1395–1399`). js/invent.js select_menu_pick_none and doattributes' fullscreen loop and corner wait closed the menu on the ESC after a digit, so «^X 5 ESC» dismissed the attributes screen where C keeps it

**C locus:** wintty.c process_menu_window `:1329–1768` (state `:1343–1345`, loop-top reset `:1395–1399`, resp `:1533`, digit arm `:1563–1603`, ESC arm `:1604–1614`); getline.c xwaitforspace `:230–257`.
**JS:** js/invent.js select_menu_pick_none `:3404–3529`; doattributes menu_count_key `:8988–9015`, corner waitMenuKey `:9016–9024`, fullscreen key arm `:9035`.
**Change:** select_menu_pick_none carries counting / count / reset_count like the PICK_ONE/ANY loop at invent.js `:4271` (append_long_digit, digits consume the key, ESC while counting continues). doattributes gets one menu_count_key closure for both its paths: C's loop-top reset, then the digit and ESC-while-counting arms.
**Verify:** - Probe 1 and probe 2 above (`node scripts/record-session.mjs` on the edited recipe, then `node frozen/ps_test_runner.mjs`): both FAIL on HEAD's invent.js and PASS after.
**Named:** process_menu_window's objsym slot is live only for menus whose entries carry `identifier`/`glyphinfo`, which is only display_pickinv so far.
**Next:** Must-fix is empty and so is the cliffs block (774/774). The next port slot takes the coverage head (do_name.c docallcmd), or a grow runs (§10.19).
## 2026-10-22 — D-4232 ten names that js/ reads but never defines or imports, each a ReferenceError the first time its arm runs: P_BOW in potion.js is_ammo_dip (potion.c potion_dip's oil weapon-dip arm, obj.h is_ammo), ESCAPED / ASCENDED in pray.js offer_real_amulet (pray.c `:1526–1589`, done() when the Amulet is offered), plus seven found by a no-undef scan of all 158 modules: TT_NONE in hack.js trapmove's switch, In_V_tower in muse.js find_defensive's dig arm, def_char_to_objclass in o_init.js doclassdisco, bigmonst in pickup.js in_container's statue check, deltrap / delobj in teleport.js migrate_to_level's pinned-boulder arm, and show_text_pages in wizcmds.js wiz_mon_diff / wiz_show_vision

**C locus:** potion.c potion_dip (oil arm), obj.h is_ammo; pray.c offer_real_amulet `:1526–1589`; hack.c trapmove; muse.c find_defensive (dig, `In_V_tower`); o_init.c doclassdisco (`def_char_to_objclass`); pickup.c in_container (`bigmonst`); mon.c mon_leaving_level `:2724` fill_pit (inlined in JS migrate_to_level); wizcmds.c wiz_mon_diff / wiz_show_vision (display_nhwindow).
**JS:** js/potion.js `:152`; js/pray.js `:149`; js/hack.js `:42`; js/muse.js `:91`; js/o_init.js `:58`; js/pickup.js `:118`; js/teleport.js `:36`, `:77`; js/wizcmds.js `:102`.
**Change:** each name is added to the file's existing import from its home module (const.js, objects.js, monsters.js, trap.js, mkobj.js). wizcmds.js gains `import { show_text_pages } from './pager.js'`. No function body changed.
**Verify:** - `node scripts/verify.mjs --fn dodip,offer_real_amulet,trapmove,find_defensive,doclassdisco,in_container,migrate_to_level,wiz_mon_diff,wiz_show_vision --full` → no corpus session blocked on any of them · reach trapmove 2/2, find_defensive 80/80 (of 108), smoke 24/24 for the rest, 0 regressed → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none for the imports. migrate_to_level's boulder arm stays an inline extract + deltrap + delobj where C runs fill_pit → flooreffects("settle") with its messages. Its comment says the function is sync, which is stale (it is async now), but mklev.js `:2516` calls it without await, so moving to the async fill_pit is its own change.
**Next:** Must-fix row 3 (process_menu_window counting + ESC, review 3049).
## 2026-10-22 — D-4231 monmove.c m_move sends a long worm with segments straight to `not_special` (`if (mtmp->wormno) goto not_special;`, `:1769–1770`), after set_apparxy and the can_* setup and before the mtame arm. A segmented worm, tame or not, skips dog_move, the covetous arm, shk/gd/pri, the mail daemon and the tengu teleport, and moves with the normal AI. js/monmove.js had no counterpart, so a tame long worm (dog.c tamedog keeps `wormno`) moved through dog_move, with different RNG and a different target

**C locus:** monmove.c m_move `:1714–2075`, gate `:1769–1770`, special arms `:1771–1848`, not_special `:1849–1854`.
**JS:** js/monmove.js m_move `:2183–2267` (gate `:2186`).
**Change:** the special arms sit inside `if (!mtmp.wormno) { … }`, C's goto as a block. The not_special uswallow return and the origin re-read stay after it, as in C.
**Verify:** - `node scripts/verify.mjs --fn m_move` → `verify m_move: no corpus session blocked on it at baseline` · reach m_move: 644 baseline-PASS reach it (80 run): 80 PASS, 0 regressed → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none in m_move.
**Next:** Must-fix row 2 (P_BOW in potion.js, ESCAPED / ASCENDED in pray.js), then row 3 (process_menu_window counting).
## 2026-10-22 — Audit 3047–3070 @be3c60cd0: 24 reviews (16 A / 6 D / 2 Q), 3 Must-fix; corpus 774/774

**Score:** public 44/44 (RNG 792,838/792,838, screens 11,405/11,405, `92+0.50/turn`); full rescore 774/774, 0 PASS→FAIL, archive 93 → 669 active fortress; held-out 35/44, 11,079 (judge 07:15Z, before this window). Ledger sample 5/5 seeded `ported` rows match C; detect_obj_traps note fixed.
**Must-fix:** m_move wormno gate (3065, D-4225 overclaimed `ported`); P_BOW / ESCAPED / ASCENDED unimported (3061 family, latent ReferenceErrors); process_menu_window count+ESC (3049 raised to QUALITY-RISK: off-queue lead, no movement). D-4229's stated mechanism corrected (guard is M2_PEACEFUL; Hallucination arm).
**Next:** the first Must-fix row.
## 2026-10-22 — D-4230 steed.c dismount_steed's thrown/knocked/fell arm calls `losehp(rn1(10, 10), "riding accident")` and then, unconditionally, `set_wounded_legs(BOTH_SIDES, HWounded_legs + rn1(5, 5))` (`:610–616`). When the hero dies and declines wizard mode's «Die?», done() → savelife returns and C goes on: the rn1(5, 5) draw, the landing and the rest of the dismount, with savelife's «You survived that attempt on your life.» left as nomovemsg for the next turn. js/steed.js ran finish_losehp_done() and then `return`ed even when the hero survived, so the leg draw was missing and the turn ended early

**C locus:** steed.c dismount_steed `:567–760` (thrown/knocked/fell arm `:602–617`, losehp `:612`, set_wounded_legs `:614`); end.c savelife `:695–745` (nomovemsg, multi = -1).
**JS:** js/steed.js dismount_steed `:874–883`.
**Change:** return only `if (game.program_state?.gameover)` after finish_losehp_done, the do.js idiom (do.js `:853–857`). A surviving hero falls through to set_wounded_legs and the rest of the dismount, as in C.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-ride-Knight-53660014.session.json` → PASS (RNG 9210/9210, Screen 245/245).
**Named:** none in dismount_steed. Ten other `await finish_losehp_done(); return;` sites in other C files' ports may bail where C falls through after a declined «Die?»: attrib, eat, hack ×2 (dosinkfall, both losehp arms), mcastu, monmove, mthrowu, pickup, region, sit.
**Next:** the cliffs block is empty again (774/774). The next calibration needs a shape the public set does not show (HIDDEN-PROXY §5c, fifth probes).
## 2026-10-22 — Grow #27 probes @46b68e26c: tutorwalk 20/20, chargen 20/20, ride reshape 19/20

**Mined by reach:** public RNG-drawing C functions (by name) against 6,447 corpus recordings; zero-reach were pick_role/race/align, mount_steed, familiar_level_msg. New wave-3 `tutorwalk` and `chargen`, wave-2 `ride` now declines the forced mount. All ≥ 85 % on arrival (HIDDEN-PROXY §5c). 1 failing folded: scen-ride-Knight-53660014 (slimed_to_death, «OK, so you don't die.» after dismount_steed).
**Next:** that row.
