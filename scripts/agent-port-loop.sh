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

# Non-fast Cursor Grok 4.5 High → CLI slug grok-4.5-xhigh
# (list: agent --list-models | rg grok)
MODEL="${MODEL:-grok-4.5-xhigh}"
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

PROMPT_FILE="${PROMPT_FILE:-$ROOT/scripts/agent-port-loop.prompt.md}"
if [[ ! -f "$PROMPT_FILE" ]]; then
  echo "error: missing prompt file: $PROMPT_FILE" >&2
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

run_green_gate() {
  node frozen/ps_test_runner.mjs \
    sessions/seed8000-tourist-starter.session.json \
    sessions/seed0900-tourist-explore-actions.session.json \
    2>&1 | tee -a "$MASTER_LOG"
  node scripts/strict-output-check.mjs \
    sessions/seed8000-tourist-starter.session.json \
    sessions/seed0900-tourist-explore-actions.session.json \
    2>&1 | tee -a "$MASTER_LOG"
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
  iter_log="$LOG_DIR/iter-$(printf '%04d' "$iter")-$STAMP.log"
  iter_raw="$LOG_DIR/iter-$(printf '%04d' "$iter")-$STAMP.raw"
  snapshot="$(mktemp -d "$LOG_DIR/.snapshot-$STAMP-$iter.XXXXXX")"
  cp -R "$ROOT/js" "$snapshot/js"
  echo "$(date -Iseconds) === iteration $iter starting (global #$iter) ===" | tee -a "$MASTER_LOG"
  echo "log: $iter_log" | tee -a "$MASTER_LOG"
  echo "cli: $AGENT_BIN -p --model $MODEL --output-format $OUTPUT_FORMAT ${TRUST_ARGS[*]+${TRUST_ARGS[*]}} ${FORCE_ARGS[*]+${FORCE_ARGS[*]}}" \
    | tee -a "$MASTER_LOG"

  # Each iteration is a fresh agent session (new context). Prompt insists on
  # reading docs/CURRENT.md + docs/NOTES.md so state survives across loops.
  # Bash 3.2 (macOS) + set -u: empty "${arr[@]}" is "unbound"; use + guard.
  prompt_body="$(cat "$PROMPT_FILE")"
  if (( iter % 5 == 0 )); then
    echo "$(date -Iseconds) === full public score due (iteration $iter % 5 == 0) ===" \
      | tee -a "$MASTER_LOG"
    prompt_body+=$'\n\n## MANDATORY this iteration (global #'"$iter"' divisible by 5)\n'
    prompt_body+=$'Run the full public score and document it in `docs/CURRENT.md` Score:\n\n'
    prompt_body+=$'```bash\nnode frozen/ps_test_runner.mjs sessions\n```\n\n'
    prompt_body+=$'Record pass count, screen/RNG aggregates, speed label, PASS list, and\n'
    prompt_body+=$'notable non-PASS from `__RESULTS_JSON__`. Prepend a journal crumb.\n'
    prompt_body+=$'Do this even if you also ship a port fix; prefer score+docs if short on time.\n'
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
      echo "warning: structured tool denial(s) in agent stream (continuing):" \
        | tee -a "$MASTER_LOG"
      printf '%s\n' "$deny_report" | tee -a "$MASTER_LOG"
      echo "hint:  AGENT_FORCE=1 if Shell was auto-denied; raw=$iter_raw" \
        | tee -a "$MASTER_LOG"
    fi
  fi

  echo "$(date -Iseconds) === iteration $iter finished (exit $status, ${iter_elapsed}s) ===" \
    | tee -a "$MASTER_LOG"

  record_iteration_tokens "$iter_raw"
  if (( MISSING_USAGE_STREAK >= MISSING_USAGE_LIMIT )); then
    echo "error: ${MISSING_USAGE_LIMIT} consecutive iterations with no usage in stream — halting" \
      | tee -a "$MASTER_LOG"
    echo "raw:   $iter_raw" | tee -a "$MASTER_LOG"
    exit 1
  fi

  if (( iter_elapsed < SHORT_ITER_SEC )); then
    short_streak=$((short_streak + 1))
    echo "warning: short agent run ${iter_elapsed}s < ${SHORT_ITER_SEC}s (streak ${short_streak}/${SHORT_STREAK_LIMIT})" \
      | tee -a "$MASTER_LOG"
  else
    short_streak=0
  fi
  if (( short_streak >= SHORT_STREAK_LIMIT )); then
    echo "error: ${SHORT_STREAK_LIMIT} consecutive agent runs <${SHORT_ITER_SEC}s — likely out of tokens; halting" \
      | tee -a "$MASTER_LOG"
    echo "raw:   $iter_raw" | tee -a "$MASTER_LOG"
    exit 1
  fi

  if [[ "$status" -ne 0 ]]; then
    echo "warning: agent iteration exit $status (continuing); raw=$iter_raw" \
      | tee -a "$MASTER_LOG"
  fi

  if [[ "$(protected_fingerprint)" != "$AUTHORITY_HASH" ]]; then
    echo "warning: protected authority/fixture changed (continuing)" \
      | tee -a "$MASTER_LOG"
  fi

  if ! scan_new_banned_patterns "$snapshot"; then
    echo "warning: banned-pattern audit failed (continuing)" | tee -a "$MASTER_LOG"
  fi

  echo "$(date -Iseconds) === post-iteration green gate ===" | tee -a "$MASTER_LOG"
  if ! run_green_gate; then
    echo "warning: green regression (continuing)" | tee -a "$MASTER_LOG"
  fi
  rm -rf "$snapshot"

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
