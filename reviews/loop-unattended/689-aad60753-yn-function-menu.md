# Review 689 — aad60753 — cmd.c yn_function_menu query_menu (D-1728)

## Metadata
- Full / short hash: `aad6075358b5cbed67c4d0d003c1ba713fdabcdf` / `aad60753`
- Parent: `a6d468cc` (D-1727). This file audits **this SHA only** (third of nine `js/` commits since review **686**). Archive **Addressed:** D-1728 `aad60753`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 10:18:24 +0200
- D-id: **D-1728**
- Stats: `js/getline.js` +126/−9; `js/const.js` +18; `js/do_wear.js` +4/−2; `js/jsmain.js` +4; `js/options.js` +2/−1. Total `js/` insertions **154** <250. Band **150–350**.
- Claims to close: Open `yn_function_menu` after D-1706 / review **667** (addcmdq; menu named omit). Not getdir CQ_REPEAT (next SHA). `reviews/loop-2026-08-15/` has no unpaid query_menu Must-fix.
- JS / map: `getline.js` `yn_function_menu`; `const.js` tables. `c-js-map/turns.md`.
- Prior: **667** named `yn_function_menu` (query_menu).

## Intent vs deliverable

Git subject promises: `query_menu` shows an NHW_MENU PICK_ONE when `resp` is a named `decl.c` table, instead of always tty_yn.

`node scripts/csym.mjs yn_function_menu` → `cmd.c:5416–5463`. `--callers`: `cmd.c:5538` `yn_function`. `yn_menuable_resp` `:5393–5399`. `yn_func_menu_opt` `:5401–5413`. Tables `decl.c:113–118`. Macros `hack.h:1329–1336`. Option `optlist.h:604–606` `&iflags.query_menu` opt_in Off. `window_inited` `wintty.c:1882–1883`.

```5393:5399:nethack-c/upstream/src/cmd.c
staticfn boolean
yn_menuable_resp(const char *resp)
{
    return iflags.query_menu && iflags.window_inited
        && (resp == ynchars || resp == ynqchars || resp == ynaqchars
            || resp == rightleftchars || resp == hidespinchars);
}
```

```5538:5540:nethack-c/upstream/src/cmd.c
        if (!yn_function_menu(query, resp, def, &res)) {
            res = (*windowprocs.win_yn_function)(query, resp, def);
        }
```

Parent: `yn_function` always `tty_yn_function`; `query_menu` lived on `flags`; no `window_inited`. The diff **does** add frozen `String` tables, identity `yn_menuable_resp`, `yn_function_menu` via `select_menu_pick_one`, pline+`key2txt`+`clear_nhwindow_message`, `iflags.query_menu`, `window_inited`, paranoid_ynq/`choose_ring_hand` table args, `y_n`/`ynq`/`ynaq`/`nyaq`/`YN` wrappers, default `resp=ynchars`. It **does not** re-point remaining interned `'yn'`/`'ynq'` call sites (shk/eat/apply/…). Named. It **does not** add `nyNaq`/`ynNaq` (`hack.h:1333–1334`; `ynNaqchars` is **not** menuable in C either). Named. It **does not** pass `hidespinchars` from `domonability`. Named. It **does not** port `create_nhwindow`/`end_menu(query)` title — uses the existing PICK_ONE helper.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `yn_function_menu` | LIVE new (C `staticfn`; JS local) | returns char\|null vs C boolean+`*res` |
| `yn_menuable_resp` | LIVE new | pointer `===`; **not** `ynNaqchars` |
| `yn_func_menu_opt` | LIVE new | `a_char` + SELECTED iff `def==key` |
| `ynchars`…`hidespinchars` | LIVE new | `decl.c:113–118`; `Object.freeze(new String)` |
| `ynNaqchars` | LIVE table | exported; **not** in menuable (C same) |
| `y_n` / `ynq` / `ynaq` / `nyaq` / `YN` | LIVE new | `hack.h:1329–1336` |
| `nyNaq` / `ynNaq` | OMIT named | `hack.h:1333–1334`; not menuable |
| `select_menu_pick_one` | LIVE import | `options.js` ASYNC; await |
| `key2txt` | LIVE import | `dokeylist.js`. pager.js clone — do **not** add #3 |
| `tty_yn_function` | LIVE same-file | else arm |
| `query_menu` | LIVE addr | `iflags` not `flags` |
| interned `'yn'` callers | OMIT named | not `ynchars` |
| `hidespinchars` in hide+web | OMIT named | arm LIVE, no caller yet |

`node scripts/sym.mjs`:

```
yn_function_menu NOT EXPORTED — 1 LOCAL  js/getline.js:1475  => Do NOT write clone #2.
yn_menuable_resp NOT EXPORTED — 1 LOCAL  js/getline.js:1435  => Do NOT write clone #2.
yn_func_menu_opt NOT EXPORTED — 1 LOCAL  js/getline.js:1450  => Do NOT write clone #2.
ynchars          js/const.js:869   sync
ynqchars / ynaqchars / ynNaqchars / rightleftchars / hidespinchars  const.js
y_n / ynq / ynaq / nyaq / YN   js/getline.js:1514–1530   sync
nyNaq / ynNaq    NOT FOUND in js/**
select_menu_pick_one js/options.js:1444   ASYNC — await required
key2txt          js/dokeylist.js:60   sync  (+ pager.js clone)
tty_yn_function  NOT EXPORTED — 1 LOCAL  js/getline.js:1609
```

