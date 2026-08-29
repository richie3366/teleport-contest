# Review 649 — ac894764 — shk.c cheapest_item early return (D-1688)

## Metadata
- Full / short hash: `ac8947645b0fc313beb66bbff495a8283f484fcd` / `ac894764`
- Parent: `bad8cbd6` (D-1687). This file audits **this SHA only** (fifth of nine `js/` commits since review **644**). Archive **Addressed:** D-1688 `ac894764`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 22:40:57 +0200
- D-id: **D-1688**
- Stats: `js/shk.js` +59/−16. Total `js/` insertions **59** <250. Band **150–350**.
- Claims to close: Open `cheapest_item` after D-1684 via_menu / D-1687 Traditional. Not Traditional itemize yn (that is `dotypeinv`, already D-1687). Not `buy_container`. `reviews/loop-2026-08-15/` has no unpaid cheapest Must-fix.
- JS / map: `shk.js` `cheapest_item` / `pay_billed_items` / `dopay`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **637** / **645** named `cheapest_item` (not canned invlet). **648** named cheapest as not-this-iter.

## Intent vs deliverable

Git subject promises: `pay_billed_items` refuses the shop menu when cash+credit cannot cover the cheapest billed entry, instead of always opening `menu_pick_pay_items` after D-1684.

`node scripts/csym.mjs cheapest_item` → `shk.c:1521–1539`. `--callers`: prototype `:87`; `pay_billed_items` `:2073`. `pay_billed_items` `:2042–2167` no-gold `:2060–2064`; more_than_one `:2066–2072`; cheapest `:2073–2079`. Caller `dopay` `:2003–2007` with `stashed_gold = (hidden_gold(TRUE) > 0)` `:1752`. Enum `UndisclosedContainer = 6` `:22–28`.

```1521:1538:nethack-c/upstream/src/shk.c
cheapest_item(int ibillct, Bill *ibill)
{
    int i;
    long gmin = ibill[0].cost;
    for (i = 1; i < ibillct; ++i)
        if (ibill[i].cost < gmin)
            gmin = ibill[i].cost;
    return gmin;
}
```

```2060:2079:nethack-c/upstream/src/shk.c
    umoney = money_cnt(gi.invent);
    if (!umoney && !eshkp->credit) {
        You("%shave no gold or credit%s.",
            stashed_gold ? "seem to " : "", *paid_p ? " left" : "");
        return TRUE;
    }
    ...
    if ((umoney + eshkp->credit) < cheapest_item(ibillct, ibill)) {
        You("don't have enough gold to buy%s the item%s %s.",
            more_than_one ? " any of" : "", plur(more_than_one ? 2 : 1),
            (ebillct > 1) ? "you've picked" : "on your bill");
        if (stashed_gold)
            pline("Maybe you have some gold stashed away?");
        return TRUE;
    }
```

Old JS: flat “no gold or credit”; then always via_menu (D-1684). `cheapest_item` NOT FOUND. The diff **does** min `ibill[].cost`, the no-gold You() with stashed/` left`, more_than_one, and passes `ibillct` / `stashed_gold` / live `paid` into `pay_billed_items`. It **does not** port Traditional `yn_function("Itemized billing?")` or `buy_container`. Named those.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `cheapest_item` | C `:1521–1539`, **LIVE this SHA** | min cost; one local |
| `pay_billed_items` no-gold / cheapest | C `:2060–2080`, **LIVE this SHA** | |
| `UndisclosedContainer` | C `:28`, **LIVE this SHA** | more_than_one; make_itemized never sets it |
| `hidden_gold(TRUE)` | C `:1752`, **LIVE** (pre-existing) | `stashed_gold` |
| `money_cnt` | C `:2060`, **LIVE** (pre-existing clone) | do not add #7 |
| `plur` | C hacklib, **CLONE** (local shk.js) | `"s"` when n!==1 |
| via_menu `menu_pick_pay_items` | C `:2093`, **LIVE** D-1684 | not rewritten |
| Traditional itemize yn | C `:2099–2105`, **OMIT named** | |
| `buy_container` | C `:2127`, **OMIT named** | |
| `make_itemized_bill` containers | **OMIT named** (pre-existing) | FullyIntact invent only |

