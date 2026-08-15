# Review 04 — d3fac215 — should_mulch_missile hero rnl(4) (D-1043)

## Metadata
- Full / short hash: `d3fac215dbab207ae90c7cdfca1a9396e7918b18` / `d3fac215`
- Parent: `3ac7a037` (docs stamp of D-1042 `19e907f5`)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 21:39:42 +0200
- D-id: **D-1043**
- Stats: 10 files, +101 / −49 — `js/weapon.js` +8 (import `rnl` + one `if`)
- Claims to close: review 02 **item 2** (`should_mulch_missile` hero blessed save must be `!rnl(4)` not `!rn2(4)`). Stamped **Addressed:** D-1043 `d3fac215` on `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`.
- JS / map: `js/weapon.js` only; `c-js-map/turns.md` dothrow row; cadence **#1310** full `sessions`.

## Intent vs deliverable

Git subject promises: “Match C should_mulch_missile hero blessed save rnl(4) so blessed ammo hits consume the luck-biased RNG word.”

Review 02: D-1041 enabled `should_mulch_missile` on every surviving WEAPON/weptool/GEM hit. JS used `!rn2(4)` on the hero arm. C `dothrow.c:1992` uses `!rnl(4)` (luck-biased; logs `rnl` plus an internal `rn2(37+|adj|)` when Luck adjusts). Blessed darts would burn the wrong stream.

The diff **does** that one substitution and tightens the `if` to C’s `obj->blessed && (mon_moving ? !rn2(3) : !rnl(4))`. Monster path stays `rn2(3)`. Early returns (null / not ammo|missile / boomerang / `oc_magic`) and the flint/`oc_tough` `!rn2(2)` save are untouched.

It does **not** port `check_shop_obj` / `obfree` on mulch success (`thitmonst` still `quan=0` / `OBJ_FREE`). The subject does not claim object lifetime. Named omit stays named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `should_mulch_missile` | C function, retouched | `dothrow.c:1976–2002`; only the blessed-save arm changes |
| `rnl` | imported C callee | `js/rng.js:77–91` — already existed; this SHA starts calling it from mulch |
| `rn2` | C callee | chance roll, monster blessed save, flint save — unchanged |
| `greatest_erosion` | clone of `obj.h:126–128` | local in `weapon.js`; unchanged |
| `is_ammo` / `is_missile` | imported C macros | `wield.js`; unchanged |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean.

## C ↔ JS fidelity

### Full function — call-for-call, including the one changed roll

C `dothrow.c:1975–2002`:

```
boolean
should_mulch_missile(struct obj *obj)
{
    boolean broken;
    int chance;

    if (!obj || !(is_ammo(obj) || is_missile(obj))
        || obj->otyp == BOOMERANG
        || objects[obj->otyp].oc_magic)
        return FALSE;

    chance = 3 + greatest_erosion(obj) - obj->spe;
    broken = chance > 1 ? rn2(chance) : !rn2(4);
    if (obj->blessed && (svc.context.mon_moving ? !rn2(3) : !rnl(4)))
        broken = FALSE;

    if (((obj->oclass == GEM_CLASS && objects[obj->otyp].oc_tough)
         || obj->otyp == FLINT)
        && !rn2(2))
        broken = FALSE;

    return broken;
}
```

JS `weapon.js:183–201` after this SHA:

```
if (!obj || !(is_ammo(obj) || is_missile(obj))) return false;
if (objectNames[obj.otyp] === 'BOOMERANG') return false;
if (game.objects?.[obj.otyp]?.oc_magic) return false;

chance = 3 + greatest_erosion(obj) - (obj.spe | 0);
broken = chance > 1 ? !!rn2(chance) : !rn2(4);
if (obj.blessed && (game.context?.mon_moving ? !rn2(3) : !rnl(4))) {
    broken = false;
}
if (((GEM_CLASS && oc_tough) || FLINT) && !rn2(2))
    broken = false;
return broken;
```

**RNG order** (when the function does not early-return):

1. `rn2(chance)` if `chance > 1`, else `rn2(4)` (the `!` is boolean, not a second roll).
2. If blessed: `rn2(3)` if `mon_moving`, else **`rnl(4)`** (this SHA).
3. If flint or tough gem: `rn2(2)`.

Before: step 2 hero arm was `rn2(4)` — **same arity, wrong function**, so the log word was `rn2(4)=` instead of `rnl(4)=`, and Luck never biased the save. After: C.

`!!rn2(chance)` vs C `rn2(chance)` stored in a `boolean`: C treats nonzero as true. Equivalent. Pre-existing, not this hunk.

Boomerang: C `otyp == BOOMERANG` before any roll. JS `objectNames[otyp] === 'BOOMERANG'` is the same index. `is_missile` is true for boomerangs (`oc_skill` in `[-P_BOOMERANG, -P_DART]`); the extra check is what keeps them from mulching. Unchanged and correct.

