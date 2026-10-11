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

- D-1790…D-3806 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3806) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3806.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3806 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1), same step/path as the JS throw; prefix RNG 12535/12535, 16513/16513) — do not re-port mlevel_tele_trap/migrate/ledger for them; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3806: moved the visibility gate above the destination test in C order (combined gate, then dest-return, then else-if enqueue); the couldseeOnly D-0702 shape Named: none new (findtravelpath split otherwise unchanged; travel_test_move / travel_delay_curren
- D-3805: the three arms ported in C order with C cites: birth arm first (uroleplay.blind/deaf); Blindfolded_only arm after what_gives (youprop.h:97 macro inlin Named: none new (from_what now whole vs C :904–1001; the " pair of "/STRANGLED tail unchanged, sh
- D-3804: invletter_value exported from js/invent.js (body untouched); all seven clone lets builders sort by it with a sortloot_cmp `:473` cite — five ALREADY i Named: none new (compactify/compact_lets already C-exact incl. the suggested>5 gate, verified not
- D-3803: the else arm now mirrors `itimeout(xtime)` into uprops[HALLUC].intrinsic TIMEOUT bits beside the flat (D-3802 make_confused shape + cite), on both ons Named: none new (artifact.c:794 SPFX_HALRES sync inline + its talk-pline delta stand per the make
- D-3802: both CONFUSION writers now keep the slot ≡ the flat in the house shapes: nh_timeout arm mirrors `next` + the set-to-1 into uprops TIMEOUT bits (BLINDE Named: STUNNED/FUMBLING/FAST/WOUNDED_LEGS dedicated arms keep their existing shapes (no corpus bl
- D-3801: D-1849 pattern — import the export: `hit` added to the existing static `mthrowu.js` edge (zap.js:284, imports.mjs ALREADY, no new edge), 6 call sites  Named: none new.
- D-3800: one line in the sibling shape — `if (mon) await makemon_appear_msg(mon, cc.x, cc.y, NO_MM_FLAGS);` + C cite; `makemon_appear_msg` already imported (mu Named: none new.
- D-3799: `case SDOOR:` in terrain_glyph now checks `loc.arboreal_sdoor` first and returns the TREE arm's tty verbatim (DEC `g`/ASCII `#`, CLR_GREEN, no seenv g Named: none new. wall_angle's SDOOR-arboreal arm stays live-but-defensive (mirrors C :3600 exactl
- D-3798: `await finish_maybe_wail()` (`:825`) after the done-check, before `learnit` (C order: the wail inside losehp precedes learnit/stop_occupation/nomul/ma Named: none new.
- D-3797: the C :1091–1094 gate in the exact sibling shape (`if ((mdef.mhp | 0) > 0) return hitflags;` + AGR_DIED arm) in both ungated tails. Named: none new (the shared tail's :1118 non-kill return shape and the POLY arm's `hitflags || HI
- D-3796: `!u.Blind` → `!Blind()` (live invent.js youprop reader, already imported at mthrowu.js:43); `!u.Fumbling` → `!Fumbling()` (live attrib.js union, added Named: none new (u_catch_thrown_obj now whole vs C :532–550; Confusion/Stunned flats stay per the
- D-3795: `await finish_maybe_wail()` after each site's done-check (zhitu `:2319–2322` oil shape; already imported at zap.js:256, no new edge), each C-cited. Named: none new, except lightdamage's pre-existing fatal tail (C done-noreturn; JS returns dmg wi
- D-3794: (1) mzapwand restarted C-whole in C order: impossible guard :170–172 wired (live import), !canseemon :174–181 (range/near + Soundeffect(se_zap,100) +  Named: none new (mzapwand now whole vs C :165–191; mergable now whole vs C :4379–4498).
- D-3793: one line: `reg.n_monst = nMonst;` with C cite. Named: none new (rest_regions' architectural omits stand per ledger D-2639: NHFILE binary format,
- D-3792: moved the two monster lines before `restore_waterlevel` with C-order comments (`:1181–1221` before `:1226`; bubbles-after-monsters). Named: none new (save.js dorecover order consciously unchanged — see Callers; getlev NHFILE body 
<!-- landmarks:end -->
