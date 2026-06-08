# NetHack 5.0 C → JS — **remaining port surface**

**Purpose:** Consolidate what is **not yet** faithfully ported from `nethack-c/upstream` into contest `js/`, beyond the narrative in [`c-to-js-port-progress.md`](c-to-js-port-progress.md). Use this for **domain context** and §5 milestones; for day-to-day work use [**batch workflow**](c-to-js-port-batch-workflow.md) + [**function checklist**](c-to-js-port-function-checklist.md) + [`c-to-js-port-current.md`](c-to-js-port-current.md).

**Reference tree:** `nethack-c/upstream/src/` — **130** `.c` compilation units (NetHack 5.0.0 tag). **Contest rules:** do not edit frozen `js/isaac64.js`, `js/terminal.js`, `js/storage.js`; do not tune logic to memorize the 44 public sessions.

**Working principle:** port **C call sites** in **batches** (one file / call graph per commit); **fast-verify** with `diag_rng_window` on locator sessions; **`npm run score` at milestones** only ([`c-to-js-port-batch-workflow.md`](c-to-js-port-batch-workflow.md), [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc)). Do not grow **`fastforward.js`** / harness to chase **1/44** without matching upstream logic.

**Scale reminder:** Upstream `src/*.c` is ~**250k** lines; contestant `js/` is ~**85k** lines (excluding frozen harness and large data blobs). Behavioral coverage is far below line-count ratios suggest because large JS files are **constants**, **peel/harness** code, and **partial** algorithms. Checklist: **49 partial, 3 stub, 0 done** (2026-06).

---

## 1. Executive summary — dominant gaps

These items explain why public harness scoring remains **near-zero screen parity** and **partial RNG alignment** despite substantial early-game work:

| Gap | C anchors (representative) | JS today |
|-----|------------------------------|----------|
| **Startup RNG bridge** | `o_init.c`, `dungeon.c` (`init_dungeons`, `place_level`, …), post-`mklev` mineralize/fill, `u_init.c` ordering | **Mostly real C:** live shuffle + gem colors in **`o_init.js`**, **`dungeon_init.js`** **`init_dungeons`**, post-`mklev` **`mklev.js`** / **`u_init_post_mklev.js`**. **`js/fastforward.js`** is a **small stub** (no large replay table). Remaining drift is **`ini_inv` / `mkobj` / `u_init_role`** ordering and any tail in **`runUInitRoleRngAfterMklevLikeC`**, not “replay hundreds of draws” in fastforward. |
| **Monster turn truth** | `monmove.c` (`movemon`, `dochug`, `distfleeck`, `m_move`, `m_throw`, …), `mon.c` | `monmove.js` mixes **real** `distfleeck` / `m_move` slices with **stepNum** / geometry sequencing for the canary path; full **`dochug`** order vs harness is still being peeled. **Do not** add session-specific finders without a mapped C call site — generalize by matching **`fmon`** / C order, then delete gates. |
| **End-of-turn tail** | `allmain.c` (post-hero `movemon` loops, `dosounds`, `rnd` exercise hooks, …) | `moveloop_aux.js` replays **condition-shaped** `rn2` blocks instead of full C |
| **Object + inventory core** | `mkobj.c`, `invent.c`, `pickup.c`, `obj.c`, `dothrow.c`, `do_wear.c`, wield/bimanual, containers | Floor objects are **mklev-shaped**; **`ini_inv_stub.js`** stands in for **`ini_inv`**; no full **`mkobj`** / linked **`invent`** driving most item semantics |
| **Combat** | `uhitm.c`, `mhitu.c`, `mhitm.c`, full `weapon.c` to-hit/damage | `attack.js` **stub damage** (`1+rn2(4)`), no AC/to-hit pipeline, minimal death/corpse path |
| **Command surface** | Most of `cmd.c`, `do.c`, `apply.c`, `pray.c`, … | Narrow subset: movement, search, pickup/look, a few `#` extcmds; no general menu/`do` stack |
| **Branches & special levels** | `sp_lev.c`, `nhlua.c` `load_lua`, Lua under `dat/`, full `dungeon.c` graph | **Partial:** `loadLuaLikeC` runs **Fengari** for **`minetn-1.lua`** (+ nhlib in-runner) via **`nhl_lua.js`** / **`des_api.js`**; many **`lspo_*`** still unbound; **`sp_levchn.js`** / full **`place_level`** vs C still stubbed — see [`nhl-port-notes.md`](nhl-port-notes.md) |
| **Persistence** | `save.c`, `bones.c`, `topten.c` | `storage.js` is API/frozen; **game state serialization** to match C save semantics is not the focus of current `js/` |
| **Full trap / zap / shop long tail** | `trap.c`, `zap.c`, `shk.c`, `music.c`, `apply.c`, … | Large **partial** ports (`trap.js`, `zap_dig.js`, `shop.js`, …) with many branches still **TODO** or **stub** (see §4) |

