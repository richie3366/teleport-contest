# Review 593 — 20fa20b3 — getline.c hooked_tty_getlin kill_char / empty-erase bell / intr (D-1632)

## Metadata
- Full / short hash: `20fa20b32e9311df4ccf658087d7c619ce79c3ea` / `20fa20b3`
- Parent: `4b50b2e9` (D-1631). This file audits **this SHA only** (third of nine `js/` commits since review **590**). Archive **Addressed:** D-1632 `20fa20b3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 07:16:10 +0200
- D-id: **D-1632**
- Stats: `js/getline.js` +155/−52, `js/display.js` +18/−5. Band **150–350** (js/ insertions **173**; id >454 so 200-floor).
- Claims to close: Open `kill_char` after D-1631. Not EDIT_GETLIN. Not MENU_SEARCH. `reviews/loop-2026-08-15/` has no unpaid kill_char Must-fix.
- JS / map: `getline.js` `hooked_getlin_edit_key` / `hooked_getlin_apply_intr`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **585** named `kill_char` / `tty_nhbell`; **592** named getline `:160`/`:211`.

**Addressed:** D-1639

## Intent vs deliverable

Git subject promises: `kill_char` (POSIX C('U')) wipes the buffer, empty erase and rejected keys `tty_nhbell`, and getline decrements `ttyDisplay->intr` then NULs at `bufp`, instead of treating DEL as erase-one and dropping Ctrl-U after D-1631.

Pinned C `win/tty/getline.c` `hooked_tty_getlin` `:42–227` (`node scripts/csym.mjs hooked_tty_getlin`). `--callers`: `:39` `tty_getlin`; `:312` `tty_get_ext_cmd`. NEWAUTOCOMP `:11` on. Erase/kill `:142–211`. `intr` `:102–105`. `sys/share/unixtty.c` `gettty` `:218–219` copies termios VERASE/VKILL. `global.h` `C(c)` `0x1f & c` — C('U') is 0x15. EDIT_GETLIN is D-1624. yn bells are D-1631.

```142:211:nethack-c/upstream/win/tty/getline.c
        if (c == erase_char || c == '\b') {
            if (bufp != obufp) {
                bufp--;
#ifdef NEWAUTOCOMP
                putsyms("\b");
                for (i = bufp; *i; ++i)
                    putsyms(" ");
                for (; i > bufp; --i)
                    putsyms("\b");
                *bufp = 0;
#endif
            } else
                tty_nhbell();
        } else if (c == '\n' || c == '\r') {
            break;
        } else if (' ' <= (unsigned char) c && c != '\177'
                   && (bufp - obufp < BUFSZ - 1 && bufp - obufp < COLNO)) {
            *bufp = c;
            bufp[1] = 0;
            ...
        } else if (c == kill_char || c == '\177') {
#ifdef NEWAUTOCOMP
            for (; *bufp; ++bufp)
                putsyms(" ");
            for (; bufp != obufp; --bufp)
                putsyms("\b \b");
            *bufp = 0;
#endif
        } else
            tty_nhbell();
```

```85:105:nethack-c/upstream/win/tty/getline.c
        if (c == '\033' && obufp[0] != '\0') {
            obufp[0] = '\0';
            bufp = obufp;
            tty_clear_nhwindow(WIN_MESSAGE);
            ...
            addtopl(obufp);
        } else {
            obufp[0] = '\033';
            ...
            break;
        }
        if (ttyDisplay->intr) {
            ttyDisplay->intr--;
            *bufp = 0;
        }
