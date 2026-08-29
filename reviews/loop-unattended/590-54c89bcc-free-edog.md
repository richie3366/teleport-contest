# Review 590 — 54c89bcc — dog.c free_edog / restmon newedog (D-1629)

## Metadata
- Full / short hash: `54c89bccc88426ee476ebea653202c086b1c0ea8` / `54c89bcc`
- Parent: `7af8fe5b` (D-1628). This file audits **this SHA only** (ninth of nine `js/` commits since review **581**). Archive **Addressed:** D-1629 (this review commit fills `54c89bcc` if the DONE row is still missing the short hash).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 06:12:10 +0200
- D-id: **D-1629**
- Stats: `js/makemon.js` +52, `js/dog.js` +16, `js/bones.js` +6/−1, `js/save.js` +5. Band **150–350** (js/ insertions **79**).
- Claims to close: Open `free_edog` after D-1610. Not `restore_luadata`. Not read.c light-scroll `initedog`. `reviews/loop-2026-08-15/` has no unpaid free_edog Must-fix.
- JS / map: `dog.js` `free_edog`; `makemon.js` `restmon_edog` / `savemon_edog`; callers `save.js` / `bones.js` restmon. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **571** named `free_edog` / restore `newedog`.

## Intent vs deliverable

Git subject promises: pets drop the edog extension then `mtame=0`, and restore `restmon` calls `newedog` with `apport<=0→1`, instead of leaving the JS `edog` mirror unset after D-1610.

Pinned C `dog.c` `free_edog` `:34–42` (`node scripts/csym.mjs free_edog`). `--callers free_edog`: **only** `extern.h:792` (plus `util/sfctool.c` twin). No `src/` caller. Pair `restore.c` `restmon` `:349–361` (`--callers newedog` includes `:352`). `save.c` `savemon` `:860–869`. `dog.c` `newedog` `:22–32`. `restore.c` `relative_time_to_moves` `:1327–1333` / `moves_to_relative_time` `:1319–1325`. `mextra.h:172–184` `struct edog`. `dealloc_mextra` (`mon.c`) frees edog without `mtame=0` — named. initedog ogoal is D-1610.

```34:42:nethack-c/upstream/src/dog.c
void
free_edog(struct monst *mtmp)
{
    if (mtmp->mextra && EDOG(mtmp)) {
        free((genericptr_t) EDOG(mtmp));
        EDOG(mtmp) = (struct edog *) 0;
    }
    mtmp->mtame = 0;
}
```

```349:361:nethack-c/upstream/src/restore.c
        /* edog - pet */
        Sfi_int(nhfp, &buflen, "monst-edog_length");
        if (buflen > 0) {
            newedog(mtmp);
            Sfi_edog(nhfp, EDOG(mtmp), "monst-edog");
            relative_time_to_moves(&EDOG(mtmp)->droptime);
            relative_time_to_moves(&EDOG(mtmp)->hungrytime);
            if (EDOG(mtmp)->apport <= 0) {
               EDOG(mtmp)->apport = 1;
           }
        }
```

Old JS: `newedog` / `initedog` live; JSON `serMon` cloned `mextra` but skipped top-level `mtmp.edog` (object key, not `mextra`); restore `{...rawM}` left `mtmp.edog` unset so `dogmove` saw a tame monster with no EDOG; no apport clamp.

