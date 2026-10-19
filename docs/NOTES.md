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

- D-1790…D-4084 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4084.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4084 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4084: `...menu_prompt_style()` on the prompt row (menu_prompt_style imported from options.js next to select_menu_pick_one). Named: the hard-coded ATR_INVERSE end_menu headers (audit 2915-2923's ~10 rows) still bypass menu
- D-4083: unshift the prompt with `...menu_prompt_style()` and a `{ text: '', selectable: false }` blank item. Named: end_menu prompt headers outside js/options.js and js/getline.js are still unaudited (D-408
- D-4082: the three headers take `...menu_prompt_style()` and are followed by the blank item (sibling shape). Named: prompt headers outside js/options.js were not audited for the blank item.
- D-4081: add the blank non-selectable row after the title, and mark the item whose letter equals `game.flags.discosort` with `selected: true` (set_vanq_order s Named: C's PICK_ONE `n > 1` skip-preselected arm (`:650–652`) stays unported; select_menu_pick_on
- D-4080: both animate_statue makemon calls are followed by `await makemon_appear_msg(mon, mon.mx, mon.my, mmflags)`; the doppelganger one runs before newcham,  Named: none in trap.js.
- D-4079: object_from_map gains an optional `glyph` argument and ports the body/statue arm after the mimic arm. look_at_object takes `glyph` too, and both looka Named: do_name.js:1694 (#name/#call from the map) and mhidden_description's hidden_objfrommap sti
- D-4078: `else if (Flying())`. Named: other bare `u.Flying` reads left as-is (most already OR the slot readers): dig.js:1642, ap
- D-4077: the air arm now zeroes the other struct rm fields too, as C's struct copy does: seenv, flags/doormask/wall_info (C's one flags field), horizontal, was Named: auto_describe rows left: shop corpse names (Archeologist-50455533, Monk-50550061, Rogue-50
- D-4076: `pline('Autopickup: %s.', buf)` — C's call shape. Named: other JS plines that template-interpolate runtime text into fmt (the same shape) were not 
- D-4075: both sites pass `'ynq\x1ba'`; the "simplified" notes (header + list_vanquished doc) were removed. Named: none.
- D-4074: the three sites call the live readers — monmove.js `Displaced` (imported as `hero_Displaced`, the same reader set_apparxy uses) and the already-import Named: other phantom Displaced flat readers left as-is: js/invent.js:5962 (enlightenment-side), j
- D-4073: in that branch, when the level is detached (not the getbones `_stale_map_flush` path, which D-0583 handles), paint the leave level's dirty cells with  Named: worldtour-Wizard-50350000 s1322 (enlightenment attributes screen) is the next owner of tha
- D-4072: the `finally` funnel calls `clear_nhwindow_message()` (display.js, the tty_clear_nhwindow(WIN_MESSAGE) port) when msg_given is set. Named: (1) the getpos-owned terrain-view rows (4) are the next getpos shape. (2) The two moved ro
- D-4071: the three writers use `game._buzzer` (6 occurrences); no `game.buzzer` remains in js/. Named: worldtour-Valkyrie-587104 s634 (zhitu disintegration: C «You are not disintegrated.--More-
- D-4070: drop the lookup; always allocate, insert after equal nodes (unchanged loop), and clear lastseentyp on every call (C `:2848`). find_mapseen still retur Named: shape B (grave killer text missing «exhaled by <monster>») is the next background_enlighte
<!-- landmarks:end -->
