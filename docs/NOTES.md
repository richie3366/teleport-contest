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
- **D-3998 class (survived-fatal):** `do_loot_cont`/`doeat_nonfood` skip post-done C (ledger partial); D-4188 goto_level and D-4230 dismount_steed fixed. 10 `await finish_losehp_done(); return;` sites remain (attrib, eat, hack ×2, mcastu, monmove, mthrowu, pickup, region, sit); check each against C.

## Don't re-check (≤15)

- D-1790…D-4235 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4235.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/savelev-freeing/lspo_reset_level (notice_all_mons guard lifted D-4159, human 2026-10-20); no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4235 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4235: sit_losehp drains the deferred done and returns `!!gameover`, the do.js / steed.js idiom (D-4230). Named: none in the sit.c losehp sites. special_throne_effect has no ledger row (its C body opens 
- D-4234: the clone is deleted; timeout.js exports TIMEOUT_FLAT and wizcmds.js prop_old_timeout / incr_prop_timeout read and write through it, so every timed pr Named: none in wiz_intrinsic.
- D-4233: select_menu_pick_none carries counting / count / reset_count like the PICK_ONE/ANY loop at invent.js `:4271` (append_long_digit, digits consume the ke Named: process_menu_window's objsym slot is live only for menus whose entries carry `identifier`/
- D-4232: each name is added to the file's existing import from its home module (const.js, objects.js, monsters.js, trap.js, mkobj.js). wizcmds.js gains `import Named: none for the imports. migrate_to_level's boulder arm stays an inline extract + deltrap + d
- D-4231: the special arms sit inside `if (!mtmp.wormno) { … }`, C's goto as a block. Named: none in m_move.
- D-4230: return only `if (game.program_state?.gameover)` after finish_losehp_done, the do.js idiom (do.js `:853–857`). Named: none in dismount_steed.
- D-4229: `await makemon_appear_msg(guard, guard.mx, guard.my, MM_EGD | MM_NOMSG)` right after the makemon null check, before isgd/mpeaceful, which is where C's Named: none in invault's guard-arrival arm.
- D-4228: `set_bot_disabled(true)` … `finally set_bot_disabled(prev)` spans the NEED_MORE flush, the pages, the wait and the dismissal (docrt or erase_menu_or_t Named: none in doattributes.
- D-4227: `await see_monsters();`. Named: none in teleds. 27 other un-awaited `see_monsters()` calls remain in other C files' ports 
- D-4226: parkguard tests worm.js level_mon_at(0, 0), the JS reading of C's `level.monsters[x][y]` that steed.js place_monster already uses. Named: none in parkguard. teleport.js relmon's `mon_m_at(0, 0) === mtmp` (mon.c relmon) has the s
- D-4225: `let omx/omy`, re-read after the not_special uswallow check, as in C. should_see, gettrack, nix/niy, remove_monster and mon_track_add all now see the  Named: none in m_move.
- D-4224: the line is removed; the loop is C's: mungspaces, then `!buf && --trycount > 0`. Named: none in invault.
- D-4223: the Blind clone is deleted and dothrow.js imports the live invent.js Blind (an existing import edge). throw_obj gates on HConfusion / HStun and the li Named: none in dothrow.js.
- D-4222: the four clones are deleted, and each file imports the live polyself.js poly_gender (all four already import polyself.js). beautiful itself was alread Named: none.
- D-4221: `EYE` added to zap.js's const.js import (const.js `:582`, same edge). Named: none.
<!-- landmarks:end -->
