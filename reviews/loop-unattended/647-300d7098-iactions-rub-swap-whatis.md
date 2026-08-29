# Review 647 — 300d7098 — iactions.c remaining pushkeys rub/swap/whatis (D-1686)

## Metadata
- Full / short hash: `300d7098b4fe38a4de76703b2a3160bb4dad5b36` / `300d7098`
- Parent: `69a1451f` (D-1685). This file audits **this SHA only** (third of nine `js/` commits since review **644**). Archive **Addressed:** D-1686 `300d7098`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 22:09:45 +0200
- D-id: **D-1686**
- Stats: `js/iactions.js` +32/−9; `js/invent.js` +24/−1; `js/pager.js` +24/−20. Total `js/` insertions **80** <250. Band **150–350**.
- Claims to close: Open remaining pushkeys rub/swap/whatis after D-1677. Not Traditional itemize. Not full apply. Not `doswapweapon` cantwield. `reviews/loop-2026-08-15/` has no unpaid rub/whatis Must-fix.
- JS / map: `iactions.js` three cases; `pager.js` `do_look`; `invent.js` `display_inventory`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **636** / **638** named remaining rub/swap/whatis (not **638** `'X'`).

## Intent vs deliverable

Git subject promises: rub/swap/whatis queue `dorub`+invlet, `doswapweapon`, and `dowhatis` `'i'`+invlet (`do_look` cmdq_pop KEY; `display_inventory` canned KEY), instead of default-breaking those acts after D-1677.

`node scripts/csym.mjs itemactions_pushkeys` → `iactions.c:139–274`. `--callers`: `:11` / `:707`. IA_RUB_OBJ `:221–224`; IA_SWAPWEAPON `:257–258`; IA_WHATIS_OBJ `:267–271`. `do_look` `pager.c:1672–1963` (`--callers` `pager.c:2324` `dowhatis`, `:2331` quick). cmdq_pop `:1692–1700`. case `'i'` `:1822–1840`. `display_inventory` `invent.c:3427–3453` (`--callers` includes `pager.c:1828`). `dorub` `apply.c:1784–1843`. `dowhatis` is `do_look(0)` `:2324`.

```221:224:nethack-c/upstream/src/iactions.c
    case IA_RUB_OBJ:
        cmdq_add_ec(CQ_CANNED, dorub);
        cmdq_add_key(CQ_CANNED, otmp->invlet);
        break;
```

```257:271:nethack-c/upstream/src/iactions.c
    case IA_SWAPWEAPON:
        cmdq_add_ec(CQ_CANNED, doswapweapon);
        break;
    ...
    case IA_WHATIS_OBJ:
        cmdq_add_ec(CQ_CANNED, dowhatis); /* "/" command */
        cmdq_add_key(CQ_CANNED, 'i');
        cmdq_add_key(CQ_CANNED, otmp->invlet);
        break;
```

```1692:1700:nethack-c/upstream/src/pager.c
    if ((cmdq = cmdq_pop()) != 0) {
        cq = *cmdq;
        free((genericptr_t) cmdq);
        if (cq.typ == CMDQ_KEY)
            i = cq.key;
        else
            cmdq_clear(CQ_CANNED);
        goto dowhatiscmd;
    }
```

Old JS: three cases fell to silent `default`; menu rows `'R'`/`'x'`/`'/'` already existed; `do_look` always painted the look-at menu; local `pick_inventory_letter` instead of `display_inventory`; lookup used `doname`. The diff **does** the three queues, `do_look` cmdq_pop skip-menu, live `display_inventory` canned KEY, `singular(xname)`, and deletes the clone. It **does not** port lootabc true, Traditional itemize, or `doswapweapon` cantwield. Named those.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| IA_RUB_OBJ pushkeys | C `:221–224`, **LIVE this SHA** | `dorub` + invlet |
| IA_SWAPWEAPON pushkeys | C `:257–258`, **LIVE this SHA** | no invlet |
| IA_WHATIS_OBJ pushkeys | C `:267–271`, **LIVE this SHA** | `dowhatis` + `'i'` + invlet |
| `dorub` / `getobj_rub` | C `:1784` / `getobj_from_cmdq`, **LIVE** | not rewritten; canned invlet |
| `doswapweapon` | C wield.c, **LIVE** (not rewritten) | |
| `dowhatis` | C `:2324` `do_look(0)`, **LIVE** | |
| `do_look` cmdq_pop | C `:1692–1700`, **LIVE this SHA** | KEY skip-menu; else `cmdq_clear` |
| `display_inventory` canned | C `:3427–3452`, **LIVE this SHA** | all callers, not whatis-only |
| `pick_inventory_letter` | **deleted clone** | `sym.mjs` NOT FOUND |
| `singular`/`xname` | C `:1836`, **LIVE this SHA** (lookup) | was `doname` |
| lootabc true menu letters | C `:1764+`, **OMIT named** | |
| `doswapweapon` cantwield | **OMIT named** | |

