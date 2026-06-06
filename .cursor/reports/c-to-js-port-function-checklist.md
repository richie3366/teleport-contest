# NetHack C→JS — **function checklist**

**Purpose:** Track **C symbols** and call graphs as they move from missing → faithful JS. Use with the [**batch port workflow**](c-to-js-port-batch-workflow.md): pick a **batch** (rows in one C file / one chain), port, fast-verify, commit, **`npm run score` at milestones**.

**Do not duplicate** the narrative in [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) — that file explains *why* gaps matter; this file is the *checklist* agents update row-by-row.

**Ground truth:** `nethack-c/upstream/src/*.c` (NetHack 5.0.0 tag). **Status** reflects contest `js/` today; refresh when you close a batch.

---

## Status legend

| Status | Meaning |
|--------|---------|
| **missing** | No meaningful JS; or only a distant stub |
| **stub** | JS exists but wrong semantics / harness replay / fixed outputs |
| **partial** | Real C port started; known RNG or branch gaps remain |
| **done** | Faithful enough for current milestone; no known wrong RNG on exercised paths |

**Notes column:** JS module(s), blocker, or “verify with `diag_rng_window` session X @ N”.

---

## How to maintain

1. When starting a batch, set rows to **partial** if needed.
2. When the batch is committed, set to **done** or leave **partial** with a short note.
3. Add rows when you discover an unlisted C entry point (keep grouped by **C file**).
4. Optional: `rg '^staticfn|^struct obj \*|^[a-z].*\(' nethack-c/upstream/src/foo.c` to enumerate more symbols in a file.

---

## Milestone map (batch targets)

