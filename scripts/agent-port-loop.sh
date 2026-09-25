#!/usr/bin/env bash
# agent-port-loop.sh — repeatedly continue the port until human stop,
# token-budget exhaustion, Muse/Claude plan-usage thresholds, short-run
# streak, or missing-usage streak.
#
# Crash / resource_exhausted before commit: keep the tree, arm
# continue-unfinished (cite that iter's .raw/.log + a resume brief),
# rewind n, retry in this run. Self-heal (2026-09-16): a provider quota
# error or 3 short runs WAITS for the plan window (poll, max 10 h) instead
# of halting; density → iteration undone (reset, or forward revert when
# pushed) + overlay; protected authority files → restored + overlay (3 in
# a row halts); review/audit js/ → kept + warn. Empty ports (unless a
# Parked-row move or a popped [measure] row), an empty queue after port, and QUALITY-RISK/REJECT
# reviews without a Must-fix row warn and arm a next-iter overlay instead
# of halting. Overlays are mode-tagged; port-only ones skip audits.
# Banned-pattern hits do not write STOP: revert if unpushed, else arm
# a next-iter heal prompt.
# Stop: write "1" into STOP_AGENT_LOOP.md.
# Design + usage: docs/AGENT-PORT-LOOP.md
#
# Token budget (optional, this run only — not persisted):
#   ./scripts/agent-port-loop.sh --token-budget-m 50
#   AGENT_FORCE=1 ./scripts/agent-port-loop.sh --muse --token-budget-m 50
#   AGENT_FORCE=1 ./scripts/agent-port-loop.sh --claude --token-budget-m 50
# Crash leftover: supervisor retries in-process (continue prompt + prior
# .raw/.log). Or --continue-unfinished / NEXT_AGENT_PROMPT.md on relaunch.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

usage() {
  cat <<'EOF'
Usage: ./scripts/agent-port-loop.sh [options]

Options:
  --token-budget-m <n>  Halt after this run's cumulative agent usage reaches
                        n million tokens (all kinds: input/output/cache).
                        Fractions OK (e.g. 2.5 → 2_500_000). Not persisted
                        across supervisor launches. Last in-flight iteration
                        may overshoot; the loop stops before starting another.
  --last-completed <n>  Pretend the last finished global iteration was n
                        (writes iteration-count). Next iter is n+1. Use to
                        retry a cadence slot that crashed before commit
                        (e.g. 1464 → next is audit #1465). Must be >= the
                        iter-*.log file count (that count is still a floor).
  --continue-unfinished Allow a dirty tree and force the next iteration to
                        finish leftover work (port unless --next-mode).
                        Ignores n%LOOP_CADENCE_EVERY (audit is skipped for
                        that one global #). Also armed automatically when
                        an agent crashes before commit; the supervisor
                        retries in-process (does not exit).
  --next-prompt <file>  Extra prompt text for the next iteration only
                        (copied into the log dir). With --continue-unfinished
                        or a continue latch, appended to the continue
                        prompt; otherwise appended to the normal port/audit
                        prompt. Same as gitignored NEXT_AGENT_PROMPT.md.
  --next-mode <mode>    port|audit — mode for a continue-unfinished iter
                        (default: infer from dirty js/ vs reviews/).
  --muse                Use Muse (`muse exec --json`) instead of
                        cursor-agent. Model defaults to
                        muse-spark-1.3-contributor at --reasoning-effort
                        xhigh. AGENT_FORCE=1 maps to --yolo. Observer, token
                        budget, and resume-brief read the same iter-*.raw.
                        After a finished iter, stop (exit 0, keep the
                        commit) if Meta plan window >= 97% or weekly >= 99%
                        (same snapshot as TUI /usage; env overrides below).
  --claude              Use Claude Code (`claude -p --output-format
                        stream-json --verbose`). Model defaults to
                        claude-opus-5 at --effort high. AGENT_FORCE=1 maps
                        to --dangerously-skip-permissions. Mutually exclusive
                        with --muse. Observer reads the same iter-*.raw
                        (stdout only; stderr is iter-*.err).
                        After a finished iter, stop (exit 0, keep the
                        commit) if current session >= 90% or weekly >= 95%
                        (same snapshot as `claude -p /usage`; env below).
  -h, --help            Show this help.

Environment knobs (unchanged): MODEL, AGENT_FORCE, AGENT_TRUST, …
Muse knobs: MUSE_BIN, MUSE_REASONING_EFFORT, MUSE_NO_SESSION_LOG, LOOP_MUSE,
MUSE_PLAN_WINDOW_STOP_PCT (97), MUSE_PLAN_WEEKLY_STOP_PCT (99),
MUSE_PLAN_USAGE_SKIP=1 to disable the post-iter /usage probe.
Claude knobs: CLAUDE_BIN, CLAUDE_EFFORT (low|medium|high|xhigh|max),
LOOP_CLAUDE, CLAUDE_NO_PARTIAL=1 to skip --include-partial-messages,
CLAUDE_PLAN_WINDOW_STOP_PCT (90), CLAUDE_PLAN_WEEKLY_STOP_PCT (95),
CLAUDE_PLAN_USAGE_SKIP=1 to disable the post-iter `claude -p /usage` probe.
Self-healing (default): density → iteration undone (reset --hard, or a
forward git revert + push when already on origin) and the next port iter
told to split; protected authority files → restored from before_head and
committed; both continue (halt only on a revert conflict or 3 authority
violations in a row). Green / full-suite regression,
banned-pattern hits, empty ports, empty queue after port, and
QUALITY-RISK/REJECT without Must-fix are logged; the loop continues so
the next iteration can recover (unpushed ban → revert; pushed ban → heal
prompt; review debt → must-fix overlay).
Every LOOP_CADENCE_EVERY (10) is review + full-suite score (no port).
Crash-before-commit keeps the tree, arms continue-unfinished (with
that iter's .raw/.log), rewinds n, and **retries in this supervisor
run** even if that global # is n%LOOP_CADENCE_EVERY==0. Does not write STOP. 3× short
runs still halt (out of tokens; tree kept). A provider quota error
(ActionRequiredError / "out of usage") halts at once with the latch
armed — relaunch with --continue-unfinished. The continue overlay
carries a resume brief (scripts/loop-resume-brief.mjs over the prior
.raw). Queue below LOOP_QUEUE_MIN (8) asks for a refill of
evidence-carrying rows only (LOOP-QUEUE.md header: corpus owners, park-named
writers, [campaign] steps, [measure] rows — never map/debt/TOP30 copies;
target LOOP_QUEUE_TARGET 12); halt after a port that still has no
open items. Agents commit and push; the script fail-closes and pushes
if they forgot. STOP_AGENT_LOOP.md is gitignored; only this script
writes 0, at launch.
See docs/AGENT-PORT-LOOP.md.
EOF
}

# --- CLI (parsed before lock so --help is cheap) ---
TOKEN_BUDGET_M=""
LAST_COMPLETED=""
CONTINUE_CLI="${LOOP_CONTINUE_UNFINISHED:-0}"
NEXT_PROMPT_SRC="${LOOP_NEXT_PROMPT:-}"
NEXT_MODE_CLI="${LOOP_NEXT_MODE:-}"
USE_MUSE="${LOOP_MUSE:-0}"
USE_CLAUDE="${LOOP_CLAUDE:-0}"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --token-budget-m)
      TOKEN_BUDGET_M="${2:?error: --token-budget-m needs a value}"
      shift 2
      ;;
    --last-completed)
      LAST_COMPLETED="${2:?error: --last-completed needs a value}"
      if [[ ! "$LAST_COMPLETED" =~ ^[0-9]+$ ]]; then
        echo "error: --last-completed must be a non-negative integer" >&2
        exit 2
      fi
      shift 2
      ;;
    --continue-unfinished)
      CONTINUE_CLI=1
      shift
      ;;
    --next-prompt)
      NEXT_PROMPT_SRC="${2:?error: --next-prompt needs a file path}"
      shift 2
      ;;
    --next-mode)
      NEXT_MODE_CLI="${2:?error: --next-mode needs port or audit}"
      if [[ "$NEXT_MODE_CLI" != "port" && "$NEXT_MODE_CLI" != "audit" ]]; then
        echo "error: --next-mode must be port or audit (got ${NEXT_MODE_CLI})" >&2
        exit 2
      fi
      shift 2
      ;;
    --muse)
      USE_MUSE=1
      shift
      ;;
    --claude)
      USE_CLAUDE=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "error: unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done
if [[ -n "$NEXT_MODE_CLI" && "$NEXT_MODE_CLI" != "port" && "$NEXT_MODE_CLI" != "audit" ]]; then
  echo "error: LOOP_NEXT_MODE / --next-mode must be port or audit" >&2
  exit 2
fi
if [[ -n "$NEXT_PROMPT_SRC" && ! -f "$NEXT_PROMPT_SRC" ]]; then
  echo "error: --next-prompt file not found: $NEXT_PROMPT_SRC" >&2
  exit 2
fi
if [[ "$USE_MUSE" == "1" && "$USE_CLAUDE" == "1" ]]; then
  echo "error: --muse and --claude are mutually exclusive" >&2
  exit 2
fi

TOKEN_BUDGET=0
TOKENS_USED=0
MISSING_USAGE_STREAK=0
MISSING_USAGE_LIMIT=3
EXTRACT_USAGE="$ROOT/scripts/extract-agent-usage.mjs"
EXTRACT_LOG="$ROOT/scripts/extract-agent-log.mjs"
MUSE_PLAN_USAGE="$ROOT/scripts/muse-plan-usage.mjs"
CLAUDE_PLAN_USAGE="$ROOT/scripts/claude-plan-usage.mjs"

if [[ -n "$TOKEN_BUDGET_M" ]]; then
  TOKEN_BUDGET="$(node --input-type=module -e '
const raw = String(process.argv[1] ?? "").trim().replace(/_/g, "");
const n = Number(raw);
if (!Number.isFinite(n) || n <= 0) {
  console.error("error: --token-budget-m must be a positive number (millions)");
  process.exit(2);
}
process.stdout.write(String(Math.floor(n * 1_000_000)));
' "$TOKEN_BUDGET_M")" || exit 2
fi

STOP_FILE="${STOP_FILE:-$ROOT/STOP_AGENT_LOOP.md}"
LOG_DIR="${LOG_DIR:-$ROOT/.agent-port-loop-logs}"
mkdir -p "$LOG_DIR"
# Global monotonic iteration counter (survives loop restarts).
ITER_COUNT_FILE="${ITER_COUNT_FILE:-$LOG_DIR/iteration-count}"
# One-shot continue latch (gitignored via LOG_DIR). Crash-before-commit
# writes this and retries the same global # in this supervisor run
# (even if that # would have been an audit).
CONTINUE_LATCH="${CONTINUE_LATCH:-$LOG_DIR/continue-unfinished}"
NEXT_ITER_PROMPT="${NEXT_ITER_PROMPT:-$LOG_DIR/next-iter.prompt.md}"
NEXT_ITER_CONTEXT="${NEXT_ITER_CONTEXT:-$LOG_DIR/next-iter.context.md}"
HUMAN_NEXT_PROMPT="${HUMAN_NEXT_PROMPT:-$ROOT/NEXT_AGENT_PROMPT.md}"
CONTINUE_PROMPT_FILE="${CONTINUE_PROMPT_FILE:-$ROOT/scripts/agent-port-loop.continue.prompt.md}"

# Only one loop may mutate this checkout. Acquire the lock before resetting the
# stop latch so a mistaken second launch cannot restart an existing loop.
LOCK_DIR="${LOCK_DIR:-$LOG_DIR/.lock}"
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  # A killed terminal skips the EXIT trap and leaves the lock behind; reclaim
  # it only when its pid is gone or now belongs to some other program.
  lock_pid="$(cat "$LOCK_DIR/pid" 2>/dev/null || true)"
  if [[ -z "$lock_pid" ]] \
    || ps -p "$lock_pid" -o command= 2>/dev/null | grep -q 'agent-port-loop'; then
    echo "error: agent port loop already running (pid ${lock_pid:-unknown}, lock: $LOCK_DIR)" >&2
    exit 1
  fi
  echo "warning: removing stale lock $LOCK_DIR (pid $lock_pid is not a running loop)" >&2
  rm -rf "$LOCK_DIR"
  if ! mkdir "$LOCK_DIR" 2>/dev/null; then
    echo "error: agent port loop already running (lock: $LOCK_DIR)" >&2
    exit 1
  fi
fi
printf '%s\n' "$$" >"$LOCK_DIR/pid"
cleanup() { rm -rf "$LOCK_DIR"; }
trap cleanup EXIT

# Fresh stop latch every successful launch. File is gitignored so a
# loop-agent `git reset --hard` cannot restore a tracked 0.
printf '0\n' >"$STOP_FILE"

infer_continue_mode() {
  if [[ -n "$(git status --porcelain -- js)" ]]; then
    echo port
  elif [[ -n "$(git status --porcelain -- reviews)" ]]; then
    echo audit
  else
    echo port
  fi
}

