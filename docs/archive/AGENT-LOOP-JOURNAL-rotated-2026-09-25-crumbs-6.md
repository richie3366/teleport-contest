# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-25 — D-2801 `start_timer` stores `MELT_ICE_AWAY` as index 8

**C locus:** `nethack-c/upstream/include/timeout.h:37–48` `MELT_ICE_AWAY` is the ninth `timeout_types` value (index 8). `timeout.c:1978–1990` `timeout_funcs[8]` is `melt_ice_away`. `timeout.c:2247–2292` `start_timer` stores that short. `timeout.c:2231–2237` `run_timers` calls `timeout_funcs[func_index].f` on `&arg`. `zap.c:5119–5131` `melt_ice_away` reads `arg->a_long`.
**JS:** `js/const.js` `MELT_ICE_AWAY` `:2262`, `NUM_TIME_FUNCS` `:3035`. `js/mkobj.js` `timeout_func_index` `:1225`, `start_timer` `:1249` (store `:1296`), `run_timers` `:1565` (`melt_ice_away` `:1574`).
**Change:** `MELT_ICE_AWAY` is `SHRINK_GLOB + 1` (8). `NUM_TIME_FUNCS` is 9. `start_timer` maps the legacy string, `melt_ice_away`, and nhl `melt-ice` to that index before the range check and stores the short.
**Verify:** `node scripts/verify.mjs --fn start_timer` → PASS syntax (2 changed js files: js/const.js js/mkobj.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: mkobj.js/const.js are outside the auto shared set) · VERIFY: PASS. `node frozen/ps_test_runner.mjs sessions` → 44/44 passing. Probe: string `MELT_ICE_AWAY` stores action 8, `spot_time_left` matches the number and the string, a second start returns false, `spot_stop_timers` with `melt-ice` clears the node.
**Named:** `nhlobj.c:591` `l_obj_timer_start` is still not a JS call. `objnam.c:5223` wish-corpse `ZOMBIFY_MON` stays deferred (`readobjnam.js` has no `obj_to_any`).
**Next:** next Must-fix (`js/mhitm.js` `resists_poison_mm` omits artifact and worn poison resistance, review 1756).

## 2026-09-25 — D-2800 `dodown` Flying includes the flying steed

