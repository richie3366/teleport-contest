# Review 1947 — 05a11d7e9 — save_currentstate handle fields without levelfile (D-2987)

## Metadata

- Full / short hash: `05a11d7e99625dfe05507c2b808e749b192c6122` / `05a11d7e9`
- Parent: `bf782b509` (D-2987 part 1, review 1946 ACCEPT).
- Author, date: debian (Co-authored-by Cursor), 2026-09-27 20:21:51 +0200
- D-id: **D-2987** (second commit; same D-entry, D-log lines updated)
- Stats: `js/do.js` only, +17/−4. `js/` insertions **~17**. Band 80–350.
- Claims to close: same coverage row as 1946 (0 blocks); "measured body
  complete" follow-up.

## Intent vs deliverable

Subject promises: record the insurance checkpoint handle without writing
a level file. Body: handle fields + mode stay in `save_currentstate` so
the measured body is complete.

Diff actually adds: inside the `if (flags.checkpoint)` arm, `ledger_no`
call, a local `nhfp` literal (`structlevel/fd/mode`), `if (!nhfp)
return;`, `nhfp.mode = WRITING`. No new function, no caller change.
Promise matches deliverable.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `save_currentstate` arm | LIVE repaired | same export, `js/do.js:1538` |
| `ledger_no` (do.js:1310) | CLONE reused | pre-existing file-local clone, pure arithmetic, no RNG |
| `WRITING` | LIVE import | `js/const.js:1808`, existing import block |
| `create_levelfile` / `savelev` / `close_nhfile` | OMIT named | unchanged from 1946 |

`node scripts/sym.mjs ledger_no`:

```
ledger_no        js/dungeon.js:1020   sync
             !! ALSO 7 LOCAL CLONE(S) in 7 files — IMPORT the export; do NOT add another
               js/dig.js:297  js/do.js:1310  ...
```

Required paste: this commit reuses the pre-existing `do.js:1310` clone;
it adds no 8th clone. Diff grep `FORCE|DIAG|getRngLog|fastforward`: 0
(empty-literal handle, no seeds/coords). Rule #2 clean (prior check this
iteration; diff adds no imports).

## C ↔ JS fidelity

C locus unchanged: `do.c:1373-1395`, arm `:1381–1388`.

- `:1381` `currentlevel_rewrite()` → handle literal with
  `structlevel: true`, `fd = ledger_no(game.u?.uz)`. C's rewrite returns
  a levelfile whose fd the port cannot mint (NHFILE named); recording
  the ledger number as `fd` mirrors the value `:1387` passes to
  `savelev`. No live consumer reads `nhfp` afterward on either side
  (savelev/close named). Faithful stub-shape, not behavior.
- `:1383–1384` `if (!nhfp) return;` → `if (!nhfp) return;` on an object
  literal: structurally present, dynamically dead. The D-log discloses
  exactly this ("present and is not taken"), and the untaken path equals
  C's non-null path, which is the only reachable C path once VFS creat
  cannot fail. Dead but honest; not a C-wrong.
- `:1385` `bufon` gated on `structlevel` → comment cite, sfstruct
  by-design. Match-by-naming.
- `:1386` `mode = WRITING` → `nhfp.mode = WRITING`. Match.
- `:1387–1388` savelev/close → named (unchanged). Match-by-naming.

`ledger_no` clone body (`js/do.js:1310-1315`): `dnum`/`dlevel` reads +
`ledger_start` add, null-safe, no RNG. Same value C passes. Callers and
counters untouched from review 1946.

## Hallucinations / overclaim

None. "Measured body is complete" is candid measurer-talk, and the added
lines are C-structural (handle fields, WRITING mode), not junk padding.
The dead null-return is disclosed as not taken.

## Density

§2b: 17-line follow-up completing the prior commit's arm. Below ~40
insertions but it is the same D-item's second half, not a standalone
port claim. Acceptable.

## Verification

D-log Verify bullet: same vacuous hidden note (0 blocks) + REACH-OK +
gates, citing the prior commit's 3-file PASS for caller wiring. Re-ran:

```
verify save_currentstate: baseline 05a11d7e9~1 ... 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke save_currentstate: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

Honest vacuous + REACH-OK, no REGRESSED. Claim holds.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