**Moveloop harness warning:** Recent `monmove.js` work is **geometry / stepNum–accurate for the `seed8000` canary** together with real `distfleeck` / `m_move` slices. Milestone “full **`dochug`** like C” means **removing** `stepNum` gates as `fmon` order and upstream call order explain more paths — **not** accumulating session-specific monster finders without a C anchor.

---

## 2. Upstream areas with **no** or **minimal** dedicated JS

The following C domains are **largely absent** as faithful ports (no file-by-file checklist here — upstream `src/*.c` is the ground truth):

- **Full command + action dispatch:** bulk of `cmd.c`, `do.c`, `hack.c` beyond movement/test_move slices, `lock.c`, `pray.c`, `read.c`, `write.c`, `sit.c`, `pray.c`, …
- **Spell casting / book reading beyond stubs:** `spell.c` (partial skill/spellbook discovery only), `read.c`
- **Full combat resolution:** `uhitm.c`, `mhitu.c`, `mhitm.c`, `uhit.c`, artifact combat from `artifact.c` (constants may exist in `const.js`; behavior does not)
- **Pets / steed / engulf:** `dog.c`, `steed.c`, `mon.c` (`u.usteed`, `u.ustuck`, …) — scattered TODOs in `trap.js`, `drown.js`, `switch_terrain.js`, …
- **Full AI / monster utilities:** `muse.c`, `mfndpos.c`, `mspell.c`, real `rndmonst` / spawn tables (`makemon.c`)
- **Dungeon graph & Lua specials:** `sp_lev.c`, Lua level scripts, full branch placement (`dungeon.c` beyond harness assumptions)
- **Quest / Gehennom / planes / endgame:** `quest*.c`, `end.c`, `fountain.c` subsets not wired, …
- **Economy beyond stubs:** full `shk.c` pricing, stolen goods, **`bill`** integration (partial `shop.js`)
- **Bones / topten / multi-run continuity:** `bones.c`, `topten.c` vs API `storage` contract
- **Platform / tty UI beyond contract:** `windows.c`, `topl.c`, full `botl.c` (partial `display.js` / `game_display.js`)

---

## 3. Areas with **partial** JS — typical “next slice” targets

These files exist and encode **real** C-aligned logic in places, but large branches remain stubs, harness-backed, or intentionally simplified.

### 3.1 Startup and main loop

| C | JS | Remaining |
|---|-----|-----------|
| `allmain.c` | `allmain.js`, `moveloop_preamble.js`, `moveloop_aux.js` | Replace **`fastforward_step`** / harness tails with real **`movemon`** + **`dosounds`** + exercise hooks; **`enter_explore_mode`** and other preamble paths |
| `u_init.c` | `chargen.js`, `u_init_*.js`, `allmain.js` | Real **`ini_inv`** **before** **`init_attr`** per C order; **`game.invent`** from **`mkobj`**; female role keys beyond overlay stub |
| `attrib.c` | `attrib.js`, `u_init_attr.js` | Full **`adjabil`** for XL>1 intrinsic layout; encumber messages on Str/Con exercise; all **`use_skill`** / **`drain_weapon_skill`** **call sites** |
| `eat.c` | `eat_hunger.js`, `hunger.js`, `moveloop_aux.js` | **`vomit`**, **`victual`**, **`eatfood`**, **`selftouch`**, starvation **`done()`** nuances; bump attack **double `gethungry`** vs C |
| `weapon.c` / `spell.c` | `u_init_skills.js`, `extcmd.js`, … | Full **`#enhance`** TTY menu; non-wizard **`y_n`** parity |

