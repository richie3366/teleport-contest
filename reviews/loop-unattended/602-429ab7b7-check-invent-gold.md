# Review 602 — 429ab7b7 — invent.c check_invent_gold / adjust_gold_ok (D-1641)

## Metadata
- Full / short hash: `429ab7b76696e0b40f90ec06f11c856ddc9dabac` / `429ab7b7`
- Parent: `78fc5011` (D-1640). This file audits **this SHA only** (third of nine `js/` commits since review **599**). Archive **Addressed:** D-1641 `429ab7b7`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 09:47:54 +0200
- D-id: **D-1641**
- Stats: `js/invent.js` +71/−40, `js/iactions.js` +15/−6. Band **150–350** (js/ insertions **86**).
- Claims to close: Open `check_invent_gold` after D-1640. Not `adjust_split` (D-1621). Not `invlet_constant`. `reviews/loop-2026-08-15/` has no unpaid gold-adjust Must-fix.
- JS / map: `invent.js` `check_invent_gold` / `adjust_gold_ok` / `doorganize`; `iactions.js` `IA_ADJUST_OBJ`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named after D-1621.

## Intent vs deliverable

Git subject promises: wonky gold (wrong slot or multiple stacks) may be #adjusted via `adjust_gold_ok` with dest `$`, and itemactions offers `i`, instead of always excluding gold after D-1621.

Pinned C `invent.c` `check_invent_gold` `:4887–4913` (`node scripts/csym.mjs check_invent_gold`). `--callers`: `iactions.c:464`; `invent.c:4998` (`doorganize`); comment `:5085`; `wizcmds.c:1440` `sanity_check` (named). Callee `adjust_gold_ok` `:4926–4933`. `adjust_ok` `:4916–4923`. `doorganize` `:4980–5004`. `doorganize_core` dest `:5143` `GOLD_SYM`. `iactions.c` `IA_ADJUST_OBJ` `:191–194` / menu `:462–466`.

```4887:4913:nethack-c/upstream/src/invent.c
boolean
check_invent_gold(const char *why)
{
    ...
    for (otmp = gi.invent; otmp; otmp = otmp->nobj)
        if (otmp->oclass == COIN_CLASS) {
            ++goldstacks;
            if (otmp->invlet != GOLD_SYM)
                ++wrongslot;
        }
    if (goldstacks > 1 || wrongslot > 0) {
        impossible("%s: %s%s%s", why, ...);
        return TRUE; /* gold can be #adjusted */
    }
    return FALSE;
}
```

Old JS: `getobj_adjust` hardcoded `"You cannot adjust gold."`; no `adjust_gold_ok`; itemactions `oclass !== COIN_CLASS` only; **no** `IA_ADJUST_OBJ` pushkeys arm (menu `i` was a dead case). The diff **does** walk invent, `impossible` + TRUE, `adjust_gold_ok` vs `adjust_ok` filter, `getobj_finish_pick` EXCLUDE messages, dest `$` when `isgold`, itemactions `|| check_invent_gold("item-action")`, `cmdq_add_ec(doorganize)` + invlet. It **does not** port `flags.invlet_constant` `reassign()` / dest-lets truncate, or wizcmds `sanity_check`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `check_invent_gold` | C `:4887–4913`, **LIVE this SHA** | exported; async for `impossible` |
| `adjust_gold_ok` | C `:4926–4933`, **CLONE** (C `staticfn`) | `!obj` EXCLUDE else SUGGEST |
| `adjust_ok` | C `:4916–4923`, **LIVE** | still excludes `COIN_CLASS` |
| `doorganize` | C `:4980–5004`, **LIVE this SHA** | filter pick; empty-gold early-out already |
| `doorganize_core` dest `$` | C `:5089/:5143`, **LIVE this SHA** | skip `yn_function` when `isgold` |
| `getobj_adjust` | C `getobj("adjust", filter)`, **CLONE** | parameterized; D-1588 clone |
| `getobj_finish_pick` | C getobj EXCLUDE msgs, **CLONE** | gold vs silly |
| `itemactions` `i` | C `:462–466`, **LIVE this SHA** | |
| `IA_ADJUST_OBJ` pushkeys | C `:191–194`, **LIVE this SHA** | was missing (dead menu) |
| `impossible` | C, **LIVE** | display.js `%s`/`%d` |
| `GOLD_SYM` | C defsym `'$'`, **LIVE** | `GOLD_SYM_ADJ` same `'$'` |
| `reassign` / `invlet_constant` | C `:4995–4996` / `:5108–5110`, **OMIT named** | |
| wizcmds `sanity_check` | C `:1440`, **OMIT named** | |

`node scripts/csym.mjs check_invent_gold` → `invent.c:4887-4913`. `adjust_gold_ok` → `:4926-4933`. `adjust_ok` → `:4916-4923`. `doorganize` → `:4980-5004`. `doorganize_core` → `:5067-5286`. `itemactions` → `iactions.c:277-714`. `--callers check_invent_gold`: `:464` / `:4998` / `:1440`. `--callers doorganize`: cmd.c extern + invent comments (EXT_CMDS already live).

RNG: none in this SHA’s new functions. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (HEAD lines after later invent SHAs; D-1641 tree had `check_invent_gold` at `invent.js:5454`):

```
check_invent_gold js/invent.js:6098   ASYNC — await required
adjust_gold_ok   NOT EXPORTED — 1 LOCAL js/invent.js
adjust_ok        NOT EXPORTED — 1 LOCAL js/invent.js
getobj_adjust    NOT EXPORTED — 1 LOCAL js/invent.js
getobj_finish_pick NOT EXPORTED — 1 LOCAL js/invent.js
doorganize       js/invent.js:6667   ASYNC — await required
doorganize_core  NOT EXPORTED — 1 LOCAL js/invent.js
itemactions      js/iactions.js:291   ASYNC — await required
```

