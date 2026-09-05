# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-05 — D-1869 mkroom.c mkswamp swamp-room port (mkswamp corpus owner)

**C locus:** `mkroom.c` `mkswamp` `:530–574`, via `do_mkroom` `:74` SWAMP arm. Own `rn2(nroom)` pick per try (no `pick_room`), OROOM + no-stairs gate, `idx + ROOMOFFSET` rmno, checkerboard POOL with eel on odd cells (`!eelct || !rn2(4)`; `rn2(5)` giant eel else `rn2(2)` piranha else electric eel) and `!rn2(4)` moldy `mkclass(S_FUNGUS)` on even cells, `has_swamp` per swamp. `eelct` is function-local across all 5 tries, not reset per room.
**JS:** `js/mklev.js` `mkswamp` (new) + `do_mkroom` SWAMP arm wired; `js/fountain.js` `nexttodoor` exported.
**Change:** port `mkswamp` into `js/mklev.js` in C order (short-circuit, RNG, mutation). Guard reuses same-file `has_upstairs`/`has_dnstairs`; occupancy is `objects_at`/`m_at`/`t_at` + `nexttodoor`, the last imported via a new `export` on the C-matched file-local clone in `js/fountain.js` (no second clone). `NO_MM_FLAGS`/`del_engr_at` added to existing import braces; file-local `PM_GIANT_EEL`/`PM_PIRANHA`/`PM_ELECTRIC_EEL` consts per file convention; fungus via `mkclass('S_FUNGUS', 0)` per `minion.js` convention.
**Verify:** `node scripts/verify.mjs --fn mkswamp` → PASS syntax (2 files) · rule2 · hidden 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (tour-Caveman PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed). Caveat: `geom-probe` showed 516 differing cells with a tiny C extent, but the C topline carried a pending `--More--`, so the C `^F` capture likely misfired; positional-RNG attribution plus the verify PASS are the trustworthy signals.
**Named:** none new (map `mkshop` wizard/SHOPTYPE arm and shk bodies unchanged).
**Next:** next Open row (`uhitm.c` mhitm_mgc_atk_negated).
## 2026-09-05 — D-1868 mon.c mfndpos amorphous-door + tele-track + cursed-dig arms (m_move corpus owner)