`is_ammo` / `is_missile` (`obj.h:238–248`): WEAPON|GEM with skill in `[-P_CROSSBOW, -P_BOW]`; WEAPON|TOOL with skill in `[-P_BOOMERANG, -P_DART]`. JS `wield.js` copies those ranges. A thrown sword never enters this function on either side — `thitmonst` still *calls* it, both return false with **no** roll.

### Blessed `if` — short-circuit matches C

Old JS:

```
if (obj.blessed) {
    const mon_moving = !!(game.context?.mon_moving);
    if (mon_moving ? !rn2(3) : !rn2(4)) broken = false;
}
```

New JS matches C’s single `&&`. Unblessed objects still **do not** consume `rn2`/`rnl` here. Combining the tests is not a new roll and not a skipped roll.

`game.context?.mon_moving`: undefined is falsy → hero `rnl(4)`, same as C `svc.context.mon_moving == 0`. Monster throws (`mthrowu.c:174` `ohitmon`) set `mon_moving` and keep `rn2(3)`.

### `rnl(4)` — existing callee, not a clone

C `rnd.c:112–151` (contest log patch writes `rnl`):

```
adjustment = Luck;
if (x <= 15)
    adjustment = (abs(adjustment) + 1) / 3 * sgn(adjustment);
i = RND(x);
if (adjustment && rn2(37 + abs(adjustment))) {
    i -= adjustment;
    clamp to [0, x-1];
}
log rnl
```

JS `rng.js:77–91` is that function. `x = 4 <= 15`, so Luck 0/1 → adjustment 0 (no inner `rn2`); Luck 2–4 → adj 1 → `rn2(38)` then `rnl(4)=`. Private tests named Luck `rn2(38)` and `rnl=0` saves. Those are C.

`rnl` logs `rnl(4)=` (judge-compatible). Replacing `rn2(4)` with `rnl(4)` is exactly the stream fix review 02 asked for. This is **not** “Match C dispatch, callee is a stub.”

### Callers

C: `dothrow.c:2220` (`thitmonst` after `hmon` on a surviving weapon hit); `mthrowu.c:174` (`ohitmon`, `broken = ohit && should_mulch_missile(obj)`).

JS: `dothrow.js:580`; `mthrowu.js:529`. Both already called this function. Polearms/grapples are not ammo/missiles → still no roll (review 02 noted that). The Must-fix mattered because D-1041 **enabled the whole WEAPON arm**, including thrown ammo. This SHA fixes that newly live hero path.

Mulch **success** still does not `check_shop_obj` / `obfree`. C `dothrow.c:2220–2225`. Named omit since D-1041; this SHA did not pretend to close it.

## Hallucinations / overclaim

“Match C should_mulch_missile hero blessed save rnl(4)” is **true for the save roll and the log word**. It is **not** a claim that mulch lifetime is C `obfree`. D-log deferred shop mulch and leader `questarti` honestly.

Stamping review 02 item 2 **Addressed** is fair. Item 3 (`special_obj_hits_leader` / `urole.questarti`) is **not** in this diff and must stay Must-fix.

Cadence **#1310** 44/44 does not prove a blessed-dart hit — journal admits public **unhit**. That is honest, not a fortress-as-proof cheat.

## Density (§2b)

One deferred `if` (~8 lines). Playbook table marks that “too small” **when chosen as map work**. Here the unattended loop **must** pop one Must-fix item and must not combine with the next row (leader predicate). Thin is mandated. Not a quality miss and not an unrelated dump.

## Verification

Journal: green+strict PASS; throw/combat/zap cohort **4**/4 (seed0361 Scr 366/366; seed1800 throw; seed0060 kick; seed2200 zap). Private node **11**/11 (hero `rnl(4)` not `rn2(4)`; `mon_moving` `rn2(3)`; unblessed skip; Luck `rn2(38)`; high-`spe` chance then `rnl`; boomerang/sword/null no roll; `rnl=0` saves; flint extra `rn2(2)`; arrow ammo). Cadence **#1310** full `sessions` **44**/44 Scr **11405**/11405 RNG **100%**. Path **unhit** by public traces — admitted. Private tests are the right falsifier for a roll the public set never reaches.

## Actionable C-wrongs

None from **this** SHA. Review 02 item 2 is actually closed.

Named omits (map, not Must-fix): `check_shop_obj` / `obfree` on mulch; flint/`oc_tough` already matched. Remaining Must-fix is still review 02 **item 3**: `special_obj_hits_leader` uses `game.u?.questarti` while C `is_quest_artifact` is `otmp->oartifact == gu.urole.questarti` (`questpgr.c:67–70`). Detect/quest/dogmove already clone that correctly on `game.urole`. Do not dump yname or tut-1 instead.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: the hero blessed-mulch save now calls existing `rnl(4)` in C order (monster path still `rn2(3)`), so blessed ammo no longer burns a `rn2` word; shop `obfree` stays a named omit.
