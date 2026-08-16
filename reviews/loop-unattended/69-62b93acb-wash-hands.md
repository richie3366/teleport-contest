# Review 69 — 62b93acb — `wash_hands` + dipfountain hands/uarmg (D-1108)

## Metadata
- Full / short hash: `62b93acbece87e46f9380271802cb2676f0810b2` / `62b93acb`
- Parent: `0633a261` (D-1107). This file audits **this SHA only**. This review commit fills the archive row **Addressed:** D-1108 `62b93acb` (chicken-egg on the fix SHA).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 21:30:43 +0200
- D-id: **D-1108**
- Stats: 10 files, +181 / −49 — `js/fountain.js` +82 / −7 (`wash_hands` + Glib/`gloves_simple_name`/`fingers_or_gloves` + dipfountain wire).
- Claims to close: Open queue `fountain.c` `wash_hands` (named). Not Excalibur. Stamped **Addressed:** D-1108 without the short hash; this review fills `62b93acb`. Filled D-1107 hash `0633a261`. `reviews/loop-2026-08-15/` has no open wash_hands Must-fix.
- JS / map: `fountain.js` `wash_hands` / `dipfountain`. `c-js-map/data.md` fountain row. `dipsink` / potion.c pool dip / uncurse 17–20 / case 29 still named.
- Prior reviews this SHA claims to close: none as Must-fix. Named omit from D-0109 / D-0877 / D-1107 “not wash_hands”.

## Intent vs deliverable

Git subject promises: “Match C fountain.c wash_hands so dipping hands or gloves washes, clears Glib, and can skip the fountain lottery.”

Old JS `dipfountain` treated `hands_obj` / `uarmg` as `er = ER_NOTHING` with a deferred comment — no You-wash, no `make_glib(0)`, no glove `water_damage`, so the later `er != ER_NOTHING && !rn2(2)` skip **never** fired from this arm. C `fountain.c:448–449` calls `wash_hands` (`557–577`).

