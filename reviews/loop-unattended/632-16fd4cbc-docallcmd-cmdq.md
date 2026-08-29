# Review 632 — 16fd4cbc — do_name.c docallcmd cmdq_pop canned (D-1671)

## Metadata
- Full / short hash: `16fd4cbce67799f062ec6429d0b5c37c650355f8` / `16fd4cbc`
- Parent: `6453e043` (D-1670). This file audits **this SHA only** (sixth of nine `js/` commits since review **626**). Archive **Addressed:** D-1671 `16fd4cbc`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 18:00:56 +0200
- D-id: **D-1671**
- Stats: `js/cmd.js` +2/−2, `js/do_name.js` +96/−42. Band **150–350** (`js/` insertions **98** <250; id >454).
- Claims to close: Open `docallcmd` cmdq_pop canned / lootabc / invent-gated i/o after D-1660. Not iactions Call pushkeys. Not `'i'` `getobj_name`. Not `docall` sink-fluid. `reviews/loop-2026-08-15/` has no unpaid docallcmd Must-fix.
- JS / map: `do_name.js` `docallcmd` / `docallcmd_menu`; `cmd.js` export `cmdq_pop` / `cmdq_clear`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **621** named cmdq canned after `'o'` getobj. Not **631**.

## Intent vs deliverable

Git subject promises: a canned cmdq KEY skips the name menu, instead of always painting it after D-1660.

Pinned C `docallcmd` `:498–601` (`node scripts/csym.mjs docallcmd`; `--callers` 0 — extcmd table). `cmdq_pop` `:409–420` (`--callers` includes `do_name.c:511`). `cmdq_clear` `:430–442`.

```511:518:nethack-c/upstream/src/do_name.c
    if ((cmdq = cmdq_pop()) != 0) {
        cq = *cmdq;
        free((genericptr_t) cmdq);
        if (cq.typ == CMDQ_KEY)
            ch = cq.key;
        else
            cmdq_clear(CQ_CANNED);
        goto docallcmd;
    }
```

```526:537:nethack-c/upstream/src/do_name.c
    add_menu(..., abc ? 0 : any.a_char, 'C', ..., "a monster", ...);
    if (gi.invent) {
        add_menu(..., abc ? 0 : any.a_char, 'y', ..., "a particular object in inventory", ...);
        add_menu(..., abc ? 0 : any.a_char, 'n', ..., "the type of an object in inventory", ...);
    }
```

Old JS: always painted m/i/o/f/d/a; `cmdq_pop` unexported; i/o always listed. The diff **does** pop-first (KEY → `ch` skip menu; else `cmdq_clear`), lootabc gacc vs primary, omit i/o when `!invent.length`, switch like C, `return ECMD_OK`. It **does not** pushkeys IA_NAME_OBJ/OTYP, replace `getobj_name`, or port `#if 0` EXCLUDE. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `docallcmd` | C `:498–601`, **LIVE this SHA** | async export |
| `cmdq_pop` | C `:409–420`, **LIVE this SHA** | was local; now export |
| `cmdq_clear` | C `:430–442`, **LIVE this SHA** | export |
| `cmdq_key_ch` | JS encoding, **CLONE** | string vs char-code canned |
| `docallcmd_menu` | C add_menu+`select_menu` `:520–556`, **CLONE** | nhgetch analogue |
| `do_mgivenname` | C, **LIVE** local | do not add #2 |
| `'i'` `getobj_name` | C `getobj("name", name_ok)`, **CLONE** | **do not add #2** |
| `'o'` `getobj`/`call_ok` | C `:571–589`, **LIVE** | D-1660 |
| `namefloorobj` / `rename_disco` / `donamelevel` | C, **LIVE** | |
| iactions Call pushkeys | C `IA_NAME_*`, **OMIT named** | |
| `#if 0` EXCLUDE | C `:581–584`, **OMIT named** | compiled out |

`node scripts/csym.mjs docallcmd` → `:498-601`. `cmdq_pop` → `:409-420`. `cmdq_clear` → `:430-442`. `--callers cmdq_pop`: includes `:511`. `--callers docallcmd`: 0.

RNG: none in pop/menu/switch. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (local → export):

```
docallcmd        js/do_name.js:1198   ASYNC — await required
cmdq_pop         js/cmd.js:108   sync
cmdq_clear       js/cmd.js:101   sync
getobj_name      NOT EXPORTED — 1 LOCAL js/do_name.js:155
             => Do NOT write clone #2.
call_ok          js/do_name.js:130   sync
do_mgivenname    NOT EXPORTED — 1 LOCAL js/do_name.js:516
             => Do NOT write clone #2.
namefloorobj     NOT EXPORTED — 1 LOCAL js/do_name.js:1263
             => Do NOT write clone #2.
rename_disco     js/o_init.js:356   ASYNC — await required
donamelevel      js/dungeon.js:1592   ASYNC — await required
```

