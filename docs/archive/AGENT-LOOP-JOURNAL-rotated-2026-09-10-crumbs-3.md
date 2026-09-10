# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-09 — Audit 74944545..ab784680 (reviews 1156–1163: 8 ACCEPT, 0 Must-fix) + cadence 44/44

Review iteration over the 8 JS-touching SHAs since d22f6c29 (D-2190..D-2197), oldest-first, one file per SHA written as each finished. Every corpus claim re-measured with `hidden-proxy verify <fn> --base <SHA~1>`: burnarmor/thitm/m_harmless_trap/dosounds vacuous-0-confirmed as labeled; unstuck PROGRESS (Knight-92002 52→one_characteristic@81); accessory_or_armor_on PASS (Tourist-92144); look_here PROGRESS (Wizard-92223 121→130, residual null-owner label as disclosed); minliquid_core PASS (stale row, PASS pre/post as disclosed). C spot-checks held throughout (burnarmor literal, savelife tail, Helmet_on 7 arms + set_bknown/adj_abon, expels tail + um_dist, defended/resists_magm + sqky/rocktrap arms, thitm full body + AD_RBRE=242, dosounds 7 arms draw-for-draw, mdrop_obj/steed/flush). Minor message framings noted (ALREADY-edges called "new", D-2196/D-2194) — substance safe, no C-wrongs. Cadence: full `sessions` 44/44, Scr 11,405/11,405, RNG 792,838/792,838, speed `92+0.57/turn` (R² 0.77). No Must-fix prepended; Next cluster unchanged (fountain gush/engulfed map-driven).

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).

## 2026-09-10 — D-2260 `uhitm.c` mhitm_ad_curs/dcay/deth/drli mhitm (mon→mon) arms + `mdamagem` dispatch

**C locus:** `uhitm.c:3014–3096` (`mhitm_ad_curs` mhitm arm); `uhitm.c:2362–2415` (`mhitm_ad_dcay` mhitm arm); `uhitm.c:3836–3894` (`mhitm_ad_deth`, whose uhitm arm `goto`s the mhitm arm); `uhitm.c:2489–2515` (`mhitm_ad_drli` mhitm arm, `is_death` redirect); `uhitm.c:4803` dispatch; `mon.c` `monkilled` `fltxt &&` pline gate.
**JS:** 1 file (`js/mhitm.js` +183/−4). New imports: `night` (calendar.js, no cycle); `resists_drli` (zap.js, imports.mjs SAFE, hoisted function); `were_change`, `defended`, `is_undead`, `is_were`, `ERODE_ROT` on existing edges. Local `PM_GREMLIN` / `AD_CURS|DCAY|DETH` consts in the file's existing style.
**Change:** added file-local `mhitm_ad_curs` / `_dcay` / `_deth` / `_drli` ported from the C mhitm arms, plus one `mdamagem` block that dispatches them. That block uses the sibling tail: knockback preempt, then `done`, then `!damage`, then HP/lifesave/grow_up.
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_curs --full` → PASS syntax (js/mhitm.js) · PASS rule2 · note hidden: no corpus session is blocked on mhitm_ad_curs at HEAD, so this is not a corpus PASS. The queue row cited no corpus blocks, so no `--base` re-run is owed · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 passing. VERIFY: PASS.
**Named:** `monkilled` pet «May %s rot/rust/roast in peace» tail (`noit_mon_nam`); `monkilled` `iflags.sad_feeling = FALSE` reset on the non-pline path; uhitm (hero-poly) CURS/DCAY arms (next Open row `damageum_adtyping`).
**Next:** the Open head is `damageum_adtyping` hero-poly SGLD/CURS/DCAY/SLIM. Do not re-pop mon→mon CURS/DCAY/DETH/DRLI.

## 2026-09-10 — D-2259 `uhitm.c` mhitu PM identity: `mons()` factory vs `&mons[PM_*]` (review 1217 Must-fix)

**C locus:** `uhitm.c:3038–3041` (`mhitm_ad_curs` mhitu: `!night() && pa == &mons[PM_GREMLIN]`); `uhitm.c:2299–2316` (`mhitm_ad_rust` mhitu `completelyrusts`); `uhitm.c:2362–2390` (`mhitm_ad_dcay` mhitu `completelyrots`); `uhitm.c:2561–2587` (`mhitm_ad_fire` mhitu `completelyburns`); `uhitm.c:3530–3574` (`mhitm_ad_slim` mhitu `pd == &mons[PM_GREEN_SLIME]`); `mondata.h:223–227` (`completelyburns` / `completelyrots` / `completelyrusts`).
**JS:** 1 file (`js/mhitu.js` ~+8/−7). Must-fix one-liner cluster; C is that small. Under the 600/10 caps.
**Change:** those five gates now use `(data?.mndx | 0) === PM_*` like `hates_light` / `is_wooden`. Daytime gremlin returns before `rn2(10)`. Clay-golem `u.umonnum` was already an index compare and is unchanged.
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_curs` → PASS syntax (js/mhitu.js) · PASS rule2 · note hidden: no corpus session is blocked on mhitm_ad_curs at HEAD — a vacuous verify is NOT a corpus PASS. The queue row cited a review, not N corpus blocks, so no `--base` re-run is owed · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (mhitu.js not in the auto-full list). VERIFY: PASS.
**Named:** uhitm (hero-poly) and mhitm (mon→mon) arms of CURS/DCAY/SLIM/DETH stay named (Open rows; Must-fix stays alone).
**Next:** do not re-pop the mhitu PM-identity one-liner. The live Open head is `mdamagem` AD_CURS/AD_DCAY/AD_DETH (mon→mon).