### 3.2 Dungeon generation and level data

| C | JS | Remaining |
|---|-----|-----------|
| `mklev.c`, `mkmaze.c`, … | `mklev.js` | **`oinit`**-class behavior, full **`maketrap`** / container / **`corpsenm`** / **`in_rooms`** fidelity; align legacy **`otyp`** literals with NH5 **`objects_nums`** (see `nh5_objclass.js`, `obj_oc_skill_data.js`) |
| `dungeon.c` | `sp_levchn.js`, `allmain.js` | **`init_dungeons`/`place_level`** so **`sp_levchn`** and **Mines `dlevel`** match C (bootstrap stub is explicit) |
| `rm.h` / map features | `game.js`, `switch_terrain.js`, `drawbridge.js`, … | **`vision_recalc`/`recalc_block_point`**, steed + **`dismount`**, **`Is_juiblex_level`** and related **`const.js`** TODOs |

### 3.3 Hero movement and interaction

| C | JS | Remaining |
|---|-----|-----------|
| `hack.c` `test_move` / occupation | `walkable.js`, `cmd.js` | **`still_chewing`**, full **`blockDoorAt`/`blockEntryAt`** (shop), **`badRock`**, squeeze rules completeness |
| `detect.c` | `search.js` | Luck + artifact **`SPFX_SEARCH`**, lenses, **`visible_region_at`**, telepathy / warning-of-mon |
| `dokick.c` | `kick.js` | **`thitmonst`**, **`ship_object`**, **`scatter`**, costly shop kicks, secret doors, full **`attack_checks`**, poly **`AT_KICK`**, **`b_trapped`** completeness |
| `teleport.c` | `walkable.js`, `trap.js` (tele branches) | Full **`tele`**, levelport, **`goodpos`** completeness for all mon types |

### 3.4 Traps, floors, hazards

| C | JS | Remaining (non-exhaustive) |
|---|-----|------------------------------|
| `trap.c` | `trap.js`, `spoteffects.js`, … | Full **`chest_trap`** / **`dofiretrap`** branches; **`tele()`**; **`steedintrap`**; rolling boulder **`launch_obj`**; **level teleport**; **poly**/**magic portal**/**domagicportal**; **`mu_maybe_destroy_web`**; statue **`animate_statue`**; gremlin **`split_mon`** integration; **`melt_ice`** post-fire; **`losexp`** / **`resists_drli`** (**`defended(AD_DRLI)`**, hero **`cham`** vs vampshifter wiring) |
| `exper.c` / `mondata.c` | `mondata.js`, `losexp.js` | Drain resistance parity for **`losexp`** (**`defended(AD_DRLI)`**, hero **`cham`**) |
| `zap.c` / `apply.c` | `dozap.js`, `zap_*.js`, `ignite_items.js`, … | **`getobj`**, cursed wand **backfire**, **`zapyourself`**, **`zapnodir`**, **`SPE_DIG`**, full ray paths |
| `dig.c` | `dig_hero.js`, `dighole.js`, `zap_dig.js` | Full **`dig`/`dighole`/`digactualhole`**, shop pit, **`watch_dig`**, **`destroy_drawbridge`** parity |

### 3.5 Objects, erosion, destruction

| C | JS | Remaining |
|---|-----|-----------|
| `erode_obj` / inv resist | `erode_obj.js` | **`inventory_resistance_check(AD_FIRE)`**; **`burnarmor`** towel **`dry_a_towel`** loop |
| `apply.c` `splash_lit` / `catch_lit` | `water_damage.js`, `ignite_items.js` | Full **`erode_obj`** from water path; **`begin_burn`** timers, **`snuff_candle`**, shop/floor **`nexthere`** |
| `destroy.c` / impact | `destroy_items.js`, `impact_drop.js` | **`scatter`**, **`rloc`**, **`potionbreathe`**, **`angry_guards`**, **`currency`** where C ties RNG |

