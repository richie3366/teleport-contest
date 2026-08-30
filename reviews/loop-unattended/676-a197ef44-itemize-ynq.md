# Review 676 — a197ef44 — shk.c pay_billed_items Traditional itemize ynq (D-1715)

## Metadata
- Full / short hash: `a197ef445b75d85826afa76acfbfdc5199b47cee` / `a197ef44`
- Parent: `33cc30c0` (D-1714). This file audits **this SHA only** (eighth of nine `js/` commits since review **668**). Archive **Addressed:** D-1715 `a197ef44`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 06:48:48 +0200
- D-id: **D-1715**
- Stats: `js/shk.js` +75/−22. Total `js/` insertions **53** <250. Band **150–350**.
- Claims to close: Open Traditional itemize ynq (MENU_TRADITIONAL / `m p` ask Itemized billing? and per-item Pay?). Not FullyUsedUp (D-1714). Not mute/Deaf nod. `reviews/loop-2026-08-15/` has no unpaid itemize Must-fix.
- JS / map: `shk.js` `pay_billed_items` / `dopayobj`. `c-js-map/turns.md`.
- Prior: none written; D-1684 always `menu_pick_pay_items` and `itemize=false`.

## Intent vs deliverable

Git subject promises: MENU_TRADITIONAL and m-prefix pay ask Itemized billing? and per-item Pay?, instead of always opening the pick-any menu after D-1684.

`node scripts/csym.mjs` does not list `pay_billed_items` as a one-liner; body `shk.c:2045–2167`. Traditional gate `:2082–2107`. `dopayobj` `:2219–2302` itemize `:2259–2275`. `hack.h:1329` `#define y_n(query) yn_function(query, ynchars, 'n', TRUE)`. `Doname2` `objnam.c:2302–2309`. `options.c:7258` default `MENU_FULL`. `--callers` of the helpers used here: `yn_function`, `safe_qbuf`, `upstart`/`highc`.

```2082:2107:nethack-c/upstream/src/shk.c
    via_menu = (flags.menu_style != MENU_TRADITIONAL);
    if (iflags.menu_requested)
        via_menu = !via_menu;
    do {
        if (via_menu /*&& more_than_one*/ ) {
            if (!menu_pick_pay_items(ibillct, ibill))
                return TRUE;
            queuedpay = TRUE;
            itemize = FALSE;
            via_menu = FALSE;
        } else {
            iprompt = !more_than_one ? 'y'
                      : yn_function("Itemized billing?", "ynq m", 'q', TRUE);
            if (iprompt == 'q')
                return TRUE;
            itemize = (iprompt == 'y');
            via_menu = (iprompt == 'm');
        }
    } while (via_menu);
```

```2268:2274:nethack-c/upstream/src/shk.c
        Sprintf(qsfx, " for %ld %s.  Pay?", ltmp, currency(ltmp));
        (void) safe_qbuf(qbuf, (char *) 0, qsfx, obj,
                         (quan == 1L) ? Doname2 : doname, ansimpleoname,
                         (quan == 1L) ? "that" : "those");
        if (y_n(qbuf) == 'n') {
            buy = PAY_SKIP;
        }
```

Parent: always menu; `dopayobj(..., false, false)`; comment named Traditional. The diff **does** via_menu/ynq loop; `?? MENU_FULL` (not `| 0`); pass `itemize`; Pay? via `safe_qbuf` + `yn_function(..., 'yn', 'n', true)`; `itemize \|\| queuedpay` `update_inventory`+`bot`. It **does not** port mute/Deaf nod. Named. It **does not** add `Doname2` #4 (`do.js`/`dokick.js`/`dothrow.js` already clone). It **does not** add `y_n` (NOT FOUND — inlined).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `pay_billed_items` via_menu/ynq | LIVE repaired | C `:2082–2107` |
| `dopayobj` itemize Pay? | LIVE | C `:2259–2275` |
| `yn_function` | LIVE import | already; 4th `true` ≡ C resp |
| `y_n` | CLONE inlined | `yn_function(q, 'yn', 'n', true)`. Do **not** add #1 |
| `safe_qbuf` / `doname` / `ansimpleoname` | LIVE import | |
| `Doname2` | CLONE as `upstart(doname)` | C `:2302–2308` `highc(*s)`. Do **not** add #4 |
| `upstart` | LIVE import | `hacklib.js`. 8 other locals — do **not** add #9 |
| `MENU_TRADITIONAL` / `MENU_FULL` | LIVE | 0 and 2; default FULL |
| mute/Deaf nod / SetVoice | OMIT named | |
| C TODO `'a'`/`'q'` end itemized | OMIT (C TODO) | |