write_continue_context() {
  local reason="$1"
  local raw="${2:-}"
  local log="${3:-}"
  {
    echo "## Worktree at latch (this leftover is the cluster)"
    echo
    echo "Reason: $reason"
    echo "Time: $(date -Iseconds)"
    echo "HEAD: $(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
    if [[ -n "$raw" || -n "$log" ]]; then
      echo
      echo "### Previous agent stream (resume from here; do not paste into js/)"
      echo
      echo "Read the human extract first, then the last assistant text / errors"
      echo "in the raw stream-json if you need more. Pick up that work; do not"
      echo "start a new cluster."
      echo
      if [[ -n "$log" ]]; then
        echo "- extract: \`$log\`"
      fi
      if [[ -n "$raw" ]]; then
        echo "- raw: \`$raw\`"
      fi
      if [[ -n "$raw" && -f "$raw" && -f "$ROOT/scripts/loop-resume-brief.mjs" ]]; then
        # The extract only carries [tool] started/completed markers; the
        # brief carries what the previous agent read, edited, ran and saw.
        echo
        echo "### Resume brief (generated from the raw stream — start here, not from the extract)"
        echo
        echo '```'
        node "$ROOT/scripts/loop-resume-brief.mjs" "$raw" --max-lines 200 2>/dev/null \
          || echo "(brief unavailable — run: node scripts/loop-resume-brief.mjs $raw)"
        echo '```'
      fi
    fi
    echo
    echo '### git status --short'
    echo '```'
    git status --short
    echo '```'
    echo
    echo '### git diff --stat'
    echo '```'
    git diff --stat || true
    echo '```'
  } >"$NEXT_ITER_CONTEXT"
}

arm_continue_unfinished() {
  local mode="$1"
  local reason="$2"
  local raw="${3:-}"
  local log="${4:-}"
  if [[ "$mode" != "port" && "$mode" != "audit" ]]; then
    mode=port
  fi
  printf '%s\n' "$mode" >"$CONTINUE_LATCH"
  write_continue_context "$reason" "$raw" "$log"
}

# Crash / uncommitted leftover: keep the tree and arm a continue iter so
# the next attempt (same supervisor run, or next launch) finishes leftover
# work even if that # is n%LOOP_CADENCE_EVERY==0 (audit). Always arm — a clean tree still
# needs the prior .raw/.log (typical audit resource_exhausted).
arm_continue_retry() {
  local reason="$1"
  local ran_as="${2:-port}"
  local raw="${3:-}"
  local log="${4:-}"
  local m
  if [[ -n "$(git status --porcelain -- js)" ]]; then
    m=port
  elif [[ -n "$(git status --porcelain -- reviews)" ]]; then
    m=audit
  elif [[ "$ran_as" == "audit" || "$ran_as" == "review" || "$ran_as" == "cadence" ]]; then
    m=audit
  else
    m=port
  fi
  arm_continue_unfinished "$m" "$reason" "$raw" "$log"
}

if [[ -n "$NEXT_PROMPT_SRC" ]]; then
  cp "$NEXT_PROMPT_SRC" "$NEXT_ITER_PROMPT"
elif [[ -f "$HUMAN_NEXT_PROMPT" ]]; then
  cp "$HUMAN_NEXT_PROMPT" "$NEXT_ITER_PROMPT"
fi

if [[ "$CONTINUE_CLI" == "1" ]]; then
  if [[ -z "$(git status --porcelain)" && ! -f "$NEXT_ITER_PROMPT" && ! -f "$CONTINUE_LATCH" ]]; then
    echo "error: --continue-unfinished needs a dirty tree, a continue latch, or --next-prompt / NEXT_AGENT_PROMPT.md" >&2
    exit 1
  fi
  arm_mode="${NEXT_MODE_CLI:-}"
  if [[ -z "$arm_mode" ]]; then
    if [[ -f "$CONTINUE_LATCH" ]]; then
      arm_mode="$(tr -d '[:space:]' <"$CONTINUE_LATCH")"
    else
      arm_mode="$(infer_continue_mode)"
    fi
  fi
  arm_continue_unfinished "$arm_mode" "CLI --continue-unfinished"
elif [[ -f "$CONTINUE_LATCH" ]]; then
  write_continue_context "relaunch with existing continue latch"
fi

dirty="$(git status --porcelain)"
if [[ -n "$dirty" ]]; then
  if [[ ! -f "$CONTINUE_LATCH" && -f "$NEXT_ITER_PROMPT" ]]; then
    arm_continue_unfinished "${NEXT_MODE_CLI:-$(infer_continue_mode)}" \
      "dirty tree + next-iter / NEXT_AGENT_PROMPT.md extra prompt"
  fi
  if [[ -f "$CONTINUE_LATCH" ]]; then
    echo "warning: dirty worktree allowed (continue-unfinished latch; leftover is the next cluster):" >&2
    printf '%s\n' "$dirty" >&2
  else
    echo "error: dirty worktree; commit or stash before launching the unattended loop" >&2
    echo "       or pass --continue-unfinished / write NEXT_AGENT_PROMPT.md (gitignored) to finish leftover work:" >&2
    printf '%s\n' "$dirty" >&2
    exit 1
  fi
fi

# Default: Grok 4.7 Extra High, non-fast.
# CLI id is grok-4.7-xhigh (no cursor- prefix; 4.6 still uses cursor-grok-4.6-*).
# (list: agent --list-models | rg grok)
# --muse: Muse spark contributor at reasoning-effort xhigh.
# --claude: Claude Opus 5 at --effort high.
if [[ "$USE_MUSE" == "1" ]]; then
  MODEL="${MODEL:-muse-spark-1.3-contributor}"
elif [[ "$USE_CLAUDE" == "1" ]]; then
  MODEL="${MODEL:-claude-opus-5}"
else
  MODEL="${MODEL:-muse-spark-1.3-max}"
fi
# Advisory navigation overlay (see arm_nav_discipline_prompt). 1 disables.
LOOP_NAV_GATE_OFF="${LOOP_NAV_GATE_OFF:-0}"
AGENT_BIN="${AGENT_BIN:-}"
MUSE_REASONING_EFFORT="${MUSE_REASONING_EFFORT:-xhigh}"
MUSE_EXTRA=()
CLAUDE_EFFORT="${CLAUDE_EFFORT:-high}"
CLAUDE_EXTRA=()
if [[ "$USE_MUSE" == "1" ]]; then
  if [[ ! "$MUSE_REASONING_EFFORT" =~ ^(none|minimal|low|medium|high|xhigh|max|ultra)$ ]]; then
    echo "error: MUSE_REASONING_EFFORT must be none|minimal|low|medium|high|xhigh|max|ultra (got ${MUSE_REASONING_EFFORT})" >&2
    exit 2
  fi
  AGENT_BIN="${MUSE_BIN:-muse}"
  if ! command -v "$AGENT_BIN" >/dev/null 2>&1; then
    echo "error: muse binary not found on PATH (${AGENT_BIN})" >&2
    echo "       install Muse, or set MUSE_BIN=/path/to/muse" >&2
    exit 1
  fi
  if [[ "${AGENT_FORCE:-0}" == "1" ]]; then
    MUSE_EXTRA+=(--yolo)
  elif [[ "${AGENT_TRUST:-1}" == "1" ]]; then
    MUSE_EXTRA+=(--trust-workspace)
  fi
  if [[ "${MUSE_NO_SESSION_LOG:-0}" == "1" ]]; then
    MUSE_EXTRA+=(--no-session-log)
  fi
elif [[ "$USE_CLAUDE" == "1" ]]; then
  if [[ ! "$CLAUDE_EFFORT" =~ ^(low|medium|high|xhigh|max)$ ]]; then
    echo "error: CLAUDE_EFFORT must be low|medium|high|xhigh|max (got ${CLAUDE_EFFORT})" >&2
    exit 2
  fi
  AGENT_BIN="${CLAUDE_BIN:-claude}"
  if ! command -v "$AGENT_BIN" >/dev/null 2>&1; then
    echo "error: claude binary not found on PATH (${AGENT_BIN})" >&2
    echo "       install Claude Code, or set CLAUDE_BIN=/path/to/claude" >&2
    exit 1
  fi
  CLAUDE_EXTRA+=(--permission-prompts none)
  if [[ "${AGENT_FORCE:-0}" == "1" ]]; then
    CLAUDE_EXTRA+=(--dangerously-skip-permissions --permission-mode bypassPermissions)
  else
    CLAUDE_EXTRA+=(--permission-mode auto)
  fi
elif [[ -z "$AGENT_BIN" ]]; then
  if command -v cursor-agent >/dev/null 2>&1; then
    AGENT_BIN="cursor-agent"
  elif command -v agent >/dev/null 2>&1; then
    AGENT_BIN="agent"
  else
    echo "error: neither cursor-agent nor agent found on PATH" >&2
    exit 1
  fi
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
MASTER_LOG="$LOG_DIR/loop-$STAMP.log"

# Headless -p requires workspace trust; --force/yolo remains explicit opt-in.
TRUST_ARGS=()
if [[ "${AGENT_TRUST:-1}" == "1" ]]; then
  TRUST_ARGS+=(--trust)
fi
FORCE_ARGS=()
if [[ "${AGENT_FORCE:-0}" == "1" ]]; then
  FORCE_ARGS+=(--force)
fi
# text = final narrative only (hides tool denials). stream-json keeps tool events.
# Muse always emits JSONL (--json); observer + token budget require it.
OUTPUT_FORMAT="${AGENT_OUTPUT_FORMAT:-stream-json}"
JSONL_LOGS=0
if [[ "$USE_MUSE" == "1" ]]; then
  OUTPUT_FORMAT="muse-jsonl"
  JSONL_LOGS=1
elif [[ "$USE_CLAUDE" == "1" ]]; then
  OUTPUT_FORMAT="stream-json"
  JSONL_LOGS=1
elif [[ "$OUTPUT_FORMAT" == "stream-json" || "$OUTPUT_FORMAT" == "json" ]]; then
  JSONL_LOGS=1
fi
# Token budget metering needs usage on stream-json result events.
if (( TOKEN_BUDGET > 0 )) && [[ "$USE_MUSE" != "1" ]] && [[ "$OUTPUT_FORMAT" != "stream-json" && "$OUTPUT_FORMAT" != "json" ]]; then
  echo "warning: --token-budget-m requires stream-json/json; overriding AGENT_OUTPUT_FORMAT=$OUTPUT_FORMAT → stream-json" \
    | tee -a "$MASTER_LOG"
  OUTPUT_FORMAT="stream-json"
  JSONL_LOGS=1
fi
# 2026-09-18 breadth phase: whole-function ports (200–800 js/ lines) need
# more wall time and a higher density cap than one-arm peels did.
ITERATION_TIMEOUT_SEC="${ITERATION_TIMEOUT_SEC:-5400}"
GIT_FETCH_TIMEOUT_SEC="${GIT_FETCH_TIMEOUT_SEC:-30}"
LOOP_PROGRESS_INTERVAL_SEC="${LOOP_PROGRESS_INTERVAL_SEC:-30}"
LOOP_PROGRESS="${LOOP_PROGRESS:-1}"
# Token-exhaustion detector: N consecutive agent runs shorter than this → halt.
SHORT_ITER_SEC="${SHORT_ITER_SEC:-30}"
SHORT_STREAK_LIMIT="${SHORT_STREAK_LIMIT:-3}"
LOOP_CADENCE_EVERY="${LOOP_CADENCE_EVERY:-10}"
LOOP_MAX_JS_INSERTIONS="${LOOP_MAX_JS_INSERTIONS:-1500}"
LOOP_MAX_JS_FILES="${LOOP_MAX_JS_FILES:-15}"
LOOP_PUSH="${LOOP_PUSH:-1}"
LOOP_FAIL_CLOSED="${LOOP_FAIL_CLOSED:-1}"
LOOP_QUEUE_MIN="${LOOP_QUEUE_MIN:-8}"
LOOP_QUEUE_TARGET="${LOOP_QUEUE_TARGET:-12}"
REVIEW_PROMPT_FILE="${REVIEW_PROMPT_FILE:-$ROOT/scripts/agent-port-loop.review.prompt.md}"
CADENCE_PROMPT_FILE="${CADENCE_PROMPT_FILE:-$ROOT/scripts/agent-port-loop.cadence.prompt.md}"
QUEUE_FILE="${QUEUE_FILE:-$ROOT/docs/LOOP-QUEUE.md}"
REQUIRE_PASS="$ROOT/scripts/loop-require-results-pass.mjs"
ARCHIVE_QUEUE="$ROOT/scripts/archive-loop-queue-done.mjs"
PORT_DID_PARK="$ROOT/scripts/port-did-park.mjs"
ROTATE_JOURNAL="$ROOT/scripts/rotate-journal.mjs"
CHECK_HOT_DOCS="$ROOT/scripts/check-hot-docs.mjs"

PROMPT_FILE="${PROMPT_FILE:-$ROOT/scripts/agent-port-loop.prompt.md}"
if [[ ! -f "$PROMPT_FILE" ]]; then
  echo "error: missing prompt file: $PROMPT_FILE" >&2
  exit 1
fi
if [[ ! -f "$REVIEW_PROMPT_FILE" ]]; then
  echo "error: missing review prompt: $REVIEW_PROMPT_FILE" >&2
  exit 1
fi
if [[ ! -f "$CADENCE_PROMPT_FILE" ]]; then
  echo "error: missing cadence prompt: $CADENCE_PROMPT_FILE" >&2
  exit 1
