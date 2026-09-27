# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (one line each, class +
falsifier; proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Do not list them
here again. Live hypotheses only:

- **Breadth phase (architect, 2026-09-18 — Constitution §10.17):**
  hypothesis: held-out (11/44, RNG 26.6 %, screens 50 %) is bounded by
  *missing C*, not by the corpus residuals — 2,345/4,868 pinned-C functions
  MISSING/THIN, held-out sessions are wizard-mode tours that walk into them.
  Falsifier: `node scripts/leaderboard.mjs` after ~30 whole-function
  iterations (≈ iteration 3190); held-out passing/RNG % not moving while
  the ledger's declared-ported count rises (`docs/ledger/SNAPSHOTS.tsv`,
  one line per audit) ⇒ the picker is wrong, human
  revisits. Phase-2 rows (`[measure]`, parks, `hidden-proxy queue`) stay
  closed meanwhile; the corpus is guarded by REACH in `verify.mjs`.
  Everything below this bullet is phase-2 context — do not act on it now.
- Audit 1937–1945 (`4ce18a4e0`…`dceb8a7b3`): 9 ACCEPT. No new Must-fix. Do not re-open the ACCEPT set. Prior audit 1928–1936 stays 7 ACCEPT, 2 QUALITY-RISK (both shipped: D-2979 `68cdee2bb`, D-2978 `4ce18a4e0`). `piousness` and `corpse_intrinsic` stay parked Stale. Seeded `show_glyph` was `ported` with no JS symbol; set back to `unknown`.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution, not bodies:**
  `hidden-proxy queue` now prints the differing screen row (e.g. row 23
  `AC:6` vs `AC:10`; row 4 «You were held by a pit fiend» vs «You weren't
  hungry»). The value's writer is the port; the painter is proven faithful
  (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5 Wizard `doopen_indir` + W6 Caveman overload-gate remain as corpus-residual Open rows (detail in D-2420); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 Healer-92107 `mhitm_ad_cold_u` extra destroy return; W2 Satiated pair = eat-progress `uhs`/botl timing — both are corpus-residual Open rows (detail in D-2425). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-2995 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only. Do not read 12/12 as the 614/940 fortress (last full board `086317c06`, replaced at `38d6c8a36`).
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2995.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2995.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2995: File-local `m_next2m` in C order at `js/muse.js:268` (mirrors same-file `m_next2u`, C staticfn): `DEADMONSTER || mon_offmap` short-circuit as `(mhp|0) Named: none for `m_next2m` — every arm ported, every callee live, the sole caller wired.
- D-2994: Full C-order async body at `js/engrave.js:989`. Named: none for `u_can_engrave` — every arm ported, every callee live, the sole caller wired.
- D-2993: Full C-order body at `js/uhitm.js:4555`: reveal, AD_STCK stick arm, wakeup, blind map tail. Named: none — every arm ported, every callee live, all 6 callers wired.
- D-2992: Ported the pair in C order in `js/options.js`, with the doset/allopt wiring. Named: None.
- D-2991: new `js/alloc.js` (216 lines, zero imports — leaf module, no cycle possible) in C order: `forceAlignedLength` helper for the `:48–52` macro (`sizeof ( Named: heaplog `fprintf` arms (`nhalloc :158–160`, `nhrealloc :180–193` incl. the `:184` `'<'`/`'
- D-2990: file-local `get_room_loc(c, croom)` in C order with per-arm `:line` cites — `{x,y}` holder mutation like same-file `somexy`, `rn2` span `hx-lx+1` / `h Named: none for `get_room_loc` — every arm ported, both callees live, the sole C caller wired in 
- D-2989: `pfxfn_font` ported whole in C order (sync; `duplicate` reads `duplicateOpt`, `atoi` is file-idiom `opt_atoi`, get_val writes via `set_optbuf` holder, Named: `bad_negation`/`complain_about_duplicate` stay file-idiom stubs (config-error sink, map-na
- D-2988: One exported `getversionstring` keeps that C order. Named: No compiled arm of `getversionstring` is omitted.
- D-2987: One exported `save_currentstate` keeps that C order. Named: `currentlevel_rewrite` (`do.c:1347`), `bufon` (`sfstruct.c:414`), `savelev` (`save.c`), an
- D-2986: One exported `argcheck` keeps that C order and calls `options.js` `match_optname`, `dungeon.js` `dupstr`, `display.js` `raw_printf`, and `hacklib.js`  Named: `dump_version_info` (`version.c:494`), `dump_enums` (`earlyarg.c:705`), `dump_glyphids` (`
- D-2985: One exported `align_str` keeps that C order, including `"unaligned"` and `"unknown"`. Named: No arm of `align_str` is omitted.
- D-2984: One exported `botl_score` keeps that C order. Named: No arm of `botl_score` is omitted.
- D-2983: One exported `rnd_offensive_item` keeps that C order and calls `worn.js` `which_armor` and `do_wear.js` `hard_helmet` (`imports.mjs --can` SAFE, hoist Named: No arm of `rnd_offensive_item` is omitted.
- D-2982: One exported `check_wornmask_slots` keeps that C order. Named: No arm of `check_wornmask_slots` is omitted.
- D-2981: One exported `You_see` keeps that C order and calls `eat.js` `Unaware` and `invent.js` `Blind` (`imports.mjs --can` ALREADY). Named: No arm of `You_see` is omitted.
<!-- landmarks:end -->