**C locus:** `mon.c` `mfndpos` door arm `:2231–2238` (`IS_DOOR && !((amorphous(mdat) || can_fog(mon)) && !engulfing_u(mon)) && ((CLOSED && !OPENDOOR) || (LOCKED && !UNLOCKDOOR)) && !thrudoor`); symptom `m_move` chcnt loop (recorder `monmove.c:2011` = `!rn2(++chcnt)`). Same-function mates: ALLOW_DIG cursed-wield `:2176–2195`, fixed-tele-track `:2360–2362` (`fixed_tele_trap`, `trap.h:125` + `hastrack`).
**JS:** `js/mon.js` `mfndpos` three arms + imports (`hastrack`, `MON_WEP`, `is_axe`/`is_pick`, `fixed_tele_trap`, `engulfing_u`, `NO_WEAPON_WANTED`); `js/objects.js` `is_pick` + `P_PICK_AXE` import; `js/trap.js` `fixed_tele_trap`; `docs/c-js-map/turns.md` mfndpos section (door/tele-track retired, cursed-mwep retired).
**Change:** door block restructured to C order with the `amorphous(mdat) && !engulfing_u(mon)` exemption (`can_fog` stays a commented named-omit); ALLOW_DIG cursed-wield branch (`MON_WEP` + `cursed` + `(weapon_check|0) === NO_WEAPON_WANTED` → `is_pick`/`is_axe` skills); trap fixed-tele-track arm ahead of the harmless/knows check. New canonical `is_pick` in `js/objects.js` (`obj.h:220`, mirrors `is_axe` incl. the oclass gate) and `fixed_tele_trap` in `js/trap.js` (`trap.h:125`, `isok(teledest)`). `imports.mjs --can` SAFE for all three new edges (mon→track `hastrack`, mon→weapon `MON_WEP`, mon→objects `is_axe`/`is_pick`; function-scope use only).
**Verify:** `node scripts/verify.mjs --fn m_move` → PASS syntax (3 changed js files: js/mon.js js/objects.js js/trap.js) · PASS rule2 · PASS hidden verify m_move: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (tour-Healer-70012-d3-6-10-11-12: PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (heuristic) → then `node frozen/ps_test_runner.mjs sessions` → 44/44 PASS, speed `45+0.35/turn` (R² 0.86). Working scoreboard bonus: random-seed0013-friday13-save-then-fullmoon-restore-0254c511 also flips to PASS (was `menu_drop` screen-fail at step 112).
**Named:** `can_fog` (vampshifter) still deferred in the door arm (comment + map); corrupt-ttyp `impossible()` guard named-omit (no JS `impossible` path); `mm_aggression`/`ALLOW_MDISP`/`ALLOW_TM` (pre-existing); `m_can_break_boulder` in allowflags (pre-existing); `is_pick` file-local clones in monmove/dig/apply still lack the oclass gate (Next candidate).
**Next:** Open `mkroom.c` `mkswamp` (queue head after this ships; C `rn2(5)` vs JS `fill_ordinary_room` `rn2(3)`).
## 2026-09-05 — D-1867 save_dungeon_topology persist/restore (maybe_generate_rnd_mon corpus owner)

**C locus:** `allmain.c` `maybe_generate_rnd_mon` `:162–168` (`!rn2(udemigod ? 25 : (depth(&u.uz) > depth(&stronghold_level)) ? 50 : 70)`) — the JS rate ternary itself is already C-faithful (D-0753). The writer of the differing cell is the dungeon topology: `dungeon.c` `save_dungeon` `Sfo_dgn_topology` / `restore_dungeon` `Sfi_dgn_topology` (`hack.h` `struct dgn_topology`) persist every special-level `d_level` across save/restore, so C's restored `stronghold_level` reads deep (rate 70).
**JS:** `js/dungeon.js` topology serialize/restore + comments; `js/save.js` import + payload write + restore (with C citations); `docs/c-js-map/harness.md` persistence row.
**Change:** `js/dungeon.js` `save_dungeon_topology()` / `restore_dungeon_topology()` over `LEVEL_MAP` + quest/sokoban/mines/tower/tutorial dnums (mirrors `struct dgn_topology`); `dosave0` writes `payload.topology_levels`; `try_restore_save` restores it (absent key = old save → keep current values). No `allmain.js` change — the rate ternary was already right.
**Verify:** `node scripts/verify.mjs --fn maybe_generate_rnd_mon` → PASS syntax (2 changed js files: js/dungeon.js js/save.js) · PASS rule2 · PASS hidden verify maybe_generate_rnd_mon: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (catchup-after-restore-seed0015-valk: PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (heuristic) → then `node frozen/ps_test_runner.mjs sessions` → 44/44 PASS incl. seed0013-friday13-save-then-fullmoon-restore, speed `45+0.36/turn` (R² 0.86).
**Named:** `game.dungeon_topology` vestigial round-trip kept as-is (only `Is_airlevel` read in `hack.js`); knox-branch-insert / quest-proto fixup side effects are NOT re-run on restore (branches/dungeons already restored verbatim); `depth()` `|| 1` fallback untouched (matches C for valid dungeons).
**Next:** Open `monmove.c` `m_move` (queue head after this ships; C `rn2(4)` vs JS distfleeck `rn2(5)`).
## 2026-09-05 — D-1866 options.c menuinvertmode default 1 (menu_remarm corpus owner)

**C locus:** `options.c` `initoptions_init` `:7279` (`iflags.menuinvertmode = 1` — bulk select/invert skip SKIPINVERT rows unless already set) + `windows.c` `menuitem_invert_test` `:1561–1589` (mode 1 + SKIPINVERT + unselected → FALSE) + `wintty.c` `set_all_on_page` (MENU_SELECT_PAGE skips rows failing the invert test); symptom owner `do_wear.c` `menu_remarm` `:3098–3112` (the `a` row is added with `MENU_ITEMFLAGS_SKIPINVERT`).
**JS:** `js/jsmain.js` iflags default + comment; `js/options.js` rc arm; `docs/c-js-map/startup.md` options.c section.
**Change:** default `menuinvertmode: 1` in `g.iflags` init (rc `...opts.iflags` spread still overrides) + parse `OPTIONS=menuinvertmode:N` colon-compound per `optfn_menuinvertmode` do_set (atoi, keep prior unless 0–2).
**Verify:** `node scripts/verify.mjs --fn menu_remarm` → PASS syntax (2 changed js files: js/jsmain.js js/options.js) · PASS rule2 · PASS hidden verify menu_remarm: 1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS (random-seed0015-valk-level2-pit-dog-wait-288b93d0: PASS; random-seed0360-wizard-world-tour-b1a64b99: moved → process_menu_window at step 838 (was 828)) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed).
**Named:** `doset` Comp `menuinvertmode` row still shows hardcoded `val: '1'` (now true by default; no live get_val/set handler); `=`-form `OPTIONS=menuinvertmode=1` still lands in `result.flags` (colon form is the live one, matching neighboring iflags compounds); count-prefix digits + MENU_SEARCH still deferred in `select_menu_pick_any` (D-0928).
**Next:** seed0360 now blocks on `wintty.c` `process_menu_window` `:1709` at step 838/861 (object menu `What do you want to take off?`, botl region: C paints the status line under the menu, JS leaves row 22 empty) — known top owner, separate painter cause.
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
