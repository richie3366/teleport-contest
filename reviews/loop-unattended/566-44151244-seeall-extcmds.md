# Review 566 — 44151244 — cmd.c #seeall EXT_CMDS doprinuse (D-1605)

## Metadata
- Full / short hash: `441512445395c388c047fb6f6e2db81b922ca413` / `44151244`
- Parent: `49933ea8` (D-1604). This file audits **this SHA only** (third of nine `js/` commits since review **563**). Archive **Addressed:** D-1605 `44151244`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 00:42:20 +0200
- D-id: **D-1605**
- Stats: `js/getline.js` +90/−15, `js/cmd.js` +4/−2. Band **150–350** (js/ insertions **94**).
- Claims to close: Open typed `#seeall` after D-1589. Not doprinuse body. Not `doextlist`. Not BIND= `seeall`. `reviews/loop-2026-08-15/` has no unpaid seeall Must-fix.
- JS / map: `getline.js` `EXT_CMDS` / `doextcmd` / `accept_menu_prefix`; callees `invent.js` `dopr*`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **550** / **561** named `#seeall` / perm_invent scroll (not this).

## Intent vs deliverable

Git subject promises: typed `#seeall` runs `doprinuse` and m-prefix follows `CMD_M_PREFIX` instead of staying unknown.

Pinned C `cmd.c` extcmdlist `"seeall"` `:1848–1849` `doprinuse`, `IFBURIED|GENERALCMD|CMD_M_PREFIX`, no AUTOCOMPLETE. Siblings `:1850–1859` (`seeamulet`/`seearmor`/`seerings`/`seetools`/`seeweapon`). `doextcmd` `:492–520`. `can_do_extcmd` `:462–489`. `accept_menu_prefix` `:3507–3512`. Callee `invent.c` `doprinuse` `:4738–4757` (already live). `--callers accept_menu_prefix`: `doextcmd` `:507`; rhack `:541`. `--callers can_do_extcmd`: `doextcmd` `:505`; rhack `:3689`. `--callers doprinuse`: none as a C call (function pointer in the table; key `*`).

```1848:1849:nethack-c/upstream/src/cmd.c
    { '*',    "seeall", "show all equipment in use",
              doprinuse, IFBURIED | GENERALCMD | CMD_M_PREFIX, NULL },
```

```505:514:nethack-c/upstream/src/cmd.c
        if (!can_do_extcmd(&extcmdlist[idx]))
            return ECMD_OK;
        if (iflags.menu_requested && !accept_menu_prefix(&extcmdlist[idx])) {
            pline("'%s' prefix has no effect for the %s command.",
                  visctrl(cmd_from_func(do_reqmenu)),
                  extcmdlist[idx].ef_txt);
```

Old JS: rhack `*` already `doprinuse` (D-0340/D-1589); `EXT_CMDS` had no see* runners so `#seeall` was unknown. `doextcmd` kept m-prefix via a name Set that omitted seeall.

The diff **does** add six `EXT_CMDS` runners that `await import` live `dopr*`, replace the name Set with C’s flag test, and call `can_do_extcmd(row)` before the prefix check. It **does not** re-port `doprinuse`, loop `while (func == doextlist)`, or BIND= overlays. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| EXT_CMDS `seeall` | C `:1848–1849`, **LIVE this SHA** | `autocomplete: false` |
| EXT_CMDS seeweapon/armor/rings/amulet/tools | C `:1850–1859`, **LIVE this SHA** | sibling cluster |
| `doprinuse` | C `:4738–4757`, **LIVE** | D-0340/D-1589; not this body |
| `doprwep`/`doprarm`/`doprring`/`dopramulet`/`doprtool` | C invent.c, **LIVE** | same |
| `dispinv_with_action` / `is_inuse` | **LIVE** | callees of dopr* |
| `doextcmd` can_do + prefix | C `:505–514`, **LIVE this SHA** | |
| `can_do_extcmd` | C `:462–489`, **LIVE** | Lua NHCB named |
| `accept_menu_prefix` | C `:3507–3512`, **CLONE** (getline local) | flag, not name Set |
| `doextlist` re-prompt loop | C `:498–518`, **OMIT named** | |
| `cmd_from_func` visctrl | C `:508`, **OMIT named** | JS `'m'` |
| BIND= `seeall` | C `cmdbind_get`, **OMIT named** | |
| `showgold` `#` | C `:1868–1869`, **OMIT named** | not a see* sibling in the queue |
| uskin `noarmor` | C `doprarm`, **OMIT named** | |
| rhack-key `accept_menu_prefix` `:541` | **OMIT named** | charset still |

`node scripts/csym.mjs doextcmd` → `:492-520`. `can_do_extcmd` → `:462-489`. `accept_menu_prefix` → `:3507-3512`. `doprinuse` → `:4738-4757`. `doprwep` → `:4549-4574`. `doprarm` → `:4600-4638`. `doprring` → `:4641-4675`. `dopramulet` → `:4678-4694`. `doprtool` → `:4714-4735`.

RNG: none in doextcmd / doprinuse / accept_menu_prefix. No seed gate.

Generated `EXTCMDLIST` seeall `flags: 137` = `IFBURIED|GENERALCMD|CMD_M_PREFIX` (`0x01|0x08|0x80`). **Match the table.**

`node scripts/sym.mjs` on new / re-pointed names (name Set deleted; `accept_menu_prefix` local; `dopr*` imported dynamically):

