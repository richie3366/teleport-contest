# Faithful porting runbook

Operational procedure for repeated fresh-context agents. This document says
**how to work**. `CONSTITUTION.md` says what is non-negotiable;
`CURRENT.md` says what to work on now.

## 1. Authority and evidence

When sources disagree, use this order **by domain**:

| Domain | Wins |
|--------|------|
| Scoring harness, segment model, cursor in screen match, frozen contracts | `frozen/ps_test_runner.mjs` and overlaid `js/isaac64.js`, `js/terminal.js`, `js/storage.js` |
| Observable game behavior under contest | Pinned `nethack-c/upstream` **plus every applied contest patch** |
| Unmodified gameplay semantics | Pinned upstream C |
| Contestant API shape | `docs/API.md` (explanatory; if API prose disagrees with frozen runner, frozen runner wins) |
| Recorded sessions | Observations of the target above — never a substitute specification |
| Locally re-recorded C | Only after verifying upstream SHA, patch hashes, compiler, datetime, timezone |
| Port docs and agent hypotheses | Lowest — re-check against C |

A patch can intentionally alter observable behavior; unpatched upstream is not
higher authority for that behavior.

An RNG trace proves that a call happened in one execution. It does not prove
which unobserved branches, object types, roles, or map states are valid.

## 2. Durable memory: one owner per fact

| File | Owns | Must not become |
|------|------|-----------------|
| `CONSTITUTION.md` | Architecture and hard bans | A progress log |
| `PORTING-RUNBOOK.md` | Repeatable workflow and gates | Current-session notes |
| **`CURRENT.md`** | Score, green gate, primary objective (target ~150 lines; `check-hot-docs.mjs`) | Completed D-chains / history |
| `PROGRESS.md` | Stub pointing at `CURRENT.md` + archive | A second hot pack |
| `NOTES.md` | Tiny unresolved hypothesis (target ~100 lines; `check-hot-docs.mjs`) | Chronological history |
| `C-JS-MAP.md` + `c-js-map/*.md` | Structural coverage / omissions by subsystem | A score dashboard |
| `DIVERGENCE-INDEX.md` | Compact ID → status table | Full entry bodies |
| `DIVERGENCE-LOG.md` | Evidence-backed entry bodies (open one by ID) | Required full read |
| `PORTING-STRATEGY.md` | Rationale and long-range options | Live operational truth |
| `AGENT-LOOP-JOURNAL.md` | Latest ~10–15 iteration crumbs (`rotate-journal.mjs`) | Full history (use `archive/`) |
| `archive/**` | Cold history | Default iteration reading |

If a fact is duplicated, update its owner and replace copies with a link.

In unattended loop mode, ordinary porters may update only `CURRENT.md`, Notes,
one C↔JS map section, the divergence index/log, and the journal tail.
Constitution, runbook, playbook, API, strategy/phase docs, Cursor rules, loop
scripts/prompts, `frozen/**`, `sessions/**`, and the C target/patches are
read-only authority. Process or fixture corrections are proposed to a
human/auditor.

## 3. Long-horizon strategy

Use two frontiers together:

1. **Foundation frontier:** remove shared early blockers that prevent many
   roles/sessions from reaching real code.
2. **Deep canary frontier:** retain one or two advanced sessions that expose
   ordering, state, and display defects after startup.

Do not optimize only one frontier. Chasing one late RNG index can perfect a
Tourist path while most roles still throw during initialization; broad
horizontal rewrites can create many unverified stubs.

### After local public suite PASS

When every public session passes locally, the frontiers above no longer
pick work via FAIL peels. Switch to **map-driven retirement** under a
locked suite:

1. Treat 44/44 (or the current full public pass) as a **regression
   fortress** — green gate, cohort, and cadence full `sessions` must
   stay PASS.
2. Choose work from named omissions / constitutional debt in one
   `c-js-map/*.md` section (`debt.md` scenario-shaped code first, then
   `absent.md` thin systems). Parked items stay diagnose-only until
   their falsifier exists.
3. Optional **private canaries:** record short local C-recorder sessions
   on thin subsystems for held-out hardening; never memorize public
   traces or chase public leaderboard / CDN drift in-loop.
4. Prefer delete-wrong-JS + re-port of a shim-thick module over stacking
   micro-fixes (Phase 2 maintainability).

Operational detail for agents: `GROK-PLAYBOOK.md` §2a–2b.

