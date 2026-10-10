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

- D-1790…D-3791 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3791) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3791.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3791 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1), same step/path as the JS throw; prefix RNG 12535/12535, 16513/16513) — do not re-port mlevel_tele_trap/migrate/ledger for them; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3791: freeinv_drop is now C-whole in C order: deleted the C-absent `obj.owornmask = 0`, added `obj.pickup_prev = 0` (`:1406`) and `update_inventory()` (`:14 Named: none new (freeinv_drop's nobj/extract shape + gold block pre-date this fix and carry no de
- D-3790: delete the worn fallback (uarmc/uarm arms + now-dead CLOAK_OF_MAGIC_RESISTANCE const; GRAY_* consts stay — live use in the dragon-scale→mons map); fla Named: none new (youprop Antimagic now mirrored uprops-only in all 3 JS readers; tutorial gamesta
- D-3789: dedicated arms now dispatch at their property index inside the single loop (`if (TIMEOUT_DEDICATED.has(p))` → `if/else if (p === …)` in 13, 14, 15, 16 Named: none new (nh_timeout stays ported whole; the usptime-haze post-loop position stays per the
- D-3788: the :2002-2006 prot gate (uprops H||E, matching the adjacent makemon set_mimic_sym gate that just ran inside makemon + all sibling PfSC readers; S_MIM Named: none new (the :2002-2006 gate is now whole across all 6 JS mirrors of the block; cham-MONS
- D-3787: AD_STON arm now C-whole in C order: protector/wornitems (+W_ARMG iff MON_WEP), resists+protector gate (`~0` NO_TOUCH shape mirrors hitmm), poly_when_s Named: none new (passiveum's prior omits stand: AD_ACID erode_armor/acid_damage; AD_ENCH drain_it
- D-3786: gate is now the canonical live `Upolyd(u)` (const.js:3216, C you.h:554), already imported in potion.js (:140, used at 5 live sites — no new edge), wit Named: mon.c:4600 healmon→healup youmonst arm (mon.js:2329 no-op; pre-existing documented omit in
- D-3785: delete the C-absent `await flush_screen(1)` (js/detect.js:1378) + doc-comment fix (why the deferral must survive: wiz_map zero-window). Named: none new (map_redisplay now C-exact :94–102; wiz_map save/zero/restore whole per its body;
- D-3784: obj_glyph(curr) burn per allowed item in both arms (sorted + unsorted, before items.push, C-cited; glyph discarded), obj_glyph added to the existing d Named: engulfer mon_to_glyph burn (C :1157–1158; no probe reaches swallowed+hallu query — retaine
- D-3783: all 3 flat-only Aggravate readers now read the union (D-3775 Poison house shape), each C-cited: dog.js abuse_dog gate (the cliff); monmove.js local Ag Named: H-flat bitmask writers/manipulators deliberately untouched (eat corpse/pray/sit — storage 
- D-3782: losestr conditional return (survived death falls through to the :246 max-HP cut; 95309/95201/95246 → PASS). Named: none new (whole vs C :221–270).
- D-3781: drain in C order between losehp and the done-gate: `await finish_maybe_wail()` (`js/polyself.js:2039`; showdamage→rehumanize→wail, each flag-gated/ide Named: (1) other sync-losehp call sites that continue to Upolyd/RNG-sensitive code without draini
- D-3780: all 4 sites now call the canonical `Upolyd()` (`js/const.js:3216`, C you.h:554), added to the existing const.js import (`imports.mjs --can`: ALREADY,  Named: none new (explode's D-1925 omits stand — You_hear prefixes, golemeffects, resists_magm sca
- D-3779: dismiss via the shared `await dismiss_nhw_menu()` (corner → erase_menu_or_text/docorner, no burns; the docrt arm stays for offx==0, like C). Named: none new (use_container split + omits stand; erase_menu_or_text/docorner/docrt untouched; 
- D-3778: `js/minion.js` only — extend the existing makemon.js import (`imports.mjs --can`: ALREADY, no new edge) with `makemon_appear_msg`; await it with final Named: none new (msummon/summon_minion otherwise whole per D-3250; makemon_appear_msg's set_msg_x
- D-3777: gate is now `if (game._losehp_needs_done)` — THIS losehp's death (set atomically with gameover in losehp js/hack.js:1950–1951), the house flag-idiom ( Named: (1) The late-resolving savelife (gas death #11's done() pending across the turn boundary —
<!-- landmarks:end -->
