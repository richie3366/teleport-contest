# Review 124 — d24ff150 — teleport.c `rloc_to` minvent `stolen_value` (D-1163)

## Metadata
- Full / short hash: `d24ff150d843d2c9f6bb9b4c8329c25c6c52aac9` / `d24ff150`
- Parent: `38353d8a` (D-1162). This file audits **this SHA only**. Archive row **Addressed:** D-1163 `d24ff150` was filled by D-1164.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 15:36:43 +0200
- D-id: **D-1163**
- Stats: 11 files, +144 / −50 — `js/teleport.js` +42 / −5 (`rloc_maybe_minvent_shop_bill`); `js/shk.js` +7 / −3 (export `onshopbill`; import `Norep`).
- Claims to close: Open queue `teleport.c` `rloc_to` minvent shop bill (named). Not shk-home. Review **121** named shop bill. `reviews/loop-2026-08-15/` has no open stolen_value-rloc Must-fix.
- JS / map: `teleport.js` `rloc_to` / `rloc_to_flag`; `shk.js` `stolen_value` / `onshopbill` / `find_objowner` / `costly_spot`. `c-js-map/turns.md` `teleport.c`. occupation / `rloco` object bill still named (`mintrap` shipped D-1164).
- Prior reviews this SHA claims to close: **121** named shop bill; D-1162 next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core so a monster that teleports out of a shop with billed minvent runs stolen_value, instead of leaving no_charge and the bill untouched.”

Old JS after angry had no minvent shop walk. C `rloc_to_core` (`teleport.c:1742–1758`) after angry: `if (minvent && !costly_spot(dest))` find origin shk via `find_objowner(minvent, oldx, oldy)`; `peaceful = !shkp \|\| shkp->mpeaceful`; for each carried object: `no_charge` → clear; else if `shkp && onshopbill(otmp, shkp, TRUE)` → `stolen_value(otmp, oldx, oldy, peaceful, FALSE)`. Shop-to-shop dest stays costly: no_charge and the first shk’s bill stick. Unpaid-not-on-bill is ordinary (shk does not notice).

