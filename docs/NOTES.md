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

- D-1790…D-4193 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4193.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/savelev-freeing/lspo_reset_level (notice_all_mons guard lifted D-4159, human 2026-10-20); no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4193 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4193: fullscreen (offx 0) still blanks the message, as the C clear-screen arm does. Named: tty_display_nhwindow stays partial: the TEXT/MAP/STATUS arms and the fullscreen MENU arm's
- D-4192: call the live `y_n()` (getline.js), which passes `ynchars` with addcmdq TRUE like C. Named: none in the changed arm.
- D-4191: delete the recompute. Named: none in the changed arm.
- D-4190: an unguarded `newsym(mtmp.mx, mtmp.my)` as in C, then the see_monsters drain idiom: clear the flag, newsym, and if it is set, `await impossible('newsy Named: the other JS newsym callers outside see_monsters still do not drain `_newsym_misuse`.
- D-4189: read `glyph_at(x, y)` first. Named: the live-layer reconstruction stays for id-less gbuf cells (NO_GLYPH paints by JS-only cal
- D-4188: use the D-4092 idiom that the two other do.c losehp sites in JS already use (boulder squish `:854`, lava boulder `:1077`): drain when `_losehp_needs_d Named: none in the changed arm.
- D-4187: import the live `surface` from sit.js and use `surface(u.ux, u.uy)` in the engrave row. Named: doengrave non-hands stylus body; Traditional itemize yn (standing, unchanged).
- D-4186: delete the local helper. Named: dodiscovered's "Unique items or Relics" / class / "Discovered items" lines (invent.js `:53
- D-4185: `Invis()` and `Hallucination()` (live youprop exports) at those two sites. Named: none in pri_move / intemple.
- D-4184: placeMon writes `mtmp.female = female` always (0 for class specs, as C `:3355–3356`), and wraps the peaceful override with `set_malign(mtmp)` (C `:212 Named: placeMon is still a stand-in for create_monster.
- D-4183: each of the four sites keeps the returned `ep` and applies lspo_engraving's tail: `guardobjects = 0`, `nowipeout = 0` (degrade default TRUE). Named: none.
- D-4182: - `load_special_head(check_inaccessibles)` in C order next to load_special_proto. Named: (1) hellobjects/hellmonsters (defined but unused in lua — D-4019 standing); (2) hells[6] i
- D-4181: the readers OR both fields and the hole-fill arm clears both, as in D-0865. Named: none.
- D-4180: after hellfill_populatemaze, run link_doors_rooms, remove_boundary_syms and map_cleanup in C order. hellfill never sets "inaccessibles", so ensure_way Named: (1) hellobjects/hellmonsters (defined but unused in lua — D-4019 standing); (2) hells[6] i
- D-4179: dismount_steed calls the live `teleds(cc.x, cc.y, TELEDS_ALLOW_DRAG)` (already imported in steed.js); teleds_simple is deleted. Named: none.
<!-- landmarks:end -->
