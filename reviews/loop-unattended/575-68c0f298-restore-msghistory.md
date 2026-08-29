# Review 575 — 68c0f298 — restore.c restore_msghistory (D-1614)

## Metadata
- Full / short hash: `68c0f298d9ab13ef06ecd11aa6d6fed50de71df5` / `68c0f298`
- Parent: `587c52ad` (D-1613). This file audits **this SHA only** (third of nine `js/` commits since review **572**). Archive **Addressed:** D-1614 `68c0f298`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 02:44:42 +0200
- D-id: **D-1614**
- Stats: `js/save.js` +58/−5. Band **150–350** (js/ insertions **58**; C pair is 59 lines).
- Claims to close: Open `restore_msghistory` after D-1588 / D-1613. Not putmsghistory body. `reviews/loop-2026-08-15/` has no unpaid msghistory-restore Must-fix.
- JS / map: `save.js` `save_msghistory` / `restore_msghistory`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **549** named `restore.c` `putmsghistory` TRUE/null; **573** / **574** named `restore_msghistory`.

## Intent vs deliverable

Git subject promises: JSON VFS save/restore walks `getmsghistory` / `putmsghistory` like C, instead of dropping the ^P ring across saves.

Pinned C `restore.c` `restore_msghistory` `:1411–1441` caller `restgamestate` `:720`. Pair `save.c` `save_msghistory` `:1029–1056` caller savestate `:326`. Callees windowproc `getmsghistory` / `putmsghistory` → `topl.c` `tty_getmsghistory` `:636–657` / `tty_putmsghistory` `:676–726` (D-1588). `--callers restore_msghistory`: `:720`. `--callers save_msghistory`: `:326`.

```1411:1438:nethack-c/upstream/src/restore.c
void
restore_msghistory(NHFILE *nhfp)
{
    int msgsize = 0;
    int msgcount = 0;
    char msg[BUFSZ];

    while (1) {
        Sfi_int(nhfp, &msgsize, "msghistory-length");
        if (msgsize == -1)
            break;
        if (msgsize > BUFSZ - 1)
            panic("restore_msghistory: msg too big (%d)", msgsize);
        Sfi_char(nhfp, msg, "msghistory-msg", msgsize);
        msg[msgsize] = '\0';
        putmsghistory(msg, TRUE);
        ++msgcount;
    }
    if (msgcount)
        putmsghistory((char *) 0, TRUE);
}
```

Old JS: `dosave0` / `try_restore_save` had no msghistory chunk after D-1588 shipped the ring itself.

The diff **does** walk live `getmsghistory` into a JSON string array (skip empty, truncate `BUFSZ-1`), restore each with `putmsghistory(msg, true)`, then `putmsghistory(null, true)` if any; missing/non-array = old JSON (empty walk); too-big throws ≡ C panic. Persist is frozen `storage.js` VFS only. It **does not** port binary NHFILE `Sfo`/`Sfi`, `update_file`/`FREEING`, `restore_gamelog`, `restore_luadata`, files.c tribute, or questpgr synopsis. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `restore_msghistory` | C `:1411–1441`, **LIVE this SHA** | JSON analogue of length/`-1` |
| `save_msghistory` | C `:1029–1056`, **LIVE this SHA** | same analogue |
| `getmsghistory` | C `tty_getmsghistory` `:636–657`, **LIVE** | D-1588; snapshot lock |
| `putmsghistory` | C `tty_putmsghistory` `:676–726`, **LIVE** | D-1588; TRUE then NULL |
| `dosave0` | C savestate `:326`, **LIVE this SHA** | payload field after `uz` |
| `try_restore_save` | C `restgamestate` `:720`, **LIVE this SHA** | after `rebuildObjectsAt` |
| `update_file` / FREEING | C `:1037`, **OMIT named** | JSON always writes |
| `restore_gamelog` | C `:721`, **OMIT named** | Open row |
| `restore_luadata` | C `:722`, **OMIT named** | |
| binary NHFILE | C Sfo/Sfi, **OMIT named** | JSON array = `-1` sentinel |
| files.c tribute / questpgr | **OMIT named** | |

