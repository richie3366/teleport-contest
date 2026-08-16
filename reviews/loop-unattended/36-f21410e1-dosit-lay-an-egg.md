# Review 36 — f21410e1 — `dosit` `lay_an_egg` after `IS_THRONE` (D-1075)

## Metadata
- Full / short hash: `f21410e126a4f56df94b4738b68f52ec556893ef` / `f21410e1`
- Parent: `bc5e81c7` (review **35** ACCEPT of `962e07a9` D-1074; Must-fix empty; popped Open `lay_an_egg`). JS-touching since last `reviews/loop-unattended/` file (`35-962e07a9-…`, written in `bc5e81c7`): **this SHA** and `87b4b7cb` D-1076 (review **37**). Docs-only in the same window: none.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 11:35:45 +0200
- D-id: **D-1075**
- Stats: 12 files, +185 / −47 — `js/sit.js` +88 / −8 (header + local `egg_oc_nutrition` + `lay_an_egg` + `dosit` dispatch); `js/mon.js` +16 (`egg_type_from_parent`). Live JS is that pair, not a new helper file.
- Claims to close: Open queue `sit.c` `dosit` `lay_an_egg` at end of function. Stamped **Addressed:** D-1075 `f21410e1` on the archive row (hash present — filled by D-1076, not predicted here). This review also stamps review **35** named omit 1 (already `D-1075 f21410e1` from the fix SHA).
- JS / map: `sit.js` `lay_an_egg` / `dosit`; `mon.js` `egg_type_from_parent`. `c-js-map/data.md` names D-1075 and still omits `clone_mon` monster `split_mon`, wizard getlin, `shieldeff`, polyself `learn_egg_type(..., TRUE)`.
- Prior reviews this SHA claims to close: **35** ACCEPT named omit “ship `lay_an_egg` next; do not pull `clone_mon` / wizard getlin / `shieldeff`”. Review **34** named `lay_an_egg` as remaining Open. `reviews/loop-2026-08-15/` has no open egg Must-fix.

## Intent vs deliverable

Git subject promises: “Match C dosit so an oviparous hero sitting on ordinary floor lays or spawns an egg instead of the having-fun default.” Body is empty beyond Co-authored-by. D-log: JS oviparous `#sit` on ordinary floor took having-fun. C `sit.c` `dosit` `else if (lays_eggs) return lay_an_egg()`.

Review 35’s Open line was exactly that dispatch plus the `lay_an_egg` body (male / hunger / tetra / Sargasso `ECMD_OK`; spawn vs lay; `egg_type_from_parent` in `mon.js`), with those “do not”s.

The diff **does** that envelope: after `IS_THRONE` returns, `if (lays_eggs(youmonst.data)) return lay_an_egg()`. `lay_an_egg` is the C `else if` chain. `egg_type_from_parent` lives in `mon.js` (C `mon.c` home). `dropy` / `morehungry` are dynamic imports (do/eat cycles).

It does **not** port `clone_mon` monster `split_mon`, wizard getlin, or `shieldeff`. Named, and excluded. It does **not** wire polyself `learn_egg_type(..., TRUE)` (that short-circuits `rn2(77)`). Named. Correct.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dosit` `lays_eggs` arm | C call site, **retouched** | `sit.c:559–560`; was having-fun |
| `lay_an_egg` | **clone** of `sit.c:357–396` | local `async`; C is `staticfn` |
| `egg_type_from_parent` | **clone** of `mon.c:5568–5579` | exported from `mon.js`; C home |
| `egg_oc_nutrition` | **clone** of `objects[EGG].oc_nutrition` | extractor omits the field; fallback **80** = `objects.h` FOOD egg |
| `lays_eggs` / `eggs_in_water` | imported C macros | `mondata.h:77–79`; `monsters.js` |
| `mksobj` / `set_corpsenm` / `weight` / `stackobj` | imported C callees | `mkobj.js` |
| `observe_object` | imported C callee | `invent.js` / `o_init.c:442–450` |
| `dropy` | imported C callee | dynamic `do.js` |
| `morehungry` | imported C callee | dynamic `eat.js` |
| `Hallucination()` | **clone**, pre-existing in `sit.js` | platypus arm only |
| `clone_mon` / wizard getlin / `shieldeff` | C other arms, **named omit** | not this queue line |
| `learn_egg_type(..., TRUE)` | C other caller, **named omit** | force_ordinary short-circuit |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/sit.js` and `js/mon.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Queen→killer / winged gargoyle→gargoyle is `mon.c`, not a seed-shaped egg table. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Dispatch — C `else if` after `IS_THRONE`, no RNG at the `if`

C `sit.c:556–563`:

```
    } else if (IS_THRONE(typ)) {
        You(sit_message, defsyms[S_throne].explanation);
        throne_sit_effect();
    } else if (lays_eggs(gy.youmonst.data)) {
        return lay_an_egg();
    } else {
        pline("Having fun sitting on the %s?", surface(u.ux, u.uy));
    }
