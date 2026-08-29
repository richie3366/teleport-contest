# Review 592 — 4b50b2e9 — termcap.c tty_nhbell / yn cury+intr (D-1631)

## Metadata
- Full / short hash: `4b50b2e95296abb8e91b0c7534995beb32153ba2` / `4b50b2e9`
- Parent: `a2992805` (D-1630). This file audits **this SHA only** (second of nine `js/` commits since review **590**). Archive **Addressed:** D-1631 `4b50b2e9`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 07:04:01 +0200
- D-id: **D-1631**
- Stats: `js/display.js` +74/−7, `js/getline.js` +54/−14, `js/jsmain.js` +3, `js/dothrow.js` +3/−1. Band **150–350** (js/ insertions **134**; id >454 so 200-floor).
- Claims to close: Open `tty_nhbell` after D-1623. Not post-answer toplines. Not `kill_char`. `reviews/loop-2026-08-15/` has no unpaid nhbell Must-fix.
- JS / map: `display.js` `tty_nhbell` / `tty_yn_clean_up_tty`; `getline.js` `yn_function`; `jsmain.js` silent. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **584** named `tty_nhbell` `:476`, `cw->cury` `:547–548`, `ttyDisplay->intr--` `:545–546`.

## Intent vs deliverable

Git subject promises: invalid yn keys and digit-arm aborts bell (silent default On), and yn clean_up decrements `ttyDisplay->intr` then clears WIN_MESSAGE when `cw->cury`, instead of retrying with no call after D-1623.

Pinned C `win/tty/termcap.c` `tty_nhbell` `:750–757` (`node scripts/csym.mjs tty_nhbell`). `--callers tty_nhbell`: `getline.c:160` / `:211` / `:254` (kill_char / xwaitforspace — kill_char is D-1632); `topl.c:476` / `:518`; `wintty.c:1702` / `:1740` (MENU_SEARCH / PICK_NONE invalid — named). Windowproc `wintty.c:142`. `optlist.h:675` silent `opt_out` default On. `integer.h` `AppendLongDigit` `:120–124` (`--callers`: `topl.c:499`). `tty_wait_synch` `wintty.c:3643` `intr++` (`--callers tty_wait_synch`: termcap `:259`, wintty `:2475` / `:2963`). yn post-answer is D-1623. yn ^P is D-1612.

```750:757:nethack-c/upstream/win/tty/termcap.c
void
tty_nhbell(void)
{
    if (flags.silent)
        return;
    (void) putchar('\007'); /* curx does not change */
    (void) fflush(stdout);
}
```

```475:478:nethack-c/upstream/win/tty/topl.c
        if (!strchr(resp, q) && !digit_ok) {
            tty_nhbell();
            q = (char) 0;
        } else if (q == '#' || digit_ok) {
```

```543:548:nethack-c/upstream/win/tty/topl.c
    ttyDisplay->inread--;
    ttyDisplay->toplin = TOPLINE_NON_EMPTY;
    if (ttyDisplay->intr)
        ttyDisplay->intr--;
    if (wins[WIN_MESSAGE]->cury)
        tty_clear_nhwindow(WIN_MESSAGE);
```

Old JS (D-1623): `tty_yn_clean_up` rewrote `_toplines` + dumplogmsg; invalid yn `continue` with a comment; no `flags.silent`; no `cw.cury`.

