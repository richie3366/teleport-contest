# Review 663 — c7648ccf — shk.c buy_container named-container pay (D-1702)

## Metadata
- Full / short hash: `c7648ccfc47a0400f5df5aa8afb400333c2f112b` / `c7648ccf`
- Parent: `f7a10b6f` (D-1701). Tenth of fifteen `js/` commits since **653**. Archive **Addressed:** D-1702 `c7648ccf`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 04:01:20 +0200
- D-id: **D-1702**
- Stats: `js/shk.js` +349/−64; `js/objnam.js` +22/−5. Total `js/` insertions **371** >250. Band **200–450**.
- Claims to close: Open `buy_container` after D-1688 skipped `Has_contents` in `make_itemized_bill`. Not `bill_box_content` (pickup). Not Traditional itemize yn. `reviews/loop-2026-08-15/` has no unpaid shop-container Must-fix.
- JS / map: `shk.js` `buy_container` / `make_itemized_bill` / `pay_billed_items`; `objnam.js` `paydoname`. `c-js-map/turns.md`.
- Prior: D-1688 `cheapest_item`; **662** named this Open.

## Intent vs deliverable

Git subject promises: a billed bag pays unpaid contents then the box, instead of skipping `Has_contents` in `make_itemized_bill` after D-1688.

`node scripts/csym.mjs buy_container` → `shk.c:2307–2411`. `--callers`: live call `pay_billed_items` `:2127`. Callees: `insufficient_funds` `:2454–2481`, `reject_purchase` `:2417–2451`, `update_bill` `:2169–2211`, `dopayobj` `:2219–2302`. Feeder `make_itemized_bill` `:1602–1640`. `paydoname` `objnam.c:2311–2355`. `unpaid_cost` `:3259–3305`. `sortbill_cmp` `:1497–1518`. `pay_billed_items` `:2045–2167` (`:2124–2138` container branch).

```2123:2137:nethack-c/upstream/src/shk.c
        if (ibill[indx].usedup >= KnownContainer) {
            int boxbag_result = buy_container(shkp, indx, ibillct, ibill);
            if (boxbag_result == 0) {
                buy = PAY_BUY;
            } else {
                if (boxbag_result == 2)
                    verbalize("You need to remove any unpaid items from"
                              " that %s and buy them separately.",
                              simpleonames(otmp));
                buy = PAY_CANT;
            }
```

Parent: no `buy_container`; bags skipped in itemized bill; contained unpaid paid as ordinary `FullyIntact` via `dopayobj`. The diff **does** live `buy_container` + helpers; coalesce to Known/UndisclosedContainer; `COST_CONTENTS` → `contained_cost`; `paydoname` Has_contents / `no_charge`. It **does not** port FullyUsedUp / PartlyUsedUp `OBJ_ONBILL` split. Named. It **does not** port Traditional `yn_function` itemize. Named. It **does not** port `bill_box_content` (pickup). Named. It **does not** port `SetVoice` / `dealloc_obj` on `OBJ_ONBILL`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `buy_container` | LIVE | `:2307–2411` 0/1/2 |
| `insufficient_funds` / `reject_purchase` / `update_bill` / `dopayobj` | LIVE | itemize yn skipped (FALSE on this path) |
| `make_itemized_bill` container arm | LIVE | `:1602–1640`; used-up split OMIT |
| `sortbill_cmp` | LIVE | used-up first, then cost desc, then bidx |
| `unpaid_cost` COST_CONTENTS | LIVE | `contained_cost(..., unpaid_only)` |
| `paydoname` Has_contents | LIVE | `:2330–2354` |
| `pay_billed_items` `>= KnownContainer` | LIVE | menu arm; Traditional OMIT |
| FullyUsedUp / PartlyUsedUp / `OBJ_ONBILL` dealloc | OMIT named | |
| Traditional itemize / `SetVoice` / `bill_box_content` | OMIT named | |

`node scripts/sym.mjs` (HEAD after later shk peels; same names, lines moved):

```
buy_container    NOT EXPORTED — 1 LOCAL js/shk.js
dopayobj         NOT EXPORTED — 1 LOCAL js/shk.js
update_bill      NOT EXPORTED — 1 LOCAL js/shk.js
insufficient_funds NOT EXPORTED — 1 LOCAL js/shk.js
reject_purchase  NOT EXPORTED — 1 LOCAL js/shk.js
make_itemized_bill NOT EXPORTED — 1 LOCAL js/shk.js
paydoname        js/objnam.js:2540   sync
unpaid_cost      js/shk.js:622   sync
pay_billed_items NOT EXPORTED — 1 LOCAL js/shk.js
shk_names_obj    NOT EXPORTED — 1 LOCAL js/shk.js
contained_cost   NOT EXPORTED — 1 LOCAL js/shk.js
```

