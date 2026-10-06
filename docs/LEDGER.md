# Port ledger

Declared port status of every pinned-C function (`src/*.c` + `win/tty/*.c`),
one row per `(file, fn)`. Source of truth: `docs/ledger/<file>.c.jsonl`
(committed, canonical, one line per function). Query cache:
`.cache/ledger.db` (node:sqlite, derived, safe to delete). **Never Read or
hand-edit the jsonl** — use the commands below.

## Row

`{"fn","c":"a-b","status","js":["js/x.js:sym"],"omit","d":["D-NNNN"],"at","note"}`

- `status`: unknown · absent · scaffold · partial · ported · parity · split ·
  by-design · frozen (definitions: `PORTING-RUNBOOK.md` §4).
- `js`: where the body lives (several for `split`). `omit` ≤ 300 chars
  names C still missing; prefix `blocked:` keeps a partial out of the queue.
- `d`: evidence D-ids, newest first (≤ 6). `at`: `date@base-sha`, or
  `seed@sha` for rows imported from history on 2026-09-27 (audits sample these).

Declared ≠ measured: every command also prints the comment-, `#if 0`- and
brace-stripped code-line ratio (MISSING/THIN/PARTIAL/ok). A low ratio on a
`ported` row is an audit item; an `ok` ratio never promotes `unknown`.

## Iteration use

- Orient: `node scripts/brief.mjs <fn>` prints the ledger rows of the
  function and its callees.
- Handoff: one bullet in the D-entry, applied by `finish-iteration.mjs`
  (required when `js/` changed):
  `- **Ledger:** <fn> ported` · `<fn> partial` (first sentence of Named
  omissions becomes `omit`) · `<fn> split js=a.js:x+b.js:y` · several:
  `a ported; eat.c:b partial`.
- Stale queue row (body already live): `node scripts/ledger.mjs set <fn>
  ported --note "stale: js/x.js:NNN"` (or `split --js a.js:x,b.js:y`), then
  the next row. The row leaves the generated block and never returns.
- Queue: the LOOP-QUEUE **Open — coverage** block is generated
  (`ledger.mjs rows --write`, run by finish and `check-hot-docs --fix`):
  measured gap, status absent/scaffold or unknown without D-history;
  secondary pool = non-blocked, non-`audited` `partial` and previously
  touched `unknown`. win/tty, no-analogue files and save/restore/files are
  skipped unless declared absent/scaffold. Since the cliff phase
  (2026-10-06, Constitution §10.18) this block is the **fallback** picker:
  it pops only when the generated **Open — cliffs** block
  (`hidden-proxy.mjs queue --write`) is empty, or as a same-C-file
  companion of the cliff being worked.

## Commands

```bash
node scripts/ledger.mjs show <fn|file.c:fn>…   # status + measured, one line each
node scripts/ledger.mjs file eat.c             # one C file in C order
node scripts/ledger.mjs rows 20 [--partial]    # what the queue would emit
node scripts/ledger.mjs summary [--by-file] [--top N] [--snapshot]
node scripts/ledger.mjs check                  # reconciliation (finish runs it)
node scripts/ledger.mjs sql "select fn, status from fn where file='eat.c'"
node scripts/ledger.mjs sync                   # rows for new C defs / ranges
```

Audits append `summary --snapshot` to `docs/ledger/SNAPSHOTS.tsv` (coverage
trend; it fired the §10.17 falsifier on 2026-10-06 — measured counts frozen
from 2026-10-04 while `ported` rose only by reclassified partials) and
check 5 random seeded `ported` rows.
