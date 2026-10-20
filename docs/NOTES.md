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

- D-1790…D-4162 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4162.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/savelev-freeing/lspo_reset_level (notice_all_mons guard lifted D-4159, human 2026-10-20); no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4162 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4162: the `!keep_mons` arm classifies the swapped-in int (`glyph_is_object` / `glyph_is_trap` / GLYPH_INVISIBLE), like the swallowed path already did. Named: none in reveal_terrain_getglyph or recalc_mapseen.
- D-4161: swallowed is `async`, and its first arm is `await cls(); void bot();` in C order. Named: none in swallowed.
- D-4160: the clone is gone. dothrow.js imports the live invent.js `freeinv`, and a small `throw_freeinv(otmp)` keeps only the JS-only `_goldCount` decrement (e Named: none in throw_obj / throw_gold.
- D-4159: vision_recalc is now `async` and ends in `await notice_all_mons(true)` on both exits (the blind-branch return and the normal end), so C's single `skip Named: none in vision_recalc or postmov.
- D-4158: read_engr_at calls `surface(x, y)` right after `engr_at`, before the `!ep` / empty-text returns, in C order. Named: none.
- D-4157: delete both trap.js clones and import `Levitation_st as hero_Levitation, Flying_st as hero_Flying` from hack.js (an existing import edge). Named: none in immune_to_trap / check_in_air.
- D-4156: mon_at_display first reads the grid cell (`_level_monsters`) the way C m_at does: a monster with `mhp <= 0` that is still on the grid (not MON_OFFMAP, Named: none in newsym. worm.js level_mon_at keeps its `mhp <= 0` filter for its other (non-displa
- D-4155: each of those blocks now ends with `m_dowear(mtmp, true)`, the same comment and call as the five siblings (creation path: sync-through, no messages or Named: none for spo_end_moninvent.
- D-4154: zap.js Disint_resistance ORs in `uprops[DISINT_RES].intrinsic || .extrinsic` (flats kept, matching explode.js). Named: none in zhitu. js/pray.js:1085 has the same flat-only `Disint_resistance()` (pray.c fry_by
- D-4153: `await finish_maybe_wail()` right after the losehp. Named: none.
- D-4152: botl.js records the window's row count in tty_status_init (`statusWinRows`, C cw->maxrow at creation). clear_status_window blanks rows `24 − statusWin Named: none.
- D-4151: resync_map_row0 blanks screen row 1 from column 0 (C's `tty_curs(…, 1, y)` + `cl_end`) before the map-row replay. Named: resync_map_row0 still only covers a two-row message (row 1); C's docorner loop also handle
- D-4150: `Upolyd(u)`. Named: none in earth_sense. js/do.js:3539 has the same bare `Upolyd &&` (do.c, `Upolyd && ceiling
- D-4149: both read.js functions are exported; the muse.js clones are deleted (−107 lines). Named: none.
- D-4148: after the lava losehp: `finish_maybe_wail()`, then `finish_losehp_done()` when `_losehp_needs_done || gameover`, then `return true` only if the game r Named: none in boulder_hits_pool.
<!-- landmarks:end -->
