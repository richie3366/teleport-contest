# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. **Score + milestones:** [`c-to-js-port-dashboard.md`](c-to-js-port-dashboard.md) (regenerate: `node tools/port-score-snapshot.mjs --update-dashboard`). **Gap inventory:** [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md). Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md). **Repeatable user/agent prompt:** [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md).

## Working principle (read every session)

**Port from C; score is regression only.** Pick work from C gaps and [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md), not from “what might pass another public session.” Run **`npm run score`** to catch regressions after RNG/screen slices — do not add **`fastforward.js`** / harness bytes without porting the matching C call site. Full rule: [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc).

## Priority matrix (methodical)

Use this when **`Next steps`** below feels stale or several lanes compete. Order by **(1)** failing session only as a **locator** → **(2)** one C function / call graph → **(3)** dependencies → **(4)** score vs C-depth tradeoff for this sprint.

| Lane | Goal | Typical C / JS | When to favor |
|------|------|----------------|----------------|
| **A — Chargen / TTY** | More sessions with real identity pickers | `wintty.c`, `role.c` → **`chargen_tty.js`**, **`chargen_rigid.js`** | Short-term **score ROI**; rc without embedded `OPTIONS` identity |
| **B — NHL / des** | C-faithful `.lua` specials when `makemaz` resolves a protofile | `nhlua.c`, `sp_lev.c` `lspo_*` → **`nhl_lua.js`**, **`des_api.js`**, **`nhl_des_runtime.js`** | Mines / branch specials; extend one **`dat/*.lua`** + bindings per slice ([`nhl-port-notes.md`](nhl-port-notes.md)) |
| **C — Travel / dogs** | Orthogonal moveloop prep | `dog.c`, `goto_level` → **`mon_arrive.js`**, **`goto_level_hero.js`** | Good interleave when pausing Lua; bounded C surfaces |
| **D — Objects / mkobj** | Floor + invent parity | `mkobj.c`, `u_init.c` → **`mklev.js`**, `nh5*` maps | After chargen milestone or when sessions diverge on items |
| **E — Tutorial** | Optional `tut-1` branch at newgame | `allmain.c`, `do.c`, `nhlua.c`, `dat/tut-*.lua` → **`tutorial_*`**, **`goto_level_hero.js`**, **`nhl_lua.js`** | **Only when** [tutorial port gate](../../docs/plans/tutorial-port-gate.md) **MD-1 … MD-7** are all satisfied — then **primary** until [10-tutorial.md](../plans/nethack-port/10-tutorial.md) exit criteria |

**Gated (not “never”):** tutorial / `tut-1` — blocked on mandatory dependencies in [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md); large **`monmove`** / **`moveloop_aux`** harness peels remain parallel long tail — see extended backlog sections below.

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Finding C sources:** `nethack-c/upstream` is a **nested git repo** (submodule). Some IDE / Cursor **code search** (e.g. workspace **Glob** or default ripgrep scope) **skips or under-indexes** that tree even when it is checked out. Use **`read_file`**, terminal **`rg`/`grep`** with an explicit path under `nethack-c/upstream/`, or **`rg --no-ignore-vcs`**, and run **`git submodule update --init nethack-c/upstream`** on clones where the directory is empty.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Strategic priority (dual track):** **Lane A** — port **tty startup + interactive chargen** toward C **`wintty.c` / `role.c`** (**`chargen_tty.js`**, **`chargen_rigid.js`**). **Lane B** — expand NHL / des-file levels when specials matter (**`nhl-port-notes.md`**). **Eleven** public sessions ship **`nethackrc` without** embedded `OPTIONS=name:` / `role:` (and similar); C runs **“Who are you?”**, **[ynaq]**, and role/race/gender/align pickers with real **RNG**. Sessions that already set identity in **OPTIONS** must keep the **C fast path** (skip full menus when rc fixes role/race/gender/align).

