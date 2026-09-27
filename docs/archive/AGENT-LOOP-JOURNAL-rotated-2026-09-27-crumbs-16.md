# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-27 — D-2985 `align_str` names chaotic, neutral, lawful, unaligned, and unknown

**C locus:** `nethack-c/upstream/src/insight.c:3187–3200` `align_str`. The switch is on `(int) alignment`. `A_CHAOTIC` / `A_NEUTRAL` / `A_LAWFUL` / `A_NONE` return `"chaotic"` / `"neutral"` / `"lawful"` / `"unaligned"`. The fall-through return is `"unknown"`. No callees.
**JS:** `js/roles.js` `align_str` `:841`. Chaotic `:843`. Neutral `:845`. Lawful `:847`. Unaligned `:849`. Unknown `:852`. Quest import `js/quest.js:38`, call `:208`. Terrain altar `js/readobjnam.js:544`. Artifact remap `js/artifact.js:541–542`.
**Change:** One exported `align_str` keeps that C order, including `"unaligned"` and `"unknown"`. `alignment | 0` is the `(int)` cast (`undefined` becomes `0`, which is `A_NEUTRAL`). `quest.js` imports it (`imports.mjs --can` SAFE, hoisted) and the clone is gone.
**Verify:** `node scripts/verify.mjs --fn align_str` → PASS syntax (4 changed js file(s): js/artifact.js js/quest.js js/readobjnam.js js/roles.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** No arm of `align_str` is omitted. The `allmain.c:883` call is inside `#if 0` and is compiled out.
**Next:** `dothrow.c` `release_camera_demon` (next Open — coverage row).

## 2026-09-27 — D-2984 `botl_score` estimates score from gold, depth, and `u.urexp`

**C locus:** `nethack-c/upstream/src/botl.c:419–436` `botl_score`. `deepest_lev_reached(FALSE)` is cast to `long`. Carried coin is `money_cnt(gi.invent)` (first `COIN_CLASS` stack) plus `hidden_gold(FALSE)` (known containers only). Starting gold is subtracted and a deficit becomes `0`. The depth bonus is `50 * (deepest - 1)`, plus `10000` above 30 or `1000 * (deepest - 20)` above 20. `nowrap_add` (`integer.h:129`) adds that to `u.urexp` and saturates at `LONG_MAX`. This is not the death adjustment in `end.c` (that one uses `hidden_gold(TRUE)` and a tithe).
**JS:** `js/botl.js` `botl_score` `:2376`. Depth `:2379`. Gold `:2381–2384`. Depth bonus `:2386–2389`. `nowrap_add` `:2392`. `SCORE_ON_BOTL` `:2365`. `nowrap_add` export `js/end.js:118`.
**Change:** One exported `botl_score` keeps that C order. `deepest_lev_reached` is `hacklib.js`, `money_cnt` is `shk.js` (not the vault sum clone), `hidden_gold` is `vault.js` (`imports.mjs --can` SAFE, hoisted), and `nowrap_add` is the existing `end.js` helper, now exported. `gi.invent` is `game.invent`.
**Verify:** `node scripts/verify.mjs --fn botl_score` → PASS syntax (4 changed js file(s): js/botl.js js/display.js js/end.js js/insight.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** No arm of `botl_score` is omitted. `nowrap_add` saturates at `Number.MAX_SAFE_INTEGER` (the same analogue as `end.js`); a total between 2^53 and 2^63−1 is not an exact 64-bit `LONG_MAX`.
**Next:** `options.c` `show_menu_controls` (next Open — coverage row).

## 2026-09-27 — D-2983 `rnd_offensive_item` calls `which_armor` and `hard_helmet`

**C locus:** `nethack-c/upstream/src/muse.c:2035–2081` `rnd_offensive_item`. Animals, `AT_EXPL`, mindless, `S_GHOST`, and `S_KOP` return 0 with no RNG. Difficulty is `mons[monsndx(pm)].difficulty` (`monsndx` is `pm->pmidx`). Above 7, `!rn2(35)` returns `WAN_DEATH`. The switch is `rn2(9 - (difficulty < 4) + 4 * (difficulty > 6))`. Case 0 returns `SCR_EARTH` for `hard_helmet(which_armor(mtmp, W_ARMH))` or amorphous / wall-walker / noncorporeal / unsolid, else `FALLTHROUGH` to `WAN_STRIKING`. Cases 2–12 are the potion and wand returns. The trailing `return 0` is `/*NOTREACHED*/`.
**JS:** `js/makemon.js` `rnd_offensive_item` `:2238`. Early return `:2245`. `WAN_DEATH` `:2249`. Switch `:2251`. Helmet / earth `:2253–2257`. Fallthrough `:2260`. `WAN_STRIKING` `:2262`. Potions `:2263–2273`. Wands `:2274–2283`. `/*NOTREACHED*/` `:2286`.
**Change:** One exported `rnd_offensive_item` keeps that C order and calls `worn.js` `which_armor` and `do_wear.js` `hard_helmet` (`imports.mjs --can` SAFE, hoisted). The two locals are gone. `mon_difficulty(pm.mndx)` is `mons[pmidx].difficulty`, including the erinys update of that table.
**Verify:** `node scripts/verify.mjs --fn rnd_offensive_item` → PASS syntax (1 changed js file(s): js/makemon.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.4s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** No arm of `rnd_offensive_item` is omitted. File-local `attacktype` is `mondata.c` `attacktype` (`attacktype_fordmg` with `AD_ANY`); there is no exported `attacktype`.
**Next:** `botl.c` `botl_score` (next Open — coverage row).

## 2026-09-27 — D-2982 `check_wornmask_slots` checks worn bits and two-weapon state

**C locus:** `nethack-c/upstream/src/worn.c:355–471` `check_wornmask_slots`. `worn[]` is `worn.c:18–34`. `IGNORE_SLOTS` is `W_ART | W_ARTI | W_SADDLE | W_BALL | W_CHAIN`. A filled slot must be that invent object with this mask bit and no other bit outside `IGNORE_SLOTS`. Any other invent object with the bit is reported, except `uskin` when the bit is `W_ARM` and `I_SPECIAL` is set. Then, under `EXTRA_SANITY_CHECKS`, `uskin` must be in the pack with `W_ARM|I_SPECIAL`, be dragon scales, and match `mons[u.umonnum]`. `u.twoweap` requires `uwep` and `uswapwep`, no shield, two one-handed melee weapons or weapon-tools, and `could_twoweap(youmonst.data)`.
**JS:** `js/worn.js` `check_wornmask_slots` `:1264`. Slot table `:1270`. Ball/chain skip `:1295`. In-pack and bit checks `:1298–1316`. Other claimant `:1321`. Embedded scales `:1333`. Two-weapon `:1362`. `Dragon_scales_to_pm` index `:1237`.
**Change:** One exported `check_wornmask_slots` keeps that C order. Ball and chain slots are skipped. Slot pointers are `u.uarm` through `u.uchain`.
**Verify:** `node scripts/verify.mjs --fn check_wornmask_slots` → PASS syntax (2 changed js file(s): js/wizcmds.js js/worn.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** No arm of `check_wornmask_slots` is omitted. `sanity_check_worn` is named only in the comment at `worn.c:398` and is not called.
**Next:** `muse.c` `rnd_offensive_item` (next Open — coverage row).

## 2026-09-27 — D-2981 `You_see` dreams, senses, or sees

**C locus:** `nethack-c/upstream/src/pline.c:455–469` `You_see`. `va_start`, then Unaware → `YouPrefix` "You dream that you see ", else Blind → "You sense ", else "You see ". `strcat` appends `line`. `vpline` prints that format with the same args. `YouPrefix` is `pline.c:359–360`. Unaware is `youprop.h:399`. Blind is `youprop.h:104`.
**JS:** `js/display.js` `You_see` `:7751`. Unaware `:7753`. Blind `:7755`. else `:7757`. `vpline` `:7759`. `pline_mon` `:7655`.
**Change:** One exported `You_see` keeps that C order and calls `eat.js` `Unaware` and `invent.js` `Blind` (`imports.mjs --can` ALREADY). The four clones are gone. Callers that had hardcoded the sight line now call this export, with the name in a `%s` when C does.
**Verify:** `node scripts/verify.mjs --fn You_see --reach-all` → PASS syntax (13 changed js file(s): js/apply.js js/dbridge.js js/detect.js js/display.js js/do.js js/engrave.js js/fountain.js js/mhitm.js js/mkobj.js js/monmove.js js/region.js js/timeout.js js/trap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** No arm of `You_see` is omitted. `You_buf` stays unneeded (JS strings).
**Next:** `worn.c` `check_wornmask_slots` (next Open — coverage row).

## 2026-09-27 — D-2980 `singular` names one corpse with its monster type

**C locus:** `nethack-c/upstream/src/objnam.c:2091–2105` `singular`. If `otyp == CORPSE` and `func == xname`, `func` becomes `cxname`. Save `quan`, set it to `1L`, call `func`, restore `quan`, return that name.
**JS:** `js/objnam.js` `singular` `:1818`. Corpse rewrite `:1821`. Quantity save `:1822`, force `:1823`, call `:1824`, restore `:1825`. `js/read.js` `doread` grease arm `:2201`.
**Change:** A corpse passed with `xname` is named by `cxname` before the quantity is forced to 1 and restored. `doread` prints "This %s has no label." for a can of grease and returns ok. `singular` was already exported from `objnam.js` (`imports.mjs --can` ALREADY).
**Verify:** `node scripts/verify.mjs --fn singular --reach-all` → PASS syntax (2 changed js file(s): js/objnam.js js/read.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.4s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** No arm of `singular` is omitted.
**Next:** `pline.c` `You_see` (next Open — coverage row).
