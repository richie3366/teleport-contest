# Review 562 — fd0ada3f — topl.c tty_doprev_message (D-1601)

## Metadata
- Full / short hash: `fd0ada3f510906ecdb720e4383a7e093e23097a4` / `fd0ada3f`
- Parent: `fb87326a` (D-1600). This file audits **this SHA only** (eighth of nine `js/` commits since review **554**). Archive **Addressed:** D-1601 `fd0ada3f`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 23:17:03 +0200
- D-id: **D-1601**
- Stats: `js/cmd.js` +17/−1, `js/display.js` +150/−2, `js/getline.js` +11, `js/jsmain.js` +1/−1, `js/options.js` +13/−1. Band **150–350** (js/ insertions **192**).
- Claims to close: Open `tty_doprev_message` after D-1588. Not getline ^P. Not yn `inread`. Not `restore_msghistory`. Not `get_count` historicmsg. `reviews/loop-2026-08-15/` has no unpaid prevmsg Must-fix.
- JS / map: `display.js` `tty_doprev_message` / `redotoplin`; `cmd.js` `doprev_message`; `options.js` `msg_window`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **549** named `tty_doprev_message`.

## Intent vs deliverable

Git subject promises: ^P / `#prevmsg` walks the remembered topline ring instead of staying an unknown command.

Pinned C `topl.c` `tty_doprev_message` `:19–119`. `redotoplin` `:121–141`. `cmd.c` `doprev_message` `:163–168` → `nh_doprev_message`. cmd table `:1805–1806` `C('p')` `#prevmsg` IFBURIED\|GENERALCMD. `options.c` `optfn_msg_window` `:2455–2520`; init TTY `'s'` `:7181`. `--callers tty_doprev_message`: getline `:115–123`; yn `:438`/`:445–446`; wintty interrupt `:3641–3642`. `--callers redotoplin`: doprev singles; `update_topl` `:301`.

```85:98:nethack-c/upstream/win/tty/topl.c
    } else if (iflags.prevmsg_window == 's') { /* single */
        ttyDisplay->dismiss_more = C('p');
        do {
            morc = 0;
            if (cw->maxcol == cw->maxrow)
                redotoplin(gt.toplines);
            else if (cw->data[cw->maxcol])
                redotoplin(cw->data[cw->maxcol]);
            cw->maxcol--;
            ...
        } while (morc == C('p'));
```

Old JS: ring live for `putmsghistory` (D-1588); rhack had no key 16; `#prevmsg` absent; `msg_window` stored the raw string.

The diff **does** four prevmsg_window arms, `redotoplin` NEED_MORE + `more()` when wrap, cmd ^P / REPEAT / `#prevmsg`, TTY default `'s'`, `optfn_msg_window` first-char `s/c/f/r` and empty-optstr negated→`'s'` else `'f'`. It **does not** port getline.c ^P, yn `:434–448` `inread` dance, restore replay, `get_count` historicmsg, mixed `/` glyph `redotoplin`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `tty_doprev_message` | C `:19–119`, **LIVE this SHA** | |
| `redotoplin` | C `:121–141`, **LIVE this SHA** (local) | C is `static` |
| `doprev_message` | C `:163–168`, **LIVE this SHA** | |
| `prevmsg_window_mode` | C `iflags.prevmsg_window`, **CLONE** | first-char |
| `prevmsg_step_maxcol` | C maxcol walk, **CLONE** | |
| `'f'`/`'r'` menu lines | C putstr walks, **CLONE** | |
| `show_nhw_menu_text` | C `display_nhwindow` NHW_MENU, **LIVE** | dynamic import SAFE |
| `more` / `_dismiss_more` | C `more` + `dismiss_more=C('p')`, **LIVE** | |
| `ensure_message_win` | C `wins[WIN_MESSAGE]`, **LIVE** D-1588 | |
| `optfn_msg_window` parse | C `:2474–2495`, **LIVE this SHA** | |
| TTY default `'s'` | C `:7181`, **LIVE this SHA** | jsmain |
| getline/yn `inread` ^P | C getline `:115`; yn `:434–448`, **OMIT named** | `_tty_inread` stays 0 |
| `restore_msghistory` | C restore, **OMIT named** | still Open |
| `get_count` historicmsg | C `cmd.c:5086`, **OMIT named** | still Open |
| mixed `/` glyph | C `redotoplin` `:128–132`, **OMIT named** | |

