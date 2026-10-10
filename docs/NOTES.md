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

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629 (drain_en flags.botl mirror, DOSET weaponstatus home); all 3 probe sessions moved.
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split).
- **Trail stash (D-3739 latent):** JS per-level vs C arrival-clear; rings agreed — not the cause.
- **exercise residuals (D-3776 Next):** 95225=dart-trap:1372; 95346=stale-Upolyd@rehumanize; 95204=Antimagic. Do not re-derive.
## Don't re-check (≤15)

- D-1790…D-3776 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3776) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3776.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3776 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1), same step/path as the JS throw; prefix RNG 12535/12535, 16513/16513) — do not re-port mlevel_tele_trap/migrate/ledger for them; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3776: conditional return (thitu/D-3426 shape): `if (gameover) { await finish_losehp_done(); if (gameover) return 0; }`, then fall through to learnit/stop/no Named: none new — mbhitm verified whole vs C `:1597–1703` arm-for-arm this iteration (wake/seemim
- D-3775: all 8 hero Poison_resistance predicates now read flats || uprops intrinsic/extrinsic (the mon.js:296 / region.js:1224 / invent hero_Fire house shape), Named: H-flat bitmask writers/manipulators deliberately untouched (eat corpse-grant `H|=FROMOUTSI
- D-3774: dotravel_target tail restructured to C order (same shape as the proven continue_run, D-3583): recompute travel→guess with UNSURE messages, apply `foun Named: none new (dotravel_target ported whole; findtravelpath_bfs NOPATH-without-found: left as-i
- D-3773: m_canseeu now reads the live `Invis()` youprop export (`js/timeout.js:1735`, `(H||E)&&!B` over flats+uprops) — `if (Invis() && !perceives) return fals Named: none (macro ported whole: live C arm + Invis + perceives + Underwater + couldsee, all live
- D-3772: js/hack.js only: (1) Stunned arm → `if ((u.HStun | 0) || u.Stunned) return true;` (canonical shape; Confusion arm untouched — already dual-flat, no ev Named: (1) domove closed-door arms (js/cmd.js:6681/:6693) still read u.Stunned-only (same mirror 
- D-3771: (1) `if (status === MMOVE_DIED) return 1;` immediately after the recalc, C-cited (skips idle isgd/Hallu + PHASE FOUR + quest_talk/cuss exactly like C) Named: none new (dochug's pre-existing demon_talk `else if` omit (C :823–824, JS :2804 comment) s
- D-3770: potion.js both gates now call the live eat.js `Unaware()` export (already imported :186, used :900/:1157 — no new edge) with C cites; deleted `Unaware Named: partial Unaware clones left as-is (usleep arm works; faint+prefix arms dead): zap.js:4595,
- D-3769: (1) deleted the flush + C-cite comment; dropped flush_topl_more from the local dynamic import (still used at :410/:1456/:2051 — no module-edge change) Named: (1) gold_detect's flush_topl_more (js/detect.js:2051) keeps the same spurious pattern with
- D-3768: none — no js/. Named: none (nothing ported; the writer question is CLOSED — no writer exists for C-fatal inputs 
- D-3767: none — no js/ (docs-only entry). Named: none — nothing ported, nothing omitted.
- D-3766: both lookups now via `objs[i]?.oc_name_idx ?? i` / `objs[i]?.oc_descr_idx ?? i` with an objclass.h cite; no new import. Named: none new (rnd_otyp_by_namedesc stays ported whole; migrate_orc / migrate_to_level omits un
- D-3765: gate is now `> 2 * MAX_EGG_HATCH_TIME` using the live `js/const.js:1364` export (= 200, C-exact), added to eat.js's existing const.js import (:110; AL Named: none new (fprefx otherwise whole per D-2159; the uhitm.js:1355 / dogmove.js:245 stale inli
- D-3764: gate is now `weapon.oclass === WEAPON_CLASS || is_weptool(weapon)` — the live `js/wield.js:116` export, already imported at `js/uhitm.js:53` (no new e Named: none new (thitmonst's D-2804 tmiss/miss wording + unstuck placebc omits stand; known_hitum
- D-3763: deleted the invented live-cloak arm in all 3 clones (stored HDisplaced/intrinsic/extrinsic checks kept); doc cites youprop.h + the gamestate desync wi Named: none new (nhl_gamestate's update_inventory display-refresh omit stands — screens match thr
- D-3762: `js/questpgr.js` only — three bodies verbatim from quest.lua (`cat -A`-verified: double space after «hill.»/«%H.» in Val text and synopsis; conversion Named: remaining role bodies no corpus session reaches (firsttime Cav/Mon; goal_first Hea/Mon/Rog
<!-- landmarks:end -->
