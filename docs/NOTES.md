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

- D-1790…D-4066 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4066.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4066 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4066: gain_guardian_angel calls the canonical `Conflict()` (js/mhitu.js:225, reads u.uprops[CONFLICT] as C does). Named: other flat-field Conflict reads remain — js/invent.js:7212 and :8331 (`(u.HConflict | 0) |
- D-4065: litroom runs `vision_off_newsym_gbuf({ useLiveViz: true })` before `vision_recalc(2)` under `Hallucination()` (display.js canonical, already imported) Named: (1) confuse-monster arm (sweep-Caveman-50055067 s1272, sweep-Rogue-620093 s1060: C «Your h
- D-4064: removed the invented call; cite + comment at the function end. Named: none in this body.
- D-4063: `placeNamed` now delegates to `splev_create_monster(id, peaceful, { rx, ry })` (C create_monster in C order, incl. Named: load_wiz_strt's `placeNamedAt` / `placeClassAt` (mklev.js:6880/6894, dat/Wiz-strt.lua) are
- D-4062: skip when `glyph_to_mon(newglyph.glyph) === PM_LONG_WORM_TAIL` (loc.disp_glyph is the numeric glyph show_glyph painted; display.js glyph_to_mon added  Named: (1) Samurai's new s1170 `doaltarobj` row (C «dancing flash» vs JS «amber flash» — a halluc
- D-4061: siege loops call the faithful `splev_create_monster(name, undefined, coord)` (mklev.js, C create_monster in C order) with the rndcoord cell made relat Named: the same "null rndcoord → skip" shape remains in other level ports, each its own dat/*.lua
- D-4060: (1) case 29 calls the live `await monflee(mtmp, 0, false, false)` (monmove.js:1118; fountain.js already imports monmove.js — imports.mjs ALREADY, adde Named: (1) spell.c cursed_book case 5 (js/spell.js:699) calls poison_strdmg with no fatal-losehp 
- D-4059: import the live `Unchanging(u)` (polyself.js:438, flats ∪ uprops; eat.js already imports polyself.js — imports.mjs ALREADY, no new edge) and use it at Named: (1) Wizard-50156033 s512 map `I`/`)` stays a cprefx-owned row for its own writer. (2) The 
- D-4058: restart of the tail in C order — `export async function losehp`: every state change still runs before the first await (nothing awaits unless showdamag Named: (1) `done(DIED)` and `rehumanize()` stay deferred to finish_losehp_done / finish_losehp_re
- D-4057: import the live `Punished()` (pray.js:255, `!!game.u.uball`) and call it in the foo predicate. Named: none in this arm. do.js:1803/2288 `u.uball || u.Punished` already gate on the live uball (
- D-4056: new file-local `topline_putsyms_cl_end(display, row, line, cols)` in C order: putsyms (skip `charCodeAt < 32` per nomux_putch, cursor position implied Named: (1) the other putsyms paths (addtopl/more/removetopl/getline echo) do not apply the C0 dro
- D-4055: js/music.js only — `import { Unchanging } from './polyself.js'` (imports.mjs --can: IN-SCC, hoisted function, cycle-safe; music.js had no polyself edg Named: (1) the 9 dupe-rc kin + 95340 keep their parks (D-4016/D-4028 falsifiers unfired, re-verif
- D-4054: js/cmd.js only — (1) travel_test_move: :1014 arm in C order (passWalls && may_passwall first; Underwater/IRONBARS/tunnels become else-if; may_passwall Named: (1) domove-inline closed-door Passes_walls/ooze/Underwater/tunnels/amorphous arms (ledger-
- D-4053: js/display.js only — new lava_ice_sink_map_attr(gid) beside engrcorr_map_attr (C order: !use_color gate `:2890`, lava+wall → ice → sink `:2897–2900`,  Named: (1) the `:2915–2917` has_rogue_color else-arm (cmap_to_roguecolor recolor when color is on
- D-4052: js/explode.js only — the else branch reassigns the loop-carried `let adtyp` itself (`if (xkflg) adtyp = AD_RBRE; /* no corpse */`, file-local const :1 Named: none new — the :577–581 arm is now exact.
<!-- landmarks:end -->
