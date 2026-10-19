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

- D-1790…D-4094 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4094.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4094 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4094: an else-arm sets glyph_shows_cloud when the cell is seen, a region covers it, the hero isn't Blind, and no monster/I is shown there (kind not 'mon'/'i Named: symset-Healer-50555020 s478 (C remembers a trap `^` where JS shows an object `%`, a memory
- D-4093: the early block calls `cxname(obj)` first, C's do_hit snapshot order, before the msleeping/can_blnd work. Named: town-Tourist-630002 doclassdisco s228 (multi-segment, not yet diffed).
- D-4092: right after the squish losehp, flooreffects drains finish_maybe_wail + finish_losehp_done (the read.js/do.js drain idiom) and returns on gameover. Named: last attribute-screen leftover: worldtour-Wizard-610136 blind timeout 103 vs 106.
- D-4091: both gates also read `u.uprops[SEE_INVIS].intrinsic || .extrinsic`. Named: «You were trapped in a pit {6}.» ×2 (sokoban Ranger-50351023/Samurai-50356023); blind time
- D-4090: the gate also reads `u.uprops[HUNGER].intrinsic || .extrinsic` (eat.js Hunger shape; that helper isn't exported). Named: attribute-screen leftovers: «You were trapped in a pit {6}.» ×2 (sokoban Ranger-50351023/S
- D-4089: innately(propidx, field) ORs the flat H-field (when mapped) with `u.uprops[propidx].intrinsic`, and consults the role/race tables only when a field ex Named: the 9 unchanged attribute-screen rows: «You hungered rapidly because of your ring of hunge
- D-4088: `!(u.EBlinded | 0)`, the same field the arm's own Blind/Blindfolded_only tests already read. Named: the other 22 attribute-screen rows are other shapes, e.g. sweep-Healer-50055041 (missing «
- D-4087: read.js computes `altfeedback = Blind() || hero_Invisible()` once (invent.js Blind already imported, display.js hero_Invisible added). uhitm.js delete Named: none.
- D-4086: pass `cmap_to_glyph(poison ? Named: none.
- D-4085: drop the corner-arm flush_screen(1). docorner already writes its cells and runs C's own `:3716` bot() when the menu reached the status rows. Named: none.
- D-4084: `...menu_prompt_style()` on the prompt row (menu_prompt_style imported from options.js next to select_menu_pick_one). Named: the hard-coded ATR_INVERSE end_menu headers (audit 2915-2923's ~10 rows) still bypass menu
- D-4083: unshift the prompt with `...menu_prompt_style()` and a `{ text: '', selectable: false }` blank item. Named: end_menu prompt headers outside js/options.js and js/getline.js are still unaudited (D-408
- D-4082: the three headers take `...menu_prompt_style()` and are followed by the blank item (sibling shape). Named: prompt headers outside js/options.js were not audited for the blank item.
- D-4081: add the blank non-selectable row after the title, and mark the item whose letter equals `game.flags.discosort` with `selected: true` (set_vanq_order s Named: C's PICK_ONE `n > 1` skip-preselected arm (`:650–652`) stays unported; select_menu_pick_on
- D-4080: both animate_statue makemon calls are followed by `await makemon_appear_msg(mon, mon.mx, mon.my, mmflags)`; the doppelganger one runs before newcham,  Named: none in trap.js.
<!-- landmarks:end -->
