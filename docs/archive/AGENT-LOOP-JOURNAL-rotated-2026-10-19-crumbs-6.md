# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-19 — D-4078 do.c goto_level descent: JS read the phantom u.Flying flat instead of the youprop.h Flying macro, so a hero flying by worn extrinsic got «You descend the stairs.» instead of «You fly down the stairs.» (3 sessions → FULL PASS)

**C locus:** do.c goto_level `:1776–1779` `else if (Flying) { if (flags.verbose) You("fly down %s.", …) }`; youprop.h:253–255 Flying = (HFlying || EFlying || flying steed) && !BFlying over u.uprops[FLYING].
**JS:** js/do.js (1 condition + comment); scripts/goto-level-flying-descent.test.mjs (new: prefix replay to s1308 asserts «You fly down the stairs.» — RED pre-fix «You descend the stairs.--More--», GREEN post-fix).
**Change:** `else if (Flying())`.
**Verify:** `node scripts/verify.mjs --fn goto_level` → PASS syntax (js/do.js) · rule2 · reach 38/38 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS (no hidden movement line: the rows are owned by dokick.c down_gate). Direct `hidden-proxy score --ids` on the 3 down_gate rows: 3 → FULL PASS (sweep-Ranger-50255200, sweep-Ranger-610049, sweep-Rogue-50456012). `hidden-proxy sweep goto_level,down_gate` → 678 baseline-PASS sessions re-run, 0 regressed.
**Named:** other bare `u.Flying` reads left as-is (most already OR the slot readers): dig.js:1642, apply.js:3247, do_wear.js:3792, eat.js:1164, music.js:135, polyself.js:2522, sit.js:549, mon.js:2835, display.js:7588.
**Next:** auto_describe shop-corpse ×3; extcmd_via_menu ×4; choose_disco_sort ×4; wish_history_menu ×3.

## 2026-10-19 — D-4077 mkmaze.c movebubbles Plane of Air: C struct-copies air_pos into every cell (seenv 0), JS set only glyph/typ/lit — a stale seenv let an engulfed hero's travel validation succeed, dropping autodescribe's « (no travel path)» (10 sessions → FULL PASS)

**C locus:** mkmaze.c movebubbles `:1653–1654` `levl[x][y] = air_pos` — `{S_cloud glyph, AIR, seenv 0, flags 0, horizontal 0, lit 1, waslit 0, roomno 0, edge 0, candig 0}` every turn; vision then re-marks only what the hero sees, and engulfed it sees nothing. hack.c is_valid_travelpt → findtravelpath(TRAVP_VALID) needs `levl[nx][ny].seenv || (!Blind && couldsee(nx, ny))` for the target, which fails → getpos.c auto_describe `:657–658` appends « (no travel path)».
**JS:** js/mklev.js (+12 in movebubbles' air arm); scripts/movebubbles-air-pos-seenv.test.mjs (new: prefix replay to s371 asserts the « (no travel path)» suffix — RED pre-fix, GREEN post-fix).
**Change:** the air arm now zeroes the other struct rm fields too, as C's struct copy does: seenv, flags/doormask/wall_info (C's one flags field), horizontal, waslit, roomno, edge and candig.
**Verify:** `node scripts/verify.mjs --fn movebubbles` → PASS syntax (js/mklev.js) · rule2 · reach 57/57 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS (no hidden movement line: the rows are owned by auto_describe). Direct `hidden-proxy score --ids` over the 15 auto_describe/air-elemental rows: 10 → FULL PASS (worldtour Barbarian-50458507, Barbarian-51150080, Tourist-49950060, Archeologist-51250008, Healer-50056034, Samurai-50350064, Wizard-50056035, Wizard-50056057, Wizard-587300; hallu-Wizard-51450068), 5 unchanged (other shapes). `hidden-proxy sweep movebubbles,auto_describe` → 668 baseline-PASS sessions re-run, 0 regressed.
**Named:** auto_describe rows left: shop corpse names (Archeologist-50455533, Monk-50550061, Rogue-50555525: C «a watchman/priest corpse» vs JS another corpse), worldtour-Archeologist-50950008 («unexplored area» vs «unexplored»), symset-Rogue-51250079 (same topline, map diff).
**Next:** auto_describe shop-corpse ×3; extcmd_via_menu ×4; choose_disco_sort ×4; down_gate «fly» ×3.

## 2026-10-19 — D-4076 options.c dotogglepickup: JS interpolated buf into pline's format, so a '%' (food) pickup_types class hit vsnprintf as «% o» and printed «Autopickup: ON, for 0bjects.» (4 sessions → FULL PASS)

