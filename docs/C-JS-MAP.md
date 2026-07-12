# C → JS coverage map

Structural ledger for the port. Status meanings are defined in
`PORTING-RUNBOOK.md`; a passing session alone does not imply `ported`.

Last broad audit: **2026-07-12**, dirty working tree based on `8b71735`.

## Update rule

When changing a subsystem:

1. cite the pinned C source/module;
2. update status only if the status definition is met;
3. name deferred semantics, not the public seed that failed to exercise them;
4. add verification evidence or link to `DIVERGENCE-LOG.md`.

## Harness and contracts

| C / contract | JS | Status | Evidence / known omissions |
|---|---|---|---|
| ISAAC64 engine | `js/isaac64.js` | frozen | Judge-owned; never edit |
| terminal grid/serialization | `js/terminal.js` | frozen | Judge-owned; cursor is scored with screen |
| persistence VFS | `js/storage.js` | frozen | Contract exists; gameplay save/bones users mostly absent |
| `tty_nhgetch` boundary | `js/input.js`, `js/jsmain.js` | partial | Boundary capture passes two Tourist sessions; capture hook still repairs Count/`--More--` cursor instead of deriving it entirely from display semantics |
| core RNG wrappers | `js/rng.js` | partial | Green paths match; `rnl` is absent despite 155 public calls; `rn1` is a macro over logged `rn2` |
| Lua RNG bindings/provenance | — | absent | `nh.rn2`/`nh.random` must consume core; patch 004 adds Lua callsite provenance, not a third ISAAC stream |
| display/hallucination RNG | — | absent | No hallucination parity |
| per-segment contestant API | `js/jsmain.js` | partial | Fresh game and shared storage binding implemented; save/bones gameplay users are absent |

## Startup and character creation

| C source | JS | Status | Evidence / known omissions |
|---|---|---|---|
| `src/options.c` | `js/options.js` | partial | Enough options for current Tourist paths; full rc/keybind/symset semantics incomplete |
| `src/role.c` | `js/roles.js` | partial | Tourist + Rogue identity/attrs/gods/`hpadv`/`enadv`; `Hello`/`align_str`/`align_gname`/`align_gtitle` (leading `_` goddess); race human `hpadv`/`enadv`; other roles still scaffold (name+mnum only) |
| `src/u_init.c:u_init_role` | `js/u_init.js` | partial | Tourist + Rogue cases; other roles still throw; Rogue `knows_class` uses named P_DAGGER otyps until `oc_skill` is extracted; `Skill_R` / full armor-cat macros deferred |
| `src/u_init.c:u_init_race` | `js/u_init.js` | partial | Human no-op; orc `Xtra_food` + knows; elf instrument+knows; dwarf knows; gnome no-op (D-0027); `ini_inv_obj_substitution`/`inv_subs` ported; `ini_inv_mkobj_filter` full reject list deferred |
| `src/u_init.c:u_init_misc` | `js/u_init.js` | partial | `newhp`/`newpw` at ulevel 0; rc align → `ualign`; handedness RNG; many u fields still absent |
| `src/attrib.c:newhp` / `src/exper.c:newpw` | `js/attrib.js` | partial | Init (`ulevel==0`) path only; level-up / Con bonus deferred |
| `src/attrib.c` (attrs) | `js/attrib.js` | partial | Initial Tourist/Rogue attribute paths; `change_luck` clamp; `u_init_carry_attr_boost` still stubbed |
| `src/allmain.c:welcome` / `role.c:Hello` | `js/allmain.js` | partial | New-game welcome from Hello+align+gender+race+role; `flush_topl_more` before tutorial; restore path deferred |
| `src/allmain.c:moveloop_preamble` | `js/allmain.js` + `js/calendar.js` | partial | Moon/friday plines + `change_luck`; pickup/encumber/engraving deferred |
| `src/o_init.c` | `js/o_init.js` | partial | Green-session shuffle/discovery evidence; `discover_object` encounter flag + `interesting_to_discover` (D-0024); not audited across all classes |
| `src/dungeon.c`, `dat/dungeon.lua` | `js/dungeon.js`, generated dungeon data | partial | Topology subset; not a replacement for executing upstream Lua |
| tutorial / quest pager | `js/allmain.js`, `js/questpgr.js`, `js/invent.js` | partial | Legacy `%d`/`%G` + corner NHW_MENU without `clearScreen` (D-0026); tutorial corner (D-0023); invent corner (D-0024); yes-path / fullscreen legacy deferred |
| `src/insight.c` enlightenment | `js/invent.js` | partial | Pantheon/wallet/handedness + plname capitalize + wield/skill starter lines (D-0024); many sections deferred |
| `src/calendar.c` / botl flags | `js/calendar.js`, `js/display.js` | partial | Fixed-datetime moon/friday; botl `showexp`/`time` + plname capitalize |

