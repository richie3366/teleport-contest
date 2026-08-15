# Agent port loop (supervised / semi-unattended)

Repeatedly asks Cursor Agent CLI to continue the NetHack JS port. **Not a
trusted supervisor** — treat as operator-assisted until transactional gates
(see `docs/AUDIT-ROADMAP.md`) land. Do not run with `AGENT_FORCE=1` on an
uncheckpointed primary checkout.

The loop is an operator tool, not an architecture authority. Each agent must
obey `CONSTITUTION.md`, `PORTING-RUNBOOK.md`, and the active objective in
`CURRENT.md`.

## Quick start

```bash
# From repo root (optional: confirm model slug)
agent --list-models | rg grok

# Run until you stop it
./scripts/agent-port-loop.sh

# Fully unattended after checkpointing/reviewing the tree
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

`--force` (`AGENT_FORCE=1`) is required for a useful headless loop: without it,
`--print` mode **auto-denies** Shell/tool approvals (there is no interactive
prompt). `--trust` only skips the workspace-trust question.

On a dirty worktree, checkpoint before enabling force:

1. Make a human-controlled backup/checkpoint of the current tree.
2. Review `git status --short` and `docs/CURRENT.md`.
3. Ensure the green gate passes before starting.
4. Run only one loop against this checkout; do not edit concurrently.
5. Prefer `AGENT_FORCE=1` so scorers can run. Use `AGENT_FORCE=0` only when you
   intentionally want edit-only / no-shell iterations.

Do not use a new CLI worktree unless the current uncommitted port has first
been checkpointed: a worktree created from `HEAD` will not include these local
changes.

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
┌─────────────────────────────────────────────────────────┐
│  ./scripts/agent-port-loop.sh                           │
│                                                         │
│  1. acquire one-loop lock; reset STOP to 0              │
│  2. read/update global iteration-count; green gate      │
│  3. loop until human STOP, token budget, or exhaustion streak:   │
│       if STOP_AGENT_LOOP.md == 1 → exit                 │
│       if --token-budget-m reached → exit (after last iter) │
│       snapshot js/; run model with finite timeout       │
│       run: agent -p --model cursor-grok-4.6-xhigh ... \ │
│              "$(cat scripts/agent-port-loop.prompt.md)" │
│       meter usage from stream-json result (if budget set) │
│       warn (do not halt) on agent failure, protected    │
│         edits, banned patterns, or green regression     │
│       halt after SHORT_STREAK_LIMIT consecutive         │
│         agent runs shorter than SHORT_ITER_SEC          │
│       halt after 3× consecutive missing usage (budget)  │
│       if STOP_AGENT_LOOP.md == 1 → exit                 │
│       sleep LOOP_SLEEP_SEC (default 2)                  │
└─────────────────────────────────────────────────────────┘
```

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
7. **Commit and push** to `origin` (see prompt “End-of-iteration git”; no
   force-push)
`docs/NOTES.md` is deliberately tiny and unresolved-only. Score/objective live
in `docs/CURRENT.md`. **Every 5 global loop iterations** the loop injects a
mandatory full `sessions` score into the prompt; agents must update CURRENT
Score from `__RESULTS_JSON__`. Fixed causes belong in `DIVERGENCE-LOG.md`
(+ index); structural omissions belong in one `docs/c-js-map/*.md` section;
each iteration prepends a short journal entry (rotate into `docs/archive/`
when >15).

### Logs

Under `.agent-port-loop-logs/` (gitignored):

- `loop-<stamp>.log` — full concatenated stream for one process run
- `iter-NNNN-<stamp>.log` — human-readable extract per iteration (`NNNN` is
  global and monotonic across restarts)
- `iter-NNNN-<stamp>.raw` — full CLI output (`stream-json` tool events when enabled)
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
| `ITERATION_TIMEOUT_SEC` | `3600` | Kill an overlong agent run (loop continues afterward) |
| `SHORT_ITER_SEC` | `30` | Agent wall-clock under this counts toward token-exhaustion streak |
| `SHORT_STREAK_LIMIT` | `3` | Consecutive short runs before the loop halts |
| `--token-budget-m` (CLI) | unset | Cap this run at *n* million tokens (all usage kinds); not persisted |
| `LOOP_PREFLIGHT_ONLY` | `0` | Set `1` to test lock/model/green gates, then exit |
| `LOOP_SLEEP_SEC` | `2` | Pause between iterations |
| `STOP_FILE` | `$ROOT/STOP_AGENT_LOOP.md` | Stop latch path |
| `ITER_COUNT_FILE` | `$LOG_DIR/iteration-count` | Monotonic global iteration counter |
| `PROMPT_FILE` | `$ROOT/scripts/agent-port-loop.prompt.md` | Prompt body |
| `LOG_DIR` | `$ROOT/.agent-port-loop-logs` | Log directory |

## Operator checklist

1. `agent login` (once) so `--list-models` / runs work.
2. Checkpoint the dirty tree and confirm the green gate.
3. Ensure `CURRENT.md` has one primary objective and a falsifier (focused
   FAIL command, or map-driven omission + green/cohort/canary when suite
   is PASS).
4. Start `./scripts/agent-port-loop.sh` in a dedicated terminal.
5. Watch the live tee, diffs, green-gate results, journal, and per-iteration
   commits on `origin/main`.
6. To stop after the active iteration: `echo 1 > STOP_AGENT_LOOP.md`.
7. After stop, inspect `git log` / `git diff`, Notes, `CURRENT.md`, map section, and journal.

## Failure modes

| Symptom | Likely cause |
|---------|----------------|
| `neither cursor-agent nor agent found` | Install CLI / fix PATH |
| Auth errors | `agent login` |
| `Workspace Trust Required` | Loop defaults to `--trust`; upgrade CLI or set `AGENT_TRUST=1` |
| banned-pattern / green / agent exit mid-loop | Logged as **warning**; loop continues (human STOP or token streak still halt) |
| `N consecutive agent runs <30s` | Likely out of tokens / quota — loop halts; top up and restart |
| Token budget reached | Expected exit after an iteration when `--token-budget-m` is set |
| `3× consecutive missing usage` | stream-json had no `result.usage` — check `AGENT_OUTPUT_FORMAT` / CLI |
| Green sessions fail mid-loop | Warning only; restore semantic parity when you can, or set STOP |
| Loop ignores STOP | Content not exactly `1` after trim, or flip during an agent run (waits until iter ends) |
| Agent repeats dead ends | Notes/divergence handoff failed — fix durable memory |
| Unrelated files change | Prefer STOP + restore from checkpoint; loop no longer auto-halts on this |

The shell still runs the two-session exact-length green gate, one-loop locking,
protected-path hashes, finite iteration time, and a diff-based banned-pattern
scan — but mid-loop failures are warnings. Automatic halts (besides human
`STOP_AGENT_LOOP.md`): three consecutive agent runs shorter than 30s; optional
`--token-budget-m` after an overshooting iteration; three consecutive missing
usage events when a budget is set. Human log/diff review remains important.

## Relation to in-chat `/loop`

Cursor’s in-session `/loop` skill re-wakes the **same** chat. This script is
for **out-of-band CLI** overnight peels with explicit stop-file control and
per-iteration log files.