## 2026-09-10 — D-2258 `trap.c` trapeffect_magic_trap: full `steedintrap` + `domagictrap` fate 13/15/20 (queue row, trace reach only)

**C locus:** `trap.c:2292–2320` (`trapeffect_magic_trap`); `trap.c:3101–3168` (`steedintrap`); `trap.c:4316–4451` (`domagictrap`, cases 13/15/20).
**JS:** 1 file (`js/trap.js` +105/−32). Under the 600/10 caps.
**Change:** `trapeffect_magic_trap` now follows the C body: explosion returns before steed; else `domagictrap` then `steedintrap(trap, null)`. New `steedintrap(trap, otmp)` is the C switch (ARROW `thitm(8)` / DART `thitm(7)` / SLP_GAS `sleep_monst` / LANDMINE `thitm rnd(16)` / PIT DEADMONSTER||`thitm rnd(6|10)` / POLY `resists_magm` short-circuit then `resist(WAND_CLASS, NOTELL)` + `newcham(NULL, NC_SHOW_MSG)` / default no-op; death → `dismount_steed(DISMOUNT_POLY)`). Pit caller uses it (clone deleted).
**Verify:** `node scripts/verify.mjs --fn trapeffect_magic_trap` → PASS syntax (js/trap.js) · PASS rule2 · note hidden: no corpus session is blocked on trapeffect_magic_trap at HEAD. The row cited trace reach, not blocks, so no `--base` re-run is owed, and this is NOT a corpus PASS · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (trap.js not in the auto-full list). Hand `node frozen/ps_test_runner.mjs sessions` → **44/44** (RNG 792,838 / screens 11,405) including seed0012 fate 13, seed0030 hero `rn2(30)`+fate 11, seed4500 knight `rn2(21)`, seed0103/0104 ride.
**Named:** dart/arrow `u.usteed && !rn2(2) && steedintrap` call sites; slp_gas hero `fall_asleep` + its `steedintrap`; landmine `recursive_mine`/`steedintrap`; poly `trapeffect` (selector default) + its `steedintrap`; fate<10 nearby-gremlin light (C comment only). `steedintrap` itself is the full C switch; those other trapeffects still do not call it.
**Next:** trapeffect_magic_trap / steedintrap / domagictrap 13/15/20 are C-shaped, so do not re-pop them. The 2 trace-reach sessions belong to their recorded first-diff owners. Dart/arrow/slp/landmine/poly steedintrap call sites are their own rows if a corpus session ever owns them.

## 2026-09-10 — D-2257 `mthrowu.c` m_lined_up C-exact mux/concealment + `thrwmm` live (`mattackm` AT_WEAP ranged) (queue row, trace reach only)