fi
if [[ ! -f "$CONTINUE_PROMPT_FILE" ]]; then
  echo "error: missing continue prompt: $CONTINUE_PROMPT_FILE" >&2
  exit 1
fi
if [[ ! -f "$REQUIRE_PASS" ]]; then
  echo "error: missing $REQUIRE_PASS" >&2
  exit 1
fi
if [[ ! -f "$ARCHIVE_QUEUE" ]]; then
  echo "error: missing $ARCHIVE_QUEUE" >&2
  exit 1
fi
if [[ ! -f "$PORT_DID_PARK" ]]; then
  echo "error: missing $PORT_DID_PARK" >&2
  exit 1
fi
if [[ ! -f "$ROTATE_JOURNAL" ]]; then
  echo "error: missing $ROTATE_JOURNAL" >&2
  exit 1
fi
if [[ ! -f "$CHECK_HOT_DOCS" ]]; then
  echo "error: missing $CHECK_HOT_DOCS" >&2
  exit 1
fi
if [[ ! -f "$QUEUE_FILE" ]]; then
  echo "error: missing work queue: $QUEUE_FILE" >&2
  exit 1
fi
if (( TOKEN_BUDGET > 0 )) && [[ ! -f "$EXTRACT_USAGE" ]]; then
  echo "error: missing usage extractor: $EXTRACT_USAGE" >&2
  exit 1
fi
if [[ ! -f "$EXTRACT_LOG" ]]; then
  echo "error: missing log extractor: $EXTRACT_LOG" >&2
  exit 1
fi

should_stop() {
  local v
  v="$(tr -d '[:space:]' <"$STOP_FILE" 2>/dev/null || echo 0)"
  [[ "$v" == "1" ]]
}

now_epoch() {
  date +%s
}

token_budget_active() {
  (( TOKEN_BUDGET > 0 ))
}

token_budget_exceeded() {
  token_budget_active && (( TOKENS_USED >= TOKEN_BUDGET ))
}

# After at least one agent return this run: PTY-drive Muse TUI `/usage`
# and exit 0 if the current window or weekly cap is hit. Fail-open on a
# probe error so a TUI glitch does not kill the supervisor.
exit_if_muse_plan_quota() {
  [[ "$USE_MUSE" == "1" ]] || return 0
  [[ "${MUSE_PLAN_USAGE_SKIP:-0}" == "1" ]] && return 0
  [[ -f "$MUSE_PLAN_USAGE" ]] || return 0
  local json rc stop summary
  set +e
  json="$(MUSE_BIN="${MUSE_BIN:-${AGENT_BIN:-muse}}" node "$MUSE_PLAN_USAGE")"
  rc=$?
  set -e
  if [[ "$rc" -ne 0 || -z "$json" ]]; then
    echo "$(date -Iseconds) warning: muse plan-usage probe failed (rc=${rc}); continuing" \
      | tee -a "$MASTER_LOG"
    return 0
  fi
  echo "$(date -Iseconds) ${json}" | tee -a "$MASTER_LOG"
  stop="$(node -e 'const j=JSON.parse(process.argv[1]); process.stdout.write(j.shouldStop?"1":"0")' "$json" 2>/dev/null || echo 0)"
  if [[ "$stop" != "1" ]]; then
    return 0
  fi
  summary="$(node -e 'const j=JSON.parse(process.argv[1]); process.stdout.write(String(j.stopReason||j.summary||"muse plan usage threshold"))' "$json")"
  echo "$(date -Iseconds) MUSE PLAN QUOTA: ${summary} — waiting for the window to reset (commit kept)" \
    | tee -a "$MASTER_LOG"
  wait_for_plan_quota "muse plan quota: ${summary}"
}

# Same idea for Claude Pro/Max: `claude -p "/usage"` after a finished
# iter. Defaults: current session window >= 90% or weekly >= 95%. Fail-open.
exit_if_claude_plan_quota() {
  [[ "$USE_CLAUDE" == "1" ]] || return 0
  [[ "${CLAUDE_PLAN_USAGE_SKIP:-0}" == "1" ]] && return 0
  [[ -f "$CLAUDE_PLAN_USAGE" ]] || return 0
  local json rc stop summary
  set +e
  json="$(CLAUDE_BIN="${CLAUDE_BIN:-${AGENT_BIN:-claude}}" node "$CLAUDE_PLAN_USAGE")"
  rc=$?
  set -e
  if [[ "$rc" -ne 0 || -z "$json" ]]; then
    echo "$(date -Iseconds) warning: claude plan-usage probe failed (rc=${rc}); continuing" \
      | tee -a "$MASTER_LOG"
    return 0
  fi
  echo "$(date -Iseconds) ${json}" | tee -a "$MASTER_LOG"
  stop="$(node -e 'const j=JSON.parse(process.argv[1]); process.stdout.write(j.shouldStop?"1":"0")' "$json" 2>/dev/null || echo 0)"
  if [[ "$stop" != "1" ]]; then
    return 0
  fi
  summary="$(node -e 'const j=JSON.parse(process.argv[1]); process.stdout.write(String(j.stopReason||j.summary||"claude plan usage threshold"))' "$json")"
  echo "$(date -Iseconds) CLAUDE PLAN QUOTA: ${summary} — waiting for the window to reset (commit kept)" \
    | tee -a "$MASTER_LOG"
  wait_for_plan_quota "claude plan quota: ${summary}"
}

# Parse one iteration raw stream; update TOKENS_USED / missing-usage streak.
record_iteration_tokens() {
  local raw_file="$1"
  token_budget_active || return 0

  local iter_json found total breakdown
  iter_json="$(node "$EXTRACT_USAGE" "$raw_file" 2>/dev/null || echo '{"found":false,"total":0,"breakdown":{}}')"
  found="$(node -e 'const j=JSON.parse(process.argv[1]); process.stdout.write(j.found?"1":"0")' "$iter_json")"
  total="$(node -e 'const j=JSON.parse(process.argv[1]); process.stdout.write(String(j.total??0))' "$iter_json")"
  [[ "$total" =~ ^[0-9]+$ ]] || total=0
  breakdown="$(node -e '
    const j=JSON.parse(process.argv[1]);
    const b=j.breakdown||{};
    process.stdout.write(Object.entries(b).map(([k,v])=>k+"="+v).join(" "));
  ' "$iter_json")"

  if [[ "$found" != "1" ]]; then
    MISSING_USAGE_STREAK=$((MISSING_USAGE_STREAK + 1))
    echo "warning: no usage in agent stream (streak ${MISSING_USAGE_STREAK}/${MISSING_USAGE_LIMIT}); raw=$raw_file" \
      | tee -a "$MASTER_LOG"
    return 0
  fi

  MISSING_USAGE_STREAK=0
  TOKENS_USED=$((TOKENS_USED + total))
  echo "tokens: +${total} (${breakdown:-?}) → ${TOKENS_USED} / ${TOKEN_BUDGET} (budget ${TOKEN_BUDGET_M}M)" \
    | tee -a "$MASTER_LOG"
}