```

Old JS: `c === 8 || c === 127` erase-one without empty bell; no Ctrl-U; no `intr`; insert `c>=32 && c<127 && length<COLNO` only.

The diff **does** POSIX `erase_char=DEL` / `kill_char=C('U')` (no termios — Rule #2), shared `hooked_getlin_edit_key` on `getlin` and `get_ext_cmd`, empty-erase + else `tty_nhbell`, NEWAUTOCOMP suffix drop on erase, kill wipe, `BUFSZ-1 && COLNO` insert gate, `hooked_getlin_apply_intr` (`*bufp=0` at cursor). It **does not** port `gettty` termios, `tty_wait_synch` `intr++`, MENU_SEARCH, or stdout BEL. Named.

It **also** `continue`s after ESC-clears-nonempty, so that key never reaches the erase/kill/**else bell** cascade. C does **not** `continue` there — ESC falls through (`:85–105` then `:142–211`). That is a C-wrong, not a named omit.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hooked_getlin_edit_key` | C `:142–211`, **LIVE this SHA** | local; erase/kill/insert/else |
| `hooked_getlin_apply_intr` | C `:102–105`, **LIVE this SHA** | local; ++ still named |
| `getlin` / `get_ext_cmd` | C `:39` / `:312`, **LIVE this SHA** | both call the helper |
| `erase_char` / `kill_char` | C globals, **CLONE** POSIX defaults | local const 0x7f / 0x15 |
| `tty_nhbell` | C, **LIVE** | D-1631; silent On |
| `BUFSZ` | C global.h 256, **LIVE** | const.js |
| ESC nonempty | C `:85–91` then fallthrough, **WRONG** | JS `continue` skips else bell / doprev |
| `gettty` termios | C unixtty `:218–219`, **OMIT named** | Rule #2 |
| `intr++` | C wintty `:3643`, **OMIT named** | |
| MENU_SEARCH bells | C `:1702`/`:1740`, **OMIT named** | |

`node scripts/csym.mjs hooked_tty_getlin` → `getline.c:42-227`. `--callers` `:39` / `:312`. `gettty` → `unixtty.c:211+`. NEWAUTOCOMP `getline.c:11`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
hooked_getlin_edit_key NOT EXPORTED — 1 LOCAL js/getline.js:161
hooked_getlin_apply_intr NOT EXPORTED — 1 LOCAL js/getline.js:143
getlin           js/getline.js:207   ASYNC — await required
get_ext_cmd      js/getline.js:951   ASYNC — await required
get_tty_intr     js/display.js:1317   sync
set_tty_intr     js/display.js:1322   sync
tty_nhbell       js/display.js:1335   sync
```

`erase_char` / `kill_char` are file-local consts (not exported — do not add globals #2). `--can getline.js display.js tty_nhbell` / `get_tty_intr`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `hooked_getlin_edit_key` #2. Do **not** emit BEL.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

POSIX defaults. C `gettty` copies termios. Contest hosts are Unix; VERASE is typically DEL, VKILL C('U'). JS hardcodes that (no `fs`/tty). **Match the usual recorder.** pctty `'\b'` is covered by `c === 0x08` beside DEL. Kill’s `|| '\177'` is unreachable when erase_char is DEL because erase is tested first — **Match C’s order.** `@` as kill is last so it can still insert — JS insert-before-kill with kill=0x15 **Match** for POSIX.

Erase. Non-empty: cursor--, slice prefix (NEWAUTOCOMP `*bufp=0` drops suffix). Empty: `tty_nhbell`. **Match `:142–160`.** Old JS silently no-op’d empty DEL. This SHA fixes that call.

Kill. Wipe to obufp / cursor 0. Empty kill does **not** bell. **Match `:196–209`.** Ctrl-U is live (old JS dropped it).

Insert. `' ' <= uc && c != DEL && used < BUFSZ-1 && used < COLNO`. `BUFSZ` 256 both. Too-long printable falls through to kill (no) then else bell. **Match `:166–170` plus `:211`.** extcmd hook still runs only on insert. **Match.**

Enter. `\n`/`\r` break. JS `'enter'` return/break. **Match `:161–165`.**

`intr`. C every iteration after ESC handling, before ^P: if intr then `--` and `*bufp=0` (write pointer, not rewind to obufp). JS `slice(0, cursor)`. **Match `:102–105` when the key reaches that line.** Increment still named — decrement is a no-op until then.

ESC empty. C `obufp[0]='\033'; break`. JS `return '\x1b'`. **Match.**

**ESC nonempty — C-wrong.** C clears, redraws, does **not** `continue`, then `intr`, then ^P/doprev, then the `:142–211` cascade. `c` is still `'\033'`: not erase, not enter, not printable, not kill → **else `tty_nhbell()`**. If `doprev`, the `else if (doprev)` restore also runs. JS:

```javascript
            if (c === 27) {
                if (st.buf.length > 0) {
                    st.buf = '';
                    st.cursor = 0;
                    await paint();
                    continue; // skips apply_intr, doprev, else bell
                }
                return '\x1b';
            }
            hooked_getlin_apply_intr(st);
            ...
            hooked_getlin_edit_key(c, st);
