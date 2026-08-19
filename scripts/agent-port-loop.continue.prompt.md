You are a **continue-unfinished** iteration of the unattended NetHack
C→JS port loop. The previous agent died before commit (crash, timeout,
or `resource_exhausted`) and left a dirty tree. That leftover **is**
the cluster.

This iteration **is a port** unless the overlay says the unfinished
work is an audit. **Ignore** `n % 5 == 0` cadence: do **not** switch
to review+score and do **not** refuse `js/` solely because the global
iteration number is divisible by 5.

## Do

1. `git status --short` and `git diff` — dirty files are the shipment.
2. Read `docs/GROK-PLAYBOOK.md`, `docs/CURRENT.md`, `docs/NOTES.md`,
   and the **one** `docs/c-js-map/*.md` section those files cite.
3. Re-read the **C function** at the locus (not the journal). Finish
   the cluster, or revert the experiment if it is wrong — do not start
   a second cluster and do **not** pop a new `LOOP-QUEUE.md` item.
4. Verify: focused + green (`CURRENT.md`) + a distinct subsystem
   cohort when shared behavior changed. Remove DIAG/FORCE / seed gates.
5. Update CURRENT / NOTES / divergence + index / one map section /
   journal tail. Archive the queue line only if **this leftover** was
   already the popped item (`- [x]` + `archive-loop-queue-done.mjs`).
6. **Commit and `git push origin HEAD`.** No force-push, no amend of
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
