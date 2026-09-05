# Agent port loop (fail-closed unattended)

Repeatedly asks Cursor Agent CLI (or Muse, with `--muse`) to continue the
NetHack JS port. The
shell is the **gate**: agents **commit and `git push`** inside the
iteration. Density overflow, protected-file edits, empty ports (unless an
Open/Must-fix row moved to **Parked**), and
QUALITY-RISK without a Must-fix still fail-close (revert+halt if the
push has not landed, else halt without reset). Green / full-suite
regression **and** banned-pattern hits are logged; the loop
**continues** so the next iteration can recover (unpushed ban →
revert this iter; already pushed → next-iter heal prompt, no STOP).
If the agent forgot to push, the supervisor pushes after those gates
(including after a suite warning).

Still not a full isolated worktree (see `docs/AUDIT-ROADMAP.md` P2).
Do not run with `AGENT_FORCE=1` on an uncheckpointed dirty checkout —
the script **refuses to start** if the tracked tree is dirty, except
when a **continue-unfinished** latch is armed (crash-before-commit, or
`--continue-unfinished` / `NEXT_AGENT_PROMPT.md`) so the next iter can
finish leftover work.
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

# Same loop, Muse instead of cursor-agent (model muse-spark-1.3-contributor, max)
AGENT_FORCE=1 ./scripts/agent-port-loop.sh --muse --token-budget-m 50

# Retry a cadence slot that crashed before commit (next iter = n+1).
# Example: failed audit #1465 → treat last completed as 1464.
AGENT_FORCE=1 ./scripts/agent-port-loop.sh --token-budget-m 50 --last-completed 1464

# Finish leftover work after a crash (ignores n%10 audit). Usually
# unnecessary: the supervisor retries in-process. Use this to relaunch
# after a kill / STOP with a leftover latch.
AGENT_FORCE=1 ./scripts/agent-port-loop.sh --continue-unfinished --token-budget-m 50

# Extra standing orders for the next iter only (gitignored file, consumed):
#   printf '%s\n' 'Finish the dirty ALLOW_BARS port; do not pop queue.' \
#     > NEXT_AGENT_PROMPT.md
#   AGENT_FORCE=1 ./scripts/agent-port-loop.sh --token-budget-m 50
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
without it, Cursor `--print` mode **auto-denies** Shell/tool approvals
and Muse stays on `--on-request` (no `--yolo`). The fail-closed script
will halt. `--trust` / `--trust-workspace` only skips the workspace-trust
question.

1. Commit everything you care about (`git status` clean; STOP and
   `NEXT_AGENT_PROMPT.md` are gitignored), unless you are relaunching
   to finish a crash leftover (continue latch / `--continue-unfinished`).
2. Confirm `docs/LOOP-QUEUE.md` will be refilled in-loop if below 8 open items.
3. Confirm the green gate (the script re-runs it as preflight).
4. Run only one loop against this checkout; do not edit concurrently.
5. Launch with `AGENT_FORCE=1`. Optional: `--token-budget-m 50`.

The script resets `STOP_AGENT_LOOP.md` to `0` at **startup only** (the
file is gitignored, so a loop-agent `git reset --hard` cannot restore
a tracked 0). First audit after this change is the next `n % 10 == 0`.

Halt reason (if it stops itself): `.agent-port-loop-logs/last-halt-reason.txt`.

## Model

Default: **Cursor Grok 4.6 Extra High**, non-fast.

| Want | CLI `--model` slug | `agent --list-models` label |
|------|--------------------|-----------------------------|
| Extra High, non-fast (default) | `cursor-grok-4.6-xhigh` | Cursor Grok 4.6 Extra High |
| High, non-fast | `cursor-grok-4.6-high` | Cursor Grok 4.6 |
| Medium, non-fast | `cursor-grok-4.6-medium` | Cursor Grok 4.6 Medium |
| Extra High, fast | `cursor-grok-4.6-xhigh-fast` | Cursor Grok 4.6 Extra High Fast |

