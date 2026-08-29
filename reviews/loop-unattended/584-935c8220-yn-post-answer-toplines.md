# Review 584 — 935c8220 — topl.c tty_yn_function post-answer toplines (D-1623)

## Metadata
- Full / short hash: `935c82205edda25ec50e030f3c8442577df7f8b7` / `935c8220`
- Parent: `fdb4ed5d` (D-1622). This file audits **this SHA only** (third of nine `js/` commits since review **581**). Archive **Addressed:** D-1623 `935c8220`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 05:05:15 +0200
- D-id: **D-1623**
- Stats: `js/getline.js` +68/−41, `js/display.js` +17/−1. Band **150–350** (js/ insertions **85**).
- Claims to close: Open `tty_yn_function` post-answer `toplines=prompt+key` after D-1612. Not yn ^P. Not EDIT_GETLIN. `reviews/loop-2026-08-15/` has no unpaid yn-toplines Must-fix.
- JS / map: `getline.js` `tty_yn_clean_up` / `yn_function`; `display.js` `tty_yn_rewrite_toplines`; `dokeylist.js` `key2txt`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **573** named `:532–538` `Sprintf(gt.toplines, "%s%s", prompt, rtmp)`.

## Intent vs deliverable

Git subject promises: after a yn answer `gt.toplines` is prompt+`key2txt` (or `#N`) and `dumplogmsg`, instead of leftover-only `_toplines` after D-1612.

Pinned C `win/tty/topl.c` `tty_yn_function` `:364–551` (`node scripts/csym.mjs tty_yn_function`). clean_up `:532–549`. `--callers tty_yn_function`: **0** (windowproc `wintty.c:142`). `key2txt` `cmd.c` `:3224–3240` (`--callers` includes `topl.c:537`). `dumplogmsg` `pline.c` `:21–46`. `addtopl(rtmp)` commented out (`:538`). yn ^P `:434–463` is D-1612.

```532:549:nethack-c/upstream/win/tty/topl.c
 clean_up:
    if (yn_number)
        Sprintf(rtmp, "#%ld", yn_number);
    else
        (void) key2txt(q, rtmp);
    /* addtopl(rtmp); -- rewrite gt.toplines instead */
    Sprintf(gt.toplines, "%s%s", prompt, rtmp);
#ifdef DUMPLOG_CORE
    dumplogmsg(gt.toplines);
#endif
    ttyDisplay->inread--;
    ttyDisplay->toplin = TOPLINE_NON_EMPTY;
    if (ttyDisplay->intr)
        ttyDisplay->intr--;
    if (wins[WIN_MESSAGE]->cury)
        tty_clear_nhwindow(WIN_MESSAGE);
```

Old JS (D-1612): all valid returns `mark_topline_prompt(prompt)` so `_toplines` was the painted prompt only. Comment said prompt+key2txt still named.

The diff **does** funnel every yn return through `tty_yn_clean_up` (`yn_number` → `#N` else `key2txt(q)`), `tty_yn_rewrite_toplines` (`_toplines` + live `dumplogmsg` + NON_EMPTY), import `dokeylist.js` `key2txt` (no getline clone). It **does not** port `tty_nhbell` on invalid (`:476`), `cw->cury` `tty_clear_nhwindow` (`:547–548`), `ttyDisplay->intr--` (`:545–546`), EDIT_GETLIN, or `kill_char`. Named. `addtopl(rtmp)` stays commented — leftover `_pending_message` is still the painted prompt. **Match C’s choice not to addtopl.**

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `yn_function` | C `tty_yn_function` `:364–551`, **LIVE** | clean_up this SHA; ^P D-1612 |
| `tty_yn_clean_up` | C `:532–542` label, **LIVE this SHA** | local; do not export #2 |
| `tty_yn_rewrite_toplines` | C `Sprintf` + `dumplogmsg`, **LIVE this SHA** | display.js |
| `key2txt` | C cmd `:3224–3240`, **LIVE** | import dokeylist; pager.js still has clone #2 — do not add #3 |
| `visctrl` | C, **LIVE** | dokeylist; key2txt else |
| `dumplogmsg` | C pline `:21–46`, **LIVE** | same-file; skip `"Unknown command"` |
| `hooked_yn_end` | C `:543–544` inread-- + NON_EMPTY, **LIVE** | `release_prompt` no-ops if already NON_EMPTY |
| `mark_topline_prompt` | leftover paint, **LIVE** | no longer used on yn return |
| `tty_nhbell` invalid | C `:476`, **OMIT named** | retry still silent |
| `cw->cury` clear | C `:547–548`, **OMIT named** | |
| `ttyDisplay->intr--` | C `:545–546`, **OMIT named** | |
| `addtopl(rtmp)` | C commented `:538`, **OMIT correctly** | not a miss |

`node scripts/csym.mjs tty_yn_function` → `:364-551`. `key2txt` → `:3224-3240`. `dumplogmsg` → `:21-46`. `--callers key2txt` includes `topl.c:537`.

RNG: none in clean_up. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
tty_yn_clean_up  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/getline.js:1119
             => Do NOT write clone #2.
tty_yn_rewrite_toplines js/display.js:1670   sync
yn_function      js/getline.js:1146   ASYNC — await required
key2txt          js/dokeylist.js:58   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/pager.js:1593
dumplogmsg       js/display.js:1352   sync
hooked_yn_end    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/getline.js:1067
             => Do NOT write clone #2.
