# Agent port loop (fail-closed unattended)

Repeatedly asks Cursor Agent CLI to continue the NetHack JS port. The
shell is the **gate**: agents **commit and `git push`** inside the
iteration; the script still fail-closes (revert+halt if the push has
not landed, else halt without reset) on green/suite failure, density
overflow, banned patterns, or protected-file edits. If the agent
forgot to push, the supervisor pushes after those gates pass.

Still not a full isolated worktree (see `docs/AUDIT-ROADMAP.md` P2).
Do not run with `AGENT_FORCE=1` on an uncheckpointed dirty checkout —
the script now **refuses to start** if the tree is dirty (except
`STOP_AGENT_LOOP.md`).

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

The script resets `STOP_AGENT_LOOP.md` to `0` at **startup** only, so a previous
stop does not stick across runs.

## Before an unattended run

`--force` (`AGENT_FORCE=1`) is **required** for a useful headless loop:
without it, `--print` mode **auto-denies** Shell/tool approvals and the
fail-closed script will halt. `--trust` only skips the workspace-trust
question.

1. Commit everything you care about (`git status` clean except STOP).
2. Confirm `docs/LOOP-QUEUE.md` has open `- [ ]` items.
3. Confirm the green gate (the script re-runs it as preflight).
4. Run only one loop against this checkout; do not edit concurrently.
5. Launch with `AGENT_FORCE=1`. Optional: `--token-budget-m 50`.

The script resets `STOP_AGENT_LOOP.md` to `0` at startup. First
iteration after global count **1305** will be **#1306 review** (every 3),
then **#1307 port** of the Must-fix head (pole targeting). Cadence at
**#1310** defers while Must-fix remains open.

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
│  1. lock; STOP=0; refuse dirty tree (except STOP file)        │
│  2. preflight green (RESULTS_JSON must all pass + strict)     │
│  3. loop until STOP, token budget, or halt:                   │
│       mode = review (every 3) / cadence (every 5, score-only) │
│              / audit (15, 30, …) / else port                  │
│       port: refuse empty LOOP-QUEUE; Must-fix beats Open;          │
│             cadence defers while Must-fix is open                  │
│       snapshot js/; remember HEAD; run agent (commit + push)       │
│       FAIL-CLOSED (revert HEAD + STOP=1 if not yet on origin):     │
│         timeout, tool denials, protected edit, banned pattern,     │
│         js/ on review/cadence, empty port, density >400/8,         │
│         green fail, cadence full-suite fail,                       │
│         QUALITY-RISK/REJECT with no new Must-fix row               │
│       else supervisor `git push origin HEAD` if the agent forgot   │
│       halt after short-run streak / missing usage (budget)    │
│       sleep LOOP_SLEEP_SEC                                    │
└───────────────────────────────────────────────────────────────┘
```

### Iteration modes

| Global `#` | Mode | Agent may edit `js/` | Supervisor extra gate |
|------------|------|----------------------|------------------------|
| `n % 3 == 0` and not cadence | **review** | no | must add `reviews/loop-unattended/`; REJECT → STOP |
| `n % 5 == 0` | **cadence** | no | full `sessions` must all PASS; **deferred to port** while Must-fix is open |
| both (`15`, `30`, …) | **audit** | no | review + full suite |
| else | **port** | yes, one `LOOP-QUEUE` item | density cap; empty `js/` diff → halt |

Review prepends Keep’d C-wrongs onto `LOOP-QUEUE.md` **Must-fix** so
the next port **must** fix them instead of opening tut-1. A
QUALITY-RISK or REJECT review that does not add a Must-fix row is a
failed review (halt). Cadence score-only defers while Must-fix is
open (review/audit still run on schedule).

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
in `docs/CURRENT.md`. **Every 5 global loop iterations** is a **cadence**
score-only iter (no port) **unless Must-fix is open** (then port; cadence
slips). **Every 3** is a **review** iter (no port). Work comes from
`docs/LOOP-QUEUE.md` (Must-fix before Open; live file unchecked-only,
done rows in `docs/archive/LOOP-QUEUE-DONE.md`). Fixed causes belong in
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
| `LOOP_REVIEW_EVERY` | `3` | Review-only iteration cadence |
| `LOOP_CADENCE_EVERY` | `5` | Full-suite score-only iteration cadence |
| `LOOP_MAX_JS_INSERTIONS` | `400` | Halt+revert if a port iter exceeds this `js/` insertion count |
| `LOOP_MAX_JS_FILES` | `8` | Halt+revert if a port iter touches more `js/` files |
| `LOOP_PUSH` | `1` | Supervisor `git push origin HEAD` after gates |
| `LOOP_FAIL_CLOSED` | `1` | `0` restores warn-and-continue (debug only) |
| `LOOP_PREFLIGHT_ONLY` | `0` | Set `1` to test lock/model/green gates, then exit |
| `LOOP_SLEEP_SEC` | `2` | Pause between iterations |
| `STOP_FILE` | `$ROOT/STOP_AGENT_LOOP.md` | Stop latch path |
| `ITER_COUNT_FILE` | `$LOG_DIR/iteration-count` | Monotonic global iteration counter |
| `PROMPT_FILE` | `$ROOT/scripts/agent-port-loop.prompt.md` | Prompt body |
| `LOG_DIR` | `$ROOT/.agent-port-loop-logs` | Log directory |

## Operator checklist

1. `agent login` (once) so `--list-models` / runs work.
2. Clean committed tree; `LOOP-QUEUE.md` has open items.
3. `AGENT_FORCE=1 ./scripts/agent-port-loop.sh`
4. Watch the live tee or come back to `last-halt-reason.txt` / `git log`.
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
| Queue empty | Halt before a port iter (refill `LOOP-QUEUE.md`) |
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
