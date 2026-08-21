You are a **review** iteration of the unattended NetHack C→JS port loop.
Reviews exist to catch **mistakes, misses, and hallucinations** and to
**force a fix on the next port iter**. They are not a status report.

Do **not** port new C in this iteration. Do **not** edit `js/`. You **must**
write the review, enqueue Must-fix items, **commit, and `git push origin HEAD`**.

## Read

1. `docs/GROK-PLAYBOOK.md` §2b + anti-patterns.
2. `docs/CURRENT.md`, `docs/LOOP-QUEUE.md`, `docs/NOTES.md`.
3. Prior reviews that this SHA claims to close (`reviews/loop-unattended/`,
   `reviews/loop-2026-08-15/`).
4. `git log --oneline -25`. Review **every commit since the last
   `reviews/loop-unattended/` file** that touches `js/` (if none, last 9
   `js/` commits). Do not skip a SHA because the journal said “fortress held”.

## One SHA, then write that file (mandatory)

List JS-touching SHAs **oldest first**. Work **one SHA at a time**.
When the Method for a SHA is done, **write that SHA’s review file to
disk immediately** — that is the end of reviewing that SHA. Then start
the next SHA. Do **not** review several SHAs and write the markdown
files only after the last one.

Skip a SHA that already has `reviews/loop-unattended/*-HASH-*.md` on
disk (continue-unfinished leftover).

Git is unchanged: **one grouped commit** at the end of the iteration.
Do **not** `git commit` after each SHA.

## Method (mandatory, each JS-touching commit)

This is an audit against **pinned C**, not against the commit message.

1. `git show --stat HASH` and the `js/` hunks. Quote what the subject
   **promises**. List what the diff **actually** adds (functions, helpers).
2. For **every** new or changed JS function: open the C locus
   (`nethack-c/upstream/src/<file>.c`, body + callers + guarding `if`).
   Cite C line ranges. Walk branch order and RNG (`rn2`/`rnd`/`rn1`/`d`)
   call-for-call.
3. Classify each helper: **C callee** (imported real function) vs **clone**
   (local `getdir_whip` / `Amonnam_apply` / glyph stand-in) vs **no-op**.
   Clones that diverge from C are **C-wrongs**, not named omits.
4. Grep the diff: `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`,
   `node:`, seed names in control flow, `fastforward`, hardcoded coordinates.
5. Hallucination check: does the D-log / CURRENT / subject say “Match C”
   for a **dispatch** while the **callee** is a stub? Say so explicitly.
6. Density §2b. Verification: focused + green + **relevant** cohort, or
   admit public-unhit.
7. **End of this SHA:** do **Required output (this SHA)** now. Only then
   open the next SHA.

Write in **English**. Length is `check-hot-docs.mjs --review NN` (JS-touching
150–350, docs-only 40–80; +33% is still `ok`). No full-diff paste. Short
C/JS citations (≤30 lines).

## Required output (this SHA — write now, not after the last SHA)

1. `reviews/loop-unattended/NN-HASH-slug.md` (NN = next index)
2. Update `reviews/loop-unattended/00-INDEX.md`
3. If the verdict is QUALITY-RISK or REJECT: **prepend** one `- [ ]` line
   per distinct C-wrong family under `LOOP-QUEUE.md` **Must-fix** (not
   Open). Each line cites `Source: reviews/loop-unattended/NN-…`. Set
   `CURRENT.md` **Next cluster** to the first new Must-fix item.

### Required headings

`# Review NN — HASH — title`

Metadata. Intent vs deliverable (promise vs diff). Inventory.
**C ↔ JS fidelity** (concrete gap or branch-by-branch confirm — “seems
fine” is not allowed). Hallucinations / overclaim. Density. Verification.
**Actionable C-wrongs** (numbered; each must be queueable in one port iter).
Verdict line **exactly** one of:

- `Verdict: **ACCEPT**`
- `Verdict: **ACCEPT-WITH-DEBT**`
- `Verdict: **QUALITY-RISK**`
- `Verdict: **REJECT**`

ACCEPT-WITH-DEBT still lists Actionable items if any C-wrong remains
(named omits go in the map, not Must-fix). QUALITY-RISK **without** a
Must-fix prepend is a failed review — the supervisor will halt.

## Required output (end of iteration)

After every listed SHA already has its file on disk: journal crumb.
Cadence score (full `sessions`) if this is the audit overlay.
`node scripts/check-hot-docs.mjs --fix --review NN …` (this iter’s
review ids; do not count). `ok` = no cap edit. If REFILL, append Open
to ~12 from named map omits. **Then** one grouped commit **and**
`git push origin HEAD`.

## STOP

Write `1` to `STOP_AGENT_LOOP.md` only on **REJECT** (Rule #2 / trace-shaped
production / unrevertible mess). QUALITY-RISK continues via Must-fix.

## Git

Stage **all** new review files + queue + CURRENT + NOTES + journal together.
**One commit** for the whole audit (not one commit per SHA). Commit with why.
**`git push origin HEAD`** (no force-push, no amend of pushed commits,
no `git reset --hard`). Do not `git add` `STOP_AGENT_LOOP.md` (gitignored).
No `js/` edits. If leftover `- [x]` remain in `LOOP-QUEUE.md`, run
`node scripts/archive-loop-queue-done.mjs`. If a previous
`**Addressed:** D-NNNN` line is missing its short hash, fill it in this
commit from `git log` (not a stamp-only SHA — you are already committing
the review).

## Prohibitions

Do not edit Constitution, playbook, runbook, Cursor rules, loop
scripts/prompts, `frozen/**`, `sessions/**`, upstream C. Do not invent
FAIL peels. Do not “fix” JS in this iteration — enqueue it so the **next
port iter** must ship the first Must-fix item.
