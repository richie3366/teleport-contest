# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Capture is truth (D-3963, human 2026-10-14):** fountain-customcolor park (D-3946) void — measured on temp-hook recordings; canonically those ⌠ cells are uncaptured. TEXT col-0 fixed (D-3977 linestart g_putch hook); « ogged »/« altar » unattributed (recall TEXT vs live topline). Never re-record with a modified recorder.
- **Calibration (§10.20):** new family ≤ 60 % on arrival = held-out
  shape; ≥ 85 % = not. Start regime falsified 2026-10-13 (68/68 probe;
  misses = recorder banner artifact).
- **Priest-582706 s1166 flake:** re-record aborts yet reads PASS even pre-D-3930 — not a port fix (see nhl_gamestate).

- **obj_resists (D-2407/2413-15):** steal.c relobj+flooreffects+Knight/Arch/Healer arms; fire-trap/fmon/polyuse/monstone/bury/steal falsified.

- **Eval-order TDZ (D-2349):** no static polyself edge at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck (D-2420):** W1/W4/W5/W6 shipped; s110 PASS via maketrap union (D-3985); Ranger s1037 PASS via clonewiz Protection import (D-3989); ghoul/couatl/dog/zapfest-miss writers remain; scared/MAIL/seed-logic falsified.
- **Shipped writers — do not re-pop/re-check:** toss_up→chwepon (D-3640); read_engr_at Knight-94259 (D-3671); magic_map_background DARKROOMSYM-rogue (D-3682); gulpmu engulf vision_off ungate (D-3863); mbodypart/m_move/mfndpos/searches (D-3906).
- **nhl_gamestate (D-3885 UNPORTABLE):** Priest-582706 s1166 steed-impossible needs C malloc reuse; recorder flaky there (ASLR). Never a port row (D-3895/D-3905).
- **welcome/Enhanced-blank (D-3944 MEASURED):** C emits 56 UTF-8 glyphs @50059006 s0, nomux records 0 hi-bytes — writer = g_pututf8 hook (contest tooling). JS arm ID'd, moveless until re-record — do not port/replicate.
- **do_screen_description travel (D-3962 FIXED):** flush-timing + never-arrived refuted (temp-C); shipped C0 raw-store + grid-drop + pile-inverse gate — 5/5 moved. Do not re-chase flush/pathing writers.

## Don't re-check (≤15)

- D-1790…D-3989 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3989.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3989 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3989: js/wizard.js only — deleted the local clone, imported the canonical `Protection_from_shape_changers` from were.js (`imports.mjs --can`: SAFE, hoisted  Named: (1) flats-only Protection reads in OTHER C functions ship only when a session names them (
- D-3988: added the C :989-993 gate to all 17 inline loops (same `IS_STWALL||IS_TREE||IRONBARS` expression as sibling :4515; flags-mirror write kept per splev_n Named: none (C :985-995 whole at every application: shared per-cell :5131 + splev_non_diggable :4
- D-3987: `export async function do_symset(rogueflag)` porting the whole C body: null-name read_sym_file list pick, both filter loops (rogue?primary:rogue, H_MA Named: none in-body — whole C body live (menu via select_menu_pick_one: create/start/end/select/d
- D-3986: js/shk.js only — init `'a'` per decl.c:720 + corrected cite comment. Named: none new (sellobj/pay/money2u/splitobj/nextoid pre-wired and faithful — offers, splits, me
- D-3985: js/trap.js only — the `clear_flags` arm now clears every live union mirror (flags/doormask/altarmask/wall_info/drawbridgemask/looted/icedpool) with th Named: (1) `ladder` mirror not cleared (stairs fail maketrap's terrain gate — unreachable here; C
- D-3984: js/explode.js only — the six remaining hero predicates (Fire/Cold/Shock/Antimagic/Disint/Acid) read the union flats||uprops[SLOT].intrinsic||extrinsic Named: none new (explosionmask stays ledger-ported; the change completes the C macro reads, no ne
- D-3983: js/invent.js + js/display.js only — encumber_msg records `game._pending_botl = true` synchronously with the oldcap commit on crossings (before any awa Named: none new (encumber_msg and putmesg stay ledger-ported; the change restores C's commit orde
- D-3982: js/display.js + js/botl.js only — both Strngl predicates narrowed to the C-exact read: flat u.Strangled (JS mirror of the same C field) OR uprops[STRA Named: none new (do_statusline2 stays ledger-partial on its three doc omissions: vers/showvers, M
- D-3981: js/read.js only — drain the deferred wail/done finishers between flooreffects and the boulder-hit losehp (same explode_losehp idiom as the existing po Named: (1) the js/muse.js drop_boulder_on_player twin (:1203–1240; drifted: flat HPasses check vs
- D-3980: js/trap.js only — float_down now applies the hmask/emask clear to the uprops slot (intrinsic + extrinsic) alongside the flats (C single-storage semant Named: none new (float_down already ledger-ported D-3610; this iteration repaired the mask-clear 
- D-3979: `js/do_wear.js` only — deleted the house `find_ac()`; added the explicit LEATHER_GLOVES no-op (`:581–582`) + default `await impossible('Unknown type o Named: none new — Gloves_on now whole vs C `:576–603`.
- D-3978: js/uhitm.js only — the five resist unions now read flats OR uprops intrinsic/extrinsic per the C macros (flats kept for eat/poly paths; potion.js/inve Named: none new (passive already ledger-ported D-3924; this iteration repaired six reads whole — 
- D-3977: js/pager.js only — hoist `utf8Handling` (live `game.gs.symset[currentgraphics].handling === H_UTF8`, glyphs.js:1005 idiom, probe-verified 5/Enhanced2  Named: (1) show_nhw_menu_text fullscreen + corner paint loops — same C linestart lines under offx
- D-3976: u_simple_floortyp u_in_air now `u.Levitation || Levitation_st() || u.Flying || Flying_st() || !grounded(...)` (in-file unions, C order, D-3810 shape). Named: (1) pooleffects leaving-water pop-out arms (`:2220`/`:2222`) fixed same-idiom but session-
- D-3975: none — measurement iteration, no `js/` changed. Named: n/a.
<!-- landmarks:end -->
