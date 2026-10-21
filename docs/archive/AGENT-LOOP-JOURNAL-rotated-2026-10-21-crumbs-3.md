# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-21 — D-4185 priest.c pri_move clears `avoid` for a peaceful priest when the hero is `Invis` (`:205–206`). `Invis` is the youprop.h macro: (HInvis || EInvis) && !BInvis. JS pri_move (shk.js) read the flat `game.u?.Invis`, which nothing writes, so an invisible hero never cleared `avoid`. move_special then skipped every NOTONL square (on a line with the hero). In Moloch's Sanctum the high priest went to (57,13) where C goes to (57,12) on the hero's row. Fifteen steps later a barbed devil's mtrack candidate (57,12) is free in JS and taken in C, so JS draws an extra `rn2(28)` in m_move. Same C file, same idiom: intemple's sanctum-voice test read the flat `u.Hallucination` (`:438`)

**C locus:** priest.c pri_move `:177–216` (Invis arm `:205–206`), intemple `:410–538` (`:438`); youprop.h Invis / Hallucination; shk.c move_special NOTONL avoid.
**JS:** js/shk.js pri_move; js/priest.js intemple.
**Change:** `Invis()` and `Hallucination()` (live youprop exports) at those two sites.
**Verify:** - `node scripts/verify.mjs --fn distfleeck,pri_move,intemple` → syntax · rule2 · hidden: verify distfleeck: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS (scen-sweep-Rogue-51650031: moved to step 838 of 839, RNG 49785/49785; verify labels the owner-null row "js-throw", but `show` has error null) · reach distfleeck 80/80, pri_move 80/80, intemple 14/14 REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS.
**Named:** none in pri_move / intemple. The same flat-Invis idiom remains in shk.c code (shk.js `:594–597` sticky-u.Invis helper, `:2253` inline).
**Next:** the Rogue session's last screen (step 838): JS row 1 «Since you were in wizard mode, the score list will not be checked.» vs C blank (end.c, a new owner). Otherwise the regenerated cliffs head.

## 2026-10-21 — D-4184 sp_lev.c create_monster ends every des.monster with `mtmp->female = m->female`, then a peaceful override plus `set_malign` (`:2125–2129`). load_bar_loca's local placeMon stand-in did neither: it set `mpeaceful = 0` without resetting malign, and kept makemon's random female for class-only specs. Bar-loca's 14 `peaceful=0` ogres (Bar-loca.lua `:80+`) are coaligned with a chaotic Barbarian, so makemon had made them peaceful with malign −9 (`-3*max(3,|−3|)`). Turned hostile, C gives malign 3 and JS kept −9, so killing one cost 12 alignment points

**C locus:** sp_lev.c create_monster `:1925–2187` (tail `:2125–2129`); lspo_monster female default `:3343–3356`; mon.c set_malign; dat/Bar-loca.lua `:80–102`.
**JS:** js/mklev.js load_bar_loca placeMon.
**Change:** placeMon writes `mtmp.female = female` always (0 for class specs, as C `:3355–3356`), and wraps the peaceful override with `set_malign(mtmp)` (C `:2128–2129`).
**Verify:** - `node scripts/verify.mjs --fn peace_minded,create_monster` → syntax · rule2 · hidden: verify peace_minded: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (scen-questwalk-Barbarian-51660025: PASS) · reach peace_minded 80/80 REACH-OK · reach create_monster 23/23 REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** placeMon is still a stand-in for create_monster. Its asleep / name / appear / amask arms are unused by Bar-loca.lua, which sets only id/class, coord and peaceful.
**Next:** the Open — cliffs head after regeneration (distfleeck, scen-sweep-Rogue-51650031 s616).

## 2026-10-21 — D-4183 sp_lev.c lspo_engraving always ends by writing `ep->guardobjects = guardobjs` (`:3930–3934`). That value is FALSE unless the Lua table names `guardobjects`, and no dat/*.lua does. This undoes make_engr_at's in_mklev rule that a level-gen "Elbereth" guards objects (engrave.c:446–447). Four hand-written JS loaders (Mon-loca, soko1-1, soko1-2, castle) called make_engr_at directly and skipped that tail. Their Elbereth kept guardobjects=1, so onscary() made the square scary while an object lay on it. Mon-loca.lua's own comment says the Elbereth is "a modest effort to prevent xorns from eating the tins". In C the effort fails, and a xorn walks onto the spinach tins and eats them

**C locus:** sp_lev.c lspo_engraving `:3881–3936` (tail `:3930–3934`; guardobjects default `:3910`, nowipeout = !degrade `:3909`); engrave.c make_engr_at `:446–447`; monmove.c onscary `:296–303`; dat/Mon-loca.lua `:62–67`, soko1-1.lua `:110`, soko1-2.lua `:112`, castle.lua `:151`.
**JS:** js/mklev.js load_mon_loca, load_soko1_1, load_soko1_2, load_castle.
**Change:** each of the four sites keeps the returned `ep` and applies lspo_engraving's tail: `guardobjects = 0`, `nowipeout = 0` (degrade default TRUE). The coder/croom path of lspo_engraving was not used, because these loaders don't set `game.gc.coder` / `splev_xstart`. The file's existing per-site idiom (`:8404`, `:16861`) was used instead.
**Verify:** - `node scripts/verify.mjs --fn obj_resists,lspo_engraving` → syntax · rule2 · hidden: verify obj_resists: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (scen-questwalk-Monk-51660016: PASS) · reach obj_resists 80/80 REACH-OK · reach lspo_engraving 24/24 REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none. The castle/soko Elbereths also carry a cursed scare-monster scroll, so the change there only shows once that scroll leaves the square.
**Next:** the Open — cliffs head after regeneration (peace_minded, scen-questwalk-Barbarian-51660025 s230).

