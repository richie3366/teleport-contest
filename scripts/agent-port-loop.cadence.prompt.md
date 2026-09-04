You are a **score-only** cadence iteration of the unattended NetHack C→JS
port loop. Do **not** port new C. Do **not** edit `js/` except if you
must fix a typo in a comment you are not here to write — default is
**zero `js/` edits**.

## Mandatory (2 calls)

```bash
node frozen/ps_test_runner.mjs sessions
node scripts/hidden-proxy.mjs score --jobs 8
```

Parse `__RESULTS_JSON__`. Rewrite `docs/CURRENT.md` Score: pass count,
screen/RNG aggregates, speed label, PASS list, notable non-PASS. Under it,
rewrite the **Hidden-score proxy** line from the `score` summary: PASS
count excluding env-only rows, RNG %, screens %, and the top three
blocking owners with their session counts (the proxy is the number the
loop is trying to move; the public 44 are the regression fortress).
Update `docs/NOTES.md` landmarks/score echo. Prepend a short crumb to
`docs/AGENT-LOOP-JOURNAL.md`. Then `node scripts/check-hot-docs.mjs --fix`
(do not count lines/boxes; do not copy crumbs by hand).

If any public session failed: journal the failure, **do not** invent a
peel, **do not** “align” tests. Do not pop a new queue item. You **may**
archive leftover `- [x]` (`node scripts/archive-loop-queue-done.mjs`)
and fill missing Addressed hashes. If `check-hot-docs` says REFILL,
append Open rows in this order — `node scripts/hidden-proxy.mjs queue`
(C-function owners with corpus sessions attached), then
`docs/PORT-GAP-HELDOUT.md` Tier A/B, then `docs/PORT-GAP-TOP30.md` —
one C family per line, to ~12, never a seed-shaped row. The supervisor
logs a full-suite FAIL and continues; the next port pops Must-fix if an
audit review prepended one.

## Git

Commit score/docs only (`hidden-corpus/scoreboard.json` included).
**`git push origin HEAD`.** No new D-id. No force-push.
If a previous `**Addressed:** D-NNNN` line is missing its short hash, fill
it in this same score commit (`git log --format=%h` of the fix). Do not
open a second SHA just for the hash.

## Prohibitions

Same authority bans as a port iteration. Do not write `1` to
`STOP_AGENT_LOOP.md` for a suite FAIL — record it in CURRENT/journal
and let the next port recover.
