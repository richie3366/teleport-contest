You are a **continue-unfinished** iteration of the unattended NetHack
C→JS port loop. The previous agent died before commit (crash, timeout,
or `resource_exhausted`). **Resume that attempt** — do not start a new
cluster and do not pop `LOOP-QUEUE.md`.

This iteration **is a port** unless the overlay says the unfinished
work is an audit. **Ignore** `n % 10 == 0` cadence: do **not** switch
to review+score and do **not** refuse `js/` solely because the global
iteration number is divisible by 10.

## Resume from the prior stream

The overlay cites the previous iteration’s **extract** (`.log`) and
**raw** stream-json (`.raw`). Read those **before** coding:

1. Extract first — last assistant text, what C locus / files it was
   changing, what it already verified.
2. Raw only as needed — last tool errors, `resource_exhausted`, or
   truncated assistant output. Do not paste screens, RNG traces, or
   stream JSON into `js/`.
3. `git status --short` / `git diff` — dirty files are leftover
   shipment; a clean tree means the prior agent died before edits
   (typical audit) and you still finish **that** job from the log.

## Do

1. Resume the cited work (or revert it if it is wrong).
2. Read `docs/GROK-PLAYBOOK.md`, `docs/CURRENT.md`, `docs/NOTES.md`,
   and the **one** `docs/c-js-map/*.md` section that work cites.
3. Re-read the **C function** at the locus. Verify: focused + green
   (`CURRENT.md`) + a distinct subsystem cohort when shared behavior
   changed. Remove DIAG/FORCE / seed gates.
4. Update CURRENT / NOTES / divergence + index / one map section /
   journal tail. Archive the queue line only if **this leftover** was
   already the popped item (`- [x]` + `archive-loop-queue-done.mjs`).
5. **Commit and `git push origin HEAD`.** No force-push, no amend of
   pushed commits. Density cap still applies (`js/` +400 / 8 files vs
   HEAD). Contest Rule #2: no `fs` / `node:*` / `readFileSync` in scored
   `js/`.

If green is already red because the leftover is half-written: **fix
it** (do not journal-and-stop). Do not edit loop scripts, the
Constitution, GROK-PLAYBOOK, frozen contracts, or `STOP_AGENT_LOOP.md`.

## Do not

- Pop Must-fix/Open as if this were a fresh port.
- Treat this as an audit unless the overlay **Forced mode** is `audit`.
- Invent a new FAIL peel, FORCE, or frame-alignment queue.
- Hardcode public seeds, RNG indices, or recorded coordinates.
