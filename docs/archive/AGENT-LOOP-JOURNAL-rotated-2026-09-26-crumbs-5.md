# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-26 — D-2828 `mcast_insects` summons in C order and reports through `pline_mon`

**C locus:** `nethack-c/upstream/src/mcastu.c:645–726` `mcast_insects`. The class letter is `mkclass(S_ANT)` else `S_SNAKE` (`:650–652`). `quan` is `m_lev < 2 ? 1 : rnd(m_lev / 2)`, then at least 3 (`:659–661`). The loop is `i <= quan`; `!enexto` returns with no message (`:662–664`). Each success clears `msleeping` / `mpeaceful` / `mtame` and calls `set_malign` (`:670–672`). `seecaster` is `canseemon || tp_sensemon || Detect_monsters` (`:677`). Hallucination replaces `what` with `makeplural(bogusmon(whatbuf, NULL))` (`:680–681`). Unseen: short `You_hear` when nothing new is spotted or `Unaware`; otherwise `strcpy` into `whatbuf`, then singular `an(makesingular)` or the plural buffer, `Soundeffect(se_someone_summoning, 100)` and `You_hear` when `!Deaf`, else `pline` + `upstart` (`:684–704`). Seen: sticks / snakes / invisible spot / displaced image / plain summons, then `pline_mon` (`:706–724`).
**JS:** `js/mcastu.js:689` `mcast_insects` (through `:767`). `insects_Unaware` `:628`, `insects_Deaf` `:639`, `insects_Invis` `:660`, `insects_Displaced` `:674`. `hero_Hallucination` import `:23`. `unconscious` `:51`, `is_fainted` `:52`. `Soundeffect(se_someone_summoning, 100)` `:743`.
**Change:** One `mcast_insects` in that C order. `Hallucination` is the `display.js` export. `Unaware` is `multi < 0 && (unconscious() || is_fainted())`.
**Verify:** `node scripts/verify.mjs --fn mcast_insects` → PASS syntax (1 changed js file: js/mcastu.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** A null `mtmp.data` makes `perceives` false (C would dereference). A missing `game.u` is a local object, so the position tests compare against 0.
**Next:** `trap.c` `rescued_from_terrain` (next Open — coverage row). Coverage queue stays at 8, inside the 8–12 band, so no refill.

## 2026-09-26 — D-2827 `inv_weight` skips a boulder when the hero throws rocks

**C locus:** `nethack-c/upstream/src/hack.c:4351–4365` `inv_weight`. Coins add `(int)((quan + 50) / 100)`. Otherwise add `owt` only when `otyp != BOULDER || !throws_rocks(youmonst.data)` (`:4359–4360`). Then `wc = weight_cap()` and return `wt - wc`.
**JS:** `js/invent.js:1126` `inv_weight`. `throws_rocks` is the existing `js/monsters.js:583` export. `OTYP_BOULDER` is the existing `js/invent.js:5099` const. `gw.wc` is `game._weight_cap`.
**Change:** Restart `inv_weight` in that C order, including the boulder short-circuit, and call it from `u_init_carry_attr_boost` (`while (inv_weight() > 0)` silent `adjattrib` STR then CON).
**Verify:** `node scripts/verify.mjs --fn inv_weight` → PASS syntax (2 changed js files: js/invent.js js/u_init.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** A null `youmonst.data` makes `throws_rocks` false, so a boulder is counted (C would dereference). `do.c:1324` `near_capacity()` climb gate stays omitted in `doup` (`js/do.js:3157`); the `:1325` line is a comment, not an `inv_weight` call.
**Next:** `mcastu.c` `mcast_insects` (first Open — coverage row). Coverage queue stays at 9, inside the 8–12 band, so no refill.

## 2026-09-26 — D-2826 `domove_fight_empty` uses the `youprop.h` `Hallucination`

**C locus:** `nethack-c/upstream/include/youprop.h:116–120` `Hallucination` is `HHallucination && !Halluc_resistance` (`HHallucination` is `u.uprops[HALLUC].intrinsic`; resistance is `uprops[HALLUC_RES]` intrinsic or extrinsic). `hack.c:2263–2264` `domove_fight_empty` uses that macro: `glyph_is_statue(glyph) || (Hallucination && glyph_is_monster(glyph))` then `sobj_at(STATUE)`. The same macro is `hack.c:1940` `domove_bump_mon` (`mpeaceful && !Hallucination`).
**JS:** `js/cmd.js:20` import. Statue arm `js/cmd.js:2400`. Peaceful bump `js/cmd.js:4460`. `Hallucination` body `js/display.js:1091`.
**Change:** Re-point the `js/cmd.js` import to `js/display.js` `Hallucination`. The module edge already existed; the call stays after the glyph tests, so there is no init-time read. `m_monnam` / `mon_nam` stay on `do_name.js`.
**Verify:** `node scripts/verify.mjs --fn domove_fight_empty` → PASS syntax (1 changed js file: js/cmd.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** `js/do_name.js:255` `Hallucination` still returns on sticky `u.Hallucination` before resistance and ignores `uprops[HALLUC]`. Other importers of that export (`hack.js`, `zap.js`, and the local clones in `do.js` / `mon.js`) are unchanged.
**Next:** `hack.c` `inv_weight` (next Must-fix: boulder weight when `throws_rocks`).

## 2026-09-26 — review 1776–1784 (audit, no port)

Reviewed `b05a6b770` through `b60cf8e62` (D-2817–D-2825), one file per SHA. 7 ACCEPT (`1776`, `1777`, `1779`–`1783`). 2 QUALITY-RISK: `1778` `inv_weight` drops the boulder/`throws_rocks` skip; `1784` `domove_fight_empty` calls `Hallucination` from `do_name.js:255` instead of `display.js:1091`. Both are Must-fix. Next cluster is the fight-empty re-point.
Public `sessions` on `b60cf8e62`: 44/44, screens 11,405/11,405, RNG 792,838/792,838, speed `265+1.67/turn` (R² 0.736). Held-out 12/44, 6,059/11,265, RNG 29.2 %, screens 53.8 % (scored 2026-09-26T01:28Z). Private recordings 12/12. No `js/` edits.

## 2026-09-26 — D-2825 `domove_fight_empty` spends the turn on an empty force-fight

**C locus:** `nethack-c/upstream/src/hack.c:2229–2338` `domove_fight_empty`. Off-edge rewrites local `x,y` to `(0,1)` and uses `GLYPH_UNEXPLORED`. The guard is `forcefight || (glyph_is_invisible(glyph) && !m_at && !nopick)`. `solid` is `off_edge || !accessible || IS_FURNITURE`. `!Underwater`: `sobj_at(BOULDER)`, then a statue glyph or `Hallucination && glyph_is_monster` replaces it with `sobj_at(STATUE)`; `forcefight && uwep && dig_typ && !glyph_is_invisible && !glyph_is_monster` calls `use_pick_axe2` and returns. Otherwise `unmap_object`, `map_object(boulder, TRUE)`, `newsym`, `glyph_at` (`nhUse`). The name is `ansimpleoname`, or underwater `!is_pool` ("an air bubble" on water-level `AIR`, else "nothing"), or solid seen / `IS_STWALL` / `SDOOR` / `SCORR` via `the(defsyms[glyph_to_cmap(back_to_glyph)].explanation)`, else "an unknown obstacle", else "thin air". `You` adverb, `nomul(0)`, then `AT_EXPL` `wake_nearto(ux, uy, 49)`, `explum(NULL, attk)`, `mh = -1`, `rehumanize`.
**JS:** `js/cmd.js` `domove_fight_empty` `:2361`. `domove` call `:4681`. `js/hack.js` `move_out_of_bounds` `:2633`.
**Change:** One `domove_fight_empty` in that C order. `dig_typ` and `use_pick_axe2` are the `dig.js` exports (`imports.mjs --can`: hoisted, cycle-safe). `accessible`, `sobj_at`, `ansimpleoname`, `the`, `back_to_glyph`, `glyph_to_cmap`, `defsym_explanation`, `glyph_is_statue`, and `glyph_is_monster` are the existing exports.
**Verify:** `node scripts/verify.mjs --fn domove_fight_empty` → PASS syntax (2 changed js files: js/cmd.js js/hack.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** A null `youmonst.data` makes `attacktype_fordmg` return null (C would dereference), so the explode arm stays off. A missing `game.u` is a local object, so `mh = -1` does not reach the hero.
**Next:** `mcastu.c` `mcast_insects` (next Open — coverage row).

## 2026-09-26 — D-2824 `dmonsfree` frees dead monsters and clears `purge_monsters`

**C locus:** `nethack-c/upstream/src/mon.c:2487–2511` `dmonsfree`. `DEADMONSTER` is `mhp < 1` (`monst.h:214`); `isgd` stays on the list. Unlink, `nmon = NULL`, `dealloc_monst`, then `count` must equal `iflags.purge_monsters` or `impossible` with `describe_level(buf, 2)`, then `purge_monsters = 0`. `dealloc_mextra` (`:2648–2673`) and `dealloc_monst` (`:2675–2691`, `*mon = cg.zeromonst`). `m_detach` (`:2796`) is the only `purge_monsters++`.
**JS:** `js/mon.js` `dealloc_mextra` `:3423`, `dealloc_monst` `:3452`, `dmonsfree` `:3470`. `describe_level` `js/display.js:5912`. `impossible` `js/display.js:8114`.
**Change:** One `dmonsfree` in that C order, plus `dealloc_mextra` and `dealloc_monst`. The JS `fmon` array is compacted in place (C walks `nmon`). A leftover `nmon` throws (C `panic`, no paniclog).
**Verify:** `node scripts/verify.mjs --fn dmonsfree` → PASS syntax (8 changed js files: do, dog, end, mklev, mon, save, wizcmds, zap) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** `save.c:1106` `freedynamicdata` (`FREE_ALL_MEMORY` is on in `config.h:632`; the function is still the save-freeing guard, not ported). `save.c:909` `savemonchn` `release_data` `dealloc_monst` (JSON level stash does not walk-and-free the chain).
**Next:** `hack.c` `domove_fight_empty` (next Open — coverage row).