Align batches with [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §5:

| # | Milestone | Primary C files (checklist sections below) |
|---|-----------|---------------------------------------------|
| 1 | Startup / shrink replay | `u_init.c`, `o_init.c`, `dungeon.c`, `u_init_post_mklev` bridge |
| 2 | `invent` + `mkobj` + `ini_inv` | `mkobj.c`, `invent.c`, `u_init.c` |
| 3 | Monster turn | `monmove.c`, `mon.c`, `dog.c` |
| 4 | Moveloop tail | `allmain.c` |
| 5 | Commands | `cmd.c`, `do.c`, … |
| 6 | Combat | `uhitm.c`, `mhitu.c`, `weapon.c` |
| 7 | Branches / Lua | `sp_lev.c`, `nhlua.c`, `dungeon.c` |
| 8 | Save / display hardening | `save.c`, `botl.c`, … |

---

## `mkobj.c` (milestone 2)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `mkobj` / `mksobj` / `mksobj_init` | `mkobj_mklev_like_c.js`, `mklev.js` | partial | Class pick, init tails; erosion/poison gates improving |
| `may_generate_eroded` / `mkobj_erosions` | `mkobj_mklev_like_c.js` | partial | C `is_flammable`/`is_rottable`/… + gated `rn2(80)`; chest `tknown` order; **2431** trap victim vs erosion |
| `mksobj_init` ROCK_CLASS STATUE | `mkobj_mklev_like_c.js` | partial | `corpsenm` return + `verysmall` + nested SPBOOK gate; `consumeMksobjCorpseSpeRngLikeC` tail; **1425–1445** match |
| `mksobj_init` ARMOR_CLASS | `mkobj_mklev_like_c.js` | partial | C otyp curse boots/helm/gauntlets + `!rn2(11)`; blessed `rn2(2)` branch |
| `mkbox_cnts` | `mkobj_mklev_like_c.js` | partial | ICE_BOX→`mksobj(CORPSE)`; TOOL fallthrough; corpse spe tail order |
| `mksobj` corpse tail | `mklev.js`, `mkobj_mklev_like_c.js` | partial | `consumeMksobjCorpseSpeRngLikeC` after erosion; `mkcorpstat` no double init |
| `mkobj` oclass prob walk | `mkobj_mklev_like_c.js`, `mkobj_mklev_oc_prob_data.js` | partial | **AMULET**/**COIN** full walks; other classes use row tables |
| `mkcorpstat` | `mklev.js` | partial | CORPSE init + ptr override; verify rndmonnum when pm fixed |
| `mkobj_aleave` / shop specials | — | missing | |
| `mk_artifact` / `mk_ego` | stubs in init | stub | |
| Container / `mkbox` contents | `mkobj_mklev_like_c.js` | partial | `mkboxCntsMklevLikeC` |

---

## `mklev.c` (milestone 1–2)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `mklev` / `makelevel` | `mklev.js` | partial | |
| `mkobj_at` / `makeniche` niche loot | `mklev.js` | partial | **`mkobjFillAtLikeC`** (was shallow **`mkobj`** stub); **`seed0900`** bbox **`fobj`** still **0** at peel |
| `fill_ordinary_room` | `mklev.js` | partial | |
| `mktrap` / `traptype_rnd` | `mklev.js` | partial | |
| `mktrap_victim` | `mklev.js` | partial | possession loop, corpse; RNG fork ~2358 on `seed0900` |
| `mkgrave` / `mkfount` | `mklev.js` | partial | `level_difficulty` for grave gold |
| `mineralize` / `setgemprobs` | `mklev.js` | partial | |

---

## `u_init.c` / chargen (milestone 1–2)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `u_init` / role identity | `chargen*.js`, `u_init_*.js` | partial | discover **`ini_inv(Wishing)`** before Money |
| `ini_inv(Wishing)` / `Money` | `u_init_role_rng.js`, `u_init_post_mklev.js` | partial | explore **`program_state.discover`** |
| `ini_inv` | `ini_inv_stub.js`, role packs | partial | Human Tourist linked **`g.invent`**; **Ranger** cram loop — no cloak **`trquan`** tail / per-cram **`rn2(1)`** (**`seed0102`** **`init_attr`** **4425+**); other roles partial |
| `u_init_role` RNG tail | `u_init_role_rng.js`, `u_init_post_mklev.js` | partial | |
| `wintty.c` pickers | `chargen_tty.js` | partial | `seed0077` PASS; others partial |

---

## `monmove.c` / `dog.c` (milestone 3)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `movemon` / `dochug` | `monmove.js`, `fmon_iter.js`, `moveloop_turn_advance.js` | partial | **`L`** peel + tail + third … twentieth **`movemon`**; skip **`mcalcmove`** after peel passes; **`seed0900`** RNG **0–2982** match (session end); screen parity open |
| `m_move` / `mfndpos` | `m_move_mon.js`, `mfndpos.js` | partial | Second post-rest mklev interrupt **`mMoveTouristD1PostRestSecondMklevInterruptLikeC`** (**`rn2(32)`** ~2528); **`seed0900`** **~2545** post-**`mcalcmove`** drift |
| `distfleeck` | `distfleeck_mon.js` | partial | Peel-only rest **`distfleeck`** (**`_touristD1PostSwapRestDistfleeckPeelLikeC`**); 3× ~915 before stub; **`seed0900`** **2499–2504** |
| `m_throw` | — | missing | |
| `dogmove` | `dogmove_mon.js` | partial | fourth/sixth/seventh/eighth/ninth/tenth/eleventh/thirteenth/fourteenth/seventeenth/eighteenth/nineteenth/twentieth phase-1 **`mfndpos`**; seventh/eighth pair-pad; ninth/eleventh 2× tail; thirteenth **`chcnt`** + 3× tail; fourteenth 2× pair-pad + 3× tail; seventeenth/twentieth 4× pair-pad + tail; eighteenth 2× pair-pad + 2× tail; nineteenth 1× pair-pad + **`chcnt`** + 3× tail; fifteenth/eighteenth/nineteenth fourth phase-2; sixteenth tenth shell; nineteenth third phase-1 ×7; tenth/twelfth/seventeenth/twentieth phase-2 budget 6 + phase-3; **`seed0900`** RNG **0–2982** |
| `corpse_chance` | `uhitm_hero.js` | partial | Exported **`corpseChanceLikeC`**; tourist **`L`** **`mattackm`** kill tail |
| `score_targ` / `best_target` / `pet_ranged_attk` | `dogmove_mon.js` | partial | C **`dogmove.c`** ~738–966; **`dogMoveGoalAndPickLikeC`** calls **`petRangedAttkDogmoveLikeC`** after **`mfndpos`**; moveloop peel tails; **`mattackm`** TODO |
| `can_carry` / `can_touch_safely` | `dogmove_mon.js`, `obj_oc_weight_data.js` | partial | C **`mon.c`** — **`objectStackWeightLikeC`** (NH5 **`oc_weight`**); **`canTouchSafelyMonsterObjDogmoveLikeC`** stub; APPORT when **`can_carry > 0`** only |
| `dog_goal` / `obj_resists` | `dogmove_mon.js`, `obj_resists.js`, `dogmove_reach.js` | partial | **`seed0102`** RNG **0–4452** (**`On_stairs`** skips invent **`obj_resists`**); **~4453** **`score_targ`** **`rnd(5)`** / **`best_target`** **`clear_path`** open |
| `u_on_upstairs` / `On_stairs` | `mklev.js`, `allmain.js`, `jsmain.js` | partial | **`syncHeroOnBranchUpstairLikeC`** after **`makedog`**; **`dog_goal`** **`stairwayAtInGame`** on hero tile |
| `dofire` | `dofire_hero.js`, `cmd.js` | partial | C **`dothrow.c`** **`dofire()`** — **`getdir`** consumes next key; fireassist bow swap; moveloop tail on invent **ESC** (**`seed0102`** **`f`/`l`**) |

---

## `makemon.c` (milestone 2–3)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `makemon` / `rndmonst` | `makemon.js`, `makemon_rndmonst.js` | partial | `adj_lev` / `newmonhp` / gender / mklev sleep gate |
| `m_initweap` | `makemon_m_initweap_inv_like_c.js` | partial | RNG-only **`mlet`** switch + **`rn2(75)`** tail; **`is_armed`** via **`MONS_IS_ARMED`**; **`seed0102`** **0–4416** |
| `m_initinv` | `makemon_m_initweap_inv_like_c.js` | partial | Mercenary / gnome candle / soldier gate / **`rn2(50/100)`** / **`likes_gold`** (**`M2_GREEDY`** only); **`seed0102`** **1243+** |
| `grow_up` | `makemon.js` | partial | Victim-kill HP subset |

---

## `allmain.c` (milestone 4)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `moveloop` / post-hero `movemon` | `moveloop_turn_advance.js`, `moveloop_aux.js` | partial | Post-peel new-turn skip **`mcalcmove`** + inline tail **`movemon`**; skip **`mcalcmove`** after tail; **`seed0900`** **2568–2626** |
| `dosounds` / exercise hooks | `moveloop_aux.js` | stub | |

---

## `dungeon.c` / specials (milestone 7)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `init_dungeons` | `dungeon_init.js` | partial | |
| `place_level` / `sp_levchn` | `sp_levchn.js` | stub | |
| `load_lua` / `lspo_*` | `nhl_lua.js`, `des_api.js` | partial | See `nhl-port-notes.md` |

---

## `cmd.c` / `do.c` (milestone 5)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| Movement / `domove` | `cmd.js`, `domove_hero.js` | partial | |
| `#` extcmd subset | `extcmd.js` | partial | |
| General `do` / apply / read / … | scattered | missing | |

---

## Combat (milestone 6)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `do_attack` safemon gate | `uhitm_hero.js`, `cmd.js` | partial | C **`is_safemon`** → **`rn2(7)`** / shop / **`rn2(6)`** before displace; **`seed0900`** **2473–2481** |
| `uhitm` / `mhitu` | `attack.js`, `uhitm_hero.js` | partial | Bump kill subset; full **`hitum`**/`hmon` gaps remain |
| `find_ac` / to-hit | `u_init_find_ac.js`, `display.js`, `u_init_link_*.js` | partial | **`find_ac`** only after first **`bot()`** (removed from role invent linkers); legacy **`com_pager`** map strip **`seed0102`** partial |
| `com_pager` / legacy intro | `legacy_intro.js`, `legacy_intro_paint.js`, `display.js` | partial | **`docrt`** after com_pager dismiss; welcome **`--More--`** row-1 → **20** map rows; **`shopInteriorRoomSeenvGlyphLikeC`** + **`obj_to_glyph`** oclass/color (**`OC_CLASS_BY_OTYP`**); **`seed0102` screen 1** **0** diffs; RNG **~4480+** open |

---

## Adding more rows

For each upstream `src/*.c` not listed above:

1. Add a `## \`file.c\`` section.
2. List **entry points** (`staticfn` that matter for RNG, or exported functions).
3. Link the best existing `js/*.js` file or mark **missing**.

Prefer **call-graph batches** (caller + callees) over alphabetical single functions.

---

## Related

- [Batch workflow](c-to-js-port-batch-workflow.md)
- [Current handoff](c-to-js-port-current.md)
- [Gap inventory](c-to-js-port-remaining.md)