```

`--can getline.js dokeylist.js key2txt`: `ALREADY: getline.js already statically imports dokeylist.js.` Do **not** stamp “cycle-forced clone.” Do **not** add `key2txt` in `getline.js` or `display.js`. Do not add `tty_yn_clean_up` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

All exits go through clean_up. C `!resp` `goto clean_up`; ESC/`quitchars`/`#`/digit/`strchr(resp)` `break` then clean_up. JS `!resp`, ESC→q/n/def, space/enter→def, `num===0`→`'n'`, `'#'`+`yn_number`, `resp.includes(ch)` all `return tty_yn_clean_up`. **Match `:428–530` then `:532`.** Invalid still `continue` without bell. Named `:476`.

`yn_number`. C `if (yn_number)` then `#%ld` else `key2txt(q)`. JS `if (game.yn_number)` then `` `#${game.yn_number}` `` else `key2txt(code)`. Zero-count returns `'n'` with `yn_number` still 0 → `"n"`. **Match `:533–537`.** `'#'` with a positive count uses `#N`, not `key2txt('#')`. **Match.**

`key2txt`. C space/`ESC`/`\n`/`DEL` → `<space>`/`<esc>`/`<enter>`/`<del>` else `visctrl`. JS dokeylist `:58–64` same four plus `\r` as `<enter>` (C `\n` only; yn quit uses 13 or 10 → def **before** clean_up, so the extra `\r` is not a live yn-answer miss). Printable `visctrl` is the char. **Match `:3224–3240` for y/n/q and the `!resp` raw key.**

`Sprintf(gt.toplines, "%s%s", prompt, rtmp)`. Prompt already has trailing space (`:419` / `:425`). JS `` `${prompt}${rtmp}` ``. **Match `:539`.** Does not `addtopl`. `_pending_message` stays the painted prompt (`paint` last assignment). **Match commented `:538`.**

`dumplogmsg(gt.toplines)`. JS `dumplogmsg(_toplines)` inside the rewrite helper (skip `"Unknown command"`). **Match `:540–542` + `pline.c:21–46`.** DUMPLOG_CORE is compiled in.

inread / toplin. C `--` then NON_EMPTY. JS rewrite sets NON_EMPTY first; `finally hooked_yn_end` decrements inread then `hooked_getlin_release_prompt` which only demotes SPECIAL→NON_EMPTY. After rewrite, `_toplin` is already NON_EMPTY so release is a no-op and does **not** overwrite `_toplines`. **Match `:543–544` without clobbering the new string.**

`intr--` / `cw->cury` clear. Named. Wrapped yn leftover rows can stay until parse clear; C would `tty_clear_nhwindow` when cury≠0.

Callee closure (clean_up arm). LIVE: `key2txt`, `visctrl`, `dumplogmsg`. CLONE: none new (`tty_yn_clean_up` is the C label inlined). OMIT named: `tty_nhbell`, `cury` clear, `intr`. STUB: none. The arm may ship. Not “dispatch ported, callee is a stub.”

## Hallucinations / overclaim

Subject after a yn answer `_toplines` is prompt+key2txt/`#N` + dumplogmsg: **true on every yn return this SHA.** D-log leftover stays painted (no addtopl): **true.** Do **not** stamp “Match C `tty_nhbell` (`:476`).” Do **not** stamp “Match C `cw->cury` `tty_clear_nhwindow` (`:547–548`).” Do **not** stamp “Match C `ttyDisplay->intr--`.” Do **not** stamp “Match C yn ^P” (D-1612). Do **not** stamp “Match C EDIT_GETLIN / kill_char.” Do **not** stamp “Match C `addtopl(rtmp)`” (C comments it out). Fortress yn screens prove the leftover paint, not `_toplines`/`dumplogmsg` (judge does not dump `gt.toplines`).

## Density

+85: C clean_up plus importing the live `key2txt` the Sprintf needs. §2b one locus. Did not glue EDIT_GETLIN or `tty_nhbell`. Above a one-`if` peel.

## Branch-by-branch confirm

1. `!resp` one `readchar` → clean_up. **Match.**
2. ESC q/n/def; space/enter def. **Match.**
3. `'#'` / digits → `#N` or `'n'`. **Match.**
4. Allowed letter → `key2txt(ch)`. **Match.**
5. Invalid retry, no bell. **Named.**
6. inread-- + NON_EMPTY; no addtopl. **Match.**
7. cury / intr. **Named.**

## Callers / RNG ledger

Wired: every `yn_function` return (windowproc). Unwired C: `tty_nhbell`, wrap clear. Conf: no `rn2`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `key2txt` clone in `getline.js`. Do not `addtopl` the answer to “prove” leftover. Do not import `fs`.

## Verification

D-log green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for `_toplines` contents and dumplog ring (sessions compare screens, not `gt.toplines`). Fortress yn leftover paint is the old path. `tty_nhbell` / wrap-clear unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `tty_nhbell` on invalid (`topl.c:476`); `cw->cury` `tty_clear_nhwindow` (`:547–548`); `ttyDisplay->intr--` (`:545–546`); EDIT_GETLIN / `kill_char`. Do not glue those into yn ^P. Do not add `tty_yn_clean_up` #2. Do not re-port `key2txt`.

Verdict: **ACCEPT-WITH-DEBT**
