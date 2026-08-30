# Review 675 — 33cc30c0 — shk.c FullyUsedUp/PartlyUsedUp (D-1714)

## Metadata
- Full / short hash: `33cc30c040953d9df095939a11c8cafb2679e63e` / `33cc30c0`
- Parent: `4f0957ff` (D-1713). This file audits **this SHA only** (seventh of nine `js/` commits since review **668**). Archive **Addressed:** D-1714 `33cc30c0`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 06:34:14 +0200
- D-id: **D-1714**
- Stats: `js/shk.js` +181/−44 net in the hunk; `js/mkobj.js` +14/−1. Total `js/` insertions **150** <250. Band **150–350**.
- Claims to close: Open used-up `FullyUsedUp`/`PartlyUsedUp` (dummy on `billobjs`, itemize `quan < bquan` split). Not Traditional itemize ynq (next SHA). Not `bill_box_content` (D-1705). `reviews/loop-2026-08-15/` has no unpaid billobjs Must-fix.
- JS / map: `shk.js` itemize/billobjs; `mkobj.js` `obj_extract_self` ONBILL. `c-js-map/turns.md`.
- Prior: none written; D-1705 billed nested contents with `useup:!!dummy` and no dummy chain.

## Intent vs deliverable

Git subject promises: used-up shop items live on `billobjs` and itemize splits `quan<bquan`, instead of forcing FullyIntact with no dummy chain.

`node scripts/csym.mjs make_itemized_bill` → `shk.c:1543–1663`. `add_to_billobjs` `:3365–3383`. `add_one_tobill` `:3308–3363`. `sub_one_frombill` `:3660–3690`. `menu_pick_pay_items` headings `:1693–1713`. `update_bill` `:2169–2211` (`:2199–2201` ONBILL extract). `obj_extract_self` `mkobj.c:2585–2586`. Enum `billitem_status` `:22–29`. `bp_to_obj` already useup→`o_on(billobjs)` (D-1691).

```1578:1596:nethack-c/upstream/src/shk.c
        if (otmp->quan == 0L || otmp->where == OBJ_ONBILL) {
            otmp->quan = bp->bquan;
            bp->useup = TRUE;
        } else if (otmp->quan < bp->bquan) {
            ibill[n].obj = otmp;
            ibill[n].quan = bp->bquan - otmp->quan;
            ibill[n].cost = bp->price * ibill[n].quan;
            ibill[n].bidx = bidx;
            ibill[n].usedup = PartlyUsedUp;
            ++n;
        }
        if (otmp->where == OBJ_ONBILL) {
            quan = bp->bquan;
            cost = bp->price * quan;
            used = FullyUsedUp;
```

```3345:3358:nethack-c/upstream/src/shk.c
    if (dummy) {
        bp->useup = TRUE;
        add_to_billobjs(obj);
    } else
        bp->useup = FALSE;
    bp->price = get_cost(obj, shkp);
    if (obj->globby) {
        bp->price *= get_pricing_units(obj);
        newomid(obj);
        OMID(obj) = obj->owt;
```