The diff **does** export `tty_nhbell` (`silent !== false` return; **no** stdout BEL — Rule #2 / Chrome / 80x24), default `flags.silent = true` in `jsmain`, yn invalid + digit abort + `more`/`help_dir` call sites, `AppendLongDigit` overflow without bell, `tty_yn_note_msg_cursor` from `topl_wrap_echo` row, `tty_yn_clean_up_tty` (`intr--` then if `cury` blank leftover, toplin EMPTY, zero cursor, **not** `_toplines`). It **does not** port `putchar('\007')`, getline `kill_char` bells (`:160` / `:211`), wintty MENU_SEARCH / PICK_NONE (`:1702` / `:1740`), `tty_wait_synch` `intr++` (`:3643`), or NHW_MESSAGE `docorner` inside `tty_clear_nhwindow`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `tty_nhbell` | C `:750–757`, **LIVE this SHA** | silent guard; BEL omitted Rule #2 |
| `flags.silent` | C optlist On, **LIVE this SHA** | jsmain default true |
| yn invalid `:476` | C, **LIVE this SHA** | + q=0 retry |
| digit abort `:518` | C, **LIVE this SHA** | bell then paint retry |
| `AppendLongDigit` | C `:120–124`, **CLONE this SHA** | local getline.js; LONG_MAX→MAX_SAFE_INTEGER |
| `tty_yn_clean_up_tty` | C `:545–548`, **LIVE this SHA** | subset of `tty_clear_nhwindow` NHW_MESSAGE |
| `tty_yn_note_msg_cursor` | C `cw->curx/cury` after putsyms, **LIVE this SHA** | wrap row from `topl_wrap_echo` |
| `more` → `xwaitforspace` bell | C getline `:254`, **LIVE this SHA** | |
| `help_dir` wait bell | C `xwaitforspace(quitchars)`, **LIVE this SHA** | dothrow clone |
| `tty_yn_rewrite_toplines` | C `:539–541`, **LIVE** | D-1623; wrap clear does not wipe it |
| `kill_char` bells | C `:160` / `:211`, **OMIT named** | D-1632 |
| MENU_SEARCH / PICK_NONE | C wintty `:1702` / `:1740`, **OMIT named** | |
| `tty_wait_synch` `intr++` | C `:3643`, **OMIT named** | `_tty_intr` stays 0 |
| `docorner` on wrap clear | C `tty_clear_nhwindow` `:1052–1053`, **OMIT named** | |
| stdout BEL | C `:756`, **OMIT Rule #2** | |

`node scripts/csym.mjs tty_nhbell` → `termcap.c:750-757`. `AppendLongDigit` → `integer.h:120-124`. `--callers tty_nhbell` as above. `--callers AppendLongDigit` includes `topl.c:499`. `tty_clear_nhwindow` → `wintty.c:1034+`. `more` → `topl.c:205-248` then `xwaitforspace` `:230-257`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
tty_nhbell       js/display.js:1335   sync
tty_yn_note_msg_cursor js/display.js:1346   sync
tty_yn_clean_up_tty js/display.js:1360   sync
tty_yn_clean_up  NOT EXPORTED — 1 LOCAL js/getline.js:1187
yn_function      js/getline.js:1216   ASYNC — await required
yn_collect_number NOT EXPORTED — 1 LOCAL js/getline.js:1321
AppendLongDigit  NOT EXPORTED — 1 LOCAL js/getline.js:1312
more             js/display.js:4479   ASYNC — await required
help_dir         NOT EXPORTED — 1 LOCAL js/dothrow.js:2444
```

`--can getline.js display.js tty_nhbell` / `tty_yn_note_msg_cursor` / `tty_yn_clean_up_tty`: ALREADY. `--can dothrow.js display.js tty_nhbell`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `tty_nhbell` #2. Do **not** add `AppendLongDigit` #2 (cmd.c `get_count` / wintty menu count still their own overflow). Do **not** `putchar` BEL from scored `js/`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Silent default. C `NHOPTB(silent, … opt_out, … On, … &flags.silent)`. JS `g.flags.silent = true` plus null-coalesce. **Match optlist On.** `tty_nhbell`: `if (flags.silent) return` ≡ `if (game.flags?.silent !== false) return`. With default On the body is a no-op. **Match the guard.** `putchar('\007')` / `fflush` omitted so Chrome / judge stdout stay cell-only. Named Rule #2 — not a silent stub of the *callers*.

Yn invalid. C `:475–478` bell + `q=0` continue `do-while (!q)`. JS bell + `continue`. **Match `:476`.** Digit abort C `:516–518` `value=-1; tty_nhbell(); break` then `:526–528` `removetopl` + `q='\0'` retry. JS `return null` then `paint()` continue (prompt restored). **Match `:518` plus retry.** Overflow C `AppendLongDigit` → `value<0` **break without bell** then same removetopl retry. JS `next<0` return null without bell. **Match `:499–501`.**

```516:528:nethack-c/upstream/win/tty/topl.c
                } else {
                    value = -1; /* abort */
                    tty_nhbell();
                    break;
                }
            } while (z != '\n');
            if (value > 0)
                yn_number = value;
            else if (value == 0)
                q = 'n'; /* 0 => "no" */
            else {       /* remove number from top line, then try again */
                removetopl(n_len), n_len = 0;
                q = '\0';
            }
