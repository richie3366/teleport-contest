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
  `port-coverage.mjs` MISSING/THIN count falls ⇒ the picker is wrong, human
  revisits. Phase-2 rows (`[measure]`, parks, `hidden-proxy queue`) stay
  closed meanwhile; the corpus is guarded by REACH in `verify.mjs`.
  Everything below this bullet is phase-2 context — do not act on it now.

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

- D-1790…D-2808 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only. Do not read 12/12 as the 614/940 fortress (last full board `086317c06`, replaced at `38d6c8a36`).
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2808.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2808.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2808: After `ux`/`uy` and before `vision_full_recalc`, call `placebc` when `Punished()` and `uchain.where` is not `OBJ_FLOOR`. Named: `mhitm.c:1255` `slept_monst` is still three local clones that clear `ustuck` (`js/mhitm.js
- D-2807: One `bhito` in that C order. Named: `debugpline1` "pulsate" (`zap.c:2168`) has no JS function; the stray bypass bit is still c
- D-2806: One `addinv_core0` in that C order. Named: `addinv_core2` still omits `set_moreluck`.
- D-2805: One `arti_invoke` in that C order. Named: `retouch_equipment` callers stay at the old comments: `attrib.c:1360` (`js/attrib.js:825`)
- D-2804: Restart of the hit chain in C order. Named: `tmiss` still calls local `miss_missile` rather than `zap.c` `miss` (`is_plural` wording).
- D-2803: Both functions restarted in C order. Named: A null `uarmc` / `uarmf` still returns after `clear_worn` (C would dereference).
- D-2802: `Resists_Elem` in `js/mondata.js` in that C order. Named: `resists_fire`, `resists_cold`, `resists_elec`, `resists_disint`, `resists_acid`, `resists
- D-2801: `MELT_ICE_AWAY` is `SHRINK_GLOB + 1` (8). Named: `nhlobj.c:591` `l_obj_timer_start` is still not a JS call.
- D-2800: Import `Flying` from `mhitu.js` and delete the local clone. Named: `do.c:1776` descend `else if (Flying)` is still sticky `u.Flying` at `js/do.js:1887`.
- D-2799: Map none → 0, bold → terminal `ATR_BOLD` (2), underline → `ATR_UNDERLINE` (4), inverse → `ATR_INVERSE` (1). Named: `s_atr2str` italic falls through to underline when `ZH` is empty, and blink falls through 
- D-2798: Restart of `fracture_rock` in C order, async because `You` and `breakobj` can reach `--More--`. Named: `poly_obj` shop-anger bill (`zap.c:1965–1986`) stays named at `js/zap.js:5255`.
- D-2797: One exported `mhitm_ad_drst` in C order. Named: `resists_poison_mm` still omits artifact and worn poison resistance (same gap as `js/zap.j
- D-2796: Restart of `thitu` in C order. Named: `apply.c:3197–3205` is inside `#if 0` and is not a live caller.
- D-2795: Restart of `mkcorpstat` in C order. Named: `rloco` at `mkobj.c:2082` (`x == 0 && y == 0`) stays uncalled.
- D-2794: Restart of `start_timer` in C order. Named: `objnam.c:5223` wish-corpse `ZOMBIFY_MON` timer still deferred at `js/readobjnam.js:1678` 
<!-- landmarks:end -->
