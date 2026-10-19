# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-19 — D-4094 detect.c reveal_terrain_getglyph: JS modelled glyph_at's region overlay only for newsym's ACCESSIBLE/pool arm, missing the `_map_location(x, y, 1)` tail that show_region()s any visible region — a poison cloud over a tree drew as the tree in the terrain view (1 session → FULL PASS)

**C locus:** detect.c reveal_terrain_getglyph `:2208` `glyph = glyph_at(x, y)`, and with keep_traps the gascloud is not stripped (`:2225–2229`). display.c newsym `:993–998` overlays a region only when `ACCESSIBLE(lev->typ) || (reg->visible && is_pool_or_lava)`; otherwise, with no shown monster/warning/I, `_map_location(x, y, 1)` runs, ending `if (show && !Blind && (_ml_reg = visible_region_at(x, y))) show_region(_ml_reg, x, y)` (`:470–471`) with no terrain gate.
**JS:** js/display.js (+8); scripts/reveal-terrain-cloud-maploc.test.mjs (new: prefix replay to s1279 asserts row 11 carries `\e[92m#` — RED pre-fix (green tree), GREEN post-fix).
**Change:** an else-arm sets glyph_shows_cloud when the cell is seen, a region covers it, the hero isn't Blind, and no monster/I is shown there (kind not 'mon'/'invisible'), which is C's _map_location tail.
**Verify:** `node scripts/verify.mjs --fn reveal_terrain_getglyph` → PASS syntax (js/display.js) · rule2 · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS. Direct `hidden-proxy score --ids` over the 4 terrain-view rows: sweep-Monk-49950093 → FULL PASS; symset-Healer-50555020 and the two getpos rows unchanged. `hidden-proxy sweep reveal_terrain_getglyph,reveal_terrain` → 701 baseline-PASS sessions re-run, 0 regressed.
**Named:** symset-Healer-50555020 s478 (C remembers a trap `^` where JS shows an object `%`, a memory-layer difference).
**Next:** symset-Healer-50555020 trap/object memory; town-Tourist-630002 doclassdisco; worldtour-Wizard-610136 blind timeout.

## 2026-10-19 — D-4093 uhitm.c hmon_hitmon_do_hit: JS's early cream-pie/blinding-venom block skipped C's `saved_oname = cxname(obj)` snapshot, whose xname observe_object()s the object, so a thrown splash of venom never reached disco[] and `\` dropped «Venoms / splash of venom» (1 session → FULL PASS)

**C locus:** artifact.c invoke_fling_poison → dothrow.c throwit → thitmonst `:2256–2259` → hmon → uhitm.c hmon_hitmon_do_hit `:1410–1411` `Strcpy(hmd->saved_oname, cxname(obj))` → objnam.c xname_flags `:628` `if (!Blind && !gd.distantname) observe_object(obj)` → o_init.c discover_object(…, FALSE, TRUE) marks oc_encountered and adds the type to disco[]; only then does `:1429` misc_obj run the BLINDING_VENOM arm.
**JS:** js/uhitm.js (+4); scripts/hmon-venom-observe.test.mjs (new: prefix replay to s565 asserts «splash of venom» in the discoveries list — RED pre-fix (absent), GREEN post-fix).
**Change:** the early block calls `cxname(obj)` first, C's do_hit snapshot order, before the msleeping/can_blnd work.
**Verify:** `node scripts/verify.mjs --fn hmon_hitmon` → PASS syntax (js/uhitm.js) · rule2 · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS (no hidden movement line: the row is owned by doclassdisco). Direct `hidden-proxy score --ids`: sweep-Caveman-50050055 → FULL PASS; town-Tourist-630002 unchanged (s228, other shape). `hidden-proxy sweep hmon_hitmon,hmon,thitmonst` → 700 baseline-PASS sessions re-run, 0 regressed.
**Named:** town-Tourist-630002 doclassdisco s228 (multi-segment, not yet diffed).
**Next:** town-Tourist-630002 doclassdisco; reveal_terrain ×2; worldtour-Wizard-610136 blind timeout.

