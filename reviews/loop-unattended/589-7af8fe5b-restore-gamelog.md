# Review 589 — 7af8fe5b — restore.c restore_gamelog / save.c save_gamelog (D-1628)

## Metadata
- Full / short hash: `7af8fe5bc6d1cb616900d8a48af9fcf0eb92acaa` / `7af8fe5b`
- Parent: `15041ea2` (D-1627). This file audits **this SHA only** (eighth of nine `js/` commits since review **581**). Archive **Addressed:** D-1628 `7af8fe5b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 06:02:51 +0200
- D-id: **D-1628**
- Stats: `js/save.js` +63/−6. Band **150–350** (js/ insertions **63**).
- Claims to close: Open `restore_gamelog` after D-1614. Not `restore_luadata` (still Open). Not files.c tribute. `reviews/loop-2026-08-15/` has no unpaid gamelog Must-fix.
- JS / map: `save.js` `save_gamelog` / `restore_gamelog`; callee `pline.js` `gamelog_add` (D-0124). `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **575** named `restore_gamelog` `:721` / `save_gamelog` after `save_msghistory`.

## Intent vs deliverable

Git subject promises: JSON VFS save/restore round-trips the `#chronicle` list via `gamelog_add(flags, turn, msg)`, instead of dropping `gg.gamelog` after D-1614.

Pinned C `restore.c` `restore_gamelog` `:1386–1409` (`node scripts/csym.mjs restore_gamelog`). Caller `restgamestate` `:721` (`--callers restore_gamelog`). Pair `save.c` `save_gamelog` `:236–262` (`--callers save_gamelog`: `:327` savestate; `:1103` `discard_gamelog`). Callee `pline.c` `gamelog_add` `:494–511` under `CHRONICLE` (`--callers gamelog_add`: `:1406` this restore; `livelog_printf` `:523`). Stub `:530–535` is the `#else` of `CHRONICLE` — contest C uses the real body. `hack.h:502–507` `struct gamelog_line` `{ turn, flags, text, next }`. `restore_luadata` `nhlua.c:1344–1363` is the next C call (`:722`), still named. `--callers save_gamelog` `:327` is after `save_msghistory` `:326`.

```1386:1408:nethack-c/upstream/src/restore.c
void
restore_gamelog(NHFILE *nhfp)
{
    int slen = 0;
    char msg[BUFSZ*2];
    struct gamelog_line tmp = { 0 };

    while (1) {
        Sfi_int(nhfp, &slen, "gamelog-length");
        if (slen == -1)
            break;
        if (slen > ((BUFSZ*2) - 1))
            panic("restore_gamelog: msg too big (%d)", slen);
        Sfi_char(nhfp, msg, "gamelog-gamelog_text", slen);
        msg[slen] = '\0';
        Sfi_gamelog_line(nhfp, &tmp, "gamelog-gamelog_line");
#ifndef SFCTOOL
        gamelog_add(tmp.flags, tmp.turn, msg);
#endif
    }
}
```

Old JS: D-1614 `msghistory` JSON only; `dosave0` / `try_restore_save` had no gamelog chunk; `#chronicle` after restore was empty even if `livelog_printf` had filled `game.gamelog` this process.

The diff **does** `save_gamelog()` JSON array of `{text,turn,flags}` (no skip-empty), `restore_gamelog` walk + `gamelog_add(flags, turn, msg)`, missing/non-array no-op, too-big throw, present chunk `game.gamelog=[]` then add, import `gamelog_add` from `pline.js`. Persist is frozen `storage.js` VFS only. It **does not** port binary NHFILE `Sfo`/`Sfi`, `FREEING`/`discard_gamelog`, `restore_luadata`/`save_luadata`, or files.c tribute. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `restore_gamelog` | C `:1386–1409`, **LIVE this SHA** | JSON analogue of length/`-1` loop |
| `save_gamelog` | C `:236–262`, **LIVE this SHA** | JSON analogue; no skip-empty |
| `gamelog_add` | C `:494–511`, **LIVE** | pline.js D-0124; imported, not cloned |
| `dosave0` / `try_restore_save` callers | C `:327` / `:721`, **LIVE this SHA** | after msghistory |
| `restore_luadata` / `save_luadata` | C `:722` / `:328`, **OMIT named** | Open row |
| `discard_gamelog` FREEING | C `:1103`, **OMIT named** | |
| binary NHFILE / SFCTOOL | **OMIT named** | |

