# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-20 — D-4180 sp_lev.c load_special runs link_doors_rooms, remove_boundary_syms and map_cleanup after every level script (`:6464–6471`). JS load_hellfill skipped all three, so hellfill.lua's crosswall-temple prefab (`:207–219`) kept its `B` (CROSSWALL) boundary ring, which wallification then turned into a closed wall box around the temple where C has floor (Must-fix F1 of the 2026-10-20 level audit; no corpus session picks this prefab)

**C locus:** sp_lev.c load_special `:6454–6502` (head `:6464–6471`), remove_boundary_syms `:1015–1038`, link_doors_rooms `:1121–1142`, map_cleanup `:327–356`; dat/hellfill.lua `:207–219`.
**JS:** js/mklev.js load_hellfill.
**Change:** after hellfill_populatemaze, run link_doors_rooms, remove_boundary_syms and map_cleanup in C order. hellfill never sets "inaccessibles", so ensure_way_out stays skipped, as in C. All three are the existing sp_lev.c ports in js/mklev.js; none draws RNG.
**Verify:** - `node scripts/verify.mjs --fn remove_boundary_syms,map_cleanup,link_doors_rooms --full` → syntax · rule2 · no corpus session blocked (non-RNG change) · reach REACH-OK ×3 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** (1) hellobjects/hellmonsters (defined but unused in lua — D-4019 standing); (2) hells[6] ice grow/filter fidelity (D-4019 standing); (3) Valkyrie residual mcast_weaken_you@493 — later owner, its own future row; (4) the other 125 loaders still inline this epilogue unevenly — Must-fix F3.
**Next:** Must-fix F2 (W_NONDIGGABLE single-field readers in mthrowu.js hit_bars / hack.js moverock_core).

## 2026-10-20 — audit 3011–3019 @878852b8f: review D-4171..D-4179 (7A/2D/0Q, 0 Must-fix) + full rescore 668/719 (0 PASS→FAIL)