Muse (`--muse`): default slug `muse-spark-1.3-contributor` at
`--reasoning-effort max` (`MUSE_REASONING_EFFORT` override). `MODEL=` still
overrides the slug.

Override (Cursor):

```bash
MODEL=cursor-grok-4.6-high ./scripts/agent-port-loop.sh
```

## Design

```
┌───────────────────────────────────────────────────────────────┐
│  ./scripts/agent-port-loop.sh                                 │
│                                                               │
│  1. lock; STOP=0 (gitignored file); refuse dirty tracked tree       │
│     unless continue-unfinished latch / --continue-unfinished        │
│  2. preflight green (RESULTS_JSON must all pass + strict;           │
│     continue-unfinished warns and starts if leftover broke green)   │
│  3. loop until STOP, token budget, or halt:                         │
│       mode = audit when n%10==0 (review + full suite) / else port   │
│       continue latch: force port (or audit) and skip n%10 for       │
│             that one global #; leftover dirty tree is the cluster   │
│       port: Must-fix beats Open; if open count < 8, agent refills  │
│             Open from the map (target 12) then ships one cluster   │
│       snapshot js/; remember HEAD; run agent (commit + push)       │
│       FAIL-CLOSED (revert HEAD + STOP=1 if not yet on origin):     │
│         3× short runs, tool denials, protected edit,               │
│         js/ on audit, empty committed port, density >600/10,       │
│         QUALITY-RISK/REJECT with no new Must-fix row               │
│       WARN + CONTINUE (no STOP): green / full-suite fail;          │
│         banned-pattern (unpushed → revert; pushed → heal prompt);  │
│         crash/timeout/resource_exhausted before commit: rewind n,  │
│         arm continue-unfinished (cite that iter .log/.raw), retry  │
│         the same # in this run (even if n%10==0)                   │
│       else supervisor `git push origin HEAD` if the agent forgot   │
│       halt after short-run streak / missing usage (budget)    │
│       sleep LOOP_SLEEP_SEC                                    │
└───────────────────────────────────────────────────────────────┘
```

### Iteration modes

| Global `#` | Mode | Agent may edit `js/` | Supervisor extra gate |
|------------|------|----------------------|------------------------|
| `n % 10 == 0` | **audit** | no | must add `reviews/loop-unattended/`; full `sessions` scored (FAIL is logged, loop continues); REJECT → STOP |
| else | **port** | yes, one `LOOP-QUEUE` item | density cap; empty committed **and** working-tree `js/` → halt+revert; uncommitted `js/` after crash → halt, keep tree; still-empty queue after port → halt |

Review prepends Keep’d C-wrongs onto `LOOP-QUEUE.md` **Must-fix** so
the next port **must** fix them. A QUALITY-RISK or REJECT review that
does not add a Must-fix row is a failed review (halt). Review and
public-score cadence run **together** every 10 iterations (not on
separate cadences): 9 port/js iters, then one audit at
`n % 10 == 0`. Must-fix does not skip that audit. After finishing a SHA, the
audit agent **writes that SHA’s review file immediately**, then
starts the next SHA. Git is still **one grouped commit** at the
end of the iteration (not one commit per SHA).

### Continue unfinished (ignore `n % 10`)

A crash / timeout / `resource_exhausted` **before commit** still keeps
the dirty tree and rewinds the counter. The supervisor **does not
exit**: it arms a **one-shot continue latch**
(`.agent-port-loop-logs/continue-unfinished`: `port` or `audit`, plus a
git-status snapshot, paths to that attempt’s `iter-NNNN-*.log` /
`.raw`, and a **resume brief** generated from the `.raw` by
`scripts/loop-resume-brief.mjs` — narrative, every range read, every
edit hunk, the output tails of the verify / runner / worker commands,
and how it died) and **retries the same global `#` in this run**. The
next agent gets `scripts/agent-port-loop.continue.prompt.md` (first
three calls fixed: the brief → `git diff HEAD -- js/` →
`verify.mjs --fn`; triage every FAIL from that one run; ship the
verified core and queue the rest if the extension keeps regressing;
do **not** pop a new `LOOP-QUEUE` item) and **forces that mode even
when the `#` is divisible by 10**. Uncommitted `js/` or `reviews/`
after an agent returns without a commit is the same retry, not a halt.

