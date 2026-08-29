# Review 600 — d5474f87 — getline.c hooked_tty_getlin ESC-nonempty fallthrough (D-1639)

## Metadata
- Full / short hash: `d5474f87524676443786a5d70f9f86e2cfcae822` / `d5474f87`
- Parent: `d3625c22` (audit #2040). This file audits **this SHA only** (first of nine `js/` commits since review **599**). Archive **Addressed:** D-1639 `d5474f87`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 09:22:01 +0200
- D-id: **D-1639**
- Stats: `js/getline.js` +35/−18, `js/display.js` +2/−1. Band **150–350** (js/ insertions **37**; id >454 so 200-floor). Must-fix peel: density floor does not apply.
- Claims to close: Must-fix review **593** Actionable #1 (QUALITY-RISK ESC `continue`). Not kill_char. Not MENU_SEARCH. `reviews/loop-2026-08-15/` has no unpaid getlin ESC Must-fix.
- JS / map: `getline.js` `hooked_getlin_handle_esc`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **593** Actionable #1. Review file already stamped `**Addressed:** D-1639 d5474f87`.

## Intent vs deliverable

Git subject promises: nonempty ESC clears then falls through to `intr`/`doprev`/else `tty_nhbell` instead of `continue` after D-1632.

Pinned C `win/tty/getline.c` `hooked_tty_getlin` `:42–227` (`node scripts/csym.mjs hooked_tty_getlin`). `--callers hooked_tty_getlin`: `:39` `tty_getlin`; `:312` `tty_get_ext_cmd`. ESC arm `:85–99` then no `continue` — `intr` `:102–105`, `C('p')`/`doprev` `:106–141`, erase/kill/else `:142–211`.

```85:105:nethack-c/upstream/win/tty/getline.c
        if (c == '\033' || c == EOF) {
            if (c == EOF)
                iflags.term_gone = 1;
            if (c == '\033' && obufp[0] != '\0') {
                obufp[0] = '\0';
                bufp = obufp;
                tty_clear_nhwindow(WIN_MESSAGE);
                cw->maxcol = cw->maxrow;
                addtopl(query);
                addtopl(" ");
                addtopl(obufp);
            } else {
                obufp[0] = '\033';
                obufp[1] = '\0';
                break;
            }
        }
        if (ttyDisplay->intr) {
            ttyDisplay->intr--;
            *bufp = 0;
        }
```

Review **593** quoted the JS `continue` after nonempty clear. This SHA **does** replace that with `hooked_getlin_handle_esc`: nonempty returns `'fallthrough'` so `apply_intr` / `ctrl_p` / `edit_key` still run; empty returns `'cancel'`. Same helper on `getlin` and `get_ext_cmd`. Display comment only. It **does not** port `gettty` termios, stdout BEL, `c == EOF` cancel, or EDIT_GETLIN. Named (map / D-1624 / D-1632 leftovers).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hooked_getlin_handle_esc` | C `:85–99`, **CLONE** (local helper of C arm) | nonempty fallthrough; empty cancel |
| `hooked_getlin_apply_intr` | C `:102–105`, **LIVE** | unchanged this SHA; still runs after ESC |
| `hooked_getlin_ctrl_p` | C `:106–141`, **LIVE** | `else if (doprev)` restore after ESC |
| `hooked_getlin_edit_key` | C `:142–211`, **LIVE** | ESC is not erase/enter/printable/kill → else bell |
| `getlin` / `get_ext_cmd` | C `:39` / `:312`, **LIVE this SHA** | both drop `continue` |
| `tty_nhbell` | C termcap, **LIVE** | D-1631; silent On |
| `erase_char` / `kill_char` | POSIX clone, **LIVE** | D-1632; not re-pointed |
| `gettty` termios | C unixtty `:218–219`, **OMIT named** | Rule #2 |
| `c == EOF` | C `:85–90` else-break, **OMIT named** | judge `nhgetch` is not tty EOF |
| stdout BEL | C `tty_nhbell` byte, **OMIT named** | Rule #2 / 80x24 |
| EDIT_GETLIN | config.h commented, **OMIT named** | D-1624 |

`node scripts/csym.mjs hooked_tty_getlin` → `getline.c:42-227`. `--callers`: `:39` / `:312`. `tty_getlin` → `getline.c:35-40`. `tty_get_ext_cmd` → `getline.c:296+` (`csym`).

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (this SHA adds `hooked_getlin_handle_esc`; does not delete an export):

```
hooked_getlin_handle_esc NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/getline.js:161
hooked_getlin_edit_key NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/getline.js:185
hooked_getlin_apply_intr NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/getline.js:144
hooked_getlin_ctrl_p NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/getline.js:78
getlin           js/getline.js:232   ASYNC — await required
get_ext_cmd      js/getline.js:1001   ASYNC — await required
tty_nhbell       js/display.js:1342   sync
```

`--can getline.js display.js tty_nhbell` / `get_tty_intr`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `hooked_getlin_handle_esc` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

C nonempty ESC (`:88–99`) clears `obufp`, rewinds `bufp`, redraws `query+" "+empty`, and **does not** `continue`. Next lines are `intr` (`:102–105`), then `C('p')` / `else if (doprev)` (`:106–141`), then the `:142–211` cascade. `c` is still `'\033'`: not erase, not `\n`/`\r`, not `' '<=uc && !=DEL` (0x1b < 0x20), not kill → **else `tty_nhbell()`**.

JS after this SHA:

```javascript
            if (await hooked_getlin_handle_esc(c, st, paint) === 'cancel') {
                return '\x1b';
            }
            hooked_getlin_apply_intr(st);
            const handled = await hooked_getlin_ctrl_p(c, doprev, restorePrompt);
            doprev = handled.doprev;
            if (handled.skip) continue;
            const act = hooked_getlin_edit_key(c, st);
```

`hooked_getlin_handle_esc`: `c!==27` → `'fallthrough'` (non-ESC keys unchanged); nonempty 27 clears `buf`/`cursor`, `paint`, `'fallthrough'`; empty 27 `'cancel'`. **Match `:88–99` for ESC.** Same helper in `get_ext_cmd` (`return -1` ≡ C extcmd cancel after `"\033"`). Review **593**’s `continue` is gone on both callers.

`apply_intr` still runs after ESC-clear. Buffer already empty; `*bufp=0` is a no-op. **Match `:102–105` order.**

`hooked_getlin_ctrl_p`: ESC is not `GETLIN_CTRL_P`. If `doprev`, restore prompt and `skip:false` so the key still reaches `edit_key`. **Match `:128–140` `else if (doprev)`.** `C('p')` `continue` is unchanged (D-1611).

`edit_key` else `tty_nhbell()` for 0x1b. Silent On still no-ops the byte. **Match `:211`.** Empty-kill stays silent. **Match D-1632.**

Empty ESC: C else-break with `obufp[0]='\033'`. JS `'cancel'` → `getlin` `"\x1b"`. C `tty_get_ext_cmd` `:317–323` (`csym tty_get_ext_cmd` → `getline.c:291-326`): `buf[0]=='\033'` → `nmatches=-1` → `return -1`. JS `get_ext_cmd` `'cancel'` returns `-1` before `mungspaces`/`extcmds_match`. **Match the cancel result.** (JS skips the `"unknown extended command"` pline because it never stores `"\033"` in `st.buf` and never reaches the match; C also returns `-1` without that pline when `nmatches==-1`.)

Helper body vs C:

```161:169:js/getline.js
async function hooked_getlin_handle_esc(c, st, paint) {
    if (c !== 27) return 'fallthrough';
    if (st.buf.length > 0) {
        st.buf = '';
        st.cursor = 0;
        await paint();
        return 'fallthrough';
    }
    return 'cancel';
}
```

`st.buf.length > 0` ≡ `obufp[0] != '\0'`. Clear + cursor 0 ≡ `obufp[0]='\0'; bufp=obufp`. `paint()` ≡ `tty_clear_nhwindow` + `addtopl(query)` + `" "` + empty. Returning `'fallthrough'` is the whole point of this SHA: C has no `continue` after `:99`.

`doprev` after type-then-`^P`-then-Esc: C `:128–140` restores `query+" "+obufp` with `*bufp=0` (already empty after the ESC clear). JS `ctrl_p` `if (doprev) { await restorePrompt(); skip:false }` then `edit_key` bells. **Match one fallthrough, not two bugs.** Review **593** said that skip was the same Must-fix family; this SHA fixes both by not `continue`ing.

C `tty_getlin` comment (`:31–33`) says nonempty Esc “removed and prompting continues as if from the start.” The **body** still hits `:211`. Review **593** forbade “fixing” this by deleting the bell. This SHA calls `tty_nhbell` like C, then loops. **Match the body.**

EOF: C `:85` treats EOF like empty-ESC (else-break, plus `term_gone`). JS `handle_esc` only tests 27. Contest `nhgetch` is not a vanished tty. **Named omit**, not a live-arm stub. Do not Must-fix EOF as if this SHA invented it.

Callee closure (ESC-nonempty arm). LIVE: `apply_intr`, `ctrl_p` doprev restore, `edit_key` else `tty_nhbell`, `getlin`/`get_ext_cmd`. CLONE: `handle_esc` (C arm, one local). OMIT named: termios, EOF, BEL byte, EDIT_GETLIN, `intr++` (now D-1646 — **later SHA**, not this one). STUB: none. Combined-arm ships. Dispatch is not “ported, callee stubbed.”

Always-`paint()` after the loop still extra-redraws after the helper’s own paint + else bell. C does not `putsyms` on that else. Cosmetic, not a control-flow miss.

## Hallucinations / overclaim

Subject nonempty ESC fallthrough vs `continue` after D-1632: **true on both callers.** D-log canary 11/11 + green + cohort: **claimed; this review does not re-run that canary.** Do **not** stamp “Match C `gettty` termios.” Do **not** stamp “Match C `c == EOF` cancel.” Do **not** stamp “Match C stdout BEL.” Do **not** stamp “Match C MENU_SEARCH” (later D-1646). Do **not** stamp “Match C EDIT_GETLIN `#ifdef`” (D-1624). Do **not** stamp “Match C yn bells” (D-1631). Public getlin ESC-clear is **mostly unhit** on tourist fortress (name-item uses Enter/ESC-empty more than type-then-Esc). Silent On hides BEL; the **call** is what C requires and JS now makes.

## Density

+37: Must-fix one arm (review **593**). Playbook: Must-fix stays one item, alone; sub-40 is allowed when C is that small. Did not glue MENU_SEARCH or landing_spot. Did not re-port kill_char.

## Verification

Wired: nonempty ESC no longer `continue`s; `intr` / `doprev` restore / else `tty_nhbell` run; empty ESC still cancel; both `getlin` and `get_ext_cmd`. Unwired C: EOF, termios, BEL byte. Conf: no `rn2`. No seed gate.

D-log canary **11**/11 (source + type/ESC/Enter `intr` consume + `tty_nhbell` call); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for type-then-Esc on fortress. The QUALITY-RISK skip is gone in source; screens still ignore silent BEL.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `gettty` termios; `c == EOF` cancel; stdout BEL. Do not add `hooked_getlin_handle_esc` #2. Do not re-port kill_char (D-1632). Do not re-port yn bells (D-1631). Do not enable EDIT_GETLIN. Do not “fix” empty-kill by also belling. Do not restore the `continue`.

Verdict: **ACCEPT-WITH-DEBT**
