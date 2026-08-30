# Review 692 — fbce2b1c — invent.c doprgold / vault.c hidden_gold (D-1731)

## Metadata
- Full / short hash: `fbce2b1cc9911db93c41a19174e43cf4ae0746fe` / `fbce2b1c`
- Parent: `02c2d6e0` (D-1730). This file audits **this SHA only** (sixth of nine `js/` commits since review **686**). Archive **Addressed:** D-1731 `fbce2b1c`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 10:59:34 +0200
- D-id: **D-1731**
- Stats: `js/invent.js` +44/−9; `js/vault.js` +10/−5; end/shk clone re-points. Total `js/` insertions **56** <250. Band **150–350**.
- Claims to close: Open `doprgold` `hidden_gold` after D-1720 / review **681** (currency; stash named). Not `artifact_score`. `reviews/loop-2026-08-15/` has no unpaid hidden_gold Must-fix.
- JS / map: `invent.js` `doprgold`; `vault.js` `hidden_gold`. `c-js-map/turns.md`.
- Prior: **681** named hidden_gold stash.

## Intent vs deliverable

Git subject promises: `$` reports known container gold and m-prefix lists wallet gold, instead of wallet-only.

`node scripts/csym.mjs doprgold` → `invent.c:4502–4546`. `hidden_gold` `vault.c:1256–1268`. `money_cnt` `hack.c:4513–4522` (first `COIN_CLASS`). `contained_gold` `shk.c:3045–3061`. `shopper_financial_report` `shk.c:1002–1035`. `--callers hidden_gold`: botl/detect/dokick/end/insight/invent/shk/topten/u_init/vault.

```4505:4543:nethack-c/upstream/src/invent.c
    long umoney = money_cnt(gi.invent);
    long hmoney = hidden_gold(FALSE);
    if (flags.verbose) {
        ...
        if (hmoney) {
            Sprintf(eos(buf),
                    ", %s you have %ld %s stashed away in your pack",
                    umoney ? "and" : "but", hmoney,
                    umoney ? "more" : currency(hmoney));
        }
        pline("%s.", buf);
    } else {
        long total = umoney + hmoney;
        ...
    }
    shopper_financial_report();
    if (umoney && iflags.menu_requested)
        (void) dispinv_with_action(dollarsign, FALSE, NULL);
```

Parent: wallet-only; local hidden_gold clones unused by `$`. The diff **does** export `vault.js` `hidden_gold`, C verbose `eos` stash / non-verbose total, first-`COIN_CLASS` `money_cnt`, m-prefix `dispinv_with_action("$", false)`, retire end/shk clones. It **does not** call `shopper_financial_report`. Named (`shop_debt` missing). It **does not** import `contained_gold` from `shk.js` (vault keeps a local clone). It **does not** re-point botl/detect/insight/dokick `money_cnt` clones.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `doprgold` | LIVE repaired | stash + m-prefix |
| `hidden_gold` | LIVE re-point export | C-home `vault.js` |
| `contained_gold` | CLONE in vault | **also** export `shk.js:2033` — do **not** add #2 |
| `money_cnt` | inlined first-match | C `:4513–4522`. 6 other locals — do **not** add #7 |
| `currency` | LIVE | D-1720 |
| `dispinv_with_action` | LIVE dynamic import | `--can` SAFE (hoisted) |
| `shopper_financial_report` / `shop_debt` | OMIT named | `sym` NOT FOUND |
| dokick `hidden_gold_kick` | OMIT named | |
| end.js / shk.js hidden_gold | re-pointed to export | |

`node scripts/sym.mjs`:

```
doprgold         js/invent.js:5505   ASYNC — await required
hidden_gold      js/vault.js:74   sync
contained_gold   js/shk.js:2033   sync
             !! ALSO 1 LOCAL CLONE(S)  js/vault.js:58
money_cnt        NOT EXPORTED — 6 LOCAL CLONE(S)  => Do NOT write clone #7.
shopper_financial_report NOT FOUND
shop_debt        NOT FOUND
dispinv_with_action js/iactions.js:761   ASYNC — await required
```

