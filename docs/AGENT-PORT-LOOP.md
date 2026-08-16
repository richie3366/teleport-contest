# Agent port loop (fail-closed unattended)

Repeatedly asks Cursor Agent CLI to continue the NetHack JS port. The
shell is the **gate**: agents **commit and `git push`** inside the
iteration; the script still fail-closes (revert+halt if the push has
not landed, else halt without reset) on green/suite failure, density
overflow, banned patterns, or protected-file edits. If the agent
forgot to push, the supervisor pushes after those gates pass.

Still not a full isolated worktree (see `docs/AUDIT-ROADMAP.md` P2).
Do not run with `AGENT_FORCE=1` on an uncheckpointed dirty checkout —
the script now **refuses to start** if the tracked tree is dirty.
`STOP_AGENT_LOOP.md` is gitignored.

## Quick start

```bash
# From repo root (optional: confirm model slug)
agent --list-models | rg grok

# Run until you stop it
./scripts/agent-port-loop.sh

# Fully unattended after a clean committed tree
AGENT_FORCE=1 ./scripts/agent-port-loop.sh

# Cap this supervisor run at ~50M tokens (all usage kinds; not persisted)
AGENT_FORCE=1 ./scripts/agent-port-loop.sh --token-budget-m 50
```

**Stop before the next iteration:** edit `STOP_AGENT_LOOP.md` at the repo root
and change its content from `0` to `1` (whitespace ignored).

```bash
echo 1 > STOP_AGENT_LOOP.md
```

The file is **gitignored**. A loop-agent `git reset --hard` must not
restore a tracked `0` and continue after you stopped. Only the
supervisor writes `0`, at **startup**.

## Before an unattended run

`--force` (`AGENT_FORCE=1`) is **required** for a useful headless loop:
without it, `--print` mode **auto-denies** Shell/tool approvals and the
fail-closed script will halt. `--trust` only skips the workspace-trust
question.

1. Commit everything you care about (`git status` clean; STOP is gitignored).
2. Confirm `docs/LOOP-QUEUE.md` will be refilled in-loop if below 8 open items.
3. Confirm the green gate (the script re-runs it as preflight).
4. Run only one loop against this checkout; do not edit concurrently.
5. Launch with `AGENT_FORCE=1`. Optional: `--token-budget-m 50`.

The script resets `STOP_AGENT_LOOP.md` to `0` at **startup only** (the
file is gitignored, so a loop-agent `git reset --hard` cannot restore
a tracked 0). First audit after this change is the next `n % 5 == 0`.

Halt reason (if it stops itself): `.agent-port-loop-logs/last-halt-reason.txt`.

## Model

Default: **Cursor Grok 4.6 Extra High**, non-fast.

| Want | CLI `--model` slug | `agent --list-models` label |
|------|--------------------|-----------------------------|
| Extra High, non-fast (default) | `cursor-grok-4.6-xhigh` | Cursor Grok 4.6 Extra High |
| High, non-fast | `cursor-grok-4.6-high` | Cursor Grok 4.6 |
| Medium, non-fast | `cursor-grok-4.6-medium` | Cursor Grok 4.6 Medium |
| Extra High, fast | `cursor-grok-4.6-xhigh-fast` | Cursor Grok 4.6 Extra High Fast |

Override:

```bash
MODEL=cursor-grok-4.6-high ./scripts/agent-port-loop.sh
```

## Design

```
┌───────────────────────────────────────────────────────────────┐
│  ./scripts/agent-port-loop.sh                                 │
│                                                               │
│  1. lock; STOP=0 (gitignored file); refuse dirty tracked tree │
│  2. preflight green (RESULTS_JSON must all pass + strict)     │
│  3. loop until STOP, token budget, or halt:                   │
│       mode = audit when n%5==0 (review + full suite) / else port │
│       port: Must-fix beats Open; if open count < 8, agent refills  │
│             Open from the map (target 12) then ships one cluster   │
│       snapshot js/; remember HEAD; run agent (commit + push)       │
│       FAIL-CLOSED (revert HEAD + STOP=1 if not yet on origin):     │
│         timeout, tool denials, protected edit, banned pattern,     │
│         js/ on audit, empty port, density >400/8,                  │
│         green fail, audit full-suite fail,                         │
│         QUALITY-RISK/REJECT with no new Must-fix row               │
│       else supervisor `git push origin HEAD` if the agent forgot   │
│       halt after short-run streak / missing usage (budget)    │
│       sleep LOOP_SLEEP_SEC                                    │
└───────────────────────────────────────────────────────────────┘
```

### Iteration modes

| Global `#` | Mode | Agent may edit `js/` | Supervisor extra gate |
|------------|------|----------------------|------------------------|
| `n % 5 == 0` | **audit** | no | must add `reviews/loop-unattended/`; full `sessions` PASS; REJECT → STOP |
| else | **port** | yes, one `LOOP-QUEUE` item | density cap; empty `js/` diff → halt; still-empty queue after port → halt |

