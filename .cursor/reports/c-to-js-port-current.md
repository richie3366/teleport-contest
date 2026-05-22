# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. **Gap inventory (not yet ported):** [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md). Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md). **Repeatable user/agent prompt:** [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md).

## Working principle (read every session)

**Port from C; score is regression only.** Pick work from C gaps and [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md), not from “what might pass another public session.” Run **`npm run score`** to catch regressions after RNG/screen slices — do not add **`fastforward.js`** / harness bytes without porting the matching C call site. Full rule: [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Finding C sources:** `nethack-c/upstream` is a **nested git repo** (submodule). Some IDE / Cursor **code search** (e.g. workspace **Glob** or default ripgrep scope) **skips or under-indexes** that tree even when it is checked out. Use **`read_file`**, terminal **`rg`/`grep`** with an explicit path under `nethack-c/upstream/`, or **`rg --no-ignore-vcs`**, and run **`git submodule update --init nethack-c/upstream`** on clones where the directory is empty.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Strategic priority:** Port **tty startup + interactive chargen** toward C **`wintty.c` / `role.c`** parity. **Eleven** public sessions ship **`nethackrc` without** embedded `OPTIONS=name:` / `role:` (and similar); C runs **“Who are you?”**, **[ynaq]**, and role/race/gender/align pickers with real **RNG**. Sessions that already set identity in **OPTIONS** must keep the **C fast path** (skip full menus when rc fixes role/race/gender/align).

**Deferred for now:** **`maybe_do_tutorial`** / **`tut-1`** / full **`do.c`** **`goto_level`** (Lua **`tutorial()`** / **`free_tutorial()`**, **`savelev`**, **`gmst_*`**, …) and **`dokick`**/**`dothrow`** vs **`leaving_tutorial`** — strong upstream dependencies (save, specials, fuller **`do.c`**); treat as backlog until chargen / core early-game parity is further along; **`LIVELOGFILE`** parity if the judge ever compares livelog lines.

**Last slice:** **`monmove.js`** + **`m_move_mon.js`** — moveloop second **`l`** (**`stepNum` 10**): peel harness row **9**; **`fmon`** distant → east (swapped vs step **9**); distant full **`distfleeck`** + **`m_move`** (**`rn2(20)`**) + 2× recalc; east **`rn2(12)`** + **`distfleeck`** only. **`seed8000-tourist-starter` PASS** (**3130/3130** RNG, **23/23** screens). **`npm run score`:** **1/44**.

## Next steps

1. **Moveloop `#search`** — peel harness rows **10–11** (**`stepNum` 11–12**): session steps **21–22** (**`rn2(5); rn2(20); …`** then **`rn2(16); …`**).
2. **Moveloop rows 9–12** — remaining harness peels; replace eel **`_eelStep8ChcntBase`** hack with C **`mfndpos`/`mtrack`** parity when land-eel path is fully ported.
2. **`newmonhp`** / **`minliquid`** land-eel — restore C **`minliquid`** on distfleeck-only turns once **`mhp`** parity matches (remove blanket **`stepNum===1–3`** skips where C runs **`minliquid`**).
2. **`mklev`/`dig_corridor`** — corridor **`roomno`** / kink tiles if C **`mfndpos`** needs **6** neighbors at door **(65,12)** without walkability hacks alone.
2. **Chargen** — shrink **`fastforward_pre_mklev`** / **`post_mklev`** toward real **`o_init`** / **`u_init_role`** (**`seed0900`**, **`seed0077`**).
2. **Mklev remainder** — supply extra **`mkobj(SPBOOK)`** reroll dealloc; **`setgemprobs`**; wall-neighbor check vs C **`levl[x][y±1]`** if mineralize count drifts on other seeds.
2. **Chargen** — **`pray.c` `pleased`** remainder: **`minimal_xname`** / **`distant_name`** for classes still stubby (**`FOOD_CLASS`** beyond slime mold, **full `xname` BUC**/stack, **`your`** prefix, real C **`distant_name`** **`gd.distantname`**); wire **`discoverArmorOtypHeroLikeC`** / ring+amulet discovery from **`#name`**/**ID** when those paths match C **`makeknown`**; call **`discoverWandOtyp`** / **`learnwandHeroLikeC`** from **`read`/`ID`** and other zap paths when those match C **`makeknown`**/**`learnwand`** (scroll **`r`** wires **`learnscroll`** + **`seffects`** **`exercise`** preamble); **`discover_artifact`** + **`artifact_origin`** on **`bestow_artifact`** when sacrifice path is ported; full **`fix_worst_trouble`**/**`in_trouble`**; **`angrygods`** remainder (full **`Resists_Elem`** worn or carry for monsters; full **`xkilled`** tail: **`mondead`**, **`experience`**, **`spoteffects`** expulsion); wizard **`livelog`**; fuller **`sit.c`** (**`altar_wrath`**, **`dotrap`** **`VIASITTING`**, **`OBJ_AT`**, **`is_prince`** comfort, **`makewish`**/**`readobjnam`**, **`courtmon`**/**`mkclass`**, **`special_throne_effect`** wish/disintegrate parity); **`domonnoise`** beyond priest; full **`money2mon`** onto **`minvent`**; **`seed0006`** / **`pick_*`**; **`u_init.c`** **`knows_object`** post–Samurai if discovery order matters; extend **`mvitals`** past **`SPECIAL_PM`** when **`NUMMONS`**-sized **`mons[]` geno** is generated; **`ini_inv_adjust_obj`** remainder (fixed-**`trspe`** **`MAGIC_MARKER`** vs **`rn2(4)`** split already in role RNG).
3. **`chest_trap`** / **`dofiretrap`** — full **`pickup.c`** **`#loot`** / menu (**`u_handsy`** done for trapped **`#l`** / **`heroOpenTrapped`** only); **`lock.c`** remainder: **`apply`**/**`doapply`** / **`get_adjacent_loc`** / resume **`xlock`** / **`touch_artifact`**; fuller **`insight.c`** beyond **`#i`** item-bulk lines; wire **`bTrappedTinNoPartHeroLikeC`** when **`eat.c`** **`consume_tin`** is ported; **`losexp`** / **`rehumanize`** — still TODO: full **`polyman`** stack (**`nomul`**, **`update_inventory`**, **`retouch_equipment`**, **`selftouch`**, **`emits_light`**), wizard **`done`** explore branch, **`u.uhp`** path vs C **`really_done`**.
4. **Scroll discovery remainder** — port **`read.c`** **`seffect_*`** per **`otyp`** (**`seffect_stinking_cloud`** + **`do_stinking_cloud`** / **`create_gas_cloud`** RNG in **`stinking_cloud_hero.js`**; **`getpos`/`tmp_at`**, real **`NhRegion`**/**`INSIDE_GAS_CLOUD`** TODO); **`punishHeroFromObjLikeC`** (**`placebc`/`set_bc`**, swallowed **`placebc`** deferral); **`seffect_remove_curse`** invent + steed saddle + **`TT_BURIEDBALL`** (**`remove_curse_hero.js`**, **`floorobj.js`**, **`reset_utrap`** msg + clasp **`mbodypart`**); **`uslinging`** + shop **`POT_WATER`** confused **`alter_cost`** + cursed unpaid water **`costly_alteration`/`bill_dummy`** (**`shop.js`**); **`doread`** **`scroll->in_use`** / **`nodisappear`** wired; **`trycallHeroLikeC`**: model **`oc_uname`** + **`docall`** when TTY **`#name`** is ported; **`pickup`** when that module matches C; replace **`mklev.js`** legacy scroll **`otyp`** literals with NH5 values only when replaying C **`mkobj`** for those tiles (see audit comment).

### Deferred backlog — tutorial / `goto_level` / `tut-1` (resume when save + `do.c` bridge are ready)

**`maybe_do_tutorial`** and full **`do.c`** **`goto_level`** when **`tut-1`** is exercised — Lua **`tutorial()`** / **`free_tutorial()`**, **`savelev`**, **`gmst_*`** sequester, … beyond **`applyGotoLevelDirectHeroLikeC`** + **`tutorial_branch.js`** stub; **`LIVELOGFILE`** / judge-visible recorder line if sessions compare livelog; **`dokick`** / **`dothrow`** (non-**`shop.js**) vs **`leaving_tutorial`** when those call sites need parity.

### Deferred backlog (moveloop / traps / fire — resume after chargen milestone)

Extend **`distfleeck`** to further moveloop steps — match **`monmove.c`** **`dochug`** (**`distfleeck`** ~791, **`m_move`**/**`m_throw`**, **`distfleeck`** recalc ~915) per monster; peel harness only when per-mon draw counts match C (step **3** row is interleaved **`rn2(5)`**/**`rn2(32)`**, not N× first-**`distfleeck`** only); grid **`domove`**, **`attack`**, …; remainder **`flooreffects`** (**`hmon`/`mondied`** full, teeter); fuller **`sellobj`** (**`ynaq`**, **`dropped_container`**, bones **`robbed`**); then wire full **`dig()`** / **`dighole`** (non-wizard path) and remaining shop pit / full **`digactualhole`/`maketrap`**; **`zap_dig`** **`uswallow`**/**`pit_flow`**/**`dighole`** from pit; shop **`PASSED_DESTROY_TRAP`**; call **`spotChecksLikeC`** from **`apply.c`** **`do_break_wand`** / **`music.c`** **`do_earthquake`** when those paths change terrain; **`trap.c`** **`blow_up_landmine`** still needs C **`scatter`** and real **`recalc_block_point`** vs full-grid **`vision_recalc`**; hero landmine still missing C **`steed_mid`/`saddle`/`keep_saddle_with_steedcorpse`**; **`dozap`** **`getobj`**/**cursed `backfire`**/**`zapyourself`**/**`zapnodir`**; **`SPE_DIG`**; fuller **`setmangry`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**; **`mbuzzOffensiveWandFromMonsterTowardMux`** from real **`monmove`** + **`find_offensive`**; full **`rloc`** / **`usteed`**; hero fountain **`dryup`** (**`in_town`** / wizard **`y_n`**); full **`mondied`/`xkilled`** so pool survivor tail consumes RNG like C; **`spoteffects`**: full pooleffects / **`set_uinwater`**, **`meltIceAt`** alignment, sink+Levitation / float_down / **`in_steed_dismounting`**; **`switch_terrain`**: steed/**`dismount`**, **`classify`** / **`drawbridge`** parity; **`steed.c`**-style **`steedVsStealthLikeC`** on mount/dismount when **`usteed`** is ported; **`repair_damage`** remainder (**`picking_at`**, ball&chain **`litter_scatter`**, bill **`subfrombill`**); **`kick.js`** **`bhit`** remainder (**`thitmonst`**, **`ship_object`**, **`scatter`**, shop **`costly`**) / secret doors / full **`attack_checks`** / poly **`AT_KICK`**; full **`dungeon.c`** **`init_dungeons`**/**`place_level`** so **`sp_levchn`** + minetn **`dlevel`** match C (**`bootstrapSpLevchnMinesMinetnFromBranchStubLikeC`** activates); wire real **`dig()`** occupation to **`setHeroDiggingOccupationLikeC`** (not only wizard **`#D`**); **`angry_guards`**: worm **`worm_known`** / full **`u.uprops`** telepathy property names vs **`HTelepat`** stubs; populate **`context.warntype`** from **`artifact.c`**/**`doapply`** when warn-of rings are ported; **`zap_dig`** / **`objnam`**: full **`xname`** string + **`discover_object`** **`mark_as_known`** / **`disco[]`** class order / Samurai **`Japanese_item_name`** / **`gem_learned`**; **`destroy_drawbridge`** **`e_died`/`scatter`** full parity; **`dig_up_grave`** **`mkclass`**/**`tt_oname`** full parity.

## After you ship a slice

1. Append **one table row** to [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md) (same columns as existing rows).
2. Refresh **this file** (next steps + one-line “last slice”).
3. Run **`npm run score`** when the change touches RNG-visible behavior.
4. **`git commit`** — one commit per meaningful slice (see [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md)); conventional message (`feat(js):` / `fix(js):` / `docs(port):`, …).

---

## Copy-paste: continue the port

Prefer the **canonical** text in [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md) (includes `c-to-js-port-remaining.md` skim + **git commit per slice**). Legacy one-liners:

```
Continue NetHack 5.0 C→JS: read .cursor/reports/c-to-js-port-current.md first (not the full progress doc). Do the top next step; port from nethack-c/upstream C semantics; do not tune to public sessions; do not edit js/isaac64.js, js/terminal.js, js/storage.js. When done: update c-to-js-port-current.md, append one row to c-to-js-port-changelog-archive.md, npm run score if relevant, git commit this slice.
```

Shorter variant:

```
Continue port: read .cursor/reports/c-to-js-port-current.md, top next step, C upstream only, frozen js/* harness untouched, then refresh current + one changelog row + score if needed + git commit the slice.
```