```

JS `sit.js:1357–1368`: throne `return ECMD_TIME` then a separate `if (lays_eggs) return lay_an_egg()` then having-fun. Equivalent: throne never falls into egg. `lays_eggs` is `mflags1 & M1_OVIPAROUS` (`mondata.h:77`; JS `0x00400000`). No `rn2`/`rnd`/`rn1`/`d` at the `if`. Human / tourist → having-fun. Chicken / pyrolisk / queen bee / eel (oviparous) → `lay_an_egg`. Match.

C `return lay_an_egg()` so male/hungry/tetra/Sargasso `ECMD_OK` does **not** take the final `return ECMD_TIME`. JS `return lay_an_egg()`. Match.

### `lay_an_egg` gates — C `else if` order, no RNG until `mksobj` / `egg_type_from_parent`

C `sit.c:362–382`:

```
    if (!flags.female) { pline("%s can't lay eggs!", Hallu? platypus : "Males"); return ECMD_OK; }
    else if (u.uhunger < (int) objects[EGG].oc_nutrition) { You("don't have enough energy…"); return ECMD_OK; }
    else if (eggs_in_water(youmonst.data)) {
        if (!(Underwater || Is_waterlevel(&u.uz))) { pline("A splash tetra you are not."); return ECMD_OK; }
        if (Upolyd && (data == &mons[PM_GIANT_EEL] || data == &mons[PM_ELECTRIC_EEL])) {
            You("yearn for the Sargasso Sea."); return ECMD_OK;
        }
    }
```

JS `sit.js:1084–1107` is that chain. `game.flags.female` is C `flags.female` (`u_init.js` / `jsmain.js` gender). Hunger is `<`, not `<=`. `objects.h` FOOD egg nutrition is **80**; extractor omits `oc_nutrition`; `egg_oc_nutrition` returns 80. `eat.js` `FOOD_NUTRITION.EGG` is the same 80. Equal-to-80 lays. `Underwater()` is `u.uinwater` (D-1056). `Is_waterlevel(u.uz)` is `const.js` `on_level` vs `water_level`. `eggs_in_water` is oviparous `S_EEL` swimmer (`mondata.h:78–79`).

Eel compare: C `youmonst.data == &mons[PM_GIANT_EEL]`. JS `mons()` allocates a new object, so the SHA compares `u.umonnum` (C’s `u.umonnum`, the field `egg_type_from_parent` already uses). `Upolyd` is `mtimedone != 0`. A giant/electric eel poly **on waterlevel** yearns for Sargasso and does **not** spawn. A dry eel tetra-returns before Sargasso. A female chicken skips the `eggs_in_water` arm entirely. No RNG in the gates.

C `You("don't have enough…")` / `You("yearn…")` prefix `"You "`. JS `pline` of the full sentence. C `pline("%s can't lay eggs!", …)` interpolates platypus vs `"Males"`. JS template is that string. Match.

`Hallucination()` for the platypus arm is sit’s **pre-existing** clone (`sit.js:173–178`): sticky `u.Hallucination` or `(HHallucination & TIMEOUT)`, resist is sticky `u.Halluc_resistance` only. C `youprop.h:120` is `HHallucination && !Halluc_resistance` with resist `H||E`. Review **33** already named that clone (lap `mhis`). Potion hallu mirrors sticky from TIMEOUT, so the platypus string matches C on the public path. `EHalluc_resistance` without sticky is sit.js debt, not a new egg-only gate. Do not rewrite every `Hallucination()` clone in the `is_lava` iter.

### Egg object — C call-for-call, one `rn2(77)` then hatch `rnd`

C `sit.c:383–395`:

```
    uegg = mksobj(EGG, FALSE, FALSE);
    uegg->spe = 1; uegg->quan = 1L; uegg->owt = weight(uegg);
    set_corpsenm(uegg, egg_type_from_parent(u.umonnum, FALSE));
    uegg->known = 1; observe_object(uegg);
    You("%s an egg.", eggs_in_water(data) ? "spawn" : "lay");
    dropy(uegg); stackobj(uegg);
    morehungry((int) objects[EGG].oc_nutrition);
    return ECMD_TIME;
