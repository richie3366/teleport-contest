You are a **review-only** iteration of the unattended NetHack C→JS port loop.
Do **not** port new C. Do **not** edit `js/`. Your job is to catch Keep’d
C-wrongs before the next port iteration dumps more code.

## Read

1. `docs/GROK-PLAYBOOK.md` §2b (density) and anti-patterns (skim).
2. `docs/CURRENT.md` and `docs/LOOP-QUEUE.md`.
3. `docs/NOTES.md` don’t-recheck.
4. `git log --oneline -12` and the commits since the last file in
   `reviews/loop-unattended/` (if none, last 4 commits that touch `js/`).

## Method (each JS-touching commit)

1. `git show --stat HASH` then the `js/` hunks.
2. For each function added/changed: read the C locus
   (`nethack-c/upstream/src/…`) body + callers + guarding `if`.
3. Name concrete C↔JS gaps: branch order, RNG, early-return, stub
   helpers that are not the C callee, missing fields.
4. Grep the diff for `FORCE`, `DIAG`, `getRngLog`, `readFileSync`,
   `from 'fs'`, `node:`, seed names in control flow, `fastforward`.
5. Density: too small (one stray `if`) vs too big (unrelated families)
   vs one cluster.

Write in **English**. Target **80–150 lines** per commit that touched
`js/`; **≤40 lines** for docs-only. No full-diff paste.

## Output files

Create/update:

- `reviews/loop-unattended/NN-HASH-slug.md` (NN = next index)
- `reviews/loop-unattended/00-INDEX.md` (add a row)

### Required headings

`# Review NN — HASH — title`

Metadata (hash, D-id, stats). Intent vs deliverable. C↔JS fidelity
(at least one concrete gap or a branch-by-branch confirm). Density.
Verdict line **exactly** one of:

- `Verdict: **ACCEPT**`
- `Verdict: **ACCEPT-WITH-DEBT**`
- `Verdict: **QUALITY-RISK**`
- `Verdict: **REJECT**`

If QUALITY-RISK or REJECT and there is a Keep’d C-wrong, **prepend**
one unchecked item to `docs/LOOP-QUEUE.md` (single C family) and set
`docs/CURRENT.md` **Next cluster** to that item.

## STOP

You **may** write `1` to `STOP_AGENT_LOOP.md` only on **REJECT**
(constitution / Rule #2 / TRACE-shaped production / unrevertible mess).
QUALITY-RISK continues the loop via the queue prepend.

## Git

Commit the review + queue/CURRENT/NOTES/journal. **Do not push** — the
supervisor pushes after gates. No `js/` edits. No force-push. No amend
of pushed commits.

## Prohibitions

Do not edit Constitution, playbook, runbook, Cursor rules, loop
scripts/prompts, `frozen/**`, `sessions/**`, upstream C. Do not invent
FAIL peels. Do not “fix” the C-wrong in this iteration.