# How many iteration artifacts already exist (each past run reused 0001…).
count_iters_from_logs() {
  local n=0
  shopt -s nullglob
  # Prefer .log; fall back to .raw basenames so a raw-only attempt still counts.
  local -a logs=( "$LOG_DIR"/iter-[0-9][0-9][0-9][0-9]-*.log )
  if (( ${#logs[@]} > 0 )); then
    n=${#logs[@]}
  else
    local -a raws=( "$LOG_DIR"/iter-[0-9][0-9][0-9][0-9]-*.raw )
    n=${#raws[@]}
  fi
  shopt -u nullglob
  echo "$n"
}

# Last completed/claimed global iteration number (0 if never run).
# Uses max(counter file, total historical iter logs) so restarted runs that
# reused 0001..N still contribute to the global total.
read_iter_count() {
  local v=0 from_file=0 from_logs
  if [[ -f "$ITER_COUNT_FILE" ]]; then
    v="$(tr -d '[:space:]' <"$ITER_COUNT_FILE" 2>/dev/null || echo 0)"
    [[ "$v" =~ ^[0-9]+$ ]] || v=0
    from_file=$v
  fi
  from_logs="$(count_iters_from_logs)"
  if (( from_logs > from_file )); then
    v=$from_logs
  else
    v=$from_file
  fi
  echo "$v"
}

write_iter_count() {
  local n="$1"
  printf '%s\n' "$n" >"$ITER_COUNT_FILE"
}

# Authority / fixture paths no loop agent may edit. One list: the
# fingerprint hashes it, and self_heal_restore_protected restores it.
PROTECTED_PATHS=(
  docs/CONSTITUTION.md
  docs/PORTING-RUNBOOK.md
  docs/GROK-PLAYBOOK.md
  docs/API.md
  docs/PHASES.md
  docs/PORTING-STRATEGY.md
  docs/AGENT-PORT-LOOP.md
  README.md
  .cursor/rules
  scripts/agent-port-loop.sh
  scripts/agent-port-loop.prompt.md
  scripts/agent-port-loop.review.prompt.md
  scripts/agent-port-loop.cadence.prompt.md
  scripts/agent-port-loop.continue.prompt.md
  scripts/loop-require-results-pass.mjs
  scripts/archive-loop-queue-done.mjs
  scripts/port-did-park.mjs
  scripts/check-hot-docs.mjs
  scripts/rotate-journal.mjs
  frozen
  sessions
  nethack-c/upstream
  nethack-c/patches
  js/isaac64.js
  js/terminal.js
  js/storage.js
)

protected_fingerprint() {
  node --input-type=module - "$ROOT" "${PROTECTED_PATHS[@]}" <<'NODE'
import { createHash } from 'node:crypto';
import {
  existsSync, lstatSync, readFileSync, readdirSync, readlinkSync,
} from 'node:fs';
import { join, relative } from 'node:path';

const root = process.argv[2];
const protectedPaths = process.argv.slice(3);
const hash = createHash('sha256');

function visit(path) {
  if (!existsSync(path)) {
    hash.update(`missing:${relative(root, path)}\0`);
    return;
  }
  const st = lstatSync(path);
  const rel = relative(root, path);
  if (st.isSymbolicLink()) {
    hash.update(`link:${rel}:${readlinkSync(path)}\0`);
  } else if (st.isDirectory()) {
    hash.update(`dir:${rel}\0`);
    for (const name of readdirSync(path).sort()) visit(join(path, name));
  } else {
    hash.update(`file:${rel}:${st.mode}\0`);
    hash.update(readFileSync(path));
  }
}
for (const rel of protectedPaths) visit(join(root, rel));
console.log(hash.digest('hex'));
NODE
}

# The frozen runner exits 0 even when sessions FAIL. Parse __RESULTS_JSON__.
run_session_gate() {
  local tmp="$1"
  shift
  node frozen/ps_test_runner.mjs "$@" 2>&1 | tee -a "$MASTER_LOG" "$tmp"
  node "$REQUIRE_PASS" "$tmp"
}

run_green_gate() {
  local tmp
  tmp="$(mktemp "$LOG_DIR/.green-XXXXXX")"
  if ! run_session_gate "$tmp" \
    sessions/seed8000-tourist-starter.session.json \
    sessions/seed0900-tourist-explore-actions.session.json
  then
    rm -f "$tmp"
    return 1
  fi
  rm -f "$tmp"
  node scripts/strict-output-check.mjs \
    sessions/seed8000-tourist-starter.session.json \
    sessions/seed0900-tourist-explore-actions.session.json \
    2>&1 | tee -a "$MASTER_LOG"
  return "${PIPESTATUS[0]}"
}

run_full_suite_gate() {
  local tmp
  tmp="$(mktemp "$LOG_DIR/.suite-XXXXXX")"
  if ! run_session_gate "$tmp" sessions; then
    rm -f "$tmp"
    return 1
  fi
  rm -f "$tmp"
  return 0
}

run_with_timeout_secs() {
  local timeout="$1"
  shift
  python3 -c '
import subprocess, sys
timeout = float(sys.argv[1])
proc = subprocess.Popen(sys.argv[2:])
try:
    raise SystemExit(proc.wait(timeout=timeout))
except subprocess.TimeoutExpired:
    proc.terminate()
    try:
        proc.wait(timeout=10)
    except subprocess.TimeoutExpired:
        proc.kill()
        proc.wait()
    print(f"timed out after {timeout:g}s", file=sys.stderr)
    raise SystemExit(124)
' "$timeout" "$@"
}

run_with_timeout() {
  run_with_timeout_secs "$ITERATION_TIMEOUT_SEC" "$@"
}

git_fetch_origin() {
  local timeout="${GIT_FETCH_TIMEOUT_SEC:-30}"
  if [[ "$timeout" == "0" ]]; then
    return 0
  fi
  echo "$(date -Iseconds) git fetch origin (timeout ${timeout}s)..." | tee -a "$MASTER_LOG"
  if ! run_with_timeout_secs "$timeout" git fetch origin >/dev/null 2>&1; then
    echo "$(date -Iseconds) warning: git fetch origin timed out or failed — continuing with local refs" \
      | tee -a "$MASTER_LOG"
  fi
}

# Heartbeat while the agent runs: the supervisor redirects all agent stdout
# to iter-*.raw, so the terminal would otherwise look frozen for minutes.
iter_progress_watcher() {
  local iter="$1"
  local raw="$2"
  local agent_pid="$3"
  local interval="${LOOP_PROGRESS_INTERVAL_SEC:-30}"
  local last_stats="" last_bytes=-1 tick=0
  while kill -0 "$agent_pid" 2>/dev/null; do
    sleep "$interval"
    tick=$((tick + 1))
    if [[ ! -f "$raw" ]]; then
      echo "$(date -Iseconds) [iter $iter] agent running, no raw output yet (${tick}×${interval}s)..." \
        | tee -a "$MASTER_LOG"
      continue
    fi
    local bytes
    bytes="$(wc -c <"$raw" | tr -d '[:space:]')"
    local stats
    stats="$(node "$EXTRACT_LOG" --denials "$raw" 2>/dev/null | head -1 || true)"
    if [[ -n "$stats" && "$stats" != "$last_stats" ]]; then
      echo "$(date -Iseconds) [iter $iter] $stats (${bytes} bytes raw)" | tee -a "$MASTER_LOG"
      last_stats="$stats"
      last_bytes=$bytes
    elif [[ "$bytes" == "$last_bytes" ]]; then
      echo "$(date -Iseconds) [iter $iter] no new output (${tick}×${interval}s, ${bytes} bytes raw)..." \
        | tee -a "$MASTER_LOG"
    else
      echo "$(date -Iseconds) [iter $iter] streaming (${bytes} bytes raw)..." | tee -a "$MASTER_LOG"
      last_bytes=$bytes
    fi
  done
}

# Run the agent under the iteration timeout with an optional progress watcher.
run_agent_iteration() {
  local iter="$1"
  local iter_raw="$2"
  shift 2
  echo "$(date -Iseconds) === agent exec starting ===" | tee -a "$MASTER_LOG"
  if [[ "$USE_CLAUDE" == "1" ]]; then
    local err_file="${iter_raw%.raw}.err"
    run_with_timeout "$@" >"$iter_raw" 2>"$err_file" &
  else
    run_with_timeout "$@" >"$iter_raw" 2>&1 &
  fi
  local agent_pid=$!
  local prog_pid=""
  if [[ "${LOOP_PROGRESS:-1}" == "1" ]]; then
    iter_progress_watcher "$iter" "$iter_raw" "$agent_pid" &
    prog_pid=$!
  fi
  local status=0
  wait "$agent_pid" || status=$?
  if [[ -n "$prog_pid" ]]; then
    kill "$prog_pid" 2>/dev/null || true
    wait "$prog_pid" 2>/dev/null || true
  fi
  if [[ "$USE_CLAUDE" == "1" ]]; then
    local err_file="${iter_raw%.raw}.err"
    if [[ -s "$err_file" ]]; then
      echo "$(date -Iseconds) note: Claude stderr → $err_file ($(wc -c <"$err_file" | tr -d '[:space:]') bytes)" \
        | tee -a "$MASTER_LOG"
    fi
  fi
  return "$status"
}

# Print banned-pattern hits vs $1 (js/ snapshot). Empty = clean.
# Word-bound DIAG/FORCE so C flags like FORCETRAP / FORCEBUNGLE pass.
dump_banned_hits() {
  local snapshot="$1"
  local rel old new delta
  while IFS= read -r new; do
    rel="${new#"$ROOT/js/"}"
    old="$snapshot/js/$rel"
    if [[ -f "$old" ]]; then
      delta="$(diff -U0 "$old" "$new" || true)"
    else
      delta="$(diff -U0 /dev/null "$new" || true)"
    fi
    if printf '%s\n' "$delta" \
      | rg -q '^\+[^+].*(\bDIAG\b|\bFORCE\b|seed[0-9]{4}|console\.(log|error|debug)|getRngLog.*(===|==|>=|<=))'
    then
      echo "js/$rel"
      printf '%s\n' "$delta" \
        | rg '^\+[^+].*(\bDIAG\b|\bFORCE\b|seed[0-9]{4}|console\.(log|error|debug)|getRngLog.*(===|==|>=|<=))'
    fi
  done < <(rg --files "$ROOT/js" -g '*.js')

  while IFS= read -r old; do
    rel="${old#"$snapshot/js/"}"
    if [[ ! -f "$ROOT/js/$rel" ]]; then
      echo "deleted js/$rel"
    fi
  done < <(rg --files "$snapshot/js" -g '*.js')
}

scan_new_banned_patterns() {
  local snapshot="$1"
  local hits
  hits="$(dump_banned_hits "$snapshot" || true)"
  if [[ -n "$hits" ]]; then
    echo "warning: suspicious new production line in js/" >&2
    printf '%s\n' "$hits" | head -20 >&2
    return 1
  fi
  return 0
}

# Next iteration strips DIAG/FORCE/seed-gate hits that already landed
# (cannot reset --hard after push). Consumed by apply_iteration_overlays.
arm_banned_heal_prompt() {
  local snapshot="$1"
  local hits
  hits="$(dump_banned_hits "$snapshot" || true)"
  {
    echo "<!-- overlay-for: port -->"
    echo "The supervisor banned-pattern scan flagged new production js/"
    echo "lines (word-bound DIAG/FORCE, seed####, console.log/error/debug,"
    echo "getRngLog compare, or a deleted js/ file). Recover in-loop:"
    echo "do not write STOP and do not wait for a human revert."
    echo
    echo "FIRST, rewrite or restore those lines so a fresh scan is clean."
    echo "Use full C names (SPE_FORCE_BOLT, WAN_STRIKING) — never a bare"
    echo "FORCE or DIAG token in js/. No seed gates, no console, no"
    echo "getRngLog compares. Restore any deleted js/ file from git."
    echo "Then continue the queue cluster."
    echo
    if [[ -n "$hits" ]]; then
      echo "Hits:"
      echo
      echo '```'
      printf '%s\n' "$hits"
      echo '```'
    fi
  } >"$NEXT_ITER_PROMPT"
}

# Next iteration recovers a port that shipped no js/ work or left the
# queue empty. Consumed by apply_iteration_overlays. Yields to a
# banned-pattern heal or continue latch.
arm_empty_port_prompt() {
  local iter="$1"
  local kind="$2"
  if [[ -f "$NEXT_ITER_PROMPT" || -f "$CONTINUE_LATCH" ]]; then
    return 0
  fi
  {
    echo "<!-- overlay-for: port -->"
    echo "The supervisor flagged iteration **#${iter}** as a failed port."
    echo "Do not write STOP and do not wait for a human."
    echo
    case "$kind" in
      stale-only)
        echo "The iteration only parked **stale** rows (no \`js/\`). Per"
        echo "LOOP-QUEUE.md a stale row is a 3-call detour, never the iteration:"
        echo "pop the next Open row now and ship it with real \`js/\` work."
        ;;
      pushed)
        echo "No \`js/\` diff landed (docs-only or empty commit may already be on"
        echo "origin). Ship the current \`LOOP-QUEUE\` Open head with real \`js/\`"
        echo "port work in this iteration."
        ;;
      unpushed)
        echo "No \`js/\` changes — the queue item was not shipped (supervisor"
        echo "reverted local docs). Redo the Open queue head with substantive"
        echo "\`js/\` port work."
        ;;
      queue-empty)
        echo "The queue is still empty after port. Refill Open rows that carry"
        echo "evidence (LOOP-QUEUE.md header: corpus owner not yet parked, a"
        echo "park's named writer, a [campaign] step, a [measure] row for the top"
        echo "parked corpus owner) before or alongside the next port cluster."
        echo "Do not copy c-js-map / debt.md / TOP30 lines."
        ;;
    esac
  } >"$NEXT_ITER_PROMPT"
  echo "$(date -Iseconds) note: empty-port overlay armed for next iteration (${kind})" \
    | tee -a "$MASTER_LOG"
}

# Next iteration prepends the Must-fix row a QUALITY-RISK/REJECT review
# should have filed, or writes a missing review file. Yields to heal /
# continue latch.
arm_review_debt_prompt() {
  local iter="$1"
  local kind="$2"
  if [[ -f "$NEXT_ITER_PROMPT" || -f "$CONTINUE_LATCH" ]]; then
    return 0
  fi
  {
    echo "<!-- overlay-for: any -->"
    echo "The supervisor flagged iteration **#${iter}** as incomplete audit work."
    echo "Do not write STOP and do not wait for a human."
    echo
    case "$kind" in
      no-review-file)
        echo "The iteration was review/audit mode but no new file appeared under"
        echo "\`reviews/loop-unattended/\`. Write the missing review for the"
        echo "shipped commit, then prepend any required Must-fix row."
        ;;
      no-mustfix)
        echo "A review with verdict **QUALITY-RISK** or **REJECT** landed but"
        echo "no new **Must-fix** row was prepended to \`docs/LOOP-QUEUE.md\`."
        echo "Read the latest review in \`reviews/loop-unattended/\`, prepend the"
        echo "Must-fix item it requires (cite the review + D-id), then continue."
        ;;
    esac
  } >"$NEXT_ITER_PROMPT"
  echo "$(date -Iseconds) note: review-debt overlay armed for next iteration (${kind})" \
    | tee -a "$MASTER_LOG"
}

# Next iteration is told its predecessor edited authority files (already
# restored by the supervisor). Any mode.
arm_authority_heal_prompt() {
  local iter="$1"
  if [[ -f "$NEXT_ITER_PROMPT" || -f "$CONTINUE_LATCH" ]]; then
    return 0
  fi
  {
    echo "<!-- overlay-for: any -->"
    echo "Iteration **#${iter}** edited protected authority/fixture files"
    echo "(Constitution / runbook / playbook / loop prompts+scripts / Cursor"
    echo "rules / frozen / sessions / upstream C / frozen js contracts). The"
    echo "supervisor restored them. Do not edit those paths; propose process"
    echo "changes in the journal. Continue the normal iteration."
  } >"$NEXT_ITER_PROMPT"
  echo "$(date -Iseconds) note: authority-heal overlay armed for next iteration" \
    | tee -a "$MASTER_LOG"
}

# Next port iteration is told its predecessor was undone for density.
arm_density_heal_prompt() {
  local iter="$1" ins="$2" files="$3"
  if [[ -f "$NEXT_ITER_PROMPT" || -f "$CONTINUE_LATCH" ]]; then
    return 0
  fi
  {
    echo "<!-- overlay-for: port -->"
    echo "Iteration **#${iter}** shipped +${ins} js/ insertions across ${files}"
    echo "files (caps ${LOOP_MAX_JS_INSERTIONS} / ${LOOP_MAX_JS_FILES}); the supervisor undid it"
    echo "(forward revert when pushed). The queue row is live again: split the"
    echo "cluster — ship the verified core (one C function / tight cluster,"
    echo "200–800 lines) and queue the remainder as its own Open row."
  } >"$NEXT_ITER_PROMPT"
  echo "$(date -Iseconds) note: density-heal overlay armed for next iteration" \
    | tee -a "$MASTER_LOG"
}

# Navigation discipline (advisory; never halts, never reverts). Names only
# the grep classes this iteration answered BY HAND while calling the script
# that answers them zero times — so it goes quiet as substitution improves
# (33% of recent iterations would trigger it). Yields to a banned-pattern
# heal, which is a correctness matter and outranks it. LOOP_NAV_GATE_OFF=1
# disables. Every branch returns 0: this must never trip `set -e`.
arm_nav_discipline_prompt() {
  local raw="$1" note=""
  if [[ "$LOOP_NAV_GATE_OFF" == "1" ]]; then
    return 0
  fi
  if [[ -f "$NEXT_ITER_PROMPT" || -f "$CONTINUE_LATCH" || ! -f "$raw" ]]; then
    return 0
  fi
  note="$(node scripts/loop-nav-report.mjs --gate "$raw" 2>/dev/null || true)"
  if [[ -z "$note" ]]; then
    return 0
  fi
  printf '%s\n%s\n' "<!-- overlay-for: port -->" "$note" >"$NEXT_ITER_PROMPT"
  echo "$(date -Iseconds) note: navigation-discipline overlay armed for next iteration" \
    | tee -a "$MASTER_LOG"
  return 0
}

iter_mode() {
  local n="$1"
  if (( n % LOOP_CADENCE_EVERY == 0 )); then
    echo audit
  else
    echo port
  fi
}

