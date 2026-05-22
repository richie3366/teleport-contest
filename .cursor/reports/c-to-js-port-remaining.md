# NetHack 5.0 C → JS — **remaining port surface**

**Purpose:** Consolidate what is **not yet** faithfully ported from `nethack-c/upstream` into contest `js/`, beyond the narrative in [`c-to-js-port-progress.md`](c-to-js-port-progress.md). Use this for planning slices; for day-to-day handoff, still start at [`c-to-js-port-current.md`](c-to-js-port-current.md).

**Reference tree:** `nethack-c/upstream/src/` — **130** `.c` compilation units (NetHack 5.0.0 tag). **Contest rules:** do not edit frozen `js/isaac64.js`, `js/terminal.js`, `js/storage.js`; do not tune logic to memorize the 44 public sessions.

**Working principle:** port **C call sites** first; use **`npm run score`** as a **regression check** only ([`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc)). Do not grow **`fastforward.js`** / harness to chase **1/44** without matching upstream logic.

**Scale reminder:** Upstream `.c`+`.h` under `nethack-c/upstream` is on the order of **550k** lines; contestant `js/` is on the order of **35k** lines (including data blobs). Behavioral coverage is far below line-count ratios suggest because large JS files are **constants** and **partial** algorithms.

---

## 1. Executive summary — dominant gaps

These items explain why public harness scoring remains **near-zero screen parity** and **partial RNG alignment** despite substantial early-game work:

| Gap | C anchors (representative) | JS today |
|-----|------------------------------|----------|
| **Startup RNG bridge** | `o_init.c`, `dungeon.c` (`init_dungeons`, `place_level`, …), post-`mklev` mineralize/fill, `u_init.c` ordering | `fastforward.js` replays hundreds of leaf draws; `o_init.js` documented as stub aligned to that bridge |
| **Monster turn truth** | `monmove.c` (`movemon`, `dochug`, `distfleeck`, `m_move`, `m_throw`, …), `mon.c` | `monmove.js` **session harness** through step **12**; only **some** `distfleeck` / `m_move` slices are real; **`dochug`** order vs harness rows is still being peeled |
| **End-of-turn tail** | `allmain.c` (post-hero `movemon` loops, `dosounds`, `rnd` exercise hooks, …) | `moveloop_aux.js` replays **condition-shaped** `rn2` blocks instead of full C |
| **Object + inventory core** | `mkobj.c`, `invent.c`, `pickup.c`, `obj.c`, `dothrow.c`, `do_wear.c`, wield/bimanual, containers | Floor objects are **mklev-shaped**; **`ini_inv_stub.js`** stands in for **`ini_inv`**; no full **`mkobj`** / linked **`invent`** driving most item semantics |
| **Combat** | `uhitm.c`, `mhitu.c`, `mhitm.c`, full `weapon.c` to-hit/damage | `attack.js` **stub damage** (`1+rn2(4)`), no AC/to-hit pipeline, minimal death/corpse path |
| **Command surface** | Most of `cmd.c`, `do.c`, `apply.c`, `pray.c`, … | Narrow subset: movement, search, pickup/look, a few `#` extcmds; no general menu/`do` stack |
| **Branches & special levels** | `sp_lev.c`, Lua under `dat/`, full `dungeon.c` graph | `sp_levchn.js` **stub**; `mklev.js` partial room-and-corridor; no real **minetn** graph parity |
| **Persistence** | `save.c`, `bones.c`, `topten.c` | `storage.js` is API/frozen; **game state serialization** to match C save semantics is not the focus of current `js/` |
| **Full trap / zap / shop long tail** | `trap.c`, `zap.c`, `shk.c`, `music.c`, `apply.c`, … | Large **partial** ports (`trap.js`, `zap_dig.js`, `shop.js`, …) with many branches still **TODO** or **stub** (see §4) |

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
- **`fastforward.js` / `o_init.js`:** transitional RNG replay until real init graphs land
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

Slices should **delete** scaffolding as C lands, not extend replay lists. Score may stay **1/44** for many commits while C depth grows.

1. **Shrink `fastforward.js`** — port **`o_init`**, **`dungeon.c`** init/placement, post-`mklev` phases, and **`u_init`** ordering so replay blocks delete in **C call order**.
2. **Wire `game.invent` + `mkobj` + `ini_inv`** (NH5 **`otyp`/`oclass`**) — unlocks skills, hidden gold, most item-driven traps and combat prep.
3. **Replace `monmove.js` harness** with real **`movemon`** / **`dochug`** / **`distfleeck`** / **`m_throw`** draw ordering; align **`m_move_mon.js`** with C.
4. **Replace `moveloop_aux.js` harness** with real **`allmain.c`** end-of-turn tail.
5. **Expand `cmd.c` / `do.c`** surface to match session inputs.
6. **Combat pipeline** (`uhitm`/`mhitu`/AC/to-hit/damage).
7. **Branches + `sp_lev` + Lua RNG channel**.
8. **Save/bones** semantics vs `docs/API.md`.
9. **Display/botl/cursor** hardening.

---

## 6. Related documents (do not duplicate maintenance here)

| Document | Role |
|----------|------|
| [`c-to-js-port-current.md`](c-to-js-port-current.md) | Thin handoff + immediate next steps |
| [`c-to-js-port-progress.md`](c-to-js-port-progress.md) | What *is* ported, changelog pointer, module sizes |
| [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md) | Dated slice history |
| [`.cursor/plans/nethack_js_port_roadmap_19a4defd.plan.md`](../plans/nethack_js_port_roadmap_19a4defd.plan.md) | Roadmap index |
| `.cursor/plans/nethack-port/*.md` | Satellite checklists |
| [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md) | Repeatable user prompt + autonomous agent workflow |

---

*This file is a **gap inventory**, not a score forecast. Refresh when a major subsystem moves from “stub” to “partial” or from “partial” to “faithful.”*