The diff **does** that walk after angry (silent `rloc_to`; after appear+angry in `rloc_to_flag`). Exports `onshopbill`. Imports `Norep` for `stolen_value`’s already-ported angry thief arm. It does **not** pull occupation / `mintrap` / `rloco` object bill.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc_maybe_minvent_shop_bill` | C inline, **wrapper** | `teleport.c:1748–1758` |
| `costly_spot` | C callee, **imported** | `shk.c:5350+`; dest gate |
| `find_objowner` | C callee, **imported** | `shk.c:1084–1115`; minvent **head** + origin xy |
| `onshopbill` | C callee, **exported wrapper** | `shk.c:1160–1163` → `onbill` |
| `onbill` | C callee, **pre-existing** | `shk.c:1136–1155`; `o_id` vs `bill_p` |
| `stolen_value` | C callee, **imported** | `shk.c:3754–3871`; debit/robbed/Norep/`angry_guards` |
| `Norep` | C callee, **import fix** | angry thief boom; was missing in `shk.js` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean.

**New RNG on this path:** none in the rloc walk itself. `stolen_value` has no `rn2` on the billed debit/robbed arms. `get_cost` / container walks are pre-existing. Path **public-unhit** on billed-minvent rloc out of shop.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates. Origin `(oldx,oldy)` is pickup coords, not a traced cell.

## Constitution / playbook

Grep of this SHA’s `js/` hunks: no trace-index gates. Do not clear `no_charge` when dest is still `costly_spot` (shop-to-shop). Do not call `stolen_value` for unpaid-not-on-bill. Do not find the owner from dest xy. Do not pull occupation / `mintrap` into this peel.

## C ↔ JS fidelity

### Walk vs `teleport.c:1748–1758`

C:

```
if (mtmp->minvent && !costly_spot(x, y)) {
    shkp = find_objowner(mtmp->minvent, oldx, oldy);
    peaceful = !shkp || shkp->mpeaceful;
    for (otmp = mtmp->minvent; otmp; otmp = otmp->nobj) {
        if (otmp->no_charge)
            otmp->no_charge = 0;
        else if (shkp && onshopbill(otmp, shkp, TRUE))
            stolen_value(otmp, oldx, oldy, peaceful, FALSE);
    }
}
```

JS `rloc_maybe_minvent_shop_bill`: same early returns (`!minvent`; dest `costly_spot`); same `find_objowner(minvent, oldx, oldy)`; same once-captured `peaceful`; same `no_charge` beats bill; `onshopbill(..., true)`; `stolen_value(..., false)`. Match.

Shop-to-shop: dest costly → return, no_charge sticks. Same-shop dest: costly → skip. Corridor / shk home (`costly_spot` false when on `eshk.shk` square): walk runs. Match C comment `:1746–1747`.

`no_charge` and `onshopbill` are if/else: a no_charge object on the bill is cleared, not stolen. C same.

Resident shk who just ran `make_angry_shk`: C `setpaid` already zeroed `billct`, so `onshopbill` is false here; billed totals were supposed to be in `robbed` via `addupbill` (named 0 — review **123**). This walk is the **non-shk** carrier path. Do not treat addupbill as a miss of D-1163.

C `stolen_value` peaceful vs angry (`shk.c:3818–3870`): peaceful `check_credit` then `ANGRY` → `robbed` else `debit`, `You owe`; else `robbed += value`, `Norep` thief boom / “Thief!”, `hot_pursuit`, `angry_guards(FALSE)`. JS inlines `check_credit` plines then the same debit/robbed split. `silent=FALSE` from rloc is C.

### `stolen_value` is not a stub

`shk.c:3754–3871` / `shk.js:2039–2158`: `find_objowner` again per object; `billable`; on-bill `sub_one_frombill`; coin vs `get_cost`; peaceful credit then debit/robbed; `You owe`; else `Norep` thief + `hot_pursuit` + `angry_guards`. JS matches that envelope. `silent=FALSE` from rloc means the hero is blamed — that is C (`:1743` “blame it on the hero”), not a JS invention.

`Norep` import: the angry arm already called `Norep`; without the import that arm would throw if a non-peaceful shk owned the bill. Supporting fix, not a new body.

`onshopbill` export is `!!onbill(...)`. C `:1160–1163`. `onbill` walks `bill_p` by `o_id`. Real.

### `find_objowner` uses the minvent **head**

C passes `mtmp->minvent` (first object) plus origin xy. JS same. Owner is not re-found per later stack object except inside `stolen_value`. Match.

## Hallucinations / overclaim

D-log / CURRENT / subject say a monster that teleports out of a shop with billed minvent runs `stolen_value` instead of leaving `no_charge` and the bill untouched. **That is the hunk:** dest `!costly_spot` walk + imported callees. Stamping **Addressed:** D-1163 is fair for the Open **bill** line. Hash `d24ff150` is on the archive row (filled by D-1164). Do **not** stamp it as “Match C `rloco` object bill” or “unpaid-not-on-bill now charges.” This is **not** “Match C dispatch, callee is a stub”: `stolen_value` / `onbill` / `costly_spot` / `find_objowner` are live.

## Density

One C block after angry. ~30 JS lines + export/`Norep`. Thin vs §2b; queue item is exactly that walk. Not QUALITY-RISK for thinness under “do not combine items.”

## Verification

Journal: private canary **44**/44 (billed debit; no_charge clear; shop-to-shop stick; same-shop skip; ordinary unpaid; no minvent; same-cell; corridor; shk-home; chain; no_charge-beats-bill; angry robbed; flag; null; migrating; credit; two billed); green+strict seed8000/0900; cohort **41**/41 + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002. Path **public-unhit** on billed-minvent rloc out of shop.

C read of `teleport.c:1742–1758`, `shk.c:1084–1163`, `:3754–3871`; JS SHA walk + `stolen_value` / `onshopbill`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1480**) **44**/44.

| Case | C | JS after |
|------|---|---------|
| dest costly | skip walk | **same** |
| `no_charge` | clear, no steal | **same** |
| on bill | `stolen_value` | **same** |
| unpaid not on bill | no notice | **same** |
| `peaceful` once | from origin shk | **same** |
| `silent` | FALSE (hero blamed) | **same** |
| shop-to-shop | stick | **same** |
| after angry `setpaid` | billct 0 → no onbill | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open minvent walk matches `teleport.c:1748–1758`. `stolen_value` is the real C function.

Named omits / do-nots (map / Open, not Must-fix):

1. occupation `dochugw` (`teleport.c:1761–1763`) — between bill and mintrap; named.
2. `rloco` object shop bill (`teleport.c:2177`).
3. Do not clear `no_charge` on shop-to-shop. Do not `stolen_value` unpaid-not-on-bill. Do not find owner from dest xy.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `rloc_to` now walks minvent after angry when dest is not costly, clearing `no_charge` or running the real `stolen_value` for `onshopbill` items.
- Must-fix stays empty for this SHA; next port in this window popped Open trapped `mintrap`. **Addressed:** D-1163 `d24ff150`. Not `rloco`.