`node scripts/csym.mjs restore_gamelog` → `restore.c:1386-1409`. `save_gamelog` → `save.c:236-262`. `gamelog_add` → `pline.c:494-511`. `--callers restore_gamelog` `:721`. `--callers save_gamelog` `:327`. `--callers gamelog_add` `:1406`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
save_gamelog     js/save.js:331   sync
restore_gamelog  js/save.js:535   sync
gamelog_add      js/pline.js:10   sync
dosave0          js/save.js:211   sync
try_restore_save js/save.js:370   sync
restore_msghistory js/save.js:511   sync
restore_luadata  NOT FOUND in js/** (no export, no local function/const).
save_luadata     NOT FOUND in js/** (no export, no local function/const).
discard_gamelog  NOT FOUND in js/** (no export, no local function/const).
show_gamelog     js/insight.js:399   ASYNC — await required
```

`--can save.js pline.js gamelog_add`: `ALREADY: save.js already statically imports pline.js.` This SHA added that import. Do **not** stamp “cycle-forced clone.” Do not add `gamelog_add` in `save.js`. Do not stub `restore_luadata` as `return` and call it “Match C.” `--can` is SAFE/ALREADY.

C `save_gamelog` body (this SHA’s save analogue):

```236:261:nethack-c/upstream/src/save.c
staticfn void
save_gamelog(NHFILE *nhfp)
{
    struct gamelog_line *tmp = gg.gamelog, *tmp2;
    int slen;

    while (tmp) {
        tmp2 = tmp->next;
        if (nhfp->mode & (COUNTING | WRITING)) {
            slen = Strlen(tmp->text);
            Sfo_int(nhfp, &slen, "gamelog-length");
            Sfo_char(nhfp, tmp->text, "gamelog-gamelog_text", slen);
            Sfo_gamelog_line(nhfp, tmp, "gamelog-gamelog_line");
        }
        ...
        tmp = tmp2;
    }
    if (nhfp->mode & (COUNTING | WRITING)) {
        slen = -1;
        Sfo_int(nhfp, &slen, "gamelog-length");
    }
```

JS does not walk `next` pointers (array). **Match list order** if `gamelog_add` only appends (D-0124). `hack.h:502–507` fields persisted: `turn`, `flags`, `text` (`next` rebuilt on restore).

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean (VFS `vfsReadFile`/`vfsWriteFile` only).

## C ↔ JS fidelity

Save walk. C `:242–254` `while (tmp)` writes `Strlen(text)`, chars, `Sfo_gamelog_line`, does **not** skip empty (unlike `save_msghistory` `:1029` which skips `msglen < 1`). Then `:256–259` `Sfo_int(-1)`. JS pushes every `game.gamelog` row including `text:''`. **Match “no skip-empty.”** JSON array end ≡ C `-1` sentinel. Not a binary NHFILE clone.

Restore loop. C `Sfi_int` until `-1`; panic if `slen > BUFSZ*2-1`; `Sfi_char`; `Sfi_gamelog_line`; `gamelog_add(tmp.flags, tmp.turn, msg)`. JS: missing/non-array return (old save; same pattern as D-1614 msghistory); present array `game.gamelog=[]` then `gamelog_add(rec.flags, rec.turn, msg)`; `msg.length > BUFSZ*2-1` throws. **Match the add argument order (`hack.h:502–507` flags/turn/text).** C starts `gg.gamelog` NULL so add builds the list; JS replace-then-add is the JSON analogue of that empty start, not C appending onto a leftover list. Missing JSON field leaves `game.gamelog` untouched — same as D-1614’s missing `msghistory` (fresh isolate / no field on public restore fixtures).

`gamelog_add` body. C `:494–511` alloc, set turn/flags/`dupstr`, append to tail. JS `pline.js:10–17` push `{turn, flags, text}`. **LIVE callee, D-0124.** Restore does not clone the list walk. Contest C is `CHRONICLE` on (the `:530` stub is `#else`).

Caller slot. C save `:326–327` msghistory then gamelog then luadata. C restore `:720–722` msghistory then gamelog then luadata. JS `dosave0` payload `msghistory` then `gamelog`. JS `try_restore_save` `restore_msghistory` then `restore_gamelog`. **Match relative to named `restore_luadata`.**

Callee closure. LIVE: `gamelog_add`. OMIT named: `Sfo`/`Sfi` binary, FREEING, luadata. STUB: none in the live walk. The arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject JSON VFS round-trips `#chronicle` via `gamelog_add(flags, turn, msg)`: **true.** D-log “no skip-empty; missing field = old save; too-big throws ≡ panic; present chunk replaces”: **true.** Do **not** stamp “Match C binary NHFILE `Sfo_int`/`Sfi_char`/`Sfi_gamelog_line`.” Do **not** stamp “Match C `restore_luadata` / `save_luadata`.” Do **not** stamp “Match C FREEING `discard_gamelog`.” Do **not** stamp “Match C files.c tribute.” Do **not** stamp “Match C `gamelog_add` body” as this SHA (D-0124). Public seed0013-friday13-restore fixtures have **no** `gamelog` field — that run is the missing-field no-op, not a stuffed chronicle. `#chronicle` after a save that actually wrote entries is **public-unhit**.

## Density

+63 for a 24-line restore + 27-line save pair, same shape as D-1614 msghistory (JSON analogue, not binary). Did not glue luadata or tribute. Not a one-`if` peel. §2b C-that-small + the save/restore pair those 24 lines require.

## Branch-by-branch confirm

1. Save every node including empty text, then implicit end. **Match this SHA.**
2. Restore until end; `gamelog_add(flags, turn, msg)`. **Match.**
3. Too-big panic analogue. **Match.**
4. Missing JSON field. **Match D-1614 old-save convention.**
5. `restore_luadata`. **Named.**

## Callers / RNG ledger

Wired: `dosave0` after `save_msghistory`; `try_restore_save` after `restore_msghistory`. `show_gamelog` (`insight.js`) already reads `game.gamelog` (D-0124). Conf: none. No seed gate.

C `save_gamelog` `:251–254` FREEING frees `text` and the node, then `:260–261` `gg.gamelog=NULL`. JSON VFS always writes and keeps the in-memory array (same choice as D-1614 msghistory: no `update_file`/`FREEING`). **Named**, not a silent skip of the write path.

`livelog_printf` (`pline.c:523`) already calls `gamelog_add` (D-0124). This SHA does not change that producer; it only persists the list `dosave0` already could have filled.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No `fs`/`readFileSync`. Persist via frozen `storage.js` VFS JSON only. Do not add `gamelog_add` in `save.js`. Do not stub `restore_luadata` as `return` and call it “Match C.” `--can` is SAFE/ALREADY.

## Verification

D-log private canary **10**/10; focused seed0013 restore PASS; green+strict seed8000/0900; cohort **7**/7 + strict. seed0013-friday13-restore proves `try_restore_save` still PASSes on a fixture **without** `gamelog` (the no-op branch). **Public-unhit** for a non-empty `gamelog` array and for `#chronicle` after `dosave0`. Fortress PASS does not prove the stuffed walk.

## Actionable C-wrongs

None for Must-fix. Named (map / existing Open, not Must-fix): `restore_luadata` / `save_luadata` (already Open); binary NHFILE; FREEING `discard_gamelog`; files.c tribute (already Open). Do not clone `gamelog_add`. Do not treat missing JSON field as a C miss of `-1`. Do not re-port `restore_msghistory` (D-1614). Do not skip empty gamelog lines to “match” msghistory.

Verdict: **ACCEPT-WITH-DEBT**