Review prepends Keep’d C-wrongs onto `LOOP-QUEUE.md` **Must-fix** so
the next port **must** fix them. A QUALITY-RISK or REJECT review that
does not add a Must-fix row is a failed review (halt). Review and
public-score cadence run **together** every 5 iterations (not on
separate cadences). Must-fix does not skip that audit.

### Why agents push inside the iteration

The user wants each iteration’s work on `origin` as soon as it is
written (including review files and queue Must-fix rows). Agents
**commit and `git push origin HEAD`**. The frozen runner still
**exits 0 even when sessions fail**, so the supervisor parses
`__RESULTS_JSON__` after the agent returns. If a gate fails and the
agent already pushed, **do not `git reset`** (that would require a
force-push) — halt and ask a human to revert origin. If the agent
committed but forgot to push, the supervisor pushes after gates.

### Token budget (`--token-budget-m`)

Optional **per supervisor run** (not saved across launches):

```bash
./scripts/agent-port-loop.sh --token-budget-m 50    # 50_000_000 tokens
./scripts/agent-port-loop.sh --token-budget-m 2.5   # fractions OK
```

- Sums every numeric field on the agent `result.usage` object (input, output,
  cache read/write — no distinction).
- The current iteration always finishes; if the cumulative total is then over
  budget, the loop exits before starting another.
- Requires `stream-json` (or `json`); the script overrides other formats when
  a budget is set.
- Three consecutive iterations with **no** usage in the stream → halt (exit 1).

### Why a stop file (not Ctrl-C only)

- Ctrl-C kills the current agent mid-edit; the stop file waits for a clean
  boundary between iterations.
- Easy to flip from another terminal or editor while watching logs.

### Why a fresh agent each iteration

- CLI `-p` / `--print` runs one shot and exits.
- Context windows do not carry across process boundaries.
- **Compensation:** each process reads the Constitution, runbook, active
  objective, notes, and coverage map; then writes the owning durable docs.
- The loop intentionally starts a new chat instead of `--continue`, avoiding a
  growing contaminated context. Repo state is the memory boundary.

### Prompt file (`scripts/agent-port-loop.prompt.md`)

Checked into the repo so you can edit the standing orders without changing the
shell script. Agents read `docs/GROK-PLAYBOOK.md` first (model-specific faithful
porting guide). The prompt emphasizes:

1. Read playbook → Constitution → Progress → Notes → relevant coverage rows
2. Inspect the dirty tree and run the green gate before editing
3. Follow the current high-leverage objective rather than a hardcoded seed
4. Port one complete C semantic unit; no trace-derived implementation
5. Verify focused + green + cohort behavior
6. Remove diagnostics and update durable memory before exit
7. **Commit and `git push origin HEAD`** (supervisor fail-closes; pushes if forgotten)

`docs/NOTES.md` is deliberately tiny and unresolved-only. Score/objective live
in `docs/CURRENT.md`. **Every 5 global loop iterations** (`n % 5 == 0`) is
an **audit**: C-fidelity review **and** full `sessions` score (no port).
Work comes from
`docs/LOOP-QUEUE.md` (Must-fix before Open; live file unchecked-only,
done rows in `docs/archive/LOOP-QUEUE-DONE.md`). `STOP_AGENT_LOOP.md` is
**gitignored**; only the supervisor writes `0`, at launch. Fixed causes belong in
`DIVERGENCE-LOG.md` (+ index); structural omissions belong in one
`docs/c-js-map/*.md` section; each iteration prepends a short journal
entry (rotate into `docs/archive/` when >15).

### Logs

Under `.agent-port-loop-logs/` (gitignored):

- `loop-<stamp>.log` — full concatenated stream for one process run
- `iter-NNNN-<stamp>.log` — human-readable extract per iteration (`NNNN` is
  global and monotonic across restarts)
- `iter-NNNN-<stamp>.raw` — full CLI output (`stream-json` tool events when enabled)
- `last-halt-reason.txt` — why the supervisor stopped itself
- `iteration-count` — total claimed global iterations (survives restarts).
  Bootstraps from the **count** of `iter-*.log` files if higher than the
  stored value (not max `NNNN`, because early runs reused 0001…)
### Environment knobs

