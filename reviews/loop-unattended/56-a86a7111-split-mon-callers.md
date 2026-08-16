# Review 56 — a86a7111 — rust / `minliquid` / uhitm AD_COLD `split_mon` (D-1095)

## Metadata
- Full / short hash: `a86a7111527bbb2a2e9f0539bf799e22e60ae2f9` / `a86a7111`
- Parent: `46775b20` (D-1094). JS-touching since last dedicated review file creation (`685625fb`): D-1093, D-1094, **this SHA**, D-1096. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 18:15:05 +0200
- D-id: **D-1095**
- Stats: 16 files, +161 / −62 — `js/mon.js` +47 (`healmon` + minliquid gremlin arm); `js/trap.js` +13 / −6 (rust hero+monster split); `js/uhitm.js` +15 / −7 (AD_COLD healmon+split).
- Claims to close: Open queue `potion.c` `split_mon` trap rust / `minliquid` / uhitm AD_COLD callers (named from D-1078). Not sit clone_mon. Stamped **Addressed:** D-1095 `a86a7111` on the archive row (filled by D-1096). Review **39** named omit 1 still unstamped until this review commit.
- JS / map: `trap.js` / `mon.js` / `uhitm.js`; `split_mon` stays `sit.js` (potion/eat cycle; D-1078). `c-js-map/data.md` trap/sit/mon rows. drown gremlin (`trap.c:5088`), `mhitu` `passiveum`, mhitm AD_COLD, cmd `#polyself` still named. `healmon` youmonst `healup` named.
- Prior reviews this SHA claims to close: **39** named omit (call sites after `clone_mon` shipped).

## Intent vs deliverable

Git subject promises: “Match C trap.c/mon.c/uhitm.c so rust, minliquid, and passive cold actually call split_mon.”

D-1078 ported `clone_mon` and sit `split_mon` else; rust still burned `rn2(3)` then no-op; minliquid drowned pool gremlins; AD_COLD burned `rn2(2)` inside a `void` without `healmon`.

The diff **does** those three C sites plus the `healmon` monster arm AD_COLD needs: rust hero `split_mon(&youmonst, NULL)` and monster `split_mon(mtmp, NULL)` after `rn2(3)`; minliquid gremlin `(inpool || infountain) && rn2(3)` → `split_mon` then `dryup(..., FALSE)` on success, pool `water_damage_chain`, `return 0`; AD_COLD `healmon((tmp+rn2(2))/2, (tmp+1)/2)` then `split_mon(mon, youmonst)` when `mhpmax > (m_lev+1)*8`. Dynamic `import('./sit.js')` is the existing cycle workaround, not a second clone.

It does **not** wire drown (`trap.c:5088`), `mhitu.js:1300` `split_mon(&youmonst, mtmp)`, mhitm AD_COLD, or cmd polyself. Named. It does **not** port minliquid iron-golem `d(2,6)` / steed Flying. Named. It does **not** replace AD_COLD `losehp` with `mdamageu`, nor add `shieldeff`/`ugolemeffects` on `Cold_resistance`. Pre-existing named on that arm; this SHA only replaced the heal/split no-op.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `trapeffect_rust_trap` gremlin split | C body, **retouched** | `trap.c:1652–1653` / `1719–1720` |
| `minliquid` gremlin arm | C body, **retouched** | `mon.c:987–992` |
| `healmon` monster arm | C body, **new** | `mon.c:4596–4613`; youmonst `healup` named |
| uhitm `passive` AD_COLD heal/split | C body, **retouched** | `uhitm.c:6078–6082` |
| `split_mon` | **clone** of `potion.c`, **imported** | `sit.js`; D-1078 ACCEPT; not a stub |
| `clone_mon` | C callee inside split | `makemon.js`; D-1078 |
| `dryup` / `water_damage_chain` | C callees, **imported** | real; wizard yn still deferred until D-1096 |
| drown / mhitu / mhitm / cmd split | C other callers, **named omit** | still comments / absent |
| `mdamageu` / `ugolemeffects` / `shieldeff` | C AD_COLD siblings, **named omit** | pre-existing on this arm |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Dynamic `import()` is ESM, not `fs`.

## Constitution / playbook

Grep of the three JS hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. `PM_GREMLIN` is `monsterNames.indexOf`, not a seed mndx. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Rust — `rn2(3)` then split, both sides

C hero `trap.c:1647–1653`: iron-golem rust death **else if** `u.umonnum == PM_GREMLIN && rn2(3)` → `split_mon(&gy.youmonst, NULL)` (void). JS `2659–2664`: same else-if after iron-golem; `await split_mon(game.youmonst, null)`. Sit hero arm is `cloneu` (`potion.c:2886–2898`). Match. `rn2(3)` already burned before this SHA; now the callee runs.

