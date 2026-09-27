# Review 1926 — 06237de26 — mungspaces / strncmpi (D-2967)

- SHA: `06237de26` (coverage; `hacklib.c` `mungspaces`, plus `strncmpi`)
- Files: `js/hacklib.js` adds both bodies and points `findword`'s ignore-case arm at `strncmpi`. Thirteen callers drop a local whitespace or boolean clone and import the export (`getline.js` re-exports `mungspaces`).
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
mungspaces       js/hacklib.js:519   sync
strncmpi         js/hacklib.js:419   sync
lowc_signed      NOT EXPORTED — local js/hacklib.js:399
mungspaces_objnam NOT FOUND
strcmpi          NOT EXPORTED — local js/glyphs.js:104
```

`lowc_signed` is not a second `lowc`. It is `lowc` (`hacklib.c:82–86`) then a signed byte for gcc `char`. `mungspaces_objnam` is gone. `imports.mjs --can js/getline.js js/hacklib.js mungspaces` prints `ALREADY`.

## Intent vs deliverable

Subject: the export and its clones turned every Unicode whitespace run into a space, so a newline became a space and CR vanished; `strncmpi` was a boolean. It promises one `mungspaces` (tab becomes space, newline stops, CR stays, one trailing space drops) and one `strncmpi` (0 / 1 / -1, `!*s2` is 0 or 1). Clones import the exports. Boolean sites use `=== 0` or `!== 0`.

The diff does that. Deleted locals: `mungspaces` in `engrave.js`, `music.js`, `polyself.js`, `read.js`, `readobjnam.js`, `vault.js`, `write.js`, `getline.js`; `mungspaces_objnam`; boolean `strncmpi` in `insight.js`, `vault.js`, `write.js`; `strcmpi` in `vault.js` and `write.js`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `mungspaces` | live sync `hacklib.js:519` | `hacklib.c:141–160` |
| `strncmpi` | live sync `hacklib.js:419` | `hacklib.c:716–734` |
| `lowc_signed` | signed `lowc` | `hacklib.c:82–86`, then gcc `char` |
| `findword` ignore-case | live, `=== 0` | `hacklib.c:614` |
| rewired callers | assign the return | C writes the buffer in place |

## C ↔ JS fidelity

`mungspaces`: `was_space` starts true, so a leading run of spaces and tabs is dropped. Tab becomes space (`:151–152`). Newline breaks (`:149–150`). Any other byte, including CR, is copied. A trailing space is dropped only when `was_space && p2 > bp` (`:157–158`). An embedded NUL stops. JS returns a new string; every rewired site assigns it (`do_name.js` `:124` and `:666`, `engrave.js:1397`, `music.js:1000`, `objnam.js` corpse name, `polyself.js:2071`, `read.js`, `vault.js:777`, `wizcmds.js` level change, `write.js`, `zap.js:7230`, `getline.js:1453` for `getline.c:314`).

`strncmpi`: `while (n--)` (`:723`). `!*s2` returns `(*s1 != 0)` as 0 or 1 before the `!*s1` arm (`:724–727`). Otherwise `lowc` of each byte, then 1 or -1 (`:728–731`), else 0. `n == -1` never hits 0, which is the `strcmpi` macro. Bytes 128–255 compare negative. `n | 0` is C `int`.

Boolean clones were true on a match. The new tests keep that sense: `insight.js` `=== 0` selects the article prefix; `write.js` `=== 0` strips and matches; `vault.js:509` `!== 0` is the lawful liar penalty; `strncmpi(..., -1) === 0` replaces `!strcmpi` for Croesus and for `zap.c:6348` `"help"`. `getlin` returns `'\x1b'` (`getline.js:277`); `mungspaces` leaves that byte, so cancel still breaks. An empty wish is not cancel, matching `zap.c:6346–6348`.

`findword`'s case-sensitive arm compares `s.slice(p, p + wordlen)` to `word.slice(0, wordlen)`. That is `!strncmp` for an equality test. The terminator now includes `'\0'` (`hacklib.c:616`). The sole caller (`roles.js` `plnamesuffix`, ignore-case false) only uses the truthiness.

## Hallucinations / overclaim

The subject does not say every C caller was rewired. The named list matches the tree: many `strncmpi` sites still use `optStrncasecmp`, `tribute_ncmpi`, `strcmpi_fold`, `glyphs.js` `strcmpi`, or an inline prefix test. `mungspaces` still has no JS at `insight.c:1196`, `options.c:1835`, `options.c:10036`, `symbols.c:450`, and `windows.c:1107`. `pager.c:2467` is inside `#if 0`. `read.js:2728` still mungspaces before the gender blank; C's parse call is `read.c:3195` only, after the blank (`read.js:2753`).

## Density

Both function bodies are complete. The clones this commit deleted now call the export. The remaining callers are named with C lines. They are not a silent stub of `mungspaces` or `strncmpi`.

## Verification

```
verify mungspaces: baseline 06237de26~1 (scoreboard at c12d7df2f, 2026-09-27T12:25:23.179Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mungspaces: no corpus session is blocked on it at 06237de26~1 — a vacuous verify is NOT a corpus PASS. ...
smoke mungspaces: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
verify strncmpi: baseline 06237de26~1 (scoreboard at c12d7df2f, 2026-09-27T12:25:23.179Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify strncmpi: no corpus session is blocked on it at 06237de26~1 — a vacuous verify is NOT a corpus PASS. ...
smoke strncmpi: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2967 records green 2/2, strict ×2, and cohort 7/7. Neither re-run has a `REGRESSED` session. That commit's verify bullet does not claim a full `sessions` run.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
