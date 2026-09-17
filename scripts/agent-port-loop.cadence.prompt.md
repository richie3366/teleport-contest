You are a **score-only** cadence iteration of the unattended NetHack C→JS
port loop. Do **not** port new C. Do **not** edit `js/` except if you
must fix a typo in a comment you are not here to write — default is
**zero `js/` edits**.

## Mandatory (3 calls)

```bash
node frozen/ps_test_runner.mjs sessions
node scripts/hidden-proxy.mjs score --jobs 8
node scripts/leaderboard.mjs
```

Parse `__RESULTS_JSON__`. Rewrite `docs/CURRENT.md` Score: pass count,
screen/RNG aggregates, speed label, PASS list, notable non-PASS; the
**Held-out** row from `leaderboard.mjs` (passing, points, RNG %, screens
%, date — this is the objective of the breadth phase, Constitution
§10.17); the **Corpus fortress** line from the `score` summary (PASS
count excluding env-only rows, RNG %, screens %). Compare the new
scoreboard with the committed one (`git diff --stat hidden-corpus/
scoreboard.json`; `hidden-proxy show <id>` per changed row): every
session that was PASS and is not anymore is a **Must-fix** row naming
the owner, the session and the port SHAs since the last audit (`git log
--oneline -- js/`). Update `docs/NOTES.md` landmarks/score echo. Prepend
a short crumb to `docs/AGENT-LOOP-JOURNAL.md`. Then `node
scripts/check-hot-docs.mjs --fix` (do not count lines/boxes; do not copy
crumbs by hand).

**Corpus growth (`scenario-gen.mjs`) and `hidden-proxy queue` refills
are phase 2** — closed during the breadth phase; do not run them. Any
`js-throw` owner in the new scoreboard is still a **Must-fix** row (§10.14).

If any public session failed: journal the failure, **do not** invent a
peel, **do not** “align” tests. Do not pop a new queue item. You **may**
archive leftover `- [x]` (`node scripts/archive-loop-queue-done.mjs`)
and fill missing Addressed hashes. If `check-hot-docs` says REFILL,
append `node scripts/port-coverage.mjs --rows N` output verbatim under
**Open — coverage** (to ~12); never a hand-written map/debt/TOP30 copy,
never a seed-shaped row. The supervisor logs a full-suite FAIL and
continues; the next port pops Must-fix if an audit review prepended one.

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
