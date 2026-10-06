# Review 2448 — 998892dc7 — restore keep-savefile prompt (unixmain/dorecover) (D-3565)

**Metadata.** SHA `998892dc7` (2026-10-06, D-3565). Type: **cliff**:
writer port (missing restore-sequence call site) for the cliffs head
`cmd.c yn_function` (27 blocked). `js/` insertions: 25 across 2 files
(jsmain.js +20, save.js +5/−2) + 1 test file (91 lines).

## Intent vs deliverable

Promise: restore block gains the `wd_message` discover arm + the
`discover||wizard` keep-savefile `y_n` prompt ('n' deletes via live
`delete_savefile`); `try_restore_save` deletes only in normal mode;
18 PASS + 6 moved; both prompt arms corpus-covered.

Diff actually adds: exactly that, plus 2 new static edges
(jsmain→getline, jsmain→files) and `pline` on the existing display
edge. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | restore sequence (`wd_message` + prompt; unixmain, unscored C) | ported (arm) | [jsmain.js](/home/debian/dev/teleport-contest/js/jsmain.js:248) | unixmain.c:263–274, :654–674 |
| 2 | `dorecover` delete gate (adapted port) | by-design | [save.js](/home/debian/dev/teleport-contest/js/save.js:1213) | restore.c:903–904 |

Helpers: `y_n`, `delete_savefile` — both **C callees**, live imports
(new edges, verified below). No clones.

## C ↔ JS fidelity

**Call-site order:** C dorecover :944 `docrt` → :948 `welcome(FALSE)`
→ :949 `check_special_room` → unixmain :265 `wd_message` → :266–274
prompt — read. JS restore block :238–267: `try_restore_save` →
`docrt` → `bot` → `welcome(false)` → `check_special_room(false)` →
wd_message arm → prompt → `moveloop_preamble(true)` — same order ✓
(`bot` is a pre-existing JS display sync between docrt and welcome).

**wd_message:** C :654–674 read — the live arm is `else if (discover)
You("are in non-scoring explore/discovery mode.")`; the two
error-flag arms are named in the D-log (JS `set_playmode` never raises
them). JS mirrors the live newgame-tail precedent byte-for-byte
(allmain.js:1001–1004: same `explore||discover` gate, same string) ✓ —
any gate-mapping question predates this SHA and is shared, not split.

**Prompt:** C :266–268 `if (discover || wizard)
y_n("Do you want to keep the save file?") == 'n'` → `delete_savefile`
:269, else chmod+`nh_compress` :271–272 — read. JS :259–264 matches the
condition, the exact string, and the 'n' arm with live
`delete_savefile` (files.js:1278: VFS unlink of `fqname(SAVEF)` +
convertedfile — read) ✓. Else-arm chmod (no VFS permission bits) and
`nh_compress` (live Rule-#2 sink, files.js:1293 — a call would be
voided) are named, and keep-by-not-deleting is behaviorally exact ✓.
`y_n` (getline.js:1941) is `yn_function(query, ynchars, 'n', true)` =
hack.h:1329 verbatim ✓; the call site awaits its promise ✓.

**Delete gate:** C :903–904 `if (!wizard && !discover)
delete_savefile()` after flag restore — read. JS save.js:954–955
restores both flags before the :1213 `!game.wizard && !game.discover`
gate ✓; `try_restore_save` sole caller is jsmain:238 (grep) ✓; `g`
aliases the restored `game` object (gstate.js:6–9) ✓.

**New edges:** only scored importer of jsmain is the browser leaf
js/nethack.js (grep) — no path back, so no static cycle; both targets
are hoisted `export function`. The D-log is honest that `imports.mjs`
timed out and grep was used instead; full-44 green + 18 restore-PASS
at runtime close the TDZ question empirically.

## Hallucinations / overclaim

None. The "js-throw" note for 94270 re-verified by me: committed row is
`error:null kind=screen owner=null` — a verify rendering of
owner-null, not a throw. Prompt-answer survey (17×'y' + 7×'n') means
both arms executed in-corpus.

## Density

Cliff §10.18: yn_function-head writer (yn_function itself whole per
D-1805/D-2165; the call site lives in unscored unixmain C — correctly
identified as a writer, not a re-port). One cliff, one call site, own
`Ledger:` entry ✓. The 3 unchanged are the distinct single-segment
«Die?» arm, proven out-of-arm by their C recordings — scope with a
forward row named. Per-function verdicts ACCEPT/ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2445).
- `node --test scripts/restore-keep-savefile.test.mjs`: 2/2 pass.
- Re-measure (mine, `--base 998892dc7~1 --reach-all`, current code):
  `dorecover`: 0 blocked (writer shape), smoke 24/24 REACH-OK;
  `yn_function`: **19 PASS, 5 moved past, 3 unchanged (the exact 3
  «Die?» sessions), 0 worse → PROGRESS** (19th PASS is 94335 via later
  D-3566; all other owners+steps exact vs the D-log); smoke 24/24
  REACH-OK. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