No clone → import. Do **not** add `buy_container` #2. Do **not** add `paydoname` #2. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Enum / PAY_*.** C `FullyUsedUp=1` … `UndisclosedContainer=6`; `PAY_BUY=1` `PAY_CANT=0` `PAY_SKIP=-1` `PAY_BROKE=-2`. JS the same (FullyUsedUp unused — named). `>= KnownContainer` is 5 and 6 only. **Match.**

**`make_itemized_bill` container arm.** C `:1602–1640`: if `OBJ_CONTAINED` or `Has_contents`, walk to outermost, coalesce if already in `ibill` (upgrade FullyIntact → Known/Undisclosed), else `quan=1`, `unpaid_cost(COST_CONTENTS)`, `bidx=-1` if hero-owned box, `used = (otmp==item)? FullyIntact : cknown? Known : Undisclosed`. JS the same walk / coalesce / `COST_CONTENTS`. Ordinary unpaid: C may set PartlyIntact when `quan < bquan`; JS always FullyIntact. Named used-up omit — **not** the bag arm. **Match the feeder `buy_container` needs.**

**`unpaid_cost`.** C `:3286–3298` u.ushops, `onbill` then `amt *= quan` unless `COST_SINGLEOBJ`; if `COST_CONTENTS && Has_contents` `amt = contained_cost(..., FALSE, TRUE)`. JS the same. **Match `:3259–3305`.**

```3286:3298:nethack-c/upstream/src/shk.c
            if ((bp = onbill(unp_obj, shkp, TRUE))) {
                amt = bp->price;
                if (cost_type != COST_SINGLEOBJ)
                    amt *= unp_obj->quan;
            }
            if (cost_type == COST_CONTENTS && Has_contents(unp_obj))
                amt = contained_cost(unp_obj, shkp, amt, FALSE, TRUE);
            if (bp || (!unp_obj->unpaid && amt))
                break;
```

**Match.** `contained_cost` unpaid_only TRUE here vs FALSE in `addtobill` (D-1705). Do **not** swap those flags.

**`buy_container`.** No-gold then not-enough (`insufficient_funds` 0 then `totalcost`). Bill walk: skip unless contained or Has_contents; outermost `== container`; `quan < bquan` → `reject_purchase` return 1; collect `bo_id`s with the box last if unpaid. Second pass: find `bp` by `bo_id`, `dopayobj(..., 1, FALSE, sightunseen)`, `update_bill(indx or -1)`, then one combined `shk_names_obj` when `buycount && sightunseen` with temporary `unpaid`/`no_charge` if the box was unpaid. Return `buycount ? 0 : 2`. JS the same, including `continue` on unexpected `dopayobj` fail vs C. **Match `:2307–2411`.** No RNG.

**`dopayobj` (itemize FALSE).** C unpaid/`useup`/contents check; `itemize && insufficient_funds(0)` → BROKE; quan from which; `ltmp = price*quan`; suppress_price; yn only if itemize; partly used `reject_purchase` + SKIP; not-enough → SKIP if itemize else CANT; pay + `shk_names_obj` unless `unseen`; restore quan. `buy_container` passes `itemize=FALSE` `unseen=sightunseen`. JS skips the yn block (Traditional Open). **Match this caller.**

**`update_bill`.** C PartlyUsedUp shrinks `bquan` and upgrades PartlyIntact; else `unpaid=0`, `OBJ_ONBILL` extract/dealloc, `*bp = bill_p[newebillct]`, remap `ibill[].bidx`. JS swap-remove + remap; no `dealloc_obj`. Named. Live paid-in-invent path **Match.**

**`insufficient_funds` / `reject_purchase`.** Messages match (`seem to` / `or credit` / `paydoname`; contained `the one(s) in` vs `these`/`this one`). `SetVoice` named.

**`paydoname`.** C zeros `cknown` around `doname_base`; if Has_contents and `!no_charge`, strip `a `/`an `, prepend `an unpaid ` / `your `; if still `!cknown`, unpaid → ` and its contents` else prepend `the contents of `; restore `cknown`. JS the same (`doname` is the port). **Match `:2311–2355`.**

**`pay_billed_items`.** Menu arm: `usedup >= KnownContainer` → `buy_container`. **Match `:2124–2138`.** Traditional `yn_function("Itemized billing?")` named. `menu_requested` invert named.

Callee closure (`buy_container` arm). LIVE: `insufficient_funds`, `reject_purchase`, `dopayobj` (itemize FALSE), `update_bill`, `shk_names_obj`, `paydoname`, `bp_to_obj`, `pay`. OMIT named: `SetVoice`, `OBJ_ONBILL` dealloc, FullyUsedUp split (not this arm). STUB: **none**. Combined-arm ships. `shk_names_obj` still treats a missing `objects[otyp]` row as `!oc_magic` (`!oc?.oc_magic`); that is D-1703’s Open, not a stub here.