| Variable | Default | Meaning |
|----------|---------|---------|
| `MODEL` | `cursor-grok-4.6-xhigh` | Agent model slug |
| `AGENT_BIN` | `cursor-agent` or `agent` | CLI binary |
| `AGENT_TRUST` | `1` | Pass `--trust` (required for headless `-p`; set `0` only for interactive trust prompt) |
| `AGENT_FORCE` | `0` | Set `1` to pass `--force` so Shell/scorers are not auto-denied under `-p` |
| `AGENT_OUTPUT_FORMAT` | `stream-json` | `stream-json` keeps tool events in `iter-*.raw`; `text` is narrative-only |
| `ITERATION_TIMEOUT_SEC` | `3600` | Kill an overlong agent run (**halt+revert**) |
| `SHORT_ITER_SEC` | `30` | Agent wall-clock under this counts toward token-exhaustion streak |
| `SHORT_STREAK_LIMIT` | `3` | Consecutive short runs before the loop halts |
| `--token-budget-m` (CLI) | unset | Cap this run at *n* million tokens (all usage kinds); not persisted |
| `LOOP_CADENCE_EVERY` | `5` | Review + full-suite score when `n % this == 0` |
| `LOOP_MAX_JS_INSERTIONS` | `400` | Halt+revert if a port iter exceeds this `js/` insertion count |
| `LOOP_MAX_JS_FILES` | `8` | Halt+revert if a port iter touches more `js/` files |
| `LOOP_QUEUE_MIN` | `8` | Agent must refill Open when live `- [ ]` count is below this |
| `LOOP_QUEUE_TARGET` | `12` | Refill up to about this many open rows |
| `LOOP_PUSH` | `1` | Supervisor `git push origin HEAD` after gates |
| `LOOP_FAIL_CLOSED` | `1` | `0` restores warn-and-continue (debug only) |
| `LOOP_PREFLIGHT_ONLY` | `0` | Set `1` to test lock/model/green gates, then exit |
| `LOOP_SLEEP_SEC` | `2` | Pause between iterations |
| `STOP_FILE` | `$ROOT/STOP_AGENT_LOOP.md` | Stop latch path |
| `ITER_COUNT_FILE` | `$LOG_DIR/iteration-count` | Monotonic global iteration counter |
| `PROMPT_FILE` | `$ROOT/scripts/agent-port-loop.prompt.md` | Prompt body |
| `LOG_DIR` | `$ROOT/.agent-port-loop-logs` | Log directory |

## Loop observer

Browser conversation view of the current (or a recent) iter `.raw`
stream. Zero-dep; localhost only. Full usage: `loop-observer/README.md`.

```bash
npm run observe-loop          # prints URL, opens a window
node loop-observer/server.mjs --no-open
```

The header picker opens any of the last 10 iterations; **Go live**
resumes following the current one. Live auto-follow (and picker
changes) drop the previous thread so the tab does not accumulate
iters. Restart `npm run observe-loop` after pulling observer code.
Halt reason is still `last-halt-reason.txt`.

## Operator checklist

1. `agent login` (once) so `--list-models` / runs work.
2. Clean committed tree. Queue below 8 open items is refilled in-loop.
3. `AGENT_FORCE=1 ./scripts/agent-port-loop.sh`
4. Watch the live tee, or `npm run observe-loop` (see **Loop observer**
   above). Halt reason: `last-halt-reason.txt`.
5. To stop after the active iteration: `echo 1 > STOP_AGENT_LOOP.md`.
6. After stop, inspect `git log`, Notes, `CURRENT.md`, queue, and journal.

## Failure modes

| Symptom | Likely cause |
|---------|----------------|
| `neither cursor-agent nor agent found` | Install CLI / fix PATH |
| Auth errors | `agent login` |
| `Workspace Trust Required` | Loop defaults to `--trust`; upgrade CLI or set `AGENT_TRUST=1` |
| banned-pattern / green / density / protected | **HALT + revert** (unless already pushed — then halt, no reset) |
| `N consecutive agent runs <30s` | Out of tokens / quota — halt+revert |
| Token budget reached | Expected clean exit after an iteration when `--token-budget-m` is set |
| `3× consecutive missing usage` | stream-json had no `result.usage` — halt |
| Green / full suite fail | Halt+revert; `last-halt-reason.txt` |
| Loop ignores STOP | Content not exactly `1` after trim, or flip during an agent run (waits until iter ends) |
| Agent repeats dead ends | Notes/queue handoff failed — fix durable memory |
| Agent `git push` then gate fail | Halt without reset; human reverts origin |
| QUALITY-RISK with no Must-fix | Review did nothing — halt+revert (or halt if pushed) |
| Queue empty after port | Agent failed to refill from the map — halt |
| Dirty tree at start | Loop refuses to launch |

The shell parses `__RESULTS_JSON__` (the frozen runner exits 0 on FAIL),
enforces density, one-loop locking, protected-path hashes, finite
iteration time, and a diff-based banned-pattern scan. Automatic halt
writes `STOP_AGENT_LOOP.md=1`. `LOOP_FAIL_CLOSED=0` restores the old
warn-and-continue behaviour for debugging only.

## Relation to in-chat `/loop`

Cursor’s in-session `/loop` skill re-wakes the **same** chat. This script is
for **out-of-band CLI** overnight peels with explicit stop-file control and
per-iteration log files.
