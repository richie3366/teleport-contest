# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-05 — D-1880 getpos.c getpos_help whatis multi-pick + valid/hilite tail (getpos_help corpus owner)

**C locus:** `getpos.c` `getpos_help` `:167–307`, tail `:244–299` — `getpos_getvalid` / `getpos_hilitefunc` putstr arms (`:244–255`), autodsec (`:256–257`), dead cmdassist Sprintf (`:258–266`, no putstr — sbuf is overwritten by the `Type a` Snprintf, so no line), `skip_non_mons:` label (`:267`, inside `if (!terrainmode)` but reached via the `:205` goto even when terrainmode is set), `doing_what_is = (goal == what_is_a_location)` (`:269`, `what_is_a_location = "a monster, object or location"`, `pager.c:1670`, passed only by `pager.c:1910`), four-pick kbuf (`:270–284`), and the four `describe current spot` detail lines incl. the `flags.help && !force` `prompt if 'more info',` infix (`:285–299`).
**JS:** `js/getpos.js` (+51/−9); `docs/c-js-map/turns.md` getpos section.
**Change:** ported the tail in C order with C citations — live `getpos_getvalid`/`getpos_hilitefunc` arms (module state installed via `getpos_sethilite`), `skip_non_mons` as a `skipNonMons` boolean with the tail running under `!terrainmode || skipNonMons` (goto-into-block semantics), `doing_what_is` as a value compare against `'a monster, object or location'` (exact: only `pager.js` passes that string, matching the only C caller of the global), four-pick kbuf plus the four detail lines with the `(game.flags?.help !== false) && !force` infix (same default-On idiom as `pager.js:1706`), and an explicit no-line comment for the dead cmdassist Sprintf. No new imports.
**Verify:** `node scripts/verify.mjs --fn getpos_help` →
**Named:** `cmd_from_func` custom move/run/rush binds (JS still hardcodes h/j/k/l, H/J/K/L, G/g defaults; no corpus block); full `getpos_menu`/GFILTER_AREA flood/cmdq_pop/mouse/do_run-prefix (unchanged map debt in the same section).
**Next:** next Open row (`mdlib.c` version_id_string).
## 2026-09-05 — D-1879 wintty.c erase_menu_or_text corner dismiss keeps WIN_STATUS (process_menu_window corpus owner)

**C locus:** `win/tty/wintty.c` `erase_menu_or_text` `:966–985` — corner (`offx != 0`) dismiss is `docorner(offx, maxrow + 1, 0)`: rows below the menu window (incl. WIN_STATUS 22–23) stay painted; only fullscreen (`offx == 0`, non-clear) does `docrt(); flush_screen(1)`. `src/windows.c` `select_menu` `:1858–1863` holds `gb.bot_disabled` across the whole menu, so the corner `docorner` → `bot()` is a no-op and status simply persists. C `query_category` (space finish) → `query_objlist` therefore never blanks rows 22–23.
**JS:** `js/options.js` (+9/−9); `docs/c-js-map/startup.md` options.c row.
**Change:** the three dismiss sites now `await dismiss_nhw_menu({ keep_status: true })` — corner takes the `docorner` path (status kept, C-cited comment), fullscreen stays byte-identical to before (`docrt()` + flush, no `clear_committed_status`). No new imports (`dismiss_nhw_menu` already imported in `options.js`).
**Verify:** `node scripts/verify.mjs --fn process_menu_window` →
**Named:** identical hand-rolled `docrt()` corner dismisses in `js/pickup.js` loot/pickup loops (same C-wrong, no corpus block yet — own row if one appears, not glued here); fullscreen-dismiss `clear_committed_status` semantics (D-0467 area, untouched); `process_menu_search`/`getlin` overlay repaint (D-1646/D-1872 stand).
**Next:** next Open row (`insight.c` show_conduct).
## 2026-09-05 — D-1878 exper.c pluslvl/losexp level-change livelog (show_gamelog corpus owner)