# Consume one-shot continue latch / extra prompt. Sets: mode,
# resume_unfinished, prompt_extra, prompt_context.
apply_iteration_overlays() {
  local cadence
  resume_unfinished=0
  prompt_extra=""
  prompt_context=""
  cadence="$(iter_mode "$iter")"
  if [[ -f "$CONTINUE_LATCH" ]]; then
    resume_unfinished=1
    mode="$(tr -d '[:space:]' <"$CONTINUE_LATCH")"
    if [[ "$mode" != "port" && "$mode" != "audit" ]]; then
      mode=port
    fi
    echo "$(date -Iseconds) === continue-unfinished: forcing mode=$mode (cadence would be $cadence) ===" \
      | tee -a "$MASTER_LOG"
    mv "$CONTINUE_LATCH" "$LOG_DIR/continue-unfinished.used-$STAMP-$iter"
  else
    mode="$cadence"
  fi
  if [[ -f "$NEXT_ITER_PROMPT" ]]; then
    # Overlays carry a mode tag. A port-only overlay ("ship js/", "strip
    # banned hits") must never reach a review/audit iteration (#3120: it
    # made the audit port js/). Leave it for the next port iteration.
    local overlay_for
    overlay_for="$(sed -n '1s/^<!-- overlay-for: \([a-z]*\) -->$/\1/p' "$NEXT_ITER_PROMPT")"
    if [[ "$overlay_for" == "port" && "$mode" != "port" ]]; then
      echo "$(date -Iseconds) === port-only overlay deferred (mode=$mode) ===" | tee -a "$MASTER_LOG"
    else
      prompt_extra="$(sed '1{/^<!-- overlay-for: [a-z]* -->$/d;}' "$NEXT_ITER_PROMPT")"
      mv "$NEXT_ITER_PROMPT" "$LOG_DIR/next-iter.prompt.used-$STAMP-$iter.md"
    fi
  fi
  # Consume the repo-root one-shot only when it was the extra-prompt source.
  if [[ -z "$NEXT_PROMPT_SRC" && -f "$HUMAN_NEXT_PROMPT" ]]; then
    mv "$HUMAN_NEXT_PROMPT" "$LOG_DIR/NEXT_AGENT_PROMPT.used-$STAMP-$iter.md"
  fi
  if [[ -f "$NEXT_ITER_CONTEXT" ]]; then
    prompt_context="$(cat "$NEXT_ITER_CONTEXT")"
    mv "$NEXT_ITER_CONTEXT" "$LOG_DIR/next-iter.context.used-$STAMP-$iter.md"
  fi
}

queue_open_count() {
  awk '/^- \[ \]/ { n++ } END { print n+0 }' "$QUEUE_FILE"
}

queue_has_open() {
  rg -q '^- \[ \]' "$QUEUE_FILE"
}

mustfix_open_count() {
  awk '
    /^## Must-fix/ { p=1; next }
    /^## / { p=0 }
    p && /^- \[ \]/ { n++ }
    END { print n+0 }
  ' "$QUEUE_FILE"
}

queue_first_cluster() {
  awk '
    /^## Must-fix/ { sec="mf"; next }
    /^## Open/ { sec="op"; next }
    /^## / { sec=""; next }
    /^- \[ \]/ {
      if (sec=="mf") { print; found=1; exit }
      if (sec=="op" && open=="") open=$0
    }
    END { if (!found && open!="") print open }
  ' "$QUEUE_FILE"
}

# True when an Open/Must-fix `- [ ]` row left the live list and ## Parked
# gained a matching line. Docs-only park is not an empty port (#2278).
port_did_park() {
  node "$PORT_DID_PARK" "$1" "$QUEUE_FILE"
}

# True when a `[measure]` Open row was popped: its deliverable is a C-side
# measurement + the writer's Open row, no js/ (2026-09-16 process take).
port_did_measure() {
  node "$PORT_DID_PARK" --measure "$1" "$QUEUE_FILE"
}

# If the agent parked a queue row (or finished a [measure] row) but forgot
# to commit, keep the docs.
maybe_commit_park() {
  local base="$1"
  if ! port_did_park "$base" && ! port_did_measure "$base"; then
    return 0
  fi
  local files=(
    docs/LOOP-QUEUE.md
    docs/NOTES.md
    docs/CURRENT.md
    docs/AGENT-LOOP-JOURNAL.md
    docs/archive/LOOP-QUEUE-PARKED.md
  )
  if git diff --quiet -- "${files[@]}"; then
    echo "$(date -Iseconds) park already committed; not an empty port" \
      | tee -a "$MASTER_LOG"
    return 0
  fi
  echo "$(date -Iseconds) === commit uncommitted LOOP-QUEUE park ===" \
    | tee -a "$MASTER_LOG"
  git add "${files[@]}"
  if git diff --cached --quiet; then
    return 0
  fi
  if ! git commit -m "Park LOOP-QUEUE row (docs-only; not a shipped D-id)."; then
    warn_regression "failed to commit LOOP-QUEUE park (local tree kept); next iteration commits it"
  fi
}

# Commit range $1..$2 (empty when the agent did not commit).
js_commit_stats() {
  git diff --numstat "$1" "$2" -- js \
    | awk '{ ins += $1; if ($1 + $2 > 0) files++ } END { print ins+0, files+0 }'
}

# Working tree (tracked + untracked) vs $1. Counts the shipment even if
# the agent crashed before git commit (#1463: HEAD..HEAD was empty, then
# reset --hard wiped the js/ edits).
js_worktree_stats() {
  local from="$1"
  local ins files add f
  read -r ins files <<<"$(
    git diff --numstat "$from" -- js \
      | awk '{ ins += $1; if ($1 + $2 > 0) files++ } END { print ins+0, files+0 }'
  )"
  while IFS= read -r f; do
    [[ -z "$f" ]] && continue
    add="$(wc -l <"$f" | tr -d ' ')"
    ins=$((ins + add))
    files=$((files + 1))
  done < <(git ls-files --others --exclude-standard -- js)
  echo "$ins $files"
}

touched_since() {
  local base="$1" path="$2"
  if git diff --name-only "$base" -- "$path" | rg -q .; then
    return 0
  fi
  git ls-files --others --exclude-standard -- "$path" | rg -q .
}

# Nonzero agent exit with no new commit: crash/exhaustion/timeout, not an
# empty shipment. Never reset --hard here (#1463/#1465).
agent_exit_hint() {
  local raw="$1" log="$2" st="$3"
  local err="${raw%.raw}.err"
  if [[ "$st" -eq 124 ]]; then
    echo " timeout"
  elif rg -q "out of usage|ActionRequiredError|usage limit|payment_gate|token_budget_exceeded|rate_limit|hit your limit|You've hit your limit|weekly limit" "$raw" "$log" "$err" 2>/dev/null; then
    # Provider plan quota (Cursor "You're out of usage", Claude Pro "hit your
    # limit"): retrying now just dies again; keep leftover + latch and stop.
    echo " quota"
  elif rg -q 'resource_exhausted|RetriableError' "$raw" "$log" "$err" 2>/dev/null; then
    echo " resource_exhausted"
  else
    echo ""
  fi
}

maybe_archive_checked_queue() {
  rg -q '^- \[x\]' "$QUEUE_FILE" || return 0
  echo "$(date -Iseconds) === archive checked LOOP-QUEUE items ===" | tee -a "$MASTER_LOG"
  node "$ARCHIVE_QUEUE" | tee -a "$MASTER_LOG"
  if git diff --quiet -- docs/LOOP-QUEUE.md docs/archive/LOOP-QUEUE-DONE.md; then
    return 0
  fi
  git add docs/LOOP-QUEUE.md docs/archive/LOOP-QUEUE-DONE.md
  if ! git commit -m "Archive checked LOOP-QUEUE items."; then
    warn_regression "failed to commit archived LOOP-QUEUE items (local tree kept); next iteration commits it"
  fi
}

maybe_rotate_journal() {
  echo "$(date -Iseconds) === rotate journal if over cap ===" | tee -a "$MASTER_LOG"
  node "$ROTATE_JOURNAL" | tee -a "$MASTER_LOG"
  local newf
  newf="$(git ls-files --others --exclude-standard -- docs/archive \
    | rg 'AGENT-LOOP-JOURNAL-rotated-' || true)"
  if git diff --quiet -- docs/AGENT-LOOP-JOURNAL.md && [[ -z "$newf" ]]; then
    return 0
  fi
  git add docs/AGENT-LOOP-JOURNAL.md
  if [[ -n "$newf" ]]; then
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      git add "$f"
    done <<<"$newf"
  fi
  if git diff --cached --quiet; then
    return 0
  fi
  if ! git commit -m "Rotate agent loop journal."; then
    warn_regression "failed to commit rotated journal (local tree kept); next iteration commits it"
  fi
}

log_hot_docs() {
  echo "$(date -Iseconds) === hot-doc check ===" | tee -a "$MASTER_LOG"
  node "$CHECK_HOT_DOCS" | tee -a "$MASTER_LOG" || true
}

halt_loop() {
  local reason="$1"
  local do_revert="${2:-1}"
  echo "$(date -Iseconds) HALT: $reason" | tee -a "$MASTER_LOG"
  printf '%s\n' "$reason" >"$LOG_DIR/last-halt-reason.txt"
  if [[ "$do_revert" == "1" && -n "${before_head:-}" ]]; then
    echo "$(date -Iseconds) revert: git reset --hard $before_head" | tee -a "$MASTER_LOG"
    git reset --hard "$before_head" >/dev/null
    git clean -fd -- js reviews >/dev/null 2>&1 || true
  fi
  printf '1\n' >"$STOP_FILE"
  exit 1
}

maybe_halt() {
  local reason="$1"
  local do_revert="${2:-1}"
  if [[ "$LOOP_FAIL_CLOSED" == "1" ]]; then
    halt_loop "$reason" "$do_revert"
  fi
  echo "$(date -Iseconds) warning (LOOP_FAIL_CLOSED=0): $reason (continuing)" \
    | tee -a "$MASTER_LOG"
}

# Suite/green FAIL or a pushed banned-pattern hit: keep the commit,
# keep going. Next port pops Must-fix / strips the hits / next Open
# instead of parking the supervisor.
warn_regression() {
  local reason="$1"
  echo "$(date -Iseconds) warning: $reason — continuing (next iteration should recover; not writing STOP)" \
    | tee -a "$MASTER_LOG"
}

# ---------------------------------------------------------------------------
# Self-heal (2026-09-16). The loop runs unattended overnight; a rule
# violation that git can undo must be undone by the supervisor, logged, and
# the loop continued. Only states git cannot fix (revert conflict, no
# tokens for hours, three authority violations in a row) still halt.
# No history rewrite: pushed work is undone with a forward `git revert`.
# ---------------------------------------------------------------------------
push_with_retry() {
  local attempt delays=(30 120 300 600 900)
  for attempt in 0 1 2 3 4; do
    if run_with_timeout_secs 120 git push origin HEAD >/dev/null 2>&1; then
      return 0
    fi
    echo "$(date -Iseconds) warning: git push failed (attempt $((attempt + 1))/5); retry in ${delays[$attempt]}s" \
      | tee -a "$MASTER_LOG"
    sleep "${delays[$attempt]}"
    git_fetch_origin
  done
  warn_regression "git push origin HEAD still failing after 5 attempts (commits kept locally; next iteration retries)"
  return 1
}

# Undo this iteration's commits after they reached origin: forward revert,
# one new commit, pushed. Returns 1 on conflict (nothing changed).
self_heal_revert_pushed() {
  local reason="$1"
  local head_now
  head_now="$(git rev-parse HEAD)"
  if [[ -z "${before_head:-}" || "$head_now" == "$before_head" ]]; then
    return 0
  fi
  echo "$(date -Iseconds) self-heal: git revert ${before_head:0:8}..${head_now:0:8} ($reason)" \
    | tee -a "$MASTER_LOG"
  git reset -q --hard "$head_now" >/dev/null 2>&1 || true
  if ! git revert --no-edit --no-commit "${before_head}..${head_now}" >/dev/null 2>&1; then
    git revert --abort >/dev/null 2>&1 || git reset -q --hard "$head_now" >/dev/null 2>&1 || true
    echo "$(date -Iseconds) self-heal: revert conflicted — commits kept" | tee -a "$MASTER_LOG"
    return 1
  fi
  if git diff --cached --quiet; then
    git revert --abort >/dev/null 2>&1 || true
    return 0
  fi
  git commit -q -m "Revert iteration ${iter} (${reason}) — supervisor self-heal, forward revert, no history rewrite." \
    || return 1
  push_with_retry || true
  return 0
}

# Undo this iteration whether or not it was pushed. Never writes STOP.
self_heal_undo_iteration() {
  local reason="$1"
  if (( agent_pushed )); then
    self_heal_revert_pushed "$reason" && return 0
    return 1
  fi
  if [[ -n "${before_head:-}" ]]; then
    echo "$(date -Iseconds) self-heal: git reset --hard $before_head ($reason)" | tee -a "$MASTER_LOG"
    git reset -q --hard "$before_head" >/dev/null
    git clean -fd -- js reviews >/dev/null 2>&1 || true
  fi
  return 0
}

# Restore protected authority/fixture paths from before_head; commit the
# restore when the iteration already committed (pushed or not).
self_heal_restore_protected() {
  # Only files git reports as changed/added/untracked under the protected
  # paths are touched — never a whole directory (upstream C, frozen).
  local tracked untracked f
  tracked="$(git diff --name-only "$before_head" -- "${PROTECTED_PATHS[@]}" 2>/dev/null || true)"
  untracked="$(git ls-files --others --exclude-standard -- "${PROTECTED_PATHS[@]}" 2>/dev/null || true)"
  echo "$(date -Iseconds) self-heal: restoring protected files from ${before_head:0:8}: $(printf '%s ' $tracked $untracked)" \
    | tee -a "$MASTER_LOG"
  while IFS= read -r f; do
    [[ -n "$f" ]] || continue
    if git cat-file -e "${before_head}:${f}" 2>/dev/null; then
      git checkout -q "$before_head" -- "$f" || true
    else
      git rm -q --cached --ignore-unmatch -- "$f" >/dev/null 2>&1 || true
      rm -f -- "$ROOT/$f"
    fi
  done <<<"$tracked"
  while IFS= read -r f; do
    [[ -n "$f" ]] || continue
    rm -f -- "$ROOT/$f"
  done <<<"$untracked"
  if ! git diff --cached --quiet; then
    git commit -q -m "Restore protected authority/fixture files edited by loop iteration ${iter} (supervisor self-heal)." || true
    if (( agent_pushed )); then push_with_retry || true; fi
  fi
  if [[ "$(protected_fingerprint)" != "$AUTHORITY_HASH" ]]; then
    echo "$(date -Iseconds) self-heal: fingerprint still differs after restore (ignored/untracked build output under a protected dir?)" \
      | tee -a "$MASTER_LOG"
    return 1
  fi
  return 0
}