**C locus:** `nethack-c/upstream/include/youprop.h:253–255` `Flying`. `do.c:1206` ceiling hider. `do.c:1258` `u_locomotion("jump")`, which reads `Flying` at `hack.c:1827`. Same macro at `do.c:276` and `:280` (pool splash) and `do.c:1763` (ladder " along").
**JS:** `js/do.js` import `:154`. Local `u_locomotion :553` calls `Flying()` at `:555`. Ceiling hider `:3043`. Hole verb `:3100`. Pool `:829` and `:833`. Climb along `:1863`.
**Change:** Import `Flying` from `mhitu.js` and delete the local clone. Ceiling-hider, local `u_locomotion`, the pool splash, and the climb " along" test now use `(HFlying || EFlying || (usteed && is_flyer(usteed.data))) && !BFlying`, with the existing sticky `u.Flying` early true. No new import edge (`imports.mjs --can` already).
**Verify:** `node scripts/verify.mjs --fn dodown` → PASS syntax (1 changed js file: js/do.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `do.c:1776` descend `else if (Flying)` is still sticky `u.Flying` at `js/do.js:1887`. `js/hack.js:2058` `u_locomotion` still reads sticky `u.Levitation` / `u.Flying` (capitalize and `locomotion()` poly fallback already named).
**Next:** next Must-fix (`js/mkobj.js` `start_timer` stores `MELT_ICE_AWAY` as func_index 0, review 1753).

## 2026-09-25 — D-2799 `petattr_to_tty` maps wintype attrs onto the terminal bitfield

**C locus:** `nethack-c/upstream/include/wintype.h:128–134` (`ATR_NONE` 0, `ATR_BOLD` 1, `ATR_DIM` 2, `ATR_ITALIC` 3, `ATR_ULINE` 4, `ATR_BLINK` 5, `ATR_INVERSE` 7). `options.c:3163` stores `match_str2attr`'s value in `iflags.wc2_petattr`. Paint is `wintty.c:3928` `term_start_attr(iflags.wc2_petattr)` → `termcap.c:1339–1376` `s_atr2str`. `initoptions` `:7264` stores `ATR_INVERSE` when the field is unset.
**JS:** `js/display.js` `petattr_to_tty :311`, called from `mon_map_attr :330` and `glyph_tty_attr :343`.
**Change:** Map none → 0, bold → terminal `ATR_BOLD` (2), underline → `ATR_UNDERLINE` (4), inverse → `ATR_INVERSE` (1). Dim, italic, and blink return 0 so they are not passed through. An unset field still paints inverse (the `initoptions` default; that assignment is not a JS function).
**Verify:** `node scripts/verify.mjs --fn optfn_petattr` → PASS syntax (1 changed js file: js/display.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `s_atr2str` italic falls through to underline when `ZH` is empty, and blink falls through to bold when `MB` is empty (`termcap.c:1343–1364`). This terminal has no italic or blink bit, so those enums paint as 0.
**Next:** next Must-fix (`js/do.js` `dodown` local `Flying` drops the steed-flyer, review 1752).

## 2026-09-25 — Audit 0cf2f655d (reviews 1749–1757) + cadence 44/44.

Reviews audit D-2790..D-2798 against pinned C (csym bodies + callers,
sym.mjs, per-SHA `hidden-proxy verify --reach-all`). 1749/1750/1754/1755/1757
ACCEPT. 1751 QUALITY-RISK: `petattr_to_tty` paints wintype bold (1) as
terminal inverse. 1752 QUALITY-RISK: `dodown` local `Flying` drops the
steed. 1753 QUALITY-RISK: `start_timer` stores `MELT_ICE_AWAY` as
`ROT_ORGANIC` (0). 1756 QUALITY-RISK: `resists_poison_mm` is the
intrinsic bits only; C `resists_poison` is `Resists_Elem`. Every
re-measure was 0 blocked on the 12-row board, smoke REACH-OK, 0
REGRESSED. Cadence at `0cf2f655d`: public 44/44, Scr 11,405, RNG
792,838, speed `238+1.57/turn` (R² 0.781); held-out 12/44 (+0, last
scored 2026-09-25T19:01Z, values identical). `hidden-proxy score`
saw 12 private recordings, 12/12 PASS; `.cache/hidden/sessions` is
empty (941 recipes), so the 614/940 fortress was not re-run and no
PASS→FAIL row was opened. Rule #2 clean. Next: Must-fix `petattr_to_tty`.

## 2026-09-25 — D-2798 `zap.c` fracture_rock whole-body port

**C locus:** `nethack-c/upstream/src/zap.c:5536–5578` `fracture_rock`. Callees: `get_obj_location`, `costly_spot`, `in_rooms`, `billable`, `You`, `s_suffix`, `shkname`, `xname`, `breakobj`, `sokoban_guilt`, `rn1`, `weight`, `dealloc_oextra`, `obj_extract_self`, `place_object`, `does_block`, `unblock_point`, `vision_recalc`, `cansee`, `newsym`. The `#` comment says breakobj charges and does not destroy a fracturing boulder or statue.
**JS:** `js/dig.js` `fracture_rock :1846`. Helpers: `js/monmove.js` `m_can_break_boulder :1804`, `m_break_boulder :1817`.
**Change:** Restart of `fracture_rock` in C order, async because `You` and `breakobj` can reach `--More--`. Hero-caused breakage in a costly spot bills through `breakobj` before the type changes. `sokoban_guilt` still sees `BOULDER`.
**Verify:** `node scripts/verify.mjs --fn fracture_rock` → PASS syntax (10 changed js files: js/dig.js js/dothrow.js js/explode.js js/mklev.js js/mon.js js/monmove.js js/shk.js js/trap.js js/vault.js js/zap.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `poly_obj` shop-anger bill (`zap.c:1965–1986`) stays named at `js/zap.js:5255`. `move_special` `m_move_aggress` (`priest.c:108–118`) stays named at `js/shk.js:4253`.
**Next:** next Open — coverage row (`polyself.c` mbodypart). `find_ac` is parked Stale. Same-file `Cloak_off` and `Boots_on` remain later Open rows.

## 2026-09-25 — D-2797 `uhitm.c` mhitm_ad_drst whole-body port

**C locus:** `nethack-c/upstream/src/uhitm.c:3122–3165` `mhitm_ad_drst`. Callees: `mhitm_mgc_atk_negated` (FALSE), `rn2`, `Your`, `mpoisons_subj`, `resists_poison`, `pline_The`, `mon_nam`, `rn1`, `hitmsg`, `s_suffix`, `Monnam`, `poisoned`, `pmname`, `Mgender`, `mhitm_really_poison` (`:3104–3118`). The only C call is `mhitm_adtyping` `:4809–4811` (`AD_DRST`/`AD_DRDX`/`AD_DRCO`). That switch is reached from `damageum` (`uhitm.c:4854`), `mdamagem` (`mhitm.c:1059`), and `hitmu` (`mhitu.c:1191`).
**JS:** `js/mhitm.js` `mhitm_ad_drst :1860`, `mpoisons_subj_mm :1798`, `mdamagem` dispatch `:5195`.
**Change:** One exported `mhitm_ad_drst` in C order. The magic-cancellation gate runs first. youmonst attacker: `!rn2(8)`, then resist message or `!rn2(10)` deadly (`damage = mhp`) else `rn1(10, 6)`. youmonst defender: strength/dexterity/constitution switch, `hitmsg`, then `poisoned(..., 30, FALSE)`. Otherwise `!rn2(8)` calls `mhitm_really_poison`.
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_drst` → PASS syntax (3 changed js files: js/mhitm.js js/mhitu.js js/uhitm.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: no shared file changed) · VERIFY: PASS.
**Named:** `resists_poison_mm` still omits artifact and worn poison resistance (same gap as `js/zap.js` `resists_poison`). A youmonst defender is passed to `mhitm_mgc_atk_negated` as null, the existing hero-MC idiom.
**Next:** next Open — coverage row (`do_wear.c` find_ac). Seven measured coverage rows remain. `port-coverage.mjs --rows 8` head is the Stale never-re-pop set (newcham/getobj/yn_function/getdir/mon_arrive/checkfile/make_blinded/really_done); not re-queued.
