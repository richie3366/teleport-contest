# NetHack 5.0 C → JavaScript port — progress report

**Generated:** 2026-05-16  
**Repository:** Teleport contest fork (`teleport-contest`)  
**C reference:** `nethack-c/upstream/src` (NetHack 5.0.0 release tree; **~130 `.c` files** in `src/` at time of analysis)  
**Contestant code:** `js/` (plain ES modules; frozen harness files per contest rules)

### Rolling changelog (archived here)

Long-form dated rows live in **[`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md)** so this file stays smaller. For **what to do next** and a **copy-paste continue prompt**, use **[`c-to-js-port-current.md`](c-to-js-port-current.md)** first.

When you finish a meaningful slice: append **one short row** to the archive (same two-column table), and update **`c-to-js-port-current.md`** (next steps + recent slice).

---

## 1. Executive summary

The fork has evolved from a **minimal harness** (RNG replay, skeletal `newgame` / `mklev`, movement-only `cmd`) into a **substantial partial port** of early-game subsystems: **dungeon layout**, **vision / glyph display**, **search / trap discovery**, **engravings and rumors**, **hero trap effects** (`dotrap` / `trapeffect` subsets), **pickup / look-here messaging**, **moveloop preamble** pieces aligned with `allmain.c`, **starting HP and spell energy** from `role.c` `hpadv`/`enadv` (`u_init_hp_energy.js`), **alignment record** from `role.c` **`initrecord`**, **starting gold** for Healer / Rogue / Tourist from **`u_init.c`** (`u_init_money.js`), **gold inside carried containers** counted like **`vault.c`** / **`shk.c`** when **`game.invent`** exists (`u_init_hidden_gold.js`), **weapon/spell skill caps and practice counters** from **`u_init.c`** / **`weapon.c`** (`u_init_skill_defs.js`, `u_init_skills.js`, **`weapon_kind.js`**, **`obj_oc_skill_data.js`** for NH5 **`otyp`** / **`oclass`**), **`skill_init`** invent **`weapon_type`** pass when **`g.invent`** is linked, **`skill_advance`** / **`#enhance`** via **`#e`** in **`extcmd.js`** (wizard **`[yn]`** speedy loop or one auto-pick; **`{ ok, plines }`**); **`give_may_advance_msg`** queued from **`addWeaponSkill`** / **`useSkill`** and flushed in **`moveloop_preamble.js`**; **`use_skill`** / **`drain_weapon_skill`** as **`useSkill`** / **`drainWeaponSkill`** ( **`P_ADVANCE`** practice and energy-drain **`skill_record`** pops; **You forget …** plines queued then flushed in **`moveloop_preamble`** — **call sites** still TODO), **`attrib.c` `exercise()`** (**`u.aexe`**, **`rn2`**), **`attrib.c` `exerper` / `exerchk`** as **`exerper()`** + **`collectExerchkPlines()`** (**`next_attrib_check`**, **`rn1(200,800)`**, **`u.uhunger`** **900** for periodic **`exercise`**; **`gethungry()`** from **`eat.c`** then **`collectNewuhsPlines(true)`** (**`newuhs`**) run **after each `moves++`** immediately **before** **`collectExerchkPlines`** to match C **`gethungry` → `newuhs` → `exerchk`** — **`moveloop_aux`** harness **`rn2(19)`/`rn2(31)`** still replay; **`gethungry`** **`switch(accessorytime)`** **0/4/8/16** (**`OTYP_*`**, **`Unaware`**, **4/12** + **`EProtection`** — **`wear.js`** **`refreshEProtectionFromRings`** sets **`W_RING*`** for worn rings of protection; other **`E*`** bits still **0**; base tick **`heroEatsOrdinaryFood()`** (**`mondata.js`** / **`mondata.h`** diet); odd/even **`HRegeneration`/`ERegeneration`/`HConflict`/`EConflict`** with **`FROMFORM`/`W_ARTI`/`W_WEP`** per **`eat.c`**); **`newuhs`** subset (**faint `rn2`/`nomul`**, hunger **plines**, starvation **`gameover`**, **`ATEMP(A_STR)`**; **`eat_hunger.js`** **`applyMorehungry`** / **`applyLesshungry`** (**`eat.c`** **`choke`** / **1500** fullwarn subset, **`vomit()`** / **`victual`** / AoS TODO); no **`selftouch`/`eatfood`**); **`cmd.js`** peaceful **`tryPeacefulSwap`** (**`terrainBlocksDisplaceForMon`** + **`terrainBlocksDisplaceForHero`** — **`teleport.c`** **`goodpos`** slice: liquids; **`mayPasswall`** / **`passes_walls`** / **`heroPassesWalls`**; **`amorphous`** + closed door; **`physicalObstacleBlocksBody`** / **`blocksMovementAt`** — **`IS_OBSTRUCTED`/`IRONBARS`** + closed **`DOOR`** (**`hack.c`** **`test_move`** subset; mon uses own **`raceptr`**); floor **`OTYP_BOULDER`** unless **`throwsRocks`**; **`tAt`** on hero + mon cells — swim/**`MR_FIRE`**, **`Levitation`/`Flying`/`Fire_resistance`**, **`mundisplaceable`** optional **`isshk`**/⋯); **`attack.js`** bump melee (**stub dmg**, **`useSkill`**, **`shop.adisturb`** after hit on service mons, peaceful only via direct call — pline skip), **`mkobj_corpse`** corpse on kill when **`monsterLeavesCorpse`** (**`G_NOCORPSE`**, **`g.mvitals`**, **`XKILL_NOCORPSE`** via **`opts.xkillFlags`**), **`overexertHpIfEncumberedPlines`**; **`overexertion()`** = **`gethungry`** + same tail (bump omits extra **`gethungry`** vs **`moveloop_core`**); **`u_init_hp_energy.js`** **`syncPolyHpFromHumanShape`** sets **`u.mh`/`mhmax`/`mhpeak`** when **`Upolyd`** (human-shaped stub until **`mons[]`**), **Wizard** spellbook **`discover_object`** parity via **`spell.c`** **`skill_based_spellbook_id`** (`skill_based_spellbook.js` + **`g.objectDiscovery`**, **`#discoveries`** + **`doname`** / **`look_here`** via **`spellbook_discovery_lines.js`** / **`overlay_screens.js`** / **`objnam.js`**), **XL1 intrinsics** from **`attrib.c`** `adjabil(0,1)` (`u_init_adjabil.js`) plus **`add_weapon_skill`** on later **XL** gains and **`lose_weapon_skill`** on **XL** loss when **`oldlevel > 0`**, **naked AC** from **`find_ac`** (`u_init_find_ac.js`), and **UI overlays** (#attributes, discoveries, **`ini_inv_stub.js`** covering **all thirteen roles** from `u_init.c` `trobj[]` for `#inventory` / #discoveries until real `ini_inv` / `mkobj`).

The implementation is still **nowhere near full-game parity**. Two large **technical debts** dominate the path to judge parity:

1. **`js/fastforward.js`** — replays hundreds of leaf PRNG draws from a reference extraction so the ISAAC stream stays aligned while `o_init`, dungeon graph setup, post-`mklev` init, and related paths are incomplete. **`fastforward_post_mklev`** is smaller now that **`init_attr` / `vary_init_attr`** run as real code (`u_init_attr.js`), but most of the block is still replay.
2. **Per-turn harnesses** — `js/monmove.js` replays fixed `rn2` sequences for steps 1–12; `js/moveloop_aux.js` replays end-of-turn draws (`maybe_generate_rnd_mon`, `dosounds`, `rn2(82)`, conditional exercise hooks) instead of full `allmain.c` / `monmove.c` / `sounds.c` logic. **`gethungry()`** + **`collectNewuhsPlines(true)`** cover much of **`eat.c`** per-turn hunger ( **`newuhs`** faint **`rn2`**, **`nomul`**, starvation **`gameover`**, **`HUNGRY`/`WEAK`** plines; no **`selftouch`/`eatfood`** yet); odd/even prop masks; base tick **`heroEatsOrdinaryFood()`**; **`wear.js`** **`refreshEProtectionFromRings`** updates **`u.EProtection`** **`W_RING*`** from worn rings of protection (**`setWear`** / preamble); **`eat_hunger.js`** **`overexertHpIfEncumberedPlines`** / **`overexertion()`** + **`applyLesshungry`/`applyMorehungry`**; **`cmd.js`** **`domove`** — peaceful **`tryPeacefulSwap`** (**`terrainBlocksDisplaceForMon`** + **`terrainBlocksDisplaceForHero`** — passwall / boulder / amorphous-door slice + **`tAt`** on both swap cells — swim/**`MR_FIRE`**, **`Levitation`/`Flying`**, **`Fire_resistance`** on lava, **`mundisplaceable`**) swap or hostile **`attack.js`** bump — stub damage + **`useSkill`**, minimal **`mkobj_corpse`** floor drop on kill when **`monsterLeavesCorpse`** (**`mvitals`**, **`XKILL`**, **`rnd(2)`** + **`otyp` 471** / **`corpsenm`** stub), **`pline`** overexert lines without duplicating end-of-turn **`gethungry`** (C double-hunger on attack **TODO**).
**`otyp` / `oclass` caveat:** `mklev.js` uses legacy numeric **`WEAPON_CLASS`** / floor **`otyp`** values that do **not** match NetHack 5.0 **`enum objects_nums` / `objclass_classes`** (see **`js/nh5_objclass.js`** + **`obj_oc_skill_data.js`**). New **`weaponType` / `isAmmo`** follow C for NH5 indices; **`g.invent`** must use the same scheme when it is wired from **`ini_inv` / `mkobj`**.

**Git:** `main` is **ahead of `origin/main`** (count with `git rev-list --count origin/main..HEAD` at read time; not pushed at report edit time). Earlier history is overwhelmingly `feat(js):` / `fix(js):` / `refactor(js):` / `docs(plans):` work: moveloop wiring, search/detect, trap progression, engraving stack, inventory overlays, and satellite planning under `.cursor/plans/nethack-port/`. Nothing in this report substitutes reading the diff.

---

## 2. Scale: C surface vs JS modules

| Layer | C (upstream `src/`) | JS (`js/`) |
|--------|---------------------|------------|
| **Volume** | ~130 compilation units, many **10k–200k** LOC (e.g. `cmd.c`, `do.c`, `artifact.c`, `display.c`) | **~15.5k lines** across contestant modules (excluding generated-size `rumor_data.js` / `epitaph_lines.js` data blobs) |
| **Contest frozen** | N/A | `isaac64.js`, `terminal.js`, `storage.js` — **do not modify** |
| **Global state** | `decl.c`, `you.h`, `rm.h`, … | `gstate.js` exports a mutable `game` bag; `game.js` defines `GameMap` / `makeLocation` |

**Conclusion:** Less than **~5%** of upstream C by line count is mirrored in JS, and even that percentage overstates **behavioral** coverage because large JS files are **constants** (`const.js` ~2.9k lines) and **mklev** (partial algorithm, not full branch/special-level stack).

---

## 3. What is ported (concrete, with C anchors)

The following areas have **real logic** traced to specific C files (comments in code cross-reference upstream). Quality ranges from “faithful subset” to “shape only.”

### 3.1 Harness and contest API

| Concern | C / docs | JS |
|---------|----------|-----|
| Segment runner, RNG logging, screen capture | `unixmain.c` / harness contract | `jsmain.js` — `runSegment`, `NethackGame`, `captureJudgeSnapshot`, `animationFrame` |
| ISAAC64, terminal serialize | Recorder | `isaac64.js`, `terminal.js` (frozen) |
| RNG wrappers, clang-order sensitivity | `rnd.c` / README | `rng.js` |

### 3.2 Options and fixed clock

| Concern | C | JS |
|---------|---|-----|
| `nethackrc` parsing subset | `cfgfiles.c`, `options` | `options.js` (partial); `iflags` / `perm_invent` mapping noted in recent commits |
| Role / race / gender / align from OPTIONS | `u_init.c`, `role.c` | `chargen.js` + `roles.js` (abbrev, XL1 ranks, **`allows`** + `coerceChargenIdentity`, race **attrmin/max**, **`hpadv` / `enadv`**, **`initrecord`** → **`u.ualign.record`**, **`u.ualignbase`**); called from `jsmain.js` `start()` |
| Fixed datetime, moon, Friday 13th | `calendar.c`, flags | `moonphase.js`, `moveloop_preamble.js`, `attrib.js` (`changeLuck`) |

### 3.3 Startup and main loop shell

| Concern | C | JS |
|---------|---|-----|
| `newgame`, `moveloop_core`, `moveloop` | `allmain.c` | `allmain.js` — calls real `mklev`, then **fastforward** fills, **`applyRoleStartingUmoney0()`**, **`applyInitAttrPipeline(75)`**, **`applyBirthHpEnergy()`**; stub **`u`** fields (**`u.uhunger`** **900**, **`u.uhave`**, **`u.uamul`/`uleft`/`uright`** **`null`**, **`u.Unaware`**, **`u.EProtection`** **0** then **`wear.js`** refresh on **`set_wear`**; **`context.victual`**, **`initMvitalsStub`** (**`mvitals.js`** **`g.mvitals[]`** stub), **`u.Breathless`**, **`u.Strangled`**); **`applyAdjabil(0,1)`** then **`u.ulevel`**; **`initIniInvStub`**, **`applyHiddenGoldToUmoney0()`**, **`applySkillInit()`** ( **`skill_init`** ), **`findAc()`**, **`g.context.next_attrib_check`** default **600**, vision init, welcome `pline`; **`moveloop_core`** after time-consuming **`moves++`**: **`gethungry()`** (**`eat.c`**) then **`collectNewuhsPlines(true)`** (**`newuhs`**) then **`collectExerchkPlines()`** → **`pline`** |
| `moveloop_preamble` | `allmain.c` | `moveloop_preamble.js` — moon/friday messages, `rndencode`, `seer_turn`, `initrack`, `set_wear` / `reset_justpicked`, `pickup(1)`, encumber message hook, queued **`weapon.c`** plines (**`give_may_advance_msg`**, **`drain_weapon_skill`** forget), `see_monsters` deferral, `update_inventory`, `read_engr_at` on resume, `fix_shop_damage` noop |

### 3.4 Dungeon generation (structural)

| Concern | C | JS |
|---------|---|-----|
| Rooms, corridors, doors, stairs, niches, fill, many terrains | `mklev.c`, parts of `sp_lev.c`, `mkmap.c` | `mklev.js` (~1.9k lines) — **largest ported subsystem**; uses game PRNG; places traps, engravings, graves, floor objects in places |
| Rect helpers | Various | `rect.js`, `hacklib.js` (`distmin`, depth) |

**Caveats in `mklev.js`:** comments mark **oinit**, **level_difficulty**, **maketrap** (in some paths), **dealloc_obj**, **containers**, **corpsenm**, **in_rooms** as stubs or simplified.

### 3.5 Map, vision, display

| Concern | C | JS |
|---------|---|-----|
| `struct rm`, level container | `rm.h`, `decl.h` | `game.js` — `GameMap`, `floorObjHeads`, `engravings`, `traps` |
| Vision / newsym / glyphs | `vision.c`, `display.c` | `vision.js`, `display.js` — partial; trap glyphs on map; **`feelLocation`** / **`feelNewsym`** (**`feel_location`/`feel_newsym`**) for blind pool + search |
| Status / bot | `botl.c` | `display.js` / `game_display.js` — **partial**; TODO for full status line |
| Overlays (#attributes, discoveries, per-role invent stub) | `cmd.c`, invent windows | `overlay_screens.js` (**`#discoveries`** merges **`g.objectDiscovery`** spellbooks via **`spellbook_discovery_lines.js`**), `invent.js`, enlightenment modules; `ini_inv_stub.js` — **all 13 roles** static rows from `u_init.c` `trobj[]` (Barbarian **Barbarian_0** only; Monk/Priest **UNDEF** items labeled as random stubs) |

### 3.6 Commands (narrow)

| Concern | C | JS |
|---------|---|-----|
| `rhack`, movement, `domove` | `cmd.c`, `hack.c` | `cmd.js` — **hjklyubn**; **`drown.js`** **`maybeHeroPoolEnter`** (**`feelNewsym`** on pool) + **`lava.js`** **`maybeHeroLavaEffects`** (**`feelNewsym`** on lava, **`iflags.in_lava_effects`**) + **`water_damage.js`** **`waterDamageChainHeroInventory`** after **`dotrap`** (**`trap.c`** **`spoteffects`**/**`drown`**/**`lava_effects`**/**`water_damage_chain`**); **`walkable.js`** **`goodposHero`/`crawlDestinationHero`/`rndNexttoGoodposHero`** (**`teleport.c`** **`goodpos`**, **`hack.c`** **`crawl_destination`**, **`trap.c`** **`rnd_nextto_goodpos`**); **`goodposHero`** from **`trap.js`** fixed tele launch; **`blocksMovementAt`** (**`physicalObstacleBlocksBody`** — **`IS_OBSTRUCTED`/`IRONBARS`** + **`passes_bars`** via **`dmgtype`/`AD_RUST`/`AD_CORR`** on **`Permonst.mattk`**, closed **`DOOR`**, **`test_move`** subset; **`still_chewing`** not ported); **`diagonalHeroMoveBlocked`** (**`doorlessDoorAt`**, diagonal into/out of intact doorway, **`blockDoorAt`/`blockEntryAt`** stubs; **`badRock`**, **`cantSqueezeThruHero`**, **`NODIAG`** / **`PM_GRID_BUG`**); adjacent **`mpeaceful`** → **`tryPeacefulSwap`** (**`terrainBlocksDisplaceForMon`** + **`terrainBlocksDisplaceForHero`** — **`goodpos`** / **`may_passwall`**: liquids, passwall, **`amorphous`**+closed door, **`OTYP_BOULDER`** / **`throwsRocks`**; **`mundisplaceable`**, **`tAt`** hero+mon, **`mtrapped`**; **`ux0`/`smudge`/`dotrap`**/**`newsym`** only if swapped); else hostile → **`attack.js`** **`doBumpMeleeAttack(mtmp, opts)`** (stub dmg + **`useSkill`** + kill: **`mkobj_corpse`** when **`monsterLeavesCorpse`** + **`overexertHpIfEncumberedPlines`**); `s` search, `:` pickup/look, ESC overlay dismiss, Ctrl-X #attributes flow |
| `#` extended commands | `cmd.c` `doextcmd` | `extcmd.js` — **#v** version; **#e**/**#E** **`#enhance`** (**`enhanceWeaponSkillOneStep`** — wizard **`OPTIONS=wizard`** → speedy **`[yn]`** multi-step or one normal step; menu / spell-out not ported); other **`#`** keys unknown |
| Hash-prefixed extcmds from replay | `extcmdlist` | `extcmd.js` + `cmd.js` wiring |

### 3.7 Search and traps (hero-centric)

| Concern | C | JS |
|---------|---|-----|
| `dosearch` / `dosearch0`, `rnl`, `mfind0` subset | `detect.c` | `search.js` — growing; luck/fund bonuses stubbed; telepathy / warning stubbed |
| Trap placement constants | `trap.h` | `const.js` — aligned with upstream trap types (recent fix commits) |
| `dotrap`, `trapeffect_*`, `domagictrap` subset, `thitu` for missiles | `trap.c`, `mthrowu.c` | `trap.js`, `mthrowu.js` — **large** but many branches still TODO (steed, ball&chain, full `tele`, polyself, statue animate, **`melt_ice`** on fire trap, etc.); **`dofiretrapHeroNoBox`** (**`trapeffectFireHero`**, **`domagictrap`** fate **12**) runs **`burnAwaySlime`** (**`timeout.js`**) then **`(await burnarmorYoumonst) \|\| rn2(3)`** + **`destroyItemsYoumonstFire`** + **`igniteHeroInventory`** (**`erode_obj.js`**) + **`burnFloorObjects`** (**`burn_floor_objects.js`**, blind smell); fixed **tele** launch uses **`goodposHero`** (**`walkable.js`**) via **`cellBlocksHero`**; **`drown.js`**/**`lava.js`**/**`water_damage.js`** after **`domove`** (**`maybeHeroPoolEnter`**, **`maybeHeroLavaEffects`** — **`d(6,6)`** then **`feelNewsym`**, **`burnAwaySlime`** (**`u.Slimed`** flag; no timed **`glob`** yet), **`likesLava`** early exit; **`usurvive`**; fire-resist sink **`set_utrap`/`rn1`** + **`losehp(1)`**; **`!Fire_resistance && Wwalking && usurvive`** **`losehp(dmg)`**; fall-into stub **`pline`** only (**`done(BURNING)`** etc. TODO); **`burn_stuff`**: **`destroy_items.js`** **`destroyItemsYoumonstFire(g,dmg)`** + **`ignite_items.js`** **`igniteHeroInventory(g)`** (**`zap.c`** **`destroy_items`/`ignite_items`**, **`apply.c`** **`catch_lit`** subset — no **`begin_burn`** timers / shop / floor **`nexthere`** from lava yet); **`waterDamageChain`**); **rust trap hero** **`trapeffectRustHero`** — **`waterDamageOne`/`splashLitOne`**, **`ER_*`**, **`bimanual`** stub, iron golem **`losehp`**, gremlin **`split_mon`** TODO; **`waterDamageChain`** **`g.acidCtx`** (**`bhitpos`** still TODO); full **`simpleonames`** / real **`apply.c`** **`splash_lit`** / rust **`erode_obj`** still TODO |
| `seetrap`, `feeltrap`, `nomul` on trap | `trap.c`, `hack.c` | Wired through movement path (recent commits) |

### 3.8 Engravings, rumors, floor objects

| Concern | C | JS |
|---------|---|-----|
| `engr_at`, `make_engr_at`, `read_engr_at`, wipe/smudge, headstones, graffiti | `engrave.c`, `rumors.c` | `engrave.js`, `engrave_lines.js`, `epitaph_lines.js`, `rumor_data.js`, `pickup.js` / `moveloop_preamble.js` hooks |
| `getrumor`, `random_engraving` | `rumors.c` | Ported paths per commit messages |
| Floor stacks `level.objects` | `mkobj.c` | `floorobj.js`, `mklev.js` / `game.js` — **mkgold**-style placement; **`mkobj_corpse.js`** bump-kill corpse (**`rnd(2)`** + **`otyp` 471**), skipped when **`mondata.monsterLeavesCorpse`** is false (**`G_NOCORPSE`**, **`mvitals[mndx]`**, **`XKILL_NOCORPSE`** via **`opts.xkillFlags`**); not full `mkobj` |

### 3.9 Monsters, combat, items (minimal)

| Concern | C | JS |
|---------|---|-----|
| Permonst bits for locomotion / stagger / **bars / size** | `mondata.h`, `mondata.c` | `mondata.js` — **subset**; **`dmgtype`/`dmgtypeFromattack`** (**`NATTK`**, **`AD_RUST`/`AD_CORR`**, optional **`mattk`**); **`passesBars`**, **`verysmall`/`bigmonst`**, exported **`slithy`**; `youmonst.data` / `urace.permonst` still **human-shaped stub** for every race until PM indices port |
| `makemon` for domagictrap etc. | `makemon.c` | `makemon.js` — **explicit stub** (weighted `rndmonst` not ported; returned mon has **`mnum`** for corpse **`corpsenm`**) |
| Stagger / encumbrance messaging | `mondata.c`, `hack.c` | `mondata.js`, `encumbr.js` — `near_capacity` reads stub `u` fields |
| Bump / displace (**`mpeaceful`** → **`tryPeacefulSwap`** + **`terrainBlocksDisplaceForMon`/`terrainBlocksDisplaceForHero`** / **`physicalObstacleBlocksBody`** / **`mundisplaceable`/`tAt`** on both cells; hostile → stub **`1+rn2(4)`**, **`useSkill`**, **`shop.adisturb`**, **`monsterLeavesCorpse`** + **`mkobj_corpse`**) | `hack.c`, `uhitm.c`, `mon.c` | **`cmd.js`**, **`walkable.js`**, **`peaceful_displace.js`**, **`attack.js`**, **`shop.js`**, **`mondata.js`**, **`mvitals.js`**, **`mkobj_corpse.js`**; **`eat_hunger.js`** **`overexertHpIfEncumberedPlines`**; **`makemon.js`** **`mhpmax`**, **`mnum`**, **`mtame`** |
| `doname` subset (gold; NH5 spellbook + **`g.objectDiscovery`** for **`look_here`**) | `objnam.c` | `objnam.js` + **`spellbook_discovery_lines.js`**, **`nh5_objclass.js`** |

### 3.10 Auxiliary

| Concern | C | JS |
|---------|---|-----|
| `nomul`, travel stop on engraving | `hack.c`, `engrave.c` | `timeout.js` (subset) + travel/read integration per commits |
| Track | `track.c` | `track.js` |
| Shop damage / **`adisturb`** | `shk.c` | **`shop.js`** — **`fixShopDamage`** stub; **`adisturb(mtmp)`** peaceful **`isshk`/`ispriest`/`isgd`** → **`mpeaceful` 0** / **`mAngry`** + **`pline`**; wired from **`attack.js`** after bump damage |
| `adjattrib` / **`exercise`** / **`exerper`** / **`exerchk`** (`AEXE` / **AVAL** 50; no Int/Cha; poly gate; **`encumber_msg`** on Str/Con not wired; **`next_attrib_check`** / **`rn1(200,800)`**; **`u.uhunger`** for **`exerper`**; **`gethungry`** → **`collectNewuhsPlines(true)`** → **`collectExerchkPlines`** per C; **`moveloop_aux`** harness **`rn2(19)`/`rn2(31)`** still replay) | `attrib.c` | `attrib.js` — **`adjattrib`** clears **`u.aexe[attr]`** on change; **`exercise`**, **`exerper`**, **`collectExerchkPlines`**; `u_init_attr.js` inits **`u.aexe[]`**; **`engrave.js`**, **`search.js`**, **`trap.js`** call **`exercise`**; **`allmain.js`**, **`jsmain.js`** **`context.next_attrib_check`** |
| `adjabil` (birth `0→1`, role/race XL1 intrinsics subset; **`add_weapon_skill`** / **`lose_weapon_skill`** when **`oldlevel>0`** and level up / down) | `attrib.c` | `u_init_adjabil.js` |
| `skill_init` / `add_weapon_skill` / **`lose_weapon_skill`** / **`use_skill`** / **`drain_weapon_skill`** / **`skill_advance`** / **`#enhance`** ( **`#e`** auto-pick + wizard **`canAdvance(..., TRUE)`** speedy **`[yn]`**; **`give_may_advance_msg`**); **`skill_init`** walks **`g.invent`** with **`weapon_type`** / **`isAmmo`** when a linked list exists; **`skill_based_spellbook_id`** (Wiz → **`g.objectDiscovery`**; **`#discoveries`** + **`doname`** via **`spellbook_discovery_lines.js`**) | `weapon.c`, `spell.c`, `u_init.c` | `u_init_skills.js`, **`skill_display_name.js`**, `u_init_skill_defs.js`, **`weapon_kind.js`**, **`obj_oc_skill_data.js`**, **`nh5_objclass.js`**, **`skill_based_spellbook.js`**, **`spellbook_skill_level_data.js`**, **`spellbook_discovery_lines.js`**, **`overlay_screens.js`**, **`objnam.js`**, **`extcmd.js`**, **`moveloop_preamble.js`**, **`rng.js`** (`rn2` in drain) — **`u.weapon_skills[]`**, **`weapon_slots`**, **`skill_record`** |
| `find_ac` (naked hero; worn gear stub) | `do_wear.c` | `u_init_find_ac.js` — **`findAc()`**; **`mondata.js`** **`permonstHuman.ac`** |
| Poly hero **`u.mh` / `u.mhmax` / `u.mhpeak`** when **`Upolyd`** (mirrors human max until **`mons[]`**) | `polyself.c`, `you.h` | **`u_init_hp_energy.js`** — **`syncPolyHpFromHumanShape`** (**`applyBirthHpEnergy`** tail) |
| **`gethungry` / `newuhs` / `uhsFromUhunger`** (**`eat.c`**: **`gethungry`** **`Unaware`/`rn2(10)`**, **`heroEatsOrdinaryFood()`** (**`carnivorous`/`herbivorous`/`metallivorous`** on **`youmonst.data`**), **`rn2(20)`** odd/even + **`switch`** **0/4/8/16** + **`OTYP_*`**, **4/12** + **`EProtection`** — ring **`W_RING*`** from **`wear.js`** **`refreshEProtectionFromRings`** / **`setWear`**; other extrinsics still **0**) | `eat.c` | **`moveloop_aux.js`** **`gethungry()`**; **`mondata.js`** **`heroEatsOrdinaryFood`**, **`permonstHuman`** **`M1_OMNIVORE`**; **`hunger.js`** **`collectNewuhsPlines`**, **`uhsFromUhunger`**; **`wear.js`** **`refreshEProtectionFromRings`**; **`allmain.js`** **`moveloop_core`** chain; **`timeout.js`** **`endRunning`** |
| `lesshungry` / `morehungry` / **`overexertion`** / **`overexertHpIfEncumberedPlines`** ( **`newuhs`** **`incr`**; **`lesshungry`** **`choke`** / **1500** **`nomul(-2)`**; **`overexertion`** = **`gethungry`** + **`overexert_hp`**; bump melee omits extra **`gethungry`**) | `eat.c`, `hack.c` | **`eat_hunger.js`**, **`attack.js`** — **`applyLesshungry`**, **`applyMorehungry`**, **`chokeFromGluttony`**, **`overexertion`**, **`overexertHpIfEncumberedPlines`**; **`cmd.js`** **`doBumpMeleeAttack`** ( **`moveloop_aux`** **`gethungry`**, **`hunger.js`** **`collectNewuhsPlines`**, **`attrib`** **`exercise`**, **`timeout`** **`fallAsleep`/`nomul`**, **`rng`** **`rn2`** ) |
| `hidden_gold` / `contained_gold` | `vault.c`, `shk.c` | `u_init_hidden_gold.js` — **`hiddenGold`**, **`containedGold`**, **`applyHiddenGoldToUmoney0`** ( **`game.invent`** / **`cobj`** chain; no RNG) |
| Version string | — | `nethack_version.js`, `version.js` |

---

## 4. What is deliberately *not* ported yet (major C areas)

These upstream files (representative) have **no dedicated JS module** or only **distant stubs**:

- **Combat pipeline:** `uhitm.c`, `mhitu.c`, `mhitm.c`, `weapon.c` — still mostly unported; **`cmd.js`** **`blocksMovementAt`** / **`walkable.js`** **`physicalObstacleBlocksBody`** (**`hack.c`** **`test_move`** — **`isok`**, **`IS_OBSTRUCTED`/`IRONBARS`**, **`passes_bars`** via **`mondata.dmgtype`** **`AD_RUST`/`AD_CORR`** + **`mattk`**, closed doors; **`still_chewing`** not ported); **`diagonalHeroMoveBlocked`** (**`doorlessDoorAt`**, **`blockDoorAt`/`blockEntryAt`** (**`shk.c`**, stubs), **`badRock`**, **`cantSqueezeThruHero`**, **`PM_GRID_BUG`** / **`NODIAG`**); walk into **`mpeaceful`** uses **`tryPeacefulSwap`** (**`terrainBlocksDisplaceForMon`** + **`terrainBlocksDisplaceForHero`** — water **`swims`/`amphibious`**, lava **`fireResistant`**/**`MR_FIRE`**/**`Fire_resistance`**, **`Levitation`/`Flying`**, **`mundisplaceable`** optional flags, **`tAt`** on **both** swap cells, **`mtrapped`** — **`hack.c`** / **`goodpos`** subset); **`attack.js`** bump on hostile (**stub damage** **`1+rn2(4)`**, **`useSkill`**, **`shop.adisturb`** on peaceful **`isshk`/`ispriest`/`isgd`** after hit, **`mondata.monsterLeavesCorpse`** with **`g.mvitals`** (**`mvitals.js`**) and **`opts.xkillFlags`** (**`XKILL_NOCORPSE`**) then **`mkobj_corpse`** + **`overexert_hp`** tail; direct **`doBumpMeleeAttack`** on peaceful still pline-only); no to-hit / AC / full **`mondead`**). Full **TTY `#enhance`** menu / **`extcmdlist`** spell-out; **`use_skill`** / **`drain_weapon_skill`** in **`u_init_skills.js`** — **wizard speedy** **`#e`** wired; **call sites** for practice / amnesia still TODO; **`lose_weapon_skill`** on XL loss is mirrored via **`adjabil`** in **`u_init_adjabil.js`** / **`u_init_skills.js`**; `u_init.c` (real **inventory** — partial **gold** + **`hidden_gold`** when **`invent`** exists, **`skill_init`** + invent **`weapon_type`** + **`skill_based_spellbook_id`** when wired, **`adjabil`** XL1 + **`add_weapon_skill`** on level-up, **`find_ac`** naked only), `dokick.c`, `throw.c`, `zap.c`, …
- **Full object model:** `mkobj.c`, `obj.c`, `invent.c` (beyond look/pickup stubs), `dothrow.c`, `pickup.c` (full), `shk.c` shops, `lock.c`, …
- **Monsters:** `mon.c`, `monmove.c` (real), `muse.c`, `mfndpos.c`, corpse handling, …
- **Full command set:** bulk of `cmd.c`, `do.c`, `apply.c`, `pray.c`, …
- **Special levels / Lua:** `sp_lev.c`, Lua level scripts, branch graph beyond a **Mines stub** branch entry in `allmain.js`
- **Save / bones / record:** `save.c`, `bones.c`, `topten.c` — `storage.js` exists but game serialization is not described as complete in code
- **Endgame / quest / Vlad / …** — not started in any meaningful way

---

## 5. Technical debt and refinement priorities

### 5.1 `fastforward.js` (highest risk for false progress)

- **Purpose:** keep PRNG index aligned for a **specific** early initialization trace while `o_init`, full dungeon initialization, mineralize/fill RNG, and post-`mklev` player init are incomplete.
- **Contest integrity:** contest rules forbid tuning to **memorize** the 44 public sessions; using a **static** extracted trace for *startup* is an acknowledged bridge, but it **must shrink** as real `o_init.c`, `dungeon.c`, `u_init.c`, `mklev.c` post-structural phases land.
- **Refinement:** each deleted block should be replaced by **the same call graph and order** as C, verified with `score.sh` / session runners — expect **temporary** RNG drift until the next gap is closed.
- **Note:** the first post-mklev **`rnd(1000)`** replay for tourist starting gold was removed in favor of **`u_init_money.js`**; the rest of the block is still a **single-trace** bridge.

### 5.2 `monmove.js` + `moveloop_aux.js`

- **Current:** `MOVE_MON_HARNESS_MAX_STEP = 12` with fixed lambdas; `end_of_turn_rng` uses **session-shaped** step conditionals (`stepNum === 9`, etc.) for exercise extras.
- **Refinement:** replace with `movemon` from `monmove.c` + ordered tail from `allmain.c`; remove harness rows **incrementally** with regression checks (see `.cursor/plans/nethack-port/10-moveloop-detect-c-map.md`).

### 5.3 `allmain.js` hardcoded hero (partially relieved)

- **Done:** `OPTIONS=role,race,gender,align` → `g.urole` / `g.urace` (incl. **ATTRMIN/ATTRMAX** tables, **`hpadv` / `enadv`**, **`initrecord`**) / `g.flags.female` / `g.u.ualign` / **`g.u.ualignbase`** via `chargen.js`; `roles.js` carries upstream **abbrev** + **XL1 rank** strings + **`attrbase` / `attrdist`**. **`allmain.js`** runs **`applyInitAttrPipeline(75)`** (`attrib.c` **`init_attr`** + **`vary_init_attr`**) so **`u.acurr` / `u.amax`** are no longer hardcoded literals; **`applyRoleStartingUmoney0()`** (`u_init_money.js`) sets **`u.umoney0`** / **`_goldCount`**; **`applyBirthHpEnergy()`** (`u_init_hp_energy.js`) sets HP/Pw and **`u.ualign.record`** from **`initrecord`** when **`moves === 0`**; **`applyAdjabil(0, 1)`** (`u_init_adjabil.js`) grants **XL1** role/race intrinsics per **`attrib.c`**; **`applyAdjabil`** also calls **`addWeaponSkill`** when **`oldlevel > 0`** and **`newlevel > oldlevel`**, and **`loseWeaponSkill`** when **`newlevel < oldlevel`**; **`applyHiddenGoldToUmoney0()`** (`u_init_hidden_gold.js`) adds **`vault.c`**/**`shk.c`** container gold to **`u.umoney0`** when **`game.invent`** has **`cobj`** chains; **`applySkillInit()`** (`u_init_skills.js` + `u_init_skill_defs.js` + **`weapon_kind.js`** + **`skill_based_spellbook.js`**) mirrors **`weapon.c`** / **`spell.c`** **`skill_init`** (invent **`weapon_type`** pass when **`g.invent`** exists; Wizard **`skill_based_spellbook_id`** → **`g.objectDiscovery`**, shown under **`#discoveries`** and **`doname`** / **`look_here`** via **`spellbook_discovery_lines.js`** / **`overlay_screens.js`** / **`objnam.js`**; **`def_skill`** tables; **`obj_oc_skill_data.js`** + **`nh5_objclass.js`** for NH5 **`otyp`/`oclass`**); **`findAc()`** (`u_init_find_ac.js`) sets **`u.uac`** from **`permonst.ac`** after **`initIniInvStub`**.
- **Still hardcoded:** `left_handed`, **`find_ac`** bonuses from worn armor / rings / spellprot, **`drain_weapon_skill`** / **`use_skill`** **call sites** (handlers exist in **`u_init_skills.js`**), full **`#enhance`** TTY menu ( **`#e`** is auto-pick; wizard **speedy** multi-step without C **`y_n`** exact UI), **`handle_tip(TIP_ENHANCE)`**, and other **gameplay** numbers; **`fastforward_post_mklev`** may **drift** …
- **Non-Tourist roles:** `ini_inv_stub.js` lists **all** `u_init.c` **`trobj[]`** role packs for overlays; gameplay still has no real **`invent`** / **`mkobj`** (so **`hidden_gold`** is usually **0** at birth until **`game.invent`** is wired).

### 5.4 `ini_inv_stub.js` + `o_init.js`

- Starting inventory and discoveries are **stubbed** for **all thirteen roles** (`trobj[]` shapes from `u_init.c`); **not** real `ini_inv()` / `invent.c` / PRNG. Female heroes use **`name.f`** as the lookup key (**Priestess**, **Cavewoman**, …).

### 5.5 Traps and search “partial” correctness

- Many **stubs** inside `trap.js`: `steedintrap`, resist properties, full `tele()`, level teleport, polyself, magic portal domination, statue animation (`search.js` / `trap.js` cross-stubs), **`melt_ice`** after fire trap, full **`make_slimed`** / slime **`glob`**, etc.
- **Refinement:** each TODO is a future **RNG + screen** divergence once sessions exercise that branch.

### 5.6 Display and pline ordering

- Satellite plan `10-moveloop-detect-c-map.md` documents a **subtle** issue: clearing `_pending_message` at end of `moveloop_core` vs last captured frame — “naive” fixes can regress `seed8000`. Refinements must preserve **input-boundary** screen contract from `docs/API.md`.

### 5.7 `const.js` / `game_display.js`

- Large macro port in `const.js`; some helpers return `false` with TODO (e.g. `Is_juiblex_level`).
- Full **botl** / cursor / SGR parity is still open (`07-display-terminal.md` checklist).

---

## 6. Unpushed commit trajectory (summary)

**100 commits** on `main` not on `origin/main`, roughly from **docs/rules/plan scaffolding** through:

- Harness fixes (terminal, replay, datetime sync)
- **#search** aligned with `detect.c`; `rnl`; `mfind0` / `feel_location` minimal
- **movemon** harness extension; split **moveloop_aux**; **blocked moves** no longer consume turns
- **Post-replay judge snapshot** for screen parity
- **Inventory / overlay** screens (tourist stub, discoveries, #attributes)
- **Enlightenment** data (patrons, wield, encumbrance, hunger, XP, playtime)
- **#version** extended command
- **moveloop_preamble** expansion (moon, luck, `rndencode`, `seer_turn`, `initrack`, wear/pickup hooks, `update_inventory`, `near_capacity` / `urace` wiring)
- **Engraving** pipeline end-to-end for many paths (smudge on walk, wipe, rumors, headstones, Elbereth rules, `nomul` / read at travel)
- **Pickup** moveloop early exits, `can_reach_floor`, `look_here`, `dfeature_at` / `describe_decor`
- **Floor objects** (`mkgold`-style), **track.c** port
- **Traps:** `dotrap` after moves; arrow/dart via `thitu`; rock; fire/bear; pit/mine/hole/boulder/level-tele; tele trap; web/poly/anti-magic/statue/portal/vibrating; `domagictrap` + **makemon stub**; trap type constant alignment

**Interpretation:** the branch is **actively converging** on an early fixed-seed tourist path (documented as `seed8000` in plans) while **widening** surface area (traps, engravings). It is **not** a sign that the whole game is near completion — it is **depth-first on early moveloop + D:1 features**.

---

## 7. Recommended “rest to do” (ordered for contest parity)

Aligned with `.cursor/plans/nethack_js_port_roadmap_19a4defd.plan.md` and satellites under `.cursor/plans/nethack-port/`:

1. **Kill `fastforward.js`** — port `o_init`, dungeon init graph, post-`mklev` mineralize/fill, `u_init`, `ini_inv` in **C order**; delete matching replay lines.
2. **~~Real chargen~~ → extend chargen / `u_init`** — identity from `nethackrc` is wired; **starting HP/energy**, **attributes**, **alignment record**, **role starting gold**, **`adjabil(0,1)`** (XL1 subset) + **`add_weapon_skill`** on **XL** gain / **`lose_weapon_skill`** on **XL** loss when **`oldlevel > 0`** ( **`attrib.c`** / **`weapon.c`** ), **`hidden_gold`/`contained_gold`**, **`skill_init`** (**`def_skill`** tables + **`g.invent`** **`weapon_type`** loop when invent is linked; **`skill_based_spellbook_id`** for Wizards → **`g.objectDiscovery`**, merged into **`#discoveries`** via **`spellbook_discovery_lines.js`**; **`weapon_kind.js`** / **`obj_oc_skill_data.js`** use NH5 **`otyp`/`oclass`** — differs from **`mklev.js`** legacy constants), and naked **`find_ac`** follow C in spirit; **C order gap:** real **`ini_inv`** should run **before** **`init_attr`** like upstream; **`allmain.js`** still runs attr before the invent stub. **Next:** **`game.invent`** + **`ini_inv`/`mkobj`** (NH5 **`oclass`/`otyp`** so **`skill_init`** and **`hidden_gold`** match C); full **`doname`** / **`dknown`** beyond spellbooks; **`#enhance`** / **`skill_record`**; **`drain_weapon_skill`**; full **`find_ac`** with worn objects, trimming **`fastforward_post_mklev`** per role where needed.
3. **Real `movemon` + end-of-turn tail** — delete `monmove.js` / `moveloop_aux.js` harnesses.
4. **Full `cmd.c` surface** — every key in session corpus; menus, `--More--`, `do` functions.
5. **Objects and inventory** — `mkobj`, invent stack, pickup/drop, containers, shops (`shk.c`).
6. **Combat and monsters** — `mhitu`, death, corpses, pets (`dog.c`), full trap interactions with monsters.
7. **Branches and special levels** — Lua RNG channel, `sp_lev`, mines/soko/quest/…
8. **Save / bones / multi-segment** — honor `input.storage` per `docs/API.md`.
9. **Display parity** — `botl`, pline vs map message line, symset, full cursor policy.
10. **Continuous QA** — run full public session set; track first divergence per session (`09-qa-sessions.md`).

---

## 8. Appendix: `js/` module sizes (lines)

Approximate **physical LOC** (2026-05-16 `wc -l`):

| Lines | File |
|------:|------|
| 2926 | `const.js` |
| 1859 | `mklev.js` |
| 1129 | `trap.js` |
| 800 | `rumor_data.js` |
| 713 | `terminal.js` (frozen) |
| 558 | `vision.js` |
| 545 | `engrave.js` |
| 420 | `display.js` |
| 402 | `epitaph_lines.js` |
| 332 | `search.js` |
| 582 | `ini_inv_stub.js` |
| 319 | `fastforward.js` |
| 251 | `pickup.js` |
| 245 | `jsmain.js` |
| 190 | `allmain.js` |
| 202 | `roles.js` |
| 202 | `u_init_skill_defs.js` |
| 163 | `u_init_skills.js` |
| 101 | `u_init_attr.js` |
| 58 | `u_init_hp_energy.js` |
| 24 | `u_init_money.js` |
| 65 | `u_init_hidden_gold.js` |
| 56 | `u_init_adjabil.js` |
| 17 | `u_init_find_ac.js` |
| 95 | `attrib.js` |
| 79 | `chargen.js` |
| 199 | `isaac64.js` (frozen) |
| 165 | `rect.js` |
| 164 | `mondata.js` |
| 161 | `cmd.js` |
| ≤160 | remaining modules (see `wc -l js/*.js`) |

**Total listed in `wc`:** ~15.5k lines under `js/*.js` (run `wc -l js/*.js` for current).

---

## 9. References inside this repo

- Contract: `docs/API.md`
- Phases / diff penalty: `docs/PHASES.md`
- Roadmap index: `.cursor/plans/nethack_js_port_roadmap_19a4defd.plan.md`
- Workstream checklists: `.cursor/plans/nethack-port/*.md` (especially `01`–`09` and `10-moveloop-detect-c-map.md`)
- Port conventions: `.cursor/rules/teleport-js-port.mdc`
- Upstream C submodule: `nethack-c/upstream/` (initialize with `git submodule update --init nethack-c/upstream` if missing)

---

*This document is an engineering snapshot for planning and onboarding; it is not a score prediction.*
