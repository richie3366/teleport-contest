# Review 192 — a3c04dd7 — cmd.c `#teleport` `doextcmd` → `dotelecmd` (D-1230)

## Metadata
- Full / short hash: `a3c04dd79e5d501916047c2593fbd2e7672051da` / `a3c04dd7`
- Parent: `f8231830` (reviews **188–191**). JS parent `0ddfb189` (D-1229). This file audits **this SHA only**. Archive row **Addressed:** D-1230 `a3c04dd7` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 21:44:59 +0200
- D-id: **D-1230**
- Stats: 12 files, +125 / −30 — `js/getline.js` +26; `js/cmd.js` +6 / −4; comments `js/teleport.js` / `js/spell.js`.
- Claims to close: Open `teleport.c` `#teleport` `doextcmd` (named from D-1209 / D-1225 / review **171** / **187**). Not energy-spellcast. Queue said `teleport.c`; C entry is `cmd.c` extcmdlist. `reviews/loop-2026-08-15/` has no unpaid `#teleport` Must-fix.
- JS / map: `getline.js` EXT_CMDS `"teleport"` + `doextcmd` prefix gate; `cmd.js` rhack `#`. `c-js-map/turns.md`. rolling-boulder TELEP `pline_xy` still named.
- Prior reviews this SHA claims to close: **171** named omit `#teleport`; **187** item 1.

## Intent vs deliverable

Git subject promises: “Match C cmd.c #teleport doextcmd so #teleport calls dotelecmd like ^T, instead of unknown extended command.”

C (`cmd.c:1890–1891`): `"teleport"` → `dotelecmd`, flags `IFBURIED | CMD_M_PREFIX`, **no** AUTOCOMPLETE. Enter resolution is `ECM_IGNOREAC | ECM_EXACTMATCH` so the name is not in the autocomplete table. `doextcmd` itself is CMD_M_PREFIX (`:1668–1669`); after resolve, `:507–511` prints `"'%s' prefix has no effect for the %s command."` via `visctrl(cmd_from_func(do_reqmenu))` and clears `menu_requested` unless `accept_menu_prefix` (`:3508–3512` = `flags & CMD_M_PREFIX`).

Old JS: rhack `key===20` → live `dotelecmd` (D-1209/D-1225); EXT_CMDS lacked `"teleport"`; rhack dropped `m` on `#`.

The diff **does** add the runner (not EXT_CMD_AC), keep `m` on `#`, and clear with C’s pline when the resolved name is not in a CMD_M_PREFIX name set. It does **not** pull rolling-boulder TELEP `pline_xy`, directional `weffects`, Amulet drain, `cmd_from_func(do_reqmenu)` (hardcoded `'m'`), or `doextlist` repeat. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| EXT_CMDS `"teleport"` | C extcmdlist `:1890–1891`, **new** | `autocomplete: false`; `run` → `dotelecmd` |
| `dotelecmd` | C callee, **already live** | D-1209 / D-1225; not a stub |
| rhack `ch === '#'` in `accepts_m_prefix` | C `doextcmd` CMD_M_PREFIX | table clone; remainder still named |
| `EXTCMD_M_PREFIX` | C `accept_menu_prefix`, **clone** | names in EXT_CMDS that C flags CMD_M_PREFIX |
| `doextcmd` prefix pline | C `:507–511`, **wired** | `'m'` not `visctrl(cmd_from_func)` |
| EXT_CMD_AC | C AUTOCOMPLETE list | teleport **absent** (C has no AUTOCOMPLETE) |
| rolling-boulder TELEP `pline_xy` | **named omit** | |
| `weffects` / Amulet drain | **named omit** | D-1225 debt |
| `cmd_from_func(do_reqmenu)` | **named omit** | m-prefix key is always `m` here |
| `doextlist` while-loop | C `:517`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.**

## C ↔ JS fidelity

Pinned C (`cmd.c:1890–1891` + `:507–511`):

