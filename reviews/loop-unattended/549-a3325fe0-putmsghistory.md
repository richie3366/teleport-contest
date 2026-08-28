# Review 549 — a3325fe0 — invent.c getobj putmsghistory (D-1588)

## Metadata
- Full / short hash: `a3325fe09f1217dc13d68397dcd1649ee7286641` / `a3325fe0`
- Parent: `5e46f730` (D-1587). This file audits **this SHA only** (fourth of nine `js/` commits since review **545**). Archive **Addressed:** D-1588 `a3325fe0`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 19:24:57 +0200
- D-id: **D-1588**
- Stats: `js/display.js` +180/−1, `js/invent.js` +17/−4. Band **150–350** (js/ insertions **197**).
- Claims to close: Open `putmsghistory` after D-1578. Not gacc. Not inuse_only. `reviews/loop-2026-08-15/` has no unpaid putmsghistory Must-fix.
- JS / map: `invent.js` `getobj`/`getobj_adjust`; `display.js` `putmsghistory`/`remember_topl` (C `topl.c`). `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **539** / **541** named `putmsghistory`.

## Intent vs deliverable

Git subject promises: force_invmenu records the bare What-do-you-want question in the tty message ring (NEED_MORE→NON_EMPTY, `remember_topl`) instead of omitting `tty_putmsghistory`.

Pinned C `invent.c` `getobj` `:1916–1929`. `qbuf` is `Sprintf("What do you want to %s?", word)` **before** the lets suffix, which is only appended in the `yn_function` else. Window proc `topl.c` `tty_putmsghistory` `:676–726`. Callees `remember_topl` `:169–191`; `msghistory_snapshot` `:557–601`; `free_msghistory_snapshot` `:604–624`; `pline.c` `dumplogmsg` `:21–46`; `update_topl` `:280`. Create `wintty.c` NHW_MESSAGE `:885–954` (clamp, alloc, **then `maxrow=0`**). `--callers putmsghistory`: invent `:1927`; cmd `:5086`; files `:3635`; questpgr `:608`; restore `:1432`/`:1438`.

```1916:1929:nethack-c/upstream/src/invent.c
    for (;;) {
        cnt = 0L;
        cntgiven = FALSE;
        Sprintf(qbuf, "What do you want to %s?", word);
        if (gi.in_doagain) {
            ilet = readchar();
        } else if (iflags.force_invmenu) {
            if (!oneloop)
                ilet = (*lets || *altlets) ? '?' : '*';
            if (!msggiven)
                putmsghistory(qbuf, FALSE);
            msggiven = TRUE;
            oneloop = TRUE;
```

Old JS: D-1578 auto `?`/`*` + redo; no window-proc history.

The diff **does** live `putmsghistory(qbuf,false)` once in `getobj`/`getobj_adjust`, export the C `topl.c` ring, and hook `remember_topl`/`dumplogmsg` into `pline_after_consume`. It **does not** port `tty_doprev_message`, restore.c replay, cmd `get_count` historicmsg, files/questpgr puts, or clone-getobj auto-open. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `getobj` force `putmsghistory` | C `:1926–1928`, **LIVE this SHA** | bare qbuf, `msggiven` once |
| `getobj_adjust` | same C function, **LIVE** | `"adjust"` qbuf |
| `putmsghistory` | C `:676–726`, **LIVE this SHA** | export name = winproc macro |
| `remember_topl` | C `:169–191`, **LIVE this SHA** | |
| `ensure_message_win` | C `:885–954`, **LIVE this SHA** | min 20, `maxrow=0` after size |
| `msghistory_snapshot` / `free_msghistory_snapshot` | C `:557–624`, **LIVE** | restore path named |
| `getmsghistory` | C `:636–657`, **LIVE** | save walk named |
| `dumplogmsg` | C `:21–46`, **LIVE** | pline + put |
| `update_topl` remember | C `:280`, **LIVE this SHA** | NEED_MORE remember-before-`more()` |
| `tty_doprev_message` | **OMIT named** | `sym` NOT FOUND |
| restore / cmd / files / questpgr puts | **OMIT named** | |
| clone getobj put | **OMIT named** | apply/drink/write/name still yn |

`node scripts/csym.mjs putmsghistory` → macro `winprocs.h:181`. `tty_putmsghistory` → `:676-726`. `remember_topl` → `:169-191`; `--callers`: update_topl `:280`; snapshot `:572`; put `:705`/`:716`; wintty `:2295`. `dumplogmsg` → `:21-46`.

RNG: **none**. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
putmsghistory    js/display.js:1434   sync
remember_topl    js/display.js:1354   sync
getmsghistory    js/display.js:1413   sync
dumplogmsg       js/display.js:1335   sync
tty_putmsghistory NOT FOUND
tty_doprev_message NOT FOUND
```

`--can invent.js display.js putmsghistory`: ALREADY. Do **not** add `putmsghistory` in `invent.js`. Do **not** invent `tty_doprev_message` this review.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

qbuf. Force path puts `"What do you want to ${word}?"` with **no** `[lets or ?*]`. **Match `:1919` vs `:1931–1935`.** `msggiven` once per call, including redo `*`/`?`. **Match `:1926–1928`.** Adjust clone uses the same format with `word==='adjust'`. **Match shared C `getobj`.**

`tty_putmsghistory`. restoring+!initd → snapshot(purge) + dumplog index 0. **Match `:681–693`** (restore callers named). `msg` non-null: NEED_MORE→NON_EMPTY (`TOPLINE_*` 1/2), `remember_topl`, `_toplines=msg`, `dumplogmsg`. **Match `:695–709`.** Null msg replays snapshot. **Match `:710–725`.** Comment “don’t provoke more()” is C’s.

Ring. Clamp `msg_history` 20..128 (`MAX_MSG_HISTORY` `global.h:419`). Alloc `rows` slots then write index 0. **Match `wintty.c:889–954` (`maxrow=0` after alloc).** `remember_topl`: LOCKHISTORY or empty no-op; store; unless checkpoint clear toplines and `(idx+1)%rows`. **Match `:169–191`** (pad-to-8 named omit). `WIN_LOCKHISTORY=2`. **Match `wintty.h:78`.**

`update_topl`. Concat arm (NEED_MORE/skip + room + not “You die”) returns **without** remember. **Match `:264–273`.** Replace arm: C `more()` then `remember_topl` `:275–280`. JS `more()` **clears** `_toplines` (`:4228`), so this SHA `remember_topl`s **before** `await more()` then again after (empty no-op). Net ring copy is the old line; `more()` still reads `_pending_message`. **Adapted, same net as C `:280` for the ring.** Concat still skips the ring. **Match.**

`dumplogmsg` on default `pline`. **Match `pline.c` DUMPLOG_CORE** (yn `ATR_NOHISTORY` named). JS both reuse-slots assign the string (no C `dupstr`/free). Equivalent.

Callee closure (force_invmenu getobj). LIVE: `putmsghistory`, `remember_topl`, `dumplogmsg`, NEED_MORE→NON_EMPTY, `getobj_force_invmenu_ch`. OMIT named: `tty_doprev_message`, restore replay, cmd Count, clone skip-yn. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject bare qbuf in the ring + NEED_MORE→NON_EMPTY: **true for live `getobj`/`getobj_adjust`.** D-log “qbuf without `[lets]`”: **true.** Do **not** stamp “Match C `^P` `tty_doprev_message`.” Do **not** stamp “Match C `restore_msghistory`.” Do **not** stamp “Match C `get_count` historicmsg `cmd.c:5086`.” Do **not** stamp “Match C force_invmenu put on apply/drink/write/name clones.” Do **not** stamp “C `more()` now runs after `remember_topl`” — C still more-then-remember; JS is a clear-toplines adaptation. Public screens do not assert `^P`.

## Density

One getobj site + the window-proc callees that put needs (ring, remember, dumplog, update_topl hook). +197 JS. Did not glue `tty_doprev_message` / restore. §2b OK.

## Branch-by-branch confirm

1. `!force_invmenu`: no put; yn still has `[lets]`. **Match.**
2. force first loop: put bare qbuf once; `oneloop`; auto `?`/`*`. **Match.**
3. force redo `*`/`?`: `msggiven` skips second put. **Match.**
4. NEED_MORE at put: toplin NON_EMPTY then remember. **Match.**
5. `remember_topl` LOCKHISTORY / empty. **Match.**
6. `^P` / restore / Count / clones. **Named.**

## Callers / RNG ledger

C getobj is the scored caller. Extra puts (cmd/files/quest/restore) named. No RNG. `reset_display_messages` clears the ring per harness run — not C, but stops NEED_MORE leak (existing helper).

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. One `putmsghistory` at the pline home. Do not add `tty_doprev_message` here. Do not add a second ring in `invent.js`. Do not skip painting spaces.

## Verification

D-log private canary **9**/9; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless `iflags.force_invmenu` is on in the contest rc (then getobj screens still omit `^P`; the ring is not scored). `remember_topl` on every replacing pline is exercised by green/cohort; they stayed PASS.

## Actionable C-wrongs

None for Must-fix. Named: `tty_doprev_message`; `restore.c` `putmsghistory` TRUE/null; `cmd.c:5086` Count; files tribute; questpgr synopsis; clone getobj skip-yn put; yn `ATR_NOHISTORY`; sortloot inuse_only / wizid (later SHAs). Do not add `putmsghistory` #2. Do not treat JS more-then-empty as a miss of C remember after more.

Verdict: **ACCEPT-WITH-DEBT**
