# Review 17 — 2e79451d — dosit Underwater ≡ u.uinwater (D-1056)

## Metadata
- Full / short hash: `2e79451d6765862880c1dff0e8046c5f0d4b7ad4` / `2e79451d`
- Parent: `eb6cad91` (review 16 QUALITY-RISK; Must-fix `Underwater` → `u.uinwater`)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 02:47:57 +0200
- D-id: **D-1056**
- Stats: 10 files, +88 / −40 — `js/sit.js` +14 / −3 (helper + two call sites)
- Claims to close: Must-fix from `reviews/loop-unattended/16-e13735f8-dosit-in-water.md` item 1. Stamped **Addressed:** D-1056 on the archive row **and** on review 16 in this SHA (`2e79451d` — hash filled here, not chicken-egg).
- JS / map: `sit.js` `Underwater()`; `c-js-map/data.md`. Cadence **#1330** **44**/44 Scr **11405**/11405 RNG **100%**.

## Intent vs deliverable

Git subject promises: “Match C youprop.h Underwater so dosit pool sit uses u.uinwater, not the unset alias.”

Review 16’s Must-fix was narrower than “fix every `u.Underwater` in `js/`”: replace the **two new D-1055 reads** (`is_pool && !Underwater`, and `(Underwater || Is_waterlevel) && !eggs_in_water`) with C `u.uinwater`. Do not rewrite the second `in_water` `water_damage` to `uarmf`. Do not drop the early pool/gremlin goto.

The diff **does** add a local `Underwater()` that returns `!!game.u.uinwater` and switches both sit predicates to it. It does **not** retouch `apply.js` `Underwater_hero`, `pickup.js`, `hack.js`, `trap.js`, `display.js`, or the other still-dead `u.Underwater` reads. D-log names those. The subject is scoped to `dosit`. Honest.

It does **not** port sink/altar/grave (that is D-1057, next SHA), lava/ice/drawbridge, or drown’s wade path that *writes* `uinwater`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Underwater()` | C macro as function | `youprop.h:279` `#define Underwater (u.uinwater)` |
| `dosit` early pool arm | C function, retouched predicate | `sit.c:430–431` `is_pool && !Underwater` |
| `dosit` muddy/cushions | C function, retouched predicate | `sit.c:505–510` `(Underwater \|\| Is_waterlevel) && !eggs_in_water` |
| `uinwater` writers | imported C callees, not this SHA | `trap.js:4081` `drown` sets `1`; `do.js:872` dry-land clears `0` |
| `u.Underwater` elsewhere | pre-existing dead alias | named omit; Review 16 said do not boil the ocean |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/sit.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. The helper is the C macro, not a seed-shaped branch. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### The macro is `u.uinwater`, not a `you` field

C `youprop.h:279`:

```
#define Underwater (u.uinwater)
```

C `you.h` stores `uinwater` as a 1-bit field. There is no `u.Underwater` member. D-1055’s `u.Underwater` was a clone of the **wrong identifier**: JS never writes that field (`drown` writes `u.uinwater = 1`). Boolean context in C is “nonzero bit.” JS `!!(game.u?.uinwater)` is the same for 0/1. Optional chaining is defensive; `dosit` already uses `game.u`. Not a divergence vs the bit.

### Early pool goto — now matches C when submerged

C `sit.c:430–435` (after steed / hider / `can_reach_floor` / ustuck):

```
} else if (is_pool(u.ux, u.uy) && !Underwater) { /* water walking */
    goto in_water;
} else if (Upolyd && u.umonnum == PM_GREMLIN
           && (levl[u.ux][u.uy].typ == FOUNTAIN || is_pool(u.ux, u.uy))) {
    goto in_water;
}
```

JS `sit.js:954–963`: `is_pool && !Underwater()` then gremlin `FOUNTAIN || is_pool`, each `dosit_in_water` + `return ECMD_TIME`. Same skip of OBJ_AT/trap.