## 2026-10-20 — Grow #20 fresh 51650000 ×160: 156/160 (97.5 %) on arrival; +4 failing folded; questwalk coverage family (level audit F4)

**Fresh:** 156/160 (97.5 %), RNG 99.83 %, screens 99.75 %. Worst: sweep 8/10 (distfleeck RNG s616, trapeffect_sqky_board s609), hallu 8/9 (findit s666), symset 8/9 (env-only). Gap to held-out 18.0 pts → no calibration.
**Coverage:** new wave-3 `questwalk` (scripts/scenario-gen.mjs): enter the quest at `-loca` by ^V menu, then quest-relative ^V 2..6 and stairs. 26 sessions @51660000 (2 per role): 24/26 PASS on arrival; first corpus builds of all 17 quest fillers + Kni-loca. Folded failing: Barbarian-51660025 peace_minded s230 (RNG), Monk-51660016 obj_resists s97 (RNG).
**Board:** 668/701 PASS; 684 active + 29 reserve + 5863 archive. Cliffs head now obj_resists / peace_minded / distfleeck (RNG losers).

## 2026-10-20 — D-4182 sp_lev.c load_special runs the same epilogue head after every level script (`:6464–6471`: link_doors_rooms, remove_boundary_syms, ensure_way_out when "inaccessibles", map_cleanup). JS copied it into each per-level loader unevenly (link_doors_rooms 16/126, remove_boundary_syms 15/126, map_cleanup 17/126). A new load_special_head() ports the head once, and all 126 loaders now run it right before their wallification. Level-audit Must-fix F3: none of the head draws RNG except ensure_way_out (minetn-6 only, order kept), so all 108 corpus-built levels stay RNG-exact

**C locus:** sp_lev.c load_special `:6454–6502` (head `:6464–6471`), link_doors_rooms `:1121–1142`, remove_boundary_syms `:1015–1038`, ensure_way_out `:5216+`, map_cleanup `:327–356`; sp_lev.c lspo_finalize_level `:6014–6064` (des path, already whole in JS).
**JS:** js/mklev.js load_special_head (new) + 120 call sites (126 loaders via soko_load_epilogue / load_fakewiz_tower) + loader header comments.
**Change:** - `load_special_head(check_inaccessibles)` in C order next to load_special_proto. It gates ensure_way_out on the argument or `game.gc.coder.check_inaccessibles`, the same gate as lspo_finalize_level.
**Verify:** - `node scripts/verify.mjs --fn load_special,link_doors_rooms,remove_boundary_syms,map_cleanup,ensure_way_out --full` → syntax · rule2 · reach REACH-OK ×5 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** (1) hellobjects/hellmonsters (defined but unused in lua — D-4019 standing); (2) hells[6] ice grow/filter fidelity (D-4019 standing); (3) Valkyrie residual mcast_weaken_you@493 — later owner, its own future row. The epilogue tail (wallification → flip_level_rnd → solidify → fixup_special → premap) stays per loader, because loaders place level-specific lregions between flip and fixup.
**Next:** level-audit F4 is grow-slot work (quest fila/filb walk family). Port slots return to the Open — cliffs head (xkilled, scen-questtour-Archeologist-50361020 s400).

## 2026-10-20 — D-4181 C's `levl[][].flags` is one field with three names (rm.h:213–215: doormask ≡ wall_info ≡ flags). JS keeps three separate fields, and most readers OR wall_info with flags (D-0865). Four sites still read, cleared or assigned only one of them: hit_bars' acid `nodissolve`, moverock's hole-fill clear, skip_premap_detect's `||`, and every drawbridge assignment (create/close/open/destroy). A W_NONDIGGABLE written to `loc.flags` (tower, sokoban and bigroom solidify/non_diggable, ~23 mklev.js writers) was invisible to the first three, and a drawbridge DBWALL kept stale `flags` door bits (Must-fix F2 of the 2026-10-20 level audit)

**C locus:** rm.h `:213–215`; mthrowu.c hit_bars `:1425`; hack.c moverock `:562`; detect.c skip_premap_detect `:2127`; dbridge.c create_drawbridge `:270`/`:275`, close_drawbridge `:810`, open_drawbridge `:862`, destroy_drawbridge `:942`.
**JS:** js/mthrowu.js hit_bars; js/hack.js moverock_core; js/detect.js skip_premap_detect; js/dbridge.js close_drawbridge, open_drawbridge, destroy_drawbridge; js/mklev.js create_drawbridge.
**Change:** the readers OR both fields and the hole-fill arm clears both, as in D-0865. Where C assigns the shared field, JS now writes `wall_info`, `flags` and `doormask` to the same value, as C's single field holds it (a closed drawbridge's DBWALL reads doormask 8 in C too).
**Verify:** - `node scripts/verify.mjs --fn hit_bars,moverock,skip_premap_detect,close_drawbridge,open_drawbridge,destroy_drawbridge,create_drawbridge --full` → syntax · rule2 · no corpus session blocked (non-RNG) · reach REACH-OK ×7 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none. Other doormask-only writers on door squares (doors never carry W_* bits) are out of scope.
**Next:** Must-fix F3 (one shared load_special epilogue in load_special_proto).
