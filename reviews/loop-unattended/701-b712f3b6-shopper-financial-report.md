# Review 701 — b712f3b6 — shk.c shopper_financial_report / shop_debt (D-1740)

## Metadata
- Full / short hash: `b712f3b69028e236de93f061f151f573ef79e4e7` / `b712f3b6`
- Parent: `58d159fb` (audit #2150 / reviews **696–700**). JS parent `3c4dafe8` (D-1739). This file audits **this SHA only** (first of nine `js/` commits since review **700**). Archive **Addressed:** D-1740 `b712f3b6`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 22:41:06 +0200
- D-id: **D-1740**
- Stats: `js/shk.js` +65/−0; `js/invent.js` +6/−5. Total `js/` insertions **71** <250. Band **150–350**.
- Claims to close: Open `shopper_financial_report` / `shop_debt` after D-1731 / review **692** (`$` stopped after wallet/stash; shop report named). Not `get_valuables`. Not dokick `hidden_gold(TRUE)`. `reviews/loop-2026-08-15/` has no unpaid shop-report Must-fix.
- JS / map: `shk.js` `shop_debt` + `shopper_financial_report`; `invent.js` `doprgold`. `c-js-map/turns.md`.
- Prior: **692** named `:4536` / `:989–1035` as omit. **681** named the same under `$`.

## Intent vs deliverable

Git subject promises: `$` reports shop credit and billed debit after the D-1731 wallet/stash lines, instead of omitting the two-pass `next_shkp` walk.

`node scripts/csym.mjs shop_debt` → `shk.c:989–999`. `--callers shop_debt`: prototype `:70`; empty-shop test `:1011`; owe line `:1030`. `shopper_financial_report` `shk.c:1002–1035`. `--callers shopper_financial_report`: **one** site, `invent.c:4536`. `doprgold` `invent.c:4502–4546`. `next_shkp` `shk.c:214–231`. `--callers next_shkp` includes `:1019–1020`. `shop_keeper` `shk.c:1051–1080`. `inside_shop` `shk.c:567–576`. `currency` `invent.c:1545–1554`. `s_suffix` `hacklib.c:344–359`. `shkname` `shknam.c:853–897`.

```989:999:nethack-c/upstream/src/shk.c
staticfn long
shop_debt(struct eshk *eshkp)
{
    struct bill_x *bp;
    int ct;
    long debt = eshkp->debit;

    for (bp = eshkp->bill_p, ct = eshkp->billct; ct > 0; bp++, ct--)
        debt += bp->price * bp->bquan;
    return debt;
}
```

Parent: `doprgold` commented the C call as a named omit. No `shop_debt`. The diff **does** add static `shop_debt` (debit + `price*bquan`) and async `shopper_financial_report` (empty-shop pline, two-pass xor, credit then owe), and `doprgold` awaits the export after wallet/stash. It **does not** port `costly_gold`, dokick `hidden_gold(TRUE)`, or `get_valuables`. Named. It **does not** re-point `rob_shop` onto `shop_debt` (C still uses `addupbill`+`debit` there). That **matches C’s caller split**.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `shop_debt` | LIVE local (static) | C `:989–999`; only this SHA’s reporter |
| `shopper_financial_report` | LIVE export async | C `:1002–1035`; invent.js awaits |
| `doprgold` call site | LIVE repaired | C `:4536` after wallet/stash |
| `next_shkp` | LIVE local | C `:214–231`; index walk ≡ `fmon`/`nmon` |
| `shop_keeper` | LIVE import | same file; angry `rile_shk` **deferred** (pre-existing comment) |
| `inside_shop` | LIVE | C-home `shk.js`; shknam.js clone is **not** this caller |
| `ESHK` | LIVE import | `const.js` |
| `currency` | LIVE import | invent.js D-1720 |
| `s_suffix` | verified CLONE | local `shk.js:228`; matches `hacklib.c:344–359` |
| `shkname` | LIVE import | shknam.js; Hallu `rn2` **named** in module header |
| `shtypes` / `SHOPBASE` | LIVE | shop-type name in credit line |
| `addupbill` | LIVE local (untouched) | `rob_shop` still C-shaped |
| `costly_gold` | OMIT named | |
| dokick `hidden_gold_kick` | OMIT named | |
| `get_valuables` | OMIT named | later D-1741; not this SHA |
| `rile_shk` price walk | OMIT named (pre-existing) | flag+peace only; not a silent stub in this arm’s new helpers |

`node scripts/sym.mjs`:

```
shopper_financial_report js/shk.js:4036   ASYNC — await required
shop_debt        NOT EXPORTED — 1 LOCAL  js/shk.js:4015
next_shkp        NOT EXPORTED — 1 LOCAL  js/shk.js:3979
shop_keeper      js/shk.js:254   sync
inside_shop      js/shk.js:727   sync
             !! ALSO 1 LOCAL CLONE  js/shknam.js:271
currency         js/invent.js:1158   sync
s_suffix         js/do_name.js:363   sync
             !! ALSO clones (shk.js:228 used here — do NOT write #2)
shkname          js/shknam.js:450   sync
addupbill        NOT EXPORTED — 1 LOCAL  js/shk.js:3996
ESHK             js/const.js:3093   sync
shtypes          js/shknam.js:165   sync
SHOPBASE         js/const.js:430   sync
```

No clone→import re-point. `--can invent.js shk.js shopper_financial_report`: **ALREADY** (static `unpaid_cost`/`obfree` edge). No new TDZ. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`shop_debt` (`:989–999`).** C `debt = debit` then `bill_p[0 .. billct)` `price * bquan`. JS `eshkp.debit | 0` then `bill_p || bill` with the same `ct` countdown. Hole `if (!e) continue` is the same guard `addupbill` already uses; C would dereference. **Match the sum.** `rob_shop` is **not** retargeted: C never calls `shop_debt` there. **Match that split.**

**Empty current shop (`:1010–1014`).** C `this_shkp = shop_keeper(inside_shop(u.ux,u.uy))`; `eshkp = this_shkp ? ESHK : 0`; if credit and debt are both 0, `You("have no credit or debt in here.")` then `this_shkp = 0` so the loop starts at pass 1. JS the same pline and `this_shkp = null`. Outside a shop, `inside_shop` returns `NO_ROOM`, `shop_keeper` is null, the if is skipped, pass starts at 1. **Match.**

```1002:1021:nethack-c/upstream/src/shk.c
    struct monst *shkp, *this_shkp = shop_keeper(inside_shop(u.ux, u.uy));
    ...
    if (eshkp && !(eshkp->credit || shop_debt(eshkp))) {
        You("have no credit or debt in here.");
        this_shkp = 0; /* skip first pass */
    }
    for (pass = this_shkp ? 0 : 1; pass <= 1; pass++)
        for (shkp = next_shkp(fmon, FALSE); shkp;
             shkp = next_shkp(shkp->nmon, FALSE)) {
            if ((shkp != this_shkp) ^ pass)
                continue;
```

**Xor (`:1021`).** Pass 0 keeps only `this_shkp`. Pass 1 skips it. After the empty-shop null-out, pass 1 still visits the current keeper but both `else if (shkp == this_shkp)` arms are false, so that shop stays silent while other shops still speak. JS `(shkp !== this_shkp) ^ pass` is bitwise 0/1, same as C. **Match the skip.**

**`next_shkp(fmon, FALSE)` (`:214–231`, `:1019–1020`).** C walks `nmon`, skips `DEADMONSTER`, takes `isshk && (billct || !withbill)`, then angry `rile_shk`. JS index walk from `0` with `nextIdx: i+1` is the array analogue of `shkp->nmon`. `withbill` is false, so billct-0 keepers are included. Dead `mhp < 1`. **Match the walk.** `rile_shk` here sets peace/surcharge only; C also `(price+2)/3` bumps. That price walk is **pre-existing** on `rile_shk` / `shop_keeper` (“deferred”), named in the shk.js header / `shop_keeper` comment — not a new silent stub invented in `shop_debt`. Do **not** treat `$` as the first Must-fix for surcharge math.

**Credit then owe (`:1024–1033`).** C credit `You("have %ld %s credit at %s %s.", amt, currency(amt), s_suffix(shkname(shkp)), shtypes[shoptype-SHOPBASE].name)` else current-shop “no credit in here.” Then `shop_debt`; non-zero `You("owe %s %ld %s.", shkname, amt, currency)` else current-shop “don't owe any gold here.” JS template strings match those four lines. Local `s_suffix` matches C `it`/`you`/`s`/`'s`. `currency` is D-1720. `shkname` strips a non-letter prefix; C Hallu `rn2` over `shtypes[].shknms` is **named** (`Hallu shkname`). **Match the sober strings.** RNG: none in `shop_debt` / the reporter itself; Hallu `shkname` would `rn2` in C and is omitted by name.

**`doprgold` (`:4536`).** C always calls after the verbose/non-verbose wallet/stash pline and **before** `umoney && menu_requested` `dispinv_with_action("$", FALSE)`. JS `await shopper_financial_report()` at that slot. **Match call order.** D-1731 wallet/stash / m-prefix are unchanged.

**Callee closure (`shopper_financial_report`).** LIVE: `shop_keeper`, `inside_shop`, `ESHK`, `shop_debt` (body ports C), `next_shkp`, `currency`, `shkname`, `shtypes`, `pline`. CLONE: `s_suffix` (verified). OMIT named: `costly_gold`; dokick `hidden_gold_kick`; `get_valuables`; Hallu `shkname`; `rile_shk` price bump. STUB in this arm’s new helpers: **none**. Review **692** named omit is now LIVE. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “$ reports shop credit and billed debit after wallet/stash”: **true**. D-log two-pass xor / empty-shop `this_shkp=0` / debit+bill: **true**. Do **not** stamp “Match C `costly_gold`.” Do **not** stamp “Match C dokick `hidden_gold(TRUE)`.” Do **not** stamp “Match C `get_valuables`.” Do **not** stamp “Match C Hallu `shkname` `rn2`.” Do **not** stamp “Match C `rile_shk` bill `(price+2)/3` on `$`.” Journal “fortress held” is not a billed-shop `$` screen proof. Public `$` with shop credit/debt is **thin**; canary was node empty / debit+bill / credit `s_suffix` / pass 1 / outside / DEADMONSTER. Admit public-unhit.

## Density

§2b: C `shopper_financial_report` + static `shop_debt` + the one C caller. +71. Did not glue `get_valuables` / dokick kick-gold. Did **not** reopen D-1731 `hidden_gold` or D-1720 `currency`.

## Verification

D-log: save-oracle skip (untagged `shk.c:shopper_financial_report`); node empty / debit+bill 110 / credit `s_suffix` shoptype / other-shop pass 1 / outside billed / pass order / DEADMONSTER skip / `doprgold` wallet then owe; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Shop-credit `$` **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the `$` shop-report arm matches C; surcharge price bump / Hallu `shkname` were already named). Named: `costly_gold`; dokick `hidden_gold_kick`; botl/detect/insight/topten/u_init `hidden_gold`; `end.c` `get_valuables` (next Open at the time); Hallu `shkname`; `shop_keeper`/`rile_shk` price walk. Do **not** add `shop_debt` #2. Do **not** add `s_suffix` #9. Do **not** import shknam’s `inside_shop` here (wrong file). Do **not** retarget `rob_shop` onto `shop_debt`. Do **not** skip pass 1 after the empty-shop pline. Do **not** re-port D-1731 / D-1720.

Verdict: **ACCEPT-WITH-DEBT**
