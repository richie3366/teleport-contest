# Review 572 — 21441f2e — getline.c hooked_tty_getlin ^P (D-1611)

## Metadata
- Full / short hash: `21441f2e9181afcc661c5dd8c33da77fed4c9627` / `21441f2e`
- Parent: `35d8e512` (D-1610). This file audits **this SHA only** (ninth / last of nine `js/` commits since review **563**). Archive **Addressed:** D-1611 — fill short hash `21441f2e` (was missing).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 01:55:37 +0200
- D-id: **D-1611**
- Stats: `js/getline.js` +198/−79, `js/display.js` +43/−2. Band **150–350** (js/ insertions **241**).
- Claims to close: Open getlin ^P after D-1601. Not command ^P. Not yn ^P. `reviews/loop-2026-08-15/` has no unpaid getlin-^P Must-fix.
- JS / map: `getline.js` `getlin` / `get_ext_cmd` / `hooked_getlin_ctrl_p`; `display.js` inread / SPECIAL_PROMPT. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **562** named getline ^P after command `tty_doprev_message`.

## Intent vs deliverable

Git subject promises: Ctrl-P during getlin walks `tty_doprev_message` like C, instead of dropping the key.

Pinned C `win/tty/getline.c` `hooked_tty_getlin` `:42–227`. inread / SPECIAL `:52–58`. ^P `:105–141`. Exit `:212–214`. Same fn for `tty_get_ext_cmd` `:312`. Callee `topl.c` `tty_doprev_message` (D-1601; skips f/c/r when `inread`). `--callers hooked_tty_getlin`: `tty_getlin` `:39`; extcmd `:312`.

```105:141:nethack-c/upstream/win/tty/getline.c
        if (c == C('p')) { /* ctrl-P, doesn't honor rebinding #prevmsg cmd */
            int sav = ttyDisplay->inread;
            ttyDisplay->inread = 0;
            if (iflags.prevmsg_window == 's'
                || (iflags.prevmsg_window == 'c' && !doprev)) {
                if (!doprev)
                    (void) tty_doprev_message(); /* need two initially */
                (void) tty_doprev_message();
                ttyDisplay->inread = sav;
                doprev = TRUE;
                continue;
            } else {
                (void) tty_doprev_message();
                ttyDisplay->inread = sav;
                doprev = FALSE;
                /* restore prompt; fall through */
```

Old JS: `_tty_inread` stayed 0; `c >= 32` dropped Ctrl-P (`0x10`); command ^P already D-1601.

The diff **does** `inread++` around both hooked loops, SPECIAL_PROMPT + `query+" "+buf` before each key, zero inread around `tty_doprev_message`, `'s'`/`'c'`&&!doprev double-call then continue, else one call + restore prompt, and process the next non-^P after restoring. `get_ext_cmd` shares the helper. It **does not** port yn ^P, EDIT_GETLIN, kill_char, or `tty_nhbell` on the full-mode ^P fallthrough. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hooked_getlin_ctrl_p` | C `:105–141`, **LIVE this SHA** | local |
| `inread++` / `--` | C `:58` / `:213`, **LIVE this SHA** | try/finally |
| SPECIAL_PROMPT + toplines | C `:57` / `:82`, **LIVE this SHA** | |
| restore prompt | C `:128–133` / `:135–140`, **LIVE this SHA** | clear + maxcol=maxrow |
| `tty_doprev_message` | C topl.c, **LIVE** | D-1601; inread now 0 |
| `getlin` | C `tty_getlin` → hooked, **LIVE this SHA** | |
| `get_ext_cmd` | C `:312` same fn, **LIVE this SHA** | |
| yn ^P | C `topl.c:434–448`, **OMIT named** | next Open |
| EDIT_GETLIN | C `:70–77`, **OMIT named** | |
| kill_char / `tty_nhbell` | C `:196` / `:209`, **OMIT named** | full-mode ^P fallthrough |
| `restore_msghistory` | C restore, **OMIT named** | |
| exit `clear_nhwindow` | C `:214`, **OMIT named** | JS `_pending_message=''` |

`node scripts/csym.mjs hooked_tty_getlin` → `:42-227`. `--callers` as above. `tty_doprev_message` is D-1601 (`display.js:1573`). `C('p')` = `0x10` = `GETLIN_CTRL_P`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
getlin           js/getline.js:121   ASYNC — await required
get_ext_cmd      js/getline.js:843   ASYNC — await required
tty_doprev_message js/display.js:1573   ASYNC — await required
get_tty_inread   js/display.js:1290   sync
set_tty_inread   js/display.js:1295   sync
prevmsg_reset_maxcol js/display.js:1498   sync
mark_topline_special_prompt js/display.js:1661   sync
hooked_getlin_release_prompt js/display.js:1671   sync
```