`node scripts/csym.mjs tty_doprev_message` → `:19-119`. `redotoplin` → `:121-141`. `doprev_message` → `:163-168`. `optfn_msg_window` → `:2455-2520`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
tty_doprev_message js/display.js:1553   ASYNC — await required
doprev_message   js/cmd.js:1798   ASYNC — await required
redotoplin       NOT EXPORTED — 1 LOCAL (display.js:1527). Do NOT write clone #2.
show_nhw_menu_text js/pager.js:408   ASYNC — await required
remember_topl    js/display.js:1357   sync
putmsghistory    js/display.js:1437   sync
ensure_message_win NOT EXPORTED — 1 LOCAL (display.js:1317). Do NOT write clone #2.
```

`--can cmd.js display.js tty_doprev_message`: ALREADY. `--can display.js pager.js show_nhw_menu_text`: IN-SCC, hoisted, **VERDICT SAFE**. `--can getline.js cmd.js doprev_message`: IN-SCC, hoisted, **VERDICT SAFE**. Do **not** add `tty_doprev_message` in `cmd.js`. Do **not** add `redotoplin` #2. Do **not** add `doprev_message` in `getline.js` (dynamic import is the cycle-safe edge).

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Dispatch. rhack key **16** (`C('p')` `0x10`) → `doprev_message` → `await tty_doprev_message()` → `ECMD_OK`, `context.move=0`. REPEAT table maps 16 → `'prevmsg'`. EXT_CMDS `#prevmsg` `autocomplete:false`. **Match `:163–168` + `:1805–1806`.** Not unknown.

Default `'s'`. jsmain `prevmsg_window: 's'` then rc spread. **Match TTY `:7181`.** rc `msg_window:single` → `lowc(*op)=='s'`. **Match `:2483–2491`.** Boolean empty-optstr negated→`'s'` else `'f'`. **Match `:2476–2478`.** Negated with a value: C `bad_negation`; JS `continue`. Named polish.

`'s'` arm. `dismiss_more=CTRL_P`; `morc=0`; if `maxcol==maxrow` redo `gt.toplines` else if `data[maxcol]` redo that; step maxcol wrap; loop while `morc==C('p')`. **Match `:85–98`.** `CTRL_P=0x10`. **Match `global.h` `C('p')`.** `more()` treats dismiss_more as a break key. **Match.** Short line: C `more()` only if `cury`; JS wrap analog `\n` or `length>=CO`. One command shows one line; next ^P steps. **Match `:137–140`.** Wrapped: `more()` then ^P continues without a new rhack. JS `more()` clears `_toplines`; this SHA restores for the loop (C `more()` does not clear `gt.toplines`). Same net as D-1588’s remember-before-more adaptation.

`'f'` / `'r'` / `'c'`. Full: `"Message History"` + `""` + ring from `maxrow` + `toplines`. **Match `:28–40`.** Reversed: heading, `toplines` first, LIFO until wrap. **Match `:61–81`.** Combination: first two as singles with dismiss_more, else full; loop while ^P. **Match `:43–58`.** `show_nhw_menu_text` is the live NHW_MENU pager. `!inread` guards f/c/r. Command ^P has `inread==0`. **Match outer `:26–27`.** Getline/yn that zero `inread` around the call: **named.**

Callee closure (command ^P). LIVE: `tty_doprev_message`, `doprev_message`, `more`, `show_nhw_menu_text`, `ensure_message_win`, `remember_topl` ring. CLONE verified: `redotoplin` (C static; wrap/`cury` analog; restore after JS `more` clear). OMIT named: getline/yn/restore/Count/mixed glyph. STUB: **none** on the command arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject ^P / `#prevmsg` walks the ring: **true at command time** (TTY `'s'`). D-log four arms + `redotoplin` + first-char `msg_window`: **true.** Do **not** stamp “Match C getline.c ^P (`:115–123`).” Do **not** stamp “Match C `tty_yn_function` ^P (`:434–448`).” Do **not** stamp “Match C `restore_msghistory`.” Do **not** stamp “Match C `get_count` historicmsg.” Do **not** stamp “Match C mixed `/` `g_putch`.” Public suite does not type ^P; fortress is not a prevmsg proof.

## Density

One `topl.c` window-proc + the cmd/options callers that make ^P a command. +192 JS. Did not glue getline/yn. §2b OK.

## Branch-by-branch confirm

1. Unknown `^P` → `doprev_message`. **Match.**
2. `'s'` one redotoplin per command; ^P at --More-- continues. **Match.**
3. `'f'`/`'r'`/`'c'` menus. **Match** when `!inread`.
4. Default TTY `'s'`. **Match.**
5. getline/yn/restore/Count. **Named.**

## Callers / RNG ledger

Wired: rhack 16, REPEAT, `#prevmsg`. Unwired C: getline, yn, wintty interrupt double-call `:3641`. No `rn2`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Dynamic pager import is SAFE, not a clone of `show_nhw_menu_text`. Do not add `redotoplin` #2. Do not add `tty_doprev_message` in `cmd.js`. Do not skip painting spaces. Do not bind ^P to a seed.

## Verification

D-log private canary **23**/23; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for ^P. A session that never presses Ctrl-P does not falsify the old unknown-command path. getline ^P unhit.

## Actionable C-wrongs

None for Must-fix. Named: getline.c `:115–123`; `tty_yn_function` `:434–448`; `restore_msghistory`; `get_count` historicmsg; mixed `/` glyph; negated `msg_window:foo` `bad_negation`. Do not add `redotoplin` in `cmd.js`. Do not treat JS `more()`-clears-toplines restore as a miss of C `more()`.

Verdict: **ACCEPT-WITH-DEBT**