```

Zero from the digit arm is `'n'` (D-1623 path). Abort/overflow is retry without committing `yn_number`. **Match JS `num===0` → `'n'` vs `num==null` → paint.**

`AppendLongDigit`. C `LONG_MAX` (LP64 2^63−1). JS `Number.MAX_SAFE_INTEGER` (2^53−1). yn_number in play is tiny. Do **not** stamp “Match C LONG_MAX.” Do **not** add a second copy for `get_count`.

Wrap cursor. C `topl_putsym` wrap copies `cw->cury = ttyDisplay->cury`. JS `topl_wrap_echo`: `curx===CO-1` then newline, `cury++`; returns `{col,row}` for `nChars`. Unwrapped yn → `row===0` → `cury==0` → skip clear → leftover stays (D-1623). Wrapped → `row>=1` → blank leftover, **not** `_toplines`. **Match `:547–548` skip vs take for this paint.** Comment in `yn_function`: 80-char prompt ends on row 1 at (1,1). **Match C wrap.**

```1046:1057:nethack-c/upstream/win/tty/wintty.c
    case NHW_MESSAGE:
        if (ttyDisplay->toplin != TOPLINE_EMPTY) {
            if (!erasing_tty_screen) {
                home();
                cl_end();
                if (cw->cury)
                    docorner(1, cw->cury + 1, 0);
            }
            cw->curx = cw->cury = 0;
            ttyDisplay->toplin = TOPLINE_EMPTY;
        }
        break;
