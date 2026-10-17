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
- **nhl_gamestate s1166 (D-3885 UNPORTABLE):** Priest-582706 steed-impossible needs C malloc reuse; flaky recorder (ASLR); re-record aborts yet reads PASS pre-D-3930 (restore arms portable: D-4009).
- **welcome/Enhanced-blank (D-3944 MEASURED):** C emits 56 UTF-8 glyphs @50059006 s0, nomux records 0 hi-bytes — writer = g_pututf8 hook (contest tooling). JS arm ID'd, moveless until re-record — do not port/replicate. Kin: dupe-rc s0 PARKED D-4016 (18 symset, tmp path).
- **do_screen_description travel (D-3962 FIXED):** shipped C0 raw-store + grid-drop + pile-inverse gate — 5/5 moved. Do not re-chase.
- **D-3998 class:** `do_loot_cont`/`doeat_nonfood` skip post-done C on survived-fatal (ledger partial).

## Don't re-check (≤15)

- D-1790…D-4068 stand except Must-fix reviews 2145/2149; 2132/2136 closed. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4068.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4068 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4068: js/zap.js only — the prompt item now spreads `...menu_prompt_style()` (live relayed-slot read, C-cited; correct under rc menu_headings overrides too); Named: none — prompt arm now C-exact; ring walk, empty-menu early return, pick-back ring math, an
- D-4067: js/options.js — bool arm now `await optfn_boolean_do_set(opt.name, simple_bool_value(opt), false)` (the shared fullscreen-doset mirror; all 22 simple  Named: (1) JS parseoptions bool dispatch stays a no-op (allopt bool optfn:null vs C :635) — the s
- D-4066: js/dig.js only — removed all 5 extra newsyms (4 early arms → bare `return`s, tail → C-cite comment); pure removal, no new imports, signature kept so c Named: none — the 4 mtmp-arm removals ride with :1001 (same function, same C contradiction, REACH
- D-4065: none ([measure] — no js/). Named: none — no port; docs-only entry, no Ledger bullet (D-4016/D-4028/D-4064 precedent) — rndmo
- D-4064: none ([measure] — no js/). Named: none — no port; docs-only entry, no Ledger bullet (D-4016/D-4028 precedent) — dfeature_at 
- D-4063: js/mklev.js only — both siege loops: on null pick, C-order random fallback inline (same-module live calls, no new imports/edges): `pm_to_humidity` → ` Named: (1) Mon-strt dart-trap loop :12597-12603 `!pos → continue` (C des.trap with (-1,-1) → rand
- D-4062: one `await finish_maybe_wail()` per losehp in exact C order + cites: attrib.js:415 (after the fatal block — no-op on survived-fatal since the flag is  Named: (1) music.js do_pit + apply.js use_grapple fatal path: C losehp→done is noreturn, JS still
- D-4061: js/fountain.js only — case 29 calls the live `monflee(mtmp, 0, false, false)` over fmon with a DEADMONSTER-exact guard (`(mhp|0) < 1`, monst.h:214); ` Named: (1) uhitm.c:4363/:4689 monflee(magr) arms (mhitm_ad_heal/mhitm_ad_sedu; no monflee call in
- D-4060: js/eat.js only — `Unchanging` added to the existing ./polyself.js import (:140; imports.mjs: ALREADY edge, TDZ-neutral); the :852 read now calls canon Named: (1) flat-only Unchanging siblings (same class, no live row — ship when named, D-4012 prece
- D-4059: js/display.js only — the :929–935 arm (live `isok`/COLNO/ROWNO/`panic` imports, zero new edges) plus an ordered microtask drain (`queueNewsymImpossibl Named: (1) 164–177 pacing interleave — drain mores vs turn-loop key reads share nhgetch schedulin
- D-4058: js/pickup.js only (+13/−1) — `finish_maybe_wail` added to the existing ./hack.js import (imports.mjs: ALREADY edge, no new edge); one `await finish_ma Named: (1) do_loot_cont survived-fatal makeknown+abort skip (ledger omit, D-3998 class — life-sav
- D-4057: js/uhitm.js only (+5/−3) — the disjunct now reads the live ball `game.u?.uball` (codebase-wide Punished convention: trap.js:7501, do.js:1803, ball.js: Named: (1) do.js:1803/:2288 `u.uball || u.Punished` reads — the Punished disjunct is dead (never 
- D-4056: both message-row writers now home + overwrite + cl_end with the C0 skip (D-3962 grid rule verbatim, `charCodeAt < 32 → continue`, column still advance Named: (1) menu/text/base-window C0 (tty_putstr NHW_MAP :2336–2347, NHW_BASE :2348–2364, NHW_MENU
- D-4055: js/music.js only — `import { Unchanging } from './polyself.js'` (imports.mjs --can: IN-SCC, hoisted function, cycle-safe; music.js had no polyself edg Named: (1) the 9 dupe-rc kin + 95340 keep their parks (D-4016/D-4028 falsifiers unfired, re-verif
- D-4054: js/cmd.js only — (1) travel_test_move: :1014 arm in C order (passWalls && may_passwall first; Underwater/IRONBARS/tunnels become else-if; may_passwall Named: (1) domove-inline closed-door Passes_walls/ooze/Underwater/tunnels/amorphous arms (ledger-
<!-- landmarks:end -->
