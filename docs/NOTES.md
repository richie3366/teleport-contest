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
- **do_screen_description travel (D-3962 FIXED):** flush-timing + never-arrived refuted (temp-C); shipped C0 raw-store + grid-drop + pile-inverse gate — 5/5 moved. Do not re-chase flush/pathing writers.
- **D-3998 class:** `do_loot_cont`/`doeat_nonfood` skip post-done C on survived-fatal — ledger partial; ship via the generated block.

## Don't re-check (≤15)

- D-1790…D-4044 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4044.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4044 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4044: two envelope call sites in C order, dropx/zap pattern verbatim (`if (otmp.oartifact) await revoke_invoked_property(otmp)`): end.js right after extract Named: (1) live sync useup/useupall (invent.js:5121–5143) still lack the async half — sync, canno
- D-4043: js/dig.js only — adj_pit_checks clears `lev.wall_info = 0` alongside `lev.flags = 0` (C :1776 + rm.h:215 cites; house dual-write precedent zap_dig :14 Named: (1) zap_dig's six `room.flags = 0` dig writes (:1513/:1522/:1531/:1550/:1559/:1563) leave 
- D-4042: js/getpos.js only — numPad predicate (lock.js:189 house shape); wdx/wdy select DIR_DX vs new NUMPAD_DX(_PHONE) (ndir strings verbatim, lock.js NUMPAD_ Named: (1) M(digit)→MV_RUN binds under num_pad (C :3470) — no input path in the corpus (0 high by
- D-4041: js/zap.js only — import makemon_appear_msg (existing makemon.js edge, imports.mjs ALREADY) + await it right after each creation (montraits :3145, cant Named: none new — revive's makemon tail is now complete on all 3 arms; montraits standing omits (
- D-4040: js/zap.js only — `let ret = 0` (`:162`); `case WAN_NOTHING: wake = false` (C-order, after SPE_DRAIN_LIFE); `ret = 1` in the SPE_KNOCK arm (`:403`); de Named: none in this unit — bhitm is now the full C body (all 17 switch arms + default + ret).
- D-4039: js/getline.js only — added the `history` EXT_CMDS row (version sibling shape: dynamic `./pager.js` import, edge already present; wiz:false, autocomple Named: (1) other EXT_CMDS gaps audited, unwired: INTERNALCMD rows (clicklook/mouseaction/altadjus
- D-4038: js/objnam.js only — doname_base stages `obj.known/dknown/bknown = 1` + `game.objects[otyp].oc_name_known = 1` before the base-name if/else and restore Named: (1) doname_base standing partial omits untouched (D-2483 by-design strings, doname_full ov
- D-4037: js/pray.js only — added `Unchanging` to the existing `./polyself.js` import (imports.mjs: edge already present, no new edge); :581 const and :792 fix- Named: (1) the 8 dupe-rc kin + 95340 keep their parks (D-4016/D-4028 falsifiers unfired, re-verif
- D-4036: js/cmd.js + js/hack.js only — all four predicates read both flats (D-3772 canonical shape: `(u.HStun | 0) || u.Stunned`, `(u.HConfusion | 0) || u.Conf Named: (1) cmd.js inline still defers Passes_walls/ooze/Underwater/tunnels/amorphous door arms (p
- D-4035: deleted the extra newsym (+ C-cite comment). Named: none new — teleds stays ported (the deleted line was never in C).
- D-4034: js/potion.js only — make_vomiting now mirrors TIMEOUT bits to uprops[VOMITING].intrinsic (slot created when absent), D-2396 sibling shape verbatim + C Named: none in this unit — make_vomiting is now the full C body + the house dual-store mirror (ol
- D-4033: js/mklev.js only — the gate arm now calls the live whole same-module `lspo_replace_terrain({ mapfragment: '.\nF\n.', toterrain: '.', chance })` with t Named: (1) hellobjects/hellmonsters (defined but unused in lua — D-4019 standing); (2) hells[6] i
- D-4032: the loop now runs in C order through the live exports — `cmd_from_dir(dir, MV_WALK)` per index 0..9, uswallow/movecmd-planar-filter/up-down arms with  Named: (1) Monk-50350087 step 612 (owner getpos): C «Unknown direction: 'j' (use '4', '2', '8', '
- D-4031: (1–2) new display.js glyph_bank_attr(gid) (C tty_print_glyph :3930–36 + reset_glyphmap :2788–2835: pile ⟺ exact piletop banks — normal/generic/body/st Named: (1) MG_DETECT / MG_BW_LAVA/ICE/SINK in glyph_bank_attr (same standing as obj_map_attr; no 
- D-4030: js/potion.js:152 only — added `FACE` to the existing `./const.js` import (body-part group). Named: none — one-name import; peffect_oil body untouched (whole per D-2860).
<!-- landmarks:end -->
