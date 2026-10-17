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

- D-1790…D-4084 stand except Must-fix reviews 2145/2149; 2132/2136 closed. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4084.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4084 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4084: js/fountain.js only — drain-first (losestr D-3782 shape): `if (_needs_done || gameover) { finish_losehp_done(); if (gameover) return; }` then uncondit Named: none in the ported arm — C :300–309 now complete on this path (pline → poison_strdmg → dra
- D-4083: all 15 `des.region(selection.area(...),"lit")` inline loops → live `light_region(x1,y1,x2,y2,true)` (proven ≡ C selection path: ±1 grow incl. diagonal Named: none (grow arm + lava/numeric/bounds proven identical to C on all 15 rects; no C line unpo
- D-4082: js/options.js — new `rc_match_option` (C `:529–614` match via the live match_optname/minmatch/OPT_PFX/OPT_ALIAS) + `rc_note_option_occurrence` (C `:61 Named: (1) C cursor frozen at [0,6,1] all 983 steps (recorder never re-arms after the raw phase —
- D-4081: wired both C arms in C order (D-3919 pattern): steed rank read mirrors the canonical engrave.js shape (weapon_skills[P_RIDING], object-or-flat); ceili Named: none new — mirror complete vs C :187–210.
- D-4080: js/mthrowu.js breamm writes `game._buzzer` (2-line rename + C cite; try/finally kept). Named: (1) S1 questtour-Monk-50557003 s324 map-`E` writer (row 7 C `E` vs JS blank amid xorn/elem
- D-4079: placeNamed now carries `:1947–1953` in C order (after the amask burn): G_UNIQ && G_EXTINCT → return; G_GONE → pm=null (random via makemon(null)). Named: none in the ported arms — `:1947–1953` now complete on this path (UNIQ-return + GONE-null,
- D-4078: in that arm, when `!game._stale_map_flush && game._leave_gbuf_level`, `paint_gbuf_level_to_terminal(game._leave_gbuf_level)` (same-module, no new impo Named: none in the ported arm — C flush body otherwise already whole (suppress/delay/reentrancy/d
- D-4077: deleted the spurious `game.nomovemsg = null`; added the C-arm's `game.multireasonbuf = ''`; doc rewritten with whole-body C-order cites (`:4163–4172`) Named: none in nomul (whole: guard/botl/u-inits/multi/reason+buf/end_running/cmdq).
- D-4076: D-3640 shape — deleted the clone, added `hcolor` to the existing `./do_name.js` import (imports.mjs: edge ALREADY, no new edge). Named: (1) js/detect.js:283 + js/sit.js:218 hcolor clones untouched (other C files — D-3640 left 
- D-4075: js/detect.js only — 2nd-loop predicate now C-order/short-circuit over the displayed glyph id: `if (!glyph_is_monster(newglyph.glyph) || glyph_to_mon(n Named: none in the ported predicate — the whole 2nd-loop guarded arm is now C-exact (both tests, 
- D-4074: js/mklev.js only — `set_malign(mtmp)` inside the override arm (same shape/comment as the six D-3974 sites) + `else mtmp.female = 0` for class specs (C Named: (1) humidity-aware get_location for water-likers (standing doc omission, untouched). (2) m
- D-4073: js/dungeon.js only — deleted the find/existing guard (body now C-order: alloc shape, lev, unconditional lastseentyp wipe, sorted insert); doc rewritte Named: (1) S3/S4 breath-killer writer — MEASURED both sides this iter: C «you, killed by a blast 
- D-4072: js/minion.js — gate now calls the live `Conflict()` export (mhitu.js:225: flats || uprops[CONFLICT].intrinsic/extrinsic — covers ring + artifact + int Named: (1) The local `deaf` read (HDeaf/EDeaf flats + roleplay.deaf + u.Deaf) is kept — HDeaf fla
- D-4071: none — measurement (this commit). Named: none — no port; docs-only entry, no Ledger bullet (D-4016/D-4028/D-4064/D-4065 precedent) 
- D-4070: js/read.js only — `vision_off_newsym_gbuf({ useLiveViz: true })` before `vision_recalc(2)` inside litroom's `!Blind` arm (the D-0852 helper: same news Named: (1) Tourist-50450057 s614 cursor garbage — parked RECORDER-ARTIFACT this iteration (Parked
<!-- landmarks:end -->