The diff **does** export `free_edog` (mextra + JS mirror + `mtame=0`), `restmon_edog` (`newedog` + assign + apport≤0→1 + `mtmp.edog=edog`), `savemon_edog` JSON field blob, wire save/bones restmon. It **does not** port `relative_time_*`, `dealloc_mextra`, read.c light-scroll `initedog`, or any `src/` `free_edog` caller (C has none). Named. **No `js/` site calls `free_edog` yet** — Match C’s empty caller set, not a wired untame path.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `free_edog` | C `:34–42`, **LIVE this SHA** | export only; 0 JS callers ≡ 0 C src callers |
| `newedog` | C `:22–32`, **LIVE** | makemon.js; restmon calls it |
| `restmon` edog arm | C `:349–361`, **LIVE this SHA** | helper `restmon_edog` |
| `savemon` edog arm | C `:860–869`, **LIVE this SHA** | JSON analogue; often no-op if `mextra` already cloned |
| `EDOG` | C macro, **LIVE** | `const.js:2954` |
| `relative_time_to_moves` / `moves_to_relative_time` | C `:1327` / `:1319`, **OMIT named** | JSON absolute; `game.moves` restored first |
| `dealloc_mextra` | C mon.c, **OMIT named** | |
| read.c light-scroll `initedog` | **OMIT named** | |

`node scripts/csym.mjs free_edog` → `dog.c:34-42`. `newedog` → `dog.c:22-32`. `--callers newedog`: `dog.c:1255` (`tamedog`), `makemon.c:1246`, `mon.c:2634`, `restore.c:352`. `restmon` → `restore.c:306-373`. `savemon` → `save.c:825-881`. `relative_time_to_moves` → `restore.c:1327-1333`.