### Target selection

**If the local public suite is already PASS:** do not invent FAIL peels.
Use the map-driven order above (fortress → named debt/absent cluster →
optional private canary). Items 1–6 below apply only when they name a
*real* remaining scaffold, throw, or completeness gap — not as excuses
to chase public-screen deltas.

Otherwise choose the next unit in this order:

1. An explicit crash/throw or fake fallback shared by many sessions.
2. A remaining replay/scaffold path or missing frozen-contract behavior.
3. The earliest common C caller across a useful session cohort.
4. A completeness gap in a subsystem already being edited.
5. The active deep-canary divergence.
6. Display-only parity after RNG and input-boundary order are stable.

Use the full public run periodically to identify shared blockers / to
confirm the fortress. Passing count alone is not the priority; a real C
subsystem that retires named debt or advances non-passing sessions is
valuable.

### Vertical slice plus branch envelope

An iteration should still be one **semantic cluster**: one C function or
tightly coupled caller/callee family — not one map bullet, and not an
unrelated multi-subsystem rewrite. Related deferrals in that envelope may
retire together when they share one falsifier and verification story.
A useful density target once the suite is green is roughly 80–400 lines of
C-faithful JS or one small-file restart (amortizes fixed agent cost).
Below ~40 insertions on a non-Must-fix port is a failed density handoff
unless C is that small. Consecutive Open rows of one C function may
combine when every callee is live, a C-matched clone, or named omitted
here (no stub in a live arm). Must-fix stays one item, alone.
But "small"/"cluster" does not mean "only the branch this seed took."

For every touched function:

- port the complete practical branch envelope supported by current data types;
- preserve C short-circuit and mutation order;
- list genuinely deferred branches in the relevant `c-js-map/*.md` section;
- do not label the function `ported` while production code says
  "not needed for seedXXXX."

## 4. Status vocabulary

Use these exact statuses in `c-js-map/*.md` section files:

- **absent** — no implementation.
- **scaffold** — placeholder, throw, fake value, or RNG-only shell.
- **partial** — C-aligned behavior exists, with named omissions.
- **ported** — the selected C semantic unit and its reachable branches are
  implemented; no known test-derived behavior.
- **parity** — `ported` plus differential evidence from at least two distinct
  scenarios when the subsystem permits it.
- **frozen** — judge-owned contract, not contestant code.

A passing seed is evidence. It does not automatically change every function it
touched to `ported` or `parity`.

## 5. Iteration protocol

### A. Preflight

1. Read, in order:
   - `CONSTITUTION.md`
   - the active objective and green gate in `CURRENT.md`
   - `NOTES.md`
   - relevant rows in one `c-js-map/*.md` section
   - this runbook section if the procedure is not fresh
2. Run `git status --short` and inspect the existing diff scope.
   The worktree can intentionally be dirty. Never reset, checkout, delete, or
   rewrite unrelated work.
3. Run the green gate **before editing**. If it already fails, diagnose that
   state or document it; do not claim the new iteration caused or fixed it.
4. If primary work is a FAIL peel: reproduce the focused divergence with the
   command in `CURRENT.md`. If primary is map-driven (suite already PASS):
   confirm the named map omission / C cluster and its falsifier (focused
   or private canary + green + cohort) — do not invent a FAIL.

### B. Build a work packet before editing

Write down:

- C function(s), file paths, and relevant callers;
- corresponding JS function/module;
- for FAIL peels: exact observed symptom and channel (throw, state, RNG,
  screen, cursor); for map-driven work: the named omission / debt row and
  the branch envelope to retire;
- one falsifiable hypothesis;
- expected side effects, list ordering, and RNG calls;
- focused or private-canary command, green-gate command, and cohort command;
- deferred dependencies that would make a faithful change impossible.

Read slices around functions and callers. Do not consume the context window by
reading entire 5,000-line C files unless control flow truly requires it.

### C. Diagnose before patching

1. Attribute input keys to actual `nhgetch` boundaries. `--More--`, menus, and
   zero-RNG keys often invalidate a guessed command timeline.
2. Compare C and JS control flow at the first meaningful divergence.
3. Compare state that selects the branch, not only RNG call names:
   coordinates, terrain, object-list order, flags, inventory/minventory,
   monster data, and current input prompt.