```
doprinuse        js/invent.js:4360   ASYNC — await required
doprwep          js/invent.js:4226   ASYNC — await required
doprarm          js/invent.js:4272   ASYNC — await required
doprring         js/invent.js:4295   ASYNC — await required
dopramulet       js/invent.js:4325   ASYNC — await required
doprtool         js/invent.js:4340   ASYNC — await required
can_do_extcmd    js/cmd.js:297   ASYNC — await required
accept_menu_prefix NOT EXPORTED — 1 LOCAL (getline.js:812). Do NOT write clone #2.
doextcmd         js/getline.js:921   ASYNC — await required
dispinv_with_action js/iactions.js:579   ASYNC — await required
is_inuse         js/invent.js:687   sync
```

`--can getline.js invent.js doprinuse`: IN-SCC, `doprinuse` hoisted, **VERDICT SAFE**. `--can getline.js cmd.js can_do_extcmd`: IN-SCC, hoisted, **VERDICT SAFE**. Dynamic `await import` is lazy; not a top-level TDZ read. Do **not** stamp “cycle-forced clone.” Do **not** add `accept_menu_prefix` #2 in `cmd.js`. Do **not** add `doprinuse` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Typed `#seeall`. `get_ext_cmd` exact-match now finds `availableExtCmds` `seeall`; `ec.run` is `doprinuse()`. **Match `:1848–1849` dispatch.** Key `*` was already that callee. This SHA is the `#` runner, not a second body.

Sibling see*. Same flags, live `dopr*` exports. **Match `:1850–1859` as typed `#`.** Key `)[="(` already D-1589. Combined-arm: every callee is LIVE (`dopr*` + `dispinv_with_action` / `is_inuse` / `prinv`). STUB: **none**. §2b sibling cluster may ship.

`doextcmd` gate. Resolve `EXTCMDLIST` row; `can_do_extcmd` (wiz / buried / fuzzer; Lua named); if `menu_requested && !CMD_M_PREFIX` pline and clear; set `ext_tlist`; run. **Match `:505–515` except** C `visctrl(cmd_from_func(do_reqmenu))` vs JS `"'m' prefix..."` and C `while (func == doextlist)`. Named. `can_do_extcmd(undefined)` returns false if `find` misses; C always has the table slot. seeall is in both lists.

`accept_menu_prefix`. `ec && (flags & CMD_M_PREFIX)`. **Match `:3510–3511`.** Old name Set omitted seeall so `m #seeall` printed “no effect.” Flag 137 keeps the prefix. **Match the 1605 claim.** Other `#` commands now follow the generated flags too (was a Set of twelve names). That is C, not a Set hallucination.

`doprinuse` body unchanged: count `is_inuse`, empty You, else `dispinv_with_action(null, true, null)`. **Match `:4747–4756` already.** This SHA does not rewrite it.

Callee closure (`#seeall` arm). LIVE: `doprinuse`, `can_do_extcmd`, `accept_menu_prefix` clone. OMIT named: `doextlist` loop, visctrl, BIND=. STUB: none. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject typed `#seeall` runs `doprinuse`: **true.** Subject m-prefix follows `CMD_M_PREFIX`: **true of `doextcmd`.** D-log “Not the doprinuse body”: **true.** Do **not** stamp “Match C `doextlist` re-prompt.” Do **not** stamp “Match C `cmd_from_func` visctrl.” Do **not** stamp “Match C BIND= `seeall`.” Do **not** stamp “Match C rhack `:541` flag `accept_menu_prefix` for every key.” Do **not** stamp “Match C `#showgold`.” Do **not** stamp “Match C uskin `noarmor`.” Public `#seeall` is unhit; `*` key is D-0340.

## Density

One extcmdlist see* envelope plus the `doextcmd` flag test those rows need. +94 JS. Sibling arms share live `dopr*` callees. Did not glue `doextlist` / `#perminv`. §2b OK.

## Branch-by-branch confirm

1. `#seeall` exact: `doprinuse`. **Match.**
2. Empty pack `!is_inuse`: “not wearing or wielding.” **Match callee.**
3. `m #seeall`: `CMD_M_PREFIX` keeps `menu_requested`. **Match.**
4. Wizard-only extcmd via `can_do_extcmd`. **Match** (Lua named).
5. Buried without `IFBURIED`. seeall has `IFBURIED`. **Match table.**
6. `doextlist` loop / BIND= / visctrl / `#showgold`. **Named.**

## Callers / RNG ledger

Wired: `doextcmd` ← rhack `#`. Dynamic `dopr*` from `invent.js`. No RNG. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `accept_menu_prefix` #2. Do not add `doprinuse` #2. Do not restore the name Set as the seeall “fix.” Do not wrap `wildmiss` as `pline_mon`. Do not re-port `doprinuse` for density.

## Verification

D-log private canary **21**/21; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for typed `#seeall` / `m #seeweapon`. Fortress `*` key does not prove the `#` runner. `doextlist` unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `doextlist` `while` (`cmd.c:518`); BIND= `seeall`; `cmd_from_func(do_reqmenu)` visctrl (`:508`); rhack `:541` flag table vs key charset; `#showgold` `doprgold` (`:1868`); uskin `noarmor` (`doprarm`); Lua `NHCB_CMD_BEFORE`. Do not add `accept_menu_prefix` #2. Key `*` / inuse_only are D-0340 / D-1589.

Verdict: **ACCEPT-WITH-DEBT**