```

Same `continue` in `get_ext_cmd`. Silent On hides BEL on fortress; the **call** is still missing. Do **not** stamp “Match C rejected-key `tty_nhbell`” for ESC-clear.

C’s own `tty_getlin` comment (`:31–33`) says nonempty Esc “removed and prompting continues as if from the start.” JS `continue` matches that sentence. The **body** still falls through to `:211`. Faithful port is the body. A later iter may not “fix” this by deleting the bell — it must call `tty_nhbell` like C, then loop.

```31:39:nethack-c/upstream/win/tty/getline.c
 * Reading can be interrupted by an escape ('\033').  If there is already
 * some text, it is removed and prompting continues as if from the start.
 * However, if there is no text yet (or anymore) then "\033" is returned.
 */
void
tty_getlin(const char *query, char *bufp)
{
    suppress_history = FALSE;
    hooked_tty_getlin(query, bufp, (getlin_hook_proc) 0);
```

`tty_get_ext_cmd` `:312` passes `ext_cmd_getlin_hook` unless `in_doagain`. JS still expands only on `'insert'`. ESC-clear `continue` skips the hook (C also does not insert). The miss is the else bell / doprev, not autocomplete.

Always-`paint()` after loop (except enter) extra-redraws on empty-erase bell. C does not `putsyms` there. Cosmetic, not the ESC miss.

Callee closure (erase/kill/else arms). LIVE: `tty_nhbell`, NEWAUTOCOMP suffix, insert+extcmd hook, `getlin`/`get_ext_cmd`. CLONE: POSIX erase/kill consts. OMIT named: termios, `intr++`, MENU_SEARCH, BEL byte. STUB: none. ESC-nonempty is **not** an omit — it is a live-arm skip. That arm should not have shipped a `continue` that C lacks.

`doprev` after ESC-clear: C `else if (doprev)` (`:128–140`) restores the prompt (`*bufp=0` already) when the player hits Esc during a `'s'` ^P walk with typed text. JS `continue` skips that restore too. Same Must-fix family as the else bell — one fallthrough, not two queue rows.

## Hallucinations / overclaim

Subject Ctrl-U wipe, empty erase + rejected keys bell, `intr--` + NUL at `bufp`, instead of DEL-as-erase-one: **true for DEL/BS/Ctrl-U/printable-overflow.** D-log POSIX defaults / shared helper / both getlin and extcmd: **true.** Do **not** stamp “Match C ESC-clears-buffer then else `tty_nhbell`.” Do **not** stamp “Match C `gettty` termios VERASE/VKILL.” Do **not** stamp “Match C `tty_wait_synch` `intr++`.” Do **not** stamp “Match C MENU_SEARCH.” Do **not** stamp “Match C EDIT_GETLIN `#ifdef`” (D-1624). Do **not** stamp “Match C yn bells” (D-1631). Public getlin is **mostly unhit** for Ctrl-U / empty-erase; fortress name-item uses Enter/ESC/printable. ESC-clear-buffer **is** a player path (type then Esc).

## Density

+173: C `:142–211` plus `:102–105` plus wiring both callers. §2b one getlin edit family. Did not glue MENU_SEARCH. Above a one-`if` peel.

## Verification

Wired: Ctrl-U kill; DEL/BS erase; empty-erase bell; insert BUFSZ/COLNO; extcmd autocomplete still insert-only. Unwired C: ESC-nonempty fallthrough bell/doprev; `intr++`; termios. Conf: no `rn2`. No seed gate.

D-log green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for Ctrl-U, empty-erase bell, `intr`. Fortress getlin does not prove ESC-clear fallthrough (silent On; screens ignore BEL). The C-wrong is still a live-arm skip.

## Actionable C-wrongs

1. `hooked_tty_getlin` ESC with nonempty buffer must **not** `continue`. After clear+redraw, fall through like C `:85–105` then `:142–211`: `intr` if set, `doprev` restore if needed, then else `tty_nhbell()` (silent still no-ops the byte). Same in `get_ext_cmd`. Do not treat this as a named omit.

Named (map, not Must-fix): `gettty` termios; `tty_wait_synch` `intr++`; MENU_SEARCH / PICK_NONE; stdout BEL. Do not add `hooked_getlin_edit_key` #2. Do not re-port yn bells (D-1631). Do not enable EDIT_GETLIN.

Empty-kill must stay silent (C `:196–209` has no `tty_nhbell`). Do not “fix” empty erase by also killing. Do not treat DEL as kill when `erase_char` is DEL — erase is first.

Verdict: **QUALITY-RISK**