`--can do_name.js cmd.js cmdq_pop`: ALREADY (this SHA added the static import; `cmd.js` does not import `do_name.js`). Do **not** stamp “cycle-forced clone.” Do **not** add `getobj_name` #2. Do **not** add `cmdq_add_ec` #6.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Pop. C `cmdq_pop()`; KEY → `ch=cq.key` and **goto** switch (no menu); else `cmdq_clear(CQ_CANNED)` with `ch` still 0 → default/`q`. JS `cmdq_pop`; `typ===CMDQ_KEY` (0) **or** `'key'` (iactions/apply clones store the string); `cmdq_key_ch` (invent `cmdq_add_key` stores a string, clones store a char code). Non-KEY clears canned (`ch` stays `''` → default/`q`). **Match `:511–518` + `:560–563`.** `CMDQ_KEY===0` must use `===`, not truthiness. They did.

Menu letters. C `abc=flags.lootabc`; unique acc `abc?0:a_char`, gacc always `C/y/n/,/\/l`; i/o only `if (gi.invent)`. JS `lootabc`; display gacc iff abc else acc; match **always** gacc and acc only when `!abc`; `game.invent.length` (array invent, same test as `shk.js`). **Match `:508–550`.** C `!abc` accepts both `m` and `C`. JS the same.

`select_menu`. C n>0 → `a_char`; n<=0 → `'q'` (`:552–556`). JS ESC/`q` → `'q'`; Space/Return **continue** (re-prompt). That is the pre-existing nhgetch menu analogue, **not** C n==0. Named in the helper comment. Same class of debt as **622** handler n==0 / n>1. Not the Open identifier (canned skip).

Switch. C `m/i/o/f/d/a` + default/q; `'i'` `getobj("name", name_ok, GETOBJ_PROMPT)`; `'o'` live getobj call (D-1660); return `ECMD_OK`. JS switch the same; `'i'` still `getobj_name` clone. **Match the dispatch and ECMD.** Not Match C `name_ok` getobj. Named.

Callee closure (canned + menu + switch). LIVE: `cmdq_pop`/`cmdq_clear`, `do_mgivenname`, `'o'` getobj/`docall`, `namefloorobj`, `rename_disco`, `donamelevel`, `ECMD_OK`. CLONE: `cmdq_key_ch`; `docallcmd_menu`; `getobj_name`. OMIT named: iactions Call; `#if 0`. STUB: **none** in the canned KEY arm. Combined-arm: canned skip is LIVE; `'i'` clone is named Open. “Dispatch ported, callee stubbed” is **false** for KEY skip. “Menu clone n==0 ≠ `'q'`” is named helper debt, not a new Must-fix for this identifier.

## Hallucinations / overclaim

Subject canned KEY skips the name menu: **true** (canary KEY `q` with no nhgetch; non-KEY clears follow-on KEY). D-log lootabc + invent-gate: **true**. Do **not** stamp “Match C `select_menu` n==0 → `'q'`.” Do **not** stamp “Match C `getobj(\"name\", name_ok)`.” Do **not** stamp “Match C iactions Call pushkeys.” Do **not** add `getobj_name` #2. Public-unhit for canned `#name` / itemactions Call; fortress paints the interactive menu.

## Density

+98: `docallcmd` pop + lootabc/invent menu + export. §2b one `docallcmd` cluster. Did not glue `docall` sink-fluid.

## Verification

Wired: KEY skip; non-KEY clear; invent-gate `i`; lootabc hides primary `m`. Unwired C: n==0 `'q'`; `name_ok` getobj; Call pushkeys. Conf: no RNG. No seed gate.

D-log private canary; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for canned KEY. Fortress 44/44 always takes the menu path.

## Actionable C-wrongs

None for the Open identifier. Named (map, not Must-fix): `select_menu` n==0 → `'q'` vs Space/Return re-prompt; `'i'` `getobj_name` vs `getobj("name", name_ok, GETOBJ_PROMPT)`; iactions Call pushkeys; `#if 0` EXCLUDE; `docall` sink-fluid. Do **not** add `getobj_name` #2. Do **not** add `cmdq_add_key` clone #4. Do **not** re-port `'o'` getobj (D-1660). Do **not** re-port `do_oname` slip (D-1670).

Verdict: **ACCEPT-WITH-DEBT**
