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

- D-1790…D-4140 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4140.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4140 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4140: `REBIND_UNINIT_PREFIX` (`'\x7f'`, a byte no command name contains) stands for the leftover stack bytes, and both Strcat sites prepend it. Named: none.
- D-4139: topten is async. Named: tty_exit_nhwindows itself still paints nothing (D-1831); only this really_done site clears
- D-4138: dropped the `flush_screen(1)`; the comment now says why. Named: none in docallcmd's menu step.
- D-4137: get_count saves `input_state` and reads each key with `readchar()` after restoring it, tests `cmd_spkey(NHKF_ESC)`, and parse drops the compensating ` Named: none in get_count.
- D-4136: every site reads the live `Blind()`; the three locals and `Blind_read` are deleted. Named: none for Blind in read.js.
- D-4135: new `pickinv_obj_glyphinfo(otmp)` (obj_glyph → map_glyphinfo(0, 0, …, 0), keeps ttychar + color). Named: process_menu_window's objsym slot is live only for menus whose entries carry `identifier`/
- D-4134: one k-swap at the row, in C order: `k = { ...opt, name: 'roguesymset' }` on the Rogue level, used for the text, the get_val and the pick. simple_opt_g Named: none in the k-swap arm.
- D-4133: `if (rn2(5)) await curse(otmp);`, in C order, before the mtmp / cont / give_to_nearby_mon / place_object arms. Named: none in drop_upon_death. bones.c resetobjs `:170–189` (bones.js:312/:321/:325/:329) still 
- D-4132: both sites call getline.js `y_n(query)`. Named: none in study_book. 23 other `yn_function(…, 'yn', …)` literal sites remain in other files
- D-4131: `const unaware = Unaware()`, the live eat.js macro (`(game.multi | 0) < 0 && (unconscious() || is_fainted())`) that mhitm.js already imported for its  Named: none in vamprises.
- D-4130: deleted the early return. Named: none in the corpse arm.
- D-4129: imported invent.js `Blind` and deleted the file-local copy; all three inline mirrors now call `Blind()`. dorub uses `You(...)`. Named: none in these arms.
- D-4128: deleted the three clones. Named: none in these functions.
- D-4127: new file-local `HJumping()` / `EJumping()` read `u.uprops[JUMPING]` (plus the flat field: the Knight's innate FROMOUTSIDE is still written to flat `u. Named: the JUMPING intrinsic is still stored in two places: u_init.js:1653 writes the Knight's FR
- D-4126: Glib arm now `Glib()` (potion.js, youprop.h `:112`) + `Tobjnam(pen, 'slip')` + `fingers_or_gloves(false)`. Named: none in dowrite. write.js keeps a local `Role_if` (urole.mnum compare, same as C `Role_swi
<!-- landmarks:end -->
