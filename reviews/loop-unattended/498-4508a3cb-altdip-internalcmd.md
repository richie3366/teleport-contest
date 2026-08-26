# Review 498 — 4508a3cb — cmd.c INTERNALCMD #altdip (D-1537)

## Metadata
- Full / short hash: `4508a3cb187ddbbe2460f1c45b6ba02e7b91ef2b` / `4508a3cb`
- Parent: `2778c077` (D-1536). This file audits **this SHA only** (seventh of nine `js/` commits since review **491**). Archive **Addressed:** D-1537 `4508a3cb`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 07:20:43 +0200
- D-id: **D-1537**
- Stats: 14 files, +245 / −39 — `js/cmd.js` +63 / −1, `js/getline.js` +63 / −2, `js/iactions.js` +17 / −2, `js/generated/extcmdlist_data.js` +6, `js/potion.js` comments. Band 150–350 (js/ insertions ~155).
- Claims to close: Open `cmd.c` INTERNALCMD `#altdip` (named from D-1536 / D-1500 `dip_into`). Not dip_into body. `reviews/loop-2026-08-15/` has no unpaid altdip Must-fix.
- JS / map: extcmdlist extract + `cmd.js` / `getline.js` / `iactions.js`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: none unpaid.

## Intent vs deliverable

Git subject promises: canned `dip_into` looks up the table and buried heroes are refused, not a named omit that dropped the row from `extcmdlist`.

Pinned C `cmd.c` `:2063` `{ '\\0', "altdip", NULL, dip_into, INTERNALCMD }`; `cmdq_add_ec` `:253–270` `typ=CMDQ_EXTCMD` via `ext_func_tab_from_func` `:3015–3025`; `can_do_extcmd` `:462–488`; `extcmds_match` `:2532–2534` skip `INTERNALCMD`; `func_tab.h` `INTERNALCMD=0x0040`, `IFBURIED=0x0001`. Caller `iactions.c` IA_DIP_OBJ. Typed `#` uses `ECM_IGNOREAC|ECM_EXACTMATCH` so `#altdip` is unknown.

```2060:2065:nethack-c/upstream/src/cmd.c
    { '\0', "clicklook", NULL, doclicklook, INTERNALCMD | MOUSECMD, NULL },
    { '\0', "mouseaction", NULL, domouseaction, INTERNALCMD | MOUSECMD, NULL },
    { '\0', "altadjust", NULL, adjust_split, INTERNALCMD, NULL },
    { '\0', "altdip", NULL, dip_into, INTERNALCMD, NULL },
    { '\0', "alttakeoff", NULL, ia_dotakeoff, INTERNALCMD, NULL },
    { '\0', "altunwield", NULL, remarm_swapwep, INTERNALCMD, NULL },
```

Old JS: extractor skipped INTERNALCMD; IA_DIP_OBJ pushed a bare `dip_into` with no `can_do_extcmd`.

The diff **does** extract INTERNALCMD rows (flags 64 / 2112), skip them in `extcmds_match` / `availableExtCmds`, queue `{typ:CMDQ_EXTCMD,txt:'altdip'}`, run `can_do_extcmd` (buried refuse, no IFBURIED). It **does not** port other INTERNALCMD bodies, Eyes `is_plural`, Lua `NHCB_CMD_BEFORE`, or `can_do_extcmd` on typed `#dip`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| extcmdlist `"altdip"` | C `:2063`, **LIVE this SHA** | extract |
| `cmdq_add_ec` | C `:253`, **CLONE** `cmdq_add_ec_entry` | txt instead of fn ptr |
| `ext_func_tab_from_func` | C `:3015`, **CLONE** `ext_func_tab_from_txt` | by name |
| `can_do_extcmd` | C `:462`, **LIVE this SHA** | NHCB named omit |
| `extcmds_match` | C `:2524`, **LIVE this SHA** | |
| `dip_into` | C `potion.c`, **LIVE** | D-1500 |
| `CMDQ_EXTCMD` | C `hack.h:178`, **LIVE** | enum 1 |
| other INTERNALCMD bodies | C `:2060–2065`, **OMIT named** | table rows only |
| `NHCB_CMD_BEFORE` | C `:467–477`, **OMIT named** | |

