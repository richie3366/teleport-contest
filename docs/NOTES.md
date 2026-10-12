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
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split); gulpmu engulf vision_off ungate (D-3863, stale-'I' unmap).
- **level_tele Knight residual (D-3862):** 578306 s859 wall ──┐ C-11 vs JS-8, 0 cells differ — wall lighting/color writer.

## Don't re-check (≤15)

- D-1790…D-3871 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3871) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3871.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3871 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1), same step/path as the JS throw; prefix RNG 12535/12535, 16513/16513) — do not re-port mlevel_tele_trap/migrate/ledger for them; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3871: js/getline.js only — one `vpline_flush_vision();` before the initial `await paint();` in getlin and get_ext_cmd (C order: recalc-consume, then flush/p Named: none — the custompline-vision arm is now complete; the rest of hooked_tty_getlin stays spl
- D-3870: `js/end.js` only — one field: `game.urole?.malenum` → `game.urole?.mnum`, with a `you.h:247` cite. Named: none new in this unit — savelife is otherwise whole vs C `:704–756` (D-3260/D-2191/D-0868)
- D-3869: `js/cmd.js` only — deleted the JS-only `newsym(newx, newy)`; comment now cites C `:2969`. Named: none new in this unit — the removed paint had no C counterpart (C prints dest via vision_r
- D-3868: js/getpos.js — signature back to C's 3 params; fallback replaced by a `:914–920` cite; loop-top comment updated. js/pager.js — drop the `brief_at` arg Named: none new in this unit — the removed path had no C counterpart on any caller (C getpos take
- D-3867: js/mkobj.js only — write_timer OBJECT/MONSTER arms derive the id from the live pointer when present (C `:2524`/`:2539`); the numeric arg_id is written Named: none new (write_ls light analogue untouched — bones lights install stays named at getlev_b
- D-3866: js/polyself.js only — one `await newuhs(false)` at the C `:436` position (after the uhp<=0/dead-arm check, before newform), with C cite. Named: none new — newman now whole vs C `:335–466` (retouch_equipment(2) `:463` live via the arti
- D-3865: js/getpos.js only — one `curs_win_map(cx, cy)` before `await auto_describe(cx, cy)` in the loop-top autodescribe branch, with the C cite (`:1144–1148` Named: none new (do_screen_description terrain-browse miss verified C-exact both sides — not a ga
- D-3864: js/bones.js only (behavior): getlev_bones installs `restore_timers(info.timers, true, moves−omoves)` after rest_track (C `:1144` position in the JSON  Named: bones lights install (restore_light_sources + relink_light_sources ghostly, light.c — sepa
- D-3863: js/mhitu.js only — Hallu gate removed at the engulf site (D-3807 departure precedent: C vision.c:820-836 has no Hallu gate); the extracted loop now ru Named: none new — the extracted loop is the full C control==2 loop (empty-next equivalence verifi
- D-3862: both arms now write `cmap_idx_to_glyph(S_stone)` (id GLYPH_CMAP_STONE_OFF, renders blank — reglyph write-shape precedent); the tweak detection is `mem Named: none new (unmap_object now whole vs C :409–437; the stale "dark-room S_room→S_stone" doc o
- D-3861: no `js/` change. Named: (none — no port; docs-only entry, no Ledger bullet — gulpmu stays ported D-2462/D-3846.)
- D-3860: `js/detect.js` only — 3× `nomul_clear()` → `nomul(0)` with C-line cites; deleted the clone (its `_repeat_search=false` kept nothing: the flag has no ` Named: none in the ported arms (all 3 find sites now call C's nomul(0) verbatim).
- D-3859: js/potion.js only — `dippable_lets_raw(inacc)`/`dippable_lets(inacc)` skip `inacc(o, false)` (C `:2223–2224`); `dip_hands_ok(obj, inacc)` threads it ( Named: none new (pre-existing clone gaps per D-3386 — canned CMDQ_INT count prefix, reassign/in_d
- D-3858: js/potion.js only — 3× `if (Unaware()) talk = false;` with C-line cites, using the live eat.js export already imported at :187 (no new edge; make_deaf Named: none new — guard-only fix; make_deaf/make_hallucinated/make_blinded already suppress via l
- D-3857: js/attrib.js only — after losehp in the i==0 arm, `await finish_maybe_wail()` (C-order drain; dynamic `./hack.js` import already used twice in this fu Named: none new — the drain covers showdamage/rehumanize/wail (finish_maybe_wail); `_losehp_needs
<!-- landmarks:end -->
