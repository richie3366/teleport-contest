# Review 03 — 19e907f5 — find_mac minvent ARM_BONUS (D-1042)

## Metadata
- Full / short hash: `19e907f59f13a416c8ef783cf9a5ee369b8ff347` / `19e907f5`
- Parent: `9b607087` (unattended reviews 01/02)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 21:30:15 +0200
- D-id: **D-1042**
- Stats: 11 files, +113 / −52 — `js/worn.js` +28, `js/mhitm.js` +14/− (stub deleted)
- Claims to close: review 02 **item 1** (`find_mac` must walk `minvent` worn `ARM_BONUS` / amulet of guarding, cap `AC_MAX`). Stamped **Addressed:** D-1042 `19e907f5` on `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`.
- JS / map: `js/worn.js` body; `js/mhitm.js` import + re-export so existing callers keep the old module path; `c-js-map/turns.md` uhitm/mhitm row.

## Intent vs deliverable

Git subject promises: “Match C find_mac minvent ARM_BONUS so thrown/pole tmp uses worn monster AC.”

Review 02 found D-1041 `thitmonst` calling `find_mac` while `mhitm.js` returned **base `data.ac` only** (comment “no worn armor peel yet”). An orc in a helmet was easier to hit than C `worn.c`.

The diff **does** replace that stub with C `worn.c:717–735`: start at `mon->data->ac`, walk `minvent` where `owornmask & misc_worn_check`, subtract flat 2 for `AMULET_OF_GUARDING` else `ARM_BONUS`, then `abs(base) > AC_MAX` → `sgn(base) * AC_MAX`.

It does **not** invent a second AC formula, hardcode a helmet bonus, or leave a stub in `mhitm.js`. The old `export function find_mac` is deleted. `mattackm` / `thitmonst` / `uhitm` / zap / trap / `mthrowu` / insight / exper all resolve to the same `worn.js` function. That is what C does: one callee.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `find_mac` | C function, moved | `worn.c:717–735` body now in `worn.js`; `mhitm.js` re-exports the import |
| `ARM_BONUS` | clone of `hack.h:1526–1528` | pre-existing local in `worn.js` (`m_dowear_type` already used it); **not** a new helper this SHA invented |
| `AC_MAX` | C constant | imported from `const.js` (`you.h:472` value 99); old mhitm stub had a local `99` |
| `AMULET_OF_GUARDING` | otyp index | pre-existing `objectNames.indexOf` in this file (also `m_dowear_type` amulet pick) |
| `sgn` (inline) | clone of C `sgn` | `base < 0 ? -1 : base !== 0 ? 1 : 0` — not `Math.sign` |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunks. Rule #2 clean. Frozen contracts untouched.

## C ↔ JS fidelity

### `find_mac` — branch-by-branch

C `worn.c:716–736`:

```
int
find_mac(struct monst *mon)
{
    struct obj *obj;
    int base = mon->data->ac;
    long mwflags = mon->misc_worn_check;

    for (obj = mon->minvent; obj; obj = obj->nobj) {
        if (obj->owornmask & mwflags) {
            if (obj->otyp == AMULET_OF_GUARDING)
                base -= 2; /* fixed amount, not impacted by erosion */
            else
                base -= ARM_BONUS(obj);
        }
    }
    if (abs(base) > AC_MAX)
        base = sgn(base) * AC_MAX;
    return base;
}
```

JS `worn.js:171–188`:

```
export function find_mac(mon) {
    let base = (mon?.data?.ac ?? 10) | 0;
    const mwflags = mon?.misc_worn_check | 0;
    for (let obj = mon?.minvent; obj; obj = obj.nobj) {
        if ((obj.owornmask | 0) & mwflags) {
            if ((obj.otyp | 0) === AMULET_OF_GUARDING) {
                base -= 2;
            } else {
                base -= ARM_BONUS(obj);
            }
        }
    }
    if (Math.abs(base) > AC_MAX) {
        const s = base < 0 ? -1 : base !== 0 ? 1 : 0;
        base = s * AC_MAX;
    }
    return base | 0;
}
```

