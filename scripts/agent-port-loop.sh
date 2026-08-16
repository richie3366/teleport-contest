#!/usr/bin/env bash
# agent-port-loop.sh — repeatedly continue the port until human stop,
# token-budget exhaustion, short-run streak, or missing-usage streak.
#
# Ordinary iteration failures (nonzero exit, green regression, bans, etc.)
# are logged and the loop continues. Stop: write "1" into STOP_AGENT_LOOP.md.
# Design + usage: docs/AGENT-PORT-LOOP.md
#
# Token budget (optional, this run only — not persisted):
#   ./scripts/agent-port-loop.sh --token-budget-m 50
#   # 50 → 50_000_000 tokens; last iteration may overshoot; then halt

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
  -h, --help            Show this help.

Environment knobs (unchanged): MODEL, AGENT_FORCE, AGENT_TRUST, …
Fail-closed (default): green / full-suite / density / protected / banned
halt and revert the iteration (or halt without reset if already pushed).
Review every LOOP_REVIEW_EVERY (3); cadence every LOOP_CADENCE_EVERY (5)
unless Must-fix is open. Queue below LOOP_QUEUE_MIN (8) must be refilled
from the map (target LOOP_QUEUE_TARGET 12); do not halt before the agent
when empty — halt after a port that still has no open items.
Agents commit and push; the script fail-closes and pushes if they forgot.
See docs/AGENT-PORT-LOOP.md.
EOF
}

# --- CLI (parsed before lock so --help is cheap) ---
TOKEN_BUDGET_M=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --token-budget-m)
      TOKEN_BUDGET_M="${2:?error: --token-budget-m needs a value}"
      shift 2
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

TOKEN_BUDGET=0
TOKENS_USED=0
MISSING_USAGE_STREAK=0
MISSING_USAGE_LIMIT=3
EXTRACT_USAGE="$ROOT/scripts/extract-agent-usage.mjs"

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

# Only one loop may mutate this checkout. Acquire the lock before resetting the
# stop latch so a mistaken second launch cannot restart an existing loop.
LOCK_DIR="${LOCK_DIR:-$LOG_DIR/.lock}"
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "error: agent port loop already running (lock: $LOCK_DIR)" >&2
  exit 1
fi
printf '%s\n' "$$" >"$LOCK_DIR/pid"
cleanup() { rm -rf "$LOCK_DIR"; }
trap cleanup EXIT

# Fresh stop latch every successful launch, as requested.
printf '0\n' >"$STOP_FILE"

dirty="$(git status --porcelain | grep -v 'STOP_AGENT_LOOP.md' || true)"
if [[ -n "$dirty" ]]; then
  echo "error: dirty worktree; commit or stash before launching the unattended loop:" >&2
  printf '%s\n' "$dirty" >&2
  exit 1
fi

# Default: Cursor Grok 4.6 Extra High, non-fast
# (list: agent --list-models | rg grok)
MODEL="${MODEL:-cursor-grok-4.6-xhigh}"
AGENT_BIN="${AGENT_BIN:-}"
if [[ -z "$AGENT_BIN" ]]; then
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
OUTPUT_FORMAT="${AGENT_OUTPUT_FORMAT:-stream-json}"
# Token budget metering needs usage on stream-json result events.
if (( TOKEN_BUDGET > 0 )) && [[ "$OUTPUT_FORMAT" != "stream-json" && "$OUTPUT_FORMAT" != "json" ]]; then
  echo "warning: --token-budget-m requires stream-json/json; overriding AGENT_OUTPUT_FORMAT=$OUTPUT_FORMAT → stream-json" \
    | tee -a "$MASTER_LOG"
  OUTPUT_FORMAT="stream-json"