# Provider plan window / quota exhausted: sleep in slices and re-probe
# instead of exiting at 3 AM. Gives up (exit 0, commit kept) only after
# LOOP_QUOTA_WAIT_MAX_SEC (default 10 h).
LOOP_QUOTA_POLL_SEC="${LOOP_QUOTA_POLL_SEC:-900}"
LOOP_QUOTA_WAIT_MAX_SEC="${LOOP_QUOTA_WAIT_MAX_SEC:-36000}"
# True while the provider plan says stop. False (= not blocked) when no
# probe exists or the probe fails, so a TUI glitch never traps the loop.
plan_quota_blocked() {
  local json=""
  set +e
  if [[ "$USE_MUSE" == "1" && -f "$MUSE_PLAN_USAGE" && "${MUSE_PLAN_USAGE_SKIP:-0}" != "1" ]]; then
    json="$(MUSE_BIN="${MUSE_BIN:-${AGENT_BIN:-muse}}" node "$MUSE_PLAN_USAGE" 2>/dev/null)"
  elif [[ "$USE_CLAUDE" == "1" && -f "$CLAUDE_PLAN_USAGE" && "${CLAUDE_PLAN_USAGE_SKIP:-0}" != "1" ]]; then
    json="$(CLAUDE_BIN="${CLAUDE_BIN:-${AGENT_BIN:-claude}}" node "$CLAUDE_PLAN_USAGE" 2>/dev/null)"
  fi
  set -e
  [[ -n "$json" ]] || return 1
  [[ "$(node -e 'try{const j=JSON.parse(process.argv[1]);process.stdout.write(j.shouldStop?"1":"0")}catch{process.stdout.write("0")}' "$json")" == "1" ]]
}

wait_for_plan_quota() {
  local why="$1" waited=0
  echo "$(date -Iseconds) QUOTA WAIT: ${why} — sleeping ${LOOP_QUOTA_POLL_SEC}s slices, re-probing (max ${LOOP_QUOTA_WAIT_MAX_SEC}s); write 1 to STOP_AGENT_LOOP.md to exit" \
    | tee -a "$MASTER_LOG"
  printf '%s\n' "waiting for plan quota: ${why}" >"$LOG_DIR/last-halt-reason.txt"
  while (( waited < LOOP_QUOTA_WAIT_MAX_SEC )); do
    sleep "$LOOP_QUOTA_POLL_SEC"
    waited=$((waited + LOOP_QUOTA_POLL_SEC))
    if should_stop; then
      echo "$(date -Iseconds) STOP while waiting for quota" | tee -a "$MASTER_LOG"
      exit 0
    fi
    if ! plan_quota_blocked; then
      echo "$(date -Iseconds) QUOTA WAIT: plan usage back under threshold after ${waited}s — resuming" \
        | tee -a "$MASTER_LOG"
      return 0
    fi
    echo "$(date -Iseconds) QUOTA WAIT: still blocked (${waited}s / ${LOOP_QUOTA_WAIT_MAX_SEC}s)" | tee -a "$MASTER_LOG"
  done
  echo "$(date -Iseconds) QUOTA WAIT: gave up after ${waited}s — exiting (commit kept)" | tee -a "$MASTER_LOG"
  exit 0
}

echo "=== agent-port-loop ==="
echo "root:   $ROOT"
echo "agent:  $AGENT_BIN"
if [[ "$USE_MUSE" == "1" ]]; then
  echo "muse:   1  (exec --json, reasoning-effort=${MUSE_REASONING_EFFORT})"
fi
if [[ "$USE_CLAUDE" == "1" ]]; then
  echo "claude: 1  (print stream-json, effort=${CLAUDE_EFFORT})"
fi
echo "model:  $MODEL"
echo "trust:  ${AGENT_TRUST:-1}"
echo "force:  ${AGENT_FORCE:-0}"
echo "format: $OUTPUT_FORMAT"
if [[ "${AGENT_FORCE:-0}" != "1" ]]; then
  if [[ "$USE_MUSE" == "1" ]]; then
    echo "note:   AGENT_FORCE=0 — Muse approvals stay on (no --yolo). Headless tools may stall."
    echo "        Use AGENT_FORCE=1 after checkpointing if the agent must run scorers."
  elif [[ "$USE_CLAUDE" == "1" ]]; then
    echo "note:   AGENT_FORCE=0 — Claude --permission-mode auto; prompts are denied."
    echo "        Use AGENT_FORCE=1 after checkpointing if the agent must run scorers."
  else
    echo "note:   AGENT_FORCE=0 — headless Shell/tool approvals are auto-denied (no interactive prompt)."
    echo "        Use AGENT_FORCE=1 after checkpointing if the agent must run scorers."
  fi
fi
echo "timeout: ${ITERATION_TIMEOUT_SEC}s per iteration"
echo "fetch:  ${GIT_FETCH_TIMEOUT_SEC}s git fetch timeout (0 = skip fetch)"
echo "progress: every ${LOOP_PROGRESS_INTERVAL_SEC}s while agent runs (LOOP_PROGRESS=0 disables)"
echo "halt:   ${SHORT_STREAK_LIMIT}× agent runs <${SHORT_ITER_SEC}s (likely out of tokens)"
if token_budget_active; then
  echo "budget: ${TOKEN_BUDGET_M}M tokens (${TOKEN_BUDGET}) this run only; last iter may overshoot"
  echo "        also halt after ${MISSING_USAGE_LIMIT}× consecutive missing usage events"
else
  echo "budget: (none — pass --token-budget-m <millions> to cap this run)"
fi
if [[ "$USE_MUSE" == "1" && "${MUSE_PLAN_USAGE_SKIP:-0}" != "1" ]]; then
  echo "plan:   after a finished iter, stop if window >= ${MUSE_PLAN_WINDOW_STOP_PCT:-97}% or weekly >= ${MUSE_PLAN_WEEKLY_STOP_PCT:-99}% (TUI /usage)"
fi
if [[ "$USE_CLAUDE" == "1" && "${CLAUDE_PLAN_USAGE_SKIP:-0}" != "1" ]]; then
  echo "plan:   after a finished iter, stop if session >= ${CLAUDE_PLAN_WINDOW_STOP_PCT:-70}% or weekly >= ${CLAUDE_PLAN_WEEKLY_STOP_PCT:-95}% (claude -p /usage)"
fi
echo "stop:   $STOP_FILE  (write 1 to halt before next iteration)"
echo "count:  $ITER_COUNT_FILE  (monotonic global iteration number)"
echo "log:    $MASTER_LOG"
echo "prompt: $PROMPT_FILE"
echo "audit:  every ${LOOP_CADENCE_EVERY} (review + full suite); else port"
echo "        continue latch: $CONTINUE_LATCH"
echo "        extra prompt:   $HUMAN_NEXT_PROMPT (gitignored) or --next-prompt"
echo "queue:  min ${LOOP_QUEUE_MIN} open / target ${LOOP_QUEUE_TARGET} (refill: evidence rows only, see LOOP-QUEUE.md header)"
echo "gates:  fail-closed=${LOOP_FAIL_CLOSED}  js cap ${LOOP_MAX_JS_INSERTIONS} ins / ${LOOP_MAX_JS_FILES} files"
echo "push:   agents commit+push; supervisor backup (LOOP_PUSH=${LOOP_PUSH})"
echo

echo "$(date -Iseconds) === authority fingerprint ===" | tee -a "$MASTER_LOG"
AUTHORITY_HASH="$(protected_fingerprint)"
echo "$(date -Iseconds) === preflight green gate ===" | tee -a "$MASTER_LOG"
if ! run_green_gate; then
  if [[ -f "$CONTINUE_LATCH" ]]; then
    echo "warning: preflight green gate failed; starting anyway (continue-unfinished leftover may be half-written)" \
      | tee -a "$MASTER_LOG"
  else
    echo "error: preflight green gate failed; loop not started" | tee -a "$MASTER_LOG"
    exit 1
  fi
fi
if [[ "${LOOP_PREFLIGHT_ONLY:-0}" == "1" ]]; then
  echo "$(date -Iseconds) preflight-only check passed" | tee -a "$MASTER_LOG"
  exit 0
fi

if [[ -n "$LAST_COMPLETED" ]]; then
  write_iter_count "$LAST_COMPLETED"
  echo "$(date -Iseconds) === --last-completed ${LAST_COMPLETED} (iteration-count rewritten) ===" \
    | tee -a "$MASTER_LOG"
fi
iter="$(read_iter_count)"
write_iter_count "$iter"
if [[ -n "$LAST_COMPLETED" && "$iter" != "$LAST_COMPLETED" ]]; then
  echo "error: --last-completed ${LAST_COMPLETED} lost to iter-*.log floor (${iter})" >&2
  echo "       that count is a bootstrap minimum; cannot rewind below it." >&2
  exit 2
fi
next_iter=$((iter + 1))
next_mode="$(iter_mode "$next_iter")"
if [[ -f "$CONTINUE_LATCH" ]]; then
  next_mode="$(tr -d '[:space:]' <"$CONTINUE_LATCH")"
  echo "$(date -Iseconds) === iteration counter: last completed=$iter; next will be ${next_iter} (CONTINUE mode=${next_mode}; cadence would be $(iter_mode "$next_iter")) ===" \
    | tee -a "$MASTER_LOG"
else
  echo "$(date -Iseconds) === iteration counter: last completed=$iter; next will be ${next_iter} (mode=${next_mode}) ===" \
    | tee -a "$MASTER_LOG"
fi
if token_budget_active; then
  echo "$(date -Iseconds) === token budget this run: 0 / ${TOKEN_BUDGET} (${TOKEN_BUDGET_M}M) ===" \
    | tee -a "$MASTER_LOG"