**C locus:** `mthrowu.c:1375–1393` (`m_lined_up`); `mthrowu.c:1396–1401` (`lined_up`); `mthrowu.c:260–314` (`monshoot`); `mthrowu.c:968–1012` (`thrwmm`); `mhitm.c:393–404` (`mattackm` AT_WEAP ranged); `monst.h:71` (`U_AP_TYPE` = `youmonst.m_ap_type & M_AP_TYPMASK`).
**JS:** 2 files (`js/mthrowu.js` +~100/−45, `js/mhitm.js` +7/−7). Under the 600/10 caps.
**Change:** `m_lined_up` now uses mux/muy `| 0` with no hero-ux fallback, and the C `utarget && Upolyd && rn2(25) && (uundetected || unusual AP)` chain (`M_AP_TYPE(you)` is `U_AP_TYPE`). `spitmm` tx/ty and `thrwmu` retreat `distmin` match. `monshoot` follows C: distance is `mtarget.mx/my` else mux/muy; `gm.m_shot`; canseemon `set_msg_xy` + `obj_is_pname ? the : an` + `" at "` `some_mon_nam(mtarg)`; `DEADMONSTER` breaks the remaining volley.
**Verify:** `node scripts/verify.mjs --fn m_lined_up` → PASS syntax (js/mhitm.js js/mthrowu.js) · PASS rule2 · note hidden: no corpus session is blocked on m_lined_up at HEAD. The row cited trace reach, not blocks, so no `--base` re-run is owed, and this is NOT a corpus PASS · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (mthrowu/mhitm not in the auto-full list). Hand `node frozen/ps_test_runner.mjs sessions` → **44/44** (RNG 792,838 / screens 11,405) because `monshoot` is on the hero throw path (`m_shot`, mux, `obj_is_pname`).
**Named:** `thrwmu` polearm / `autoreturn_weapon` `always_toss` (pre-existing); `linedup_callback` (muse.c floor-corpse, D-1810).
**Next:** m_lined_up / thrwmm / monshoot are C-shaped, so do not re-pop them. A future mon-mon missile divergence attributes to `select_rwep` / `ohitmon` / `m_throw`, not a missing `thrwmm`. The 2 trace-reach sessions belong to their recorded first-diff owners.

## 2026-09-10 — D-2256 `sp_lev.c` splev_initlev cluster: `lspo_level_init` table defaults + `splev_init_present`/`icedpools` statics, MINES `linit->icedpools`, `sel_set_ter` ICE/CLOUD arms (queue row, trace reach only)

**C locus:** `sp_lev.c:2981–3018` (`splev_initlev`); `sp_lev.c:3834–3875` (`lspo_level_init`); `sp_lev.c:3788–3789` (`lspo_level_flags` "icedpools"); `sp_lev.c:4609–4630` (`sel_set_ter`); `sp_lev.c:6350–6351` (`sp_level_coder_init` resets).
**JS:** 1 file (`js/mklev.js`), +215/−287 (149 call-site renames, −127 literal lines, +~60 new code).
**Change:** new `lspo_level_init(tbl)`, which sets `splev_init_present = true`. It applies the `get_table_*_opt` defaults (style SOLIDFILL, fg ROOM, bg INVALID_TYPE, lit BOOL_RANDOM, filling = fg, corrwid/wallthick −1, rm_deadends = !deadends(TRUE)), maps bg INVALID_TYPE to MOAT for swamp or STONE otherwise, then calls `splev_initlev`. All 149 loader sites now call it, and the `icedpools:` literals are gone.
**Verify:** `node scripts/verify.mjs --fn splev_initlev` → PASS syntax (js/mklev.js) · PASS rule2 · note hidden: no corpus session is blocked on splev_initlev at HEAD. The row cited trace reach, not blocks, so no `--base` re-run is owed, and this is NOT a corpus PASS · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS. No RNG surface: `icedpool` is read only by `melt_ice` (zap.js).
**Named:** `gc.coder->lvl_is_joined` (write-only in pinned C); `sel_set_ter` `set_levltyp_lit` FALSE-return early-out (JS writes unconditionally; pre-existing); the JS `sel_set_ter` `tlit` falsy→nochange legacy (D-0807/D-0928, pre-existing).
**Next:** splev_initlev/lspo_level_init are now C-shaped, so do not re-pop them. The trace-reach tour sessions belong to their recorded first-divergence owners (`rloc` / `collect_coords`, see D-2255 Next).
