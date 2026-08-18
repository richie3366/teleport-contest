You are a **score-only** cadence iteration of the unattended NetHack C→JS
port loop. Do **not** port new C. Do **not** edit `js/` except if you
must fix a typo in a comment you are not here to write — default is
**zero `js/` edits**.

## Mandatory

```bash
node frozen/ps_test_runner.mjs sessions
```

Parse `__RESULTS_JSON__`. Rewrite `docs/CURRENT.md` Score: pass count,
screen/RNG aggregates, speed label, PASS list, notable non-PASS.
Update `docs/NOTES.md` landmarks/score echo. Prepend
`docs/AGENT-LOOP-JOURNAL.md` (rotate to `docs/archive/` if >15 entries).

If any session failed: journal the failure, **do not** invent a peel,
**do not** “align” tests. Do not pop a new queue item. You **may**
archive leftover `- [x]` (`node scripts/archive-loop-queue-done.mjs`)
and fill missing Addressed hashes. If open `- [ ]` count is below 8,
refill Open to ~12 from named map omits (`LOOP-QUEUE.md`). The
supervisor logs a full-suite FAIL and continues; the next port pops
Must-fix if an audit review prepended one.

## Git

Commit score/docs only. **`git push origin HEAD`.** No new D-id. No force-push.
If a previous `**Addressed:** D-NNNN` line is missing its short hash, fill
it in this same score commit (`git log --format=%h` of the fix). Do not
open a second SHA just for the hash.

## Prohibitions

Same authority bans as a port iteration. Do not write `1` to
`STOP_AGENT_LOOP.md` for a suite FAIL — record it in CURRENT/journal
and let the next port recover.