fi
ITERATION_TIMEOUT_SEC="${ITERATION_TIMEOUT_SEC:-3600}"
# Token-exhaustion detector: N consecutive agent runs shorter than this → halt.
SHORT_ITER_SEC="${SHORT_ITER_SEC:-30}"
SHORT_STREAK_LIMIT="${SHORT_STREAK_LIMIT:-3}"
LOOP_REVIEW_EVERY="${LOOP_REVIEW_EVERY:-3}"
LOOP_CADENCE_EVERY="${LOOP_CADENCE_EVERY:-5}"
LOOP_MAX_JS_INSERTIONS="${LOOP_MAX_JS_INSERTIONS:-400}"
LOOP_MAX_JS_FILES="${LOOP_MAX_JS_FILES:-8}"
LOOP_PUSH="${LOOP_PUSH:-1}"
LOOP_FAIL_CLOSED="${LOOP_FAIL_CLOSED:-1}"
LOOP_QUEUE_MIN="${LOOP_QUEUE_MIN:-8}"
LOOP_QUEUE_TARGET="${LOOP_QUEUE_TARGET:-12}"
REVIEW_PROMPT_FILE="${REVIEW_PROMPT_FILE:-$ROOT/scripts/agent-port-loop.review.prompt.md}"
CADENCE_PROMPT_FILE="${CADENCE_PROMPT_FILE:-$ROOT/scripts/agent-port-loop.cadence.prompt.md}"
QUEUE_FILE="${QUEUE_FILE:-$ROOT/docs/LOOP-QUEUE.md}"
REQUIRE_PASS="$ROOT/scripts/loop-require-results-pass.mjs"
ARCHIVE_QUEUE="$ROOT/scripts/archive-loop-queue-done.mjs"

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
if [[ ! -f "$REQUIRE_PASS" ]]; then
  echo "error: missing $REQUIRE_PASS" >&2
  exit 1
fi
if [[ ! -f "$ARCHIVE_QUEUE" ]]; then
  echo "error: missing $ARCHIVE_QUEUE" >&2
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

