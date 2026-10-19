# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Capture is truth (D-3963, human 2026-10-14):** fountain-customcolor park (D-3946) void — measured on temp-hook recordings; canonically those ⌠ cells are uncaptured. TEXT col-0 fixed (D-3977 linestart g_putch hook); « ogged »/« altar » unattributed (recall TEXT vs live topline). Never re-record with a modified recorder.
- **Calibration (§10.20):** new family ≤60% arrival = held-out shape; ≥85% = not.

- **obj_resists (D-2407/2413-15):** steal.c relobj+flooreffects+Knight/Arch/Healer arms; fire-trap/fmon/polyuse/monstone/bury/steal falsified.

- **Eval-order TDZ (D-2349):** no static polyself edge at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck (D-2420):** dog-pair PASS via phone digits (D-3990); Monk→getpos@307; ghoul/couatl/zapfest-miss writers remain.
- **Shipped writers (do not re-pop):** chwepon (D-3640); read_engr_at (D-3671); magic_map_background (D-3682); gulpmu (D-3863); mbodypart/m_move/mfndpos/searches (D-3906); phone digits (D-3990).
- **nhl_gamestate s1166 (D-3885 UNPORTABLE):** Priest-582706 steed-impossible needs C malloc reuse; flaky recorder (ASLR); re-record aborts yet reads PASS pre-D-3930 — not a port fix for that symptom (restore arms portable: D-4009).
- **welcome/Enhanced-blank (D-3944 MEASURED):** C emits 56 UTF-8 glyphs @50059006 s0, nomux records 0 hi-bytes — writer = g_pututf8 hook (contest tooling). JS arm ID'd, moveless until re-record — do not port/replicate. Kin: dupe-rc s0 PARKED D-4016 (18 symset, tmp path).
- **do_screen_description travel (D-3962 FIXED):** shipped C0 raw-store + grid-drop + pile-inverse gate — 5/5 moved. Do not re-chase.
- **D-3998 class:** `do_loot_cont`/`doeat_nonfood` skip post-done C on survived-fatal (ledger partial).

## Don't re-check (≤15)

- D-1790…D-4112 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4112.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4112 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4112: mhitm.js exports `set_mm_vis`. hmonas sets it at C `:5434` and resets it at C `:5856` (the gameover early return skips the reset, as C's done_in_by do Named: none new.
- D-4111: look_here calls the ported `display_nhwindow_message()` (NEED_MORE → more() + clear; else toplin EMPTY, no wipe). Named: none new.
- D-4110: really_done calls `display_nhwindow_message()` (the ported tty NHW_MESSAGE arm: NEED_MORE → more(), re-set NEED_MORE, clear; else toplin EMPTY) at C ` Named: the 5 symset look_here rows stay with D-3946 (fountain-customcolor capture, TOOLING-LIMIT)
- D-4109: the corner painter, select_menu_pick_none and the inline painter now do C `:1919–1920`: `if (topline_need_more()) await display_nhwindow_message()`, i Named: tty_display_nhwindow stays partial: the TEXT/MAP/STATUS arms and the fullscreen MENU arm's
- D-4108: get_mattk also records `_slots`, the permonst's mattk[] array. hitmsg requires `mattk._slots === prev._slots` before the index test, so both together  Named: none. hitmsg stays whole vs C `:29–81`, and getmattk vs C `:310–444`.
- D-4107: restart. Named: test_move stays partial only for the travel clone: cmd.js `travel_test_move` still code-na
- D-4106: bagotricks passes `NO_MM_FLAGS | MM_ASYNCGROUP` to makemon and makemon_appear_msg. Named: about 30 other mid-game callers still use the sync group tail, i.e. makemon + makemon_appe
- D-4105: `glyph_to_obj_is_boulder` is now C's expression `glyph_to_obj(glyph_at(x, y)) === BOULDER`, using the live display.js glyph_at (gbuf = disp_glyph, D-1 Named: none new. moverock_core stays whole vs C `:348–638`, and feel_location vs C `:745–909`.
- D-4104: none (measurement). Named: none.
- D-4103: obj_is_local is now C whole: no null guard (C NONNULLARG1), and an unlisted `where` panics. set_mimic_sym calls the live shk.js `obfree(otmp, null)` a Named: nhl_gamestate keeps its existing partial omit (sync useup/useupall have no async half, so 
- D-4102: options.js: force_invmenu, herecmd_menu, sounds → iflags in both tables; extmenu, toptenwin → iflags in allopt. invent.js: both prompt-row sites push  Named: eight_bit_tty keeps split readers (allopt → iflags.wc_eight_bit_input, map → iflags.eight_
- D-4101: both writers now assign `null` (C NULL), with a C cite. Named: none.
- D-4100: hero arm uses `body_part(HEAD)` (already imported from polyself.js); the evaporate line is the single C `Tobjnam_pot(obj, 'evaporate')` call (the file Named: none.
- D-4099: the hero_memory arm attaches GLYPH_UNEXPLORED when there is no remembered glyph (mklev.c:852), and still uses the remembered int, or the stone default Named: none.
- D-4098: split the arm: statues keep the monster letter, and bodies return `live_showsyms(objects[CORPSE].oc_class + SYM_OFF_O)` as C's glyphmap does. Named: none.
<!-- landmarks:end -->