RNG: none in this SHA. Apport clamp is `<= 0 → 1` so later `rn2(apport)` cannot be `rn2(0)` (C comment). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
free_edog        js/dog.js:91   sync
newedog          js/makemon.js:253   sync
restmon_edog     js/makemon.js:280   sync
savemon_edog     js/makemon.js:301   sync
EDOG             js/const.js:2954   sync
initedog         js/dog.js:101   sync
dealloc_mextra   NOT FOUND in js/**
relative_time_to_moves NOT FOUND in js/**
moves_to_relative_time NOT FOUND in js/**
restmon          NOT FOUND in js/**
savemon          NOT FOUND in js/**
```

`--can save.js makemon.js restmon_edog` / `bones.js`: ALREADY. `--can dog.js makemon.js newedog`: ALREADY. Do **not** stamp “cycle-forced.” Do not add `free_edog` in `makemon.js`. Do not add `newedog` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`free_edog`. C: if mextra && EDOG, `free` + `EDOG=0`, then **always** `mtame=0`. JS: `mextra.edog=null`, `mtmp.edog=null`, `mtame=0`. Extra mirror clear is the JS EDOG split (dogmove reads `mtmp.edog`). **Match `:34–42`.** Not a stub. Unused export is not a C-wrong; wiring a fake caller would be.

`restmon_edog`. C `buflen>0` → `newedog` + `Sfi_edog` + relative droptime/hungrytime + apport clamp. JS: skip if no src; `newedog`; `Object.assign` if `src !== edog`; copy `ogoal`; apport≤0→1; `mtmp.edog = edog`. **Match newedog + clamp + fill.** `serMon` skips top-level object `edog` (`save.js:78–92` only special-cases `mextra`), so restore must set the mirror — that is the D-1610 leftover this SHA names. `relative_time_to_moves` **named**: JSON stores absolute; `try_restore_save` restores `game.moves` before `fmon`. Same-save round-trip: C relative then `moves+rel` equals the absolute JS kept.

`savemon_edog`. C `:860–869` length then `moves_to_relative_time` on droptime/hungrytime, `Sfo_edog`, then convert back in memory. JS copies `mextra.h:172–184` fields (`parentmid`, `droptime`, `dropdist`, `apport`, `whistletime`, `hungrytime`, `ogoal`, `abuse`, `revivals`, `mhpmax_penalty`, `killed_by_u`). **Match the field set.** Early `if (out.mextra.edog) return` means a successful `mextra` JSON clone already did the work; the helper fills the hole if that clone failed. `try/catch` omit is not a C panic analogue — named as JSON VFS, not a live-arm stub of `Sfo_edog` when the blob exists. Do not convert to relative in JSON without shipping both C helpers.

Callee closure (restmon edog arm). LIVE: `newedog`, `EDOG`. OMIT named: `Sfi_edog` binary, `relative_time_to_moves`. STUB: none when `src` is present. The arm may ship. `free_edog` is a separate 9-line function, not a stub inside restmon.

`newedog` parentmid. C `:29` `parentmid = mtmp->m_id`. JS `newedog` already set that (pre-existing). Assign from save overwrites. **Match.**

C `savemon` edog slice this SHA analogues:

```860:869:nethack-c/upstream/src/save.c
        buflen = EDOG(mtmp) ? (int) sizeof (struct edog) : 0;
        Sfo_int(nhfp, &buflen, "monst-edog_length");
        if (buflen > 0) {
            moves_to_relative_time(&EDOG(mtmp)->droptime);
            moves_to_relative_time(&EDOG(mtmp)->hungrytime);
            Sfo_edog(nhfp, EDOG(mtmp), "monst-edog");
            relative_time_to_moves(&EDOG(mtmp)->droptime);
            relative_time_to_moves(&EDOG(mtmp)->hungrytime);
        }
```

JS does not mutate in-memory times around the write. **Named.** `serMon` already JSON-clones `mextra` (`save.js:79–91`); `savemon_edog` is the hole-fill if that clone dropped `edog`. Restore `{...rawM}` still needs `restmon_edog` for the top-level mirror.

## Hallucinations / overclaim

Subject `free_edog` drop then `mtame=0` **and** restmon `newedog` + apport clamp vs unset JS mirror: **true for the bodies.** Do **not** stamp “Match C a `src/` caller of `free_edog`” (none exist; JS also has none). Do **not** stamp “Match C `relative_time_to_moves` / `moves_to_relative_time`.” Do **not** stamp “Match C `dealloc_mextra`.” Do **not** stamp “Match C read.c light-scroll `initedog`.” Do **not** stamp “Match C `initedog` ogoal” (D-1610). Do **not** stamp “Match C `savemon` relative-time file encoding.” seed0013 restore PASSes the restore envelope; it does not prove `apport<=0` or `free_edog`. **Public-unhit** for those.

## Density

+79 for a 9-line C function plus the restmon/savemon edog arms that make the JSON pet list match C `EDOG` after restore (the actual D-1610 leftover). Did not glue luadata or light-scroll `initedog`. Not a one-`if` peel. §2b cluster is `free_edog` + the restore pair the map named with it.

## Branch-by-branch confirm

1. `free_edog` drop EDOG then `mtame=0` (+ JS mirror). **Match this SHA.** 0 callers. **Match C.**
2. restmon `newedog` + apport≤0→1 + `mtmp.edog` mirror. **Match.**
3. savemon field blob. **Match fields; relative time named.**
4. `relative_time_*` / `dealloc_mextra` / read.c. **Named.**

## Callers / RNG ledger

Wired this SHA: `save.js` / `bones.js` restmon → `restmon_edog`; both `serMon` → `savemon_edog`. `free_edog`: export only. Conf: none. Apport clamp prevents `rn2(0)` later (C `:356`). No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No `fs`. Do not add `free_edog` in `makemon.js`. Do not add `newedog` #2. Do not invent a `src/` caller to “use” the export. `--can` ALREADY.

## Verification

D-log private canary **13**/13; focused seed0013 restore PASS; green+strict seed8000/0900; cohort **7**/7 + strict. seed0013-friday13-restore exercises `try_restore_save` + `restmon_edog` on whatever edog the fixture serialized. **Public-unhit** for `free_edog` (no caller) and for apport≤0. Fortress PASS does not prove the clamp or the unused export.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `relative_time_to_moves` / `moves_to_relative_time`; `dealloc_mextra`; read.c light-scroll `initedog`; bones `mtame=0` still leaving edog (C does too). Do not re-port `initedog` ogoal (D-1610). Do not stub `restore_luadata`. Do not skip the `mtmp.edog` mirror.

Verdict: **ACCEPT-WITH-DEBT**