## 2026-10-19 — audit 2924–2933 @12a20993c: review D-4083..D-4092 (9A/1D/0Q, 0 Must-fix) + full rescore 749/985 (0 PASS→FAIL)

**Reviews:** 2924 extcmd_via_menu prompt style + blank (5+1) · 2925 wish_history_menu prompt style (exact 3) · 2926 corner-menu dismiss drops flush_screen (C erase_menu_or_text corner arm = docorner only; 3 PASS) · 2927 show_region integer cloud glyph (exact 2; its board commit also re-scored 39 stale reserve rows to PASS, unclaimed) · 2928 altfeedback Blind()/hero_Invisible, Invisible_you clone deleted (exact 2) · 2929 blind timeout !EBlinded (exact 2) · 2930 is_innate/innately over uprops (WITH-DEBT: board flips **11**, D-log says 13; 12/12 role/race table props mapped) · 2931 Hunger uprops gate (exact 5; inline macro copy) · 2932 See_invisible gates, both copies (exact 3) · 2933 flooreffects pit-crush done() inline (exact 2).
**Score:** public 44/44 (792838/792838 RNG, 11405/11405 screens, 87+0.36/turn); held-out 34/44 (judge 07:18Z, no newer run); board 749/985 pre-archive (+80 vs 669) → 700/936, active tier 688/859, RNG 99.47 %, screens 98.7 %; tier → 859 + 65 + 5466. Ledger snapshot; seeded sample offer_too_soon/optfn_sortloot/flip_vault_guard/corpse_intrinsic/generate_stairs_find_room 5/5 hold (sortloot do_handler is a documented split, dispatched at options.js:3754/9832).
**Next:** port slot pops the regenerated cliffs head; Must-fix empty. Last attribute-screen leftover: worldtour-Wizard-610136 blind timeout 103 vs 106.

## 2026-10-19 — D-4092 do.c flooreffects boulder pit-crush: C's fatal losehp runs done() inline, before deletedwithboulder's reset_utrap, but JS deferred done to drop_boulder_on_player's later drain, so disclosure lost «You were trapped in a pit {6}.» (2 sessions → FULL PASS)

**C locus:** do.c flooreffects `:231–234` `losehp(Maybe_Half_Phys(rnd(15)), "squished under a boulder", NO_KILLER_PREFIX); goto deletedwithboulder;`: a fatal losehp calls done(DIED) inline (disclosure inside, never returns). `:257–261` deletedwithboulder: delfloortrap + `if (u.utrap && u_at(x, y)) reset_utrap(FALSE)` runs only after a lifesave.
**JS:** js/do.js (+10); scripts/flooreffects-crush-done-inline.test.mjs (new: prefix replay to s158 asserts «You were trapped in a pit {6}.» — RED pre-fix (absent), GREEN post-fix).
**Change:** right after the squish losehp, flooreffects drains finish_maybe_wail + finish_losehp_done (the read.js/do.js drain idiom) and returns on gameover. A lifesave falls through to deletedwithboulder as in C, and read.js's later drain becomes a no-op.
**Verify:** `node scripts/verify.mjs --fn flooreffects` → PASS syntax (js/do.js) · rule2 · reach 5/5 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS. Direct `hidden-proxy score --ids`: sokoban-Ranger-50351023, sokoban-Samurai-50356023 → FULL PASS. `hidden-proxy sweep flooreffects,drop_boulder_on_player` → 744 baseline-PASS sessions re-run, 0 regressed.
**Named:** last attribute-screen leftover: worldtour-Wizard-610136 blind timeout 103 vs 106.
**Next:** worldtour-Wizard-610136 blind timeout; doclassdisco ×2; reveal_terrain ×2.

