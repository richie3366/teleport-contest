# Review 666 — 7d0a0ddc — shk.c bill_box_content (D-1705)

## Metadata
- Full / short hash: `7d0a0ddc757bcc9e738ea8b218de454a3d62e016` / `7d0a0ddc`
- Parent: `68f8585b` (D-1704). Thirteenth of fifteen `js/` commits since **653**. Archive **Addressed:** D-1705 `7d0a0ddc`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 04:29:48 +0200
- D-id: **D-1705**
- Stats: `js/shk.js` +42/−17. Total `js/` insertions **42** <250. Band **150–350** (id >454 floor **200**).
- Claims to close: Open `bill_box_content` after D-1704 (`cltmp` stayed 0). Not dummy `add_to_billobjs`. Not `remote_burglary`. `reviews/loop-2026-08-15/` has no unpaid bill-box Must-fix.
- JS / map: `shk.js` `bill_box_content` / `addtobill`. `c-js-map/turns.md`.
- Prior: **665** named this Open; **663** named it from the pay side.

## Intent vs deliverable

Git subject promises: picking up a shop container bills nested unpaid contents, instead of leaving `cltmp` at 0 after D-1704.

`node scripts/csym.mjs bill_box_content` → `shk.c:3386–3407`. `--callers`: recurse `:3405`; `addtobill` `:3533`. `addtobill` container arm `:3526–3546`. `picked_container` `:3084–3100`. `add_one_tobill` `:3308–3363` (`record_price_quote` `:3362`).

```3386:3406:nethack-c/upstream/src/shk.c
    if (SchroedingersBox(obj)) return;
    for (otmp = obj->cobj; otmp; otmp = otmp->nobj) {
        if (otmp->oclass == COIN_CLASS) continue;
        if (!otmp->no_charge)
            add_one_tobill(otmp, dummy, shkp);
        if (Has_contents(otmp))
            bill_box_content(otmp, ininv, dummy, shkp);
    }
```

```3526:3534:nethack-c/upstream/src/shk.c
    if (container) {
        cltmp = contained_cost(obj, shkp, cltmp, FALSE, FALSE);
        gltmp = contained_gold(obj, TRUE);
        if (ltmp) add_one_tobill(obj, dummy, shkp);
        if (cltmp) bill_box_content(obj, ininv, dummy, shkp);
        picked_container(obj);
```

Parent: container arm billed the outer object only; `contained_cost` / `bill_box_content` commented. The diff **does** live `contained_cost` then `bill_box_content` when `cltmp`; skip SchroedingersBox and coins; recurse `Has_contents`; `picked_container` skip `COIN_CLASS`; `add_one_tobill` `record_price_quote`; Deaf list-price `the_contents_of` / `and_its_contents` + `the()`/`The()`. It **does not** port dummy→`add_to_billobjs`, bill-full `You()`, `OBJ_FREE` dealloc, globby OMID. Named. It **does not** port `set_voice`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `bill_box_content` | LIVE | `:3386–3407` |
| `contained_cost` / `contained_gold` / `picked_container` | LIVE | already in file; coin skip **Match** |
| `add_one_tobill` | LIVE + named omits | `record_price_quote` now LIVE |
| `SchroedingersBox` | LIVE import | `pickup.js` |
| `the` / `The` | LIVE import | `objnam.js` |
| `count_unpaid` | LIVE | `invent.js` |
| dummy `add_to_billobjs` / bill-full / `OBJ_FREE` / globby OMID | OMIT named | |

`node scripts/sym.mjs`:

```
bill_box_content NOT EXPORTED — 1 LOCAL js/shk.js:3009
addtobill        js/shk.js:3043   ASYNC — await required
add_one_tobill   NOT EXPORTED — 1 LOCAL js/shk.js:2975
picked_container js/shk.js:2421   sync
contained_cost   NOT EXPORTED — 1 LOCAL js/shk.js:2046
contained_gold   js/shk.js:1839   sync
SchroedingersBox js/pickup.js:170   sync
record_price_quote js/shk.js:2589   sync
```