**C locus:** `exper.c` `pluslvl` `:340–368` — `old_ach_cnt = count_achievements()` before the rank check, `record_achievement(achieve_rank(newrank))` when `newrank > oldrank`, then `if (count_achievements() == old_ach_cnt) livelog_printf(LL_MINORAC, "%sgained experience level %d", (u.ulevel <= u.ulevelpeak) ? "re" : "", u.ulevel)` before the `ulevelpeak` update; plus `losexp` `:230` (`lost experience level %d`, `u.ulevel + 1`) and `:245` (`lost all experience`). Same-file `xlev_to_rank` (`botl.c:298`, JS `roles.js` already exact) explains the shift: 1→2 keeps rank 0 so C logs minorac, 2→3 raises rank 0→1 so both log the rank achievement.
**JS:** `js/exper.js` (+20/−6); `docs/c-js-map/startup.md` exper row.
**Change:** ported the three C livelog arms in C order with C comments: `pluslvl` snapshots `count_achievements()`, records the rank achievement, logs `%sgained experience level %d` with the pre-update `ulevelpeak` `re` prefix only when the count is unchanged, then updates `ulevelpeak`; `losexp` logs `lost experience level %d` (`ulevel + 1` post-decrement) and `lost all experience` on the divine-anger reset path. New imports only on existing edges: `LL_MINORAC` (const, matches C `global.h:506` `0x1000`), `count_achievements` (already-imported `insight.js`), `livelog_printf` (`pline.js`, `imports.mjs --can` SAFE, no new cycle).
**Verify:** `node scripts/verify.mjs --fn show_gamelog` →
**Named:** `SoundAchievement` `sa2_xplevelup`/`sa2_xpleveldown` (no SND_LIB); `losexp` level-1 `done(DIED)` (noreturn, still named); Upolyd `monhp_per_lvl`/`rehumanize`; `pluslvl` polyd `setuhpmax` form; `more_experienced` LONG_MAX wrap / `exp_percent_changing` / SCORE_ON_BOTL (unchanged).
**Next:** next Open row (`wintty.c` process_menu_window); the same gamelog's row-22 wish entries (`zap.c` wish livelog) are the honest follow-up writer and belong on their own Open row, not glued here.
## 2026-09-05 — D-1877 pager.c do_look whatis-menu `q` bells, menu stays (do_look corpus owner)

**C locus:** `win/tty/wintty.c` `process_menu_window` default arm — the whatis menu is `select_menu(PICK_ONE)` whose `resp` is selectors (`/i?mMoOtTeE`) + gacc (`y`/`n` group accelerators, one match each) + ` 0123456789\033\n\r` + mapped + `default_menu_cmds` (page keys `^|><.,-@,\~:`). `q` is in none of them, so `!strchr(resp, 'q')` → screen-silent `tty_nhbell()`, menu stays. ESC (`\033`) cancels → returns −1 → `do_look` `> 0` false → `ECMD_OK`.
**JS:** `js/pager.js` (+8/−1); `docs/c-js-map/turns.md` do_look section.
**Change:** split the arm — ESC still dismisses (returns `'q'` → `ECMD_OK`, same outcome as C cancel); `q` now `tty_nhbell()` + `continue`, with C citation. No new imports.
**Verify:** `node scripts/verify.mjs --fn do_look` →
**Named:** space/CR on the single-page whatis menu (C finishes with n=0 → dismiss + `ECMD_OK`; JS still re-prompts); digit-count arms; full selectable `process_menu_window` path (map-deferred).
**Next:** next Open row (`insight.c` show_gamelog).
## 2026-09-05 — D-1876 trap.c climb_pit shared pit-escape port (climb_pit corpus owner)

