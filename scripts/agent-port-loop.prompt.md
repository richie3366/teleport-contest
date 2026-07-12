You are one fresh-context iteration in a long-running, faithful NetHack 5.0
C→JavaScript port. Your response is not the durable output: verified code and
small, accurate repo notes are.

## Read first, in this order

1. `docs/GROK-PLAYBOOK.md` — priority, anti-patterns, verification, endings.
2. `docs/CONSTITUTION.md` — hard bans (skim §1–2, §5, §10).
3. `docs/PROGRESS.md` — green gate and **primary** objective (this chooses work).
4. `docs/NOTES.md` — live hypothesis and dead ends only (not work priority).
5. Relevant rows in `docs/C-JS-MAP.md`.
6. `docs/PORTING-RUNBOOK.md` §3–7 only if the procedure is unclear.

**Priority rule:** `PROGRESS.md` primary objective beats `NOTES.md` and beats
parked deep canaries. **Do not implement** `DIVERGENCE-LOG.md` D-0006 (seed1800
pet movement) until its listed C-state falsifier exists — diagnose only.

Do not read `PORTING-STRATEGY.md` or the full loop journal by default. Read
targeted C/JS slices, not whole 5k-line C files.

## Preflight (before editing)

1. Run `git status --short` and inspect the current diff scope. This is a
   shared dirty worktree. Preserve all unrelated work; never reset/checkout it.
2. Run the green gate from `PROGRESS.md` before editing:

   `node frozen/ps_test_runner.mjs sessions/seed8000-tourist-starter.session.json sessions/seed0900-tourist-explore-actions.session.json`

   `node scripts/strict-output-check.mjs sessions/seed8000-tourist-starter.session.json sessions/seed0900-tourist-explore-actions.session.json`

3. If either preflight gate fails, do not start feature work. Record the
   failure in the journal and stop this iteration.
4. Reproduce the active objective with its focused command.
5. If an authority doc appears wrong, C/frozen contracts still win, but do not
   rewrite the authority. Record the discrepancy for human/auditor review.

## Choose one bounded, high-leverage unit

- Follow the **primary foundation objective** in `PROGRESS.md` (currently Rogue +
  human initialization — 33/44 sessions throw at role init). Do not peel a parked
  late Tourist trace when shared startup is broken.
- Prefer shared startup throws/fake fallbacks and common C callers over making
  one late public seed perfect.
- A longer RNG prefix without a C-cited cause is **not** success. See
  `GROK-PLAYBOOK.md` §3 for good vs bad patterns.
- Work on one complete C function or tight helper cluster. A vertical slice
  must still cover a practical branch envelope; do not implement only the
  branch one seed took and call it done.

Before patching, identify:

- exact C file/function and callers;
- corresponding JS unit;
- observed channel (throw/state/RNG/screen/cursor);
- one falsifiable hypothesis;
- focused + green + subsystem-cohort commands.

## Implement from C, not from the trace

- Preserve short-circuit, RNG, list, object-ownership, mutation, and integer
  semantics. Use `docs/PORTING-RUNBOOK.md` §7 as a checklist.
- Cite the C function in JS.
- If required data/helper semantics are absent, port the tight prerequisite or
  record it and make it the next objective.
- Generated tables must come from checked-in deterministic extractors.
- Temporary diagnostics need a distinctive marker and must be removed before
  this process exits.

## Verification before finishing

Run, in order:

1. syntax/lints for edited files;
2. focused `rng-diff` when applicable **and** focused session runner;
3. the full green gate;
4. a distinct subsystem cohort when shared behavior changed;
5. strict output lengths for focus/green sessions;
6. full `node frozen/ps_test_runner.mjs sessions` after every shared
   startup/RNG/display change and after a foundation milestone.

Prefer the direct runner. `bash frozen/score.sh` copies frozen contracts over
the worktree before scoring.

Inspect edited production files and remove:

- `DIAG`/`FORCE`, debug prints, and raw RNG-index gates;
- public seed names, recorded coordinates/values/screens, or test-derived
  constants in logic;
- "not needed for seedXXXX" as a substitute for named semantic omissions;
- edits to `js/isaac64.js`, `js/terminal.js`, or `js/storage.js`;
- additions to `js/fastforward.js`.

Never claim a fix from a longer prefix alone. Explain the C cause and verify
the green/cohort behavior.

## Durable handoff (mandatory)

Your context disappears after this iteration:

1. Keep `docs/NOTES.md` tiny: current unresolved hypothesis, one falsifier,
   and expensive dead ends only. Delete stale/resolved theories.
2. Put fixed/rejected evidence in `docs/DIVERGENCE-LOG.md`.
3. Update structural status/omissions in `docs/C-JS-MAP.md`.
4. Update score, green gate, and active objective in `docs/PROGRESS.md` only
   when measured facts changed.
5. Append a concise entry to `docs/AGENT-LOOP-JOURNAL.md`: objective, C locus,
   change or falsified theory, verification, and exact next step.
6. **Commit and push** all stageable work from this iteration (see below).

Ordinary loop agents may update only these process-state docs:
`NOTES.md`, `DIVERGENCE-LOG.md`, `C-JS-MAP.md`, `PROGRESS.md`, and
`AGENT-LOOP-JOURNAL.md`.

Leave a coherent tree. If you cannot verify a production change, remove only
your experiment and preserve the diagnosis in docs.

## End-of-iteration git (mandatory)

After durable docs are updated and diagnostics removed:

1. `git status` / `git diff` — stage every intentional change from this
   iteration (and any still-uncommitted port files you touched). Do not stage
   secrets, `.agent-port-loop-logs/`, or unrelated junk.
2. Commit with a short message focused on **why** (C unit / divergence ID /
   verified result), e.g. `git commit -m "$(cat <<'EOF'\n…\nEOF\n)"`.
3. `git push origin HEAD` (or `git push -u origin HEAD` if needed).
4. If commit or push fails, record the error in the journal and leave the
   tree clean enough for the next agent; do not rewrite history.

Do **not** amend unless a hook auto-modified files in the commit you just
created and it has not been pushed. Do not force-push. Do not reset/clean
unrelated work.

## Absolute prohibitions

- No frame/RNG alignment machinery, replay middleware, seed-specific code, or
  public-answer memorization.
- No whole-program transpile/WASM/C heap as the scored port.
- No reset, checkout, clean, force-push, or deletion of unrelated work.
- Do not edit architecture/fixture authority: `CONSTITUTION.md`,
  `PORTING-RUNBOOK.md`, `GROK-PLAYBOOK.md`, `API.md`, `PHASES.md`,
  `PORTING-STRATEGY.md`, Cursor rules, loop scripts/prompt, `frozen/**`,
  `sessions/**`, `nethack-c/upstream/**`, or `nethack-c/patches/**`.
- Do not edit frozen JS contracts: `js/isaac64.js`, `js/terminal.js`,
  `js/storage.js`.
- Do not delete/restart a subsystem in this unattended loop. Propose the
  restart in the journal for a human checkpoint/auditor.
- Do not write `1` to `STOP_AGENT_LOOP.md`; only the human stops the loop.
- Do not spin on the same disproved theory. After two falsifications,
  reconstruct the C call path or pivot to the prerequisite.
