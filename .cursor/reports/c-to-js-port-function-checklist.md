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
| `fill_ordinary_room` | `mklev.js` | partial | C: sleeper stays at **`somexyspace`** coords — no **`anchorWestApportSleeperLikeC`** post-**`level_finalize_topology`**; fungus door niches only |
| `level_finalize_topology` | `mklev.js` | partial | C: no generic **`mgenmklev`** relocate; **`preferSleepingLichenDoorNichesLikeC`** fungus-only |
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
| `movemon` / `dochug` | `monmove.js`, `fmon_iter.js`, `moveloop_turn_advance.js`, `moveloop_aux.js`, `dogmove_mon.js`, `m_move_mon.js`, `monmove_search.js`, `mfndpos_mon.js` | partial | **Run-`K` runaway (~2823+):** removed inline capital-**`K`** peel (~210 lines); walk **`fmon`** peel-only + moveloop outer-loop guards; comma pickup outer cap. Prefix **73** still **~7440** (C **~2912**) — stale east-tail deferred + **`rn2(100)`** before **`dochug:886`**. Coincidental **`3048–3053`** window; fix **K** before **3054**. **`seed8000` 2900–3129:** aligned |
| `m_move` / `mfndpos` | `m_move_mon.js`, `mfndpos.js` | partial | Second post-rest mklev interrupt **`mMoveTouristD1PostRestSecondMklevInterruptLikeC`** (**`rn2(32)`** ~2528); **`seed0900`** **~2545** post-**`mcalcmove`** drift |
| `distfleeck` | `distfleeck_mon.js` | partial | Peel-only rest **`distfleeck`** (**`_touristD1PostSwapRestDistfleeckPeelLikeC`**); 3× ~915 before stub; **`seed0900`** **2499–2504** |
| `m_throw` | — | missing | |
| `dogmove` | `dogmove_mon.js` | partial | Comma invent + global **`fobj`** **`obj_resists`** before **`chcnt`**; full **`chcnt`** ladder **2929–2938**; **`seed0900`** RNG **0–2982** |
| `corpse_chance` | `uhitm_hero.js` | partial | Exported **`corpseChanceLikeC`**; tourist **`L`** **`mattackm`** kill tail |
| `score_targ` / `best_target` / `pet_ranged_attk` | `dogmove_mon.js` | partial | C **`dogmove.c`** ~738–966; **`petRangedAttkDogmoveLikeC`** after **`mfndpos`**, **`newdogpos`** deferred; **`scoreTargDogmoveLikeC`** priest/minion coaligned-peaceful + weak-target penalty; vampshifter **`mtmp_lev`** **`rn2`** tail TODO; **`mattackm`** TODO; **`seed0102` ~4453** **`rnd(5)`** aligned |
| `dog_hunger` | `dogmove_mon.js` | partial | C **`dogmove.c`** **`dog_hunger`** / **`DOG_WEAK`**/**`DOG_STARVE`** — **`mconf`**, **`mhpmax_penalty`** at **`dogMoveGoalAndPickLikeC`** entry; **`dog_starve`** stub; display tails skipped |
| `can_carry` / `can_touch_safely` | `dogmove_mon.js`, `obj_oc_weight_data.js` | partial | C **`mon.c`** — **`objectStackWeightLikeC`** (NH5 **`oc_weight`**); **`canTouchSafelyMonsterObjDogmoveLikeC`** stub; APPORT when **`can_carry > 0`** only |
| `dog_goal` / `obj_resists` | `dogmove_mon.js`, `obj_resists.js`, `dogmove_reach.js` | partial | **`seed0102`** RNG **0–4485** PASS; **`On_stairs`** skips invent **`obj_resists`**; pet **(29,8)** @ **`makedog`** matches C **`collect_coords`** shuffle |
| `u_on_upstairs` / `On_stairs` | `mklev.js`, `allmain.js`, `jsmain.js` | partial | C **`u_on_upstairs`** in **`newgame`** before **`makedog`**; **`syncHeroOnBranchUpstairLikeC`** in **`jsmain`** post-**`newgame`** only; **`dog_goal`** **`stairwayAtInGame`** on hero tile |
| `dofire` / `getdir` / `help_dir` / `dodiscovered` / enlightenment | `dofire_hero.js`, `invent_prinv.js`, `overlay_screens.js`, … | partial | C **`dothrow.c`** fireassist **`prinv`** **`--More--`** pass-through cursor row 0; **`seed0102` PASS** |
| `movemon` / `#search` ranger peel | `monmove.js`, `monmove_search.js`, `m_move_mon.js`, `cmd.js`, `fmon_iter.js`, `dogmove_mon.js`, `moveloop_turn_advance.js` | partial | C: ranger D:1 twin **`#search`** pet-only; **`whappr`** silent mfndpos away picks; moveloop peel **`rn2(12)×2`** + skip inline **`mcalcmove`**; **`seed0102` PASS** (**4485/4485**, **25/25** screens/cursors) |

---

## `makemon.c` (milestone 2–3)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `makemon` / `rndmonst` | `makemon.js`, `makemon_rndmonst.js` | partial | `adj_lev` / `newmonhp` / gender / mklev sleep gate; **`enexto_core`** + **`GP_AVOID_MONPOS`** via **`goodposMakemonLikeC`** / **`isExclusionZoneLikeC`** |
| `makedog` / `newgame` MON_AT | `makedog.js`, `allmain.js`, `spoteffects.js` | partial | C **`allmain.c`**: **`MON_AT`** → **`mnextoNearHeroSyncLikeC`** before **`makedog()`**; **`seed0102`** **`enexto`** candy **[0]=(29,8)** @ rng **4334+** — verified vs C shuffle |
| `goodpos` / `is_exclusion_zone` | `walkable.js`, `exclusion_zone.js` | partial | C **`teleport.c`** **`GP_AVOID_MONPOS`** + **`mkmaze.c`** **`is_exclusion_zone(LR_MONGEN)`**; **`__diagEnexto*`** hooks; des **`g.exclusion_zones`** load TBD |
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
| `#` extcmd subset | `extcmd.js`, `extcmd_list.js`, `do_name_call.js` | partial | C **`getline.c`** NEWAUTOCOMP wire vs cursor; **`docallcmd`** **(end)** row **8**; **`seed0102`** cursors **23/25** |
| General `do` / apply / read / … | scattered | missing | |

---

## Combat (milestone 6)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `do_attack` safemon gate | `uhitm_hero.js`, `cmd.js` | partial | C **`is_safemon`** → **`rn2(7)`** / shop / **`rn2(6)`** before displace; **`seed0900`** **2473–2481** |
| `uhitm` / `mhitu` | `attack.js`, `uhitm_hero.js` | partial | Bump kill subset; full **`hitum`**/`hmon` gaps remain |
| `find_ac` / to-hit | `u_init_find_ac.js`, `display.js`, `u_init_link_*.js` | partial | **`find_ac`** only after first **`bot()`** (removed from role invent linkers); legacy **`com_pager`** map strip **`seed0102`** partial |
| `com_pager` / legacy intro | `legacy_intro.js`, `legacy_intro_paint.js`, `display.js` | partial | brown **`k`**; hdoor **(26,10)** defer + post-**`movemon`** repaint; **`seed0102` PASS** |

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