Re-point: `choose_ring_hand` `'rl'` → `rightleftchars`; paranoid_ynq `'yn'`/`'ynq'` → tables; `yn_function` default `'yn'` → `ynchars`. `--can getline.js options.js`: ALREADY on HEAD; **this SHA added** `import { select_menu_pick_one }` (`options.js` already imported `getlin` from getline). Function export (hoisted). Cycle is not a blocker; not a top-level TDZ read. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Gate (`:5393–5399`).** C `iflags.query_menu && window_inited && resp == {ynchars, ynqchars, ynaqchars, rightleftchars, hidespinchars}`. JS same `===` on the frozen String objects. Interned `'yn'` is a primitive — **not** menuable. C `"yn"` literal would also fail pointer equality. **Match the identity rule.** `ynNaqchars` excluded. **Match.** Default option Off (`optlist.h` opt_in Off). **Match addr** (`iflags` not `flags`). `window_inited` when `nhDisplay` is installed (C tty_display_nhwindow). Analogue, not a byte-for-byte wintty port.

**Item list (`:5432–5445`).** C rightleft r/l; hidespin h/s; else y/n; then `ynaqchars` adds All; ynq/ynaq/hidespin add Quit. JS same `if`/`else if`/`else` then the two extras. **Match branch order.** `yn_func_menu_opt`: C `add_menu(..., key, …, (def==key)?SELECTED:NONE)`. JS `selector`/`a_char`/`itemflags`/`selected`. **Match the selected-default bit.** No `rn2`.

**PICK_ONE (`:5446–5457`).** C `select_menu(PICK_ONE)`; `n>0` → `sel[0].a_char`; `n>1 && *res==def` → `sel[1]` (preselected default plus a second pick). `n<=0` → `def`. JS `select_menu_pick_one`: letter → that item’s `a_char`; ESC/enter/space-on-last → `cancel` → `def`. Pressing the non-default letter returns that letter (C’s n>1 non-default). Pressing the default letter returns that letter (C n==0 after toggle-off also stores `def`). **Match the observable char** for this 2–4 item menu. Do **not** stamp “Match C `n>1` sel[1] walk” — the helper returns one pick.

**After (`:5458–5460`).** C `pline("%s %s", query, key2txt(*res))` then `clear_nhwindow(WIN_MESSAGE)` then return TRUE. JS `pline(\`${query} ${key2txt(code)}\`)` + `clear_nhwindow_message` + return `res`. **Match.** C `end_menu(win, query)` titles the menu; JS helper has no prompt argument. After-dismiss pline still shows the query. Named as the PICK_ONE analogue, not a silent stub.

**Caller (`:5538–5540`).** C if menu returns FALSE, windowport yn. JS `menuRes !== null` else `tty_yn_function` with `String(resp)` so tty still sees `'yn'` contents of a String object. **Match the else.** Canned `cmdq` path still skips both (D-1706). **Match.**

**Wrappers.** `y_n` → `ynchars,'n',true`; `YN` → same FALSE. **Match `hack.h`.** `nyNaq`/`ynNaq` absent. Named. Remaining `'yn'` literals still go tty-only even with `query_menu` On — that is C-faithful for pointer identity, and a named map omit to re-point those call sites to the tables.

**Callee closure.** LIVE: `yn_menuable_resp`, `yn_func_menu_opt`, `select_menu_pick_one` (await), `pline`, `key2txt`, `clear_nhwindow_message`, `tty_yn_function`. CLONE: String tables as `decl.c` objects. OMIT named: interned callers; hide+web; `nyNaq`/`ynNaq`; fuzzer/SND_SPEECH/DUMPLOG. STUB: **none** in the live menu arm. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “query_menu shows NHW_MENU PICK_ONE when resp is a named decl.c table”: **true** for identity-passing callers (`paranoid_ynq`, `choose_ring_hand`, default `yn_function()`, wrappers). **False** for interned `'yn'` sites — and C would also skip those. Do **not** stamp “Match C every `y_n` call site.” Do **not** stamp “Match C `nyNaq`.” Do **not** stamp “Match C hide+web `hidespinchars`.” Do **not** stamp “Match C `end_menu` query title.” Journal “fortress held” is not a `query_menu` On screen proof. Default option is **Off**; public sessions **do not** hit the menu. Canary was identity + gate. Admit public-unhit.

## Density

§2b: one C `yn_function_menu` + gate + opt + the two JS callers that must pass tables for identity. +154. Did not glue getdir CQ_REPEAT or mass-replace `'yn'` literals (that would be “finish yn”). Did **not** reopen D-1706 addcmdq.

## Verification

D-log: save-oracle skip (untagged `cmd.c:yn_function_menu`); node unique-table identity + gate (`query_menu` Off / interned miss / `ynchars` hit); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Menu paint **public-unhit** (option Off). Admit that.

## Actionable C-wrongs

None for Must-fix (gate + item list + tty else match C; interned sites are named identity omits). Named: interned `'yn'`/`'ynq'`/`'ynaq'` callers; `domonability` `hidespinchars`; `nyNaq`/`ynNaq`; `end_menu` query title on the PICK_ONE helper; getdir CQ_REPEAT is **D-1729**. Do **not** add `yn_function_menu` #2. Do **not** add `key2txt` #3. Do **not** treat interned `'yn'` as `ynchars`. Do **not** re-port D-1706 addcmdq. Do **not** put `ynNaqchars` in `yn_menuable_resp`.

Verdict: **ACCEPT-WITH-DEBT**
