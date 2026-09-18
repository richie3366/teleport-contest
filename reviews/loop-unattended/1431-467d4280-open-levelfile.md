# Review 1431 — 467d4280 — open_levelfile whole-body port (D-2472)

Metadata: SHA `467d4280`, `js/files.js` (+266/−1) + `js/do.js` (+8/−1)
+ `js/save.js` (+7). D-log: D-2472.

## Intent vs deliverable

Promise: whole `open_levelfile` (`files.c:673–716`) + helpers
`fqname`/`init_nhfile`/`new_nhfile`/`free_nhfile`/
`viable_nhfile`/`set_levelfile_name`, with the do.c + save.c read
sites wired. Diff ships all of that. No second subsystem.

## Inventory

- Added: `export function fqname/init_nhfile/new_nhfile/
  free_nhfile/set_levelfile_name/open_levelfile` (all C globals —
  exported correctly), module-local `viable_nhfile` (C staticfn
  `:547–579` — local scope correct).
- Wired: `do.js:1727` (= C `do.c:1704`), `save.js:155` (= C
  `save.c:201`) — both discard the handle (stash is read directly;
  the calls keep C order + the `game.lock` store-back, documented
  in-code; harmless, not behavior).
- Unwired C callers, all accounted: `files.c:2889/2982/3035` sit
  in `recover_savefile` (lseek/copy_bytes binary path — no scored
  counterpart, Rule #2); `save.c:376` is `savestateinlock` (write
  side, owned by the future `create_levelfile` row). Map
  `data.md:100–107` names all three — not misses.
- No deleted/re-pointed symbols for `sym.mjs` (all names new).

## C ↔ JS fidelity

- `fqname` (`:353–389`): guard order, prefix-prepend into
  per-buffnum slot, buffnum-clamp + too-long `impossible()` arms —
  exact. PREFIXES_IN_USE is build-conditional (`hack.h:1059`,
  needs NOCWD_ASSUMPTIONS/VAR_PLAYGROUND — absent from the contest
  build, so C always returns basenam); JS with unset prefixes
  takes the same early return, so the prefix arms are
  unreachable-but-harmless under every reachable state.
- `init_nhfile` (`:460–490`): unclosed-file `impossible()` arms +
  fd/fpdef drop + COUNTING/structlevel defaults — exact down to
  C's doubled `if (fpdef)` wart. `bendian` via runtime
  `NH_IS_BIGENDIAN` (= C `IS_BIGENDIAN()`).
- `new/free_nhfile`: zeroed literal + init / re-init + GC — exact.
- `viable_nhfile`: triple no-open condition + fieldlevel cleanup
  order + free→null — exact.
- `set_levelfile_name` (`:605–618`): last-dot restrip + `.N`,
  returned for store-back (C mutates `gl.lock`; VMS `;1` named) —
  exact.
- `open_levelfile`: errbuf clear (`{s}`-or-null convention),
  `game.lock` store-back, `fqname(LEVELPREFIX, 0)` in order (result
  `void`ed — positional VFS probe needs no path), handle fields in
  C order (`READING`, structlevel TRUE, `NHF_LEVELFILE = 1` =
  `hack.h:954`, `fnidx = historical = 1` = `hack.h:976`),
  open→stash probe (`LFILE_EXISTS ⟺ openable`, fd = level token),
  failure message with `game.lock` (= C `gl.lock` post-rename),
  level, `ENOENT = 2`, then `viable_nhfile` (miss → freed → null,
  = C NULL) — exact. Platform arms (macopen/setmode/translate)
  named.
- RNG: none in C, none added. Rule #2: no fs imports (stash only).

## Hallucinations / overclaim

None. "Stash probe ⟺ openable" is documented with the invariant
(flag set on create/savelev-leave, cleared only by
`delete_levelfile`); the two ceremonial call sites say so
in-code instead of pretending to plumb fds.

## Density

One 45-line C function + five small helpers + two one-line wires
across 3 files, 279 ins: right-sized.

## Verification

- `hidden-proxy verify open_levelfile --base 467d4280~1
  --reach-all` (re-run): 0 blocked both sides — vacuous, as the
  D-log states ("C draws no RNG"). Smoke 24/24 → REACH-OK, and the
  D-log's `--reach-all` re-run claim matches. Plus the cited
  `/tmp` probe (20/20 — scratch, not re-run here).
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
