# Agent port loop (supervised / semi-unattended)

Repeatedly asks Cursor Agent CLI to continue the NetHack JS port. **Not a
trusted supervisor** — treat as operator-assisted until transactional gates
(see `docs/AUDIT-ROADMAP.md`) land. Do not run with `AGENT_FORCE=1` on an
uncheckpointed primary checkout.

The loop is an operator tool, not an architecture authority. Each agent must
obey `CONSTITUTION.md`, `PORTING-RUNBOOK.md`, and the active objective in
`PROGRESS.md`.

## Quick start

```bash
# From repo root (optional: confirm model slug)
agent --list-models | rg grok

# Run until you stop it
./scripts/agent-port-loop.sh

# Fully unattended after checkpointing/reviewing the tree
AGENT_FORCE=1 ./scripts/agent-port-loop.sh
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
2. Review `git status --short` and `docs/PROGRESS.md`.
3. Ensure the green gate passes before starting.
4. Run only one loop against this checkout; do not edit concurrently.
5. Prefer `AGENT_FORCE=1` so scorers can run. Use `AGENT_FORCE=0` only when you
   intentionally want edit-only / no-shell iterations.

Do not use a new CLI worktree unless the current uncommitted port has first
been checkpointed: a worktree created from `HEAD` will not include these local
changes.

## Model

Default: **Cursor Grok 4.5 High**, non-fast.

| Want | CLI `--model` slug | `agent --list-models` label |
|------|--------------------|-----------------------------|
| High, non-fast (default) | `grok-4.5-xhigh` | Cursor Grok 4.5 |
| Medium, non-fast | `grok-4.5-high` | Cursor Grok 4.5 Medium |
| Low, non-fast | `grok-4.5-medium` | Cursor Grok 4.5 Low |
| High, fast | `grok-4.5-fast-xhigh` | Cursor Grok 4.5 Fast |

Override:

```bash
MODEL=grok-4.5-high ./scripts/agent-port-loop.sh
```

## Design

```
┌─────────────────────────────────────────────────────────┐
│  ./scripts/agent-port-loop.sh                           │
│                                                         │
│  1. acquire one-loop lock; reset STOP to 0              │
│  2. hash protected authority; run exact green gate      │
│  3. loop until human STOP or token-exhaustion streak:   │
│       if STOP_AGENT_LOOP.md == 1 → exit                 │
│       snapshot js/; run model with finite timeout       │
│       run: agent -p --model grok-4.5-xhigh ...      \   │
│              "$(cat scripts/agent-port-loop.prompt.md)" │
│       warn (do not halt) on agent failure, protected    │
│         edits, banned patterns, or green regression     │
│       halt only after SHORT_STREAK_LIMIT consecutive    │
│         agent runs shorter than SHORT_ITER_SEC (tokens) │
│       if STOP_AGENT_LOOP.md == 1 → exit                 │
│       sleep LOOP_SLEEP_SEC (default 2)                  │
└─────────────────────────────────────────────────────────┘
```

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
`docs/NOTES.md` is deliberately tiny and unresolved-only. Fixed causes belong
in `DIVERGENCE-LOG.md`; structural omissions belong in `C-JS-MAP.md`; each
iteration appends a short journal entry.

### Logs

Under `.agent-port-loop-logs/` (gitignored):

- `loop-<stamp>.log` — full concatenated stream
- `iter-NNNN-<stamp>.log` — human-readable extract per iteration
- `iter-NNNN-<stamp>.raw` — full CLI output (`stream-json` tool events when enabled)
### Environment knobs

| Variable | Default | Meaning |
|----------|---------|---------|
| `MODEL` | `grok-4.5-xhigh` | Agent model slug |
| `AGENT_BIN` | `cursor-agent` or `agent` | CLI binary |
| `AGENT_TRUST` | `1` | Pass `--trust` (required for headless `-p`; set `0` only for interactive trust prompt) |
| `AGENT_FORCE` | `0` | Set `1` to pass `--force` so Shell/scorers are not auto-denied under `-p` |
| `AGENT_OUTPUT_FORMAT` | `stream-json` | `stream-json` keeps tool events in `iter-*.raw`; `text` is narrative-only |
| `ITERATION_TIMEOUT_SEC` | `3600` | Kill an overlong agent run (loop continues afterward) |
| `SHORT_ITER_SEC` | `30` | Agent wall-clock under this counts toward token-exhaustion streak |
| `SHORT_STREAK_LIMIT` | `3` | Consecutive short runs before the loop halts |
| `LOOP_PREFLIGHT_ONLY` | `0` | Set `1` to test lock/model/green gates, then exit |
| `LOOP_SLEEP_SEC` | `2` | Pause between iterations |
| `STOP_FILE` | `$ROOT/STOP_AGENT_LOOP.md` | Stop latch path |
| `PROMPT_FILE` | `$ROOT/scripts/agent-port-loop.prompt.md` | Prompt body |
| `LOG_DIR` | `$ROOT/.agent-port-loop-logs` | Log directory |

## Operator checklist

1. `agent login` (once) so `--list-models` / runs work.
2. Checkpoint the dirty tree and confirm the green gate.
3. Ensure `PROGRESS.md` has one primary objective and a focused command.
4. Start `./scripts/agent-port-loop.sh` in a dedicated terminal.
5. Watch the live tee, diffs, green-gate results, journal, and per-iteration
   commits on `origin/main`.
6. To stop after the active iteration: `echo 1 > STOP_AGENT_LOOP.md`.
7. After stop, inspect `git log` / `git diff`, Notes, Progress, map, and journal.

## Failure modes

| Symptom | Likely cause |
|---------|----------------|
| `neither cursor-agent nor agent found` | Install CLI / fix PATH |
| Auth errors | `agent login` |
| `Workspace Trust Required` | Loop defaults to `--trust`; upgrade CLI or set `AGENT_TRUST=1` |
| banned-pattern / green / agent exit mid-loop | Logged as **warning**; loop continues (human STOP or token streak still halt) |
| `N consecutive agent runs <30s` | Likely out of tokens / quota — loop halts; top up and restart |
| Green sessions fail mid-loop | Warning only; restore semantic parity when you can, or set STOP |
| Loop ignores STOP | Content not exactly `1` after trim, or flip during an agent run (waits until iter ends) |
| Agent repeats dead ends | Notes/divergence handoff failed — fix durable memory |
| Unrelated files change | Prefer STOP + restore from checkpoint; loop no longer auto-halts on this |

The shell still runs the two-session exact-length green gate, one-loop locking,
protected-path hashes, finite iteration time, and a diff-based banned-pattern
scan — but mid-loop failures are warnings. The only automatic halt (besides
human `STOP_AGENT_LOOP.md`) is three consecutive agent runs shorter than 30s
(likely subscription tokens exhausted). Human log/diff review remains important.

## Relation to in-chat `/loop`

Cursor’s in-session `/loop` skill re-wakes the **same** chat. This script is
for **out-of-band CLI** overnight peels with explicit stop-file control and
per-iteration log files.