Parent: dummy never `add_to_billobjs`; partial `sub_one_frombill` shrank `bquan` in place; itemize always FullyIntact; no used-up headings; extract skipped ONBILL. The diff **does** dummy/residual onto `game.billobjs` `OBJ_ONBILL`; itemize split + `FullyUsedUp=1`; headings + `paydoname` quan poke; pay extract+`OBJ_DELETED`; bill-full `You got that for free!`; globby `newomid`/`OMID`. It **does not** port Traditional itemize ynq. Named (D-1715). It **does not** port full `dealloc_obj` lights/lua/`objs_deleted`. Named `obfree`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `make_itemized_bill` | LIVE repaired | both used-up arms + prior container coalesce |
| `add_to_billobjs` | LIVE new local | C `:3365–3383`. Do **not** add #2 |
| `add_one_tobill` | LIVE | dummy→billobjs; now async for `You()` |
| `sub_one_frombill` | LIVE | residual `newobj` analogue |
| `menu_pick_pay_items` headings | LIVE | C `:1696–1713` |
| `update_bill` ONBILL | LIVE | extract + subset dealloc |
| `obj_extract_self` ONBILL | LIVE | `mkobj.c:2585–2586` then `where=OBJ_FREE` |
| `bp_to_obj` | LIVE | already useup→`billobjs` |
| `newomid` / `obj_stop_timers` | LIVE import | |
| `dealloc_obj_free` | CLONE subset | timed + `OBJ_DELETED`. Full `dealloc_obj` OMIT named (`mklev.js` already has a local — do **not** add #2) |
| Traditional itemize ynq | OMIT named | next SHA |
| `nextoid` / `copy_oextra` | OMIT named | dummy uses `next_ident` / `oextra=null` |

`node scripts/sym.mjs`:

```
add_to_billobjs  NOT EXPORTED — 1 LOCAL js/shk.js:2998
add_one_tobill   NOT EXPORTED — 1 LOCAL js/shk.js:3016
sub_one_frombill js/shk.js:652   sync
make_itemized_bill NOT EXPORTED — 1 LOCAL js/shk.js:4076
update_bill      NOT EXPORTED — 1 LOCAL js/shk.js:4234
obj_extract_self js/mkobj.js:2426   sync
newomid          js/mkobj.js:2697   sync
obj_stop_timers  js/mkobj.js:938   sync
bp_to_obj        NOT EXPORTED — 1 LOCAL js/shk.js:3942
dealloc_obj      NOT EXPORTED — 1 LOCAL js/mklev.js:1185  — do not add shk #2
```

Re-points: `shk.js` adds `newomid`, `obj_stop_timers` to the existing `mkobj.js` import. `--can js/shk.js js/mkobj.js newomid` / `obj_stop_timers` / `obj_extract_self`: **ALREADY**. No TDZ. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. `add_to_billobjs` `throw` is C `panic` analogue (not OBJ_FREE) — not a seed gate.

## C ↔ JS fidelity

**Dummy chain.** C `add_one_tobill` dummy: `useup=TRUE`, `add_to_billobjs` **before** `get_cost`, then globby `newomid`/`OMID=owt`, `unpaid=1`, `record_price_quote`. JS the same order. `bp_to_obj` useup walks `game.billobjs`. Parent never put the dummy there, so itemize `impossible("Can't find shop bill entry")`. **Match `:3345–3361`.** Unbilled: C `You("got that for free!")` then `dealloc_obj` if `OBJ_FREE`. JS `pline('You got that for free!')` then `dealloc_obj_free`. **Match the You string and the OBJ_FREE gate.** Full lights/lua queue named.

**Residual `sub_one_frombill`.** C `:3671–3680`: `newobj()`, struct copy, `oextra=0`, `bo_id = o_id = next_ident()`, `OBJ_FREE`, `quan = (bquan -= obj->quan)`, `owt=0`, `useup`, `add_to_billobjs`. JS `{...obj}` + the same field writes. **Match the residual, not nextoid.** `nextoid` named. `else if unpaid` `impossible` then clear: parent always cleared unpaid; JS now matches the `else if`. **Match `:3686–3689`.**

**Itemize split.** C restores quan on ONBILL/quan==0; else if `quan < bquan` emits **PartlyUsedUp** then falls through to intact **PartlyIntact**. ONBILL → FullyUsedUp (not container). Ordinary else PartlyIntact vs FullyIntact. JS the same two-step. `FullyUsedUp=1` so `sortbill_cmp` used-up-first matches C enum. `qsort` analogue `ibill.sort`. **Match `:1578–1647`.** No RNG here.

**Menu headings.** C `:1696–1713`: “Used up item(s):” if `ibill[0]<=PartlyUsedUp`; “Unpaid item(s):” at the used→intact boundary; poke `otmp->quan` around `paydoname`. JS the same `ibillct` plural tests. **Match.**

**Pay extract.** C `update_bill` `:2198–2201`: `unpaid=0`; if ONBILL `obj_extract_self` + `dealloc_obj`. JS extract (now understands ONBILL, sets `OBJ_FREE`) then `dealloc_obj_free` → `OBJ_DELETED`. **Match the extract; subset dealloc named.**

**Callee closure (used-up arms).** LIVE: `add_to_billobjs`, `bp_to_obj`, `add_one_tobill`, `sub_one_frombill`, `obj_extract_self`, `newomid`, `obj_stop_timers`, `get_cost`, `paydoname`, `record_price_quote`. CLONE: `dealloc_obj_free` (timed + `OBJ_DELETED` only). OMIT named: Traditional ynq; full `dealloc_obj`; `nextoid`; `copy_oextra`. STUB: **none** (no TODO no-op in a shipped arm). Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “used-up shop items live on billobjs and itemize splits quan<bquan”: **true** when dummy/residual actually run. D-log “full dealloc_obj is obfree Open”: **true** — `dealloc_obj_free` is not `mkobj.c` `dealloc_obj`. Do **not** stamp “Match C Traditional itemize ynq.” Do **not** stamp “Match C `nextoid`.” Do **not** stamp “Match C `copy_oextra`.” Do **not** add `add_to_billobjs` #2. Journal “fortress held” is not a used-up Ix proof.

## Density

§2b: one used-up bill envelope (dummy chain + residual + itemize split + headings + ONBILL extract). Related. +150. Traditional ynq left named — that is the next Open, not glued here.

## Verification

D-log / journal: save-oracle skip (untagged `make_itemized_bill`); canary residual dummy on billobjs + ONBILL extract; green+strict; focused seed0383; cohort 9/9. Public shop pay **is** hit. Used-up floorfood dummy **public-unhit**. Admit that. Canary is the chain check.

## Actionable C-wrongs

None for Must-fix. Named: Traditional itemize ynq (D-1715); mute/Deaf nod; `remote_burglary`; full `dealloc_obj` / `obfree`; `nextoid`; `copy_oextra`/`free_omid`; `Is_candle` on bill dummy. Do **not** add `dealloc_obj` #2 in `shk.js`. Do **not** restore `useup:!!dummy` without `add_to_billobjs`. Do **not** shrink `bquan` in place without a residual object. Do **not** force every row `FullyIntact`. Do **not** skip ONBILL in `obj_extract_self`.

Verdict: **ACCEPT-WITH-DEBT**