`--can getline.js display.js tty_doprev_message`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `hooked_tty_getlin` #2. Do **not** glue yn ^P onto this helper.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

inread. `inread++` at begin, `--` in `finally`. **Match `:58`/`:213`.** Nested getlin nests the counter. Command ^P still sees 0 outside getlin.

^P single / combo-as-single. Save inread, zero it, if `!doprev` first `tty_doprev_message`, then always a second, restore inread, `doprev=true`, continue. **Match `:108–117`.** That is what lets D-1601’s f/c/r arms run (they skip when inread). Default `'s'` is TTY.

^P full / reverse / combo-as-full. One `tty_doprev_message`, restore inread, `doprev=false`, restore prompt, **do not continue**. **Match `:119–130`.** C then falls through into erase/nl/print/kill/`tty_nhbell`. `C('p')` is not printable; C bells. JS swallows the key with no bell. Named.

After single-mode `doprev`, the next non-^P restores the prompt then processes that key. **Match `:131–140`.**

ESC before ^P. Empty ESC returns `\033`; nonempty clears buf and repaints. **Match `:86–101`.** JS has no EOF/`term_gone`. Named.

SPECIAL_PROMPT. C sets once then `gt.toplines = query+" "+buf` every loop. JS `mark_topline_special_prompt` on each paint. **Match the redotoplin skip (`:137` otoplin != SPECIAL).** Exit: C `NON_EMPTY` then `clear_nhwindow`. JS `release_prompt` SPECIAL→NON_EMPTY; enter/ESC clear `_pending_message`. Named vs C `:214`.

`get_ext_cmd`. Same `hooked_getlin_ctrl_p` / inread / SPECIAL. **Match C one fn.** Autocomplete hook still NEWAUTOCOMP-shaped (pre-existing).

Callee closure (^P arm). LIVE: `tty_doprev_message`, inread accessors, restore-prompt clear/maxcol. OMIT named: yn ^P / EDIT_GETLIN / kill / nhbell. STUB: none in the ^P arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject getlin Ctrl-P walks the ring: **true** (`getlin` and `#` extcmd). D-log “zeros inread; `'s'`/`'c'` double-call first”: **true.** Do **not** stamp “Match C yn ^P (`topl.c:434`).” Do **not** stamp “Match C command ^P” (already D-1601). Do **not** stamp “Match C EDIT_GETLIN.” Do **not** stamp “Match C kill_char / `tty_nhbell`.” Do **not** stamp “Match C `#prevmsg` rebind during getlin” (C does not honor it). Do **not** stamp “Match C exit `clear_nhwindow` `:214`.” Public getlin ^P is unhit.

## Density

One hooked_tty_getlin ^P envelope plus the same fn’s extcmd caller. +241 JS. Did not glue yn ^P. §2b OK.

## Branch-by-branch confirm

1. `'s'`, first ^P: two `tty_doprev_message`, continue. **Match.**
2. `'s'`, later ^P: one call, continue. **Match.**
3. `'c'` first: same as single. **Match.**
4. `'f'`/`'r'`: one call, restore prompt, no continue. **Match** (bell named).
5. After single-mode, next printable: restore then echo. **Match.**
6. yn ^P / EDIT_GETLIN / kill. **Named.**

## Callers / RNG ledger

Wired: `getlin`, `get_ext_cmd`. yn_function unwired. No RNG. No seed gate. `C('p')` is not a rebind.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not glue yn ^P. Do not honor BIND= `#prevmsg` here. Do not skip `inread++`. Do not wrap `wildmiss` as `pline_mon`. Command ^P is D-1601.

## Verification

D-log private canary **19**/19; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for getlin ^P / `#` ^P. Fortress command ^P does not prove the hooked path. yn ^P unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): yn ^P (`topl.c` `:434–448`); `restore_msghistory`; get_count historicmsg; EDIT_GETLIN; kill_char / `tty_nhbell` on full-mode ^P fallthrough; exit `clear_nhwindow` (`:214`). Do not glue yn onto getline. Command ^P is D-1601.

Verdict: **ACCEPT-WITH-DEBT**
