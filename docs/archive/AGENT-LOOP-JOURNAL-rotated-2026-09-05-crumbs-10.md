# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