C monster `1712–1720`: `completelyrusts` death **else if** `mptr == &mons[PM_GREMLIN] && rn2(3)` → `split_mon(mtmp, NULL)`. JS `2746–2751`: `(mptr?.mndx ?? -1) === PM_GREMLIN` analog of pointer identity (cham’d form uses current `data.mndx`). Match. Return `Trap_Effect_Finished` unchanged.

`rn2(5)` aim switch and `water_damage` / `splash_lit` run **before** the gremlin test in both trees. Split does not skip rust on armor. Iron-golem death takes the `if` so a rusting golem never `rn2(3)`s for split — C `else if`. Hero `update_inventory` after the switch is still named omit (`trap.c:1645`). Lantern dunk in `splash_lit` named. This SHA only replaced the deferred comment after `rn2(3)` hit.

### `minliquid` — split **before** lava; `rn2(3)==0` falls through

C `mon.c:967–992`: compute `inpool` / `inlava` / `infountain`; steed Flying return; then

```
    if (mtmp->data == &mons[PM_GREMLIN] && (inpool || infountain) && rn2(3)) {
        if (split_mon(mtmp, (struct monst *) 0))
            dryup(mtmp->mx, mtmp->my, FALSE);
        if (inpool)
            water_damage_chain(mtmp->minvent, FALSE);
        return 0;
    } else if (iron golem …)
```

JS `1126–1144`: same predicates (`IS_FOUNTAIN(typ)` ≡ C `IS_FOUNTAIN(levl[].typ)`); steed still named skip; gremlin `&& rn2(3)` then split / dryup-if-truthy / pool `water_damage_chain` / `return 0`. `dryup` on a **pool** tile no-ops (`!IS_FOUNTAIN`). Fountain dries. Match.

When `rn2(3)` is 0, C does **not** enter the arm (`else if` iron-golem fails for a gremlin) and continues to lava/pool death. JS skips the arm and hits `if (inlava)` then the existing pool drown. Same control: failed multiply still drowns. `split_mon` false (`mhp<=1` / extinct / `enexto` fail) still `water_damage_chain` if pool and still `return 0` — C same (`if (split_mon)` only guards `dryup`).

`healmon` is not on this path. No extra `d`/`rnd`. One `rn2(3)` like C.

`water_damage_chain(mtmp.minvent, false)` is `trap.js:4219` (C `trap.c` same name). Second arg `here=FALSE` matches C. Iron-golem `d(2,6)` still named: a gremlin that failed `rn2(3)` does **not** take that arm in either tree. Steed Flying still skipped: `u.usteed` in a pool would be subject to the gremlin arm if the steed were a gremlin (pathological); C returns 0 earlier when `Flying||Levitation`. Named.

`IS_WATERWALL` is still computed (`mon.js:1125`) and unused on the new arm — C uses it only in the steed gate. Harmless leftover.

### `healmon` + AD_COLD

C `mon.c:4596–4613`:

```
    if (mtmp == &gy.youmonst) {
        int oldhp = Upolyd ? u.mh : u.uhp;
        healup(amt, 0, 0, 0);
        return (Upolyd ? u.mh : u.uhp) - oldhp;
    } else {
        int oldhp = mtmp->mhp;
        if (mtmp->mhp + amt > mtmp->mhpmax + overheal) {
            mtmp->mhpmax += overheal;
            mtmp->mhp = mtmp->mhpmax;
        } else {
            mtmp->mhp += amt;
            if (mtmp->mhp > mtmp->mhpmax)
                mtmp->mhpmax = mtmp->mhp;
        }
        return mtmp->mhp - oldhp;
    }
```

JS `mon.js:1097–1109` implements the **else** arm (`|=0` on ints). youmonst returns **0** without `healup` — named. AD_COLD calls `healmon(mon, …)` on the mold/jelly, not `youmonst`. Match for the caller. Negative `amt`/`overheal` are forbidden in C comments; JS does not clamp — AD_COLD passes non-negative `(tmp+rn2(2))/2` and `(tmp+1)/2` when `tmp` is the cold damage. Match on this caller.

C `uhitm.c:6067–6082`: `monnear`; `Cold_resistance` → shieldeff / You_feel / monstseesu / `ugolemeffects` / **break**; else monstunseesu / “very cold” / `mdamageu` / `healmon((tmp+rn2(2))/2, (tmp+1)/2)` / split if `mhpmax > (m_lev+1)*8`.