`node scripts/sym.mjs dip_into can_do_extcmd ext_func_tab_from_txt extcmds_match cmd_from_ecname cmdq_add_ec_entry`:

```
dip_into         js/potion.js:2651   ASYNC — await required
can_do_extcmd    js/cmd.js:129   ASYNC — await required
ext_func_tab_from_txt js/cmd.js:114   sync
extcmds_match    js/getline.js:616   sync
cmd_from_ecname  js/dokeylist.js:266   sync
cmdq_add_ec_entry NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/iactions.js:43
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in scored `js/` (extractor is scripts/). Rule #2 clean. **No gameplay RNG.**

## C ↔ JS fidelity

Table. `"altdip"` flags `INTERNALCMD` only (64). **Match `:2063` + `0x0040`.** Sibling INTERNALCMD rows extracted; their `ef_funct` bodies stay named. Typed `#` still skips them. **Match C table vs match vs user `#`.**

Match. `extcmds_match` continues on `CMD_NOT_AVAILABLE|INTERNALCMD`, then wizard, autocomplete unless `ECM_IGNOREAC`, 1-char, exact/`startsWith`. **Match `:2532–2551`.** `get_ext_cmd` uses `ECM_IGNOREAC|ECM_EXACTMATCH`; `#altdip` → unknown. **Match tty.** `availableExtCmds` drops `internal`. **Match.**

Queue. C `cmdq_add_ec(dip_into)` stores `CMDQ_EXTCMD` + table row. JS IA_DIP_OBJ stores `{typ:CMDQ_EXTCMD,txt:'altdip',run:dip_into}`. Lookup by txt vs fn ptr is equivalent for this unique `dip_into` row. **Match `:253–270` for IA_DIP_OBJ.** Other canned arms stay bare functions. **Named.**

`can_do_extcmd`. Wizard / buried / fuzzer. altdip has no IFBURIED → buried `You can't do that while you are buried!` then `cmdq_clear` leftover keys. **Match `:479–488` + rhack reset.** Lua `NHCB_CMD_BEFORE` skipped. **Named.**

`cmd_from_ecname("altdip")`: now found in EXTCMDLIST → `#altdip` if unbound. **Match C `nh.eckey`.**

Callee closure (canned altdip). LIVE: `dip_into`, `can_do_extcmd`, `cmdq_pop`/`rhack`. CLONE: txt lookup vs `ext_func_tab_from_func`. OMIT named: NHCB, other INTERNALCMD `ef_funct`. STUB: none. **The altdip arm may ship.** Do **not** type `#altdip` as a user extcmd.

## Hallucinations / overclaim

Subject canned lookup + buried refuse, typed unknown: **true.** D-log “extractor keeps INTERNALCMD”: **true of all six rows**; only altdip has a runner. That is **not** “dispatch ported, callee stubbed” for altdip (`dip_into` is live). It **is** table-complete / body-named for clicklook/… . Stamping **Addressed:** D-1537 is fair for **`:2063` + match skip + canned can_do**. Do **not** stamp “Match C `ia_dotakeoff`.” Do **not** stamp “Match C Eyes `is_plural`.”

## Density

~155 JS: table + match + canned path for one INTERNALCMD. §2b OK (one C row + the lookup machinery it needs). Did not glue wander.

## Branch-by-branch confirm

1. Typed `#altdip`: unknown. **Match.**
2. Canned not buried: `dip_into`. **Match.**
3. Canned buried: refuse, clear queue. **Match.**
4. `#dip` still user autocomplete. **Unchanged; can_do on typed `#` named.**
5. dokeylist IGNORECMD includes INTERNALCMD. **Match C dokeylist skip.**

## Callers / RNG ledger

C: IA_DIP_OBJ; lua `nh.eckey`. JS the same. Public-unhit. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. Extractor writes `js/generated/`. No scored `fs`. No FORCE.

## Verification

D-log canary **24**/24 (flags; `cmd_from_ecname`; match skip; dokeylist omit; buried pline + clear; not-buried run; Rule #2); green+strict; cohort **7**/7. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: Eyes `is_plural`; other INTERNALCMD bodies.

Verdict: **ACCEPT-WITH-DEBT**