**C locus:** `trap.c` `climb_pit` `:4183–4230` — guard `!u.utrap || utraptype != TT_PIT`; `trapname(PIT, FALSE)`; Passes_walls ascend (`reset_utrap` + `fill_pit` + `vision_full_recalc`); `!rn2(2) && sobj_at(BOULDER)` crevice (`Your` stuck / display+clear / `You` free); `(Flying || is_clinger(youmonst.data)) && !Sokoban` climb-out via `u_locomotion("climb")`; `--utrap`-or-`m_easy_escape_pit` (pit fiend or `msize >= MZ_HUGE`, `:3726–3731`) crawl-out with the Sokoban+Levitation float variant; `u.dz || verbose` Norep still-in-pit (Hallu short-circuit `!rn2(5)` fallen message). Callers `do.c:1309` (`doup`) and `hack.c:1585` (`trapmove` TT_PIT arm, returns FALSE after).
**JS:** `js/trap.js` (+72/−1); `js/hack.js` (+4/−3, import + arm + envelope); `js/do.js` (+8/−2, import + `doup` gate + omits); `docs/c-js-map/data.md` trap.c section.
**Change:** `m_easy_escape_pit` as a file-local staticfn port (`data === mons[PM_PIT_FIEND] || msize >= MZ_HUGE`); hero `Passes_walls()` (`u.Passes_walls || H || E`, same idiom as `js/do.js`); exported async `climb_pit()` in C branch/RNG order (guard; `trapname(PIT, false)`; Sokoban ≡ `level.flags.sokoban_rules`; `hero_Flying()` incl. steed-flyer; file-local `u_locomotion_pit('climb')`; `sobj_at(BOULDER)` file-local; `flush_topl_more()` for C `display_nhwindow(WIN_MESSAGE)`; `reset_utrap(false)` + `fill_pit` + `game.vision_full_recalc = 1`; Norep still-in-pit with the Hallu `rn2(5)` short-circuit). Wired into both C call sites: `trapmove` TT_PIT arm awaits it (still `break` → `false`), `doup` checks the pit gate right after `u.dz/dx/dy` set and returns `ECMD_TIME`. Same-edge import additions only (`hack.js`/`do.js` already import `trap.js`; `Norep`/`YMonnam` join existing `display.js`/`do_name.js` edges — `imports.mjs --can` ALREADY on both).
**Verify:** `node scripts/verify.mjs --fn climb_pit` →
**Named:** poly-form `locomotion()` verbs (Lev/Fly only, same deferral as the three existing `u_locomotion` clones); `clear_nhwindow(WIN_MESSAGE)` past the flush; `doup` `u_rooted`/`stucksteed`/`u_stuck_cannot_go`/encumbrance/ledger-1 gates (pre-existing omits, kept).
**Next:** next Open row (`pager.c` do_look).
## 2026-09-05 — Audit reviews 843–845 (D-1873…D-1875) + cadence score

Review iter over the 3 `js/` SHAs since audit 835–842. Verdicts: 3 ACCEPT,
0 Must-fix (prepend none); Next cluster unchanged. Re-measured every
corpus claim with `hidden-proxy verify <fn> --base HASH~1`: D-1873
artifact_hit 1 PASS + 1 moved past, D-1874 trapeffect_rolling_boulder_trap
1 PASS, D-1875 glibr 1 PASS — all match the D-logs, no D-1831-style
regression. Notes: 843's `Blind()` is the pre-existing verified clone
(D-0716), all new edges ALREADY-imported; 844's vibrating-square arm is
named in commit + map; 845's `verify dog_eat` vacuity is stated and the
real owner `glibr` verified instead, plus full 44/44 in-commit. Debt
sighting (pre-existing, unnamed): `dog_eat` tunnels "digs in" arm has no
JS counterpart — next port iter should name it in the turns.md row.
Cadence: full `sessions` 44/44 at `061abc6d`, Scr 11,405/11,405, RNG
792,838/792,838, `46+0.37/turn` (R² 0.86); proxy 246/265 excl env
(92.8%), RNG 99.60 %, screens 99.6 %.
## 2026-09-05 — D-1874 pager.c do_screen_description trap-glyph `a trap (lookat)` (trapeffect_rolling_boulder_trap corpus owner)

**C locus:** `pager.c` `do_screen_description` — looked prefix `:1271` (`encglyph` `^` + 8 spaces); `add_cmap_descr` `:1220` first-matches a trap cmap glyph as literally `a trap` (`hit_trap`, `need_to_look` via the `is_cmap_trap` arm); didlook `:1611–1614` appends ` (firstmatch)` where firstmatch is `lookat` `:718–721` → `trap_description` `:164–181` → `trapname(ttyp, FALSE)` = `rolling boulder trap`. `add_quoted_engraving` appends nothing for a non-engraving buf, so no engraving arm is needed here.
**JS:** `js/pager.js` (+7/−1); `docs/c-js-map/turns.md` farlook section.
**Change:** return `` `^        a trap (${nm})` `` with `first: nm` (C `firstmatch`, feeds `checkfile`) and `found: 1` (C resets `found = 1` after the supplement), plus a C-citation comment. No new imports; `an()` still used by the other branches.
**Verify:** `node scripts/verify.mjs --fn trapeffect_rolling_boulder_trap` →
**Named:** vibrating-square first-match arm (`add_cmap_descr` writes `an(x_str)`, not `a trap`, for `S_vibrating_square`) still deferred in this branch's envelope; full `do_screen_description` cmap/symbol table still deferred (map).
**Next:** next Open row (`steal.c` mdrop_obj).
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
