You are a **score-only** cadence iteration of the unattended NetHack C→JS
port loop. Do **not** port new C. Do **not** edit `js/` except if you
must fix a typo in a comment you are not here to write — default is
**zero `js/` edits**.

## Mandatory (4 calls)

```bash
node frozen/ps_test_runner.mjs sessions
node scripts/hidden-proxy.mjs record --jobs 8   # missing corpus sessions; exit 3 = no C recorder
node scripts/hidden-proxy.mjs score --jobs 8    # FULL: no --ids / --owner
node scripts/leaderboard.mjs
```

The scoreboard update is **entire**: every recorded corpus session is
re-run and `hidden-corpus/scoreboard.json` is committed with `full: true`.
No `hidden-proxy verify` after it (a verify clears `full`). The supervisor
redoes the rescore and logs audit debt when the committed board is not a
full rescore from this iteration. Report `entries` / `unrecorded` in the
Corpus fortress line; a nonzero `unrecorded` with exit 3 is recorded, not
worked around.

Parse `__RESULTS_JSON__`. Rewrite `docs/CURRENT.md` Score: pass count,
screen/RNG aggregates, speed label, PASS list, notable non-PASS; the
**Held-out** row from `leaderboard.mjs` (passing, points, RNG %, screens
%, date — this is the objective, Constitution §10.18); the **Corpus**
line from the `score` summary (PASS count excluding env-only rows, RNG %,
screens %, and the worst families from `hidden-proxy status`). Compare the new
scoreboard with the committed one (`git diff --stat hidden-corpus/
scoreboard.json`; `hidden-proxy show <id>` per changed row): every
session that was PASS and is not anymore is a **Must-fix** row naming
the owner, the session and the port SHAs since the last audit (`git log
--oneline -- js/`). Update `docs/NOTES.md` landmarks/score echo. Prepend
a short crumb to `docs/AGENT-LOOP-JOURNAL.md`. Then `node
scripts/check-hot-docs.mjs --fix` (do not count lines/boxes; do not copy
crumbs by hand).

**Corpus growth is this iteration's job when the signal saturates**
(Constitution §10.18 / §10.13): if the worst `scen-*` family in
`hidden-proxy status` passes ≥ 85 %, or the cliffs block after
`check-hot-docs --fix` holds fewer than 6 owners, author a fresh cohort in
the held-out genre — `node scripts/scenario-gen.mjs --n 120 --seed
<iteration × 100>` (families the held-out set walks and the corpus
under-samples: long `^V` tours with several named levels, shops/temples,
Sokoban, endgame planes, save/restore prefixes) — then `record`, `score`
(full), and commit recipes + board. Never a `js/` edit for it. Any
`js-throw` owner in the new scoreboard is still a **Must-fix** row (§10.14).

If any public session failed: journal the failure, **do not** invent a
peel, **do not** “align” tests. Do not pop a new queue item. You **may**
archive leftover `- [x]` (`node scripts/archive-loop-queue-done.mjs`)
and fill missing Addressed hashes. `check-hot-docs --fix` regenerates
both generated Open blocks (**cliffs** from the committed scoreboard —
run it **after** the full rescore so the block reflects the new board —
and **coverage** from the ledger); never paste rows, never a
hand-written map/debt copy, never a seed-shaped row. Append
`node scripts/ledger.mjs summary --snapshot` (coverage trend). The supervisor logs a full-suite FAIL and
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