```
    { C('t'), "teleport", "teleport around the level",
              dotelecmd, IFBURIED | CMD_M_PREFIX, NULL },
        if (iflags.menu_requested && !accept_menu_prefix(&extcmdlist[idx])) {
            pline("'%s' prefix has no effect for the %s command.",
                  visctrl(cmd_from_func(do_reqmenu)),
                  extcmdlist[idx].ef_txt);
            iflags.menu_requested = FALSE;
        }
        retval = (*func)();
```

JS EXT_CMDS: `name: 'teleport'`, `autocomplete: false`, `run` dynamic-imports live `dotelecmd`. `get_ext_cmd` exact-match on `availableExtCmds()` (full list, not AC). Typing `tele` + Enter is unknown; full `teleport` is not. Match C IGNOREAC+EXACTMATCH.

`EXTCMD_M_PREFIX` vs C flags for names that exist in EXT_CMDS: annotate/dip/genocided/loot/offer/overview/pay/teleport/tip/travel/vanquished/wizwish all have CMD_M_PREFIX. `version` is `doextversion` (**no** M-prefix; `versionshort`/`doversion` is a different cmd). `jump` has none — journal `m#jump` clears. The set is a subset clone, not a wrong table for shipped names.

`#teleport` reaches the same `dotelecmd` as `^T`. **Callee is live**, not a stub that prints unknown. Buried `can_do_extcmd` still named.

## Hallucinations / overclaim

Subject + D-1230 say `#teleport` calls `dotelecmd` like `^T`. **The EXT_CMDS row + rhack `#` keep-m + doextcmd prefix gate are the hunk.** Stamping **Addressed:** D-1230 is fair. Do **not** stamp “Match C every CMD_M_PREFIX extcmd” or “Match C `cmd_from_func`.” Queue filename `teleport.c` was the Open row; C dispatch is `cmd.c` (D-log already said so).

## Density

One extcmd wire + the two C prefix sites it needs. ~26 + 6 JS lines. Right size. Did not glue weffects.

## Branch-by-branch confirm

1. `#teleport` exact: `dotelecmd`. Match.
2. `#tele` / `#xyzzy`: unknown. Match EXACTMATCH.
3. Progressive AC will not expand `tel` → teleport (not in EXT_CMD_AC). Match no AUTOCOMPLETE.
4. Bare `^T`: unchanged. Match.
5. `m#teleport`: rhack keeps `m`; teleport is in the set; `dotelecmd` sees menu_requested (D-1209). Match.
6. `m#jump`: pline no-effect; clears `m`. Match C jump flags.
7. `m#version`: version is doextversion, not CMD_M_PREFIX; clears. Match.
8. Wizard-only name when not wizard: existing wiz pline; not this SHA.
9. `doextlist` repeat: JS still one-shot. **Named.**
10. Energy/spellcast inside `dotele` is D-1225, not this SHA.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./teleport.js')` is ESM, not filesystem.

## Verification

Journal: private canary **23**/23 (C flags + exact-match; JS not in AC; `#teleport` reaches `dotele` unknown-spell; `m#teleport` keeps m; `m#jump` clears; unknown `xyzzy`/`tele`); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session types `#teleport` (plain `^T` unchanged). Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. `dotelecmd` is the real C function already ported.

Named omits (map, not Must-fix):

1. rolling-boulder TELEP `pline_xy`
2. directional `weffects` / Amulet drain (D-1225)
3. `cmd_from_func(do_reqmenu)` visctrl (always `'m'`)
4. `doextlist` while-loop / buried `can_do_extcmd`

Do not Must-fix “finish the accept_menu_prefix table.” Do not skip `#` in `accepts_m_prefix`.

## Callers / RNG ledger

C callers of this name: `#teleport` / bound `C('t')`. JS `#` → `doextcmd` → this row; `^T` still rhack key 20. No `rn2` here. Public fortress is not evidence `#teleport` was typed — the C walk + canary is.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `#teleport` now resolves to live `dotelecmd` with C’s no-AUTOCOMPLETE exact match and m-prefix keep/clear; rolling-boulder TELEP and weffects stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1230 `a3c04dd7`.
