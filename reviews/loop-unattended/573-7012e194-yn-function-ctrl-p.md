# Review 573 — 7012e194 — topl.c tty_yn_function ^P (D-1612)

## Metadata
- Full / short hash: `7012e194b8303c74a4cb3d95b2f473e96d31af37` / `7012e194`
- Parent: `d543b51d` (audit of D-1603–D-1611). This file audits **this SHA only** (first of nine `js/` commits since review **572**). Archive **Addressed:** D-1612 `7012e194`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 02:24:09 +0200
- D-id: **D-1612**
- Stats: `js/getline.js` +120/−30, `js/display.js` +10/−5. Band **150–350** (js/ insertions **130**).
- Claims to close: Open `tty_yn_function` ^P after D-1611. Not command ^P. Not getline ^P. `reviews/loop-2026-08-15/` has no unpaid yn-^P Must-fix.
- JS / map: `getline.js` `yn_function` / `tty_yn_ctrl_p`; `display.js` inread comments. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **572** named yn ^P (`topl.c` `:434–448`); **562** named the same after command `tty_doprev_message`.

## Intent vs deliverable

Git subject promises: Ctrl-P during yn walks `tty_doprev_message` like C, instead of treating it as an invalid retry.

Pinned C `win/tty/topl.c` `tty_yn_function` `:364–551`. inread / SPECIAL `:394–396`. ^P `:434–463`. Exit `:544–545`. Wired as `win_proc.yn_function` in `wintty.c:142` (`node scripts/csym.mjs --callers tty_yn_function` prints **0** — function-pointer, not a C identifier call). Callee `tty_doprev_message` is D-1601.

```434:461:nethack-c/upstream/win/tty/topl.c
        if (q == '\020') { /* ctrl-P */
            if (iflags.prevmsg_window != 's') {
                int sav = ttyDisplay->inread;
                ttyDisplay->inread = 0;
                (void) tty_doprev_message();
                ttyDisplay->inread = sav;
                tty_clear_nhwindow(WIN_MESSAGE);
                cw->maxcol = cw->maxrow;
                addtopl(prompt);
            } else {
                if (!doprev)
                    (void) tty_doprev_message(); /* need two initially */
                (void) tty_doprev_message();
                doprev = 1;
            }
            q = '\0';
            continue;
        } else if (doprev) {
            tty_clear_nhwindow(WIN_MESSAGE);
            cw->maxcol = cw->maxrow;
            doprev = 0;
            addtopl(prompt);
            q = '\0';
            continue;
        }
```

Old JS: after D-1611, yn still dropped `0x10` as `!resp.includes` continue. Getline used `hooked_getlin_ctrl_p` (zeros inread always; `'c'`&&!doprev double-call). Gluing that helper onto yn would treat `'c'` as single-mode. This SHA did **not** glue.

The diff **does** `inread++` around yn, SPECIAL_PROMPT while waiting, a separate `tty_yn_ctrl_p` (non-`'s'` zeros inread then restore; `'s'` two calls first then discard the next key), and `!resp` still one `readchar` with no ^P loop. It **does not** port `Sprintf(gt.toplines, "%s%s", prompt, rtmp)` (`:538`), `tty_nhbell` on invalid, `restore_msghistory`, or get_count historicmsg. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `tty_yn_ctrl_p` | C `:434–463`, **LIVE this SHA** | local; not `hooked_getlin_ctrl_p` |
| `hooked_yn_begin` / `_end` | C `:395` / `:544–545`, **LIVE this SHA** | inread++ / -- + drop SPECIAL |
| `yn_function` | C `tty_yn_function`, **LIVE this SHA** | ^P + inread envelope |
| `tty_doprev_message` | C topl.c, **LIVE** | D-1601; inread 0 only on non-`'s'` |
| `hooked_getlin_restore_prompt` | **CLONE** of C clear+maxcol+addtopl | used by yn restore; matched here |
| `hooked_getlin_ctrl_p` | C getline `:105–141`, **not this arm** | D-1611; must stay unwired from yn |
| post-answer `toplines=prompt+key` | C `:532–538`, **OMIT named** | Open row |
| `tty_nhbell` invalid | C `:476`, **OMIT named** | pre-existing |
| `restore_msghistory` | C restore, **OMIT named** | next Open at the time |
| get_count historicmsg | C `cmd.c`, **OMIT named** | |
| EDIT_GETLIN | C getline, **OMIT named** | not yn |

