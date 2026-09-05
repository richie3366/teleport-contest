# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-05 — D-1865 mhitu mhitm_ad_phys_u dmgval defender null → youmonst (review 834 Must-fix)

**C locus:** `weapon.c` `dmgval` `:215` (`struct permonst *ptr = mon->data` — unconditional deref; `bigmonst(ptr)` selects `oc_wldam` + large-switch vs `oc_wsdam` + small-switch) + `uhitm.c` `mhitm_ad_phys` mhitu arm `:4061–4066` (`dmgval(otmp, mdef)` with `mdef == &youmonst`).
**JS:** `js/mhitu.js` `mhitm_ad_phys_u` one-line defender + comment; `docs/c-js-map/turns.md` uhitm section.
**Change:** `dmgval(otmp, game.youmonst)` + C-citation comment (`dmgval(otmp, mdef)`, `weapon.c:215`). No new import — `game.youmonst` already used in the same arm (`artifact_hit`, `rustm`).
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_phys` → PASS syntax (1 changed js file: js/mhitu.js) · PASS rule2 · note hidden vacuous at HEAD (no corpus session blocked on it — not a corpus PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed). `node scripts/verify.mjs --fn mhitm_ad_phys --base 8ab2608f~1` → PASS syntax · PASS rule2 · PASS hidden 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (explore-seed0360-wizard-world-tour-5f79bc6a: PASS; c87ff7c9: PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full.
**Named:** file-local `do_stone_u` clone killer attribution (`make_stoned(5,0,kformat,kname)`, `uhitm.c:3923–3942`) — review 834 debt, map only; knockback stub-burns still named (D-1864).
**Next:** Open `do_wear.c` `menu_remarm` (queue head after this ships).
## 2026-09-05 — audit reviews 827–834 (D-1857…D-1864) + cadence score

**Scope:** 8 JS-touching SHAs since audit 818–826 (`b8b347b8..8ab2608f`), one SHA
at a time, each verify claim re-measured with `hidden-proxy.mjs verify <fn> --base
HASH~1`. All 8 D-log verify claims confirmed true (no vacuous checks, no regressions).
**Verdicts:** 5 ACCEPT (828 Sam loaders — lua maps 20/20/20/16 re-verified; 830
fill_zoo; 831 Garden — replace_terrain RNG order read in `sp_lev.c:5127–5133`; 832
spec_applies — imported, not cloned; 833 vision pit — byte-faithful arm), 2
ACCEPT-WITH-DEBT (827 `sleep_slee_mm` drops `finish_meating` mimic-appearance reset,
map debt; 829 shared `surface` covers 9/15 C legs, map debt), 1 QUALITY-RISK (834).
**Must-fix (1, prepended):** `mhitm_ad_phys_u` `dmgval(otmp, null)` → `dmgval(otmp,
game.youmonst)` — C `weapon.c:215` derefs `mon->data`, caller passes `&youmonst`;
`bigmonst(undefined)` measured `false`, so polymorphed-big hero takes small dice
(+ draw-count shifts). Siblings pass real defenders (`mhitm.js:1176`). Debt alongside:
`do_stone_u` clone lacks killer attribution (shared with ston arm).
**Score:** full `sessions` 44/44, Scr 11,405/11,405, RNG 792,838/792,838, speed
`48+0.38/turn` (R² 0.85). Hidden proxy 236/265 (89.1%), RNG 99.58%, screens 99.5%.
**Next:** pop the Must-fix first, alone (review 834 §Actionable-1).
## 2026-09-05 — D-1864 uhitm.c mhitm_ad_phys mhitu weapon arm (knockback RNG order)

**C locus:** `uhitm.c` `mhitm_ad_phys` mhitu arm `:4038–4126` (AT_WEAP+otmp: corpse `do_stone_u`/done `:4047–4060`, `dmgval` + GOP `rn1(4,3)` `:4061–4066`, `artifact_hit`-or-`hitmsg` `:4067–4072`, silver sear `:4075–4079`, `tmp -= rnd(-u.uac)` + Half `:4083–4089`, pudding split `:4091–4105`, `rustm` `:4106`, dieroll poison `:4107–4121`; non-weapon `magr != u.ustuck` `:4122–4123`); caller order `mhitu.c` `hitmu` `:1190–1193` (adtyping before `mhitm_knockback`).
**JS:** `js/mhitu.js` `mhitm_ad_phys_u` + imports/consts (`W_ARMG`/`NEUTRAL`, `Mgender`, `mons`, `artifact_hit`/`permapoisoned`, `Hate_silver`, `rustm`, `SILVER`, `cloneu`, local `CORPSE`/`GAUNTLETS_OF_POWER`/`IRON=11`/`METAL=12`/`PM_*_PUDDING`); `js/uhitm.js` `export Hate_silver`; `js/sit.js` `export cloneu`; `js/mhitm.js` one-line omit refresh; `docs/c-js-map/turns.md` uhitm section.
**Change:** port the mhitu AT_WEAP arm in C order (corpse `do_stone_u` via the file-local clone with the `u.Stoned || u.HStoned` guard; GOP arm; `artifact_hit` dmgBox pattern from `mhitm.js:1187` with `game.youmonst` defender + `game._mhitu_dieroll`; silver sear via `Hate_silver` newly exported from `js/uhitm.js`; soak `rnd(-uac)` + `maybe_half_phys`; pudding split via `cloneu` newly exported from `js/sit.js`; `rustm` from `js/mhitm.js`; `poisoned()` on `dieroll <= 5`) + the `mtmp !== u.ustuck` disjunct. `imports.mjs --can mhitu.js sit.js cloneu`: same 87-module SCC, lazy in-function use, no top-level read — safe; `mhitu.js` loads clean in Node.
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_phys` → PASS syntax (4 changed js files: js/mhitm.js js/mhitu.js js/sit.js js/uhitm.js) · PASS rule2 · PASS hidden verify mhitm_ad_phys: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (5f79bc6a: PASS; c87ff7c9: PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · then `node scripts/verify.mjs --full` → PASS full 44/44 (forced; shared-file heuristic had skipped it).
**Named:** uhitm arm is `damageum_ad_phys` (unchanged); `mhitm_ad_drst` 1/8; purple-worm-vs-shrieker cap; knockback hurtle/steadfast/size/weapon gates + ART_OGRESMASHER still stub-burned (`mhitm_knockback` returns FALSE after C-order `rn2(3)` + `rn2(6)`).
**Next:** Open `do_wear.c` `menu_remarm` (queue head after this ships).
## 2026-09-05 — park dogmove.c dog_invent (misattributed; not a D-id)

**C locus:** none shipped. Corpus `"%s picks up %s."` is `mon.c mpickstuff`, not `dogmove.c dog_invent`.
**Change:** moved Open `dog_invent` to Parked. Next Open `uhitm.c mhitm_ad_phys`.
**Verify:** tour-Barbarian-70011 `geom-probe` 0 diffs; tour-Priest-70006 RNG-matched 16489/50 with movement drift (needs C `movement[]`/`mtrack`).
**Next:** do not pop `dog_invent` until C dump or proxy rescore.
## 2026-09-05 — D-1863 vision.c pit 3×3 + post-rhack recalc (mthrowu.c linedup owner)

**C locus:** `vision.c` `vision_recalc` `:609–622` (`u.utrap && u.utraptype == TT_PIT` → only the immediate 3×3 is IN_SIGHT|COULD_SEE; xray/night-vision still apply) + `allmain.c` `:541–542` (post-`rhack()` `if (vision_full_recalc) vision_recalc(0)`); symptom `mthrowu.c` `linedup` `:1335–1373` (`u_at ? couldsee : clear_path`, then `rn2(2+boulderspots)` walk).
**JS:** `js/vision.js` `vision_recalc` pit arm + `TT_PIT` import + header/doc touch; `js/allmain.js` `moveloop_core` post-`rhack` recalc; `docs/c-js-map/data.md` vision section (pit retired, underwater still named).
**Change:** port the TT_PIT 3×3 arm in C order (row `continue`/`break`, direct `next_rmin/rmax` assign, xray/nv/lights/update flow untouched) + add the post-`rhack`/`deferred_goto` `vision_full_recalc` consume in `moveloop_core` (mirrors the pre-display site; early-`return` occupation path still skips it, as in C). No new module edges (`TT_PIT` from `const.js`).
**Verify:** `node scripts/verify.mjs --fn linedup` → PASS syntax (2 changed js files: js/allmain.js js/vision.js) · PASS rule2 · PASS hidden verify linedup: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS (tour-Healer-70025-d5-8-15-17-22: moved → climb_pit at step 46 (was 45)) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed). Row diff read: JS `linedup` now draws `rn2(2)` on the boulder walk like C; the next first-diff is C `rn2(2)=0 @ climb_pit(trap.c:4197)` vs JS `distfleeck` — the `trapmove` TT_PIT `climb_pit` stub draws nothing (split to its own row, callee audit: `m_easy_escape_pit` missing, `Passes_walls` triple-cloned).
**Named:** underwater `has_night_vision=0` + pool 3×3 (`vision.c` pit-adjacent arm, still named in code + map); `climb_pit` full body (own Open row).
**Next:** Open `trap.c` `climb_pit` (appended this commit; falsifier `node scripts/hidden-proxy.mjs verify climb_pit`).
## 2026-09-05 — D-1862 artifact.c spec_applies ATTK resists (uhitm.c hitum owner)