RNG: none in `:1521–1539` / `:2060–2080`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
cheapest_item    NOT EXPORTED — 1 LOCAL js/shk.js:4081
             => Do NOT write clone #2.
pay_billed_items NOT EXPORTED — 1 LOCAL js/shk.js:4098
             => Do NOT write clone #2.
hidden_gold      NOT EXPORTED — 3 LOCAL CLONE(S) in end.js / shk.js / vault.js
             => Do NOT write clone #4.
money_cnt        NOT EXPORTED — 6 LOCAL CLONE(S)
             => Do NOT write clone #7.
make_itemized_bill NOT EXPORTED — 1 LOCAL js/shk.js:3953
             => Do NOT write clone #2.
```

No new import edge. Do **not** add `cheapest_item` #2. Do **not** add `hidden_gold` #4.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**`cheapest_item`.** C `gmin = ibill[0].cost` then `i=1..ibillct-1` min. JS the same (`ibill[0]?.cost|0` only if the array is empty — `dopay` only calls when `billct`; empty gmin 0 ≡ C zerosbi). **Match `:1521–1538`.** Walks `ibill[].cost` (already split), not `bill_p`. **Match the 5.0 comment.**

**No-gold You().** C `seem to ` if stashed; `" left"` if `*paid_p` (debit already paid this `dopay`). JS `stashed_gold` / `paidRef.paid`. `dopay` now passes `{ paid }` not `{ paid: false }`. **Match `:2060–2064` and `:2006`.**

**more_than_one.** C `ebillct>1 || otmp->quan < bp->bquan || ibill[0].usedup==UndisclosedContainer`. JS the same with `UndisclosedContainer===6`. `make_itemized_bill` still only pushes FullyIntact and skips `Has_contents` — the container arm of more_than_one stays dead until that omit is ported. `quan < bquan` and `ebillct>1` still live. **Match the live terms.**

**Cheapest refuse.** C `(umoney+credit) < cheapest` → “don't have enough gold to buy[ any of] the item[s] {you've picked|on your bill}”; stashed maybe-hidden pline; `return TRUE` (does **not** open the menu). JS `plur(more_than_one?2:1)` local ≡ C `"s"` when n!==1. **Match `:2073–2079`.** Then via_menu is D-1684. **Match order.**

Callee closure (early-return arm). LIVE: `money_cnt`, `cheapest_item`, `hidden_gold` (caller), `bp_to_obj`, `plur`. CLONE: `cheapest_item` is the C static (one local). OMIT named: Traditional yn, `buy_container`, container ibill rows. STUB: **none**. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject “refuses the shop menu when cash+credit cannot cover the cheapest billed entry”: **true**. D-log “no-gold You() stashed / left”: **true**. Do **not** stamp “Match C Traditional itemize.” Do **not** stamp “Match C `buy_container`.” Do **not** stamp “Match C `make_itemized_bill` KnownContainer / used-up split.” Private canary (min cost; refuse vs menu; stashed/` left`) is the right split. Public-unhit for unpaid shop pay.

## Density

+59: one C function plus the caller’s two early returns. §2b. Did not glue doengrave.

## Verification

Wired: min `ibill[].cost`; no-gold seem-to/` left`; cheapest refuse + stashed pline; `ibillct` loop bound. Unwired C: Traditional yn; `buy_container`; container usedup on ibill[0]. Conf: no `rn2`. No seed gate.

Journal: private canary **15**/15; green+strict seed8000/0900; cohort **7**/7 + strict. Public suite does not hit unpaid `#pay` cheapest.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): Traditional itemize yn / `menu_requested`; `buy_container`; `make_itemized_bill` used-up/container split; `shk_names_obj` makeknown. Do **not** add `cheapest_item` #2. Do **not** restore `pay_take_canned_billed`. Do **not** re-port D-1687 `dotypeinv`.

Verdict: **ACCEPT-WITH-DEBT**