```

JS `sit.js:1108–1124` is that order. `mksobj(EGG, false, false)` skips `mksobj_init` (no random bless/curse). C `mkobj.c:1197–1228` still `set_corpsenm(otmp, NON_PM)` for EGG even when `!init`; JS does too. `NON_PM` does not attach a hatch timer. Then `egg_type_from_parent(umonnum, false)` runs **before** the second `set_corpsenm` (clang LTR = JS arg eval). Then `spe=1` (yours), `quan=1`, `weight`, `known=1`.

`observe_object` is `o_init.c:442–450`: `otyp >= FIRST_OBJECT && !Hallucination` → `dknown=1` + `discover_object(..., FALSE, TRUE, FALSE)`. JS `invent.js:681–686` skips on sticky `u.Hallucination`, 3-arg `discover_object` with `credit_hero` default false. Egg is not a generic otyp. Pre-existing callee; not a stub.

Spawn vs lay: `eggs_in_water` after the tetra/Sargasso gates, so a water-eel that passed Sargasso **spawns**. A chicken **lays**. C `You("%s an egg.", …)` → `"You spawn an egg."` / `"You lay an egg."`. JS interpolates the same.

`dropy` → `dropz(..., FALSE)` (`do.c:800–803`). C `dropz` already `stackobj`s (`do.c:837`). C `lay_an_egg` then `stackobj`s **again**. JS `dropy` includes `stackobj`; then `stackobj(uegg)` again. Matching C’s redundant second merge, not a JS-only double-stack. `morehungry(80)` after. `eat.js` `morehungry` is sync (C is sync). Await is only `dropy`. Match.

`attach_egg_hatch_timeout` (`timeout.c:981–1004`): `when==0` rolls `rnd(i)>150` for `i` in 151..200 (`MAX_EGG_HATCH_TIME=200`). JS `mkobj.js:866–878` is that loop. RNG after `rn2(77)`, not before. Private canary (pyrolisk timed) exercises it. Public-unhit.

### `egg_type_from_parent` — `force_ordinary || !BREEDER_EGG`, sit always rolls

C `mon.c:5538` / `5568–5579`:

```
#define BREEDER_EGG (!rn2(77))
    if (force_ordinary || !BREEDER_EGG) {
        if (mnum == PM_QUEEN_BEE) mnum = PM_KILLER_BEE;
        else if (mnum == PM_WINGED_GARGOYLE) mnum = PM_GARGOYLE;
    }
    return mnum;