`node scripts/imports.mjs --can shk.js pickup.js SchroedingersBox` → **ALREADY**. Do **not** add `SchroedingersBox` clone #3. Do **not** add `bill_box_content` #2. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`bill_box_content`.** SchroedingersBox return; coin skip; `!no_charge` → `add_one_tobill`; recurse `Has_contents` even when the child was `no_charge`. `ininv` unused in C too (passed through). **Match `:3386–3407`.** No RNG.

**`addtobill` container arm.** `contained_cost(..., FALSE, FALSE)` then `contained_gold(..., TRUE)`; bill outer if `ltmp`; bill contents if `cltmp`; `picked_container`; `ltmp += cltmp`; gold then maybe return; clear box `no_charge`; `contentscount = count_unpaid(cobj)`. JS the same. **Match `:3526–3546`.** Parent left `cltmp` 0 — that is the C-wrong this peel closed.

**`picked_container`.** C skips coins then `if (no_charge) no_charge=0` then recurse. Parent cleared every child’s `no_charge` including gold. JS now **Match `:3084–3100`.**

**`add_one_tobill` last line.** C `:3362` `record_price_quote(otyp, price, TRUE)`. JS now calls it. **Match that callee.** Dummy `add_to_billobjs`, `BILLSZ` `You("got that for free!")` inside this helper, `OBJ_FREE` `dealloc_obj`, `newomid`/`OMID` remain named. (JS `addtobill` still has an early `billct === BILLSZ` free-message — pre-existing envelope, not this helper’s C `You`.)

**Announce.** C `the(xname)` / `The(xname)` / `the_contents_of` `"the contents of "` / `and_its_contents` `" and its contents"` (`shk.c:62–63`). JS the same strings. `!hero_deaf()` vs C `!Deaf`. **Match the Deaf list-price arm this peel claimed.** `set_voice` named.

Callee closure (`bill_box_content` arm). LIVE: `SchroedingersBox`, `add_one_tobill` (live unpaid path), `Has_contents`, `contained_cost`. OMIT named: dummy/billobjs/dealloc. STUB: **none**. Combined-arm ships.

**`contained_cost` unpaid_only FALSE.** C `:3527` `contained_cost(obj, shkp, cltmp, FALSE, FALSE)` — not the unpaid-only walk `unpaid_cost` uses. JS `contained_cost(obj, shkp, cltmp, false, false)`. **Match.** `contentscount = count_unpaid(cobj)` after billing **Match `:3546`.** Recurse on `Has_contents` even when the child was `no_charge` so a nested charged item under a free bag still bills. **Match `:3404–3405`.**

**RNG.** `append_honorific` still `rn2` (pre-existing). This SHA does not add `rn2`. `record_price_quote` is a table write. **Match.**

## Hallucinations / overclaim

Subject “bills nested unpaid contents instead of leaving cltmp at 0”: **true.** Do **not** stamp “Match C dummy `add_to_billobjs`.” Do **not** stamp “Match C `You got that for free` inside `add_one_tobill`.” Do **not** stamp “Match C `set_voice`.” Do **not** re-port D-1702 `buy_container`. Do **not** bill coins inside the box (`COIN_CLASS` skip). Do **not** add `bill_box_content` #2.

## Density

§2b: one pickup-bill cluster — `contained_cost` + `bill_box_content` + coin skip + the announce strings that mention contents. Related. +42.

## Verification

D-log: save-oracle skip; green+strict seed8000/0900; focused seed0116 127/127; cohort 10/10. Public shop pickup **is** hit; nested billed bag is **public-unhit** unless a session picks up a filled shop container. Admit that.

## Actionable C-wrongs

None for Must-fix. Named: dummy→`add_to_billobjs`; bill-full `You()` in `add_one_tobill`; `OBJ_FREE` dealloc; globby OMID; FullyUsedUp; `remote_burglary`; `set_voice`. Do **not** add `bill_box_content` #2. Do **not** add `SchroedingersBox` clone in `shk.js`. Do **not** restore `cltmp` skip. Do **not** clear `no_charge` on coins in `picked_container`.

Verdict: **ACCEPT-WITH-DEBT**