JS `1017–1031`: `monnear`; `Cold_resistance` → pline + **break** (no shieldeff / ugolemeffects — pre-existing); “very cold”; `losehp` not `mdamageu` (pre-existing); then this SHA’s `healmon(Math.trunc((tmp+rn2(2))/2), Math.trunc((tmp+1)/2))` and the mhpmax gate. For **positive** `tmp`, trunc-div matches C toward-zero `/`. One `rn2(2)` like C. Split attacker is `game.youmonst` → sit heat reason `" from your heat"` (`potion.c` `the_your[1]`). Match for heal/split. Resistance/damage callees stay named omits of the **arm**, not of this SHA’s claim.

`split_mon` on a monster gremlin is the D-1078 else (`clone_mon` + half both max). Not a stub. Review **39** already walked that callee.

`clone_mon` luck `rn2` still only when `!mon_moving && mpeaceful` (D-1078). Rust/minliquid/AD_COLD on a hostile gremlin skip that `rn2`. Sit hero rust uses `cloneu`, which has its own HP split and no luck `rn2`. Call-for-call on a hostile monster gremlin: `rn2(3)` (caller) then occupancy/`enexto` (no luck). C same.

## Hallucinations / overclaim

“Match C so rust, minliquid, and passive cold actually call split_mon” is **true for those three call sites and for `healmon`’s monster arm.** It is **not** true that drown/`mhitu`/mhitm split, that AD_COLD `Cold_resistance` flashes `shieldeff`, that `mdamageu` ran, or that `healmon(youmonst)` heals.

This is **not** “Match C dispatch, callee is a stub.” `split_mon`/`clone_mon` shipped in D-1078; this SHA wires C callers. Stamping **Addressed:** D-1095 is fair. Hash `a86a7111` is on the archive row (filled by D-1096). Stamp review **39** item 1 in this review commit.

## Density (§2b)

One Open cluster: the three callers D-1078 named, plus `healmon` the AD_COLD site needs. Three files that already imported each other / sit. ~70 executable lines. Right size — not “finish combat.” Drown/mhitu left named on purpose (different functions).

## Verification

Journal: private canary **6**/6 (pool split 20→10/10; rust mintrap split; `healmon` 4/2 and cap; AD_COLD heal/split; fountain gremlin does not drown); green+strict seed8000/0900; cohort **15**/15 + strict 0014/0360/4500/2200. Path **public-unhit**. Green+cohort is regression cover for trap/mon/uhitm, not a public gremlin-split proof. Cadence **#1395** **44**/44.

C read of `trap.c:1647–1721` / `5088–5089`, `mon.c:961–992` / `4596–4614`, `uhitm.c:6066–6083`, `potion.c` split via sit; JS `trap.js:2659–2664` / `2746–2751`, `mon.js:1097–1144`, `uhitm.js:1017–1031`, `sit.js:1001–1031`; hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| rust hero gremlin `rn2(3)` hit | `cloneu` split | **same** |
| rust `rn2(3)` miss | no split | **no split** |
| pool gremlin `rn2(3)` hit | split, no dryup, water_damage, live | **same** |
| fountain gremlin hit | split + `dryup` | **same** |
| gremlin `rn2(3)==0` in pool | fall through → drown | **same** |
| AD_COLD heal then `mhpmax>(lev+1)*8` | split vs youmonst | **same** |
| `healmon`  old 10, amt 4, over 2, max 10 | max 12, hp 12 | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The three callers invoke the D-1078 `split_mon` at C’s branch position with C’s `rn2`/`healmon` arithmetic.

Named omits / do-nots (map / Open, not Must-fix):

1. drown `split_mon(&youmonst)` (`trap.c:5088`); `mhitu` `passiveum`; mhitm AD_COLD; cmd polyself.
2. minliquid iron-golem `d(2,6)`; steed Flying/Lev; `healmon` youmonst `healup`.
3. AD_COLD `shieldeff` / `ugolemeffects` / `mdamageu` (pre-existing arm). Heat `s_suffix(mon_nam)` still `"its"`.

Do not restore rust/`minliquid`/AD_COLD no-ops. Do not skip `healmon` and only split. Do not `import { sticks } from './monmove.js'` for this. Wizard `dryup` yn **Addressed:** D-1096 `bd16c130` (next SHA).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: rust, minliquid, and uhitm AD_COLD now call the D-1078 `split_mon`/`healmon` at C’s gates instead of burning `rn2` and returning, while drown/`mhitu` stay named.
- Must-fix stays empty for this SHA; next Open after D-1096 is still `kill_eggs`.