Walk order is `nobj` (same as C). The worn test is bitwise AND, not “any `owornmask`” and not “armor class only”. A pack helmet (`owornmask == 0`) does not count. A worn helm whose slot bit is missing from `misc_worn_check` does not count. That is the C gate.

**No RNG** in this function on either side.

`mon?.data?.ac ?? 10`: C is `NONNULLARG1` and would crash on a null `mon`. Real callers (`thitmonst`, `mattackm`, `find_roll_to_hit`) always pass a live monster. The `10` is the typical humanoid `permonst.ac` default, not a seed-shaped AC. Not a C-wrong for production call sites.

`mwflags | 0`: C `long`. Wear bits used here (`W_ARM`…`W_ARMU`, `W_AMUL` `0x00010000`, `W_SADDLE` `0x00100000`, `I_SPECIAL` `0x20000000`) all fit in JS 32-bit `| 0`. `I_SPECIAL` lives on `misc_worn_check` for `check_gear_next_turn`, not on object `owornmask`, so `owornmask & I_SPECIAL` is 0 on both sides.

Weapons: C `weapon.c` sets `obj->owornmask |= W_WEP` and does **not** `misc_worn_check |= W_WEP`. `W_WEP` (`0x100`) does not overlap armor bits (`0x01–0x40`). `find_mac` therefore does not subtract a wielded weapon’s `a_ac`/`oc_hitbon`. JS wield path matches that split. Not a miss.

### `ARM_BONUS` — clone matches the macro

C `hack.h:1526–1528`:

```
#define ARM_BONUS(obj) \
    (objects[(obj)->otyp].a_ac + (obj)->spe \
     - min((int) greatest_erosion(obj), objects[(obj)->otyp].a_ac))
```

C `obj.h:126–128`: `greatest_erosion` is `max(oeroded, oeroded2)`.

JS `worn.js:157–164` (pre-existing; this SHA starts using it from `find_mac`):

```
a_ac = game.objects[obj.otyp].a_ac
spe  = obj.spe
erode = min(max(oeroded, oeroded2), a_ac)
return a_ac + spe - erode
```

`game.objects[].a_ac` is `objects_data.js` `r[14]` (`oc_oc1`). Same field C names `a_ac`. Cursed `spe < 0` lowers the bonus on both sides. Erosion cannot subtract more than `a_ac`. Guarding bypasses this and subtracts 2 with **no** `spe`/erosion — JS `otyp === AMULET_OF_GUARDING` before the `else ARM_BONUS` arm. That is C’s comment, not a guessed flat.

This is a **C-macro clone**, not a stub callee. `u_init.js` has a second `ARM_BONUS` for hero `find_ac`; both match the macro. Duplication is style, not a fidelity gap.

### Cap — same as hero `find_ac`

C `you.h:472`: `AC_MAX 99`. C `do_wear.c:2505–2506` (hero) and `worn.c:732–734` (monster) use the same `abs > AC_MAX` then `sgn * AC_MAX`. JS `const.js` exports `AC_MAX = 99`. The inline `sgn` matches C `sgn(0)==0`; the cap does not fire at 0.

Old mhitm stub capped **base `data.ac` only** (no worn sum, then cap). New code caps **after** the walk. An orc (ac 10) in a `a_ac=1` helm becomes 9; stacked bonuses can reach the 99 cap. Private tests claimed helm `a_ac`, unworn pack skip, mask miss, `spe`/erosion, guarding −2 not `spe`, stack, `AC_MAX`. Those are the branches.

### Callers — real C callees, not a dispatch stub

C callers of `find_mac`: `dothrow.c:2036` (`thitmonst` tmp), `mhitm.c:321` (`mattackm`), `uhitm.c:376` (melee tmp), `mthrowu.c:340`, `zap.c:202` and `:4872`, `trap.c:6724`, `exper.c:93`, `insight.c:3397`, plus `ball.c:802` / `mhitu.c:604` / `muse.c:1637`.