The diff **does** that function and wires the `is_hands || obj === u.uarmg` arm. It does **not** call `wash_hands` from `dipsink` (`fountain.c:730`) or from potion.c pool dip (`potion.c:2347–2350`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `wash_hands` | C body, **new** | `fountain.c:557–577`; exported |
| `dipfountain` hands/uarmg | C caller, **retouched** | `fountain.c:448–449` |
| `make_glib` | C callee, **imported** | `potion.js`; dynamic import (cycle) |
| `water_damage` | C callee, **imported** | `trap.js` D-0683; `force=true` |
| `body_part` | C callee, **imported** | `polyself.js` hero form |
| `hliquid` | C callee, **imported** | `do_name.js` |
| `fingers_or_gloves` | C callee, **clone** | `do_wear.c:60–65` |
| `gloves_simple_name` | C callee, **clone** | `objnam.c:5532–5547` |
| `wash_Glib` | C macro, **clone** | `youprop.h:112` `uprops[GLIB].intrinsic` |
| `ER_NOTHING` / `ER_GREASED` / `ER_DESTROYED` | C, **imported** | `const.js` ≡ `obj.h:469–472` |
| trap.js `gloves_simple_name` | **not used** | that file’s clone always returns `'gloves'` |
| `dipsink` `wash_hands` | C caller, **named omit** | `fountain.c:729–731` returns after wash |
| potion.c pool `wash_hands` | C caller, **named omit** | `potion.c:2347–2350` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**RNG:** none inside `wash_hands` itself. `water_damage(uarmg, null, true)` may `rn2` (grease, rust) — C same, `force` skips the luck `rn2(20)`. After return, pre-existing `er === ER_DESTROYED || (er !== ER_NOTHING && !rn2(2))` can now fire because `ER_GREASED` is not `ER_NOTHING`. That is the C comment’s whole point (`fountain.c:572–575`).

## Constitution / playbook

Grep of the `js/fountain.js` hunk: no trace-index gates, no recorded coordinates. Dynamic `import('./potion.js')` is ESM, not `fs`. Contest Rule #2: no Node builtins. The extra `await` is module load, not `nhgetch`. `sit.js` already uses the same `make_glib` cycle break.

## C ↔ JS fidelity

### `wash_hands` body order

C `fountain.c:558–576`:

```
hands = makeplural(body_part(HAND));
res = ER_NOTHING;
was_glib = !!Glib;
You("wash your %s%s in the %s.", uarmg ? "gloved " : "", hands,
    hliquid("water"));
if (Glib) {
    make_glib(0);
    Your("%s are no longer slippery.", fingers_or_gloves(TRUE));
}
if (uarmg)
    res = water_damage(uarmg, (const char *) 0, TRUE);
if (was_glib && res == ER_NOTHING)
    res = ER_GREASED;
return res;
```

JS `944–965`: same order. You-wash **always** (even with no Glib and no gloves). Then Glib clear + slippery pline. Then glove `water_damage`. Then was_glib+`ER_NOTHING`→`ER_GREASED`. `ER_DESTROYED` from rust/acid is left as-is (no GREASED overlay). `ER_GREASED` already returned from greased gloves is left as-is. Match.

`body_part(HAND)` is the hero poly table (`polyself.js`); dog form → `"paw"` / `"paws"` via `makeplural`. Canary named dog paws. C same.

### Glib clone

C `youprop.h:112`: `#define Glib u.uprops[GLIB].intrinsic` (no `EGlib`). JS `wash_Glib`: if `uprops[GLIB]` exists, return `.intrinsic`; else leftover `HGlib || Glib`. `make_glib` (`potion.js:452–466`) writes intrinsic TIMEOUT bits **and** mirrors `HGlib`/`Glib`. After a real `make_glib`, the slot exists and leftover is unused. Leftover-only path is the “slot never created” arm the D-log names. Preferring the slot when present cannot **invent** Glib C would lack; it can **ignore** a stale leftover if a zero slot exists. Canary named leftover `u.Glib`. Not Must-fix: `make_glib(0)` is the real clearer.

### `gloves_simple_name` / `fingers_or_gloves` clones vs trap.js stub

C `objnam.c:5536–5546`: if `gloves && dknown`, `strstri(oc_name_known ? OBJ_NAME : OBJ_DESCR, "gauntlets")` → `"gauntlets"` else `"gloves"`. JS uses `objects()` (`game.objects`, so runtime `oc_name_known`), `objectNameStrs` / `objectDescrs`, case-insensitive `includes('gauntlets')` ≡ `strstri`. Extracted names:

| otyp | OBJ_NAME | OBJ_DESCR | unknown → | known → |
|------|----------|-----------|-----------|---------|
| leather gloves | leather gloves | old gloves | gloves | gloves |
| gauntlets of fumbling | …gauntlets… | padded gloves | gloves | gauntlets |
| gauntlets of power | …gauntlets… | riding gloves | gloves | gauntlets |
| gauntlets of dexterity | …gauntlets… | fencing gloves | gloves | gauntlets |

That **is** C. `trap.js:2561–2563` `gloves_simple_name` always returns `'gloves'` — this SHA did **not** import that stub. Local clone is the C function. `fingers_or_gloves(true)` → gloves name iff `uarmg`, else `makeplural(body_part(FINGER))`. Match `do_wear.c:60–65`.

### dipfountain wire + lottery skip

C `448–456` after the Excalibur `return`:

```
} else if (is_hands || obj == uarmg) {
    er = wash_hands();
} else {
    er = water_damage(obj, NULL, TRUE);
}
if (er == ER_DESTROYED || (er != ER_NOTHING && !rn2(2)))
    return;
```

JS `1047–1056`: same. Hands or **worn** gloves only (`u.uarmg` identity); an unworn glove in invent still takes `water_damage`. `ER_GREASED=1` (`obj.h:470` ≡ `const.js:2280`) makes `er != ER_NOTHING` true, so Glib-without-destroy can skip `rnd(30)`/`dryup` on `!rn2(2)`. Bare no-Glib wash stays `ER_NOTHING` and does **not** burn that `rn2(2)` — C same; lottery `rnd(30)` still runs. Canary named both.

Destroyed gloves (`ER_DESTROYED`) return before `rn2(2)`. Match.

### Callers this SHA did not touch

C `dipsink` (`fountain.c:729–731`): `is_hands` → `wash_hands(); return;` — **no** fountain lottery. JS dipsink still named absent. C `potion.c:2347–2350` pool/moat dip of hands/gloves → `wash_hands()` only. Named. Those are other functions, not a hole **inside** the shipped `wash_hands` body.

## Hallucinations / overclaim

“Match C so dipping hands or gloves washes, clears Glib, and can skip the fountain lottery” is **true for `dipfountain`’s hands/`uarmg` arm, the You-wash/Glib/water_damage/ER_GREASED sequence, and the pre-existing `!rn2(2)` skip now being reachable.** It is **not** true that sink or pool dip calls `wash_hands`.

This is **not** “Match C dispatch, callee is a stub.” `make_glib` and `water_damage` are real. `gloves_simple_name` is a C-faithful clone, not trap.js’s always-`gloves` stub. Stamping **Addressed:** D-1108 is fair for the Open line.

## Density (§2b)

One Open cluster: `wash_hands` + the `dipfountain` caller C writes immediately after Excalibur. Local `fingers_or_gloves` / `gloves_simple_name` are the two C helpers that body calls (no canonical export; trap.js’s clone is a stub). ~70 executable lines. Inside the band. Did not pull `dipsink` / pool dip / uncurse 17–20 / case 29 (queue said not Excalibur, and those are other arms).

## Verification

Journal: private canary **33**/33 (bare wash; Glib `ER_GREASED`+clear+fingers; leftover `u.Glib`; leather gloved wash; Glib+leather slippery; identified GoP gauntlets; unidentified / `!dknown` gloves; dog paws; rust GoP `ER_DAMAGED` not fake GREASED; levitation skip; dagger no wash; no-Glib dip `rnd(30)` without `rn2(2)`; Glib skip FOUNTAIN / continue `rnd(30)`; dip `uarmg`); green+strict seed8000/0900; cohort **19**/19 (0014 fountain + wizard/role + knight 0103/0104/4500) + strict 0014/0006/2200/0360/4500/0103. Path **public-unhit**. Cadence **#1410** **44**/44 Scr **11405**/11405 RNG **100%** — fortress, not a hands-dip proof.

C read of `fountain.c:448–456` / `:557–577` / `:729–731`, `objnam.c:5532–5547`, `do_wear.c:60–65`, `youprop.h:112`, `potion.c:2347–2350`, `obj.h:469–472`; JS `fountain.js:904–1056`, `potion.js:418–466`, `trap.js:4136–4173`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| dip `-`, no Glib, no gloves | You-wash, `ER_NOTHING`, lottery | **same** |
| dip `-`, Glib, no gloves | clear Glib, fingers pline, `ER_GREASED`, maybe skip | **same** |
| dip worn gloves | You-wash gloved, `water_damage(uarmg,0,TRUE)` | **same** |
| identified GoP + Glib | “gauntlets” slippery line | **same** |
| unidentified GoP | “gloves” (descr riding gloves) | **same** |
| gloves destroyed | `ER_DESTROYED`, no lottery | **same** |
| dip dagger | `water_damage(obj)`, not wash | **same** |
| `dipsink` hands | `wash_hands`; return | **still named** |
| pool dip hands | `wash_hands` only | **still named** |

## Actionable C-wrongs

None that Must-fix this next iter. The function matches `fountain.c:557–577` and the dipfountain caller matches `:448–449`.

Named omits / do-nots (map / Open, not Must-fix):

1. `dipsink` hands/`uarmg` → `wash_hands(); return` (`fountain.c:729–731`). Live Open is now `lspo_exclusion`, not this.
2. potion.c pool/moat dip hands/gloves (`potion.c:2347–2350`).
3. dipfountain uncurse cases 17–20; case 29 `mkgold`. Already Open.
4. Do not restore the `ER_NOTHING` stub on hands/`uarmg`. Do not import trap.js’s always-`gloves` `gloves_simple_name`. Do not skip `was_glib && ER_NOTHING → ER_GREASED`. Do not rewrite `water_damage` this peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: dipping hands or worn gloves now runs C’s `wash_hands` (You-wash, Glib clear, glove `water_damage`, GREASED skip token) instead of a silent `ER_NOTHING`, while sink/pool callers stay named.
- Must-fix stays empty for this SHA; next port pops Open `sp_lev.c` `lspo_exclusion`.
