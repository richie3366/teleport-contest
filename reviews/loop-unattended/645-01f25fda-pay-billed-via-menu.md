# Review 645 — 01f25fda — shk.c pay_billed_items via_menu (D-1684)

## Metadata
- Full / short hash: `01f25fdaea6ef10b64c752ffee77860b11d4e9de` / `01f25fda`
- Parent: `639230ad` (audit #2090 of D-1675–D-1683). This file audits **this SHA only** (first of nine `js/` commits since review **644**). Archive **Addressed:** D-1684 `01f25fda`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 21:45:04 +0200
- D-id: **D-1684**
- Stats: `js/shk.js` +15/−35. Total `js/` insertions **15** <250. Band **150–350**. Must-fix density (not Open).
- Claims to close: Must-fix review **637** Actionable #1 (`pay_take_canned_billed`). Not `cheapest_item`. Not Traditional itemize. Not `buy_container`. `reviews/loop-2026-08-15/` has no unpaid shop-pay Must-fix.
- JS / map: `shk.js` `pay_billed_items`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **637** QUALITY-RISK (canned invlet skip). Stamps `**Addressed:** D-1684`.

## Intent vs deliverable

Git subject promises: via_menu always runs `menu_pick_pay_items` and leftover IA_BUY_OBJ KEY is the next `rhack` keystroke, instead of inventing `pay_take_canned_billed` after D-1676.

`node scripts/csym.mjs pay_billed_items` → `shk.c:2042–2167`. `--callers pay_billed_items`: prototype `:90`; call `:2006`. `menu_pick_pay_items` `:1666–1739` (`--callers` `:89` / `:2094`). `cheapest_item` `:1521–1539` (`--callers` `:87` / `:2073`). `buy_container` call `:2127`. `dopay` callers `cmd.c:81` / `uhitm.c:494`. `rhack` `:3626–3843` (`cmdq_pop` `:3642–3651`).

```2084:2098:nethack-c/upstream/src/shk.c
    via_menu = (flags.menu_style != MENU_TRADITIONAL);
    if (iflags.menu_requested)
        via_menu = !via_menu;
    do {
        if (via_menu /*&& more_than_one*/ ) {
            if (!menu_pick_pay_items(ibillct, ibill))
                return TRUE;
            queuedpay = TRUE;
            itemize = FALSE;
            via_menu = FALSE; /* reset so that we don't loop */
        } else {
            iprompt = !more_than_one ? 'y'
                      : yn_function("Itemized billing?", "ynq m", 'q', TRUE);
```

```1719:1738:nethack-c/upstream/src/shk.c
        add_menu(win, &nul_glyphinfo, &any, 0, 0, ATR_NONE, NO_COLOR, buf,
                 MENU_ITEMFLAGS_NONE);
    }
    end_menu(win, "Pay for which items?");
    n = select_menu(win, PICK_ANY, &pick_list);
    ...
        ibill[i].queuedpay = TRUE;
    ...
    return max(n, 0);
```

C `dopay` has **no getobj**. `pay_billed_items` has **no** `cmdq_pop`. `queuedpay` is set only by `menu_pick_pay_items` after `select_menu` PICK_ANY. `add_menu(..., 0, 0, ...)` so letters are sequential `a`…, **not** `obj->invlet`. After `dopay` returns, C `rhack` `return`s (`:3810–3827`); leftover `CMDQ_KEY` is the **next** `rhack` (`:3642–3651`). There is **no** C `pay_take_canned_billed`.

Old JS: `pay_take_canned_billed` peeked canned KEY, matched `obj.invlet`, `q.shift()`, set that row `queuedpay`, **skipped** `menu_pick_pay_items`. The diff **deletes** that helper and the `CMDQ_KEY` import, then always takes the via_menu arm. It **does not** port `cheapest_item` (`:2073`), Traditional `yn_function` (`:2099–2105`), `menu_requested` toggle (`:2090–2091`), or `buy_container` (`:2127`). Named those.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `pay_take_canned_billed` | **deleted** (not a C callee) | review **637** C-wrong; `sym.mjs` NOT FOUND |
| `pay_billed_items` via_menu | C `:2084–2098`, **LIVE this SHA** | always `menu_pick_pay_items` |
| `menu_pick_pay_items` | C `:1666–1739`, **CLONE** (pre-existing; not rewritten) | letters `a`+i; ESC → 0 |
| `dopay` | C `:1742–2035`, **LIVE** (comment-only this SHA) | still queues + invlet from D-1676 |
| `cmdq_pop` inside pay | C **does not** | JS no longer pops KEY |
| leftover `CMDQ_KEY` | C `rhack` `:3642–3651` | next command, not menu letter |
| `cheapest_item` | C `:2073`, **OMIT named** | later D-1688; at this SHA absent |
| Traditional itemize yn | C `:2099–2105`, **OMIT named** | |
| `menu_requested` toggle | C `:2090–2091`, **OMIT named** | |
| `buy_container` | C `:2127`, **OMIT named** | `sym.mjs` NOT FOUND |
| no-gold `"seem to"` / `" left"` | C `:2060–2064` | still simplified at this SHA; named with cheapest |

RNG: none in `:2084–2098` / `:1666–1739` / the deleted helper. `dopay` helpless `rn2(2)` is pre-existing, not this SHA. No seed gate.

`node scripts/sym.mjs` on deleted / re-pointed names (HEAD after later D-1688 still has no canned helper):

```
pay_take_canned_billed NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
pay_billed_items NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/shk.js:4098
             => Do NOT write clone #2.
menu_pick_pay_items NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/shk.js:3983
             => Do NOT write clone #2.
dopay            js/shk.js:4178   ASYNC — await required
cheapest_item    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/shk.js:4081
             => Do NOT write clone #2.   (added D-1688; omitted at this SHA)
buy_container    NOT FOUND in js/** (no export, no local function/const).
CMDQ_KEY         js/const.js:425   sync   export const
```

`--can shk.js cmd.js rhack`: **SAFE** (hoisted `rhack`; IN-SCC, not a TDZ read). `nhgetch` (`js/input.js:21`) reads `_inputQueue`, **not** `_cmdq_canned`. Do **not** restore `pay_take_canned_billed`. Do **not** add `menu_pick_pay_items` #2. Do **not** add `buy_container` as a silent stand-in.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean (full `js/`).

## C ↔ JS fidelity

**Delete canned consume.** C never peeks billed `invlet` inside `pay_billed_items`. JS helper gone. **Match the Must-fix.** IA_BUY_OBJ still queues `dopay`+invlet (D-1676, not rewritten).

**via_menu arm.** C `:2093–2097`: `menu_pick_pay_items` then `queuedpay = TRUE`. JS:

```3945:3956:js/shk.js
    let queuedpay = false;
    if (!await menu_pick_pay_items(ibill)) {
        return true;
    }
    queuedpay = true;
```

(at this SHA; later D-1688 only inserts cheapest before this). ESC → 0 → `return TRUE`. **Match `:2093–2097`.** C also sets `itemize = FALSE`; JS already passes `false` into `dopayobj`. **Match.**

**Always-menu vs Traditional.** C computes `via_menu` from `flags.menu_style` and `iflags.menu_requested`, then may `yn_function("Itemized billing?")`. JS always takes the menu arm. That is the **named** Traditional / `menu_requested` omit, not a silent stub in the live arm.

**`menu_pick_pay_items` clone (not this SHA).** C `add_menu(..., 0, 0, ...)` + `select_menu` PICK_ANY; JS `letch = 'a'+i`, `nhgetch` toggle, Return confirms, ESC 0. Letters are **not** invlets. SELECT_ALL `.` still named in the clone’s comment. C `select_menu` does not `cmdq_pop`; JS `nhgetch` does not either. Leftover KEY survives the menu. **Match the letter/queue contract.** Subset-count / tty `select_menu` extras are pre-existing clone debt, not this SHA.

**Leftover KEY.** C `rhack` `:3642–3651` pops one queue item per call; EXTCMD `dopay` then `return`; leftover KEY is the next `rhack`. JS `rhack` same shape (`cmd.js:2223`). After this delete, pay no longer `q.shift()`s that KEY. **Match.** Do **not** stamp “Match C leftover invlet as a pay-menu letter.”

**`cheapest_item` / no-gold.** C `:2060–2080` before via_menu. JS at this SHA: simplified `"You have no gold or credit."` and **no** cheapest check. Named. (D-1688 later ports both; that is the next SHA, not credit here.)

Callee closure (via_menu arm). LIVE: `menu_pick_pay_items` (pre-existing clone, body matches letters/`queuedpay`/ESC), `dopayobj` (pre-existing). CLONE: `menu_pick_pay_items` as above. OMIT named: `cheapest_item`, Traditional yn, `menu_requested`, `buy_container`. STUB/invention: **none** — `pay_take_canned_billed` is gone. Combined-arm ships. “Dispatch ported, callee stubbed” is **false** for this SHA.

## Hallucinations / overclaim

Subject “via_menu always runs menu_pick_pay_items” and “leftover KEY is the next rhack”: **true** for the via_menu arm. D-log “delete `pay_take_canned_billed`”: **true** (C never had it). Do **not** stamp “Match C `cheapest_item`.” Do **not** stamp “Match C Traditional itemize / `menu_requested`.” Do **not** stamp “Match C `buy_container`.” Do **not** stamp “Match C no-gold `seem to` / ` left`” at this SHA. Private canary (menu letter `a` pays first billed row, leftover KEY stays, ESC does not auto-pay) is the right split vs C `select_menu`. Public-unhit for shop itemactions `'p'`.

## Density

+15/−35: Must-fix delete + via_menu always-menu. §2b Must-fix stays one item. Did not glue cheapest / itemize / cemetery JSON.

## Verification

Wired: via_menu always `menu_pick_pay_items`; canned invlet no longer skips the menu; leftover KEY not popped inside pay. Unwired C: `cheapest_item`; Traditional yn; `menu_requested`; `buy_container`; used-up headers. Conf: no extra `rn2`. No seed gate.

Journal: private canary **11**/11; green+strict seed8000/0900; cohort **7**/7 + strict. Cadence **#2090** at parent `d2bcd227`: **44**/44. Fortress does not hit shop itemactions `'p'`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `cheapest_item` early return; Traditional itemize yn / `menu_requested` toggle; used-up / `buy_container`; `menu_pick_pay_items` SELECT_ALL `.`. Do **not** restore `pay_take_canned_billed`. Do **not** add `menu_pick_pay_items` #2. Do **not** add `buy_container` as a no-op. Do **not** re-port IA_BUY_OBJ `'p'` (D-1676). Do **not** re-port D-1675 unwield/eat.

Verdict: **ACCEPT-WITH-DEBT**
