# Review 618 — ee4f922a — cmd.c overlay BIND= on if/else keys (D-1657)

## Metadata
- Full / short hash: `ee4f922a848a2f9e5502437dbbc9948d50a376d7` / `ee4f922a`
- Parent: `9ac19d6f` (D-1656). This file audits **this SHA only** (first of nine `js/` commits since review **617**). Archive **Addressed:** D-1657 `ee4f922a`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 14:42:06 +0200
- D-id: **D-1657**
- Stats: `js/cmd.js` +65/−?, `js/getline.js` +159/−1, `js/dokeylist.js` +19/−?, `js/options.js` +6/−?. `js/` +211/−38. Band **150–350** (insertions **211** <250; id >454).
- Claims to close: Open overlay BIND= on if/else keys after D-1643. Not cmdbind_get default M('?'). Not walk-key overlay.
- JS / map: `cmd.js` `rhack_user_overlay_key` / `rhack_dispatch_bound`; `getline.js` EXT_CMDS if/else names; `options.js` `parsebindings` nothing; `dokeylist.js` `cmdbinds_live`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **604** named overlay BIND= on if/else keys (D-0897). `reviews/loop-2026-08-15/` has no unpaid overlay Must-fix.

## Intent vs deliverable

Git subject promises: BIND= overlays if/else keys (including nothing unbind), instead of inventory-only after D-1643.

Pinned C `rhack` `:3626–3843` (`node scripts/csym.mjs rhack`). `cmdbind_get` `:2109–2123`. `--callers cmdbind_get` includes `rhack` `:3679`. `bind_key` `:2661–2728` (`strcmpi` `"nothing"` → `cmdbind_remove` `:2157–2177`). `cmdbind_add` `:2125–2155` replaces in place. `parsebindings` `:7593–7674` (`--callers`: `options.c:7668` `bind_key(..., TRUE)`). `can_do_extcmd` `:462–489`. extcmdlist `'O'` `"options"` `:1780–1781` is `doset_simple` (not `doset`). `'s'` `"search"` `:1846–1847` `f_text` `"searching"`.

```3678:3686:nethack-c/upstream/src/cmd.c
        gc.cmd_bind = cmdbind_get(key & 0xFF);

 do_cmdq_extcmd:
        if (cmdq_ec)
            tlist = cmdq_ec;
        else
            tlist = gc.cmd_bind ? gc.cmd_bind->cmd : NULL;

        if (tlist != 0) {
```

```2668:2672:nethack-c/upstream/src/cmd.c
    if (!strcmpi(command, "nothing")) {
        cmdbind_remove(key);
        return TRUE;
    }
```

C has **no** rhack if/else table: every key is `cmdbind_get` first. JS if/else is that default table. Old JS: `try_rc_keybind` ran **after** walk and only dispatched `inventory`. `parsebindings` `Map.delete` for nothing so if/else still fired. The diff **does** `rhack_user_overlay_key` (`Map.has`, including null), skip early REPEAT, skip if/else, `rhack_dispatch_bound`, EXT_CMDS runners for if/else names, `cmdbinds_live` `strcmpi`-style lowercasing, nothing stores `null`. It **does not** overlay walk keys, PREFIXCMD fight/reqmenu/rush/run **targets**, or EXTCMDLIST `f_text`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rhack` overlay arm | C `:3678–3828` tlist, **LIVE this SHA** for user BIND= | **ASYNC**; walk arm still first |
| `rhack_user_overlay_key` | **CLONE** (JS occupancy of `Cmd.binds`) | do **not** add clone #2 |
| `rhack_dispatch_bound` | C tlist path, **CLONE** helper | do **not** add #2; D-1643 |
| `cmdbind_get` | C `:2109–2123`, **LIVE** | dokeylist; array not linked list |
| `cmdbinds_live` | C `commands_init`+overlay, **CLONE** | lowercases `ef_txt` this SHA |
| `parsebindings` | C `:7593–7674`, **LIVE this SHA** nothing | `bind_key` **not** in JS — do **not** add |
| `cmdbind_remove` | C `:2157–2177` | JS `Map` null + skip if/else |
| `extcmd_run_by_txt` | C `ef_funct` by `ef_txt`, **LIVE** | getline EXT_CMDS |
| `can_do_extcmd` | C `:462–489`, **LIVE** | lua callback named |
| EXT_CMDS if/else names | C extcmdlist rows, **CLONE** name→LIVE `ef_funct` | dynamic `import()`; not a second rhack |
| `try_rc_keybind` | **deleted this SHA** | inventory-only clone |
| `ddoinv` / `doapply` / `doset_simple` / … | C callees, **LIVE** | overlay targets |
| walk-key overlay | C `cmdbind_get` first, **OMIT named** | `isMovementKey` before overlay |
| PREFIXCMD targets | C `do_fight` `:1621–1634` etc., **OMIT named** | no EXT_CMDS `fight`/`reqmenu`/`run`/`rush` |
| `f_text` occupation | C `:3728–3729` / search `:1847`, **OMIT named** | generated EXTCMDLIST has no `f_text` |
| mouse / menu-cmd / CMD_PARAM | C `parsebindings`, **OMIT named** | |
| `initoptions_finish` dirchars | C overwrites hjkl BIND=, **OMIT named** | |

`node scripts/csym.mjs rhack` → `:3626-3843`. `cmdbind_get` → `:2109-2123`. `bind_key` → `:2661-2728`. `cmdbind_remove` → `:2157-2177`. `cmdbind_add` → `:2125-2155`. `parsebindings` → `options.c:7593-7674`. `can_do_extcmd` → `:462-489`. `do_fight` → `:1621-1634`. `--callers rhack`: `allmain.c:530` / `:536`. `--callers parsebindings`: `options.c:7668`.

RNG: none in this SHA’s overlay / parsebindings / EXT_CMDS name table. No seed gate.

`node scripts/sym.mjs` on deleted / re-pointed names:

```
try_rc_keybind   NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
rhack_user_overlay_key NOT EXPORTED — 1 LOCAL js/cmd.js:599
             => Do NOT write clone #2.