### 3.6 Monsters and missiles

| C | JS | Remaining |
|---|-----|-----------|
| `monmove.c` / `mon.c` | `monmove.js`, `m_move_mon.js`, `monflee.js`, … | Full **`dochug`** ordering vs harness; **`release_hero`** when **`ustuck`**; real **`mintrap`** / mon trap effects |
| `mthrowu.c` | `mthrowu.js`, `mthrow_mon.js` | **`potionhit`**, **`obj_extract_self`**, full **`thitu`** |
| `makemon.c` | `makemon.js` | Weighted **`rndmonst`** / placement rules |
| `mondata.c` | `mondata.js` | **`resists_drli`** completion; richer **`mons[]`** / **`youmonst.data`** (still human-shaped stub in many paths) |

### 3.7 Shops

| C | JS | Remaining |
|---|-----|-----------|
| `shk.c` | `shop.js` | **`litter_scatter`** / **`unplacebc`**, **`subfrombill`**, **`mnexto`/`mnearto`**, **`get_pricing_units`** glob weight, **`block_point`**, full **`rile_shk`** pricing loop, hero vs mon **`mon_moving`** burn paths |

### 3.8 Display and messaging

| C | JS | Remaining |
|---|-----|-----------|
| `botl.c`, `display.c` | `display.js`, `game_display.js` | Full status line, cursor policy, SGR parity (see `.cursor/plans/nethack-port/07-display-terminal.md` if present) |
| `engrave.c` / decor | `decor.js` | **`ice_descr`**, **`waterbody_name`**, **`Norep`** vs **`pline`** nuance |

### 3.9 Timeouts and polymorph

| C | JS | Remaining |
|---|-----|-----------|
| `timeout.c`, `polyself.c` | `timeout.js`, `were_hero.js`, … | **`make_slimed`** / timed slime glob; **`permonstWereBeastStub`** replacement with real PM data |

---

## 4. Machine-assisted gap index (inline comments in `js/`)

High-signal patterns from repository grep (`TODO`, `not ported`, `STUB`, …) — **not exhaustive**; treat as a **backlog radar**:

- **`trap.js`:** `chest_trap`, `tele`, `steedintrap`, rolling boulder, level tele, statue animate, poly trap, magic portal, web destruction, non-hero pit `mselftouch`, …
- **`fastforward.js` / `o_init.js`:** startup replay **retired** from fastforward; remaining startup tail is **`u_init_post_mklev.js`** + real **`o_init`** / **`dungeon_init`** until **`ini_inv`/`mkobj`** consume the same draws
- **`monmove.js`:** harness steps **1–12**; `distfleeck` peel vs **`dochug`** interleaving
- **`attack.js`:** explicit stub until **`uhitm.c`**
- **`makemon.js`:** explicit stub until **`makemon.c`**
- **`search.js`:** luck, lenses, artifact search, telepathy, warning
- **`kick.js`:** scatter, ship_object, thitmonst, watchmen, giant poly kick
- **`shop.js`:** ball&chain, bill, block_point, pricing, litter scatter
- **`drown.js` / `lava.js` / `spoteffects.js`:** leash, teleport, steed, `done()`, sink+Levitation, `set_uinwater`, …
- **`dozap.js`:** `getobj`, `zapyourself`, ray self-zap
- **`hold_another_hero.js`:** `uwep` welded, `welded(uball)`
- **`goto_level_hero.js`:** `placebc` when punished
- **`obj_timeout_dispatch.js`:** `revive_mon` / `rloc`
- **`mondata.js`:** `resists_drli` defended / vampshifter for hero form

