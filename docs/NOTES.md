# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Marathons (architect, 2026-10-09 — §10.19):** held-out (18/44, RNG
  41.7 %, rngSteps 92.4 %) loses RNG to early cliffs in *long* sessions the
  344-step corpus never recorded; the marathon cohort finds them (50/160,
  RNG 74.7 %). Falsifier: `hidden-proxy families` long-family RNG % rising
  ~20 iters while `leaderboard.mjs` RNG % stays ~41.7 % ⇒ fix the generator
  (diff against `seed0360`/`seed4500`/`seed0030` key streams). Falsified:
  2026-10-06 "corpus already records the cliffs" (board +40, held-out flat).
  The bullets below are live writer leads for parked cliff owners.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms. Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** all shipped incl. D-3891 Armor_on house-find_ac (Priest-582714 s1376 AC → PASS).
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split); gulpmu engulf vision_off ungate (D-3863, stale-'I' unmap).
- **nhl_gamestate (D-3885 UNPORTABLE, park supersedes D-3884):** steed-impossible needs malloc reuse (restore.c:1193 sole site; gmst-restored u.usteed vs fresh Sfi mon); pristine recorder flaky at s1166 (glibc heap abort vs byte-identical 1238 — ASLR). JS flush gates all open (hook-probed); vpline never fired. Never a port row; session can never PASS faithfully.

## Don't re-check (≤15)

- D-1790…D-3897 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3897) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3897.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3897 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3897: js/eat.js only — `if (game.program_state?.gameover) return M_ATTK_MISS;` immediately after each of the three done(DIED) calls (C-cited comments; lifes Named: none new in the gated arms.
- D-3896: Knox arm `else if (Is_knox(uz) && use_decgraphics()) color = CLR_YELLOW;` in C bank order (mines → hell → knox → soko → main); DEC gate mirrors C (ASC Named: none new.
- D-3895: none (no `js/` — park; the trigger needs C-heap address reuse — see Measure). Named: n/a.
- D-3894: `js/do.js` only — the checkpoint arm now applies the save.c:493–494 mark (same `0 <= lev <= maxledgerno()` guard; creates the slot when absent) after  Named: in save_currentstate's checkpoint arm — LFILE_EXISTS half + checkpoint image (dead data in
- D-3893: `js/hack.js` only — helper now `if (rg?.boulder) return true; return glyph_to_obj(rg?.glyph) === BOULDER;` (live `display.js` export, C `:902–913`; `i Named: none new — moverock_core stays whole vs C `:348–638`.
- D-3892: `js/display.js` only — deleted `|| !last` with the `:2249` + no-lastset-in-premap cite. Named: none new — reveal_terrain_getglyph stays whole vs C `:2167–2288` (swallowed/mon/object/tra
- D-3891: `js/do_wear.js` only — deleted the house `find_ac()` call; doc comment now cites `:887–906` + the D-0810 rule (uac refreshes at the allmain once-per-i Named: none new — Armor_on now whole vs C `:887–906`.
- D-3890: `js/mcastu.js` only — `:69` predicate now reads `hero_Invis()` (live `timeout.js` Invis, D-1999 reader, same one set_apparxy/m_move use; `imports.mjs  Named: none new — cursetxt stays whole vs C `:63–85` (undirected/Invis/mimic/uundetected/Displace
- D-3889: `js/do_wear.js` only — suit-arm message now interpolates `surface(u.ux, u.uy)` with the `:3226–3229` cite; `import { surface } from './sit.js'` (new e Named: none new — the pre-existing `armor_doff_simple_name` vs `*_simple_name` polish stays as th
- D-3888: one `for (const it of selected)` loop in menu order (`select_menu_pick_any` returns `items.filter`, already menu order) dispatching per pick — help →  Named: none new — every pick arm keeps its shipped body (bool pline D-0499, handler/othr dispatch
- D-3887: `js/cmd.js` only — moved the `if (blocksMove(newx, newy))` bump block verbatim (incl. the D-1800/scen-ride-Knight-94415 nomul note) to directly after  Named: none new in the bump/doorway arms.
- D-3886: `js/muse.js` only — unseen arm now `else if (!hero_Deaf()) { Soundeffect(se_mon_chugging_potion, 25); await You_hear('a chugging sound.'); }` in C ord Named: none new — mquaffmsg now whole vs C `:293–302` (canseemon/observe/pline_mon arm, Deaf gate
- D-3885: `js/potion.js` only — `was !== now` → `was === now` with the `:464` cite. Named: none new — make_glib now whole vs C `:461–468` (XNOR botl, set_itimeout, uarmg update_inve
- D-3884: none (no `js/` — park; writer needs a GBUF/flush-order campaign: hook-probe JS-1166 (flush-run? bot-values? dirty-set? floated-vpline vs :1720 microta Named: n/a.
- D-3883: `js/pickup.js` only — `:1817` predicate now reads live `Blind()` (already imported, line 23; `imports.mjs --can`: ALREADY, no new edge) with the youpr Named: none new — pickup_object stays whole vs C `:1802–1888` (impossible-count, Blind observe, u
<!-- landmarks:end -->
