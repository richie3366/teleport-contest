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

- D-1790…D-3832 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3832) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3832.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3832 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1), same step/path as the JS throw; prefix RNG 12535/12535, 16513/16513) — do not re-port mlevel_tele_trap/migrate/ledger for them; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3832: one gate between adtyping and knockback (js/mhitu.js:3215–3219): `if (game.program_state?.gameover) return mhm.hitflags;` with the C cite — the establ Named: none new in the gated arm.
- D-3831: js/pager.js only: scope `set_bot_disabled(true)` (already imported — no new edge) around the line-649 grid-sync flush, try/finally restoring. Named: none new (paint_corner_nhw_menu:3074 pre-paint flush keeps its shape — its select_menu cal
- D-3830: vpline completion-tail chaining (js/display.js only): every entry links `_vpline_tail` synchronously at entry; a contended entry (in_pline set) awaits Named: none new in vpline (C body intact; raw_print path stays a named omit).
- D-3829: `push` → `unshift` with the C cite; one-word stale-order comment repairs in js/detect.js:2284, js/dogmove.js:750, js/pager.js:2923 (+ scripts/doggoal- Named: none new in maketrap (otherwise whole per D-3437; mk_trap_statue/maybe_finish_sokoban stan
- D-3828: one `if (Upolyd(game.u)) return false;` before the race fallback (Upolyd already imported in display.js — no new edge), with the C cites. Named: none new (race fallback retained for !Upolyd pre-set_uasmon windows; set_uasmon PROPSET ot
- D-3827: D-3822/D-3825 pattern — import the live `Levitation`/`Flying` exports from mhitu.js (`imports.mjs --can display.js mhitu.js Levitation` VERDICT: SAFE, Named: `feel_can_reach_floor` = can_reach_floor(FALSE) minus: usteed P_RIDING < P_BASIC (C :201),
- D-3826: analog builds `[hdr, "", ...]` and bakes C's prefixes into item text: first-item gold keeps `$` (query_objlist `:1133–1135`), else menu letters a..z/A Named: none new (INCLUDE_HERO fake rows + sortloot order in the analog and invdisp polish stand f
- D-3825: D-3822 pattern — import the live `Blind()` export from invent.js (imports.mjs VERDICT: SAFE, hoisted function, cycle-safe) and read it in the `%x` arm Named: none new (convert_arg otherwise whole per D-1649 audit).
- D-3824: re-scored the 4 rows through the sanctioned scorer only (`verify.mjs --fn randomize_gem_colors,slimed_to_death,doname_base` rewrote the working rows l Named: none (no port).
- D-3823: prep reads the live `mhitu.js` `Levitation()`/`Flying()` exports (added to pray.js's existing mhitu edge — `imports.mjs` ALREADY, no new edge); altara Named: none new (mhitu `Levitation()` reads H/E flats only, no slot — complete today since every 
- D-3822: `js/display.js` mon_warning calls the live `hero_Warning` (now exported from `js/invent.js` — display.js already imports invent.js, no new edge; one c Named: the remaining flats-only property clones (the 294-clone drift) are not swept here — only t
- D-3821: `js/hack.js:1954` losehp records `game._losehp_gameover = true` only when it flips gameover from false (the marker it invents); `js/end.js:2013–2016`  Named: `finish_losehp_done` still prints «You die...» with plain `pline` where C uses `urgent_pli
- D-3819: new arm in domove after the IRONBARS chew, in C order: obstructed && !bars && !uinwater (:1017 gate preserved — its message stays deferred) && tunnels Named: none new — door (:1090) / boulder (:1227) tunnels arms, Passes_walls+may_passwall (:1014),
- D-3818: `tail()` deleted; the Upolyd/normal arms are chain members after the steed arm in C order (`:943–947` cites); the chain ends in bare `return ECMD_OK`  Named: none new (domonability otherwise whole per D-3402/D-1898/D-2069; all 19 callees live per b
- D-3817: `js/dungeon.js` show_overview now `await select_menu_pick_none(entries)` (live `js/invent.js:3265` export — C-exact lmax/npages/morestr/fullscreen/dis Named: none new in the probe path (show_overview display now the shared C-exact path; why==-1 PIC
<!-- landmarks:end -->
