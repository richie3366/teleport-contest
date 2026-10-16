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

- D-1790…D-4029 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4029.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4029 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4029: js/dokick.js only — the wild-miss guard now calls the file-local `Levitation()` (C cite comment). Named: none — every kick_monster callee is live; no deferred arm (D-2042's kickdmg arm shipped se
- D-4028: none — measurement (this commit). Named: none — no port; docs-only entry, no Ledger bullet (D-4016/D-3944 precedent).
- D-4027: replaced the deferral with `await rehumanize()` in C order (pline → rehumanize → assess_dmg return) with a C-citing comment. Named: (1) passiveum's other standing defers untouched (AD_ENCH drain_item :3101, mon_reflects :3
- D-4026: js/cmd.js only — deleted the `!forcefight` guard so the condition matches C exactly (Blind/mon_visible/M_AP/sensemon/nomul/move=0 all already C-order) Named: (1) domove_core's standing partial omits untouched: displacer swap, mundetected Wait!, ful
- D-4025: js/do.js only — enter loop now calls the live `freeinv` export (invent.js:9811: extract + freeinv_core + update_inventory) instead of the manual shift Named: (1) leave-arm useupall_gamestate obfree subset incl. leash detach (50556042's arm — ledger
- D-4024: js/mklev.js only — replaced the barLit closure + 10 calls with 10 light_region calls (same file, same order, same rects+offset; C cites per line). lig Named: (1) worldtour-Barbarian-50458507 s419 r12c39 (JS Oracle @40,11 vs C floor) keeps its own w
- D-4023: js/mklev.js placeNamedAtAbs now carries create_monster `:1947–1953` in C order (after the amask burn): G_UNIQ && G_EXTINCT → return null; G_GONE → pm= Named: (1) other lair/des mirrors with direct-makemon locals are unaudited for the `:1950` gate —
- D-4022: js/display.js `see_monsters` is now `async`: it calls `_Sting_effects(new)` (whose text/verb compute synchronously from the old count at call time), u Named: (1) 31 other JS `see_monsters()` call sites (artifact/do_wear/eat/potion/polyself/timeout/
- D-4021: js/muse.js — MM_ASYNCGROUP (const.js existing import) OR'd into the makemon + makemon_appear_msg flags of MUSE_WAN_CREATE_MONSTER and MUSE_SCR_CREATE_ Named: (1) read.c hero scroll-of-create-monster — same cause, other C file, follow-up wiring unit
- D-4020: js/read.js only — (1) `SPE_IDENTIFY` const (:197, objectNames pattern); (2) `case SPE_IDENTIFY:` on the SCR_IDENTIFY arm (C :2256–2259 shape + cite);  Named: (1) other seffects switch arms still default-stubbed (remaining scroll/spell otyps — their
- D-4019: js/mklev.js only — (1) `hellfill_rnd_halign/valign` (:85-93), `HELLFILL_PREFABS` (10 entries in lua order, map strings byte-exact — /tmp scratch compa Named: (1) hells[4] horizontal iron-bar floor replace (standing in-code + ledger omit); (2) hello
- D-4018: js/const.js only — `MM_ASYNCGROUP = 0x02000000` (next free bit in the shared word) + corrected comment citing C + D-4018. Named: (1) `MM_ASYNC = 0x00100000` still aliases `MM_MINVIS` — dormant (zero js/ users since its 
- D-4017: js/do_name.js only — the x_monnam priest arm now also saves/clears/restores the `u.Hallucination` sticky alongside EHalluc_resistance when !do_hallu ( Named: (1) Valkyrie-50362023 s1003 (RNG-full 43622/43622): JS appends «You survived that attempt 
- D-4016: none — measurement (this commit). /tmp/cfgprobe-probe.mjs (kept out of tree): pinned recorder binary unmodified, /tmp install copy, fresh mkdtemp home Named: none — no port; docs-only entry, no Ledger bullet (D-3944/D-3961 precedent) — config_error
- D-4015: both sites now use the live `level_difficulty()` (already imported in mklev.js :15 — no new edge). Named: (1) standing dispatch omits untouched: Water vault D-0690, Blocked center D-0243; (2) debu
<!-- landmarks:end -->