RNG: none in the three pushkeys / cmdq_pop / canned `display_inventory`. `dorub` MAGIC_LAMP `!rn2(3)` is D-1144, not this SHA. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
pick_inventory_letter NOT FOUND in js/** (no export, no local function/const).
display_inventory js/invent.js:3417   ASYNC — await required
do_look          js/pager.js:1374   ASYNC — await required
dowhatis         js/pager.js:1521   ASYNC — await required
dorub            js/apply.js:5401   ASYNC — await required
doswapweapon     js/wield.js:410   ASYNC — await required
singular         js/objnam.js:1329   sync
cmdq_pop         js/cmd.js:108   sync
cmdq_clear       js/cmd.js:101   sync
itemactions_pushkeys NOT EXPORTED — 1 LOCAL js/iactions.js:66
             => Do NOT write clone #2.
```

`--can pager.js invent.js display_inventory`: **ALREADY**. `--can invent.js cmd.js cmdq_pop`: **ALREADY**. `--can pager.js cmd.js cmdq_pop`: **ALREADY**. Do **not** restore `pick_inventory_letter`. Do **not** add `itemactions_pushkeys` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**Pushkeys.** C rub = `dorub`+invlet; swap = `doswapweapon` only; whatis = `dowhatis` then `'i'` then invlet. JS dynamic `import` + `cmdq_add_ec`/`cmdq_add_key` the same. Menu rows were already C `'R'`/`'x'`/`'/'`. **Match `:221–224`, `:257–258`, `:267–271`.**

**`do_look` cmdq.** C pops one node; KEY → `i = cq.key` and skip menu; non-KEY → `cmdq_clear(CQ_CANNED)`; both `goto dowhatiscmd`. `i` starts `'\0'`. JS `let i = 0`; KEY uses `charCodeAt` / numeric key; else `cmdq_clear()` (default `CQ_CANNED`); no menu. Non-KEY then `String.fromCharCode(0)` hits `default`/`'q'` → `ECMD_OK`. **Match `:1692–1700` + switch.** Itemed `'i'` skips `whatis_menu_choice`. **Match.**

**`display_inventory` canned.** C `cmdq_pop` before `display_pickinv`; KEY + matching `invlet` (optional `strchr(lets, def_oc_syms[oclass].sym)`) returns that letter and does **not** clear the rest of the queue; miss/non-KEY → `cmdq_clear` + `'\0'`. JS the same (`lets==null` → empty string → no class filter — the whatis `NULL` path). Hit returns `otmp.invlet`; miss `''`. **Match `:3427–3452`.** This is the C function for every caller, not a whatis-only shim. Do **not** stamp “Match C lootabc.”

**case `'i'` lookup.** C `singular(invobj, xname)` then `checkfile(..., chkfilUsrTyped|chkfilDontAsk)`. JS was `doname`; this SHA uses `singular(obj, xname)` + existing `CHK_USR|CHK_DONT_ASK`. **Match `:1836–1840`.** Canned miss `''` is falsy → `ECMD_OK` like C `!invlet`.

**`dorub` canned.** C `getobj("rub", rub_ok)` consumes the invlet. JS `getobj_rub` already `getobj_from_cmdq(rub_ok, false)` (D-1144). Not rewritten. **LIVE callee.**

Callee closure. IA_RUB: LIVE `dorub`. IA_SWAP: LIVE `doswapweapon`. IA_WHATIS: LIVE `dowhatis`/`do_look` + `display_inventory` + `singular`. CLONE: `pick_inventory_letter` **deleted**. OMIT named: lootabc true; Traditional itemize; cantwield. STUB: **none**. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject “queue dorub+invlet, doswapweapon, dowhatis i+invlet”: **true**. “do_look cmdq_pop KEY; display_inventory canned KEY”: **true**. Do **not** stamp “Match C lootabc true.” Do **not** stamp “Match C `doswapweapon` cantwield.” Do **not** stamp “ported `dorub` body.” Private canary (C queue text; canned `dorub` lantern; `do_look` canned `q`; whatis `i`+invlet; `display_inventory` hit/miss) is the right split. Public-unhit for itemactions `'/'`/`'R'`/`'x'`.

## Density

+80: three sibling pushkeys plus the two C callees those arms need (`do_look` cmdq, `display_inventory` canned). §2b cluster. Did not glue Traditional itemize / `dotypeinv`.

## Verification

Wired: three queues; `'i'` skips look menu; canned invlet returns from `display_inventory`; `singular` lookup. Unwired C: lootabc letters; look_all/engrs; cantwield. Conf: no extra `rn2` in the new arms. No seed gate.

Journal: private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict. Public suite does not hit itemed `'/'`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): Traditional itemize yn; full apply catalogue; `doswapweapon` cantwield; lootabc true. Do **not** restore `pick_inventory_letter`. Do **not** add `itemactions_pushkeys` #2. Do **not** re-port IA_TWOWEAPON (D-1677). Do **not** re-port D-1685 cemetery JSON.

Verdict: **ACCEPT-WITH-DEBT**