**Reviews:** every owner re-measure (`verify … --base HASH~1 --no-reach`) reproduces its D-log: readobjnam_postparse1, do_statusline2 4 (incl. the D-4178 row), disclose, dosounds, setmnotwielded, do_statusline2, dismount_steed PASS. Owner-null claims were replayed with the frozen runner: D-4171's 18 symset recordings are RNG-complete at the cited screens (still `env:config-path`), and the D-4172 Rogue and D-4174 Healer rows PASS. Debt (no session): D-4171's other config_error_done waits and element errors; D-4175's JS m_at `mhp <= 0` skip.
**Rescore:** `record` found all sessions present. Unfiltered `score` gave 682/708 (RNG 99.99 %, screens 99.98 %), 0 PASS→FAIL vs the committed board. `archive` moved 15 PASS out → 668/719, unrecorded 0; tier promoted 2 back, reserve 26 → 28.
**Score:** public 44/44 (792838 RNG, 11405 screens, 122+0.77/turn); held-out 35/44, 10,849 pts (judge 19:11Z, +0). Ledger snapshot taken. Seeded sample wearslot/polyman/mkobj_erosions/deltrap/confused_book: 5/5 hold. Aside: 24 bare `see_monsters();` statements (polyman's tail among them) float its Sting-glow pline; no corpus row reaches it.
**Next:** Must-fix is empty → the cliffs head.

## 2026-10-20 — D-4179 steed.c dismount_steed moves the hero off the steed with the real teleds (`:765`), which runs `newsym(u.ux0, u.uy0); see_monsters(); vision_full_recalc = 1; vision_recalc(0);` before spoteffects (teleport.c teleds). JS called teleds_simple, a local subset (u_on_newpos + two newsyms + vision_recalc), and ended with an immediate `vision_recalc(1)` where C only sets `vision_full_recalc = 1` (`:815`). After polymorphing into a red dragon (infravision) while riding, C's dismount teleds see_monsters already shows an infravisible `h` next to the hero, under «You can no longer ride the saddled pony.--More--». JS showed it 2 screens later, at polymon's own see_monsters (1 corpus session → FULL PASS)

**C locus:** steed.c dismount_steed `:575–822` (hero-first arm `:756–772`, tail `:808–815`); teleport.c teleds (newsym origin, see_monsters, vision_recalc, switch_terrain, vault guard, spoteffects, invocation_message, notice_mon_*); polyself.c polymon `:964` dismount_steed(DISMOUNT_POLY), `:1018` see_monsters.
**JS:** js/steed.js dismount_steed (teleds_simple removed, tail, header comment).
**Change:** dismount_steed calls the live `teleds(cc.x, cc.y, TELEDS_ALLOW_DRAG)` (already imported in steed.js); teleds_simple is deleted. The tail sets `game.vision_full_recalc = 1` as C does. The unused `vision_recalc` import is dropped (`grep -anw` showed only the import).
**Verify:** - Board note: an unfiltered `hidden-proxy score` on HEAD b9da9a8b4 (run by mistake with an empty `--ids`) rescored the active tier: the only change was scen-worldtour-Wizard-50255512 → PASS (756 → 760/760, healed by D-4178's Ring_off_or_gone arm via recharge's Ring_off), no regression. The board is committed with `full: true`.
**Named:** none.
**Next:** cliffs head (re-rank): xkilled, scen-questtour-Archeologist-50361020 s400 (`)` vs `I` on row 11 — remembered-unseen vs object glyph).

## 2026-10-20 — D-4178 do_wear.c Ring_off_or_gone starts with `if (!(u.uprops[objects[obj->otyp].oc_oprop].extrinsic & mask)) impossible("Strange... I didn't know you had that ring.");` (`:1353–1354`). JS had no such arm and cleared the slot with two setworn calls plus a slot-identity fallback. When an electric eel's shock turned a worn ring of free action to dust (its FREE_ACTION extrinsic already 0 in both C and JS), C printed the impossible and its «Program in disorder!» / «Please report…» lines before mhitu applied the bite damage. JS skipped all three and painted the lower HP 3 screens early (1 corpus session → FULL PASS)

**C locus:** do_wear.c Ring_off_or_gone `:1346–1437`, Ring_gone `:1446`; worn.c setworn `:73–145` (uprops[p] for every p, `:96–98`, `:120–121`), setnotworn `:150–184` (`:168–169`); zap.c maybe_destroy_item `:5918–5924`; pline.c impossible `:584–616`.
**JS:** js/do_wear.js Ring_off_or_gone, confer_oc_oprop.
**Change:** the Ring_off_or_gone head now follows C order: takeoff.mask clear, the extrinsic test + `impossible`, then `setnotworn(obj)` if gone, else `setworn(null, obj.owornmask)`. The fallback is gone (C's setworn(0, 0) does nothing). confer_oc_oprop now updates `uprops[p].extrinsic` before its `!p` return, so the prop-0 rings keep C's uprops[0] bits; the E* flats are unchanged.
**Verify:** - `node scripts/verify.mjs --fn do_statusline2,Ring_off_or_gone,setworn --full` → syntax · rule2 · `verify do_statusline2: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (scen-worldtour-Valkyrie-49955041 1043/1043 FULL PASS) · reach REACH-OK ×3 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none.
**Next:** cliffs head (re-rank): recharge, scen-worldtour-Wizard-50255512 s525 («Your ring spins clockwise for a moment.» --More-- before «It misses!»).

## 2026-10-20 — D-4177 mon.c m_detach drops a dead monster's inventory through steal.c relobj (`:2779`), and relobj hands each item to mdrop_obj, whose extract_from_minvent ends with mwepgone for a wielded item (worn.c `:1414–1416`). For a lit Sunsword, mwepgone → setmnotwielded runs end_burn and prints «The long sword named Sunsword in the Aleax's hand stops shining.» JS's m_detach used relobj_on_death (mkobj.js), a partial clone that unlinked each item itself and cleared mw/owornmask by hand. So it skipped extract_from_minvent: no end_burn, no pline, no check_gear_next_turn, no obj_no_longer_held. relobj is now one export in steal.js, used by m_detach, grddead and dog_invent (1 corpus session → FULL PASS)

**C locus:** steal.c relobj `:874–898`, mdrop_obj `:808–849`; worn.c extract_from_minvent `:1376–1417`; weapon.c mwepgone `:937–946`, setmnotwielded `:1813–1828`; mon.c m_detach `:2777–2780`; vault.c grddead `:174–189`; dogmove.c dog_invent `:420`.
**JS:** js/steal.js relobj (+ imports mdrop_obj, obfree, canseemon, droppables); js/mhitm.js m_detach, grddead; js/dogmove.js (droppables export, local relobj removed); js/mkobj.js (relobj_on_death removed); js/uhitm.js, js/trap.js (dead imports dropped; `grep -anw` showed only the import lines); js/steed.js (comment).
**Change:** steal.js `relobj(mtmp, show, is_pet)` ported whole in C order: isgd gold vanishes (canspotmon/canseemon pline, obfree), then `mdrop_obj` per head (`droppables` for a pet, verbosely = is_pet && verbose), then `newsym` when show && cansee. relobj_on_death is deleted, the dogmove clone is replaced by the import, and dogmove.js `droppables` is now exported.
**Verify:** - `node scripts/verify.mjs --fn setmnotwielded,relobj,m_detach,grddead --full` → syntax · rule2 · `verify setmnotwielded: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (scen-zapfest-Rogue-50850092 939/939 FULL PASS) · reach REACH-OK ×4 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none.
**Next:** cliffs head (re-rank): do_statusline2, scen-worldtour-Valkyrie-49955041 s543 (an HP-value writer).

## 2026-10-20 — D-4176 With color off, display.c reset_glyphmap flags S_ice MG_BW_ICE (tty paints it inverse) only when its symbol equals `gs.showsyms[S_room]` or `gs.showsyms[S_darkroom]` (`:2904–2907`). C's showsyms[S_darkroom] is never a symset's own slot: reglyph_darkroom (`:1850–1853`) sets it to S_room's symbol when dark_room && use_color, else to SYM_NOTHING's blank. JS's collision test read the loaded symset's default `.` for S_darkroom. With RogueIBM loaded (S_room `\xfa`, S_ice and S_darkroom undefined → `.`) and color turned off in-game, JS painted ice inverse where C paints a plain `.` (1 corpus session → FULL PASS)

**C locus:** display.c reset_glyphmap `:2884–2917` (BW lava/ice/sink chain, `!iflags.use_color`), reglyph_darkroom `:1818–1854`; options.c reset_needed_visuals `:8980–9009`, opt_color `:5399–5410`; wintty.c tty_print_glyph `:3922–3936`.
**JS:** js/display.js darkroom_showsym, lava_ice_sink_map_attr.
**Change:** a new `darkroom_showsym()` returns reglyph_darkroom's equate for the current flags (S_room's symbol if dark_room && use_color, else SYM_NOTHING's). lava_ice_sink_map_attr's ice test uses it. It is the only JS reader of C's showsyms[S_darkroom].
**Verify:** - `score --ids` on the 55 failing rows vs committed board → **679/734** (+1: scen-symset-Rogue-50750039 269 → 926/926 FULL PASS; no other row moved, no regression).
**Named:** darkroom_showsym reads the current flags. C's value lags only inside the color toggle's own reset_glyphmap, which runs before that redraw's reglyph_darkroom. reglyph_darkroom's callers (goto_level, reset_needed_visuals, restore) remain unwired.
**Next:** cliffs head (re-rank): setmnotwielded; scen-worldtour-Valkyrie-49955041 s543 (D-4173 Next).