`node scripts/sym.mjs`:

```
pay_billed_items NOT EXPORTED — 1 LOCAL js/shk.js:4503
dopayobj         NOT EXPORTED — 1 LOCAL js/shk.js:4321
yn_function      js/getline.js:1439   ASYNC
upstart          js/hacklib.js:119   sync  (+ 8 clones — IMPORT)
safe_qbuf        js/objnam.js:2076   sync
Doname2          NOT EXPORTED — 3 LOCAL (do.js, dokick.js, dothrow.js)
doname / ansimpleoname  objnam.js exports
MENU_TRADITIONAL / MENU_FULL  const.js
y_n              NOT FOUND
```

Re-points: `upstart` from `hacklib.js`; `safe_qbuf` from `objnam.js`; `MENU_*` from `const.js`. `--can js/shk.js js/hacklib.js upstart` / `js/objnam.js safe_qbuf` / `js/const.js MENU_TRADITIONAL`: **ALREADY**. No TDZ. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**via_menu.** C `flags.menu_style != MENU_TRADITIONAL` then `iflags.menu_requested` invert. `MENU_TRADITIONAL` is 0. JS `?? MENU_FULL` because unset `menu_style` would otherwise look Traditional (`0`). C init is `options.c:7258` MENU_FULL. **Match default and the toggle.** The `more_than_one` conjunct on `via_menu` is commented out in C; JS has none. **Match.**

**ynq loop.** C `do/while (via_menu)`: menu arm sets queuedpay, itemize false, via_menu false; else auto `'y'` if `!more_than_one`, else `yn_function("Itemized billing?", "ynq m", 'q', TRUE)`; `'q'` return TRUE; `'y'` itemize; `'m'` loops. JS the same, 4th `true`. **Match `:2092–2107`.** `more_than_one` already computed above (unchanged).

**Pay?** C `y_n` ≡ `yn_function(..., ynchars, 'n', TRUE)`. JS `'yn','n',true` and skip only on `'n'`. **Match the macro.** `safe_qbuf` prefix null, qsfx ` for N gold.  Pay?`, Doname2 vs doname by `quan==1`, lastR that/those. **Match `:2268–2274`.** `Doname2` is `highc` first byte of `doname`; JS `upstart(doname(o))` is the same visible capital, without mutating a static buffer. Not clone #4.

**PAY_BUY refresh.** C `:2157–2161` `itemize \|\| queuedpay` → `update_inventory`+`bot`. Parent only `queuedpay`. JS now both. **Match.**

No new RNG in this peel (`rn2` unused here).

**Callee closure (Traditional arm).** LIVE: `yn_function`, `safe_qbuf`, `doname`, `ansimpleoname`, `upstart`, `currency`, `menu_pick_pay_items`, `dopayobj`. CLONE: `y_n` inline; Doname2 as `upstart(doname)`. OMIT named: mute nod; SetVoice; C TODO a/q. STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “MENU_TRADITIONAL and m-prefix pay ask Itemized billing? and per-item Pay?”: **true** for the new loop + `dopayobj` itemize. Do **not** stamp “Match C mute/Deaf nod.” Do **not** stamp “Match C `Doname2` export.” Do **not** add `y_n` #1. Do **not** treat unset `menu_style` as Traditional (`0`). Do **not** restore always-menu. Journal “fortress held” is not a ynq proof. Canary 17/17 is the C-order check (q/n/y/single/FULL/`menu_requested`).

## Density

§2b: one `pay_billed_items` Traditional envelope + the `dopayobj` itemize callee C requires. Related. +53. Mute nod left named (next SHA). Did not glue `remote_burglary`.

## Verification

D-log / journal: save-oracle skip (untagged); canary 17/17; green+strict; focused seed0383; cohort 9/9. Public `p` pay **is** hit (FULL menu path). Traditional ynq **public-unhit** unless a session sets that style. Admit that. Canaries are the ynq/toggle check.

## Actionable C-wrongs

None for Must-fix. Named: mute/Deaf thank-you nod (next); `remote_burglary`; SetVoice; `yn_function_menu`; C TODO `'a'`/`'q'` to finish itemized paying (`shk.c:2263–2266`). Do **not** add `Doname2` #4. Do **not** add `y_n` #1. Do **not** add `upstart` #9. Do **not** default `menu_style` with `| 0`. Do **not** pass `itemize=false` from the Traditional `'y'` arm. Do **not** skip `update_inventory` when itemize.

Verdict: **ACCEPT-WITH-DEBT**
