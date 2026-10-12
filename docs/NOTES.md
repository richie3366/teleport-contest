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
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629; make_glib XNOR botl shipped D-3885 (Barb-582613 s1083 HP → PASS). Open: Priest-582714 s1376 AC:10-vs-4 (find_ac/armor writer).
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split); gulpmu engulf vision_off ungate (D-3863, stale-'I' unmap).
- **level_tele Knight residual (D-3862):** 578306 s859 wall ──┐ C-11 vs JS-8, 0 cells differ — wall lighting/color writer.
- **nhl_gamestate (D-3885 UNPORTABLE, park supersedes D-3884):** steed-impossible needs malloc reuse (restore.c:1193 sole site; gmst-restored u.usteed vs fresh Sfi mon); pristine recorder flaky at s1166 (glibc heap abort vs byte-identical 1238 — ASLR). JS flush gates all open (hook-probed); vpline never fired. Never a port row; session can never PASS faithfully.

## Don't re-check (≤15)

- D-1790…D-3890 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3890) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3890.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3890 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1), same step/path as the JS throw; prefix RNG 12535/12535, 16513/16513) — do not re-port mlevel_tele_trap/migrate/ledger for them; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3890: `js/mcastu.js` only — `:69` predicate now reads `hero_Invis()` (live `timeout.js` Invis, D-1999 reader, same one set_apparxy/m_move use; `imports.mjs  Named: none new — cursetxt stays whole vs C `:63–85` (undirected/Invis/mimic/uundetected/Displace
- D-3889: `js/do_wear.js` only — suit-arm message now interpolates `surface(u.ux, u.uy)` with the `:3226–3229` cite; `import { surface } from './sit.js'` (new e Named: none new — the pre-existing `armor_doff_simple_name` vs `*_simple_name` polish stays as th
- D-3888: one `for (const it of selected)` loop in menu order (`select_menu_pick_any` returns `items.filter`, already menu order) dispatching per pick — help →  Named: none new — every pick arm keeps its shipped body (bool pline D-0499, handler/othr dispatch
- D-3887: `js/cmd.js` only — moved the `if (blocksMove(newx, newy))` bump block verbatim (incl. the D-1800/scen-ride-Knight-94415 nomul note) to directly after  Named: none new in the bump/doorway arms.
- D-3886: `js/muse.js` only — unseen arm now `else if (!hero_Deaf()) { Soundeffect(se_mon_chugging_potion, 25); await You_hear('a chugging sound.'); }` in C ord Named: none new — mquaffmsg now whole vs C `:293–302` (canseemon/observe/pline_mon arm, Deaf gate
- D-3885: `js/potion.js` only — `was !== now` → `was === now` with the `:464` cite. Named: none new — make_glib now whole vs C `:461–468` (XNOR botl, set_itimeout, uarmg update_inve
- D-3884: none (no `js/` — park; writer needs a GBUF/flush-order campaign: hook-probe JS-1166 (flush-run? bot-values? dirty-set? floated-vpline vs :1720 microta Named: n/a.
- D-3883: `js/pickup.js` only — `:1817` predicate now reads live `Blind()` (already imported, line 23; `imports.mjs --can`: ALREADY, no new edge) with the youpr Named: none new — pickup_object stays whole vs C `:1802–1888` (impossible-count, Blind observe, u
- D-3882: none (measurement iteration — ~40 calls without new C-state; the live state matches and the three differing values are all stale-display written earli Named: n/a.
- D-3881: `js/potion.js` only — the :3486 call site now uses the live `Yobjnam2(obj, 'glow')` with the C `:2462` cite; deleted `Yobjnam2_pot`, leaving a D-3360- Named: none new (H2Opotion_dip stays whole vs C `:1497–1589`; `aobjnam_pot`/`Tobjnam_pot`/`otense
- D-3880: `js/mkobj.js` only — deep-copy the track slots after the key loop (`mtmp2.mtrack = mtmp.mtrack.map((s) => ({ x: s?.x | 0, y: s?.y | 0 }))`, Array.isAr Named: none new in save_mtraits (now whole vs C `:2157–2195`).
- D-3879: none — measurement iteration, no `js/` changed. Named: n/a.
- D-3878: `js/mklev.js` only — capture the makemon result and apply the `:2125` clobber (`if (mtmp) mtmp.female = 0`) with the `:3299/:3349–3357` pipeline cites Named: (1) medusa-mirror hand-rolled makemon sites (Medusa herself, Pelias-style named spawns dro
- D-3877: `js/mklev.js` only — reorder to C order: find_montype_gender (lspo parse, stays first) → `sp_amask_to_amask` (:1943) → extinct/G_GONE checks (:1949–19 Named: none new. (Inline create_monster bodies in level loaders — `placeNamed`/ghost/Medusa-famil
- D-3876: `js/trap.js` only — `const luck = ((game.u?.uluck | 0) + (game.u?.moreluck | 0))` with a you.h:464 cite (trap.js:6711 idiom; the chest-trap `Luck_ches Named: none new.
<!-- landmarks:end -->