`node scripts/csym.mjs restore_msghistory` → `:1411-1441`. `save_msghistory` → `:1029-1056`. `BUFSZ` 256 (`global.h:389` / `const.js`).

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
save_msghistory  js/save.js:303   sync
restore_msghistory js/save.js:482   sync
getmsghistory    js/display.js:1429   sync
putmsghistory    js/display.js:1450   sync
dosave0          js/save.js:207   sync
try_restore_save js/save.js:344   sync
```

`--can save.js display.js getmsghistory`: ALREADY. `--can save.js display.js putmsghistory`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `getmsghistory` / `putmsghistory` in `save.js`. Do **not** `import` `fs` for the save blob.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean (VFS only).

## C ↔ JS fidelity

Save walk. `init=TRUE` then FALSE; `getmsghistory` until NULL; skip `msglen<1`; clamp `BUFSZ-1`; write bytes. JS `out.push(msg.slice(0, msglen))`. **Match `:1039–1051` minus Sfo.** C then `Sfo_int -1`. JS array end is that sentinel. Empty ring → `[]` ≡ immediate `-1`. **Match the walk.** `update_file` gate omitted (always write). Named.

Restore walk. Length until `-1`; `>BUFSZ-1` panic; `putmsghistory(msg, TRUE)`; if any `putmsghistory(NULL, TRUE)`. JS: missing field return; else each string + optional null. **Match `:1423–1438` as JSON analogue.** First TRUE call still snapshots+purges live “Restoring…” (`tty_putmsghistory` `:682–695`); NULL replays (`:708–722`). That body is D-1588, not re-ported here.

`getmsghistory`. init → `msghistory_snapshot(FALSE)` + idx 0; walk until sentinel then `free_msghistory_snapshot(FALSE)`. JS `:1429–1439`. **Match `:636–657`.**

Caller slot. C save after `savenames`, before `save_gamelog`. C restore after `restnames`, before `restore_gamelog`. JS save last in the JSON payload; JS restore after object rebuild, before `beyond_savefile_load`. Gamelog/lua still unnamed in the blob. **Match the msghistory slot relative to those named omits.**

Callee closure. LIVE: `getmsghistory`, `putmsghistory`, VFS write/read. STUB: none in the live walk. OMIT named: binary Sfo, `update_file`, gamelog/lua. Arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject JSON VFS walks the same two windowprocs: **true.** D-log “missing field = old save; too-big throws ≡ panic”: **true.** Do **not** stamp “Match C binary NHFILE `Sfo_int`/`Sfi_char`.” Do **not** stamp “Match C `restore_gamelog` / `restore_luadata`.” Do **not** stamp “Match C `update_file` / FREEING.” Do **not** stamp “Match C files.c tribute / questpgr synopsis.” Public fixture restores have no `msghistory` field (sessions frozen) so the stuffed-ring path is unhit.

## Density

Tight save+restore pair of one chunk. +58 JS; C is 31+28 lines. Did not glue gamelog. §2b OK (C that small).

## Branch-by-branch confirm

1. Save nonempty ring, skip empty, truncate 255. **Match.**
2. Save empty → `[]` ≡ `-1`. **Match.**
3. Restore array: TRUE each, NULL if any. **Match.**
4. Restore missing field: no-op. **Analogue** (old JSON).
5. Restore too-big: throw ≡ panic. **Match.**
6. gamelog / lua / `update_file`. **Named.**

## Callers / RNG ledger

Wired: `dosave0`, `try_restore_save`. Unwired C: SFCTOOL-only compile. No RNG. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. No `fs`. Do not add a second ring in `save.js`. Do not edit `sessions/**` to inject `msghistory`. putmsghistory body is D-1588. get_count hist is D-1613.

## Verification

D-log private canary **11**/11; focused seed0013 restore PASS; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for a stuffed `msghistory` array: seed0013-friday13-restore exercises `try_restore_save` on a fixture without the field (the no-op branch). Fortress PASS does not prove the TRUE/NULL replay. `restore_gamelog` unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `restore_gamelog` (`:721`); `restore_luadata`; binary NHFILE; `update_file`/FREEING; files.c tribute; questpgr `com_pager_core` synopsis. Do not clone `getmsghistory` in `save.js`. Do not treat missing JSON field as a C miss of `-1`.

Verdict: **ACCEPT-WITH-DEBT**