**C locus:** options.c dotogglepickup `:9262–9272` — Sprintf builds buf, then `pline("Autopickup: %s.", buf)` passes it as an argument; pline.c vpline only formats the fmt string, so a '%' inside buf is literal.
**JS:** js/options.js (1 call + comment); scripts/dotogglepickup-percent-arg.test.mjs (new: prefix replay to s461 asserts «Autopickup: ON, for % objects.» — RED pre-fix «for 0bjects.», GREEN post-fix).
**Change:** `pline('Autopickup: %s.', buf)` — C's call shape.
**Verify:** `node scripts/verify.mjs --fn dotogglepickup` → PASS syntax (js/options.js) · rule2 · `verify dotogglepickup: 4 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS. `hidden-proxy sweep dotogglepickup` → 664 baseline-PASS sessions re-run, 0 regressed.
**Named:** other JS plines that template-interpolate runtime text into fmt (the same shape) were not audited; only this site reached the corpus.
**Next:** near-pass groups: extcmd_via_menu ×4, choose_disco_sort ×4, auto_describe «(no travel path)» ×4, down_gate «fly» ×3, wish_history_menu ×3.

## 2026-10-19 — D-4075 insight.c list_genocided/list_vanquished: JS simplified C's lone-entry `"ynq\033a"` to 'ynq', so the hidden 'a' answer rang the bell and the «Do you want a list of species genocided?» prompt stayed up while C listed «Genocided species:» (5 sessions → FULL PASS)

**C locus:** insight.c list_genocided `:3040–3041` `yn_function(buf, (ngone > 1) ? "ynaq" : "ynq\033a", defquery, TRUE)`; list_vanquished `:2836–2839` builds the same `ynqchars + "\033a"`. tty_yn_function prints the choices only up to the ESC but accepts any char in resp, so a lone entry still takes 'a' (listed without the sort menu).
**JS:** js/insight.js (two choice strings + comments); scripts/list-genocided-hidden-a.test.mjs (new: prefix replay to s74 asserts «Genocided species:» — RED pre-fix (still at the yn prompt), GREEN post-fix).
**Change:** both sites pass `'ynq\x1ba'`; the "simplified" notes (header + list_vanquished doc) were removed.
**Verify:** `node scripts/verify.mjs --fn list_genocided` → PASS syntax (js/insight.js) · rule2 · `verify list_genocided: 5 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. `hidden-proxy sweep list_genocided,list_vanquished` → 659 baseline-PASS sessions re-run, 0 regressed.
**Named:** none.
**Next:** near-pass groups: extcmd_via_menu ×4, choose_disco_sort ×4, dotogglepickup «%» ×4 («Autopickup: ON, for 0bjects.»), auto_describe «(no travel path)» ×4, down_gate «fly» ×3.

## 2026-10-19 — D-4074 mcastu.c cursetxt/castmu/summon: JS read the phantom u.Displaced/HDisplaced/EDisplaced (and u.Invis) flats instead of the youprop.h macros — a worn cloak of displacement never sets them, so casters aiming at the displaced image said «points at you, then curses» (11 sessions → FULL PASS)

**C locus:** mcastu.c cursetxt `:75–76` `else if (Displaced && (mtmp->mux != u.ux || mtmp->muy != u.uy))`; the same Invis/Displaced macro pair in castmu's cast message («at your displaced image») and the summon-nasty «by/around your displaced image» arm. youprop.h:204 `Displaced (HDisplaced || EDisplaced)` over u.uprops[DISPLACED].
**JS:** js/mcastu.js (+12/−5: one import, three reader swaps + comments); scripts/cursetxt-displaced-live.test.mjs (new: prefix replay to s461 asserts «points and curses at your displaced image» — RED pre-fix «points at you, then curses.», GREEN post-fix).
**Change:** the three sites call the live readers — monmove.js `Displaced` (imported as `hero_Displaced`, the same reader set_apparxy uses) and the already-imported timeout.js `Invis` (`hero_Invis`, as cursetxt already did).
**Verify:** `node scripts/verify.mjs --fn cursetxt` → PASS syntax (js/mcastu.js) · rule2 · `verify cursetxt: 11 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` · reach 80/80 (of 96) → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. `hidden-proxy sweep cursetxt,castmu,mcast_summon_mons` → 648 baseline-PASS sessions re-run, 0 regressed.
**Named:** other phantom Displaced flat readers left as-is: js/invent.js:5962 (enlightenment-side), js/timeout.js:1466, js/eat.js:2030 (unions with uprops, so equivalent), js/do_wear.js:1478; mcastu.js insects_Displaced is a local union clone.
**Next:** near-pass groups: list_genocided ×5 («Genocided species:» vs the «Do you want a list…» prompt), extcmd_via_menu ×4, choose_disco_sort ×4, dotogglepickup «%» ×4, auto_describe «(no travel path)» ×4.

## 2026-10-19 — audit 2906–2914 @ee925d524: review D-4065..D-4073 (7A/2D/0Q, 0 Must-fix) + full rescore 687/1075 (0 PASS→FAIL)

**Reviews:** 2906 litroom Hallu update-loop replay (2+1+2 at HEAD; WITH-DEBT: trap.c:5121 / options.c:5371 `vision_recalc(2)` sites have no JS replay) · 2907 guardian-angel Conflict() (exact 1) · 2908 hcolor clones deleted (2 PASS; WITH-DEBT: do_name.js hcolor/rndcolor read the sticky-mirror `Hallucination`, which differs from youprop.h:120 only under the pager.c:1185 override) · 2909 waterbody_name (vacuous verify; both probes PASS at HEAD) · 2910 dodip pair_of (exact 1) · 2911 init_mapseen (3 PASS) · 2912 buzzer one field (16↔16 sites; zhitu 1+0+1) · 2913 getpos exitgetpos (owned rows NO MOVEMENT as stated, owner-null rows held) · 2914 detached gbuf flush (exact 12+1). No C-wrongs, no queue prepend.
**Score:** public 44/44 (792838/792838 RNG, 11405/11405 screens, 93+0.38/turn); held-out 34/44 (judge 07:18Z, no newer run); board 687/1075 pre-archive (+4: trek-Priest-587119, wish-Priest-640030, zapfest-Monk-51050084, zapfest-Wizard-50950084; 0 PASS→FAIL) → 648/1035, RNG 99.1 %, screens 96.5 %; tier → 854 + 169 + 5367. Ledger snapshot; seeded sample lesshungry/Shirt_off/badman/vision_reset/chk_okdoor 5/5 hold.
**Next:** port slot pops the regenerated cliffs head; Must-fix empty.