**Shared blocker:** **29/44 sessions** throw `u_init_role: role not ported`
(other roles). Rogue invent + mineralize bury + corpse-age POISON +
`mktrap_victim` place + `dog_move` cursed-square + dart-trap `mintrap` +
cursemsg/`--More--` + `dog_invent` pickup + tseen trap skip + `OPENDOOR`
`nohands`/`verysmall` + `doapply`/`pick_lock` (D-0012–D-0021) + `newsym`
objects/SDOOR (D-0022) + tutorial NHW_MENU (D-0023) + invent/doname/disco
(D-0024) + getobj throw/apply `$`/`continue`/`--More--` (D-0025) + legacy
corner map + look `:` staircase (D-0026) verified.
seed1500 **PASS** RNG/Scr **2768/2768**, **40/40**. seed1800 **PASS**
**2458/2458**, **26/26**. Orc race kit (D-0027) + `splitobj` (D-0028) +
`relobj` (D-0029) + `dog_goal` real `couldsee` (D-0030) + empty-space
`#kick` (D-0031) + `m_avoid_kicked_loc` (D-0032) + `.`/`donull` (D-0033)
clear through 3104. Next peel: seed0060 @ 3105 — C `makemon_rnd_goodpos`
after `maybe_generate_rnd_mon` gate (JS stubs `makemon` body). `m_initinv`
body still absent (named omission).

## Data and world generation