4. If evidence disproves the hypothesis, update `NOTES.md` immediately.
5. Temporary instrumentation is allowed locally but must be removable by
   searching for a distinctive marker. Prefer a **temp C dump at the cited
   locus** over JS `FORCE` / screen decode / another topline shim when stuck
   on geometry **or** keystream/`more`/`NEED_MORE` (see `GROK-PLAYBOOK.md`
   §7; D-0928 #1092, #1127, #1132).

### D. Implement

- Cite the C file and function in the JS implementation.
- Port logic and call order, not the recorded outcome.
- Port a tight helper cluster when the target cannot be faithful without it.
- Preserve C list insertion/traversal order and mutation timing.
- Use generated data only through reproducible extractors.
- Do not touch `js/isaac64.js`, `js/terminal.js`, or `js/storage.js`.
- Do not add to `fastforward.js`; its remaining empty hooks should only shrink.

### E. Verify in increasing scope

1. **Syntax/static:** check edited modules and inspect lints.
2. **Focused differential:** first RNG divergence plus the session runner.
3. **Strict lengths:** reject trailing RNG/screens/cursors that the frozen
   runner's canonical-prefix comparison does not notice.
4. **Green gate:** every previously green session in `CURRENT.md`.
5. **Subsystem cohort:** at least one distinct role/state/session that reaches
   the same code differently.
6. **Full public run:** after a shared startup/RNG/display change, a milestone,
   or several iterations since the last run.
7. **Browser/viewer smoke:** when terminal, menus, cursor, or animation changed.

Preferred commands:

```bash
# Focused first-divergence diagnostic (single-segment helper)
node scripts/rng-diff.mjs sessions/<focus>.session.json

# Exact focused/green/cohort scoring
node frozen/ps_test_runner.mjs \
  sessions/<focus>.session.json \
  sessions/<green-a>.session.json \
  sessions/<green-b>.session.json

# Exact scored-output lengths (runner PASS alone ignores trailing JS output)
node scripts/strict-output-check.mjs \
  sessions/<green-a>.session.json \
  sessions/<green-b>.session.json

# Full public score without copying frozen files over the worktree
node frozen/ps_test_runner.mjs sessions
```

`scripts/rng-diff.mjs` currently runs only segment 0; never use it as proof for
a multi-segment session. The session runner is authoritative.

The frozen runner counts matches only across canonical output lengths. It can
report `PASS` when JS has trailing RNG/screens/cursors. Treat `PASS` as green
only when `scripts/strict-output-check.mjs` also passes. Missing animation
frames remain allowed because animation is supplemental; use
`STRICT_ANIMATION=1` when auditing exact animation counts.

`bash frozen/score.sh` first overlays the three frozen JS contracts into the
worktree. Use it for canonical checkpoints when desired, but expect those files
to appear modified relative to an old fork baseline. Never "fix" parity by
editing the overlaid copies.

### F. Diff audit

Before finishing:

- remove `DIAG`, `FORCE`, raw RNG-index gates, and debug prints;
- inspect edited production files for public seed names, recorded coordinates,
  expected RNG values, screen strings, and unexplained magic constants;
- confirm every new constant comes from C or a frozen contract;
- confirm no unrelated dirty file was reverted;
- confirm a partial implementation says what is omitted in the map section, not
  with seed-specific production comments.

Seed names, coordinates, and trace indices belong in `NOTES.md`,
`CURRENT.md`, `DIVERGENCE-LOG.md`, tests, or debugging commands—not
production control flow.

For each edited JS file, a useful final scan is:

```bash
rg -n 'DIAG|FORCE|seed[0-9]{4}|getRngLog|console\.(log|error)' js/<file>.js
```

This is an audit prompt, not an automatic verdict: remove test-derived design
and explain or generalize any pre-existing narrow comments in the function.

### G. Durable handoff

Update only the owners of changed facts:

- unresolved current theory/dead end → `NOTES.md`;
- fixed divergence with evidence → `DIVERGENCE-LOG.md` + index row;
- structural status/omissions → one `c-js-map/*.md` section;
- score, green gate, objective → `CURRENT.md` (never re-paste D-chains);
- iteration summary → prepend a short `AGENT-LOOP-JOURNAL.md` entry.

Leave the tree coherent. If the change cannot pass its declared gate, either
finish the diagnosis in the same iteration or remove only your experimental
edit and leave evidence for the next agent.

Unattended loop agents must then **commit and push** to `origin` (see
`scripts/agent-port-loop.prompt.md` “End-of-iteration git”). No force-push.

## 6. Differential diagnosis rules

### RNG differs

- Find the first differing call, then inspect the C caller and the branch
  conditions that precede it.
- Matching later numeric values do not repair an earlier ordering divergence.
- Never add a burn, skip, queue, or raw-index condition to align traces.
- Check C short-circuit order and clang argument evaluation.

### Screens differ while RNG matches

- Compare the same input boundary and cursor.
- Check message blocking, menus, status redraw, glyph/color/attrs, and cursor.
- A missing `--More--` changes ownership of later keys even if the current
  screen looks close.

### Both differ at startup

- Prefer shared initialization/options/role/data defects over session-specific
  movement work.
- Explicit throws and hardcoded role fallbacks are foundation blockers.

### Stuck after two falsified theories

Stop patching the symptom. Reconstruct the complete C call path, inspect
missing data fields/list order, or select a prerequisite unit. Record the dead
ends before another iteration repeats them.

## 7. C-to-JS semantic checklist

For parity-sensitive code, explicitly check:

- signed/unsigned widths, truncation, overflow, and integer division;
- macro expansion and single/double evaluation;
- short-circuit order and nested RNG argument order;
- pointer aliasing represented as JS object identity;
- linked-list insertion, traversal, extraction, and merge order;
- stack quantities, weights, and object ownership/location transitions;
- struct defaults (C zero initialization versus JS `undefined`);
- `goto` exits and early returns;
- mutation during iteration;
- stable `qsort` behavior;
- char values, NUL termination, fixed-buffer truncation, and case rules;
- global/transient/saved state lifetime across turns and segments.

## 8. Generated data

Generated tables are faithful only when reproducible.

For a generated file:

1. source path/tag is recorded in its header;
2. extractor is checked in;
3. generated file says not to edit manually;
4. extractor preserves C numeric widths/flags and table order;
5. re-running the extractor is deterministic;
6. behavior helpers still live in readable JS rather than being hidden in a
   whole-program generated engine.

Missing fields are semantic omissions. Record them in the relevant
`c-js-map/*.md` section; do not
silently substitute defaults that happen to pass one session.

## 9. Async and segment boundaries

Game physics remains synchronous in logical order. `async` may propagate up a
call chain solely because it can reach `nhgetch` (for example `pline` →
`more`) or optional `animationFrame`; it must not defer or reorder physics.

Each `runSegment(input)` call creates a fresh game. Cross-segment state flows
only through `input.storage`. The harness concatenates per-segment outputs.

## 10. Regression policy

- Never knowingly regress the green gate.
- If a faithful C fix exposes that a previous green path depended on a fake
  implementation, fix the shared prerequisite rather than preserving the fake.
- If that cannot fit safely in one iteration, leave the last coherent green
  state and document the dependency.
- Run the full public set after foundation changes. Optimize for earliest
  shared blockers and semantic coverage, not only whole-session passes.

## 11. Subsystem restart rule

Restart a module from C when it contains several of:

- contradictory branch comments;
- public-seed-specific conditions or geometry;
- repeated RNG alignment patches;
- unclear object ownership/list order;
- many "not needed for seed" omissions;
- async workarounds that cross input boundaries.

Preserve useful tests and evidence, then re-port a bounded C unit. Do not stack
another shim. In an unattended loop, propose this restart and stop; deletion
or wholesale replacement requires a human checkpoint/auditor.

## 12. Autonomous-loop discipline

Fresh agents must not reinterpret architecture. They follow the active
objective in `CURRENT.md`, this runbook, and the Constitution.

**Model playbook:** loop agents read `GROK-PLAYBOOK.md` first each iteration.
It encodes objective priority (foundation before parked canaries), good/bad
fix patterns from this repo, verification matrix, and Grok-specific failure
modes — without duplicating the Constitution.

One iteration should end with one of:

1. a verified faithful change;
2. a falsified hypothesis and clean tree;
3. a prerequisite identified and made the next objective.

It must not end with an unverified diagnostic hack. The loop may be endless;
each iteration must still be finite, auditable, and useful to a fresh model.

### Parked deep work

When `DIVERGENCE-LOG.md` marks an item **parked** (missing falsifier,
instrumentation, or prerequisite), loop agents may record hypotheses in the
journal but must not ship production changes for that item. Return to the
primary foundation objective in `CURRENT.md` instead of re-peeling the parked
trace.