| Hero state | C (this SHA) | JS `Underwater()` |
|------------|----------------|-------------------|
| Pool, `uinwater=0` (wwalk / fly) | early `goto in_water` | early `dosit_in_water` — **match** |
| Pool, `uinwater=1` | skip early; muddy if `!eggs_in_water` | skip early; muddy — **match** (was wrong in D-1055) |
| Gremlin + fountain, any water bit | second arm, no Underwater test | same — **match** |
| Dead `u.Underwater=1`, live `uinwater=0` | ignore the unset field | helper ignores it — **match** |

Gremlin + pool + `uinwater=1`: C first arm false, second true → still `in_water`. JS same. The gremlin arm must **not** grow an Underwater test.

### Muddy / cushions — the later predicate

C `sit.c:505–510`: after trap, `(Underwater || Is_waterlevel(&u.uz)) && !eggs_in_water` → waterlevel “no cushions” else “muddy bottom.” Then `is_pool && !eggs_in_water` **or** goto `in_water`.

JS `sit.js:1045–1057`: `Underwater() || Is_waterlevel(u.uz)` then the later `is_pool` arm. `Is_waterlevel` is the existing `dungeon.h` Lcheck helper (`const.js`). `eggs_in_water` is D-1055’s `mondata.h:78–79` function. Eel underwater: skip muddy (`eggs_in_water`), skip later is_pool, fall through — C having-fun / furniture. Same as Review 16’s eel story, now with a live bit.

The later `is_pool && !eggs_in_water` arm is still C’s goto landing pad (mostly dead for non-goto). Harmless, same as C. This SHA does not “fix” that.

C `Is_waterlevel(&u.uz)` is a `dungeon.h` `Lcheck` against the Plane of Water. JS `Is_waterlevel(u.uz)` is that helper (`const.js`). Waterlevel + `uinwater=0`: C still takes cushions because `Is_waterlevel` is ORed, not gated on the bit. JS same. Waterlevel was already reachable in D-1055; this SHA only turns the `Underwater` half of the OR live.

C `eggs_in_water` (`mondata.h:78–79`): `lays_eggs && mlet == S_EEL && is_swimmer`. JS `monsters.js:345–347` is that triple. Untouched this SHA. Eel + pool + `uinwater=0`: early goto still `in_water` (C does **not** test `eggs_in_water` on the early arm). Eel + `uinwater=1`: skip early, skip muddy, skip later is_pool. Match.

### Helper vs `dosit`’s local `u`

```
function Underwater() {
    return !!(game.u?.uinwater);
}
```

`dosit` binds `const u = game.u || {}` then calls `Underwater()`, not `u.uinwater`. If `game.u` exists, both names are the same object. If `game.u` is missing, local `u` is `{}` (falsy bit) and the helper is false. C always has global `u`. Not a sit production path. Reading `game.u` rather than the local binding is not a C-wrong; it is the same bit D-1055 failed to read.

C evaluates `Underwater` as the bitfield in boolean context (0 or 1). JS `!!` is extra and equivalent. Do not pack this bit into `TIMEOUT` — C `uinwater` is not an `uprops[]` intrinsic (`you.h` Bitfield 1).

### Writers that make the bit live

Only two scored assignments:

- `trap.js` `drown`: `u.uinwater = 1` (C `trap.c` drown / unbreathing entry).
- `do.js` leaving water: `u.uinwater = 0`.

Nothing writes `u.Underwater`. D-1055’s private “underwater mud” node that set `u.Underwater = 1` observed the JS bug, not C. This SHA’s node that sets `u.uinwater = 1` is the C state. Apply’s `Underwater_hero()` is still the dead alias (named on `apply.js`; Review 16 forbade boiling it here).

### What this SHA does not change (and must not)

