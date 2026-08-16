# Review 37 — 87b4b7cb — hero `trapeffect_pit` / `trapeffect_hole` under `dotrap` `VIASITTING` (D-1076)

## Metadata
- Full / short hash: `87b4b7cb8af30fb88654d1d895ea29b0ddbd5268` / `87b4b7cb`
- Parent: `f21410e1` (D-1075 ACCEPT this review iter; Must-fix empty; popped Open hero pit/hole). JS-touching since last `reviews/loop-unattended/` file (`35-962e07a9-…`): `f21410e1` (review **36**) and **this SHA**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 11:53:22 +0200
- D-id: **D-1076**
- Stats: 12 files, +353 / −73 — `js/trap.js` +284 / −28 (header + `wearing_iron_shoes` unstub + `check_in_air` youprop + hero `trapeffect_pit` + thin `steedintrap_pit` + hole `Can_fall_thru`); `js/sit.js` +2 / −1 (comment). Live JS is those trap.c bodies, not a new helper file.
- Claims to close: Open queue `trap.c` hero pit/hole bodies under `dotrap` `VIASITTING` (named from D-1039 / reviews **34**/**35**). Stamped **Addressed:** D-1076 on the archive row **without** the short hash (chicken-egg). This review commit fills `87b4b7cb`. Also fills D-1075’s archive hash (already `f21410e1` from this SHA).
- JS / map: `trap.js` `trapeffect_pit` / `trapeffect_hole` / `check_in_air` / `wearing_iron_shoes`. `c-js-map/data.md` names D-1076 and still omits Punished `ballfall`, Sokoban air-currents, dotrap conj/adj/clinger escape OR, `impossible()` on bad-level hole, steedintrap non-pit types.
- Prior reviews this SHA claims to close: **35** named omit 3 and **34** named omit 2 (hero pit/hole Open). Review **36** names this as the follow-up. `reviews/loop-2026-08-15/` has no open pit-body Must-fix.

## Intent vs deliverable

Git subject promises: “Match C dotrap so sitting on a pit or hole runs the hero trap bodies instead of no-op.” Body is empty beyond Co-authored-by. D-log: JS `trapeffect_pit` returned immediately for `youmonst`. C `trap.c` runs feeltrap, fall/sit verbs, `set_utrap(rn1(6,2), TT_PIT)`, spike/`poisoned`/`losehp`, `selftouch`, `exercise`. JS `trapeffect_hole` always `fall_through` and skipped C’s `!Can_fall_thru` seetrap skip.

The queue line was those hero bodies plus the `check_in_air` / `wearing_iron_shoes` callees the pit skip and spike arm need — not Sokoban air-currents, not Punished `ballfall`, not `is_lava` DRAWBRIDGE_UP.

The diff **does** that envelope: hero pit is no longer `return Trap_Effect_Finished`. `check_in_air` Lev/Fly is `youprop.h` `(H||E)&&!B` / steed flyer, not sticky `u.Levitation` (the previous helper was sticky — this SHA fixes it). `wearing_iron_shoes` was `return false` (`which_armor` deferred); now hero `u.uarmf` + mon `which_armor(W_ARMF)` + `oc_material==IRON` (11). Hole hero: `!Can_fall_thru` → `seetrap` skip, else `fall_through(TRUE, trflags & TOOKPLUNGE)` (D-0986 already). Thin `steedintrap` PIT/SPIKED only.

It does **not** port Punished `unplacebc`/`ballfall`/`placebc`. Named. It does **not** port dotrap Sokoban “Air currents pull you down” (still proceeds into the effect in C; JS still takes the ordinary `!forcetrap` escape arm on Sokoban). Named. It does **not** port `is_lava` DRAWBRIDGE_UP+`DB_LAVA`. Correct next Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `trapeffect_pit` hero arm | C body, **new** | `trap.c:1835–1965`; was youmonst early-return |
| `trapeffect_pit` monster arm | C body, **kept** | D-0150; `wormno>5` still not `count_wsegs` |
| `trapeffect_hole` hero arm | C body, **retouched** | `trap.c:2018–2025`; adds `Can_fall_thru` skip |
| `check_in_air` | **clone** of `trap.c:1086–1094` | Lev/Fly now youprop, not sticky |
| `hero_Levitation` / `hero_Flying` | **clone** of `youprop.h:240` / `:253–255` | Flying includes steed `is_flyer` |
| `wearing_iron_shoes` | **clone** of `trap.c:1098–1102` | was no-op `return false` |
| `steedintrap_pit` | **clone** of `trap.c:3102–3168` PIT/SPIKED only | other types named omit |
| `adj_nonconjoined_pit` | **clone** of `trap.c:6604–6614` | pre-existing; used by new hero arm |
| `conjoined_pits` | imported C callee | pre-existing export |
| `set_utrap` / `feeltrap` / `seetrap` / `selftouch` / `thitm` | imported C callees | `float_vs_flight` in `set_utrap` still named; **no-op for `TT_PIT`** (`stuck_in_floor` excludes pit) |
| `losehp` / `maybe_half_phys` / `poisoned` / `exercise` | imported C callees | `hack.js` / `attrib.js` |
| `fall_through` / `Can_fall_thru` | imported C callees | D-0986 / `const.js`; hole skip is new |
| `Yname2_pit` / `u_locomotion_pit` / `Is_qlocate_lev` | **clones** | `objnam.c` `Yname2`; `hack.c` `u_locomotion` poly named; `quest.h` `Is_qlocate` |
| Punished `ballfall` | C later arm, **named omit** | inside the hero body |
| Sokoban air-currents / dotrap escape conj/adj/clinger | C `dotrap`, **named omit** | pre-existing; not this Open line |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `FORCETRAP` in `trap.js` is the C `hack.h` flag, not a trace FORCE. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/trap.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. `rn1(6,2)` / `rnd(10|6|4|3)` / `rn2(6)` / `rn2(5)` are C’s dice, not a seed-shaped HP table. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### `check_in_air` — C macros, `VIASITTING` counts as plunged for Flying only

C `trap.c:1086–1094`:

```
    plunged = (trflags & (TOOKPLUNGE | VIASITTING)) != 0;
    return ((trflags & HURTLING) != 0
            || (is_you ? Levitation : is_floater(mtmp->data))
            || ((is_you ? Flying : is_flyer(mtmp->data)) && !plunged));
```

Previous JS used sticky `u.Levitation` / `u.Flying`. New `hero_Levitation` is `(HLevitation \|\| ELevitation) && !BLevitation` (`youprop.h:240`). `hero_Flying` is `(H\|\|E\|\| steed is_flyer) && !B` (`youprop.h:253–255`). Worn levitation boots / flying without sticky now skip floor traps like C. `VIASITTING` sets plunged → Flying does **not** skip `dotrap`; Levitation still skips. Sitting while flying **reaches** `trapeffect_pit`. Sitting while levitating (dungeon) never reaches `dotrap` anyway (`can_reach_floor` tumble, D-1070); air/water levitation sits then `dotrap` skips. Match.

This is a **shared** `dotrap` / `mintrap` helper, not sit-only. Cohort included seed0014/4500/0360/2200. Not a public FAIL peel.

### `dotrap` already_seen escape — pre-existing; sit on a **seen** pit still 1/5 `rn2(5)`

C `dotrap` (`trap.c:3025–3044`) can `return` before `trapeffect_selector` when `already_seen && !Fumbling && !undestroyable && ttype!=ANTI_MAGIC && !forcebungle && !plunged && !conj && !adj && (!rn2(5) \|\| clinger-on-pit)`. JS still only `already_seen && !u.Fumbling && ttype!==ANTI_MAGIC && !forcebungle && !rn2(5)`. `VIASITTING` is **not** `TOOKPLUNGE`, so C `!plunged` is true for sitting. Teetering picnic-skip requires `tseen`, so `#sit` on a seen precipice can print `"You sit down."` then `"You escape a pit."` **in C** (4/5 fall through to the new body). JS the same 1/5 on the ordinary commons path. Clinger-always-escape and `!conj_pit` are still named dotrap omits. Not introduced. Sitting as a clinger who fails the 1/5 still hits the new clinger arm inside `trapeffect_pit` (`!plunged`) and does not `set_utrap`. Outcome (no fall) matches; message may differ (`You see … pit below you` vs `You escape`). Named, not Must-fix against the pit **body**.

### Hero `trapeffect_pit` — C order, RNG call-for-call

C `trap.c:1835–1965` (hero). JS `trap.js:1402–1537`.

1. `plunged = TOOKPLUNGE` only (not `VIASITTING`). `viasitting` separate. `conj_pit` / `adj_pit` / `already_known = trap->tseen` **before** `feeltrap`. Match.
2. Sokoban skip of the Lev/Fly early-return. Else `Levitation \|\| (Flying && !plunged && !viasitting)` → `Trap_Effect_Finished` **without** `feeltrap`. Sitting: Flying does not skip; Levitation would, but `dotrap` already skipped. Match.
3. `feeltrap` then clinger `!Sokoban && is_clinger && !plunged`: seen → C `You_see("%s %spit below you.", a_your, spiked?)`; unseen → `"%s pit %sopens up under you!"` + `"You don't fall in!"`. JS hardcodes `"You see …"` (C `You_see` is `"You see "` / Blind `"You sense "` / Unaware `"You dream that you see "` — `pline.c:455–468`). Blind clinger sit is exotic. Named message-prefix omit, not a stub body.
4. `!Sokoban` verbs: steed `RECURSIVETRAP` “and X fall” / else “lead poor X”; `iflags.menu_requested && already_known` → `You carefully ${u_locomotion("lower yourself")}` + `deliberate`; `conj_pit` adjacent; `adj_pit` stumble + `!rn2(5)` `" between the pits"`; else `verbbuf = !plunged ? "fall" : (Flying ? "dive" : "plunge")` then `You("%s into %s pit!", verbbuf, a_your)`. Sitting is not already-`utrap`, so `adj_pit` is false (`adj_nonconjoined_pit` needs `u.utrap && TT_PIT`). `dosit` returns early if `usteed`, so the steed verbs are for **walk-in** / recursive, not `#sit`. Default sitting: `"You fall into a pit!"` after `"You sit down."` — that is C, not a JS verb bug. `u_locomotion_pit` uses youprop Lev/Fly (better than `hack.js` sticky `u_locomotion`); poly `locomotion()` named.
5. Ranger qlocate wumpus line (`Role_if(PM_RANGER) && !madeby_u && !once && In_quest && Is_qlocate`) sets `trap.once=1`. Else pit viper/fiend `"How pitiful.  Isn't that the pits?"` on **hero** `umonnum`. No RNG. `Is_qlocate_lev` is `on_level` vs `qlocate_level`. Match.
6. Spikes: `relevant_spikes = ttyp==SPIKED_PIT`. Iron shoes → `Yname2(uarmf) protects…` and clear the flag. Else land/step `"on a set of sharp iron spikes"`. `wearing_iron_shoes`: C `which_armor(mtmp, W_ARMF)` + `objects[].oc_material==IRON` (`objclass.h` `IRON=11`, `W_ARMF=0x20`). Hero special-cases `u.uarmf` because C `worn.c:1006–1021` maps youmonst `W_ARMF` to `uarmf`; trap.js `which_armor` is minvent-only (same as `worn.js`). Was a **no-op stub**. Now a C clone. `Yname2_pit` = `upstart(yname)` (`objnam.c`). Match.
7. `set_utrap((unsigned) rn1(6, 2), TT_PIT)` **before** `steedintrap`. `rn1(x,y) = rn2(x)+y` → 2..7. JS `rn1(6,2)` then `set_utrap`. C `set_utrap` calls `float_vs_flight`; JS names that omit. C `stuck_in_floor = utrap && utraptype != TT_PIT` (`polyself.c:133`), so a **pit** does not block Lev/Fly. The omit is a no-op at this site.
8. `if (!steedintrap(trap, NULL))` hero damage / `selftouch` / vision / `exercise(STR,FALSE)` / `exercise(DEX,FALSE)`. No steed (`dosit` and empty `usteed`): C returns `Trap_Effect_Finished=0`; JS the same; hero takes the fall. Steed live: return 1; skip hero HP. Steed dead: `Trap_Killed_Mon=2`; `!2` is false; skip hero HP. Match.
9. Spike HP: `Maybe_Half_Phys(rnd(conj?4:adj?6:10))` then `!rn2(6)` `poisoned("spikes", A_STR, …, umortality rose ? 0 : 8, FALSE)`. Non-spike: skip if `conj \|\| deliberate \|\| (plunged && (Flying \|\| clinger))`; else `Maybe_Half_Phys(rnd(adj?3:6))`. Sitting: conj/adj/deliberate/plunged false → `rnd(10)` spikes or `rnd(6)` pit. `maybe_half_phys` is C `((dmg)+1)/2` when `Half_physical_damage` (`hack.h:1236–1237`); JS uses H/E flats (pre-existing dart-path helper). `losehp` then `finish_hero_losehp` (C `done(DIED)` noreturn unless lifesave) **before** `rn2(6)` poison. Match.
10. Punished `!carried(uball)` `unplacebc`/`ballfall`/`placebc` skipped. Named. `selftouch("Falling, you")` unless `conj_pit`. `vision_full_recalc=1`. Two `exercise` calls. Match aside from ballfall.

`feeltrap` (`trap.c` marks `tseen` + `newsym(tx,ty)`): JS `trap.js:1632–1636` is that. `already_known` is captured **before** it, so an unseen pit still takes the “opens up under you” clinger arm / fall verbs, then becomes seen. C the same. `seetrap` on the hole skip path is C (`trap.c:2020`); successful `fall_through(td=TRUE)` feeltraps inside D-0986, not a second `seetrap` here.

Sokoban: C prints air-currents then **falls into** the pit body (`trap.c:3015–3024`, not a `return`). JS still has no air-currents line and still runs the `!forcetrap` already_seen `rn2(5)` escape on Sokoban, which C does not. Named dotrap omit. Ordinary Dungeons of Doom `#sit` is not Sokoban. Do not “fix” it as an `is_lava` peel.

`maybe_half_phys` / `losehp`: C `Maybe_Half_Phys(rnd(…))` always consumes `rnd` then halves when `Half_physical_damage` (`H||E` uprops). JS `maybe_half_phys(rnd(…))` same dice, H/E flats (pre-existing dart helper; confer of `HALF_PHDAM` onto flats is not this SHA). Fatal `losehp` sets `_losehp_needs_done`; `finish_hero_losehp` awaits `done(DIED)` and returns before `rn2(6)` poison — C `done` is noreturn unless life-save (`umortality > oldumort` then poison `fatal=0`). Match.

Sitting-into-pit RNG (no steed, not Sokoban, not clinger, not iron shoes, not conj/adj):

| Step | C | JS |
|------|---|-----|
| dotrap escape (seen only) | `rn2(5)` | **`rn2(5)`** |
| debris `adj_pit` | not this path | not this path |
| `set_utrap` | `rn1(6,2)` | **`rn1(6,2)`** |
| pit HP | `rnd(6)` | **`rnd(6)`** |
| spiked HP | `rnd(10)` then `rn2(6)` | **same** |
| poison | inside `poisoned` | imported callee |

### `steedintrap_pit` — clone matching C at this call site

C `trap.c:3145–3150` PIT/SPIKED: `DEADMONSTER(steed) \|\| thitm(0, steed, NULL, rnd(tt==PIT?6:10), FALSE)`, `steedhit=TRUE`, then dismount `DISMOUNT_POLY=4` if killed, else return 1. JS only this arm; `thitm` is the existing trap.c clone; `dismount_steed` dynamic. Other `steedintrap` types remain named. `#sit` never has a steed (`dosit` early return). The clone is for walk-in / recursive pit, which this SHA now shares with the hero body. Classify: **clone of the C PIT/SPIKED arm**, not a no-op.

### `trapeffect_hole` hero — `Can_fall_thru` then `fall_through`

C `trap.c:2018–2025`: `!Can_fall_thru(&u.uz)` → `seetrap` + `impossible(...)` + return; else `fall_through(TRUE, trflags & TOOKPLUNGE)`. Previous JS always `fall_through`. New JS `seetrap` + return (impossible named) else `fall_through(true, trflags & TOOKPLUNGE)`. `Can_fall_thru` is `Can_dig_down \|\| Is_stronghold` (`const.js`). Sitting: `TOOKPLUNGE` off, so `fall_through` may still `"don't fall in."` for Flying/clinger (`trap.c` hole has no Flying skip of its own — unlike pit). That is C. `fall_through` still reads sticky `u.Levitation` (D-0986); `#sit` levitation is already filtered by `check_in_air` youprop, so the sticky is dead on this sit path. Walking onto a hole in lev-boots now skips in `dotrap` via the new youprop `check_in_air` (C). Named sticky remains inside `fall_through` for other callers.

### Monster pit/hole — rewritten with the hero arm; pre-existing `wormno>5`

Old D-0150 monster pit used `mtmp.wormno && (mtmp.wormno|0)>5`. C is `mtmp->wormno && count_wsegs(mtmp)>5` (`trap.c:1975`, `worm.c`). `count_wsegs` is **already imported** and used correctly in the web arm (`trap.js:3819`). This SHA copies the old test into the rewritten function. Hero `#sit` never hits it. Monster pit-viper “How pitiful” (`trap.c:1995–1997`) was already omitted and stays omitted. **Pre-existing D-0150 clone**, not a new hero-path miss. Do not steal the `is_lava` iter for it.

## Hallucinations / overclaim

“Match C dotrap so sitting on a pit or hole runs the hero trap bodies instead of no-op” is **true for the youmonst pit body (feeltrap, verbs, `rn1(6,2)`, spikes/`poisoned`, `selftouch`, `exercise`) and for the hole `Can_fall_thru` skip**. It is **not** true that Punished `ballfall` runs, that Sokoban air-currents print, that `You_see` handles Blind, or that `dotrap`’s full already_seen escape matches C (clinger OR / conj / adj still named).

This is **not** “Match C dispatch, callee is a stub.” The previous hero pit **was** a stub (`return Trap_Effect_Finished`). This SHA replaces it with the C body. `wearing_iron_shoes` **was** a stub (`return false`) and is now the C predicate. `check_in_air` **was** sticky Lev/Fly and is now `youprop.h`. `steedintrap_pit` is a PIT/SPIKED clone of the real `steedintrap` arm. `fall_through` is the existing D-0986 callee, not a new no-op.

Stamping the Open item **Addressed:** D-1076 is fair for the hero bodies. Fill hash `87b4b7cb` in this commit.

## Density (§2b)

One Open cluster: C `trapeffect_pit` hero + sibling `trapeffect_hole` hero + the `check_in_air` / `wearing_iron_shoes` / PIT `steedintrap` callees that body needs. Review 35 named this, not `is_lava` / Punished ball / Sokoban air. ~280 executable lines in `trap.js` — high end of 50–300, not “finish `dotrap`.” `check_in_air` retouch is the same family (Lev skip must be youprop or sitting-while-flying / walking-in-lev-boots is wrong). Two JS files (`sit.js` comment only). Not `lay_an_egg` in the same commit (previous SHA).

## Verification

Journal: private canary (PIT `VIASITTING` `TT_PIT` + `rn1(6,2)` + losehp; `HLevitation` skip); green+strict seed8000/0900; cohort 12/12 (1500/1800/0060/0102/0700/0017/0106/0107/4500/0014/0360/2200) + strict 0014/4500/0360/2200. Path **public-unhit** on public `#sit` over a pit. Green+cohort is regression cover for the shared `check_in_air` retouch (walk-into-pit lev/fly), not a public precipice-sit proof. Cadence **#1365** ran before D-1075/D-1076. Next @**#1370**.

C read of `trap.c:1086–1102`/`1825–2025`/`2996–3059`/`3102–3168`/`6604–6614`, `youprop.h:240`/`253–255`, `hack.h:1236–1237`/`352`, `pline.c:455–468`, `worn.c:1006–1021`, `objclass.h` IRON=11, `polyself.c:131–154`, `trap.h:98–101`; JS `trap.js:1024–1030`/`1230–1247`/`1297–1334`/`1373–1574`/`1876–1886`/`2878–2930`/`3002–3010`, hunk grepped FORCE/fs/seed.

## Actionable C-wrongs

None that Must-fix this next iter. The hero pit/hole bodies, youprop `check_in_air`, and unstubbed `wearing_iron_shoes` match C at the `#sit` / walk-in locus this SHA claimed.

Named omits / do-nots (map / Open, not Must-fix):

1. **`hack.c` `is_lava` DRAWBRIDGE_UP + `DB_LAVA`** — live Open. Do not pull Punished `ballfall` / Sokoban air-currents / `count_wsegs` this next iter.
2. Punished `unplacebc`/`ballfall`/`placebc` inside hero pit (`trap.c:1955–1958`). Named in the D-log.
3. `dotrap` Sokoban air-currents; already_seen escape `!plunged && !conj && !adj && (rn2(5) \|\| clinger)`; `undestroyable_trap`. Pre-existing.
4. `You_see` Blind/Unaware prefix on clinger already_known. `fall_through` sticky `u.Levitation` (dead on this sit path). Monster `count_wsegs` vs `wormno>5` (D-0150). `impossible()` on bad-level hole. steedintrap non-pit types.

Do not restore hero `trapeffect_pit` early-return. Do not skip `Can_fall_thru` on hole. Do not restore sticky `u.Levitation` in `check_in_air`. Do not restore `wearing_iron_shoes` `return false`. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **8 / 10**
- One sentence: sitting (and walking) into a pit/hole now runs C’s hero `trapeffect_pit` / `Can_fall_thru` hole skip with youprop Lev/Fly and real iron shoes, while Punished `ballfall` and dotrap Sokoban/escape extras stay named.
- Must-fix stays empty; next port pops Open `hack.c` `is_lava` DRAWBRIDGE_UP + `DB_LAVA`.
