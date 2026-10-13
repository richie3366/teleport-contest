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

- **Eval-order TDZ (D-2349):** no static polyself edge at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** all shipped incl. D-3891 Armor_on house-find_ac (Priest-582714 s1376 AC → PASS).
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split); gulpmu engulf vision_off ungate (D-3863, stale-'I' unmap); mbodypart/m_move/mfndpos/searches (D-3906, soko-prize linkage live).
- **nhl_gamestate (D-3885 UNPORTABLE, park supersedes D-3884):** steed-impossible needs malloc reuse (restore.c:1193 sole site; gmst-restored u.usteed vs fresh Sfi mon); pristine recorder flaky at s1166 (glibc heap abort vs byte-identical 1238 — ASLR). JS flush gates all open (hook-probed); vpline never fired. Never a port row; session can never PASS faithfully. D-3905 re-derived fresh, park stands (painter live display.js:9620; zero churn in steed/do.js since D-3895; falsifiers unfired).

## Don't re-check (≤15)

- D-1790…D-3920 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3920) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3920.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3920 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3920: js/questpgr.js only (data): Val goal_next body verbatim from quest.lua (TEXT EQUAL; `%ns` shipped) + doc role list. Named: remaining goal_next bodies no session reaches (7 roles: Cav/Hea/Mon/Rog/Sam/Tou/Wiz).
- D-3919: wired the C term in C order (uswallow → ustuck-hugs → Levitation), mirroring the canonical's exact expression: `sticks` via the monmove.js re-export ( Named: usteed P_RIDING < P_BASIC (C :201), uundetected ceiling-hider (C :203) — pre-existing, unt
- D-3918: hurtle guard reads live uball (youprop.h:77), never dead u.Punished; probe PASS. Named: none new.
- D-3917: js/questpgr.js only (data): Arc gotit body verbatim from quest.lua (node byte-compare TEXT EQUAL + SYN EQUAL true incl. double space after «body!»; %o Named: remaining gotit role bodies no corpus session reaches (Bar/Cav/Hea/Kni/Mon/Pri/Ran/Sam/Tou
- D-3916: js/mkobj.js only (callee): replace_object OBJ_MINVENT + OBJ_CONTAINED predecessor-splice arms in C shape (INVENT-arm house idiom), FREE no-op + exotic Named: none new — poly_obj now whole vs C `:1702–1989` (all former ledger omits shipped); replace
- D-3915: js/pray.js only — `if (u.uprops?.[STRANGLED]) u.uprops[STRANGLED].intrinsic = 0;` after the flat clears (C :394 cite + youprop.h:110 + sibling pattern Named: Priest-587210 s1319 list_genocided (own future cliff via regen, not this arm).
- D-3914: js/questpgr.js only (data): Rog gotit body verbatim from quest.lua (node byte-compare TEXT EQUAL true incl. double spaces after «out.»/«hands.»; %o/%n Named: remaining gotit role bodies no corpus session reaches (Arc/Bar/Cav/Hea/Kni/Mon/Pri/Ran/Sam
- D-3913: js/questpgr.js only (data): Cav locate_first body verbatim from quest.lua (node byte-compare TEXT EQUAL true incl. double space after «ground.» and em Named: remaining locate_first role bodies no corpus session reaches (Hea/Kni/Mon/Rog/Sam/Tou/Val;
- D-3912: js/zap.js only — after `finish_losehp_done()`, return only while `gameover` is still true; otherwise `useupall(otmp)` (live invent.js:5066 export, no  Named: none new — backfire now whole vs C `:2604–2614` (in_use, explode pline, d(spe+2,6), losehp
- D-3911: PICK_NONE analog now mirrors query_objlist in C order: sortflags computation (query_objlist `:822–832` shape; sortloot 'l' default, sortpack, PETRIFY  Named: engulfer mon_to_glyph burn (C `:1157–1158`, Hallu-only — shared with the live query_objlis
- D-3910: all three restarted as the C body in C order: zero map, reverse fobj into placement order with OBJ_FREE each, `game.fobj = null`, re-place oldest-firs Named: none new — find_lev_obj now whole vs C `:70–107` (zero, reverse+FREE, re-place, gated fixu
- D-3909: deleted the trailing `newsym(ox, oy)` + its doc claim (exact C behavior: no paint here); updated the turns.md #tip row note; added focused test `scrip Named: none (deletion only; tipcontainer stays whole vs C `:3688–3841`).
- D-3908: js/options.js only — the `finally` now writes `game.give_opt_msg = true` (C `:8733` cite); the `prevGive` save removed (dead); entry FALSE (`:8722`) a Named: none new.
- D-3907: js/objnam.js only — the else arm now draws `r = rn2(TTSZ - 1)` (C `:1503` cite); local `const TTSZ = tintxts.length` after the table (eat.js:380 patte Named: none new.
- D-3906: inline soko_prize_oid/otyp + nomerge=1 stamp in both loaders (minend house shape: lazy `game.context.achieveo`, `!ao.soko_prize_oid` guard), with C's  Named: none new.
<!-- landmarks:end -->
