# Review 323 — c10f4246 — mkobj.c mksobj_migr_to_species / mkmaze.c stolen_booty (D-1363)

## Metadata
- Full / short hash: `c10f42467b23389922acc25749e19cb9abd3b732` / `c10f4246`
- Parent: `46aa515d` (reviews **321–322** + cadence **#1730**). This file audits **this SHA only** (first of four `js/` commits since review **322**). Archive **Addressed:** D-1363 `c10f4246` already has the short hash (filled by D-1364).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 13:16:19 +0200
- D-id: **D-1363**
- Stats: 13 files, +349 / −41 — `js/mklev.js` +226 (stolen_booty cluster); `js/mkobj.js` +17 (`mksobj_migr_to_species`); `js/do_name.js` +18 (`new_oname`); `js/dokick.js` comments only.
- Claims to close: Open `dokick.c` `obj_delivery` stolen_booty / `mksobj_migr_to_species` (named from D-1177 / review **322**). Not no_kick. `reviews/loop-2026-08-15/` has no unpaid orctown Must-fix.
- JS / map: `mkobj.js` `mksobj_migr_to_species`; `mklev.js` `stolen_booty` / `migr_booty_item` / `shiny_orc_stuff` / `migrate_orc`; `do_name.js` `new_oname`; `c-js-map/data.md` + `turns.md`. minetn-1 loader / dog leftovers / `add_to_minv` merge still named.
- Prior reviews this SHA claims to close: **322** listed `obj_delivery` stolen_booty as the next Open after no_kick. Consume path (`obj_delivery` skip + `deliver_obj_to_mon`) was already live; this SHA is the producer.

## Intent vs deliverable

Git subject promises: “Match C mkobj.c mksobj_migr_to_species / mkmaze.c stolen_booty so orctown loot is queued as MIGR_TO_SPECIES cargo, instead of leaving obj_delivery's skip without a producer.”

C `mksobj_migr_to_species` (`mkobj.c:253–265`): `mksobj` → `add_to_migration` → `owornmask = MIGR_TO_SPECIES` → `migr_species = mflags2` (union overlay of `corpsenm`). C `stolen_booty` (`mkmaze.c:799–889`): `rndorcname`; candles/keys/gloves/food/sword via `migr_booty_item`; captain `MM_NONAME` + `christen_monst(upstart(gang))` + `shiny_orc_stuff` + `migrate_orc(..., ORC_LEADER)`; fmon orcs `christen_orc`; extra orcs `rn2(10)+5`. Caller `fixup_special` `:694–695` (`u.uz.dnum == mines_dnum && gr.ransacked`).

Old JS: `obj_delivery` skipped `MIGR_TO_SPECIES`; `check_ransacked` already set `game.ransacked` for proto `minetn-1`; nothing queued cargo.

The diff **does** add the producer, overlay both JS fields, gang-oname booty, captain leftovers, extra orcs `MIGR_RANDOM`, and the `fixup_special` call. It does **not** load minetn-1. Named. `js/dokick.js` is comments only — skip logic unchanged.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mksobj_migr_to_species` | C `:253–265`, **wired export** | writes `migr_species` and `corpsenm` |
| `add_to_migration` | C `mkobj.c`, **imported live** | `OBJ_MIGRATING` prepend |
| `stolen_booty` | C `:799–889`, **wired export** | orctown producer |
| `migr_booty_item` | C `:779–796`, **wired** | `M2_ORC >>> 0` + `new_oname` |
| `migrate_orc` | C `:717–745`, **wired** | leader `rn2(40)` / else `rn2` depth |
| `shiny_orc_stuff` | C `:748–777`, **wired** | gold `rnd` / gem / shiny ring |
| `shiny_obj` | C `objnam.c:3532–3535`, **thin clone** | live `rnd_otyp_by_namedesc` |
| `new_oname` | C `do_name.c:61–77`, **wired export** | JS empty string then strcpy |
| `rndorcname` / `christen_orc` | C `do_name.c`, **imported live** | D-1193 |
| `fruitadd_orc` | C `options.c:8257–8286` else, **clone** | mklev↔options cycle |
| `dunlevs_in_dungeon_maz` / `ledger_no_maz` | C `dungeon.c:1332–1336` / `:1376–1378`, **clones** | ledger is `dlevel+ledger_start` |
| `upstart_maz` | C `hacklib.c`, **clone** | booty stays lowercase |
| `dealloc_obj` | C `mkobj.c`, **no-op stub** | pre-existing `mklev.js:1180`; ROCK GEM |
| `add_to_minv` | C, **imported live** | merge named |
| `migrate_to_level` / `get_level` | C, **imported live** | `teleport.js` / `dungeon.js` |
| minetn-1 loader | C `load_special`, **named omit** | `check_ransacked` already flags |
| `obj_delivery` skip | C, **pre-existing live** | comments only this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `stolen_booty` candle/key/glove/food/sword rolls; `migrate_orc` `rn2(40)` / depth `rn2`; `shiny_orc_stuff` `rn2(1000)` / `rnd` / `rn2(8)`; food `rn2(3)`; fmon `rn2(10)`; extra orcs `rn2(10)+5`. Public-unhit until minetn-1 loads.

## C ↔ JS fidelity

`mksobj_migr_to_species` matches `:260–264` call-for-call. C overlay is `obj.h:164` `#define migr_species corpsenm`; JS writes both so `deliver_obj_to_mon` can read `migr_species` without a union. `MIGR_TO_SPECIES` is 4096 (`dungeon.h:162`). `obj_delivery` still `continue`s that bit — producer no longer leaves the skip empty.

`stolen_booty` order matches `:818–888`. Booty `oname` is lowercase `rndorcname` **before** `upstart`; JS keeps `gang` immutable and passes `gangCap` only to monsters — equivalent to C mutating the buffer at the captain. Food filter matches `:832–840` (no lembas; `oc_prob!=0` except C-/K-ration; no CORPSE/EGG/TIN). Gloves `rn1(GAUNTLETS_OF_DEXTERITY-LEATHER_GLOVES+1, LEATHER_GLOVES)`. Captain `MM_NONAME` then `christen_monst`. Extra orcs **after** the fmon christen loop so they stay unnamed until delivery — C comment, JS same.

`migrate_orc` leader: `nlev = max_depth`; `!rn2(40)` then `--`; `migflags |= MIGR_LEFTOVERS`. Else `rn2((max-cur)+1)+cur`, bump if equal, clamp. `get_level` then `migrate_to_level(..., MIGR_RANDOM, null)`. `ledger_no` clone is `dlevel + ledger_start` (`dungeon.c:1376–1378`), not minus one. `depth_of_level` is live `hacklib.js` `depth`.

`fruitadd_orc` is the **else** branch (`!user_specified`): sanitize control chars, `made_fruit=true`, walk `ffruit` for fname/highest, overflow `rnd(127)`, else prepend. Matches `options.c:8257–8286` + `fruit_from_name` equality. User-specified doset path stays in `options.js`. Named.

`dealloc_obj` in `shiny_orc_stuff` hits the pre-existing mklev stub. C frees an unplaced ROCK. JS leaves an unreferenced `OBJ_FREE` for GC. Not a second inventory object. Classify **no-op**, not a silent minvent C-wrong.

Hallucination check: “Match C `stolen_booty`” while **minetn-1 never loads** is an overclaim on **public orctown**. The **producer and `fixup_special` caller** are live (`mksobj_migr_to_species` is not a stub that still leaves `migrating_objs` empty once `ransacked` is true). Do **not** stamp “Match C minetn-1.” Do **not** stamp “Match C `add_to_minv` merge.” Do **not** stamp “Match C `mon_arrive` leftovers.”

## Hallucinations / overclaim

Subject says orctown loot is queued as `MIGR_TO_SPECIES` cargo instead of a skip without a producer. **True once `stolen_booty` runs.** `check_ransacked` already sets the flag for proto `minetn-1`; `load_special_proto` still has no minetn-1 arm, so `makemaz` returns empty and `fixup_special` never sees that proto in public. D-log “Not this iter” is honest. Stamping **Addressed:** D-1363 for the producer is fair. Do **not** treat fortress PASS as gang-named candles on a later mines level.

## Density

One C family: `mksobj_migr_to_species` plus the `stolen_booty` caller/callees C already uses from `fixup_special`. ~240 lines of JS. Playbook §2b caller/callee cluster. Did not glue MAGIC_MISSILE (next Open). Extra clones (`fruitadd_orc`, ledger/dunlevs) stay inside that envelope. Right size. Consecutive thin zap peels after this SHA are a later-review density note, not this commit’s glue.

## Branch-by-branch confirm

1. `mksobj` then migrate then `owornmask=4096` then overlay. Match `:260–264`.
2. `obj_delivery` still skips species cargo. Match consume XOR. Producer fills the list.
3. `deliver_obj_to_mon` can extract `M2_ORC` overlay. Pre-existing; now has objects.
4. Candles `rn2(4)?TALLOW:WAX`, `rnd(4)` count. Match `:820–822`.
5. Keys `rnd(3)`. Match `:823–825`.
6. One glove `rn1`. Match `:826–827`.
7. Food `rnd(10)` attempts; lembas/corpse/egg/tin dropped; C-/K-ration kept. Match `:828–841`.
8. Sword `rn2(2)?LONG:SABER`. Match `:843`.
9. Captain named capitalized gang; `mpeaceful=0`; `set_malign`; shiny; leader migrate. Match `:845–851`.
10. fmon orcs: dead skip; `is_orc && !has_mgivenname && rn2(10)`; skip PM_ORC_CAPTAIN. Match `:854–870`.
11. Extra orcs `rn2(10)+5`, `PM_ORC..PM_ORC_SHAMAN`, shiny, `migrate_orc(0)`. Match `:877–887`.
12. `game.ransacked=0` after. Match `:888`.
13. Leader `!rn2(40)` one level up; `MIGR_LEFTOVERS`. Match `:730–734`.
14. ROCK gem: C `dealloc_obj`; JS stub+GC. No minvent ROCK.
15. minetn-1 proto: flag set, loader named. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `M2_ORC` is the live `monflag.h` bit, not a recorded mndx. Plain ESM. `fruitadd_orc` is in-process, not `fs`. Dynamic imports none this SHA.

## Verification

Journal: private canary **24**/24 (C/JS order; overlay; `OBJ_MIGRATING`; skip; extract; ransacked clear; captain leftovers; extra `MIGR_RANDOM`; leftover cargo otyp; Rule #2); green+strict seed8000/0900; focused seed0060; cohort **8**/8 + strict 1500/1800/0012/0004/0007/2200/0383 + seed0060. **Public-unhit** until minetn-1. This audit cadence: full `sessions` at HEAD `9a144895` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.29/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not orctown booty.

## Actionable C-wrongs

None for Must-fix. The producer matches `:253–265` and `:799–889` branch order and RNG. Overlay is the honest JS stand-in for C’s union. `dealloc_obj` stub does not leave a ROCK in minvent. minetn-1 / leftovers / merge are named omits of **other** functions.

Named omits (map / Open, not Must-fix):

1. minetn-1 / minetn-6/7 loader (`sp_lev.c` `load_special`)
2. dog.c `mon_arrive` `MIGR_LEFTOVERS` `DF_ALL`
3. `add_to_minv` merge (`makemon.js:1053`)
4. cleric/stronghold graveyard else-if in the same `fixup_special` chain
5. options.c user-specified `fruitadd`

Do not Must-fix “capitalize booty oname” (C `upstart` is after booty). Do not Must-fix “`obj_delivery` should deliver species cargo to the hero” (C skips it). Do not Must-fix “call `fruitadd` from `options.js`” (cycle; else-branch matches).

## Callers / RNG ledger

C: no RNG in `mksobj_migr_to_species` itself (`mksobj` init still rolls). `stolen_booty` burns the rolls above then `shiny_orc_stuff` / `migrate_orc`. JS same on those paths. Public fortress never enters `stolen_booty`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: orctown cargo is now queued through live `mksobj_migr_to_species`; public still waits on the minetn-1 loader.
- Must-fix stays empty for this SHA.