protected_fingerprint() {
  node --input-type=module - "$ROOT" <<'NODE'
import { createHash } from 'node:crypto';
import {
  existsSync, lstatSync, readFileSync, readdirSync, readlinkSync,
} from 'node:fs';
import { join, relative } from 'node:path';

const root = process.argv[2];
const protectedPaths = [
  'docs/CONSTITUTION.md',
  'docs/PORTING-RUNBOOK.md',
  'docs/GROK-PLAYBOOK.md',
  'docs/API.md',
  'docs/PHASES.md',
  'docs/PORTING-STRATEGY.md',
  'docs/AGENT-PORT-LOOP.md',
  'README.md',
  '.cursor/rules',
  'scripts/agent-port-loop.sh',
  'scripts/agent-port-loop.prompt.md',
  'scripts/agent-port-loop.review.prompt.md',
  'scripts/agent-port-loop.cadence.prompt.md',
  'scripts/loop-require-results-pass.mjs',
  'scripts/archive-loop-queue-done.mjs',
  'frozen',
  'sessions',
  'nethack-c/upstream',
  'nethack-c/patches',
  'js/isaac64.js',
  'js/terminal.js',
  'js/storage.js',
];
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

run_with_timeout() {
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
    print(f"agent iteration timed out after {timeout:g}s", file=sys.stderr)
    raise SystemExit(124)
' "$ITERATION_TIMEOUT_SEC" "$@"
}

scan_new_banned_patterns() {
  local snapshot="$1"
  local found=0 rel old new delta
  while IFS= read -r new; do
    rel="${new#"$ROOT/js/"}"
    old="$snapshot/js/$rel"
    if [[ -f "$old" ]]; then
      delta="$(diff -U0 "$old" "$new" || true)"
    else
      delta="$(diff -U0 /dev/null "$new" || true)"
    fi
    # Word-bound DIAG/FORCE so C flags like FORCETRAP / FORCEBUNGLE pass.
    if printf '%s\n' "$delta" \
      | rg '^\+[^+].*(\bDIAG\b|\bFORCE\b|seed[0-9]{4}|console\.(log|error|debug)|getRngLog.*(===|==|>=|<=))'
    then
      echo "warning: suspicious new production line in js/$rel" >&2
      printf '%s\n' "$delta" \
        | rg '^\+[^+].*(\bDIAG\b|\bFORCE\b|seed[0-9]{4}|console\.(log|error|debug)|getRngLog.*(===|==|>=|<=))' \
        | head -5 >&2
      found=1
    fi
  done < <(rg --files "$ROOT/js" -g '*.js')

  while IFS= read -r old; do
    rel="${old#"$snapshot/js/"}"
    if [[ ! -f "$ROOT/js/$rel" ]]; then
      echo "warning: unattended iteration deleted js/$rel" >&2
      found=1
    fi
  done < <(rg --files "$snapshot/js" -g '*.js')
  return "$found"
}

iter_mode() {
  local n="$1"
  local rev="$LOOP_REVIEW_EVERY"
  local cad="$LOOP_CADENCE_EVERY"
  if (( n % cad == 0 && n % rev == 0 )); then
    echo audit
  elif (( n % cad == 0 )); then
    echo cadence
  elif (( n % rev == 0 )); then
    echo review
  else
    echo port
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

js_diff_stats() {
  git diff --numstat "$1" "$2" -- js \
    | awk '{ ins += $1; if ($1 + $2 > 0) files++ } END { print ins+0, files+0 }'
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
    halt_loop "failed to commit archived LOOP-QUEUE items (local tree kept)" 0
  fi
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

echo "=== agent-port-loop ==="
echo "root:   $ROOT"
echo "agent:  $AGENT_BIN"
echo "model:  $MODEL"
echo "trust:  ${AGENT_TRUST:-1}"
echo "force:  ${AGENT_FORCE:-0}"
echo "format: $OUTPUT_FORMAT"
if [[ "${AGENT_FORCE:-0}" != "1" ]]; then
  echo "note:   AGENT_FORCE=0 — headless Shell/tool approvals are auto-denied (no interactive prompt)."
  echo "        Use AGENT_FORCE=1 after checkpointing if the agent must run scorers."
fi
echo "timeout: ${ITERATION_TIMEOUT_SEC}s per iteration"
echo "halt:   ${SHORT_STREAK_LIMIT}× agent runs <${SHORT_ITER_SEC}s (likely out of tokens)"
if token_budget_active; then
  echo "budget: ${TOKEN_BUDGET_M}M tokens (${TOKEN_BUDGET}) this run only; last iter may overshoot"
  echo "        also halt after ${MISSING_USAGE_LIMIT}× consecutive missing usage events"
else
  echo "budget: (none — pass --token-budget-m <millions> to cap this run)"
fi
echo "stop:   $STOP_FILE  (write 1 to halt before next iteration)"
echo "count:  $ITER_COUNT_FILE  (monotonic global iteration number)"
echo "log:    $MASTER_LOG"
echo "prompt: $PROMPT_FILE"
echo "review: every ${LOOP_REVIEW_EVERY}; cadence every ${LOOP_CADENCE_EVERY} (score-only)"
echo "queue:  min ${LOOP_QUEUE_MIN} open / target ${LOOP_QUEUE_TARGET} (refill from map)"
echo "gates:  fail-closed=${LOOP_FAIL_CLOSED}  js cap ${LOOP_MAX_JS_INSERTIONS} ins / ${LOOP_MAX_JS_FILES} files"
echo "push:   agents commit+push; supervisor backup (LOOP_PUSH=${LOOP_PUSH})"
echo

AUTHORITY_HASH="$(protected_fingerprint)"
echo "$(date -Iseconds) === preflight green gate ===" | tee -a "$MASTER_LOG"
if ! run_green_gate; then
  echo "error: preflight green gate failed; loop not started" | tee -a "$MASTER_LOG"
  exit 1
fi
if [[ "${LOOP_PREFLIGHT_ONLY:-0}" == "1" ]]; then
  echo "$(date -Iseconds) preflight-only check passed" | tee -a "$MASTER_LOG"
  exit 0
fi

iter="$(read_iter_count)"
write_iter_count "$iter"
echo "$(date -Iseconds) === iteration counter: last completed=$iter; next will be $((iter + 1)) ===" \
  | tee -a "$MASTER_LOG"
if token_budget_active; then
  echo "$(date -Iseconds) === token budget this run: 0 / ${TOKEN_BUDGET} (${TOKEN_BUDGET_M}M) ===" \
    | tee -a "$MASTER_LOG"
fi
short_streak=0
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

  iter=$((iter + 1))
  write_iter_count "$iter"
  mode="$(iter_mode "$iter")"
  mustfix_before="$(mustfix_open_count)"
  if [[ "$mode" == "cadence" ]] && (( mustfix_before > 0 )); then
    echo "$(date -Iseconds) note: Must-fix open (${mustfix_before}) — cadence deferred, this iter is port" \
      | tee -a "$MASTER_LOG"
    mode=port
  fi
  iter_log="$LOG_DIR/iter-$(printf '%04d' "$iter")-$STAMP.log"
  iter_raw="$LOG_DIR/iter-$(printf '%04d' "$iter")-$STAMP.raw"
  snapshot="$(mktemp -d "$LOG_DIR/.snapshot-$STAMP-$iter.XXXXXX")"
  cp -R "$ROOT/js" "$snapshot/js"
  before_head="$(git rev-parse HEAD)"
  origin_before=""
  if git rev-parse --abbrev-ref '@{u}' >/dev/null 2>&1; then
    git fetch origin >/dev/null 2>&1 || true
    origin_before="$(git rev-parse '@{u}' 2>/dev/null || true)"
  fi
  echo "$(date -Iseconds) === iteration $iter starting (global #$iter mode=$mode) ===" \
    | tee -a "$MASTER_LOG"
  echo "log: $iter_log" | tee -a "$MASTER_LOG"
  echo "cli: $AGENT_BIN -p --model $MODEL --output-format $OUTPUT_FORMAT ${TRUST_ARGS[*]+${TRUST_ARGS[*]}} ${FORCE_ARGS[*]+${FORCE_ARGS[*]}}" \
    | tee -a "$MASTER_LOG"

  # Each iteration is a fresh agent session (new context).
  # Bash 3.2 (macOS) + set -u: empty "${arr[@]}" is "unbound"; use + guard.
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

  open_now="$(queue_open_count)"
  if (( open_now < LOOP_QUEUE_MIN )); then
    echo "$(date -Iseconds) === queue refill required (open=${open_now} min=${LOOP_QUEUE_MIN} target=${LOOP_QUEUE_TARGET}) ===" \
      | tee -a "$MASTER_LOG"
    prompt_body+=$'\n\n## Queue refill (mandatory this iteration)\n'
    prompt_body+="Open \`- [ ]\` count is ${open_now} (min ${LOOP_QUEUE_MIN}, target ${LOOP_QUEUE_TARGET})."$'\n'
    prompt_body+=$'If you archive this iter’s item, count the remainder **after** archive.\n'
    prompt_body+=$'Append **Open** lines until the live file has about '
    prompt_body+="${LOOP_QUEUE_TARGET}"
    prompt_body+=$' unchecked items.\n'
    prompt_body+=$'Sources: named omits in one `docs/c-js-map/*.md` (prefer `data.md` /\n'
    prompt_body+=$'`debt.md`, then `absent.md`). One C function/family per line; cite C\n'
    prompt_body+=$'file + function. Grep live `LOOP-QUEUE.md` and\n'
    prompt_body+=$'`docs/archive/LOOP-QUEUE-DONE.md` so you do not duplicate. Do not invent\n'
    prompt_body+=$'FAIL peels. Do not enqueue parked D-0006.\n'
    if [[ "$mode" == "port" ]]; then
      prompt_body+=$'Then pop Must-fix else Open (including a line you just added if the\n'
      prompt_body+=$'queue was empty) and ship that one cluster in this same iteration.\n'
    fi
  fi

  iter_start="$(now_epoch)"
  set +e
  run_with_timeout "$AGENT_BIN" -p \
    --model "$MODEL" \
    --output-format "$OUTPUT_FORMAT" \
    ${TRUST_ARGS[@]+"${TRUST_ARGS[@]}"} \
    ${FORCE_ARGS[@]+"${FORCE_ARGS[@]}"} \
    "$prompt_body" \
    >"$iter_raw" 2>&1
  status=$?
  set -e
  iter_elapsed=$(( $(now_epoch) - iter_start ))

  # Human-readable extract + keep raw stream for tool denial forensics.
  if [[ "$OUTPUT_FORMAT" == "stream-json" ]] || [[ "$OUTPUT_FORMAT" == "json" ]]; then
    node --input-type=module - "$iter_raw" "$iter_log" <<'NODE' || cp "$iter_raw" "$iter_log"
import { readFileSync, writeFileSync } from 'node:fs';
const [rawPath, outPath] = process.argv.slice(2);
const raw = readFileSync(rawPath, 'utf8');
const chunks = [];
for (const line of raw.split(/\r?\n/)) {
  if (!line.trim()) continue;
  let ev;
  try { ev = JSON.parse(line); } catch { chunks.push(line); continue; }
  const t = ev.type || ev.event || '';
  if (t === 'assistant' || t === 'message' || t === 'text' || t === 'agent_message') {
    const text = ev.text ?? ev.message?.content ?? ev.content ?? ev.delta ?? '';
    if (typeof text === 'string' && text) chunks.push(text);
    else if (Array.isArray(text)) {
      for (const part of text) {
        if (typeof part === 'string') chunks.push(part);
        else if (part?.text) chunks.push(part.text);
      }
    }
  } else if (typeof ev.result === 'string') {
    chunks.push(ev.result);
  } else if (ev.subtype === 'tool_call' || t.includes('tool')) {
    const name = ev.toolName || ev.name || ev.tool || 'tool';
    const status = ev.status || ev.subtype || t;
    const err = ev.error || ev.rejection || ev.reason || '';
    chunks.push(`[tool] ${name} ${status}${err ? `: ${err}` : ''}`);
  }
}
const body = chunks.length ? chunks.join('\n') : raw;
writeFileSync(outPath, body.endsWith('\n') ? body : body + '\n');
NODE
  else
    cp "$iter_raw" "$iter_log"
  fi
  tee -a "$MASTER_LOG" <"$iter_log" >/dev/null

  # Tool-approval denials only. Ordinary shell failures often contain
  # "permission denied" (OS) and must not abort the loop under set -e.
  if [[ "$OUTPUT_FORMAT" == "stream-json" ]] || [[ "$OUTPUT_FORMAT" == "json" ]]; then
    set +e
    deny_report="$(node --input-type=module - "$iter_raw" <<'NODE'
import { readFileSync } from 'node:fs';
const raw = readFileSync(process.argv[2], 'utf8');
const denials = [];
const stats = { started: 0, completed: 0, ok: 0, err: 0 };
// Approval/UI denials only — not OS "permission denied" in shell stderr.
const approvalRe =
  /rejected by user|requires approval|not approved|tool call was rejected|Shell call was rejected|approval required|tools? were rejected/i;
for (const line of raw.split(/\r?\n/)) {
  if (!line.trim()) continue;
  let ev;
  try { ev = JSON.parse(line); } catch { continue; }
  if (ev.type !== 'tool_call') continue;
  if (ev.subtype === 'started') { stats.started++; continue; }
  if (ev.subtype !== 'completed') continue;
  stats.completed++;
  const tc = ev.tool_call || {};
  const key = Object.keys(tc)[0] || 'unknown';
  const result = tc[key]?.result;
  if (!result) continue;
  if (result.success) { stats.ok++; continue; }
  stats.err++;
  const errObj = result.error ?? result.failure ?? result;
  // Shell/OS failures include exitCode; those are not approval denials.
  if (errObj && typeof errObj === 'object' && ('exitCode' in errObj || 'signal' in errObj)) {
    continue;
  }
  const errBlob = JSON.stringify(errObj);
  if (approvalRe.test(errBlob)) {
    denials.push(`${key}: ${errBlob.slice(0, 180)}`);
  }
}
console.error(`tools ok=${stats.ok} err=${stats.err} completed=${stats.completed}/${stats.started}`);
if (denials.length) {
  console.log(denials.join('\n'));
  process.exit(2);
}
NODE
)"
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

  record_iteration_tokens "$iter_raw"
  if (( MISSING_USAGE_STREAK >= MISSING_USAGE_LIMIT )); then
    halt_loop "${MISSING_USAGE_LIMIT} consecutive iterations with no usage in stream" 1
  fi

  if (( iter_elapsed < SHORT_ITER_SEC )); then
    short_streak=$((short_streak + 1))
    echo "warning: short agent run ${iter_elapsed}s < ${SHORT_ITER_SEC}s (streak ${short_streak}/${SHORT_STREAK_LIMIT})" \
      | tee -a "$MASTER_LOG"
  else
    short_streak=0
  fi
  if (( short_streak >= SHORT_STREAK_LIMIT )); then
    halt_loop "${SHORT_STREAK_LIMIT} consecutive agent runs <${SHORT_ITER_SEC}s — likely out of tokens" 1
  fi

  if [[ "$status" -eq 124 ]]; then
    halt_loop "agent iteration timed out after ${ITERATION_TIMEOUT_SEC}s" 1
  fi

  if [[ "$status" -ne 0 ]]; then
    echo "warning: agent iteration exit $status; raw=$iter_raw" | tee -a "$MASTER_LOG"
  fi

  after_head="$(git rev-parse HEAD)"
  read -r js_ins js_files <<<"$(js_diff_stats "$before_head" "$after_head")"

  origin_after=""
  agent_pushed=0
  if git rev-parse --abbrev-ref '@{u}' >/dev/null 2>&1; then
    git fetch origin >/dev/null 2>&1 || true
    origin_after="$(git rev-parse '@{u}' 2>/dev/null || true)"
    if [[ -n "$origin_before" && -n "$origin_after" && "$origin_after" != "$origin_before" ]]; then
      agent_pushed=1
    fi
  fi

  if [[ "$(protected_fingerprint)" != "$AUTHORITY_HASH" ]]; then
    if (( agent_pushed )); then
      halt_loop "protected authority/fixture changed AND already pushed — human must revert origin" 0
    fi
    halt_loop "protected authority/fixture changed" 1
  fi

  if ! scan_new_banned_patterns "$snapshot"; then
    if (( agent_pushed )); then
      halt_loop "banned-pattern audit failed AND already pushed — human must revert origin" 0
    fi
    halt_loop "banned-pattern audit failed (DIAG/FORCE/seed gate/console/getRngLog or deleted js/)" 1
  fi

  if [[ "$mode" != "port" ]] && (( js_files > 0 )); then
    if (( agent_pushed )); then
      halt_loop "$mode iteration touched js/ AND already pushed — human must revert origin" 0
    fi
    halt_loop "$mode iteration must not edit js/ (${js_files} file(s), +${js_ins})" 1
  fi

  if [[ "$mode" == "port" ]]; then
    if (( js_ins == 0 && js_files == 0 )); then
      if (( agent_pushed )); then
        halt_loop "empty port iteration (no js/ diff) already pushed" 0
      fi
      halt_loop "empty port iteration (no js/ changes) — queue item not shipped" 1
    fi
    if (( js_ins > LOOP_MAX_JS_INSERTIONS || js_files > LOOP_MAX_JS_FILES )); then
      if (( agent_pushed )); then
        halt_loop "density cap exceeded (+${js_ins} / ${js_files} files) AND already pushed" 0
      fi
      halt_loop "density cap exceeded: js +${js_ins} insertions / ${js_files} files (max ${LOOP_MAX_JS_INSERTIONS}/${LOOP_MAX_JS_FILES})" 1
    fi
  fi

  if [[ "$mode" == "review" || "$mode" == "audit" ]]; then
    if ! git diff --name-only "$before_head" "$after_head" | rg -q 'reviews/loop-unattended/'; then
      if (( agent_pushed )); then
        halt_loop "review produced no reviews/loop-unattended/ file AND already pushed" 0
      fi
      halt_loop "review iteration wrote no reviews/loop-unattended/ file" 1
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
          halt_loop "QUALITY-RISK/REJECT review added no Must-fix queue item AND already pushed" 0
        fi
        halt_loop "QUALITY-RISK/REJECT review added no Must-fix item in docs/LOOP-QUEUE.md" 1
      fi
    fi
  fi

  echo "$(date -Iseconds) === post-iteration green gate ===" | tee -a "$MASTER_LOG"
  if ! run_green_gate; then
    if (( agent_pushed )); then
      halt_loop "green regression AND already pushed — human must revert origin" 0
    fi
    halt_loop "green regression (seed8000/seed0900 or strict lengths)" 1
  fi

  if [[ "$mode" == "cadence" || "$mode" == "audit" ]]; then
    echo "$(date -Iseconds) === post-iteration full suite gate ===" | tee -a "$MASTER_LOG"
    if ! run_full_suite_gate; then
      if (( agent_pushed )); then
        halt_loop "full-suite regression AND already pushed — human must revert origin" 0
      fi
      halt_loop "full public suite regression" 1
    fi
  fi

  rm -rf "$snapshot"

  maybe_archive_checked_queue

  if [[ "$mode" == "port" ]] && ! queue_has_open; then
    if (( agent_pushed )); then
      halt_loop "queue still empty after port (map refill failed) AND already pushed" 0
    fi
    halt_loop "queue still empty after port — refill Open from c-js-map (min ${LOOP_QUEUE_MIN})" 1
  fi

  if [[ "$LOOP_PUSH" == "1" ]]; then
    git fetch origin >/dev/null 2>&1 || true
    local_head="$(git rev-parse HEAD)"
    remote_head="$(git rev-parse '@{u}' 2>/dev/null || true)"
    if [[ -n "$remote_head" && "$local_head" != "$remote_head" ]] ||
       [[ -z "$remote_head" && "$local_head" != "$before_head" ]]; then
      echo "$(date -Iseconds) === supervisor git push ===" | tee -a "$MASTER_LOG"
      if ! git push origin HEAD; then
        halt_loop "git push origin HEAD failed (local commits kept)" 0
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

  # Brief pause so a human can flip STOP_AGENT_LOOP.md between iterations
  sleep "${LOOP_SLEEP_SEC:-2}"
done