fi
short_streak=0
authority_streak=0
resume_unfinished=0
prompt_extra=""
prompt_context=""
RAN_AGENT_THIS_RUN=0
while true; do
  if should_stop; then
    echo "$(date -Iseconds) STOP: $STOP_FILE is 1 — exiting before iteration $((iter + 1))"
    echo "$(date -Iseconds) STOP (last completed=$iter)" >>"$MASTER_LOG"
    exit 0
  fi
  if token_budget_exceeded; then
    echo "$(date -Iseconds) TOKEN BUDGET: ${TOKENS_USED} >= ${TOKEN_BUDGET} (${TOKEN_BUDGET_M}M) — exiting before next iteration" \
      | tee -a "$MASTER_LOG"
    exit 0
  fi
  if (( RAN_AGENT_THIS_RUN )); then
    exit_if_muse_plan_quota
    exit_if_claude_plan_quota
  fi

  iter=$((iter + 1))
  write_iter_count "$iter"
  apply_iteration_overlays
  mustfix_before="$(mustfix_open_count)"
  # Per-attempt stamp so a retry of the same global # does not overwrite
  # the previous .raw/.log the continue prompt must cite.
  iter_stamp="$(date +%Y%m%d-%H%M%S)"
  iter_log="$LOG_DIR/iter-$(printf '%04d' "$iter")-$iter_stamp.log"
  iter_raw="$LOG_DIR/iter-$(printf '%04d' "$iter")-$iter_stamp.raw"
  iter_prompt="$LOG_DIR/iter-$(printf '%04d' "$iter")-$iter_stamp.prompt.md"
  snapshot="$(mktemp -d "$LOG_DIR/.snapshot-$iter_stamp-$iter.XXXXXX")"
  cp -R "$ROOT/js" "$snapshot/js"
  before_head="$(git rev-parse HEAD)"
  origin_before=""
  if [[ "$resume_unfinished" == "1" ]]; then
    echo "$(date -Iseconds) === iteration $iter starting (global #$iter mode=$mode continue-unfinished) ===" \
      | tee -a "$MASTER_LOG"
  else
    echo "$(date -Iseconds) === iteration $iter starting (global #$iter mode=$mode) ===" \
      | tee -a "$MASTER_LOG"
  fi
  echo "log: $iter_log" | tee -a "$MASTER_LOG"
  if git rev-parse --abbrev-ref '@{u}' >/dev/null 2>&1; then
    git_fetch_origin
    origin_before="$(git rev-parse '@{u}' 2>/dev/null || true)"
  fi
  if [[ "$USE_MUSE" == "1" ]]; then
    echo "cli: $AGENT_BIN exec --json --model $MODEL --reasoning-effort $MUSE_REASONING_EFFORT --workspace $ROOT --prompt-file $iter_prompt --user-input-auto-resolve ${MUSE_EXTRA[*]+${MUSE_EXTRA[*]}}" \
      | tee -a "$MASTER_LOG"
  elif [[ "$USE_CLAUDE" == "1" ]]; then
    echo "cli: $AGENT_BIN -p --output-format stream-json --verbose --model $MODEL --effort $CLAUDE_EFFORT ${CLAUDE_EXTRA[*]+${CLAUDE_EXTRA[*]}}" \
      | tee -a "$MASTER_LOG"
  else
    echo "cli: $AGENT_BIN -p --model $MODEL --output-format $OUTPUT_FORMAT ${TRUST_ARGS[*]+${TRUST_ARGS[*]}} ${FORCE_ARGS[*]+${FORCE_ARGS[*]}}" \
      | tee -a "$MASTER_LOG"
  fi

  # Each iteration is a fresh agent session (new context).
  # Bash 3.2 (macOS) + set -u: empty "${arr[@]}" is "unbound"; use + guard.
  if [[ "$resume_unfinished" == "1" ]]; then
    prompt_body="$(cat "$CONTINUE_PROMPT_FILE")"
    prompt_body+=$'\n\n**Forced mode:** `'"$mode"$'`. Cadence for this global # would have been `'
    prompt_body+="$(iter_mode "$iter")"
    prompt_body+=$'` — ignore n%'"${LOOP_CADENCE_EVERY}"$'; do not switch to audit/port because of the number.\n'
    if [[ "$mode" == "audit" ]]; then
      prompt_body+=$'\n\n## Unfinished work is an audit (no js/ edits)\n'
      prompt_body+="$(cat "$REVIEW_PROMPT_FILE")"
      prompt_body+=$'\n\n## ALSO this iteration: cadence score (audit = review + score, no port)\n'
      prompt_body+=$'Run `node frozen/ps_test_runner.mjs sessions`, rewrite CURRENT Score\n'
      prompt_body+=$'from __RESULTS_JSON__, journal. Still no js/ edits.\n'
      echo "$(date -Iseconds) === continue-unfinished audit (review + full suite, no port) ===" \
        | tee -a "$MASTER_LOG"
    else
      echo "$(date -Iseconds) === continue-unfinished port (finish dirty tree; do not pop queue) ===" \
        | tee -a "$MASTER_LOG"
    fi
  else
    case "$mode" in
      review)
        prompt_body="$(cat "$REVIEW_PROMPT_FILE")"
        echo "$(date -Iseconds) === review iteration (no js/ port) ===" | tee -a "$MASTER_LOG"
        ;;
      cadence)
        prompt_body="$(cat "$CADENCE_PROMPT_FILE")"
        echo "$(date -Iseconds) === cadence score-only (iteration $iter % ${LOOP_CADENCE_EVERY} == 0) ===" \
          | tee -a "$MASTER_LOG"
        ;;
      audit)
        prompt_body="$(cat "$REVIEW_PROMPT_FILE")"
        prompt_body+=$'\n\n## ALSO this iteration: cadence score (audit = review + score, no port)\n'
        prompt_body+=$'Run `node frozen/ps_test_runner.mjs sessions`, rewrite CURRENT Score\n'
        prompt_body+=$'from __RESULTS_JSON__, journal. Still no js/ edits.\n'
        echo "$(date -Iseconds) === audit iteration (review + full suite, no port) ===" \
          | tee -a "$MASTER_LOG"
        ;;
      *)
        prompt_body="$(cat "$PROMPT_FILE")"
        prompt_body+=$'\n\n## This iteration cluster\n'
        prompt_body+=$'Pop the first unchecked **Must-fix** item in `docs/LOOP-QUEUE.md` if any,\n'
        prompt_body+=$'else the first Open item. That item is the only cluster. Copy it into\n'
        prompt_body+=$'`docs/CURRENT.md` Next cluster before coding. If it cites a review, read\n'
        prompt_body+=$'that review and stamp `**Addressed:** D-NNNN` (D-id only) when you ship.\n'
        prompt_body+=$'Mark the queue line `- [x]` and run `node scripts/archive-loop-queue-done.mjs`\n'
        prompt_body+=$'in this same commit (live queue stays unchecked-only). Do not predict this\n'
        prompt_body+=$'commit hash, amend, or make a stamp-only SHA. If a previous Addressed line\n'
        prompt_body+=$'(review or LOOP-QUEUE-DONE.md) is missing its short hash, fill it in this\n'
        prompt_body+=$'same commit from `git log` (bundled with this fix).\n'
        cluster_line="$(queue_first_cluster)"
        if [[ -n "$cluster_line" ]]; then
          prompt_body+=$'\n**Queue head:** '
          prompt_body+="$cluster_line"
          prompt_body+=$'\n'
        else
          prompt_body+=$'\n**Queue is empty.** Refill Open from the map first, then ship the\n'
          prompt_body+=$'first new `- [ ]` line in this same iteration (js/ required).\n'
        fi
        ;;
    esac
  fi

  if [[ -n "$prompt_extra" ]]; then
    prompt_body+=$'\n\n## Operator prompt for this iteration only\n'
    prompt_body+="$prompt_extra"
    prompt_body+=$'\n'
    echo "$(date -Iseconds) === extra operator prompt attached (${#prompt_extra} bytes) ===" \
      | tee -a "$MASTER_LOG"
  fi
  if [[ -n "$prompt_context" ]]; then
    prompt_body+=$'\n\n'
    prompt_body+="$prompt_context"
    prompt_body+=$'\n'
  fi

  open_now="$(queue_open_count)"
  if [[ "$resume_unfinished" != "1" ]] && (( open_now < LOOP_QUEUE_MIN )); then
    echo "$(date -Iseconds) === queue refill required (open=${open_now} min=${LOOP_QUEUE_MIN} target=${LOOP_QUEUE_TARGET}) ===" \
      | tee -a "$MASTER_LOG"
    prompt_body+=$'\n\n## Queue refill (this iteration, eligible rows only)\n'
    prompt_body+="Open \`- [ ]\` count is ${open_now} (min ${LOOP_QUEUE_MIN}, target ${LOOP_QUEUE_TARGET})."$'\n'
    prompt_body+=$'If you archive this iter’s item, count the remainder **after** archive.\n'
    prompt_body+=$'Append **Open** rows that carry **evidence** (LOOP-QUEUE.md header) up to\n'
    prompt_body+="about ${LOOP_QUEUE_TARGET}"
    prompt_body+=$': breadth phase — (1) `node scripts/port-coverage.mjs --rows N` and paste\n'
    prompt_body+=$'its rows verbatim under **Open — coverage** (it measures the JS tree now and\n'
    prompt_body+=$'skips live rows / by-design names); then, only if it prints none: (2)\n'
    prompt_body+=$'`node scripts/hidden-proxy.mjs queue --limit 30` owners not tagged\n'
    prompt_body+=$'open/parked/archived; (3) the **writer** a Parked line names, with its\n'
    prompt_body+=$'session; (4) a C arm you verified absent from the JS body in a `brief.mjs`\n'
    prompt_body+=$'output (quote C lines + JS fn). A `c-js-map`/`debt.md`/TOP30 line or a\n'
    prompt_body+=$'D-number copied by hand is **not** evidence. One C function per row; do not\n'
    prompt_body+=$'duplicate live/archived/parked rows; no D-0006 / dog_invent.\n'
    if [[ "$mode" == "port" ]]; then
      prompt_body+=$'Then pop Must-fix else Open (including a line you just added if the\n'
      prompt_body+=$'queue was empty) and ship that one cluster in this same iteration.\n'
    fi
  fi

  iter_start="$(now_epoch)"
  set +e
  if [[ "$USE_MUSE" == "1" ]]; then
    printf '%s' "$prompt_body" >"$iter_prompt"
    run_agent_iteration "$iter" "$iter_raw" \
      "$AGENT_BIN" exec --json \
      --model "$MODEL" \
      --reasoning-effort "$MUSE_REASONING_EFFORT" \
      --workspace "$ROOT" \
      --prompt-file "$iter_prompt" \
      --user-input-auto-resolve \
      ${MUSE_EXTRA[@]+"${MUSE_EXTRA[@]}"}
  elif [[ "$USE_CLAUDE" == "1" ]]; then
    printf '%s' "$prompt_body" >"$iter_prompt"
    claude_cmd=("$AGENT_BIN" -p --output-format stream-json --verbose)
    if [[ "${CLAUDE_NO_PARTIAL:-0}" != "1" ]]; then
      claude_cmd+=(--include-partial-messages)
    fi
    claude_cmd+=(--model "$MODEL" --effort "$CLAUDE_EFFORT")
    claude_cmd+=(${CLAUDE_EXTRA[@]+"${CLAUDE_EXTRA[@]}"})
    claude_cmd+=(-- "$prompt_body")
    run_agent_iteration "$iter" "$iter_raw" "${claude_cmd[@]}"
  else
    run_agent_iteration "$iter" "$iter_raw" \
      "$AGENT_BIN" -p \
      --model "$MODEL" \
      --output-format "$OUTPUT_FORMAT" \
      ${TRUST_ARGS[@]+"${TRUST_ARGS[@]}"} \
      ${FORCE_ARGS[@]+"${FORCE_ARGS[@]}"} \
      "$prompt_body"
  fi
  status=$?
  set -e
  iter_elapsed=$(( $(now_epoch) - iter_start ))

  # Human-readable extract + keep raw stream for tool denial forensics.
  if (( JSONL_LOGS )); then
    node "$EXTRACT_LOG" "$iter_raw" "$iter_log" || cp "$iter_raw" "$iter_log"
  else
    cp "$iter_raw" "$iter_log"
  fi
  tee -a "$MASTER_LOG" <"$iter_log" >/dev/null

  # Tool-approval denials only. Ordinary shell failures often contain
  # "permission denied" (OS) and must not abort the loop under set -e.
  if (( JSONL_LOGS )); then
    set +e
    deny_report="$(node "$EXTRACT_LOG" --denials "$iter_raw")"
    deny_status=$?
    set -e
    if [[ "$deny_status" -eq 2 ]]; then
      echo "warning: structured tool denial(s) in agent stream:" \
        | tee -a "$MASTER_LOG"
      printf '%s\n' "$deny_report" | tee -a "$MASTER_LOG"
      echo "hint:  AGENT_FORCE=1 if Shell was auto-denied; raw=$iter_raw" \
        | tee -a "$MASTER_LOG"
      maybe_halt "tool approval denials (set AGENT_FORCE=1 for unattended scorers)" 1
    fi
  fi

  echo "$(date -Iseconds) === iteration $iter finished (exit $status, ${iter_elapsed}s) ===" \
    | tee -a "$MASTER_LOG"
  RAN_AGENT_THIS_RUN=1

  record_iteration_tokens "$iter_raw"

  after_head="$(git rev-parse HEAD)"
  read -r js_c_ins js_c_files <<<"$(js_commit_stats "$before_head" "$after_head")"
  read -r js_ins js_files <<<"$(js_worktree_stats "$before_head")"

  if (( iter_elapsed < SHORT_ITER_SEC )); then
    short_streak=$((short_streak + 1))
    echo "warning: short agent run ${iter_elapsed}s < ${SHORT_ITER_SEC}s (streak ${short_streak}/${SHORT_STREAK_LIMIT})" \
      | tee -a "$MASTER_LOG"
  else
    short_streak=0
  fi

  if [[ "$status" -ne 0 ]]; then
    echo "warning: agent iteration exit $status; raw=$iter_raw" | tee -a "$MASTER_LOG"
  fi

  # Crash / timeout / resource_exhausted before commit: keep the tree,
  # arm continue-unfinished (cite this iter's extract + raw), rewind n,
  # and retry in this supervisor run. Do not write STOP.
  if [[ "$status" -ne 0 && "$after_head" == "$before_head" ]]; then
    crashed_iter="$iter"
    hint="$(agent_exit_hint "$iter_raw" "$iter_log" "$status")"
    write_iter_count $((crashed_iter - 1))
    arm_continue_retry "agent iteration #${crashed_iter} exit ${status}${hint} before commit" \
      "$mode" "$iter_raw" "$iter_log"
    rm -rf "$snapshot"
    echo "$(date -Iseconds) warning: agent iteration exit ${status}${hint} before commit; not reverting; counter rewound to $((crashed_iter - 1)); retrying #${crashed_iter} as continue-unfinished (supervisor staying up; extract=$iter_log raw=$iter_raw)" \
      | tee -a "$MASTER_LOG"
    if [[ "$hint" == " quota" ]]; then
      # Do not retry into an exhausted plan (each retry would be another
      # short run) and never reset --hard (that would wipe the leftover).
      # Tree + latch stay; wait for the plan window, then retry in-run.
      wait_for_plan_quota "provider usage quota exhausted (ActionRequiredError) during iteration ${crashed_iter}; leftover kept, continue latch armed"
      short_streak=0
    elif (( short_streak >= SHORT_STREAK_LIMIT )); then
      # Likely out of tokens. Leftover kept, latch armed; wait (plan probe
      # when available, else a fixed slice) instead of halting at night.
      wait_for_plan_quota "${SHORT_STREAK_LIMIT} consecutive agent runs <${SHORT_ITER_SEC}s — likely out of tokens; leftover kept"
      short_streak=0
    fi
    if should_stop; then
      echo "$(date -Iseconds) STOP: $STOP_FILE is 1 — exiting after failed iteration $crashed_iter" \
        | tee -a "$MASTER_LOG"
      exit 0
    fi
    if token_budget_exceeded; then
      echo "$(date -Iseconds) TOKEN BUDGET: ${TOKENS_USED} >= ${TOKEN_BUDGET} (${TOKEN_BUDGET_M}M) — exiting after failed iteration $crashed_iter" \
        | tee -a "$MASTER_LOG"
      exit 0
    fi
    sleep "${LOOP_SLEEP_SEC:-2}"
    continue
  fi

  if (( MISSING_USAGE_STREAK >= MISSING_USAGE_LIMIT )); then
    # Budget accounting is blind, the work is not: keep the iteration,
    # keep going, stop counting until usage reappears. (Was halt+revert —
    # a stream-format hiccup must not undo a verified port at night.)
    warn_regression "${MISSING_USAGE_LIMIT} consecutive iterations with no usage in stream — token budget cannot be enforced this run"
    MISSING_USAGE_STREAK=0
  fi
  if (( short_streak >= SHORT_STREAK_LIMIT )); then
    # Three quick exits in a row (auth / plan / provider). Keep whatever the
    # agent committed, wait for the plan window, then keep going.
    wait_for_plan_quota "${SHORT_STREAK_LIMIT} consecutive agent runs <${SHORT_ITER_SEC}s — likely out of tokens or auth"
    short_streak=0
  fi

  origin_after=""
  agent_pushed=0
  if git rev-parse --abbrev-ref '@{u}' >/dev/null 2>&1; then
    git_fetch_origin
    origin_after="$(git rev-parse '@{u}' 2>/dev/null || true)"
    if [[ -n "$origin_before" && -n "$origin_after" && "$origin_after" != "$origin_before" ]]; then
      agent_pushed=1
    fi
  fi

  if [[ "$(protected_fingerprint)" != "$AUTHORITY_HASH" ]]; then
    # A loop agent edited authority/fixture files. Restore them from
    # before_head (commit + push when the iteration was committed), keep
    # the rest of the iteration, warn the next agent. Three in a row means
    # the prompts are being ignored systematically — that still halts.
    authority_streak=$((authority_streak + 1))
    if self_heal_restore_protected; then
      warn_regression "protected authority/fixture files were edited by iteration ${iter} and restored by the supervisor (streak ${authority_streak}/3)"
      arm_authority_heal_prompt "$iter"
    else
      halt_loop "protected authority/fixture changed and could not be restored — human must inspect origin" 0
    fi
    if (( authority_streak >= 3 )); then
      halt_loop "3 consecutive iterations edited protected authority files" 0
    fi
  else
    authority_streak=0
  fi

  if ! scan_new_banned_patterns "$snapshot"; then
    if (( agent_pushed )); then
      warn_regression "banned-pattern audit failed AND already pushed — next iteration must strip the hits"
      arm_banned_heal_prompt "$snapshot"
    else
      echo "$(date -Iseconds) warning: banned-pattern audit failed — reverting this iteration and continuing (not writing STOP)" \
        | tee -a "$MASTER_LOG"
      if [[ -n "${before_head:-}" ]]; then
        echo "$(date -Iseconds) revert: git reset --hard $before_head" | tee -a "$MASTER_LOG"
        git reset --hard "$before_head" >/dev/null
        git clean -fd -- js reviews >/dev/null 2>&1 || true
      fi
      rm -rf "$snapshot"
      if should_stop; then
        echo "$(date -Iseconds) STOP: $STOP_FILE is 1 — exiting after reverted banned-pattern iteration $iter" \
          | tee -a "$MASTER_LOG"
        exit 0
      fi
      if token_budget_exceeded; then
        echo "$(date -Iseconds) TOKEN BUDGET: ${TOKENS_USED} >= ${TOKEN_BUDGET} (${TOKEN_BUDGET_M}M) — exiting after reverted banned-pattern iteration $iter" \
          | tee -a "$MASTER_LOG"
        exit 0
      fi
      sleep "${LOOP_SLEEP_SEC:-2}"
      continue
    fi
  fi

  if [[ "$mode" != "port" ]] && (( js_files > 0 )); then
    # A review/audit iteration ported js/ (2026-09-16 #3120: an empty-port
    # overlay leaked into the audit). The code went through the agent's
    # verify and goes through the green + full-suite gates below; keep it,
    # warn, and let the next audit review that SHA like any port. Do not
    # halt overnight for a mode violation git gates already cover.
    warn_regression "$mode iteration touched js/ (${js_files} file(s), +${js_ins}) — kept; gates below decide, next audit reviews the SHA"
  fi

  if [[ "$mode" == "port" ]]; then
    parked=0
    if port_did_park "$before_head"; then
      parked=1
      echo "$(date -Iseconds) port parked a LOOP-QUEUE row; not an empty port" \
        | tee -a "$MASTER_LOG"
    elif port_did_measure "$before_head"; then
      parked=1
      echo "$(date -Iseconds) port finished a [measure] row (docs-only by design); not an empty port" \
        | tee -a "$MASTER_LOG"
    fi
    if (( js_ins == 0 && js_files == 0 && js_c_ins == 0 && js_c_files == 0 )); then
      if (( parked )); then
        # Stale-only parks are a detour, not an iteration: keep the docs,
        # tell the next port iteration to ship the next row.
        if node "$PORT_DID_PARK" --stale-only "$before_head" "$QUEUE_FILE"; then
          warn_regression "iteration ${iter} only parked STALE rows (no js/) — next port iteration must ship the queue head"
          arm_empty_port_prompt "$iter" "stale-only"
        fi
      elif (( agent_pushed )); then
        warn_regression "empty port iteration (no js/ diff) already pushed"
        arm_empty_port_prompt "$iter" "pushed"
      else
        warn_regression "empty port iteration (no js/ changes) — queue item not shipped"
        arm_empty_port_prompt "$iter" "unpushed"
        if [[ -n "${before_head:-}" ]]; then
          echo "$(date -Iseconds) revert: git reset --hard $before_head" | tee -a "$MASTER_LOG"
          git reset --hard "$before_head" >/dev/null
          git clean -fd -- js reviews >/dev/null 2>&1 || true
        fi
      fi
    fi
    if (( js_c_ins == 0 && js_c_files == 0 && (js_ins > 0 || js_files > 0) )); then
      write_iter_count $((iter - 1))
      arm_continue_retry "port iteration left uncommitted js/ changes (agent did not commit)" \
        "$mode" "$iter_raw" "$iter_log"
      rm -rf "$snapshot"
      echo "$(date -Iseconds) warning: port iteration left uncommitted js/; retrying #$iter as continue-unfinished (supervisor staying up; extract=$iter_log raw=$iter_raw)" \
        | tee -a "$MASTER_LOG"
      if should_stop; then
        echo "$(date -Iseconds) STOP after uncommitted port $iter" | tee -a "$MASTER_LOG"
        exit 0
      fi
      if token_budget_exceeded; then
        echo "$(date -Iseconds) TOKEN BUDGET after uncommitted port $iter" | tee -a "$MASTER_LOG"
        exit 0
      fi
      sleep "${LOOP_SLEEP_SEC:-2}"
      continue
    fi
    if (( js_ins > LOOP_MAX_JS_INSERTIONS || js_files > LOOP_MAX_JS_FILES )); then
      # Oversized cluster: undo it (forward revert when pushed), tell the
      # next agent to split, continue. Halt only if git cannot undo it.
      if self_heal_undo_iteration "density cap exceeded: js +${js_ins} / ${js_files} files (max ${LOOP_MAX_JS_INSERTIONS}/${LOOP_MAX_JS_FILES})"; then
        warn_regression "density cap exceeded (+${js_ins} / ${js_files} files) — iteration ${iter} undone by the supervisor"
        arm_density_heal_prompt "$iter" "$js_ins" "$js_files"
        rm -rf "$snapshot"
        if should_stop; then
          echo "$(date -Iseconds) STOP after undone oversized iteration $iter" | tee -a "$MASTER_LOG"
          exit 0
        fi
        sleep "${LOOP_SLEEP_SEC:-2}"
        continue
      fi
      halt_loop "density cap exceeded (+${js_ins} / ${js_files} files) AND the pushed revert conflicted — human must inspect origin" 0
    fi
  fi

  if [[ "$mode" == "review" || "$mode" == "audit" ]]; then
    if ! touched_since "$before_head" "reviews/loop-unattended"; then
      if (( agent_pushed )); then
        warn_regression "review produced no reviews/loop-unattended/ file AND already pushed"
      else
        warn_regression "review iteration wrote no reviews/loop-unattended/ file"
      fi
      arm_review_debt_prompt "$iter" "no-review-file"
    fi
    if [[ "$after_head" == "$before_head" ]]; then
      write_iter_count $((iter - 1))
      arm_continue_retry "review iteration left uncommitted reviews/loop-unattended (agent did not commit)" \
        "$mode" "$iter_raw" "$iter_log"
      rm -rf "$snapshot"
      echo "$(date -Iseconds) warning: review left uncommitted reviews/; retrying #$iter as continue-unfinished (supervisor staying up; extract=$iter_log raw=$iter_raw)" \
        | tee -a "$MASTER_LOG"
      if should_stop; then
        echo "$(date -Iseconds) STOP after uncommitted review $iter" | tee -a "$MASTER_LOG"
        exit 0
      fi
      if token_budget_exceeded; then
        echo "$(date -Iseconds) TOKEN BUDGET after uncommitted review $iter" | tee -a "$MASTER_LOG"
        exit 0
      fi
      sleep "${LOOP_SLEEP_SEC:-2}"
      continue
    fi
    if git diff "$before_head" "$after_head" -- 'reviews/loop-unattended' \
      | rg -q '^\+Verdict: \*\*REJECT\*\*'; then
      echo "$(date -Iseconds) review REJECT — stopping after this iteration's docs land" \
        | tee -a "$MASTER_LOG"
      printf '1\n' >"$STOP_FILE"
    fi
    if git diff "$before_head" "$after_head" -- reviews \
      | rg -q '^\+Verdict: \*\*(QUALITY-RISK|REJECT)\*\*'; then
      mustfix_after="$(mustfix_open_count)"
      if (( mustfix_after <= mustfix_before )); then
        if (( agent_pushed )); then
          warn_regression "QUALITY-RISK/REJECT review added no Must-fix queue item AND already pushed"
        else
          warn_regression "QUALITY-RISK/REJECT review added no Must-fix item in docs/LOOP-QUEUE.md"
        fi
        arm_review_debt_prompt "$iter" "no-mustfix"
      fi
    fi
  fi

  echo "$(date -Iseconds) === post-iteration green gate ===" | tee -a "$MASTER_LOG"
  if ! run_green_gate; then
    warn_regression "green regression (seed8000/seed0900 or strict lengths)"
  fi

  if [[ "$mode" == "cadence" || "$mode" == "audit" ]]; then
    echo "$(date -Iseconds) === post-iteration full suite gate ===" | tee -a "$MASTER_LOG"
    if ! run_full_suite_gate; then
      warn_regression "full public suite regression"
    fi
  fi

  rm -rf "$snapshot"

  maybe_archive_checked_queue
  maybe_commit_park "$before_head"
  maybe_rotate_journal
  log_hot_docs

  if [[ "$mode" == "port" && "$resume_unfinished" != "1" ]] && ! queue_has_open; then
    if (( agent_pushed )); then
      warn_regression "queue still empty after port (map refill failed) AND already pushed"
    else
      warn_regression "queue still empty after port — refill Open with \`port-coverage.mjs --rows\` (min ${LOOP_QUEUE_MIN})"
    fi
    arm_empty_port_prompt "$iter" "queue-empty"
  fi

  if [[ "$LOOP_PUSH" == "1" ]]; then
    git_fetch_origin
    local_head="$(git rev-parse HEAD)"
    remote_head="$(git rev-parse '@{u}' 2>/dev/null || true)"
    if [[ -n "$remote_head" && "$local_head" != "$remote_head" ]] ||
       [[ -z "$remote_head" && "$local_head" != "$before_head" ]]; then
      echo "$(date -Iseconds) === supervisor git push ===" | tee -a "$MASTER_LOG"
      if ! run_with_timeout_secs 120 git push origin HEAD; then
        push_with_retry || true
      fi
    fi
  fi

  if should_stop; then
    echo "$(date -Iseconds) STOP: $STOP_FILE is 1 — exiting after iteration $iter"
    echo "$(date -Iseconds) STOP after iter $iter" >>"$MASTER_LOG"
    exit 0
  fi

  if token_budget_exceeded; then
    echo "$(date -Iseconds) TOKEN BUDGET: ${TOKENS_USED} >= ${TOKEN_BUDGET} (${TOKEN_BUDGET_M}M) — stopping after iteration $iter" \
      | tee -a "$MASTER_LOG"
    exit 0
  fi

  arm_nav_discipline_prompt "$iter_raw"

  # Brief pause so a human can flip STOP_AGENT_LOOP.md between iterations
  sleep "${LOOP_SLEEP_SEC:-2}"
done