JS after this SHA: `dothrow.js:473`, `mhitm.js:1074`, `uhitm.js:323`, `mthrowu.js:625`, `zap.js:1589` and `:2843`, `trap.js:1023`, `exper.js:203`, `insight.js:865` all go through the re-export. `ball.js` / `mhitu.js` / `muse.js` still lack those C sites — **named omits of those functions**, not a stub `find_mac`. When those arms are ported they must import this callee, not restore base-`data.ac`.

Journal note that a re-export-only binding left `find_mac` undefined inside `mattackm` is the reason this SHA **imports** in `mhitm.js` then `export { find_mac }`. ESM live binding: `mattackm` uses the imported name. That is the correct fix, not a second copy of the walk.

### `m_dowear` already sets the bits this walk reads

C `worn.c:970–971`: `mon->misc_worn_check |= flag; best->owornmask |= flag`. JS `worn.js:477–478` does the same. Creation `m_dowear(mon, true)` therefore leaves worn armor visible to `find_mac` without a new don path. This commit did not need to retouch `m_dowear`. If a monster never ran `m_dowear`, both C and JS return base ac.

## Hallucinations / overclaim

“Match C find_mac minvent ARM_BONUS” is **true for the function body and for every JS caller that already imported `find_mac`**. This is **not** the playbook case “Match C dispatch, callee is a stub.” Review 02’s stub is gone.

D-log deferred “Hero `find_ac` HProtection wiring still named.” JS `u_init.js` `find_ac` already does `HProtection & INTRINSIC` → `u.ublessed` plus `uspellprot` (`do_wear.c:2500–2502`). That deferred line is leftover caution, not a live peel in this SHA. Do not queue it from this review.

D-log also deferred mulch `rnl` and leader `urole.questarti`. Those are **other** Must-fix rows (review 02 items 2–3). Item 2 is `d3fac215` (review 04). Item 3 is still open. This SHA does not claim them.

Stamping review 02 item 1 **Addressed** is fair.

## Density (§2b)

One C function (`find_mac`) plus the minimum re-export so `mattackm` does not go undefined. ~25 lines of JS. Playbook “too small” would be a single deferred `if` with no callee. This is the **whole** C function the Must-fix named. Loop rule is one queue item per port iter — not combining with mulch `rnl`. Right size for a Must-fix pop. Not a dump.

## Verification

Journal: green+strict PASS; throw/combat/zap cohort **8**/8 (seed0361 Scr 366/366; seed1800 throw; seed0060 kick; seed2200 zap). Private node **11**/11 (bare; worn helm `a_ac`; unworn pack; mask miss; `spe`/erosion; guarding −2 not `spe`; stack; `AC_MAX`; mhitm re-export). Public path **unhit**. Cadence still **#1305** on this SHA; full `sessions` ran on the next JS commit (`d3fac215` / #1310) and stayed **44**/44. Fortress holding is not proof of worn AC — admitted. Private tests that dress `minvent` **do** exercise the peel review 02 said the D-1041 suite missed.

Shared callee: melee `uhitm` and `mattackm` now use worn AC as C does. Cohort included combat/throw, not a dedicated monster-vs-monster session. Later cadence #1310 did not regress. Adequate for this locus.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. Review 02 item 1 is actually closed.

Named omits (map, not queue): `ball.c` / `mhitu.c` piercer / `muse.c` wand `find_mac` call sites still absent; hero `find_ac` lives in `u_init.js` not `do_wear.js` (body already includes HProtection). Remaining Must-fix **below** this review (leader `urole.questarti`, yname clones, …) are not regressions of `find_mac`.

Do not restore base-`data.ac`. Do not pop tut-1 or yname as a substitute while review 02 item 3 is still open.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `find_mac` now walks worn `minvent` with C’s `ARM_BONUS` / guarding −2 / `AC_MAX` cap, and the old base-`data.ac` stub is gone from every JS caller that already imported it.