**Tutorial (Lane E):** Scaffolding exists (`tutorial_prompt.js`, `maybeDoTutorialLikeC`, `tutorial_branch.js` stubs). **Do not** take tutorial slices until [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md) **MD-1 … MD-7** are checked; then **Lane E becomes step 1** (see [10-tutorial.md](../plans/nethack-port/10-tutorial.md)). While advancing Lanes A–D, prefer slices that close an open MD-* item. **`LIVELOGFILE`** / full **`dokick`**/**`dothrow`** vs **`leaving_tutorial`** are Lane E long tail, not gate blockers.

**Last slice:** Wizard D:1 **`L`** — C **`allmain.c`** one-post tail: second post-invent **`movemon`** (~2660–2672), third + fourth new-turn, fourth peel-only **`movemon`** (~2679–2687), fourth new-turn + **`post_moveloop82_exercise`** (**`stepNum` 5**, ~2694); **`_wizD1LPostOuterLoopDoneLikeC`** stops duplicate outer peel. **`moveloop_turn_advance.js`**, **`monmove.js`**, **`dogmove_mon.js`**. **`seed0006`** **2795/6736** (was **2805** at **2680** gap; **~2660–2695** aligned). **`seed0077`/`seed8000`:** **PASS**. **2/44**.

**Handoff refresh:** **Priority matrix** (lanes A–D) + **Next steps** aligned to it; **`c-to-js-port-remaining.md`** / **`c-to-js-port-dashboard.md`** / **`nhl-port-notes.md`** / **`continue-nethack-port.md`** updated for post-`load_lua` reality and NHL ordering.

## Next steps (aligned with matrix)

Pick **one** primary lane per slice; refresh this list after each merge.

**First:** open [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md) — if **all MD-1 … MD-7** are checked, do **Lane E** step 1 from [10-tutorial.md](../plans/nethack-port/10-tutorial.md) instead of the list below.

1. **Lane C — `seed0006` ~2696+** — first gap after wizard **`L`** post completes (~2695): pet **`dog_goal`** **`rn2(4)`** vs C **`rn2(3)`** (next command / moveloop boundary). Lane A: **`chargen_tty.js`** when rc omits identity.
2. **Lane A — Chargen / init + early moveloop** — tty / **`role.c`** pickers when rc omits identity.
3. **Lane B — NHL** — next **`lspo_*`** + **`nhl_lua.js`** allowlist per [`nhl-port-notes.md`](nhl-port-notes.md) (**advances MD-3 / MD-4**).
4. **Lane D — `objects_nums` / mkobj** — audit other **`const.js`** otyps vs NH5 **`objects_nums`** after AoY fix (**advances MD-1**).

### Extended backlog (unchanged lanes)

- **`mklev` / `mfndpos`:** `setgemprobs`, mineralize drift, legacy floor **`otyp`** vs NH5 when replaying C **`mkobj`** (see **`mklev.js`** audit comments).
- **`pray.c` / `sit.c` / `angrygods` / `read.c` / scroll & trap long tail:** prior handoff bullets — see [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §3–§4 and `TODO`s under `js/`.

### Lane E backlog — tutorial (gated; see [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md))

Mandatory dependencies **MD-1 … MD-7** (inventory, in-memory **`goto_level`/`savelev`**, Lua RNG, **`tut-*.lua`** bindings, **`nh.eckey`**, **`tutorial()`/`free_tutorial()`**). Execution checklist: [10-tutorial.md](../plans/nethack-port/10-tutorial.md). Already stubbed: **`maybe_do_tutorial`**, **`ask_do_tutorial`**, **`tutorial_branch.js`** hooks, **`leaving_tutorial`** shop/invent skips.

### Deferred backlog (moveloop / traps / fire — resume after chargen milestone)

Extend **`distfleeck`** to further moveloop steps — match **`monmove.c`** **`dochug`** (**`distfleeck`** ~791, **`m_move`**/**`m_throw`**, **`distfleeck`** recalc ~915) per monster; peel harness only when per-path draw counts match C (step **3** row is interleaved **`rn2(5)`**/**`rn2(32)`**, not N× first-**`distfleeck`** only); grid **`domove`**, **`attack`**, …; remainder **`flooreffects`** (**`hmon`/`mondied`** full, teeter); fuller **`sellobj`** (**`ynaq`**, **`dropped_container`**, bones **`robbed`**); then wire full **`dig()`** / **`dighole`** (non-wizard path) and remaining shop pit / full **`digactualhole`/`maketrap`**; **`zap_dig`** **`uswallow`**/**`pit_flow`**/**`dighole`** from pit; shop **`PASSED_DESTROY_TRAP`**; call **`spotChecksLikeC`** from **`apply.c`** **`do_break_wand`** / **`music.c`** **`do_earthquake`** when those paths change terrain; **`trap.c`** **`blow_up_landmine`** still needs C **`scatter`** and real **`recalc_block_point`** vs full-grid **`vision_recalc`**; hero landmine still missing C **`steed_mid`/`saddle`/`keep_saddle_with_steedcorpse`**; **`dozap`** **`getobj`**/**cursed `backfire`**/**`zapyourself`**/**`zapnodir`**; **`SPE_DIG`**; fuller **`setmangry`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**; **`mbuzzOffensiveWandFromMonsterTowardMux`** from real **`monmove`** + **`find_offensive`**; full **`rloc`** / **`usteed`**; hero fountain **`dryup`** (**`in_town`** / wizard **`y_n`**); full **`mondied`/`xkilled`** so pool survivor tail consumes RNG like C; **`spoteffects`**: full pooleffects / **`set_uinwater`**, **`meltIceAt`** alignment, sink+Levitation / float_down / **`in_steed_dismounting`**; **`switch_terrain`**: steed/**`dismount`**, **`classify`** / **`drawbridge`** parity; **`steed.c`**-style **`steedVsStealthLikeC`** on mount/dismount when **`usteed`** is ported; **`repair_damage`** remainder (**`picking_at`**, ball&chain **`litter_scatter`**, bill **`subfrombill`**); **`kick.js`** **`bhit`** remainder (**`thitmonst`**, **`ship_object`**, **`scatter`**, shop **`costly`**) / secret doors / full **`attack_checks`** / poly **`AT_KICK`**; full **`dungeon.c`** **`init_dungeons`**/**`place_level`** so **`sp_levchn`** + minetn **`dlevel`** match C (**`bootstrapSpLevchnMinesMinetnFromBranchStubLikeC`** activates); wire real **`dig()`** occupation to **`setHeroDiggingOccupationLikeC`** (not only wizard **`#D`**); **`angry_guards`**: worm **`worm_known`** / full **`u.uprops`** telepathy property names vs **`HTelepat`** stubs; populate **`context.warntype`** from **`artifact.c`**/**`doapply`** when warn-of rings are ported; **`zap_dig`** / **`objnam`**: full **`xname`** string + **`discover_object`** **`mark_as_known`** / **`disco[]`** class order / Samurai **`Japanese_item_name`** / **`gem_learned`**; **`destroy_drawbridge`** **`e_died`/`scatter`** full parity; **`dig_up_grave`** **`mkclass`**/**`tt_oname`** full parity.

## After you ship a slice

1. Append **one table row** to [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md) (same columns as existing rows).
2. Refresh **this file** (next steps + one-line “last slice”).
3. Run **`npm run score`** when the change touches RNG-visible behavior.
4. **`git commit`** — one commit per meaningful slice (see [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md)); conventional message (`feat(js):` / `fix(js):` / `docs(port):`, …).

---

## Copy-paste: continue the port

Prefer the **canonical** text in [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md) (includes `c-to-js-port-remaining.md` skim + **git commit per slice**). Legacy one-liners:

```
Continue NetHack 5.0 C→JS: read .cursor/reports/c-to-js-port-current.md first (not the full progress doc). Do the top next step; port from nethack-c/upstream C semantics; do not edit js/isaac64.js, js/terminal.js, js/storage.js. When done: update c-to-js-port-current.md, append one row to c-to-js-port-changelog-archive.md, npm run score if relevant, git commit this slice.
```

Shorter variant:

```
Continue port: read .cursor/reports/c-to-js-port-current.md, top next step, C upstream only, frozen js/* harness untouched, then refresh current + one changelog row + score if needed + git commit the slice.
```
