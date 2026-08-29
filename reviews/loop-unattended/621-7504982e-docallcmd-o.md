# Review 621 — 7504982e — do_name.c docallcmd `'o'` live getobj call (D-1660)

## Metadata
- Full / short hash: `7504982e1ea8adfd9d2151cfc70c073ffbcc6c35` / `7504982e`
- Parent: `f88e0665` (D-1659). This file audits **this SHA only** (fourth of nine `js/` commits since review **617**). Archive **Addressed:** D-1660 `7504982e`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 15:17:08 +0200
- D-id: **D-1660**
- Stats: `js/do_name.js` +23/−6, `js/o_init.js` +1/−1. `js/` **24** insertions. Band **150–350**. C `'o'` arm is 18 lines — under-40 is allowed.
- Claims to close: Open `docallcmd` `'o'` getobj after D-1651. Not lookup_novel. Not `'i'` clone.
- JS / map: `do_name.js` `docallcmd` / `call_ok`; live `invent.js` `getobj`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **612** named `'o'` getobj `"call"`. `reviews/loop-2026-08-15/` has no unpaid docallcmd Must-fix.

## Intent vs deliverable

Git subject promises: `#name` `'o'` uses live `getobj("call", call_ok, GETOBJ_NOFLAGS)` then `xname`/`dknown`/`docall`, instead of returning without that path after D-1651.

Pinned C `docallcmd` `:498–601` (`node scripts/csym.mjs docallcmd`). `'o'` arm `:571–589`. `call_ok` `:479–495`. `--callers call_ok`: `:582` (`#if 0`), `:744` (`namefloorobj`), `iactions.c:68`. `getobj` `invent.c:1751`. `xname` `objnam.c:574–578` → `xname_flags`. `docall` `:635–676`. `GETOBJ_NOFLAGS` `hack.h:1439` **`0x0`**. Callback `GETOBJ_EXCLUDE` `hack.h:515` **`-3`**. `--callers docallcmd`: 0 in src (extcmdlist `#name`).

```571:589:nethack-c/upstream/src/do_name.c
    case 'o': /* name a type of object in inventory */
        obj = getobj("call", call_ok, GETOBJ_NOFLAGS);
        if (obj) {
            (void) xname(obj);
            if (!obj->dknown) {
                You("would never recognize another one.");
#if 0
            } else if (call_ok(obj) == GETOBJ_EXCLUDE) {
                You("know those as well as you ever will.");
#endif
            } else {
                docall(obj);
            }
        }
        break;
```

Old JS: `'o'`/`'n'` empty `return`. The diff **does** live `getobj('call', call_ok, GETOBJ_NOFLAGS)`, `xname`, `!dknown` pline, `docall`. It **does not** port `cmdq_pop` canned, `flags.lootabc`, `if (gi.invent)` omit of i/o, `'i'` `getobj_name`, `#if 0` EXCLUDE, `docall` sink-fluid/`safe_qbuf`, `artifact_name` slip. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `docallcmd` `'o'` | C `:571–589`, **LIVE this SHA** | **ASYNC**; `'n'` is C group accelerator |
| `call_ok` | C `:479–495`, **LIVE** | already exported; not new |
| `getobj` | C `:1751`, **LIVE this SHA** on this arm | retires empty return |
| `xname` | C `:574–578`, **LIVE** | observe_object when `!Blind` |
| `docall` | C `:635–676`, **LIVE** | sink-fluid named |
| `objtyp_is_callable` | C `:428–463`, **LIVE** | |
| `GETOBJ_NOFLAGS` | C `0x0`, **LIVE** | const.js `0` |
| `GETOBJ_EXCLUDE` | C **`-3`**, JS const.js **`0`** | live getobj `=== 0` |
| `getobj_name` | C `'i'` `getobj("name")`, **CLONE** | still `'i'` only — do **not** add #2 |
| `cmdq_pop` canned | C `:511–519`, **OMIT named** | |
| lootabc / invent-gated i/o | C `:508–537`, **OMIT named** | |
| `#if 0` EXCLUDE | C `:582–584`, **OMIT** (dead in C) | |
| artifact_name slip | **OMIT named** | |

`node scripts/csym.mjs docallcmd` → `:498-601`. `call_ok` → `:479-495`. `docall` → `:635-676`. `xname` → `:574-578`. `objtyp_is_callable` → `:428-463`. `--callers call_ok`: three sites. `--callers docallcmd`: none in src.