`node scripts/csym.mjs tty_yn_function` → `:364-551`. `--callers` 0 (windowproc). `C('p')` = `0x10` = `GETLIN_CTRL_P`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
yn_function      js/getline.js:1081   ASYNC — await required
tty_yn_ctrl_p    NOT EXPORTED — 1 LOCAL CLONE in js/getline.js:1044
hooked_yn_begin  NOT EXPORTED — 1 LOCAL CLONE in js/getline.js:1020
hooked_yn_end    NOT EXPORTED — 1 LOCAL CLONE in js/getline.js:1024
hooked_getlin_ctrl_p NOT EXPORTED — 1 LOCAL in js/getline.js:70
tty_doprev_message js/display.js:1578   ASYNC — await required
mark_topline_special_prompt js/display.js:1666   sync
hooked_getlin_restore_prompt NOT EXPORTED — 1 LOCAL in js/getline.js:99
hooked_getlin_release_prompt js/display.js:1676   sync
prevmsg_reset_maxcol js/display.js:1502   sync
get_tty_inread   js/display.js:1292   sync
set_tty_inread   js/display.js:1297   sync
```

`--can getline.js display.js tty_doprev_message`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `tty_yn_ctrl_p` #2. Do **not** glue getline `'c'` double-call onto yn. Do **not** add `yn_function` in `display.js`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

inread. `hooked_yn_begin` before paint; `--` in `finally` even on `!resp` / ESC / valid return. **Match `:395` / `:544`.** Nested yn nests the counter. Command ^P still sees 0 outside yn/getlin.

^P non-`'s'`. Save inread, zero it, one `tty_doprev_message`, restore inread, clear + `maxcol=maxrow` + repaint prompt, `doprev` stays false. **Match `:435–442`.** That is what lets D-1601’s f/c/r arms run. Combo `'c'` is **not** `'s'`, so yn takes this arm (getline takes the double-call arm for first `'c'`). Splitting the helper is required C, not style.

^P `'s'`. Do **not** zero inread. If `!doprev` first call, then always a second; `doprev=true`; leave the walk on screen. **Match `:443–447`.** Default TTY `'s'`.

After `'s'` walk, next non-^P. Restore prompt, discard the key, `doprev=false`. **Match C BUG `:451–460`.** Another ^P is tested first (`q == '\020'` before `else if (doprev)`); JS same (`c === GETLIN_CTRL_P` before the doprev discard). **Match.**

`!resp`. One `readchar`, no ^P loop, goto clean_up. JS one `nhgetch` inside the inread pair. **Match `:421–427`.**

SPECIAL_PROMPT. C sets once at `:394`. JS `mark_topline_special_prompt` on each paint so `redotoplin` more() is skipped (`:137` otoplin). Exit drops SPECIAL → NON_EMPTY. **Match `:545`.** Leftover `gt.toplines` after answer is still the unwrapped prompt, not `prompt+key2txt`. Named.

Callee closure (^P arm). LIVE: `tty_doprev_message`, inread accessors. CLONE: restore = `clear_nhwindow_message` + `prevmsg_reset_maxcol` + paint (`addtopl` stand-in; same helper getline already used). OMIT named: clean_up `Sprintf` / `tty_nhbell`. STUB: none in the ^P arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject yn Ctrl-P walks the ring: **true** (`yn_function` only). D-log “zeros inread only when `prevmsg_window!='s'`; `'s'` double-call then discards next key”: **true.** Do **not** stamp “Match C getline.c ^P (`:105–141`).” Do **not** stamp “Match C command ^P” (already D-1601). Do **not** stamp “Match C `hooked_getlin_ctrl_p` on yn” (this SHA correctly refused that glue). Do **not** stamp “Match C post-answer `toplines=prompt+key` (`:538`).” Do **not** stamp “Match C `tty_nhbell`.” Do **not** stamp “Match C `restore_msghistory`.” Public yn ^P is unhit.

## Density

One `tty_yn_function` ^P envelope. +130 JS. Did not glue getline’s `'c'` arm. Did not ship restore_msghistory / get_count in the same commit. §2b OK.

## Branch-by-branch confirm

1. `'s'`, first ^P: two `tty_doprev_message`, inread unchanged, continue. **Match.**
2. `'s'`, later ^P: one call, continue. **Match.**
3. `'s'`, next printable / ESC / valid yn letter: restore, discard, retry. **Match C BUG.**
4. `'f'`/`'r'`/`'c'`: zero inread, one call, restore prompt, `doprev` false. **Match.**
5. `!resp`: one key, no ^P dispatcher. **Match.**
6. clean_up prompt+key / nhbell. **Named.**

## Callers / RNG ledger

Wired: JS `yn_function` (C windowproc). Getline / extcmd stay on `hooked_getlin_ctrl_p`. No RNG. No seed gate. `C('p')` is not a rebind during yn.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not glue yn onto `hooked_getlin_ctrl_p`. Do not honor BIND=`#prevmsg` here. Do not skip `inread++`. Do not wrap `wildmiss` as `pline_mon`. Command ^P is D-1601. Getline ^P is D-1611.

## Verification

D-log private canary **14**/14; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for yn ^P. Fortress command ^P / getlin ^P does not prove this dispatcher. restore_msghistory / get_count unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): post-answer `toplines=prompt+key` (`topl.c` `:532–538`); `tty_nhbell` on invalid (`:476`); `restore_msghistory`; get_count historicmsg; EDIT_GETLIN. Do not glue this helper onto getline. Do not treat `'c'` as `'s'` for yn.

Verdict: **ACCEPT-WITH-DEBT**
