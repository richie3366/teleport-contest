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
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629 (drain_en flags.botl mirror, DOSET weaponstatus home); all 3 probe sessions moved.
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split).
## Don't re-check (≤15)

- D-1790…D-3824 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3824) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3824.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3824 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1), same step/path as the JS throw; prefix RNG 12535/12535, 16513/16513) — do not re-port mlevel_tele_trap/migrate/ledger for them; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3824: re-scored the 4 rows through the sanctioned scorer only (`verify.mjs --fn randomize_gem_colors,slimed_to_death,doname_base` rewrote the working rows l Named: none (no port).
- D-3823: prep reads the live `mhitu.js` `Levitation()`/`Flying()` exports (added to pray.js's existing mhitu edge — `imports.mjs` ALREADY, no new edge); altara Named: none new (mhitu `Levitation()` reads H/E flats only, no slot — complete today since every 
- D-3822: `js/display.js` mon_warning calls the live `hero_Warning` (now exported from `js/invent.js` — display.js already imports invent.js, no new edge; one c Named: the remaining flats-only property clones (the 294-clone drift) are not swept here — only t
- D-3821: `js/hack.js:1954` losehp records `game._losehp_gameover = true` only when it flips gameover from false (the marker it invents); `js/end.js:2013–2016`  Named: `finish_losehp_done` still prints «You die...» with plain `pline` where C uses `urgent_pli
- D-3819: new arm in domove after the IRONBARS chew, in C order: obstructed && !bars && !uinwater (:1017 gate preserved — its message stays deferred) && tunnels Named: none new — door (:1090) / boulder (:1227) tunnels arms, Passes_walls+may_passwall (:1014),
- D-3818: `tail()` deleted; the Upolyd/normal arms are chain members after the steed arm in C order (`:943–947` cites); the chain ends in bare `return ECMD_OK`  Named: none new (domonability otherwise whole per D-3402/D-1898/D-2069; all 19 callees live per b
- D-3817: `js/dungeon.js` show_overview now `await select_menu_pick_none(entries)` (live `js/invent.js:3265` export — C-exact lmax/npages/morestr/fullscreen/dis Named: none new in the probe path (show_overview display now the shared C-exact path; why==-1 PIC
- D-3816: `js/invent.js` only, no new imports (flush_topl_more + hates_silver already file-scoped): `await flush_topl_more()` after menu geometry, before paint  Named: none new in the probe path (doattributes stays split with its standing omissions; the :192
- D-3815: triple ported in C order — `rnd(10)` first, then Blind() (live invent.js) / Levitation-in-:576-split-storage-shape || Is_airlevel || Is_waterlevel (co Named: none (rottenfood now whole vs C :1813–1851; D-3293 foodword deferral lifted, ledger "simpl
- D-3814: D-1849 pattern — import the export: `sticks` added to monmove.js's existing engrave.js edge (line 17; imports.mjs ALREADY, no new edge — the monmove↔e Named: none new.
- D-3813: one arm in serMon's replacer — `if (key === 'ebones') return val;` + C cites (fixed data schema, never a live struct; children are scalars + oldalign  Named: none new (savemon split otherwise unchanged: mtemplit, relative-time edog wire, mw flag D-
- D-3812: `js/display.js` only — piletop-generic is now C-exact (`> OFF && < OFF+FIRST_OBJECT-1`); normal_object gains C's third disjunct (`|| glyph_is_normal_p Named: none new (OBJ-generic OFF+1..16 staying inside glyph_is_normal_object is the documented ou
- D-3811: the inline is now the in-file `hero_Antimagic(u)` mirror (flats+uprops, no worn arm — the D-3790 shape, same file, no new import; insight.c:1523-1524  Named: none new in this arm (from_what whole per D-3805; the Blind painter whole; disclose/doattr
- D-3810: both arms now read the flat OR the file-local slot union (`u.Levitation || Levitation_st()`, `u.Flying || Flying_st()` — flats OR uprops H/E, either b Named: u_simple_floortyp C `:1835` air-read still uses the dead flats (`u.Levitation || u.Flying`
- D-3809: Flying() now the D-1085 union (flats OR slot H/E, either blocked source; steed kept; u.Flying early-true kept), the _statusLine2 arm shape with a youp Named: vers always '' (flags.showvers/status_version); cond order is tty field order not C emissi
<!-- landmarks:end -->
