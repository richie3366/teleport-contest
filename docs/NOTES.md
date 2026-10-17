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

- D-1790…D-4053 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4053.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4053 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4053: js/display.js only — new lava_ice_sink_map_attr(gid) beside engrcorr_map_attr (C order: !use_color gate `:2890`, lava+wall → ice → sink `:2897–2900`,  Named: (1) the `:2915–2917` has_rogue_color else-arm (cmap_to_roguecolor recolor when color is on
- D-4052: js/explode.js only — the else branch reassigns the loop-carried `let adtyp` itself (`if (xkflg) adtyp = AD_RBRE; /* no corpse */`, file-local const :1 Named: none new — the :577–581 arm is now exact.
- D-4051: js/mhitm.js only — the door check now reads C's raw conjuncts `(defx - (magr?.mx | 0)) && (defy - (magr?.my | 0))` with a C cite; the `|0` maps JS's n Named: (1) Caveman-610084 screen@559 — RNG 97559/97559 FULL match; JS-only «A newt suddenly appea
- D-4050: js/allmain.js only — the arm now reads `((u.HHallucination|0) && !hallucResisted(u))` (D-4046's house union: uprops intrinsic|extrinsic + Halluc/HHall Named: (1) exerper sibling arms unchanged, no session evidence (D-4012 precedent — ship when the 
- D-4049: js/lev_json.js — new `export function rest_stairs_chain(src)`: fresh nodes (C allocs), every field incl. u_traversed (C `:980–982` stairway_at fixup)  Named: (1) the save-side relative-dlevel dance (save `:672–682` / restore `:972–976`) — file-form
- D-4048: js/display.js only — wall_cmap_color(idx): glyph id from same-module cmap_walls_to_glyph (display.h:598 bank order mines→hell→knox→soko→main); read gl Named: (1) RGB extracolor arm → gray fallback (recorder gap, D-4031 class; Enhanced mines/knox). 
- D-4047: `js/mklev.js` only — NONCO arm expanded to the macro's 3-test form in C order (fresh `noncoalignment(orig)` per test; `A_NONE`→`AM_NONE`, `A_LAWFUL`→` Named: none in this unit — `sp_amask_to_amask` now whole (all 4 arms faithful). (1) 51050016 `vam
- D-4046: (1) new artifact.js halresTalk(removed, equipped) — the C talk half (restoring/Unaware gates, changed OR identical to the sync arm, removed→cosmic the Named: (1) halresTalk carrier sites not yet wired (same call, no corpus firer): wield_tool :281, 
- D-4045: js/invent.js — get_menu_coloring + cattr_to_cell onto the existing options.js edge (imports.mjs ALREADY); new pickinv_menu_coloring(text) (:3726: C at Named: (1) other menu builders still don't apply windows.c add_menu :1803–1807 (no corpus session
- D-4044: two envelope call sites in C order, dropx/zap pattern verbatim (`if (otmp.oartifact) await revoke_invoked_property(otmp)`): end.js right after extract Named: (1) live sync useup/useupall (invent.js:5121–5143) still lack the async half — sync, canno
- D-4043: js/dig.js only — adj_pit_checks clears `lev.wall_info = 0` alongside `lev.flags = 0` (C :1776 + rm.h:215 cites; house dual-write precedent zap_dig :14 Named: (1) zap_dig's six `room.flags = 0` dig writes (:1513/:1522/:1531/:1550/:1559/:1563) leave 
- D-4042: js/getpos.js only — numPad predicate (lock.js:189 house shape); wdx/wdy select DIR_DX vs new NUMPAD_DX(_PHONE) (ndir strings verbatim, lock.js NUMPAD_ Named: (1) M(digit)→MV_RUN binds under num_pad (C :3470) — no input path in the corpus (0 high by
- D-4041: js/zap.js only — import makemon_appear_msg (existing makemon.js edge, imports.mjs ALREADY) + await it right after each creation (montraits :3145, cant Named: none new — revive's makemon tail is now complete on all 3 arms; montraits standing omits (
- D-4040: js/zap.js only — `let ret = 0` (`:162`); `case WAN_NOTHING: wake = false` (C-order, after SPE_DRAIN_LIFE); `ret = 1` in the SPE_KNOCK arm (`:403`); de Named: none in this unit — bhitm is now the full C body (all 17 switch arms + default + ret).
- D-4039: js/getline.js only — added the `history` EXT_CMDS row (version sibling shape: dynamic `./pager.js` import, edge already present; wiz:false, autocomple Named: (1) other EXT_CMDS gaps audited, unwired: INTERNALCMD rows (clicklook/mouseaction/altadjus
<!-- landmarks:end -->
