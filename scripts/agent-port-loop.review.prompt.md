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
   `node scripts/csym.mjs fn` returns the body with its line range and
   `--callers fn` every call site — one call each, and the range it
   prints is the range you cite. Do **not** grep pinned C to find a
   function. Cite C line ranges. Walk branch order and RNG
   (`rn2`/`rnd`/`rn1`/`d`) call-for-call.
3. Classify each helper: **C callee** (imported real function) vs **clone**
   (local `getdir_whip` / `Amonnam_apply` / glyph stand-in) vs **no-op**.
   Clones that diverge from C are **C-wrongs**, not named omits.
   Combined-arm ports — callee closure: for each `case`/arm list every C
   callee. LIVE = imported, body ports C. CLONE = local re-def matched
   to C here. STUB = early/no-op/TODO. OMIT = named in the map in this
   commit with a C citation. An arm may ship iff every callee is LIVE,
   OMIT, or a verified CLONE. One STUB in a live arm ⇒ that arm should
   have been its own Open row. “Dispatch ported, callee stubbed” is
   QUALITY-RISK even if the subject says “Match C”. Resolve names with
   `node scripts/sym.mjs` (export? async? clone count?). **Required:**
   run `sym.mjs` on every symbol the diff deletes or re-points
   (local clone → import) and paste that output in this SHA’s review.
4. Grep the diff: `FORCE`, `DIAG`, `getRngLog`, seed names in control flow,
   `fastforward`, hardcoded coordinates. For Contest Rule #2 across all of
   scored `js/` (not just the diff) run `node scripts/imports.mjs --rulecheck`.
   Before calling a kept clone “cycle-forced”, check it:
   `node scripts/imports.mjs --can <importer> <target> <Name>` — a cycle alone
   is **not** a blocker (`js/` is already one 82-module SCC); a top-level TDZ
   read is.
5. Hallucination check: does the D-log / CURRENT / subject say “Match C”
   for a **dispatch** while the **callee** is a stub? Say so explicitly.
6. Density §2b. Verification: the D-log Verify bullet must show
   `hidden-proxy verify <fn>` → PROGRESS/PASS, or say explicitly that no
   corpus session is blocked on that function; then green + **relevant**
   cohort. NO MOVEMENT presented as a named omission is QUALITY-RISK.
   **Re-measure the corpus claim yourself:** run
   `node scripts/hidden-proxy.mjs verify <fn> --base HASH~1` (the
   sessions blocked at the parent commit, re-run on this SHA's code) and
   cite its summary line. A bullet that says "PASS hidden" or "no corpus
   session is blocked" while the queue row cited N blocks is a vacuous
   check (a verify earlier in that iteration rewrote the baseline); if
   your re-run shows WORSE or "still <fn> at a later step" for sessions
   the D-log calls PASS, the verification claim is false → QUALITY-RISK
   with a Must-fix row (D-1831: 12 of 21 shipped regressed this way).
   Any read of a seed, step index, recorded coordinate or RNG index that
   exists to make a corpus or public session pass is **REJECT**.
7. **End of this SHA:** do **Required output (this SHA)** now. Only then
   open the next SHA.

Write in **English**. Length is `check-hot-docs.mjs --review NN`
(JS-touching 80–350; FAIL is below ~53, not a padding target.
>250 `js/` insertions raise the **ceiling** to 450 only — do not
write a longer review just because the diff is large. docs-only
40–80; +33% is still `ok`). No full-diff paste. Do **not** pad.
Short C/JS citations (≤30 lines).

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
to ~12 from `node scripts/hidden-proxy.mjs queue --limit 30` (corpus
owners; map omits only at ≥ 90 % corpus PASS). **Then** one grouped commit **and**
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
