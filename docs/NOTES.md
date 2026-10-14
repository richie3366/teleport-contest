# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Capture is truth (D-3963, human 2026-10-14):** the fountain-customcolor park (D-3946) is void — it was measured on temp-hook recordings; canonically those ⌠ cells are not captured at all. Live lead: Enhanced toplines lose the col-0 char in C's capture (« ogged events: », « mdassist: ») while welcome toplines match — measure nomux_putch row 0 with a temp C dump, then `record --rerecord`. Never re-record with a modified recorder.
- **Calibration (§10.20):** held-out 22→32/44 (RNG 92 %) after the
  `symset` family + D-3930; fresh 87.5 %. New family ≤ 60 % on arrival =
  held-out shape; ≥ 85 % = not. Start regime falsified 2026-10-13 (68/68
  probe; misses = recorder banner artifact).
- **Recorder flake:** Priest-582706 re-recorded 2026-10-13 aborts at s1166 and reads PASS even on pre-D-3930 JS — not a port fix.

- **obj_resists (D-2407/2413-15):** steal.c relobj+flooreffects+Knight/Arch/Healer arms; fire-trap/fmon/polyuse/monstone/bury/steal falsified.

- **Eval-order TDZ (D-2349):** no static polyself edge at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck (D-2420):** W1/W4/W5/W6 shipped (D-2714/D-2717), W2/W3 parked+[measure]; scared/MAIL/seed-logic falsified.
- **Shipped writers — do not re-pop/re-check:** toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua gate, paint audited); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split); gulpmu engulf vision_off ungate (D-3863, stale-'I' unmap); mbodypart/m_move/mfndpos/searches (D-3906, soko-prize linkage live).
- **nhl_gamestate (D-3885 UNPORTABLE):** Priest-582706 s1166 steed-impossible needs C malloc reuse; recorder flaky there (ASLR). Never a port row (D-3895/D-3905).
- **welcome/Enhanced-blank (D-3944 MEASURED):** C emits 56 UTF-8 glyphs @50059006 s0, nomux records 0 hi-bytes — writer = g_pututf8 hook (contest tooling). JS arm ID'd, moveless until re-record — do not port/replicate.
- **do_screen_description travel (D-3962 FIXED):** D-3960's paints stand but flush-timing refuted (temp-C: C emitted everything); D-3961's never-arrived refuted (C descends s21). Shipped C0 raw-store + grid-drop (nomux ch<32) + pile-inverse bank gate — 5/5 moved. Do not re-chase flush/pathing writers here.

## Don't re-check (≤15)

- D-1790…D-3969 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3969.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3969 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3969: restarted the clone as a thin C-order adapter (same name/signature) building the raw list (amt width `:1684–1691`, used-up heading `:1696–1700`, per-i Named: subset counts accepted by the pager but ignored on apply (C FIXME `:1729–1732` — C behavio
- D-3968: restarted the clone as a thin qflags adapter (same name/signature) delegating to the ported query_objlist (js/pickup.js:782) → select_menu_pick_any/on Named: none new — adapter adds none; inherits the generic query_objlist's engulfer mon_to_glyph b
- D-3967: `game.gh = { hname: 'nethack' }` in reset_instance_globals (C value: basename of the recorder argv[0] in every recording; C-order note: C assigns afte Named: (1) showbranch arm needs game.nomakedefs.git_branch (unset; the C shownum fallback covers 
- D-3966: C-ordered `:2049` in both dip clones across 5 pick sites: gold gate (null-safe), then `if (game.flags) game.flags.botl = true`, then verify, then EXCL Named: (1) getobj_dip letter-path gold-message drift (above) — no session evidence. (2) drop/wiel
- D-3965: FREE_ACTION arm in `confer_oc_oprop` mirroring `u.EFree_action` set/clear (same shape as the FAST arm; doc Named list updated). Named: remaining E-flat mirrors absent from confer (SLEEP_RES/FIRE_RES/COLD_RES/SHOCK_RES/POISON_
- D-3964: corner arm now calls the shared ported `erase_menu_or_text(offx, 0, maxrow, false)` (`js/display.js:8649`, D-3626) → `docorner` cl_end + `row_refresh` Named: none new (getpos stays ledger-partial on its D-3556 audited note).
- D-3963: the utf8 arm keeps the C value in the gbuf and sets `loc.disp_capture_drop`; `_paint_gbuf_cell` and `paint_gbuf_level_to_terminal` skip such cells (as Named: topline residual — in Enhanced sessions C's capture loses the col-0 character of some topl
- D-3962: (1) temp-C flushtrace in the ignored recorder tree (log-only FLUSH/PAINT/RUNMODE/TRAVEL/BOTLSYNC/MAPSYNC to /tmp; incremental make + install + sysconf Named: (1) menu/topline/text paths rendering control bytes (separate render, no session evidence)
- D-3961: none — measurement (this commit). Named: none — no port; docs-only entry, no Ledger bullet (D-3944/D-3960 precedent) — flush/runmod
- D-3960: none — measurement (this commit). Named: none — no port; docs-only entry, no Ledger bullet (D-3944/D-3861 precedent) — flush-path l
- D-3959: js/getpos.js only — deleted the shortcut; stairs now match via the typ+seenv+ladder terrain gate (C :1095–1103 seenv back_to_glyph arm) plus the pre-e Named: none new (getpos stays ledger-partial on its D-3556 audited note).
- D-3958:  Named: 007 landing (prohibited dir — supervisor/patches-capable; DURABILITY CAVEAT unchanged: unt
- D-3957:  Named: the :2935 has_rogue_color first-arm (ROGUESET+IBM, never active on contest tty — same stan
- D-3956: `js/pager.js` — the looked path reads the live showsyms table throughout: sym via glyph_showsym_code→live_showsyms per bank (monsters via mlet+SYM_OFF Named: none new — closes the D-2447 `rogue_syms table` + `non-boulder go.ov_*_syms` omissions for
- D-3955: `js/options.js` parseNethackrc only — new top-level MENUCOLOR= arm in the sibling-regex idiom (`/^MENUCOLOR=(.+)/i`, placed before ROGUESYMBOLS mirror Named: (1) ':' separator + space-before-'=' variants (C find_optparam/length_without_val accept t
<!-- landmarks:end -->