Why the brief exists: the `.log` extract only carries `[tool]
started/completed` markers. #2238 died on a provider quota error one
call after a complete `verify` run (16 corpus PASS, 11 public FAILs
listed); #2240 could not see that output, spent ~150 calls and 14
minutes re-deriving the attempt, then fixed the same 11 failures in
four serial rounds — 359 calls, 17.2 M tokens, 43 minutes.

3× consecutive **short** (<30s) runs still halt, now **without**
`git reset`, so a crashed iteration’s leftover survives for a relaunch.
A provider **quota** error (`ActionRequiredError` / "You're out of
usage") halts immediately with the latch armed instead of retrying
into the exhausted plan; relaunch with `--continue-unfinished` once
usage resets. Token budget and `STOP_AGENT_LOOP.md=1` still stop the
supervisor between attempts. A human relaunch also picks up a leftover
latch if the process was killed.

Operators can also:

```bash
# Force the next iter to finish leftover work (dirty js/ or reviews/).
AGENT_FORCE=1 ./scripts/agent-port-loop.sh --continue-unfinished

# Extra prompt text for the next iter only (consumed after attach).
./scripts/agent-port-loop.sh --next-prompt /tmp/orders.md --continue-unfinished
# or: write gitignored NEXT_AGENT_PROMPT.md at the repo root (dirty tree
#     + that file also arms continue, without the flag).

# Override inferred mode (default: js/ dirty → port, reviews/ → audit).
./scripts/agent-port-loop.sh --continue-unfinished --next-mode port
```

On a **clean** tree, `--next-prompt` / `NEXT_AGENT_PROMPT.md` only
**appends** extra text to the normal port or audit prompt (cadence
unchanged). Combine with `--continue-unfinished` to force port/audit
regardless of `n % 10`.

### Why agents push inside the iteration

The user wants each iteration’s work on `origin` as soon as it is
written (including review files and queue Must-fix rows). Agents
**commit and `git push origin HEAD`**. The frozen runner still
**exits 0 even when sessions fail**, so the supervisor parses
`__RESULTS_JSON__` after the agent returns. Green / full-suite FAIL
does **not** halt: log a warning and continue (the next port is
trusted to recover). If a density/authority/empty-port gate fails (a
Parked-row move is not an empty port) and the agent already pushed,
**do not `git reset`** (that would
require a force-push) — halt and ask a human to revert origin. If
the agent committed but forgot to push, the supervisor pushes after
gates (including after a suite warning).

### Token budget (`--token-budget-m`)

Optional **per supervisor run** (not saved across launches):

```bash
./scripts/agent-port-loop.sh --token-budget-m 50    # 50_000_000 tokens
./scripts/agent-port-loop.sh --token-budget-m 2.5   # fractions OK
```

- Sums every numeric field on the Cursor agent `result.usage` object
  (input, output, cache read/write — no distinction). Muse `--json` stdout
  has **no** usage events; the supervisor reads the on-disk
  `session.jsonl` and **sums** every `model_completed` step
  (input + output + reasoning; cache fields are already inside input).
  `MUSE_NO_SESSION_LOG=1` cannot meter a budget.
- The current iteration always finishes; if the cumulative total is then over
  budget, the loop exits before starting another.
- Requires Cursor `stream-json` (or `json`), or Muse `--json` (always on
  with `--muse`); the script overrides other Cursor formats when a budget is set.
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
7. **Commit and `git push origin HEAD`** (supervisor fail-closes on density/authority/empty port except a Parked-row move; suite FAIL continues; pushes if forgotten; commits leftover park docs if the agent forgot)

`docs/NOTES.md` is deliberately tiny and unresolved-only. Score/objective live
in `docs/CURRENT.md`. **Every 10 global loop iterations** (`n % 10 == 0`) is
an **audit**: C-fidelity review **and** full `sessions` score (no port).
Work comes from
`docs/LOOP-QUEUE.md` (Must-fix before Open; live file unchecked-only,
done rows in `docs/archive/LOOP-QUEUE-DONE.md`). `STOP_AGENT_LOOP.md` is
**gitignored**; only the supervisor writes `0`, at launch. Fixed causes belong in
`DIVERGENCE-LOG.md` (+ index); structural omissions belong in one
`docs/c-js-map/*.md` section; each iteration prepends a short journal
entry. Do not copy old crumbs by hand: `node scripts/check-hot-docs.mjs --fix`
in the iter, and the supervisor runs `scripts/rotate-journal.mjs` if
the live file is still over cap.

### Logs

Under `.agent-port-loop-logs/` (gitignored):

- `loop-<stamp>.log` — full concatenated stream for one process run
- `iter-NNNN-<stamp>.log` — human-readable extract per iteration (`NNNN` is
  global and monotonic across restarts)
- `iter-NNNN-<stamp>.raw` — full CLI output (`stream-json` or Muse `exec --json`)
- `last-halt-reason.txt` — why the supervisor stopped itself
- `iteration-count` — total claimed global iterations (survives restarts).
  Bootstraps from the **count** of `iter-*.log` files if higher than the
  stored value (not max `NNNN`, because early runs reused 0001…).
  `--last-completed n` rewrites this so the next iter is `n+1` (must stay
  ≥ that log-file floor). A crash/timeout **before commit** rewinds the
  counter and retries the same global `#` **in this run** (continue
  prompt + that attempt’s `.log`/`.raw`).
- `continue-unfinished` — one-shot latch (`port` or `audit`). Armed on
  crash-before-commit (in-process retry, or leftover for a relaunch).
  Consumed at the start of the next attempt. Paired
  `next-iter.prompt.md` / `next-iter.context.md` hold extra operator
  text, git-status, paths to the prior `iter-NNNN-*.log` / `.raw`, and
  the resume brief (`node scripts/loop-resume-brief.mjs <raw>
  [--max-lines N]` regenerates it, at any length, for a human too).

### Environment knobs

| Variable | Default | Meaning |
|----------|---------|---------|
| `MODEL` | `cursor-grok-4.6-xhigh` (Cursor) / `muse-spark-1.3-contributor` (`--muse`) | Agent model slug |
| `AGENT_BIN` | `cursor-agent` or `agent` | Cursor CLI binary (ignored with `--muse`) |
| `--muse` (CLI) | unset | Use `muse exec --json` instead of cursor-agent |
| `LOOP_MUSE` | `0` | Same as `--muse` |
| `MUSE_BIN` | `muse` | Muse CLI binary |
| `MUSE_REASONING_EFFORT` | `max` | Muse `--reasoning-effort` (none…ultra) |
| `MUSE_NO_SESSION_LOG` | `0` | Set `1` to pass `--no-session-log` (`.raw` remains the loop log) |
| `AGENT_TRUST` | `1` | Cursor: `--trust`. Muse without `--yolo`: `--trust-workspace` |
| `AGENT_FORCE` | `0` | Cursor: `--force`. Muse: `--yolo` so Shell/scorers are not auto-denied |
| `AGENT_OUTPUT_FORMAT` | `stream-json` | Cursor only; `--muse` always uses `--json` |
| `ITERATION_TIMEOUT_SEC` | `3600` | Kill an overlong agent run (then **retry** as continue-unfinished, same as crash-before-commit) |
| `SHORT_ITER_SEC` | `30` | Agent wall-clock under this counts toward token-exhaustion streak |
| `SHORT_STREAK_LIMIT` | `3` | Consecutive short runs before the loop halts |
| `--token-budget-m` (CLI) | unset | Cap this run at *n* million tokens (all usage kinds); not persisted |
| `--last-completed` (CLI) | unset | Rewrite `iteration-count` so the next iter is *n*+1 (retry a crashed cadence slot) |
| `--continue-unfinished` (CLI) | unset | Allow dirty tree; next iter finishes leftover work and **ignores** `n%10` audit |
| `--next-prompt` (CLI) | unset | Extra prompt file for the next iter only (consumed) |
| `--next-mode` (CLI) | inferred | `port` or `audit` for a continue-unfinished iter |
| `LOOP_CONTINUE_UNFINISHED` | `0` | Same as `--continue-unfinished` |
| `LOOP_NEXT_PROMPT` | unset | Path copied like `--next-prompt` |
| `LOOP_NEXT_MODE` | unset | Same as `--next-mode` |
| `LOOP_CADENCE_EVERY` | `10` | Review + full-suite score when `n % this == 0` |
| `LOOP_MAX_JS_INSERTIONS` | `600` | Halt+revert if a port iter exceeds this `js/` insertion count |
| `LOOP_MAX_JS_FILES` | `10` | Halt+revert if a port iter touches more `js/` files |
| `LOOP_QUEUE_MIN` | `8` | Agent must refill Open when live `- [ ]` count is below this |
| `LOOP_QUEUE_TARGET` | `12` | Refill up to about this many open rows |
| `LOOP_PUSH` | `1` | Supervisor `git push origin HEAD` after gates |
| `LOOP_FAIL_CLOSED` | `1` | `0` restores warn-and-continue (debug only) |
| `LOOP_PREFLIGHT_ONLY` | `0` | Set `1` to test lock/model/green gates, then exit |
| `LOOP_SLEEP_SEC` | `2` | Pause between iterations |
| `STOP_FILE` | `$ROOT/STOP_AGENT_LOOP.md` | Stop latch path |
| `HUMAN_NEXT_PROMPT` | `$ROOT/NEXT_AGENT_PROMPT.md` | Gitignored extra prompt for the next iter (consumed) |
| `CONTINUE_LATCH` | `$LOG_DIR/continue-unfinished` | One-shot continue mode (`port`/`audit`) |
| `ITER_COUNT_FILE` | `$LOG_DIR/iteration-count` | Monotonic global iteration counter |
| `PROMPT_FILE` | `$ROOT/scripts/agent-port-loop.prompt.md` | Port prompt body |
| `CONTINUE_PROMPT_FILE` | `$ROOT/scripts/agent-port-loop.continue.prompt.md` | Continue-unfinished prompt |
| `LOG_DIR` | `$ROOT/.agent-port-loop-logs` | Log directory |

## Loop observer

Browser conversation view of the current (or a recent) iter `.raw`
stream. For `--muse`, the observer follows the on-disk Muse
`session.jsonl` (thoughts + tool args) once the session id is known;
stdout `.raw` is the fallback. Zero-dep; localhost only. Full usage:
`loop-observer/README.md`.

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

1. `agent login` (once) so `--list-models` / runs work. For `--muse`: `muse login`.
2. Clean committed tree (or continue-unfinished leftover). Queue below 8 open items is refilled in-loop.
3. `AGENT_FORCE=1 ./scripts/agent-port-loop.sh` — or add `--muse` for Muse.
4. Watch the live tee, or `npm run observe-loop` (see **Loop observer**
   above). Halt reason: `last-halt-reason.txt`.
5. To stop after the active iteration: `echo 1 > STOP_AGENT_LOOP.md`.
6. After a crash-before-commit the supervisor **retries in-process**
   (continue latch + cited `.log`/`.raw` + resume brief). A provider
   quota error (`ActionRequiredError` / "out of usage") halts instead,
   leftover kept: relaunch with `--continue-unfinished` once usage
   resets. Write `STOP_AGENT_LOOP.md=1` to stop between attempts. After
   a clean stop, inspect `git log`, Notes, `CURRENT.md`, queue, and
   journal. To read what a dead iteration did:
   `node scripts/loop-resume-brief.mjs .agent-port-loop-logs/iter-NNNN-*.raw --max-lines 600`.

## Failure modes

| Symptom | Likely cause |
|---------|----------------|
| `neither cursor-agent nor agent found` | Install CLI / fix PATH |
| `muse binary not found` | Install Muse / fix PATH, or set `MUSE_BIN` |
| Auth errors | `agent login` (Cursor) or `muse login` (Muse) |
| `Workspace Trust Required` | Loop defaults to `--trust`; upgrade CLI or set `AGENT_TRUST=1` |
| banned-pattern (DIAG/FORCE/seed gate) | **Continue** (unpushed → revert this iter; already pushed → heal prompt, next iter strips hits). Does **not** write STOP |
| density / protected | **HALT + revert** (unless already pushed — then halt, no reset) |
| `N consecutive agent runs <30s` | Out of tokens / auth — halt (no reset; a leftover and its latch survive) |
| `ActionRequiredError` / "You're out of usage" | Provider plan quota — halt at once, leftover + latch kept; relaunch with `--continue-unfinished` after the reset (#2238) |
| Token budget reached | Expected clean exit after an iteration when `--token-budget-m` is set |
| `3× consecutive missing usage` | stream-json / Muse JSONL had no usage — halt. Muse needs the on-disk `session.jsonl` (do not set `MUSE_NO_SESSION_LOG=1` with a budget) |
| Green / full suite fail | Warn and continue; next iteration recovers. Preflight green at **launch** still refuses to start (except continue-unfinished, which warns and starts) |
| Loop ignores STOP | Content not exactly `1` after trim, or flip during an agent run (waits until iter ends) |
| Agent repeats dead ends | Notes/queue handoff failed — fix durable memory |
| Agent spends >20 min on a level-gen owner with no C measurement (#2262) | Symptom owner ≠ writer; playbook §7 / prompt now require `geom-probe.mjs` by call ~40. Kill it, run the probe yourself, paste its output into `NEXT_AGENT_PROMPT.md` |
| `connection: reconnecting` mid-iteration, retry with `checkpoint_turn_count: 1` | The retry may drop visible context and the agent re-derives (#2262 lost ~5 min). Not handled yet — proposal: on reconnect, write a resume brief (`loop-resume-brief.mjs`) into `NEXT_AGENT_PROMPT.md` |
| Agent `git push` then density/authority fail | Halt without reset; human reverts origin |
| Agent `git push` then banned-pattern hit | Continue; next iter gets a heal prompt and strips the hits |
| Agent `git push` then green/suite FAIL | Continue; next iter recovers |
| Port / audit `resource_exhausted` before commit | Supervisor **retries** the same `#` as continue-unfinished (cites that iter `.log`/`.raw` + resume brief); does **not** exit. 3× short runs still halt (tree kept) |
| Uncommitted `js/` or `reviews/` after the agent returns | Same in-process retry, keep tree |
| Docs-only park of a queue row (Open `- [ ]` moved to **Parked**, no `js/`) | **Continue** — not an empty-port halt. Supervisor commits leftover park docs if the agent forgot. Do not `finish-iteration` |
| Empty port (no `js/` and no Parked-row move) | **HALT + revert** (unless already pushed — then halt, no reset). This is the “spun, shipped nothing” case (#2278 wiped an uncommitted park) |
| Dirty tree at start | Loop refuses to launch, unless a continue latch is armed (`--continue-unfinished`, crash leftover, or dirty tree + `NEXT_AGENT_PROMPT.md`) |
| QUALITY-RISK with no Must-fix | Review did nothing — halt+revert (or halt if pushed) |
| Queue empty after port | Agent failed to refill from the map — halt |

The shell parses `__RESULTS_JSON__` (the frozen runner exits 0 on FAIL),
enforces density, one-loop locking, protected-path hashes, finite
iteration time, and a diff-based banned-pattern scan. Automatic halt
writes `STOP_AGENT_LOOP.md=1`. Green / full-suite FAIL and
banned-pattern hits do **not** halt. `LOOP_FAIL_CLOSED=0` restores
warn-and-continue for the remaining fail-closed gates (debugging only).

## Relation to in-chat `/loop`

Cursor’s in-session `/loop` skill re-wakes the **same** chat. This script is
for **out-of-band CLI** overnight peels with explicit stop-file control and
per-iteration log files.