**C locus:** `artifact.c` `spec_applies` `:1008–1060` SPFX_ATTK switch (via `weapon.c` `hitval` `:184` `if (otmp->oartifact) tmp += spec_abon(otmp, mon)` ← `uhitm.c` `find_roll_to_hit` ← `hitum` `:778`); `spec_abon` `:1076–1087` draws `rnd(damn)` only when `spec_applies`; Aleax `monsters.h:1215` has `MR_COLD|MR_ELEC|MR_SLEEP|MR_POISON`; Mjollnir artilist `AD_ELEC damn 5`.
**JS:** `js/artifact.js` `spec_applies` ATTK switch + doc comment + `zap.js`/`monsters.js` imports; `js/zap.js` 7× `export` (`Fire/Cold/Shock/Drain_resistance`, `resists_fire/cold/poison`); `docs/c-js-map/data.md` artilist section.
**Change:** port the six ATTK resists arms in C order — hero side `Fire/Cold/Shock/Drain_resistance()` (newly exported from `js/zap.js`) + Poison/Stone H/E/sticky flats; monster side `resists_fire/cold/elec/poison` (newly exported from `js/zap.js`) + `resists_drli` (already exported) + `resists_ston` (already exported from `js/monsters.js`); Magm/Stun arm byte-identical; `imports.mjs --can` SAFE shape (hoisted functions, lazy use; monsters.js edge already existed).
**Verify:** `node scripts/verify.mjs --fn hitum` → PASS syntax (2 changed js files: js/artifact.js js/zap.js) · PASS rule2 · PASS hidden verify hitum: 0 PASS, 2 moved past (2 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS (19199bfa: moved → artifact_hit at step 848; 5dfef5c4: moved → artifact_hit at step 842) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed). Row diff read: new first-diff is kind=screen at artifact.c:1515 (C «The massive hammer hits the Aleax.» vs JS empty) — RNG aligns through the dieroll, JS tmp now equals C tmp (`spec_abon` 0 both sides) so hit/miss matches; the missing message is `artifact_hit`'s own arm, a different C function.
**Named:** `defended()` artifact/dragon-armor guard before the switch; DFLAG1 mflags1 arm; DFLAG2 yours/Upolyd/ulycn arms (hero as target); `resists_*` artifact/worn grants (inherited from the zap.js/monsters.js bit subsets); hero Poison/Stone read H/E/sticky flats only (no uprops fallback, matching this function's Antimagic arm).
**Next:** Open `artifact.c` `artifact_hit` (same-step continuation, appended to queue) + queue head `mthrowu.c` `linedup`.
## 2026-09-05 — D-1861 themerms.lua Garden fill (dungeon.c induced_align owner)

**C locus:** `dat/themerms.lua` Garden fill contents (`numpoints/6` wood-nymph loop, `percent(30)` fountain, `make_garden_walls` postprocess) + `make_garden_walls` (`:grow()`, `w→T`, `S→A`); first draw is `dungeon.c` `induced_align` via `sp_lev.c` `create_monster` default-random `sp_amask_to_amask` (`:1907–1922`); `lspo_feature` string form (`:4844–4930`) + `sel_set_feature` (`:4633–4644`); `lspo_replace_terrain` selection arm (`:5051–5150`, match-then-`rn2(100)` per cell); `mkmaze.c` `set_levltyp` garden hack (`:82–87` SDOOR→AIR keeps SDOOR, sets `arboreal_sdoor`); `detect.c` `cvt_sdoor_to_door` clears it (`:1603`).
**JS:** `js/mklev.js` `themeroom_fill_garden` + `themeroom_garden_fountain` + `make_garden_walls_postprocess` + dispatch/runner; `js/detect.js` `cvt_sdoor_to_door`; `docs/c-js-map/data.md` themerms section.
**Change:** port `themeroom_fill_garden` (nymph count `(numpoints/6)|0`, `splev_room_monster(croom,'wood nymph')` + `msleeping=1`, `percent(30)` fountain, queue `{handler:'make_garden_walls'}` with a fresh `selection_from_mkroom`); `themeroom_garden_fountain` (DRY double-try placement, isok + `IS_FURNITURE` guard, typ only — no `nfountains` bump per C); `make_garden_walls_postprocess` (`selection_grow` all-directions, `lspo_replace_terrain_sel` MATCH_WALL→TREE, then per-SDOOR `rn2(100)` burn setting `arboreal_sdoor` + `candig` per `rm.h:224`); register `'Garden'` in `THEMEROOM_FILL_BODIES`; clear both fields in `cvt_sdoor_to_door`.
**Verify:** `node scripts/verify.mjs --fn induced_align` → PASS syntax (2 changed js files: js/detect.js js/mklev.js) · PASS rule2 · PASS hidden verify induced_align: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (ind-Monk-146641968-c5e5ab94: PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed).
**Named:** Buried treasure / Massacre / Statuary fills still omitted (same dispatch comment); `induced_align` local clone in `mklev.js` vs `Is_special` clones in `end.js`/`quest.js` untouched (brief-flagged drift, no behavior gap found).
**Next:** Open `uhitm.c` `hitum` (queue head after this ships).
## 2026-09-05 — D-1860 mkroom.c fill_zoo COCKNEST statue loot + ANTHOLE antholemon/food

**C locus:** `mkroom.c` `fill_zoo` `:276–452` (COCKNEST `:402–412` `if (!rn2(3)) mk_tt_object(STATUE)` + `rn2(5)` `mkobj(RANDOM_CLASS)` loop + `weight`; ANTHOLE `:414–416` `if (!rn2(3)) mkobj_at(FOOD_CLASS)`; mon pick `:330–341` `ANTHOLE ? antholemon()`; flags `:436–450` `has_barracks`/`has_swamp`); `antholemon` `:501–527` (`ubirthday%3 + level_difficulty()`, `G_GONE` retry, no RNG); `mk_tt_object` `mkobj.c:2225–2248` (`tt_oname` → `rn1` role; empty RECORD burns `rnd(10)` via `sysopt.tt_oname_maxrank=10`).
**JS:** `js/mklev.js` `antholemon` + `fill_zoo` (+3 ant consts, doc list); `docs/c-js-map/data.md` mkroom section.
**Change:** port `antholemon()` (ubirthday%3 + difficulty, `G_GONE` retry, null if all gone, no RNG) + `PM_SOLDIER_ANT`/`PM_FIRE_ANT`/`PM_GIANT_ANT` consts; add the ANTHOLE pm arm; add the COCKNEST statue arm and ANTHOLE food arm in C RNG order reusing the same-file `mk_tt_object` (empty-record `rnd(10)` footprint, shared with the MORGUE arm — no clone #3, no new cross-module edge); add `has_barracks`/`has_swamp`.
**Verify:** `node scripts/verify.mjs --fn fill_zoo` → PASS syntax (1 changed js file: js/mklev.js) · PASS rule2 · PASS hidden verify fill_zoo: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (tour-Ranger-70021-d5-8-15-17-22: PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed).
**Named:** SWAMP `mkswamp` still deferred; `tt_oname` RECORD entries (plgend/classmon/christen) still the empty-record stub (shared with MORGUE); `antholemon()` `do_mkroom` gate unchanged.
**Next:** Open `dungeon.c` `induced_align` (queue head after this ships).
## 2026-09-05 — D-1859 hack.c moverock_core Sokoban diagonal won't-roll

**C locus:** `hack.c` `moverock_core` `:441–448` (`Sokoban && u.dx && u.dy` → Blind `feel_location(sx,sy)`, `pline("%s won't roll diagonally on this %s.", The(xname(otmp)), surface(sx,sy))`, `cannot_push`); `surface` `dungeon.c:1750`; `Sokoban` ≡ `level.flags.sokoban_rules` (`rm.h:538`).
**JS:** `js/hack.js` `moverock_core` + `surface` import; `js/sit.js` `surface` export.
**Change:** port the arm in C order (inside clear-dest branch, after ttmp/mtmp fetch, before revive_nasty/monster): `Sokoban_here() && u.dx && u.dy` → Blind `feel_location`, awaited pline with `The(xname(otmp))` + shared `surface(sx,sy)`, `return cannot_push(...)`. Promote `sit.js` `surface` (fullest `dungeon.c` clone: air/cloud/fountain/altar/headstone/wall/doorway/floor/ground) to the shared export instead of writing clone #5; import in `hack.js` (same 87-module SCC, runtime-only call, no top-level read).
**Verify:** `node scripts/verify.mjs --fn moverock_core` → PASS syntax (2 files) · rule2 · hidden 2 PASS / 0 moved / 0 unchanged / 0 worse → PROGRESS (both sessions PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed).
**Named:** shop `costly` computation, `revive_nasty`, trap/teleport/pool arms, Levitation/verysmall Blind feels, tunneling chew, `y_monnam` steed wording (all still deferred in the `moverock_core` envelope).
**Next:** Open `mkroom.c` `fill_zoo` (queue head after this ships).
## 2026-09-05 — D-1858 mkmaze.c makemaz Sam-strt/loca/goal/fila/filb load_special (Samurai quest 5/5)

**C locus:** `dat/Sam-strt.lua` / `Sam-loca.lua` / `Sam-goal.lua` /
**JS:** `js/mklev.js` `load_sam_strt` / `load_sam_loca` / `load_sam_fila` /
**Change:** `load_sam_strt` from the lua body: solidfill STONE +
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location` for water-likers;
**Next:** Open `hack.c` `moverock_core` (2 corpus blocks). Not Sam.
## 2026-09-05 — D-1857 uhitm.c mhitm_ad_slee sleep attack (mhitu rn2(5) vs knockback rn2(3))

**C locus:** `uhitm.c:3479–3522` `mhitm_ad_slee` (homunculus
**JS:** `js/mhitm.js` `mhitm_ad_slee` + `mdamagem` AD_SLEE case
**Change:** port the three arms with C branch/RNG order. `js/mhitm.js`
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_slee` → PASS
**Named:** `defended(mon, AD_SLEE)` orange-scales/artifact
**Next:** Open `mkmaze.c` makemaz `Sam-strt`/`-loca`/`-goal`/`-fila`/`-filb`
## 2026-09-05 — Audit reviews 818–826 (D-1848…D-1856, no port)

**Scope:** every `js/` commit since review 817, oldest first, one file
per SHA written as that SHA finished. 818 ACCEPT (813 Must-fix held:
2 PASS + 2 moved past on re-run). 819 ACCEPT (mineralize 2 PASS
reproduced). 820 ACCEPT (PICK_ONE/PICK_NONE = `wintty.c:1353/:1738`).
821 ACCEPT (full `dofire` envelope, 2 PASS reproduced). 822
ACCEPT-WITH-DEBT (Val 5/5 maps byte-equal; flip-lregion stays standing
`data.md:696` debt). 823 ACCEPT (knox uses storing `l_levregion`,
flipped correctly). 824 ACCEPT (collapse = prefix+found=5 chain, 2
PASS + 2 moved reproduced). 825 ACCEPT (callee live, not stubbed).
826 ACCEPT (bigrm-2 arms mirror unlit rects, 1 moved reproduced).
**No Must-fix, no STOP.** Rule #2 clean.
**Score:** full `sessions` 44/44, Scr 11,405/11,405, RNG
792,838/792,838, speed `47+0.36/turn`. Hidden proxy 230/265 (86.8%)
excl. 13 env; RNG 99.44%, screens 99.2%. Top: hitum/moverock/`mhitm_ad_phys`/remarm/`!`/dog_invent 2.
**Next:** Open `uhitm.c` mhitm_ad_slee (1 corpus block) per queue.
**Scoreboard note:** full `hidden-proxy score` reproduced 230/278 twice
(deterministic); two still-failing rows match more screens on current
code (seed0015-eb7e90ad 33→70/72, seed2200-d38fcac6 217→256/258) —
downstream realignment, unattributed to one SHA. Not staged: this
commit stays docs-only; the next port iter refreshes those rows with
its own verify. PASS/RNG/screen aggregates cited above are identical
with or without that file.
## 2026-09-05 — D-1856 sp_lev.c lspo_replace_terrain bigrm-2 ice replace on darkness:grow()

**C locus:** `dat/bigrm-2.lua` (`des.replace_terrain({ selection =
**JS:** `js/mklev.js` `load_bigrm_2` (+22/−2).
**Change:** build the darkness selection per choice arm (absolute
**Verify:** `node scripts/verify.mjs --fn lspo_replace_terrain` → PASS
**Named:** none new. bigrm-2 `flip_level_rnd` (noflip),
**Next:** Open `uhitm.c` mhitm_ad_slee (1 corpus block); new owner
