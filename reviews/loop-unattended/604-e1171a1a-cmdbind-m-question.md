# Review 604 — e1171a1a — cmd.c rhack cmdbind_get M('?') → doextlist (D-1643)

## Metadata
- Full / short hash: `e1171a1a73856972e15e287aeef99f6242b7f67c` / `e1171a1a`
- Parent: `a95b0aa6` (D-1642). This file audits **this SHA only** (fifth of nine `js/` commits since review **599**). Archive **Addressed:** D-1643 `e1171a1a`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 11:00:35 +0200
- D-id: **D-1643**
- Stats: `js/cmd.js` +122/−17, `js/getline.js` +19/−1, `js/dokeylist.js` +18/−3. Band **150–350** (js/ insertions **159**).
- Claims to close: Open BIND= M('?') after D-1642. Not `doextlist` body (D-1625). Not overlay if/else keys (D-0897). `reviews/loop-2026-08-15/` has no unpaid cmdbind Must-fix.
- JS / map: `dokeylist.js` `cmdbind_get`; `cmd.js` `rhack_dispatch_bound`; `getline.js` `extcmd_run_by_txt`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named after D-1625.

## Intent vs deliverable

Git subject promises: default M('?') runs `doextlist` (extcmdlist `"?"` bind) instead of Unknown command after D-1625.

Pinned C `cmd.c` `cmdbind_get` `:2109–2123` (`node scripts/csym.mjs cmdbind_get`). `--callers` includes `rhack` `:3679`. extcmdlist `:1670–1672` `M('?')` `"?"` `doextlist` `IFBURIED|AUTOCOMPLETE|GENERALCMD|CMD_M_PREFIX`. `commands_init` `:2754–2756` `cmdbind_add` for every `extcmd->key`. `rhack` tlist `:3678–3828`. `global.h` `M(c)` `0x80|c` → M('?')=191. `doextlist` body is D-1625.

```1670:1672:nethack-c/upstream/src/cmd.c
    { M('?'), "?", "list all extended commands",
              doextlist, IFBURIED | AUTOCOMPLETE | GENERALCMD | CMD_M_PREFIX,
              NULL },
```

```3678:3689:nethack-c/upstream/src/cmd.c
        gc.cmd_bind = cmdbind_get(key & 0xFF);
        ...
        if (tlist != 0) {
            if (!can_do_extcmd(tlist)) {
                reset_cmd_vars(TRUE);
```

Old JS: `#?` / help `k` live; keystroke 191 Unknown `M-?`. Overlay `try_rc_keybind` inventory-only. The diff **does** export `cmdbind_get` over default+overlay table, `rhack_dispatch_bound` on the if/else miss path, `extcmd_run_by_txt` from EXT_CMDS, `accept_menu_prefix_tab` for CMD_M_PREFIX binds. It **does not** route if/else keys through `cmdbind_get` (D-0897), or run default meta with no EXT_CMDS runner. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `cmdbind_get` | C `:2109–2123`, **LIVE this SHA** | array walk ≡ list; key 0 null |
| `build_default_cmdbinds` | C `commands_init`, **LIVE** | EXTCMDLIST keys including 191 |
| `rhack_dispatch_bound` | C rhack tlist `:3688–3827`, **CLONE** | miss-path only; MOVEMENTCMD still early |
| `extcmd_run_by_txt` | C `ef_funct` by `ef_txt`, **LIVE this SHA** | same EXT_CMDS; skip INTERNALCMD |
| `doextlist` | C `:562+`, **LIVE** | D-1625; not re-ported |
| `can_do_extcmd` | C, **LIVE** | refuse before run |
| `accept_menu_prefix_tab` | C `accept_menu_prefix`, **LIVE this SHA** | CMD_M_PREFIX |
| rhack if/else keys | C also tlist, **OMIT named** | D-0897 overlay |
| default meta, no runner | C still tlist, **OMIT named** | Unknown until EXT_CMDS |
| number_pad layouts | C `commands_init`, **OMIT named** | |

