You are one fresh-context iteration in a long-running, faithful NetHack 5.0
C→JavaScript port. Your response is not the durable output: verified code and
small, accurate repo notes are.

## Read first (≤15k tokens of docs)

1. `docs/GROK-PLAYBOOK.md` — priority, **Contest Rule #2**, anti-patterns, endings.
2. Hard bans via Cursor rules / `CONSTITUTION.md` §1–2 (esp. **§1.5 Rule #2**), §5, §10 (skim).
3. **`docs/CURRENT.md`** — score, green gate, **primary** objective (chooses work).
4. `docs/NOTES.md` — live hypothesis / don’t-recheck only.
5. **One** subsystem file via `docs/C-JS-MAP.md` index (`docs/c-js-map/*.md`).
6. `docs/PORTING-RUNBOOK.md` §3–7 only if procedure is unclear.

**Priority:** `CURRENT.md` primary beats NOTES and parked canaries.
**Do not implement** D-0006 until its C-state falsifier exists.

**HARD — Contest Rule #2:** scored `js/` must run as plain ESM in **Node and
Chrome**. No filesystem / Node builtins (`fs`/`path`/`url`/`node:*`) /
`readFileSync`. Persist only via `storage.js` VFS; embed dat texts in
`js/generated/`. Offline PASS with a Chrome-unloadable module is a failed handoff.

**Do not read:** `docs/archive/**`, full `DIVERGENCE-LOG.md`,
`PORTING-STRATEGY.md`, full journal history. Use `DIVERGENCE-INDEX.md` + one
`## D-NNNN` entry. Re-read the relevant **C function** before patching.

## Preflight

1. `git status --short` — shared dirty tree; never reset/checkout unrelated work.
2. Green gate from `CURRENT.md` (seed8000 + seed0900 + strict-output-check).
3. If green fails: journal and stop — no feature work.
4. Reproduce the primary objective with its focused command.

## One bounded unit

- Follow `CURRENT.md` primary. Prefer shared blockers over late single-seed peels.
- Longer RNG prefix without a C-cited cause is **not** success.
- One C function / tight helper cluster; name deferred branches in the map section.

Before patching: C locus + callers, JS locus, channel, falsifiable hypothesis,
focused + green + cohort commands.

## Implement from C

Preserve short-circuit, RNG, list, ownership, mutation, and integer semantics
(runbook §7). Cite C in JS. Generated tables only via checked-in extractors.
Mark temporary DIAG distinctly; remove before exit.

## Verify before finishing

1. syntax/lints; 2. focused runner (+ rng-diff if applicable); 3. green gate;
4. subsystem cohort if shared; 5. strict lengths; 6. full `sessions` after
shared startup/RNG/display or foundation milestones.

**Public score every 5 iterations:** if this is a global loop iteration whose
number is divisible by 5 (see `.agent-port-loop-logs/iteration-count`, or the
loop injects a reminder), run `node frozen/ps_test_runner.mjs sessions` and
rewrite `CURRENT.md` Score (pass count, screen/RNG aggregates, speed, PASS
list, notable non-PASS). Do not estimate suite totals from one focused seed.

Remove DIAG/FORCE, seed names, recorded coords, raw RNG-index gates, edits to
frozen `isaac64`/`terminal`/`storage`, and any `fastforward.js` additions.

## Durable handoff

1. Keep `NOTES.md` ≤100 lines.
2. Update **`CURRENT.md`** when score/gate/objective change — never re-paste
   completed D-chains.
3. Divergence entry + `DIVERGENCE-INDEX.md` row; one `c-js-map/*.md` section.
4. Prepend a short entry to `AGENT-LOOP-JOURNAL.md` (rotate to `archive/` if >15).
5. Optional: `node scripts/check-hot-docs.mjs`.
6. **Commit and push** intentional work.

Ordinary loop agents may update: `CURRENT.md`, `NOTES.md`, `DIVERGENCE-LOG.md`,
`DIVERGENCE-INDEX.md`, `c-js-map/*.md`, `C-JS-MAP.md` (index only if needed),
`AGENT-LOOP-JOURNAL.md`, and `PROGRESS.md` stub (pointer only — prefer CURRENT).

## Git

Stage intentional changes; commit with why; `git push origin HEAD`. No force-push,
no amend of pushed commits, no reset of unrelated work.

## Absolute prohibitions

No frame/RNG alignment machinery, seed-specific production logic, whole-program
transpile/WASM as the scored port. Do not edit authority docs (Constitution,
runbook, playbook, API/phases/strategy, Cursor rules, loop scripts/prompt),
`frozen/**`, `sessions/**`, upstream C/patches, or frozen JS contracts.
Do not write `1` to `STOP_AGENT_LOOP.md`. After two falsifications, reconstruct
the C path or pivot — do not spin.
