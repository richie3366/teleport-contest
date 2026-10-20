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
- **Recorder bugs are ported (human 2026-10-20, D-4164):** port C as recorded, bugs included; patch-006 `nomux_out[6144]` overflow lives in js/nomux_capture.js (garbage cursors + OSC leak). Open: >7472-byte overflow into wintty.c clipping statics (Monk-49956033 s89).
- **welcome/Enhanced-blank (D-3944 MEASURED):** C emits 56 UTF-8 glyphs @50059006 s0, nomux records 0 hi-bytes — writer = g_pututf8 hook (contest tooling). JS arm ID'd, moveless until re-record — do not port/replicate. Kin: dupe-rc s0 PARKED D-4016 (18 symset, tmp path).
- **do_screen_description travel (D-3962 FIXED):** shipped C0 raw-store + grid-drop + pile-inverse gate — 5/5 moved. Do not re-chase.
- **D-3998 class:** `do_loot_cont`/`doeat_nonfood` skip post-done C on survived-fatal (ledger partial).

## Don't re-check (≤15)

- D-1790…D-4178 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4178.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/savelev-freeing/lspo_reset_level (notice_all_mons guard lifted D-4159, human 2026-10-20); no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4178 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4178: the Ring_off_or_gone head now follows C order: takeoff.mask clear, the extrinsic test + `impossible`, then `setnotworn(obj)` if gone, else `setworn(nu Named: none.
- D-4177: steal.js `relobj(mtmp, show, is_pet)` ported whole in C order: isgd gold vanishes (canspotmon/canseemon pline, obfree), then `mdrop_obj` per head (`dr Named: none.
- D-4176: a new `darkroom_showsym()` returns reglyph_darkroom's equate for the current flags (S_room's symbol if dark_room && use_color, else SYM_NOTHING's). la Named: darkroom_showsym reads the current flags.
- D-4175: `monThere = m_at(fcx, fcy) || (grd placed at fc and not MON_OFFMAP ? grd : null)`. Named: JS m_at/level_mon_at keep their `mhp <= 0` skip; other C m_at readers inside the mongone →
- D-4174: the not_in_sight body is a per-row local `not_in_sight(col, nv, ov)`, called from the final else and from the new else of the lit-wall test (C's goto) Named: none in the changed arm.
- D-4173: - exercise returns encumber_msg's promise (undefined otherwise). Named: none in exercise/exerper/encumber_msg.
- D-4172: - The painter's arm now requires `_tty_inmore`, i.e. it applies only while more() is waiting, which is where C's cursor sits after `--More--`. Named: the two-line `\n--More--` cursor arms (painter and _paintToplineOnly) are still text-based
- D-4171: - **Match helper.** parseoptions `:539–613` (negation strip, optlen, prefix/minmatch/alias match) moved verbatim into `parseoptions_match`, which pars Named: - The recorder's temp-dir path in «1 error in …» can't be reproduced; JS prints its own co
- D-4170: `dismiss` calls the existing dismiss_nhw_menu (invent.js), which reads the geometry paint_corner_nhw_menu recorded. Named: none in choose_classes_menu's dismiss.
- D-4169: - format_doset_opt_line returns `` `${indent}${name}\t[${value}]` `` under menu_tab_sep, and the bool pass-0 caller passes `''` then. doset_add_menu's Named: the corner and fullscreen painters still ignore other tty byte handling that menus never r
- D-4168: after losehp, `if (game._losehp_needs_done) await finish_losehp_done();`, the apply.js wand-break precedent (`:1395–1398`). Named: a scan for JS functions that call losehp with no finish_losehp_done / `_losehp_needs_done`
- D-4167: hatch_egg awaits `makemon_appear_msg(mon, mon.mx, mon.my, NO_MINVENT | MM_NOMSG)` right after each successful makemon, before tamedog: the C order, in Named: other sync-makemon callers that never await makemon_appear_msg were not audited here.
- D-4166: - Every end_menu prompt row in options.js (doset_simple_menu, handler_menu_objsyms, handler_paranoid_confirmation, handler_whatis_coord, do_symset, ha Named: - About 30 more hard-coded inverse prompt or heading rows in other files, each still to be
- D-4165: - **nomux_capture.js.** overflow_wintty keeps a per-game 48-byte image of erasing_tty_screen..tty_status. Named: - calling_from_update_inventory (only read for WC2_EXTRACOLORS custom colours).
- D-4164: new js/nomux_capture.js. Named: overflow effects on statics other than raw_active/row/col and obuf: nilstring/nulstr, colo
<!-- landmarks:end -->