`node scripts/csym.mjs cmdbind_get` → `cmd.c:2109-2123`. `--callers`: `:3679` rhack plus bind/unbind sites. extcmdlist `"?"` `:1670–1672`. `commands_init` → `cmd.c:2749-2782`. `rhack` tlist `:3678–3828`. `M('?')` 191. generated `extcmdlist_data.js` `{ key: 191, txt: "?", flags: 139 }` = IFBURIED|AUTOCOMPLETE|GENERALCMD|CMD_M_PREFIX.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
cmdbind_get      js/dokeylist.js:245   sync
extcmd_run_by_txt js/getline.js:922   sync
rhack_dispatch_bound NOT EXPORTED — 1 LOCAL js/cmd.js:612
doextlist        js/cmd.js:410   ASYNC — await required
```

`--can cmd.js dokeylist.js cmdbind_get` / `cmd.js getline.js extcmd_run_by_txt`: ALREADY. Do **not** add `cmdbind_get` #2. Do **not** stamp “cycle-forced clone.”

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`cmdbind_get`. C walks `gc.Cmd.cmdbinds` list; `!key` → NULL. JS `key&0xff`; 0 → null; `cmdbinds_live()[k]`. Defaults: `commands_init` binds every `extcmd->key` then number_pad extras. JS `build_default_cmdbinds` same (EXTCMDLIST then h/j/k/l/…). Overlay Map still last-wins. **Match `:2109–2123` plus init.** M('?')=191 is in the generated table. `dokeylist.js` `M = ch => 0x80|ch` **Match global.h**.

`extcmd_run_by_txt`. C `tlist->ef_funct`. JS looks up EXT_CMDS by `ef_txt` (`?` → `doextlist`). INTERNALCMD skipped (`bind_key` does too). Wizard rows returned; `can_do_extcmd` refuses WIZMODECMD. **Match.** Same table as typed `#`, not a second clone of `doextlist`.

tlist path. C after movement: `cmdbind_get`; `can_do_extcmd`; prefix reject; `set_occupation`; REPEAT queue (`func != do_repeat && func != doextcmd`); `CMD_INSANE`; `(*func)()`; `ext_tlist` shift; PREFIXCMD loop; MOVEMENTCMD/`domove`; CANCEL/FAIL vs `(ECMD_OK|ECMD_TIME)==ECMD_OK`; TIME → `context.move`. `ECMD_OK` is 0 (`const.js`), so C’s OK-only reset is `(res & TIME)==0`. JS `else if ((res & ECMD_TIME)===0)` **Match**. PREFIXCMD continue + `reqmenu` → `was_m_prefix`. **Match `:3762–3773`.** MOVEMENTCMD/`domove`/`dxdy_moveok` stay on the early `isMovementKey`/`isRunKey` arms. Named. Dispatch is not “ported, callee stubbed”: `doextlist` is LIVE (D-1625).

Prefix reject `which`: C `cmd_from_func` / `visctrl` / `"move-no-pickup or request-menu"`. JS `reqmenu` → `visctrl('m')` else `prefix_seen.txt`. Close analogue; M('?') without a prefix never hits it.

Miss path only. C uses tlist for **every** bound key, including `'?'` help. JS if/else still owns those keys; overlay BIND= on them stays inventory-only (D-0897). **Named, not a stub inside the M('?') arm.** Keys the if/else misses (191, other meta with a runner) now tlist. No runner → `{}` → Unknown. Named.

`accept_menu_prefix_tab`: C `CMD_M_PREFIX`. `"?"` flags include it, so `m`+M('?') is accepted. **Match extcmdlist flags.**

Callee closure (M('?') arm). LIVE: `cmdbind_get`, `doextlist`, `can_do_extcmd`, `extcmd_run_by_txt`, EXT_CMDS `?`. CLONE: `rhack_dispatch_bound` (C tlist slice). OMIT named: if/else overlay; meta without runner; number_pad; MOVEMENTCMD in this helper. STUB: none. Combined-arm ships.

## Hallucinations / overclaim

Subject M('?') → `doextlist` vs Unknown: **true** (key 191, txt `"?"`). D-log canary 14/14 + green + cohort: **claimed; this review does not re-run that canary.** Do **not** stamp “Match C overlay BIND= on if/else keys” (D-0897). Do **not** stamp “Match C every default meta bind” — no EXT_CMDS runner still Unknown. Do **not** stamp “Match C `rhack` tlist for `'?'` help.” Do **not** stamp “Match C number_pad `commands_init`.” Do **not** re-port `doextlist` body (D-1625). Public M-? is **mostly unhit** on tourist fortress (help is `?` not meta).

## Density

+159: C 15-line `cmdbind_get` + rhack tlist slice + lookup. §2b one bind/dispatch family. Did not glue overlay if/else. Above a one-`if` peel.

## Verification

Wired: key 191 → `"?"` → `doextlist`; no runner → Unknown; `can_do_extcmd`; PREFIXCMD continue; TIME/move. Unwired C: if/else overlay; number_pad; MOVEMENTCMD in helper. Conf: no `rn2`. No seed gate.

D-log canary **14**/14; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for default M-?. Overlay M-?:seeall is a RC path, not fortress default.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): overlay BIND= on if/else keys (D-0897); default meta without EXT_CMDS runner; number_pad layouts; MOVEMENTCMD/`domove` inside `rhack_dispatch_bound`. Do not add `cmdbind_get` #2. Do not re-port `doextlist` (D-1625). Do not re-port `#seeall` (D-1605). Do not treat `extcmd_run_by_txt` as a second `doextlist`.

Verdict: **ACCEPT-WITH-DEBT**