rhack_dispatch_bound NOT EXPORTED — 1 LOCAL js/cmd.js:618
             => Do NOT write clone #2.
cmdbind_get      js/dokeylist.js:246   sync
cmdbinds_live    NOT EXPORTED — 1 LOCAL js/dokeylist.js:220
             => Do NOT write clone #2.
parsebindings    js/options.js:316   sync
extcmd_run_by_txt js/getline.js:1079   sync
rhack            js/cmd.js:2209   ASYNC — await required
ddoinv           js/invent.js:3387   ASYNC — await required
doapply          js/apply.js:2432   ASYNC — await required
doset_simple     js/options.js:2055   ASYNC — await required
can_do_extcmd    js/cmd.js:313   ASYNC — await required
bind_key         NOT FOUND in js/**
             Do not add a local clone.
```

`--can cmd.js dokeylist.js cmdbind_get`: ALREADY. `--can cmd.js getline.js extcmd_run_by_txt`: ALREADY. `--can getline.js invent.js ddoinv`: IN-SCC, `ddoinv` hoisted SAFE (EXT_CMDS uses dynamic `import()`, not a new static edge). `--can getline.js apply.js doapply`: same SAFE. Do **not** stamp “cycle-forced clone.” Do **not** add `bind_key`. Do **not** add `rhack_user_overlay_key` #2. Do **not** add `cmdbind_get` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks (`AUTOUNLOCK_FORCE` / `NODIAG` are C names, not this diff). `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

C `cmdbind_get` is first for **every** key (`:3679`), then tlist or Unknown (`:3834–3841`). JS: `isMovementKey` still runs **before** overlay (`cmd.js` walk arm). BIND= on `h`/`y`/… still walks. **Named omit, not Match C `cmdbind_get` first.** Run keys sit **after** overlay: BIND= on `H` skips `isRunKey`. **Match C for non-walk overlay keys.**

User overlay occupancy. C `bind_key` user `cmdbind_add` replaces the node (`:2138–2145`); `nothing` `cmdbind_remove` so `cmdbind_get` returns NULL → Unknown. JS `game.Cmd.binds.has` including `null`; skip if/else; `cmdbinds_live` writes `binds[k]=null`; `rhack_dispatch_bound` `!tlist` → same Unknown pline as the if/else miss path. **Match unbind of if/else keys.** Pre-this-SHA `Map.delete` left the default if/else live — that was the D-0897 hole.

`strcmpi`. C `bind_key` / extcmd match is case-insensitive (`:2669`, `:2690`). JS `parsebindings` + `cmdbinds_live` + `extcmd_run_by_txt` now lower-case `ef_txt`. **Match.** Unknown BIND= name: C `bind_key` fails, key unchanged (`:7668–7671`). JS `!ext` → skip `outMap.set`. **Match.** Do **not** add `bind_key`.

tlist path (`rhack_dispatch_bound`). C: `can_do_extcmd` else reset (`:3689–3692`); prefix gate (`:3693–3723`); `f_text` occupation (`:3728–3729`); REPEAT unless `do_repeat`/`doextcmd` (`:3732–3740`); `CMD_INSANE`; `(*func)()`; PREFIXCMD continue (`:3762–3774`); TIME/CANCEL (`:3810–3827`). JS same order with LIVE `can_do_extcmd` / `extcmd_run_by_txt`. PREFIXCMD overlay **keys** (`F`/`m`/`g`/`G`) sit after overlay, so BIND= on those keys runs the bound command. PREFIXCMD **targets** (`fight`/`reqmenu`/`rush`/`run`) have no EXT_CMDS runner → `!run` → Unknown. **Named.** `f_text`: generated `EXTCMDLIST` has flags/txt/key only — search’s C `"searching"` (`:1847`) is absent, so overlay `s:search` skips if/else `set_occupation` and the helper’s `tlist.f_text` is always falsy. **Named, not a silent stub in the drop/eat/inventory arm.**

EXT_CMDS if/else names. C `'O'` `"options"` → `doset_simple` (`:1780–1781`). JS overlay `options` → LIVE `doset_simple`. **Match C; do not stamp Match C `doset`.** `'d'` drop → `dodrop`; `'i'` inventory → `ddoinv`; `'a'` apply → `doapply`; `'|'` perminv / `DEL` terrain / `'_'` travel / `'p'` pay already had runners. Dynamic `import()` bodies are the same functions as if/else, not a second dispatch table. AUTOCOMPLETE bits on these rows affect `#` matching, not BIND= lookup. lua `NHCB_CMD_BEFORE` in `can_do_extcmd` still named.

Callee closure (overlay arm, claimed envelope). LIVE: `cmdbind_get`, `can_do_extcmd`, `extcmd_run_by_txt` → `doapply`/`ddoinv`/`doset_simple`/`dodrop`/…, `reset_cmd_vars`, `visctrl`, `pline`, REPEAT helpers. CLONE: `rhack_user_overlay_key` (occupancy); `rhack_dispatch_bound` / `cmdbinds_live` matched here to `:3678–3828` / `commands_init`+`bind_key`. OMIT named: walk overlay; PREFIXCMD targets; `f_text`; mouse/menu-cmd; CMD_PARAM; number_pad; `initoptions_finish` dirchars; lua callback. STUB in a live if/else-name arm: **none** (`try_rc_keybind` deleted; inventory is LIVE `ddoinv`). Combined-arm ships for drop/eat/inventory/options/nothing. Not “dispatch ported, callee stubbed” on those names. Overlay to a C `ef_txt` with no EXT_CMDS runner is still Unknown — map already says default meta without a runner.

## Hallucinations / overclaim

Subject overlay if/else keys + nothing unbind: **true** for non-walk keys whose target has an EXT_CMDS runner. D-log / map “cmdbind_get first”: **true in C**, **false for JS walk keys** (named). Do **not** stamp “Match C walk-key overlay.” Do **not** stamp “Match C `bind_key` linked list.” Do **not** stamp “Match C search `f_text` via overlay.” Do **not** stamp “Match C `doset` for `'O'`” (C is `doset_simple`). Do **not** stamp “Match C PREFIXCMD fight/reqmenu/rush/run overlay targets.” Do **not** re-port `doextlist` (D-1625) or default M('?') (D-1643). seed2600 `BIND=v:inventory` is the old inventory overlay path, now through the general tlist arm — **not** proof of `BIND=i:eat` or nothing-unbind.

## Density

+211 / −38: one `rhack` `cmdbind_get` overlay cluster + EXT_CMDS name table for if/else commands + nothing. C tlist path is ~150 lines; related `parsebindings` one branch. Did not glue walk/PREFIXCMD targets. Above a one-`if` peel. §2b one family.

## Verification

Wired: skip if/else when `Cmd.binds.has`; nothing → Unknown not default; lowercase `ef_txt`; LIVE runners for apply/inventory/drop/options. Unwired C: walk overlay; PREFIXCMD targets; `f_text`; mouse/menu-cmd. Conf: no RNG. No seed gate.

D-log private canary **50**/50 (default/overlay/nothing/runners/rc); green+strict seed8000/0900; cohort **7**/7 + strict. seed2600 FULL still PASS (`BIND=v:inventory`). **Public-unhit** for nothing-unbind and BIND= on an if/else key other than `v:inventory`. Fortress does not prove `cmdbind_remove`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): walk-key overlay (`isMovementKey` before `cmdbind_get`); PREFIXCMD fight/reqmenu/rush/run overlay targets; EXTCMDLIST `f_text` / counted search occupation on overlay; mouse/menu-cmd / CMD_PARAM `parsebindings`; number_pad; `initoptions_finish` dirchars after RC; lua `NHCB_CMD_BEFORE`; default meta without EXT_CMDS runner; Unknown path still `pline` not `custompline(SUPPRESS_HISTORY)` and skips `cmdq_clear(CQ_REPEAT)` (pre-existing else arm). Do **not** add `bind_key`. Do **not** add `rhack_user_overlay_key` #2. Do **not** add `cmdbind_get` #2. Do **not** re-port `doextlist` (D-1625). Do **not** re-port default M('?') (D-1643).

Verdict: **ACCEPT-WITH-DEBT**