`dosit_in_water` body is untouched: `hliquid('water')`; gremlin `split_mon` / `dryup`; else two `rn2(10)` `water_damage(u.uarm, …)` (pinned C second call is `uarm`, not `uarmf`). Review 16 confirmed that body. Do not reopen it.

`drown` still sets `u.uinwater = 1` (`trap.js:4081`). Survive/wade after that flag is a named omit on `trap.js`, not a sit predicate bug. When wade is ported, sit now takes the C arm.

### Remaining `u.Underwater` in other files

Grep of scored `js/`: `apply.js`, `pickup.js`, `hack.js`, `trap.js`, `display.js`, `mon.js`, `mhitu.js`, `monmove.js`, `mondata.js`, `steed.js`, `sounds.js`, `read.js`, `dbridge.js` still read `u.Underwater`. Those were **not** this Must-fix. They remain named omits on those modules. Do not treat this ACCEPT as a license to leave sit’s helper while “fixing” apply in the same lava iter.

## Hallucinations / overclaim

“Match C youprop.h Underwater so dosit pool sit uses u.uinwater” is **true for the two `dosit` predicates.** It is **not** true that JS `Underwater` is C `Underwater` everywhere. The subject does not claim that. D-log “Did not rewrite other `js/` `u.Underwater`” matches the diff.

Cadence **#1330** 44/44 does not prove pool sit (public **unhit**). The private node (`uinwater=1` muddy + 0×`rn2(10)`; `uinwater=0` in_water + 2×`rn2(10)`; dead `u.Underwater=1` ignored) **is** the Review 16 falsifier. That is not overclaim of the public suite; it is the right check for this bit.

Stamping the Must-fix **Addressed:** D-1056 `2e79451d` is fair.

## Density (§2b)

Must-fix peel: one C macro + two call sites (~5 executable lines, plus comments). Playbook “too small” would apply to an *invented* one-`if` Open peel. Written-review C-wrongs pop first; this is the size Review 16 asked for. Not “finish sit.c.” Not a second subsystem.

## Verification

Journal: private node `uinwater=1` muddy 0×`rn2(10)`; `uinwater=0` in_water 2×`rn2(10)`; dead `u.Underwater` ignored; picnic vs skip; eel underwater having-fun. green+strict PASS; cohort **6**/6 (seed1500/1800/0060/0102/0360/2200); cadence full `sessions` **44**/44. Path **public-unhit**. Green+cohort+cadence is adequate regression cover; the node is the fidelity check. The two `rn2(10)` counts are the `in_water` else-arm (C `sit.c:521–524`); muddy must not consume them.

This review iter did not re-run sessions (not a cadence slot; Must-fix empty after D-1057). C read of `youprop.h:279`, `you.h` `uinwater` bitfield, `sit.c:430–435` / `505–525`, `trap.js`/`do.js` writers, and grep `uinwater=` vs `Underwater()` / `u.Underwater` is the audit.

## Actionable C-wrongs

None in this SHA. The Review 16 item is closed.

Named omits (map, not queue): other files’ `u.Underwater`; drown wade; furniture (shipped next SHA as D-1057); lava/ice/drawbridge; `clone_mon` monster `split_mon`; `lay_an_egg`; `can_reach_floor`/`ustuck`/hider; `is_pool` `is_moat`; `water_damage` invent plines.

Do not restore sit `u.Underwater`. Do not “fix” the second `water_damage` to `uarmf`. Do not drop the early pool/gremlin goto. The next port pops Open lava sit, not another Underwater file-walk.

## Verdict

- Verdict: **ACCEPT**
- Score: **8.5 / 10**
- One sentence: both new D-1055 `Underwater` tests now read C `u.uinwater`, so submerged pool sit takes muddy-bottom instead of two armor `rn2(10)`.

Do not restore sit `u.Underwater`. Next Open cluster is lava sit (`sit.c:539–549`), not an Underwater file-walk.
Must-fix stays empty; QUALITY-RISK from review 16 is closed.