## Hallucinations / overclaim

Subject “billed bag pays unpaid contents then the box”: **true.** “instead of skipping Has_contents”: **true.** Do **not** stamp “Match C FullyUsedUp / PartlyUsedUp.” Do **not** stamp “Match C Traditional itemize yn.” Do **not** stamp “Match C `bill_box_content`.” Do **not** stamp “Match C `SetVoice`.” Do **not** re-port D-1688 `cheapest_item`. Do **not** skip bags again to “keep seed0116.”

## Nested bags / sort / cheapest

**Outermost walk.** C `:2348–2352` `for (otop = otmp; otop->where == OBJ_CONTAINED; otop = otop->ocontainer)`. Nested unpaid in a bag-in-a-bag bills the **outer** container as the `ibill` row; `buy_container` still pays every `bo_id` whose outermost is that box. JS the same. An unpaid inner bag with `Has_contents` is recorded as a `boid` (not the outer o_id) and paid before the outer if it appears first on `bill_p`. C defers only `container->o_id` to last. **Match.**

**`sortbill_cmp`.** C used-up (`<= PartlyUsedUp`) first, then higher `cost`, then `bidx`. JS the same. Without FullyUsedUp rows, the used-up key is always 0. **Match a FullyIntact/KnownContainer-only bill.** `cheapest_item` (D-1688) mins `ibill[].cost` including the coalesced container total (`COST_CONTENTS`). Paying the bag is one `ibill` row, not N cheap contents. **Match C after this feeder.**

**`pay`.** C `pay(ltmp, shkp)` gold then credit. JS `pay` already LIVE. `buy_container` does not call `pay` itself; `dopayobj` does. **Match.** `suppress_price` around `dopayobj` so `doname`/`paydoname` do not add invent-style prices mid-buy. JS increments `iflags.suppress_price`. **Match `:2256`.**

**BILLSZ.** C `boids[BILLSZ]`. JS unbounded `boids[]`. Overflow in C is a shop-bill-full world; JS will not truncate. Public bills are small. Named only if a later peel hits BILLSZ — not a Must-fix for this feeder.

**`sightunseen`.** KnownContainer **or** UndisclosedContainer both suppress per-item `shk_names_obj` (`unseen=TRUE`) then one combined announce. A FullyIntact empty unpaid bag does **not** enter `buy_container` (`usedup` is 4, not `>=5`). JS the same. **Match.**

**RNG.** None in `buy_container` / `dopayobj` (itemize FALSE) / `update_bill` / `unpaid_cost`. `hidden_gold` in `insufficient_funds` is a scan, not `rn2`. **Match.**

## Density

§2b: one shop-pay cluster — feeder + `buy_container` + the four C callees + `paydoname`. Related. +371.

**`bp_to_obj`.** C looks up `bo_id` on invent/floor/contained. JS LIVE. `buy_container` first pass `!otmp` → impossible return 2. **Match `:2340–2343`.**

**Gold vs credit messages.** C `insufficient_funds(0)` then `(totalcost)` so no-gold vs not-enough differ. JS `await` both. Short-circuit `||` **Match** C (`:`2332–2333`). Do **not** fuse into one call.

**`pay_billed_items` PAY_CANT.** Container fail returns FALSE from the pay loop (stop paying). JS `return false` on PAY_CANT. **Match `:2148–2150`.** `PAY_BROKE` sets paid and returns TRUE (broke but some paid). **Match.**

**No RNG** in this cluster except pre-existing `append_honorific` on other paths. `buy_container` has none. **Match.**

## Verification

D-log: save-oracle tagged shop-unpaid-seed0116 (template 35/35, no unpaid — not a billing falsifier); private 2904/2904 35/35; green+strict seed8000/0900; cohort 9/9 including seed0116 127/127. Public **does** hit shops; billed-bag pay is **public-unhit** unless a session stores then pays a bag. Admit that. Canaries are the C-order check.

## Actionable C-wrongs

None for Must-fix. Named: FullyUsedUp/PartlyUsedUp + `OBJ_ONBILL` dealloc; Traditional itemize; `SetVoice`; `bill_box_content` (D-1705); `shk_names_obj` missing-row `oc_magic` (D-1703); dopay multi-shk getpos (D-1704). Do **not** add `buy_container` #2. Do **not** add `update_bill` #2. Do **not** restore Has_contents skip. Do **not** call `dopayobj` with itemize TRUE on the menu path.

Verdict: **ACCEPT-WITH-DEBT**