```

`tty_yn_clean_up_tty` is **not** the full NHW_MESSAGE arm: no `home`/`cl_end`/`docorner`; it blanks `_pending_message` and sets `_toplin` EMPTY when `cury`. D-1623 `_toplines` rewrite already ran. Unwrapped public yn never enters this. Named `docorner`. Do **not** stamp “Match C `tty_clear_nhwindow` NHW_MESSAGE.”

`intr`. C `:545–546` decrement if non-zero. Increment is `tty_wait_synch` `:3643` (interrupt while `inread`). JS `_tty_intr` inits 0, reset in `reset_display_messages`, never `++`. Decrement is live and currently a no-op. Named. Do **not** stamp “Match C `tty_wait_synch`.”

`more` / `help_dir`. C `more` → `xwaitforspace("\033 ")` `:254` bell. JS `more()` loop else `tty_nhbell()`. C `help_dir` NHW_TEXT wait is `xwaitforspace(quitchars)`. JS dothrow clone else bell. **Match those wait sites.** Not cmd.c `:3668` `nhbell()` (other prefix).

```230:256:nethack-c/upstream/win/tty/getline.c
xwaitforspace(const char *s) /* chars allowed besides return */
{
    int c, x = ttyDisplay ? (int) ttyDisplay->dismiss_more : '\n';

    morc = 0;
    while (
        (c = tty_nhgetch()) != EOF) {
        if (c == '\n' || c == '\r')
            break;

        if (iflags.cbreak) {
            if (c == '\033') {
                if (ttyDisplay)
                    ttyDisplay->dismiss_more = 1;
                morc = '\033';
                break;
            }
            if ((s && strchr(s, c)) || c == x || (x == '\n' && c == '\r')) {
                morc = (char) c;
                break;
            }
            tty_nhbell();
        }
    }
}
```

JS `more` also honors `_dismiss_more` and ESC WIN_STOP (pre-existing). The new else-arm is the C `:254` callee, not a new wait. `iflags.cbreak` is assumed on (contest tty). Do **not** stamp “Match C `!cbreak` cooked wait.”

`clear_nhwindow_message` this SHA also zeros `cw.curx/cury` even on the already-EMPTY early-out so a later yn wrap flag cannot leak. C `tty_clear_nhwindow` NHW_MESSAGE early-out when `toplin==EMPTY` leaves cury as-is; yn clean_up is the consumer. JS extra zero is conservative, not a leftover-wipe of `_toplines`.

Callee closure (yn invalid / abort / clean_up). LIVE: `tty_nhbell` (guard), `tty_yn_rewrite_toplines`, `key2txt`, `dumplogmsg`, `topl_wrap_echo`, `xwaitforspace` bell via `more`. CLONE: `AppendLongDigit` (macro). OMIT named: BEL byte, `kill_char`, MENU_SEARCH, `intr++`, `docorner`. STUB: none on the yn arms. The arms may ship. Not “dispatch ported, callee is a stub.” Silent default makes the bell body a no-op — that **is** C.

## Hallucinations / overclaim

Subject invalid yn + digit abort bell, silent On, clean_up `intr--` + `cury` clear leftover not retry-without-call: **true for yn and the two wait sites.** D-log Rule #2 no stdout BEL: **true.** Unwrapped leftover kept: **true (`cury==0`).** Do **not** stamp “Match C `putchar('\\007')`.” Do **not** stamp “Match C `kill_char` / getline `:160`/`:211`.” Do **not** stamp “Match C MENU_SEARCH / PICK_NONE (`wintty.c:1702`/`:1740`).” Do **not** stamp “Match C `tty_wait_synch` `intr++`.” Do **not** stamp “Match C `docorner` wrap restore.” Do **not** stamp “Match C yn post-answer” (D-1623). Do **not** stamp “Match C yn ^P” (D-1612). Public yn is **unwrapped** fortress leftover; wrap/`intr++`/BEL-off are **public-unhit**.

MENU_SEARCH still C-only. `wintty.c:1702` bells on PICK_NONE search; `:1740` bells on unacceptable menu input. JS menus do not import `tty_nhbell` yet. Named. getlin `:160` empty erase and `:211` else are the next Open (`kill_char`). This SHA must not be cited as closing those.

```1700:1704:nethack-c/upstream/win/tty/wintty.c
        case MENU_SEARCH:
            if (cw->how == PICK_NONE) {
                tty_nhbell();
                break;
```

## Density

+134: C `tty_nhbell` (8) plus the yn call sites D-1623 named (`:476`/`:518`/`:545–548`) plus silent default plus `AppendLongDigit` plus the two `xwaitforspace` waiters already in JS. §2b one bell family. Did not glue `kill_char`. Above a one-`if` peel.

## Verification

Wired: yn invalid; digit abort; overflow no bell; `more`/`help_dir` waits; silent On; wrap-cursor skip vs take. Unwired C: getlin `kill_char`; MENU_SEARCH; `intr++`; `docorner`; BEL when silent Off. Conf: no `rn2`. No seed gate.

D-log leftover/cury canary; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for wrap `cury!=0`, `intr++`, silent Off, MENU_SEARCH, getlin bells. Fortress yn leftover is the unwrapped D-1623 path (this SHA must not clear it — `row===0`).

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): getline.c `kill_char` bells (`:160`/`:211`) — Open next; wintty MENU_SEARCH / PICK_NONE (`:1702`/`:1740`); `tty_wait_synch` `intr++` (`:3643`); NHW_MESSAGE `docorner` on wrap clear (`:1052–1053`); stdout BEL. Do not add `tty_nhbell` #2. Do not add `AppendLongDigit` #2. Do not emit BEL from scored `js/`. Do not re-port yn post-answer (D-1623). Do not glue `kill_char` into yn.

Verdict: **ACCEPT-WITH-DEBT**
