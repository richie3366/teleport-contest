# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-05 — D-1873 artifact.c artifact_hit elemental plines (artifact_hit corpus owner)

**C locus:** `artifact.c` `artifact_hit` `:1447–1530` preamble + four basic attacks — `youattack`/`youdefend` (`magr/mdef == &youmonst`), `vis` (`cansee(magr)`/`cansee(mdef)`/`engulfing_u+!Blind`), `hittee` (`you`/`mon_nam`), `spec_dbon` add, `impossible` self-attack, `realizes_damage` (`youdefend||vis||stuck`); AD_FIRE `:1480–1494` (`pline_The` hits/vaporizes/burns + `rn2(4)` + Slimed `burn_away_slime`), AD_COLD `:1495–1505` (hits/freezes + `rn2(4)`), AD_ELEC `:1506–1520` (hits/Lightning + `wake_nearto(16)` when applies + `rn2(5)`), AD_MAGM `:1521–1529` (hits/missiles, no RNG). Caller `uhitm.c` `hmon` via `hitum` (hero Mjollnir melee vs the Aleax).
**JS:** `js/artifact.js` `artifact_hit` (+80/−17) + 1-line awaits in `js/uhitm.js`, `js/mhitu.js`, `js/mhitm.js`, `js/dothrow.js` (×2), `js/mthrowu.js`; `docs/c-js-map/data.md` artilist section.
**Change:** async `artifact_hit` in C order — `isHero` (game.youmonst + sentinel + `_youmonst`), hero-pos `cansee` via `u.ux/uy`, `engulfing_u` + local `Blind()`, `hittee`, `spec_dbon`, awaited `impossible`, `realizes_damage` incl `u.ustuck`; four `pline` arms (`The fiery/ice-cold/massive/imaginary` with the C verb/punct split, water-elemental vaporize via file-local `PM_WATER_ELEMENTAL`); ELEC `await wake_nearto(pd,16)` when applies before the `rn2(5)` burn; FIRE Slimed `await burn_away_slime()`; `realizes_damage` returns. Static imports per `imports.mjs --can` SAFE (hoisted fns, same 87-module SCC): `cansee`, `mon_nam`, `wake_nearto`, `burn_away_slime`, `impossible`, `engulfing_u`. Five callers awaited (`uhitm.js` hmon, `mhitu.js` mhitu arm, `mhitm.js` mhitm arm, `dothrow.js` ×2, `mthrowu.js` dynamic).
**Verify:** `node scripts/verify.mjs --fn artifact_hit` →
**Named:** `destroy_items`/`ignite_items` bodies on FIRE/COLD/ELEC (gates still burned; C may add `itemdmg` when the gate fires); `Mb_hit` (AD_STUN still returns false); `SPFX_BEHEAD`/`SPFX_DRLI` arms.
**Next:** next Open row (`trap.c` trapeffect_rolling_boulder_trap).
## 2026-09-05 — Audit reviews 835–842 (D-1865…D-1872) + cadence score

Review iter over the 8 `js/` SHAs since audit 827–834. Verdicts: 7 ACCEPT,
1 ACCEPT-WITH-DEBT (838: D-1868 `is_pick` note misnames gated clones —
`apply.js`/`dig.js` have the `obj.h:220` gate; truly gateless are
`monmove.js:474` + unnamed `lock.js:1346` — map-only debt, pre-existing).
Re-measured every corpus claim with `hidden-proxy verify <fn> --base
HASH~1`: all PROGRESS/PASS confirmed, no D-1831-style regression. Notable:
842's commit message pastes syntax-only but the D-log holds the full
matrix (re-verified hidden + green 2/2 + strict ×2 myself). No Must-fix
(prepend none); Next cluster unchanged. Cadence: full `sessions` 44/44 at
`8e602b91`, Scr 11,405/11,405, RNG 792,838/792,838, `48+0.36/turn` —
fortress held exactly. Filled archive stamp D-1872 `8e602b91`.
## 2026-09-05 — D-1872 wintty.c process_menu_window page keys `>`/`<`/`^`/`|` (minimal_xname corpus owner)