`--can invent.js vault.js hidden_gold`: ALREADY. end.js/shk.js ALREADY. `invent.js → iactions.js`: NEW-CYCLE, `dispinv_with_action` **function hoisted — VERDICT SAFE**. Dynamic `import()` is not a top-level TDZ read. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`money_cnt` (`hack.c:4513–4522`).** C returns the first `COIN_CLASS` `quan` (gold merges). Parent JS summed every coin. This SHA `break` after the first. **Match C.** Do **not** add a 7th `money_cnt` that sums.

**`hidden_gold` (`:1256–1268`).** C invent nobj: `Has_contents && (cknown \|\| even_if_unknown)` then `contained_gold`. JS invent[] same predicate. `doprgold` passes FALSE. **Match.** end.js `hidden_gold(true)` / shk `hidden_gold(true)` now hit the export (C TRUE callers). **Match those sites.** botl/detect/insight/dokick still named.

**`contained_gold` (`:3045–3061`).** C COIN add quan; else nested if known. Vault local clone matches. shk.js already **exports** the C-home. Keeping vault’s copy is clone drift (`sym` !! ALSO 1). Logic matches C; next port should `import { contained_gold } from './shk.js'`, not write #2.

**Verbose (`:4513–4528`).** C empty vs contains; if hmoney, `and`/`but`, `more` vs `currency(hmoney)`, `stashed away in your pack`, then `pline("%s.", buf)`. JS same strings. **Match the `eos` arm.** No `rn2`.

**Non-verbose (`:4529–4535`).** C `total = umoney+hmoney`; total → carrying total; else no money. Parent non-verbose ignored stash. **Match C now.**

**`shopper_financial_report` (`:4536`).** C always calls. JS comment omit. **Named.** Not “Match C `$` shop credit/debt.”

**m-prefix (`:4538–4543).** C `umoney && menu_requested` → `dispinv_with_action("$", FALSE, NULL)`. JS dynamic import + same args. **Match the call.** `FALSE` so gold shows if not quivered.

**Callee closure (`doprgold`).** LIVE: `hidden_gold`, `currency`, `dispinv_with_action`, `pline`. CLONE: inlined `money_cnt`; vault `contained_gold`. OMIT named: `shopper_financial_report`. STUB: **none** in the `$` message arms. Combined-arm: shop report is OMIT, not a silent no-op pretending to be LIVE.

## Hallucinations / overclaim

Subject “$ reports known container gold and m-prefix lists wallet gold”: **true**. Do **not** stamp “Match C `shopper_financial_report`.” Do **not** stamp “Match C botl `hidden_gold`.” Do **not** stamp “Match C `money_cnt` export.” Do **not** stamp “Match C dokick `hidden_gold(TRUE)`.” Journal “fortress held” is not a sack-of-gold `$` screen proof. Public `$` with known stash is **thin**; canary was node known/unknown/nested. Admit public-unhit for stash text.

## Density

§2b: C `doprgold` + callee `hidden_gold`. +56. Retired two clones. Did not glue `shop_debt` / `get_valuables`. Did **not** reopen D-1720 `currency`.

## Verification

D-log: save-oracle skip (untagged `invent.c:doprgold`); node known/unknown/nested; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Stash `$` **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (`$` arms match C; shop report is named). Named: `shopper_financial_report` / `shop_debt`; dokick `hidden_gold_kick`; botl/detect/insight/topten/u_init; vault `contained_gold` should import `shk.js` (do **not** add clone #2); do **not** add `money_cnt` #7. Do **not** re-port D-1720. Do **not** skip `hidden_gold(FALSE)` for `$`.

Verdict: **ACCEPT-WITH-DEBT**
