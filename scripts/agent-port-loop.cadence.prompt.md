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
**do not** “align” tests. Leave `LOOP-QUEUE.md` unchanged. The
supervisor will halt on the full-suite gate.

## Git

Commit score/docs only. **`git push origin HEAD`.** No new D-id. No force-push.

## Prohibitions

Same authority bans as a port iteration. Do not write `1` to
`STOP_AGENT_LOOP.md` unless the suite is no longer a fortress and you
have nothing honest to record — prefer letting the supervisor halt.
