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

- D-1790…D-4208 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4208.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/savelev-freeing/lspo_reset_level (notice_all_mons guard lifted D-4159, human 2026-10-20); no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4208 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4208: both sites read `glyph_at(sx, sy)`, the gbuf glyph int, as C does. glyph_at_fp had no other caller and is deleted. Named: none in the nopick arm.
- D-4207: compare the mons[] index: `monsndx(magr.data) === PM_RAVEN && monsndx(mdef.data) === PM_RAVEN` (module PM_RAVEN constant beside the file's other PM_ c Named: none in can_blnd.
- D-4206: convert pos into the Lua frame as l_selection_rndcoord does: update_croom(), then subtract the coder subroom's lx/ly if set, else game.splev_xstart/ys Named: the other Lua `rndcoord` consumers in js/mklev.js convert their frame per site (e.g. the s
- D-4205: display.js `topl_raw_utf8(str)` encodes a decoded utf8str with the live unicodeval_to_utf8str into one TOPL_RAW_BYTE char (U+F700+byte) per C byte ≥ 0 Named: pager.c's other encglyph sites go to text/menu windows, not the topline: look_engrs / gath
- D-4204: the sqky_board branch reads `Deaf()`; the three Blind sites read `Blind()` (both file-local youprop readers, already used by trap.js's other Blind/Dea Named: none in trap.c. trap.js's local Blind() (like invent.js's exported one) still lacks C's Bl
- D-4203: delete the Flying_fu and Levitation_fd clones and use the imported live hack.js `hero_Flying` / `hero_Levitation` (Flying_st / Levitation_st: flat or  Named: none in trap.c (no flat-only Flying/Levitation read is left in js/trap.js). mhitu.js's exp
- D-4202: write the fields: x/y on set and on restore, creating the object only when it is missing (C's zeroed static). Named: none in do.c.
- D-4201: prompts spread `menu_prompt_style()`, headings spread `menu_heading_style()` (the D-4186 helpers). tipcontainer_gettarget is restarted in C order: the Named: none in pickup.c.
- D-4200: `_retoggled` now means "set_item_state repainted this entry since the last page paint". Named: choose_classes' own PICK_ANY loop (js/options.js `:5953`) keeps a plain mark, which is net
- D-4199: both heading sites spread the live `menu_heading_style()` (options.js, the D-4186 port of add_menu_heading, gameover → none/no-colour inside). Named: none in dungeon.c.
- D-4198: restarted in C's single-exit shape. Named: none.
- D-4197: `if (!str) tty_raw_print('');` at the head, in C order. Named: settty's `if (s) raw_print(s)` for a non-NULL str (no JS caller passes one).
- D-4196: - really_done (`:1409`): `!toptenwin` → `tty_exit_nhwindows(null)` + clear before topten, in C order. Named: tty_raw_print / tty_raw_print_bold model only the recorder's shadow and the rawprint/raw_p
- D-4195: `return impossible(...)`. Named: none (the LR_BRANCH-with-rooms arm's place_branch is sync, so there is nothing to chain).
- D-4194: savenames also writes the four `oc_*seen` fields. restnames reads them back, and keeps the fresh table's values when an older save has no keys. Named: none (the other objclass fields are static tables on both ends, as before).
<!-- landmarks:end -->