When a slice closes a comment, **delete or narrow** the comment and adjust **`fastforward`** / **`monmove`** harness rows only when **measured** RNG consumption matches C (see handoff notes in `c-to-js-port-current.md`).

---

## 5. Suggested ordering (C port milestones — not “maximize score”)

**Batches** (see [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md)) should **delete** scaffolding as C lands, not extend replay lists. Score may stay **1/44** for many commits while C depth grows. Run **full score** when a milestone row below is closed or when unsure — not after every function.

**Anti-pattern:** port the entire checklist with no integrated RNG checks, then debug 0/44 — use milestone scoring instead ([`c-to-js-port-batch-workflow.md`](c-to-js-port-batch-workflow.md)).

1. **Shrink `fastforward.js`** — **largely achieved** (file is a stub); continue replacing remaining **`u_init_post_mklev`** / **`ini_inv`** / **`mkobj`** draws with real C call order and **delete** harness rows only when RNG counts match.
2. **Wire `game.invent` + `mkobj` + `ini_inv`** (NH5 **`otyp`/`oclass`**) — unlocks skills, hidden gold, most item-driven traps and combat prep.
3. **Replace `monmove.js` harness** with real **`movemon`** / **`dochug`** / **`distfleeck`** / **`m_throw`** draw ordering; align **`m_move_mon.js`** with C.
4. **Replace `moveloop_aux.js` harness** with real **`allmain.c`** end-of-turn tail.
5. **Expand `cmd.c` / `do.c`** surface to match session inputs.
6. **Combat pipeline** (`uhitm`/`mhitu`/AC/to-hit/damage).
7. **Branches + `sp_lev` + Lua des** — **in progress:** hybrid Fengari + JS `lspo` subset (**`minetn-1`** vertical); remaining **`dat/*.lua`**, full **`nhlua.c`** surface, and **`dungeon.c`** **`place_level`** / **`sp_levchn`** graph parity. Lua ISAAC: **`nhl_rng.js`**; nhlib align shuffle before **`init_dungeons`** remains a **core `rn2` shim** for public harness (see **`nhlib_align_shuffle.js`** comment).
8. **Save/bones** semantics vs `docs/API.md`.
9. **Display/botl/cursor** hardening.

**Tutorial (Lane E):** Gated on [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md) **MD-1 … MD-7**. Until the gate opens, advance MD-* via items 2 (invent/mkobj), 7 (NHL/Lua), and `goto_level` work in §3.1/§3.2; do not treat tutorial as open-ended deferral. After the gate opens, **Lane E is primary** until [10-tutorial.md](../plans/nethack-port/10-tutorial.md) exit criteria.

---

## 6. Related documents (do not duplicate maintenance here)

| Document | Role |
|----------|------|
| [`c-to-js-port-batch-workflow.md`](c-to-js-port-batch-workflow.md) | **How to port:** batches, fast verify, milestone score |
| [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md) | **What to port:** per-function **stub/partial/done** |
| [`c-to-js-port-current.md`](c-to-js-port-current.md) | Thin handoff + immediate next batch |
| [`c-to-js-port-progress.md`](c-to-js-port-progress.md) | What *is* ported, changelog pointer, module sizes |
| [`c-to-js-port-dashboard.md`](c-to-js-port-dashboard.md) | Score table (regenerate via `port-score-snapshot.mjs`), milestone matrix, harness inventory |
| [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md) | Dated slice history |
| [`.cursor/plans/nethack_js_port_roadmap_19a4defd.plan.md`](../plans/nethack_js_port_roadmap_19a4defd.plan.md) | Roadmap index |
| `.cursor/plans/nethack-port/*.md` | Satellite checklists |
| [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md) | Repeatable user prompt + autonomous agent workflow |
| [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md) | Tutorial mandatory dependencies + gate-open → Lane E |
| [`.cursor/plans/nethack-port/10-tutorial.md`](../plans/nethack-port/10-tutorial.md) | Tutorial execution checklist (after gate) |

---

*This file is a **gap inventory**, not a score forecast. Refresh when a major subsystem moves from “stub” to “partial” or from “partial” to “faithful.”*
