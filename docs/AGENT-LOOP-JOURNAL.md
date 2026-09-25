# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-25 — D-2810 `petattr_to_tty` paints italic as underline and blink as bold

**C locus:** `nethack-c/upstream/win/tty/termcap.c:1339–1376` `s_atr2str`, called from `term_start_attr` `:1434`. ANSI default (`termcap.c:157–160`) sets `nh_HI`, `nh_US`, and `MR`. `ZH`, `MB`, `MD`, and `MH` stay null (`:46–47`). Italic falls through the empty `ZH` test into underline (`:1343–1356`). Blink finds `MB` null and falls through to bold (`:1349–1364`). Dim stays `nulstr` (`:1370–1374`). The pet site is `wintty.c:3928` `term_start_attr(iflags.wc2_petattr)`.
**JS:** `js/display.js` `petattr_to_tty` `:308`. `mon_map_attr` `:332`. `glyph_tty_attr` `:345`.
**Change:** Same switch order as `s_atr2str` for those capabilities. Italic and underline return terminal `ATR_UNDERLINE` (4). Blink falls through and returns terminal `ATR_BOLD` (2).
**Verify:** `node scripts/verify.mjs --fn optfn_petattr` → PASS syntax (1 changed js file: js/display.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** `s_atr2str` is not a general export. Other `term_start_attr` sites in review 1758 (`wintty.c:1186`, `:1318`, `:1807`, `:2338`, `:2350`, `:3935`, `:4959–4969`, `:5170`) are menu, status, or inverse, not `wc2_petattr`.
**Next:** `getpos.c` `coord_desc` (next Open — coverage row).
## 2026-09-25 — D-2809 `Boots_on` fumble timeout saturates at TIMEOUT

**C locus:** `nethack-c/upstream/src/do_wear.c:231–234` `Boots_on` `FUMBLE_BOOTS` `incr_itimeout(&HFumbling, rnd(20))`. `do_wear.c:584–586` `Gloves_on` is the same call. `potion.c:55–85` `itimeout` saturates at `TIMEOUT` and floors below 1; `incr_itimeout` stores that through `set_itimeout`.
**JS:** `js/do_wear.js` `Boots_on` `:1513`. `Gloves_on` `:1423`. `incr_itimeout` is `js/potion.js:540` (`imports.mjs --can`: already imported).
**Change:** Seed the slot from the merged flat (C `HFumbling` is one long), call `incr_itimeout(prop, rnd(20))`, then set `u.HFumbling` from `prop.intrinsic`. A timeout already at `TIMEOUT` plus 20 stays `TIMEOUT`. The old mask turned that sum into 19.
**Verify:** `node scripts/verify.mjs --fn Boots_on` → PASS syntax (1 changed js file: js/do_wear.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: do_wear.js is outside the auto shared set) · VERIFY: PASS. Probe: slot at `TIMEOUT` plus 20 stays 16777215 (old mask was 19); `TIMEOUT-5` plus 20 stays `TIMEOUT` (old mask 14); 3 plus 7 stays 10.
**Named:** A null `uarmf` still returns before the switch (C would dereference).
**Next:** `js/display.js` `petattr_to_tty` italic and blink (next Must-fix, review 1758).
## 2026-09-25 — D-2808 `unstuck` places the ball and chain on a swallowed exit

**C locus:** `nethack-c/upstream/src/mon.c:3438–3467` `unstuck`. Swallowed exit `:3448–3456`: clear `mswallower`, set `u.ux`/`u.uy` from the engulfer, `placebc` when `Punished && uchain->where != OBJ_FLOOR` (`:3451–3452`), then `vision_full_recalc` and `docrt`. Re-engulf `mspec_used = rnd(2)` `:3458–3465`.
**JS:** `js/mhitu.js` `unstuck` `:1637`. `OBJ_FLOOR` joins the existing `const.js` import. `placebc` (`ball.js:380`) and `Punished` (`pray.js:245`) were already live.
**Change:** After `ux`/`uy` and before `vision_full_recalc`, call `placebc` when `Punished()` and `uchain.where` is not `OBJ_FLOOR`. That is the call `thitmonst`'s iron-ball `return 1` (`dothrow.c:2240–2241`) assumes has already put `uball` down.
**Verify:** `node scripts/verify.mjs --fn unstuck --reach-all` → PASS syntax (2 changed js files: js/dothrow.js js/mhitu.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: no shared file changed) · VERIFY: PASS.
**Named:** `mhitm.c:1255` `slept_monst` is still three local clones that clear `ustuck` (`js/mhitm.js:1381` `slept_slee_mm`, `js/music.js:328`, `js/potion.js:3730`). The C gate is `!u.uswallow`, so this swallow `placebc` would not run there; `mspec_used = rnd(2)` is skipped.
**Next:** `js/do_wear.js` `Boots_on` `FUMBLE_BOOTS` timeout saturate (next Must-fix, review 1762).
## 2026-09-26 — Audit e1ef155a9 (reviews 1758–1766) + cadence 44/44.

Reviews audit D-2799..D-2807 against pinned C (csym bodies + callers,
sym.mjs, per-SHA `hidden-proxy verify --reach-all`). 1759/1760/1761/1764/1765/1766
ACCEPT. 1758 QUALITY-RISK: `petattr_to_tty` returns 0 for italic and blink;
`s_atr2str` paints those as underline and bold. 1762 QUALITY-RISK:
`Boots_on` fumble adds `rnd(20)` with `& TIMEOUT` and wraps. 1763
QUALITY-RISK: a swallowed iron ball returns 1 from `thitmonst` while
`unstuck` still skips `placebc`. Every re-measure was 0 blocked on the
12-row board, smoke REACH-OK, 0 REGRESSED. Cadence at `e1ef155a9`:
public 44/44, Scr 11,405, RNG 792,838, speed `252+1.58/turn` (R² 0.767);
held-out 12/44 (+0, last scored 2026-09-25T19:01Z). `hidden-proxy score`
12/12 PASS; `.cache/hidden/sessions` is empty (941 recipes), so the
614/940 fortress was not re-run and no PASS→FAIL row was opened. Rule #2
clean. Next: Must-fix `unstuck` `placebc`.
## 2026-09-25 — D-2807 `bhito` follows the wand-on-object switch in C order

**C locus:** `nethack-c/upstream/src/zap.c:2119–2424` `bhito`. Self-hit `:2130`. Bypass `:2133–2170`. Floor check `:2178–2179`. Ball and chain `:2181–2188`. Polymorph conduct and cover `:2191–2220`. Probing `:2222–2274`. Striking `:2275–2312`. Cancel `:2313–2317`. Drain `:2318–2320`. Teleport `:2321–2329`. Make-invisible `:2330–2331`. Undead turning `:2332–2392`. Opening and locking `:2393–2403`. No-effect objects `:2404–2410`. Stone to flesh `:2412–2414`. Default `:2415–2417`. `learnwand` `:2421–2422`.
**JS:** `js/zap.js` `bhito` `:5393`. `upstart` from `hacklib.js`, `Soundeffect` from `sndprocs.js`, `se_crumbling_sound` from `generated/seffects_data.js` (`imports.mjs --can`: no cycle). `cxname_singular`, `corpse_revive_type`, `noname_monnam`, `type_is_pname`, `pline_The`, and `newsym_force` join imports that were already live.
**Change:** One `bhito` in that C order. `res` starts at 1. Make-invisible breaks and leaves it.
**Verify:** `node scripts/verify.mjs --fn bhito` → PASS syntax (1 changed js file: js/zap.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: zap.js is outside the auto shared set) · VERIFY: PASS. `port-coverage.mjs --name bhito` now reports covered.
**Named:** `debugpline1` "pulsate" (`zap.c:2168`) has no JS function; the stray bypass bit is still cleared. `maybe_unhide_at` still omits the hero `uundetected` path (named on that callee).
**Next:** `getpos.c` `coord_desc` (next Open — coverage row).
## 2026-09-25 — D-2806 `addinv_core0` inserts, merges, and fills the quiver in C order

**C locus:** `nethack-c/upstream/src/invent.c:1056–1148` `addinv_core0`. `OBJ_FREE` panic `:1063`. `LOST_EXPLODING` null `:1065`. `no_charge` and `picked_container` `:1070–1074`. `how_lost` sampled then `LOST_NONE` `:1073–1074`. Quiver `merged` `:1101–1106`. Chain `merged` `:1108–1115`. Head insert plus `reorder_invent` only when `invlet_constant`, else append `:1117–1126`. Thrown empty-quiver `setuqwep` on the fresh path only `:1128–1140`. `added` `:1142–1147`.
**JS:** `js/u_init.js` `addinv_core0` `:1043`. `addinv` `:1153`. `addinv_before` `:1161`. `picked_container` from `shk.js` and `update_inventory` / `invlet_constant` from `invent.js` (`imports.mjs --can`: hoisted, cycle-safe).
**Change:** One `addinv_core0` in that C order. `where` must be `OBJ_FREE` (unset counts as free) or the function throws. `how_lost` is cleared before `addinv_core1`, so `merged` sees `LOST_NONE`.
**Verify:** `node scripts/verify.mjs --fn addinv_core0` → PASS syntax (4 changed js files: js/do.js js/dothrow.js js/invent.js js/u_init.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS. The first reach run regressed `seed8243-samurai-tutorial` with `addinv: obj not free` on tutorial exit; `tutorial_enter_gamestate` now sets `where` to `OBJ_FREE` before the re-run.
**Named:** `addinv_core2` still omits `set_moreluck`. `merged` still rejects a worn incoming object (D-2324).
**Next:** `hack.c` `domove_fight_web` (next Open — coverage row).
## 2026-09-25 — D-2805 `arti_invoke` keeps ECMD_OK when the power is unknown

**C locus:** `nethack-c/upstream/src/artifact.c:2130–2232` `arti_invoke`. Null `:2136–2138`. No `inv_prop` `:2141–2147` (`use_crystal_ball(&obj)` or `pline1(nothing_happens)`). Specials `:2150–2174` (`res` starts `ECMD_OK`; default is `impossible` and does not change `res`). Property xor `:2178–2229`. Caller `untouchable` `:2597–2636` and walker `retouch_equipment` `:2639–2705`.
**JS:** `js/artifact.js` `arti_invoke` `:2213`. `untouchable` `:1579`. `retouch_equipment` `:1619`. `float_up` / `float_down` / `selftouch` join the existing `trap.js` import. `clear_bypasses`, `bypass_obj`, `nxt_unbypassed_obj`, `which_armor` from `worn.js` and `dismount_steed` from `steed.js` (`imports.mjs --can`: hoisted, cycle-safe).
**Change:** One `arti_invoke` in that C order. Null calls `impossible` and returns `ECMD_OK`. The special switch assigns `res` and the unknown-power arm calls `impossible` without changing `res`.
**Verify:** `node scripts/verify.mjs --fn arti_invoke` → PASS syntax (1 changed js file: js/artifact.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: artifact.js is outside the auto shared set) · VERIFY: PASS.
**Named:** `retouch_equipment` callers stay at the old comments: `attrib.c:1360` (`js/attrib.js:825`), `eat.c:1325` (`js/eat.js:2019`), `polyself.c:463` (`js/polyself.js:1070`), `polyself.c:1021` (`js/polyself.js:1739`), `polyself.c:1415` (`js/polyself.js:1126`), `uhitm.c:4285` (`js/mhitu.js:2853`). `use_crystal_ball` still takes the object, not `struct obj **`; explode/implode `*optr = 0` is inside that callee and `arti_invoke` does not read `obj` after the call.
**Next:** `objnam.c` `distant_name` (next Open — coverage row).
## 2026-09-25 — D-2804 `thitmonst` hits with the iron ball, boulder, and thrown potion

**C locus:** `nethack-c/upstream/src/dothrow.c:2011–2304` `thitmonst`. After the weapon arm (`:2155–2232`): `HEAVY_IRON_BALL` `:2234–2246` (`exercise(A_STR)` always, `exercise(A_DEX)` then `hmon` on a hit, return 1 when a swallowed `uball` killed the engulfer), `BOULDER` `:2248–2255`, egg/pie/venom `:2257–2261`, `potionhit(..., POTHIT_HERO_THROW)` `:2263–2266`. Mulch is `:2221–2226` (`check_shop_obj` then `obfree`). Unknown bow gloves call `impossible` at `:2069`. The non-ammo penalty is `obj == gt.thrownobj` at `:2187`, not the thrown hmode.
**JS:** `js/dothrow.js` `thitmonst` `:574`. Mulch `:732`. Iron ball `:746`. Boulder `:764`. Potion `:781`.
**Change:** Restart of the hit chain in C order. Ball and boulder exercise strength before the roll and dexterity before `hmon`. The ball returns true only when `hmon` reports the monster dead, the hero was swallowed, `uswallow` is now clear, and `obj` is still `uball`.
**Verify:** `node scripts/verify.mjs --fn thitmonst` → PASS syntax (1 changed js file: js/dothrow.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: dothrow.js is outside the auto shared set) · VERIFY: PASS.
**Named:** `tmiss` still calls local `miss_missile` rather than `zap.c` `miss` (`is_plural` wording). `unstuck` (`js/mhitu.js:1636`) still omits `Punished && uchain->where != OBJ_FLOOR` `placebc` (`mon.c:3452`); the iron-ball return 1 assumes that call already placed `uball`.
**Next:** `uhitm.c` `mhitm_ad_curs` (next Open — coverage row).
## 2026-09-25 — D-2803 `Cloak_off` and `Boots_on` follow the C otyp switches

**C locus:** `nethack-c/upstream/src/do_wear.c:383–431` `Cloak_off`. `do_wear.c:186–259` `Boots_on`. `do_wear.c:2375` `gw.wasinwater = u.uinwater` in `accessory_or_armor_on`, read by the water-walking arm.
**JS:** `js/do_wear.js` `Cloak_off` `:883`. `Boots_on` `:1457`. `game.wasinwater` `:3208`.
**Change:** Both functions restarted in C order. `Cloak_off` keeps `oldprop` from before `setworn`, then the plain-cloak breaks, elven, displacement, mummy `Invis && !Blind` `newsym` + `You`, invisibility `!oldprop && !HInvis` `makeknown` + `pline`, alchemy `EAcid_resistance &= ~WORN_CLOAK`, and the default `impossible`. `Boots_on` adds the plain-boot breaks, water-walking `spoteffects(TRUE)` plus the snapshot, levitation `float_up` / `spoteffects(FALSE)` or `float_vs_flight`, the default `impossible`, and the `known` + `update_inventory` tail.
**Verify:** `node scripts/verify.mjs --fn Cloak_off` → VERIFY: PASS (syntax 1 changed js file `do_wear.js`; Rule #2; hidden note 0 blocked — normal for a coverage row; reach: no RNG-tagged reach, fixed smoke 12/12 REACH-OK 0 regressed; green 2/2; strict 2/2; cohort 7/7; full skipped — `do_wear.js` is outside the auto shared set). `node scripts/verify.mjs --fn Boots_on` → same PASS, smoke 12/12 REACH-OK.
**Named:** A null `uarmc` / `uarmf` still returns after `clear_worn` (C would dereference). `incr_itimeout(&HFumbling, rnd(20))` stays the dual-write of the flat and `uprops` slot (`potion.js` `incr_itimeout` writes only the slot object).
**Next:** `dothrow.c` `thitmonst`.
## 2026-09-25 — D-2802 `resists_poison` follows `Resists_Elem`

**C locus:** `nethack-c/upstream/include/monst.h:277` `resists_poison(mon)` is `Resists_Elem(mon, POISON_RES)`. `mondata.c:129–197` `Resists_Elem`: for property 1..8, hero `u.uprops` intrinsic||extrinsic, else `mon_resistancebits` (`monst.h:270–271`) `& (1 << (prop-1))`; then wielded artifact `defends(prop+1)`; then worn `oc_oprop`, worn alchemy smock for poison and acid, and `defends_when_carried`. `prop+1` is the damage type (`:152`): poison is `AD_DRST` (7). Stone is `AD_SPC1` (9), not `AD_STON`.
**JS:** `js/mondata.js` `Resists_Elem :239`. `js/mhitm.js` `resists_poison_mm :1817` (callers `:1833`, `:1872`). `js/zap.js` `resists_poison :1456` (poison-gas `:1963`). `js/potion.js:3956`.
**Change:** `Resists_Elem` in `js/mondata.js` in that C order. Hero resistance reads `u.uprops` and the flat `H*`/`E*` mirrors of the same storage. `resists_poison_mm` and the `resists_poison` export call it with `POISON_RES`.
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_drst` → PASS syntax (7 changed js files: explode, mhitm, mon, mondata, potion, region, zap) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: those files are outside the auto shared set). `node frozen/ps_test_runner.mjs sessions` → 44/44 passing. Probe: worn alchemy smock resists poison and acid; unworn smock does not; wielded Grimtooth resists poison; worn ring of poison resistance resists; unworn ring does not; species `MR_POISON` still resists.
**Named:** `resists_fire`, `resists_cold`, `resists_elec`, `resists_disint`, `resists_acid`, `resists_sleep`, and `resists_ston` still use the bit test (zap.js helper and the clones in explode.js, mhitm.js, mon.js, trap.js, pray.js, monsters.js). `potion.js` `resists_elem_pot` still does for sleep and acid.
**Next:** next Open coverage row (`polyself.c` `mbodypart`).