## 2026-10-19 — D-4091 insight.c attributes_enlightenment See_invisible: both JS copies (final disclosure and ^X doattributes) gated on the u.HSee_invisible/u.ESee_invisible flats, but a worn ring of see invisible sets uprops[SEE_INVIS].extrinsic, so «You saw invisible …» was dropped (3 sessions → FULL PASS)

**C locus:** insight.c attributes_enlightenment `:1571–1580` `if (See_invisible) { if (!Blind) enl_msg(You_, "see", "saw", " invisible", from_what(SEE_INVIS)); … }`; youprop.h:152 See_invisible ≡ (HSee_invisible || ESee_invisible) over uprops[SEE_INVIS].
**JS:** js/invent.js (+10/−2 over two arms); scripts/enlightenment-see-invis-uprops.test.mjs (new: prefix replay to s1178 asserts the ring line — RED pre-fix (absent), GREEN post-fix).
**Change:** both gates also read `u.uprops[SEE_INVIS].intrinsic || .extrinsic`. A scan of the enlightenment range for other flat-only `(u.H… | 0) || (u.E… | 0)` gates found only these two.
**Verify:** `node scripts/verify.mjs --fn attributes_enlightenment` → PASS syntax (js/invent.js) · rule2 · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. Direct `hidden-proxy score --ids` over the 6 remaining attribute rows: 3 → FULL PASS (sweep-Wizard-51150073, trek-Wizard-49950063, worldtour-Wizard-578301), 3 unchanged. `hidden-proxy sweep attributes_enlightenment,doattributes` → 741 baseline-PASS sessions re-run, 0 regressed.
**Named:** «You were trapped in a pit {6}.» ×2 (sokoban Ranger-50351023/Samurai-50356023); blind timeout 103 vs 106 (worldtour-Wizard-610136).
**Next:** pit «{6}» ×2; doclassdisco ×2; reveal_terrain ×2.

## 2026-10-19 — D-4090 insight.c status_enlightenment Hunger: JS tested only the u.HHunger/u.EHunger flats, but a worn ring of hunger sets uprops[HUNGER].extrinsic, so disclosure dropped «You hungered rapidly because of your ring of hunger.» (5 sessions → FULL PASS)

**C locus:** insight.c status_enlightenment `:1190–1193` `if (Hunger) { if (magic || cause_known(HUNGER)) enl_msg(You_, "hunger", "hungered", " rapidly", from_what(HUNGER)); }`; youprop.h:145–147 Hunger ≡ (uprops[HUNGER].intrinsic || .extrinsic).
**JS:** js/invent.js (+5/−1); scripts/enlightenment-hunger-uprops.test.mjs (new: prefix replay to s153 asserts the ring-of-hunger line — RED pre-fix (absent), GREEN post-fix).
**Change:** the gate also reads `u.uprops[HUNGER].intrinsic || .extrinsic` (eat.js Hunger shape; that helper isn't exported).
**Verify:** `node scripts/verify.mjs --fn status_enlightenment` → PASS syntax (js/invent.js) · rule2 · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. Direct `hidden-proxy score --ids` over the 11 remaining attribute-screen rows: 5 → FULL PASS (wish-Valkyrie-50152027, worldtour-Wizard-50850040, sweep-Archeologist-51150009, sweep-Healer-50055041, worldtour-Monk-50450080), 6 unchanged. `hidden-proxy sweep status_enlightenment` → 736 baseline-PASS sessions re-run, 0 regressed.
**Named:** attribute-screen leftovers: «You were trapped in a pit {6}.» ×2 (sokoban Ranger-50351023/Samurai-50356023), see-invisible lines ×3 (sweep-Wizard-51150073, trek-Wizard-49950063, worldtour-Wizard-578301), blind timeout 103 vs 106 (worldtour-Wizard-610136).
**Next:** pit «{6}» ×2; see-invisible ×3; doclassdisco ×2; reveal_terrain ×2.