| C source | JS | Status | Evidence / known omissions |
|---|---|---|---|
| `include/objects.h` | extractor + `js/generated/objects_data.js` | partial | Reproducible table, but behavior remains in partial object modules; **no `oc_skill`/`oc_charged`** yet (`is_multigen`/`is_poisonable`/doname charged name-list stand-ins) |
| `include/monsters.h` | extractor + `js/generated/monsters_data.js` | partial | `has_at_weaps` from AT_WEAP; `mflags1` extracted (D-0020 `nohands`); **`mcolors` extracted** (D-0022 corpse `mon_color`); poisonous/acidic/carnivore predicates still underused; full mattk/race flags still underused |
| rumor sources | extractor + generated rumors | partial | Fortune path exercised |
| `src/mkobj.c` | `js/mkobj.js` | partial | Creation/merge/weight subsets; `add_to_buried` (D-0014); `start_corpse_timeout` + `mkcorpstat` `special_corpse` restart (D-0011); `is_poisonable`≡missiles (D-0012); starting SACK/`mkbox_cnts` (D-0013); **`splitobj`** quan/owt + floor chain + `next_ident` (D-0028); **`obj_extract_self` MINVENT** (D-0029); omit `nextoid` shop-price search, unpaid/`splitbill`, timers/light/`copy_oextra`, invent/contained extract, `zombie_form`/zombify, CORPSE `undead_to_corpse`+`G_NOCORPSE` retry, timer fire, `permapoisoned` |
| `src/makemon.c` | `js/makemon.js` | partial | Ordinary `is_armed`/`m_initweap`/`mongets`/`m_initthrow` (S_KOBOLD/S_ORC/S_OGRE/S_GIANT/S_CENTAUR/S_WRAITH/S_ZOMBIE/S_HUMANOID + default); **`add_to_minv` uses `OBJ_MINVENT`** (D-0029); **`m_initinv` body absent** (tail-only; not seed1500's current peel); **`makemon(NULL,0,0)` / `makemon_rnd_goodpos` absent** (seed0060 @ 3105); omit S_HUMAN/S_ANGEL/S_KOP/S_DEMON/S_TROLL/S_LIZARD specials, `add_to_minv` merge, demon→default FALLTHROUGH |
| `src/mklev.c` | `js/mklev.js` | partial | Ordinary level path substantial; mineralize bury-vs-place (D-0014); `mktrap_victim` place_object ammo/possessions (D-0016); omit `mkgrave_room` bury, `begin_burn`, special rooms/edge cases; seed0060 @ 2997 was **not** corridor typ (D-0032) |
| `src/vision.c` | `js/vision.js` | partial | Algorithm subset; `clear_path`/`m_cansee` exported for pet rays (D-0018); **`couldsee` wired into `dog_goal`** (D-0030); broad FOV/detection states unaudited |
| `src/trap.c` | `js/trap.js` | partial | Monster dart path: `t_at`/`t_missile`/`thitm` miss pline/`mintrap`/`seetrap` (D-0018–D-0019); omit other trap types, hero `dotrap`, hit/`dmgval` |
| runtime `dat/*.lua` + `nhlua.c`/`sp_lev.c` | — | absent | Production requirement; generated dungeon structure is only a scaffold |

## Turns, commands, and display

| C source | JS | Status | Evidence / known omissions |
|---|---|---|---|
| `src/allmain.c` | `js/allmain.js` | partial | Basic move loop and hunger/sound subsets; **`maybe_generate_rnd_mon` gate only** (stubs `makemon` body — seed0060 @ 3105) |
| `src/cmd.c` / `src/do.c` | `js/cmd.js`, `js/do.js` | partial | Movement/search/apply/kick/wait and selected UI/item commands; Ctrl-D → `dokick` (D-0031); **`.` → `donull`** (D-0033); omit `cmd_safety_prevention`, `rest_on_space` |
| `src/dokick.c` | `js/dokick.js` | partial | `dokick` + `kick_dumb` empty-space/open-door (D-0031); sets `game.kickedloc` (D-0032); wall `kick_ouch` rolls; omit `kick_monster`/`kick_object`/closed-door Whammm/SDOOR-SCORR open/furniture/`martial`/`wake_nearby`/`u_wipe_engr`/`losehp`/`set_wounded_legs` bodies |
| `src/apply.c` / `src/lock.c` | `js/apply.js`, `js/lock.js` | partial | `doapply` + `pick_lock` (D-0021); exported `getdir` for kick/apply; getobj missing-letter `continue`+`flush_topl_more` (D-0025); omit sack/other tools, real door occupation, `feel_location` mapseen gating, container-at-feet |
| `src/display.c` `newsym` / map | `js/display.js` | partial | Floor `vobj_at` + class symbols + CORPSE `mon_color` (D-0022); SDOOR/SCORR terrain; omit traps/engravings/`wall_angle`/hallucination/`see_objects` |
| `src/invent.c` `look_here` / `dfeature_at` | `js/invent.js`, `js/mklev.js` | partial | Stairs via `stairs_description` + Dlvl1 `u_traversed` (D-0026); doors/fountain/sink stubs; Blind feel, engraving, multi-object menu, `doname_with_price` deferred |
| `src/pline.c` / tty message behavior | `js/display.js`, `js/input.js` | partial | `--More--` works for green paths + getobj re-prompt (D-0025); full message/window policy incomplete |
| `src/invent.c` | `js/invent.js` | partial | Corner NHW_MENU invent (D-0024); disco inv_order + `*`/encounter; fullscreen invent path deferred |
| `src/objnam.c` | `js/objnam.js` | partial | doname empty/wield/swapwep/potion/implicit-uncursed (D-0024); CORPSE `corpsenm` (D-0019); full erosion/artifact/Japanese deferred |
| `src/eat.c` | `js/eat.js` | partial | Cookie/reject subset; getobj still single-shot (no missing-letter `continue`); ordinary eating/nutrition incomplete |
| `src/dothrow.c`, `src/zap.c:bhit` | `js/dothrow.js` | partial | Dart split/flight/landing; `throw_ok` SUGGEST coins+weapons + getobj loop (D-0025); **`throw_gold` body absent**; combat/object interactions incomplete |
| `src/mon.c`, `src/monmove.c` | `js/mon.js`, `js/monmove.js` | partial | Early ordinary movement; pet `postmov`→`mintrap` (D-0018); mfndpos `ALLOW_TRAPS` (D-0019); `OPENDOOR` gated on `nohands`/`verysmall` (D-0020); **`m_avoid_kicked_loc`** in `mon.js` (D-0032; not yet wired into hostile `m_move`); non-pet postmov / `mon_knows_traps` / `bad_rock` squeeze / Sokoban push-avoid body deferred |
| `src/dog.c`, `src/dogmove.c` (+ `steal.c` relobj) | `js/dog.js`, `js/dogmove.js` | partial | Starting-pet subset; CORPSE age→POISON + `cursed_object_at` in `dog_goal` (D-0015); `dog_move` uncursedcnt/`cursemsg` pline (D-0017/D-0019); `m_cansee` in `find_targ` (D-0018); `dog_invent` `mpickobj`+drop RNG + tseen `rn2(40)` (D-0019); `splitobj` when `carryamt != quan` (D-0028); **pet `relobj`/`mdrop_obj`** (D-0029); **`in_masters_sight = couldsee`** (D-0030); **`m_avoid_kicked_loc`** (D-0032); omit food `newdogpos` eat, gettrack/FARAWAY when `!in_masters_sight`, `flooreffects`/`stackobj` merge, vault-guard gold, worn/saddle/shop extrinsics; **`mtrack` skip uses inner `continue` (should be candidate skip / C `goto nxti`)**; seed1500 RNG complete (D-0021); seed0060 next @ 3105 |
| `src/uhitm.c`, `src/mhitm.c` | `js/uhitm.js`, `js/mhitm.js` | partial | Narrow pet combat paths; general combat absent |
| `src/teleport.c` | `js/teleport.js` | partial | Placement helpers, not complete teleport system |

Production comments in several of these files still describe behavior as
"enough for seedXXXX" or "not needed for seedXXXX." Treat those as explicit
evidence of `partial`, and generalize them from C when touching the function.

## Known constitutional debt

These are not protected merely because the two green sessions exercise them:

| JS area | Debt to replace from C |
|---|---|
| `js/jsmain.js` capture hook | Detects Count/`--More--` text and repairs cursor at capture time; cursor semantics belong in input/display code |
| `js/display.js` message paths | Contains scenario-derived cursor/layout special cases rather than complete window/message policy |
| `js/eat.js` | Allowed-letter formatting, menu fallback, and eating are narrow subsets |
| `js/invent.js` | Corner invent + disco `*`/encounter + ^X wield subset (D-0024); fullscreen invent and full enlightenment deferred |
| `js/u_init.js` / `js/roles.js` | Rogue/Tourist + human/orc(/elf/dwarf/gnome) race kits (D-0027); other roles throw; `oc_armcat`/`oc_skill` not in objects extractor (suit/dagger filters are named-otyp stand-ins); skills tables deferred |
| `js/allmain.js` | Welcome/HP/align no longer Tourist-literal; tutorial, hunger, sound, and attribute checks still have deferred branches |
| `js/mon.js` / `js/monmove.js` / `js/dogmove.js` | Monster flags, movement predicates, targeting, carrying, and combat have named stubs/defaults |
| `js/mklev.js` / `js/mkobj.js` / `js/makemon.js` | Many terrain/object/monster-type branches remain scenario-limited |

When editing one of these areas, replace the narrow behavior with its C
semantic unit and run a non-target cohort. Do not preserve a trace-derived path
solely to keep a Tourist seed green.

## Major absent or scaffolded systems

This is a planning list, not an exhaustive C file inventory:

- complete role/race/gender/alignment initialization and skills;
- hero-versus-monster and monster-versus-hero combat;
- traps, engraving, prayer, riding, chat, travel;
- kicking beyond empty-space/`kick_dumb` (monsters, objects, doors, furniture);
- apply beyond lock-pick no-door (containers, other tools);
- potions, scrolls, wands, spells, equipment, artifacts;
- shops/priests/vault guards and billing;
- level transitions, branches, quests, and special levels;
- pure-JS Lua 5.4 runtime plus `nh.*` bindings;
- save/restore, bones, record/topten through frozen storage;
- properties, timeout/status effects, polymorph, death/lifesaving;
- hallucination and display RNG;
- animation-frame parity.

## Scaffolding retirement

`js/fastforward.js` contains only empty exported hooks. No RNG replay entries
remain. Next cleanup is to remove callers/imports and then delete the empty
module when that can be done without changing behavior.

Live scores, green anchors, objectives, and commands belong only in
`PROGRESS.md`.