```

`!BREEDER_EGG` is `rn2(77) != 0` (76/77). `force_ordinary` short-circuits the roll (polyself). Sit passes `FALSE`, so `rn2(77)` **always** runs. JS `mon.js:433–439`: `if (force_ordinary || rn2(77))` then the same two `else if`s. `rn2(0)` is falsy → keep queen / winged gargoyle (1/77 breeder). `pm('QUEEN_BEE')` is `monsterNames.indexOf('PM_QUEEN_BEE')`. Classify: **clone that matches C at this call site**, not a stub and not a hardcoded killer-bee.

`can_be_hatched` in the same file uses `BREEDER_EGG` the other way (`!rn2(77)` to **keep** parent). Different callee. This SHA does not retouch it.

Call-for-call (sit `force_ordinary=false`; one `rn2(77)`):

| Parent | `rn2(77)` | C corpsenm | JS corpsenm |
|--------|-----------|------------|-------------|
| pyrolisk / chicken | any | parent | **parent** |
| queen bee | ≠0 (76/77) | killer bee | **killer bee** |
| queen bee | 0 (1/77) | queen bee | **queen bee** |
| winged gargoyle | ≠0 | gargoyle | **gargoyle** |
| winged gargoyle | 0 | winged | **winged** |
| male / hunger&lt;80 / dry tetra / Sargasso | — | no egg | **no egg** |

## Hallucinations / overclaim

“Match C dosit so an oviparous hero sitting on ordinary floor lays or spawns an egg instead of the having-fun default” is **true for the `lays_eggs` dispatch and for the `lay_an_egg` body including `egg_type_from_parent(umonnum, FALSE)`**. It is **not** true that `dosit` is complete C (`clone_mon` split_mon still named), or that every `learn_egg_type` caller now rolls (polyself `TRUE` still named).

This is **not** “Match C dispatch, callee is a stub.” `lay_an_egg` is a clone of the real `sit.c` body. `egg_type_from_parent` is a clone of the real `mon.c` body with C `rn2(77)` short-circuit. `mksobj` / `set_corpsenm` / `dropy` / `stackobj` / `morehungry` / `observe_object` are imported C callees. `egg_oc_nutrition` is a constant clone of `objects.h` 80, not a fake nutrition table keyed on seeds.

Stamping the Open item **Addressed:** D-1075 `f21410e1` is fair. Hash is on the archive row.

## Density (§2b)

One Open cluster: C `sit.c:559–560` plus the `lay_an_egg` body and the `mon.c` callee that `set_corpsenm` needs. Review 35 asked for this, not `clone_mon` / wizard getlin. ~90 executable lines + 16 in `mon.js`. Right size. Two JS files that already call each other (`sit←mon` via `mons` / now `egg_type_from_parent`). Not “finish timeout.c hatch.”

## Verification

Journal: private canary (male/hungry/tetra/Sargasso `ECMD_OK`; pyrolisk `spe=1` parent timed; queen→killer bee; human having-fun); green+strict seed8000/0900; cohort seed1500/1800/0060/0102/0700/0017. Path **public-unhit** (no public oviparous `#sit`). Green+cohort is regression cover, not a public lay-egg proof. Cadence **#1365** ran before this SHA. Next full `sessions` @**#1370**.

C read of `sit.c:357–396`/`556–564`, `mon.c:5538–5579`, `mondata.h:77–79`, `objects.h` egg 80, `mkobj.c:1197–1228`/`1318–1361`, `timeout.c:981–1004`, `o_init.c:442–450`, `do.c:800–842`, `youprop.h:120`; JS `sit.js:1070–1124`/`1357–1368`, `mon.js:433–439`, `mkobj.js:1024–1054`/`1417–1480`, hunks grepped FORCE/fs/seed.

## Actionable C-wrongs

None from this SHA. The dispatch, the four `ECMD_OK` gates, `mksobj`/`set_corpsenm`/`dropy`/`stackobj`/`morehungry(80)`, and `egg_type_from_parent` `force_ordinary \|\| rn2(77)` match C.

Named omits / do-nots (map / Open, not Must-fix):

1. Hero pit/hole `dotrap` `VIASITTING` bodies — shipped next as D-1076 `87b4b7cb`.
2. `clone_mon` monster `split_mon` (live Open). Wizard getlin / `shieldeff` (Open). Do not pull them into `is_lava`.
3. Polyself `learn_egg_type(..., TRUE)` still named (`force_ordinary` skips `rn2(77)`).
4. Sit `Hallucination()` / `observe_object` sticky vs `youprop.h` — pre-existing; platypus / discover only.

Do not restore oviparous `#sit` having-fun. Do not skip male/hunger/tetra/Sargasso `ECMD_OK`. Do not put `egg_type_from_parent` in `sit.js`. Do not short-circuit sit’s `rn2(77)` with `force_ordinary=true`. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: oviparous `#sit` after throne returns `lay_an_egg()`, whose gates and `egg_type_from_parent(umonnum, FALSE)` `rn2(77)` match C `sit.c` / `mon.c`, not a having-fun stub.
- Must-fix stays empty; next port after D-1076 pops Open `hack.c` `is_lava`. **Addressed:** D-1077 `a9e819a4`