RNG: none in this arm (`getobj` itself has no extra `rn2` here). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
getobj           js/invent.js:6247   ASYNC — await required
call_ok          js/do_name.js:111   sync
docall           js/do_name.js:1234   ASYNC — await required
xname            js/objnam.js:741   sync
docallcmd        js/do_name.js:1073   ASYNC — await required
objtyp_is_callable js/do_name.js:85   sync
getobj_name      NOT EXPORTED — 1 LOCAL js/do_name.js:136
             => Do NOT write clone #2.
```

`--can do_name.js invent.js getobj`: ALREADY. `--can do_name.js objnam.js xname`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `getobj_name` #2. Do **not** add `call_ok` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Menu key. C `a_char='o'` group accelerator `'n'`; `select_menu` returns `'o'`. JS `nhgetch` raw keys already accept `i`/`y`, `m`/`C`, `d`/`\\`, `f`/`,` the same way; `'o' || 'n'` is that pattern, not a second C `case`. **Match the accelerators.** `cmdq_pop` KEY still omitted — canned `'o'` would skip the menu in C (`:511–519`). **Named.**

`getobj("call", call_ok, GETOBJ_NOFLAGS)`. JS `await getobj('call', call_ok, GETOBJ_NOFLAGS)` with const `0` = C `0x0`. **Match `:573`.** `call_ok`: `!obj || !objtyp_is_callable` → EXCLUDE; `!dknown || (oc_name_known && !oc_uname)` → DOWNPLAY; else SUGGEST. JS same (`:479–495`). **Match.** C callback EXCLUDE is **`-3`**. JS live `getobj_finish_pick` compares `=== GETOBJ_EXCLUDE` from const.js **`0`**. Returning `0` is required for the **LIVE** callee (same as D-1656 grease coins). **Do not stamp Match C enum `-3`.** Semantic: non-callable → silly `"You cannot call …"` / `"That is a silly thing to call."` via invent.js. **Match that message path.**

`xname` then dknown. C `(void) xname(obj)` may set `dknown` via `observe_object` when `!Blind && !distantname`. JS LIVE `xname` has that call (`objnam.js:747–751`). Then `!dknown` → `You("would never…")` else `docall`. JS `pline('You would never recognize another one.')` then `await docall(obj)`. **Match `:577–588`.** `#if 0` EXCLUDE arm not present — C does not compile it. **Match.**

Callee closure (`'o'` arm). LIVE: `getobj`, `call_ok`, `objtyp_is_callable`, `xname`, `docall`, `pline`. CLONE: none new (`getobj_name` stays on `'i'`). OMIT named: cmdq canned; lootabc; invent-gated menu; `'i'` clone; sink-fluid `docall`; artifact_name slip. STUB: **none** in the `'o'` arm (empty return deleted). Combined-arm ships. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject live getobj `"call"` + xname/dknown/docall: **true.** D-log `GETOBJ_NOFLAGS`: **true as `0x0`.** D-log “COIN/`GETOBJ_EXCLUDE` 0” is the **JS invent.js** convention, **false as a C `hack.h:515` citation**. Do **not** stamp “Match C `'i'` `getobj("name")`.” Do **not** stamp “Match C `cmdq_pop`.” Do **not** stamp “Match C `docall` sink-fluid.” Do **not** re-port `lookup_novel` (D-1651) or `rename_disco` (D-1647). Public `#name` type-name is **public-unhit** on the tourist green pair.

## Density

+24 / −6: C `'o'` arm 18 lines + live getobj import. §2b one `docallcmd` case. Did not glue `'i'` or canned. C is that small.

## Verification

Wired: live getobj NOFLAGS; `call_ok` ranks; `xname` observe; `!dknown` pline; `docall`. Unwired C: cmdq; lootabc; invent omit; `'i'` clone; sink-fluid. Conf: no RNG. No seed gate.

D-log private canary `docallcmd` source + `call_ok(null)` EXCLUDE; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for `#name` `'o'`. Fortress does not prove `:573`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `cmdq_pop` canned / iactions Call; `flags.lootabc`; `if (gi.invent)` omit i/o; `'i'` `getobj_name` clone; `docall` sink-fluid/`safe_qbuf`; artifact_name slip (`restrict_name`/`wipeout_text`). Do **not** add `getobj_name` #2. Do **not** add `call_ok` #2. Do **not** re-port `lookup_novel` (D-1651). Do **not** stamp Match C `GETOBJ_EXCLUDE` `-3` via const 0.

Verdict: **ACCEPT-WITH-DEBT**