`--can iactions.js invent.js check_invent_gold` / `invent.js display.js impossible`: ALREADY. `IA_ADJUST_OBJ` is a file-local const (`iactions.js:165` = 10), not an export. Do **not** add `adjust_gold_ok` #2. Do **not** stamp “cycle-forced clone.” Dynamic `import('./invent.js')` for `doorganize` in pushkeys matches other IA arms.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Walk. C `gi.invent` nobj chain; JS `game.invent` array (same order as nobj). `COIN_CLASS` count; `invlet != GOLD_SYM` (`'$'` defsym.h OBJCLASS2). **Match `:4895–4900`.**

`impossible` ternary: wrongslot>1 `"gold in wrong slots"` else >0 `"gold in wrong slot"` else `""`; `" and "` iff both predicates; goldstacks>1 `"multiple gold stacks"`. JS same four args. `impossible` formats `%s`. Then TRUE. Sane FALSE. **Match `:4902–4912`.**

`doorganize`. Empty / only `$` gold → `"aren't carrying anything to adjust/adjustable"`. JS same. Then `adjust_filter = check_invent_gold("adjust") ? adjust_gold_ok : adjust_ok`; `getobj("adjust", filter, PROMPT|ALLOWCNT)`. JS `getobj_adjust(adjust_filter)`. **Match `:4988–5002`.** C then `reassign()` if `!flags.invlet_constant`. JS skips. **Named omit.**

`adjust_ok`: `!obj || COIN_CLASS` EXCLUDE else SUGGEST. `adjust_gold_ok`: `!obj` EXCLUDE else SUGGEST (gold allowed). **Match.** Wonky invent can #adjust any object including gold. Sane gold still EXCLUDE → `getobj_finish_pick` `"You cannot adjust gold."` **Match C getobj EXCLUDE.** Non-gold EXCLUDE → `"That is a silly thing to adjust."` Typed missing letter → `"You don't have that object."` retry. This SHA **deleted** the hard gold return that ran even when the filter would SUGGEST. **That was the C-wrong.**

Dest. C `isgold = (obj->oclass == COIN_CLASS)` then `let = !isgold ? yn_function(...) : GOLD_SYM`. JS `GOLD_SYM_ADJ` `'$'`. **Match `:5089/:5143`.** Comment: gold as `from` only after wonky check (sane gold never picked). `?`/`*` still run if somehow gold (C would also, after assigning `let=GOLD_SYM` first — wait). C sets `let = GOLD_SYM` then **still** tests `if (let == '?' || let == '*')` which is false for `'$'`. JS same. **Match.**

itemactions. C `:462–466` `oclass != COIN_CLASS || check_invent_gold("item-action")` then `ia_addmenu(IA_ADJUST_OBJ,'i',...)`. JS `await check_invent_gold('item-action')`. **Match.** Pushkeys `:191–194` `cmdq_add_ec(doorganize)` + invlet. Old JS had the menu row for non-gold and **no** case — selecting `i` was a no-op. This SHA adds the case. **Match C; was a live-arm stub.**

Callee closure (`#adjust` + gold `i`). LIVE: `check_invent_gold`, `adjust_ok`, `doorganize`, dest `$`, `impossible`, `itemactions` menu, `IA_ADJUST_OBJ` cmdq. CLONE: `adjust_gold_ok`, `getobj_adjust` / `getobj_finish_pick` (getobj analogue). OMIT named: `reassign` / dest truncate; wizcmds `:1440`; remaining pushkeys. STUB: none in the gold-adjust arm after this SHA. Combined-arm ships.

## Hallucinations / overclaim

Subject wonky gold #adjust + dest `$` + itemactions `i`: **true.** D-log canary 14/14 + green + cohort: **claimed; this review does not re-run that canary.** Do **not** stamp “Match C `flags.invlet_constant` `reassign()`.” Do **not** stamp “Match C dest-lets truncate `:5108–5110`.” Do **not** stamp “Match C wizcmds `sanity_check` `check_invent_gold("invent")`.” Do **not** stamp “Match C full `getobj`.” Public wonky gold is **public-unhit** (tourist `$` is sane one stack). Fortress still proves sane EXCLUDE.

## Density

+86: C 27-line checker + 8-line `adjust_gold_ok` + doorganize filter + dest `$` + iactions menu/pushkeys. §2b one gold-adjust family. Did not glue `invlet_constant`. Above a one-`if` peel.

## Verification

Wired: sane FALSE / EXCLUDE / no `i`; wonky TRUE / SUGGEST / dest `$` / `i` + `doorganize` cmdq; `impossible` phrasing. Unwired C: `reassign`; wizcmds; dest truncate. Conf: no `rn2`. No seed gate.

D-log canary **14**/14; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for wonky gold. Sane `$` path is hit whenever #adjust runs with gold in invent.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `flags.invlet_constant` `reassign` + dest-lets truncate; wizcmds `sanity_check`; remaining itemactions pushkeys; getobj_adjust still a getobj clone (do not add a second). Do not add `adjust_gold_ok` #2. Do not re-port `adjust_split` (D-1621). Do not restore the hard `"You cannot adjust gold."` return. Do not offer `I` split on gold (C `:468` still `oclass != COIN_CLASS`).

Verdict: **ACCEPT-WITH-DEBT**