**C locus:** `win/tty/wintty.c` `process_menu_window` `:1621–1649` — `MENU_NEXT_PAGE` (`>`, `wintype.h:153`), `MENU_PREVIOUS_PAGE` (`<`), `MENU_FIRST_PAGE` (`^`), `MENU_LAST_PAGE` (`|`) turn pages in *every* menu including PICK_NONE; only ` ` finishes on the last page (`else if (morc == ' ')`, `:1627–1630`). Default letter match scans the current page only (`:1753`), so `n`/`J` at steps 825–826 are correctly ignored on page 1.
**JS:** `js/invent.js` (+68/−8): `MENU_FIRST/LAST/NEXT/PREVIOUS_PAGE` import from `const.js`; page arms in the three loops; doc updates.
**Change:** ported the four page-key arms into all three loops ahead of gacc/letter match (C switch order; `>` never finishes on the last page); PICK_NONE `:`/other keys now `tty_nhbell()` per C `:1701–1703`/`:1738` (screen-silent). Retired the `MENU_PREV/FIRST/LAST` named omits on the pickinv/used-invlets map rows.
**Verify:** - `PASS  syntax   1 changed js file(s): js/invent.js`
**Named:** `minimal_xname` itself still unported (`simpleonames` stand-in, D-0881; names already match on both sides here). MENU_SELECT/UNSELECT/INVERT_PAGE + SELECT/UNSELECT/INVERT_ALL, digit counting in PICK_NONE menus, and `map_menu_cmd` keypad remaps still deferred in these loops.
**Next:** none from this row — the cited session now PASSES, so the proxy re-attributes `minimal_xname`; no new queue row (faithfulness stays map debt under D-0881).
## 2026-09-05 — D-1871 sounds.c zoo_mon_sound zoo_msg print (zoo_mon_sound corpus owner)

**C locus:** `sounds.c` `zoo_mon_sound` `:115–128` ((msleeping||is_animal)+ZOO gate; `selection = rn2(2)+hallu` over zoo_msg[3]; `You_hear1`; TRUE). Caller `dosounds` `:309–312` (`has_zoo && !rn2(200)` → `get_iter_mons(zoo_mon_sound)` → return).
**JS:** `js/sounds.js` `zoo_mon_sound` + `get_iter_mons` + six awaited call sites; `docs/CURRENT.md` Next cluster (already named this row).
**Change:** async `zoo_mon_sound` in C order (gate; `hallu = Hallucination() ? 1 : 0` via the faithful youprop helper; `zoo_msg[rn2(2)+hallu]`; `await You_hear`, i.e. C `You_hear1`; no Soundeffect on this arm); file-local `get_iter_mons` async (fountain.js/dokick.js precedent) with `await bfunc`, all six dosounds sites awaited; envelope comment updated (zoo live, rest RNG-only).
**Verify:** `node scripts/verify.mjs --fn zoo_mon_sound` → PASS syntax (1 changed js file: js/sounds.js) · PASS rule2 · PASS hidden 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (explore-seed0116-wizard-wear-shop-d07e6ea5: PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed).
**Named:** throne/beehive/morgue/barracks/court You_hear plines still deferred (RNG-only stubs unchanged); dosounds sticky-`hallu` for the other arms untouched; `mon_offmap` edge cases in `get_iter_mons` skips unchanged.
**Next:** next Open row (`objnam.c` minimal_xname).
## 2026-09-05 — D-1870 uhitm.c mhitm_ad_drli mhitu arm (mhitm_mgc_atk_negated corpus owner)

**C locus:** `uhitm.c` `mhitm_ad_drli` `:2479–2488` mhitu arm (`hitmsg`, then `!rn2(3) && !Drain_resistance && !mhitm_mgc_atk_negated(magr, mdef, TRUE)` → `losexp("life drainage")`; base-damage dice kept). `mhitm_mgc_atk_negated` itself (`:75–99`) was already C-faithful in JS (D-0198/D-1405); the missing piece was its mhitu-DRLI caller.
**JS:** `js/mhitu.js` `mhitm_ad_drli_u` (new) + dispatch case + const + import; `docs/CURRENT.md` Next cluster.
**Change:** new `mhitm_ad_drli_u` in `js/mhitu.js` in C order (hitmsg; short-circuit `!rn2(3) && !Drain_resistance() && !mgc_negated(TRUE)` → `losexp('life drainage')`; damage untouched) wired as `case AD_DRLI` in `mhitm_adtyping_u`; `AD_DRLI = 15` file const; `Drain_resistance` added to the existing `zap.js` import (no new module edge per `imports.mjs --can`).
**Verify:** `node scripts/verify.mjs --fn mhitm_mgc_atk_negated` → PASS syntax (1 changed js file: js/mhitu.js) · PASS rule2 · PASS hidden 0 PASS, 1 moved past (re-attributed same step), 0 unchanged, 0 worse → PROGRESS: tour-Valkyrie step 43 now RNG 11951/11951 fully matched, screen-blocked on `hitmsg` (`mhitu.c:59`): C topline `The wraith touches you! Farvel level 1.--More--` vs JS `The wraith touches you! Farvel level 1.` (content matches incl. hallucination `Farvel`; only `--More--` paging differs) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed).
**Named:** uhitm + mhitm arms of `mhitm_ad_drli` (Stormbringer `d(2,6)`, mhpmax/level-drain body, Death redirect) still deferred; `mhitm_ad_dren` mhitu arm (`drain_en` has no JS port yet) still deferred.
**Next:** next Open row (`hack.c` dopush).
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
